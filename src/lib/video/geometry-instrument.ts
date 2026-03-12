import {
	type BufferGeometry,
	CurvePath,
	LineCurve3,
	QuadraticBezierCurve3,
	Vector3
} from 'three/webgpu'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { buildTubeGeometry } from './geometry-tube'
import { lerp } from 'three/src/math/MathUtils.js'
import type { ArrowInstrument } from '../core/instrument'
import { debug } from 'debug'

const log = debug('geo:ins')

// Geometry segment multipliers
const SPIRAL_SEGMENTS_PER_ROUND = 32
const CONE_SEGMENTS_PER_ROUND = 32
const ARROW_CIRCLE_SEGMENTS = 36
const TUBULAR_SEGMENTS_SPIRAL = 64
const TUBULAR_SEGMENTS_ARROW_CIRCLE = 12
const TUBULAR_SEGMENTS_POLY = 21
const TUBULAR_SEGMENTS_POLY_FILL = 11
const TUBULAR_SEGMENTS_ARROW_OTHER = 17
const TUBULAR_SEGMENTS_SUN_RAY = 16
const RADIAL_SEGMENTS = 8
const HEART_SEGMENTS = 36
const HEART_CLOSED_SEGMENTS = 12

export type InstrumentType =
	| 'poly'
	| 'star'
	| 'whirl'
	| 'cross'
	| 'heart'
	| 'spiral'
	| 'cone'
	| 'arrow'
	| 'sun'
	| 'eater'

export type ArrowKind = ArrowInstrument['kind']

export type InstrumentGeometryParams = {
	type: InstrumentType
	size: number
	width: number
	cornerRadius: number
	sides?: number
	rounds?: number
	counterCW?: boolean
	point?: 'forward' | 'backward'
	align?: 'center' | 'tip' | 'back'
	kind?: ArrowKind
	angle?: number
	rays?: number
	brightness?: number
	fill?: boolean
}

// Memoization cache: key = JSON.stringify(params), value = geometry
const geometryCache = new Map<string, BufferGeometry>()

function getCacheKey(params: InstrumentGeometryParams): string {
	return JSON.stringify(params)
}

/**
 * Create instrument main geometry with memoization
 */
export function createInstrumentGeometry(
	params: InstrumentGeometryParams,
	name: string = 'instrument'
): BufferGeometry {
	const key = getCacheKey(params)
	const cached = geometryCache.get(key)

	if (cached) {
		log('reusing', cached.name, 'as', name)
		cached.name = name
		cached.userData.refCount++

		return cached
	}

	const geometry = buildInstrumentGeometry(params)
	geometryCache.set(key, geometry)

	log('creating', name)
	geometry.name = name
	geometry.userData.refCount = 1

	return geometry
}

/**
 * Create fill geometry for poly instruments with memoization
 */
export function createInstrumentFillGeometry(
	sides: number,
	size: number,
	width: number,
	cornerRadius: number,
	name = 'instrument-fill'
): BufferGeometry | null {
	if (sides < 3) return null

	const key = JSON.stringify({ fill: true, sides, size, width, cornerRadius })
	const cached = geometryCache.get(key)

	if (cached) {
		log('reusing', cached.name, 'as', name)
		cached.name = name
		cached.userData.refCount++

		return cached
	}

	const geometry = buildPolyFillGeometry(sides, size, width, cornerRadius)

	if (!geometry) return null

	log('creating', name)
	geometry.name = name
	geometry.userData.refCount = 1

	geometryCache.set(key, geometry)
	return geometry
}

/**
 * Clear geometry cache (call on cleanup)
 */
export function clearInstrumentGeometryCache(): void {
	for (const [key, geometry] of geometryCache.entries()) {
		if (!geometry.userData.refCount) {
			log('disposing', geometry.name)
			geometry.dispose()
			geometryCache.delete(key)
		}
	}

	log('cached instruments', geometryCache.size)
}

export function disposeInstrumentGeometryCache(): void {
	for (const geometry of geometryCache.values()) {
		log('disposing only', geometry.name)
		geometry.dispose()
	}

	log('cached, but disposed instruments', geometryCache.size)
}

/**
 * Build instrument geometry (internal, not cached)
 */
function buildInstrumentGeometry(params: InstrumentGeometryParams): BufferGeometry {
	const { type, size, width } = params

	switch (type) {
		case 'poly':
		case 'star': {
			return buildPolyStarGeometry(params)
		}
		case 'whirl':
		case 'cross': {
			return buildWhirlCrossGeometry(params)
		}
		case 'heart': {
			return buildHeartGeometry(size, width)
		}
		case 'spiral': {
			return buildSpiralGeometry(params)
		}
		case 'cone': {
			return buildConeGeometry(params)
		}
		case 'arrow': {
			return buildArrowGeometry(params)
		}
		case 'sun': {
			return buildSunGeometry(params)
		}
		case 'eater': {
			return buildEaterGeometry(params)
		}
		default: {
			break
		}
	}

	// Fallback: simple circle
	const path = new CurvePath<Vector3>()
	const segments = 24
	const radius = size / 2
	for (let i = 0; i < segments; i++) {
		const angle1 = (i / segments) * Math.PI * 2
		const angle2 = ((i + 1) / segments) * Math.PI * 2
		const p1 = new Vector3(Math.cos(angle1) * radius, Math.sin(angle1) * radius, 0)
		const p2 = new Vector3(Math.cos(angle2) * radius, Math.sin(angle2) * radius, 0)
		path.add(new LineCurve3(p1, p2))
	}
	return buildTubeGeometry(
		path.curves,
		width / 2,
		RADIAL_SEGMENTS,
		segments / path.getLength(),
		true
	)
}

function buildPolyStarGeometry(params: InstrumentGeometryParams): BufferGeometry {
	const { type, size, width, cornerRadius, sides = 3 } = params
	const n = sides
	const cr = cornerRadius
	const path = new CurvePath<Vector3>()

	const adjustedSize = n === 2 ? size * 0.5 : size
	const outerR = adjustedSize / (1 + Math.cos(Math.PI / n))

	const verts: Vector3[] = []

	if (type === 'poly') {
		for (let i = 0; i < n; i++) {
			const angle = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n
			verts.push(new Vector3(Math.cos(angle) * outerR, Math.sin(angle) * outerR, 0))
		}
	} else {
		// star
		const innerR = outerR * 0.3
		for (let i = 0; i < n * 2; i++) {
			const angle = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2 + Math.PI / n
			const r = i % 2 === 0 ? outerR : innerR
			verts.push(new Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0))
		}
	}

	const vertCount = verts.length
	for (let i = 0; i < vertCount; i++) {
		const curr = verts[i]
		const next = verts[(i + 1) % vertCount]
		const prev = verts[(i - 1 + vertCount) % vertCount]

		const inDir = new Vector3().subVectors(curr, prev).normalize()
		const outDir = new Vector3().subVectors(next, curr).normalize()

		const sideLen = curr.distanceTo(next)
		const ecr = Math.min(cr, sideLen / 2)

		const arcStart = curr.clone().addScaledVector(inDir, -ecr)
		const arcEnd = curr.clone().addScaledVector(outDir, ecr)
		const nextArcStart = next.clone().addScaledVector(outDir, -ecr)

		if (ecr > 0) {
			path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
		}
		if (arcEnd.distanceToSquared(nextArcStart) > 1e-10) {
			path.add(new LineCurve3(arcEnd, nextArcStart))
		}
	}

	const tubularSegments =
		type === 'star'
			? (n > 2 ? 3 : 1) * 2 * TUBULAR_SEGMENTS_POLY
			: (n > 2 ? 3 : 1) * TUBULAR_SEGMENTS_POLY

	const closed = !(type === 'poly' && sides === 2)

	if (!closed) {
		path.curves = [path.curves[1]]
	}

	return buildTubeGeometry(
		path.curves,
		width / 2,
		RADIAL_SEGMENTS,
		tubularSegments / path.getLength(),
		closed
	)
}

function buildWhirlCrossGeometry(params: InstrumentGeometryParams): BufferGeometry {
	const { type, size, width, sides = 3 } = params
	const n = sides

	const adjustedSize = n === 2 ? size * 0.5 : size
	const outerR = adjustedSize / (1 + Math.cos(Math.PI / n))

	const geometries: BufferGeometry[] = []

	for (let i = 0; i < n; i++) {
		const angle = (i / n) * Math.PI * 2 - Math.PI / 2

		const center = new Vector3(0, 0, 0)
		const tip = new Vector3(Math.cos(angle) * outerR, Math.sin(angle) * outerR, 0)

		const angleSpread = n === 2 ? 2 * Math.PI : Math.PI / n
		const ctrlAngle = angle + angleSpread * (type === 'whirl' ? 1.8 : 0)
		const ctrl = new Vector3(
			Math.cos(ctrlAngle) * outerR * 0.5,
			Math.sin(ctrlAngle) * outerR * 0.5,
			0
		)

		// Each arm is a separate open tube — avoids shared degenerate center junction
		// cross: control point is collinear → straight line; whirl: curved arc
		const armCurve =
			type === 'cross'
				? new LineCurve3(center.clone(), tip)
				: new QuadraticBezierCurve3(center.clone(), ctrl, tip)

		geometries.push(
			buildTubeGeometry([armCurve], width / 2, RADIAL_SEGMENTS, TUBULAR_SEGMENTS_POLY, false, true)
		)
	}

	return mergeGeometries(geometries)
}

function buildHeartGeometry(size: number, width: number): BufferGeometry {
	const segments = HEART_SEGMENTS
	const scale = size * 0.5
	const path = new CurvePath<Vector3>()

	for (let i = 0; i < segments; i++) {
		const t = (i / segments) * Math.PI * 2
		const nextT = ((i + 1) / segments) * Math.PI * 2

		const sin3 = Math.pow(Math.sin(t), 3)
		const x = scale * sin3
		const y =
			(scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))) /
			16

		const nextSin3 = Math.pow(Math.sin(nextT), 3)
		const nextX = scale * nextSin3
		const nextY =
			(scale *
				(13 * Math.cos(nextT) -
					5 * Math.cos(2 * nextT) -
					2 * Math.cos(3 * nextT) -
					Math.cos(4 * nextT))) /
			16

		path.add(new LineCurve3(new Vector3(x, y, 0), new Vector3(nextX, nextY, 0)))
	}

	return buildTubeGeometry(path.curves, width / 2, RADIAL_SEGMENTS, HEART_CLOSED_SEGMENTS, true)
}

function buildSpiralGeometry(params: InstrumentGeometryParams): BufferGeometry {
	const { width, rounds = 3, counterCW = false } = params
	const path = new CurvePath<Vector3>()

	const innerR = width
	const outerR = width * 2 * rounds
	const segments = rounds * SPIRAL_SEGMENTS_PER_ROUND

	for (let i = 0; i < segments; i++) {
		const u = i / segments
		const t = Math.pow(u, 1.5)
		let theta = t * rounds * Math.PI * 2
		if (counterCW) theta = -theta

		const r = innerR + (outerR - innerR) * t
		const x = r * Math.cos(theta)
		const y = r * Math.sin(theta)

		const nextU = (i + 1) / segments
		const nextT = Math.pow(nextU, 1.5)
		let nextTheta = nextT * rounds * Math.PI * 2
		if (counterCW) nextTheta = -nextTheta

		const nextR = innerR + (outerR - innerR) * nextT
		const nextX = nextR * Math.cos(nextTheta)
		const nextY = nextR * Math.sin(nextTheta)

		path.add(new LineCurve3(new Vector3(x, y, 0), new Vector3(nextX, nextY, 0)))
	}

	return buildTubeGeometry(
		path.curves,
		width / 2,
		RADIAL_SEGMENTS,
		1,
		false,
		true
	)
}

function buildConeGeometry(params: InstrumentGeometryParams): BufferGeometry {
	const { width, rounds = 3, counterCW = false, point = 'forward', align = 'center' } = params
	const path = new CurvePath<Vector3>()

	const innerR = width
	const outerR = width * 1 * rounds
	const depth = width * 2 * rounds
	const segments = rounds * CONE_SEGMENTS_PER_ROUND

	let zOffset = -0.5
	if (align === 'tip') zOffset = 0
	else if (align === 'back') zOffset = -1

	const zScale = point === 'backward' ? -1 : 1

	for (let i = 0; i < segments; i++) {
		const u = i / segments
		const t = Math.pow(u, 1.5)
		let theta = t * rounds * Math.PI * 2
		if (counterCW) theta = -theta

		const r = innerR + (outerR - innerR) * t
		const z = depth * zScale * (t + zOffset)

		const x = r * Math.cos(theta)
		const y = r * Math.sin(theta)

		const nextU = (i + 1) / segments
		const nextT = Math.pow(nextU, 1.5)
		let nextTheta = nextT * rounds * Math.PI * 2
		if (counterCW) nextTheta = -nextTheta

		const nextR = innerR + (outerR - innerR) * nextT
		const nextZ = depth * zScale * (nextT + zOffset)

		const nextX = nextR * Math.cos(nextTheta)
		const nextY = nextR * Math.sin(nextTheta)

		path.add(new LineCurve3(new Vector3(x, y, z), new Vector3(nextX, nextY, nextZ)))
	}

	return buildTubeGeometry(
		path.curves,
		width / 2,
		RADIAL_SEGMENTS,
		1,
		false,
		true
	)
}

function recPath(
	radius: number,
	path: CurvePath<Vector3>,
	zOffset = 0,
	segments = ARROW_CIRCLE_SEGMENTS
) {
	for (let i = 0; i < segments; i++) {
		const angle1 = (i / segments) * Math.PI * 2
		const angle2 = ((i + 1) / segments) * Math.PI * 2
		const p1 = new Vector3(
			0,
			Math.cos(angle1) * radius,
			Math.sin(angle1) * radius + zOffset * radius
		)
		const p2 = new Vector3(
			0,
			Math.cos(angle2) * radius,
			Math.sin(angle2) * radius + zOffset * radius
		)
		path.add(new LineCurve3(p1, p2))
	}
}

function playGeometry(
	height: number,
	zScale: number,
	length: number,
	zOffset: number,
	cr: number,
	path: CurvePath<Vector3>
) {
	const halfBase = height / Math.sqrt(3)
	const verts = [
		new Vector3(0, 0, zScale * (height + length * zOffset)),
		new Vector3(0, halfBase, zScale * (length * zOffset)),
		new Vector3(0, -halfBase, zScale * (length * zOffset))
	]

	for (let i = 0; i < 3; i++) {
		const curr = verts[i]
		const next = verts[(i + 1) % 3]
		const prev = verts[(i - 1 + 3) % 3]

		const inDir = new Vector3().subVectors(curr, prev).normalize()
		const outDir = new Vector3().subVectors(next, curr).normalize()

		const arcStart = curr.clone().addScaledVector(inDir, -cr)
		const arcEnd = curr.clone().addScaledVector(outDir, cr)
		const nextArcStart = next.clone().addScaledVector(outDir, -cr)

		if (cr > 0) {
			path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
		}
		path.add(new LineCurve3(arcEnd, nextArcStart))
	}
}

function buildArrowGeometry(params: InstrumentGeometryParams): BufferGeometry {
	const {
		size,
		width,
		cornerRadius,
		kind = 'plain',
		angle = Math.PI / 3,
		point = 'forward',
		align = 'center'
	} = params
	const cr = cornerRadius
	const path = new CurvePath<Vector3>()
	let secondaryPath: CurvePath<Vector3> | null = null
	let tertiaryPath: CurvePath<Vector3> | null = null

	const length = size * 1

	const zOffset =
		kind === 'rec' || kind === 'dot' || kind === 'ring' || kind === 'point'
			? align === 'tip'
				? 1
				: align === 'back'
					? -1
					: 0
			: align === 'tip'
				? 0
				: align === 'back'
					? -1
					: -0.5
	const zScale = point === 'backward' ? -1 : 1

	switch (kind) {
		case 'plain':
		case 'step': {
			const halfAngle = angle / 2
			const tipY1 = Math.sin(halfAngle) * length
			const tipY2 = -tipY1
			const tipZ = Math.cos(halfAngle) * length

			const origin = new Vector3(0, 0, -zScale * (length * zOffset))
			const tip1 = new Vector3(0, tipY1, -zScale * (tipZ + length * zOffset))
			const tip2 = new Vector3(0, tipY2, -zScale * (tipZ + length * zOffset))

			path.add(new LineCurve3(tip1, origin))
			path.add(new LineCurve3(origin, tip2))

			break
		}
		case 'tri': {
			playGeometry(width * 4, zScale, length, zOffset / Math.sqrt(6), cr / 2, path)
			break
		}
		case 'trip': {
			playGeometry(width * 3, zScale, length, zOffset / Math.sqrt(8), cr / 3, path)
			break
		}
		case 'play':
		case 'fwd': {
			playGeometry(length, zScale, length, zOffset, cr, path)
			break
		}
		case 'dot': {
			const radius = width / 2
			recPath(radius, path, zOffset, 12)

			break
		}
		case 'point': {
			recPath(width, path, zOffset, 16)

			break
		}
		case 'ring': {
			const radius = width * 2
			recPath(radius, path, zOffset, 24)

			break
		}
		case 'rec': {
			const radius = length / 2
			recPath(radius, path, zOffset)

			break
		}
		case 'stop': {
			const halfSize = length / 2
			const verts = [
				new Vector3(0, halfSize, halfSize),
				new Vector3(0, halfSize, -halfSize),
				new Vector3(0, -halfSize, -halfSize),
				new Vector3(0, -halfSize, halfSize)
			]
			for (let i = 0; i < 4; i++) {
				const curr = verts[i]
				const next = verts[(i + 1) % 4]
				const prev = verts[(i - 1 + 4) % 4]
				const inDir = new Vector3().subVectors(curr, prev).normalize()
				const outDir = new Vector3().subVectors(next, curr).normalize()
				const arcStart = curr.clone().addScaledVector(inDir, -cr)
				const arcEnd = curr.clone().addScaledVector(outDir, cr)
				const nextArcStart = next.clone().addScaledVector(outDir, -cr)
				if (cr > 0) {
					path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
				}
				path.add(new LineCurve3(arcEnd, nextArcStart))
			}

			break
		}
		case 'repro':
		case 'muted': {
			// Speaker icon: rectangle (back) + trapezoid (front cone)
			const h = length // total height
			const rectW = h * 0.3 // rectangle width (narrower part)
			const rectH = h * 0.4 // rectangle height
			const trapW = h * 0.6 // trapezoid depth
			const trapWide = h * 1.15 // trapezoid wide side

			const rL = -rectW / 2 - trapW / 2
			const rR = rectW / 2 - trapW / 2

			// Closed outline: rectangle back + trapezoid cone as one shape
			// Path: rect-top-left → rect-bottom-left → rect-bottom-right →
			//        trap-bottom-right → trap-bottom-far → trap-top-far → trap-top-right →
			//        rect-top-right → close
			const trapR = rectW / 2 - trapW / 2 + trapW
			const verts = [
				new Vector3(0, rectH / 2, zScale * rL), // rect top-left
				new Vector3(0, -rectH / 2, zScale * rL), // rect bottom-left
				new Vector3(0, -rectH / 2, zScale * rR), // rect bottom-right
				new Vector3(0, -trapWide / 2, zScale * trapR), // trap bottom-wide
				new Vector3(0, trapWide / 2, zScale * trapR), // trap top-wide
				new Vector3(0, rectH / 2, zScale * rR) // rect top-right (= trap top-narrow)
			]

			for (let i = 0; i < verts.length; i++) {
				const curr = verts[i]
				const next = verts[(i + 1) % verts.length]
				const prev = verts[(i - 1 + verts.length) % verts.length]

				const inDir = new Vector3().subVectors(curr, prev).normalize()
				const outDir = new Vector3().subVectors(next, curr).normalize()

				const _cr = i === 3 || i === 4 ? cr : cr / 2

				const arcStart = curr.clone().addScaledVector(inDir, -_cr)
				const arcEnd = curr.clone().addScaledVector(outDir, _cr)
				const nextArcStart = next.clone().addScaledVector(outDir, -cr)

				if (cr > 0) {
					path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
				}

				path.add(new LineCurve3(arcEnd, nextArcStart))
			}

			// Inner dividing line between rect and trapezoid
			secondaryPath = new CurvePath<Vector3>()
			secondaryPath.add(
				new LineCurve3(
					new Vector3(0, rectH / 2 - width * 0.1, zScale * rR * 0.8),
					new Vector3(0, -rectH / 2 - width * 0.1, zScale * rR * 0.8)
				)
			)

			// Mute stroke: diagonal line across the icon (separate open path)
			if (kind === 'muted') {
				tertiaryPath = new CurvePath<Vector3>()
				const ext = h * 0.2
				tertiaryPath.add(
					new LineCurve3(
						new Vector3(0, -trapWide / 2, zScale * (trapR + ext)),
						new Vector3(0, trapWide / 2, zScale * (rL + ext))
					)
				)
			}

			break
		}
		case 'pause': {
			const spacing = width * 2.5
			const height = length
			const line1Start = new Vector3(0, -height / 2, -spacing / 2)
			const line1End = new Vector3(0, height / 2, -spacing / 2)
			const line2Start = new Vector3(0, -height / 2, spacing / 2)
			const line2End = new Vector3(0, height / 2, spacing / 2)
			path.add(new LineCurve3(line1Start, line1End))
			secondaryPath = new CurvePath<Vector3>()
			secondaryPath.add(new LineCurve3(line2Start, line2End))

			break
		}
		// No default
	}

	if (kind === 'fwd' || kind === 'step') {
		const halfAngle = angle / 2
		const tipY1 = Math.sin(halfAngle) * length
		const tipY2 = -tipY1
		const origin1 = new Vector3(0, tipY1, -zScale * (length * zOffset))
		const origin2 = new Vector3(0, tipY2, -zScale * (length * zOffset))

		secondaryPath = new CurvePath<Vector3>()
		secondaryPath.add(new LineCurve3(origin1, origin2))
	}

	const closed = !['plain', 'step', 'pause'].includes(kind)
	const tubularSegments =
		kind === 'rec'
			? TUBULAR_SEGMENTS_ARROW_CIRCLE
			: kind === 'dot'
				? 1
				: kind === 'point'
					? 1
					: kind === 'ring'
						? 1
						: kind === 'play' || kind === 'fwd'
							? 3 * TUBULAR_SEGMENTS_POLY
							: kind === 'stop'
								? 4 * TUBULAR_SEGMENTS_POLY
								: kind === 'repro' || kind === 'muted'
									? 6 * TUBULAR_SEGMENTS_POLY
									: TUBULAR_SEGMENTS_ARROW_OTHER

	const straightSecondary = kind === 'repro' || kind === 'muted' || 'fwd'

	const r = width / 2
	const mainGeometry = buildTubeGeometry(
		path.curves,
		r,
		RADIAL_SEGMENTS,
		tubularSegments / path.getLength(),
		closed
	)

	const geometries = [mainGeometry]

	if (secondaryPath) {
		const secSegs = straightSecondary ? TUBULAR_SEGMENTS_ARROW_OTHER : tubularSegments
		geometries.push(
			buildTubeGeometry(
				secondaryPath.curves,
				r,
				RADIAL_SEGMENTS,
				secSegs / secondaryPath.getLength(),
				false
			)
		)
	}

	if (tertiaryPath) {
		geometries.push(
			buildTubeGeometry(
				tertiaryPath.curves,
				r,
				RADIAL_SEGMENTS,
				TUBULAR_SEGMENTS_ARROW_OTHER / tertiaryPath.getLength(),
				false
			)
		)
	}

	return geometries.length > 1 ? mergeGeometries(geometries) : mainGeometry
}

function buildSunGeometry(params: InstrumentGeometryParams): BufferGeometry {
	const { size, width, cornerRadius, rays = 6, brightness = 2 } = params
	const cr = cornerRadius
	const path = new CurvePath<Vector3>()
	const sunRayPaths: CurvePath<Vector3>[] = []

	// Inner circle: 12-sided polygon
	const n = 12
	const adjustedSize = size
	const outerR = adjustedSize / (1 + Math.cos(Math.PI / n))
	const coef = lerp(2.5, 2, (Math.min(n, 12) - 3) / 9)
	const innerR = outerR - coef * width

	const verts: Vector3[] = []
	for (let i = 0; i < n; i++) {
		const angle = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n
		verts.push(new Vector3(Math.cos(angle) * innerR, Math.sin(angle) * innerR, 0))
	}

	for (let i = 0; i < n; i++) {
		const curr = verts[i]
		const next = verts[(i + 1) % n]
		const prev = verts[(i - 1 + n) % n]

		const inDir = new Vector3().subVectors(curr, prev).normalize()
		const outDir = new Vector3().subVectors(next, curr).normalize()

		const sideLen = curr.distanceTo(next)
		const ecr = Math.min(cr, sideLen / 2)

		const arcStart = curr.clone().addScaledVector(inDir, -ecr)
		const arcEnd = curr.clone().addScaledVector(outDir, ecr)
		const nextArcStart = next.clone().addScaledVector(outDir, -ecr)

		if (ecr > 0) {
			path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
		}
		if (arcEnd.distanceToSquared(nextArcStart) > 1e-10) {
			path.add(new LineCurve3(arcEnd, nextArcStart))
		}
	}

	// Rays
	const rayStart = innerR + width
	const rayEnd = rayStart + width * brightness

	if (brightness && rays) {
		for (let i = 0; i < rays; i++) {
			const angle = (i / rays) * Math.PI * 2 - Math.PI / 2
			const start = new Vector3(Math.cos(angle) * rayStart, Math.sin(angle) * rayStart, 0)
			const end = new Vector3(Math.cos(angle) * rayEnd, Math.sin(angle) * rayEnd, 0)
			const rayPath = new CurvePath<Vector3>()
			rayPath.add(new LineCurve3(start, end))
			sunRayPaths.push(rayPath)
		}
	}

	const mainGeometry = buildTubeGeometry(path.curves, width / 2, RADIAL_SEGMENTS, 1, true)

	if (sunRayPaths.length > 0) {
		const geometries: BufferGeometry[] = [mainGeometry]
		for (const rayPath of sunRayPaths) {
			geometries.push(
				buildTubeGeometry(
					rayPath.curves,
					width / 2,
					RADIAL_SEGMENTS,
					TUBULAR_SEGMENTS_SUN_RAY,
					false,
					true
				)
			)
		}
		return mergeGeometries(geometries)
	}

	return mainGeometry
}

function buildEaterGeometry(params: InstrumentGeometryParams): BufferGeometry {
	const { size, width, cornerRadius, angle = 60 } = params
	const radius = size / 2
	const cr = cornerRadius
	const path = new CurvePath<Vector3>()

	// Convert degrees to radians
	const angleRad = (angle * Math.PI) / 180
	const mouthHalfAngle = angleRad / 2

	// Arc from mouthStart to mouthEnd (full circle minus gap)
	const arcStartAngle = -Math.PI / 2 + mouthHalfAngle
	const arcEndAngle = arcStartAngle + (Math.PI * 2 - angleRad)

	// Derive density from poly pattern
	// Poly uses Math.ceil(2 * Math.PI * radius / targetSegmentLength)
	// For matching poly appearance, calculate segments from angle
	const fullCircleSegments = 12 // matches poly sides for smooth circle
	const arcAngle = Math.PI * 2 - angleRad
	const n = Math.max(3, Math.round((arcAngle / (Math.PI * 2)) * fullCircleSegments))

	const verts: Vector3[] = []

	// Arc vertices - number derived from arc angle proportion
	for (let i = 0; i < n; i++) {
		const t = i / (n - 1)
		const a = arcStartAngle + (arcEndAngle - arcStartAngle) * t
		verts.push(new Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
	}

	// Add center point to close the pizza slice
	verts.push(new Vector3(0, 0, 0))

	// Follow poly pattern: loop through all vertices with modulo wrapping
	const vertCount = verts.length
	for (let i = 0; i < vertCount; i++) {
		const curr = verts[i]
		const next = verts[(i + 1) % vertCount]
		const prev = verts[(i - 1 + vertCount) % vertCount]

		const inDir = new Vector3().subVectors(curr, prev).normalize()
		const outDir = new Vector3().subVectors(next, curr).normalize()

		const sideLen = curr.distanceTo(next)
		const ecr = Math.min(cr, sideLen / 2)

		const arcStart = curr.clone().addScaledVector(inDir, -ecr)
		const arcEnd = curr.clone().addScaledVector(outDir, ecr)
		const nextArcStart = next.clone().addScaledVector(outDir, -ecr)

		if (ecr > 0) {
			path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
		}
		if (arcEnd.distanceToSquared(nextArcStart) > 1e-10) {
			path.add(new LineCurve3(arcEnd, nextArcStart))
		}
	}

	return buildTubeGeometry(
		path.curves,
		width / 2,
		RADIAL_SEGMENTS,
		(n * TUBULAR_SEGMENTS_POLY) / path.getLength(),
		true
	)
}

function buildPolyFillGeometry(
	sides: number,
	size: number,
	width: number,
	cornerRadius: number
): BufferGeometry | null {
	const n = sides > 4 ? 12 : sides
	const cr = cornerRadius
	const path = new CurvePath<Vector3>()

	const adjustedSize = n === 2 ? size * 0.5 : size
	const outerR = adjustedSize / (1 + Math.cos(Math.PI / n))
	const coef = n === 3 ? 3 : lerp(2.5, 2, (Math.min(n, 12) - 3) / 9)
	const innerR = outerR - coef * width

	if (innerR <= 0) return null

	const verts: Vector3[] = []

	for (let i = 0; i < n; i++) {
		const angle = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n
		verts.push(new Vector3(Math.cos(angle) * innerR, Math.sin(angle) * innerR, 0))
	}

	for (let i = 0; i < n; i++) {
		const curr = verts[i]
		const next = verts[(i + 1) % n]
		const prev = verts[(i - 1 + n) % n]

		const inDir = new Vector3().subVectors(curr, prev).normalize()
		const outDir = new Vector3().subVectors(next, curr).normalize()

		const sideLen = curr.distanceTo(next)
		const ecr = Math.min(cr, sideLen / 2)

		const arcStart = curr.clone().addScaledVector(inDir, -ecr)
		const arcEnd = curr.clone().addScaledVector(outDir, ecr)
		const nextArcStart = next.clone().addScaledVector(outDir, -ecr)

		if (ecr > 0) {
			path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
		}
		if (arcEnd.distanceToSquared(nextArcStart) > 1e-10) {
			path.add(new LineCurve3(arcEnd, nextArcStart))
		}
	}

	return buildTubeGeometry(
		path.curves,
		width / 2,
		RADIAL_SEGMENTS,
		((n > 2 ? 3 : 1) * TUBULAR_SEGMENTS_POLY_FILL) / path.getLength(),
		true
	)
}
