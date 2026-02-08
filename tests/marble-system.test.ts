import { describe, it, expect } from 'vitest'
import { createMarble } from '../src/lib/marble'
import { updateMarble } from '../src/lib/marble-system'
import { createTempoState } from '../src/lib/tempo'
import type { ResolvedRail } from '../src/lib/rail'

describe('marble-system', () => {
	const testRail: ResolvedRail = {
		id: 'test',
		beatOffset: 0,
		reverse: false,
		points: [
			{ p: [0, 0, 0], beat: 0, round: null, tangent: 0.39 },
			{ p: [1, 0, 0], beat: 1, round: null, tangent: 0.39 },
			{ p: [2, 0, 0], beat: 2, round: null, tangent: 0.39 },
			{ p: [3, 0, 0], beat: 3, round: null, tangent: 0.39 }
		],
		splits: []
	}

	it('marble starts at beat 0', () => {
		const marble = createMarble({
			resolvedRail: testRail,
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		updateMarble(marble, tempo)

		expect(marble.currentBeat).toBe(0)
		expect(marble.position.x).toBeCloseTo(0, 5)
	})

	it('marble advances with global beat', () => {
		const marble = createMarble({
			resolvedRail: testRail,
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		tempo.currentBeat = 1
		tempo.beatProgress = 0.5

		updateMarble(marble, tempo)

		expect(marble.currentBeat).toBeCloseTo(1.5, 5)
		expect(marble.position.x).toBeCloseTo(1.5, 1)
	})

	it('marble loops at end of rail', () => {
		const marble = createMarble({
			resolvedRail: testRail,
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		tempo.currentBeat = 4 // past end of rail (beat 3)

		updateMarble(marble, tempo)

		expect(marble.currentBeat).toBeCloseTo(1, 5) // wrapped back
	})

	it('marble ping-pongs at end of rail', () => {
		const marble = createMarble({
			resolvedRail: testRail,
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'ping-pong',
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		tempo.currentBeat = 4

		updateMarble(marble, tempo)

		expect(marble.direction).toBe('backward')
		expect(marble.currentBeat).toBeCloseTo(2, 5)
	})
})
