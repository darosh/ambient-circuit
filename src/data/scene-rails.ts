import type { SceneConfig } from '../lib/scene'
import { triggerHandler } from '../lib/trigger-handler'

const colors = ['#0000ff', '#8800ff', '#ff8888', '#ff00ff', '#ff0000']
let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-rails',
	bpm: 120,
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'sharp',
				nodes: [[-4, 0, -4], 'uu oo']
			},
			color: c()
		},
		{
			rail: {
				id: 'from',
				nodes: [[-2, 0, -4], 'uuf oo']
			},
			color: c()
		},
		{
			rail: {
				id: 'to',
				nodes: [[-1, 0, -4], 'uut oo']
			},
			color: c()
		},
		{
			rail: {
				id: 'both',
				nodes: [[-0, 0, -4], 'uub oo']
			},
			color: c()
		},
		{
			rail: {
				id: 't.2',
				// nodes: [[1, 0, -4], { p: [1, 2, -4], round: 'both', tangent: 0.2 }, 'oo']
				nodes: [[1, 0, -4], [1, 2, -4, 'both', 0.2], 'oo']
			},
			color: c()
		},
		{
			rail: {
				id: 't.6',
				nodes: [[2, 0, -4], { p: [2, 2, -4], round: 'both', tangent: 0.6 }, 'oo']
			},
			color: c()
		},
		{
			rail: {
				id: 't.8',
				nodes: [[3, 0, -4], { p: [3, 2, -4], round: 'both', tangent: 0.8 }, 'oo']
			},
			color: c()
		},
		{
			rail: {
				id: 't1',
				nodes: [[4, 0, -4], { p: [4, 2, -4], round: 'both', tangent: 1 }, 'oo']
			},
			color: c()
		},
		{
			rail: {
				id: 'r0',
				offset: [-4, 0, 0],
				nodes: [
					{ p: [0, 0, 0] },
					{ p: [1, 0, 1] },
					{ p: [2, 0, 0] },
					{ p: [1, 0, -1] },
					{ p: [0, 0, 0] }
				]
			},
			color: c()
		},
		{
			rail: {
				id: 'r.39',
				offset: [-1, 0, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [1, 0, 1], round: 'both' },
					{ p: [2, 0, 0], round: 'both' },
					{ p: [1, 0, -1], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			color: c()
		},
		{
			rail: {
				id: 'r.8',
				offset: [2, 0, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both', tangent: 0.8 },
					{ p: [1, 0, 1], round: 'both', tangent: 0.8 },
					{ p: [2, 0, 0], round: 'both', tangent: 0.8 },
					{ p: [1, 0, -1], round: 'both', tangent: 0.8 },
					{ p: [0, 0, 0], round: 'both', tangent: 0.8 }
				]
			},
			color: c()
		}
	]
}
