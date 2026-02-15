import type { SceneConfig } from '../lib/scene'
import { triggerHandler } from '../lib/trigger-handler'

const shimmerev = {
	engine: 'rnbo' as const,
	path: 'rnbo.shimmerev',
	params: { mix: 50, decay: 600, octvol: 100, pitchvol: 100, rev: 80, size: 70, feedback: 30 }
}

export const scene: SceneConfig = {
	id: 'scene-audio',
	bpm: 120,
	camera: [0, 8, 12],
	triggerHandler,
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
							engine: 'tone',
							name: 'Synth',
							params: { 'envelope.attack': 0.01, 'envelope.release': 2 }
						}
					}
				},
				{
					type: 'sun',
					beat: 3,
					midiNote: 64,
					audio: {
						generator: {
							engine: 'tone',
							name: 'Synth',
							params: {
								'envelope.attack': 0.1,
								'envelope.sustain': 0.5,
								'oscillator.type': 'triangle'
							}
						}
					}
				},
				{
					type: 'sun',
					beat: 5,
					midiNote: 67,
					audio: { generator: { engine: 'tone', name: 'Synth' }, 
						fx: [shimmerev] 
					}
				},
				{
					type: 'sun',
					beat: 7,
					midiNote: 72,
					audio: { generator: { engine: 'tone', name: 'Synth' }, 
						fx: [shimmerev] 
					}
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
					audio: { generator: { engine: 'rnbo', path: 'feedback-synth.export' } }
				},
				{
					type: 'spiral',
					beat: 4,
					midiNote: 55,
					audio: { generator: { engine: 'rnbo', path: 'feedback-synth.export' } }
				}
			]
		}
	]
}
