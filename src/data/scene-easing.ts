import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'
import { globalHandlerFactory, triggerHandler } from '../lib/trigger-handler'

export const scene: SceneConfig = {
	id: 'scene-easing',
	bpm: 120,
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
			instruments: [
				{
					beat: 10,
					type: 'arrow'
				}
			],
			marbles: [{ easing: 'easeOutBounce' }]
		},
		{
			rail: {
				id: 'linear',
				offset: [-5, 0, 1],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 10 }]
			},
			color: colors[1],
			marbles: [
				{
					easing: 'linear'
				}
			]
		},
		{
			rail: {
				id: 'easeOutCubic',
				offset: [-5, 0, -1],
				nodes: [[0, 0, 0], { p: [10, 0, 0], beat: 10 }]
			},
			color: colors[2],
			marbles: [
				{
					easing: 'easeOutCubic'
				}
			],
			instruments: [
				{
					beat: 10,
					type: 'arrow'
				}
			]
		}
	]
}
