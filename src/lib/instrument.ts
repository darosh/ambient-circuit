import type { MarbleDirection } from './marble'

export type InstrumentSignal = { intensity: number }

export type InstrumentTriggerContext = {
	railId: string
	marbleIndex: number
	beat: number
	globalBeat: number
	direction: MarbleDirection
}

type InstrumentBase = {
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
	/** MIDI channel (1-16), default 1 */
	midiChannel?: number
	/** MIDI note (0-127), default 60 (C4) */
	midiNote?: number
	/** Note length in ms, default 200 */
	midiLength?: number
	/** MIDI velocity (0-127), default 100 */
	midiVelocity?: number
	/** Impact signal — set intensity=1 in triggerHandler, InstrumentView decays it */
	signal?: InstrumentSignal
}

export type PolyInstrument = InstrumentBase & {
	type?: 'poly'
	/** Number of polygon sides (3=triangle, 4=square, 5=pentagon, etc.) */
	sides: number
	/** Fill mode: creates inner shape at radius - 2*width (default false) */
	fill?: boolean
}

type StarInstrument = InstrumentBase & {
	type: 'star'
	/** Number of star points */
	sides: number
}

type WhirlInstrument = InstrumentBase & {
	type: 'whirl'
	/** Number of whirl shapes */
	sides: number
}

type CrossInstrument = InstrumentBase & {
	type: 'cross'
	/** Number of cross shapes */
	sides: number
}

type HeartInstrument = InstrumentBase & {
	type: 'heart'
	/** Bounce animation on impact (default true) */
	pulse?: boolean
}

type SpiralInstrument = InstrumentBase & {
	type: 'spiral'
	/** Number of spiral rounds (default 3) */
	rounds?: number
	/** Counter-clockwise spiral direction (default false) */
	counterCW?: boolean
	/** Continuous rotation (default true) */
	active?: boolean
}

type ConeInstrument = InstrumentBase & {
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
	active?: boolean
}

type ArrowInstrument = InstrumentBase & {
	type: 'arrow'
	/** Shape variant (default 'plain') */
	kind?: 'plain' | 'play' | 'fwd' | 'rec' | 'stop' | 'step' | 'pause'
	/** V-shape opening angle in radians (only for 'plain' and 'step') */
	angle?: number
	/** Arrow alignment: which part is at beat position (default 'center') */
	align?: 'center' | 'tip' | 'back'
	/** Arrow tip pointing direction along rail (default 'forward') */
	point?: 'forward' | 'backward'
}

export type Instrument =
	| PolyInstrument
	| StarInstrument
	| WhirlInstrument
	| CrossInstrument
	| HeartInstrument
	| SpiralInstrument
	| ConeInstrument
	| ArrowInstrument
