import { SceneConfig } from '../lib/core/scene'
import { getTextRailNodes } from '../lib/video/text-geometry'
import { RailData } from '../lib/core/rail-data'
import { triggerHandler } from '../lib/core/trigger-handler'
import { AudioChainConfig } from '../lib/audio'

const audio: AudioChainConfig[] = [
	{ generator: { sample: 'flute' } },
	{ generator: { sample: 'guitar-electric' } }
]

export const scene: SceneConfig[] = [
	{
		id: 'scene-rail-text',
		bpm: 60,
		camera: [-4, 7, 12],
		rails: getTextRailNodes('AMBIENT CIRCUIT', 1.8).map(
			(nodes, i, arr): RailData => ({
				color: `hsl(${((i * 360) / arr.length) % 360}, 100%, 60%)`,
				rail: {
					offset: [-4.9, 1, 0],
					id: `${i + 1}`,
					nodes
				},
				marbles: [{ type: 'ball', mode: 'ping-pong' }]
			})
		)
	},
	{
		id: 'scene-rail-connected-text',
		bpm: 60,
		camera: [0, 1, 15],
		triggerHandler,
		rails: getTextRailNodes('AMBIENT CIRCUIT', 1.8, true).map(
			(nodes, i, arr): RailData => ({
				color: `hsl(${((i * 360) / (arr.length - 1.39)) % 360}, 100%, 60%)`,
				rail: {
					offset: [-4.75, 1, 0],
					id: `${i + 1}`,
					nodes
				},
				marbles: [[20.91], [11.91]][i].map((start) => ({
					type: 'ball',
					mode: 'ping-pong',
					bouncer: true,
					speed: 2.5,
					start
				})),
				instruments: [{ type: 'cone', beat: [0, 40][i], audio: audio[i] }]
			})
		)
	}
]

// scene[1].rails[1].rail.offset[0] -= 5.5
// scene[1].rails[1].rail.offset[1] -= 1.2
