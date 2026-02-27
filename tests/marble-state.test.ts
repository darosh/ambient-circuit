import { describe, it, expect, vi } from 'vitest'
import { createMarble, type MarbleConfig } from '../src/lib/marble'
import { MarbleState } from '../src/lib/marble-state'
import { updateMarble } from '../src/lib/marble-system'
import { resolveRail } from '../src/lib/rail-resolve'
import { createTempoState, type TempoState } from '../src/lib/tempo'
import type { Instrument } from '../src/lib/instrument'
import type { TriggerHandler, SceneConfig } from '../src/lib/scene'
import { createSceneCtx } from '../src/lib/scene-ctx-factory'
import type { RailData } from '../src/lib/rail-data'
import { MockInstance } from '@vitest/spy'

describe('MarbleState - full roundtrip with triggers', () => {
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

	function advanceTempo(tempo: TempoState, beats: number) {
		const wholeBeatIncrement = Math.floor(beats)
		const fractionalBeat = beats - wholeBeatIncrement
		tempo.currentBeat += wholeBeatIncrement
		tempo.beatProgress += fractionalBeat

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
		tempo.isPlaying = true
		const instruments: Instrument[] = [{ type: 'sun', beat: 4 }]
		const railData: RailData[] = [
			{ rail: { id: 'test-rail', nodes: [] }, color: '#ffffff', instruments }
		]
		const sceneCtx = createSceneCtx([marble], railData, [0], tempo, {} as SceneConfig)

		const triggerHandler: TriggerHandler = vi.fn((ctx) => {
			ctx.marble.state.reverse()
		})

		for (let i = 0; i < 4; i++) {
			advanceTempo(tempo, 0.95)
			updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		}
		expect(triggerHandler).not.toHaveBeenCalled()

		advanceTempo(tempo, 0.3)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		expect(triggerHandler).toHaveBeenCalledTimes(1)
		expect(marble.direction).toBe('backward')

		// Move backward past beat 4 - does NOT re-trigger:
		// reverse() sets lastTriggeredDirection to 'backward', so backward crossing is blocked
		advanceTempo(tempo, 2)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		expect(triggerHandler).toHaveBeenCalledTimes(1) // still 1

		// Force forward, cross beat 4 again - triggers (lastTriggeredDirection='backward' vs 'forward')
		marble.direction = 'forward'
		advanceTempo(tempo, 4)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
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
		tempo.isPlaying = true
		const instruments: Instrument[] = [
			{ type: 'sun', beat: 2 },
			{ type: 'sun', beat: 6 }
		]
		const railData: RailData[] = [
			{ rail: { id: 'test-rail', nodes: [] }, color: '#ffffff', instruments }
		]
		const sceneCtx = createSceneCtx([marble], railData, [0], tempo, {} as SceneConfig)

		const triggerHandler: TriggerHandler = vi.fn((ctx) => {
			if (ctx.beat === 2) {
				ctx.marble.state.beat = 6
			}
		})

		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)

		expect(triggerHandler).toHaveBeenCalledTimes(2) // beat 2 + beat 6
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((triggerHandler as any).mock.calls[0][0]).toMatchObject({ beat: 2 })
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((triggerHandler as any).mock.calls[1][0]).toMatchObject({ beat: 6 })

		expect(marble.currentBeat).toBeCloseTo(6, 0)
		expect(marble.previousBeat).toBeCloseTo(6, 0)

		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		expect(triggerHandler).toHaveBeenCalledTimes(2) // still 2

		advanceTempo(tempo, 4) // wrap ~4 beats: lands near beat 2, re-triggers
		const callsBefore = (triggerHandler as unknown as MockInstance).mock.calls.length
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		expect((triggerHandler as unknown as MockInstance).mock.calls.length).toBeGreaterThan(
			callsBefore
		)
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
		tempo.isPlaying = true
		const instruments: Instrument[] = [{ type: 'sun', beat: 2 }]
		const railData: RailData[] = [
			{ rail: { id: 'test-rail', nodes: [] }, color: '#ffffff', instruments }
		]
		const sceneCtx = createSceneCtx([marble], railData, [0], tempo, {} as SceneConfig)

		const triggerHandler: TriggerHandler = vi.fn((ctx) => {
			ctx.marble.state.speed = 2
		})

		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		expect(triggerHandler).toHaveBeenCalledTimes(1)

		const beatBefore = marble.currentBeat

		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)

		const beatAfter = marble.currentBeat
		const beatDelta = beatAfter - beatBefore

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

		expect(state.note).toBe(60)

		state.note = 72 // C5
		expect(state.note).toBe(72)
		expect(marble.runtime.note).toBe(72)
		expect(marble.config.note).toBe(60) // config unchanged

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
		tempo.isPlaying = true
		const instruments: Instrument[] = [
			{ type: 'sun', beat: 2 },
			{ type: 'sun', beat: 4 },
			{ type: 'sun', beat: 6 }
		]
		const railData: RailData[] = [
			{ rail: { id: 'test-rail', nodes: [] }, color: '#ffffff', instruments }
		]
		const sceneCtx = createSceneCtx([marble], railData, [0], tempo, {} as SceneConfig)

		const triggers: number[] = []
		const triggerHandler: TriggerHandler = vi.fn((ctx) => {
			triggers.push(ctx.beat)
		})

		for (let i = 0; i < 8; i++) {
			advanceTempo(tempo, 1)
			updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		}

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
		tempo.isPlaying = true
		const instruments: Instrument[] = [{ type: 'sun', beat: 4 }]
		const railData: RailData[] = [
			{ rail: { id: 'test-rail', nodes: [] }, color: '#ffffff', instruments }
		]
		const sceneCtx = createSceneCtx([marble], railData, [0], tempo, {} as SceneConfig)

		let reverseCount = 0
		const triggerHandler: TriggerHandler = vi.fn((ctx) => {
			reverseCount++
			ctx.marble.state.reverse()
		})

		for (let i = 0; i < 4; i++) {
			advanceTempo(tempo, 1)
			updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		}
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		expect(reverseCount).toBe(1)
		expect(marble.direction).toBe('backward')

		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		expect(reverseCount).toBe(1)

		marble.direction = 'forward'
		advanceTempo(tempo, 2)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		expect(reverseCount).toBe(2)
		expect(marble.direction).toBe('backward')

		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		expect(reverseCount).toBe(2)
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
		tempo.isPlaying = true
		const instruments: Instrument[] = [
			{ type: 'sun', beat: 2 },
			{ type: 'sun', beat: 6 }
		]
		const railData: RailData[] = [
			{ rail: { id: 'test-rail', nodes: [] }, color: '#ffffff', instruments }
		]
		const sceneCtx = createSceneCtx([marble], railData, [0], tempo, {} as SceneConfig)

		const triggeredBeats: number[] = []
		const triggerHandler: TriggerHandler = vi.fn((ctx) => {
			triggeredBeats.push(ctx.beat)
			if (ctx.beat === 2) {
				ctx.marble.state.beat = 6
			}
		})

		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		advanceTempo(tempo, 1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)

		expect(triggeredBeats).toContain(2)
		expect(marble.currentBeat).toBeCloseTo(6, 0)

		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, instruments, 'test-rail', 0, triggerHandler, sceneCtx)

		expect(triggeredBeats).toContain(6)
		expect(marble.currentBeat).toBeGreaterThan(6)
	})
})
