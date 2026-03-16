import { SceneConfig } from '../lib/core/scene'
import { RailConfig } from '../lib/core/rail-config'
import { triggerHandler } from '../lib/core/trigger-handler'
import { colorFactory } from './utils/colors'
import { DRAWING_BRANCHING } from './utils/svg-paths'

const c = colorFactory()

export const scene: SceneConfig = {
	id: 'scene-branching',
	bpm: 60,
	camera: [0, 22, 0],
	target: [0, 0, 0],
	triggerHandler,
	tint: [1, 1, 1.05],
	rails: []
}

scene.rails!.push(
	...Object.entries(DRAWING_BRANCHING).map(
		([id, d]) =>
			<RailConfig>{
				color: c(),
				id,
				// nodes
				nodes: [d]
			}
	)
)
