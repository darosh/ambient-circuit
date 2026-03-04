import type { ResolvedPoint, ResolvedSplit } from '../core/rail'
import { Vector3 } from 'three/webgpu'

export function computeRailNamePosition(
	points: ResolvedPoint[],
	splits: ResolvedSplit[],
	tolerance = 0.25
): Vector3 | null {
	if (points.length === 0) return null

	const all: ResolvedPoint[] = [...points]
	for (const split of splits)
		for (const branch of split.branches) for (const pt of branch.points) all.push(pt)

	let minX = Infinity
	let maxX = -Infinity
	let maxY = -Infinity
	let minZ = Infinity
	let maxZ = -Infinity

	for (const pt of all) {
		if (pt.p[0] < minX) minX = pt.p[0]
		if (pt.p[0] > maxX) maxX = pt.p[0]
		if (pt.p[1] > maxY) maxY = pt.p[1]
		if (pt.p[2] < minZ) minZ = pt.p[2]
		if (pt.p[2] > maxZ) maxZ = pt.p[2]
	}

	// return new Vector3(minX, maxY + 0.4, minZ - 0.3)

	const avgX = (minX + maxX) / 2

	// find real point closest to (minX, maxY, minZ) within tolerance
	let best
	let midBest
	let bestScore = Infinity

	for (const pt of all) {
		const dx = pt.p[0] - avgX
		const dy = pt.p[1] - maxY
		const dz = pt.p[2] - minZ

		if (best && (dx > tolerance || -dy > tolerance || dz > tolerance)) {
			continue
		}

		const score = (dx * dx) / 2 + dy * dy + dz * dz

		if (score < bestScore || !best) {
			bestScore = score
			best = pt
		}

		if (dy === 0 && dz === 0 && minZ === maxZ) {
			if (midBest) {
				midBest.p[0] = avgX
				midBest.p[1] = maxY
				midBest.p[2] = minZ
			} else {
				midBest = { p: [avgX, maxY, minZ] }
			}

			bestScore = dy * dy + dz * dz
		}
	}

	best = midBest ?? best

	return new Vector3(best!.p[0], best!.p[1] + 0.4, best!.p[2] - 0.3)
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
