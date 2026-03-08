import type { SceneConfig } from '../lib/core/scene'
import { color2 } from './utils/colors'
import { globalHandlerFactory, triggerHandler } from '../lib/core/trigger-handler'

export const scene: SceneConfig = {
	id: 'scene-sampler-pad-awaits',
	bpm: 120,
	camera: [7, 8, 15],
	globalBeatHandler: globalHandlerFactory(),
	triggerHandler,
	rails: [
		{
			id: 'line',
			offset: [-3, 0, 0],
			color: color2[4],
			marbles: [{ mode: 'ping-pong', speed: 0.125 / 2, duration: 6000, note: 60 - 12 }],
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
						;(ctx.marble.state as unknown as { note: number }).note++
						if ((ctx.marble.state.note as number) > 72) {
							ctx.marble.state.note = 60 - 12
						}
					},
					audio: {
						generator: { sample: 'pad-awaits', params: { release: 1, volume: -6 } },
						fx: [{ rnbo: 'gigaverb' }]
					}
				}
			]
		}
	]
}
