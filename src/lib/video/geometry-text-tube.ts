// I call this font "Eo-Okyo"

import { LineCurve3, Vector3, type BufferGeometry } from 'three/webgpu'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { expandPathString } from '../core/rail-path'
import { Vec3 } from '../core/rail'
import { buildTubeGeometry } from './geometry-tube'
import debug from 'debug'

const log = debug('geo:tube')

const NUMBERS = [
	'uu ur dr dd ld lu',
	'uu',
	'ur dr dddll rr',
	'ur dr ld rd ld ul',
	'dd r1.5 dd',
	'll dd rr dd ld lu',
	'lu dl dd rd ru lu ld',
	'r ddl',
	'ru rd lldd rd ru lluu',
	'ld ul ur rd dd ld lu'
]

const LETTERS = [
	'uu rr uul ddl rr dd',
	'uuuuuu drrr d dlll drrr d dlll',
	'ul dl dd dr ur',
	'uuuu drr dd dll',
	'l d r l d r',
	'l d r l d',
	'ul dl dd dr ur u l',
	'dd u r d uu',
	'u',
	'dr ur uuu',
	'ld u dd u rd',
	'dd r',
	'uuu dr ur ddd',
	'uu rdd uu',
	'uu ur dr dd ld lu',
	'uuuuu rrd d lld',
	'dl uull uuuu uurr ddrr dddd ld rd uull',
	'uuuu drr dll ddrr',
	'lu ld rrdd ld lu',
	'r dddd uuuu r',
	'ddd dr ur uuu',
	'dddr uuur',
	'dddddr uur ddr uuuuur',
	'ddddrr uul ddl uuuurr',
	'ddr uur ddl dd',
	'r ddl r'
]

const LETTERS_CONNECTED = [
	'uu rr uul ddl rr dd',
	'uuuuuu drrr d dlll drrr d dlll',
	'ul uu ur dr ul dl dd dr ur dl', // 'ul dl dd dr ur'
	'uuuu drr dd dll',
	'u r l u r l dd r', // 'l d r l d r'
	'l d r l d',
	'ul dl dd dr ur u l',
	'dd u r d uu',
	'u d', // 'u'
	'dr ur uuu',
	'ld u dd u rd',
	'dd r',
	'uuu dr ur ddd',
	'uu rdd uu dd', // 'uu rdd uu'
	'uu ur dr dd ld lu',
	'uuuuu rrd d lld',
	'dl uull uuuu uurr ddrr dddd ld rd uull',
	'uuuu drr dll ddrr',
	'lu ld rrdd ld lu',
	'uuuu l rr l dddd', // 'r dddd uuuu r'
	'ul uuu ddd dr ur uuu ddd dl', // 'ddd dr ur uuu'
	'dddr uuur',
	'dddddr uur ddr uuuuur',
	'ddddrr uul ddl uuuurr',
	'ddr uur ddl dd',
	'r ddl r'
]

const LIGATURES = {
	NT: ['uu rdd uu', 'r0.5 dddd uuuu r'],
	IT: ['u', 'r0.5 dddd uuuu r']
}

const DOT = 'dr dl ul ur uuuuuuuuu'
const ASTER =
	'd u u d l r r l d0.7l0.7 u0.7r0.7 d0.7r0.7 u0.7l0.7 u0.7r0.7 d0.7l0.7 u0.7l0.7 d0.7r0.7'
const UNKNOWN = 'r'
const DASH = [new Vector3(0, 0, 0), new Vector3(0.4, 0, 0)]
const HASH = `d u l r u l r u d r u d r l d r l d u l`
const PLUS = `l r u d r l d u`
const SLASH = `uuuurr`
const AMP = `lllllddddd uuuullll uuuuuurrrrrr lluu ddll rrrrrrrrrdddddddddd`
const AT = `lu ld rd ru rrr lllluuuu lllldddd rrrrdddd rruu`

const MISC: Record<string, string> = {
	'.': DOT,
	'*': ASTER,
	'#': HASH,
	'+': PLUS,
	'/': SLASH,
	'&': AMP,
	'@': AT
}

const geometryCache = new Map<string, BufferGeometry[]>()
const tubeCache = new Map<string, BufferGeometry>()

export function getTextGeometryCached(text: string, spacing: number) {
	if (!text) {
		return null
	}

	const key = `${text} (${spacing})`
	const cached = geometryCache.get(key)

	if (cached) return cached

	const geometry = getTextGeometry(text, spacing)

	geometryCache.set(key, geometry)

	return geometry
}

export function clearTubeTextCache(): void {
	for (const [key, geometry] of tubeCache.entries()) {
		if (geometry && !geometry?.userData?.refCount) {
			log('disposing', geometry.name)
			geometry.dispose()
			tubeCache.delete(key)
		}
	}

	log('cached', tubeCache.size)
}

export function disposeTubeTextCache(): void {
	for (const geometry of tubeCache.values()) {
		log('disposing only', geometry.name)
		geometry.dispose()
	}

	log('cached, but disposed', tubeCache.size)
}

export function getCachedTubeGeometry(
	text: string,
	spacing: number,
	width: number
): BufferGeometry {
	if (!text) {
		text = '<UNDEFINED>'
	}

	const key = `${text} (${spacing}/${width})`

	if (tubeCache.has(key)) {
		const cached = tubeCache.get(key)!

		cached.name = key
		cached.userData.refCount++
		log('reusing', cached.name)

		return cached
	} else {
		const geometry = getTubeGeometry(text, spacing, width)

		geometry.userData.refCount = 1
		geometry.name = key
		log('creating', key)

		tubeCache.set(key, geometry)

		return geometry
	}
}

export function getTubeGeometry(text: string, spacing: number, width: number): BufferGeometry {
	const paths = getTextPaths(text, spacing)
	const parts = paths
		.filter((path) => path.length > 1)
		.map((path) => {
			const curves: LineCurve3[] = Array.from({ length: path.length - 1 })
			for (let i = 0; i < path.length - 1; i++) {
				curves[i] = new LineCurve3(path[i], path[i + 1])
			}
			return buildTubeGeometry(curves, width / 50, 3, 1, false)
		})

	return parts.length > 1 ? (mergeGeometries(parts) ?? parts[0]) : parts[0]
}

type BoundingBox = {
	min: Vector3
	max: Vector3
}

function getBoundingBox(points: Vector3[]): BoundingBox {
	const min = new Vector3(Infinity, Infinity, Infinity)
	const max = new Vector3(-Infinity, -Infinity, -Infinity)

	for (const p of points) {
		if (p.x < min.x) min.x = p.x
		if (p.y < min.y) min.y = p.y
		if (p.z < min.z) min.z = p.z

		if (p.x > max.x) max.x = p.x
		if (p.y > max.y) max.y = p.y
		if (p.z > max.z) max.z = p.z
	}

	return { min, max }
}

function buildCharacterPoints(
	char: string,
	cursorX: number,
	spacing: number,
	connected = false,
	pathOverride?: string
): { points: Vector3[]; newCursorX: number } {
	if (char === ' ') {
		return { points: [], newCursorX: cursorX + 0.3 + spacing * 0.15 }
	}

	const isNumber = /\d/.test(char)
	const isDash = char === '-'
	const isDot = char === '.'

	const n = isNumber
		? Number.parseInt(char, 10)
		: (char.codePointAt(0) ?? 0) - ('A'.codePointAt(0) ?? 0)

	const letterTable = connected ? LETTERS_CONNECTED : LETTERS
	const path = pathOverride ?? (isNumber ? NUMBERS[n] : (MISC[char] ?? letterTable[n] ?? UNKNOWN))

	// ---- Build points once ----

	let points: Vector3[]

	if (isDash) {
		points = DASH.map((p) => p.clone())
	} else {
		const expanded = expandPathString(path) as Vec3[]

		points = Array.from({ length: expanded.length + 1 })
		points[0] = new Vector3(0, 0, 0)

		for (const [i, e] of expanded.entries()) {
			points[i + 1] = new Vector3(e[0], e[1], e[2])
		}
	}

	// ---- Normalize ----

	const { min, max } = getBoundingBox(points)

	// Remove trailing point for dot
	if (isDot) {
		points.pop()
	}

	const height = max.y - min.y || 1
	const scale = isDash ? 1 : 1 / height

	const shift = isDash
		? new Vector3(0, -0.5, 0)
		: isNumber && n === 1
			? new Vector3(-0.2, 0, 0)
			: min

	for (const p of points) {
		p.sub(shift)
		p.multiplyScalar(scale)
		p.x += cursorX
	}

	// ---- Final bounding box (no geometry compute) ----

	const finalBox = getBoundingBox(points)

	const newCursorX = finalBox.max.x + spacing * (isDash ? 0.15 : isNumber && n === 1 ? 0.2 : 0.15)

	return { points, newCursorX }
}

export function getTextPaths(text: string, spacing: number, connected = false): Vector3[][] {
	const chars = [...text]
	const overrides: (string | undefined)[] = Array.from({ length: chars.length })

	if (connected) {
		for (const [i, char] of chars.entries()) {
			if (i >= chars.length - 1) break
			const pair = char + chars[i + 1]
			const lig = LIGATURES[pair as keyof typeof LIGATURES]
			if (lig) {
				overrides[i] = lig[0]
				overrides[i + 1] = lig[1]
			}
		}
	}

	let cursorX = 0

	return chars.map((char, i) => {
		const { points, newCursorX } = buildCharacterPoints(
			char,
			cursorX,
			spacing,
			connected,
			overrides[i]
		)
		cursorX = newCursorX
		return points
	})
}

export function getTextRailNodes(
	text: string,
	spacing: number,
	connected = false
): [number, number, number][][] {
	if (!connected) {
		return getTextPaths(text, spacing, false)
			.filter((pts) => pts.length > 0)
			.map((pts) => pts.map((p) => [p.x, p.y, p.z] as [number, number, number]))
	}

	// Split into words, merge letters within each word into one path
	const paths = getTextPaths(text, spacing, true)
	const chars = [...text]
	const wordPaths: [number, number, number][][][] = []
	let current: [number, number, number][][] = []

	for (const [i, char] of chars.entries()) {
		if (char === ' ') {
			if (current.length > 0) wordPaths.push(current)
			current = []
		} else if (paths[i].length > 0) {
			current.push(paths[i].map((p) => [p.x, p.y, p.z] as [number, number, number]))
		}
	}
	if (current.length > 0) wordPaths.push(current)

	return wordPaths.map((word) => word.flat())
}

export function getTextGeometry(text: string, spacing: number) {
	let cursorX = 0

	return [...text].map((char) => {
		const { points, newCursorX } = buildCharacterPoints(char, cursorX, spacing)
		cursorX = newCursorX

		// ---- Create geometry once ----

		const geometry = new LineGeometry()
		geometry.setFromPoints(points)

		return geometry
	})
}
