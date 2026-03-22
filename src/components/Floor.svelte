<script lang="ts">
	import { T } from '@threlte/core'
	import { BoxGeometry, Mesh } from 'three/webgpu'
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
		oneMinus
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
	}

	const p: Props = $props()

	const size = untrack(() => p.size ?? 10)
	const resolution = untrack(() => p.resolution ?? 0.5)
	const blur = untrack(() => p.blur ?? 10)
	const tint = untrack(() => p.tint ?? ([0.1, 0.1, 0.1] as [number, number, number]))
	const reflectivity = untrack(() => p.reflectivity ?? 0.75)
	const opacity = untrack(() => p.opacity ?? 0.1)
	const edgeGlow = untrack(() => p.edgeGlow ?? 0.01)
	const height = untrack(() => p.height ?? 0.5)

	// bounces:false → NodeUpdateType.FRAME avoids renderId corruption from the
	// nested renderer.render() call inside updateBefore incrementing renderId.
	const reflectionNode = reflector({ resolutionScale: resolution, bounces: false })
	const reflectionColor = blur > 0 ? gaussianBlur(reflectionNode, null, blur) : reflectionNode

	// Fresnel edge glow (shared by both materials)
	const fresnel = pow(oneMinus(clamp(dot(normalWorld, positionViewDirection).abs(), 0, 1)), 3)

	// ── Top face material (group 2 = +y) ─────────────────────────────────────
	// Only this material contains reflectionNode. During the reflection render,
	// THREE sets topMat.visible=false — the 5 side materials have no reflectionNode
	// reference so they don't trigger a read+write conflict on the same texture.
	const topMat = new MeshBasicNodeMaterial({ transparent: true })
	topMat.colorNode = vec4(
		mix(vec3(tint[0], tint[1], tint[2]), reflectionColor.rgb, reflectivity).add(
			vec3(fresnel.mul(edgeGlow))
		),
		float(opacity).add(fresnel.mul(0.35 as number))
	)

	// ── Side / bottom face material (groups 0,1,3,4,5) ───────────────────────
	const sideMat = new MeshBasicNodeMaterial({ transparent: true, side: 2 /* DoubleSide */ })
	sideMat.colorNode = vec4(
		vec3(tint[0], tint[1], tint[2]).add(vec3(fresnel.mul(edgeGlow))),
		float(opacity * 0.4).add(fresnel.mul(0.5 as number))
	)

	const geo = new BoxGeometry(size, height, size)
	// BoxGeometry material groups: 0=+x, 1=-x, 2=+y(top), 3=-y, 4=+z, 5=-z
	const mesh = new Mesh(geo, [sideMat, sideMat, topMat, sideMat, sideMat, sideMat])

	// Reflector target at local y=+0.125 → world y=0 (top surface).
	// rotation.x=-π/2 → local +Z aligns to world +Y (mirror normal points up).
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
