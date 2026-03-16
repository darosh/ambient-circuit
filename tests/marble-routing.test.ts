import { describe, it, expect } from 'vitest'
import { createMarbleInstance } from '../src/lib/core/marble'
import { updateMarble } from '../src/lib/core/marble-system'
import { createTempoState } from '../src/lib/core/tempo'
import { resolveRail } from '../src/lib/core/rail-resolve'
import type { RailShapeConfig } from '../src/lib/core/rail'

describe('marble routing through splits', () => {
	// Fork example from Scene.svelte
	const forkRail: RailShapeConfig = {
		id: 'fork-demo',
		nodes: [
			[-2, 0, 0], // a - beat 0
			{
				split: {
					p: [0, 0, 0], // b - beat 1 (split point)
					weights: [1, 1], // alternate between branches
					branches: [
						[{ p: [1, 1, 0], beat: 2 }], // Branch 0: upper
						[{ p: [1, -1, 0], beat: 2 }] // Branch 1: lower
					]
				}
			}
		]
	}

	it('marble starts at beat 0', () => {
		const marble = createMarbleInstance({
			resolvedRail: resolveRail(forkRail),
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		updateMarble(marble, tempo)

		expect(marble.currentBeat).toBe(0)
		expect(marble.branchPath).toEqual([])
		expect(marble.position.x).toBeCloseTo(-2, 1)
	})

	it('marble at beat 0.5 moves along main rail', () => {
		const marble = createMarbleInstance({
			resolvedRail: resolveRail(forkRail),
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		tempo.currentBeat = 0
		tempo.beatProgress = 0.5

		updateMarble(marble, tempo)

		expect(marble.currentBeat).toBeCloseTo(0.5, 5)
		expect(marble.branchPath).toEqual([])
		expect(marble.position.x).toBeCloseTo(-1, 1) // halfway between -2 and 0
	})

	it('marble at beat 1.0 assigns to first branch', () => {
		const marble = createMarbleInstance({
			resolvedRail: resolveRail(forkRail),
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		tempo.currentBeat = 1
		tempo.beatProgress = 0

		updateMarble(marble, tempo)

		expect(marble.currentBeat).toBeCloseTo(1, 5)
		expect(marble.branchPath).toEqual([0]) // first branch (routingCounter starts at 0)
		expect(marble.position.x).toBeCloseTo(0, 1) // at split point
	})

	it('marble at beat 1.5 moves along first branch', () => {
		const marble = createMarbleInstance({
			resolvedRail: resolveRail(forkRail),
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
		expect(marble.branchPath).toEqual([0])
		// Position should be between [0,0,0] and [1,1,0]
		expect(marble.position.x).toBeGreaterThan(0)
		expect(marble.position.x).toBeLessThan(1)
		expect(marble.position.y).toBeGreaterThan(0) // moving up
	})

	it('marble at beat 2.0 reaches end of first branch', () => {
		const marble = createMarbleInstance({
			resolvedRail: resolveRail(forkRail),
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		tempo.currentBeat = 2
		tempo.beatProgress = 0

		updateMarble(marble, tempo)

		expect(marble.currentBeat).toBeCloseTo(2, 5)
		expect(marble.branchPath).toEqual([0])
		expect(marble.position.x).toBeCloseTo(1, 1)
		expect(marble.position.y).toBeCloseTo(1, 1) // upper branch endpoint
	})

	it('marble at beat 2.5 loops back to main rail', () => {
		const marble = createMarbleInstance({
			resolvedRail: resolveRail(forkRail),
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		// First progress to beat 1 to assign branch
		tempo.currentBeat = 1
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		expect(marble.branchPath).toEqual([0])

		// Then progress to beat 2.5 which should loop back
		tempo.currentBeat = 2
		tempo.beatProgress = 0.5
		updateMarble(marble, tempo)

		// Should wrap: beat 2.5 → 0.5, branch reset
		expect(marble.currentBeat).toBeCloseTo(0.5, 5)
		expect(marble.branchPath).toEqual([])
		expect(marble.position.x).toBeCloseTo(-1, 1) // back on main rail
		expect(marble.position.y).toBeCloseTo(0, 1) // back to y=0
	})

	it('marble on second loop assigns to second branch', () => {
		const marble = createMarbleInstance({
			resolvedRail: resolveRail(forkRail),
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		// First loop: reach beat 1 to assign first branch
		tempo.currentBeat = 1
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		expect(marble.branchPath).toEqual([0])
		expect(marble.routingCounters[0]).toBe(1)

		// Continue to beat 2
		tempo.currentBeat = 2
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		expect(marble.branchPath).toEqual([0])

		// Loop back (beat 2.5 → 0.5)
		tempo.currentBeat = 2
		tempo.beatProgress = 0.5
		updateMarble(marble, tempo)
		expect(marble.branchPath).toEqual([])
		expect(marble.currentBeat).toBeCloseTo(0.5, 5)

		// Reach split again on second loop
		tempo.currentBeat = 3
		tempo.beatProgress = 0 // globalBeat = 3, wraps to beat 1
		updateMarble(marble, tempo)

		expect(marble.branchPath).toEqual([1]) // second branch
		expect(marble.routingCounters[0]).toBe(2)
		expect(marble.currentBeat).toBeCloseTo(1, 5) // at split
		expect(marble.position.x).toBeCloseTo(0, 1) // at split point (x=0)
		expect(marble.position.y).toBeCloseTo(0, 1) // at split point (y=0)

		// Note: Lower branch has y=-1 at beat 2, so at beat 1 (split) y=0 is correct
	})
})
