import { SceneConfig } from '../lib/core/scene'
import { getTextRailNodes } from '../lib/video/text-geometry'
import { RailData } from '../lib/core/rail-data'
import { triggerHandler } from '../lib/core/trigger-handler'
import { createFloating } from './utils/floating'
import { color3, color4, colorFactory } from './utils/colors'
import { DRAWING_CIRCUIT } from './utils/svg-paths'
import { expandPathString } from '../lib/core/rail-path'
import { randomizer } from './utils/randomizer'

const c = colorFactory(color3)

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
	id: 'scene-two',
	bpm: 60,
	camera: [-3, 12, 17],
	target: [0, -0.5, 0],
	rotatePlay: true,
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
	rails: getTextRailNodes('AMBIENT CIRCUIT', 1.8, true).map(
		(nodes, i): RailData => ({
			color: c(),
			rail: {
				offset: [-4.75, 1.5, 0],
				id: `t${i + 1}`,
				nodes
			},
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

// scene[1].rails[1].rail.offset[0] -= 5.5
// scene[1].rails[1].rail.offset[1] -= 1.2

scene.renderFactory = (_, seed) =>
	createFloating({
		seed,
		floatIntensity: _.rail.id[0] === 'y' ? [-0.05, 0.1, 0.1] : _.rail.id[0] === 'z' ? 0 : undefined
	})

for (const v of [3, 8, 10, 13, 21, 27, 28, 33, 35, 40]) {
	scene.rails[0].instruments!.push({
		type: 'cross',
		note: 50 + v,
		visible: false,
		sides: 3,
		beat: v,
		audio: { id: 'a' }
	})
}

for (const v of [3, 12, 15, 22, 32, 36, 40, 45]) {
	scene.rails[1].instruments!.push({
		type: 'cross',
		note: 80 - v,
		visible: false,
		sides: 3,
		beat: v,
		audio: { id: 'b' }
	})
}

const r = randomizer()
const svgs = [...DRAWING_CIRCUIT].toSorted(() => r() - 0.5)
const last = 10
const m = randomizer(100)
const q = randomizer()

const order = [20, 17, 15, 2, 7, 6, 14, 19, 18, 13, 5, 1, 16, 10, 21, 4, 12, 3, 9, 8]

scene.rails = []
const first = scene.rails.length
scene.rails!.push(
	...svgs.map(
		(d, i) =>
			<RailData>{
				color: color3[order.indexOf(i + 1) % 2],
				rail: {
					offset: i === last ? [0, -0.2, 0] : undefined,
					id: i === last ? 'z' : `y${i + 1}`,
					nodes: [d.replace(/(^[^ ]+ )/, '$1u.1') + 'd.1']
				},
				marbles: [
					{
						type: i === 19 ? 'coil' : undefined,
						mode: i === 19 ? 'ping-pong' : undefined,
						start: Math.floor(m() * (expandPathString(d).length - 1)),
						easing: q() < 0.25 ? 'easeOutQuad' : undefined
					}
				],
				instruments: [
					{ type: 'arrow', kind: 'tri', beat: 0, align: 'back' },
					{
						type: 'arrow',
						point: i === 19 ? 'backward' : 0,
						kind: i === 19 ? 'tri' : 'ring',
						beat: expandPathString(d).length - 1,
						align: i === 19 ? 'back' : 'tip'
					}
				]
			}
	)
)

scene.rails[last + first]!.color = color4[1] // '#111111'
scene.rails[last + first]!.rail.nodes[0] += '12'

// scene.rails.push(<RailData>{
// 	color: c(),
// 	rail: {
// 		id: `o`,
// 		nodes: ['r0.5 i5.2 r4.7 o10.4 l5.2 i10.4']
// 	},
// 	marbles: [{ start: 5 }],
// 	instruments: [
// 		{ type: 'arrow', kind: 'tri', beat: 0, align: 'back' },
// 		// { type: 'arrow', kind: 'point', beat: 2 }
// 	]
// })
