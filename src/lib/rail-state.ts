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
	) {}

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
	}

	get id(): string {
		return this.rail.rail.id
	}

	get color(): string {
		return this.rail.color
	}
	set color(v: string) {
		this.rail.color = v
	}

	// Future: other rail params (thickness, glow, etc.)
}
