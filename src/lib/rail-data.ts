import type { MarbleSequenceMode, MarbleDirection } from './marble'
import type { Rail } from './rail'
import type { Instrument } from './instrument'
import type { SceneCtx } from './scene-ctx'
import type { TempoState } from './tempo'
import type { Matrix4 } from 'three/webgpu'

type MarbleDataBase = {
	direction?: MarbleDirection
	mode?: MarbleSequenceMode
	speed?: number
	start?: number
	note?: number
	easing?: import('./marble').EasingMode
	color?: string
	bouncer?: boolean
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

export type EaterMarbleData = MarbleDataBase & {
	type: 'eater'
	angle: number
}

export type MarbleData = BallMarbleData | PolyMarbleData | CoilMarbleData | EaterMarbleData

export type RailRuntime = {
	color?: string
	renderMatrix?: unknown // Matrix4
}

export type RailData = {
	rail: Rail
	color: string
	marbles?: MarbleData[] | false
	instruments?: Instrument[]
	runtime?: RailRuntime
	/** Runtime animation function returning Matrix4 transform */
	render?: (beat: number, tempo: TempoState, delta: number, ctx: SceneCtx) => Matrix4
}
