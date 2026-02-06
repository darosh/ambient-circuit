import type {
	Rail,
	RailDef,
	ResolvedPoint,
	ResolvedRail,
	ResolvedSegment,
	ResolvedSplit,
} from './rail'
import { isVec3, isSplit, isPointFull } from './rail'

function resolveNodes(nodes: RailDef, startBeat: number): ResolvedSegment & { endBeat: number } {
	const points: ResolvedPoint[] = []
	const splits: ResolvedSplit[] = []
	let beat = startBeat

	for (const node of nodes) {
		if (isVec3(node)) {
			points.push({ p: node, beat, round: null })
			beat++
		} else if (isPointFull(node)) {
			if (node.beat !== undefined) beat = node.beat
			points.push({ p: node.p, beat, round: node.round ?? null })
			beat++
		} else if (isSplit(node)) {
			const lastPoint = points[points.length - 1]
			if (!lastPoint) throw new Error('Split cannot be first element in rail')

			const splitBeat = lastPoint.beat
			const branchStartBeat = splitBeat + 1

			const resolvedBranches: ResolvedSegment[] = []
			for (const branch of node.split.branches) {
				const resolved = resolveNodes(branch, branchStartBeat)
				resolvedBranches.push({ points: resolved.points, splits: resolved.splits })
			}

			splits.push({
				beat: splitBeat,
				p: lastPoint.p,
				weights: node.split.weights,
				branches: resolvedBranches,
			})
		}
	}

	return { points, splits, endBeat: beat }
}

export function resolveRail(rail: Rail): ResolvedRail {
	const beatOffset = rail.beatOffset ?? 0
	const { points, splits } = resolveNodes(rail.nodes, beatOffset)

	return {
		id: rail.id,
		beatOffset,
		reverse: rail.reverse ?? false,
		points,
		splits,
	}
}
