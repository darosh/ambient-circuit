import type { SceneConfig } from '../lib/scene'
import { color3 as colors } from './colors'
import { triggerHandler } from '../lib/trigger-handler'
import { Matrix4, Vector3, MathUtils } from 'three/webgpu'

export const scene: SceneConfig = {
	id: 'scene-rings',
	bpm: 120,
	polar: true,
	camera: [9.5, 4.5, 8.5],
	target: [0, 0.75, 0],
	renderPlayOnly: true,
	triggerHandler,
	rails: [
		{
			rail: {
				id: 'r.1',
				offset: [-1, -1, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [1, 0, 1], round: 'both' },
					{ p: [2, 0, 0], round: 'both' },
					{ p: [1, 0, -1], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			instruments: [
				{ beat: 2, type: 'star', sides: 7 },
				{ beat: 2.5, type: 'star', sides: 7 }
			],
			marbles: [
				{ start: 0, speed: 1 },
				{ start: 2, speed: 2 }
			],
			color: colors[0],
			render: (_ctx) => {
				const time = performance.now() * -0.001
				const rotation = time * Math.PI * 0.5
				return new Matrix4().makeRotationY(rotation)
			}
		},
		{
			rail: {
				id: 'r.2',
				offset: [-0.75, 0.5, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [0.5, 0, 0.5], round: 'both' },
					{ p: [1, 0, 0], round: 'both' },
					{ p: [0.5, 0, -0.5], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			instruments: [{ beat: 2, type: 'star', sides: 7 }],
			color: colors[1]
		},
		{
			rail: {
				id: 'r.4',
				offset: [1.75, 0.5, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [0.5, 0, 0.5], round: 'both' },
					{ p: [1, 0, 0], round: 'both' },
					{ p: [0.5, 0, -0.5], round: 'both' },
					{ p: [0, 0, 0], round: 'both', beat: 4 }
				]
			},
			instruments: [{ beat: 3, type: 'star', sides: 7 }],
			marbles: [
				{ start: 0, speed: 1 },
				{ start: 1, speed: 1.5 }
			],
			render: (_ctx) => {
				const time = performance.now() * 0.0007
				const rotation = time * Math.PI * 0.5
				return new Matrix4().makeRotationY(rotation)
			},
			color: colors[0]
		},
		{
			rail: {
				id: 'r.3',
				offset: [-1.25, 0, 0],
				transform: (v: Vector3) => {
					v.applyAxisAngle(new Vector3(0, 0, 1), MathUtils.DEG2RAD * -12.5)
					return v
				},
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [1.5, 0, 1.5], round: 'both' },
					{ p: [3, 0, 0], round: 'both' },
					{ p: [1.5, 0, -1.5], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			render: () => {
				const time = performance.now() * 0.001
				const rotation = time * Math.PI * 0.125
				return new Matrix4().makeRotationY(rotation)
			},
			instruments: [
				{ beat: 2, type: 'star', sides: 7 },
				{ beat: 3, type: 'star', sides: 7 }
			],
			color: colors[1]
		},
		{
			rail: {
				id: 'r.5',
				offset: [-3.25, 0, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [3, 0, 3], round: 'both' },
					{ p: [6, 0, 0], round: 'both' },
					{ p: [3, 0, -3], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			instruments: [
				{ beat: 2.5, type: 'star', sides: 7 },
				{ beat: 3.5, type: 'star', sides: 7 }
			],
			color: colors[1],
			marbles: [{ speed: 0.2 }, { speed: 0.2, direction: 'backward', start: 1 }],
			render: (time) => {
				// const scale = 1 + Math.sin((time * Math.PI * 2) / 42) * 0.125
				// return new Matrix4().makeScale(scale, scale, scale)
				const r = new Matrix4().makeRotationAxis(
					new Vector3(0, 1, 0.25).normalize(),
					MathUtils.DEG2RAD * time * 12
				)

				return new Matrix4()
					.makeRotationAxis(new Vector3(1, 2, 0).normalize(), MathUtils.DEG2RAD * 12.5)
					.multiply(r)
			}
		},
		{
			rail: {
				id: 'r.6',
				offset: [0, -2, -1],
				transform: new Matrix4().makeRotationX(Math.PI / 4),
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [0, 2, 2], round: 'both' },
					{ p: [0, 4, 0], round: 'both' },
					{ p: [0, 2, -2], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			instruments: [
				{ beat: 2.5, type: 'star', sides: 7 },
				{ beat: 3.5, type: 'star', sides: 7 }
			],
			marbles: [{ speed: 0.333 }, { speed: 0.5, start: 1 }, { speed: 0.666, start: 2 }],
			render: () => {
				const time = performance.now() * 0.001
				const rotation = time * Math.PI * 0.125
				return new Matrix4().makeRotationAxis(new Vector3(0, 1, -1).normalize(), rotation)
			},
			color: colors[0]
		},
		{
			rail: {
				id: 'r.7',
				offset: [-2, 1, 0],
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [2, 0, 2], round: 'both' },
					{ p: [4, 0, 0], round: 'both' },
					{ p: [2, 0, -2], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			instruments: [
				{ beat: 2.5, type: 'star', sides: 7 },
				{ beat: 3.5, type: 'star', sides: 7 }
			],
			color: colors[0]
		},
		{
			rail: {
				id: 'r.8',
				// offset: [-0.75, 3.5, 0],
				transform: (v) => {
					return v
						.applyAxisAngle(new Vector3(1, 0, 0), MathUtils.DEG2RAD * -45)
						.add(new Vector3(-0.5, 2.5, 0))
				},
				nodes: [
					{ p: [0, 0, 0], round: 'both' },
					{ p: [0.5, 0, 0.5], round: 'both' },
					{ p: [1, 0, 0], round: 'both' },
					{ p: [0.5, 0, -0.5], round: 'both' },
					{ p: [0, 0, 0], round: 'both' }
				]
			},
			instruments: [{ beat: 2, type: 'star', sides: 7 }],
			color: colors[1],
			render: () => {
				const time = performance.now() * 0.001
				const rotation = time * Math.PI * 0.125
				return new Matrix4().makeRotationAxis(new Vector3(0, 1, -1).normalize(), rotation)
			}
		}
	]
}
