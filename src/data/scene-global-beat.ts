import type { SceneConfig } from '../lib/scene'
import { colors } from './colors'

let ci = 0
const c = () => colors[ci++ % colors.length]

// Store timer IDs for cleanup
const timers: number[] = []

export const scene: SceneConfig = {
	id: 'scene-global-beat',
	bpm: 120,
	globalBeatResolution: 1, // every half beat
	globalBeatHandler(ctx) {
		// Log phase changes and ticks
		if (ctx.phase === 'init') {
			console.log('[GLOBAL] Init - beat:', ctx.beat.toFixed(3))
		} else if (ctx.phase === 'play') {
			console.log('[GLOBAL] Play - beat:', ctx.beat.toFixed(3))
		} else if (ctx.phase === 'pause') {
			console.log('[GLOBAL] Pause - beat:', ctx.beat.toFixed(3))
		} else if (ctx.phase === 'destroy') {
			console.log('[GLOBAL] Destroy - beat:', ctx.beat.toFixed(3), 'clearing', timers.length, 'timers')
			// Cleanup any timers/intervals here
			timers.forEach((id) => clearTimeout(id))
			timers.length = 0
		} else if (ctx.phase === 'tick') {
			// Log every tick
			console.log('[GLOBAL] beat:', ctx.beat.toFixed(3))

			ctx.scene.instruments[0].state.visible = false

			const timer = setTimeout(() => {
				ctx.scene.instruments[0]!.state.visible = true
			}, 100)
			timers.push(timer)
		}
	},
	triggerHandler(ctx) {
		console.log('TRIGGER', ctx.railId, ctx.beat)
		ctx.instrument.signal!.intensity = 1
		ctx.marble.signal.intensity = 1

		if (ctx.instrument.actionHandler) {
			ctx.instrument.actionHandler(ctx)
		}
	},
	rails: [
		// Simple rail with instrument at downbeats
		{
			rail: {
				id: 'test-global',
				offset: [-4, 0, 0],
				nodes: [[0, 0, 0], 'r r r r r r r r']
			},
			color: c(),
			marbles: [{ type: 'ball', start: 0 }],
			instruments: [
				{ type: 'sun', beat: 0 },
				{ type: 'sun', beat: 4 },
				{ type: 'sun', beat: 8 }
			]
		}
	]
}
