<script lang="ts">
	import { T } from '@threlte/core'
	import {
		fontCache,
		getCachedTextGeometry,
		getCachedMixedGeometry
	} from '../lib/video/geo-geometry'
	import { Text3DGeometry, Suspense } from '@threlte/extras'

	let { text, size, material, cache = false, mixed = false } = $props()
	let cachedGeom = $derived(
		mixed ? getCachedMixedGeometry(text, size) : getCachedTextGeometry(text, size)
	)

	$effect(() => {
		const geom = cachedGeom
		return () => {
			if (geom) geom.userData.refCount--
		}
	})
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
