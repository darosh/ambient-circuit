<script lang="ts">
	import { T } from '@threlte/core'
	import { fontCache, getCachedTextGeometry } from '../lib/video/geo-geometry'
	import { Text3DGeometry, Suspense } from '@threlte/extras'

	let { text, size, material, cache = false } = $props()
	let cachedGeom = $derived(getCachedTextGeometry(text, size))
</script>

{#if cache && cachedGeom}
	<T.Mesh {material} geometry={cachedGeom} />
{:else}
	<Suspense>
		<T.Mesh {material}>
			<Text3DGeometry smooth={0} depth={0} curveSegments={3} {size} {text} font={fontCache.font} />
			{#if !material}
				<T.MeshBasicMaterial transparent color="#ffffff" />
			{/if}
		</T.Mesh>
	</Suspense>
{/if}
