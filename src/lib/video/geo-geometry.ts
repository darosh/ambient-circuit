import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import type { BufferGeometry } from 'three/webgpu'
import { buildMixedGeometry, parseMixedTextCached } from './mixed-text'
import { debug } from 'debug'

const log = debug('geo:txt')
const logMix = debug('geo:mix')

export const FONT = './fonts/nanumgothiccoding-regular.json'
export const geoCache = new Map<string, BufferGeometry>()
const mixedCache = new Map<string, BufferGeometry>()
export const fontCache: { font: Font | undefined } = { font: undefined }
export const font = new Promise((resolve) => new FontLoader().load(FONT, (f) => resolve(f)))

export function clearGeoTextCache() {
	for (const [key, geometry] of geoCache.entries()) {
		if (!geometry.userData.refCount) {
			log('disposing', geometry.name)
			geometry.dispose()
			geoCache.delete(key)
		}
	}

	for (const [key, geometry] of mixedCache.entries()) {
		if (!geometry.userData.refCount) {
			logMix('disposing', geometry.name)
			geometry.dispose()
			mixedCache.delete(key)
		}
	}

	log('cached', geoCache.size)
	logMix('cached', mixedCache.size)
}

export function getCachedTextGeometry(text: string, size: number): TextGeometry | undefined {
	if (!fontCache.font) return undefined

	const key = `${text} (${size})`

	if (geoCache.has(key)) {
		const geometry = geoCache.get(key)!

		log('reusing', geometry.name)
		geometry.userData.refCount++

		return geometry as TextGeometry | undefined
	} else {
		const geometry = new TextGeometry(text, {
			font: fontCache.font,
			size,
			depth: 0,
			curveSegments: 3
		})

		log('creating', key)
		geometry.name = key
		geometry.userData.refCount = 1

		geoCache.set(key, geometry)

		return geometry
	}
}

export function getCachedMixedGeometry(text: string, size: number): BufferGeometry | undefined {
	if (!fontCache.font) return undefined
	const key = `${text} (${size})`

	if (mixedCache.has(key)) {
		const geometry = mixedCache.get(key)!
		logMix('reusing', key)
		geometry.userData.refCount++

		return geometry
	} else {
		const { segs } = parseMixedTextCached(text)
		const geometry = buildMixedGeometry(segs, size, fontCache.font)
		geometry.userData.refCount = 1
		geometry.name = key
		logMix('creating', key)

		mixedCache.set(key, geometry)

		return geometry
	}
}
