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
			marbles: [
				{ mode: 'ping-pong', speed: 0.05, duration: 4000, note: 60 - 24, start: 0.4 },
				{ mode: 'ping-pong', speed: 0.25, duration: 200, note: 60 - 12 }
				// { mode: 'ping-pong', speed: 0.5, duration: 200, note: 60 - 12 }
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
					audio: {
						generator: { sample: 'acid', poly: 12 }
						// fx: [{rnbo: 'gigaverb'}]
					}
				}
			]
		}
	]
}
