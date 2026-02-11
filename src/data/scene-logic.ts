import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-logic',
	bpm: 120,
	triggerHandler(ctx) {
		console.log('TRIGGER', ctx.railId, ctx.beat, ctx.marbleBeat)

		ctx.instrument.signal!.intensity = 1
		ctx.marble.signal.intensity = 1

		if (ctx.instrument.actionHandler) {
			ctx.instrument.actionHandler(ctx)
		}
	},
	rails: [
		// Example 1: Direction reversal
		{
			rail: {
				id: 'reverse',
				offset: [-4, 0, 4],
				nodes: [[0, 0, 0], 'r r r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					type: 'sun',
					beat: 4,
					actionHandler(ctx) {
						// Reverse direction (prevents immediate re-trigger)
						ctx.state.reverse()
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
						const newSpeed = ctx.state.speed * 2
						ctx.state.speed = newSpeed > 8 ? 1 : newSpeed
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
						// Jump forward 4 beats, does not work
						// ctx.state.shiftBeat(4)
						// does not work as well
						ctx.state.beat = 6
					}
				},
				{
					type: 'heart',
					beat: 6,
					actionHandler(ctx) {
						// Jump back to start
						ctx.state.beat = 0
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
					midiChannel: 2,
					actionHandler(ctx) {
						// Shift up an octave
						ctx.state.note = (ctx.state.note ?? 60) + 12
					}
				},
				{
					beat: 6,
					sides: 5,
					midiChannel: 2,
					actionHandler(ctx) {
						// Reset to C4
						ctx.state.note = 60
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
						// Speed up and reverse
						ctx.state.speed = 2

						if (Math.random() > 0.5) {
							ctx.state.reverse()
						}
					}
				},
				{
					type: 'cone',
					beat: 5,
					actionHandler(ctx) {
						// Jump and change speed
						ctx.state.beat = 1
						ctx.state.speed = 1
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
				{ beat: 2.2, sides: 3, midiChannel: 3 },
				{ beat: 2.4, sides: 4, midiChannel: 3 },
				{ beat: 2.6, sides: 5, midiChannel: 3 },
				{ beat: 2.8, sides: 6, midiChannel: 3 }
			]
		}
	]
}
