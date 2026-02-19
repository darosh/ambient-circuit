import type { ResolvedRail } from './rail'
import type { Vector3 } from 'three/webgpu'
import { InstrumentSignal } from './instrument'

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

export type MarbleType = 'ball' | 'poly' | 'coil' | 'eater'

export interface MarbleConfig {
	resolvedRail: ResolvedRail
	startBeat: number
	direction: MarbleDirection
	sequenceMode: MarbleSequenceMode
	easing: EasingMode
	color?: string
	speed?: number // Speed multiplier (default 1)
	note?: number // MIDI note for note mode, undefined for vanilla mode
	velocity?: number // MIDI velocity
	duration?: number // MIDI
	type?: MarbleType // Visual type (default 'ball')
	sides?: number // For poly type (default 6)
	rounds?: number // For coil type (default 3)
	angle?: number // For eater type: mouth opening in degrees (default 60)
	bouncer?: boolean // Reverses direction on collision with other marbles (default false)
	snake?: boolean | number // Sinusoidal oscillation perpendicular to rail (default false)
}

export interface MarbleRuntime {
	speed?: number // overrides config.speed
	note?: number // overrides config.note
	velocity?: number // overrides config.velocity
	duration?: number // overrides config.duration
	lastTriggeredBeat?: number // beat that was last triggered
	lastTriggeredDirection?: MarbleDirection // direction when last triggered
	targetBeat?: number // if set, overrides computed beat at end of update
	jumpedToBeat?: number // beat we just jumped to (trigger instruments here next frame)
	// Trigger context (for mirroring on reverse)
	inTrigger?: boolean // true while trigger handler is executing
	triggerBeat?: number // beat that triggered the current handler
	// Rail switching
	railId?: string // current rail override
	railIndex?: number // current index into scene rails array (updated on switch)
	targetRailId?: string // deferred switch target
	// Collision tracking
	lastCollisionTime?: number // global beat of last collision (prevents oscillation)
	// Visual overrides
	type?: MarbleType // overrides config.type
	sides?: number // overrides config.sides (for poly type)
	rounds?: number // overrides config.rounds (for coil type)
	angle?: number // overrides config.angle (for eater type)
	color?: string // hex color override (e.g. '#ff0000')
	easing?: EasingMode // overrides config.easing
	visible?: boolean // visibility override
}

export interface Marble {
	index: number
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
	/** MIDI signal for MidiSignalView — parallel to signal, consumed independently */
	midiSignal: InstrumentSignal
}

export function createMarble(config: MarbleConfig, index = 0): Marble {
	return {
		index,
		config,
		runtime: {
			color: config.color
		},
		currentBeat: config.startBeat,
		previousBeat: config.startBeat,
		direction: config.direction,
		position: { x: 0, y: 0, z: 0 } as Vector3,
		tangent: { x: 1, y: 0, z: 0 } as Vector3,
		up: { x: 0, y: 1, z: 0 } as Vector3, // initial up vector
		branchIndex: null, // starts on main rail
		routingCounter: 0, // for weighted routing
		lastGlobalBeat: -1, // no beat processed yet
		signal: { intensity: 0 },
		midiSignal: { intensity: 0 }
	}
}
