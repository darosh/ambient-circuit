import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'

let ci = 0
const c = () => colors[ci++ % colors.length]

// Store timer IDs for cleanup
const timers: number[] = []

export const scene: SceneConfig = {
	id: 'scene-ctx-test',
	bpm: 120,
	globalBeatHandler(ctx) {
		if (ctx.phase === 'destroy') {
			console.log('[CTX] Cleanup - clearing', timers.length, 'timers')
			// Clear all timers on destroy
			timers.forEach((id) => clearTimeout(id))
			timers.length = 0
		}
	},
	triggerHandler(ctx) {
		console.log('TRIGGER', ctx.railId, ctx.beat, ctx.marbleBeat)

		// Signal visual feedback
		ctx.instrument.instrument.signal!.intensity = 1
		ctx.marble.marble.signal.intensity = 1

		// Execute instrument action if present
		if (ctx.instrument.instrument.actionHandler) {
			ctx.instrument.instrument.actionHandler(ctx)
		}
	},
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
						console.log('Reversing all marbles!')
						// Reverse ALL marbles in the scene
						ctx.scene.marbles.forEach((_m) => {
							// _m.state.reverse()
						})
					}
				}
			]
		},
		// Example 2: Target another marble
		{
			rail: {
				id: 'target-other',
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
							console.log('Speeding up marble 0')
							targetMarble.state.speed = targetMarble.state.speed * 1.5

							if (targetMarble.state.speed > 8) {
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
					beat: 3,
					actionHandler(ctx) {
						console.log('Blinking all instruments')
						// Hide all instruments briefly
						ctx.scene.instruments.forEach((inst) => {
							inst.state.visible = false
						})
						const timer = setTimeout(() => {
							ctx.scene.instruments.forEach((inst) => {
								inst.state.visible = true
							})
						}, 300)
						timers.push(timer)
					}
				}
			]
		},
		// Example 4: Toggle active state (disables instrument triggers when inactive)
		{
			rail: {
				id: 'toggle-active',
				offset: [-3, 0, -1],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					type: 'spiral',
					beat: 2,
					actionHandler(ctx) {
						// Toggle this instrument's active state - should fire once, then never again
						console.log('Toggling instrument active to false (should fire once only)')
						ctx.instrument.state.active = false
					}
				},
				{
					type: 'cone',
					beat: 4,
					active: false, // Start inactive - should never fire
					actionHandler(_ctx) {
						console.log('ERROR: This should NOT fire (instrument is inactive)')
					}
				}
			]
		}
	]
}
