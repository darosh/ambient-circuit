import {
	isVec3Curve,
	Rail,
	RailDef,
	RailNode,
	ResolvedPoint,
	ResolvedRail,
	ResolvedSegment,
	ResolvedSplit,
	Rounding,
	Vec3
} from './rail'
import { isVec3, isSplit, isPointFull, isPathString } from './rail'
import { expandPathString } from './rail-path'
import { Vector3 } from 'three/webgpu'

function flattenNodes(nodes: RailDef): Array<Exclude<RailNode, string>> {
	const out: Array<Exclude<RailNode, string>> = []
	let lastPos: Vec3 = [0, 0, 0]
	for (const node of nodes) {
		if (isPathString(node)) {
			const expanded = expandPathString(node, lastPos)
			for (const n of expanded) out.push(n)
			if (expanded.length > 0) {
				const last = expanded[expanded.length - 1]
				lastPos = Array.isArray(last) ? (last as Vec3) : (last as { p: Vec3 }).p
			}
		} else {
			out.push(node)
			if (isVec3(node) || isVec3Curve(node)) lastPos = <Vec3>node.slice(0, 3)
			else if (isPointFull(node)) lastPos = node.p
			else if (isSplit(node)) lastPos = node.split.p
		}
	}
	return out
}

function resolveNodes(nodes: RailDef, startBeat: number): ResolvedSegment & { endBeat: number } {
	const nodes_ = flattenNodes(nodes)
	// If any RailPointFull has an explicit beat, treat RailPointFull without
	// beat as geometric-only (no auto-increment, beat interpolated later).
	const hasExplicitBeats = nodes_.some((n) => isPointFull(n) && n.beat !== undefined)

	const points: ResolvedPoint[] = []
	const anchors: number[] = []
	const splits: ResolvedSplit[] = []
	let beat = startBeat

	for (const node of nodes_) {
		if (isVec3(node)) {
			points.push({ p: node, beat, round: null, tangent: 0.39 })
			anchors.push(points.length - 1)
			beat++
		} else if (isVec3Curve(node)) {
			points.push({
				p: <Vec3>node.slice(0, 3),
				beat,
				round: <Rounding>(<unknown>node[3]),
				tangent: node[4] ?? 0.39
			})
			anchors.push(points.length - 1)
			beat++
		} else if (isPointFull(node)) {
			if (node.beat !== undefined) {
				beat = node.beat
				points.push({ p: node.p, beat, round: node.round ?? null, tangent: node.tangent ?? 0.39 })
				anchors.push(points.length - 1)
				beat++
			} else if (hasExplicitBeats) {
				// Geometric-only: placeholder, will be interpolated
				points.push({
					p: node.p,
					beat: NaN,
					round: node.round ?? null,
					tangent: node.tangent ?? 0.39
				})
			} else {
				points.push({ p: node.p, beat, round: node.round ?? null, tangent: node.tangent ?? 0.39 })
				anchors.push(points.length - 1)
				beat++
			}
		} else if (isSplit(node)) {
			// Split now contains its own position and optional beat
			const splitBeat = node.split.beat !== undefined ? node.split.beat : beat
			const branchStartBeat = splitBeat + 1

			// Add split point to main rail
			points.push({ p: node.split.p, beat: splitBeat, round: null, tangent: 0.39 })
			anchors.push(points.length - 1)

			const resolvedBranches: ResolvedSegment[] = []
			for (const branch of node.split.branches) {
				const resolved = resolveNodes(branch, branchStartBeat)
				resolvedBranches.push({ points: resolved.points, splits: resolved.splits })
			}

			splits.push({
				beat: splitBeat,
				p: node.split.p,
				weights: node.split.weights,
				branches: resolvedBranches
			})

			beat = splitBeat + 1
		}
	}

	// Interpolate beats for geometric-only points
	if (hasExplicitBeats && anchors.length > 0) {
		// Before first anchor: interpolate from startBeat
		const firstAnchorIdx = anchors[0]
		const firstAnchorBeat = points[firstAnchorIdx].beat
		for (let i = 0; i < firstAnchorIdx; i++) {
			points[i].beat = startBeat + ((firstAnchorBeat - startBeat) * i) / firstAnchorIdx
		}
		// Between consecutive anchors: linear interpolation
		for (let a = 0; a < anchors.length - 1; a++) {
			const si = anchors[a]
			const ei = anchors[a + 1]
			const sb = points[si].beat
			const eb = points[ei].beat
			for (let i = si + 1; i < ei; i++) {
				points[i].beat = sb + ((eb - sb) * (i - si)) / (ei - si)
			}
		}
		// After last anchor: same beat
		const last = anchors[anchors.length - 1]
		for (let i = last + 1; i < points.length; i++) {
			points[i].beat = points[last].beat
		}
	}

	return { points, splits, endBeat: beat }
}

/**
 * Validate that no mid-path points share the same position.
 * Only allows first == last for closed loops.
 * Exported for testing only - not enforced in production.
 */
export function validateNoDuplicateMidPathPositions(points: ResolvedPoint[], railId: string): void {
	const n = points.length
	if (n < 3) return

	const toV3 = (p: Vec3) => new Vector3(p[0], p[1], p[2])

	// Check if closed loop
	const closed = toV3(points[0].p).distanceTo(toV3(points[n - 1].p)) < 1e-6

	// Check points 1..(n-2) for duplicates with ANY point
	// For closed loops, exclude last point from comparison (it's allowed to match first)
	const checkEnd = closed ? n - 1 : n

	for (let i = 1; i < n - 1; i++) {
		const posI = toV3(points[i].p)

		for (let j = 0; j < checkEnd; j++) {
			if (i === j) continue

			const posJ = toV3(points[j].p)
			const dist = posI.distanceTo(posJ)

			if (dist < 1e-6) {
				throw new Error(
					`Rail '${railId}': Point at beat ${points[i].beat} shares position with ` +
						`point at beat ${points[j].beat}. Duplicate positions in the middle of a path ` +
						`cause ambiguous marble movement. Add a small offset (e.g., 'u0.01') to separate them.`
				)
			}
		}
	}
}

export function resolveRail(rail: Rail): ResolvedRail {
	const beatOffset = rail.beatOffset ?? 0
	const offset = rail.offset ?? [0, 0, 0]
	const { points, splits } = resolveNodes(rail.nodes, beatOffset)

	// Apply offset to all points
	const offsetPoints = points.map((pt) => ({
		...pt,
		p: [pt.p[0] + offset[0], pt.p[1] + offset[1], pt.p[2] + offset[2]] as Vec3
	}))

	// Apply offset to split points and branch points
	const offsetSplits = splits.map((split) => ({
		...split,
		p: [split.p[0] + offset[0], split.p[1] + offset[1], split.p[2] + offset[2]] as Vec3,
		branches: split.branches.map((branch) => ({
			...branch,
			points: branch.points.map((pt) => ({
				...pt,
				p: [pt.p[0] + offset[0], pt.p[1] + offset[1], pt.p[2] + offset[2]] as Vec3
			}))
		}))
	}))

	return {
		id: rail.id,
		beatOffset,
		reverse: rail.reverse ?? false,
		tilt: rail.tilt ?? 90,
		points: offsetPoints,
		splits: offsetSplits
	}
}
