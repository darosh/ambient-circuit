import type { MarbleSequenceMode, MarbleDirection } from './marble'
import type { Rail } from './rail'
import type { Instrument } from './instrument'

type MarbleDataBase = {
	direction?: MarbleDirection
	mode?: MarbleSequenceMode
	speed?: number
	start?: number
	note?: number
}

type BallMarbleData = MarbleDataBase & {
	type?: 'ball'
}

type PolyMarbleData = MarbleDataBase & {
	type: 'poly'
	sides: number
}

type CoilMarbleData = MarbleDataBase & {
	type: 'coil'
	rounds: number
}

export type MarbleData = BallMarbleData | PolyMarbleData | CoilMarbleData

export type RailRuntime = {
	color?: string
}

export type RailData = {
	rail: Rail
	color: string
	marbles?: MarbleData[] | false
	instruments?: Instrument[]
	runtime?: RailRuntime
}
