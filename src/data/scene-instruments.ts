import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'
import { triggerHandler } from '../lib/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-instruments',
	bpm: 120,
	triggerHandler,
	camera: [3, 16, 7],
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
				id: 'arrow',
				nodes: [[0, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'arrow', beat: 0.5, kind: 'pause' },
				{ type: 'arrow', beat: 1.5, kind: 'stop' },
				{ type: 'arrow', beat: 2.5, kind: 'play' },
				{ type: 'arrow', beat: 3.5, kind: 'fwd' },
				{ type: 'arrow', beat: 4.5, kind: 'rec' },
				{ type: 'arrow', beat: 5.5, kind: 'step' },
				{ type: 'arrow', beat: 6.5, point: 'forward' },
				{ type: 'arrow', beat: 7.5, point: 'backward' }
			]
		},
		{
			rail: {
				id: 'sun',
				nodes: [[1, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'sun', beat: 0.5, rays: 0 },
				{ type: 'sun', beat: 1.5, rays: 3 },
				{ type: 'sun', beat: 2.5, rays: 4 },
				{ type: 'sun', beat: 3.5, rays: 5 },
				{ type: 'sun', beat: 4.5, rays: 6 },
				{ type: 'sun', beat: 5.5, rays: 12, brightness: 1 },
				{ type: 'sun', beat: 6.5, rays: 12 },
				{ type: 'sun', beat: 7.5, rays: 12, brightness: 3 }
			]
		},
		{
			rail: {
				id: 'cone',
				nodes: [[2, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'cone', beat: 0.5, rounds: 1, spinning: false },
				{ type: 'cone', beat: 1.5, rounds: 2, spinning: false },
				{ type: 'cone', beat: 2.5, rounds: 3, spinning: false },
				{ type: 'cone', beat: 3.5, rounds: 4, spinning: false },
				{ type: 'cone', beat: 4.5, rounds: 5, spinning: false },
				{ type: 'cone', beat: 5.5, rounds: 6, spinning: false },
				{ type: 'cone', beat: 6.5, rounds: 7, spinning: false }
			]
		},
		{
			rail: {
				id: 'spiral',
				nodes: [[3, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'spiral', beat: 0.5, rounds: 1, spinning: false },
				{ type: 'spiral', beat: 1.5, rounds: 2, spinning: false },
				{ type: 'spiral', beat: 2.5, rounds: 3, spinning: false },
				{ type: 'spiral', beat: 3.5, rounds: 4, spinning: false }
			]
		},
		{
			rail: {
				id: 'active',
				nodes: [[4, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'cone', beat: 3.5, rounds: 5, active: false, visible: true },
				{
					type: 'cone',
					beat: 4.5,
					rounds: 5,
					active: true,
					visible: false,
					actionHandler() {
						// console.log('invisible trigger')
					}
				},
				{ type: 'cone', beat: 5.5, rounds: 5, active: true },
				{ type: 'spiral', beat: 7.5, rounds: 3, active: true }
			]
		},
		{
			rail: {
				id: 'heart',
				nodes: [[5, 0, 4], 'i i i i i i i i']
			},
			color: c(),
			instruments: [
				{ type: 'eater', beat: 3.5, angle: 90 },
				{ type: 'heart', beat: 5.5, pulse: true },
				{ type: 'heart', beat: 7.5, pulse: false }
			]
		}
	]
}
