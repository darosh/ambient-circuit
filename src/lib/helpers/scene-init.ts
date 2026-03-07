import type { RailConfig, EaterMarbleInput } from '../core/rail-config'
import { toRailShapeConfig } from '../core/rail-config'
import type { MarbleInstance } from '../core/marble'
import { createMarbleInstance } from '../core/marble'
import { resolveRail } from '../core/rail-resolve'

export function createInstrumentSignals(rails: RailConfig[]): {
	signals: Array<{ intensity: number }>
	midiSignals: Array<{ intensity: number }>
	/* eslint-disable @typescript-eslint/no-explicit-any */
	runtimes: Array<Record<string, any>>
	/* eslint-enable @typescript-eslint/no-explicit-any */
} {
	const signals: Array<{ intensity: number }> = []
	const midiSignals: Array<{ intensity: number }> = []
	/* eslint-disable @typescript-eslint/no-explicit-any */
	const runtimes: Array<Record<string, any>> = []
	/* eslint-enable @typescript-eslint/no-explicit-any */
	for (const { instruments } of rails) {
		const count = instruments?.length ?? 0
		for (let i = 0; i < count; i++) {
			signals.push({ intensity: 0 })
			midiSignals.push({ intensity: 0 })
			runtimes.push({})
		}
	}
	return { signals, midiSignals, runtimes }
}

export function assignInstrumentSignals(
	rails: RailConfig[],
	signals: Array<{ intensity: number }>,
	midiSignals: Array<{ intensity: number }>,
	/* eslint-disable @typescript-eslint/no-explicit-any */
	runtimes: Array<Record<string, any>>
	/* eslint-enable @typescript-eslint/no-explicit-any */
): void {
	let idx = 0
	for (const { instruments } of rails) {
		if (instruments)
			for (const ins of instruments) {
				ins.signal = signals[idx]
				ins.midiSignal = midiSignals[idx]
				ins.runtime = runtimes[idx]
				idx++
			}
	}
}

export function createMarbleConfigs(
	rails: RailConfig[],
	easing: string
): { marbles: MarbleInstance[]; railIndices: number[] } {
	const ms: MarbleInstance[] = []
	const indices: number[] = []
	for (const [i, rc] of rails.entries()) {
		const resolvedRail = resolveRail(toRailShapeConfig(rc))
		const mds = rc.marbles

		const configs = mds && mds.length > 0 ? mds : mds === false ? [] : [{}]

		for (const m of configs) {
			ms.push(
				createMarbleInstance(
					{
						resolvedRail,
						startBeat: m.start ?? 0,
						direction: m.direction ?? 'forward',
						sequenceMode: m.mode ?? 'looping',
						easing: m.easing ?? (easing || 'linear'),
						color: m.color,
						speed: m.speed ?? 1,
						note: m.note,
						velocity: m.velocity,
						duration: m.duration,
						type: m.type,
						angle: (<EaterMarbleInput>m)?.angle ?? 60,
						bouncer: m.bouncer ?? false,
						snake: m.snake ?? false,
						active: m.active,
						running: m.running,
						...('sides' in m ? { sides: m.sides } : {}),
						...(m.type === 'coil' ? { rounds: m.rounds } : {})
					},
					ms.length
				)
			)
			indices.push(i)
		}
	}
	return { marbles: ms, railIndices: indices }
}
