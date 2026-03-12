import { SceneConfig } from '../lib/core/scene'
import { RailConfig } from '../lib/core/rail-config'
import { triggerHandler } from '../lib/core/trigger-handler'
import { color3, colorFactory } from './utils/colors'
import { DRAWING_RAVEN } from './utils/svg-paths'

const c = colorFactory(color3)

/**
 const audio: AudioChainConfig[] = [
 	{
 		analyzer: true,
 		generator: { sample: 'flute' },
 		fx: [{ tone: 'Volume', params: { volume: -12 } }]
 	},
 	{ analyzer: true, generator: { sample: 'guitar-electric' } }
 ]
*/

export const scene: SceneConfig = {
	id: 'scene-one',
	bpm: 60,
	camera: [0, 21, 0],
	target: [0, -0.5, 0],
	triggerHandler,
	tint: [1, 1, 1.05],
	// audio: {
	// 	chains: {
	// 		a: audio[0],
	// 		b: audio[1]
	// 	},
	// 	master: {
	// 		analyzer: true,
	// 		fx: [{ rnbo: 'rotavibe' }, { rnbo: 'gigaverb', params: { dry: 0 } }]
	// 	}
	// },
	audioView: {
		offset: [0, -0.5, -1],
		color: '#eeddff',
		all: true,
		defaultAnalyser: 'fft'
	},
	sequencerMode: 'time',
	rails: []
}

const svgs = [...DRAWING_RAVEN]

scene.rails!.push(
	...svgs.map(
		(d, i) =>
			<RailConfig>{
				color: c(),
				id: `y${i + 1}`,
				nodes: [d.replace(/(^[^ ]+ )/, '$1u.1') + 'd.1']
			}
	)
)
