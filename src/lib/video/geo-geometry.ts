import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

export const FONT = './fonts/nanumgothiccoding-regular.json'
export const geoCache = new Map<string, TextGeometry>()
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
	return geoCache.get(key)
}
