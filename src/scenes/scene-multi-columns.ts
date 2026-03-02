import type { SceneConfig } from '../lib/core/scene'
import { triggerHandler } from '../lib/core/trigger-handler'
import { circle, spiral } from '../lib/core/rail-primitives'

let bc = 1 - 4
const b = () => (bc += 4)

export const scene: SceneConfig = {
	id: 'scene-multi-columns',
	description: 'Split view and camera\nautomation test',
	bpm: 120,
	camera: [25, 18, 12],
	sequencerBeats: 16,
	sequencerMode: 'time',
	triggerHandler,
	polar: true,
	tint: [1.4, 1, 1],
	view: {
		layout: 'horizontal',
		splits: [
			{
				camera: 1,
				target: [0, 1, 0],
				fov: 50
			},
			{
				camera: 0,
				target: 2,
				tangentOffset: 0,
				smoothnessTarget: 0.002,
				fov: 60
			},
			{
				target: 2,
				camera: [0, 20, 1],
				tangentOffset: 50,
				smoothnessTarget: 0.001,
				fov: 28
			}
		]
	},
	audioView: {
		color: '#ff8896'
	},
	rails: [
		{
			rail: {
				id: 'camera',
				offset: [0, 8, 0],
				nodes: [...circle({ radius: 7 }), 'ddddb rrr uuuub lll']
			},
			marbles: [{ start: 0, speed: 0.1, mode: 'ping-pong' }],
			color: '#113344',
			visible: false
		},
		{
			rail: {
				id: 'camera2',
				offset: [0, 7, 0],
				nodes: circle({ radius: 13 })
			},
			marbles: [{ start: 0, speed: 0.1 }],
			color: '#113344',
			visible: false
		},
		{
			rail: {
				id: 'synth',
				offset: [0, 4.5, 0],
				nodes: [...spiral({ rounds: 9, height: -4.5 }), 'oo out u2.5 uit iiii ilt l2.5 lot']
			},
			color: '#ff003b',
			marbles: [{ type: 'ball', note: 66 }],
			instruments: [
				{
					type: 'arrow',
					kind: 'plain',
					beat: b()
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b()
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b()
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b()
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b()
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b()
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b()
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b()
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b()
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b()
				}
			]
		}
	]
}
