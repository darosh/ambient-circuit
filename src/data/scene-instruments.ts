import type { SceneConfig } from '../lib/scene'
import { triggerHandler } from '../lib/trigger-handler'

const colors = ['#0000ff', '#8800ff', '#ff8888', '#ff00ff', '#ff0000']
let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-instruments',
	bpm: 120,
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'poly',
				nodes: [[-4, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'poly', beat: 1, sides: 2 },
				{ type: 'poly', beat: 2, sides: 3 },
				{ type: 'poly', beat: 3, sides: 4 },
				{ type: 'poly', beat: 4, sides: 5 },
				{ type: 'poly', beat: 5, sides: 6 },
				{ type: 'poly', beat: 6, sides: 7 },
				{ type: 'poly', beat: 7, sides: 8 },
				{ type: 'poly', beat: 8, sides: 12 }
			]
		},
		{
			rail: {
				id: 'cross',
				nodes: [[-3, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'cross', beat: 1, sides: 2 },
				{ type: 'cross', beat: 2, sides: 3 },
				{ type: 'cross', beat: 3, sides: 4 },
				{ type: 'cross', beat: 4, sides: 5 },
				{ type: 'cross', beat: 5, sides: 6 },
				{ type: 'cross', beat: 6, sides: 7 },
				{ type: 'cross', beat: 7, sides: 8 },
				{ type: 'cross', beat: 8, sides: 12 }
			]
		},
		{
			rail: {
				id: 'whirl',
				nodes: [[-1, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'whirl', beat: 1, sides: 2 },
				{ type: 'whirl', beat: 2, sides: 3 },
				{ type: 'whirl', beat: 3, sides: 4 },
				{ type: 'whirl', beat: 4, sides: 5 },
				{ type: 'whirl', beat: 5, sides: 6 },
				{ type: 'whirl', beat: 6, sides: 7 },
				{ type: 'whirl', beat: 7, sides: 8 },
				{ type: 'whirl', beat: 8, sides: 12 }
			]
		},
		{
			rail: {
				id: 'star',
				nodes: [[-2, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'star', beat: 1, sides: 2 },
				{ type: 'star', beat: 2, sides: 3 },
				{ type: 'star', beat: 3, sides: 4 },
				{ type: 'star', beat: 4, sides: 5 },
				{ type: 'star', beat: 5, sides: 6 },
				{ type: 'star', beat: 6, sides: 7 },
				{ type: 'star', beat: 7, sides: 8 },
				{ type: 'star', beat: 8, sides: 12 }
			]
		},
		{
			rail: {
				id: 'cone',
				nodes: [[0, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'cone', beat: 1, rounds: 1 },
				{ type: 'cone', beat: 2, rounds: 2 },
				{ type: 'cone', beat: 3, rounds: 3 },
				{ type: 'cone', beat: 4, rounds: 4 },
				{ type: 'cone', beat: 5, rounds: 5 },
				{ type: 'cone', beat: 6, rounds: 6 },
				{ type: 'cone', beat: 7, rounds: 7 },
				{ type: 'cone', beat: 8, rounds: 8 }
			]
		},
		{
			rail: {
				id: 'spiral',
				nodes: [[1, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'spiral', beat: 1, rounds: 1 },
				{ type: 'spiral', beat: 2, rounds: 2 },
				{ type: 'spiral', beat: 3, rounds: 3 },
				{ type: 'spiral', beat: 4, rounds: 4 },
				{ type: 'spiral', beat: 5, rounds: 5 },
				{ type: 'spiral', beat: 6, rounds: 6 },
				{ type: 'spiral', beat: 7, rounds: 7 },
				{ type: 'spiral', beat: 8, rounds: 8 }
			]
		},
		{
			rail: {
				id: 'heart',
				nodes: [[2, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [{ type: 'heart', beat: 4 }]
		}
	]
}
