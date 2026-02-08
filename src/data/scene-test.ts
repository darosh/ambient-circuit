import { circle, roundedRect, coil, spiral } from '../lib/rail-primitives'
import { triggerHandler } from '../lib/trigger-handler'

import type { Vec3 } from '../lib/rail'
import type { Rail } from '../lib/rail'
import type { SceneConfig } from '../lib/scene'

const colors = ['#0000ff', '#ff00ff', '#ff0000', '#ff8888', '#8800ff']
let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-test',
	bpm: 120,
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'path',
				nodes: [[0, 0, 0], 'l i ib u i lb i rrrr ddd ll oooo uu']
			},
			color: c(),
			instruments: [
				{
					beat: 7.3,
					sides: 3,
					midiChannel: 4
				},
				{
					beat: 7.4,
					sides: 4,
					midiChannel: 4
				},
				{
					beat: 7.5,
					sides: 5,
					midiChannel: 4
				},
				{
					beat: 7.6,
					sides: 6,
					midiChannel: 4
				},
				{
					beat: 7.7,
					sides: 12,
					midiChannel: 4
				}
			]
		},
		{
			rail: {
				id: 'line',
				offset: [-3, 0, -3] as Vec3,
				nodes: [[0, 0, 0] as Vec3, [0, 1, 0] as Vec3, [0, 2, 0] as Vec3, [0, 3, 0] as Vec3]
			},
			color: colors[1],
			instruments: [{ beat: 1.5, sides: 3, midiChannel: 1 }]
		},
		{
			rail: {
				id: 'line-back',
				offset: [-4, 0, -3] as Vec3,
				nodes: [[0, 0, 0] as Vec3, [0, 1, 0] as Vec3]
			},
			marbles: [{ direction: 'backward' as const }],
			color: c()
		},
		{
			rail: {
				id: 'line-ping',
				offset: [3, 0, -3] as Vec3,
				nodes: [[0, 0, 0] as Vec3, [0, 1, 0] as Vec3]
			},
			marbles: [{ mode: 'ping-pong' as const, speed: 2 }],
			color: c()
		},
		{
			rail: { id: 'circle1', offset: [0, 0, -3] as Vec3, nodes: circle({ pos: { y: -0.5 } }) },
			color: c()
		},
		{
			rail: { id: 'rect1', nodes: roundedRect({ pos: { x: 3.5 } }) },
			color: c(),
			instruments: [
				{ sides: 4, type: 'star', beat: 1, midiChannel: 5 },
				{ sides: 5, type: 'star', beat: 3, midiChannel: 5 },
				{ sides: 3, type: 'whirl', beat: 5, midiChannel: 5 },
				{ sides: 6, type: 'cross', beat: 7, midiChannel: 5 }
			]
		},
		{ rail: { id: 'coil1', nodes: coil({ pos: { x: -3 }, lead: 1 }) }, color: c() },
		{
			rail: { id: 'spiral1', nodes: spiral({ pos: { x: 0 }, lead: 1, tangent: 0.5 }) },
			color: c()
		},
		{
			rail: {
				id: 'circle2',
				nodes: circle({ pos: { x: 0, y: 1.5 } }).map((n, i, arr) => {
					if (i === 0)
						return { ...(typeof n === 'object' && 'p' in n ? n : { p: n as Vec3 }), beat: 0 }
					if (i === arr.length - 1)
						return { ...(typeof n === 'object' && 'p' in n ? n : { p: n as Vec3 }), beat: 3 }
					return n
				})
			},
			instruments: [
				{ beat: 1.5, sides: 4, midiChannel: 2 },
				{ beat: 2.5, sides: 5, midiChannel: 2 }
			],
			color: c()
		},
		{
			rail: {
				id: 'fork-demo',
				offset: [0, 0, 2] as Vec3,
				nodes: [
					[-1, 0, 0] as Vec3,
					{
						split: {
							p: [0, 0, 0] as Vec3,
							weights: [1, 1],
							branches: [[{ p: [1, 1, 0] as Vec3, beat: 2 }], [{ p: [1, -1, 0] as Vec3, beat: 2 }]]
						}
					}
				]
			} satisfies Rail,
			color: c()
		},
		{
			rail: {
				id: 'round-test',
				offset: [3, 0, 2] as Vec3,
				nodes: [
					[-1, 0, 0] as Vec3,
					[0, 0, 0] as Vec3,
					{ p: [1, 1, 0] as Vec3, beat: 2, round: 'to' as const },
					[1, 2, 0] as Vec3
				]
			},
			color: c()
		},
		{
			rail: {
				id: 'fork-demo2',
				offset: [-3, 0, 2] as Vec3,
				nodes: [
					[-1, 0, 0] as Vec3,
					{
						split: {
							p: [0, 0, 0] as Vec3,
							weights: [1, 1],
							branches: [
								[
									{ p: [1, 1, 0] as Vec3, beat: 2, round: 'to' as const },
									{ p: [1, 2, 0] as Vec3, beat: 3 }
								],
								[
									{ p: [1, -1, 0] as Vec3, beat: 2, round: 'to' as const },
									{ p: [1, -2, 0] as Vec3, beat: 3 }
								]
							]
						}
					}
				]
			} satisfies Rail,
			color: c()
		},
		{
			rail: {
				id: 'fork-ping',
				offset: [-3, 0, 3] as Vec3,
				nodes: [
					[-1, 0, 0] as Vec3,
					{
						split: {
							p: [0, 0, 0] as Vec3,
							weights: [1, 1],
							branches: [
								[
									{ p: [1, 1, 0] as Vec3, beat: 2, round: 'to' as const },
									{ p: [1, 2, 0] as Vec3, beat: 3 }
								],
								[
									{ p: [1, -1, 0] as Vec3, beat: 2, round: 'to' as const },
									{ p: [1, -2, 0] as Vec3, beat: 3 }
								]
							]
						}
					}
				]
			} satisfies Rail,
			marbles: [{ mode: 'ping-pong' as const }],
			instruments: [
				{
					beat: 2.5,
					path: [0],
					sides: 6,
					midiChannel: 3
				},
				{
					beat: 2.5,
					path: [1],
					sides: 7,
					midiChannel: 1
				}
			],
			color: c()
		}
	]
}
