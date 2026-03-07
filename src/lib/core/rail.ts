import type { Matrix4, Vector3 } from 'three/webgpu'

/** 3D position */
export type Vec3 = [x: number, y: number, z: number]
export type Vec3Curve =
	| [x: number, y: number, z: number, Rounding]
	| [x: number, y: number, z: number, Rounding, t: number]

/** Rounding behavior at a point */
export type Rounding = 'to' | 'from' | 'both'

// ── Authored types (human-editable) ─────────────────────────

/** Full point with overrides */
export type RailPointFull = {
	p: Vec3
	/** Beat index override. Default: previous + 1 */
	beat?: number
	/** Beat interpolation mode for the section ending at this point. Default: 'points' (linear by index) */
	mode?: 'points' | 'curve'
	/** Rounding at this point: 'to' (incoming curved), 'from' (outgoing curved), 'both'. Default: none */
	round?: Rounding
	/** Tangent handle scale for Bezier control points. Default: 0.39 */
	tangent?: number
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
export type RailNode = Vec3 | RailPointFull | RailSplit | string | Vec3Curve

/** Sequence of nodes (used for branches too) */
export type RailDef = RailNode[]

export type RailShapeTransform = Matrix4 | ((v: Vector3) => Vector3)

/** Top-level rail shape (authored config for geometry) */
export type RailShapeConfig = {
	id: string
	/** Starting beat. Default: 0 */
	beatOffset?: number
	/** Reverse at end instead of looping. Default: false */
	reverse?: boolean
	/** 3D offset applied to all points. Default: [0,0,0] */
	offset?: Vec3
	/** Rotation around tangent in degrees. Default: 90 */
	tilt?: number
	/** Transform applied during rail resolution (Matrix4 or function) */
	transform?: RailShapeTransform
	nodes: RailDef
}

// ── Resolved types (engine-internal) ────────────────────────

export type ResolvedPoint = {
	p: Vec3
	beat: number
	round: Rounding | null
	tangent: number
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
	tilt: number
}

// ── Type guards ─────────────────────────────────────────────

export function isVec3(node: RailNode): node is Vec3 {
	return Array.isArray(node) && node.length === 3
}

export function isVec3Curve(node: RailNode): node is Vec3Curve {
	return Array.isArray(node) && (node.length === 4 || node.length === 5)
}

export function isSplit(node: RailNode): node is RailSplit {
	return typeof node === 'object' && !Array.isArray(node) && 'split' in node
}

export function isPointFull(node: RailNode): node is RailPointFull {
	return typeof node === 'object' && !Array.isArray(node) && 'p' in node
}

export function isPathString(node: RailNode): node is string {
	return typeof node === 'string'
}
