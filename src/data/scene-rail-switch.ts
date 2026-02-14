import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'
import { triggerHandler } from '../lib/trigger-handler'

export const scene: SceneConfig = {
	id: 'scene-rail-switch',
	bpm: 120,
	triggerHandler,
	rails: [
		// Pattern 1: Ping-pong between 2 rails (rail-a / rail-b)
		{
			rail: {
				id: 'rail-a',
				offset: [-4, 0, -4],
				nodes: [
					[0, 0, 0],
					[3, 0, 0]
				]
			},
			color: colors[0],
			instruments: [
				{
					beat: 1,
					type: 'arrow',
					kind: 'fwd',
					actionHandler(ctx) {
						ctx.marble.state.railId = ctx.marble.state.railId === 'rail-a' ? 'rail-b' : 'rail-a'
						ctx.marble.state.beat = 0 // restart from beginning
					}
				}
			],
			marbles: [{ start: 0 }]
		},
		{
			rail: {
				id: 'rail-b',
				offset: [1, 0, -4],
				nodes: [
					[0, 0, 0],
					[3, 0, 0]
				]
			},
			marbles: false,
			color: colors[1],
			instruments: [
				{
					beat: 1,
					type: 'arrow',
					kind: 'fwd',
					actionHandler(ctx) {
						ctx.marble.state.railId = ctx.marble.state.railId === 'rail-a' ? 'rail-b' : 'rail-a'
						ctx.marble.state.beat = 0
					}
				}
			]
		},

		// Pattern 2: Circular routing through 3 rails
		{
			rail: {
				id: 'rail-1',
				offset: [-4, 0, -2],
				nodes: [
					[0, 0, 0],
					[2, 0, 0]
				]
			},
			color: colors[2],
			instruments: [
				{
					beat: 1,
					type: 'arrow',
					kind: 'play',
					actionHandler(ctx) {
						const railMap = { 'rail-1': 'rail-2', 'rail-2': 'rail-3', 'rail-3': 'rail-1' }
						const currentRail = ctx.marble.state.railId
						const nextRail = railMap[currentRail as keyof typeof railMap]
						if (nextRail) {
							ctx.marble.state.railId = nextRail
						}
					}
				}
			],
			marbles: [{ start: 0, type: 'coil', rounds: 4 }]
		},
		{
			rail: {
				id: 'rail-2',
				offset: [-1, 0, -2],
				nodes: [
					[0, 0, 0],
					[2, 0, 0]
				]
			},
			color: colors[3],
			marbles: false,
			instruments: [
				{
					beat: 1,
					type: 'arrow',
					kind: 'play',
					actionHandler(ctx) {
						const railMap = { 'rail-1': 'rail-2', 'rail-2': 'rail-3', 'rail-3': 'rail-1' }
						const currentRail = ctx.marble.state.railId
						const nextRail = railMap[currentRail as keyof typeof railMap]
						if (nextRail) {
							ctx.marble.state.railId = nextRail
						}
					}
				}
			]
		},
		{
			rail: {
				id: 'rail-3',
				offset: [2, 0, -2],
				nodes: [
					[0, 0, 0],
					[2, 0, 0]
				]
			},
			color: colors[4],
			instruments: [
				{
					beat: 1,
					type: 'arrow',
					kind: 'play',
					actionHandler(ctx) {
						const railMap = { 'rail-1': 'rail-2', 'rail-2': 'rail-3', 'rail-3': 'rail-1' }
						const currentRail = ctx.marble.state.railId
						const nextRail = railMap[currentRail as keyof typeof railMap]
						if (nextRail) {
							ctx.marble.state.railId = nextRail
						}
					}
				}
			]
		},

		// // Pattern 3: Conditional switching based on speed
		{
			rail: {
				id: 'rail-fast',
				offset: [-4.5, 0, 0],
				nodes: [[0, 0, 0], { p: [4, 0, 0], beat: 8 }]
			},
			color: colors[4],
			instruments: [
				{
					beat: 8,
					type: 'sun',
					brightness: 3,
					actionHandler(ctx) {
						// Switch to fast or slow rail based on speed
						const isFast = ctx.marble.state.speed > 1
						ctx.marble.state.railId = isFast ? 'rail-slow' : 'rail-fast'
						ctx.marble.state.speed = isFast ? 0.5 : 2 // toggle speed
					}
				}
			],
			marbles: [{ start: 0, speed: 2 }]
		},
		{
			rail: {
				id: 'rail-slow',
				offset: [0.5, 0, 0],
				nodes: [[0, 0, 0], { p: [4, 0, 0], beat: 8 }]
			},
			color: colors[0],
			instruments: [
				{
					beat: 8,
					type: 'sun',
					brightness: 1,
					actionHandler(ctx) {
						const isFast = ctx.marble.state.speed > 1
						ctx.marble.state.railId = isFast ? 'rail-slow' : 'rail-fast'
						ctx.marble.state.speed = isFast ? 0.5 : 2
					}
				}
			]
		}
	]
}
