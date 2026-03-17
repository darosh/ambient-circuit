import { Sampler, ToneBufferSource, Frequency, now } from 'tone'
import type { Unit, SamplerOptions, ToneAudioBuffer } from 'tone'

export interface SampleLoopInfo {
	loopStartSample: number
	loopEndSample: number
	sampleRate: number
}

interface CrossfadeLoopOptions {
	loop?: boolean
	loopStart?: number // seconds
	loopEnd?: number // seconds
	crossfade?: number // 0–1 (portion of loop length), default 0.18–0.25
	/** Per-note overrides */
	noteLoops?: Map<string, { loopStart: number; loopEnd: number; crossfade?: number }>
}

// Cache baked loop buffers: native AudioBuffer → param string → baked result
const bakedCache = new WeakMap<AudioBuffer, Map<string, BakedLoop>>()

interface BakedLoop {
	buffer: AudioBuffer
	/** loopStart in the baked buffer (seconds) — skip intro on native loop wrap */
	loopStart: number
	/** loopEnd in the baked buffer (seconds) */
	loopEnd: number
}

/**
 * Pre-bake a seamless crossfade loop buffer.
 *
 * Layout (L = loopSamples, C = crossSamples):
 *   [0 .. C-1]     intro (unblended) — played only on first pass
 *   [C .. L-C-1]   clean body
 *   [L-C .. L-1]   crossfade tail: loop-end fades out, loop-start fades in
 *
 * loopStart = C/sr  →  on native loop wrap, jumps to start of clean body (skips intro)
 * loopEnd   = L/sr
 *
 * At every wrap: baked[L-1] ≈ src[loopStart+C-1] → baked[C] = src[loopStart+C]
 * Adjacent samples → click-free at any loop rate.
 */
function bakeCrossfadeLoop(
	src: AudioBuffer,
	loopStartSample: number,
	loopEndSample: number,
	crossSamples: number,
	ctx: AudioContext
): BakedLoop {
	const L = loopEndSample - loopStartSample
	const C = Math.min(crossSamples, Math.floor(L / 2) - 1) // guard against C >= L/2
	const ch = src.numberOfChannels
	const baked = ctx.createBuffer(ch, L, src.sampleRate)

	for (let c = 0; c < ch; c++) {
		const s = src.getChannelData(c)
		const dst = baked.getChannelData(c)

		// Intro + clean body: copy loop region verbatim
		for (let i = 0; i < L - C; i++) {
			dst[i] = s[loopStartSample + i]
		}

		// Crossfade tail [L-C .. L-1]: blend loop-end fading out with loop-start fading in
		// At i=C-1 (last sample): fully at src[loopStart + C - 1]
		// After wrap to baked[C]: src[loopStart + C] → adjacent sample → seamless
		for (let i = 0; i < C; i++) {
			const t = i / C // 0 → 1
			dst[L - C + i] = s[loopEndSample - C + i] * (1 - t) + s[loopStartSample + i] * t
		}
	}

	const sr = src.sampleRate
	return { buffer: baked, loopStart: C / sr, loopEnd: L / sr }
}

function getOrBakeCrossfadeLoop(
	toneBuffer: ToneAudioBuffer,
	loopStartSample: number,
	loopEndSample: number,
	crossSamples: number,
	ctx: AudioContext
): BakedLoop {
	const src = toneBuffer.get()!
	const key = `${loopStartSample}_${loopEndSample}_${crossSamples}`
	let inner = bakedCache.get(src)
	if (!inner) {
		inner = new Map()
		bakedCache.set(src, inner)
	}
	let baked = inner.get(key)
	if (!baked) {
		baked = bakeCrossfadeLoop(src, loopStartSample, loopEndSample, crossSamples, ctx)
		inner.set(key, baked)
	}
	return baked
}

export class CrossfadeLoopingSampler extends Sampler {
	private crossfadeOptions: CrossfadeLoopOptions = {
		loop: false,
		crossfade: 0.2
	}

	constructor(options: SamplerOptions & CrossfadeLoopOptions) {
		super(options)

		this.crossfadeOptions = {
			loop: options.loop ?? false,
			loopStart: options.loopStart,
			loopEnd: options.loopEnd,
			crossfade: options.crossfade ?? 0.2,
			noteLoops: options.noteLoops
		}
	}

	triggerAttackRelease(
		notes: Unit.Frequency | Unit.Frequency[],
		duration: Unit.Time | Unit.Time[],
		time?: Unit.Time,
		velocity: number = 1
	): this {
		this.curve = 'linear'
		const nowSec = now()
		const startTime = time === undefined ? nowSec : this.toSeconds(time)

		if (!this.crossfadeOptions.loop) {
			return super.triggerAttackRelease(notes, duration, time, velocity)
		}

		const noteArray = Array.isArray(notes) ? notes : [notes]
		const durArray = Array.isArray(duration) ? duration : noteArray.map(() => duration)

		for (const [i, note] of noteArray.entries()) {
			const durSec = this.toSeconds(durArray[i])

			// ─── Find buffer & playback rate ────────────────────────────────────────
			const midiFloat = Frequency(note).toMidi()
			if (!Number.isFinite(midiFloat)) {
				console.warn('Infinite MIDI')
				continue
			}
			const midi = Math.round(midiFloat)
			const remainder = midiFloat - midi

			// @ts-expect-error internal method
			const difference: number = this._findClosest(midi)
			const closestNote = midi - difference
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			const buffer: ToneAudioBuffer = this._buffers.get(closestNote)
			if (!buffer || !buffer.loaded) continue

			const playbackRate = Math.pow(2, (difference + remainder) / 12)

			// ─── Per-note loop & crossfade settings ─────────────────────────────────
			const noteKey = String(note)
			const noteLoop = this.crossfadeOptions.noteLoops?.get(noteKey)

			const loopStart = noteLoop?.loopStart ?? this.crossfadeOptions.loopStart ?? 0
			const loopEnd = noteLoop?.loopEnd ?? this.crossfadeOptions.loopEnd ?? buffer.duration
			const crossPortion = noteLoop?.crossfade ?? this.crossfadeOptions.crossfade ?? 0.2

			const loopLength = loopEnd - loopStart
			const crossDuration = loopLength * crossPortion // buffer seconds
			const crossStartOffset = loopEnd - crossDuration // buffer pos where fade-out begins

			// ─── Bake seamless loop buffer ───────────────────────────────────────────
			// Pre-blend the loop tail into its head so native Web Audio looping never clicks.
			const rawCtx = this.context.rawContext as AudioContext
			const sr = rawCtx.sampleRate
			const loopStartSample = Math.round(loopStart * sr)
			const loopEndSample = Math.round(loopEnd * sr)
			const crossSamples = Math.round(crossDuration * sr)
			const bakedLoop = getOrBakeCrossfadeLoop(
				buffer,
				loopStartSample,
				loopEndSample,
				crossSamples,
				rawCtx
			)

			// ─── Two sources ────────────────────────────────────────────────────────
			// A. Intro: plays from buffer start through loopEnd, then hands off to loop source
			const introSource = new ToneBufferSource({
				url: buffer,
				context: this.context,
				playbackRate,
				fadeOut: crossDuration / playbackRate,
				curve: this.curve
			}).connect(this.output)

			// B. Loop: plays baked buffer. loopStart=C/sr skips the intro region on each wrap,
			//    producing adjacent samples at every boundary → click-free at any loop rate.
			const loopSource = new ToneBufferSource({
				url: bakedLoop.buffer,
				context: this.context,
				playbackRate,
				loop: true,
				loopStart: bakedLoop.loopStart,
				loopEnd: bakedLoop.loopEnd,
				fadeIn: crossDuration / playbackRate,
				fadeOut: this.release,
				curve: this.curve
			}).connect(this.output)

			// ─── Scheduling ─────────────────────────────────────────────────────────
			// Intro plays from buffer start; stop at loopEnd (fadeOut fires crossDuration before)
			introSource.start(startTime, 0)
			const introStopTime = startTime + loopStart / playbackRate + crossDuration / playbackRate
			introSource.stop(introStopTime)

			// Loop source starts from baked[0] (intro region) when intro begins fading,
			// so they overlap for exactly crossDuration of audio time
			const loopSourceStart = startTime + crossStartOffset / playbackRate
			loopSource.start(loopSourceStart, 0)

			// Loop source stops at end of note (fadeOut: this.release fires before stopTime)
			const stopTime = startTime + durSec
			loopSource.stop(stopTime)

			// Cleanup — use setTimeout to avoid Tone transport init (Firefox AudioParam crash)
			const cleanupMs = (introStopTime + crossDuration / playbackRate + 0.02 - nowSec) * 1000
			setTimeout(
				() => {
					introSource.dispose()
				},
				Math.max(0, cleanupMs)
			)
		}

		return this
	}

	setCrossfade(options: Partial<CrossfadeLoopOptions>): this {
		this.crossfadeOptions = { ...this.crossfadeOptions, ...options }
		return this
	}
}
