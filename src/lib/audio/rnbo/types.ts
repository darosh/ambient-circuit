// Minimal RNBO type definitions used by engine.ts
// Extracted from the original index.d.ts

import type { BM } from './rnbo-platform.js'

export type MIDIByte = number | undefined

export interface IPatcher {
	desc: IPatcherDescription
	presets?: { name: string; preset: IPreset }[]
}

export interface IPatcherDescription {
	parameters?: IParameterDescription[]
	numParameters?: number
	numSignalInParameters?: number
	numSignalOutParameters?: number
	numInputChannels?: number
	numOutputChannels?: number
	externalDataRefs?: ExternalDataInfo[]
	inports?: IPort[]
	outports?: IPort[]
	inlets?: IPort[]
	outlets?: IPort[]
	meta?: Record<string, string>
}

export interface IParameterDescription {
	name: string
	id: string
	type: number
	min: number
	max: number
	initialValue: number
	steps: number
	unit: string
	displayName: string
	exponent: number
	enumValues: string[]
	signalIndex?: number
	ioType?: number
}

export interface IPreset {
	[key: string]: unknown
}

export type ExternalDataInfo = {
	id: string
	type: string
	file?: string
	url?: string
	tag?: string
}

export interface IPort {
	tag: string
	meta?: Record<string, string>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Parameter {
	name: string
	id: string
	value: number
	normalizedValue: number
	min: number
	max: number
	steps: number
	index: number
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	changeEvent: BM<any>
}

export interface Device {
	context: AudioContext
	node: AudioNode
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	parameters: Parameter[]
	parametersById: Map<string, Parameter>
	numParameters: number
	parameterChangeEvent: BM<Parameter>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	messageEvent: BM<any>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	midiEvent: BM<any>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	presetTouchedEvent: BM<any>
	scheduleEvent(event: unknown, time?: number): void
	getPreset(): Promise<IPreset>
	setPreset(preset: IPreset): void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setDataBuffer(id: string, buffer: any): void
	releaseDataBuffer(id: string): Promise<{ data: Float32Array; typeDesc: string }>
	loadDataBufferDependencies(deps: ExternalDataInfo[]): Promise<void>
}
