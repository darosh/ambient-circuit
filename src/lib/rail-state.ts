import type { RailData } from './rail-data'

/**
 * Safe API for modifying rail state from handlers.
 * Handles visibility/activity via refs (async-safe), other props write directly.
 */
export class RailState {
	constructor(
		private rail: RailData,
		private visibility: { value: boolean },
		private activity: { value: boolean }
	) {
		// Initialize runtime if not present
		if (!this.rail.runtime) {
			this.rail.runtime = {}
		}
	}

	get visible(): boolean {
		return this.visibility.value
	}
	set visible(v: boolean) {
		this.visibility.value = v
	}

	get active(): boolean {
		return this.activity.value
	}
	set active(v: boolean) {
		this.activity.value = v
		this.rail.runtime!.active = v
	}

	get running(): boolean {
		return this.rail.runtime?.running ?? this.rail.running ?? true
	}
	set running(v: boolean) {
		this.rail.runtime!.running = v
	}

	get id(): string {
		return this.rail.rail.id
	}

	get color(): string {
		return this.rail.runtime?.color ?? this.rail.color
	}
	set color(v: string) {
		this.rail.runtime!.color = v
	}

	// Future: other rail params (thickness, glow, etc.)
}
