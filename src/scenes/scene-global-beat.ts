import type { SceneConfig } from '../lib/core/scene'
import { colors } from './utils/colors'
import { globalHandlerFactory, triggerHandler } from '../lib/core/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-global-beat',
	bpm: 120,
	camera: [0, 10, 7],
	globalBeatResolution: 1, // every half beat
	globalBeatHandler: globalHandlerFactory(function (ctx) {
		ctx.scene.instruments[0].state.visible = false

		this.setTimeout(() => {
			ctx.scene.instruments[0]!.state.visible = true
		}, 100)
	}),
	triggerHandler,
	rails: [
		// Simple rail with instrument at downbeats
		{
			id: 'downbeats',
			offset: [-4, 0, 0],
			nodes: [[0, 0, 0], 'r r r r r r r r'],
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{ type: 'sun', beat: 0 },
				{ type: 'sun', beat: 4 },
				{ type: 'sun', beat: 8 }
			]
		},
		// Simple rail with instrument at half beats
		{
			id: 'half-beats',
			offset: [-4, 0, 1],
			nodes: [[0, 0, 0], 'r r r r r r r r'],
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{ type: 'sun', beat: 0.5 },
				{ type: 'sun', beat: 4 },
				{ type: 'sun', beat: 7.5 }
			]
		},
		{
			id: 'short',
			offset: [-0.5, 0, -1],
			nodes: [[0, 0, 0], 'r'],
			color: c(),
			marbles: false
		},
		{
			id: 'circle-start',
			offset: [-4, 0, -3],
			nodes: [[0, 0, 0], 'ib rb ob lb'],
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [{ type: 'sun', beat: 0 }]
		},
		{
			id: 'circle-end',
			offset: [-2, 0, -3],
			nodes: [[0, 0, 0], 'ib rb ob lb'],
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [{ type: 'sun', beat: 4 }]
		},
		{
			id: 'circle-start-ping',
			offset: [1, 0, -3],
			nodes: [[0, 0, 0], 'ib rb ob lb'],
			color: c(),
			marbles: [{ type: 'ball', start: 0, mode: 'ping-pong' }],
			instruments: [{ type: 'sun', beat: 0 }]
		},
		{
			id: 'circle-end-ping',
			offset: [3, 0, -3],
			nodes: [[0, 0, 0], 'ib rb ob lb'],
			color: c(),
			marbles: [{ type: 'ball', start: 0, mode: 'ping-pong' }],
			instruments: [{ type: 'sun', beat: 4 }]
		}
	]
}
