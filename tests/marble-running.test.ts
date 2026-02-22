import { describe, it, expect } from 'vitest'
import { createMarble } from '../src/lib/marble'
import { updateMarble } from '../src/lib/marble-system'
import { createTempoState } from '../src/lib/tempo'
import { resolveRail } from '../src/lib/rail-resolve'
import { createSceneCtx } from '../src/lib/scene-ctx-factory'
import type { Rail } from '../src/lib/rail'
import type { RailData } from '../src/lib/rail-data'
import type { SceneConfig } from '../src/lib/scene'

const rail: Rail = { id: 'r', nodes: [[0, 0, 0], 'r r r r r'] }
const resolvedRail = resolveRail(rail)

const railData: RailData = { rail: rail, color: '#fff' }

const sceneConfig: SceneConfig = { id: 'test', bpm: 120, rails: [] }

function makeTempo(beat = 1) {
	const t = createTempoState({ bpm: 120, beatsPerBar: 4 })
	t.isPlaying = true
	t.currentBeat = beat
	return t
}

function makeCtx(marbles: ReturnType<typeof createMarble>[], rails: RailData[]) {
	const indices = marbles.map(() => 0)
	return createSceneCtx(marbles, rails, indices, makeTempo(), sceneConfig)
}

describe('marble running: false in config', () => {
	it('marble with running:false stays at startBeat (no sceneCtx)', () => {
		const marble = createMarble({
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
		const marble = createMarble({
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
		const rd: RailData = { rail, color: '#fff', running: false }
		const marble = createMarble({
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
