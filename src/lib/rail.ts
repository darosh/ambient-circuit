/** 3D position */
export type Vec3 = [x: number, y: number, z: number]

/** Rounding behavior at a point */
export type Rounding = 'to' | 'from' | 'both'

// ── Authored types (human-editable) ─────────────────────────

/** Full point with overrides */
export type RailPointFull = {
	p: Vec3
	/** Beat index override. Default: previous + 1 */
	beat?: number
	/** Rounding at this point: 'to' (incoming curved), 'from' (outgoing curved), 'both'. Default: none */
	round?: Rounding
}

/** Fork in the road */
export type RailSplit = {
	split: {
		/** Position where split occurs */
		p: Vec3
		/** Beat index override. Default: previous + 1 */
		beat?: number
		/** Round-robin weights, e.g. [2,4] = 2 left then 4 right */
		weights: number[]
		/** Each branch is a sequence of nodes */
		branches: RailDef[]
	}
}

/** Any element in a rail definition */
export type RailNode = Vec3 | RailPointFull | RailSplit

/** Sequence of nodes (used for branches too) */
export type RailDef = RailNode[]

/** Top-level rail */
export type Rail = {
	id: string
	/** Starting beat. Default: 0 */
	beatOffset?: number
	/** Reverse at end instead of looping. Default: false */
	reverse?: boolean
	/** 3D offset applied to all points. Default: [0,0,0] */
	offset?: Vec3
	nodes: RailDef
}

// ── Resolved types (engine-internal) ────────────────────────

export type ResolvedPoint = {
	p: Vec3
	beat: number
	round: Rounding | null
}

export type ResolvedSplit = {
	beat: number
	p: Vec3
	weights: number[]
	branches: ResolvedSegment[]
}

export type ResolvedSegment = {
	points: ResolvedPoint[]
	splits: ResolvedSplit[]
}

export type ResolvedRail = ResolvedSegment & {
	id: string
	beatOffset: number
	reverse: boolean
}

// ── Type guards ─────────────────────────────────────────────

export function isVec3(node: RailNode): node is Vec3 {
	return Array.isArray(node)
}

export function isSplit(node: RailNode): node is RailSplit {
	return !Array.isArray(node) && 'split' in node
}

export function isPointFull(node: RailNode): node is RailPointFull {
	return !Array.isArray(node) && 'p' in node
}
