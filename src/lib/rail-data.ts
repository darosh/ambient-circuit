import type { MarbleSequenceMode, MarbleDirection, MarbleType } from './marble'
import type { Rail } from './rail'
import type { Instrument } from './instrument'

export type MarbleData = {
	direction?: MarbleDirection
	mode?: MarbleSequenceMode
	speed?: number
	start?: number
	note?: number
	type?: MarbleType
	sides?: number
	rounds?: number
}

export type RailData = {
	rail: Rail
	color: string
	marbles?: MarbleData[] | false
	instruments?: Instrument[]
}
