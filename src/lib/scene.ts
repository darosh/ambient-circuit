import type { InstrumentTriggerContext } from './instrument'
import type { RailData } from './rail-data'
import type { SceneCtx, MarbleEntity, InstrumentEntity, RailEntity } from './scene-ctx'
import { Vector3Tuple } from 'three/webgpu'

export type TriggerContext = InstrumentTriggerContext & {
	// Current entities (clean access)
	marble: MarbleEntity
	instrument: InstrumentEntity
	rail: RailEntity

	// Scene-wide context
	scene: SceneCtx
}

export type TriggerHandler = (ctx: TriggerContext) => void

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
