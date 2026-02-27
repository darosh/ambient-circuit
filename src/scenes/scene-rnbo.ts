import type { SceneConfig } from '../lib/scene'
import { triggerHandler } from '../lib/trigger-handler'
import { spiral } from '../lib/rail-primitives'

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
	camera: [20, 18, 12],
	sequencerBeats: 16,
	sequencerMode: 'time',
	triggerHandler,
	polar: true,
	tint: [1.4, 1, 1],
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
				id: 'synth',
				offset: [0, 4.5, 0],
				nodes: [...spiral({ rounds: 9, height: -4.5 }), 'oo out u2.5 uit iiii ilt l2.5 lot']
			},
			color: '#00ffcc',
			marbles: [{ type: 'ball', note: 33 }],
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
