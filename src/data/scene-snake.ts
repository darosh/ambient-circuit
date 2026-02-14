import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'
import { triggerHandler } from '../lib/trigger-handler'

export const scene: SceneConfig = {
	id: 'scene-snake',
	bpm: 120,
	camera: [0, 21, 0],
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'circle-snake',
				offset: [1, 0, -3],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [2, 0, 2], round: 'both' },
					{ p: [4, 0, 0], round: 'both' },
					{ p: [2, 0, -2], round: 'both' },
					{ p: [0, 0, 0], round: 'both', beat: 16 }
				]
			},
			color: colors[0],
			marbles: [
				{ type: 'ball', start: 0, snake: true, speed: 1 },
				{ type: 'poly', start: 1, snake: true, speed: 1, sides: 6 },
				{ type: 'coil', start: 2, snake: true, speed: 1, rounds: 3 }
			]
		},
		{
			rail: {
				id: 'straight-snake',
				nodes: [[5, 0, 5], { p: [-5, 0, -5], beat: 8 }]
			},
			color: colors[1],
			marbles: [
				{ type: 'eater', start: 0, snake: true, speed: 0.5, angle: 75 },
				{ type: 'ball', start: 4, snake: true, speed: 0.25, direction: 'backward' }
			]
		},
		{
			rail: {
				id: 'circle-tilt',
				tilt: 0,
				offset: [-5, 0, 3],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [2, 0, 2], round: 'both' },
					{ p: [4, 0, 0], round: 'both' },
					{ p: [2, 0, -2], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			color: colors[2],
			marbles: [{ type: 'eater', start: 0, speed: 1, snake: true, angle: 90 }]
		}
	]
}
