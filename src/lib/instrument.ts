import type { MarbleDirection } from './marble'

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
	/** Number of polygon sides (3=triangle, 4=square, 5=pentagon, etc.) */
	sides: number
	/** Color of the instrument */
	color: string
	/** Callback fired when marble crosses this beat */
	onTrigger: (context: InstrumentTriggerContext) => void
}
