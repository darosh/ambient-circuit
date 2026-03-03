import { SceneConfig } from '../lib/core/scene'
import { getTextRailNodes } from '../lib/video/text-geometry'
import { RailData } from '../lib/core/rail-data'

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
					id: `char-${i}`,
					nodes
				},
				marbles: [{ type: 'ball', mode: 'ping-pong' }]
			})
		)
	},
	{
		id: 'scene-rail-connected-text',
		bpm: 60,
		camera: [4, 7, 12],
		rails: getTextRailNodes('AMBIENT CIRCUIT', 1.8, true).map(
			(nodes, i, arr): RailData => ({
				color: `hsl(${((i * 360) / (arr.length - 1.39)) % 360}, 100%, 60%)`,
				rail: {
					offset: [-4.9, 1, 0],
					id: `char-${i}`,
					nodes
				},
				marbles: [{ type: 'ball', mode: 'ping-pong', speed: 2.5 }]
			})
		)
	}
]
