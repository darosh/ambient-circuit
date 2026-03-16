import type { ResolvedPoint, ResolvedSegment, ResolvedSplit, Vec3 } from '../core/rail'
import { type BufferGeometry, CurvePath, LineCurve3, Vector3 } from 'three/webgpu'
import { buildSegmentCurve, toV3 } from '../core/rail-curve'
import { buildTubeGeometry } from '../video/geometry-tube'
import { debug } from 'debug'

const log = debug('geo:rail')

export type RailMesh = { geometry: BufferGeometry; opacity: number }

export function buildRailCurvePath(
	points: ResolvedPoint[],
	skipFirst = 0
): CurvePath<Vector3> | null {
	const path = new CurvePath<Vector3>()
	for (let i = skipFirst; i < points.length - 1; i++) {
		const p0 = toV3(points[i].p)
		const p1 = toV3(points[i + 1].p)
		if (p0.distanceTo(p1) < 1e-6) continue
		const bezier = buildSegmentCurve(points, i)
		path.add(bezier ?? new LineCurve3(p0, p1))
	}
	return path.curves.length > 0 ? path : null
}

function makeTube(
	curvePath: CurvePath<Vector3> | null,
	width: number,
	opacity: number,
	closed = false
): RailMesh | null {
	if (!curvePath) return null
	try {
		const radius = Math.max(width / 2, 0.001)
		const uvScale = 0.15 / radius
		return {
			geometry: buildTubeGeometry(curvePath.curves, radius, 8, 12, closed, true, uvScale),
			opacity
		}
	} catch (error) {
		console.warn('Failed to create tube:', error)
		return null
	}
}

export function disposeRailGeometry(allMeshes: RailMesh[]) {
	for (const mesh of allMeshes) {
		log('disposing', mesh.geometry.name)
		mesh.geometry.dispose()
	}
}

export function isClosed(first: Vec3 | undefined, last: Vec3 | null) {
	return (
		!!first &&
		!!last &&
		Math.abs(first[0] - last[0]) < 1e-6 &&
		Math.abs(first[1] - last[1]) < 1e-6 &&
		Math.abs(first[2] - last[2]) < 1e-6
	)
}

/** Recursively collect branch geometry from a segment and its nested splits. */
function collectBranchMeshes(
	seg: ResolvedSegment,
	splitPt: ResolvedPoint,
	prevPt: ResolvedPoint | null,
	width: number,
	namePrefix: string,
	meshes: RailMesh[]
): void {
	// Geometry from split point through this branch's main points
	const pts: ResolvedPoint[] = prevPt ? [prevPt, splitPt, ...seg.points] : [splitPt, ...seg.points]
	const mesh = makeTube(buildRailCurvePath(pts, prevPt ? 1 : 0), width, 0.7)
	if (mesh) {
		mesh.geometry.name = namePrefix
		log('creating', namePrefix)
		meshes.push(mesh)
	}

	// Recurse into nested splits within this branch
	for (const [si, s] of seg.splits.entries()) {
		const splitIdx = seg.points.findIndex((p) => p.beat === s.beat)
		const prev = splitIdx > 0 ? seg.points[splitIdx - 1] : (seg.points.at(-1) ?? null)
		const nestedSplitPt: ResolvedPoint = { p: s.p, beat: s.beat, round: null, tangent: 0.39 }
		for (const [bi, b] of s.branches.entries()) {
			collectBranchMeshes(b, nestedSplitPt, prev, width, `${namePrefix}-s${si}-b${bi}`, meshes)
		}
	}
}

export function buildRailGeometry(
	points: ResolvedPoint[],
	splits: ResolvedSplit[],
	width: number,
	name: string
): RailMesh[] {
	const meshes: RailMesh[] = []

	// Main rail (pre-split backbone)
	const first = points[0]?.p
	const last = points.at(-1)?.p ?? null
	const closed = isClosed(first, last)
	const mainMesh = makeTube(buildRailCurvePath(points), width, 0.9, closed)
	if (mainMesh) {
		mainMesh.geometry.name = name
		log('creating', name)
		meshes.push(mainMesh)
	}

	// Branch rails (recursive)
	for (const [si, s] of splits.entries()) {
		const splitIdx = points.findIndex((p) => p.beat === s.beat)
		const prev = splitIdx > 0 ? points[splitIdx - 1] : null
		const splitPt: ResolvedPoint = { p: s.p, beat: s.beat, round: null, tangent: 0.39 }
		for (const [bi, b] of s.branches.entries()) {
			collectBranchMeshes(b, splitPt, prev, width, `${name}-branch-${si}-${bi}`, meshes)
		}
	}

	return meshes
}

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
