import type { MarbleDirection } from './marble'

export type InstrumentSignal = { intensity: number }

export type InstrumentTriggerContext = {
	/** ID of the rail this instrument is on */
	railId: string
	/** Index of the marble that triggered this instrument */
	marbleIndex: number
	/** Beat position of the instrument */
	beat: number
	/** Current global beat */
	globalBeat: number
	/** Direction the marble was moving */
	direction: MarbleDirection
}

export type Instrument = {
	/** Beat position on rail (can be fractional, e.g. 1.5) */
	beat: number
	/**
	 * Path through splits to reach this instrument.
	 * undefined or [] = main rail
	 * [0] = first split, branch 0
	 * [1, 0] = first split branch 1, second split branch 0
	 */
	path?: number[]
	/** Number of polygon sides (3=triangle, 4=square, 5=pentagon, etc.) */
	sides: number
	/** Color of the instrument */
	color: string
	/** MIDI channel (1-16), default 1 */
	midiChannel?: number
	/** MIDI note (0-127), default 60 (C4) */
	midiNote?: number
	/** Note length in ms, default 200 */
	midiLength?: number
	/** MIDI velocity (0-127), default 100 */
	midiVelocity?: number
	/** Impact signal — onTrigger sets intensity=1, InstrumentView decays it */
	signal?: InstrumentSignal
	/** Callback fired when marble crosses this beat */
	onTrigger: (context: InstrumentTriggerContext) => void
}
