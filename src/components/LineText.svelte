<script lang="ts">
	// import { onDestroy } from 'svelte'
	import { T, extend } from '@threlte/core'
	import { Line2NodeMaterial, Color } from 'three/webgpu'
	import { Line2 } from 'three/addons/lines/webgpu/Line2.js'
	import { getTextMaterialCached, type LineMat } from '../lib/video/material-text-line'
	import { getTextGeometryCached } from '../lib/video/text-geometry'
	import { createLineMaterialCached } from '../lib/video/material-line'

	extend({ Line2, Line2NodeMaterial })

	let {
		text,
		color,
		size,
		width = 0.5,
		spacing = 1,
		id,
		fx = true,
		...props
	}: {
		text: string
		color: string
		size: number
		width: number
		spacing: number
		id: string
		fx: boolean
	} = $props()

	const lines = $derived.by(() => getTextGeometryCached(text, spacing))

	let material = $state<LineMat | undefined>(undefined)
	const plainMaterial = $derived(!fx ? createLineMaterialCached(id, color, width) : null)
	const useMaterial = $derived(fx ? material?.mat : plainMaterial?.mat)
	const colorValue = $derived(new Color(color))

	$effect(() => {
		if (material) {
			if (!material.emissiveColor.value.equals(colorValue)) {
				material.emissiveColor.value = colorValue
			}

			return
		}

		if (fx) {
			material = getTextMaterialCached(id, color, width)
		}
	})

	$effect(() => {
		if (plainMaterial && !fx) {
			if (!plainMaterial.mat.color.equals(colorValue)) {
				plainMaterial.mat.color = colorValue
			}
		}
	})

	// onDestroy(() => {
	// 	for (const geometry of lines) {
	// 		geometry.dispose()
	// 	}
	// })
</script>

<T.Group {...props}>
	{#if useMaterial}
		<T.Group scale={size}>
			{#each lines as geometry, idx (idx)}
				<T.Line2 args={[geometry, useMaterial]} />
			{/each}
		</T.Group>
	{/if}
</T.Group>
