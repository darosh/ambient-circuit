import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import type { BufferGeometry } from 'three/webgpu'
import { buildMixedGeometry, parseMixedText } from './mixed-text'

export const FONT = './fonts/nanumgothiccoding-regular.json'
export const geoCache = new Map<string, BufferGeometry>()
export const fontCache: { font: Font | undefined } = { font: undefined }
export const font = new Promise((resolve) => new FontLoader().load(FONT, (f) => resolve(f)))

export function clearGeoTextCache() {
	for (const g of geoCache.values()) g.dispose()
	geoCache.clear()
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

export function getCachedMixedGeometry(text: string, size: number): BufferGeometry | undefined {
	if (!fontCache.font) return undefined
	const segs = parseMixedText(text)
	if (segs.length === 1 && segs[0].sizeScale === 1 && segs[0].yShift === 0) {
		return getCachedTextGeometry(text, size)
	}
	const key = `mixed:${text}_${size}`
	if (!geoCache.has(key)) {
		geoCache.set(key, buildMixedGeometry(segs, size, fontCache.font))
	}
	return geoCache.get(key)
}
