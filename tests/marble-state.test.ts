import { describe, it, expect, vi } from 'vitest'
import { createMarble, type Marble, type MarbleConfig } from '../src/lib/marble'
import { MarbleState } from '../src/lib/marble-state'
import { updateMarble } from '../src/lib/marble-system'
import { resolveRail } from '../src/lib/rail-resolve'
import { createTempoState, type TempoState } from '../src/lib/tempo'
import type { Instrument } from '../src/lib/instrument'
import type { TriggerHandler } from '../src/lib/scene'

describe('MarbleState - full roundtrip with triggers', () => {
	// Helper to create a simple rail
	function createTestRail() {
		return resolveRail({
			id: 'test-rail',
			nodes: [
				[0, 0, 0],
				[1, 0, 0],
				[2, 0, 0],
				[3, 0, 0],
				[4, 0, 0],
				[5, 0, 0],
				[6, 0, 0],
				[7, 0, 0],
				[8, 0, 0]
			]
		})
	}

	// Helper to advance tempo
	function advanceTempo(tempo: TempoState, beats: number) {
		const wholeBeatIncrement = Math.floor(beats)
		const fractionalBeat = beats - wholeBeatIncrement
		tempo.currentBeat += wholeBeatIncrement
		tempo.beatProgress += fractionalBeat

		// Normalize beatProgress
		while (tempo.beatProgress >= 1) {
			tempo.beatProgress -= 1
			tempo.currentBeat += 1
		}
	}

	it('direction reversal prevents immediate re-trigger', () => {
		const rail = createTestRail()
		const config: MarbleConfig = {
			resolvedRail: rail,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		}
		const marble = createMarble(config)
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		const instruments: Instrument[] = [{ type: 'sun', beat: 4 }]

		const triggerHandler: TriggerHandler = vi.fn((ctx) => {
			// Reverse direction when hitting beat 4
			ctx.state.reverse()
		})

		// Advance incrementally to avoid > 1 beat jump (which skips triggers)
		for (let i = 0; i < 4; i++) {
			advanceTempo(tempo, 0.95)
			updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		}
		expect(triggerHandler).not.toHaveBeenCalled()

		// Advance past beat 4 - should trigger once
		advanceTempo(tempo, 0.3)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		expect(triggerHandler).toHaveBeenCalledTimes(1)
		expect(marble.direction).toBe('backward')

		// Advance one more frame - marble is now moving backward from beat 4
		// Should NOT re-trigger (prevented by lastTriggeredBeat)
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		expect(triggerHandler).toHaveBeenCalledTimes(1) // still 1, no re-trigger

		// Move away from beat 4 backward
		advanceTempo(tempo, 0.5)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		expect(triggerHandler).toHaveBeenCalledTimes(1)

		// Now move forward again and cross beat 4 - should trigger again
		marble.direction = 'forward'
		advanceTempo(tempo, 1.0)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		expect(triggerHandler).toHaveBeenCalledTimes(2)
	})

	it('beat jumping maintains state consistency', () => {
		const rail = createTestRail()
		const config: MarbleConfig = {
			resolvedRail: rail,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		}
		const marble = createMarble(config)
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		const instruments: Instrument[] = [
			{ type: 'sun', beat: 2 },
			{ type: 'sun', beat: 6 }
		]

		const triggerHandler: TriggerHandler = vi.fn((ctx) => {
			if (ctx.beat === 2) {
				// Jump to beat 6 when hitting beat 2
				ctx.state.beat = 6
			}
		})

		// Advance incrementally to beat 2
		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)

		// Should have triggered at beat 2
		expect(triggerHandler).toHaveBeenCalledTimes(1)
		expect(triggerHandler).toHaveBeenCalledWith(expect.objectContaining({ beat: 2 }))

		// Marble should now be at beat 6
		expect(marble.currentBeat).toBeCloseTo(6, 0)
		expect(marble.previousBeat).toBeCloseTo(6, 0)

		// Advance tempo - should NOT trigger beat 6 (already there)
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		expect(triggerHandler).toHaveBeenCalledTimes(1) // still 1

		// Continue moving - should eventually trigger beat 6 when crossing again
		advanceTempo(tempo, 10) // wrap around via looping
		const callsBefore = (triggerHandler as any).mock.calls.length
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		expect((triggerHandler as any).mock.calls.length).toBeGreaterThan(callsBefore)
	})

	it('speed changes apply on next update', () => {
		const rail = createTestRail()
		const config: MarbleConfig = {
			resolvedRail: rail,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		}
		const marble = createMarble(config)
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		const instruments: Instrument[] = [{ type: 'sun', beat: 2 }]

		const triggerHandler: TriggerHandler = vi.fn((ctx) => {
			// Double speed when hitting beat 2
			ctx.state.speed = 2
		})

		// Advance incrementally to beat 2
		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		expect(triggerHandler).toHaveBeenCalledTimes(1)

		const beatBefore = marble.currentBeat

		// Advance by 1 beat at double speed - marble should move 2 beats
		advanceTempo(tempo, 1.0)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)

		const beatAfter = marble.currentBeat
		const beatDelta = beatAfter - beatBefore

		// Should have moved ~2 beats (double speed)
		expect(beatDelta).toBeCloseTo(2, 0)
	})

	it('note changes are reflected in state', () => {
		const rail = createTestRail()
		const config: MarbleConfig = {
			resolvedRail: rail,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			note: 60 // C4
		}
		const marble = createMarble(config)
		const state = new MarbleState(marble)

		// Initial note from config
		expect(state.note).toBe(60)

		// Change via runtime
		state.note = 72 // C5
		expect(state.note).toBe(72)
		expect(marble.runtime.note).toBe(72)
		expect(marble.config.note).toBe(60) // config unchanged

		// Clear runtime - should fall back to config
		state.note = undefined
		expect(state.note).toBe(60)
	})

	it('multiple instruments trigger in sequence', () => {
		const rail = createTestRail()
		const config: MarbleConfig = {
			resolvedRail: rail,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		}
		const marble = createMarble(config)
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		const instruments: Instrument[] = [
			{ type: 'sun', beat: 2 },
			{ type: 'sun', beat: 4 },
			{ type: 'sun', beat: 6 }
		]

		const triggers: number[] = []
		const triggerHandler: TriggerHandler = vi.fn((ctx) => {
			triggers.push(ctx.beat)
		})

		// Advance through all beats
		for (let i = 0; i < 8; i++) {
			advanceTempo(tempo, 1)
			updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		}

		// Should have triggered all three instruments in order
		expect(triggers).toEqual([2, 4, 6])
	})

	it('looping mode with direction reversal works correctly', () => {
		const rail = createTestRail()
		const config: MarbleConfig = {
			resolvedRail: rail,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		}
		const marble = createMarble(config)
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		const instruments: Instrument[] = [{ type: 'sun', beat: 4 }]

		let reverseCount = 0
		const triggerHandler: TriggerHandler = vi.fn((ctx) => {
			reverseCount++
			ctx.state.reverse()
		})

		// Move forward incrementally to beat 4
		for (let i = 0; i < 4; i++) {
			advanceTempo(tempo, 1)
			updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		}
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		expect(reverseCount).toBe(1)
		expect(marble.direction).toBe('backward')

		// Move backward through beat 4 again
		advanceTempo(tempo, 1.0)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		expect(reverseCount).toBe(2)
		expect(marble.direction).toBe('forward')

		// Should not get stuck in infinite loop
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		expect(reverseCount).toBe(2) // no additional triggers
	})

	it('beat jump triggers instrument at target', () => {
		const rail = createTestRail()
		const config: MarbleConfig = {
			resolvedRail: rail,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		}
		const marble = createMarble(config)
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		const instruments: Instrument[] = [
			{ type: 'sun', beat: 2 },
			{ type: 'sun', beat: 6 }
		]

		let triggeredBeats: number[] = []
		const triggerHandler: TriggerHandler = vi.fn((ctx) => {
			triggeredBeats.push(ctx.beat)
			if (ctx.beat === 2) {
				// Jump to beat 6
				ctx.state.beat = 6
			}
		})

		// Advance to beat 2
		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)

		// Should have triggered beat 2 and jumped to 6
		expect(triggeredBeats).toContain(2)
		expect(marble.currentBeat).toBeCloseTo(6, 0)

		// Advance one more frame - should trigger beat 6 (the jump target) and move forward
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler)

		expect(triggeredBeats).toContain(6)
		// Marble should have moved forward after jumping
		expect(marble.currentBeat).toBeGreaterThan(6)
	})

})
