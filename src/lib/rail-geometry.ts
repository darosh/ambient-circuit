import { Vector3, CubicBezierCurve3 } from 'three'
import type { ResolvedPoint, Vec3 } from './rail'

/** Interpolated points per curved segment */
const CURVE_SEGMENTS = 12

/** Tangent handle scale — 0.39 is near-optimal for quarter-circle arcs */
const TANGENT_SCALE = 0.39

function toV3(p: Vec3): Vector3 {
	return new Vector3(p[0], p[1], p[2])
}

/**
 * Is the segment from points[i] to points[i+1] curved?
 * Curved if: start has 'from'/'both' OR end has 'to'/'both'.
 */
function isSegmentCurved(points: ResolvedPoint[], i: number): boolean {
	const a = points[i].round
	const b = points[i + 1].round
	return a === 'from' || a === 'both' || b === 'to' || b === 'both'
}

/**
 * Compute tangent direction at point i.
 *
 * Key insight: tangent aligns with the adjacent STRAIGHT segment direction.
 *  - 'from' point (straight in, curve out) → tangent = incoming direction
 *  - 'to' point (curve in, straight out) → tangent = outgoing direction
 *  - 'both' or boundary between two curves → average of both directions
 */
function tangentAt(points: ResolvedPoint[], i: number): Vector3 {
	const n = points.length

	// detect closed loop (first and last point at same position)
	const closed = n >= 3 && toV3(points[0].p).distanceTo(toV3(points[n - 1].p)) < 1e-6

	let prevIdx = i - 1
	let nextIdx = i + 1

	if (closed) {
		if (prevIdx < 0) prevIdx = n - 2
		if (nextIdx >= n) nextIdx = 1
	}

	const hasPrev = prevIdx >= 0
	const hasNext = nextIdx < n

	if (!hasPrev && !hasNext) return new Vector3(1, 0, 0)
	if (!hasPrev) return toV3(points[nextIdx].p).sub(toV3(points[i].p)).normalize()
	if (!hasNext) return toV3(points[i].p).sub(toV3(points[prevIdx].p)).normalize()

	const incomingCurved = prevIdx < n - 1 && isSegmentCurved(points, prevIdx)
	const outgoingIdx = i < n - 1 ? i : closed ? 0 : -1
	const outgoingCurved = outgoingIdx >= 0 && isSegmentCurved(points, outgoingIdx)

	if (!incomingCurved && outgoingCurved) {
		// straight in, curve out → follow incoming direction
		return toV3(points[i].p).sub(toV3(points[prevIdx].p)).normalize()
	}
	if (incomingCurved && !outgoingCurved) {
		// curve in, straight out → follow outgoing direction
		return toV3(points[nextIdx].p).sub(toV3(points[i].p)).normalize()
	}

	// both curved or both straight → average
	return toV3(points[nextIdx].p).sub(toV3(points[prevIdx].p)).normalize()
}

/**
 * Build a polyline from resolved rail points using cubic Bezier curves.
 *
 * Rounding modes per point:
 *  - 'to':   incoming segment is curved
 *  - 'from': outgoing segment is curved
 *  - 'both': both adjacent segments are curved
 *  - null:   sharp corner
 *
 * Each curved segment uses CubicBezierCurve3 with tangent-derived
 * control points, giving near-perfect circular arcs from 4 points.
 */
export function buildRailCurve(points: ResolvedPoint[]): Vector3[] {
	if (points.length === 0) return []
	if (points.length === 1) return [toV3(points[0].p)]

	const n = points.length
	const result: Vector3[] = [toV3(points[0].p)]

	for (let i = 0; i < n - 1; i++) {
		const p0 = toV3(points[i].p)
		const p3 = toV3(points[i + 1].p)

		if (!isSegmentCurved(points, i)) {
			result.push(p3)
		} else {
			const chord = p0.distanceTo(p3)
			const handleLen = chord * TANGENT_SCALE

			const t0 = tangentAt(points, i).multiplyScalar(handleLen)
			const t1 = tangentAt(points, i + 1).multiplyScalar(handleLen)

			const cp1 = p0.clone().add(t0)
			const cp2 = p3.clone().sub(t1)

			const bezier = new CubicBezierCurve3(p0, cp1, cp2, p3)
			const pts = bezier.getPoints(CURVE_SEGMENTS)

			for (let j = 1; j < pts.length; j++) {
				result.push(pts[j])
			}
		}
	}

	return result
}
