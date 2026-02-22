<script module lang="ts">
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
	import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'
	import type { BufferGeometry } from 'three/webgpu'

	let cacheVersion = $state(0)
	// eslint-disable-next-line svelte/prefer-svelte-reactivity -- plain Map intentional, reactivity via cacheVersion
	const geoCache = new Map<string, BufferGeometry>()
	let loadedFont = $state<Font | null>(null)

	// Load font once for all cached instances
	new FontLoader().load('./fonts/nanumgothiccoding-regular.json', (f) => {
		loadedFont = f
	})

	export function clearGeoTextCache() {
		for (const g of geoCache.values()) g.dispose()
		geoCache.clear()
		cacheVersion++
	}

	export function getCachedTextGeometry(text: string, size: number): BufferGeometry | undefined {
		if (!loadedFont) return undefined
		const key = `${text}_${size}`
		if (!geoCache.has(key)) {
			geoCache.set(
				key,
				new TextGeometry(text, { font: loadedFont, size, depth: 0, curveSegments: 3 })
			)
			cacheVersion++
		}
		return geoCache.get(key)
	}
</script>

<script lang="ts">
	import { useLoader, T } from '@threlte/core'
	import { Text3DGeometry, Suspense } from '@threlte/extras'

	export const font = <import('three/examples/jsm/loaders/FontLoader.js').Font>(
		(<unknown>useLoader(FontLoader).load('./fonts/nanumgothiccoding-regular.json'))
	)

	let { text, size, material, cache = false } = $props()

	const cacheKey = $derived(`${text}_${size}`)

	// When cache=true: create geometry via TextGeometry (not Text3DGeometry) so we own it
	$effect(() => {
		if (!cache || !loadedFont) return
		const key = cacheKey
		if (geoCache.has(key)) return
		const g = new TextGeometry(text, { font: loadedFont, size, depth: 0, curveSegments: 3 })
		geoCache.set(key, g)
		cacheVersion++
	})

	const cachedGeom = $derived(cacheVersion >= 0 && cache ? geoCache.get(cacheKey) : undefined)
</script>

{#if cache && cachedGeom}
	<T.Mesh {material} geometry={cachedGeom} />
{:else}
	<Suspense>
		<T.Mesh {material}>
			<Text3DGeometry smooth={0} depth={0} curveSegments={3} {size} {text} {font} />
			{#if !material}
				<T.MeshBasicMaterial transparent color="#ffffff" />
			{/if}
		</T.Mesh>
	</Suspense>
{/if}
