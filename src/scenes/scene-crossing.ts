import type { SceneConfig } from '../lib/core/scene'
import { colors } from './utils/colors'
import { triggerHandler } from '../lib/core/trigger-handler'
import { roundedRect } from '../lib/core/rail-primitives'
import { railToString } from '../lib/core/rail-path'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-crossing',
	bpm: 120,
	camera: [0, 13, 8],
	triggerHandler,
	rails: [
		{
			id: 'eight',
			nodes: [[0, 0, 0], 'ir or ol il il ol or ir'],
			color: c()
		},
		{
			id: 'eight-no-cross',
			nodes: [[0, 0, -3], 'ir or ol ilu0.01 il ol or ird0.01 '],
			color: c()
		},
		{
			id: 'rect-beats',
			offset: [-3, 0, 2],
			nodes: [railToString(roundedRect()) + ' 8'],
			color: c()
		},
		{
			id: 'rect-curve',
			offset: [3, 0, 2],
			nodes: [railToString(roundedRect()) + ' 8c'],
			color: c()
		}
	]
}
