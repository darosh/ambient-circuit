import { describe, it, expect } from 'vitest'
import { getBeatPattern, getNthNote } from '../src/lib/core/note-seq'
import { MIDI } from '../src/scenes/utils/midi-notes'

const midiBpm = MIDI['bumblebee-1'].bpm
const totalBeats = 16
const granularity = 8 // 16th notes
const track = MIDI['bumblebee-1'].tracks[0]

function msToBeats(ms: number, bpm: number) {
	return (ms / 1000 / 60) * bpm
}

describe('getBeatPattern', () => {
	it('all positions in [0, totalBeats)', () => {
		const positions = getBeatPattern(track, totalBeats, midiBpm, granularity)
		for (const p of positions) {
			expect(p).toBeGreaterThanOrEqual(0)
			expect(p).toBeLessThan(totalBeats)
		}
	})

	it('positions are multiples of 1/granularity', () => {
		const positions = getBeatPattern(track, totalBeats, midiBpm, granularity)
		for (const p of positions) {
			expect(Math.abs(p - Math.round(p * granularity) / granularity)).toBeLessThan(1e-9)
		}
	})

	it('no duplicates', () => {
		const positions = getBeatPattern(track, totalBeats, midiBpm, granularity)
		expect(new Set(positions).size).toBe(positions.length)
	})

	it('bumblebee positions are on the 1/granularity grid', () => {
		const positions = getBeatPattern(track, totalBeats, midiBpm, granularity)
		// floor bucketing: ~64 unique slots initially, but over 20 cycles of the full track,
		// BPM drift shifts notes into all 128 possible 1/8-beat positions (16 beats * 8 gran)
		expect(positions.length).toBeGreaterThanOrEqual(60)
		expect(positions.length).toBeLessThanOrEqual(128)
		// all positions are exact multiples of 1/granularity (floor ensures this)
		for (const p of positions) {
			expect(Math.abs(p - Math.floor(p * granularity) / granularity)).toBeLessThan(1e-9)
		}
	})
})

describe('getNthNote — no overlap', () => {
	it('first-cycle notes across all positions equals first-cycle note count', () => {
		// getNthNote collects ALL cycles; to test no-overlap we count only first-cycle notes
		// by direct bucketing — each note should fall in exactly one position's bucket
		const positions = getBeatPattern(track, totalBeats, midiBpm, granularity)
		const posSet = new Set(positions.map((p) => Math.floor(p * granularity)))

		let covered = 0
		for (const n of track.notes) {
			const beat = msToBeats(n.time, midiBpm)
			if (beat >= totalBeats) break // notes are ordered by time
			const bucket = Math.floor((beat % totalBeats) * granularity)
			if (posSet.has(bucket)) covered++
		}
		// count only notes whose floor-bucket is valid (< totalBeats after floor)
		const firstCycleCount = track.notes.filter((n) => {
			const beat = msToBeats(n.time, midiBpm)
			if (beat >= totalBeats) return false
			const bucket = Math.floor(beat * granularity) / granularity
			return bucket < totalBeats
		}).length
		// every first-cycle note with a valid bucket should map to exactly one position
		expect(covered).toBe(firstCycleCount)
	})

	it('each position gets at least one note', () => {
		const positions = getBeatPattern(track, totalBeats, midiBpm, granularity)
		for (const pos of positions) {
			const seq = getNthNote(track, pos, totalBeats, midiBpm, granularity)
			expect(seq.notes.length, `beat ${pos}`).toBeGreaterThan(0)
		}
	})
})

describe('scene-bumblebee reconstruction', () => {
	it('first note of each instrument matches expected MIDI note at that beat', () => {
		const positions = getBeatPattern(track, totalBeats, midiBpm, granularity)

		for (const beat of positions) {
			const seq = getNthNote(track, beat, totalBeats, midiBpm, granularity)
			// first non-pause event (cycle 0 may be a rest if note only appears in later cycles)
			const firstNote = seq.notes.find((e) => e !== false)
			expect(firstNote, `no non-pause note at beat ${beat}`).toBeDefined()

			// Find earliest MIDI note at this bucket across all cycles (same floor bucketing)
			const expected = track.notes.find((n) => {
				const pos = msToBeats(n.time, midiBpm) % totalBeats
				const bucket = Math.floor(pos * granularity) / granularity
				return Math.abs(bucket - beat) < 1e-9
			})
			expect(expected, `no MIDI note for bucket ${beat}`).toBeDefined()
			// firstNote may be an array event (multi-offset) or single event; note may be a chord
			const firstEvent = Array.isArray(firstNote) ? firstNote[0] : firstNote!
			const noteArr = Array.isArray(firstEvent.note) ? firstEvent.note : [firstEvent.note]
			expect(noteArr).toContain(expected!.note)
		}
	})

	it('sequences cycle through all occurrences in the full track', () => {
		const pos = 0 // beat 0 instrument
		const seq = getNthNote(track, pos, totalBeats, midiBpm, granularity)
		// Full track ~209 beats at 172bpm → ~13 cycles of 16 beats
		// Some cycles may have simultaneous notes (chords) at the same bucket
		expect(seq.notes.length).toBeGreaterThan(10)
		expect(seq.notes.length).toBeLessThan(40)
	})
})
