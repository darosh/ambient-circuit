import type { SceneConfig } from '../lib/scene'
import { triggerHandler } from '../lib/trigger-handler'
import { circle, spiral } from '../lib/rail-primitives'

const generator = {
	tone: 'Synth',
	params: {
		'envelope.attack': 0.1,
		'envelope.decay': 0.2,
		'envelope.sustain': 0.5,
		'envelope.release': 0.8,
		volume: -13,
		'oscillator.type': 'fatsawtooth'
	}
}

let bc = 1 - 4
const b = () => (bc += 4)

export const scene: SceneConfig = {
	id: 'scene-rnbo',
	description: 'RNBO effects test',
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
			{ camera: [25, 18, 12], fov: 50, bloom: true },
			{ maxAngleSpeed: Math.PI / 6, camera: 0, target: 1, tangentOffset: 1, smoothnessPos: .05, smoothnessAngle: .05, smoothnessTarget: .005, fov: 60, bloom: true },      // chase marble 1
			{ target: 1, camera: 1, maxAngleSpeed: 2, tangentOffset: 50, smoothnessPos: .0001, smoothnessAngle: .01, smoothnessTarget: .01, fov: 23, bloom: true }                   // watch marble 0
		]
	},
	audioView: {
		color: '#88ffcc'
	},
	audio: {
		master: {
			fx: [
				{
					tone: 'Compressor',
					params: {
						threshold: -30
					}
				}
			]
		}
	},
	rails: [
		{
			rail: {
				id: 'camera',
				offset: [0,8,0],
				nodes: [...circle({radius: 7}), 'ddddb rrr uuuub lll']
			},
			marbles: [{start: 0, speed: 0.1}],
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
			marbles: [
				{ type: 'ball', note: 66 }
			],
			instruments: [
				{
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator
					}
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [
							{
								rnbo: 'filterdelay',
								preset: 'Wide'
							}
						]
					}
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [
							{
								rnbo: 'autofilter',
								preset: 'Resonant'
							}
						]
					}
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [
							{
								rnbo: 'flanger'
								// preset: 'Wide'
							}
						]
					}
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [
							{
								rnbo: 'freqshifter',
								preset: 'Extreme'
							}
						]
					}
				},
				{
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [
							{
								rnbo: 'octaver',
								preset: 'Octave2'
							}
						]
					}
				}
			]
		}
	]
}
