import { circle, roundedRect, coil, spiral } from './rail-primitives'
import type { Rail } from './rail'

export const rails = [
	{ rail: circle({ id: 'circle1', pos: { y: -0.5 } }), color: '#00ffff' },
	{ rail: roundedRect({ id: 'rect1', pos: { x: 3.5 } }), color: '#ff00ff' },
	{ rail: coil({ id: 'coil1', pos: { x: -3 }, lead: 1 }), color: '#ffff00' },
	{ rail: spiral({ id: 'spiral1', pos: { x: 0 }, lead: 1 }), color: '#ff0000' },
	{ rail: circle({ id: 'circle2', pos: { x: 0, y: 1.5 } }), color: '#ffffff' },
	// Fork example: main path a-b-c with split at b
	{
		rail: {
			id: 'fork-demo',
			offset: [0, 0, 2],
			nodes: [
				[-1, 0, 0], // a - beat 0
				{
					split: {
						p: [0, 0, 0],  // b - beat 1 (split point)
						weights: [1, 1], // alternate between branches
						branches: [
							[
								{ p: [1, 1, 0], beat: 2 }
							],
							[
								{ p: [1, -1, 0], beat: 2 }
							]
						]
					}
				}
			]
		} satisfies Rail,
		color: '#00ff00'
	},
	{
		rail: {
			id: 'fork-demo2',
			offset: [-3, 0, 2],
			nodes: [
				[-1, 0, 0], // a - beat 0
				{
					split: {
						p: [0, 0, 0],  // b - beat 1 (split point)
						weights: [1, 1], // alternate between branches
						branches: [
							[
								{ p: [1, 1, 0], beat: 2 }
							],
							[
								{ p: [1, -1, 0], beat: 2 }
							]
						]
					}
				}
			]
		} satisfies Rail,
		color: '#00ff00'
	}
] as const
