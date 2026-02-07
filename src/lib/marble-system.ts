import type { Marble } from './marble'
import type { TempoState } from './tempo'
import { buildRailCurve, computeBeatPositions } from './rail-geometry'
import { easingFunctions } from './easing'
import { CatmullRomCurve3, Vector3 } from 'three'

/**
 * Find closest point index on polyline to a target position.
 */
function findClosestPointIndex(polyline: Vector3[], target: Vector3): number {
	let minDist = Infinity
	let minIndex = 0
	for (let i = 0; i < polyline.length; i++) {
		const dist = polyline[i].distanceToSquared(target)
		if (dist < minDist) {
			minDist = dist
			minIndex = i
		}
	}
	return minIndex
}

/**
 * Update marble position based on current global beat.
 * Uses arc-length beat positions + rail curve for smooth motion.
 */
export function updateMarble(marble: Marble, tempo: TempoState): void {
	const { resolvedRail, sequenceMode, easing, startBeat } = marble.config
	const points = resolvedRail.points

	if (points.length === 0) return

	// Get arc-length-based beat positions
	const beatPositions = computeBeatPositions(points)
	if (beatPositions.length === 0) {
		marble.position = points[0] ? new Vector3(...points[0].p) : new Vector3()
		return
	}

	const minBeat = beatPositions[0].beat
	const maxBeat = beatPositions[beatPositions.length - 1].beat
	const beatRange = maxBeat - minBeat

	if (beatRange === 0) {
		marble.position = beatPositions[0].position.clone()
		return
	}

	// Global beat position (includes fractional progress)
	const globalBeat = tempo.currentBeat + tempo.beatProgress

	// Compute raw beat position (startBeat + elapsed time)
	let rawBeat = startBeat + (marble.direction === 'forward' ? globalBeat : -globalBeat)

	// Wrap/ping-pong
	if (sequenceMode === 'looping') {
		rawBeat = minBeat + ((rawBeat - minBeat) % beatRange)
		if (rawBeat < minBeat) rawBeat += beatRange
	} else {
		const cycles = Math.floor((rawBeat - minBeat) / beatRange)
		const offset = (rawBeat - minBeat) % beatRange
		if (cycles % 2 === 0) {
			rawBeat = minBeat + offset
			marble.direction = 'forward'
		} else {
			rawBeat = maxBeat - offset
			marble.direction = 'backward'
		}
	}

	marble.currentBeat = rawBeat

	// Find integer beat segment
	let beatIndex = 0
	for (let i = 0; i < beatPositions.length - 1; i++) {
		if (rawBeat >= beatPositions[i].beat && rawBeat <= beatPositions[i + 1].beat) {
			beatIndex = i
			break
		}
	}

	const bp0 = beatPositions[beatIndex]
	const bp1 = beatPositions[Math.min(beatIndex + 1, beatPositions.length - 1)]

	// Interpolation factor (0-1) between integer beats
	let t = bp1.beat > bp0.beat ? (rawBeat - bp0.beat) / (bp1.beat - bp0.beat) : 0
	t = Math.max(0, Math.min(1, t))

	// Apply easing
	const easingFn = easingFunctions[easing] || easingFunctions.linear
	let easedT = easingFn(t)
	// Clamp to [0,1] - some easings (back, elastic) can overshoot
	easedT = Math.max(0, Math.min(1, easedT))

	// Build rail polyline and find segment between beat positions
	const railPolyline = buildRailCurve(points)
	const idx0 = findClosestPointIndex(railPolyline, bp0.position)
	const idx1 = findClosestPointIndex(railPolyline, bp1.position)

	// Extract curve segment between beat positions
	const segmentPoints: Vector3[] = []
	if (idx1 >= idx0) {
		for (let i = idx0; i <= idx1; i++) {
			segmentPoints.push(railPolyline[i])
		}
	} else {
		// Wrapped around
		for (let i = idx0; i < railPolyline.length; i++) {
			segmentPoints.push(railPolyline[i])
		}
		for (let i = 0; i <= idx1; i++) {
			segmentPoints.push(railPolyline[i])
		}
	}

	// Interpolate along segment curve
	if (segmentPoints.length < 2) {
		marble.position = bp0.position.clone()
	} else if (segmentPoints.length === 2) {
		marble.position = new Vector3().lerpVectors(segmentPoints[0], segmentPoints[1], easedT)
	} else {
		const curve = new CatmullRomCurve3(segmentPoints, false, 'centripetal')
		marble.position = curve.getPointAt(easedT)
	}
}

export function updateMarbles(marbles: Marble[], tempo: TempoState): void {
	for (const marble of marbles) {
		updateMarble(marble, tempo)
	}
}
