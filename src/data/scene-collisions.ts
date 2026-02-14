import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'
import { triggerHandler } from '../lib/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-collisions',
	bpm: 90,
	triggerHandler,
	bounceHandler: (ctx) => {
		// Flash both marbles white on collision
		ctx.marble1.state.color = '#ff0000'
		ctx.marble2.state.color = '#ff0000'
		setTimeout(() => {
			ctx.marble1.state.color = undefined
			ctx.marble2.state.color = undefined
		}, 200)
	},
	bouncerOnlyMode: false,
	camera: [0, 11, 8],
	target: [0, 1, 0],
	rails: [
		// Simple rail with bouncer marbles
		{
			rail: {
				id: 'two-bouncers',
				nodes: [[-3, 0, -1], 'r r r r r r']
			},
			color: c(),
			marbles: [
				// Two bouncer marbles starting at opposite ends, moving toward each other
				{ start: 1, speed: 0.5, direction: 'forward', bouncer: true, type: 'ball' },
				{ start: 5, speed: 0.5, direction: 'backward', bouncer: true, type: 'ball' }
			]
		},

		// Rail with mixed bouncer and non-bouncer (both affected if EITHER is bouncer)
		{
			rail: {
				id: 'one-bouncer',
				nodes: [[-3, 0, -2], 'r r r r r r']
			},
			color: c(),
			marbles: [
				// Bouncer marble - will affect non-bouncer on collision
				{ start: 1, speed: 1.5, direction: 'forward', bouncer: true, type: 'poly', sides: 3 },
				// Non-bouncer marble - will still bounce when hit by bouncer
				{ start: 4, speed: 0.5, direction: 'forward', bouncer: false, type: 'ball' }
			]
		},

		// Multiple bouncers at different speeds (chaotic)
		{
			rail: {
				id: 'chaos',
				nodes: [[-1.5, 0, 0], 'r r r orb ol l l l ilb ir']
			},
			color: c(),
			marbles: [
				{ start: 0, speed: 0.4, direction: 'forward', bouncer: true, type: 'coil', rounds: 2 },
				{ start: 2, speed: 0.6, direction: 'forward', bouncer: true, type: 'poly', sides: 4 },
				{ start: 4, speed: 0.5, direction: 'backward', bouncer: true, type: 'poly', sides: 12 },
				{ start: 6, speed: 0.7, direction: 'backward', bouncer: true, type: 'ball' }
			]
		},

		// Ping-pong rail with bouncer
		{
			rail: {
				id: 'ping-pong',
				nodes: [[-2, 0, -3], 'r r r r']
			},
			color: c(),
			marbles: [
				{ start: 0, speed: 0.8, mode: 'ping-pong', bouncer: true, type: 'ball' },
				{ start: 2, speed: 0.6, mode: 'ping-pong', bouncer: true, type: 'poly', sides: 6 }
			]
		}
	]
}
