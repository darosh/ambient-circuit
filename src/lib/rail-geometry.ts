import { Vector3, CubicBezierCurve3 } from 'three/webgpu'
import type { ResolvedPoint, ResolvedRail, Vec3 } from './rail'

/** Interpolated points per curved segment */
const CURVE_SEGMENTS = 12

export function toV3(p: Vec3): Vector3 {
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
 * Build the CubicBezierCurve3 for segment i→i+1, or null if straight.
 */
export function buildSegmentCurve(points: ResolvedPoint[], i: number): CubicBezierCurve3 | null {
	if (!isSegmentCurved(points, i)) return null

	const p0 = toV3(points[i].p)
	const p3 = toV3(points[i + 1].p)
	const chord = p0.distanceTo(p3)

	// Use per-point tangent scales
	const handleLen0 = chord * points[i].tangent
	const handleLen1 = chord * points[i + 1].tangent

	const t0 = tangentAt(points, i).multiplyScalar(handleLen0)
	const t1 = tangentAt(points, i + 1).multiplyScalar(handleLen1)

	const cp1 = p0.clone().add(t0)
	const cp2 = p3.clone().sub(t1)

	return new CubicBezierCurve3(p0, cp1, cp2, p3)
}

/**
 * Build a polyline from resolved rail points using cubic Bezier curves.
 */
export function buildRailCurve(points: ResolvedPoint[]): Vector3[] {
	if (points.length === 0) return []
	if (points.length === 1) return [toV3(points[0].p)]

	const n = points.length
	const result: Vector3[] = [toV3(points[0].p)]

	for (let i = 0; i < n - 1; i++) {
		const bezier = buildSegmentCurve(points, i)
		if (!bezier) {
			result.push(toV3(points[i + 1].p))
		} else {
			const pts = bezier.getPoints(CURVE_SEGMENTS)
			for (let j = 1; j < pts.length; j++) {
				result.push(pts[j])
			}
		}
	}

	return result
}

// ── Path resolution ────────────────────────────────────────

/**
 * Get resolved points for a path through splits.
 * path = [] or undefined → main rail
 * path = [0] → first split, branch 0
 * path = [1, 0] → first split branch 1, second split branch 0
 */
export function getPointsForPath(rail: ResolvedRail, path?: number[]): ResolvedPoint[] {
	if (!path || path.length === 0) {
		return rail.points
	}

	// Start with main rail points up to first split
	if (rail.splits.length === 0) {
		return rail.points
	}

	const firstSplit = rail.splits[0]
	const splitIdx = rail.points.findIndex((p) => p.beat === firstSplit.beat)

	// Include point before split for proper tangent computation
	const startIdx = Math.max(0, splitIdx - 1)
	let points = rail.points.slice(startIdx, splitIdx + 1)

	// Navigate through the path
	let currentBranches = firstSplit.branches

	for (let i = 0; i < path.length; i++) {
		const branchIdx = path[i]
		if (branchIdx >= currentBranches.length) {
			// Invalid path, return what we have
			return points
		}

		const branch = currentBranches[branchIdx]
		points = [...points, ...branch.points]

		// Check if this branch has more splits
		if (i < path.length - 1 && branch.splits && branch.splits.length > 0) {
			currentBranches = branch.splits[0].branches
		}
	}

	return points
}

// ── Interpolation at fractional beat ───────────────────────

export type BeatTransform = {
	position: Vector3
	tangent: Vector3
}

/**
 * Get position and tangent at a fractional beat along resolved points.
 * Interpolates along the rail curve using arc-length.
 */
export function getBeatTransform(points: ResolvedPoint[], beat: number): BeatTransform | null {
	if (points.length === 0) return null
	if (points.length === 1) {
		return {
			position: toV3(points[0].p),
			tangent: new Vector3(1, 0, 0)
		}
	}

	// Find segment containing this beat
	let segmentStart = 0
	for (let i = 0; i < points.length - 1; i++) {
		if (beat >= points[i].beat && beat <= points[i + 1].beat) {
			segmentStart = i
			break
		}
	}

	const p0 = points[segmentStart]
	const p1 = points[segmentStart + 1]
	const beatRange = p1.beat - p0.beat

	if (beatRange === 0) {
		return {
			position: toV3(p0.p),
			tangent: new Vector3(1, 0, 0)
		}
	}

	const t = (beat - p0.beat) / beatRange
	const bezier = buildSegmentCurve(points, segmentStart)

	if (bezier) {
		// Interpolate along bezier curve
		const position = bezier.getPointAt(t)
		const tangent = bezier.getTangentAt(t).normalize()
		return { position, tangent }
	} else {
		// Linear interpolation for straight segment
		const pos0 = toV3(p0.p)
		const pos1 = toV3(p1.p)
		const position = new Vector3().lerpVectors(pos0, pos1, t)
		const tangent = new Vector3().subVectors(pos1, pos0).normalize()
		return { position, tangent }
	}
}

// ── Beat positions ──────────────────────────────────────────

export type BeatPosition = {
	beat: number
	position: Vector3
}

/**
 * Compute world positions for every integer beat along a resolved point
 * sequence. Points may have fractional beats (geometric-only control points);
 * only integer beats are emitted, arc-length-interpolated on curved segments.
 */
export function computeBeatPositions(points: ResolvedPoint[]): BeatPosition[] {
	if (points.length === 0) return []
	if (points.length === 1) {
		return Number.isInteger(points[0].beat)
			? [{ beat: points[0].beat, position: toV3(points[0].p) }]
			: []
	}

	const result: BeatPosition[] = []

	// Emit first point's beat if integer
	if (Number.isInteger(points[0].beat)) {
		result.push({ beat: points[0].beat, position: toV3(points[0].p) })
	}

	for (let i = 0; i < points.length - 1; i++) {
		const beatA = points[i].beat
		const beatB = points[i + 1].beat
		if (beatB <= beatA) continue

		// Integer beats in half-open interval (beatA, beatB]
		const first = Number.isInteger(beatA) ? beatA + 1 : Math.ceil(beatA)
		const last = Math.floor(beatB)
		if (first > last) continue

		const bezier = buildSegmentCurve(points, i)

		for (let b = first; b <= last; b++) {
			const u = (b - beatA) / (beatB - beatA)
			const pos = bezier ? bezier.getPointAt(u) : toV3(points[i].p).lerp(toV3(points[i + 1].p), u)
			result.push({ beat: b, position: pos })
		}
	}

	return result
}
