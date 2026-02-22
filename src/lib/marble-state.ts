import type { Marble, MarbleDirection } from './marble'

/**
 * Safe API for modifying marble state from instrument handlers.
 * Handles internal state consistency (previousBeat, lastTriggeredBeat) automatically.
 */
export class MarbleState {
	constructor(
		private marble: Marble,
		private marbleBeat?: number,
		private visibility?: { value: boolean },
		private activity?: { value: boolean }
	) {}

	// Speed (runtime override or config default)
	get speed(): number {
		return this.marble.runtime.speed ?? this.marble.config.speed ?? 1
	}
	set speed(value: number) {
		this.marble.runtime.speed = value
	}

	// Direction (clears re-trigger tracking when changed)
	get direction(): MarbleDirection {
		return this.marble.direction
	}
	set direction(value: MarbleDirection) {
		// Mirror position if reversing during trigger (prevents immediate re-cross)
		if (
			this.marble.runtime.inTrigger &&
			this.marble.runtime.triggerBeat !== undefined &&
			value !== this.marble.direction
		) {
			const triggerBeat = this.marble.runtime.triggerBeat
			const offset = this.marble.currentBeat - triggerBeat
			// Mirror across trigger beat: if at triggerBeat + 0.01, move to triggerBeat - 0.01
			this.marble.currentBeat = triggerBeat - offset
			this.marble.previousBeat = this.marble.currentBeat
		} else {
			this.marble.runtime.lastTriggeredBeat = undefined
			this.marble.runtime.lastTriggeredDirection = undefined
		}

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

	// Rail switching (deferred to end of update)
	get railId(): string {
		return this.marble.runtime.railId ?? this.marble.config.resolvedRail.id
	}
	set railId(value: string) {
		if (value === this.railId) return // no-op if same rail
		this.marble.runtime.targetRailId = value
	}

	// Convenience: shift beat by delta
	shiftBeat(delta: number): void {
		this.beat = this.beat + delta
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

	get angle() {
		return this.marble.runtime.angle ?? this.marble.config.angle ?? 60
	}
	set angle(value: number) {
		this.marble.runtime.angle = value
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

	get easing(): import('./marble').EasingMode {
		return this.marble.runtime.easing ?? this.marble.config.easing
	}
	set easing(value: import('./marble').EasingMode) {
		this.marble.runtime.easing = value
	}

	// Visibility/activity (async-safe via refs)
	get visible(): boolean {
		return this.visibility?.value ?? true
	}
	set visible(v: boolean) {
		if (this.visibility) this.visibility.value = v
		// Also store in runtime for View access
		this.marble.runtime.visible = v
	}

	get active(): boolean {
		return this.activity?.value ?? true
	}
	set active(v: boolean) {
		if (this.activity) this.activity.value = v
		this.marble.runtime.active = v
	}

	get running(): boolean {
		return this.marble.runtime.running ?? this.marble.config.running ?? true
	}
	set running(v: boolean) {
		this.marble.runtime.running = v
	}
}
