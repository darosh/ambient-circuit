import type { SceneConfig } from '../lib/scene'
import { color3 as colors } from './colors'
import { triggerHandler } from '../lib/trigger-handler'

// let ci = 0
// const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-rings',
	bpm: 120,
	polar: true,
	camera: [7.5, 4.5, 7.5],
	target: [0, 0.75, 0],
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'r.1',
				offset: [-1, -1, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [1, 0, 1], round: 'both' },
					{ p: [2, 0, 0], round: 'both' },
					{ p: [1, 0, -1], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			instruments: [
				{ beat: 2, type: 'star', sides: 7 },
				{ beat: 2.5, type: 'star', sides: 7 }
			],
			marbles: [
				{ start: 0, speed: 1 },
				{ start: 2, speed: 2 }
			],
			color: colors[0]
		},
		{
			rail: {
				id: 'r.2',
				offset: [-0.75, 0.5, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [0.5, 0, 0.5], round: 'both' },
					{ p: [1, 0, 0], round: 'both' },
					{ p: [0.5, 0, -0.5], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			instruments: [{ beat: 2, type: 'star', sides: 7 }],
			color: colors[1]
		},
		{
			rail: {
				id: 'r.4',
				offset: [1.75, .5, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [0.5, 0, 0.5], round: 'both' },
					{ p: [1, 0, 0], round: 'both' },
					{ p: [0.5, 0, -0.5], round: 'both' },
					{ p: [0, 0, 0], round: 'both', beat: 4 }
				]
			},
			instruments: [{ beat: 3, type: 'star', sides: 7 }],
			marbles: [
				{ start: 0, speed: 1 },
				{ start: 1, speed: 1.5 }
			],
			color: colors[0]
		},
		{
			rail: {
				id: 'r.3',
				offset: [-1.25, 0, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [1.5, 0, 1.5], round: 'both' },
					{ p: [3, 0, 0], round: 'both' },
					{ p: [1.5, 0, -1.5], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			instruments: [
				{ beat: 2, type: 'star', sides: 7 },
				{ beat: 3, type: 'star', sides: 7 }
			],
			color: colors[1]
		},
		{
			rail: {
				id: 'r.5',
				offset: [-3.25, 0, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [3, 0, 3], round: 'both' },
					{ p: [6, 0, 0], round: 'both' },
					{ p: [3, 0, -3], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			instruments: [
				{ beat: 2.5, type: 'star', sides: 7 },
				{ beat: 3.5, type: 'star', sides: 7 }
			],
			color: colors[1]
		},
		{
			rail: {
				id: 'r.6',
				offset: [0, -2, -1],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [0, 2, 2], round: 'both' },
					{ p: [0, 4, 0], round: 'both' },
					{ p: [0, 2, -2], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			instruments: [
				{ beat: 2.5, type: 'star', sides: 7 },
				{ beat: 3.5, type: 'star', sides: 7 }
			],
			color: colors[0]
		},
		{
			rail: {
				id: 'r.7',
				offset: [-2, 1, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [2, 0, 2], round: 'both' },
					{ p: [4, 0, 0], round: 'both' },
					{ p: [2, 0, -2], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			instruments: [
				{ beat: 2.5, type: 'star', sides: 7 },
				{ beat: 3.5, type: 'star', sides: 7 }
			],
			color: colors[0]
		}
	]
}
