import type { SceneConfig } from '../lib/core/scene'
import { colors } from './utils/colors'
import { triggerHandler } from '../lib/core/trigger-handler'

export const scene: SceneConfig = {
	id: 'scene-snake',
	bpm: 120,
	camera: [0, 21, 0],
	triggerHandler,
	rails: [
		{
			id: 'circle-snake',
			offset: [1, 0, -3],
			nodes: [
				{ p: [0, 0, 0], round: 'both' },
				{ p: [2, 0, 2], round: 'both' },
				{ p: [4, 0, 0], round: 'both' },
				{ p: [2, 0, -2], round: 'both' },
				{ p: [0, 0, 0], round: 'both', beat: 16 }
			],
			color: colors[0],
			marbles: [
				{ type: 'ball', start: 0, snake: true, speed: 1 },
				{ type: 'ball', start: 0.25, snake: true, speed: 1 },
				{ type: 'ball', start: 0.5, snake: true, speed: 1 },
				{ type: 'ball', start: 0.75, snake: true, speed: 1 },
				{ type: 'ball', start: 1, snake: true, speed: 1 },
				{ type: 'ball', start: 1.25, snake: true, speed: 1 },
				{ type: 'ball', start: 1.5, snake: true, speed: 1 }
			]
		},
		{
			id: 'straight-eater',
			nodes: [[5, 0, 5], { p: [-5, 0, -5], beat: 8 }],
			color: colors[1],
			marbles: [{ type: 'eater', start: 0, snake: 0.5, speed: 0.5, angle: 75 }]
		},
		{
			id: 'tilted-eater',
			tilt: 0,
			offset: [-5, 0, 3],
			nodes: [
				{ p: [0, 0, 0], round: 'both' },
				{ p: [2, 0, 2], round: 'both' },
				{ p: [4, 0, 0], round: 'both' },
				{ p: [2, 0, -2], round: 'both' },
				{ p: [0, 0, 0], round: 'both' }
			],
			color: colors[2],
			marbles: [{ type: 'eater', start: 0, speed: 1, snake: 0.5, angle: 90 }]
		}
	]
}
