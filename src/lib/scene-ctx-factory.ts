import type { Marble } from './marble'
import type { RailData } from './rail-data'
import type { TempoState } from './tempo'
import type { SceneCtx, MarbleEntity, InstrumentEntity, RailEntity } from './scene-ctx'
import { MarbleState } from './marble-state'
import { InstrumentState } from './instrument-state'
import { RailState } from './rail-state'

/**
 * Create SceneCtx from scene data (called once at mount)
 */
export function createSceneCtx(
	marbles: Marble[],
	rails: RailData[],
	marbleRailIndices: number[],
	tempo: TempoState
): SceneCtx {
	// Build marble entities with pre-created State wrappers
	const marbleVisRefs = marbles.map(() => ({ value: true }))
	const marbleActRefs = marbles.map(() => ({ value: true }))

	const marbleEntities: MarbleEntity[] = marbles.map((m, i) => ({
		id: i,
		marble: m,
		state: new MarbleState(m, undefined, marbleVisRefs[i], marbleActRefs[i]),
		visibility: marbleVisRefs[i],
		activity: marbleActRefs[i]
	}))

	// Build flat instrument list (from per-rail arrays)
	const instrumentEntities: InstrumentEntity[] = []
	let instIdx = 0
	for (let i = 0; i < rails.length; i++) {
		const instruments = rails[i].instruments || []
		for (const inst of instruments) {
			const visRef = { value: true }
			const actRef = { value: true }
			instrumentEntities.push({
				id: instIdx++,
				instrument: inst,
				state: new InstrumentState(inst, visRef, actRef),
				railId: rails[i].rail.id,
				visibility: visRef,
				activity: actRef
			})
		}
	}

	// Build rail entities
	const railVisRefs = rails.map(() => ({ value: true }))
	const railActRefs = rails.map(() => ({ value: true }))

	const railEntities: RailEntity[] = rails.map((rd, i) => {
		// Find resolved rail from marble configs
		const resolvedRail = marbles.find((m) => m.config.resolvedRail.id === rd.rail.id)?.config
			.resolvedRail

		return {
			id: rd.rail.id,
			railData: rd,
			resolvedRail: resolvedRail!,
			state: new RailState(rd, railVisRefs[i], railActRefs[i]),
			visibility: railVisRefs[i],
			activity: railActRefs[i]
		}
	})

	return {
		marbles: marbleEntities,
		instruments: instrumentEntities,
		rails: railEntities,
		beat: tempo.currentBeat + tempo.beatProgress,
		state: {
			play: tempo.isPlaying,
			bpm: tempo.config.bpm
		}
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
