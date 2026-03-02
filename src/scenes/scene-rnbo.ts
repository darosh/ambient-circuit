import type { SceneConfig } from '../lib/core/scene'
import { triggerHandler } from '../lib/core/trigger-handler'
import { circle, spiral } from '../lib/core/rail-primitives'
import { NodeConfig } from '../lib/audio'

const generator = {
	rnbo: 'supersaw'
}

const fx: NodeConfig[] = [
	{ tone: 'Volume', params: { volume: -6 } },
	{ tone: 'OnePoleFilter', params: { frequency: 60, type: 'highpass' } }
]

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
	audioView: {
		color: '#cc88ff',
		offset: [0,-4.5,0]
	},
	audio: {
		master: {
			fx: [
				{
					tone: 'Compressor',
					params: {
						threshold: -12
					}
				}
			]
		}
	},
	rails: [
		{
			rail: {
				id: 'camera',
				offset: [0, 8, 0],
				nodes: [...circle({ radius: 7 }), 'ddddb rrr uuuub lll']
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
			color: '#ff00cc',
			marbles: [{ type: 'ball', note: 66 }],
			instruments: [
				{
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx
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
								rnbo: 'freeverb'
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
								params: {
									tone: 48,
									manual: 50,
									spread: 17,
									sense: 75,
									voice: 4,
									slope: 50,
									auto: 1,
									color: 28
								},
								preset: 'Mouse'
							}
						]
					}
				}
			]
		}
	]
}
