import type { MarbleDirection } from './marble'
import type { AudioChainConfig } from '../audio/types'
import type { CtrlConfig } from './ctrl'
import { TriggerHandler } from './scene'

export type InstrumentSignal = { intensity: number }

export interface InstrumentRuntime {
	type?: string
	color?: string
	active?: boolean
	sides?: number
	rounds?: number
	brightness?: number
	fill?: boolean
	counterCW?: boolean
	align?: 'center' | 'tip' | 'back'
	point?: 'forward' | 'backward'
	kind?: ArrowInstrument['kind']
	angle?: number
	pulse?: boolean
	spinning?: boolean
	rays?: number
	visible?: boolean
}

export type InstrumentTriggerContext = {
	railId: string
	marbleIndex: number
	beat: number
	globalBeat: number
	marbleBeat: number // marble's computed beat for this frame
	direction: MarbleDirection
}

type InstrumentConfigBase = {
	/** Beat position on rail (can be fractional, e.g. 1.5) */
	beat: number
	/**
	 * Path through splits to reach this instrument.
	 * undefined or [] = main rail
	 * [0] = first split, branch 0
	 * [1, 0] = first split branch 1, second split branch 0
	 */
	path?: number[]
	/** Color of the instrument */
	color?: string
	/** Functional on/off state for trigger detection (default true) */
	active?: boolean
	/** Visual visibility (default true) */
	visible?: boolean
	/** MIDI channel (1-16), default 1 */
	channel?: number
	/** MIDI note(s) (0-127), default 60 (C4); array triggers chord */
	note?: number | number[]
	/** Note length in ms, default 200 */
	duration?: number
	/** MIDI velocity (0-127), default 100 */
	velocity?: number
	/** Impact signal — set intensity=1 in triggerHandler, InstrumentView decays it */
	signal?: InstrumentSignal
	/** MIDI signal for MidiSignalView — parallel to signal, consumed independently */
	midiSignal?: InstrumentSignal
	actionHandler?: TriggerHandler
	/** Audio chain config (triggers sound automatically like MIDI) */
	audio?: AudioChainConfig
	/** CC/CV automation controllers */
	ctrl?: CtrlConfig[]
	/** Runtime state for visual overrides */
	runtime?: InstrumentRuntime
}

export type PolyInstrument = InstrumentConfigBase & {
	type?: 'poly'
	/** Number of polygon sides (3=triangle, 4=square, 5=pentagon, etc.) */
	sides: number
	/** Fill mode: creates inner shape at radius - 2*width (default false) */
	fill?: boolean
}

export type FillInstrument = InstrumentConfigBase & {
	type?: 'fill'
	/** Number of polygon sides (3=triangle, 4=square, 5=pentagon, etc.) */
	sides: number
}

type StarInstrument = InstrumentConfigBase & {
	type: 'star'
	/** Number of star points */
	sides: number
}

type WhirlInstrument = InstrumentConfigBase & {
	type: 'whirl'
	/** Number of whirl shapes */
	sides: number
}

type CrossInstrument = InstrumentConfigBase & {
	type: 'cross'
	/** Number of cross shapes */
	sides: number
}

type HeartInstrument = InstrumentConfigBase & {
	type: 'heart'
	/** Bounce animation on impact (default true) */
	pulse?: boolean
}

type SpiralInstrument = InstrumentConfigBase & {
	type: 'spiral'
	/** Number of spiral rounds (default 3) */
	rounds?: number
	/** Counter-clockwise spiral direction (default false) */
	counterCW?: boolean
	/** Continuous rotation (default true) */
	spinning?: boolean
}

type ConeInstrument = InstrumentConfigBase & {
	type: 'cone'
	/** Number of spiral rounds (default 3) */
	rounds?: number
	/** Counter-clockwise spiral direction (default false) */
	counterCW?: boolean
	/** Cone alignment: which part is at beat position (default 'center') */
	align?: 'center' | 'tip' | 'back'
	/** Cone tip pointing direction along rail (default 'forward') */
	point?: 'forward' | 'backward'
	/** Continuous rotation (default true) */
	spinning?: boolean
}

export type ArrowInstrument = InstrumentConfigBase & {
	type: 'arrow'
	/** Shape variant (default 'plain') */
	kind?:
		| 'plain'
		| 'play'
		| 'fwd'
		| 'rec'
		| 'stop'
		| 'step'
		| 'pause'
		| 'repro'
		| 'muted'
		| 'dot'
		| 'point'
		| 'ring'
		| 'tri'
		| 'trip'
		| 'full'
	/** V-shape opening angle in radians (only for 'plain' and 'step') */
	angle?: number
	/** Arrow alignment: which part is at beat position (default 'center') */
	align?: 'center' | 'tip' | 'back'
	/** Arrow tip pointing direction along rail (default 'forward') */
	point?: 'forward' | 'backward'
}

type SunInstrument = InstrumentConfigBase & {
	type: 'sun'
	/** Number of rays extending from center (default 6) */
	rays?: number
	brightness?: number
}

type EaterInstrument = InstrumentConfigBase & {
	type: 'eater'
	/** Mouth opening angle in degrees (default 60) */
	angle?: number
}

export type InstrumentConfig =
	| PolyInstrument
	| FillInstrument
	| StarInstrument
	| WhirlInstrument
	| CrossInstrument
	| HeartInstrument
	| SpiralInstrument
	| ConeInstrument
	| ArrowInstrument
	| SunInstrument
	| EaterInstrument

/** Live instrument object used by the engine at runtime */
export type InstrumentInstance = {
	config: InstrumentConfig
	runtime: InstrumentRuntime
	signal: InstrumentSignal
	midiSignal: InstrumentSignal
}
