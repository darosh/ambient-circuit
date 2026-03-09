import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import type { BufferGeometry } from 'three/webgpu'
import { buildMixedGeometry, parseMixedTextCached } from './mixed-text'

export const FONT = './fonts/nanumgothiccoding-regular.json'
export const geoCache = new Map<string, BufferGeometry>()
const mixedCache = new Map<string, BufferGeometry>()
export const fontCache: { font: Font | undefined } = { font: undefined }
export const font = new Promise((resolve) => new FontLoader().load(FONT, (f) => resolve(f)))

export function clearGeoTextCache() {
	for (const g of geoCache.values()) g.dispose()
	geoCache.clear()
	for (const r of mixedCache.values()) r.dispose()
	mixedCache.clear()
}

export function getCachedTextGeometry(text: string, size: number): TextGeometry | undefined {
	if (!fontCache.font) return undefined
	const key = `${text}_${size}`
	if (!geoCache.has(key)) {
		geoCache.set(
			key,
			new TextGeometry(text, { font: fontCache.font, size, depth: 0, curveSegments: 3 })
		)
	}
	return geoCache.get(key) as TextGeometry | undefined
}

export function getCachedMixed(text: string, size: number): BufferGeometry | undefined {
	if (!fontCache.font) return undefined
	const key = `${text}_${size}`
	if (!mixedCache.has(key)) {
		const { segs } = parseMixedTextCached(text)
		mixedCache.set(key, buildMixedGeometry(segs, size, fontCache.font))
	}
	return mixedCache.get(key)
}

/** Geometry-only convenience (falls back to getCachedMixed internally) */
export function getCachedMixedGeometry(text: string, size: number): BufferGeometry | undefined {
	return getCachedMixed(text, size)
}
