import { SceneConfig } from '../lib/core/scene'
import { getTextRailNodes } from '../lib/video/text-geometry'
import { RailConfig } from '../lib/core/rail-config'
import { triggerHandler } from '../lib/core/trigger-handler'
import { createFloating } from './utils/floating'

export const scene: SceneConfig[] = [
	{
		id: 'scene-rail-text',
		bpm: 60,
		camera: [-4, 7, 12],
		rails: getTextRailNodes('AMBIENT CIRCUIT', 1.8).map(
			(nodes, i, arr): RailConfig => ({
				color: `hsl(${((i * 360) / arr.length) % 360}, 100%, 60%)`,
				offset: [-4.9, 1, 0],
				id: `${i + 1}`,
				nodes,
				marbles: [{ type: 'ball', mode: 'ping-pong' }]
			})
		)
	},
	{
		id: 'scene-rail-connected-text',
		bpm: 60,
		camera: [0, 1, 15],
		triggerHandler,
		tint: [1, 1, 1.05],
		audioView: {
			offset: [0, -0.5, -1],
			color: '#eeddff',
			all: true,
			defaultAnalyser: 'fft'
		},
		sequencerMode: 'time',
		rails: getTextRailNodes('AMBIENT CIRCUIT', 1.8, true).map(
			(nodes, i, arr): RailConfig => ({
				color: `hsl(${((i * 360) / (arr.length - 1.39)) % 360}, 100%, 60%)`,
				offset: [-4.75, 1, 0],
				id: `text-${i + 1}`,
				nodes,
				marbles: [[20.91], [11.91]][i].map((start) => ({
					type: 'ball',
					mode: 'ping-pong',
					duration: 1000,
					bouncer: true,
					speed: 2.5,
					start
				})),
				instruments: [{ type: 'cone', beat: [0, 40][i] }]
			})
		)
	}
]

scene[1].renderFactory = (_, seed) => createFloating({ seed })
