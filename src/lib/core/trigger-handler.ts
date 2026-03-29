import { sendMidiNote, sendMidiCC, getMidiState } from '../midi/midi'
import { triggerCtrl } from './ctrl'
import { triggerChain, updateGlobalChord } from '../audio'
import type { BounceContext, GlobalBeatContext, TriggerContext } from './scene'
import { notes } from '../midi/notes'
import { nextNoteEvent, parseBeatDuration } from './note-seq'
import { Vector3, Matrix4 } from 'three/webgpu'

const _pos1 = new Vector3()
const _pos2 = new Vector3()
const _tan1 = new Vector3()

const VELOCITY = 100
const DURATION = 200
const NOTE = notes.C4

function applyPitch(note: number | number[], pitch: number): number | number[] {
	if (Array.isArray(note)) return note.map((n) => n + pitch)
	return note + pitch
}

export function triggerHandler(ctx: TriggerContext) {
	// console.log('TRIGGER', ctx.railId, ctx.beat)

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
	let note = applyPitch(rawNote, pitch)

	let velocity =
		ctx.marble.marble.runtime.velocity ??
		ctx.marble.marble.resolved.velocity ??
		ctx.instrument.instrument.velocity ??
		ctx.scene.config.velocity ??
		VELOCITY

	let duration =
		ctx.marble.marble.runtime.duration ??
		ctx.marble.marble.resolved.duration ??
		ctx.instrument.instrument.duration ??
		ctx.scene.config.duration ??
		DURATION

	// NoteSequence override: cycles through note/velocity/duration per trigger
	let offsetMs = 0
	const noteSeqInst = ctx.instrument.instrument.runtime?.noteSeqInstance
	let restNotes:
		| { note: number | number[]; velocity: number; duration: number; offsetMs: number }[]
		| undefined
	if (noteSeqInst) {
		const event = nextNoteEvent(noteSeqInst)
		if (event === null) return // non-looping sequence exhausted
		if (event === false) return // pause — cursor advanced, skip trigger
		const bpm = ctx.scene.config.bpm
		const events = Array.isArray(event) ? event : [event]
		const first = events[0]
		if (first.note !== undefined) note = applyPitch(first.note, pitch)
		if (first.velocity !== undefined) velocity = first.velocity
		if (first.duration !== undefined) duration = parseBeatDuration(first.duration, bpm)
		if (first.offset) offsetMs = parseBeatDuration(first.offset, bpm)
		if (events.length > 1) {
			restNotes = events.slice(1).map((sub) => {
				const subNote = sub.note === undefined ? note : applyPitch(sub.note, pitch)
				const subVel = sub.velocity ?? velocity
				const subDur = sub.duration == null ? duration : parseBeatDuration(sub.duration, bpm)
				const subOffsetMs = offsetMs + (sub.offset == null ? 0 : parseBeatDuration(sub.offset, bpm))
				return { note: subNote, velocity: subVel, duration: subDur, offsetMs: subOffsetMs }
			})
		}
	}

	const midiState = getMidiState()
	const channel = ctx.instrument.instrument.channel ?? 1
	let didAct = false

	const sendMidi = () => {
		if (!midiState?.enabled) return
		if (Array.isArray(note)) {
			for (const n of note) sendMidiNote(midiState, channel, n, velocity, duration)
		} else {
			sendMidiNote(midiState, channel, note, velocity, duration)
		}
	}

	if (midiState?.enabled) {
		didAct = true
		if (offsetMs <= 0) {
			sendMidi()
		} else {
			setTimeout(sendMidi, offsetMs)
		}
	} else if (note) {
		didAct = true
	}

	// Fire ctrl entries (CC automation)
	const ctrlInstances = ctx.instrument.ctrlInstances
	if (ctrlInstances) {
		for (const ci of ctrlInstances) {
			const value = triggerCtrl(ci, ctx.scene.ctrlBus.lastValues)
			if (value < 0) continue // LFO: skip, per-frame tick handles it
			didAct = true
			// MIDI CC output
			if (midiState?.enabled) {
				sendMidiCC(midiState, ci.config.channel, ci.config.cc, value)
			}
			// Dispatch to audio param bus
			ctx.scene.ctrlBus.emit(ci.config.channel, ci.config.cc, value)
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
		didAct = true
		const offsetSec = offsetMs / 1000
		triggerChain(chain, note, velocity, duration, offsetSec)
		updateGlobalChord(ctx.scene, chain.output.context)
	}

	// Signal visual feedback + particle burst only when something actually fired
	if (didAct) {
		ctx.instrument.instrument.signal!.intensity = 1
		ctx.instrument.instrument.midiSignal!.intensity = 1
		ctx.marble.marble.signal.intensity = 1

		const m = ctx.marble.marble
		const _mat = ctx.rail.runtime.renderMatrix as Matrix4 | undefined
		_pos1.set(m.position.x, m.position.y, m.position.z)
		_tan1.set(m.tangent.x, m.tangent.y, m.tangent.z)
		if (_mat) {
			_pos1.applyMatrix4(_mat)
			_tan1.transformDirection(_mat)
		}
		ctx.scene.particleBursts.push({
			x: _pos1.x,
			y: _pos1.y,
			z: _pos1.z,
			tx: _tan1.x,
			ty: _tan1.y,
			tz: _tan1.z,
			color: ctx.instrument.instrument.color ?? ctx.rail.railData.color ?? '#ffffff'
		})
	}

	// Fire rest[] sub-notes at their own offsets (after chain is known)
	if (restNotes) {
		for (const sub of restNotes) {
			const subSend = () => {
				if (midiState?.enabled) {
					if (Array.isArray(sub.note)) {
						for (const n of sub.note)
							sendMidiNote(midiState, channel, n, sub.velocity, sub.duration)
					} else {
						sendMidiNote(midiState, channel, sub.note, sub.velocity, sub.duration)
					}
				}
				if (chain?.generator) triggerChain(chain, sub.note, sub.velocity, sub.duration, 0)
			}
			if (sub.offsetMs <= 0) subSend()
			else setTimeout(subSend, sub.offsetMs)
		}
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
	const _bmat = ctx.rail.runtime.renderMatrix as Matrix4 | undefined
	_pos1.set(
		(m1.position.x + m2.position.x) / 2,
		(m1.position.y + m2.position.y) / 2,
		(m1.position.z + m2.position.z) / 2
	)
	_tan1.set(m1.tangent.x, m1.tangent.y, m1.tangent.z)
	if (_bmat) {
		_pos1.applyMatrix4(_bmat)
		_tan1.transformDirection(_bmat)
	}
	ctx.scene.particleBursts.push({
		x: _pos1.x,
		y: _pos1.y,
		z: _pos1.z,
		tx: _tan1.x,
		ty: _tan1.y,
		tz: _tan1.z,
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
