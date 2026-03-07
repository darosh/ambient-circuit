import type { SceneConfig } from '../lib/core/scene'
import { colorFactory } from './utils/colors'
import { globalHandlerFactory, triggerHandler } from '../lib/core/trigger-handler'

const c = colorFactory()
const globalBeatHandler = globalHandlerFactory((ctx) => {
	const state = Math.floor(ctx.beat / 3) % 2

	for (const _m of ctx.scene.rails) {
		if (Math.random() < 0.9) {
			continue
		}

		_m.state.active = !state
		// _m.state.running = !state
		for (const m of ctx.scene.marbles) {
			if (m.state.railId === _m.id) {
				m.state.running = !state
			}
		}
	}
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
			id: 'rail-5',
			offset: [-3, 0, 2],
			nodes: [[0, 0, 0], 'r r r r r r'],
			// running: false,
			color: c(),
			marbles: [{ type: 'ball', start: 0, running: false }],
			instruments: [
				{
					type: 'sun',
					beat: 3
				}
			]
		},
		{
			id: 'rail-4',
			offset: [-3, 0, 1],
			nodes: [[0, 0, 0], 'r r r r r r'],
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
			id: 'rail-3',
			offset: [-3, 0, 0],
			nodes: [[0, 0, 0], 'r r r r r r'],
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
			id: 'rail-2',
			offset: [-3, 0, -1],
			nodes: [[0, 0, 0], 'r r r r r r'],
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
			id: 'rail-1',
			offset: [-3, 0, -2],
			nodes: [[0, 0, 0], 'r r r r r r'],
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{
					type: 'sun',
					beat: 2,
					rays: 12
				},
				{
					type: 'sun',
					beat: 4,
					rays: 12
				}
			]
		}
	]
}
