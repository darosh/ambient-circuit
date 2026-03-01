import type { SceneConfig } from '../lib/scene'
import { triggerHandler } from '../lib/trigger-handler'
import { circle, spiral } from '../lib/rail-primitives'

let bc = 1 - 4
const b = () => (bc += 4)

export const scene: SceneConfig = {
	id: 'scene-multi-camera',
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
		bloomDefaults: { strength: 0.5, radius: 0.2, threshold: 0.5 },
		splits: [
			{
				camera: 1,
				target: [0, 1, 0],
				smoothnessPos: 0.05,
				smoothnessAngle: 0.05,
				smoothnessTarget: 0.05,
				fov: 50,
				bloom: true
			},
			{
				maxAngleSpeed: Math.PI,
				camera: 0,
				target: 2,
				tangentOffset: 0,
				smoothnessPos: 0.05,
				smoothnessAngle: 0.005,
				smoothnessTarget: 0.002,
				fov: 70,
				bloom: true
			},
			{
				target: 2,
				camera: 2,
				maxAngleSpeed: 2,
				tangentOffset: 50,
				smoothnessPos: 0.0001,
				smoothnessAngle: 0.01,
				smoothnessTarget: 0.01,
				fov: 28,
				bloom: true
			}
		]
	},
	audioView: {
		color: '#88ffcc'
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
				id: 'camera',
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
			color: '#00ffcc',
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
