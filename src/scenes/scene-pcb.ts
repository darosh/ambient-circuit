import { SceneConfig } from '../lib/core/scene'
import { RailConfig } from '../lib/core/rail-config'
import { triggerHandler } from '../lib/core/trigger-handler'
import { color4, colorFactory } from './utils/colors'
import { DRAWING_PCB } from './utils/svg-paths'
import { toPcbLayout } from '../lib/core/rail-pcb'

const c = colorFactory(color4)

export const scene: SceneConfig = {
	id: 'scene-pcb',
	bpm: 60,
	camera: [0, 24, 0],
	target: [0, 0, 0],
	triggerHandler,
	tint: [1, 1, 1.05],
	rails: []
}

const entries = Object.entries(DRAWING_PCB)
const rawDefs = entries.map(([, d]) => [d])
const pcbDefs = toPcbLayout(rawDefs)

scene.rails!.push(
	...entries.map(
		([id], idx) =>
			<RailConfig>{
				color: c(),
				id,
				fill: id.endsWith('-f'),
				nodes: pcbDefs[idx],
				instruments: [
					{
						beat: 0,
						type: idx % 2 ? 'fill' : 'poly',
						fill: !(idx % 3),
						sides: 12
					},
					{
						beat: 1,
						type: idx % 3 ? 'poly' : 'fill',
						fill: !(idx % 4),
						sides: 12
					}
				]
			}
	)
)
console.log(scene.rails)
