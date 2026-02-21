import type { SceneConfig } from '../lib/scene'
import { triggerHandler } from '../lib/trigger-handler'

export const scene: SceneConfig = {
	id: 'scene-audio',
	bpm: 120,
	camera: [0, 8, 12],
	sequencerBeats: 16,
	sequencerMode: 'compact',
	sequencerColors: true,
	triggerHandler,
	tint: [1.4, 1, 1],
	audioView: {
		color: '#fff4f0'
	},
	audio: {
		chains: {
			synth: {
				generator: {
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
			}
		},
		master: {
			fx: [
				{
					tone: 'Compressor'
				}
			]
		},
		buses: {
			reverb: {
				fx: [
					{
						rnbo: 'gigaverb',
						params: {}
					}
				]
			}
		}
	},
	rails: [
		{
			rail: {
				id: 'synth-rail',
				nodes: [[-4, 0, 0], 'r r r r r r r r']
			},
			color: '#00ffcc',
			marbles: [{ note: 60, speed: 2 }, { start: 1 }],
			instruments: [
				{
					type: 'sun',
					beat: 1,
					note: 60,
					audio: { id: 'synth' }
				},
				{
					type: 'sun',
					beat: 3,
					note: 64,
					audio: {
						generator: {
							tone: 'Synth',
							params: {
								'envelope.attack': 0.1,
								'envelope.decay': 0.2,
								'envelope.sustain': 0.5,
								'envelope.release': 0.8,
								'oscillator.type': 'triangle'
							}
						}
					}
				},
				{
					type: 'sun',
					beat: 5,
					note: 67,
					audio: { generator: { tone: 'Synth' }, bus: 'reverb' }
				},
				{
					type: 'sun',
					beat: 7,
					note: 72,
					audio: { generator: { tone: 'Synth' }, bus: 'reverb' }
				}
			]
		},
		{
			rail: {
				id: 'rnbo-rail',
				nodes: [[-4, 0, 3], 'r r r r r r r r']
			},
			color: '#ff66aa',
			marbles: [{ speed: 0.5 }],
			instruments: [
				{
					type: 'spiral',
					beat: 0,
					note: 48,
					audio: { generator: { rnbo: 'feedback-synth' }, bus: 'reverb' }
				},
				{
					type: 'spiral',
					beat: 4,
					note: 55,
					audio: { generator: { rnbo: 'feedback-synth' }, bus: 'reverb' }
				},
				{
					type: 'spiral',
					beat: 6,
					note: 55,
					audio: { id: 'synth' }
				}
			]
		}
	]
}
