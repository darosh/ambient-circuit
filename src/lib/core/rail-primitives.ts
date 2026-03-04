import type { RailPointFull, Vec3 } from './rail'

type Pos = { x?: number; y?: number; z?: number }

function offset(p: Vec3, pos: Pos): Vec3 {
	return [p[0] + (pos.x ?? 0), p[1] + (pos.y ?? 0), p[2] + (pos.z ?? 0)]
}

// ── Circle ──────────────────────────────────────────────────

export type CircleOpts = {
	pos?: Pos
	radius?: number
	/** Points around the circle (min 3). Default: 4 */
	points?: number
}

export function circle(opts: CircleOpts = {}): (Vec3 | RailPointFull)[] {
	const { pos = {}, radius = 1, points = 4 } = opts
	const n = Math.max(3, points)
	return Array.from({ length: n + 1 }, (_, i) => {
		const t = ((i % n) / n) * 2 * Math.PI
		return {
			p: offset([Math.cos(t) * radius, 0, Math.sin(t) * radius], pos),
			round: 'both' as const
		}
	})
}

// ── Rounded Rectangle ───────────────────────────────────────

export type RoundedRectOpts = {
	pos?: Pos
	width?: number
	height?: number
	/** Corner radius (absolute). Default: 1. Clamped to half the shorter side. */
	cornerRadius?: number
}

export function roundedRect(opts: RoundedRectOpts = {}): (Vec3 | RailPointFull)[] {
	const { pos = {}, width = 3, height = 3, cornerRadius = 1 } = opts
	const hw = width / 2
	const hh = height / 2
	const cr = Math.min(cornerRadius, hw, hh)

	// Clockwise from after TL corner. Per corner: approach (from) → exit (plain).
	return [
		offset([-hw + cr, 0, -hh], pos), // TL exit (start)
		{ p: offset([hw - cr, 0, -hh], pos), round: 'from' }, // TR approach
		offset([hw, 0, -hh + cr], pos), // TR exit
		{ p: offset([hw, 0, hh - cr], pos), round: 'from' }, // BR approach
		offset([hw - cr, 0, hh], pos), // BR exit
		{ p: offset([-hw + cr, 0, hh], pos), round: 'from' }, // BL approach
		offset([-hw, 0, hh - cr], pos), // BL exit
		{ p: offset([-hw, 0, -hh + cr], pos), round: 'from' }, // TL approach
		offset([-hw + cr, 0, -hh], pos) // close
	]
}

// ── Coil ────────────────────────────────────────────────────

export type CoilOpts = {
	pos?: Pos
	radius?: number
	height?: number
	rounds?: number
	/** Points per revolution. Default: 4 */
	density?: number
	/** Straight lead-in/out length. Default: 1 */
	lead?: number
}

export function coil(opts: CoilOpts = {}): (Vec3 | RailPointFull)[] {
	const { pos = {}, radius = 1, height = 1, rounds = 2, density = 4, lead = 1 } = opts
	const len = rounds * density + 1
	const coilPoints: RailPointFull[] = Array.from({ length: len }, (_, i) => {
		const t = (i / density) * 2 * Math.PI
		const y = (i / (len - 1)) * height
		return {
			p: offset([Math.cos(t) * radius, y, Math.sin(t) * radius], pos),
			round: i === 0 ? ('from' as const) : i === len - 1 ? ('to' as const) : ('both' as const)
		}
	})

	// lead-in: straight segment entering the coil
	const first = coilPoints[0].p
	const leadIn: Vec3 = [first[0], first[1], first[2] - lead]
	// lead-out: straight segment exiting the coil
	const last = coilPoints[len - 1].p
	const leadOut: Vec3 = [last[0], last[1], last[2] + lead]

	return [leadIn, ...coilPoints, leadOut]
}

// ── Spiral ──────────────────────────────────────────────────

export type SpiralOpts = {
	pos?: Pos
	height?: number
	rounds?: number
	/** Points per revolution. Default: 4 */
	density?: number
	/** Starting radius. Default: 0.5 */
	startRadius?: number
	/** Radius added per revolution. Default: 0.5 */
	radiusStep?: number
	/** Straight lead-in/out length. Default: 1 */
	lead?: number
	trail?: number
	tangent?: number
	first?: number
	last?: number | true
}

export function spiral(opts: SpiralOpts = {}): (Vec3 | RailPointFull)[] {
	const {
		pos = {},
		height = 1,
		rounds = 2,
		density = 4,
		startRadius = 0.5,
		radiusStep = 0.5,
		lead = 1,
		trail = 1,
		tangent,
		first: firstBeat,
		last: lastBeat
	} = opts
	const len = rounds * density + 1
	const spiralPoints: RailPointFull[] = Array.from({ length: len }, (_, i) => {
		const t = (i / density) * 2 * Math.PI
		const r = startRadius + Math.ceil((1 + i) / density) * radiusStep
		const y = (i / (len - 1)) * height
		return {
			p: offset([Math.cos(t) * r, y, Math.sin(t) * r], pos),
			round: i === 0 ? ('from' as const) : i === len - 1 ? ('to' as const) : ('both' as const),
			tangent
		}
	})

	const first = spiralPoints[0].p
	const result: (RailPointFull | Vec3)[] = []

	if (lead) {
		const leadIn: Vec3 = [first[0], first[1], first[2] - lead]

		result.push(leadIn)
	}

	result.push(...spiralPoints)

	if (trail) {
		const last = spiralPoints[len - 1].p
		const leadOut: Vec3 = [last[0], last[1], last[2] + lead]
		result.push(leadOut)
	}

	if (firstBeat !== undefined) {
		const node = result[0]

		result[0] = {
			p: lead ? <Vec3>node : (node as RailPointFull).p,
			round: lead ? undefined : (node as RailPointFull).round,
			tangent: lead ? undefined : (node as RailPointFull).tangent,
			beat: firstBeat
		}
	}

	if (lastBeat !== undefined) {
		const node = result.at(-1)

		result[result.length - 1] = {
			p: trail ? <Vec3>node : (node as RailPointFull).p,
			round: trail ? undefined : (node as RailPointFull).round,
			tangent: trail ? undefined : (node as RailPointFull).tangent,
			beat: lastBeat === true ? result.length - 1 : lastBeat
		}
	}

	return result
}

// ── SVG Rail ────────────────────────────────────────────────

export type SvgRailOpts = {
	pos?: Pos
	/** SVG units per world unit. Default: 10 */
	scale?: number
}

/**
 * Convert an SVG path `d` string to rail points (XZ plane: svgX→x, svgY→z).
 * One point per SVG command endpoint.
 * Curve commands: previous point → `round:'from'`, endpoint → `round:'to'`.
 * Tangents derived from SVG control point distances: `|handle| / chord`.
 */
export function svgRail(d: string, opts: SvgRailOpts = {}): (Vec3 | RailPointFull)[] {
	const { pos = { x: -5, y: 0, z: -5 }, scale = 10 } = opts

	function toWorld(x: number, y: number): Vec3 {
		return offset([x / scale, 0, y / scale], pos)
	}

	function d2(ax: number, ay: number, bx: number, by: number): number {
		return Math.hypot(ax - bx, ay - by)
	}

	// Retroactively mark last result point as the 'from' entry of a curve
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
				tangent: rf.tangent ?? tangent
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

	const result: (Vec3 | RailPointFull)[] = []
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
		if (/[A-Za-z]/.test(tokens[i])) curCmd = tokens[i++]

		const letter = curCmd.toUpperCase()
		const abs = curCmd === letter
		const n = argsN[letter] ?? 0
		const args: number[] = []
		for (let j = 0; j < n; j++) args.push(Number.parseFloat(tokens[i++]))

		switch (letter) {
			case 'M': {
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
				result.push(toWorld(startX, startY))
				cx = startX
				cy = startY
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
				const chord = d2(cx, cy, ex, ey)
				markFrom(chord > 0 ? d2(cp1x, cp1y, cx, cy) / chord : 0)
				result.push({
					p: toWorld(ex, ey),
					round: 'to' as const,
					tangent: chord > 0 ? d2(cp2x, cp2y, ex, ey) / chord : 0
				})
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
				const chord = d2(cx, cy, ex, ey)
				markFrom(chord > 0 ? d2(reflX, reflY, cx, cy) / chord : 0)
				result.push({
					p: toWorld(ex, ey),
					round: 'to' as const,
					tangent: chord > 0 ? d2(cp2x, cp2y, ex, ey) / chord : 0
				})
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
				markFrom(0.5)
				result.push({ p: toWorld(ex, ey), round: 'to' as const, tangent: 0.5 })
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

	return result
}
