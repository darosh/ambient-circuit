// CC/CV parameter automation — types + pure tick logic + scene-level timer

import type { SceneCtx } from './scene-ctx'
import { sendMidiCC, getMidiState } from '../midi/midi'

export type CtrlSet = {
	type: 'set'
	value: number // 0-1 normalized
	/** Ramp time from current to target value in ms (default 0) */
	ramp?: number
	/** Curve for ramp (default 'linear') */
	curve?: 'linear' | 'exponential'
}

export type CtrlEnvelope = {
	type: 'envelope'
	/** Attack time in seconds */
	attack: number
	/** Decay time in seconds */
	decay: number
	/** Pre-attack ramp from current value to 0 in ms (default 0) */
	ramp?: number
	/** Curve type (default 'linear') */
	curve?: 'linear' | 'exponential'
}

export type CtrlLfo = {
	type: 'lfo'
	/** Waveform shape */
	shape: 'sine' | 'saw' | 'square' | 'triangle' | 'random'
	/** Rate: number = Hz, string = beat division e.g. '1/4' */
	rate: number | string
	/** If true, phase continues across triggers (default false = reset on trigger) */
	freerun?: boolean
	/** Random deviation per sample, 0-1 (default 0) */
	jitter?: number
	/** First-order lag smoothing, 0=none 1=frozen (default 0) */
	smooth?: number
	/** How impact (marble trigger) controls LFO active state (default 'none') */
	impact?: 'on' | 'off' | 'on-off' | 'none'
	/** Start LFO immediately when playback begins (default false) */
	active?: boolean
}

export type CtrlSequence = {
	type: 'sequence'
	/** Normalized values (0-1), cycles through per trigger */
	values: number[]
	/** Ramp time from current to next value in ms (default 0) */
	ramp?: number
	/** Curve for ramp (default 'linear') */
	curve?: 'linear' | 'exponential'
}

export type CtrlSource = CtrlSet | CtrlEnvelope | CtrlLfo | CtrlSequence

export type CtrlConfig = {
	/** MIDI CC number (0-127) */
	cc: number
	/** MIDI channel (1-16) */
	channel: number
} & CtrlSource

// --- Runtime instances ---

export type CtrlInstance = {
	config: CtrlConfig
	/** Current normalized value (0-1) */
	value: number
	/** Envelope/LFO phase (seconds elapsed); negative = pre-attack ramp phase */
	phase: number
	/** Sequence cursor */
	seqIndex: number
	/** Whether actively outputting (envelope finished = false) */
	active: boolean
	/** Start value for envelope ramp or sequence ramp */
	rampFrom: number
	/** Target value for sequence ramp */
	rampTarget: number
	/** Elapsed time in sequence ramp (seconds) */
	rampElapsed: number
	/** Last smoothed LFO value (for smooth filter state) */
	smoothValue: number
	/** Toggle state for 'on-off' impact mode */
	impactToggle: boolean
}

export function createCtrlInstance(config: CtrlConfig): CtrlInstance {
	return {
		config,
		value: 0,
		phase: 0,
		seqIndex: 0,
		active: config.type === 'lfo' ? (config.active ?? false) : false,
		rampFrom: 0,
		rampTarget: 0,
		rampElapsed: 0,
		smoothValue: 0,
		impactToggle: false
	}
}

/**
 * Fire a ctrl on trigger (marble hit). Returns new value.
 * @param lastValues optional ctrlBus lastValues map — used by 'set' ramp to read cross-instrument current value
 */
export function triggerCtrl(inst: CtrlInstance, lastValues?: Map<string, number>): number {
	const c = inst.config
	switch (c.type) {
		case 'set': {
			const rampSec = (c.ramp ?? 0) / 1000
			if (rampSec > 0) {
				// Use last emitted value for this channel:cc as rampFrom (cross-instrument aware)
				const busKey = c.channel + ':' + c.cc
				const currentBusValue = lastValues?.get(busKey) ?? inst.value
				inst.rampFrom = currentBusValue
				inst.rampTarget = c.value
				inst.rampElapsed = 0
				inst.active = true
				return -1
			}
			inst.value = c.value
			inst.active = false
			return inst.value
		}

		case 'envelope': {
			const rampSec = (c.ramp ?? 0) / 1000
			inst.rampFrom = inst.value
			inst.phase = -rampSec
			inst.active = true
			return inst.value
		}

		case 'lfo': {
			switch (c.impact ?? 'none') {
				case 'none':
				case 'on': {
					if (!c.freerun) inst.phase = 0
					inst.active = true
					break
				}
				case 'off': {
					inst.active = false
					break
				}
				case 'on-off': {
					inst.impactToggle = !inst.impactToggle
					inst.active = inst.impactToggle
					if (inst.active && !c.freerun) inst.phase = 0
					break
				}
			}
			return -1 // skip emit on trigger; per-frame tick handles LFO output
		}

		case 'sequence': {
			if (c.values.length === 0) return inst.value
			const next = c.values[inst.seqIndex % c.values.length]
			inst.seqIndex = (inst.seqIndex + 1) % c.values.length
			const rampSec = (c.ramp ?? 0) / 1000
			if (rampSec > 0) {
				inst.rampFrom = inst.value
				inst.rampTarget = next
				inst.rampElapsed = 0
				inst.active = true
				return -1 // ramp tick handles output
			}
			inst.value = next
			inst.active = false
			return inst.value
		}
	}
}

/**
 * Tick a ctrl instance (called per frame for active envelope/LFO).
 * @param inst
 * @param dt delta time in seconds
 * @param bpm current BPM (for beat-synced LFO rates)
 * @returns new normalized value, or -1 if inactive (skip emit)
 */
export function tickCtrl(inst: CtrlInstance, dt: number, bpm: number): number {
	if (!inst.active) return -1

	const c = inst.config
	inst.phase += dt

	switch (c.type) {
		case 'envelope': {
			const rampSec = (c.ramp ?? 0) / 1000

			// Pre-attack ramp: phase is negative while ramping from rampFrom → 0
			if (inst.phase < 0) {
				if (rampSec <= 0) {
					inst.value = 0
				} else {
					const t = (rampSec + inst.phase) / rampSec // 0→1 over ramp
					const tc = c.curve === 'exponential' ? t * t : t
					inst.value = inst.rampFrom * (1 - tc)
				}
				return inst.value
			}

			const { attack, decay } = c
			const total = attack + decay
			if (inst.phase >= total) {
				inst.value = 0
				inst.active = false
				return 0
			}
			if (inst.phase < attack) {
				// Attack: 0 → 1
				const t = inst.phase / attack
				inst.value = c.curve === 'exponential' ? t * t : t
			} else {
				// Decay: 1 → 0
				const t = (inst.phase - attack) / decay
				inst.value = c.curve === 'exponential' ? (1 - t) * (1 - t) : 1 - t
			}
			return inst.value
		}

		case 'lfo': {
			// Convert rate to Hz
			let hz: number
			if (typeof c.rate === 'number') {
				hz = c.rate
			} else {
				// Beat division string like '1/4' → frequency relative to BPM
				const parts = c.rate.split('/')
				const beats = parts.length === 2 ? Number(parts[0]) / Number(parts[1]) : Number(parts[0])
				const beatsPerSec = bpm / 60
				hz = beatsPerSec / (beats * 4) // '1/4' = quarter note
			}

			const phase = inst.phase * hz
			let v: number
			switch (c.shape) {
				case 'sine': {
					v = (Math.sin(phase * Math.PI * 2) + 1) / 2
					break
				}
				case 'saw': {
					v = phase % 1
					break
				}
				case 'square': {
					v = phase % 1 < 0.5 ? 1 : 0
					break
				}
				case 'triangle': {
					const p = phase % 1
					v = p < 0.5 ? p * 2 : 2 - p * 2
					break
				}
				case 'random': {
					// S&H: new random value each cycle
					if (Math.floor(phase) !== Math.floor(phase - dt * hz)) {
						inst.value = Math.random()
					}
					v = inst.value
					break
				}
			}

			// Jitter
			const jitter = c.jitter ?? 0
			if (jitter > 0) {
				v += (Math.random() - 0.5) * 2 * jitter
				if (v < 0) v = 0
				if (v > 1) v = 1
			}

			// Smooth (first-order lag)
			const smooth = c.smooth ?? 0
			if (smooth > 0) {
				inst.smoothValue += (v - inst.smoothValue) * (1 - smooth)
				v = inst.smoothValue
			}

			inst.value = v
			return inst.value
		}

		case 'set':
		case 'sequence': {
			// Ramp tick (shared by set + sequence)
			const rampSec = (c.ramp ?? 0) / 1000
			if (rampSec <= 0) {
				inst.active = false
				return -1
			}
			inst.rampElapsed += dt
			const t = inst.rampElapsed / rampSec
			if (t >= 1) {
				inst.value = inst.rampTarget
				inst.active = false
				return inst.value
			}
			const tc = c.curve === 'exponential' ? t * t : t
			inst.value = inst.rampFrom + (inst.rampTarget - inst.rampFrom) * tc
			return inst.value
		}

		default: {
			return -1
		}
	}
}

// --- Scene-level ctrl timer with render-loop watchdog ---

const CTRL_INTERVAL_MS = 4
const WATCHDOG_TIMEOUT_MS = 250

export type CtrlTimer = {
	/** Call from useTask each frame to keep timer alive */
	pet(): void
	/** Stop timer permanently (scene destroy) */
	stop(): void
}

/**
 * Create a high-resolution ctrl tick timer.
 * Pauses automatically when render loop stops (tab hidden).
 * Call pet() from useTask each frame to keep it running.
 */
export function startCtrlTimer(
	sceneCtx: SceneCtx,
	getBpm: () => number,
	isPlaying: () => boolean
): CtrlTimer {
	let lastTime = performance.now()
	let alive = true
	let watchdogId: ReturnType<typeof setTimeout> | undefined

	function resetWatchdog() {
		if (watchdogId !== undefined) clearTimeout(watchdogId)
		if (!alive) {
			// Resume: reset lastTime to avoid huge dt jump
			lastTime = performance.now()
			alive = true
		}
		watchdogId = setTimeout(() => {
			alive = false
		}, WATCHDOG_TIMEOUT_MS)
	}

	const id = setInterval(() => {
		if (!alive || !isPlaying()) {
			lastTime = performance.now()
			return
		}

		const now = performance.now()
		const dt = (now - lastTime) / 1000
		lastTime = now

		if (dt <= 0) return

		const bpm = getBpm()
		const midiState = getMidiState()

		for (const ie of sceneCtx.instruments) {
			if (!ie.ctrlInstances) continue
			for (const ci of ie.ctrlInstances) {
				const v = tickCtrl(ci, dt, bpm)
				if (v >= 0) {
					if (midiState?.enabled) {
						sendMidiCC(midiState, ci.config.channel, ci.config.cc, v)
					}
					sceneCtx.ctrlBus.emit(ci.config.channel, ci.config.cc, v)
				}
			}
		}
	}, CTRL_INTERVAL_MS)

	// Initial pet to start watchdog
	resetWatchdog()

	return {
		pet: resetWatchdog,
		stop() {
			clearInterval(id)
			if (watchdogId !== undefined) clearTimeout(watchdogId)
			alive = false
		}
	}
}
