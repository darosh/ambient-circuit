import type { SceneConfig } from '../lib/core/scene'
import { triggerHandler } from '../lib/core/trigger-handler'
import { spiral } from '../lib/core/rail-primitives'
import { NodeConfig } from '../lib/audio'

const generator = {
	rnbo: 'formant-synth',
	preset: 'Slow'
	// tone: 'Synth',
	// params: {
	// 	'oscillator.type': 'fatsquare',
	// 	volume: -12
	// }
}

const fx: NodeConfig[] = [
]

let bc = 1 - 4
const b = () => (bc += 4)

export const scene: SceneConfig = {
	id: 'scene-rnbo',
	description: 'RNBO effects test',
	bpm: 300,
	camera: [25, 18, 12],
	sequencerBeats: 16,
	sequencerMode: 'time',
	triggerHandler,
	polar: true,
	tint: [1.4, 1, 1],
	audioView: {
		defaultAnalyser: 'fft',
		all: true,
		color: '#cc88ff',
		offset: [0, -4.5, 0]
	},
	audio: {
		master: {
			analyzer: true,
			fx: [
				{
					tone: 'Volume',
					params: {
						volume: 12
					}
				},
				{
					tone: 'Compressor',
					params: {
						threshold: -6
					}
				},
				{
					tone: 'Limiter',
					params: {
						threshold: -3
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
				nodes: [
					...spiral({ rounds: 9, height: -4.5, trail: 0, last: true }),
					'ooo out u2.5 uit iiii ilt l2.5 lot 38'
				]
			},
			color: '#ff00cc',
			marbles: [{ type: 'ball' }],
			instruments: [
				{
					note: 67,
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx
					}
				},
				{
					note: 60,
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [
							...fx,
							{
								rnbo: 'filterdelay',
								preset: 'Wide'
							}
						]
					}
				},
				{
					note: 52,
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [
							...fx,
							{
								rnbo: 'autofilter',
								params: {
									sense: 47,
									attack: 0,
									release: 66,
									type: 2,
									bottom: 0,
									mix: 86,
									volume: 0,
									reson: 80,
									top: 100,
									slope: 50
								},
								preset: 'Extreme'
							}
						]
					}
				},
				{
					note: 50,
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [
							...fx,
							{
								rnbo: 'flanger'
								// preset: 'Wide'
							}
						]
					}
				},
				{
					note: 48,
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [
							...fx,
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
							...fx,
							{
								rnbo: 'octaver',
								preset: 'Octave2'
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
							...fx,
							{
								rnbo: 'freeverb',
								params: { damp: 0.5, fb1: 0.99, spread: 400, fb2: 0.99, dry: 1 },
								preset: 'Default'
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
							...fx,
							{
								rnbo: 'overdrive',
								params: {
									lowcut: 0,
									highcut: 50,
									drive: 50,
									mix: 90,
									volume: -70,
									midfreq: -60,
									treble: -70,
									mid: 25,
									bass: -25
								},
								preset: 'Scream'
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
							...fx,
							{
								rnbo: 'talkwah',
								preset: 'Auto'
							}
						]
					}
				}
			]
		}
	]
}
