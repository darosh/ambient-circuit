import type { SceneConfig } from '../lib/scene'
import { colors } from './utils/colors'
import { globalHandlerFactory, triggerHandler } from '../lib/trigger-handler'

export const scene: SceneConfig = {
	id: 'scene-font',
	bpm: 120,
	globalBeatHandler: globalHandlerFactory(),
	camera: [0, 6, 10],
	names: true,
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'abcdefghijklmnopqrstuvwxyz',
				offset: [-5, 0, 1],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 16 }]
			},
			color: colors[0]
		},
		{
			rail: {
				id: '#0123456789-+./&@*',
				offset: [-5, 0, -1],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 16 }]
			},
			color: colors[3]
		}
	]
}
