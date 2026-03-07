import type { SceneConfig } from '../lib/core/scene'
import { triggerHandler } from '../lib/core/trigger-handler'
import { colorFactory } from './utils/colors'

const c = colorFactory()

export const scene: SceneConfig = {
	id: 'scene-tone-instruments',
	description: 'Test of Tone.js\ninstruments',
	bpm: 220,
	sequencerBeats: 32,
	sequencerMode: 'time',
	triggerHandler,
	camera: [9, 18, 18],
	target: [0, 2, 0],
	// tint: [1, 1, 1.05],
	// tint: [1.2, 1, 1],
	names: true,
	audioView: {
		defaultAnalyser: 'fft',
		color: '#aaaaff',
		analyzers: true,
		text: true,
		all: true
	},
	audio: {
		buses: {
			test: {
				analyzer: true,
				fx: [{ tone: 'Limiter' }]
			}
		},
		master: {
			analyzer: true,
			fx: [
				{ tone: 'Freeverb', params: { wet: 0.3 } },
				{ tone: 'Compressor', params: { threshold: -32 } },
				{ tone: 'Limiter' }
			]
		}
	},
	rails: [
		{
			color: c(),
			id: 'synth',
			nodes: [[-4, 0, 5], 'i i i i i i i i i i'],
			marbles: [{ note: 60 }],
			instruments: [
				{
					type: 'arrow',
					beat: 1,
					audio: { bus: 'test', analyzer: true, generator: { tone: 'Synth' } }
				}
			]
		},
		{
			color: c(),
			id: 'pluck-synth',
			nodes: [[-3, 0, 5], 'i i i i i i i i i i'],
			marbles: [{ note: 60 - 14 }],
			instruments: [
				{
					type: 'arrow',
					beat: 2,
					duration: 100,
					velocity: 127,
					audio: {
						analyzer: true,
						bus: 'test',
						generator: { tone: 'PluckSynth', params: { resonance: 0.95 } },
						fx: [
							{ tone: 'Split', params: { channels: 1 } },
							{ tone: 'OnePoleFilter', params: { frequency: 30, type: 'highpass' } }
						]
					}
				}
			]
		},
		{
			color: c(),
			id: 'metal-synth',
			nodes: [[-2, 0, 5], 'i i i i i i i i i i'],
			marbles: [{ note: 60 }],
			instruments: [
				{ type: 'arrow', beat: 3, audio: { analyzer: true, generator: { tone: 'MetalSynth' } } }
			]
		},
		{
			color: c(),
			id: 'noise-synth',
			nodes: [[-1, 0, 5], 'i i i i i i i i i i'],
			marbles: [{ note: 40.5 }],
			instruments: [
				{ type: 'arrow', beat: 4, audio: { analyzer: true, generator: { tone: 'NoiseSynth' } } }
			]
		},
		{
			color: c(),
			id: 'am-synth',
			nodes: [[0, 0, 5], 'i i i i i i i i i i'],
			marbles: [{ note: 60 }],
			instruments: [
				{ type: 'arrow', beat: 5, audio: { analyzer: true, generator: { tone: 'AMSynth' } } }
			]
		},
		{
			color: c(),
			id: 'fm-synth',
			nodes: [[1, 0, 5], 'i i i i i i i i i i'],
			marbles: [{ note: 60 }],
			instruments: [
				{ type: 'arrow', beat: 6, audio: { analyzer: true, generator: { tone: 'FMSynth' } } }
			]
		},
		{
			color: c(),
			id: 'membrane-synth',
			nodes: [[2, 0, 5], 'i i i i i i i i i i'],
			marbles: [{ note: 60 - 36 }],
			instruments: [
				{
					type: 'arrow',
					beat: 7,
					audio: {
						analyzer: true,
						bus: 'test',
						generator: { tone: 'MembraneSynth', params: { pitchDecay: 0.4 } }
					}
				}
			]
		},
		{
			color: c(),
			id: 'mono-synth',
			nodes: [[3, 0, 5], 'i i i i i i i i i i'],
			marbles: [{ note: 60 }],
			instruments: [
				{ type: 'arrow', beat: 8, audio: { analyzer: true, generator: { tone: 'MonoSynth' } } }
			]
		},
		{
			color: c(),
			id: 'duo-synth',
			nodes: [[4, 0, 5], 'i i i i i i i i i i'],
			marbles: [{ note: 60 }],
			instruments: [
				{
					type: 'arrow',
					beat: 9,
					audio: {
						analyzer: true,
						generator: { tone: 'DuoSynth' }
					}
				}
			]
		}
	]
}
