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
		analyzers: true
	},
	audio: {
		master: {
			analyzer: 'meter'
		}
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
					speed: 0.125 / 2,
					duration: 2000,
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
						const semi = (ctx.marble.state.note as number[]).some((n: number) => n > 60)
							? Math.round(-r() * 7)
							: Math.round((r() - 0.5) * 4)
						if (r() < 0.2) {
							;(ctx.marble.state.note as number[])[2] -= 2
						}

						ctx.marble.state.note = q(ctx.marble.state.note!, semi)
					},
					audio: {
						analyzer: 'fft',
						generator: { sample: 'pad-astrid', params: { release: 10, volume: -12 } },
						fx: [
							{
								rnbo: 'shimmerev',
								params: {
									octdamp: 46.578_125,
									octvol: 100,
									mix: 25,
									damp: 17.734_375,
									decay: 66.488_281_25,
									pitchvol: 41.310_546_875,
									revvol: 52.972_656_25,
									jitter: 51.820_312_5,
									size: 92.779_296_875,
									diff: 83.087_890_625,
									pitch: 12,
									chorus: 10.419_921_875,
									feedback: 86.345_703_125,
									window: 250,
									delay: 272.8125
								},
								preset: 'Organ'
							},
							{ tone: 'Volume', params: { volume: 12 } },
							{ tone: 'Limiter', params: { threshold: -1 } }
						]
					}
				}
			]
		}
	]
}
