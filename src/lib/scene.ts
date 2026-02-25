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
	user: Record<string, unknown>
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
	user: Record<string, unknown>
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
	user: Record<string, unknown>
}

export type BounceHandler = (ctx: BounceContext) => void

export type SceneConfig = {
	id: string
	description?: string
	bpm: number
	rails: RailData[]
	/** Arbitrary scene-level state, passed through to all handler contexts as ctx.user */
	user?: Record<string, unknown>
	triggerHandler?: TriggerHandler
	globalBeatHandler?: GlobalBeatHandler
	bounceHandler?: BounceHandler
	/** Beat resolution for global handler (default 8 = eighth notes, 16 = sixteenth notes) */
	globalBeatResolution?: number
	camera?: Vector3Tuple
	target?: Vector3Tuple
	tint?: Vector3Tuple
	polar?: boolean
	stars?: boolean
	names?: boolean
	sequencerBeats?: number
	sequencerMode?: 'time' | 'compact'
	sequencerColors?: boolean
	renderPlayOnly?: boolean
	rotatePlay?: boolean | number
	pitch?: number
	velocity?: number
	duration?: number
	/** Optimize collision checks (assumes all marbles are bouncers, skips rail/branch matching) */
	bouncerOnlyMode?: boolean
	/** Audio config: named/shared chains, buses, master */
	audio?: {
		chains?: Record<string, AudioChainConfig>
		buses?: Record<string, import('./audio/types').BusConfig>
		master?: import('./audio/types').MasterConfig
	}
	/** Factory to auto-assign render fn to rails without one */
	renderFactory?: (railData: RailData, index: number) => RailData['render'] | undefined
	audioView?:
		| {
				offset?: Vector3Tuple
				analyzers?: boolean
				text?: boolean
				all?: boolean
				color?: string
				midiAlpha?: number
				module?: number
				defaultAnalyser?: 'fft' | 'meter' | 'waveform'
				marbleLinks?: boolean
		  }
		| false
}
