import type { SceneConfig } from '../lib/scene'
import { colors } from './utils/colors'
import { triggerHandler } from '../lib/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-logic',
	description: 'Demo of various\ninstrument trigger actions',
	bpm: 120,
	camera: [0, 17, 15],
	names: true,
	triggerHandler,
	rails: [
		// Example 1: Direction reversal
		{
			rail: {
				id: 'reverse',
				offset: [-4, 0, 4],
				nodes: [[0, 0, 0], 'r r r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0, easing: 'easeInOutQuad' }],
			instruments: [
				{
					type: 'sun',
					beat: 4,
					actionHandler(ctx) {
						// Reverse direction (prevents immediate re-trigger)
						ctx.marble.state.reverse()
						ctx.marble.state.easing =
							ctx.marble.state.easing === 'easeInOutQuad' ? 'linear' : 'easeInOutQuad'
						ctx.scene.marbles[6].state.easing = ctx.marble.state.easing

						ctx.instrument.state.rounds = 5
						ctx.instrument.state.type = ctx.instrument.state.type === 'sun' ? 'cone' : 'sun'
						// console.log('TYPE', ctx.instrument.state.type)
					}
				}
			]
		},
		// Example 2: Speed modification
		{
			rail: {
				id: 'speed',
				offset: [-4, 0, 3],
				nodes: [[0, 0, 0], 'r r r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'poly', sides: 4, start: 0 }],
			instruments: [
				{
					type: 'arrow',
					kind: 'fwd',
					beat: 2,
					actionHandler(ctx) {
						// Double speed up to max 8x
						const newSpeed = ctx.marble.state.speed * 2
						ctx.marble.state.speed = newSpeed > 8 ? 1 : newSpeed
					}
				}
			]
		},
		// Example 3: Beat jumping
		{
			rail: {
				id: 'jump',
				offset: [-4, 0, 2],
				nodes: [[0, 0, 0], 'r r r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'coil', rounds: 2, start: 0 }],
			instruments: [
				{
					type: 'arrow',
					kind: 'play',
					beat: 2,
					actionHandler(ctx) {
						// Jump forward 4 beats
						ctx.marble.state.beat = 6
					}
				},
				{
					type: 'heart',
					beat: 6,
					actionHandler(ctx) {
						// Jump back to start
						ctx.marble.state.beat = 0
					}
				}
			]
		},
		// Example 4: Note modification
		{
			rail: {
				id: 'notes',
				offset: [-4, 0, 1],
				nodes: [[0, 0, 0], 'r r r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0, note: 60 }],
			instruments: [
				{
					beat: 2,
					sides: 3,
					channel: 2,
					actionHandler(ctx) {
						// Shift up an octave
						ctx.marble.state.note = (ctx.marble.state.note ?? 60) + 12
					}
				},
				{
					beat: 6,
					sides: 5,
					channel: 2,
					actionHandler(ctx) {
						// Reset to C4
						ctx.marble.state.note = 60
					}
				}
			]
		},
		// Example 5: Combined effects
		{
			rail: {
				id: 'combined',
				offset: [-4, 0, 0],
				nodes: [[0, 0, 0], 'r r r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0, mode: 'ping-pong' }],
			instruments: [
				{
					type: 'spiral',
					beat: 3,
					actionHandler(ctx) {
						ctx.marble.state.speed = 2

						if (ctx.instrument.state.spinning) {
							ctx.marble.state.reverse()
							ctx.instrument.state.spinning = false
						} else {
							ctx.instrument.state.spinning = true
						}
					}
				},
				{
					type: 'cone',
					beat: 5,
					actionHandler(ctx) {
						// Jump and change speed
						ctx.marble.state.beat = 1
						ctx.marble.state.speed = 1
					}
				}
			]
		},
		// Example 6: Fractional beat positions
		{
			rail: {
				id: 'fractional',
				offset: [-4, 0, -1],
				nodes: [[0, 0, 0], 'r r r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{ beat: 2.2, sides: 3, channel: 3 },
				{ beat: 2.4, sides: 4, channel: 3 },
				{ beat: 2.6, sides: 5, channel: 3 },
				{ beat: 2.8, sides: 6, channel: 3 }
			]
		},
		// Example 7: Visual transformations - instrument color
		{
			rail: {
				id: 'inst-color',
				offset: [-4, 0, -2],
				nodes: [[0, 0, 0], 'r r r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					type: 'heart',
					beat: 4,
					actionHandler(ctx) {
						// Change instrument color to red
						ctx.instrument.state.color = c()
					}
				}
			]
		},
		// Example 8: Visual transformations - sun brightness
		{
			rail: {
				id: 'sun-brightness',
				offset: [-4, 0, -3],
				nodes: [[0, 0, 0], 'r r r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'poly', sides: 3, start: 0 }],
			instruments: [
				{
					type: 'sun',
					beat: 4,
					brightness: 0,
					actionHandler(ctx) {
						ctx.instrument.state.brightness = ((ctx.instrument.state.brightness ?? 0) + 1) % 4
					}
				}
			]
		},
		// Example 9: Visual transformations - marble shape (there and back)
		{
			rail: {
				id: 'marble-shape',
				offset: [-4, 0, -4],
				nodes: [[0, 0, 0], 'r r r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					type: 'spiral',
					beat: 2,
					actionHandler(ctx) {
						// Change marble to poly
						ctx.marble.state.type = 'poly'
						ctx.marble.state.sides = 5
					}
				},
				{
					type: 'spiral',
					beat: 4,
					actionHandler(ctx) {
						// Change marble to coil
						ctx.marble.state.type = 'coil'
						ctx.marble.state.rounds = 4
					}
				},
				{
					type: 'spiral',
					beat: 6,
					actionHandler(ctx) {
						// Back to ball
						ctx.marble.state.type = 'ball'
					}
				}
			]
		},
		// Example 10: Visual transformations - marble color (there and back)
		{
			rail: {
				id: 'marble-color',
				offset: [-4, 0, -5],
				nodes: [[0, 0, 0], 'r r r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					type: 'cone',
					beat: 2,
					actionHandler(ctx) {
						ctx.rail.state.color = c()
						ctx.marble.state.color = ctx.rail.state.color
					}
				},
				{
					type: 'cone',
					beat: 5,
					actionHandler(ctx) {
						ctx.rail.state.color = c()
						ctx.marble.state.color = ctx.rail.state.color
					}
				},
				{
					type: 'cone',
					beat: 7,
					actionHandler(ctx) {
						ctx.rail.state.color = c()
						ctx.marble.state.color = ctx.rail.state.color
					}
				}
			]
		}
	]
}
