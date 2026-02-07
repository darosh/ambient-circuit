export type Instrument = {
	/** Beat position on rail (can be fractional, e.g. 1.5) */
	beat: number
	/** Number of polygon sides (3=triangle, 4=square, 5=pentagon, etc.) */
	sides: number
	/** Color of the instrument */
	color: string
	/** Callback fired when marble crosses this beat */
	onTrigger: () => void
}
