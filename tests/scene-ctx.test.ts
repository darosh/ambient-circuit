import { describe, it, expect } from 'vitest'
import { createSceneCtx, updateSceneCtx } from '../src/lib/scene-ctx-factory'
import { createMarble } from '../src/lib/marble'
import { createTempoState } from '../src/lib/tempo'
import { resolveRail } from '../src/lib/rail-resolve'
import type { RailData } from '../src/lib/rail-data'
import type { SceneConfig } from '../src/lib/scene'

describe('scene-ctx', () => {
	it('createSceneCtx creates correct entity counts', () => {
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		const rails: RailData[] = [
			{
				rail: {
					id: 'rail1',
					nodes: [
						[0, 0, 0],
						[1, 0, 0]
					]
				},
				color: '#ff0000',
				instruments: [
					{ beat: 0, sides: 3 },
					{ beat: 1, sides: 4 }
				]
			},
			{
				rail: {
					id: 'rail2',
					nodes: [
						[0, 0, 0],
						[1, 0, 0]
					]
				},
				color: '#00ff00',
				instruments: [{ beat: 0, sides: 5 }]
			}
		]

		const resolvedRail1 = resolveRail(rails[0].rail)
		const resolvedRail2 = resolveRail(rails[1].rail)

		const marbles = [
			createMarble({
				resolvedRail: resolvedRail1,
				startBeat: 0,
				direction: 'forward',
				sequenceMode: 'looping',
				easing: 'linear'
			}),
			createMarble({
				resolvedRail: resolvedRail2,
				startBeat: 0,
				direction: 'forward',
				sequenceMode: 'looping',
				easing: 'linear'
			})
		]

		const marbleRailIndices = [0, 1]

		const sceneCtx = createSceneCtx(marbles, rails, marbleRailIndices, tempo, {} as SceneConfig)

		expect(sceneCtx.marbles.length).toBe(2)
		expect(sceneCtx.instruments.length).toBe(3)
		expect(sceneCtx.rails.length).toBe(2)

		// Check marble entities
		expect(sceneCtx.marbles[0].id).toBe(0)
		expect(sceneCtx.marbles[0].marble).toBe(marbles[0])
		expect(sceneCtx.marbles[0].visibility.value).toBe(true)
		expect(sceneCtx.marbles[0].activity.value).toBe(true)

		// Check instrument entities
		expect(sceneCtx.instruments[0].id).toBe(0)
		expect(sceneCtx.instruments[0].railId).toBe('rail1')
		expect(sceneCtx.instruments[1].id).toBe(1)
		expect(sceneCtx.instruments[1].railId).toBe('rail1')
		expect(sceneCtx.instruments[2].id).toBe(2)
		expect(sceneCtx.instruments[2].railId).toBe('rail2')

		// Check rail entities
		expect(sceneCtx.rails[0].id).toBe('rail1')
		expect(sceneCtx.rails[1].id).toBe('rail2')
	})

	it('entity State wrappers mutate underlying objects', () => {
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		const rails: RailData[] = [
			{
				rail: {
					id: 'rail1',
					nodes: [
						[0, 0, 0],
						[1, 0, 0]
					]
				},
				color: '#ff0000',
				instruments: [{ beat: 0, sides: 3 }]
			}
		]

		const resolvedRail = resolveRail(rails[0].rail)

		const marbles = [
			createMarble({
				resolvedRail,
				startBeat: 0,
				direction: 'forward',
				sequenceMode: 'looping',
				easing: 'linear'
			})
		]

		const marbleRailIndices = [0]
		const sceneCtx = createSceneCtx(marbles, rails, marbleRailIndices, tempo, {} as SceneConfig)

		// Test marble state
		sceneCtx.marbles[0].state.speed = 2
		expect(marbles[0].runtime.speed).toBe(2)

		// Test instrument state
		sceneCtx.instruments[0].state.color = '#00ff00'
		expect(rails[0].instruments![0].runtime!.color).toBe('#00ff00')

		// Test rail state
		sceneCtx.rails[0].state.color = '#0000ff'
		expect(rails[0].runtime!.color).toBe('#0000ff')
	})

	it('visibility/activity refs work with async mutations', async () => {
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		const rails: RailData[] = [
			{
				rail: {
					id: 'rail1',
					nodes: [
						[0, 0, 0],
						[1, 0, 0]
					]
				},
				color: '#ff0000',
				instruments: [{ beat: 0, sides: 3 }]
			}
		]

		const resolvedRail = resolveRail(rails[0].rail)

		const marbles = [
			createMarble({
				resolvedRail,
				startBeat: 0,
				direction: 'forward',
				sequenceMode: 'looping',
				easing: 'linear'
			})
		]

		const marbleRailIndices = [0]
		const sceneCtx = createSceneCtx(marbles, rails, marbleRailIndices, tempo, {} as SceneConfig)

		// Initial state
		expect(sceneCtx.marbles[0].state.visible).toBe(true)

		// Async mutation
		setTimeout(() => {
			sceneCtx.marbles[0].state.visible = false
		}, 10)

		await new Promise((resolve) => setTimeout(resolve, 20))

		expect(sceneCtx.marbles[0].state.visible).toBe(false)
		expect(sceneCtx.marbles[0].visibility.value).toBe(false)
	})

	it('updateSceneCtx updates beat and play state', () => {
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		const rails: RailData[] = [
			{
				rail: {
					id: 'rail1',
					nodes: [
						[0, 0, 0],
						[1, 0, 0]
					]
				},
				color: '#ff0000'
			}
		]

		const resolvedRail = resolveRail(rails[0].rail)

		const marbles = [
			createMarble({
				resolvedRail,
				startBeat: 0,
				direction: 'forward',
				sequenceMode: 'looping',
				easing: 'linear'
			})
		]

		const marbleRailIndices = [0]
		const sceneCtx = createSceneCtx(marbles, rails, marbleRailIndices, tempo, {} as SceneConfig)

		// Initial state
		expect(sceneCtx.beat).toBe(0)
		expect(sceneCtx.state.play).toBe(false)
		expect(sceneCtx.state.bpm).toBe(120)

		// Update tempo
		tempo.isPlaying = true
		tempo.currentBeat = 5
		tempo.beatProgress = 0.5

		// Update context
		updateSceneCtx(sceneCtx, tempo)

		expect(sceneCtx.beat).toBe(5.5)
		expect(sceneCtx.state.play).toBe(true)
		expect(sceneCtx.state.bpm).toBe(120)
	})

	it('beat quantization detects eighth note changes', () => {
		// Test eighth note detection logic
		const beats = [0, 0.124, 0.125, 0.249, 0.25, 0.5, 0.75, 1]

		const eighths = beats.map((b) => Math.floor(b * 8))

		expect(eighths[0]).toBe(0) // 0
		expect(eighths[1]).toBe(0) // 0.124
		expect(eighths[2]).toBe(1) // 0.125
		expect(eighths[3]).toBe(1) // 0.249
		expect(eighths[4]).toBe(2) // 0.25
		expect(eighths[5]).toBe(4) // 0.5
		expect(eighths[6]).toBe(6) // 0.75
		expect(eighths[7]).toBe(8) // 1.0

		// Verify transitions
		expect(eighths[0]).not.toBe(eighths[2]) // 0 → 0.125
		expect(eighths[2]).toBe(eighths[3]) // 0.125 → 0.249 (same eighth)
		expect(eighths[3]).not.toBe(eighths[4]) // 0.249 → 0.25
	})
})
