import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'
import { triggerHandler } from '../lib/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-marbles',
	bpm: 120,
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'poly',
				nodes: [[-4, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			marbles: [
				{ type: 'poly', start: 1, sides: 2 },
				{ type: 'poly', start: 2, sides: 3 },
				{ type: 'poly', start: 3, sides: 4 },
				{ type: 'poly', start: 4, sides: 5 },
				{ type: 'poly', start: 5, sides: 6 },
				{ type: 'poly', start: 6, sides: 7 },
				{ type: 'poly', start: 7, sides: 8 },
				{ type: 'poly', start: 8, sides: 12 }
			]
		},
		{
			rail: {
				id: 'coil',
				nodes: [[-2, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			marbles: [
				{ type: 'coil', start: 5, rounds: 1 },
				{ type: 'coil', start: 6, rounds: 2 },
				{ type: 'coil', start: 7, rounds: 3 },
				{ type: 'coil', start: 8, rounds: 4 }
			]
		},
		{
			rail: {
				id: 'ball',
				nodes: [[0, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 8 }]
		},
		{
			rail: {
				id: 'eater',
				nodes: [[2, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 8 }]
		}
	]
}
