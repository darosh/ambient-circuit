import type { SceneConfig } from '../lib/scene'
import { triggerHandler } from '../lib/trigger-handler'

const colors = ['#0000ff', '#ff00ff', '#ff0000', '#ff8888', '#8800ff']
let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-structure',
	bpm: 120,
	triggerHandler,
	rails: [
		{
			color: c(),
			rail: {
				id: 'structure',
				nodes: [
					'o1 r1 u1 r1 d1 l1 d1 r1 u1 l1 u1 r1 d1 l1 d1 r1 ',
					'o1 l1 u1 l1 d1 r1 d1 l1 u1 r1 u1 l1 d1 r1 d1 l1 ',
					'i1 r1 i1 u1 i1 l1 i1 d1 i1 r1 i1 u1 i1 l1 i1 d1 ',
					'o2 r2 u1 r1 u1 l2 u1 r1 d1 r2 d1 l1 d1 r1 d1 l1 ',
					'u1 l1 u1 r1 u1 l1 u1 r1 d1 l1 d1 r1 d1 l1 d1 r1 ',
					'i2 l2 i1 l1 i1 r2 i1 l1 u1 l2 u1 r1 u1 l1 u1 r1 ',
					'o1 r1 o1 u1 o1 l1 o1 d1 o1 r1 o1 u1 o1 l1 o1 d1 ',
					'r1 u1 r1 l1 r1 d1 r1 l1 u1 r1 u1 l1 u1 r1 u1 l1 ',
					'i1 l1 i1 r1 i1 l1 i1 r1 d1 l1 d1 r1 d1 l1 d1 r1 ',
					'o1 u1 o1 r1 o1 u1 o1 l1 o1 d1 o1 l1 o1 u1 o1 r1 ',
					'l1 d1 l1 r1 l1 u1 l1 r1 d1 l1 d1 r1 d1 l1 d1 r1 ',
					'i1 r1 i1 l1 i1 r1 i1 l1 u1 r1 u1 l1 u1 r1 u1 l1 ',
					'u2 l2 u1 l1 u1 r2 u1 l1 d1 l2 d1 r1 d1 l1 d1 r1 ',
					'o2 r2 o1 r1 o1 l2 o1 r1 u1 r2 u1 l1 u1 r1 u1 l1 ',
					'd1 r1 d1 l1 d1 r1 d1 l1 i1 r1 i1 l1 i1 r1 i1 l1'
				]
			}
		}
	]
}
