import { sendMidiNote } from './midi'
import { TriggerContext } from './scene'

export function triggerHandler(ctx: TriggerContext) {
	ctx.instrument.instrument.signal!.intensity = 1
	ctx.marble.marble.signal.intensity = 1

	if (ctx.midiState?.enabled) {
		const channel = ctx.instrument.instrument.midiChannel ?? 1
		const note = ctx.marble.marble.config.note ?? ctx.instrument.instrument.midiNote ?? 60
		const velocity = ctx.instrument.instrument.midiVelocity ?? 100
		const length = ctx.instrument.instrument.midiLength ?? 200
		sendMidiNote(ctx.midiState, channel, note, velocity, length)
	}
}
