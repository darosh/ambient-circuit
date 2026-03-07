/**
 * Diagnostic test: first-frame camera glitch in sceneMulti32.
 * Simulates the camera init path for splits[0] and splits[1], with marble
 * positions at [0,0,0] on frame 0 (before marble-system runs) and at real
 * rail offsets on frame 1+.
 */
import { describe, it, expect } from 'vitest'
import { Vector3 } from 'three'
import {
	initLerpTargets,
	initCamStates,
	initSplitStates,
	updateTargetLerp,
	updateCameraForSplit,
	resolveMarbleOrVec,
	type SplitCamState,
	type ResolvedTarget
} from '../src/lib/components/multi-view/multi-view'
import type { SceneCtx } from '../src/lib/core/scene-ctx'
import { sceneMulti32 } from '../src/scenes/scene-multi-test'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LOG = (..._data: any[]) => {}

// Rail offsets for sceneMulti32's 16 rails (in order)
const RAIL_OFFSETS: [number, number, number][] = [
	[0, 0, 0], // long
	[-3, 0, -3], // tri
	[-4, 0, -3], // back
	[3, 0, -3], // cones
	[0, 0, -3], // round-all
	[0, 0, 0], // round-rect
	[0, 0, 0], // coil (pos.x=-3 inside primitive, offset not set)
	[0, -0.5, 0], // spiral
	[0, 0, 0], // poly-round
	[0, 0, 2], // split
	[3, 0, 2], // round-one
	[-3, 0, 2], // round-split
	[-3.5, -0.5, 3], // split-ping
	[2, 0, 3], // square-coil
	[3, 0, -4], // square
	[0, 0, 4] // loop
]

function makeCtx(positions: { x: number; y: number; z: number }[]): SceneCtx {
	return {
		marbles: positions.map((p) => ({
			marble: { position: p, tangent: { x: 0, y: 0, z: 1 } }
		}))
	} as unknown as SceneCtx
}

const fmt = (v: { x: number; y: number; z: number }) =>
	`(${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)})`

describe('sceneMulti32 first-frame camera glitch', () => {
	it('splits[0] and splits[1]: no large jump between frame0 and frame1', () => {
		const splits = sceneMulti32.view!.splits
		const splitCount = Math.min(2, splits.length)
		const splitConfigs = splits.slice(0, splitCount)

		const lerpTargets = initLerpTargets(splitConfigs)
		const camStates: SplitCamState[] = initCamStates(splitConfigs)
		const splitStates = initSplitStates(splitConfigs)

		const camPositions = splitConfigs.map(() => new Vector3(5, 7, 9))
		const _out: ResolvedTarget = {
			pos: new Vector3(),
			tangent: new Vector3(),
			hasTangent: false
		}
		const _desired = new Vector3()

		const delta = 1 / 60

		const log: string[] = []
		const snapPositions: Vector3[] = []

		for (let frame = 0; frame < 10; frame++) {
			// Frame 0: all marbles at origin (before marble-system runs)
			// Frame 1+: marbles at rail offsets
			const positions =
				frame === 0
					? RAIL_OFFSETS.map(() => ({ x: 0, y: 0, z: 0 }))
					: RAIL_OFFSETS.map(([x, y, z]) => ({ x, y, z }))

			const ctx = makeCtx(positions)

			for (let i = 0; i < splitCount; i++) {
				const cs = camStates[i]
				const state = splitStates[i]
				const camPos = camPositions[i]
				const alphaTgt = 1 - Math.exp(-state.smoothnessTarget * delta * 60)

				const tgtVal = state.target ?? splitConfigs[i].target ?? null
				const tgtResolved = resolveMarbleOrVec(tgtVal as never, ctx, _out)
				if (tgtResolved) {
					updateTargetLerp(lerpTargets[i], tgtResolved.pos, alphaTgt, cs.inited)
				}

				const camVal = state.camera ?? splitConfigs[i].camera ?? null
				const camResolved = resolveMarbleOrVec(camVal as never, ctx, _out)
				if (camResolved) {
					_desired.copy(camResolved.pos)
					updateCameraForSplit(camPos, cs, state, lerpTargets[i], _desired, delta)
				}

				log.push(
					`frame=${frame} split=${i} cam=${fmt(camPos)} lerpTgt=${fmt(lerpTargets[i])}` +
						` r=${cs.radius.toFixed(3)} yaw=${cs.yaw.toFixed(3)} pitch=${cs.pitch.toFixed(3)}`
				)

				// Capture camera position after snap frame
				if (frame === 0) {
					snapPositions[i] = camPos.clone()
				}
			}
		}

		LOG('Per-frame camera state:\n' + log.join('\n'))

		// Check no large jump between frame 0 (snap) and frame 1
		for (let i = 0; i < splitCount; i++) {
			const snapPos = snapPositions[i]
			const frame1Pos = camPositions[i]
			const jump = snapPos.distanceTo(frame1Pos)

			LOG(`split=${i}: snap=${fmt(snapPos)} frame1=${fmt(frame1Pos)} jump=${jump.toFixed(4)}`)

			expect(
				jump,
				`split[${i}] camera jumped ${jump.toFixed(4)} units between frame0 and frame1 (expected < 0.5)`
			).toBeLessThan(0.5)
		}
	})

	it('all splits: no inited snap with wrong marble position', () => {
		const splits = sceneMulti32.view!.splits

		const lerpTargets = initLerpTargets(splits)
		const camStates: SplitCamState[] = initCamStates(splits)
		const splitStates = initSplitStates(splits)
		const camPositions = splits.map(() => new Vector3(5, 7, 9))
		const _out: ResolvedTarget = { pos: new Vector3(), tangent: new Vector3(), hasTangent: false }
		const _desired = new Vector3()
		const delta = 1 / 60

		// Run frame 0 (marbles at origin = pre-marble-system)
		const ctxF0 = makeCtx(RAIL_OFFSETS.map(() => ({ x: 0, y: 0, z: 0 })))
		const snapPos = splits.map(() => new Vector3())

		for (const [i, split] of splits.entries()) {
			const cs = camStates[i]
			const state = splitStates[i]
			const camPos = camPositions[i]
			const alphaTgt = 1 - Math.exp(-state.smoothnessTarget * delta * 60)

			const tgtVal = state.target ?? split.target ?? null
			const tgtResolved = resolveMarbleOrVec(tgtVal as never, ctxF0, _out)
			if (tgtResolved) updateTargetLerp(lerpTargets[i], tgtResolved.pos, alphaTgt, cs.inited)

			const camVal = state.camera ?? split.camera ?? null
			const camResolved = resolveMarbleOrVec(camVal as never, ctxF0, _out)
			if (camResolved) {
				_desired.copy(camResolved.pos)
				updateCameraForSplit(camPos, cs, state, lerpTargets[i], _desired, delta)
			}
			snapPos[i].copy(camPos)
		}

		// Run frame 1 (marbles at real positions)
		const ctxF1 = makeCtx(RAIL_OFFSETS.map(([x, y, z]) => ({ x, y, z })))
		const maxJumps: { split: number; jump: number; target: unknown }[] = []

		for (const [i, split] of splits.entries()) {
			const cs = camStates[i]
			const state = splitStates[i]
			const camPos = camPositions[i]
			const alphaTgt = 1 - Math.exp(-state.smoothnessTarget * delta * 60)

			const tgtVal = state.target ?? split.target ?? null
			const tgtResolved = resolveMarbleOrVec(tgtVal as never, ctxF1, _out)
			if (tgtResolved) updateTargetLerp(lerpTargets[i], tgtResolved.pos, alphaTgt, cs.inited)

			const camVal = state.camera ?? split.camera ?? null
			const camResolved = resolveMarbleOrVec(camVal as never, ctxF1, _out)
			if (camResolved) {
				_desired.copy(camResolved.pos)
				updateCameraForSplit(camPos, cs, state, lerpTargets[i], _desired, delta)
			}

			const jump = snapPos[i].distanceTo(camPos)
			if (jump > 0.01) {
				maxJumps.push({ split: i, jump, target: split.target })
			}
		}

		if (maxJumps.length > 0) {
			LOG(
				'Splits with camera jump > 0.01 between frame0 and frame1:\n' +
					maxJumps
						.map((j) => `  split=${j.split} target=${j.target} jump=${j.jump.toFixed(4)}`)
						.join('\n')
			)
		}

		// All jumps should be < 0.5 units
		const largeJumps = maxJumps.filter((j) => j.jump >= 0.5)
		expect(
			largeJumps.length,
			`${largeJumps.length} splits have camera jumps ≥ 0.5 units:\n` +
				largeJumps.map((j) => `  split=${j.split} jump=${j.jump.toFixed(4)}`).join('\n')
		).toBe(0)
	})
})
