import type { Marble } from './marble'
import type { Instrument } from './instrument'
import type { RailData } from './rail-data'
import type { ResolvedRail } from './rail'
import type { MarbleState } from './marble-state'
import type { InstrumentState } from './instrument-state'
import type { RailState } from './rail-state'

/**
 * Marble entity with state API and visibility/activity refs
 */
export type MarbleEntity = {
	id: number // marble index
	marble: Marble // raw marble object
	state: MarbleState // pre-built API wrapper
	visibility: { value: boolean } // ref for async mutations
	activity: { value: boolean }
}

/**
 * Instrument entity with state API and visibility/activity refs
 */
export type InstrumentEntity = {
	id: number // instrument index
	instrument: Instrument // raw instrument object
	state: InstrumentState // pre-built API wrapper
	railId: string // parent rail ID
	visibility: { value: boolean }
	activity: { value: boolean }
}

/**
 * Rail entity with state API and visibility/activity refs
 */
export type RailEntity = {
	id: string // rail ID
	railData: RailData // original rail data
	resolvedRail: ResolvedRail // resolved geometry
	state: RailState // pre-built API wrapper
	visibility: { value: boolean }
	activity: { value: boolean }
}

/**
 * Scene-wide context: all entities + global state
 */
export type SceneCtx = {
	// All entities in scene
	marbles: MarbleEntity[]
	instruments: InstrumentEntity[]
	rails: RailEntity[]

	// Global state
	beat: number // current globalBeat (float)
	state: {
		play: boolean // tempo.isPlaying
		bpm: number // tempo.config.bpm
	}
}

/**
 * Handler-specific context: scene + current marble/instrument/rail
 */
export type HandlerCtx = {
	scene: SceneCtx // scene-wide context
	marble: MarbleEntity // current marble
	instrument: InstrumentEntity // current instrument
	rail: RailEntity // current rail
}
