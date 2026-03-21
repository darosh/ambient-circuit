import type { RailDef, RailPointFull, Vec3 } from './rail'
import { resolveNodes } from './rail-resolve'

export interface PcbLayoutOptions {
	height?: number
	layerHeight?: number
	cornerTangent?: number
	detourHalfWidth?: number
	detourTangent?: number
	beatMapping?: boolean
	cellSize?: number
}

export function toPcbLayout(defs: RailDef[], opts?: PcbLayoutOptions): RailDef[] {
	const height = opts?.height ?? 0.25
	const layerHeight = opts?.layerHeight ?? 0.25
	const cornerTangent = opts?.cornerTangent ?? 0
	const detourHalfWidth = opts?.detourHalfWidth ?? 0.75 / 2
	const detourTangent = opts?.detourTangent ?? 0.39
	const beatMapping = opts?.beatMapping ?? true
	const cellSz = opts?.cellSize ?? 0.5

	// Step 1 — resolve all rails
	const resolved = defs.map((d) => resolveNodes(d, 0))

	// Steps 2+3 — multi-floor heightmap
	// Each cell stores all distinct heights claimed by previous rails.
	// This lets a new rail detect whether its specific floor is free,
	// allowing it to pass UNDER an arch (free floor below) or arch over
	// (free floor above). Prefer going under when equidistant.
	const floorMap = new Map<string, number[]>()
	const fmKey = (x: number, z: number) => `${Math.round(x / cellSz)},${Math.round(z / cellSz)}`

	const isFreeH = (x: number, z: number, h: number): boolean => {
		const claims = floorMap.get(fmKey(x, z))
		return !claims?.some((oh) => Math.abs(oh - h) < layerHeight * 0.4)
	}

	const claimH = (x: number, z: number, h: number): void => {
		const k = fmKey(x, z)
		const list = floorMap.get(k)
		if (!list) {
			floorMap.set(k, [h])
			return
		}
		if (!list.some((oh) => Math.abs(oh - h) < layerHeight * 0.1)) list.push(h)
	}

	const markSeg = (p0: Vec3, p1: Vec3, h: number) => {
		const n = Math.max(2, Math.ceil(Math.hypot(p1[0] - p0[0], p1[2] - p0[2]) / cellSz) * 2 + 1)
		for (let k = 0; k <= n; k++) {
			const t = k / n
			claimH(p0[0] + t * (p1[0] - p0[0]), p0[2] + t * (p1[2] - p0[2]), h)
		}
	}

	// Find nearest free height starting from preferred.
	// Tries down first (going under preferred), then up — never below `height`.
	const findFreeH = (x: number, z: number, preferred: number): number => {
		if (isFreeH(x, z, preferred)) return preferred
		for (let d = 1; d <= 8; d++) {
			const below = preferred - d * layerHeight
			if (below >= height && isFreeH(x, z, below)) return below
			const above = preferred + d * layerHeight
			if (isFreeH(x, z, above)) return above
		}
		return preferred + layerHeight
	}

	const baseHeights: number[] = Array.from({ length: defs.length }, () => height)
	type ArchInfo = { segIdx: number; t: number; x: number; z: number; archHeight: number }
	const arches: ArchInfo[][] = defs.map(() => [])

	for (const [j, element] of resolved.entries()) {
		const pts = element.points

		// Two-pass scan:
		// Pass 0: near-endpoint/long-span conflicts → elevate base height
		// Pass 1: mid-segment conflicts with final base → insert arch or dip
		for (let pass = 0; pass < 2; pass++) {
			const bh = baseHeights[j]
			if (pass === 1) arches[j] = []

			for (let s = 0; s < pts.length - 1; s++) {
				const pa = pts[s],
					pb = pts[s + 1]
				const dx = pb.p[0] - pa.p[0],
					dz = pb.p[2] - pa.p[2]
				const len = Math.hypot(dx, dz) || 1
				const n = Math.max(8, Math.ceil(len / cellSz) * 4)
				const edgeT = detourHalfWidth / len

				let inRegion = false,
					regionMaxT = 0,
					regionStartT = 0

				const closeRegion = (regionEndT: number) => {
					const nearEdge = regionStartT < edgeT || regionEndT > 1 - edgeT
					const longSpan = regionEndT - regionStartT > 0.6
					const cx = pa.p[0] + regionMaxT * dx,
						cz = pa.p[2] + regionMaxT * dz
					if (pass === 0 && (nearEdge || longSpan)) {
						// Elevate base: find lowest free floor (start from floor 0)
						baseHeights[j] = Math.max(baseHeights[j], findFreeH(cx, cz, height))
					} else if (pass === 1 && !nearEdge && !longSpan) {
						// Arch or dip: find nearest free floor from current base
						arches[j].push({
							segIdx: s,
							t: regionMaxT,
							x: cx,
							z: cz,
							archHeight: findFreeH(cx, cz, bh)
						})
					}
				}

				for (let k = 0; k <= n; k++) {
					const t = k / n
					const x = pa.p[0] + t * dx,
						z = pa.p[2] + t * dz
					const conflict = !isFreeH(x, z, bh)
					if (conflict) {
						if (inRegion) {
							regionMaxT = (regionStartT + t) * 0.5
						}
						// track t of worst conflict (deepest into occupied zone = center of region)
						else {
							inRegion = true
							regionStartT = t
							regionMaxT = t
						}
					} else if (inRegion) {
						inRegion = false
						closeRegion(t)
					}
				}
				if (inRegion) closeRegion(1)
			}
		}

		// Mark this rail's base segments and arch/dip peaks in the floor map
		for (let s = 0; s < pts.length - 1; s++) markSeg(pts[s].p, pts[s + 1].p, baseHeights[j])
		for (const a of arches[j]) claimH(a.x, a.z, a.archHeight)
	}

	// Step 4 — build output per rail
	const result: RailDef[] = []

	for (const [i, def] of defs.entries()) {
		const pts = resolved[i].points
		const bh = baseHeights[i]
		const railArches = arches[i]
		const out: RailPointFull[] = []

		if (pts.length === 0) {
			result.push(def)
			continue
		}

		const p0 = pts[0].p
		const pN = pts.at(-1)!.p

		out.push(
			{ p: [p0[0], 0, p0[2]] as Vec3 },
			{ p: [p0[0], bh, p0[2]] as Vec3, round: 'to', tangent: cornerTangent }
		)

		const archBySeg = new Map<number, ArchInfo[]>()
		for (const a of railArches) {
			if (!archBySeg.has(a.segIdx)) archBySeg.set(a.segIdx, [])
			archBySeg.get(a.segIdx)!.push(a)
		}

		for (let s = 0; s < pts.length - 1; s++) {
			const pa = pts[s],
				pb = pts[s + 1]
			const segArches = (archBySeg.get(s) ?? []).toSorted((a, b) => a.t - b.t)

			let prevBeat = pa.beat

			for (const a of segArches) {
				const cx = a.x,
					cz = a.z
				const ddx = pb.p[0] - pa.p[0],
					ddz = pb.p[2] - pa.p[2]
				const len = Math.hypot(ddx, ddz) || 1
				const ux = ddx / len,
					uz = ddz / len
				const segBeats = pb.beat - pa.beat
				const crossBeat = pa.beat + a.t * segBeats
				const halfBeatW = segBeats > 0 ? (detourHalfWidth / len) * segBeats : 0

				void prevBeat

				out.push(
					{
						p: [cx - ux * detourHalfWidth, bh, cz - uz * detourHalfWidth] as Vec3,
						round: 'from',
						tangent: detourTangent,
						...(beatMapping ? { beat: crossBeat - halfBeatW } : {})
					},
					{
						p: [cx, a.archHeight, cz] as Vec3,
						round: 'both',
						tangent: detourTangent,
						...(beatMapping ? { beat: crossBeat } : {})
					},
					{
						p: [cx + ux * detourHalfWidth, bh, cz + uz * detourHalfWidth] as Vec3,
						round: 'to',
						tangent: detourTangent,
						...(beatMapping ? { beat: crossBeat + halfBeatW } : {})
					}
				)

				prevBeat = crossBeat + halfBeatW
			}

			if (s < pts.length - 2) {
				const pt = pts[s + 1]
				out.push({
					p: [pt.p[0], bh, pt.p[2]] as Vec3,
					...(pt.round ? { round: pt.round } : {}),
					...(pt.tangent === 0.39 ? {} : { tangent: pt.tangent }),
					...(beatMapping && !Number.isNaN(pt.beat) ? { beat: pt.beat } : {})
				})
			}
		}

		out.push(
			{ p: [pN[0], bh, pN[2]] as Vec3, round: 'from', tangent: cornerTangent },
			{ p: [pN[0], 0, pN[2]] as Vec3 }
		)

		result.push(out)
	}

	return result
}
