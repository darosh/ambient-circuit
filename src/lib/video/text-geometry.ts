// I call this font "Eo-Okyo"

import { Vector3, type BufferGeometry } from 'three/webgpu'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'

import { expandPathString } from '../rail-path'
import { Vec3 } from '../rail'

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
const pathCache = new Map<string, Vector3[][]>()

export function getTextGeometryCached(text: string, spacing: number) {
	if (!text) {
		return null
	}

	const key = `${text}_${spacing}`
	const cached = geometryCache.get(key)

	if (cached) return cached

	const geometry = getTextGeometry(text, spacing)

	geometryCache.set(key, geometry)

	return geometry
}

export function getTextPathsCached(text: string, spacing: number): Vector3[][] {
	if (!text) {
		return []
	}

	const key = `paths_${text}_${spacing}`
	const cached = pathCache.get(key)

	if (cached) return cached

	const paths = getTextPaths(text, spacing)

	pathCache.set(key, paths)

	return paths
}

export function clearTextGeometryCache(): void {
	for (const geometries of geometryCache.values()) {
		for (const geometry of geometries) {
			geometry.dispose()
		}
	}
	geometryCache.clear()
	pathCache.clear()
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
	spacing: number
): { points: Vector3[]; newCursorX: number } {
	const isNumber = /\d/.test(char)
	const isDash = char === '-'
	const isDot = char === '.'

	const n = isNumber ? Number.parseInt(char, 10) : char.charCodeAt(0) - 'A'.charCodeAt(0)

	const path = isNumber ? NUMBERS[n] : MISC[char] ? MISC[char] : LETTERS[n] || UNKNOWN

	// ---- Build points once ----

	let points: Vector3[]

	if (isDash) {
		points = DASH.map((p) => p.clone())
	} else {
		const expanded = expandPathString(path) as Vec3[]

		points = new Array(expanded.length + 1)
		points[0] = new Vector3(0, 0, 0)

		for (let i = 0; i < expanded.length; i++) {
			const e = expanded[i]
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

export function getTextPaths(text: string, spacing: number): Vector3[][] {
	let cursorX = 0

	return text.split('').map((char) => {
		const { points, newCursorX } = buildCharacterPoints(char, cursorX, spacing)
		cursorX = newCursorX
		return points
	})
}

export function getTextGeometry(text: string, spacing: number) {
	let cursorX = 0

	return text.split('').map((char) => {
		const { points, newCursorX } = buildCharacterPoints(char, cursorX, spacing)
		cursorX = newCursorX

		// ---- Create geometry once ----

		const geometry = new LineGeometry()
		geometry.setFromPoints(points)

		return geometry
	})
}
