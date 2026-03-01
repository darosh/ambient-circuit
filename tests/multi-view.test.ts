import { describe, it, expect, beforeEach } from 'vitest'
import { Vector3 } from 'three'
import {
	updateCameraForSplit,
	updateTargetLerp,
	type SplitCamState,
	type ResolvedTarget
} from '../src/lib/multi-view'
import type { ViewSplitState } from '../src/lib/scene-ctx'

function makeState(): SplitCamState {
	return { radius: 10, yaw: 0, pitch: 0, inited: false, isDragging: false, isDraggingEnd: 0 }
}

function makeViewState(overrides?: Partial<ViewSplitState>): ViewSplitState {
	return {
		camera: null,
		target: null,
		smoothnessRadius: 8,
		smoothnessYaw: 8,
		smoothnessPitch: 8,
		smoothnessTarget: 8,
		maxAngleSpeed: Infinity,
		...overrides
	}
}

function makeResolved(x: number, y: number, z: number): ResolvedTarget {
	return { pos: new Vector3(x, y, z), tangent: new Vector3(0, 0, 1), hasTangent: true }
}

describe('updateCameraForSplit', () => {
	let camPos: Vector3
	let lerpTarget: Vector3
	let desired: Vector3
	let resolved: ResolvedTarget
	let cs: SplitCamState
	let state: ViewSplitState

	beforeEach(() => {
		camPos = new Vector3(5, 7, 9)
		lerpTarget = new Vector3(0, 0, 0)
		desired = new Vector3(5, 7, 9)
		resolved = makeResolved(5, 7, 9)
		cs = makeState()
		state = makeViewState()
	})

	it('snaps to desired position on first frame (inited=false)', () => {
		const delta = 1 / 60
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)

		expect(cs.inited).toBe(true)
		// Camera should be reconstructed at ~desired position relative to target
		const dist = Math.hypot(camPos.x - desired.x, camPos.y - desired.y, camPos.z - desired.z)
		expect(dist).toBeLessThan(0.01)
	})

	it('damps toward desired on subsequent frames', () => {
		const delta = 1 / 60
		// First frame: snap to desired=(5,7,9)
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)
		const snapYaw = cs.yaw

		// Move desired to a very different angle (opposite side)
		desired.set(-5, 7, -9)
		resolved.pos.set(-5, 7, -9)
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)

		// Angle should have moved but not fully reached target (damping)
		expect(cs.yaw).not.toBeCloseTo(snapYaw, 1)
		// Not fully at target angle yet (1 frame of damping from smoothness=8)
		const targetYaw = Math.atan2(-9, -5)
		expect(cs.yaw).not.toBeCloseTo(targetYaw, 1)
	})

	it('when isDragging: syncs spherical from cam but still reconstructs position', () => {
		// First: init so inited=true
		const delta = 1 / 60
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)

		// Set drag, manually set cam position as if OC moved it
		cs.isDragging = true
		camPos.x = 3
		camPos.y = 4
		camPos.z = 0

		const prevX = camPos.x
		const prevY = camPos.y
		const prevZ = camPos.z

		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)

		// Spherical state should have been synced from cam position
		const expectedRadius = Math.hypot(
			lerpTarget.x - prevX,
			lerpTarget.y - prevY,
			lerpTarget.z - prevZ
		)
		expect(cs.radius).toBeCloseTo(expectedRadius, 2)

		// Position should still be reconstructed (sync + reconstruct ≈ identity)
		expect(camPos.x).toBeCloseTo(prevX, 3)
		expect(camPos.y).toBeCloseTo(prevY, 3)
		expect(camPos.z).toBeCloseTo(prevZ, 3)
	})

	it('resumes marble-following after drag ends', () => {
		const delta = 1 / 60
		// Init at desired=(5,7,9)
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)

		// Drag: OC moves cam away
		cs.isDragging = true
		camPos.x = 3
		camPos.y = 4
		camPos.z = 0
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)

		// Drag ends
		cs.isDragging = false
		const posAfterDrag = { ...camPos }

		// A few frames toward desired=(5,7,9)
		for (let f = 0; f < 10; f++) {
			updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)
		}

		// Should be moving toward desired
		const distBefore = Math.hypot(
			posAfterDrag.x - desired.x,
			posAfterDrag.y - desired.y,
			posAfterDrag.z - desired.z
		)
		const distAfter = Math.hypot(camPos.x - desired.x, camPos.y - desired.y, camPos.z - desired.z)
		expect(distAfter).toBeLessThan(distBefore)
	})

	it('tracks moving marble: cam [0,0,0]→[3,2,5], target [0,0,0]→[1,1,2]', () => {
		const delta = 1 / 60
		// Marble moves for MOVE_FRAMES, then holds still; camera must settle within MAX_FRAMES total
		const MOVE_FRAMES = 120 // 2s of marble movement
		const MAX_FRAMES = 600 // 10s total safeguard

		// smoothness=1 → alpha≈0.63/frame — responsive but visible damping lag behind marble
		Object.assign(
			state,
			makeViewState({ smoothnessRadius: 1, smoothnessYaw: 1, smoothnessTarget: 1 })
		)

		const camStart = new Vector3(0, 0, 0)
		const camEnd = new Vector3(3, 2, 5)
		const targetStart = new Vector3(0, 0, 0)
		const targetEnd = new Vector3(1, 1, 2)

		// Snap-init: place camera at starting marble position so spherical state is valid
		camPos = camStart.clone()
		lerpTarget = targetStart.clone()
		desired.copy(camStart)
		resolved.pos.copy(camStart)
		updateTargetLerp(lerpTarget, targetStart, 1, false)
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)

		const TOL = 0.005
		let frame = 0
		const log: string[] = []

		const fmt = (v: { x: number; y: number; z: number }) =>
			`(${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)})`

		log.push(
			`f=INIT cam=${fmt(camPos)} tgt=${fmt(lerpTarget)} r=${cs.radius.toFixed(3)} yaw=${cs.yaw.toFixed(3)} pitch=${cs.pitch.toFixed(3)}`
		)

		const alphaTgt = 1 - Math.exp(-state.smoothnessTarget * delta * 60)
		// Current marble/target positions (move linearly for MOVE_FRAMES, then hold)
		const marblePos = camStart.clone()
		const targetPos = targetStart.clone()

		while (frame < MAX_FRAMES) {
			frame++
			const t = Math.min(frame / MOVE_FRAMES, 1)

			// Advance marble and target positions this frame
			marblePos.lerpVectors(camStart, camEnd, t)
			targetPos.lerpVectors(targetStart, targetEnd, t)

			desired.copy(marblePos)
			resolved.pos.copy(marblePos)

			updateTargetLerp(lerpTarget, targetPos, alphaTgt, cs.inited)
			updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)

			const distCam = Math.hypot(camPos.x - camEnd.x, camPos.y - camEnd.y, camPos.z - camEnd.z)
			const distTarget = lerpTarget.distanceTo(targetEnd)

			if (frame % 30 === 0 || (t >= 1 && distCam < TOL && distTarget < TOL)) {
				log.push(
					`f=${String(frame).padStart(4)} marble=${fmt(marblePos)} cam=${fmt(camPos)} tgt=${fmt(lerpTarget)}` +
						` r=${cs.radius.toFixed(3)} yaw=${cs.yaw.toFixed(3)} pitch=${cs.pitch.toFixed(3)}` +
						` |camErr|=${distCam.toFixed(4)} |tgtErr|=${distTarget.toFixed(4)}`
				)
			}

			if (t >= 1 && distCam < TOL && distTarget < TOL) break
		}

		const distCamFinal = Math.hypot(camPos.x - camEnd.x, camPos.y - camEnd.y, camPos.z - camEnd.z)
		const distTargetFinal = lerpTarget.distanceTo(targetEnd)
		const converged = distCamFinal < TOL && distTargetFinal < TOL

		if (frame >= MAX_FRAMES) {
			console.log(
				converged
					? `converged in ${frame} frames\n` + log.join('\n')
					: `=== DID NOT CONVERGE (${frame} frames) ===\n` +
							log.join('\n') +
							`\nfinal |camErr|=${distCamFinal.toFixed(5)} |tgtErr|=${distTargetFinal.toFixed(5)}`
			)
		}

		expect(frame, `did not converge within ${MAX_FRAMES} frames`).toBeLessThan(MAX_FRAMES)
		expect(distCamFinal, `cam not at goal: dist=${distCamFinal}`).toBeLessThan(TOL)
		expect(distTargetFinal, `target not at goal: dist=${distTargetFinal}`).toBeLessThan(TOL)
	})

	it('static cam [5,3,2] stays put while target moves [0,0,0]→[3,0,0]', () => {
		const delta = 1 / 60
		const MOVE_FRAMES = 120
		const MAX_FRAMES = 600
		const TOL = 0.03 // camera should not drift more than 3cm from [5,3,2]

		Object.assign(
			state,
			makeViewState({ smoothnessRadius: 1, smoothnessYaw: 1, smoothnessTarget: 1 })
		)

		const camGoal = new Vector3(5, 3, 2)
		const targetStart = new Vector3(0, 0, 0)
		const targetEnd = new Vector3(3, 0, 0)

		// Snap-init: cam at goal, target at start
		camPos = camGoal.clone()
		lerpTarget = targetStart.clone()
		desired.copy(camGoal)
		resolved.pos.copy(camGoal)
		updateTargetLerp(lerpTarget, targetStart, 1, false)
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)

		const alphaTgt = 1 - Math.exp(-state.smoothnessTarget * delta * 60)
		const targetPos = targetStart.clone()

		const log: string[] = []
		const fmt = (v: { x: number; y: number; z: number }) =>
			`(${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)})`

		log.push(`f=INIT cam=${fmt(camPos)} tgt=${fmt(lerpTarget)}`)

		let maxDrift = 0
		let frame = 0

		while (frame < MAX_FRAMES) {
			frame++
			const t = Math.min(frame / MOVE_FRAMES, 1)
			targetPos.lerpVectors(targetStart, targetEnd, t)

			desired.copy(camGoal)
			resolved.pos.copy(camGoal)
			updateTargetLerp(lerpTarget, targetPos, alphaTgt, cs.inited)
			updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)

			const drift = Math.hypot(camPos.x - camGoal.x, camPos.y - camGoal.y, camPos.z - camGoal.z)
			if (drift > maxDrift) maxDrift = drift

			if (frame % 30 === 0 || frame === MOVE_FRAMES) {
				log.push(
					`f=${String(frame).padStart(4)} target=${fmt(targetPos)} cam=${fmt(camPos)}` +
						` drift=${drift.toFixed(5)} maxDrift=${maxDrift.toFixed(5)}`
				)
			}

			if (t >= 1 && frame > MOVE_FRAMES + 10) break
		}

		if (maxDrift >= TOL) {
			console.log(
				`max camera drift during target movement: ${maxDrift.toFixed(5)}\n` + log.join('\n')
			)
		}

		expect(
			maxDrift,
			`camera drifted ${maxDrift.toFixed(5)} from goal (expected < ${TOL})`
		).toBeLessThan(TOL)
	})

	it('maxAngleSpeed clamps large position jumps', () => {
		const delta = 1 / 60
		// Init at desired=(5,7,9) relative to target (0,0,0)
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, delta)
		const beforePos = { x: camPos.x, y: camPos.y, z: camPos.z }
		const radiusBefore = cs.radius

		// New desired very far away (would cause large jump without clamping)
		desired.set(-5, 7, 9)
		const slowState = makeViewState({ maxAngleSpeed: 0.1 }) // very slow
		updateCameraForSplit(camPos, cs, slowState, lerpTarget, desired, delta)

		// World-space step must be ≤ radius * maxAngleSpeed * delta
		const step = Math.hypot(camPos.x - beforePos.x, camPos.y - beforePos.y, camPos.z - beforePos.z)
		const maxStep = radiusBefore * 0.1 * delta
		expect(step).toBeLessThanOrEqual(maxStep + 1e-9)
	})
})
