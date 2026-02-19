import { sendMidiNote, getMidiState } from './midi/midi'
import { triggerChain } from './audio/engine'
import type { BounceContext, GlobalBeatContext, TriggerContext } from './scene'

export function triggerHandler(ctx: TriggerContext) {
	// console.log('TRIGGER', ctx.railId, ctx.beat)

	// Signal visual feedback
	ctx.instrument.instrument.signal!.intensity = 1
	ctx.instrument.instrument.midiSignal!.intensity = 1
	ctx.marble.marble.signal.intensity = 1

	const midiState = getMidiState()

	// Execute instrument action if present
	if (ctx.instrument.instrument.actionHandler) {
		ctx.instrument.instrument.actionHandler(ctx)
	}

	if (midiState?.enabled) {
		const channel = ctx.instrument.instrument.midiChannel ?? 1
		const note = ctx.marble.marble.config.note ?? ctx.instrument.instrument.midiNote ?? 60
		const velocity = ctx.instrument.instrument.midiVelocity ?? 100
		const length = ctx.instrument.instrument.midiLength ?? 200
		sendMidiNote(midiState, channel, note, velocity, length)
	}

	// Audio trigger
	const chain = ctx.instrument.audio

	if (chain) {
		chain.audioSignal.intensity = 1
		chain.audioSignal.color =
			ctx.instrument.instrument.color ?? ctx.rail.railData.color ?? '#ffffff'
	}

	if (chain?.generator) {
		const note = ctx.marble.marble.config.note ?? ctx.instrument.instrument.midiNote ?? 60
		const velocity = ctx.instrument.instrument.midiVelocity ?? 100
		const length = ctx.instrument.instrument.midiLength ?? 200
		triggerChain(chain, note, velocity, length)
	}
}

export function bouncerHandler(ctx: BounceContext) {
	// Signal visual feedback on both marbles
	ctx.marble1.marble.signal.intensity = 1
	ctx.marble2.marble.signal.intensity = 1

	// Trigger marble1 audio chain
	const chain1 = ctx.marble1.audio
	if (chain1) {
		chain1.audioSignal.intensity = 1
		chain1.audioSignal.color =
			ctx.marble1.marble.runtime.color ??
			ctx.marble1.marble.config.color ??
			ctx.rail.railData.color ??
			'#ffffff'
	}
	if (chain1?.generator) {
		const note = ctx.marble1.marble.config.note ?? 60
		triggerChain(chain1, note, 100, 200)
	}

	// Trigger marble2 audio chain
	const chain2 = ctx.marble2.audio
	if (chain2) {
		chain2.audioSignal.intensity = 1
		chain2.audioSignal.color =
			ctx.marble2.marble.runtime.color ??
			ctx.marble2.marble.config.color ??
			ctx.rail.railData.color ??
			'#ffffff'
	}
	if (chain2?.generator) {
		const note = ctx.marble2.marble.config.note ?? 60
		triggerChain(chain2, note, 100, 200)
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
		if (ctx.phase === 'init') {
			// console.log('[GLOBAL] Init - beat:', ctx.beat.toFixed(3))
		} else if (ctx.phase === 'play') {
			// console.log('[GLOBAL] Play - beat:', ctx.beat.toFixed(3))
		} else if (ctx.phase === 'pause') {
			// console.log('[GLOBAL] Pause - beat:', ctx.beat.toFixed(3))
		} else if (ctx.phase === 'destroy') {
			// console.log(
			// 	'[GLOBAL] Destroy - beat:',
			// 	ctx.beat.toFixed(3),
			// 	'clearing',
			// 	timers.length,
			// 	'timers'
			// )
			// Cleanup any timers/intervals here
			timers.forEach((id) => clearTimeout(id))
			timers.length = 0
		} else if (ctx.phase === 'tick') {
			// Log every tick
			// console.log('[GLOBAL] beat:', ctx.beat.toFixed(3))

			if (onTick) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				onTick(ctx)
			}
		}
	}

	globalBeatHandler.setTimeout = (th: TimerHandler, ms?: number) => {
		timers.push(setTimeout(th, ms))
	}

	onTick = onTick?.bind(globalBeatHandler)

	return globalBeatHandler
}
