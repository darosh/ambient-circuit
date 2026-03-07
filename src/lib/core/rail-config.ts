import type { MarbleSequenceMode, MarbleDirection } from './marble'
import type { RailShapeConfig, RailDef, Vec3 } from './rail'
import type { InstrumentConfig } from './instrument'
import type { AudioChainConfig } from '../audio/types'
import type { SceneCtx } from './scene-ctx'
import type { TempoState } from './tempo'
import type { Matrix4, Vector3 } from 'three/webgpu'

export type MarbleInputBase = {
	audio?: AudioChainConfig
	direction?: MarbleDirection
	mode?: MarbleSequenceMode
	speed?: number
	start?: number
	note?: number
	duration?: number
	velocity?: number
	easing?: import('./marble').EasingMode
	color?: string
	bouncer?: boolean
	snake?: boolean | number
	active?: boolean
	running?: boolean
}

/** @deprecated Use MarbleInputBase */
// eslint-disable-next-line sonarjs/redundant-type-aliases
export type MarbleDataBase = MarbleInputBase

type BallMarbleInput = MarbleInputBase & {
	type?: 'ball'
}

type PolyMarbleInput = MarbleInputBase & {
	type: 'poly'
	sides: number
}

type CoilMarbleInput = MarbleInputBase & {
	type: 'coil'
	rounds: number
}

export type EaterMarbleInput = MarbleInputBase & {
	type: 'eater'
	angle: number
}

export type MarbleInputConfig = BallMarbleInput | PolyMarbleInput | CoilMarbleInput | EaterMarbleInput

/** @deprecated Use MarbleInputConfig */
// eslint-disable-next-line sonarjs/redundant-type-aliases
export type MarbleData = MarbleInputConfig

/** @deprecated Use EaterMarbleInput */
// eslint-disable-next-line sonarjs/redundant-type-aliases
export type EaterMarbleData = EaterMarbleInput

export type RailRuntime = {
	color?: string
	renderMatrix?: unknown // Matrix4
	renderVersion?: number
	active?: boolean
	running?: boolean
}

/** Flat rail config: shape + presentation + sequencing */
export type RailConfig = {
	id: string
	nodes: RailDef
	/** Starting beat. Default: 0 */
	beatOffset?: number
	/** Reverse at end instead of looping. Default: false */
	reverse?: boolean
	/** 3D offset applied to all points. Default: [0,0,0] */
	offset?: Vec3
	/** Rotation around tangent in degrees. Default: 90 */
	tilt?: number
	/** Transform applied during rail resolution (Matrix4 or function) */
	transform?: Matrix4 | ((v: Vector3) => Vector3)
	// Presentation + sequencing
	color: string
	marbles?: MarbleInputConfig[] | false
	instruments?: InstrumentConfig[]
	runtime?: RailRuntime
	visible?: false
	active?: boolean
	running?: boolean
	/** Runtime animation function: fills `out` matrix in-place (no allocation) */
	render?: (out: Matrix4, ctx: SceneCtx, beat: number, tempo: TempoState, delta: number) => void
}

/** @deprecated Use RailConfig */
// eslint-disable-next-line sonarjs/redundant-type-aliases
export type RailData = RailConfig

/** Extract RailShapeConfig from flat RailConfig (for resolveRail compatibility) */
export function toRailShapeConfig(rc: RailConfig): RailShapeConfig {
	return {
		id: rc.id,
		nodes: rc.nodes,
		beatOffset: rc.beatOffset,
		reverse: rc.reverse,
		offset: rc.offset,
		tilt: rc.tilt,
		transform: rc.transform
	}
}
