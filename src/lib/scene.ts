import type { InstrumentTriggerContext } from './instrument'
import type { RailData } from './rail-data'
import type { AudioChainConfig } from './audio/types'
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

/**
 * Bounce handler context (fired when two marbles collide)
 */
export type BounceContext = {
	scene: SceneCtx
	marble1: MarbleEntity
	marble2: MarbleEntity
	rail: RailEntity
	beat: number // collision beat position
	globalBeat: number
}

export type BounceHandler = (ctx: BounceContext) => void

export type SceneConfig = {
	id: string
	bpm: number
	rails: RailData[]
	triggerHandler?: TriggerHandler
	globalBeatHandler?: GlobalBeatHandler
	bounceHandler?: BounceHandler
	/** Beat resolution for global handler (default 8 = eighth notes, 16 = sixteenth notes) */
	globalBeatResolution?: number
	camera?: Vector3Tuple
	target?: Vector3Tuple
	polar?: boolean
	renderPlayOnly?: boolean
	/** Optimize collision checks (assumes all marbles are bouncers, skips rail/branch matching) */
	bouncerOnlyMode?: boolean
	/** Audio config: named/shared chains, buses, master */
	audio?: {
		chains?: Record<string, AudioChainConfig>
		buses?: Record<string, import('./audio/types').BusConfig>
		master?: import('./audio/types').MasterConfig
	}
	audioView?: {
		offset?: Vector3Tuple
		analyzers?: boolean
		text?: boolean
		all?: boolean
		color?: string
		midiAlpha?: number
		module?: number
		defaultAnalyser?: 'fft' | 'meter' | 'waveform'
	}
}
