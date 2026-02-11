import type { Instrument, InstrumentTriggerContext } from './instrument'
import type { Marble } from './marble'
import type { MarbleState } from './marble-state'
import type { InstrumentState } from './instrument-state'
import type { MidiState } from './midi'
import type { RailData } from './rail-data'
import type { SceneCtx, HandlerCtx } from './scene-ctx'
import { Vector3Tuple } from 'three/webgpu'

export type SceneTriggerContext = InstrumentTriggerContext & {
	// Legacy fields (backward compat)
	instrument: Instrument
	marble: Marble
	state: MarbleState
	instrumentState: InstrumentState
	midiState: MidiState | null

	// NEW: scene-wide context
	scene: SceneCtx

	// NEW: handler context (current entities)
	ctx: HandlerCtx
}

export type TriggerHandler = (ctx: SceneTriggerContext) => void

/**
 * Global beat handler context (fired every fractional beat)
 */
export type GlobalBeatContext = {
	scene: SceneCtx
	beat: number // current globalBeat
	prevBeat: number // previous globalBeat
	isPlaying: boolean
	phase: 'init' | 'tick' | 'play' | 'pause' | 'destroy' // lifecycle phase
}

export type GlobalBeatHandler = (ctx: GlobalBeatContext) => void

export type SceneConfig = {
	id: string
	bpm: number
	rails: RailData[]
	triggerHandler?: TriggerHandler
	globalBeatHandler?: GlobalBeatHandler
	/** Beat resolution for global handler (default 8 = eighth notes, 16 = sixteenth notes) */
	globalBeatResolution?: number
	camera?: Vector3Tuple
	target?: Vector3Tuple
}
