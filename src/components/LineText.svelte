<script lang="ts">
	import { onDestroy } from 'svelte'
	import { T, extend } from '@threlte/core'
	import { Line2NodeMaterial, Color } from 'three/webgpu'
	import { Line2 } from 'three/addons/lines/webgpu/Line2.js'
	import { getTextMaterial, type LineMat } from '../lib/video/material-text'
	import { getTextGeometry } from '../lib/video/text-geometry'

	extend({ Line2, Line2NodeMaterial })

	let {
		text,
		color,
		size,
		width = 0.5,
		spacing = 1,
		...props
	}: { text: string; color: string; size: number; width: number; spacing: number } = $props()

	const lines = $derived.by(() => getTextGeometry(text, spacing))

	let material: LineMat | undefined = $state(undefined)

	$effect(() => {
		if (material) {
			material.emissiveColor.value = new Color(color)
			return
		}

		material = getTextMaterial(color, width)
	})

	onDestroy(() => {
		for (const geometry of lines) {
			geometry.dispose()
		}
	})
</script>

<T.Group {...props}>
	<T.Group scale={size}>
		{#each lines as geometry, idx (idx)}
			{#if material}
				<T.Line2 args={[geometry, material.mat]} />
			{/if}
		{/each}
	</T.Group>
</T.Group>
