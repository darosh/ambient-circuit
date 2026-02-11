import type { ResolvedRail } from './rail'
import type { Vector3 } from 'three/webgpu'

export type MarbleDirection = 'forward' | 'backward'
export type MarbleSequenceMode = 'looping' | 'ping-pong'
export type EasingMode =
	| 'linear'
	| 'easeOutBounce'
	| 'easeOutElastic'
	| 'easeOutBack'
	| 'easeOutCubic'
	| 'easeInOutCubic'
	| 'easeOutQuad'
	| 'easeInOutQuad'
	| 'easeOutExpo'
	| string

export type MarbleType = 'ball' | 'poly' | 'coil'

export interface MarbleConfig {
	resolvedRail: ResolvedRail
	startBeat: number
	direction: MarbleDirection
	sequenceMode: MarbleSequenceMode
	easing: EasingMode
	speed?: number // Speed multiplier (default 1)
	note?: number // MIDI note for note mode, undefined for vanilla mode
	type?: MarbleType // Visual type (default 'ball')
	sides?: number // For poly type (default 6)
	rounds?: number // For coil type (default 3)
}

export interface MarbleRuntime {
	speed?: number // overrides config.speed
	note?: number // overrides config.note
	lastTriggeredBeat?: number // beat that was last triggered
	lastTriggeredDirection?: MarbleDirection // direction when last triggered
	targetBeat?: number // if set, overrides computed beat at end of update
	jumpedToBeat?: number // beat we just jumped to (trigger instruments here next frame)
}

export interface Marble {
	config: MarbleConfig
	runtime: MarbleRuntime
	currentBeat: number // float for sub-beat positioning
	previousBeat: number // previous beat to detect crossings
	direction: MarbleDirection
	position: Vector3 // computed 3D position
	tangent: Vector3 // tangent direction at current position
	up: Vector3 // up vector for orientation (parallel transport)
	branchIndex: number | null // null = main rail, number = branch index
	routingCounter: number // for weighted branch selection
	lastGlobalBeat: number // last processed global beat to prevent re-processing
	signal: { intensity: number } // impact signal, set to 1 on beat crossing
}

export function createMarble(config: MarbleConfig): Marble {
	return {
		config,
		runtime: {},
		currentBeat: config.startBeat,
		previousBeat: config.startBeat,
		direction: config.direction,
		position: { x: 0, y: 0, z: 0 } as Vector3,
		tangent: { x: 1, y: 0, z: 0 } as Vector3,
		up: { x: 0, y: 1, z: 0 } as Vector3, // initial up vector
		branchIndex: null, // starts on main rail
		routingCounter: 0, // for weighted routing
		lastGlobalBeat: -1, // no beat processed yet
		signal: { intensity: 0 }
	}
}
