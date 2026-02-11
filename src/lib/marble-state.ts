import type { Marble, MarbleDirection } from './marble'

/**
 * Safe API for modifying marble state from instrument handlers.
 * Handles internal state consistency (previousBeat, lastTriggeredBeat) automatically.
 */
export class MarbleState {
	constructor(
		private marble: Marble,
		private marbleBeat?: number
	) {}

	// Speed (runtime override or config default)
	get speed(): number {
		return this.marble.runtime.speed ?? this.marble.config.speed ?? 1
	}
	set speed(value: number) {
		this.marble.runtime.speed = value
	}

	// Direction (handles re-trigger prevention)
	get direction(): MarbleDirection {
		return this.marble.direction
	}
	set direction(value: MarbleDirection) {
		this.marble.direction = value
		// Update direction tracking for re-trigger prevention
		// Don't overwrite lastTriggeredBeat - already set correctly by checkInstrumentTriggers
		this.marble.runtime.lastTriggeredDirection = value
	}

	// Beat position (maintains consistency)
	get beat(): number {
		// Use marbleBeat from trigger context if available, otherwise current
		return this.marbleBeat ?? this.marble.currentBeat
	}
	set beat(value: number) {
		// Set target beat - will be applied at end of updateMarble
		this.marble.runtime.targetBeat = value
		// Don't set lastTriggeredBeat - allow triggers at the target position
	}

	// Relative beat shift
	shiftBeat(delta: number): void {
		this.beat = this.beat + delta
	}

	// Note (runtime override or config default)
	get note(): number | undefined {
		return this.marble.runtime.note ?? this.marble.config.note
	}
	set note(value: number | undefined) {
		this.marble.runtime.note = value
	}

	// Convenience: reverse direction
	reverse(): void {
		this.direction = this.direction === 'forward' ? 'backward' : 'forward'
	}
}
