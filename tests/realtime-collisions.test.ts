import { describe, it, expect } from 'vitest'
import { createMarbleInstance } from '../src/lib/core/marble'
import { updateMarbles } from '../src/lib/core/marble-system'
import { createTempoState, updateTempo } from '../src/lib/core/tempo'
import { resolveRail } from '../src/lib/core/rail-resolve'
import type { RailShapeConfig } from '../src/lib/core/rail'

/**
 * Returns the cyclic order of marbles on the rail as an array of marble IDs,
 * sorted by currentBeat ascending (modulo the rail range).
 * "Accounting for wrap": since it's a looping rail, we normalize beats to [minBeat, maxBeat)
 * and sort to get a cyclic sequence. The RELATIVE cyclic order (which marble is next) should
 * be stable — billiard-ball collision is equivalent to pass-through, so the order is invariant.
 */
function cyclicOrder(
	marbles: ReturnType<typeof createMarbleInstance>[],
	minBeat: number,
	maxBeat: number
): number[] {
	const range = maxBeat - minBeat
	const normalized = marbles.map((m) => {
		const b = (((m.currentBeat - minBeat) % range) + range) % range
		return { id: m.id, beat: b }
	})
	normalized.sort((a, b) => a.beat - b.beat)
	return normalized.map((m) => m.id)
}

/**
 * Given two cyclic sequences of the same elements, check if they represent the same cyclic order.
 * e.g. [0,1,2,3], [1,2,3,0], [2,3,0,1] are all the same cyclic order.
 */
function sameCyclicOrder(a: number[], b: number[]): boolean {
	if (a.length !== b.length) return false
	const n = a.length
	const startIdx = b.indexOf(a[0])
	if (startIdx === -1) return false
	for (let i = 0; i < n; i++) {
		if (a[i] !== b[(startIdx + i) % n]) return false
	}
	return true
}

describe('realtime collisions — marble order preservation', () => {
	it('chaos rail: cyclic marble order preserved after 1 minute at 120fps', () => {
		const rail: RailShapeConfig = {
			id: 'chaos',
			nodes: [[-1.5, 0, 1], 'r r r orb ol l l l ilb ir']
		}
		const resolvedRail = resolveRail(rail)

		const minBeat = resolvedRail.points[0].beat
		const maxBeat = resolvedRail.points.at(-1)!.beat

		const marbleConfigs = [
			{ startBeat: 0, speed: 0.4, direction: 'forward' as const, bouncer: true },
			{ startBeat: 2, speed: 0.6, direction: 'forward' as const, bouncer: true },
			{ startBeat: 4, speed: 0.5, direction: 'backward' as const, bouncer: true },
			{ startBeat: 6, speed: 0.7, direction: 'backward' as const, bouncer: true }
		]

		const marbles = marbleConfigs.map((cfg, i) =>
			createMarbleInstance(
				{
					resolvedRail,
					startBeat: cfg.startBeat,
					direction: cfg.direction,
					sequenceMode: 'looping',
					easing: 'linear',
					speed: cfg.speed,
					bouncer: cfg.bouncer
				},
				i
			)
		)

		const tempo = createTempoState({ bpm: 160, beatsPerBar: 4 })
		tempo.isPlaying = true

		const range = maxBeat - minBeat

		function snapshot() {
			return marbles.map((m) => ({
				id: m.id,
				beat: m.currentBeat,
				normBeat: ((((m.currentBeat - minBeat) % range) + range) % range).toFixed(3),
				dir: m.direction,
				speed: (m.runtime.speed ?? m.config.speed ?? 1).toFixed(2)
			}))
		}

		// initial frame
		updateMarbles(marbles, tempo, [], [])
		const initialOrder = cyclicOrder(marbles, minBeat, maxBeat)

		// console.log('rail range:', minBeat, '→', maxBeat, '(range', range, ')')
		// console.log('initial order (IDs):', initialOrder)
		// console.log('initial state:', snapshot())

		// simulate 1 minute at 120fps
		const fps = 120
		const durationSeconds = 60
		const totalFrames = fps * durationSeconds
		const deltaMs = 1000 / fps

		let lastGoodOrder = initialOrder
		let firstFailFrame = -1
		let firstFailState: ReturnType<typeof snapshot> | null = null
		let lastGoodState = snapshot()

		for (let frame = 0; frame < totalFrames; frame++) {
			updateTempo(tempo, deltaMs)
			updateMarbles(marbles, tempo, [], [])

			const order = cyclicOrder(marbles, minBeat, maxBeat)
			if (sameCyclicOrder(initialOrder, order)) {
				lastGoodOrder = order
				lastGoodState = snapshot()
			} else {
				if (firstFailFrame === -1) {
					firstFailFrame = frame
					firstFailState = snapshot()
					console.log('\n--- ORDER CHANGED ---')
					console.log(
						'frame:',
						frame,
						'| time:',
						(frame / fps).toFixed(2) + 's',
						'| globalBeat:',
						(tempo.currentBeat + tempo.beatProgress).toFixed(3)
					)
					console.log('last good order:', lastGoodOrder, 'at frame', frame - 1)
					console.log('last good state:', lastGoodState)
					console.log('failed order:   ', order)
					console.log('failed state:   ', firstFailState)
				}
			}
		}

		const finalOrder = cyclicOrder(marbles, minBeat, maxBeat)
		// console.log('\nfinal order:', finalOrder)
		// console.log('final state:', snapshot())

		expect(sameCyclicOrder(initialOrder, finalOrder)).toBe(true)
	})
})
