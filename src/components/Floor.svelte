<script lang="ts">
	import { T } from '@threlte/core'
	import { BoxGeometry, CylinderGeometry, Mesh } from 'three/webgpu'
	import { MeshBasicNodeMaterial } from 'three/webgpu'
	import {
		reflector,
		mix,
		float,
		vec3,
		vec4,
		normalWorld,
		positionViewDirection,
		dot,
		pow,
		clamp,
		oneMinus,
		time,
		sin
	} from 'three/tsl'
	import { gaussianBlur } from 'three/addons/tsl/display/GaussianBlurNode.js'
	import { onDestroy, untrack } from 'svelte'

	interface Props {
		size?: number
		resolution?: number
		blur?: number
		tint?: [number, number, number]
		reflectivity?: number
		opacity?: number
		height?: number
		edgeGlow?: number
		polar?: boolean
	}

	const p: Props = $props()

	const size = untrack(() => p.size ?? 10)
	const resolution = untrack(() => p.resolution ?? 0.5)
	const blur = untrack(() => p.blur ?? 8)
	const tint = untrack(() => p.tint ?? ([0.1, 0.1, 0.1] as [number, number, number]))
	const reflectivity = untrack(() => p.reflectivity ?? 0.75)
	const opacity = untrack(() => p.opacity ?? 0.1)
	const edgeGlow = untrack(() => p.edgeGlow ?? 0.01)
	const height = untrack(() => p.height ?? 0.5)
	const polar = untrack(() => p.polar ?? false)

	// bounces:false → NodeUpdateType.FRAME avoids renderId corruption
	const reflectionNode = reflector({ resolutionScale: resolution, bounces: false })
	const reflectionColor = blur > 0 ? gaussianBlur(reflectionNode, null, blur) : reflectionNode

	// Shared Fresnel (strong at edges/grazing angles)
	const fresnel = pow(oneMinus(clamp(dot(normalWorld, positionViewDirection).abs(), 0, 1)), 3)

	// ── FAKE REFRACTION TRICKS (both chromatic dispersion + animated noise) ──
	const chromaticStrength = -0.085

	const dispR = fresnel.mul(chromaticStrength * 1.15)
	const dispG = fresnel.mul(0)
	const dispB = fresnel.mul(-chromaticStrength * 0.85)

	// Animated normal-based perturbation (cheap "swimming" refraction look)
	const perturb = vec3(
		sin(normalWorld.x.mul(11).add(time.mul(0.65))).mul(0.013),
		sin(normalWorld.y.mul(14.5).add(time.mul(0.9))).mul(0.009),
		sin(normalWorld.z.mul(12.5).add(time.mul(0.75))).mul(0.011)
	)

	// ── Top face material (group 2 = +y) ─────────────────────────────────────
	// Keeps clean reflection on top + light chromatic hint
	const topBase = mix(vec3(tint[0], tint[1], tint[2]), reflectionColor.rgb, reflectivity)

	const topColor = vec3(
		topBase.r.add(dispR.mul(0.55)),
		topBase.g.add(dispG.mul(0.55)),
		topBase.b.add(dispB.mul(0.55))
	)

	const topMat = new MeshBasicNodeMaterial({ transparent: true })
	topMat.colorNode = vec4(
		topColor.add(vec3(fresnel.mul(edgeGlow))),
		float(opacity).add(fresnel.mul(0.35 as number))
	)

	// ── Side / bottom face material (groups 0,1,3,4,5) ───────────────────────
	// Combines:
	// 1. Very subtle distorted reflection sampling (re-uses same reflectionColor)
	// 2. Fake normal perturbation (animated refraction swimming)
	// 3. Chromatic dispersion offset
	const sideBase = vec3(tint[0], tint[1], tint[2])
	const sideReflectionMix = mix(sideBase, reflectionColor.rgb, reflectivity * 0.19) // low strength on sides

	const sideDistorted = sideReflectionMix.add(perturb.mul(0.42)) // fake refraction distortion

	const finalSideColor = vec3(
		sideDistorted.r.add(dispR),
		sideDistorted.g.add(dispG),
		sideDistorted.b.add(dispB)
	)

	const sideMat = new MeshBasicNodeMaterial({ transparent: true, side: 2 /* DoubleSide */ })
	sideMat.colorNode = vec4(
		finalSideColor.add(vec3(fresnel.mul(edgeGlow * 1.35))),
		float(opacity * 0.52).add(fresnel.mul(0.62))
	)

	// BoxGeometry material groups: 0=+x, 1=-x, 2=+y(top), 3=-y, 4=+z, 5=-z
	// CylinderGeometry material groups: 0=side, 1=top, 2=bottom
	const geo = polar ? new CylinderGeometry(5, 5, height, 64) : new BoxGeometry(size, height, size)
	const mesh = polar
		? new Mesh(geo, [sideMat, topMat, sideMat])
		: new Mesh(geo, [sideMat, sideMat, topMat, sideMat, sideMat, sideMat])

	// Reflector target setup (top surface mirror)
	reflectionNode.target.rotation.x = -Math.PI / 2
	reflectionNode.target.position.y = height / 2
	mesh.add(reflectionNode.target)

	onDestroy(() => {
		reflectionNode.dispose()
		topMat.dispose()
		sideMat.dispose()
		geo.dispose()
	})
</script>

<T is={mesh} position.y={-height / 2} />
