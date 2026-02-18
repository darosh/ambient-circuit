import type { Marble } from './marble'
import type { TempoState } from './tempo'
import type { Instrument } from './instrument'
import type { TriggerHandler, GlobalBeatHandler } from './scene'
import type { SceneCtx } from './scene-ctx'
import { computeBeatPositions, buildSegmentCurve } from './rail-curve'
import { easingFunctions } from './easing'
import { Vector3 } from 'three/webgpu'
import { ResolvedPoint, ResolvedSplit } from './rail'
import { smootherstep } from 'three/src/math/MathUtils.js'

// Module-level state for global beat tracking
let prevGlobalBeat = -1
let prevIsPlaying = false

// Reusable tmp vectors — prevent per-frame allocation in hot paths
const _tmp0 = new Vector3()
const _tmp1 = new Vector3()
const _tmpRight = new Vector3()

// Snake motion constants
const SNAKE_AMPLITUDE_X = 0.09 // units perpendicular to rail
const SNAKE_AMPLITUDE_Y = 0.15 // units perpendicular to rail
const SNAKE_FREQUENCY = 0.5 // cycles per beat (1.0 = crosses at whole beats)

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
	points: ResolvedPoint[],
	easing: string
): void {
	if (points.length === 0) {
		marble.position = new Vector3()
		marble.tangent = new Vector3(1, 0, 0)
		return
	}

	// Find which segment (pair of control points) contains this beat
	let segmentIndex = 0
	for (let i = 0; i < points.length - 1; i++) {
		if (rawBeat >= points[i].beat && rawBeat <= points[i + 1].beat) {
			segmentIndex = i
			break
		}
	}
	// Clamp to valid segment range
	segmentIndex = Math.max(0, Math.min(segmentIndex, points.length - 2))

	const p0 = points[segmentIndex]
	const p1 = points[segmentIndex + 1]

	// Calculate t (0-1) within this segment based on beat values
	const beatRange = p1.beat - p0.beat
	let t = beatRange > 0 ? (rawBeat - p0.beat) / beatRange : 0
	t = Math.max(0, Math.min(1, t))

	// Apply easing
	const easingFn = easingFunctions[easing] || easingFunctions.linear
	let easedT = easingFn(t)
	easedT = Math.max(0, Math.min(1, easedT))

	// Get position and tangent from segment curve.
	// marble.position/tangent are plain {x,y,z} objects (not Vector3 instances) — write via x/y/z only.
	const curve = buildSegmentCurve(points, segmentIndex)
	if (curve) {
		// Curved segment — compute into tmp buffers, then write x/y/z
		curve.getPoint(easedT, _tmp0)
		curve.getTangent(easedT, _tmp1).normalize()
		marble.position.x = _tmp0.x
		marble.position.y = _tmp0.y
		marble.position.z = _tmp0.z
		marble.tangent.x = _tmp1.x
		marble.tangent.y = _tmp1.y
		marble.tangent.z = _tmp1.z
	} else {
		// Straight segment — lerp + normalize via tmp buffers, then write x/y/z
		_tmp0.set(p0.p[0], p0.p[1], p0.p[2])
		_tmp1.set(p1.p[0], p1.p[1], p1.p[2])
		marble.position.x = _tmp0.x + (_tmp1.x - _tmp0.x) * easedT
		marble.position.y = _tmp0.y + (_tmp1.y - _tmp0.y) * easedT
		marble.position.z = _tmp0.z + (_tmp1.z - _tmp0.z) * easedT
		_tmpRight.subVectors(_tmp1, _tmp0)
		const dlen = _tmpRight.length()
		if (dlen > 0) {
			marble.tangent.x = _tmpRight.x / dlen
			marble.tangent.y = _tmpRight.y / dlen
			marble.tangent.z = _tmpRight.z / dlen
		} else {
			marble.tangent.x = 1
			marble.tangent.y = 0
			marble.tangent.z = 0
		}
	}

	if (marble.config.snake) {
		const phase_x = 2 * Math.PI * (marble.currentBeat * SNAKE_FREQUENCY + 0.25)
		const phase_y = 2 * Math.PI * (marble.currentBeat * SNAKE_FREQUENCY)
		const phase_r = 2 * Math.PI * (marble.currentBeat * SNAKE_FREQUENCY + 0.25)
		_tmpRight.crossVectors(marble.up, marble.tangent).normalize()
		const cos = Math.cos(phase_x)
		const sin = Math.sin(phase_y)
		const offsetX = cos * SNAKE_AMPLITUDE_X
		const offsetY = sin * SNAKE_AMPLITUDE_Y

		marble.position.x += _tmpRight.x * offsetX
		marble.position.y += _tmpRight.y * offsetX
		marble.position.z += _tmpRight.z * offsetX
		marble.position.x += marble.up.x * offsetY
		marble.position.y += marble.up.y * offsetY
		marble.position.z += marble.up.z * offsetY

		// Recompute tangent to follow spiral path
		if (typeof marble.config.snake === 'number') {
			const derivY = (smootherstep((Math.sin(phase_r) + 1) / 2, 0, 1) - 0.5) * 2
			const snake = marble.config.snake
			const sx = marble.tangent.x + marble.up.x * derivY * snake
			const sy = marble.tangent.y + marble.up.y * derivY * snake
			const sz = marble.tangent.z + marble.up.z * derivY * snake
			const slen = Math.sqrt(sx * sx + sy * sy + sz * sz)
			if (slen > 0) {
				marble.tangent.x = sx / slen
				marble.tangent.y = sy / slen
				marble.tangent.z = sz / slen
			}
		}
	}
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
 * Check if two beat intervals overlap (handles forward/backward motion).
 */
function beatsOverlap(prev1: number, curr1: number, prev2: number, curr2: number): boolean {
	const min1 = Math.min(prev1, curr1)
	const max1 = Math.max(prev1, curr1)
	const min2 = Math.min(prev2, curr2)
	const max2 = Math.max(prev2, curr2)

	return max1 >= min2 && max2 >= min1
}

/**
 * Check for marble collisions using beat-based interval detection.
 * More robust than spatial checks - handles high speeds correctly.
 */
function checkMarbleCollisions(
	marbles: Marble[],
	railIds: string[],
	globalBeat: number,
	sceneCtx?: SceneCtx,
	bounceHandler?: import('./scene').BounceHandler,
	bouncerOnlyMode: boolean = false,
	cooldownBeats: number = 0.5,
	wrapThreshold: number = 5 // Skip collision if beat delta > threshold (indicates wrap)
): void {
	if (bouncerOnlyMode) {
		marbles = marbles.filter((m) => m.config.bouncer)
	}

	// Check all pairs of marbles
	for (let i = 0; i < marbles.length; i++) {
		const m1 = marbles[i]

		// Skip if recently collided (cooldown to prevent oscillation)
		if (m1.runtime.lastCollisionTime !== undefined) {
			if (Math.abs(globalBeat - m1.runtime.lastCollisionTime) < cooldownBeats) {
				continue
			}
		}

		// Skip if marble just wrapped (large beat delta indicates loop/wrap)
		const m1Delta = Math.abs(m1.currentBeat - m1.previousBeat)
		if (m1Delta > wrapThreshold) continue

		for (let j = i + 1; j < marbles.length; j++) {
			const m2 = marbles[j]
			// Check if on same rail
			const rail1 = m1.runtime.railId ?? m1.config.resolvedRail.id
			const rail2 = m2.runtime.railId ?? m2.config.resolvedRail.id
			if (rail1 !== rail2) continue

			// Skip if NEITHER is a bouncer (unless bouncerOnlyMode assumes all are)
			if (!m1.config.bouncer && !m2.config.bouncer) continue

			// Skip if recently collided
			if (m2.runtime.lastCollisionTime !== undefined) {
				if (Math.abs(globalBeat - m2.runtime.lastCollisionTime) < cooldownBeats) {
					continue
				}
			}

			// Skip if marble just wrapped
			const m2Delta = Math.abs(m2.currentBeat - m2.previousBeat)
			if (m2Delta > wrapThreshold) continue

			// Check if on same branch
			if (m1.branchIndex !== m2.branchIndex) continue

			// Beat-based collision: check if beat intervals overlap
			const overlap = beatsOverlap(m1.previousBeat, m1.currentBeat, m2.previousBeat, m2.currentBeat)

			if (overlap) {
				// Collision detected!
				const collisionBeat = (m1.currentBeat + m2.currentBeat) / 2

				// Determine collision response based on directions
				const sameDirection = m1.direction === m2.direction

				if (sameDirection) {
					// Same direction: only trailing marble reverses
					// (faster marble or one behind in direction of travel)
					if (m1.direction === 'forward') {
						// Forward: lower beat is trailing
						if (m1.currentBeat < m2.currentBeat) {
							// m1 is behind, reverse it
							m1.direction = 'backward'
							m1.runtime.lastCollisionTime = globalBeat
							m1.runtime.lastTriggeredBeat = undefined
							m1.runtime.lastTriggeredDirection = undefined
							m1.signal.intensity = 1
						} else {
							// m2 is behind, reverse it
							m2.direction = 'backward'
							m2.runtime.lastCollisionTime = globalBeat
							m2.runtime.lastTriggeredBeat = undefined
							m2.runtime.lastTriggeredDirection = undefined
							m2.signal.intensity = 1
						}
					} else {
						// Backward: higher beat is trailing
						if (m1.currentBeat > m2.currentBeat) {
							// m1 is behind, reverse it
							m1.direction = 'forward'
							m1.runtime.lastCollisionTime = globalBeat
							m1.runtime.lastTriggeredBeat = undefined
							m1.runtime.lastTriggeredDirection = undefined
							m1.signal.intensity = 1
						} else {
							// m2 is behind, reverse it
							m2.direction = 'forward'
							m2.runtime.lastCollisionTime = globalBeat
							m2.runtime.lastTriggeredBeat = undefined
							m2.runtime.lastTriggeredDirection = undefined
							m2.signal.intensity = 1
						}
					}
				} else {
					// Opposite directions: both reverse
					m1.direction = m1.direction === 'forward' ? 'backward' : 'forward'
					m1.runtime.lastCollisionTime = globalBeat
					m1.runtime.lastTriggeredBeat = undefined
					m1.runtime.lastTriggeredDirection = undefined
					m1.signal.intensity = 1

					m2.direction = m2.direction === 'forward' ? 'backward' : 'forward'
					m2.runtime.lastCollisionTime = globalBeat
					m2.runtime.lastTriggeredBeat = undefined
					m2.runtime.lastTriggeredDirection = undefined
					m2.signal.intensity = 1
				}

				// Fire bounce handler if provided
				if (bounceHandler && sceneCtx) {
					const marbleEntity1 = sceneCtx.marbles[m1.index]
					const marbleEntity2 = sceneCtx.marbles[m2.index]
					const railId = railIds[i] || railIds[j]
					const railEntity = sceneCtx.rails.find((r) => r.id === railId)

					if (marbleEntity1 && marbleEntity2 && railEntity) {
						bounceHandler({
							scene: sceneCtx,
							marble1: marbleEntity1,
							marble2: marbleEntity2,
							rail: railEntity,
							beat: collisionBeat,
							globalBeat
						})
					}
				}
			}
		}
	}
}

/**
 * Check if marble crossed any instruments and fire triggers.
 */
function checkInstrumentTriggers(
	marble: Marble,
	previousBeat: number,
	currentBeat: number,
	marbleBeat: number,
	direction: 'forward' | 'backward',
	instruments: Instrument[],
	railId: string,
	marbleIndex: number,
	globalBeat: number,
	triggerHandler?: TriggerHandler,
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
				// Trigger this instrument
				if (triggerHandler && sceneCtx) {
					// Find entities
					const marbleEntity = sceneCtx.marbles[marbleIndex]
					const instrumentEntity = sceneCtx.instruments.find((ie) => ie.instrument === instrument)
					const railEntity = sceneCtx.rails.find((re) => re.id === railId)

					// Skip if marble is inactive
					if (!marbleEntity.activity.value) {
						continue
					}

					// Skip if instrument is inactive
					if (!instrumentEntity || !instrumentEntity.activity.value) {
						continue
					}

					// Prevent re-trigger if already triggered in same direction
					if (
						marble.runtime.lastTriggeredBeat === instrument.beat &&
						marble.runtime.lastTriggeredDirection === marble.direction
					) {
						continue
					}

					// Set trigger tracking
					marble.runtime.lastTriggeredBeat = instrument.beat
					marble.runtime.lastTriggeredDirection = marble.direction

					if (marbleEntity && railEntity) {
						// Set trigger context for position mirroring on reverse
						marble.runtime.inTrigger = true
						marble.runtime.triggerBeat = instrument.beat

						triggerHandler({
							railId,
							marbleIndex,
							beat: instrument.beat,
							globalBeat,
							marbleBeat: jumpBeat,
							direction: marble.direction,
							marble: marbleEntity,
							instrument: instrumentEntity,
							rail: railEntity,
							scene: sceneCtx
						})

						// Clear trigger context
						marble.runtime.inTrigger = false
						marble.runtime.triggerBeat = undefined
					}
				}
			}
		}
	}

	// Check direction-aware crossing
	for (const instrument of instruments) {
		// Only check instruments on the marble's current path
		if (!pathsMatch(marblePath, instrument.path)) continue

		let triggered = false

		if (direction === 'forward') {
			// Forward: trigger if instrument is between previous and current
			if (instrument.beat >= previousBeat && instrument.beat <= currentBeat) {
				triggered = true
			}
		} else {
			// Backward: trigger if instrument is between current and previous
			if (instrument.beat < previousBeat && instrument.beat >= currentBeat) {
				triggered = true
			}
		}

		if (triggered && triggerHandler && sceneCtx) {
			// Find entities
			const marbleEntity = sceneCtx.marbles[marbleIndex]
			const instrumentEntity = sceneCtx.instruments.find((ie) => ie.instrument === instrument)
			const railEntity = sceneCtx.rails.find((re) => re.id === railId)

			// Skip if marble is inactive
			if (!marbleEntity.activity.value) {
				continue
			}

			// Skip if instrument is inactive
			if (!instrumentEntity || !instrumentEntity.activity.value) {
				continue
			}

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

			if (marbleEntity && railEntity) {
				// Set trigger context for position mirroring on reverse
				marble.runtime.inTrigger = true
				marble.runtime.triggerBeat = instrument.beat

				triggerHandler({
					railId,
					marbleIndex,
					beat: instrument.beat,
					globalBeat,
					marbleBeat,
					direction: marble.direction,
					marble: marbleEntity,
					instrument: instrumentEntity,
					rail: railEntity,
					scene: sceneCtx
				})

				// Clear trigger context
				marble.runtime.inTrigger = false
				marble.runtime.triggerBeat = undefined
			}
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
	sceneCtx?: SceneCtx
): void {
	const { resolvedRail, sequenceMode, startBeat } = marble.config
	const speed = marble.runtime.speed ?? marble.config.speed ?? 1
	const easing = marble.runtime.easing ?? marble.config.easing

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
			calculateMarblePosition(marble, rawBeat, points, easing)
			return
		}
	}

	// Preserve unwrapped beat and direction for trigger detection before wrapping modifies them
	const unwrappedBeat = rawBeat
	const unwrappedDirection = marble.direction

	// Wrap/ping-pong
	if (sequenceMode === 'looping') {
		// Wrap forward: if PAST maxBeat
		if (rawBeat > maxBeat) {
			const excess = rawBeat - maxBeat
			const wrappedBeat = minBeat + (excess % beatRange)
			rawBeat = wrappedBeat
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

			// Check instruments in wrapped portion (minBeat to wrapped position)
			// This catches instruments at minBeat when looping forward
			if (tempo.isPlaying && triggerHandler && sceneCtx && wrappedBeat > minBeat) {
				checkInstrumentTriggers(
					marble,
					minBeat,
					wrappedBeat,
					wrappedBeat,
					unwrappedDirection,
					instruments,
					railId,
					marbleIndex,
					globalBeat,
					triggerHandler,
					sceneCtx
				)
			}
		}
		// Wrap backward: if BEFORE minBeat
		else if (rawBeat < minBeat) {
			const deficit = minBeat - rawBeat
			const wrappedBeat = maxBeat - (deficit % beatRange)
			rawBeat = wrappedBeat
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

			// Check instruments in wrapped portion (wrapped position to maxBeat)
			// This catches instruments at maxBeat when looping backward
			if (tempo.isPlaying && triggerHandler && sceneCtx && wrappedBeat < maxBeat) {
				checkInstrumentTriggers(
					marble,
					wrappedBeat,
					maxBeat,
					wrappedBeat,
					unwrappedDirection,
					instruments,
					railId,
					marbleIndex,
					globalBeat,
					triggerHandler,
					sceneCtx
				)
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

	// Check for instrument triggers before updating beat
	// Skip if not playing or if marble hasn't moved (prevents triggering on first frame when paused)
	const hasMoved = marble.currentBeat !== unwrappedBeat
	if (tempo.isPlaying && hasMoved) {
		checkInstrumentTriggers(
			marble,
			marble.currentBeat,
			unwrappedBeat,
			unwrappedBeat, // marbleBeat: the computed beat for this frame
			unwrappedDirection,
			instruments,
			railId,
			marbleIndex,
			globalBeat,
			triggerHandler,
			sceneCtx
		)
	}

	// Update beat
	marble.previousBeat = marble.currentBeat
	marble.currentBeat = rawBeat

	// Apply rail switch BEFORE beat override (allows ctx.marble.state.railId = 'x'; ctx.marble.state.beat = 5)
	if (marble.runtime.targetRailId !== undefined) {
		const targetRailId = marble.runtime.targetRailId
		marble.runtime.targetRailId = undefined

		// Validate rail exists
		if (!sceneCtx) {
			console.warn(`[rail-switch] Cannot switch: sceneCtx not available`)
		} else {
			const targetRail = sceneCtx.rails.find((r) => r.id === targetRailId)
			if (!targetRail) {
				console.warn(`[rail-switch] Rail "${targetRailId}" not found`)
			} else {
				// Perform switch
				marble.config.resolvedRail = targetRail.resolvedRail
				marble.runtime.railId = targetRailId

				// Reset rail-specific state
				const newPoints = targetRail.resolvedRail.points
				const newMinBeat = newPoints.length > 0 ? newPoints[0].beat : 0

				marble.currentBeat = newMinBeat
				marble.previousBeat = newMinBeat
				marble.branchIndex = null
				marble.routingCounter = 0
				marble.runtime.lastTriggeredBeat = undefined
				marble.runtime.lastTriggeredDirection = undefined
				marble.runtime.jumpedToBeat = undefined

				// Recalculate position on new rail
				const points = getCurrentPathPoints(marble)
				calculateMarblePosition(marble, marble.currentBeat, points, easing)
			}
		}
	}

	// Apply manual beat override AFTER rail switch (allows setting beat on new rail)
	if (marble.runtime.targetBeat !== undefined) {
		const target = marble.runtime.targetBeat
		marble.currentBeat = target
		marble.previousBeat = target // prevent false crossings
		marble.runtime.jumpedToBeat = target // check for instruments at this beat next frame
		marble.runtime.targetBeat = undefined // clear for next frame
	}

	// Get final points with correct branch state
	const points = getCurrentPathPoints(marble)
	calculateMarblePosition(marble, marble.currentBeat, points, easing)
}

export function updateMarbles(
	marbles: Marble[],
	tempo: TempoState,
	instrumentsPerRail: Instrument[][] = [],
	railIds: string[] = [],
	triggerHandler?: TriggerHandler,
	sceneCtx?: SceneCtx,
	globalHandler?: GlobalBeatHandler,
	globalBeatResolution?: number,
	bounceHandler?: import('./scene').BounceHandler,
	bouncerOnlyMode?: boolean,
	noBouncers?: boolean
): void {
	// Fire global beat handler first (before marble updates)
	if (sceneCtx && globalHandler) {
		checkGlobalBeatTrigger(tempo, sceneCtx, globalHandler, globalBeatResolution)
	}

	// Update each marble
	for (let i = 0; i < marbles.length; i++) {
		const instruments = instrumentsPerRail[i] || []
		const railId = railIds[i] || ''
		updateMarble(marbles[i], tempo, instruments, railId, i, triggerHandler, sceneCtx)
	}

	// Check for marble collisions (after all positions updated)
	if (noBouncers) {
		return
	}

	const globalBeat = tempo.currentBeat + tempo.beatProgress
	checkMarbleCollisions(
		marbles,
		railIds,
		globalBeat,
		sceneCtx,
		bounceHandler,
		bouncerOnlyMode ?? true
	)
}
