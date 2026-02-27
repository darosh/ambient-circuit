import type { SceneConfig } from '../lib/scene'
import { colors } from './utils/colors'
import { globalHandlerFactory, triggerHandler } from '../lib/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

let prev = Date.now()

export const scene: SceneConfig = {
	id: 'scene-reverse',
	description: 'Instrument trigger is reversing\ndirection of all marbles',
	bpm: 120,
	camera: [0, 12, 7],
	names: true,
	globalBeatHandler: globalHandlerFactory(),
	triggerHandler,
	rails: [
		// Example 1: Reverse all marbles
		{
			rail: {
				id: 'reverse-trigger',
				offset: [-3, 0, 1],
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

						for (const _m of ctx.scene.marbles) {
							_m.state.reverse()
						}
					}
				}
			]
		},
		{
			rail: {
				id: 'reverse-target',
				offset: [-3, 0, -1],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'poly', sides: 4, start: 0, mode: 'ping-pong' }]
		}
	]
}
