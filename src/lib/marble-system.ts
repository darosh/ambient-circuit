import type { Marble } from './marble'
import type { TempoState } from './tempo'
import type { Instrument } from './instrument'
import type { TriggerHandler, GlobalBeatHandler } from './scene'
import type { MidiState } from './midi'
import type { SceneCtx, HandlerCtx } from './scene-ctx'
import { MarbleState } from './marble-state'
import { InstrumentState } from './instrument-state'
import {
	BeatPosition,
	buildRailCurve,
	computeBeatPositions,
	buildSegmentCurve,
	enhanceBeatPositionsWithPolylineIndices
} from './rail-geometry'
import { easingFunctions } from './easing'
import { Vector3 } from 'three/webgpu'
import { ResolvedPoint, ResolvedSplit } from './rail'

// Module-level state for global beat tracking
let prevGlobalBeat = -1
let prevIsPlaying = false

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
 * Check if global beat changed and fire handler.
 * Fires on play state change or tick transitions (resolution configurable).
 */
export function checkGlobalBeatTrigger(
	tempo: TempoState,
	sceneCtx: SceneCtx,
	globalHandler?: GlobalBeatHandler,
	resolution: number = 8
): void {
	if (!globalHandler) return

	const globalBeat = tempo.currentBeat + tempo.beatProgress
	const isPlaying = tempo.isPlaying

	// Fire on play state change
	if (isPlaying !== prevIsPlaying) {
		globalHandler({
			scene: sceneCtx,
			beat: globalBeat,
			prevBeat: prevGlobalBeat,
			isPlaying,
			phase: isPlaying ? 'play' : 'pause'
		})
		prevIsPlaying = isPlaying
		prevGlobalBeat = globalBeat
		return
	}

	// Fire on fractional beat change (resolution configurable: 8 = eighth, 16 = sixteenth)
	if (isPlaying) {
		const currTick = Math.floor(globalBeat * resolution)
		const prevTick = Math.floor(prevGlobalBeat * resolution)

		if (currTick !== prevTick) {
			globalHandler({
				scene: sceneCtx,
				beat: globalBeat,
				prevBeat: prevGlobalBeat,
				isPlaying,
				phase: 'tick'
			})
		}
	}

	prevGlobalBeat = globalBeat
}

/**
 * Fire global handler on scene init
 */
export function fireGlobalBeatInit(
	tempo: TempoState,
	sceneCtx: SceneCtx,
	globalHandler?: GlobalBeatHandler
): void {
	if (!globalHandler) return

	const globalBeat = tempo.currentBeat + tempo.beatProgress

	globalHandler({
		scene: sceneCtx,
		beat: globalBeat,
		prevBeat: -1,
		isPlaying: tempo.isPlaying,
		phase: 'init'
	})

	// Initialize tracking state
	prevGlobalBeat = globalBeat
	prevIsPlaying = tempo.isPlaying
}

/**
 * Fire global handler on scene destroy
 */
export function fireGlobalBeatDestroy(
	tempo: TempoState,
	sceneCtx: SceneCtx,
	globalHandler?: GlobalBeatHandler
): void {
	if (!globalHandler) return

	const globalBeat = tempo.currentBeat + tempo.beatProgress

	globalHandler({
		scene: sceneCtx,
		beat: globalBeat,
		prevBeat: prevGlobalBeat,
		isPlaying: tempo.isPlaying,
		phase: 'destroy'
	})
}

/**
 * Get current path points based on marble's branch state.
 */
function getCurrentPathPoints(marble: Marble): ResolvedPoint[] {
	const rail = marble.config.resolvedRail

	// If on a branch, return: main points up to split + split point + branch points
	if (marble.branchIndex !== null && rail.splits.length > 0) {
		const split = rail.splits[0] // TODO: handle multiple splits
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
function calculateMarblePosition(
	marble: Marble,
	rawBeat: number,
	beatPositions: BeatPosition[],
	points: ResolvedPoint[],
	easing: string
): void {
	if (beatPositions.length === 0) {
		marble.position = points[0] ? new Vector3(...points[0].p) : new Vector3()
		marble.tangent = new Vector3(1, 0, 0)
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

	// Compute tangent from curve (before arc-length interpolation)
	const curve = buildSegmentCurve(points, beatIndex)
	let newTangent: Vector3
	if (curve) {
		newTangent = curve.getTangentAt(easedT).normalize()
	} else {
		// Straight segment - use direction from p0 to p1
		const dir = new Vector3()
			.subVectors(new Vector3(...points[beatIndex + 1].p), new Vector3(...points[beatIndex].p))
			.normalize()
		newTangent = dir.lengthSq() > 0 ? dir : new Vector3(1, 0, 0)
	}

	// Parallel transport: rotate previous up vector to stay perpendicular to new tangent
	const prevTangent = new Vector3(marble.tangent.x, marble.tangent.y, marble.tangent.z)
	const prevUp = new Vector3(marble.up.x, marble.up.y, marble.up.z)

	// If tangent changed significantly, update up vector via parallel transport
	if (prevTangent.dot(newTangent) < 0.9999) {
		// Compute rotation axis and angle between old and new tangent
		const axis = new Vector3().crossVectors(prevTangent, newTangent)
		const axisLen = axis.length()

		if (axisLen > 0.0001) {
			// Rotate up vector around axis
			axis.normalize()
			const angle = Math.acos(Math.max(-1, Math.min(1, prevTangent.dot(newTangent))))
			const newUp = prevUp.clone().applyAxisAngle(axis, angle)

			// Ensure up is perpendicular to tangent
			const proj = newUp.clone().multiplyScalar(newUp.dot(newTangent))
			newUp.sub(proj).normalize()

			marble.up = newUp
		}
	}

	marble.tangent = newTangent

	// Build rail polyline once
	const railPolyline = buildRailCurve(points)

	// Enhance beat positions with polyline indices for context-aware lookup
	// This resolves ambiguity when multiple points share the same position
	let effectiveBp0 = bp0
	let effectiveBp1 = bp1
	if (bp0.polylineIndex === undefined || bp1.polylineIndex === undefined) {
		const enhancedBeatPositions = enhanceBeatPositionsWithPolylineIndices(
			beatPositions,
			railPolyline
		)
		effectiveBp0 = enhancedBeatPositions[beatIndex] || bp0
		effectiveBp1 =
			enhancedBeatPositions[Math.min(beatIndex + 1, enhancedBeatPositions.length - 1)] || bp1
	}

	// Use polyline indices if available (context-aware), fallback to position search
	const idx0 =
		effectiveBp0.polylineIndex ?? findClosestPointIndex(railPolyline, effectiveBp0.position)
	const idx1 =
		effectiveBp1.polylineIndex ?? findClosestPointIndex(railPolyline, effectiveBp1.position)

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
		marble.tangent = new Vector3(1, 0, 0)
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
		marble.tangent = new Vector3(1, 0, 0)
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
	marbleBeat: number,
	instruments: Instrument[],
	railId: string,
	marbleIndex: number,
	globalBeat: number,
	triggerHandler?: TriggerHandler,
	midiState?: MidiState | null,
	sceneCtx?: SceneCtx
): void {
	if (instruments.length === 0) return

	const beatDelta = currentBeat - previousBeat

	// Skip if beat delta is unreasonably large (>100 indicates bug or initialization)
	if (Math.abs(beatDelta) > 100) return

	// Determine marble's current path
	const marblePath: number[] = marble.branchIndex !== null ? [marble.branchIndex] : []

	// Check for jump trigger first (from previous frame's jump)
	if (marble.runtime.jumpedToBeat !== undefined) {
		const jumpBeat = marble.runtime.jumpedToBeat
		marble.runtime.jumpedToBeat = undefined // clear flag

		for (const instrument of instruments) {
			// Only check instruments on marble's path
			if (!pathsMatch(marblePath, instrument.path)) continue

			// Check if instrument is at or very close to jump target (within 0.01 beats)
			if (Math.abs(instrument.beat - jumpBeat) < 0.01) {
				// Prevent re-trigger if already triggered
				if (
					marble.runtime.lastTriggeredBeat === instrument.beat &&
					marble.runtime.lastTriggeredDirection === marble.direction
				) {
					continue
				}

				// Trigger this instrument
				if (triggerHandler) {
					marble.runtime.lastTriggeredBeat = instrument.beat
					marble.runtime.lastTriggeredDirection = marble.direction

					// Build context for handler
					const marbleState = new MarbleState(marble, jumpBeat)
					const instrumentState = new InstrumentState(instrument)

					// Build handler context (if sceneCtx available)
					let handlerCtx: HandlerCtx | undefined
					if (sceneCtx) {
						const marbleEntity = sceneCtx.marbles[marbleIndex]
						const instrumentEntity = sceneCtx.instruments.find((ie) => ie.instrument === instrument)
						const railEntity = sceneCtx.rails.find((re) => re.id === railId)

						if (marbleEntity && instrumentEntity && railEntity) {
							handlerCtx = {
								scene: sceneCtx,
								marble: marbleEntity,
								instrument: instrumentEntity,
								rail: railEntity
							}
						}
					}

					triggerHandler({
						railId,
						marbleIndex,
						beat: instrument.beat,
						globalBeat,
						marbleBeat: jumpBeat,
						direction: marble.direction,
						instrument,
						marble,
						state: marbleState,
						instrumentState,
						midiState: midiState ?? null,
						scene: sceneCtx!,
						ctx: handlerCtx!
					})
				}
			}
		}
	}

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

		if (triggered && triggerHandler) {
			// Prevent immediate re-trigger in same direction at same beat
			// Use actual beat (not floored) to support fractional positions like 7.3, 7.4, 7.5
			if (
				marble.runtime.lastTriggeredBeat === instrument.beat &&
				marble.runtime.lastTriggeredDirection === marble.direction
			) {
				continue
			}
			marble.runtime.lastTriggeredBeat = instrument.beat
			marble.runtime.lastTriggeredDirection = marble.direction

			// Build context for handler
			const marbleState = new MarbleState(marble, marbleBeat)
			const instrumentState = new InstrumentState(instrument)

			// Build handler context (if sceneCtx available)
			let handlerCtx: HandlerCtx | undefined
			if (sceneCtx) {
				const marbleEntity = sceneCtx.marbles[marbleIndex]
				const instrumentEntity = sceneCtx.instruments.find((ie) => ie.instrument === instrument)
				const railEntity = sceneCtx.rails.find((re) => re.id === railId)

				if (marbleEntity && instrumentEntity && railEntity) {
					handlerCtx = {
						scene: sceneCtx,
						marble: marbleEntity,
						instrument: instrumentEntity,
						rail: railEntity
					}
				}
			}

			triggerHandler({
				railId,
				marbleIndex,
				beat: instrument.beat,
				globalBeat,
				marbleBeat,
				direction: marble.direction,
				instrument,
				marble,
				state: marbleState,
				instrumentState,
				midiState: midiState ?? null,
				scene: sceneCtx!,
				ctx: handlerCtx!
			})
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
	marbleIndex: number = 0,
	triggerHandler?: TriggerHandler,
	midiState?: MidiState | null,
	sceneCtx?: SceneCtx
): void {
	const { resolvedRail, sequenceMode, easing, startBeat } = marble.config
	const speed = marble.runtime.speed ?? marble.config.speed ?? 1

	// Calculate delta from last update
	const globalBeat = tempo.currentBeat + tempo.beatProgress
	const isFirstUpdate = marble.lastGlobalBeat < 0
	const deltaBeat = isFirstUpdate ? 0 : (globalBeat - marble.lastGlobalBeat) * speed
	marble.lastGlobalBeat = globalBeat

	// Update position based on delta, not absolute recalculation
	let rawBeat: number
	if (isFirstUpdate) {
		// First update: use startBeat + globalBeat * speed
		rawBeat =
			startBeat + (marble.direction === 'forward' ? globalBeat * speed : -globalBeat * speed)
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
	if (
		marble.branchIndex !== null &&
		resolvedRail.splits.length > 0 &&
		marble.direction === 'backward' &&
		rawBeat < resolvedRail.splits[0].beat
	) {
		marble.branchIndex = null
	}

	// Check if should assign branch (use unwrapped beat)
	const shouldAssignBranch =
		marble.branchIndex === null &&
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

			// Reset branch and trigger state when looping back
			marble.branchIndex = null
			marble.runtime.lastTriggeredBeat = undefined
			marble.runtime.lastTriggeredDirection = undefined

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

			// Reset branch and trigger state when looping back
			marble.branchIndex = null
			marble.runtime.lastTriggeredBeat = undefined
			marble.runtime.lastTriggeredDirection = undefined

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
				// Clear trigger state when bouncing
				marble.runtime.lastTriggeredBeat = undefined
				marble.runtime.lastTriggeredDirection = undefined
			}
		} else {
			if (rawBeat < minBeat) {
				// Hit lower bound, reverse
				const excess = minBeat - rawBeat
				rawBeat = minBeat + excess
				marble.direction = 'forward'
				// Clamp to range
				if (rawBeat > maxBeat) rawBeat = maxBeat
				// Clear trigger state when bouncing
				marble.runtime.lastTriggeredBeat = undefined
				marble.runtime.lastTriggeredDirection = undefined
			}
		}
	}

	// Clear lastTriggered if marble moved far enough away (allow re-trigger after loop/jump)
	if (
		marble.runtime.lastTriggeredBeat !== undefined &&
		Math.abs(rawBeat - marble.runtime.lastTriggeredBeat) > 1.5
	) {
		marble.runtime.lastTriggeredBeat = undefined
		marble.runtime.lastTriggeredDirection = undefined
	}

	// Check for instrument triggers before updating beat
	checkInstrumentTriggers(
		marble,
		marble.currentBeat,
		rawBeat,
		rawBeat, // marbleBeat: the computed beat for this frame
		instruments,
		railId,
		marbleIndex,
		globalBeat,
		triggerHandler,
		midiState,
		sceneCtx
	)

	// Update beat
	marble.previousBeat = marble.currentBeat
	marble.currentBeat = rawBeat

	// Apply manual beat override if set by trigger handler
	if (marble.runtime.targetBeat !== undefined) {
		const target = marble.runtime.targetBeat
		marble.currentBeat = target
		marble.previousBeat = target // prevent false crossings
		marble.runtime.jumpedToBeat = target // check for instruments at this beat next frame
		marble.runtime.targetBeat = undefined // clear for next frame
	}

	// Get final points with correct branch state
	const points = getCurrentPathPoints(marble)
	const beatPositions = computeBeatPositions(points)
	calculateMarblePosition(marble, marble.currentBeat, beatPositions, points, easing)
}

export function updateMarbles(
	marbles: Marble[],
	tempo: TempoState,
	instrumentsPerRail: Instrument[][] = [],
	railIds: string[] = [],
	triggerHandler?: TriggerHandler,
	midiState?: MidiState | null,
	sceneCtx?: SceneCtx,
	globalHandler?: GlobalBeatHandler,
	globalBeatResolution?: number
): void {
	// Fire global beat handler first (before marble updates)
	if (sceneCtx && globalHandler) {
		checkGlobalBeatTrigger(tempo, sceneCtx, globalHandler, globalBeatResolution)
	}

	// Update each marble
	for (let i = 0; i < marbles.length; i++) {
		const instruments = instrumentsPerRail[i] || []
		const railId = railIds[i] || ''
		updateMarble(marbles[i], tempo, instruments, railId, i, triggerHandler, midiState, sceneCtx)
	}
}
