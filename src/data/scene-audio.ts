import type { SceneConfig } from '../lib/scene'
import { triggerHandler } from '../lib/trigger-handler'

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
			marbles: [
				{ note: 60, speed: 2 },
				{ start: 1 }
			],
			instruments: [
				{
					type: 'sun',
					beat: 1,
					midiNote: 60,
					audio: { generator: { engine: 'tone', name: 'Synth' } }
				},
				{
					type: 'sun',
					beat: 3,
					midiNote: 64,
					audio: { generator: { engine: 'tone', name: 'Synth' } }
				},
				{
					type: 'sun',
					beat: 5,
					midiNote: 67,
					audio: { generator: { engine: 'tone', name: 'Synth' } }
				},
				{
					type: 'sun',
					beat: 7,
					midiNote: 72,
					audio: { generator: { engine: 'tone', name: 'Synth' } }
				}
			]
		}
	]
}
