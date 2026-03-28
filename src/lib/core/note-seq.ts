import type { MidiTrackData } from '../../scenes/utils/midi-notes'

/**
 * Duration or offset value.
 * - `number` — milliseconds (authored sequences, backward compat)
 * - `string` — beat fraction `'N/D'` (e.g. `'1/4'` = 0.25 beats); BPM-independent
 */
export type BeatDuration = number | string

/**
 * Resolve a BeatDuration to milliseconds at the given BPM.
 * Numbers pass through unchanged (already ms).
 */
export function parseBeatDuration(val: BeatDuration, bpm: number): number {
	if (typeof val === 'number') return val
	const slash = val.indexOf('/')
	const beats =
		slash === -1 ? Number(val) : Number(val.slice(0, slash)) / Number(val.slice(slash + 1))
	return (beats / bpm) * 60_000
}

export type NoteSeqNote = {
	note: number | number[]
	velocity?: number
	duration?: BeatDuration
	/** Sub-grid timing offset (>= 0). */
	offset?: BeatDuration
}

export type NoteSeqEvent = {
	note?: number | number[]
	velocity?: number
	duration?: BeatDuration
	/** Sub-grid timing offset (>= 0). */
	offset?: BeatDuration
}

export type NoteSequence = {
	/** false = pause (advance cursor, skip trigger); NoteSeqEvent[] = multi-note at different offsets */
	notes: (NoteSeqEvent | false | NoteSeqEvent[])[]
	/** Default true; false = stop after last note */
	loop?: boolean
}

export type NoteSeqInstance = {
	seq: NoteSequence
	cursor: number
	triggerCount: number
}

export function createNoteSeqInstance(seq: NoteSequence): NoteSeqInstance {
	return { seq, cursor: 0, triggerCount: 0 }
}

/**
 * Advance cursor and return next event.
 * Returns null if non-looping sequence is exhausted.
 */
export function nextNoteEvent(inst: NoteSeqInstance): NoteSeqEvent | false | NoteSeqEvent[] | null {
	const { notes, loop = true } = inst.seq
	if (notes.length === 0) return null
	if (!loop && inst.cursor >= notes.length) return null
	const event = notes[inst.cursor % notes.length]
	inst.cursor++
	inst.triggerCount++
	return event
}

// ---------------------------------------------------------------------------
// MIDI data → NoteSequence builder helpers
// ---------------------------------------------------------------------------

function msToBeats(ms: number, bpm: number): number {
	return (ms / 1000 / 60) * bpm
}

/**
 * Floor to previous grid point so offset is always >= 0.
 * Guarantees: bucket <= pos, offsetBeats = pos - bucket >= 0.
 * Invariant: bucket + offsetBeats = pos (exact).
 */
function toBucket(pos: number, granularity: number): { bucket: number; offsetBeats: number } {
	const bucket = Math.floor(pos * granularity) / granularity
	return { bucket, offsetBeats: pos - bucket }
}

type NoteGroup = { notes: number[]; velocity: number; duration: number; offsetBeats: number }

/**
 * Build a NoteSequence from a MIDI track for the given beat position.
 *
 * Floor bucketing: instrument fires at `beatPosition`, notes play offset ms later (>= 0).
 * Cycle-sparse: `notes[c]` corresponds to loop cycle `c`. Empty cycles = `{ pause: true }`.
 *
 * Notes sharing the same bucket+cycle but at different sub-bucket offsets are stored in
 * `event.rest[]`, preserving their exact timing. Truly simultaneous notes become chords
 * (`note: number[]`). This ensures `bucket + offsetBeats = originalBeat` for every note
 * regardless of granularity — reconstruction is exact for any totalBeats/granularity combo.
 *
 * @param track
 * @param beatPosition
 * @param totalBeats
 * @param bpm
 * @param granularity subdivisions per beat (default 4 = 16th notes in 4/4)
 * @param loop
 */
export function getNthNote(
	track: MidiTrackData,
	beatPosition: number,
	totalBeats: number,
	bpm: number,
	granularity = 4,
	loop = true
): NoteSequence {
	const numCycles = Math.ceil(msToBeats(track.durationMs, bpm) / totalBeats)
	// per cycle: array of offset-groups (sorted by offsetBeats after collection)
	const byCycle = new Map<number, NoteGroup[]>()
	for (const n of track.notes) {
		const beat = msToBeats(n.time, bpm)
		const pos = beat % totalBeats
		const { bucket, offsetBeats } = toBucket(pos, granularity)
		if (bucket < totalBeats && Math.abs(bucket - beatPosition) < 1e-9) {
			const cycle = Math.floor(beat / totalBeats)
			const groups = byCycle.get(cycle) ?? []
			const same = groups.find((g) => Math.abs(g.offsetBeats - offsetBeats) < 1e-9)
			if (same) {
				same.notes.push(n.note)
			} else {
				groups.push({ notes: [n.note], velocity: n.velocity, duration: n.duration, offsetBeats })
			}
			byCycle.set(cycle, groups)
		}
	}
	const events: (NoteSeqEvent | false | NoteSeqEvent[])[] = []
	for (let c = 0; c < numCycles; c++) {
		const groups = byCycle.get(c)
		if (!groups || groups.length === 0) {
			events.push(false)
		} else {
			groups.sort((a, b) => a.offsetBeats - b.offsetBeats)
			const toNote = (g: NoteGroup): NoteSeqEvent => {
				const note = g.notes.length === 1 ? g.notes[0] : g.notes
				// Store as bare beat strings (no slash) — exact, BPM-independent.
				// parseBeatDuration interprets a slash-free string as a beat count.
				const offset: BeatDuration | undefined =
					g.offsetBeats > 0 ? String(g.offsetBeats) : undefined
				const durationBeats = msToBeats(g.duration, bpm)
				const duration: BeatDuration = durationBeats > 0 ? String(durationBeats) : g.duration
				return { note, velocity: g.velocity, duration, ...(offset != null && { offset }) }
			}
			if (groups.length === 1) {
				events.push(toNote(groups[0]))
			} else {
				events.push(groups.map(toNote))
			}
		}
	}
	return { notes: events, loop }
}

/**
 * Return sorted unique beat positions in [0, length) where notes occur.
 * Uses floor bucketing (same as getNthNote) so positions are consistent.
 * @param granularity subdivisions per beat (default 4 = 16th notes in 4/4)
 */
export function getBeatPattern(
	track: MidiTrackData,
	length: number,
	bpm: number,
	granularity = 4
): number[] {
	const positions: number[] = []
	for (const n of track.notes) {
		const beat = msToBeats(n.time, bpm)
		if (beat >= 0) {
			const { bucket } = toBucket(beat % length, granularity)
			if (bucket < length && !positions.includes(bucket)) {
				positions.push(bucket)
			}
		}
	}
	return positions.toSorted((a, b) => a - b)
}
