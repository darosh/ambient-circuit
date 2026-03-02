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
