import { get } from '@tonaljs/scale'
import { get as getNote } from '@tonaljs/note'

/** dir: 1=up (nearest scale note >=), -1=down (<=), 0=nearest */
export function quantizeFactory<T extends number | number[]>(
	scale: string,
	dir = 0
): (note: T) => T {
	const info = get(scale)
	if (info.empty) throw new Error(`Unknown scale: ${scale}`)

	// build sorted pitch class set (0–11)
	const chromas = info.notes.map((n) => getNote(n).chroma as number).toSorted((a, b) => a - b)

	function quantizeNote(midi: number): number {
		const pc = ((midi % 12) + 12) % 12
		if (chromas.includes(pc)) return midi

		if (dir === 1) {
			// nearest up
			for (const c of chromas) if (c > pc) return midi + (c - pc)
			// wrap: lowest chroma in next octave
			return midi + (12 - pc + chromas[0])
		} else if (dir === -1) {
			// nearest down
			for (let i = chromas.length - 1; i >= 0; i--) {
				if (chromas[i] < pc) return midi - (pc - chromas[i])
			}
			// wrap: highest chroma in prev octave
			return midi - (pc + (12 - chromas.at(-1)!))
		} else {
			// nearest (tie-break: up)
			let bestUp = Infinity,
				bestDown = Infinity
			for (const c of chromas)
				if (c > pc) {
					bestUp = c - pc
					break
				}
			for (let i = chromas.length - 1; i >= 0; i--)
				if (chromas[i] < pc) {
					bestDown = pc - chromas[i]
					break
				}
			if (bestUp === Infinity) bestUp = 12 - pc + chromas[0]
			if (bestDown === Infinity) bestDown = pc + (12 - chromas.at(-1)!)
			return bestUp <= bestDown ? midi + bestUp : midi - bestDown
		}
	}

	return (note: T): T => {
		if (Array.isArray(note)) return note.map(quantizeNote) as T
		return quantizeNote(note as number) as T
	}
}
