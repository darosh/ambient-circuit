import { SceneConfig } from '../lib/core/scene'
import { getTextRailNodes } from '../lib/video/text-geometry'
import { RailData } from '../lib/core/rail-data'
import { triggerHandler } from '../lib/core/trigger-handler'
import { AudioChainConfig } from '../lib/audio'
import { createFloating } from './utils/floating'
import { svgRail } from '../lib/core/rail-primitives'
import { colorFactory } from './utils/colors'

const c = colorFactory()

const audio: AudioChainConfig[] = [
	{
		analyzer: true,
		generator: { sample: 'flute' },
		fx: [{ tone: 'Volume', params: { volume: -12 } }]
	},
	{ analyzer: true, generator: { sample: 'guitar-electric' } }
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
		tint: [1, 1, 1.05],
		audio: {
			chains: {
				a: audio[0],
				b: audio[1]
			},
			master: {
				analyzer: true,
				fx: [{ rnbo: 'rotavibe' }, { rnbo: 'gigaverb', params: { dry: 0 } }]
			}
		},
		audioView: {
			offset: [0, -0.5, -1],
			color: '#eeddff',
			all: true,
			defaultAnalyser: 'fft'
		},
		sequencerMode: 'time',
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

// scene[1].rails[1].rail.offset[0] -= 5.5
// scene[1].rails[1].rail.offset[1] -= 1.2

scene[1].renderFactory = (_, seed) => createFloating({ seed })

for (const v of [3, 8, 10, 13, 21, 27, 28, 33, 35, 40]) {
	scene[1].rails[0].instruments!.push({
		type: 'cross',
		note: 50 + v,
		visible: false,
		sides: 3,
		beat: v,
		audio: { id: 'a' }
	})
}

for (const v of [3, 12, 15, 22, 32, 36, 40, 45]) {
	scene[1].rails[1].instruments!.push({
		type: 'cross',
		note: 80 - v,
		visible: false,
		sides: 3,
		beat: v,
		audio: { id: 'b' }
	})
}

scene[1].rails!.push({
	color: c(),
	rail: {
		id: 'svg-1',
		nodes: svgRail('M 5,95 V 85 L 7.5,80 V 75 L 10,70 V 55 40 L 7.5,35 V 17.5 L 5,10 V 5')
	},
	marbles: [{ start: 3 }],
	instruments: [
		{ type: 'arrow', kind: 'dot', beat: 1, align: 'back' },
		{ type: 'arrow', kind: 'dot', beat: 0 }
	]
})

scene[1].rails!.push({
	color: c(),
	rail: {
		offset: [0.5, 0, 0],
		id: 'svg-2',
		nodes: svgRail('M 5,95 V 85 L 7.5,80 V 75 L 10,70 V 55 40 L 7.5,35 V 17.5 L 5,10 V 5')
	},
	marbles: [{ start: 3 }],
	instruments: [
		{ type: 'arrow', kind: 'point', beat: 0, align: 'back' },
		{ type: 'arrow', kind: 'point', beat: 1 }
	]
})

scene[1].rails!.push({
	color: c(),
	rail: {
		offset: [1, 0, 0],
		id: 'svg-3',
		nodes: svgRail('M 5,95 V 85 L 7.5,80 V 75 L 10,70 V 55 40 L 7.5,35 V 17.5 L 5,10 V 5')
	},
	marbles: [{ start: 3 }],
	instruments: [
		{ type: 'arrow', kind: 'ring', beat: 0, align: 'back' },
		{ type: 'arrow', kind: 'ring', beat: 1 }
	]
})

scene[1].rails!.push({
	color: c(),
	rail: {
		offset: [1.5, 0, 0],
		id: 'svg-4',
		nodes: svgRail('M 5,95 V 85 L 7.5,80 V 75 L 10,70 V 55 40 L 7.5,35 V 17.5 L 5,10 V 5')
	},
	marbles: [{ start: 3 }],
	instruments: [
		{ type: 'arrow', kind: 'rec', beat: 0, align: 'back' },
		{ type: 'arrow', kind: 'rec', beat: 1 }
	]
})

scene[1].rails!.push({
	color: c(),
	rail: {
		offset: [2, 0, 0],
		id: 'svg-6',
		nodes: svgRail('M 5,95 V 85 L 7.5,80 V 75 L 10,70 V 55 40 L 7.5,35 V 17.5 L 5,10 V 5')
	},
	marbles: [{ start: 3 }],
	instruments: [
		{ type: 'arrow', kind: 'tri', beat: 0, align: 'back' },
		{ type: 'arrow', kind: 'tri', beat: 1 }
	]
})

scene[1].rails!.push({
	color: c(),
	rail: {
		id: 'svg-5',
		nodes: svgRail('m 95,5 v 10 l -2.5,5 v 5 l -2.5,5 V 45 60 L 92.5,65 V 82.5 L 95,90 v 5')
	}
})
