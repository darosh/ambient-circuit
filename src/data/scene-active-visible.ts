import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'
import { triggerHandler } from '../lib/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-active-visible',
	bpm: 120,
	camera: [0, 12, 7],
	globalBeatResolution: 1, // every half beat
	globalBeatHandler(_ctx) {
		_ctx.scene.marbles[3].state.visible = false
	},
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'active-setter',
				offset: [-4, 0, -3],
				nodes: [[0, 0, 0], 'ib rb ob lb']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					type: 'sun',
					beat: 0.5,
					actionHandler(ctx) {
						ctx.scene.instruments[1].state.active = !ctx.scene.instruments[1].state.active
						ctx.scene.instruments[1].state.brightness = ctx.scene.instruments[1].state.active
							? 3
							: 0
					}
				}
			]
		},
		{
			rail: {
				id: 'active-getter',
				offset: [-2, 0, -3],
				nodes: [[0, 0, 0], 'ib rb ob lb']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [{ type: 'sun', beat: 2.5, rays: 12, brightness: 0, active: false }]
		},
		{
			rail: {
				id: 'invisible',
				offset: [1, 0, -3],
				nodes: [[0, 0, 0], 'ib rb ob lb']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					type: 'sun',
					beat: 0.5,
					actionHandler(ctx) {
						ctx.instrument.state.visible = false
						ctx.scene.marbles[3].state.reverse()
					}
				}
			]
		},
		{
			rail: {
				id: 'circle-end-ping',
				offset: [3, 0, -3],
				nodes: [[0, 0, 0], 'ib rb ob lb']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					beat: 0.9,
					type: 'heart',
					pulse: true,
					actionHandler(ctx) {
						ctx.marble.state.visible = !ctx.marble.state.visible
					}
				},
				{
					beat: 0.1,
					type: 'heart',
					pulse: true,
					actionHandler(ctx) {
						ctx.marble.state.visible = !ctx.marble.state.visible
					}
				}
			]
		},
		{
			rail: {
				id: 'swap',
				offset: [-0.5, 0, 0],
				nodes: [[0, 0, 0], 'ib rb ob lb']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					beat: 2.5,
					type: 'arrow',
					kind: 'rec',
					actionHandler(ctx) {
						// ctx.instrument.state.type = 'sun'
						ctx.instrument.state.kind = ctx.instrument.state.kind === 'rec' ? 'stop' : 'rec'
						ctx.marble.state.type = ctx.marble.state.type === 'coil' ? 'poly' : 'coil'
					}
				}
			]
		}
	]
}
