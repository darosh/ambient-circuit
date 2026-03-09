import type { SceneConfig } from '../lib/core/scene'
import { color2 } from './utils/colors'
import { globalHandlerFactory, triggerHandler } from '../lib/core/trigger-handler'
import { pitchQuantizeFactory } from '../lib/midi/pitch'
import { randomizer } from './utils/randomizer'

const q = pitchQuantizeFactory('B lydian')
const r = randomizer()

export const scene: SceneConfig = {
	id: 'scene-sampler-pad-astrid',
	bpm: 120,
	camera: [7, 8, 15],
	globalBeatHandler: globalHandlerFactory(),
	triggerHandler,
	audioView: {
		analyzers: true,
	},
	sequencerMode: 'time',
	rails: [
		{
			id: 'line',
			offset: [-3, 0, 0],
			color: color2[3],
			marbles: [
				{
					mode: 'ping-pong',
					speed: 0.125,
					duration: 10,
					note: [60 - 12, 60 - 24, 60 + 4, 60 + 7 - 12]
				}
			],
			nodes: [
				[0, 0, 0],
				[6, 0, 0]
			],
			instruments: [
				{
					type: 'arrow',
					kind: 'repro',
					beat: 0.5,
					actionHandler: (ctx) => {
						const semi = ctx.marble.state.note as number[][3] > 50 ? Math.round(-r() * 7) : Math.round((r() - 0.5) * 4)
						ctx.marble.state.note = q(ctx.marble.state.note!, semi)
					},
					audio: {
						analyzer: 'fft',
						generator: { sample: 'pad-astrid', params: { release: 10, volume: -6 } },
						fx: [{ rnbo: 'gigaverb' }]
					}
				}
			]
		}
	]
}
