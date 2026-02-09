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

type PolyInstrument = InstrumentBase & {
	/** Visual type: poly (default), star, whirl or cross */
	type?: 'poly' | 'star' | 'whirl' | 'cross'
	/** Number of polygon sides (3=triangle, 4=square, 5=pentagon, etc.) */
	sides: number
}

type HeartInstrument = InstrumentBase & {
	type: 'heart'
}

type SpiralInstrument = InstrumentBase & {
	type: 'spiral'
	/** Number of spiral rounds (default 3) */
	rounds?: number
	/** Counter-clockwise spiral direction (default false) */
	counterCW?: boolean
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
}

export type Instrument = PolyInstrument | HeartInstrument | SpiralInstrument | ConeInstrument
