import type {
	Rail,
	RailDef,
	ResolvedPoint,
	ResolvedRail,
	ResolvedSegment,
	ResolvedSplit,
	Vec3,
} from './rail'
import { isVec3, isSplit, isPointFull } from './rail'

function resolveNodes(nodes: RailDef, startBeat: number): ResolvedSegment & { endBeat: number } {
	// If any RailPointFull has an explicit beat, treat RailPointFull without
	// beat as geometric-only (no auto-increment, beat interpolated later).
	const hasExplicitBeats = nodes.some((n) => isPointFull(n) && n.beat !== undefined)

	const points: ResolvedPoint[] = []
	const anchors: number[] = []
	const splits: ResolvedSplit[] = []
	let beat = startBeat

	for (const node of nodes) {
		if (isVec3(node)) {
			points.push({ p: node, beat, round: null })
			anchors.push(points.length - 1)
			beat++
		} else if (isPointFull(node)) {
			if (node.beat !== undefined) {
				beat = node.beat
				points.push({ p: node.p, beat, round: node.round ?? null })
				anchors.push(points.length - 1)
				beat++
			} else if (hasExplicitBeats) {
				// Geometric-only: placeholder, will be interpolated
				points.push({ p: node.p, beat: NaN, round: node.round ?? null })
			} else {
				points.push({ p: node.p, beat, round: node.round ?? null })
				anchors.push(points.length - 1)
				beat++
			}
		} else if (isSplit(node)) {
			// Split now contains its own position and optional beat
			const splitBeat = node.split.beat !== undefined ? node.split.beat : beat
			const branchStartBeat = splitBeat + 1

			// Add split point to main rail
			points.push({ p: node.split.p, beat: splitBeat, round: null })
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
				branches: resolvedBranches,
			})

			beat = splitBeat + 1
		}
	}

	// Interpolate beats for geometric-only points
	if (hasExplicitBeats && anchors.length > 0) {
		// Before first anchor: same beat
		for (let i = 0; i < anchors[0]; i++) {
			points[i].beat = points[anchors[0]].beat
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

export function resolveRail(rail: Rail): ResolvedRail {
	const beatOffset = rail.beatOffset ?? 0
	const offset = rail.offset ?? [0, 0, 0]
	const { points, splits } = resolveNodes(rail.nodes, beatOffset)

	// Apply offset to all points
	const offsetPoints = points.map((pt) => ({
		...pt,
		p: [pt.p[0] + offset[0], pt.p[1] + offset[1], pt.p[2] + offset[2]] as Vec3,
	}))

	// Apply offset to split points and branch points
	const offsetSplits = splits.map((split) => ({
		...split,
		p: [split.p[0] + offset[0], split.p[1] + offset[1], split.p[2] + offset[2]] as Vec3,
		branches: split.branches.map((branch) => ({
			...branch,
			points: branch.points.map((pt) => ({
				...pt,
				p: [pt.p[0] + offset[0], pt.p[1] + offset[1], pt.p[2] + offset[2]] as Vec3,
			})),
		})),
	}))

	return {
		id: rail.id,
		beatOffset,
		reverse: rail.reverse ?? false,
		points: offsetPoints,
		splits: offsetSplits,
	}
}
