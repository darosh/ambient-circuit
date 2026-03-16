import type { Vec3, RailPointFull, RailSplit, RailDef } from './rail'

type ExpandResult = Array<Vec3 | RailPointFull | RailSplit>

const DIR: Record<string, Vec3> = {
	r: [1, 0, 0],
	l: [-1, 0, 0],
	u: [0, 1, 0],
	d: [0, -1, 0],
	i: [0, 0, -1],
	o: [0, 0, 1]
}

const ROUND_CHARS = new Set(['t', 'f', 'b'])
const ROUND_MAP: Record<string, 'to' | 'from' | 'both'> = { t: 'to', f: 'from', b: 'both' }
const ROUND_MAP_REV: Record<string, string> = { to: 't', from: 'f', both: 'b' }

/** Tokenize a rail string respecting balanced parentheses. */
function tokenizeRailStr(str: string): string[] {
	const tokens: string[] = []
	let cur = ''
	let depth = 0
	for (const ch of str) {
		if (ch === '(' || ch === ')') {
			depth += ch === '(' ? 1 : -1
			cur += ch
		} else if (/\s/.test(ch) && depth === 0) {
			if (cur) tokens.push(cur)
			cur = ''
		} else {
			cur += ch
		}
	}
	if (cur) tokens.push(cur)
	return tokens
}

/** Split "branch1 | branch2 | ..." at top-level ' | ' (depth-0). */
function splitTopLevelBranches(str: string): string[] {
	const branches: string[] = []
	let cur = ''
	let depth = 0
	let i = 0
	while (i < str.length) {
		const ch = str[i]
		if (ch === '(') {
			depth++
			cur += ch
			i++
		} else if (ch === ')') {
			depth--
			cur += ch
			i++
		} else if (depth === 0 && str.startsWith(' | ', i)) {
			branches.push(cur.trim())
			cur = ''
			i += 3
		} else {
			cur += ch
			i++
		}
	}
	branches.push(cur.trim())
	return branches
}

/** Parse direction-only prefix (no round/tangent) into a delta Vec3. Updates pos in-place. */
function parseDirDelta(dirPart: string, pos: [number, number, number]): void {
	const delta: [number, number, number] = [0, 0, 0]
	let i = 0
	while (i < dirPart.length) {
		const ch = dirPart[i]
		if (DIR[ch]) {
			const numMatch = dirPart.slice(i + 1).match(/^(-?(?:\d+(?:\.\d+)?|\.\d+))/)
			if (numMatch) {
				const n = Number.parseFloat(numMatch[0])
				const d = DIR[ch]
				delta[0] += d[0] * n
				delta[1] += d[1] * n
				delta[2] += d[2] * n
				i += 1 + numMatch[0].length
			} else {
				const d = DIR[ch]
				delta[0] += d[0]
				delta[1] += d[1]
				delta[2] += d[2]
				i++
			}
		} else {
			i++
		}
	}
	const r6 = (n: number) => Math.round(n * 1e6) / 1e6
	pos[0] = r6(pos[0] + delta[0])
	pos[1] = r6(pos[1] + delta[1])
	pos[2] = r6(pos[2] + delta[2])
}

export function expandPathString(str: string, startPos: Vec3 = [0, 0, 0]): ExpandResult {
	const result: ExpandResult = []
	const pos: [number, number, number] = [startPos[0], startPos[1], startPos[2]]

	for (const token of tokenizeRailStr(str)) {
		if (!token) continue

		// SPLIT token: optional_dir [weights](branches)
		const splitMatch = token.match(/^(.*?)\[([^\]]+)\]\((.+)\)$/)
		if (splitMatch) {
			const [, dirPart, weightsStr, branchesStr] = splitMatch
			if (dirPart) parseDirDelta(dirPart, pos)
			const weights = weightsStr.split(',').map(Number)
			const branchStrs = splitTopLevelBranches(branchesStr)
			const branches: RailDef[] = branchStrs.map((b) => expandPathString(b, [...pos] as Vec3))
			result.push({ split: { p: [...pos] as Vec3, weights, branches } })
			continue
		}

		// Standalone number (with optional 'c' suffix) = beat for previous point
		const beatMatch = token.match(/^(-?(?:\d+(?:\.\d+)?|\.\d+))(c?)$/)
		if (beatMatch) {
			if (result.length > 0) {
				const beat = Number.parseFloat(beatMatch[1])
				const curveMode = beatMatch[2] === 'c'
				const last = result.at(-1)
				if (last && !Array.isArray(last) && 'split' in last) {
					// skip beat assignment on split nodes
				} else if (Array.isArray(last)) {
					result[result.length - 1] = {
						p: last as Vec3,
						beat,
						...(curveMode ? { mode: 'curve' as const } : {})
					}
				} else {
					;(last as RailPointFull).beat = beat
					if (curveMode) (last as RailPointFull).mode = 'curve'
				}
			}
			continue
		}

		// Check for rounding+tangent suffix: e.g. "rub1", "l3u2b0.5", "lb.4"
		const roundTangentMatch = token.match(/^(.+)([tfb])(-?(?:\d+(?:\.\d+)?|\.\d+))$/i)
		// Check for just rounding suffix: e.g. "rub", "l3u2b"
		const roundMatch = roundTangentMatch ? null : token.match(/^(.+)([tfb])$/i)

		const dirPart = roundTangentMatch ? roundTangentMatch[1] : roundMatch ? roundMatch[1] : token
		const roundCh = roundTangentMatch ? roundTangentMatch[2] : roundMatch ? roundMatch[2] : null
		const tangent = roundTangentMatch ? Number.parseFloat(roundTangentMatch[3]) : undefined

		// Parse direction part to accumulate movements
		const delta: [number, number, number] = [0, 0, 0]
		let i = 0
		while (i < dirPart.length) {
			const ch = dirPart[i]
			if (DIR[ch]) {
				// Check if followed by a number
				const numMatch = dirPart.slice(i + 1).match(/^(-?(?:\d+(?:\.\d+)?|\.\d+))/)
				if (numMatch) {
					const n = Number.parseFloat(numMatch[0])
					const d = DIR[ch]
					delta[0] += d[0] * n
					delta[1] += d[1] * n
					delta[2] += d[2] * n
					i += 1 + numMatch[0].length
				} else {
					const d = DIR[ch]
					delta[0] += d[0]
					delta[1] += d[1]
					delta[2] += d[2]
					i++
				}
			} else {
				i++
			}
		}

		const r6 = (n: number) => Math.round(n * 1e6) / 1e6
		pos[0] = r6(pos[0] + delta[0])
		pos[1] = r6(pos[1] + delta[1])
		pos[2] = r6(pos[2] + delta[2])

		if (roundCh && ROUND_CHARS.has(roundCh)) {
			const round = ROUND_MAP[roundCh]
			if (tangent === undefined) {
				result.push({ p: [pos[0], pos[1], pos[2]] as Vec3, round })
			} else {
				result.push({ p: [pos[0], pos[1], pos[2]] as Vec3, round, tangent })
			}
		} else {
			result.push([pos[0], pos[1], pos[2]] as Vec3)
		}
	}

	return result
}

const fmtNum = (n: number) =>
	n
		.toFixed(2)
		.replace('.00', '')
		.replace(/^0./, '.')
		.replace(/(\.\d)0$/, '$1')

function encodeDelta(dx: number, dy: number, dz: number): string {
	let s = ''
	if (dx !== 0) {
		const mag = Math.abs(dx)
		s += (dx > 0 ? 'r' : 'l') + (mag === 1 ? '' : fmtNum(mag))
	}
	if (dy !== 0) {
		const mag = Math.abs(dy)
		s += (dy > 0 ? 'u' : 'd') + (mag === 1 ? '' : fmtNum(mag))
	}
	if (dz !== 0) {
		const mag = Math.abs(dz)
		s += (dz < 0 ? 'i' : 'o') + (mag === 1 ? '' : fmtNum(mag))
	}
	return s
}

export function railToString(
	points: Array<Vec3 | RailPointFull | RailSplit>,
	startPos: Vec3 = [0, 0, 0]
): string {
	const tokens: string[] = []
	const pos: [number, number, number] = [startPos[0], startPos[1], startPos[2]]

	for (const point of points) {
		// RailSplit node
		if (!Array.isArray(point) && 'split' in (point as object)) {
			const s = (point as RailSplit).split
			const dx = s.p[0] - pos[0]
			const dy = s.p[1] - pos[1]
			const dz = s.p[2] - pos[2]
			pos[0] = s.p[0]
			pos[1] = s.p[1]
			pos[2] = s.p[2]
			const dirStr = encodeDelta(dx, dy, dz)
			const branchStrs = s.branches.map((b) =>
				railToString(b as Array<Vec3 | RailPointFull | RailSplit>, [...s.p] as Vec3)
			)
			tokens.push(`${dirStr}[${s.weights.join(',')}](${branchStrs.join(' | ')})`)
			continue
		}

		const p: Vec3 = Array.isArray(point) ? (point as Vec3) : (point as RailPointFull).p
		const dx = p[0] - pos[0]
		const dy = p[1] - pos[1]
		const dz = p[2] - pos[2]
		pos[0] = p[0]
		pos[1] = p[1]
		pos[2] = p[2]

		let dirStr = encodeDelta(dx, dy, dz)
		if (!dirStr) dirStr = 'r0'

		if (!Array.isArray(point)) {
			const full = point as RailPointFull
			if (full.round) {
				dirStr += ROUND_MAP_REV[full.round]
				if (full.tangent !== undefined) dirStr += fmtNum(full.tangent)
			}
		}

		tokens.push(dirStr)

		if (!Array.isArray(point)) {
			const full = point as RailPointFull
			if (full.beat !== undefined)
				tokens.push(fmtNum(full.beat) + (full.mode === 'curve' ? 'c' : ''))
		}
	}

	return tokens.join(' ')
}
