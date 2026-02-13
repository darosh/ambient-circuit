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

export function getTextGeometry(text: string, spacing: number) {
	let x = 0

	return text.split('').map((t) => {
		const isNumber = /[0-9]/.test(t)
		const isDash = t === '-'
		const isDot = t === '.'

		const n = isNumber ? Number.parseInt(t, 10) : t.charCodeAt(0) - 'A'.charCodeAt(0)
		const path = isNumber ? NUMBERS[n] : MISC[t] ? MISC[t] : LETTERS[n] || UNKNOWN

		const points = isDash
			? DASH.map((x) => x.clone())
			: [new Vector3(0, 0, 0), ...(<Vec3[]>expandPathString(path)).map((x) => new Vector3(...x))]

		const geometry = new LineGeometry()
		geometry.setFromPoints(points)
		geometry.computeBoundingBox()
		const m = isDash ? 1 : 1 / (geometry.boundingBox!.max.y - geometry.boundingBox!.min.y || 1)

		const shift = isDash
			? new Vector3(0, -0.5, 0)
			: isNumber && n === 1
				? new Vector3(-0.2, 0, 0)
				: geometry.boundingBox!.min

		const normalized = points.map((p) => {
			return p
				.sub(shift)
				.multiplyScalar(m)
				.add(new Vector3(x, 0, 0))
		})

		geometry.setFromPoints(normalized)
		geometry.computeBoundingBox()

		x = geometry.boundingBox!.max.x + spacing * (isDash ? 0.15 : isNumber && n === 1 ? 0.2 : 0.15)

		if (isDot) {
			points.pop()
			geometry.setFromPoints(points)
			geometry.computeBoundingBox()
		}

		return geometry
	})
}
