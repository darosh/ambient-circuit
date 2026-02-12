import { describe, it, expect } from 'vitest'
import { createMarble } from '../src/lib/marble'
import { updateMarble } from '../src/lib/marble-system'
import { createTempoState } from '../src/lib/tempo'
import { computeBeatPositions } from '../src/lib/rail-curve'
import type { ResolvedRail } from '../src/lib/rail'

describe('marble-system', () => {
	const testRail: ResolvedRail = {
		id: 'test',
		beatOffset: 0,
		reverse: false,
		tilt: 0,
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

	it('computeBeatPositions works with sparse beats', () => {
		const points = [
			{ p: [0, 0, 0] as [number, number, number], beat: 0, round: null, tangent: 0.39 },
			{ p: [6, 0, 0] as [number, number, number], beat: 2, round: null, tangent: 0.39 }
		]
		const beatPositions = computeBeatPositions(points)

		// Should have 3 beat positions: 0, 1, 2
		expect(beatPositions.length).toBe(3)
		expect(beatPositions[0].beat).toBe(0)
		expect(beatPositions[1].beat).toBe(1)
		expect(beatPositions[2].beat).toBe(2)

		// Check interpolated position at beat 1 (should be halfway)
		expect(beatPositions[1].position.x).toBeCloseTo(3, 1)
	})

	it('marble moves correctly with beat 2 sparse rail', () => {
		const sparseRail: ResolvedRail = {
			id: 'sparse2',
			beatOffset: 0,
			reverse: false,
			tilt: 0,
			points: [
				{ p: [0, 0, 0], beat: 0, round: null, tangent: 0.39 },
				{ p: [6, 0, 0], beat: 2, round: null, tangent: 0.39 }
			],
			splits: []
		}

		const marble = createMarble({
			resolvedRail: sparseRail,
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		// Test beat 0.5 (25% of way from 0 to 2)
		tempo.currentBeat = 0
		tempo.beatProgress = 0.5
		updateMarble(marble, tempo)
		expect(marble.currentBeat).toBeCloseTo(0.5, 1)
		expect(marble.position.x).toBeGreaterThan(0)
		expect(marble.position.x).toBeLessThan(2)

		// Test beat 1.5 (75% of way from 0 to 2)
		tempo.currentBeat = 1
		tempo.beatProgress = 0.5
		updateMarble(marble, tempo)
		expect(marble.currentBeat).toBeCloseTo(1.5, 1)
		expect(marble.position.x).toBeGreaterThan(3)
		expect(marble.position.x).toBeLessThan(6)

		// Should not throw errors
	})

	it('handles sparse beat assignments (e.g., beat 15 on second point)', () => {
		const sparseRail: ResolvedRail = {
			id: 'sparse',
			beatOffset: 0,
			reverse: false,
			tilt: 0,
			points: [
				{ p: [0, 0, 0], beat: 0, round: null, tangent: 0.39 },
				{ p: [6, 0, 0], beat: 15, round: null, tangent: 0.39 }
			],
			splits: []
		}

		const marble = createMarble({
			resolvedRail: sparseRail,
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		// Test fractional beat 7.5 (halfway between 0 and 15)
		tempo.currentBeat = 7
		tempo.beatProgress = 0.5
		updateMarble(marble, tempo)
		expect(marble.currentBeat).toBeCloseTo(7.5, 1)
		expect(marble.position.x).toBeGreaterThan(2.5) // should be roughly halfway
		expect(marble.position.x).toBeLessThan(3.5)

		// Test fractional beat 14.3 (near end)
		tempo.currentBeat = 14
		tempo.beatProgress = 0.3
		updateMarble(marble, tempo)
		expect(marble.currentBeat).toBeCloseTo(14.3, 1)
		expect(marble.position.x).toBeGreaterThan(5.0) // should be near end
		expect(marble.position.x).toBeLessThan(6.0)

		// Test fractional beat 14.9 (very near end)
		tempo.currentBeat = 14
		tempo.beatProgress = 0.9
		updateMarble(marble, tempo)
		expect(marble.currentBeat).toBeCloseTo(14.9, 1)
		expect(marble.position.x).toBeGreaterThan(5.5) // should be very near end
		expect(marble.position.x).toBeLessThan(6.0)

		// Should not throw errors at any point
	})
})
