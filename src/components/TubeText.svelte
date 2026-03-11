<script lang="ts">
	import { T } from '@threlte/core'
	import { Color } from 'three/webgpu'
	import type { Material } from 'three/webgpu'
	import { createTubeMaterialCached } from '../lib/video/material-text-tube'
	import { getCachedTubeGeometry } from '../lib/video/text-geometry'
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

	const material = createTubeMaterialCached(
		untrack(() => id),
		untrack(() => color)
	)

	// plainMaterial: tracked via $effect for proper refCount acquire/release
	let plainMaterial = $state.raw<ReturnType<typeof createStandardMaterialCached> | null>(null)
	$effect(() => {
		const mat = fx ? null : createStandardMaterialCached(id, color)
		plainMaterial = mat
		return () => {
			if (mat) mat.userData.refCount--
		}
	})
	const useMaterial = $derived(fx ? material?.mat : plainMaterial)

	const colorValue = new Color()

	$effect(() => {
		colorValue.set(color)
	})

	$effect(() => {
		if (material && !material.emissiveColor.value.equals(colorValue)) {
			material.emissiveColor.value = colorValue
		}
		if (plainMaterial && !plainMaterial.color.equals(colorValue)) {
			plainMaterial.color = colorValue
		}
	})

	$effect(() => {
		if (material) material.activeUniform.value = active ? 1 : 0
		if (plainMaterial) plainMaterial.opacity = active ? 1 : 0.3
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
			<T.Mesh {geometry} material={propMaterial ?? <Material>useMaterial} />
		{/if}
	</T.Group>
</T.Group>
