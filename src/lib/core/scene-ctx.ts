import type { MarbleInstance, ResolvedMarble } from './marble'
import type { Vector3Tuple } from 'three/webgpu'
import type { InstrumentConfig } from './instrument'
import type { RailConfig, MarbleConfig, RailRuntime } from './rail-config'
import type { ResolvedRail } from './rail'
import type { MarbleState } from './marble-state'
import type { InstrumentState } from './instrument-state'
import type { RailState } from './rail-state'
import type { AudioChain, ChordInfo } from '../audio'
import { SceneConfig } from './scene'

/**
 * Marble entity with state API and visibility/activity refs
 */
export type MarbleEntity = {
	id: number // marble index
	marble: MarbleInstance // raw marble object
	state: MarbleState // pre-built API wrapper
	visibility: { value: boolean } // ref for async mutations
	activity: { value: boolean }
	audio?: AudioChain // live audio chain instance
}

/**
 * Instrument entity with state API and visibility/activity refs
 */
export type InstrumentEntity = {
	id: number // instrument index
	instrument: InstrumentConfig // raw instrument object
	state: InstrumentState // pre-built API wrapper
	railId: string // parent rail ID
	visibility: { value: boolean }
	activity: { value: boolean }
	audio?: AudioChain // live audio chain instance
}

/**
 * Rail entity with state API and visibility/activity refs
 */
export type RailEntity = {
	id: string // rail ID
	index: number // position in scene rails array
	railData: RailConfig // original rail config
	resolvedRail: ResolvedRail // resolved geometry
	runtime: RailRuntime // mutable runtime state
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

	// O(1) lookup maps (built once at mount)
	railById: Map<string, RailEntity>
	instrumentByRef: WeakMap<InstrumentConfig, InstrumentEntity>

	// Global state
	beat: number // current globalBeat (float)
	state: {
		play: boolean // tempo.isPlaying
		bpm: number // tempo.config.bpm
	}

	config: SceneConfig
	/** Whether analyzers are configured per audio layer */
	hasAnalyzers: { chains: boolean; busses: boolean; master: boolean }
	/** Arbitrary scene-level data, passed through to all handler contexts */
	user: Record<string, unknown>
	chord: {
		scale: {
			name: string
			notes: string[]
		}
		current: ChordInfo
		history: ChordInfo[]
	}

	/** Multi-view state (written by MultiView on mount) */
	view?: ViewState

	// Deferred marble mutations
	pendingCreations: { railId: string; data: MarbleConfig }[]
	// Snapshot for rewind (restore initial state)
	initialSnapshot: { configs: ResolvedMarble[]; railIndices: number[]; originalIds: number[] }
}

/**
 * Per-split runtime state (writable by trigger handlers)
 */
export type ViewSplitState = {
	/** MarbleEntity, marble index, static [x,y,z], or null (free/scene default) */
	camera: MarbleEntity | number | Vector3Tuple | null
	/** MarbleEntity, marble index, static [x,y,z], or null (free/scene default) */
	target: MarbleEntity | number | Vector3Tuple | null
	smoothnessRadius: number
	smoothnessYaw: number
	smoothnessPitch: number
	smoothnessTarget: number
	maxAngleSpeed: number
}

export type ViewState = {
	splits: ViewSplitState[]
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
