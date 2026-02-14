import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'
import { triggerHandler } from '../lib/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-crossing',
	bpm: 120,
	camera: [0, 13, 8],
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'eight',
				nodes: [[0, 0, 0], 'ir or ol il il ol or ir']
			},
			color: c()
		},
		{
			rail: {
				id: 'eight-no-cross',
				nodes: [[0, 0, -3], 'ir or ol ilu0.01 il ol or ird0.01 ']
			},
			color: c()
		}
	]
}
