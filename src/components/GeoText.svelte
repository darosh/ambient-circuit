<script lang="ts">
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
	import { useLoader, T } from '@threlte/core'
	import { Text3DGeometry, Suspense } from '@threlte/extras'
	import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'

	// export const font = <Font>(<unknown>useLoader(FontLoader).load('./fonts/zenkurenaido-regular.json'))
	export const font = <Font>(
		(<unknown>useLoader(FontLoader).load('./fonts/nanumgothiccoding-regular.json'))
	)

	let { text, size, material } = $props()
</script>

<Suspense>
	<T.Mesh {material}>
		<Text3DGeometry {size} {text} {font} />
		{#if !material}
			<T.MeshBasicMaterial transparent color="#ffffff" />
		{/if}
	</T.Mesh>
</Suspense>
