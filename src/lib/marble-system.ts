import type { Marble } from './marble'
import type { TempoState } from './tempo'
import type { Instrument, InstrumentTriggerContext } from './instrument'
import { BeatPosition, buildRailCurve, computeBeatPositions } from './rail-geometry'
import { easingFunctions } from './easing'
import { Vector3 } from 'three'
import { ResolvedPoint, ResolvedSplit } from './rail'

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
 * Select branch for marble at split using weighted round-robin.
 */
function selectBranch(marble: Marble, split: ResolvedSplit): number {
	const weights = split.weights
	const totalWeight = weights.reduce((sum: number, w: number) => sum + w, 0)
	const position = marble.routingCounter % totalWeight

	let cumulative = 0
	for (let i = 0; i < weights.length; i++) {
		cumulative += weights[i]
		if (position < cumulative) {
			return i
		}
	}
	return 0
}

/**
 * Get current path points based on marble's branch state.
 */
function getCurrentPathPoints(marble: Marble): ResolvedPoint[] {
	const rail = marble.config.resolvedRail

	// If on a branch, return: main points up to split + split point + branch points
	if (marble.branchIndex !== null && rail.splits.length > 0) {
		const split = rail.splits[0]  // TODO: handle multiple splits
		const branch = split.branches[marble.branchIndex]

		// Find split point in main rail
		const splitIdx = rail.points.findIndex((p: ResolvedPoint) => p.beat === split.beat)

		// Include point before split for proper tangent computation
		const startIdx = Math.max(0, splitIdx - 1)
		const mainUpToSplit = rail.points.slice(startIdx, splitIdx + 1)

		return [...mainUpToSplit, ...branch.points]
	}

	return rail.points
}

/**
 * Calculate marble position from beat and points.
 */
function calculateMarblePosition(marble: Marble, rawBeat: number, beatPositions: BeatPosition[], points: ResolvedPoint[], easing: string): void {
	if (beatPositions.length === 0) {
		marble.position = points[0] ? new Vector3(...points[0].p) : new Vector3()
		return
	}

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

	// Interpolate along segment polyline (arc-length based)
	if (segmentPoints.length < 2) {
		marble.position = bp0.position.clone()
		return
	}

	// Calculate total arc length
	let totalLength = 0
	const segmentLengths: number[] = []
	for (let i = 0; i < segmentPoints.length - 1; i++) {
		const len = segmentPoints[i].distanceTo(segmentPoints[i + 1])
		segmentLengths.push(len)
		totalLength += len
	}

	if (totalLength === 0) {
		marble.position = segmentPoints[0].clone()
		return
	}

	// Find position at easedT along arc length
	const targetDist = easedT * totalLength
	let accumulatedDist = 0

	for (let i = 0; i < segmentLengths.length; i++) {
		const segLen = segmentLengths[i]
		if (accumulatedDist + segLen >= targetDist) {
			const localT = (targetDist - accumulatedDist) / segLen
			marble.position = new Vector3().lerpVectors(segmentPoints[i], segmentPoints[i + 1], localT)
			return
		}
		accumulatedDist += segLen
	}

	// Fallback to last point
	marble.position = segmentPoints[segmentPoints.length - 1].clone()
}

/**
 * Check if two paths match (marble path matches instrument path).
 */
function pathsMatch(marblePath: number[], instrumentPath?: number[]): boolean {
	const instPath = instrumentPath || []
	if (marblePath.length !== instPath.length) return false
	for (let i = 0; i < marblePath.length; i++) {
		if (marblePath[i] !== instPath[i]) return false
	}
	return true
}

/**
 * Check if marble crossed any instruments and fire triggers.
 */
function checkInstrumentTriggers(
	marble: Marble,
	previousBeat: number,
	currentBeat: number,
	instruments: Instrument[],
	railId: string,
	marbleIndex: number,
	globalBeat: number
): void {
	if (instruments.length === 0) return

	const beatDelta = currentBeat - previousBeat

	// Skip triggering if beat jumped too far (indicates loop/wrap)
	// Allow up to 1 beat of movement per frame (generous for high BPM)
	if (Math.abs(beatDelta) > 1) return

	// Determine marble's current path
	const marblePath: number[] = marble.branchIndex !== null ? [marble.branchIndex] : []

	// Check direction-aware crossing
	for (const instrument of instruments) {
		// Only check instruments on the marble's current path
		if (!pathsMatch(marblePath, instrument.path)) continue

		let triggered = false

		if (marble.direction === 'forward') {
			// Forward: trigger if instrument is between previous and current
			if (instrument.beat > previousBeat && instrument.beat <= currentBeat) {
				triggered = true
			}
		} else {
			// Backward: trigger if instrument is between current and previous
			if (instrument.beat < previousBeat && instrument.beat >= currentBeat) {
				triggered = true
			}
		}

		if (triggered) {
			const context: InstrumentTriggerContext = {
				railId,
				marbleIndex,
				beat: instrument.beat,
				globalBeat,
				direction: marble.direction
			}
			instrument.onTrigger(context)
		}
	}
}

/**
 * Update marble position based on current global beat.
 * Uses arc-length beat positions + rail curve for smooth motion.
 */
export function updateMarble(
	marble: Marble,
	tempo: TempoState,
	instruments: Instrument[] = [],
	railId: string = '',
	marbleIndex: number = 0
): void {
	const { resolvedRail, sequenceMode, easing, startBeat, speed } = marble.config

	// Calculate delta from last update
	const globalBeat = tempo.currentBeat + tempo.beatProgress
	const isFirstUpdate = marble.lastGlobalBeat < 0
	const deltaBeat = isFirstUpdate ? 0 : (globalBeat - marble.lastGlobalBeat) * speed
	marble.lastGlobalBeat = globalBeat

	// Update position based on delta, not absolute recalculation
	let rawBeat: number
	if (isFirstUpdate) {
		// First update: use startBeat + globalBeat * speed
		rawBeat = startBeat + (marble.direction === 'forward' ? globalBeat * speed : -globalBeat * speed)
	} else {
		// Subsequent updates: increment from current position
		rawBeat = marble.currentBeat + (marble.direction === 'forward' ? deltaBeat : -deltaBeat)
	}

	// Temporary points to get beat range
	const tempPoints = getCurrentPathPoints(marble)
	if (tempPoints.length === 0) return
	const tempBeatPositions = computeBeatPositions(tempPoints)
	if (tempBeatPositions.length === 0) {
		marble.position = tempPoints[0] ? new Vector3(...tempPoints[0].p) : new Vector3()
		return
	}

	const minBeat = tempBeatPositions[0].beat
	const maxBeat = tempBeatPositions[tempBeatPositions.length - 1].beat
	const beatRange = maxBeat - minBeat

	if (beatRange === 0) {
		marble.position = tempBeatPositions[0].position.clone()
		return
	}

	// Reset branch when crossing split point backward
	if (marble.branchIndex !== null &&
		resolvedRail.splits.length > 0 &&
		marble.direction === 'backward' &&
		rawBeat < resolvedRail.splits[0].beat) {
		marble.branchIndex = null
	}

	// Check if should assign branch (use unwrapped beat)
	const shouldAssignBranch = marble.branchIndex === null &&
		resolvedRail.splits.length > 0 &&
		rawBeat >= resolvedRail.splits[0].beat

	if (shouldAssignBranch) {
		marble.branchIndex = selectBranch(marble, resolvedRail.splits[0])
		marble.routingCounter++

		// Recalculate beat range with branch
		const branchPoints = getCurrentPathPoints(marble)
		const branchBeatPos = computeBeatPositions(branchPoints)
		if (branchBeatPos.length > 0) {
			const newMinBeat = branchBeatPos[0].beat
			const newMaxBeat = branchBeatPos[branchBeatPos.length - 1].beat
			const newBeatRange = newMaxBeat - newMinBeat

			// Only wrap if PAST newMaxBeat
			if (sequenceMode === 'looping' && rawBeat > newMaxBeat) {
				const excess = rawBeat - newMaxBeat
				rawBeat = newMinBeat + (excess % newBeatRange)
				if (rawBeat < newMinBeat) rawBeat += newBeatRange
			}

			marble.currentBeat = rawBeat

			// Get final points and calculate position
			const points = getCurrentPathPoints(marble)
			const beatPositions = computeBeatPositions(points)
			calculateMarblePosition(marble, rawBeat, beatPositions, points, easing)
			return
		}
	}

	// Wrap/ping-pong
	if (sequenceMode === 'looping') {
		// Wrap forward: if PAST maxBeat
		if (rawBeat > maxBeat) {
			const excess = rawBeat - maxBeat
			rawBeat = minBeat + (excess % beatRange)
			if (rawBeat < minBeat) rawBeat += beatRange

			// Reset branch when looping back
			marble.branchIndex = null

			// Re-wrap with main rail range after reset
			const mainPoints = getCurrentPathPoints(marble)
			const mainBeatPos = computeBeatPositions(mainPoints)
			if (mainBeatPos.length > 0) {
				const mainMin = mainBeatPos[0].beat
				const mainMax = mainBeatPos[mainBeatPos.length - 1].beat
				const mainRange = mainMax - mainMin
				if (mainRange > 0 && rawBeat > mainMax) {
					const mainExcess = rawBeat - mainMax
					rawBeat = mainMin + (mainExcess % mainRange)
					if (rawBeat < mainMin) rawBeat += mainRange
				}
			}
		}
		// Wrap backward: if BEFORE minBeat
		else if (rawBeat < minBeat) {
			const deficit = minBeat - rawBeat
			rawBeat = maxBeat - (deficit % beatRange)
			if (rawBeat > maxBeat) rawBeat -= beatRange

			// Reset branch when looping back
			marble.branchIndex = null

			// Re-wrap with main rail range after reset
			const mainPoints = getCurrentPathPoints(marble)
			const mainBeatPos = computeBeatPositions(mainPoints)
			if (mainBeatPos.length > 0) {
				const mainMin = mainBeatPos[0].beat
				const mainMax = mainBeatPos[mainBeatPos.length - 1].beat
				const mainRange = mainMax - mainMin
				if (mainRange > 0 && rawBeat < mainMin) {
					const mainDeficit = mainMin - rawBeat
					rawBeat = mainMax - (mainDeficit % mainRange)
					if (rawBeat > mainMax) rawBeat -= mainRange
				}
			}
		}
	} else {
		// Ping-pong: respect current direction and flip only at boundaries
		if (marble.direction === 'forward') {
			if (rawBeat > maxBeat) {
				// Hit upper bound, reverse
				const excess = rawBeat - maxBeat
				rawBeat = maxBeat - excess
				marble.direction = 'backward'
				// Clamp to range
				if (rawBeat < minBeat) rawBeat = minBeat
			}
		} else {
			if (rawBeat < minBeat) {
				// Hit lower bound, reverse
				const excess = minBeat - rawBeat
				rawBeat = minBeat + excess
				marble.direction = 'forward'
				// Clamp to range
				if (rawBeat > maxBeat) rawBeat = maxBeat
			}
		}
	}

	// Check for instrument triggers before updating beat
	checkInstrumentTriggers(marble, marble.currentBeat, rawBeat, instruments, railId, marbleIndex, globalBeat)

	marble.previousBeat = marble.currentBeat
	marble.currentBeat = rawBeat

	// Get final points with correct branch state
	const points = getCurrentPathPoints(marble)
	const beatPositions = computeBeatPositions(points)
	calculateMarblePosition(marble, rawBeat, beatPositions, points, easing)
}

export function updateMarbles(
	marbles: Marble[],
	tempo: TempoState,
	instrumentsPerRail: Instrument[][] = [],
	railIds: string[] = []
): void {
	for (let i = 0; i < marbles.length; i++) {
		const instruments = instrumentsPerRail[i] || []
		const railId = railIds[i] || ''
		updateMarble(marbles[i], tempo, instruments, railId, i)
	}
}
