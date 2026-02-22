import type { SceneConfig } from '../lib/scene'
import { colorFactory } from './utils/colors'
import { globalHandlerFactory, triggerHandler } from '../lib/trigger-handler'

const c = colorFactory()
const globalBeatHandler = globalHandlerFactory((ctx) => {
	ctx.scene.rails.forEach((_m) => {
		if (Math.random() < .9) {
			return
		}
		
		const state = Math.floor(ctx.beat / 3)  % 2
		_m.state.active = !state
	})
})

export const scene: SceneConfig = {
	id: 'scene-inactive-rails',
	description: 'Random rail\ndeactivation test',
	bpm: 120,
	camera: [0, 13, 0],
	names: true,
	globalBeatHandler,
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'rail-5',
				offset: [-3, 0, 2],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					type: 'sun',
					beat: 3
				}
			]
		},
		{
			rail: {
				id: 'rail-4',
				offset: [-3, 0, 1],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'poly', sides: 4, start: 0, mode: 'ping-pong' }],
			instruments: [
				{
					type: 'arrow',
					kind: 'fwd',
					beat: 2
				}
			]
		},
		{
			rail: {
				id: 'rail-3',
				offset: [-3, 0, 0],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'coil', rounds: 2, start: 0 }],
			instruments: [
				{
					type: 'heart',
					beat: 1
				}
			]
		},
		{
			rail: {
				id: 'rail-2',
				offset: [-3, 0, -1],
				nodes: [[0, 0, 0], 'r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0, speed: 2 }],
			instruments: [
				{
					type: 'spiral',
					beat: 2
				},
				{
					type: 'cone',
					beat: 4
				}
			]
		},
		{
			rail: {
				id: 'rail-1',
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
				},
				{
					type: 'sun',
					beat: 4,
					rays: 12,
				}
			]
		}
	]
}
