import { Sampler, ToneBufferSource, Frequency } from 'tone'
import type { Unit, SamplerOptions, ToneAudioBuffer } from 'tone'

export interface SampleLoopInfo {
	loopStartSample: number
	loopEndSample: number
	sampleRate: number
}

interface LoopingOptions {
	loop?: boolean
	loopStart?: number // seconds in source buffer
	loopEnd?: number // seconds in source buffer
	/** Per-note loop overrides keyed by note name */
	noteLoops?: Map<string, { loopStart: number; loopEnd: number }>
}

export class LoopingSampler extends Sampler {
	private _loopingOptions: LoopingOptions = {}

	constructor(options: SamplerOptions & LoopingOptions) {
		super(options)
		this._loopingOptions = {
			loop: options.loop ?? false,
			loopStart: options.loopStart,
			loopEnd: options.loopEnd,
			noteLoops: options.noteLoops
		}
	}

	/**
	 * Polyphonic triggerAttackRelease: creates a fully independent ToneBufferSource
	 * per voice, bypassing Sampler._activeSources entirely. This avoids the two
	 * problems in stock Tone.js Sampler:
	 *   1. triggerRelease stops ALL voices for a note (monophonic release)
	 *   2. start(time, 0, buffer.duration/playbackRate) schedules an internal stop
	 *      that fires before any loop can begin
	 * Loop is applied at construction time so ToneBufferSource.start() handles it
	 * natively (no cancelStop() needed).
	 */
	triggerAttackRelease(
		notes: Unit.Frequency | Unit.Frequency[],
		duration: Unit.Time | Unit.Time[],
		time?: Unit.Time,
		velocity: number = 1
	): this {
		if (!this._loopingOptions.loop) {
			return super.triggerAttackRelease(notes, duration, time, velocity)
		}

		const computedTime = this.toSeconds(time)
		const noteArray: Unit.Frequency[] = Array.isArray(notes) ? notes : [notes]
		const durArray: Unit.Time[] = Array.isArray(duration)
			? duration
			: noteArray.map(() => duration as Unit.Time)

		const sampler = this as LoopingSampler

		for (const [i, note] of noteArray.entries()) {
			const durSec = this.toSeconds(durArray[i])

			const midiFloat = Frequency(note).toMidi()
			const midi = Math.round(midiFloat)
			const remainder = midiFloat - midi

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			const difference: number = sampler._findClosest(midi)
			const closestNote: number = midi - difference
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			const buffer: ToneAudioBuffer = sampler._buffers.get(closestNote)
			if (!buffer) continue

			// 2^(semitones/12) — same formula as intervalToFrequencyRatio
			const playbackRate = Math.pow(2, (difference + remainder) / 12)

			// Per-note loop override (keyed by note string)
			const noteLoop = this._loopingOptions.noteLoops?.get(String(note))
			const ls = noteLoop?.loopStart ?? this._loopingOptions.loopStart ?? 0
			const le = noteLoop?.loopEnd ?? this._loopingOptions.loopEnd ?? buffer.duration

			// Create an independent voice — loop applied at construction so
			// ToneBufferSource.start() correctly enters loop mode from the first cycle
			const source = new ToneBufferSource({
				url: buffer,
				// url: buffer.slice(0),
				context: this.context,
				curve: this.curve,
				fadeIn: this.attack,
				fadeOut: this.release,
				playbackRate,
				loop: true,
				loopStart: ls,
				loopEnd: le
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any).connect(this.output)

			// start with no duration arg → no internal stop scheduled
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			;(source as any).start(computedTime, 0)
			source.stop(computedTime + durSec)
		}

		return this
	}

	// triggerAttack/triggerRelease pass through to super for non-loop mode
	// (used by external code that manages attack/release separately)

	setLooping(options: Partial<LoopingOptions>): void {
		this._loopingOptions = { ...this._loopingOptions, ...options }
	}
}
