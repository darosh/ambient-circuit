import { describe, it, expect, vi } from 'vitest'
import { createMarble } from '../src/lib/core/marble'
import { MarbleState } from '../src/lib/core/marble-state'
import { updateMarble } from '../src/lib/core/marble-system'
import { resolveRail } from '../src/lib/core/rail-resolve'
import type { SceneConfig } from '../src/lib/core/scene'
import { createTempoState, type TempoState } from '../src/lib/core/tempo'
import type { TriggerHandler } from '../src/lib/core/scene'
import { createSceneCtx } from '../src/lib/core/scene-ctx-factory'
import type { RailData } from '../src/lib/core/rail-data'

describe('Rail Switching API', () => {
	// Helper to create test rails
	function createTestRails() {
		const rail1 = resolveRail({
			id: 'rail-1',
			nodes: [
				[0, 0, 0],
				[1, 0, 0],
				[2, 0, 0],
				[3, 0, 0],
				[4, 0, 0]
			]
		})
		const rail2 = resolveRail({
			id: 'rail-2',
			nodes: [
				[0, 1, 0],
				[1, 1, 0],
				[2, 1, 0],
				[3, 1, 0]
			]
		})
		const rail3 = resolveRail({
			id: 'rail-3',
			nodes: [
				[0, 2, 0],
				[1, 2, 0]
			]
		})
		return { rail1, rail2, rail3 }
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

	it('basic switch - verify rail change, beat reset, branch reset', () => {
		const { rail1, rail2 } = createTestRails()

		const marble = createMarble({
			resolvedRail: rail1,
			startBeat: 2,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		})

		// Create dummy marble for rail2 so sceneCtx has resolvedRail
		const dummyMarble = createMarble({
			resolvedRail: rail2,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		})

		// Set up scene context
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		tempo.isPlaying = true

		const railDataList: RailData[] = [
			{ id: rail1.id, nodes: [], color: '#ff0000' },
			{ id: rail2.id, nodes: [], color: '#00ff00' }
		]
		const sceneCtx = createSceneCtx(
			[marble, dummyMarble],
			railDataList,
			[0, 1],
			tempo,
			{} as SceneConfig
		)

		// Verify initial state
		expect(marble.config.resolvedRail.id).toBe('rail-1')
		expect(marble.currentBeat).toBe(2)
		expect(marble.runtime.railId).toBeUndefined()

		// Switch to rail2
		const state = new MarbleState(marble)
		state.railId = 'rail-2'
		expect(marble.runtime.targetRailId).toBe('rail-2')

		// Advance one frame to apply switch
		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, [], 'rail-1', 0, undefined, sceneCtx)

		// Verify switch applied
		expect(marble.config.resolvedRail.id).toBe('rail-2')
		expect(marble.runtime.railId).toBe('rail-2')
		expect(marble.currentBeat).toBe(0) // reset to minBeat of rail2
		expect(marble.branchIndex).toBeNull() // branch reset
		expect(marble.routingCounter).toBe(0)
		expect(marble.runtime.lastTriggeredBeat).toBeUndefined()
		expect(marble.runtime.targetRailId).toBeUndefined() // cleared
	})

	it('invalid rail - warn and stay on current rail', () => {
		const { rail1 } = createTestRails()
		const marble = createMarble({
			resolvedRail: rail1,
			startBeat: 2,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		})

		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		tempo.isPlaying = true

		const railDataList: RailData[] = [{ id: rail1.id, nodes: [], color: '#ff0000' }]
		const sceneCtx = createSceneCtx([marble], railDataList, [0], tempo, {} as SceneConfig)

		// Mock console.warn
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

		// Try to switch to non-existent rail
		const state = new MarbleState(marble)
		state.railId = 'nonexistent'

		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, [], 'rail-1', 0, undefined, sceneCtx)

		// Verify warning and no change
		expect(warnSpy).toHaveBeenCalledWith('[rail-switch] Rail "nonexistent" not found')
		expect(marble.config.resolvedRail.id).toBe('rail-1')
		expect(marble.runtime.railId).toBeUndefined()

		warnSpy.mockRestore()
	})

	it('state preservation - speed/note/direction/visual props kept', () => {
		const { rail1, rail2 } = createTestRails()
		const marble = createMarble({
			resolvedRail: rail1,
			startBeat: 2,
			direction: 'backward' as const,
			sequenceMode: 'ping-pong' as const,
			easing: 'linear',
			speed: 1,
			note: 60,
			type: 'poly',
			sides: 8
		})

		// Set runtime overrides
		marble.runtime.speed = 2
		marble.runtime.note = 72
		marble.runtime.color = '#ff00ff'
		marble.runtime.easing = 'easeOutBounce'

		const dummyMarble = createMarble({
			resolvedRail: rail2,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		})

		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		tempo.isPlaying = true

		const railDataList: RailData[] = [
			{ id: rail1.id, nodes: [], color: '#ff0000' },
			{ id: rail2.id, nodes: [], color: '#00ff00' }
		]
		const sceneCtx = createSceneCtx(
			[marble, dummyMarble],
			railDataList,
			[0, 1],
			tempo,
			{} as SceneConfig
		)

		// Switch rail
		const state = new MarbleState(marble)
		state.railId = 'rail-2'

		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, [], 'rail-1', 0, undefined, sceneCtx)

		// Verify identity preserved
		expect(marble.direction).toBe('backward')
		expect(marble.config.sequenceMode).toBe('ping-pong')
		expect(marble.runtime.speed).toBe(2)
		expect(marble.runtime.note).toBe(72)
		expect(marble.runtime.color).toBe('#ff00ff')
		expect(marble.runtime.easing).toBe('easeOutBounce')
		expect(marble.config.type).toBe('poly')
		expect(marble.config.sides).toBe(8)

		// Verify rail-specific state reset
		expect(marble.currentBeat).toBe(0)
		expect(marble.branchIndex).toBeNull()
	})

	it('same rail no-op - early return, no state change', () => {
		const { rail1 } = createTestRails()
		const marble = createMarble({
			resolvedRail: rail1,
			startBeat: 2,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		})

		const state = new MarbleState(marble)

		// Try to switch to same rail
		state.railId = 'rail-1'

		// Verify no targetRailId set
		expect(marble.runtime.targetRailId).toBeUndefined()
		expect(marble.currentBeat).toBe(2) // unchanged
	})

	it('trigger after switch - instruments fire on new rail', () => {
		const { rail1, rail2 } = createTestRails()
		const marble = createMarble({
			resolvedRail: rail1,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		})

		const dummyMarble = createMarble({
			resolvedRail: rail2,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		})

		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		tempo.isPlaying = true

		const railDataList: RailData[] = [
			{
				id: rail1.id, nodes: [],
				color: '#ff0000',
				instruments: [{ type: 'sun', beat: 1 }]
			},
			{
				id: rail2.id, nodes: [],
				color: '#00ff00',
				instruments: [{ type: 'heart', beat: 1 }]
			}
		]
		const sceneCtx = createSceneCtx(
			[marble, dummyMarble],
			railDataList,
			[0, 1],
			tempo,
			{} as SceneConfig
		)

		const triggerHandler: TriggerHandler = vi.fn()

		// Switch to rail2
		const state = new MarbleState(marble)
		state.railId = 'rail-2'

		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, [], 'rail-1', 0, triggerHandler, sceneCtx)

		// Verify on rail2
		expect(marble.config.resolvedRail.id).toBe('rail-2')

		// Advance to beat 1 on rail2
		advanceTempo(tempo, 1)
		const rail2Instruments = railDataList[1].instruments || []
		updateMarble(marble, tempo, rail2Instruments, 'rail-2', 0, triggerHandler, sceneCtx)

		// Verify trigger fired for rail2 instrument
		expect(triggerHandler).toHaveBeenCalledTimes(1)
		const call = (triggerHandler as ReturnType<typeof vi.fn>).mock.calls[0][0]
		expect(call.railId).toBe('rail-2')
		expect(call.instrument.instrument.type).toBe('heart')
		expect(call.instrument.instrument.beat).toBe(1)
	})

	it('multiple switches - last write wins', () => {
		const { rail1, rail2, rail3 } = createTestRails()
		const marble = createMarble({
			resolvedRail: rail1,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		})

		const dummy2 = createMarble({
			resolvedRail: rail2,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		})

		const dummy3 = createMarble({
			resolvedRail: rail3,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		})

		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		tempo.isPlaying = true

		const railDataList: RailData[] = [
			{ id: rail1.id, nodes: [], color: '#ff0000' },
			{ id: rail2.id, nodes: [], color: '#00ff00' },
			{ id: rail3.id, nodes: [], color: '#0000ff' }
		]
		const sceneCtx = createSceneCtx(
			[marble, dummy2, dummy3],
			railDataList,
			[0, 1, 2],
			tempo,
			{} as SceneConfig
		)

		const state = new MarbleState(marble)

		// Multiple switches in same frame
		state.railId = 'rail-2'
		state.railId = 'rail-3'

		// Verify last write wins
		expect(marble.runtime.targetRailId).toBe('rail-3')

		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, [], 'rail-1', 0, undefined, sceneCtx)

		// Verify on rail3
		expect(marble.config.resolvedRail.id).toBe('rail-3')
		expect(marble.runtime.railId).toBe('rail-3')
	})

	it('switch + beat override - beat set on new rail', () => {
		const { rail1, rail2 } = createTestRails()
		const marble = createMarble({
			resolvedRail: rail1,
			startBeat: 2,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		})

		const dummyMarble = createMarble({
			resolvedRail: rail2,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear',
			speed: 1
		})

		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })
		tempo.isPlaying = true

		const railDataList: RailData[] = [
			{ id: rail1.id, nodes: [], color: '#ff0000' },
			{ id: rail2.id, nodes: [], color: '#00ff00' }
		]
		const sceneCtx = createSceneCtx(
			[marble, dummyMarble],
			railDataList,
			[0, 1],
			tempo,
			{} as SceneConfig
		)

		const state = new MarbleState(marble)

		// Switch rail and set beat
		state.railId = 'rail-2'
		state.beat = 2

		advanceTempo(tempo, 0.1)
		updateMarble(marble, tempo, [], 'rail-1', 0, undefined, sceneCtx)

		// Verify on rail2 at beat 2
		expect(marble.config.resolvedRail.id).toBe('rail-2')
		expect(marble.currentBeat).toBe(2)
	})
})
