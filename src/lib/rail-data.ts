import type { MarbleSequenceMode, MarbleDirection } from './marble'
import type { Rail } from './rail'
import type { Instrument } from './instrument'

export type RailData = {
	rail: Rail
	color: string
	mode?: MarbleSequenceMode
	direction?: MarbleDirection
	speed?: number
	instruments?: Instrument[]
}
