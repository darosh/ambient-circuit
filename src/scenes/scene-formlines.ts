import { SceneConfig } from '../lib/core/scene'
import { RailConfig } from '../lib/core/rail-config'
import { color3, colorFactory } from './utils/colors'
import { DRAWING_FORMLINES } from './utils/svg-paths'

const c = colorFactory(color3)

export const scene: SceneConfig = {
	id: 'scene-formlines',
	bpm: 60,
	// names: true,
	// points: true,
	camera: [0, 24, 0],
	rails: []
}

scene.rails!.push(
	...Object.entries(DRAWING_FORMLINES).map(
		([id, d]) =>
			<RailConfig>{
				color: c(),
				id,
				nodes: [d],
				marbles: false
			}
	)
)
