import { SceneConfig } from '../lib/core/scene'
import { RailConfig } from '../lib/core/rail-config'
import { triggerHandler } from '../lib/core/trigger-handler'
import { createFloating } from './utils/floating'
import { color3 } from './utils/colors'
import { DRAWING_CIRCUIT } from './utils/svg-paths'
import { expandPathString } from '../lib/core/rail-path'

const OUTER = 'r14'
const COILED = 'r20'

export const scene: SceneConfig = {
	id: 'scene-two',
	bpm: 60,
	camera: [-3, 12, 17],
	target: [0, -0.5, 0],
	tint: [1, 1, 1.05],
	rotatePlay: true,
	triggerHandler,
	renderFactory: (_, seed) =>
		createFloating({
			seed,
			floatIntensity: _.id === OUTER ? 0 : [-0.05, 0.1, 0.1]
		}),
	rails: []
}

const z = [
	'r3',
	'r4',
	'r5',
	'r7',
	'r2',
	'r1',
	'r9',
	'r6',
	'r10',
	'r20',
	'r8',
	'r11',
	'r21',
	'r12',
	'r15',
	'r13',
	'r17',
	'r16',
	'r14',
	'r19',
	'r18'
]

scene.rails!.push(
	...z.map(
		(id, i) =>
			<RailConfig>{
				color: color3[i % 2],
				offset: id === OUTER ? [0, -0.2, 0] : undefined,
				id,
				nodes: [
					DRAWING_CIRCUIT[id].replace(/(^[^ ]+ )/, '$1u.1') + 'd.1' + (id === OUTER ? ' 12c' : '')
				],
				marbles: [
					{
						type: id === 'r20' ? 'coil' : undefined,
						mode: id === 'r20' ? 'ping-pong' : undefined,
						start: Math.floor(((i % 5) / 4) * (expandPathString(DRAWING_CIRCUIT[id]).length - 1)),
						easing: i % 4 ? undefined : 'easeOutQuad'
					}
				],
				instruments: [
					{ type: 'arrow', kind: 'tri', beat: 0, align: 'back' },
					{
						type: 'arrow',
						point: id === COILED ? 'backward' : 0,
						kind: id === COILED ? 'tri' : 'ring',
						beat: id === OUTER ? 12 : expandPathString(DRAWING_CIRCUIT[id]).length - 1,
						align: id === COILED ? 'back' : 'tip'
					}
				]
			}
	)
)
