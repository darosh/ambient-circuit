import type { InstrumentTriggerContext } from './instrument'
import type { RailConfig } from './rail-config'
import type { AudioChainConfig } from '../audio/types'
import type { SceneCtx, MarbleEntity, InstrumentEntity, RailEntity } from './scene-ctx'
import { Vector3Tuple } from 'three/webgpu'

export type BloomConfig = {
	strength?: number
	radius?: number
	threshold?: number
}

export type ViewSplitConfig = {
	/** Marble index or static [x,y,z] pos for camera; undefined = free orbit */
	camera?: number | Vector3Tuple
	/** Marble index or static [x,y,z] pos for look-at target; undefined = scene default */
	target?: number | Vector3Tuple
	/** Shift camera back along -tangent for chase cam (metres) */
	tangentOffset?: number
	/** Camera position lerp speed (default 0.05; higher = snappier) */
	smoothnessRadius?: number
	/** Look-at angle damp speed (default 0.05; higher = snappier) */
	smoothnessYaw?: number
	smoothnessPitch?: number
	/** Look-at target pivot lerp speed (default 0.05; higher = snappier) */
	smoothnessTarget?: number
	/** Max angle change speed in rad/s (default Infinity = unlimited) */
	maxAngleSpeed?: number
	autoRotate?: boolean | number
	fov?: number
	/** Per-split bloom — true uses defaults, object overrides params, false/absent = no bloom */
	bloom?: boolean | BloomConfig
	/** Column span (default 1). Horizontal: extra width units; Grid: colspan */
	cols?: number
	/** Row span (default 1). Vertical: extra height units; Grid: rowspan */
	rows?: number
}

export type ViewConfig = {
	layout: 'horizontal' | 'vertical' | 'grid'
	splits: ViewSplitConfig[]
	/** Default bloom applied to splits that have bloom:true */
	bloomDefaults?: BloomConfig
	/** Bloom the HUD overlay too (composites before bloom instead of after) */
	hudBloom?: boolean
}

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

export type RenderFactory = (railData: RailConfig, index: number) => RailConfig['render']

export type SceneConfig = {
	id: string
	description?: string
	bpm: number
	rails: RailConfig[]
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
	floor?:
		| boolean
		| {
				size?: number
				resolution?: number
				blur?: number
				tint?: [number, number, number]
				reflectivity?: number
				opacity?: number
		  }
	names?: boolean
	points?: boolean
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
		buses?: Record<string, import('../audio/types').BusConfig>
		master?: import('../audio/types').MasterConfig
	}
	/** Factory to auto-assign render fn to rails without one */
	renderFactory?: RenderFactory | undefined
	/** Fixed world-space direction text labels face (e.g. [0,0,1] = face +Z).
	 *  When absent, defaults to billboard (tracks main camera). */
	textOrientation?: Vector3Tuple
	/** Multi-view split-screen config */
	view?: ViewConfig
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
