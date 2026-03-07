import { describe, it, expect, beforeEach } from 'vitest'
import {
	createMarbleInstance,
	resetMarbleIdCounter,
	type ResolvedMarble
} from '../src/lib/core/marble'
import { MarbleState } from '../src/lib/core/marble-state'
import { updateMarbles } from '../src/lib/core/marble-system'
import { resolveRail } from '../src/lib/core/rail-resolve'
import { createTempoState, type TempoState } from '../src/lib/core/tempo'
import type { InstrumentConfig } from '../src/lib/core/instrument'
import {
	createSceneCtx,
	addMarbleEntity,
	removeMarbleEntity,
	reindexMarbles
} from '../src/lib/core/scene-ctx-factory'
import type { RailConfig } from '../src/lib/core/rail-config'
import type { SceneConfig } from '../src/lib/core/scene'

function createTestRail(id = 'test-rail') {
	return resolveRail({
		id,
		nodes: [
			[0, 0, 0],
			[1, 0, 0],
			[2, 0, 0],
			[3, 0, 0],
			[4, 0, 0]
		]
	})
}

function advanceTempo(tempo: TempoState, beats: number) {
	const whole = Math.floor(beats)
	const frac = beats - whole
	tempo.currentBeat += whole
	tempo.beatProgress += frac
	while (tempo.beatProgress >= 1) {
		tempo.beatProgress -= 1
		tempo.currentBeat += 1
	}
}

function makeRailData(id = 'test-rail', instruments: InstrumentConfig[] = []): RailConfig {
	return {
		id,
		nodes: [
			[0, 0, 0],
			[1, 0, 0],
			[2, 0, 0],
			[3, 0, 0],
			[4, 0, 0]
		],
		color: '#ffffff',
		instruments
	} as RailConfig
}

describe('Marble destroy/create', () => {
	let resolved: ReturnType<typeof createTestRail>
	let tempo: TempoState

	beforeEach(() => {
		resetMarbleIdCounter()
		resolved = createTestRail()
		tempo = createTempoState()
		tempo.isPlaying = true
	})

	function makeConfig(overrides: Partial<ResolvedMarble> = {}): ResolvedMarble {
		return {
			resolvedRail: resolved,
			startBeat: 0,
			direction: 'forward',
			sequenceMode: 'looping',
			easing: 'linear',
			...overrides
		}
	}

	it('destroy() sets runtime.destroyed = true', () => {
		const marble = createMarbleInstance(makeConfig(), 0)
		const state = new MarbleState(marble)
		expect(state.destroyed).toBe(false)
		state.destroy()
		expect(state.destroyed).toBe(true)
		expect(marble.runtime.destroyed).toBe(true)
	})

	it('destroyed marble returned in mutations', () => {
		const m = createMarbleInstance(makeConfig(), 0)
		m.runtime.destroyed = true

		const railData = makeRailData()
		const scene = { rails: [railData] } as SceneConfig
		const ctx = createSceneCtx([m], [railData], [0], tempo, scene)

		const mutations = updateMarbles(
			[m],
			tempo,
			[[]],
			['test-rail'],
			undefined,
			ctx,
			undefined,
			undefined,
			undefined,
			undefined,
			true
		)

		expect(mutations).not.toBeNull()
		expect(mutations!.destroyed).toBe(true)
	})

	it('destroyed marble skips triggers', () => {
		const inst = { beat: 2, path: [] } as unknown as InstrumentConfig
		const m = createMarbleInstance(makeConfig(), 0)

		const railData = makeRailData('test-rail', [inst])
		const scene = { rails: [railData] } as SceneConfig
		const ctx = createSceneCtx([m], [railData], [0], tempo, scene)

		// Destroy marble
		m.runtime.destroyed = true

		let triggered = false
		advanceTempo(tempo, 3)
		updateMarbles(
			[m],
			tempo,
			[[inst]],
			['test-rail'],
			() => {
				triggered = true
			},
			ctx,
			undefined,
			undefined,
			undefined,
			undefined,
			true
		)

		expect(triggered).toBe(false)
	})

	it('create() adds to pending queue', () => {
		const m = createMarbleInstance(makeConfig(), 0)
		const railData = makeRailData()
		const scene = { rails: [railData] } as SceneConfig
		const ctx = createSceneCtx([m], [railData], [0], tempo, scene)

		const railEntity = ctx.rails[0]
		railEntity.state.create({ direction: 'forward' })

		expect(ctx.pendingCreations).toHaveLength(1)
		expect(ctx.pendingCreations[0].railId).toBe('test-rail')
	})

	it('created marble appears in mutations after updateMarbles', () => {
		const m = createMarbleInstance(makeConfig(), 0)
		const railData = makeRailData()
		const scene = { rails: [railData] } as SceneConfig
		const ctx = createSceneCtx([m], [railData], [0], tempo, scene)

		// Queue creation
		ctx.pendingCreations.push({ railId: 'test-rail', data: { direction: 'backward', note: 72 } })

		advanceTempo(tempo, 0.1)
		const mutations = updateMarbles(
			[m],
			tempo,
			[[]],
			['test-rail'],
			undefined,
			ctx,
			undefined,
			undefined,
			undefined,
			undefined,
			true
		)

		expect(mutations).not.toBeNull()
		expect(mutations!.created).toHaveLength(1)
		expect(mutations!.created[0].marble.resolved.direction).toBe('backward')
		expect(mutations!.created[0].marble.resolved.note).toBe(72)
		expect(mutations!.created[0].marble.runtime.created).toBe(true)
		expect(mutations!.created[0].railIndex).toBe(0)
	})

	it('created marble has correct startBeat', () => {
		const m = createMarbleInstance(makeConfig(), 0)
		const railData = makeRailData()
		const scene = { rails: [railData] } as SceneConfig
		const ctx = createSceneCtx([m], [railData], [0], tempo, scene)

		ctx.pendingCreations.push({ railId: 'test-rail', data: { start: 2 } })

		advanceTempo(tempo, 0.1)
		const mutations = updateMarbles(
			[m],
			tempo,
			[[]],
			['test-rail'],
			undefined,
			ctx,
			undefined,
			undefined,
			undefined,
			undefined,
			true
		)

		expect(mutations!.created[0].marble.resolved.startBeat).toBe(2)
		expect(mutations!.created[0].marble.currentBeat).toBe(2)
	})

	it('rewind returns rewind mutation', () => {
		const m = createMarbleInstance(makeConfig(), 0)
		const railData = makeRailData()
		const scene = { rails: [railData] } as SceneConfig
		const ctx = createSceneCtx([m], [railData], [0], tempo, scene)

		// Advance first
		advanceTempo(tempo, 5)
		updateMarbles(
			[m],
			tempo,
			[[]],
			['test-rail'],
			undefined,
			ctx,
			undefined,
			undefined,
			undefined,
			undefined,
			true
		)

		// Rewind (large negative jump)
		tempo.currentBeat = 0
		tempo.beatProgress = 0
		const mutations = updateMarbles(
			[m],
			tempo,
			[[]],
			['test-rail'],
			undefined,
			ctx,
			undefined,
			undefined,
			undefined,
			undefined,
			true
		)

		expect(mutations).not.toBeNull()
		expect(mutations!.rewind).toBe(true)
	})

	it('destroy + create in same frame both work', () => {
		const m1 = createMarbleInstance(makeConfig(), 0)
		const m2 = createMarbleInstance(makeConfig(), 1)
		m1.runtime.destroyed = true

		const railData = makeRailData()
		const scene = { rails: [railData] } as SceneConfig
		const ctx = createSceneCtx([m1, m2], [railData], [0, 0], tempo, scene)

		ctx.pendingCreations.push({ railId: 'test-rail', data: {} })

		advanceTempo(tempo, 0.1)
		const mutations = updateMarbles(
			[m1, m2],
			tempo,
			[[], []],
			['test-rail', 'test-rail'],
			undefined,
			ctx,
			undefined,
			undefined,
			undefined,
			undefined,
			true
		)

		expect(mutations).not.toBeNull()
		expect(mutations!.destroyed).toBe(true)
		expect(mutations!.created).toHaveLength(1)
	})

	it('sceneCtx.marbles stays in sync via add/remove helpers', () => {
		const m1 = createMarbleInstance(makeConfig(), 0)
		const railData = makeRailData()
		const scene = { rails: [railData] } as SceneConfig
		const ctx = createSceneCtx([m1], [railData], [0], tempo, scene)

		expect(ctx.marbles).toHaveLength(1)
		expect(ctx.marbles[0].id).toBe(m1.id)

		// Add
		const m2 = createMarbleInstance(makeConfig(), 1)
		addMarbleEntity(ctx, m2)
		expect(ctx.marbles).toHaveLength(2)
		expect(ctx.marbles[1].id).toBe(m2.id)

		// Remove
		removeMarbleEntity(ctx, m1.id)
		expect(ctx.marbles).toHaveLength(1)
		expect(ctx.marbles[0].id).toBe(m2.id)
	})

	it('reindexMarbles fixes indices after mutations', () => {
		const m1 = createMarbleInstance(makeConfig(), 0)
		const m2 = createMarbleInstance(makeConfig(), 5) // wrong index
		const m3 = createMarbleInstance(makeConfig(), 10) // wrong index
		const arr = [m1, m2, m3]
		reindexMarbles(arr)
		expect(arr[0].index).toBe(0)
		expect(arr[1].index).toBe(1)
		expect(arr[2].index).toBe(2)
	})

	it('marble.id is stable and unique', () => {
		const m1 = createMarbleInstance(makeConfig(), 0)
		const m2 = createMarbleInstance(makeConfig(), 1)
		const m3 = createMarbleInstance(makeConfig(), 2)
		expect(m1.id).not.toBe(m2.id)
		expect(m2.id).not.toBe(m3.id)
		expect(m1.id).not.toBe(m3.id)
	})
})
