import type { SceneConfig } from '../lib/scene'
import { colorFactory, colors } from './utils/colors'
import { globalHandlerFactory, triggerHandler } from '../lib/trigger-handler'

const c = colorFactory()

export const scene: SceneConfig = {
	id: 'scene-easing',
	description: 'Marble movement easing\nbetween beat positions',
	bpm: 120,
	camera: [0, 17, 6],
	target: [0, 0, 0],
	names: true,
	globalBeatHandler: globalHandlerFactory(),
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'easeOutBounce',
				offset: [-5, 0, 0],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 10 }]
			},
			color: colors[0],
			instruments: [{ beat: 10, type: 'arrow' }],
			marbles: [{ easing: 'easeOutBounce' }]
		},
		{
			rail: {
				id: 'linear',
				offset: [-5, 0, 1],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 10 }]
			},
			color: c(),
			instruments: [{ beat: 10, type: 'arrow' }],
			marbles: [{ easing: 'linear' }]
		},
		{
			rail: {
				id: 'easeOutCubic',
				offset: [-5, 0, -1],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 10 }]
			},
			color: c(),
			marbles: [{ easing: 'easeOutCubic' }],
			instruments: [{ beat: 10, type: 'arrow' }]
		},
		{
			rail: {
				id: 'easeOutElastic',
				offset: [-5, 0, -2],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 10 }]
			},
			color: c(),
			marbles: [{ easing: 'easeOutElastic' }],
			instruments: [{ beat: 10, type: 'arrow' }]
		},
		{
			rail: {
				id: 'easeOutExpo',
				offset: [-5, 0, -3],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 10 }]
			},
			color: c(),
			marbles: [{ easing: 'easeOutExpo' }],
			instruments: [{ beat: 10, type: 'arrow' }]
		},
		{
			rail: {
				id: 'easeInOutQuad',
				offset: [-5, 0, -4],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 10 }]
			},
			color: c(),
			marbles: [{ easing: 'easeInOutQuad' }],
			instruments: [{ beat: 10, type: 'arrow' }]
		},
		{
			rail: {
				id: 'easeInOutCubic',
				offset: [-5, 0, 2],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 10 }]
			},
			color: c(),
			marbles: [{ easing: 'easeInOutCubic' }],
			instruments: [{ beat: 10, type: 'arrow' }]
		},
		{
			rail: {
				id: 'easeOutBack',
				offset: [-5, 0, 3],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 10 }]
			},
			color: c(),
			marbles: [{ easing: 'easeOutBack' }],
			instruments: [{ beat: 10, type: 'arrow' }]
		},
		{
			rail: {
				id: 'easeOutQuad',
				offset: [-5, 0, 4],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 10 }]
			},
			color: c(),
			marbles: [{ easing: 'easeOutQuad' }],
			instruments: [{ beat: 10, type: 'arrow' }]
		}
	]
}
