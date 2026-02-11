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
		// Set target beat - will trigger instruments at target on next frame
		this.marble.runtime.targetBeat = value
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

	// Visual properties (runtime overrides)
	get type() {
		return this.marble.runtime.type ?? this.marble.config.type ?? 'ball'
	}
	set type(value: import('./marble').MarbleType) {
		this.marble.runtime.type = value
	}

	get sides() {
		return this.marble.runtime.sides ?? this.marble.config.sides ?? 6
	}
	set sides(value: number) {
		this.marble.runtime.sides = value
	}

	get rounds() {
		return this.marble.runtime.rounds ?? this.marble.config.rounds ?? 3
	}
	set rounds(value: number) {
		this.marble.runtime.rounds = value
	}

	get color(): string | undefined {
		return this.marble.runtime.color
	}
	set color(value: string | undefined) {
		this.marble.runtime.color = value
	}
}
