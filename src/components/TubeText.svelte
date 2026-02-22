<script lang="ts">
	import { T } from '@threlte/core'
	import { Color, LineCurve3 } from 'three/webgpu'
	import type { Material } from 'three/webgpu'
	import { createTubeMaterialCached } from '../lib/video/material-text-tube'
	import { getTextPathsCached } from '../lib/video/text-geometry'
	import { buildTubeGeometry } from '../lib/video/tube-geometry'
	import { untrack } from 'svelte'
	import { createStandardMaterialCached } from '../lib/video/material-standard'

	let {
		text,
		material: propMaterial,
		color,
		size,
		width = 0.5,
		spacing = 1,
		id,
		fx = true,
		active = true,
		...props
	}: {
		text: string
		material?: Material
		color: string
		size: number
		width?: number
		spacing?: number
		id: string
		fx?: boolean
		active?: boolean
	} = $props()

	const paths = $derived.by(() => getTextPathsCached(text, spacing))
	const material = createTubeMaterialCached(
		untrack(() => id),
		untrack(() => color)
	)
	const plainMaterial = $derived(!fx ? createStandardMaterialCached(id, color) : null)
	const useMaterial = $derived(fx ? material?.mat : plainMaterial)
	const colorValue = new Color()

	$effect(() => {
		colorValue.set(color)
	})

	// Update uniform instead of recreating material
	$effect(() => {
		if (material && !material.emissiveColor.value.equals(colorValue)) {
			material.emissiveColor.value = colorValue
		}

		if (plainMaterial && !plainMaterial.color.equals(colorValue)) {
			plainMaterial.color = colorValue
		}
	})

	$effect(() => {
		if (material) material.activeUniform.value = active ? 1.0 : 0.0
		if (plainMaterial) plainMaterial.opacity = active ? 1.0 : 0.3
	})

	// Build tube geometries from character paths
	const geometries = $derived.by(() =>
		paths.map((path) => {
			// Convert points to LineCurve3 array
			const curves = new Array(path.length - 1)
			for (let i = 0; i < path.length - 1; i++) {
				curves[i] = new LineCurve3(path[i], path[i + 1])
			}

			return buildTubeGeometry(
				curves,
				width / 50, // radius matches Line2 semantics
				3, // radialSegments
				1, // density
				false // open path
			)
		})
	)
</script>

<T.Group {...props}>
	<T.Group scale={size}>
		{#each geometries as geometry, idx (idx)}
			<T.Mesh {geometry} material={propMaterial ?? <Material>useMaterial} />
		{/each}
	</T.Group>
</T.Group>
