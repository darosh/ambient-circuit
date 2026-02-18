import type { SceneConfig } from '../lib/scene'
import { colors } from './utils/colors'
import { globalHandlerFactory, triggerHandler } from '../lib/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-beats',
	bpm: 120,
	camera: [0, 13, 0],
	globalBeatHandler: globalHandlerFactory(),
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'line',
				offset: [-3, 0, 1],
				nodes: [
					[0, 0, 0],
					[6, 0, 0]
				]
			},
			color: c()
		},
		{
			rail: {
				id: 'line-sparse-2',
				offset: [-3, 0, 0],
				nodes: [[0, 0, 0], { p: [6, 0, 0], beat: 2 }]
			},
			color: c()
		},
		{
			rail: {
				id: 'line-sparse-16',
				offset: [-3, 0, -1],
				nodes: [[0, 0, 0], { p: [6, 0, 0], beat: 16 }]
			},
			color: c()
		}
	]
}
