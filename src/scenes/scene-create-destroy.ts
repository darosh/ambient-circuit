import type { SceneConfig } from '../lib/scene'
import { colorFactory } from './utils/colors'
import { globalHandlerFactory, triggerHandler } from '../lib/trigger-handler'

const c = colorFactory()

export const scene: SceneConfig = {
	id: 'scene-create-destroy',
	bpm: 120,
	camera: [0, 13, 0],
	globalBeatHandler: globalHandlerFactory(),
	triggerHandler,
	sequencerMode: 'time',
	names: true,
	audioView: { module: 0.05 },
	sequencerBeats: 32,
	audio: {
		chains: {
			synth: { generator: { tone: 'DuoSynth', params: { volume: -34 } } }
		}
	},
	rails: [
		{
			rail: {
				id: 'line-create',
				offset: [-3, 0, 1],
				nodes: [[0, 0, 0], { p: [6, 0, 0], beat: 13 }]
			},
			color: c(),
			instruments: [
				{
					beat: 0.5,
					type: 'arrow',
					kind: 'play',
					actionHandler(ctx) {
						const { marbles } = ctx.scene.rails[1].state

						if (marbles.length <= 12) {
							ctx.scene.rails[1].state.create({ type: 'poly', sides: 12 })
						}
					}
				}
			]
		},
		{
			rail: {
				id: 'line',
				offset: [-3, 0, 0],
				nodes: [[0, 0, 0], { p: [6, 0, 0], beat: 17 }]
			},
			color: c(),
			marbles: false,
			instruments: [
				{
					type: 'whirl',
					sides: 3,
					beat: 4,
					audio: { id: 'synth' }
				}
			]
		},
		{
			rail: {
				id: 'line-destroy',
				offset: [-3, 0, -1],
				nodes: [[0, 0, 0], { p: [6, 0, 0], beat: 12 }]
			},
			color: c(),
			instruments: [
				{
					beat: 1.5,
					type: 'arrow',
					kind: 'stop',
					actionHandler(ctx) {
						const { marbles } = ctx.scene.rails[1].state

						if (marbles.length >= 12) {
							marbles.forEach((x) => x.state.destroy())
						}
					}
				}
			]
		}
	]
}
