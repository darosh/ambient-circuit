import { describe, it, expect } from 'vitest'
import { createMarbleInstance } from '../src/lib/core/marble'
import { updateMarble } from '../src/lib/core/marble-system'
import { createTempoState } from '../src/lib/core/tempo'
import { resolveRail } from '../src/lib/core/rail-resolve'
import { createSceneCtx } from '../src/lib/core/scene-ctx-factory'
import type { RailShapeConfig } from '../src/lib/core/rail'
import type { RailConfig } from '../src/lib/core/rail-config'
import type { SceneConfig } from '../src/lib/core/scene'

const rail: RailShapeConfig = { id: 'r', nodes: [[0, 0, 0], 'r r r r r'] }
const resolvedRail = resolveRail(rail)

const railData: RailConfig = { id: 'r', nodes: [[0, 0, 0], 'r r r r r'], color: '#fff' }

const sceneConfig: SceneConfig = { id: 'test', bpm: 120, rails: [] }

function makeTempo(beat = 1) {
	const t = createTempoState({ bpm: 120, beatsPerBar: 4 })
	t.isPlaying = true
	t.currentBeat = beat
	return t
}

function makeCtx(marbles: ReturnType<typeof createMarbleInstance>[], rails: RailConfig[]) {
	const indices = marbles.map(() => 0)
	return createSceneCtx(marbles, rails, indices, makeTempo(), sceneConfig)
}

describe('marble running: false in config', () => {
	it('marble with running:false stays at startBeat (no sceneCtx)', () => {
		const marble = createMarbleInstance({
			resolvedRail,
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear',
			running: false
		})
		const tempo = makeTempo(2)
		updateMarble(marble, tempo)
		expect(marble.currentBeat).toBe(0)
	})

	it('marble with running:false stays at startBeat (with sceneCtx)', () => {
		const marble = createMarbleInstance({
			resolvedRail,
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear',
			running: false
		})
		const tempo = makeTempo(2)
		const ctx = makeCtx([marble], [railData])
		updateMarble(marble, tempo, [], 'r', 0, undefined, ctx)
		expect(marble.currentBeat).toBe(0)
	})
})

describe('rail running: false', () => {
	it('marble on rail with running:false stays at startBeat', () => {
		const rd: RailConfig = {
			id: 'r',
			nodes: [[0, 0, 0], 'r r r r r'],
			color: '#fff',
			running: false
		}
		const marble = createMarbleInstance({
			resolvedRail,
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear'
		})
		const tempo = makeTempo(2)
		const ctx = makeCtx([marble], [rd])
		updateMarble(marble, tempo, [], 'r', 0, undefined, ctx)
		expect(marble.currentBeat).toBe(0)
	})
})
