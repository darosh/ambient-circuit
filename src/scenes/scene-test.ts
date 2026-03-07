import type { SceneConfig } from '../lib/core/scene'
import { color2 as colors, colorFactory } from './utils/colors'
import { triggerHandler } from '../lib/core/trigger-handler'

import { circle, roundedRect, coil, spiral } from '../lib/core/rail-primitives'
import {
	createFloating,
	FLOATING_BOUNCING,
	FLOATING_ORBITING,
	FLOATING_ROTATING,
	FLOATING_SHAKING,
	FLOATING_SPINNING,
	FLOATING_SPRINGING,
	FLOATING_TRAMPOLINING,
	railCenter
} from './utils/floating'
import { clone } from 'rambdax'

const c = colorFactory(colors)

export const scene: SceneConfig = {
	id: 'scene-test',
	bpm: 120,
	camera: <[number, number, number]>[6.5, 10, 17].map((x) => x * 0.77),
	triggerHandler,
	rails: [
		{
			id: 'long',
			nodes: [[0, 0, 0], 'l i i u i lf i rrrr ddd ll oooo uu'],
			color: c(),
			instruments: [
				{
					beat: 7.3,
					sides: 3,
					channel: 4
				},
				{
					beat: 7.4,
					sides: 4,
					channel: 4
				},
				{
					beat: 7.5,
					sides: 5,
					channel: 4
				},
				{
					beat: 7.6,
					sides: 6,
					channel: 4
				},
				{
					beat: 7.7,
					sides: 12,
					channel: 4
				},
				{
					beat: 10.3,
					type: 'arrow',
					channel: 4
				},
				{
					beat: 10.5,
					type: 'arrow',
					kind: 'play',
					channel: 4
				},
				{
					beat: 10.7,
					type: 'arrow',
					kind: 'fwd',
					channel: 4
				},
				{
					beat: 9.25,
					fill: true,
					sides: 3,
					channel: 4
				},
				{
					beat: 9.5,
					fill: true,
					sides: 4,
					channel: 4
				},
				{
					beat: 9.75,
					fill: true,
					sides: 12,
					channel: 4
				},
				{
					beat: 4.5,
					type: 'sun',
					rays: 12,
					brightness: 3,
					channel: 4
				}
			]
		},
		{
			id: 'tri',
			offset: [-3, 0, -3],
			nodes: [
				[0, 0, 0],
				[0, 1, 0],
				[0, 2, 0],
				[0, 3, 0]
			],
			color: colors[1],
			instruments: [{ beat: 1.5, sides: 3, channel: 1 }],
			marbles: [{ type: 'poly', sides: 3 }]
		},
		{
			id: 'back',
			offset: [-4, 0, -3],
			nodes: [
				[0, 0, 0],
				[0, 1, 0]
			],
			marbles: [{ direction: 'backward' as const }],
			color: c()
		},
		{
			id: 'cones',
			offset: [3, 0, -3],
			nodes: [
				[0, 0, 0],
				[1, 0.5, 0]
			],
			marbles: [{ type: 'poly', sides: 12, mode: 'ping-pong' as const, speed: 2 }],
			instruments: [
				{ type: 'cone', beat: 0.05, align: 'tip', rounds: 5, point: 'backward', channel: 6 },
				{ type: 'cone', beat: 0.95, align: 'tip', rounds: 5, channel: 6 }
			],
			color: c()
		},
		{
			id: 'round-all', offset: [0, 0, -3], nodes: circle({ pos: { y: -0.5 } }),
			marbles: [{ type: 'poly' as const, sides: 3 }],
			color: c(),
			instruments: [
				{ type: 'heart', beat: 2.8 },
				{ type: 'heart', beat: 3 },
				{ type: 'heart', beat: 3.2 }
			]
		},
		{
			id: 'round-rect', nodes: roundedRect({ pos: { x: 3.5 } }),
			marbles: [{ type: 'poly' as const, sides: 6 }],
			color: c(),
			instruments: [
				{ sides: 4, type: 'star', beat: 1, channel: 5 },
				{ sides: 5, type: 'star', beat: 3, channel: 5 },
				{ sides: 3, type: 'whirl', beat: 5, channel: 5 },
				{ sides: 6, type: 'cross', beat: 7, channel: 5 }
			]
		},
		{
			id: 'coil', nodes: coil({ pos: { x: -3 }, lead: 1 }),
			marbles: [{ type: 'coil' as const, rounds: 4, speed: 0.5 }],
			color: c()
		},
		{
			id: 'spiral',
			offset: [0, -0.5, 0],
			nodes: spiral({ pos: { x: 0 }, lead: 1, tangent: 0.5 }),
			marbles: [{ type: 'poly' as const, sides: 4 }],
			color: c()
		},
		{
			id: 'poly-round',
			nodes: circle({ pos: { x: 0, y: 1.5 } }).map((n, i, arr) => {
				if (i === 0) return { ...(typeof n === 'object' && 'p' in n ? n : { p: n }), beat: 0 }
				if (i === arr.length - 1)
					return { ...(typeof n === 'object' && 'p' in n ? n : { p: n }), beat: 3 }
				return n
			}),
			instruments: [
				{ beat: 1.5, sides: 4, channel: 2 },
				{ beat: 2.5, sides: 5, channel: 2 }
			],
			color: c()
		},
		{
			id: 'split',
			offset: [0, 0, 2],
			nodes: [
				[-1, 0, 0],
				{
					split: {
						p: [0, 0, 0],
						weights: [1, 1],
						branches: [[{ p: [1, 1, 0], beat: 2 }], [{ p: [1, -1, 0], beat: 2 }]]
					}
				}
			],
			color: c()
		},
		{
			id: 'round-one',
			offset: [3, 0, 2],
			nodes: [[-1, 0, 0], [0, 0, 0], { p: [1, 1, 0], beat: 2, round: 'to' as const }, [1, 2, 0]],
			instruments: [
				{ type: 'heart', beat: 0.5 },
				{ type: 'spiral', beat: 2, counterCW: true },
				{ type: 'spiral', beat: 2.5 }
			],
			color: c()
		},
		{
			id: 'round-split',
			offset: [-3, 0, 2],
			nodes: [
				[-1, 0, 0],
				{
					split: {
						p: [0, 0, 0],
						weights: [1, 1],
						branches: [
							[
								{ p: [1, 1, 0], beat: 2, round: 'to' as const },
								{ p: [1, 2, 0], beat: 3 }
							],
							[
								{ p: [1, -1, 0], beat: 2, round: 'to' as const },
								{ p: [1, -2, 0], beat: 3 }
							]
						]
					}
				}
			],
			color: c()
		},
		{
			id: 'split-ping',
			offset: [-3.5, -0.5, 3],
			nodes: [
				[-1, 0, 0],
				{
					split: {
						p: [0, 0, 0],
						weights: [1, 1],
						branches: [
							[
								{ p: [1, 1, 0], beat: 2, round: 'to' as const },
								{ p: [1, 2, 0], beat: 3 }
							],
							[
								{ p: [1, -1, 0], beat: 2, round: 'to' as const },
								{ p: [1, -2, 0], beat: 3 }
							]
						]
					}
				}
			],
			marbles: [{ mode: 'ping-pong' as const }],
			instruments: [
				{
					beat: 2.5,
					path: [0],
					type: 'whirl',
					sides: 6,
					channel: 3
				},
				{
					beat: 2.5,
					path: [1],
					type: 'sun',
					rays: 0,
					channel: 1
				}
			],
			color: c()
		},
		{
			color: c(),
			id: 'square-coil',
			offset: [2, 0, 3],
			nodes: [[0, 0, 0], 'u r d l'],
			instruments: [{ beat: 3.5, sides: 12 }],
			marbles: [
				{ type: 'coil', rounds: 2 },
				{ type: 'coil', rounds: 3, start: 2 }
			]
		},
		{
			color: colors[0],
			id: 'square',
			offset: [3, 0, -4],
			nodes: [[0, 0, 0], 'u r d l'],
			instruments: [{ beat: 1.5, sides: 4 }],
			marbles: [
				{ type: 'poly', sides: 3 },
				{ type: 'poly', sides: 4, start: 2 }
			]
		},
		{
			color: colors[0],
			id: 'loop',
			offset: [0, 0, 4],
			nodes: [
				[0, 0, 0],
				[1, 0, 0.5],
				[1.5, 1, 0.3],
				{ p: [1, 2, 0], round: 'both', tangent: 0.8 },
				[0.5, 1, -0.3],
				[1, 0, -0.5],
				[2, 0, 0]
			],
			instruments: [{ beat: 1.5, sides: 4 }],
			marbles: [
				{ type: 'poly', sides: 3, mode: 'ping-pong' },
				{ type: 'ball', start: 2, direction: 'backward', mode: 'ping-pong' }
			]
		}
	]
}

const circlesScene: Omit<SceneConfig, 'id'> = {
	bpm: 120,
	polar: true,
	triggerHandler,
	rails: ((length, y, r1, r2) =>
		Array.from({ length }).map((_, i) => {
			return {
				color: c(),
				id: `id-${i}`,
				nodes: circle({
					pos: {
						x: r1 * Math.sin(Math.PI * 2 * (i / length)),
						y,
						z: r1 * Math.cos(Math.PI * 2 * (i / length))
					},
					radius: r2
				}),
				instruments: [{ type: 'star', sides: 5, beat: 2 }]
			}
		}))(12, 0, 3, 0.5)
}

export const floatingScenes: SceneConfig[] = [
	Object.assign(clone(scene), <Partial<SceneConfig>>{
		id: 'scene-floating',
		renderFactory: (_, seed) => createFloating({ seed })
	}),
	Object.assign(clone(scene), <Partial<SceneConfig>>{
		id: 'scene-shaking',
		renderFactory: (railData, seed) =>
			createFloating({ seed, rotationSeed: seed, ...FLOATING_SHAKING, pivot: railCenter(railData) })
	}),
	Object.assign(clone(scene), <Partial<SceneConfig>>{
		id: 'scene-bouncing',
		renderFactory: (_, seed) => createFloating({ seed, ...FLOATING_BOUNCING })
	}),
	Object.assign(clone(scene), <Partial<SceneConfig>>{
		id: 'scene-trampolining',
		renderFactory: (_, seed) => createFloating({ seed, ...FLOATING_TRAMPOLINING })
	}),
	Object.assign(clone(scene), <Partial<SceneConfig>>{
		id: 'scene-springing',
		renderFactory: (_, seed) => createFloating({ seed, ...FLOATING_SPRINGING })
	}),
	<SceneConfig>Object.assign(clone(circlesScene), <Partial<SceneConfig>>{
		id: 'scene-rotating',
		renderFactory: (railData, seed) =>
			createFloating({ seed, ...FLOATING_ROTATING, pivot: railCenter(railData) })
	}),
	<SceneConfig>Object.assign(clone(circlesScene), <Partial<SceneConfig>>{
		id: 'scene-orbiting',
		renderFactory: (railData, seed) =>
			createFloating({ seed, ...FLOATING_ORBITING, pivot: railCenter(railData) })
	}),
	<SceneConfig>Object.assign(clone(circlesScene), <Partial<SceneConfig>>{
		id: 'scene-spinning',
		renderFactory: (railData, seed) =>
			createFloating({ seed, ...FLOATING_SPINNING, pivot: railCenter(railData) })
	})
]
