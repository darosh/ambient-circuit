import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'
import { globalHandlerFactory } from '../lib/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

let prev = Date.now()

export const scene: SceneConfig = {
	id: 'scene-reverse',
	bpm: 120,
	globalBeatHandler: globalHandlerFactory(),
	triggerHandler(ctx) {
		// console.log('TRIGGER', ctx.railId, ctx.beat, ctx.marbleBeat)

		// Signal visual feedback
		ctx.instrument.instrument.signal!.intensity = 1
		ctx.marble.marble.signal.intensity = 1

		// Execute instrument action if present
		if (ctx.instrument.instrument.actionHandler) {
			ctx.instrument.instrument.actionHandler(ctx)
		}
	},
	rails: [
		// Example 1: Reverse all marbles
		{
			rail: {
				id: 'reverse-all',
				offset: [-3, 0, 2],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ speed: 3, type: 'ball', start: 0 }],
			instruments: [
				{
					type: 'sun',
					beat: 3,
					actionHandler(ctx) {
						const now = Date.now()

						if (now - prev < 66) {
							console.log(now - prev)
							return
						}

						prev = now

						ctx.scene.marbles.forEach((_m) => {
							_m.state.reverse()
						})
					}
				}
			]
		},
		{
			rail: {
				id: 'target-other',
				offset: [-3, 0, 1],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'poly', sides: 4, start: 0, mode: 'ping-pong' }]
		}
	]
}
