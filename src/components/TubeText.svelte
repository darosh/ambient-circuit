<script lang="ts">
	import { T } from '@threlte/core'
	import type { Material } from 'three/webgpu'
	import { createTubeMaterialCached } from '../lib/video/material-text-tube'
	import { getCachedTubeGeometry } from '../lib/video/geometry-text-tube'
	import { untrack } from 'svelte'
	import { wireframeMaterial } from '../lib/components/config'

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

	const material = createTubeMaterialCached(
		untrack(() => id),
		untrack(() => color)
	)

	$effect(() => {
		if (material) {
			material.emissiveColor.value.set(color)
		}
	})

	$effect(() => {
		if (material) material.activeUniform.value = active ? 1 : 0
	})

	const geometry = $derived(getCachedTubeGeometry(text, spacing, width))

	$effect(() => {
		const geom = geometry
		return () => {
			if (geom) {
				geom.userData.refCount--
			}
		}
	})
</script>

<T.Group {...props}>
	<T.Group scale={size}>
		{#if geometry}
			<T.Mesh oncreate={() => () => material.mat.userData.refCount-- }  {geometry} material={propMaterial ?? (fx ? material?.mat : wireframeMaterial)} />
		{/if}
	</T.Group>
</T.Group>
