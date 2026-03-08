import type { SceneConfig } from '../lib/core/scene'
import { colorFactory } from './utils/colors'
import { globalHandlerFactory, triggerHandler } from '../lib/core/trigger-handler'

const c = colorFactory()

export const scene: SceneConfig = {
	id: 'scene-sampler',
	bpm: 120,
	camera: [0, 13, 0],
	globalBeatHandler: globalHandlerFactory(),
	triggerHandler,
	rails: [
		{
			id: 'line',
			offset: [-3, 0, 0],
			color: c(),
			marbles: [{ mode: 'ping-pong', speed: 0.5, duration: 1200, note: 60 - 24 }],
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
						ctx.marble.state.note!++
						if (ctx.marble.state.note! > 60) {
							ctx.marble.state.note = 60 - 24
						}
					},
					audio: {
						generator: { sample: 'acid' }
					}
				}
			]
		}
	]
}
