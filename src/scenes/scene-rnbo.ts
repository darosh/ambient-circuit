import type { SceneConfig } from '../lib/core/scene'
import { triggerHandler } from '../lib/core/trigger-handler'
import { spiral } from '../lib/core/rail-primitives'
import { NodeConfig } from '../lib/audio'

const FX = [
	'rotavibe',
	['tremolo', 'Fast'],
	['vibrato', 'Extreme'],
	['volume', 'Fast Attack'],
	['freqshifter', 'High'],
	['phaser', 'Wide'],
	['pitchshifter', 'Fivth+'],
	['guitarsynth', 'Timbre'],
	['autofilter', 'HP'],

	'freeverb',
	['filterdelay', 'Wide'],
	['gigaverb', 'Wet'],
	['platereverb', 'Large'],
	'shimmerev',
	['chorus', 'Wide'],
	['flanger', 'Wide'],
	['ringmod', 'High'],
	['octaver', 'Octave2'],

	'param-eq',
	'graphic-eq',
	'shelving-eq',

	'autoswell',
	'booster',
	'compressor',
	'freezer',
	'guitarsynth',
	'limiter',
	'noisegate',
	'overdrive',
	'talkwah',
	'wahwah',

	'looper'
]

let currentFx = 0
const getFx = () => {
	const item = FX[currentFx++]

	return {
		rnbo: Array.isArray(item) ? item[0] : item,
		preset: Array.isArray(item) ? item[1] : undefined
	}
}

const generator = {
	rnbo: 'supersaw-mono'
	// tone: 'PluckSynth',
	// params: { resonance: 0.95, attackNoise: 0.5, dampening: 6000 }
	// tone: 'Synth',
	// params: {
	// 	'oscillator.type': 'fatsquare',
	// 	volume: -12
	// }
}

const fx: NodeConfig[] = [
	// { tone: 'Split', params: { channels: 1 } },
	// { tone: 'OnePoleFilter', params: { frequency: 30, type: 'highpass' } }
]

let bc = 1 - 4
const b = () => (bc += 4)

const scene: SceneConfig = {
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
		text: true,
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
					duration: 1000,
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [...fx, getFx()]
					}
				},
				{
					note: 60,
					duration: 1000,
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [...fx, getFx()]
					}
				},
				{
					note: 52,
					duration: 1000,
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [...fx, getFx()]
					}
				},
				{
					note: 50,
					duration: 1000,
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [...fx, getFx()]
					}
				},
				{
					note: 48,
					duration: 1000,
					type: 'arrow',
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [...fx, getFx()]
					}
				},
				{
					type: 'arrow',
					duration: 1000,
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [...fx, getFx()]
					}
				},
				{
					type: 'arrow',
					duration: 1000,
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [...fx, getFx()]
					}
				},
				{
					type: 'arrow',
					duration: 1000,
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [...fx, getFx()]
					}
				},
				{
					type: 'arrow',
					duration: 1000,
					kind: 'plain',
					beat: b(),
					audio: {
						generator,
						fx: [...fx, getFx()]
					}
				}
			]
		}
	]
}

export const scenes: SceneConfig[] = [
	{ ...scene /*, id: 'scene-rnbo-1'*/ }
	/**
	{
		...scene,
		id: 'scene-rnbo-2',
		rails: scene.rails.map((r) => ({
			...r,
			instruments: r.instruments!.map((i) => ({
				...i,
				audio: {
					generator,
					fx: [...fx, getFx()]
				}
			}))
		}))
	}
	**/
]

console.log(scenes)
