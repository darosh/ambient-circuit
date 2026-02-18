import type { ToneAudioNode, Solo } from 'tone'
import type { Device } from '@rnbo/js'

// --- Authored config (JSON-serializable, no closures) ---

export type ParamValue = number | string
export type ParamMap = Record<string, ParamValue>

export type NodeConfig =
	| { tone: string; params?: ParamMap }
	| { rnbo: string; params?: ParamMap; preset?: string }

export type GeneratorConfig = NodeConfig
export type FxConfig = NodeConfig

export type AnalyzerType = boolean | 'fft' | 'waveform' | 'meter'

export type AudioChainConfig = {
	/** Named chain ID (shared across instruments) */
	id?: string
	generator?: GeneratorConfig
	fx?: FxConfig[]
	analyzer?: AnalyzerType
	/** Route to named bus instead of master */
	bus?: string
}

export type BusConfig = {
	fx?: FxConfig[]
	analyzer?: AnalyzerType
}

export type MasterConfig = {
	fx?: FxConfig[]
	analyzer?: AnalyzerType
}

// --- Runtime instances ---

export type AudioChain = {
	config: AudioChainConfig
	generator: ToneAudioNode | Device | null
	fx: (ToneAudioNode | Device)[]
	analyzer: ToneAudioNode | null
	solo: Solo | null
	output: GainNode
	/** Set param on generator by dot-path */
	setParam(path: string, value: ParamValue): void
	/** Set param on fx node by index + dot-path */
	setFxParam(index: number, path: string, value: ParamValue): void
	/** Get param from generator by dot-path */
	getParam(path: string): ParamValue | undefined
	/** List all generator params as {path, value, min, max} */
	listParams(): { path: string; value: number; min: number; max: number }[]
	/** List all fx params for a given fx index */
	listFxParams(index: number): { path: string; value: number; min: number; max: number }[]
	/** Per-node preset info (generator at index -1, fx at their index) */
	nodePresets: Map<number, NodePresetInfo>
	/** Callback fired when any RNBO device params change */
	onParamChange: ((id: string, value: number) => void) | null
	/** Visual flash signal for AudioView (consumed each frame) */
	audioSignal: { intensity: number; color: string }
	lastTrigger: number
}

export type NodePresetInfo = {
	names: string[]
	active: string | null
	set(name: string): void
}

export type AudioBusPresets = {
	/** Per-fx-node preset info by fx index */
	nodePresets: Map<number, NodePresetInfo>
	onParamChange: ((id: string, value: number) => void) | null
}

export type AudioBus = {
	config: BusConfig
	fx: (ToneAudioNode | Device)[]
	analyzer: ToneAudioNode | null
	input: GainNode
	output: GainNode
	/** Per-fx-node preset info by fx index */
	nodePresets: Map<number, NodePresetInfo>
	onParamChange: ((id: string, value: number) => void) | null
}

export type AudioEngine = {
	ctx: AudioContext | null
	masterGain: GainNode | null
	Tone: typeof import('tone') | null
	chains: Map<string, AudioChain>
	instanceChains: AudioChain[]
	initialized: boolean
	rnboCache: Map<string, unknown>
	buses: Map<string, AudioBus>
	masterChain: AudioBus | null
	sharedAnalyzer: ToneAudioNode | null
}
