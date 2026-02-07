import { circle, roundedRect, coil, spiral } from './rail-primitives'
import type { Rail, Vec3 } from './rail'
import type { MarbleDirection, MarbleSequenceMode } from './marble'
import type { Instrument } from './instrument'

export type RailData = {
	rail: Rail
	color: string
	mode?: MarbleSequenceMode
	direction?: MarbleDirection
	instruments?: Instrument[]
}

export const rails: RailData[] = [
	{
		rail: {
			id: 'line',
			offset: [-3, 0, -3] as Vec3,
			nodes: [[0, 0, 0] as Vec3, [0, 1, 0] as Vec3, [0, 2, 0] as Vec3, [0, 3, 0] as Vec3]
		},
		color: '#ffff88',
		instruments: [
			{
				beat: 1.5,
				sides: 3,
				color: '#ff0000',
				onTrigger: (ctx) => console.debug('🎵 Instrument triggered', ctx)
			}
		]
	},
	{
		rail: {
			id: 'line-back',
			offset: [-4, 0, -3] as Vec3,
			nodes: [[0, 0, 0] as Vec3, [0, 1, 0] as Vec3]
		},
		direction: 'backward',
		color: '#ffff88'
	},
	{
		rail: {
			id: 'line-ping',
			offset: [3, 0, -3] as Vec3,
			nodes: [[0, 0, 0] as Vec3, [0, 1, 0] as Vec3]
		},
		mode: 'ping-pong' as MarbleSequenceMode,
		color: '#ffff88'
	},
	{
		rail: { id: 'circle1', offset: [0, 0, -3] as Vec3, nodes: circle({ pos: { y: -0.5 } }) },
		color: '#00ffff'
	},
	{ rail: { id: 'rect1', nodes: roundedRect({ pos: { x: 3.5 } }) }, color: '#ff00ff' },
	{ rail: { id: 'coil1', nodes: coil({ pos: { x: -3 }, lead: 1 }) }, color: '#ffff00' },
	{ rail: { id: 'spiral1', nodes: spiral({ pos: { x: 0 }, lead: 1, tangent: .5 }) }, color: '#ff0000' },
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
			{
				beat: 1.5,
				sides: 7,
				color: '#ff0000',
				onTrigger: (ctx) => console.debug('🎵 Instrument triggered', ctx)
			},
			{
				beat: 2.5,
				sides: 7,
				color: '#ffffff',
				onTrigger: (ctx) => console.debug('🎵 Instrument triggered', ctx)
			}
		],
		color: '#ffffff'
	},
	// Fork example: main path a-b-c with split at b
	{
		rail: {
			id: 'fork-demo',
			offset: [0, 0, 2] as Vec3,
			nodes: [
				[-1, 0, 0] as Vec3, // a - beat 0
				{
					split: {
						p: [0, 0, 0] as Vec3, // b - beat 1 (split point)
						weights: [1, 1], // alternate between branches
						branches: [[{ p: [1, 1, 0] as Vec3, beat: 2 }], [{ p: [1, -1, 0] as Vec3, beat: 2 }]]
					}
				}
			]
		} satisfies Rail,
		color: '#00ff00'
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
		color: '#ff8888'
	},
	{
		rail: {
			id: 'fork-demo2',
			offset: [-3, 0, 2] as Vec3,
			nodes: [
				[-1, 0, 0] as Vec3, // a - beat 0
				{
					split: {
						p: [0, 0, 0] as Vec3, // b - beat 1 (split point)
						weights: [1, 1], // alternate between branches
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
		color: '#8800ff'
	},
	{
		rail: {
			id: 'fork-ping',
			offset: [-3, 0, 3] as Vec3,
			nodes: [
				[-1, 0, 0] as Vec3, // a - beat 0
				{
					split: {
						p: [0, 0, 0] as Vec3, // b - beat 1 (split point)
						weights: [1, 1], // alternate between branches
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
		mode: 'ping-pong',
		instruments: [
			{
				beat: 2.5,
				path: [0],
				sides: 7,
				color: '#ffffff',
				onTrigger: (ctx) => console.debug('🎵 Instrument triggered', ctx)
			},
			{
				beat: 2.5,
				path: [1],
				sides: 7,
				color: '#ff00ff',
				onTrigger: (ctx) => console.debug('🎵 Instrument triggered', ctx)
			}
		],
		color: '#8800ff'
	}
]
