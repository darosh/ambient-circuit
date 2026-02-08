import type { Vec3, RailPointFull } from './rail'

const DIR: Record<string, Vec3> = {
	r: [1, 0, 0],
	l: [-1, 0, 0],
	u: [0, 1, 0],
	d: [0, -1, 0],
	i: [0, 0, -1],
	o: [0, 0, 1],
}

const DIR_WORDS: Record<string, string> = {
	right: 'r',
	left: 'l',
	up: 'u',
	down: 'd',
	in: 'i',
	out: 'o',
	to: 't',
	from: 'f',
	both: 'b',
}

const ROUND_CHARS = new Set(['t', 'f', 'b'])
const ROUND_MAP: Record<string, 'to' | 'from' | 'both'> = { t: 'to', f: 'from', b: 'both' }

export function expandPathString(
	str: string,
	startPos: Vec3 = [0, 0, 0]
): Array<Vec3 | RailPointFull> {
	const result: Array<Vec3 | RailPointFull> = []
	const pos: [number, number, number] = [startPos[0], startPos[1], startPos[2]]

	const processChar = (ch: string) => {
		if (DIR[ch]) {
			const d = DIR[ch]
			pos[0] += d[0]
			pos[1] += d[1]
			pos[2] += d[2]
			result.push([pos[0], pos[1], pos[2]] as Vec3)
		} else if (ROUND_CHARS.has(ch)) {
			const round = ROUND_MAP[ch]
			if (result.length === 0) return
			const last = result[result.length - 1]
			if (Array.isArray(last)) {
				result[result.length - 1] = { p: last as Vec3, round }
			} else {
				;(last as RailPointFull).round = round
			}
		}
	}

	for (const token of str.trim().split(/\s+/)) {
		if (!token) continue
		// Check for "dir+number" shorthand, e.g. "l3" = move left 3 units, one point
		const numMatch = token.match(/^([a-z]+)(-?\d+(?:\.\d+)?)$/i)
		if (numMatch) {
			const chars = numMatch[1].toLowerCase()
			const n = parseFloat(numMatch[2])
			const mapped = DIR_WORDS[chars]
			const ch = mapped !== undefined ? mapped : chars.length === 1 ? chars : null
			if (ch && DIR[ch]) {
				const d = DIR[ch]
				pos[0] += d[0] * n
				pos[1] += d[1] * n
				pos[2] += d[2] * n
				result.push([pos[0], pos[1], pos[2]] as Vec3)
				continue
			}
		}
		const mapped = DIR_WORDS[token.toLowerCase()]
		if (mapped !== undefined) {
			processChar(mapped)
		} else {
			// Group consecutive same-direction chars: "lll" → one move of 3
			let i = 0
			while (i < token.length) {
				const ch = token[i]
				if (DIR[ch]) {
					let count = 1
					while (i + count < token.length && token[i + count] === ch) count++
					if (count > 1) {
						const d = DIR[ch]
						pos[0] += d[0] * count
						pos[1] += d[1] * count
						pos[2] += d[2] * count
						result.push([pos[0], pos[1], pos[2]] as Vec3)
					} else {
						processChar(ch)
					}
					i += count
				} else {
					processChar(ch)
					i++
				}
			}
		}
	}

	return result
}
