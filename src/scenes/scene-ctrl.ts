import type { SceneConfig } from '../lib/core/scene'
import { globalHandlerFactory, triggerHandler } from '../lib/core/trigger-handler'

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
	rails: [
		{
			id: 'ctrl-set',
			nodes: [[-4, 0, -3], 'r r r r r r r r'],
			color: '#00ffcc',
			marbles: [{ speed: 1 }],
			instruments: [
				{
					type: 'arrow',
					kind: 'play',
					beat: 0,
					note: 60,
					channel: 2,
					ctrl: [{ cc: 16, channel: 1, type: 'set', value: 0.3 }]
				},
				{
					type: 'arrow',
					kind: 'play',
					beat: 2,
					note: 64,
					channel: 2,
					ctrl: [{ cc: 16, channel: 1, type: 'set', value: 0.6 }]
				},
				{
					type: 'arrow',
					kind: 'play',
					beat: 4,
					note: 67,
					channel: 2,
					ctrl: [{ cc: 16, channel: 1, type: 'set', value: 0.9 }]
				},
				{
					type: 'arrow',
					kind: 'play',
					beat: 6,
					note: 72,
					channel: 2,
					ctrl: [{ cc: 16, channel: 1, type: 'set', value: 0.1 }]
				}
			]
		},
		{
			id: 'ctrl-envelope',
			nodes: [[-4, 0, -1], 'r r r r r r r r'],
			color: '#ff6644',
			marbles: [{ speed: 1 }],
			instruments: [
				{
					type: 'sun',
					beat: 0,
					note: 48,
					channel: 2,
					ctrl: [{ cc: 16, channel: 2, type: 'envelope', attack: 0.2, decay: 0.8 }]
				},
				{
					type: 'sun',
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
							curve: 'exponential'
						}
					]
				}
			]
		},
		{
			id: 'ctrl-lfo',
			nodes: [[-4, 0, 1], 'r r r r r r r r'],
			color: '#aa66ff',
			marbles: [{ speed: 0.5 }],
			instruments: [
				{
					type: 'spiral',
					beat: 0,
					note: 60,
					channel: 3,
					ctrl: [{ cc: 15, channel: 3, type: 'lfo', shape: 'square', rate: '1/2' }]
				},
				{
					type: 'spiral',
					beat: 4,
					note: 67,
					channel: 3,
					ctrl: [{ cc: 16, channel: 3, type: 'lfo', shape: 'sine', rate: 6, freerun: false }]
				}
			]
		},
		{
			id: 'ctrl-sequence',
			nodes: [[-4, 0, 3], 'r r r r r r r r'],
			color: '#ffcc00',
			marbles: [{ speed: 1 }],
			instruments: [
				{
					type: 'poly',
					sides: 4,
					beat: 0,
					note: 60,
					duration,
					channel: 4,
					audio: { id: 'synth' },
					ctrl: [{ cc: 13, channel: 4, type: 'sequence', values: [0.1, 0.4, 0.7, 1] }]
				},
				{
					type: 'poly',
					sides: 4,
					beat: 2,
					note: 64,
					duration,
					channel: 4,
					audio: { id: 'synth' },
					ctrl: [{ cc: 14, channel: 4, type: 'sequence', values: [1, 0.7, 0.4, 0.1] }]
				},
				{
					type: 'poly',
					sides: 4,
					beat: 4,
					note: 67,
					duration,
					channel: 4,
					audio: { id: 'synth' },
					ctrl: [{ cc: 15, channel: 4, type: 'lfo', rate: 3, shape: 'saw' }]
				},
				{
					type: 'poly',
					sides: 4,
					beat: 6,
					note: 72,
					duration,
					channel: 4,
					audio: { id: 'synth' },
					ctrl: [{ cc: 16, channel: 4, type: 'lfo', rate: 10, shape: 'random' }]
				}
			]
		}
	]
}
