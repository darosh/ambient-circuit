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
	note?: number // MIDI note for note mode, undefined for vanilla mode
}

export interface Marble {
	config: MarbleConfig
	currentBeat: number // float for sub-beat positioning
	direction: MarbleDirection
	position: Vector3 // computed 3D position
}

export function createMarble(config: MarbleConfig): Marble {
	return {
		config,
		currentBeat: config.startBeat,
		direction: config.direction,
		position: { x: 0, y: 0, z: 0 } as Vector3
	}
}
