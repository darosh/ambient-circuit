import type { SceneConfig } from '../lib/scene'
import { triggerHandler } from '../lib/trigger-handler'

export const scene: SceneConfig = {
	id: 'scene-a',
	bpm: 120,
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'path',
				nodes: [[0, 0, 0], 'l3 i ib l i lb i']
			},
			color: '#0000ff',
			// marbles: false
		}
	]
}
