import type { SceneConfig } from '../lib/core/scene'
import { color3 as colors } from './utils/colors'
import { triggerHandler } from '../lib/core/trigger-handler'
import { Matrix4, Vector3, MathUtils } from 'three/webgpu'

// Cached math objects for render functions (allocated once, reused every frame)
const _axis_y = new Vector3(0, 1, 0)
const _axis_y025 = new Vector3(0, 1, 0.25).normalize()
const _axis_12 = new Vector3(1, 2, 0).normalize()
const _axis_y_n1 = new Vector3(0, 1, -1).normalize()
const _mat_r = new Matrix4()

export const scene: SceneConfig = {
	id: 'scene-rings',
	bpm: 30,
	polar: true,
	camera: [9.5, 4.5, 8.5],
	target: [0, 0.75, 0],
	rotatePlay: 0.125,
	sequencerMode: 'time',
	stars: true,
	// particles: {
	// 	count: 256,
	// 	spread: Math.PI / 12,
	// 	duration: 2,
	// 	speed: 4,
	// 	range: .2,
	// 	radius: 2.9,
	// 	opacity: .7,
	// 	gravity: [0,-14,0]
	// },
	audioView: {
		analyzers: false,
		offset: [0, -0.5, 0],
		module: 0.25,
		color: '#333366',
		midiAlpha: 0.4
	},
	// renderPlayOnly: true,
	triggerHandler,
	audio: {
		chains: {
			synth: {
				analyzer: 'fft',
				generator: {
					tone: 'Synth',
					params: {
						'envelope.attack': 1,
						volume: 0,
						detune: -3,
						'oscillator.type': 'sawtooth'
					}
				}
			}
		},
		master: {
			analyzer: 'meter',
			fx: [
				{
					rnbo: 'gigaverb',
					params: { early: 0.4, revtime: 33, roomsize: 106, dry: 0, tail: 0.9, damping: 0.3 }
				},
				{ tone: 'Compressor', params: { threshold: -24 } }
			]
		}
	},
	rails: [
		{
			id: 'x*1',
			offset: [-1, -1, 0],
			nodes: [
				{ p: [0, 0, 0], round: 'both' },
				{ p: [1, 0, 1], round: 'both' },
				{ p: [2, 0, 0], round: 'both' },
				{ p: [1, 0, -1], round: 'both' },
				{ p: [0, 0, 0], round: 'both' }
			],
			instruments: [
				{ beat: 2, type: 'star', sides: 7 },
				{ beat: 2.5, type: 'star', sides: 7 }
			],
			marbles: [
				{ start: 0, speed: 1 },
				{ start: 2, speed: 2 }
			],
			color: colors[0],
			render: (out) => {
				const rotation = performance.now() * -0.001 * Math.PI * 0.5
				out.makeRotationAxis(_axis_y, rotation)
			}
		},
		{
			id: 'y*2',
			offset: [-0.75, 0.5, 0],
			nodes: [
				{ p: [0, 0, 0], round: 'both' },
				{ p: [0.5, 0, 0.5], round: 'both' },
				{ p: [1, 0, 0], round: 'both' },
				{ p: [0.5, 0, -0.5], round: 'both' },
				{ p: [0, 0, 0], round: 'both' }
			],
			instruments: [{ beat: 2, type: 'star', sides: 7, audio: { id: 'synth' }, note: 60 - 12 }],
			color: colors[1]
		},
		{
			id: 'x*4',
			offset: [1.75, 0.5, 0],
			nodes: [
				{ p: [0, 0, 0], round: 'both' },
				{ p: [0.5, 0, 0.5], round: 'both' },
				{ p: [1, 0, 0], round: 'both' },
				{ p: [0.5, 0, -0.5], round: 'both' },
				{ p: [0, 0, 0], round: 'both', beat: 4 }
			],
			instruments: [{ beat: 3, type: 'star', sides: 7 }],
			marbles: [
				{ start: 0, speed: 1 },
				{ start: 1, speed: 1.5 }
			],
			render: (out) => {
				const rotation = performance.now() * 0.0007 * Math.PI * 0.5
				out.makeRotationAxis(_axis_y, rotation)
			},
			color: colors[0]
		},
		{
			id: 'y*3',
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
			],
			render: (out) => {
				const rotation = performance.now() * 0.001 * Math.PI * 0.125
				out.makeRotationAxis(_axis_y, rotation)
			},
			instruments: [
				{ beat: 2, type: 'star', sides: 7 },
				{ beat: 3, type: 'star', sides: 7 }
			],
			color: colors[1]
		},
		{
			id: 'y*5',
			offset: [-3.25, 0, 0],
			nodes: [
				{ p: [0, 0, 0], round: 'both' },
				{ p: [3, 0, 3], round: 'both' },
				{ p: [6, 0, 0], round: 'both' },
				{ p: [3, 0, -3], round: 'both' },
				{ p: [0, 0, 0], round: 'both' }
			],
			instruments: [
				{ beat: 2.5, type: 'star', sides: 7 },
				{ beat: 3.5, type: 'star', sides: 7 }
			],
			color: colors[1],
			marbles: [{ speed: 0.2 }, { speed: 0.2, direction: 'backward', start: 1 }],
			render: (out, _ctx, beat) => {
				// const scale = 1 + Math.sin((beat * Math.PI * 2) / 42) * 0.125
				// out.makeScale(scale, scale, scale)
				const r = _mat_r.makeRotationAxis(_axis_y025, MathUtils.DEG2RAD * beat * 12)
				out.makeRotationAxis(_axis_12, MathUtils.DEG2RAD * 12.5).multiply(r)
			}
		},
		{
			id: 'x*6',
			offset: [0, -2, -1],
			transform: new Matrix4().makeRotationX(Math.PI / 4),
			nodes: [
				{ p: [0, 0, 0], round: 'both' },
				{ p: [0, 2, 2], round: 'both' },
				{ p: [0, 4, 0], round: 'both' },
				{ p: [0, 2, -2], round: 'both' },
				{ p: [0, 0, 0], round: 'both' }
			],
			instruments: [
				{ beat: 2.5, type: 'star', sides: 7, audio: { id: 'synth' } },
				{ beat: 3.5, type: 'star', sides: 7, audio: { id: 'synth' } }
			],
			marbles: [
				{ speed: 0.333, note: 60 },
				{ speed: 0.5, start: 1, note: 67 },
				{ speed: 0.666, start: 2, note: 72 }
			],
			render: (out) => {
				const rotation = performance.now() * 0.001 * Math.PI * 0.125
				out.makeRotationAxis(_axis_y_n1, rotation)
			},
			color: colors[0]
		},
		{
			id: 'x*7',
			offset: [-2, 1, 0],
			nodes: [
				{ p: [0, 0, 0], round: 'both' },
				{ p: [2, 0, 2], round: 'both' },
				{ p: [4, 0, 0], round: 'both' },
				{ p: [2, 0, -2], round: 'both' },
				{ p: [0, 0, 0], round: 'both' }
			],
			instruments: [
				{ beat: 2.5, type: 'star', sides: 7 },
				{ beat: 3.5, type: 'star', sides: 7 }
			],
			color: colors[0]
		},
		{
			id: 'y*8',
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
			],
			instruments: [{ beat: 2, type: 'star', sides: 7, audio: { id: 'synth' }, note: 60 - 12 + 7 }],
			color: colors[1],
			render: (out) => {
				const rotation = performance.now() * 0.001 * Math.PI * 0.125
				out.makeRotationAxis(_axis_y_n1, rotation)
			}
		}
	]
}
