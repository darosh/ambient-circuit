import type { ToneAudioNode } from 'tone'
import type { Device } from '@rnbo/js'

// --- Authored config (JSON-serializable, no closures) ---

export type GeneratorConfig =
	| { engine: 'tone'; name: string; params?: Record<string, number> }
	| { engine: 'rnbo'; path: string; params?: Record<string, number> }

export type FxConfig =
	| { engine: 'tone'; name: string; params?: Record<string, number> }
	| { engine: 'rnbo'; path: string; params?: Record<string, number> }

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
