import type { ResolvedRail } from './rail'
import type { Vector3 } from 'three'

export type MarbleDirection = 'forward' | 'backward'
export type MarbleSequenceMode = 'looping' | 'ping-pong'
export type EasingMode = 'linear' | 'easeOutBounce' | 'easeOutElastic' | 'easeOutBack' | 'easeOutCubic' | 'easeInOutCubic' | 'easeOutQuad' | 'easeInOutQuad' | 'easeOutExpo' | string

export interface MarbleConfig {
	resolvedRail: ResolvedRail
	startBeat: number
	direction: MarbleDirection
	sequenceMode: MarbleSequenceMode
	easing: EasingMode
	speed: number // Speed multiplier (default 1)
	note?: number // MIDI note for note mode, undefined for vanilla mode
}

export interface Marble {
	config: MarbleConfig
	currentBeat: number // float for sub-beat positioning
	previousBeat: number // previous beat to detect crossings
	direction: MarbleDirection
	position: Vector3 // computed 3D position
	branchIndex: number | null  // null = main rail, number = branch index
	routingCounter: number  // for weighted branch selection
	lastGlobalBeat: number  // last processed global beat to prevent re-processing
}

export function createMarble(config: MarbleConfig): Marble {
	return {
		config,
		currentBeat: config.startBeat,
		previousBeat: config.startBeat,
		direction: config.direction,
		position: { x: 0, y: 0, z: 0 } as Vector3,
		branchIndex: null,  // starts on main rail
		routingCounter: 0,  // for weighted routing
		lastGlobalBeat: -1  // no beat processed yet
	}
}
