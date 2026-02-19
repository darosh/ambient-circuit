import {
	type Curve,
	CurvePath,
	LineCurve3,
	QuadraticBezierCurve3,
	TubeGeometry,
	Vector3,
	type BufferGeometry
} from 'three/webgpu'
import { buildTubeGeometry } from './tube-geometry'

// Geometry constants
export const MARBLE_WIDTH = 0.06
export const MARBLE_SIZE = 0.2
export const MARBLE_CORNER_RADIUS = 0.02
export const MARBLE_RADIAL_SEGMENTS = 8
export const MARBLE_CLOSED_SEGMENTS = 12
export const COIL_SEGMENTS_PER_ROUND = 16
export const BALL_RADIUS = 0.12
export const BALL_WIDTH_SEGMENTS = 16
export const BALL_HEIGHT_SEGMENTS = 16

export type MarbleType = 'ball' | 'poly' | 'coil' | 'eater'

export type MarbleGeometryParams = {
	type: MarbleType
	sides?: number
	rounds?: number
	angle?: number
}

// Geometry cache: key = JSON.stringify(params)
const geometryCache = new Map<string, BufferGeometry>()

function getCacheKey(params: MarbleGeometryParams): string {
	return JSON.stringify(params)
}

/**
 * Create memoized marble geometry
 */
export function createMarbleGeometry(params: MarbleGeometryParams): BufferGeometry | null {
	if (params.type === 'ball') {
		return null // use declarative SphereGeometry in template
	}

	const key = getCacheKey(params)
	const cached = geometryCache.get(key)
	if (cached) return cached

	const geometry = buildMarbleGeometry(params)
	if (geometry) {
		geometryCache.set(key, geometry)
	}
	return geometry
}

/**
 * Clear geometry cache (call on cleanup)
 */
export function clearMarbleGeometryCache(): void {
	for (const geometry of geometryCache.values()) {
		geometry.dispose()
	}
	geometryCache.clear()
}

/**
 * Build marble geometry (internal, not cached)
 */
function buildMarbleGeometry(params: MarbleGeometryParams): BufferGeometry | null {
	const { type, sides = 6, rounds = 3, angle = 60 } = params

	const width = MARBLE_WIDTH
	const size = MARBLE_SIZE
	const cr = MARBLE_CORNER_RADIUS

	if (type === 'eater') {
		return buildEaterMarbleGeometry(size, width, cr, angle)
	} else if (type === 'poly') {
		const n = sides
		const r = size / (1 + Math.cos(Math.PI / n))
		const curves: Curve<Vector3>[] = []
		const verts: Vector3[] = []

		for (let i = 0; i < n; i++) {
			const angle = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n
			verts.push(new Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0))
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
				curves.push(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
			}
			curves.push(new LineCurve3(arcEnd, nextArcStart))
		}

		return buildTubeGeometry(
			curves,
			width / 2,
			MARBLE_RADIAL_SEGMENTS,
			MARBLE_CLOSED_SEGMENTS,
			true
		)
	} else if (type === 'coil') {
		const path = new CurvePath<Vector3>()
		const r = size / 2
		const length = width * 3 * rounds

		for (let i = 0; i < rounds * COIL_SEGMENTS_PER_ROUND; i++) {
			const t = i / (rounds * COIL_SEGMENTS_PER_ROUND)
			const angle = t * rounds * Math.PI * 2
			const z = t * length - length / 2

			const curr = new Vector3(Math.cos(angle) * r, Math.sin(angle) * r, z)
			const nextT = (i + 1) / (rounds * COIL_SEGMENTS_PER_ROUND)
			const nextAngle = nextT * rounds * Math.PI * 2
			const nextZ = nextT * length - length / 2
			const next = new Vector3(Math.cos(nextAngle) * r, Math.sin(nextAngle) * r, nextZ)

			path.add(new LineCurve3(curr, next))
		}

		return new TubeGeometry(
			path as unknown as Curve<Vector3>,
			rounds * COIL_SEGMENTS_PER_ROUND,
			width / 2,
			MARBLE_RADIAL_SEGMENTS,
			false
		)
	}

	return null
}

/**
 * Build eater (pac-man) marble geometry - pizza slice shape laying on rail
 */
function buildEaterMarbleGeometry(
	size: number,
	width: number,
	cr: number,
	angle: number
): BufferGeometry {
	const radius = size
	const angleRad = (angle * Math.PI) / 180
	const mouthHalfAngle = angleRad / 2

	// Arc from mouthStart to mouthEnd (full circle minus gap)
	// Rotated so mouth points in +Z direction (forward along rail)
	const arcStartAngle = Math.PI / 2 + mouthHalfAngle
	const arcEndAngle = arcStartAngle + (Math.PI * 2 - angleRad)

	// Derive vertex count from arc angle proportion (matching poly density)
	const fullCircleSegments = 24
	const arcAngle = Math.PI * 2 - angleRad
	const n = Math.max(3, Math.round((arcAngle / (Math.PI * 2)) * fullCircleSegments))

	const verts: Vector3[] = []

	// Arc vertices in XY plane (will be oriented along rail)
	for (let i = 0; i < n; i++) {
		const t = i / (n - 1)
		const a = arcStartAngle + (arcEndAngle - arcStartAngle) * t
		verts.push(new Vector3(0, Math.cos(a) * radius, Math.sin(a) * radius))
	}

	// Add center point to close the pizza slice
	verts.push(new Vector3(0, 0, 0))

	// Build path with corner rounding (same as poly pattern)
	const curves: Curve<Vector3>[] = []
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
			curves.push(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
		}
		curves.push(new LineCurve3(arcEnd, nextArcStart))
	}

	const curvePath = new CurvePath<Vector3>()

	for (const c of curves) {
		curvePath.add(c)
	}

	return new TubeGeometry(
		curvePath,
		MARBLE_CLOSED_SEGMENTS * 4,
		width / 2,
		MARBLE_RADIAL_SEGMENTS,
		true
	)

	// return buildTubeGeometry(curves, width / 2, MARBLE_RADIAL_SEGMENTS, MARBLE_CLOSED_SEGMENTS, true)
}
