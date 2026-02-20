import type { ResolvedPoint, ResolvedSplit } from '../rail'
import { Vector3 } from 'three/webgpu'

export function computeRailNamePosition(
	points: ResolvedPoint[],
	splits: ResolvedSplit[]
): Vector3 | null {
	if (points.length === 0) return null
	let minX = Infinity,
		maxX = -Infinity
	let maxY = -Infinity
	let minZ = Infinity
	for (const pt of points) {
		if (pt.p[0] < minX) minX = pt.p[0]
		if (pt.p[0] > maxX) maxX = pt.p[0]
		if (pt.p[1] > maxY) maxY = pt.p[1]
		if (pt.p[2] < minZ) minZ = pt.p[2]
	}
	for (const split of splits) {
		for (const branch of split.branches) {
			for (const pt of branch.points) {
				if (pt.p[0] < minX) minX = pt.p[0]
				if (pt.p[0] > maxX) maxX = pt.p[0]
				if (pt.p[1] > maxY) maxY = pt.p[1]
				if (pt.p[2] < minZ) minZ = pt.p[2]
			}
		}
	}
	const midX = (minX + maxX) / 2
	return new Vector3(midX, maxY + 0.4, minZ - 0.3)
}

export function scalePoints(points: ResolvedPoint[], scale: Vector3): ResolvedPoint[] {
	const { x, y, z } = scale
	return points.map((pt) => ({
		...pt,
		p: [pt.p[0] * x, pt.p[1] * y, pt.p[2] * z] as ResolvedPoint['p']
	}))
}

export function scaleSplits(splits: ResolvedSplit[], scale: Vector3): ResolvedSplit[] {
	const { x, y, z } = scale
	return splits.map((split) => ({
		...split,
		p: [split.p[0] * x, split.p[1] * y, split.p[2] * z] as typeof split.p,
		branches: split.branches.map((branch) => ({
			...branch,
			points: branch.points.map((pt) => ({
				...pt,
				p: [pt.p[0] * x, pt.p[1] * y, pt.p[2] * z] as ResolvedPoint['p']
			}))
		}))
	}))
}
