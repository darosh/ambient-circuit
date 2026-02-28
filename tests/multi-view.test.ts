import { describe, it, expect, beforeEach } from 'vitest'
import { Vector3 } from 'three'
import { updateCameraForSplit, type SplitCamState, type ResolvedTarget } from '../src/lib/multi-view'
import type { ViewSplitState } from '../src/lib/scene-ctx'

function makeState(): SplitCamState {
	return { radius: 10, yaw: 0, pitch: 0, inited: false, isDragging: false, dragTimeoutId: null }
}

function makeViewState(overrides?: Partial<ViewSplitState>): ViewSplitState {
	return {
		camera: null, target: null,
		smoothnessPos: 8, smoothnessAngle: 8, smoothnessTarget: 8,
		maxAngleSpeed: Infinity,
		...overrides,
	}
}

function makeResolved(x: number, y: number, z: number): ResolvedTarget {
	return { pos: new Vector3(x, y, z), tangent: new Vector3(0, 0, 1), hasTangent: true }
}

describe('updateCameraForSplit', () => {
	let camPos: { x: number; y: number; z: number }
	let lerpTarget: Vector3
	let desired: Vector3
	let resolved: ResolvedTarget
	let cs: SplitCamState
	let state: ViewSplitState

	beforeEach(() => {
		camPos = { x: 5, y: 7, z: 9 }
		lerpTarget = new Vector3(0, 0, 0)
		desired = new Vector3(5, 7, 9)
		resolved = makeResolved(5, 7, 9)
		cs = makeState()
		state = makeViewState()
	})

	it('snaps to desired position on first frame (inited=false)', () => {
		const delta = 1 / 60
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, resolved, delta)

		expect(cs.inited).toBe(true)
		// Camera should be reconstructed at ~desired position relative to target
		const dist = Math.hypot(camPos.x - desired.x, camPos.y - desired.y, camPos.z - desired.z)
		expect(dist).toBeLessThan(0.01)
	})

	it('damps toward desired on subsequent frames', () => {
		const delta = 1 / 60
		// First frame: snap to desired=(5,7,9)
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, resolved, delta)
		const snapYaw = cs.yaw

		// Move desired to a very different angle (opposite side)
		desired.set(-5, 7, -9)
		resolved.pos.set(-5, 7, -9)
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, resolved, delta)

		// Angle should have moved but not fully reached target (damping)
		expect(cs.yaw).not.toBeCloseTo(snapYaw, 1)
		// Not fully at target angle yet (1 frame of damping from smoothness=8)
		const targetYaw = Math.atan2(-9, -5)
		expect(cs.yaw).not.toBeCloseTo(targetYaw, 1)
	})

	it('when isDragging: syncs spherical from cam but still reconstructs position', () => {
		// First: init so inited=true
		const delta = 1 / 60
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, resolved, delta)

		// Set drag, manually set cam position as if OC moved it
		cs.isDragging = true
		camPos.x = 3; camPos.y = 4; camPos.z = 0

		const prevX = camPos.x
		const prevY = camPos.y
		const prevZ = camPos.z

		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, resolved, delta)

		// Spherical state should have been synced from cam position
		const expectedRadius = Math.hypot(
			lerpTarget.x - prevX,
			lerpTarget.y - prevY,
			lerpTarget.z - prevZ,
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
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, resolved, delta)

		// Drag: OC moves cam away
		cs.isDragging = true
		camPos.x = 3; camPos.y = 4; camPos.z = 0
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, resolved, delta)
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, resolved, delta)

		// Drag ends
		cs.isDragging = false
		const posAfterDrag = { ...camPos }

		// A few frames toward desired=(5,7,9)
		for (let f = 0; f < 10; f++) {
			updateCameraForSplit(camPos, cs, state, lerpTarget, desired, resolved, delta)
		}

		// Should be moving toward desired
		const distBefore = Math.hypot(posAfterDrag.x - desired.x, posAfterDrag.y - desired.y, posAfterDrag.z - desired.z)
		const distAfter  = Math.hypot(camPos.x - desired.x, camPos.y - desired.y, camPos.z - desired.z)
		expect(distAfter).toBeLessThan(distBefore)
	})

	it('maxAngleSpeed clamps large angle jumps', () => {
		const delta = 1 / 60
		// Init at desired=(5,7,9) relative to target (0,0,0)
		updateCameraForSplit(camPos, cs, state, lerpTarget, desired, resolved, delta)
		const initialYaw = cs.yaw

		// New desired far away — large angle change
		desired.set(-5, 7, 9)
		resolved.pos.set(-5, 7, 9)
		const slowState = makeViewState({ maxAngleSpeed: 0.1 }) // very slow
		updateCameraForSplit(camPos, cs, slowState, lerpTarget, desired, resolved, delta)

		// Yaw should have changed by at most maxAngleSpeed * delta
		const yawDelta = Math.abs(cs.yaw - initialYaw)
		expect(yawDelta).toBeLessThanOrEqual(0.1 * delta + 1e-9)
	})
})
