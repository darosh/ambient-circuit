import {
	type BufferGeometry,
	CurvePath,
	LineCurve3,
	QuadraticBezierCurve3,
	TubeGeometry,
	Vector3
} from 'three/webgpu'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { buildTubeGeometry } from './tube-geometry'
import { lerp } from 'three/src/math/MathUtils.js'

// Geometry segment multipliers
const SPIRAL_SEGMENTS_PER_ROUND = 32
const CONE_SEGMENTS_PER_ROUND = 32
const ARROW_CIRCLE_SEGMENTS = 36
const TUBULAR_SEGMENTS_SPIRAL = 64
const TUBULAR_SEGMENTS_ARROW_CIRCLE = 72
const TUBULAR_SEGMENTS_POLY = 21
const TUBULAR_SEGMENTS_ARROW_OTHER = 16
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

export type ArrowKind = 'plain' | 'play' | 'fwd' | 'rec' | 'stop' | 'step' | 'pause'

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
export function createInstrumentGeometry(params: InstrumentGeometryParams): BufferGeometry {
	const key = getCacheKey(params)
	const cached = geometryCache.get(key)
	if (cached) return cached

	const geometry = buildInstrumentGeometry(params)
	geometryCache.set(key, geometry)
	return geometry
}

/**
 * Create fill geometry for poly instruments with memoization
 */
export function createInstrumentFillGeometry(
	sides: number,
	size: number,
	width: number,
	cornerRadius: number
): BufferGeometry | null {
	if (sides < 3) return null

	const key = JSON.stringify({ fill: true, sides, size, width, cornerRadius })
	const cached = geometryCache.get(key)
	if (cached) return cached

	const geometry = buildPolyFillGeometry(sides, size, width, cornerRadius)
	if (!geometry) return null

	geometryCache.set(key, geometry)
	return geometry
}

/**
 * Clear geometry cache (call on cleanup)
 */
export function clearInstrumentGeometryCache(): void {
	for (const geometry of geometryCache.values()) {
		geometry.dispose()
	}
	geometryCache.clear()
}

/**
 * Build instrument geometry (internal, not cached)
 */
function buildInstrumentGeometry(params: InstrumentGeometryParams): BufferGeometry {
	const { type, size, width } = params

	if (type === 'poly' || type === 'star') {
		return buildPolyStarGeometry(params)
	} else if (type === 'whirl' || type === 'cross') {
		return buildWhirlCrossGeometry(params)
	} else if (type === 'heart') {
		return buildHeartGeometry(size, width)
	} else if (type === 'spiral') {
		return buildSpiralGeometry(params)
	} else if (type === 'cone') {
		return buildConeGeometry(params)
	} else if (type === 'arrow') {
		return buildArrowGeometry(params)
	} else if (type === 'sun') {
		return buildSunGeometry(params)
	} else if (type === 'eater') {
		return buildEaterGeometry(params)
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
	return new TubeGeometry(
		path as unknown as import('three').Curve<Vector3>,
		segments,
		width / 2,
		RADIAL_SEGMENTS,
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

		const arcStart = curr.clone().addScaledVector(inDir, -cr)
		const arcEnd = curr.clone().addScaledVector(outDir, cr)
		const nextArcStart = next.clone().addScaledVector(outDir, -cr)

		if (cr > 0) {
			path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
		}
		path.add(new LineCurve3(arcEnd, nextArcStart))
	}

	const tubularSegments =
		type === 'star' ? n * 2 * TUBULAR_SEGMENTS_POLY : n * TUBULAR_SEGMENTS_POLY

	return new TubeGeometry(
		path as unknown as import('three').Curve<Vector3>,
		tubularSegments,
		width / 2,
		RADIAL_SEGMENTS,
		true
	)
}

function buildWhirlCrossGeometry(params: InstrumentGeometryParams): BufferGeometry {
	const { type, size, width, sides = 3 } = params
	const n = sides
	const path = new CurvePath<Vector3>()

	const adjustedSize = n === 2 ? size * 0.5 : size
	const outerR = adjustedSize / (1 + Math.cos(Math.PI / n))

	for (let i = 0; i < n; i++) {
		const angle = (i / n) * Math.PI * 2 - Math.PI / 2

		const center = new Vector3(0, 0, 0)
		const tip = new Vector3(Math.cos(angle) * outerR, Math.sin(angle) * outerR, 0)

		const angleSpread = n === 2 ? 2 * Math.PI : Math.PI / n
		const leftAngle = angle - angleSpread * (type === 'whirl' ? -1.8 : 0)
		const rightAngle = angle + angleSpread * (type === 'whirl' ? 1.8 : 0)

		const leftCtrl = new Vector3(
			Math.cos(leftAngle) * outerR * 0.5,
			Math.sin(leftAngle) * outerR * 0.5,
			0
		)
		const rightCtrl = new Vector3(
			Math.cos(rightAngle) * outerR * 0.5,
			Math.sin(rightAngle) * outerR * 0.5,
			0
		)

		path.add(new QuadraticBezierCurve3(center, leftCtrl, tip))
		path.add(new QuadraticBezierCurve3(tip, rightCtrl, center))
	}

	return new TubeGeometry(
		path as unknown as import('three').Curve<Vector3>,
		n * TUBULAR_SEGMENTS_POLY,
		width / 2,
		RADIAL_SEGMENTS,
		true
	)
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

	return new TubeGeometry(
		path as unknown as import('three').Curve<Vector3>,
		rounds * TUBULAR_SEGMENTS_SPIRAL,
		width / 2,
		RADIAL_SEGMENTS,
		false
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

	return new TubeGeometry(
		path as unknown as import('three').Curve<Vector3>,
		rounds * TUBULAR_SEGMENTS_SPIRAL,
		width / 2,
		RADIAL_SEGMENTS,
		false
	)
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

	const length = size * 1

	const zOffset = align === 'tip' ? 0 : align === 'back' ? -1 : -0.5
	const zScale = point === 'backward' ? -1 : 1

	if (kind === 'plain' || kind === 'step') {
		const halfAngle = angle / 2
		const tipY1 = Math.sin(halfAngle) * length
		const tipY2 = -tipY1
		const tipZ = Math.cos(halfAngle) * length

		const origin = new Vector3(0, 0, -zScale * (length * zOffset))
		const tip1 = new Vector3(0, tipY1, -zScale * (tipZ + length * zOffset))
		const tip2 = new Vector3(0, tipY2, -zScale * (tipZ + length * zOffset))

		path.add(new LineCurve3(origin, tip1))
		path.add(new LineCurve3(origin, tip2))
	} else if (kind === 'play' || kind === 'fwd') {
		const height = length
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
	} else if (kind === 'rec') {
		const radius = length / 2
		const segments = ARROW_CIRCLE_SEGMENTS
		for (let i = 0; i < segments; i++) {
			const angle1 = (i / segments) * Math.PI * 2
			const angle2 = ((i + 1) / segments) * Math.PI * 2
			const p1 = new Vector3(0, Math.cos(angle1) * radius, Math.sin(angle1) * radius)
			const p2 = new Vector3(0, Math.cos(angle2) * radius, Math.sin(angle2) * radius)
			path.add(new LineCurve3(p1, p2))
		}
	} else if (kind === 'stop') {
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
	} else if (kind === 'pause') {
		const spacing = width * 2.5
		const height = length
		const line1Start = new Vector3(0, -height / 2, -spacing / 2)
		const line1End = new Vector3(0, height / 2, -spacing / 2)
		const line2Start = new Vector3(0, -height / 2, spacing / 2)
		const line2End = new Vector3(0, height / 2, spacing / 2)
		path.add(new LineCurve3(line1Start, line1End))
		secondaryPath = new CurvePath<Vector3>()
		secondaryPath.add(new LineCurve3(line2Start, line2End))
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
			: kind === 'play' || kind === 'fwd'
				? 3 * TUBULAR_SEGMENTS_POLY
				: kind === 'stop'
					? 4 * TUBULAR_SEGMENTS_POLY
					: TUBULAR_SEGMENTS_ARROW_OTHER

	const mainGeometry = new TubeGeometry(
		path as unknown as import('three').Curve<Vector3>,
		tubularSegments,
		width / 2,
		RADIAL_SEGMENTS,
		closed
	)

	if (secondaryPath) {
		const secondaryGeometry = new TubeGeometry(
			secondaryPath as unknown as import('three').Curve<Vector3>,
			tubularSegments,
			width / 2,
			RADIAL_SEGMENTS,
			closed
		)
		return mergeGeometries([mainGeometry, secondaryGeometry])
	}

	return mainGeometry
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

		const arcStart = curr.clone().addScaledVector(inDir, -cr)
		const arcEnd = curr.clone().addScaledVector(outDir, cr)
		const nextArcStart = next.clone().addScaledVector(outDir, -cr)

		if (cr > 0) {
			path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
		}
		path.add(new LineCurve3(arcEnd, nextArcStart))
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

	const mainGeometry = new TubeGeometry(
		path as unknown as import('three').Curve<Vector3>,
		12 * TUBULAR_SEGMENTS_POLY,
		width / 2,
		RADIAL_SEGMENTS,
		true
	)

	if (sunRayPaths.length > 0) {
		const geometries = [mainGeometry]
		for (const rayPath of sunRayPaths) {
			const rayGeometry = new TubeGeometry(
				rayPath as unknown as import('three').Curve<Vector3>,
				TUBULAR_SEGMENTS_SUN_RAY,
				width / 2,
				RADIAL_SEGMENTS,
				false
			)
			geometries.push(rayGeometry)
		}
		return mergeGeometries(geometries)
	}

	return mainGeometry
}

function buildEaterGeometry(params: InstrumentGeometryParams): BufferGeometry {
	const { size, width, cornerRadius, angle = 60 } = params
	const radius = size / 2
	const path = new CurvePath<Vector3>()

	// Convert degrees to radians
	const angleRad = (angle * Math.PI) / 180
	const mouthHalfAngle = angleRad / 2

	// Arc from mouthStart to mouthEnd (full circle minus gap)
	const arcStartAngle = -Math.PI / 2 + mouthHalfAngle
	const arcEndAngle = arcStartAngle + (Math.PI * 2 - angleRad)

	// Build vertices: center + arc points (pac-man/pizza slice shape)
	const cr = cornerRadius
	const center = new Vector3(0, 0, 0)

	const verts: Vector3[] = []

	// Arc vertices (clockwise from start to end)
	const arcSegments = 32
	for (let i = 0; i <= arcSegments; i++) {
		const t = i / arcSegments
		const a = arcStartAngle + (arcEndAngle - arcStartAngle) * t
		verts.push(new Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
	}

	// Close back to center (creating pizza slice shape)
	// Path: arc_end → center → arc_start (closed loop)
	const vertCount = verts.length

	for (let i = 0; i < vertCount; i++) {
		const curr = verts[i]
		const next = i === vertCount - 1 ? center : verts[i + 1]
		const prev = i === 0 ? center : verts[i - 1]

		const inDir = new Vector3().subVectors(curr, prev).normalize()
		const outDir = new Vector3().subVectors(next, curr).normalize()

		const arcStart = curr.clone().addScaledVector(inDir, -cr)
		const arcEnd = curr.clone().addScaledVector(outDir, cr)
		const nextArcStart = next.clone().addScaledVector(outDir, -cr)

		if (cr > 0 && i > 0 && i < vertCount - 1) {
			// Round corners along the arc
			path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
		}
		path.add(new LineCurve3(arcEnd, nextArcStart))
	}

	// Final segments: center → arc_start
	const centerToStart = verts[0]
	const centerInDir = new Vector3().subVectors(center, verts[vertCount - 1]).normalize()
	const centerOutDir = new Vector3().subVectors(centerToStart, center).normalize()
	const centerArcStart = center.clone().addScaledVector(centerInDir, -cr)
	const centerArcEnd = center.clone().addScaledVector(centerOutDir, cr)
	const startArcStart = centerToStart.clone().addScaledVector(centerOutDir, -cr)

	if (cr > 0) {
		path.add(new QuadraticBezierCurve3(centerArcStart, center, centerArcEnd))
	}
	path.add(new LineCurve3(centerArcEnd, startArcStart))

	return new TubeGeometry(
		path as unknown as import('three').Curve<Vector3>,
		arcSegments + 2,
		width / 2,
		RADIAL_SEGMENTS,
		true
	)
}

function buildPolyFillGeometry(
	sides: number,
	size: number,
	width: number,
	cornerRadius: number
): BufferGeometry | null {
	const n = sides
	const cr = cornerRadius / 2
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

		const arcStart = curr.clone().addScaledVector(inDir, -cr)
		const arcEnd = curr.clone().addScaledVector(outDir, cr)
		const nextArcStart = next.clone().addScaledVector(outDir, -cr)

		if (cr > 0) {
			path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
		}
		path.add(new LineCurve3(arcEnd, nextArcStart))
	}

	return new TubeGeometry(
		path as unknown as import('three').Curve<Vector3>,
		n * TUBULAR_SEGMENTS_POLY,
		width / 2,
		RADIAL_SEGMENTS,
		true
	)
}
