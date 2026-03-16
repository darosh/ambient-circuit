import type { RailPointFull, RailNode, RailDef, Vec3 } from './rail'
import { offset, type Pos } from './rail-primitives'

// ── SVG Cubic Bezier straight detection ─────────────────────

/** True if both cubic Bezier handles are nearly collinear with the chord (straight line). */
function isCubicStraight(
	x1: number,
	y1: number,
	cp1x: number,
	cp1y: number,
	cp2x: number,
	cp2y: number,
	x2: number,
	y2: number,
	angleTolRad = 5 * (Math.PI / 180)
): boolean {
	const chordX = x2 - x1,
		chordY = y2 - y1
	const chordLen = Math.hypot(chordX, chordY)
	if (chordLen < 1e-6) return true
	const check = (hx: number, hy: number): boolean => {
		const hLen = Math.hypot(hx, hy)
		if (hLen < 1e-6) return true
		const sinA = Math.abs(hx * chordY - hy * chordX) / (hLen * chordLen)
		return Math.asin(Math.min(1, sinA)) <= angleTolRad
	}
	return check(cp1x - x1, cp1y - y1) && check(cp2x - x2, cp2y - y2)
}

// ── SVG Arc tangent ─────────────────────────────────────────

/**
 * Compute the Bezier handle ratio (handle_length / chord) for a single SVG arc.
 * Uses the SVG center parameterization to find the arc sweep angle, then applies
 * the cubic Bezier approximation formula: k = 4/3 * tan(θ/4).
 * For circular arcs: ratio = k*r / chord. For ellipses: uses mean radius.
 */
function arcTangentRatio(
	x1: number,
	y1: number,
	rx0: number,
	ry0: number,
	xRotDeg: number,
	largeArc: boolean,
	sweep: boolean,
	x2: number,
	y2: number
): number {
	const chord = Math.hypot(x2 - x1, y2 - y1)
	if (chord < 1e-6 || rx0 <= 0 || ry0 <= 0) return 0

	const phi = (xRotDeg * Math.PI) / 180
	const cosPhi = Math.cos(phi)
	const sinPhi = Math.sin(phi)

	const dx = (x1 - x2) / 2
	const dy = (y1 - y2) / 2
	const x1p = cosPhi * dx + sinPhi * dy
	const y1p = -sinPhi * dx + cosPhi * dy

	// Ensure radii are large enough
	let rx = Math.abs(rx0)
	let ry = Math.abs(ry0)
	const lam = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry)
	if (lam > 1) {
		const s = Math.sqrt(lam)
		rx *= s
		ry *= s
	}

	const rx2 = rx * rx
	const ry2 = ry * ry
	const x1p2 = x1p * x1p
	const y1p2 = y1p * y1p
	const num = rx2 * ry2 - rx2 * y1p2 - ry2 * x1p2
	const den = rx2 * y1p2 + ry2 * x1p2
	const sq = den > 0 ? Math.sqrt(Math.max(0, num / den)) : 0
	const sign = largeArc === sweep ? -1 : 1
	const cxp = (sign * sq * rx * y1p) / ry
	const cyp = (sign * sq * -ry * x1p) / rx

	// Angle from center to start, then to end (in ellipse space)
	const ux = (x1p - cxp) / rx
	const uy = (y1p - cyp) / ry
	const vx = (-x1p - cxp) / rx
	const vy = (-y1p - cyp) / ry
	let dTheta = Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy)
	if (!sweep && dTheta > 0) dTheta -= 2 * Math.PI
	if (sweep && dTheta < 0) dTheta += 2 * Math.PI

	const absTheta = Math.abs(dTheta)
	if (absTheta < 1e-6) return 0

	// k = cubic Bezier handle scale for arc approximation
	const k = (4 / 3) * Math.tan(absTheta / 4)
	const r = (rx + ry) / 2 // mean radius (exact for circles)
	return (k * r) / chord
}

// ── SVG Rail ────────────────────────────────────────────────

export type SvgRailOpts = {
	pos?: Pos
	/** SVG units per world unit. Default: 10 */
	scale?: number
	/** Endpoint matching tolerance in world units for svgRailMulti. Default: 2/scale */
	tol?: number
}

/**
 * Parse a full SVG path `d` string, returning each M sub-path as a separate point array.
 * Continuous cx/cy state is preserved across sub-paths so relative `m` coords are correct.
 */
function parseSvgPathSegments(d: string, opts: SvgRailOpts = {}): (Vec3 | RailPointFull)[][] {
	const { pos = { x: -5, y: 0, z: -5 }, scale = 10 } = opts

	function toWorld(x: number, y: number): Vec3 {
		const r = (n: number) => Math.round(n * 1e6) / 1e6
		return offset([r(x / scale), 0, r(y / scale)], pos)
	}

	function d2(ax: number, ay: number, bx: number, by: number): number {
		return Math.hypot(ax - bx, ay - by)
	}

	function markFrom(tangent: number) {
		if (result.length === 0) return
		const last = result.at(-1)
		if (Array.isArray(last)) {
			result[result.length - 1] = { p: last as Vec3, round: 'from' as const, tangent }
		} else {
			const rf = last as RailPointFull
			result[result.length - 1] = {
				p: rf.p,
				round: rf.round === 'to' ? ('both' as const) : rf.round,
				tangent: rf.tangent === undefined ? tangent : (rf.tangent + tangent) / 2
			}
		}
	}

	// eslint-disable-next-line sonarjs/slow-regex, sonarjs/regex-complexity
	const tokens = d.match(/[MmLlHhVvCcSsQqTtAaZz]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g) ?? []
	const argsN: Record<string, number> = {
		M: 2,
		L: 2,
		H: 1,
		V: 1,
		C: 6,
		S: 4,
		Q: 4,
		T: 2,
		A: 7,
		Z: 0
	}

	const segments: (Vec3 | RailPointFull)[][] = []
	let result: (Vec3 | RailPointFull)[] = []
	let cx = 0,
		cy = 0
	let startX = 0,
		startY = 0
	let prevCubicCPX = 0,
		prevCubicCPY = 0
	let prevQuadCPX = 0,
		prevQuadCPY = 0
	let prevLetter = ''
	let curCmd = 'M'
	let i = 0

	while (i < tokens.length) {
		if (/^[A-Za-z]$/.test(tokens[i])) curCmd = tokens[i++]

		const letter = curCmd.toUpperCase()
		const abs = curCmd === letter
		const n = argsN[letter] ?? 0
		const args: number[] = []
		for (let j = 0; j < n; j++) args.push(Number.parseFloat(tokens[i++]))

		switch (letter) {
			case 'M': {
				// Start new sub-path segment (flush current if non-empty)
				if (result.length > 0) {
					segments.push(result)
					result = []
				}
				cx = abs ? args[0] : cx + args[0]
				cy = abs ? args[1] : cy + args[1]
				result.push(toWorld(cx, cy))
				startX = cx
				startY = cy
				prevCubicCPX = cx
				prevCubicCPY = cy
				prevQuadCPX = cx
				prevQuadCPY = cy
				prevLetter = letter
				curCmd = abs ? 'L' : 'l'
				continue
			}
			case 'Z': {
				const closeDist = Math.hypot(cx - startX, cy - startY)
				const wasCurve = 'CSQTA'.includes(prevLetter)
				const threshold = wasCurve ? 0.2 : 1e-4

				if (closeDist > threshold) {
					result.push(toWorld(startX, startY))
				}

				if (wasCurve && closeDist <= threshold && result.length > 1) {
					const lastPt = result[result.length - 1] // eslint-disable-line unicorn/prefer-at
					const inTangent = Array.isArray(lastPt) ? 0 : ((lastPt as RailPointFull).tangent ?? 0)

					const first = result[0]
					if (Array.isArray(first)) {
						result[0] = { p: first as Vec3, round: 'both' as const, tangent: inTangent }
					} else {
						const rf = first as RailPointFull
						result[0] = {
							p: rf.p,
							round: 'both' as const,
							tangent: rf.tangent === undefined ? inTangent : (rf.tangent + inTangent) / 2
						}
					}

					const startWorld = toWorld(startX, startY)
					const lastIdx = result.length - 1
					const last = result[lastIdx]
					result[lastIdx] = Array.isArray(last)
						? startWorld
						: { ...(last as RailPointFull), p: startWorld }
				}

				cx = startX
				cy = startY
				curCmd = 'L'
				continue
			}
			case 'L': {
				cx = abs ? args[0] : cx + args[0]
				cy = abs ? args[1] : cy + args[1]
				result.push(toWorld(cx, cy))
				break
			}
			case 'H': {
				cx = abs ? args[0] : cx + args[0]
				result.push(toWorld(cx, cy))
				break
			}
			case 'V': {
				cy = abs ? args[0] : cy + args[0]
				result.push(toWorld(cx, cy))
				break
			}
			case 'C': {
				const cp1x = abs ? args[0] : cx + args[0],
					cp1y = abs ? args[1] : cy + args[1]
				const cp2x = abs ? args[2] : cx + args[2],
					cp2y = abs ? args[3] : cy + args[3]
				const ex = abs ? args[4] : cx + args[4],
					ey = abs ? args[5] : cy + args[5]
				if (isCubicStraight(cx, cy, cp1x, cp1y, cp2x, cp2y, ex, ey)) {
					result.push(toWorld(ex, ey))
				} else {
					const chord = d2(cx, cy, ex, ey)
					markFrom(chord > 0 ? d2(cp1x, cp1y, cx, cy) / chord : 0)
					result.push({
						p: toWorld(ex, ey),
						round: 'to' as const,
						tangent: chord > 0 ? d2(cp2x, cp2y, ex, ey) / chord : 0
					})
				}
				prevCubicCPX = cp2x
				prevCubicCPY = cp2y
				cx = ex
				cy = ey
				break
			}
			case 'S': {
				const reflX = prevLetter === 'C' || prevLetter === 'S' ? 2 * cx - prevCubicCPX : cx
				const reflY = prevLetter === 'C' || prevLetter === 'S' ? 2 * cy - prevCubicCPY : cy
				const cp2x = abs ? args[0] : cx + args[0],
					cp2y = abs ? args[1] : cy + args[1]
				const ex = abs ? args[2] : cx + args[2],
					ey = abs ? args[3] : cy + args[3]
				if (isCubicStraight(cx, cy, reflX, reflY, cp2x, cp2y, ex, ey)) {
					result.push(toWorld(ex, ey))
				} else {
					const chord = d2(cx, cy, ex, ey)
					markFrom(chord > 0 ? d2(reflX, reflY, cx, cy) / chord : 0)
					result.push({
						p: toWorld(ex, ey),
						round: 'to' as const,
						tangent: chord > 0 ? d2(cp2x, cp2y, ex, ey) / chord : 0
					})
				}
				prevCubicCPX = cp2x
				prevCubicCPY = cp2y
				cx = ex
				cy = ey
				break
			}
			case 'Q': {
				const qx = abs ? args[0] : cx + args[0],
					qy = abs ? args[1] : cy + args[1]
				const ex = abs ? args[2] : cx + args[2],
					ey = abs ? args[3] : cy + args[3]
				const chord = d2(cx, cy, ex, ey)
				markFrom(chord > 0 ? ((2 / 3) * d2(qx, qy, cx, cy)) / chord : 0)
				result.push({
					p: toWorld(ex, ey),
					round: 'to' as const,
					tangent: chord > 0 ? ((2 / 3) * d2(qx, qy, ex, ey)) / chord : 0
				})
				prevQuadCPX = qx
				prevQuadCPY = qy
				cx = ex
				cy = ey
				break
			}
			case 'T': {
				const reflX = prevLetter === 'Q' || prevLetter === 'T' ? 2 * cx - prevQuadCPX : cx
				const reflY = prevLetter === 'Q' || prevLetter === 'T' ? 2 * cy - prevQuadCPY : cy
				const ex = abs ? args[0] : cx + args[0],
					ey = abs ? args[1] : cy + args[1]
				const chord = d2(cx, cy, ex, ey)
				markFrom(chord > 0 ? ((2 / 3) * d2(reflX, reflY, cx, cy)) / chord : 0)
				result.push({
					p: toWorld(ex, ey),
					round: 'to' as const,
					tangent: chord > 0 ? ((2 / 3) * d2(reflX, reflY, ex, ey)) / chord : 0
				})
				prevQuadCPX = reflX
				prevQuadCPY = reflY
				cx = ex
				cy = ey
				break
			}
			case 'A': {
				const ex = abs ? args[5] : cx + args[5],
					ey = abs ? args[6] : cy + args[6]
				const t = arcTangentRatio(
					cx,
					cy,
					args[0],
					args[1],
					args[2],
					args[3] !== 0,
					args[4] !== 0,
					ex,
					ey
				)
				markFrom(t)
				result.push({ p: toWorld(ex, ey), round: 'to' as const, tangent: t })
				cx = ex
				cy = ey
				break
			}
		}

		if (letter !== 'C' && letter !== 'S') {
			prevCubicCPX = cx
			prevCubicCPY = cy
		}
		if (letter !== 'Q' && letter !== 'T') {
			prevQuadCPX = cx
			prevQuadCPY = cy
		}
		prevLetter = letter
	}

	if (result.length > 0) segments.push(result)
	return segments
}

/**
 * Convert an SVG path `d` string to rail points (XZ plane: svgX→x, svgY→z).
 * One point per SVG command endpoint.
 * Curve commands: previous point → `round:'from'`, endpoint → `round:'to'`.
 * Tangents derived from SVG control point distances: `|handle| / chord`.
 */
export function svgRail(d: string, opts: SvgRailOpts = {}): (Vec3 | RailPointFull)[] {
	const segments = parseSvgPathSegments(d, opts)
	if (segments.length === 0) return []
	// Flatten all segments into one array (original behaviour for single-M paths)
	const flat: (Vec3 | RailPointFull)[] = []
	for (const seg of segments) flat.push(...seg)
	return flat
}

// ── SVG Multi-Path Rail ──────────────────────────────────────

type SubPathInfo = {
	points: (Vec3 | RailPointFull)[]
	startPt: Vec3
	endPt: Vec3
	startKey: string
	endKey: string
}

type Conn = { idx: number; end: 'start' | 'end' }

function getVec3(node: Vec3 | RailPointFull): Vec3 {
	return Array.isArray(node) ? (node as Vec3) : (node as RailPointFull).p
}

function roundKey(p: Vec3, tol = 0.1): string {
	const inv = 1 / tol
	return `${Math.round(p[0] * inv) / inv},${Math.round(p[1] * inv) / inv},${Math.round(p[2] * inv) / inv}`
}

function reverseRounding(r: 'to' | 'from' | 'both'): 'to' | 'from' | 'both' {
	if (r === 'to') return 'from'
	if (r === 'from') return 'to'
	return 'both'
}

function reversePoints(points: (Vec3 | RailPointFull)[]): (Vec3 | RailPointFull)[] {
	// eslint-disable-next-line unicorn/no-array-reverse
	return [...points].reverse().map((p) => {
		if (Array.isArray(p)) return p
		const full = p as RailPointFull
		if (!full.round) return full
		return { ...full, round: reverseRounding(full.round) }
	})
}

function walkPath(
	segIdx: number,
	forward: boolean,
	visited: Set<number>,
	adj: Map<string, Conn[]>,
	subPaths: SubPathInfo[],
	includeFirst: boolean
): RailNode[] {
	if (visited.has(segIdx)) return []
	visited.add(segIdx)

	const seg = subPaths[segIdx]
	const pts = forward ? seg.points : reversePoints(seg.points)
	const result: RailNode[] = pts.slice(includeFirst ? 0 : 1)

	const exitKey = forward ? seg.endKey : seg.startKey
	const others = (adj.get(exitKey) ?? []).filter((c) => !visited.has(c.idx))

	if (others.length === 0) return result

	if (others.length === 1) {
		const continuation = walkPath(
			others[0].idx,
			others[0].end === 'start',
			visited,
			adj,
			subPaths,
			false
		)
		return [...result, ...continuation]
	}

	// Split at exit point — pop the junction point and embed as split.p
	const lastPt = result.at(-1)!
	const splitPt = getVec3(lastPt as Vec3 | RailPointFull)
	const beforeSplit = result.slice(0, -1)

	const branches: RailDef[] = others.map((conn) =>
		walkPath(conn.idx, conn.end === 'start', visited, adj, subPaths, false)
	)

	return [...beforeSplit, { split: { p: splitPt, weights: others.map(() => 1), branches } }]
}

/**
 * Parse a multi-sub-path SVG `d` string into `RailNode[][]`.
 * Detects shared endpoints, joins connected segments, emits `RailSplit` at degree-3+ junctions.
 * Returns one `RailNode[]` per connected component.
 */
export function svgRailMulti(d: string, opts: SvgRailOpts = {}): RailNode[][] {
	const rawSegments = parseSvgPathSegments(d, opts)

	if (rawSegments.length <= 1) return [svgRail(d, opts)]

	// Default tolerance: 2 SVG units in world space (handles typical Inkscape path gaps)
	const tol = opts.tol ?? 2 / (opts.scale ?? 10)

	const subPaths: SubPathInfo[] = rawSegments
		.filter((pts) => pts.length > 0)
		.map((points) => {
			const startPt = getVec3(points[0] as Vec3 | RailPointFull)
			const endPt = getVec3(points.at(-1)! as Vec3 | RailPointFull)
			return {
				points,
				startPt,
				endPt,
				startKey: roundKey(startPt, tol),
				endKey: roundKey(endPt, tol)
			}
		})

	const adj = new Map<string, Conn[]>()
	for (const [i, { startKey, endKey }] of subPaths.entries()) {
		if (!adj.has(startKey)) adj.set(startKey, [])
		adj.get(startKey)!.push({ idx: i, end: 'start' })
		if (!adj.has(endKey)) adj.set(endKey, [])
		adj.get(endKey)!.push({ idx: i, end: 'end' })
	}

	const visited = new Set<number>()
	const rails: RailNode[][] = []

	// Collect degree-1 nodes (dead ends) — these are candidate roots
	const degree1: { key: string; conn: Conn }[] = []
	for (const [key, conns] of adj) {
		if (conns.length === 1) degree1.push({ key, conn: conns[0] })
	}

	// Pick root: degree-1 node adjacent to highest-degree junction (most "trunk-like")
	if (degree1.length > 0) {
		degree1.sort((a, b) => {
			const exitA =
				a.conn.end === 'start' ? subPaths[a.conn.idx].endKey : subPaths[a.conn.idx].startKey
			const exitB =
				b.conn.end === 'start' ? subPaths[b.conn.idx].endKey : subPaths[b.conn.idx].startKey
			const degA = (adj.get(exitA) ?? []).length
			const degB = (adj.get(exitB) ?? []).length
			return degB - degA // highest-degree neighbor first
		})
		// Start from best root first, then remaining degree-1 nodes
		for (const { conn } of degree1) {
			if (visited.has(conn.idx)) continue
			rails.push(walkPath(conn.idx, conn.end === 'start', visited, adj, subPaths, true))
		}
	}

	// Handle remaining unvisited (closed loops / isolated segments)
	for (let i = 0; i < subPaths.length; i++) {
		if (!visited.has(i)) {
			rails.push(walkPath(i, true, visited, adj, subPaths, true))
		}
	}

	return rails
}
