import type { Instrument } from './instrument'

/**
 * Safe API for modifying instrument state from trigger handlers.
 * Handles runtime overrides automatically.
 */
export class InstrumentState {
	constructor(
		private instrument: Instrument,
		private visibility?: { value: boolean },
		private activity?: { value: boolean }
	) {
		// Initialize runtime if not present
		if (!this.instrument.runtime) {
			this.instrument.runtime = {}
		}
	}

	// Color
	get color(): string | undefined {
		return this.instrument.runtime!.color ?? this.instrument.color
	}
	set color(value: string | undefined) {
		this.instrument.runtime!.color = value
	}

	/* eslint-disable @typescript-eslint/no-explicit-any */
	// Sides (for poly, star, whirl, cross)
	get sides(): number | undefined {
		const typed = this.instrument as any
		return this.instrument.runtime!.sides ?? typed.sides
	}
	set sides(value: number | undefined) {
		this.instrument.runtime!.sides = value
	}

	// Rounds (for spiral, cone)
	get rounds(): number | undefined {
		const typed = this.instrument as any
		return this.instrument.runtime!.rounds ?? typed.rounds
	}
	set rounds(value: number | undefined) {
		this.instrument.runtime!.rounds = value
	}

	// Brightness (for sun)
	get brightness(): number | undefined {
		const typed = this.instrument as any
		return this.instrument.runtime!.brightness ?? typed.brightness
	}
	set brightness(value: number | undefined) {
		this.instrument.runtime!.brightness = value
	}

	// Fill (for poly)
	get fill(): boolean | undefined {
		const typed = this.instrument as any
		return this.instrument.runtime!.fill ?? typed.fill
	}
	set fill(value: boolean | undefined) {
		this.instrument.runtime!.fill = value
	}

	// CounterCW (for spiral, cone)
	get counterCW(): boolean | undefined {
		const typed = this.instrument as any
		return this.instrument.runtime!.counterCW ?? typed.counterCW
	}
	set counterCW(value: boolean | undefined) {
		this.instrument.runtime!.counterCW = value
	}

	// Align (for cone, arrow)
	get align(): 'center' | 'tip' | 'back' | undefined {
		const typed = this.instrument as any
		return this.instrument.runtime!.align ?? typed.align
	}
	set align(value: 'center' | 'tip' | 'back' | undefined) {
		this.instrument.runtime!.align = value
	}

	// Point (for cone, arrow)
	get point(): 'forward' | 'backward' | undefined {
		const typed = this.instrument as any
		return this.instrument.runtime!.point ?? typed.point
	}
	set point(value: 'forward' | 'backward' | undefined) {
		this.instrument.runtime!.point = value
	}

	// Kind (for arrow)
	get kind(): 'plain' | 'play' | 'fwd' | 'rec' | 'stop' | 'step' | 'pause' | undefined {
		const typed = this.instrument as any
		return this.instrument.runtime!.kind ?? typed.kind
	}
	set kind(value: 'plain' | 'play' | 'fwd' | 'rec' | 'stop' | 'step' | 'pause' | undefined) {
		this.instrument.runtime!.kind = value
	}

	// Angle (for arrow)
	get angle(): number | undefined {
		const typed = this.instrument as any
		return this.instrument.runtime!.angle ?? typed.angle
	}
	set angle(value: number | undefined) {
		this.instrument.runtime!.angle = value
	}

	// Pulse (for heart)
	get pulse(): boolean | undefined {
		const typed = this.instrument as any
		return this.instrument.runtime!.pulse ?? typed.pulse
	}
	set pulse(value: boolean | undefined) {
		this.instrument.runtime!.pulse = value
	}

	// Spinning (for spiral, cone)
	get spinning(): boolean | undefined {
		const typed = this.instrument as any
		return this.instrument.runtime!.spinning ?? typed.spinning
	}
	set spinning(value: boolean | undefined) {
		this.instrument.runtime!.spinning = value
	}

	// Rays (for sun)
	get rays(): number | undefined {
		const typed = this.instrument as any
		return this.instrument.runtime!.rays ?? typed.rays
	}
	set rays(value: number | undefined) {
		this.instrument.runtime!.rays = value
	}
	/* eslint-enable @typescript-eslint/no-explicit-any */

	// Visibility/activity (async-safe via refs)
	get visible(): boolean {
		return this.visibility?.value ?? true
	}
	set visible(v: boolean) {
		if (this.visibility) this.visibility.value = v
		// Also store in runtime for View access
		this.instrument.runtime!.visible = v
	}

	get active(): boolean {
		return this.activity?.value ?? true
	}
	set active(v: boolean) {
		if (this.activity) this.activity.value = v
	}
}
