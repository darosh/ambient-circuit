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
				id: 'fill',
				nodes: [[-5, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'poly', beat: 1.5, sides: 3, fill: true },
				{ type: 'poly', beat: 2.5, sides: 4, fill: true },
				{ type: 'poly', beat: 3.5, sides: 5, fill: true },
				{ type: 'poly', beat: 4.5, sides: 6, fill: true },
				{ type: 'poly', beat: 5.5, sides: 12, fill: true }
			]
		},
		{
			rail: {
				id: 'poly',
				nodes: [[-4, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'poly', beat: 0.5, sides: 2 },
				{ type: 'poly', beat: 1.5, sides: 3 },
				{ type: 'poly', beat: 2.5, sides: 4 },
				{ type: 'poly', beat: 3.5, sides: 5 },
				{ type: 'poly', beat: 4.5, sides: 6 },
				{ type: 'poly', beat: 5.5, sides: 12 }
			]
		},
		{
			rail: {
				id: 'cross',
				nodes: [[-3, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'cross', beat: 0.5, sides: 2 },
				{ type: 'cross', beat: 1.5, sides: 3 },
				{ type: 'cross', beat: 2.5, sides: 4 },
				{ type: 'cross', beat: 3.5, sides: 5 },
				{ type: 'cross', beat: 4.5, sides: 6 },
				{ type: 'cross', beat: 5.5, sides: 7 },
				{ type: 'cross', beat: 6.5, sides: 8 },
				{ type: 'cross', beat: 7.5, sides: 12 }
			]
		},
		{
			rail: {
				id: 'whirl',
				nodes: [[-1, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'whirl', beat: 0.5, sides: 2 },
				{ type: 'whirl', beat: 1.5, sides: 3 },
				{ type: 'whirl', beat: 2.5, sides: 4 },
				{ type: 'whirl', beat: 3.5, sides: 5 },
				{ type: 'whirl', beat: 4.5, sides: 6 },
				{ type: 'whirl', beat: 5.5, sides: 7 },
				{ type: 'whirl', beat: 6.5, sides: 8 },
				{ type: 'whirl', beat: 7.5, sides: 9 }
			]
		},
		{
			rail: {
				id: 'star',
				nodes: [[-2, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'star', beat: 0.5, sides: 2 },
				{ type: 'star', beat: 1.5, sides: 3 },
				{ type: 'star', beat: 2.5, sides: 4 },
				{ type: 'star', beat: 3.5, sides: 5 },
				{ type: 'star', beat: 4.5, sides: 6 },
				{ type: 'star', beat: 5.5, sides: 7 },
				{ type: 'star', beat: 6.5, sides: 8 },
				{ type: 'star', beat: 7.5, sides: 9 }
			]
		},
		{
			rail: {
				id: 'cone',
				nodes: [[0, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'cone', beat: 0.5, rounds: 1, active: false },
				{ type: 'cone', beat: 1.5, rounds: 2, active: false },
				{ type: 'cone', beat: 2.5, rounds: 3, active: false },
				{ type: 'cone', beat: 3.5, rounds: 4, active: false },
				{ type: 'cone', beat: 4.5, rounds: 5, active: false },
				{ type: 'cone', beat: 5.5, rounds: 6, active: false },
				{ type: 'cone', beat: 6.5, rounds: 7, active: false },
			]
		},
		{
			rail: {
				id: 'spiral',
				nodes: [[1, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'spiral', beat: 0.5, rounds: 1, active: false },
				{ type: 'spiral', beat: 1.5, rounds: 2, active: false },
				{ type: 'spiral', beat: 2.5, rounds: 3, active: false },
				{ type: 'spiral', beat: 3.5, rounds: 4, active: false }
			]
		},
		{
			rail: {
				id: 'active',
				nodes: [[2, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'cone', beat: 5.5, rounds: 5, active: true },
				{ type: 'spiral', beat: 7.5, rounds: 3, active: true },
			]
		},
		{
			rail: {
				id: 'heart',
				nodes: [[3, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'heart', beat: 5.5, pulse: true },
				{ type: 'heart', beat: 7.5, pulse: false }
			]
		},
		{
			rail: {
				id: 'arrow',
				nodes: [[4, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'arrow', beat: 5.5, point: 'forward' },
				{ type: 'arrow', beat: 7.5, point: 'backward' }
			]
		}
	]
}
