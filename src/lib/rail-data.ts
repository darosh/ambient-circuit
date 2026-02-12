import type { MarbleSequenceMode, MarbleDirection } from './marble'
import type { Rail } from './rail'
import type { Instrument } from './instrument'
import type { SceneCtx } from './scene-ctx'
import type { TempoState } from './tempo'

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
	renderMatrix?: unknown // Matrix4
}

export type RenderContext = {
	delta: number
	beat: number
	tempo: TempoState
	ctx: SceneCtx
}

export type RailData = {
	rail: Rail
	color: string
	marbles?: MarbleData[] | false
	instruments?: Instrument[]
	runtime?: RailRuntime
	/** Runtime animation function returning Matrix4 transform */
	render?: (ctx: RenderContext) => unknown // Matrix4
}
