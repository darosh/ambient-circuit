import type { SceneConfig } from '../lib/core/scene'
import { colors } from './utils/colors'
import { triggerHandler } from '../lib/core/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-orientation',
	bpm: 80,
	camera: [6, 12, 12],
	target: [0, 0, 0],
	triggerHandler,
	rails: [
		// Horizontal rail (Z-axis forward)
		{
			rail: {
				id: 'horizontal-z',
				nodes: [
					[-3, 0, -2],
					[-3, 0, 2]
				]
			},
			color: c(),
			instruments: [{ type: 'poly', beat: 0.5, sides: 3 }],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		// Horizontal rail (X-axis right)
		{
			rail: {
				id: 'horizontal-x',
				nodes: [
					[-2, 0, -4],
					[2, 0, -4]
				]
			},
			color: c(),
			instruments: [{ type: 'poly', beat: 0.5, sides: 3 }],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		// Vertical rail (Y-axis up)
		{
			rail: {
				id: 'vertical-y',
				nodes: [
					[4, -2, 0],
					[4, 2, 0]
				]
			},
			color: c(),
			instruments: [{ type: 'poly', beat: 0.5, sides: 3 }],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		// Diagonal XZ plane
		{
			rail: {
				id: 'diagonal-xz',
				offset: [2, -2, 1],
				nodes: [
					[-2, 0, 2],
					[2, 0, -2]
				]
			},
			color: c(),
			instruments: [{ type: 'poly', beat: 0.5, sides: 3 }],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		// Diagonal XY plane (climbing)
		{
			rail: {
				id: 'diagonal-xy',
				nodes: [
					[-4, -1, 4],
					[0, 1, 4]
				]
			},
			color: c(),
			instruments: [{ type: 'poly', beat: 0.5, sides: 3 }],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		// Curved rail (horizontal curve)
		{
			rail: {
				id: 'curve-horizontal',
				nodes: [
					[-2, 0, 0, 'both' as const],
					[-2, 0, 2, 'both' as const],
					[0, 0, 2, 'both' as const],
					[0, 0, 0, 'both' as const]
				]
			},
			color: c(),
			instruments: [
				{ type: 'poly', beat: 0.5, sides: 3 },
				{ type: 'poly', beat: 1.5, sides: 3 },
				{ type: 'poly', beat: 2.5, sides: 3 }
			],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		// Spiral going up
		{
			rail: {
				id: 'spiral-up',
				nodes: [
					[2, -1, -2, 'both' as const],
					[3, -0.5, -2, 'both' as const],
					[3, 0, -1, 'both' as const],
					[2, 0.5, -1, 'both' as const],
					[2, 1, -2, 'both' as const]
				]
			},
			color: c(),
			instruments: [
				{ type: 'poly', beat: 0.5, sides: 3 },
				{ type: 'poly', beat: 1.5, sides: 3 },
				{ type: 'poly', beat: 2.5, sides: 3 }
			],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		// Circle (closed loop)
		{
			rail: {
				id: 'circle',
				nodes: [
					[0, -2, -2, 'both' as const],
					[1, -2, -2, 'both' as const],
					[1, -2, -3, 'both' as const],
					[0, -2, -3, 'both' as const],
					[0, -2, -2, 'both' as const]
				]
			},
			color: c(),
			instruments: [
				{ type: 'poly', beat: 0, sides: 3 },
				{ type: 'poly', beat: 1, sides: 3 },
				{ type: 'poly', beat: 2, sides: 3 },
				{ type: 'poly', beat: 3, sides: 3 }
			],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		// S-curve (horizontal snake)
		{
			rail: {
				id: 's-curve',
				nodes: [
					[-4, 2, -4, 'both' as const],
					[-3, 2, -4, 'both' as const],
					[-2, 2, -3, 'both' as const],
					[-1, 2, -3, 'both' as const],
					[0, 2, -4, 'both' as const]
				]
			},
			color: c(),
			instruments: [
				{ type: 'poly', beat: 0.5, sides: 3 },
				{ type: 'poly', beat: 1.5, sides: 3 },
				{ type: 'poly', beat: 2.5, sides: 3 }
			],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		// Helix (3D spiral)
		{
			rail: {
				id: 'helix',
				nodes: [
					[4, 0, 4, 'both' as const],
					[4.5, 0.3, 3.5, 'both' as const],
					[4, 0.6, 3, 'both' as const],
					[3.5, 0.9, 3.5, 'both' as const],
					[4, 1.2, 4, 'both' as const],
					[4.5, 1.5, 3.5, 'both' as const]
				]
			},
			color: c(),
			instruments: [
				{ type: 'poly', beat: 1, sides: 3 },
				{ type: 'poly', beat: 3, sides: 3 }
			],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		{
			rail: {
				id: 'square',
				offset: [3, 0, -4],
				nodes: [
					{ p: [0, 0, 0] },
					{ p: [1, 0, 1] },
					{ p: [2, 0, 0] },
					{ p: [1, 0, -1] },
					{ p: [0, 0, 0] }
				]
			},
			color: c(),
			instruments: [
				{ type: 'poly', beat: 1.5, sides: 3 },
				{ type: 'poly', beat: 2.5, sides: 3 },
				{ type: 'poly', beat: 3.5, sides: 3 },
				{ type: 'poly', beat: 0.5, sides: 3 }
			],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		// Tilt examples
		{
			rail: {
				id: 'tilt-45',
				offset: [-4, 0, 2],
				tilt: 45,
				nodes: [
					[0, 0, 0],
					[0, 0, 2]
				]
			},
			color: c(),
			instruments: [{ type: 'poly', beat: 0.5, sides: 3 }],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		{
			rail: {
				id: 'tilt-90',
				offset: [-4, 0, -1],
				tilt: 90,
				nodes: [
					[0, 0, 0],
					[0, 0, 2]
				]
			},
			color: c(),
			instruments: [{ type: 'poly', beat: 0.5, sides: 3 }],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		{
			rail: {
				id: 'tilt-180',
				offset: [-4, 0, -4],
				tilt: 180,
				nodes: [
					[0, 0, 0],
					[0, 0, 2]
				]
			},
			color: c(),
			instruments: [{ type: 'poly', beat: 0.5, sides: 3 }],
			marbles: [{ type: 'poly', sides: 3 }]
		}
	]
}
