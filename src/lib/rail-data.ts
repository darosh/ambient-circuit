import type { MarbleSequenceMode, MarbleDirection } from './marble'
import type { Rail } from './rail'
import type { Instrument } from './instrument'

export type MarbleData = {
	direction?: MarbleDirection
	mode?: MarbleSequenceMode
	speed?: number
	start?: number
	note?: number
}

export type RailData = {
	rail: Rail
	color: string
	marbles?: MarbleData[] | false
	instruments?: Instrument[]
}
