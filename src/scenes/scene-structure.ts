import type { SceneConfig } from '../lib/scene'
import { colors } from './utils/colors'
import { triggerHandler } from '../lib/trigger-handler'
import { randomizer } from './utils/randomizer'

let ci = 0
const _c = () => colors[ci++ % colors.length]

const r = randomizer(2)

export const scene: SceneConfig = {
	id: 'scene-structure',
	description: 'Test scene\nwith 36 marbles\nand 36 instruments',
	bpm: 120,
	triggerHandler,
	camera: [12, 7, -17],
	target: [0, 2.2, 0],
	rails: [
		{
			color: colors[1],
			rail: {
				id: 'sector-a',
				nodes: [
					'o o o l l l l u u u u',
					'o1 r1 u1 r1 d1 l1 d1 r1 u1 l1 u1 r1 d1 l1 d1 r1 ',
					'o1 l1 u1 l1 d1 r1 d1 l1 u1 r1 u1 l1 d1 r1 d1 l1 ',
					'i1 r1 i1 u1 i1 l1 i1 d1 i1 r1 i1 u1 i1 l1 i1 d1 '
				]
			},
			marbles: Array.from({ length: 12 }).map(() => ({
				direction: r() < 0.5 ? 'backward' : 'forward',
				start: Math.round(r() * 50),
				speed: Math.floor(r() * 2 + 1)
			})),
			instruments: Array.from({ length: 12 }).map(() => ({
				beat: Math.round(r() * 50) + 0.5,
				type: 'sun'
			}))
		},
		{
			color: colors[0],
			rail: {
				id: 'sector-b',
				nodes: [
					'o2 r2 u1 r1 u1 l2 u1 r1 d1 r2 d1 l1 d1 r1 d1 l1 ',
					'u1 l1 u1 r1 u1 l1 u1 r1 d1 l1 d1 r1 d1 l1 d1 r1 ',
					'i2 l2 i1 l1 i1 r2 i1 l1 u1 l2 u1 r1 u1 l1 u1 r1 ',
					'o1 r1 o1 u1 o1 l1 o1 d1 o1 r1 o1 u1 o1 l1 o1 d1 '
				]
			},
			marbles: Array.from({ length: 12 }).map(() => ({
				direction: r() < 0.5 ? 'backward' : 'forward',
				start: Math.round(r() * 60),
				speed: Math.floor(r() * 2 + 1)
			})),
			instruments: Array.from({ length: 12 }).map(() => ({
				beat: Math.round(r() * 60) + 0.5,
				type: 'sun'
			}))
		},
		{
			color: colors[3],
			rail: {
				id: 'sector-c',
				nodes: [
					'r1 u1 r1 l1 r1 d1 r1 l1 u1 r1 u1 l1 u1 r1 u1 l1 ',
					'i1 l1 i1 r1 i1 l1 i1 r1 d1 l1 d1 r1 d1 l1 d1 r1 ',
					'o1 u1 o1 r1 o1 u1 o1 l1 o1 d1 o1 l1 o1 u1 o1 r1 ',
					'l1 d1 l1 r1 l1 u1 l1 r1 d1 l1 d1 r1 d1 l1 d1 r1 ',
					'i1 r1 i1 l1 i1 r1 i1 l1 u1 r1 u1 l1 u1 r1 u1 l1 ',
					'u2 l2 u1 l1 u1 r2 u1 l1 d1 l2 d1 r1 d1 l1 d1 r1 ',
					'o2 r2 o1 r1 o1 l2 o1 r1 u1 r2 u1 l1 u1 r1 u1 l1 ',
					'd1 r1 d1 l1 d1 r1 d1 l1 i1 r1 i1 l1 i1 r1 i1 l1'
				]
			},
			marbles: Array.from({ length: 12 }).map(() => ({
				direction: r() < 0.5 ? 'backward' : 'forward',
				start: Math.round(r() * 110),
				speed: Math.floor(r() * 2 + 1)
			})),
			instruments: Array.from({ length: 12 }).map(() => ({
				beat: Math.round(r() * 110) + 0.5,
				type: 'sun'
			}))
		}
	]
}
