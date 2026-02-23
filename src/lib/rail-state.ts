import type { MarbleEntity, SceneCtx } from './scene-ctx'
import type { RailData, MarbleData } from './rail-data'

/**
 * Safe API for modifying rail state from handlers.
 * Handles visibility/activity via refs (async-safe), other props write directly.
 */
export class RailState {
	/** Set after SceneCtx is built (circular ref) */
	_sceneCtx?: SceneCtx

	constructor(
		private rail: RailData,
		private visibility: { value: boolean },
		private activity: { value: boolean },
		private pendingCreations?: { railId: string; data: MarbleData }[]
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

	/** Queue a new marble on this rail (processed at end of update) */
	create(data: MarbleData): void {
		if (this.pendingCreations) {
			this.pendingCreations.push({ railId: this.rail.rail.id, data })
		}
	}

	/** Marbles currently on this rail */
	get marbles(): MarbleEntity[] {
		if (!this._sceneCtx) return []
		const id = this.rail.rail.id
		return this._sceneCtx.marbles.filter(
			(m) => (m.marble.runtime.railId ?? m.marble.config.resolvedRail.id) === id
		)
	}

	// Future: other rail params (thickness, glow, etc.)
}
