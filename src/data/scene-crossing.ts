import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'
import { triggerHandler } from '../lib/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-crossing',
	bpm: 120,
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'eight',
				nodes: [[0, 0, 0], 'ir or ol il il ol or ir']
			},
			color: c()
		}
	]
}
