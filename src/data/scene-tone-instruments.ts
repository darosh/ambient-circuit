import type { SceneConfig } from '../lib/scene'
import { triggerHandler } from '../lib/trigger-handler'
import { colorFactory } from './colors'

const c = colorFactory()

export const scene: SceneConfig = {
	id: 'scene-tone-instruments',
	bpm: 220,
	triggerHandler,
	camera: [3, 16, 7],
	audio: {
		master: {
			fx: [
				// { rnbo: 'gigaverb' }, 
				// { rnbo: 'platereverb' }, 
				{ tone: 'Compressor', params: { threshold: -32 } }
			]
		}
	},
	rails: [
		{
			color: c(),
			rail: { id: 'synth', nodes: [[-5, 0, 5], 'i i i i i i i i i i'] },
			marbles: [{ note: 60 }],
			instruments: [{ type: 'arrow', beat: 1, audio: { generator: { tone: 'Synth' } } }]
		},
		{
			color: c(),
			rail: { id: 'pluck-synth', nodes: [[-4, 0, 5], 'i i i i i i i i i i'] },
			marbles: [{ note: 60 }],
			instruments: [{ type: 'arrow', beat: 2, audio: { generator: { tone: 'PluckSynth' } } }]
		},
		{
			color: c(),
			rail: { id: 'metal-synth', nodes: [[-3, 0, 5], 'i i i i i i i i i i'] },
			marbles: [{ note: 60 }],
			instruments: [{ type: 'arrow', beat: 3, audio: { generator: { tone: 'MetalSynth' } } }]
		},
		{
			color: c(),
			rail: { id: 'noise-synth', nodes: [[-2, 0, 5], 'i i i i i i i i i i'] },
			marbles: [{ note: 40.5 }],
			instruments: [{ type: 'arrow', beat: 4, audio: { generator: { tone: 'NoiseSynth' } } }]
		},
		{
			color: c(),
			rail: { id: 'am-synth', nodes: [[-1, 0, 5], 'i i i i i i i i i i'] },
			marbles: [{ note: 60 }],
			instruments: [{ type: 'arrow', beat: 5, audio: { generator: { tone: 'AMSynth' } } }]
		},
		{
			color: c(),
			rail: { id: 'fm-synth', nodes: [[0, 0, 5], 'i i i i i i i i i i'] },
			marbles: [{ note: 60 }],
			instruments: [{ type: 'arrow', beat: 6, audio: { generator: { tone: 'FMSynth' } } }]
		},
		{
			color: c(),
			rail: { id: 'membrane-synth', nodes: [[1, 0, 5], 'i i i i i i i i i i'] },
			marbles: [{ note: 60 }],
			instruments: [{ type: 'arrow', beat: 7, audio: { generator: { tone: 'MembraneSynth' } } }]
		},
		{
			color: c(),
			rail: { id: 'mono-synth', nodes: [[2, 0, 5], 'i i i i i i i i i i'] },
			marbles: [{ note: 60 }],
			instruments: [{ type: 'arrow', beat: 8, audio: { generator: { tone: 'MonoSynth' } } }]
		},
		{
			color: c(),
			rail: { id: 'duo-synth', nodes: [[3, 0, 5], 'i i i i i i i i i i'] },
			marbles: [{ note: 60 }],
			instruments: [{ type: 'arrow', beat: 9, audio: { generator: { tone: 'DuoSynth' } } }]
		}
	]
}
