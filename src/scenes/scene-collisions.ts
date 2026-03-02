import type { SceneConfig } from '../lib/core/scene'
import { colors } from './utils/colors'
import { bouncerHandler, triggerHandler } from '../lib/core/trigger-handler'

let ci = 0
const c = () => colors[ci++ % colors.length]

export const scene: SceneConfig = {
	id: 'scene-collisions',
	description: 'Marble collisions\ntest',
	bpm: 160,
	sequencerBeats: 12,
	sequencerMode: 'time',
	triggerHandler,
	bounceHandler: (ctx) => {
		bouncerHandler(ctx)
		// Flash both marbles red on collision
		ctx.marble1.state.color = '#ff0000'
		ctx.marble2.state.color = '#ff0000'
		setTimeout(() => {
			ctx.marble1.state.color = undefined
			ctx.marble2.state.color = undefined
		}, 200)
	},
	bouncerOnlyMode: false,
	duration: 375 / 2,
	velocity: 60,
	pitch: 0,
	camera: [0, 11, 8],
	target: [0, 1, 0],
	audioView: {
		analyzers: false,
		color: '#555599',
		marbleLinks: true,
		module: 0.25
	},
	audio: {
		chains: {
			synth: {
				analyzer: 'fft',
				generator: {
					tone: 'AMSynth',
					poly: 16,
					params: {
						volume: -24,
						'modulation.attack': 0.1,
						'envelope.attack': 0.001,
						'envelope.release': 2,
						'modulation.release': 2,
						'oscillator.type': 'square'
					}
				}
			},
			bass: {
				analyzer: 'fft',
				generator: {
					rnbo: 'feedback-synth',
					params: {
						cutoff: 2216.304_347_826_087,
						overblow: 1.135_869_565_217_39,
						Q: 0.770_108_695_652_17,
						harmonics: 7.847_826_086_956_52,
						left_delay: 10,
						fb: 0,
						right_delay: 10
					}
				},
				fx: [{ tone: 'Volume', params: { volume: -9 } }]
			}
		},
		master: {
			fx: [
				{
					rnbo: 'platereverb',
					preset: 'Dark'
				},
				{
					tone: 'Compressor',
					params: { threshold: -8 }
				},
				{
					tone: 'Volume',
					params: { volume: 36 }
				},
				{
					tone: 'Limiter'
				},
				{
					tone: 'Volume',
					params: { volume: -3 }
				}
			]
		}
	},
	rails: [
		// Simple rail with bouncer marbles
		{
			rail: {
				id: 'two-bouncers',
				nodes: [[-3, 0, -1], 'r r r r r r']
			},
			color: c(),
			marbles: [
				// Two bouncer marbles starting at opposite ends, moving toward each other
				{
					start: 1,
					speed: 0.5,
					direction: 'forward',
					bouncer: true,
					type: 'poly',
					sides: 3,
					audio: { id: 'synth' }
				},
				{ start: 5, speed: 0.5, direction: 'backward', bouncer: true, type: 'ball' }
			]
		},

		// Rail with mixed bouncer and non-bouncer (both affected if EITHER is bouncer)
		{
			rail: {
				id: 'one-bouncer',
				nodes: [[-3, 0, -2], 'r r r r r r']
			},
			color: c(),
			marbles: [
				// Bouncer marble - will affect non-bouncer on collision
				{
					start: 1,
					speed: 1.5,
					direction: 'forward',
					bouncer: true,
					type: 'poly',
					sides: 3,
					audio: { id: 'synth' },
					note: 60 - 12,
					duration: 375
				},
				// Non-bouncer marble - will still bounce when hit by bouncer
				{ start: 4, speed: 0.5, direction: 'forward', bouncer: false, type: 'ball' }
			]
		},

		// Multiple bouncers at different speeds (chaotic)
		{
			rail: {
				id: 'chaos',
				nodes: [[-1.5, 0, 1], 'r r r orb ol l l l ilb ir']
			},
			color: c(),
			marbles: [
				{
					start: 0,
					speed: 0.4,
					direction: 'forward',
					bouncer: true,
					type: 'coil',
					rounds: 2,
					audio: { id: 'synth' },
					note: 60 + 7
				},
				{
					start: 2,
					speed: 0.6,
					direction: 'forward',
					bouncer: true,
					type: 'poly',
					sides: 4,
					audio: { id: 'synth' },
					note: 60 + 12
				},
				{
					start: 4,
					speed: 0.5,
					direction: 'backward',
					type: 'ball',
					bouncer: true,
					audio: { id: 'synth' },
					note: 60 + 5
				},
				{
					start: 6,
					speed: 0.7,
					direction: 'backward',
					bouncer: true,
					type: 'poly',
					sides: 12,
					audio: { id: 'synth' },
					note: 60
				}
			]
		},

		// Ping-pong rail with bouncer
		{
			rail: {
				id: 'ping-pong',
				nodes: [[-2, 0, -3], 'r r r r']
			},
			color: c(),
			marbles: [
				{
					start: 0,
					speed: 0.8,
					mode: 'ping-pong',
					bouncer: true,
					type: 'ball',
					audio: { id: 'bass' },
					note: 60 - 24,
					duration: 375
				},
				{
					start: 2,
					speed: 0.6,
					mode: 'ping-pong',
					bouncer: true,
					type: 'poly',
					sides: 6,
					audio: { id: 'synth' },
					note: 60 + 7
				}
			]
		}
	]
}
