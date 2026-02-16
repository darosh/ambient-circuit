import type { SceneConfig } from '../lib/scene'
import { triggerHandler } from '../lib/trigger-handler'

export const scene: SceneConfig = {
	id: 'scene-audio',
	bpm: 120,
	camera: [0, 8, 12],
	triggerHandler,
	audio: {
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
						rnbo: 'rnbo.shimmerev',
						params: {
							mix: 50,
							decay: 600,
							octvol: 100,
							pitchvol: 100,
							rev: 80,
							size: 70,
							feedback: 30
						}
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
					midiNote: 60,
					audio: {
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
				{
					type: 'sun',
					beat: 3,
					midiNote: 64,
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
					midiNote: 67,
					audio: { generator: { tone: 'Synth' }, bus: 'reverb' }
				},
				{
					type: 'sun',
					beat: 7,
					midiNote: 72,
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
					midiNote: 48,
					audio: { generator: { rnbo: 'feedback-synth.export' }, bus: 'reverb' }
				},
				{
					type: 'spiral',
					beat: 4,
					midiNote: 55,
					audio: { generator: { rnbo: 'feedback-synth.export' }, bus: 'reverb' }
				}
			]
		}
	]
}
