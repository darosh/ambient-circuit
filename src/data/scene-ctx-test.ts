import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'
import { globalHandlerFactory, triggerHandler } from '../lib/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

const globalBeatHandler = globalHandlerFactory()

export const scene: SceneConfig = {
	id: 'scene-ctx-test',
	bpm: 120,
	camera: [0, 13, 6],
	globalBeatHandler,
	triggerHandler,
	rails: [
		// Example 1: Reverse all marbles
		{
			rail: {
				id: 'reverse-all',
				offset: [-3, 0, 2],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					type: 'sun',
					beat: 3,
					actionHandler(ctx) {
						// console.log('Reversing all marbles!')
						// Reverse ALL marbles in the scene
						ctx.scene.marbles.forEach((_m) => {
							_m.state.reverse()
						})

						// const otherMarble = ctx.scene.marbles.find(
						// 	(x) => x.marble.config.resolvedRail.id === 'target-other'
						// )
						// console.log('Other marble at: ', otherMarble?.marble.currentBeat)
					}
				}
			]
		},
		// Example 2: Target another marble
		{
			rail: {
				id: 'speed-up&down-bottom',
				offset: [-3, 0, 1],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'poly', sides: 4, start: 0, mode: 'ping-pong' }],
			instruments: [
				{
					type: 'arrow',
					kind: 'fwd',
					beat: 2,
					actionHandler(ctx) {
						// Find marble 0 (on first rail) and speed it up
						const targetMarble = ctx.scene.marbles[0]

						if (targetMarble) {
							// console.log('Other: speeding up marble 0')
							targetMarble.state.speed = targetMarble.state.speed * 1.5

							if (targetMarble.state.speed > 4) {
								targetMarble.state.speed = 1
							}
						}
					}
				}
			]
		},
		// Example 3: Blink all instruments (with cleanup)
		{
			rail: {
				id: 'blink-instruments',
				offset: [-3, 0, 0],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'coil', rounds: 2, start: 0 }],
			instruments: [
				{
					type: 'heart',
					beat: 1,
					actionHandler(ctx) {
						// console.log('Blinking all instruments')
						// Hide all instruments briefly
						ctx.scene.instruments.forEach((inst) => {
							inst.state.visible = false
						})
						globalBeatHandler.setTimeout(() => {
							ctx.scene.instruments.forEach((inst) => {
								inst.state.visible = true
							})
						}, 50)
					}
				}
			]
		},
		// Example 4: Toggle active state (disables instrument triggers when inactive)
		{
			rail: {
				id: 'toggle-spinning',
				offset: [-3, 0, -1],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0, speed: 2 }],
			instruments: [
				{
					type: 'spiral',
					beat: 2,
					spinning: false,
					actionHandler(_ctx) {
						_ctx.instrument.state.spinning = !_ctx.instrument.state.spinning
					}
				},
				{
					type: 'cone',
					beat: 4,
					spinning: false, // Start inactive - should never fire
					actionHandler(_ctx) {
						_ctx.instrument.state.spinning = !_ctx.instrument.state.spinning
					}
				}
			]
		},
		{
			rail: {
				id: 'toggle-color',
				offset: [-3, 0, -2],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					type: 'sun',
					beat: 2,
					rays: 12,
					actionHandler(ctx) {
						ctx.rail.state.color = c()
						ctx.marble.state.color = ctx.rail.state.color
					}
				},
				{
					type: 'sun',
					beat: 4,
					rays: 12,
					actionHandler(ctx) {
						ctx.rail.state.color = c()
						ctx.marble.state.color = ctx.rail.state.color
					}
				}
			]
		}
	]
}
