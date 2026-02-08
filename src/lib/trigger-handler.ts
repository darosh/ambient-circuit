import { sendMidiNote } from './midi'
import { SceneTriggerContext } from './scene'

export function triggerHandler(ctx: SceneTriggerContext) {
	ctx.instrument.signal!.intensity = 1

	if (ctx.midiState?.enabled) {
		const channel = ctx.instrument.midiChannel ?? 1
		const note = ctx.marble.config.note ?? ctx.instrument.midiNote ?? 60
		const velocity = ctx.instrument.midiVelocity ?? 100
		const length = ctx.instrument.midiLength ?? 200
		sendMidiNote(ctx.midiState, channel, note, velocity, length)
	}
}
