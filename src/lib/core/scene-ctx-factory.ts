import type { MarbleInstance, MarbleConfig } from './marble'
import type { RailConfig } from './rail-config'
import { toRailShapeConfig } from './rail-config'
import type { TempoState } from './tempo'
import type { SceneCtx, MarbleEntity, InstrumentEntity, RailEntity } from './scene-ctx'
import { MarbleState } from './marble-state'
import { InstrumentState } from './instrument-state'
import { RailState } from './rail-state'
import { resolveRail } from './rail-resolve'
import { SceneConfig } from './scene'

/**
 * Create SceneCtx from scene data (called once at mount)
 */
export function createSceneCtx(
	marbles: MarbleInstance[],
	rails: RailConfig[],
	marbleRailIndices: number[],
	tempo: TempoState,
	scene: SceneConfig,
	user: Record<string, unknown> = {}
): SceneCtx {
	// Snapshot initial marble configs for rewind
	const initialSnapshot = {
		configs: marbles.map((m) => ({ ...m.config }) as MarbleConfig),
		railIndices: [...marbleRailIndices],
		originalIds: marbles.map((m) => m.id)
	}

	// Deferred creation queue (shared with RailState instances)
	const pendingCreations: { railId: string; data: import('./rail-config').MarbleInputConfig }[] = []

	// Build marble entities with pre-created State wrappers
	const marbleVisRefs = marbles.map(() => ({ value: true }))
	const marbleActRefs = marbles.map((m) => ({ value: m.config.active ?? true }))

	const marbleEntities: MarbleEntity[] = marbles.map((m, i) => {
		// Init runtime.running from config
		if (m.runtime.running === undefined && m.config.running !== undefined) {
			m.runtime.running = m.config.running
		}
		return {
			id: m.id,
			marble: m,
			state: new MarbleState(m, undefined, marbleVisRefs[i], marbleActRefs[i]),
			visibility: marbleVisRefs[i],
			activity: marbleActRefs[i]
		}
	})

	// Build flat instrument list (from per-rail arrays)
	const instrumentEntities: InstrumentEntity[] = []
	let instIdx = 0
	for (const rail of rails) {
		const instruments = rail.instruments || []
		for (const inst of instruments) {
			const visRef = { value: inst.visible ?? true }
			const actRef = { value: inst.active ?? true }
			// Initialize runtime.visible from config
			if (!inst.runtime) inst.runtime = {}
			if (inst.runtime.visible === undefined) {
				inst.runtime.visible = inst.visible ?? true
			}
			instrumentEntities.push({
				id: instIdx++,
				instrument: inst,
				state: new InstrumentState(inst, visRef, actRef),
				railId: rail.id,
				visibility: visRef,
				activity: actRef
			})
		}
	}

	// Build rail entities
	const railVisRefs = rails.map(() => ({ value: true }))
	const railActRefs = rails.map((rd) => ({ value: rd.active ?? true }))

	const railEntities: RailEntity[] = rails.map((rd, i) => {
		// Init runtime for running/active from config
		if (!rd.runtime) rd.runtime = {}
		if (rd.runtime.running === undefined && rd.running !== undefined) {
			rd.runtime.running = rd.running
		}
		if (rd.runtime.active === undefined && rd.active !== undefined) {
			rd.runtime.active = rd.active
		}

		// Find resolved rail from marble configs, or resolve it if not found
		let resolvedRail = marbles.find((m) => m.config.resolvedRail.id === rd.id)?.config
			.resolvedRail

		// If no marble uses this rail, resolve it now
		if (!resolvedRail) {
			resolvedRail = resolveRail(toRailShapeConfig(rd))
		}

		return {
			id: rd.id,
			index: i,
			railData: rd,
			resolvedRail: resolvedRail!,
			state: new RailState(rd, railVisRefs[i], railActRefs[i], pendingCreations),
			visibility: railVisRefs[i],
			activity: railActRefs[i]
		}
	})

	// O(1) lookup maps
	const railById = new Map<string, RailEntity>()
	for (const re of railEntities) railById.set(re.id, re)

	const instrumentByRef = new WeakMap<import('./instrument').InstrumentConfig, InstrumentEntity>()
	for (const ie of instrumentEntities) instrumentByRef.set(ie.instrument, ie)

	// Derive hasAnalyzers from config
	const hasAnalyzerChains =
		rails.some((rd) => rd.instruments?.some((inst) => inst.audio?.analyzer)) ||
		Object.values(scene.audio?.chains ?? {}).some((c) => c.analyzer)
	const hasAnalyzerBusses = Object.values(scene.audio?.buses ?? {}).some((b) => b.analyzer)
	const hasAnalyzerMaster = !!scene.audio?.master?.analyzer

	const ctx: SceneCtx = {
		marbles: marbleEntities,
		instruments: instrumentEntities,
		rails: railEntities,
		railById,
		instrumentByRef,
		beat: tempo.currentBeat + tempo.beatProgress,
		state: {
			play: tempo.isPlaying,
			bpm: tempo.config.bpm
		},
		config: scene,
		hasAnalyzers: {
			chains: hasAnalyzerChains,
			busses: hasAnalyzerBusses,
			master: hasAnalyzerMaster
		},
		user,
		chord: {
			current: { notes: [], chord: '', time: 0 },
			history: [],
			scale: { name: '', notes: [] }
		},
		pendingCreations,
		initialSnapshot
	}

	// Wire up sceneCtx back-reference for RailState.marbles
	for (const re of railEntities) re.state._sceneCtx = ctx
	return ctx
}

/**
 * Add a marble entity to sceneCtx (after runtime creation)
 */
export function addMarbleEntity(ctx: SceneCtx, marble: MarbleInstance): MarbleEntity {
	const visRef = { value: true }
	const actRef = { value: marble.config.active ?? true }
	const entity: MarbleEntity = {
		id: marble.id,
		marble,
		state: new MarbleState(marble, undefined, visRef, actRef),
		visibility: visRef,
		activity: actRef
	}
	ctx.marbles.push(entity)
	return entity
}

/**
 * Remove a marble entity by marble ID
 */
export function removeMarbleEntity(ctx: SceneCtx, marbleId: number): void {
	const idx = ctx.marbles.findIndex((e) => e.id === marbleId)
	if (idx !== -1) ctx.marbles.splice(idx, 1)
}

/**
 * Re-index marble.index to match array positions
 */
export function reindexMarbles(marbles: MarbleInstance[]): void {
	for (const [i, marble] of marbles.entries()) {
		marble.index = i
	}
}

/**
 * Update beat/play state each frame (reuses entity objects)
 */
export function updateSceneCtx(ctx: SceneCtx, tempo: TempoState): void {
	ctx.beat = tempo.currentBeat + tempo.beatProgress
	ctx.state.play = tempo.isPlaying
	ctx.state.bpm = tempo.config.bpm
}
