import { SceneConfig } from '../lib/core/scene'
import { RailConfig } from '../lib/core/rail-config'
import { triggerHandler } from '../lib/core/trigger-handler'
import { color4, colorFactory } from './utils/colors'
import { DRAWING_RAVEN } from './utils/svg-paths'
import { Matrix4 } from 'three'

const c = colorFactory(color4)

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
	camera: [0, 5, 32],
	target: [0, 8, 0],
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

scene.rails!.push(
	...Object.entries(DRAWING_RAVEN).map(
		([id, d]) =>
			<RailConfig>{
				offset: [0, 0, -10],
				transform: new Matrix4().makeRotationX(Math.PI / 2),
				color: c(),
				id,
				fill: id.endsWith('-f'),
				nodes: [d]
			}
	)
)
