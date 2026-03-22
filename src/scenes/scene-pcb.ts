import { SceneConfig } from '../lib/core/scene'
import { RailConfig } from '../lib/core/rail-config'
import { triggerHandler } from '../lib/core/trigger-handler'
import { color6, colorFactory } from './utils/colors'
import { DRAWING_PCB } from './utils/svg-paths'
import { toPcbLayout } from '../lib/core/rail-pcb'

const c = colorFactory(color6)

export const scene: SceneConfig = {
	id: 'scene-pcb',
	bpm: 20,
	camera: [0, 24, 0],
	target: [0, 0, 0],
	tint: [1, 1, 1.2],
	audioView: {
		color: '#aaaaff'
	},
	floor: {
		tint: [0.01, 0.01, 0.1]
	},
	triggerHandler,
	autoCamera: {
		camera: 0,
		target: [0, -1, 0]
	},
	rails: [
		{
			id: 'cam',
			color: '#ffffff',
			visible: false,
			offset: [1, 10, 10],
			nodes: [
				'llllllllb uuuuuuuub rrrrrrrrrrrrrb iiiiiiiiiib lllllllllllb oooooooooooooob ddddddddb llb iiiib 12c'
			],
			marbles: [
				{
					speed: 0.5
				}
			]
		}
	]
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
				marbles: [
					{
						start: idx % 2,
						speed: idx % 3 ? 1 : 0.5,
						direction: idx % 5 > 1 ? 'backward' : 'forward'
					}
				],
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
					},
					{
						beat: idx % 3 ? 0.8 : 0.2,
						type: 'fill',
						sides: 12
					},
					{
						beat: idx % 3 ? 0.4 : 0.5,
						type: 'fill',
						sides: 12
					}
				]
			}
	)
)
