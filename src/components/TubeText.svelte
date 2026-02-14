<script lang="ts">
	import { T } from '@threlte/core'
	import { Color, LineCurve3 } from 'three/webgpu'
	import type { Material } from 'three'
	import { createTubeMaterialCached } from '../lib/video/material-text'
	import { getTextPathsCached } from '../lib/video/text-geometry'
	import { buildTubeGeometry } from '../lib/video/tube-geometry'
	import { untrack } from 'svelte'

	let {
		text,
		color,
		size,
		width = 0.5,
		spacing = 1,
		id,
		...props
	}: {
		text: string
		color: string
		size: number
		width: number
		spacing: number
		id: string
	} = $props()

	const paths = $derived.by(() => getTextPathsCached(text, spacing))
	const material = createTubeMaterialCached(
		untrack(() => id),
		untrack(() => color)
	)
	const colorValue = $derived(new Color(color))

	// Update uniform instead of recreating material
	$effect(() => {
		if (material && !material.emissiveColor.value.equals(colorValue)) {
			material.emissiveColor.value = colorValue
		}
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
				width / 200, // radius matches Line2 semantics
				8, // radialSegments
				10, // density
				false // open path
			)
		})
	)
</script>

<T.Group {...props}>
	<T.Group scale={size}>
		{#each geometries as geometry, idx (idx)}
			<T.Mesh {geometry} material={<Material>material.mat} />
		{/each}
	</T.Group>
</T.Group>
