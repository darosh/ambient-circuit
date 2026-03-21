<script lang="ts">
	import { T } from '@threlte/core'
	import { BoxGeometry, Mesh } from 'three/webgpu'
	import { MeshBasicNodeMaterial } from 'three/webgpu'
	import { reflector, mix, float, vec3 } from 'three/tsl'
	import { gaussianBlur } from 'three/addons/tsl/display/GaussianBlurNode.js'
	import { onDestroy, untrack } from 'svelte'

	interface Props {
		size?: number
		resolution?: number
		blur?: number
		tint?: [number, number, number]
		reflectivity?: number
		opacity?: number
	}

	const p: Props = $props()

	const size = untrack(() => p.size ?? 10)
	const resolution = untrack(() => p.resolution ?? 0.5)
	const blur = untrack(() => p.blur ?? 0)
	const tint = untrack(() => p.tint ?? ([0, 0, 0] as [number, number, number]))
	const reflectivity = untrack(() => p.reflectivity ?? 0.88)
	const opacity = untrack(() => p.opacity ?? 0.65)

	const reflectionNode = reflector({ resolutionScale: resolution })
	const reflectionColor = blur > 0 ? gaussianBlur(reflectionNode, null, blur) : reflectionNode

	const mat = new MeshBasicNodeMaterial({ transparent: true })
	mat.colorNode = mix(vec3(tint[0], tint[1], tint[2]), reflectionColor, reflectivity)
	mat.opacityNode = float(opacity)

	const geometry = new BoxGeometry(size, 0.25, size)
	const mesh = new Mesh(geometry, mat)
	reflectionNode.target.rotation.x = -Math.PI / 2
	mesh.add(reflectionNode.target)

	onDestroy(() => {
		reflectionNode.dispose()
		geometry.dispose()
		mat.dispose()
	})
</script>

<T is={mesh} position.y={-0.125} />
