import { describe, it, expect } from 'vitest'
import { computeChordInfo } from '../src/lib/audio/engine'

const future = 9999
const now = 0

function notes(midis: number[]) {
	return midis.map(midi => ({ midi, end: future }))
}

describe('chord detection', () => {
	it('chord 1: [46,34,63,53] detects Bb chord', () => {
		const ci = computeChordInfo(notes([46, 34, 63, 53]), now)
		expect(ci.chord).not.toBe('')
		expect(ci.chord).not.toBe('B2')
	})

	it('chord 2: [46,34,63,53] same as chord 1', () => {
		const ci = computeChordInfo(notes([46, 34, 63, 53]), now)
		expect(ci.chord).not.toBe('')
	})

	it('chord 3: [47,35,65,54] falls back to sorted pcs cluster', () => {
		// B(11), B(11), F(5), F#(6) → {B, F, F#} — no known chord, fallback to "F–F#–B"
		const ci = computeChordInfo(notes([47, 35, 65, 54]), now)
		expect(ci.chord).not.toBe('B2')
		expect(ci.chord).not.toBe('')
		expect(ci.chord).toBe('B-F#-F')
	})

	it('pcs for chord 3 has 3 unique pitch classes', () => {
		// B(11), B(11), F(5), F#(6) → {B, F, F#}
		const ci = computeChordInfo(notes([47, 35, 65, 54]), now)
		expect(ci.notes).toEqual([47, 35, 65, 54])
		expect(ci.chord.length).toBeGreaterThan(2)
	})
})
