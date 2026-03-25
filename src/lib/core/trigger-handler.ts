import { sendMidiNote, getMidiState } from '../midi/midi'
import { triggerChain, updateGlobalChord } from '../audio'
import type { BounceContext, GlobalBeatContext, TriggerContext } from './scene'
import { notes } from '../midi/notes'

const VELOCITY = 100
const DURATION = 200
const NOTE = notes.C4

function applyPitch(note: number | number[], pitch: number): number | number[] {
	if (Array.isArray(note)) return note.map((n) => n + pitch)
	return note + pitch
}

export function triggerHandler(ctx: TriggerContext) {
	// console.log('TRIGGER', ctx.railId, ctx.beat)

	// Signal visual feedback
	ctx.instrument.instrument.signal!.intensity = 1
	ctx.instrument.instrument.midiSignal!.intensity = 1
	ctx.marble.marble.signal.intensity = 1

	// Queue particle burst
	const m = ctx.marble.marble
	ctx.scene.particleBursts.push({
		x: m.position.x,
		y: m.position.y,
		z: m.position.z,
		tx: m.tangent.x,
		ty: m.tangent.y,
		tz: m.tangent.z,
		color: ctx.instrument.instrument.color ?? ctx.rail.railData.color ?? '#ffffff'
	})

	const midiState = getMidiState()

	// Execute instrument action if present
	if (ctx.instrument.instrument.actionHandler) {
		ctx.instrument.instrument.actionHandler(ctx)
	}

	const rawNote =
		ctx.marble.marble.runtime.note ??
		ctx.marble.marble.resolved.note ??
		ctx.instrument.instrument.note ??
		NOTE
	const pitch = ctx.scene.config.pitch ?? 0
	const note = applyPitch(rawNote, pitch)

	const velocity =
		ctx.marble.marble.runtime.velocity ??
		ctx.marble.marble.resolved.velocity ??
		ctx.instrument.instrument.velocity ??
		ctx.scene.config.velocity ??
		VELOCITY

	const duration =
		ctx.marble.marble.runtime.duration ??
		ctx.marble.marble.resolved.duration ??
		ctx.instrument.instrument.duration ??
		ctx.scene.config.duration ??
		DURATION

	if (midiState?.enabled) {
		const channel = ctx.instrument.instrument.channel ?? 1
		if (Array.isArray(note)) {
			for (const n of note) sendMidiNote(midiState, channel, n, velocity, duration)
		} else {
			sendMidiNote(midiState, channel, note, velocity, duration)
		}
	}

	// Audio trigger
	const chain = ctx.instrument.audio

	if (chain) {
		chain.audioSignal.intensity = 1
		chain.audioSignal.color =
			ctx.instrument.instrument.color ?? ctx.rail.railData.color ?? '#ffffff'
	}

	if (chain?.generator) {
		triggerChain(chain, note, velocity, duration)
		updateGlobalChord(ctx.scene, chain.output.context)
	}
}

export function bouncerHandler(ctx: BounceContext) {
	// Signal visual feedback on both marbles
	ctx.marble1.marble.signal.intensity = 1
	ctx.marble2.marble.signal.intensity = 1

	// Queue particle burst at collision midpoint
	const m1 = ctx.marble1.marble
	const m2 = ctx.marble2.marble
	const clr =
		m1.runtime.color ?? m1.resolved.color ?? m2.runtime.color ?? ctx.rail.railData.color ?? '#fff'
	ctx.scene.particleBursts.push({
		x: (m1.position.x + m2.position.x) / 2,
		y: (m1.position.y + m2.position.y) / 2,
		z: (m1.position.z + m2.position.z) / 2,
		tx: m1.tangent.x,
		ty: m1.tangent.y,
		tz: m1.tangent.z,
		color: clr
	})

	// Trigger marble1 audio chain
	const chain1 = ctx.marble1.audio

	if (chain1) {
		ctx.marble1.marble.midiSignal.intensity = 1
		chain1.audioSignal.intensity = 1
		chain1.audioSignal.color =
			ctx.marble1.marble.runtime.color ??
			ctx.marble1.marble.resolved.color ??
			ctx.rail.railData.color ??
			'#ffffff'
	}

	if (chain1?.generator) {
		const rawNote =
			ctx.marble1.marble.runtime.note ??
			ctx.marble1.marble.resolved.note ??
			ctx.marble2.marble.runtime.note ??
			ctx.marble2.marble.resolved.note ??
			NOTE
		const note = applyPitch(rawNote, ctx.scene.config.pitch ?? 0)

		const velocity =
			ctx.marble1.marble.runtime.velocity ??
			ctx.marble1.marble.resolved.velocity ??
			ctx.marble2.marble.runtime.velocity ??
			ctx.marble2.marble.resolved.velocity ??
			ctx.scene.config.velocity ??
			VELOCITY

		const duration =
			ctx.marble1.marble.runtime.duration ??
			ctx.marble1.marble.resolved.duration ??
			ctx.marble2.marble.runtime.duration ??
			ctx.marble2.marble.resolved.duration ??
			ctx.scene.config.duration ??
			DURATION

		// TODO: Marbles should send MIDI too
		triggerChain(chain1, note, velocity, duration)
		updateGlobalChord(ctx.scene, chain1.output.context)
	}

	// Trigger marble2 audio chain
	const chain2 = ctx.marble2.audio
	if (chain2) {
		ctx.marble2.marble.midiSignal.intensity = 1
		chain2.audioSignal.intensity = 1
		chain2.audioSignal.color =
			ctx.marble2.marble.runtime.color ??
			ctx.marble2.marble.resolved.color ??
			ctx.rail.railData.color ??
			'#ffffff'
	}

	if (chain2?.generator) {
		const rawNote =
			ctx.marble2.marble.runtime.note ??
			ctx.marble2.marble.resolved.note ??
			ctx.marble1.marble.runtime.note ??
			ctx.marble1.marble.resolved.note ??
			NOTE
		const note = applyPitch(rawNote, ctx.scene.config.pitch ?? 0)

		const velocity =
			ctx.marble2.marble.runtime.velocity ??
			ctx.marble2.marble.resolved.velocity ??
			ctx.marble1.marble.runtime.velocity ??
			ctx.marble1.marble.resolved.velocity ??
			ctx.scene.config.velocity ??
			VELOCITY

		const duration =
			ctx.marble2.marble.runtime.duration ??
			ctx.marble2.marble.resolved.duration ??
			ctx.marble1.marble.runtime.duration ??
			ctx.marble1.marble.resolved.duration ??
			ctx.scene.config.duration ??
			DURATION

		triggerChain(chain2, note, velocity, duration)
		updateGlobalChord(ctx.scene, chain2.output.context)
	}
}

export type BeatHandler = (
	this: { setTimeout: (th: TimerHandler, ms?: number) => void },
	ctx: GlobalBeatContext
) => void

export function globalHandlerFactory(onTick?: BeatHandler) {
	// Store timer IDs for cleanup
	const timers: number[] = []

	function globalBeatHandler(ctx: GlobalBeatContext) {
		// Log phase changes and ticks
		switch (ctx.phase) {
			case 'init': {
				// console.log('[GLOBAL] Init - beat:', ctx.beat.toFixed(3))

				break
			}
			case 'play': {
				// console.log('[GLOBAL] Play - beat:', ctx.beat.toFixed(3))

				break
			}
			case 'pause': {
				// console.log('[GLOBAL] Pause - beat:', ctx.beat.toFixed(3))

				break
			}
			case 'destroy': {
				// console.log(
				// 	'[GLOBAL] Destroy - beat:',
				// 	ctx.beat.toFixed(3),
				// 	'clearing',
				// 	timers.length,
				// 	'timers'
				// )
				// Cleanup any timers/intervals here
				for (const id of timers) clearTimeout(id)
				timers.length = 0

				break
			}
			case 'tick': {
				// Log every tick
				// console.log('[GLOBAL] beat:', ctx.beat.toFixed(3))

				if (onTick) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					onTick(ctx)
				}

				break
			}
			// No default
		}
	}

	globalBeatHandler.setTimeout = (th: TimerHandler, ms?: number) => {
		timers.push(setTimeout(th, ms))
	}

	onTick = onTick?.bind(globalBeatHandler)

	return globalBeatHandler
}
