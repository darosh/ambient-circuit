import type { SceneConfig } from '../lib/core/scene'
import { globalHandlerFactory, triggerHandler } from '../lib/core/trigger-handler'
import { colorFactory } from './utils/colors'

const c = colorFactory()
const duration = 500

export const scene: SceneConfig = {
	id: 'scene-ctrl',
	description: 'CC/CV control types',
	bpm: 120,
	names: true,
	camera: [0, 17, 12],
	triggerHandler,
	globalBeatHandler: globalHandlerFactory(),
	audioView: {
		all: true
	},
	audio: {
		chains: {
			synth: {
				generator: {
					tone: 'Synth',
					params: {
						'envelope.attack': 0.01,
						'envelope.decay': 0.3,
						'envelope.sustain': 0.4,
						'envelope.release': 0.6,
						volume: -10,
						'oscillator.type': 'fatsawtooth'
					}
				},
				fx: [{ tone: 'Filter', params: { frequency: 800, type: 'lowpass', rolloff: -24 } }],
				ctrl: [{ cc: 16, channel: 3, param: 'frequency', range: [600, 1200], fxIndex: 0 }],
				bus: 'reverb'
			}
		},
		master: {
			analyzer: 'meter',
			fx: [{ tone: 'Compressor', params: { threshold: -24 } }]
		},
		buses: {
			reverb: {
				fx: [{ rnbo: 'gigaverb' }],
				ctrl: [{ cc: 16, channel: 4, param: 'revtime', range: [0, 11] }]
			}
		}
	},
	aliasCc: {
		'1:16': 'set',
		'2:15': 'env',
		'2:16': 'envr',
		'3:15': 'seq',
		'3:16': 'seqr',
		'4:13': 'sin',
		'4:14': 'tri',
		'4:15': 'saw',
		'4:16': 'rnd'
	},
	rails: [
		{
			id: 'set',
			nodes: [[-4, 0, -3], 'r r r r r r r r'],
			color: c(),
			marbles: [{ speed: 1 }],
			instruments: [
				{
					type: 'arrow',
					kind: 'play',
					beat: 0,
					note: 60,
					channel: 2,
					ctrl: [{ cc: 16, channel: 1, type: 'set', value: 0.1 }]
				},
				{
					type: 'arrow',
					kind: 'play',
					beat: 2,
					note: 64,
					channel: 2,
					ctrl: [{ cc: 16, channel: 1, type: 'set', value: 0.3 }]
				},
				{
					type: 'arrow',
					kind: 'play',
					beat: 4,
					note: 67,
					channel: 2,
					ctrl: [{ cc: 16, channel: 1, type: 'set', value: 0.6 }]
				},
				{
					type: 'arrow',
					kind: 'play',
					beat: 6,
					note: 72,
					channel: 2,
					ctrl: [{ cc: 16, channel: 1, type: 'set', value: 0.9 }]
				}
			]
		},
		{
			id: 'env',
			nodes: [[-4, 0, -1], 'r r r r r r r r'],
			color: c(),
			marbles: [{ speed: 2 }],
			instruments: [
				{
					type: 'arrow',
					kind: 'stop',
					beat: 0,
					note: 48,
					channel: 2,
					ctrl: [{ cc: 15, channel: 2, type: 'envelope', attack: 0.2, decay: 0.8 }]
				},
				{
					type: 'arrow',
					kind: 'stop',
					beat: 4,
					note: 55,
					channel: 2,
					ctrl: [
						{
							cc: 16,
							channel: 2,
							type: 'envelope',
							attack: 0.05,
							decay: 1.5,
							ramp: 200,
							curve: 'exponential'
						}
					]
				}
			]
		},
		{
			id: 'seq',
			nodes: [[-4, 0, 1], 'r r r r r r r r'],
			color: c(),
			marbles: [{ speed: 2 }],
			instruments: [
				{
					type: 'arrow',
					kind: 'step',
					beat: 0,
					note: 60,
					channel: 3,
					ctrl: [
						{
							cc: 15,
							channel: 3,
							type: 'sequence',
							values: [1, 0]
						}
					]
				},
				{
					type: 'arrow',
					kind: 'step',
					beat: 4,
					note: 67,
					channel: 3,
					ctrl: [
						{
							cc: 16,
							channel: 3,
							type: 'sequence',
							ramp: 1000,
							values: [1, 0]
						}
					]
				}
			]
		},
		{
			id: 'lfo',
			nodes: [[-4, 0, 3], 'r r r r r r r r'],
			color: c(),
			marbles: [{ speed: 1 }],
			instruments: [
				{
					type: 'arrow',
					kind: 'rec',
					beat: 0,
					note: 60,
					duration,
					channel: 4,
					audio: { id: 'synth' },
					// sequence with ramp
					ctrl: [{ cc: 13, channel: 4, type: 'lfo', shape: 'sine', rate: 1 }]
				},
				{
					type: 'arrow',
					kind: 'rec',
					beat: 2,
					note: 64,
					duration,
					channel: 4,
					audio: { id: 'synth' },
					ctrl: [{ cc: 14, channel: 4, type: 'lfo', shape: 'triangle', rate: 2 }]
				},
				{
					type: 'arrow',
					kind: 'rec',
					beat: 4,
					note: 67,
					duration,
					channel: 4,
					audio: { id: 'synth' },
					ctrl: [{ cc: 15, channel: 4, type: 'lfo', shape: 'saw', rate: 3, active: true }]
				},
				{
					type: 'arrow',
					kind: 'rec',
					beat: 6,
					note: 72,
					duration,
					channel: 4,
					audio: { id: 'synth' },
					ctrl: [
						{
							cc: 16,
							channel: 4,
							type: 'lfo',
							shape: 'random',
							rate: 10,
							smooth: 0.5,
							impact: 'on-off'
						}
					]
				}
			]
		}
	]
}
