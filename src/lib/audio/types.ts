import type { ToneAudioNode } from 'tone'
import type { Device } from '@rnbo/js'

// --- Authored config (JSON-serializable, no closures) ---

export type ParamValue = number | string
export type ParamMap = Record<string, ParamValue>

export type GeneratorConfig =
	| { engine: 'tone'; name: string; params?: ParamMap }
	| { engine: 'rnbo'; path: string; params?: ParamMap }

export type FxConfig =
	| { engine: 'tone'; name: string; params?: ParamMap }
	| { engine: 'rnbo'; path: string; params?: ParamMap }

export type AudioChainConfig = {
	/** Named chain ID (shared across instruments) */
	id?: string
	generator?: GeneratorConfig
	fx?: FxConfig[]
	analyzer?: boolean
}

// --- Runtime instances ---

export type AudioChain = {
	config: AudioChainConfig
	generator: ToneAudioNode | Device | null
	fx: (ToneAudioNode | Device)[]
	analyzer: AnalyserNode | null
	output: GainNode
	/** Set param on generator by dot-path */
	setParam(path: string, value: ParamValue): void
	/** Set param on fx node by index + dot-path */
	setFxParam(index: number, path: string, value: ParamValue): void
	/** Get param from generator by dot-path */
	getParam(path: string): ParamValue | undefined
}

export type AudioEngine = {
	ctx: AudioContext | null
	masterGain: GainNode | null
	Tone: typeof import('tone') | null
	chains: Map<string, AudioChain>
	instanceChains: AudioChain[]
	initialized: boolean
	rnboCache: Map<string, unknown>
}
