/**
 * Pure helper functions for MultiView.svelte — no Svelte, no renderer.
 */

import { Vector3 } from 'three/webgpu'
import type { ViewConfig, ViewSplitConfig } from './scene'
import type { SceneCtx, MarbleEntity, ViewSplitState } from './scene-ctx'
import { dirToAngles, anglesToDir, dampAngleStep, dampStep } from './camera-math'

export type SplitCamState = {
	radius: number
	yaw: number
	pitch: number
	inited: boolean
	isDragging: boolean
	isDraggingEnd: boolean
}

export type SplitRect = { x: number; y: number; width: number; height: number }

export type ResolvedTarget = {
	pos: Vector3
	tangent: Vector3
	hasTangent: boolean
}

// ── Init ──────────────────────────────────────────────────────────────────────

export function initSplitStates(splits: ViewSplitConfig[]): ViewSplitState[] {
	return splits.map((s) => ({
		camera: s.camera ?? null,
		target: s.target ?? null,
		smoothnessPos: s.smoothnessPos ?? 8,
		smoothnessAngle: s.smoothnessAngle ?? 8,
		smoothnessTarget: s.smoothnessTarget ?? 8,
		maxAngleSpeed: s.maxAngleSpeed ?? Infinity
	}))
}

export function initCamStates(splits: ViewSplitConfig[]): SplitCamState[] {
	return splits.map(() => ({
		radius: Math.hypot(5, 7, 9),
		yaw: 0,
		pitch: 0,
		inited: false,
		isDragging: false,
		isDraggingEnd: false
	}))
}

export function initLerpTargets(splits: ViewSplitConfig[]): Vector3[] {
	return splits.map((s) =>
		Array.isArray(s.target)
			? new Vector3(s.target[0], s.target[1], s.target[2])
			: new Vector3(0, 1, 0)
	)
}

// ── Rects ─────────────────────────────────────────────────────────────────────

export function updateRects(
	layout: ViewConfig['layout'],
	n: number,
	w: number,
	h: number,
	out: SplitRect[],
	_last: { w: number; h: number }
): boolean {
	if (w === _last.w && h === _last.h) return false
	_last.w = w
	_last.h = h
	if (layout === 'horizontal') {
		const sw = Math.floor(w / n)
		for (let i = 0; i < n; i++) {
			out[i].x = i * sw
			out[i].y = 0
			out[i].width = i === n - 1 ? w - i * sw : sw
			out[i].height = h
		}
	} else if (layout === 'vertical') {
		const sh = Math.floor(h / n)
		for (let i = 0; i < n; i++) {
			out[i].x = 0
			out[i].y = i * sh
			out[i].width = w
			out[i].height = i === n - 1 ? h - i * sh : sh
		}
	} else {
		const cols = Math.ceil(Math.sqrt(n))
		const rows = Math.ceil(n / cols)
		const sw = Math.floor(w / cols)
		const sh = Math.floor(h / rows)
		for (let i = 0; i < n; i++) {
			const col = i % cols
			const row = Math.floor(i / cols)
			out[i].x = col * sw
			out[i].y = row * sh
			out[i].width = col === cols - 1 ? w - col * sw : sw
			out[i].height = row === rows - 1 ? h - row * sh : sh
		}
	}
	return true
}

// ── Resolve ───────────────────────────────────────────────────────────────────

type MarbleOrVec = MarbleEntity | number | [number, number, number] | null

export function resolveMarbleOrVec(
	val: MarbleOrVec,
	ctx: SceneCtx,
	out: ResolvedTarget
): ResolvedTarget | null {
	if (val == null) return null
	if (typeof val === 'number') {
		const entity = ctx.marbles[val]
		if (!entity) return null
		const m = entity.marble
		out.pos.set(m.position.x, m.position.y, m.position.z)
		out.tangent.set(m.tangent.x, m.tangent.y, m.tangent.z)
		out.hasTangent = true
		return out
	}
	if (Array.isArray(val)) {
		out.pos.set(val[0], val[1], val[2])
		out.hasTangent = false
		return out
	}
	const m = (val as MarbleEntity).marble
	out.pos.set(m.position.x, m.position.y, m.position.z)
	out.tangent.set(m.tangent.x, m.tangent.y, m.tangent.z)
	out.hasTangent = true
	return out
}

// ── Camera follow ─────────────────────────────────────────────────────────────

const _tmpAngles = { yaw: 0, pitch: 0 }
const _tmpDir = { x: 0, y: 0, z: 0 }
const _tmpPos = new Vector3()

function syncSpherical(
	camPosition: Vector3,
	camState: SplitCamState,
	lerpTargetPos: Vector3
): void {
	const rdx = lerpTargetPos.x - camPosition.x
	const rdy = lerpTargetPos.y - camPosition.y
	const rdz = lerpTargetPos.z - camPosition.z
	camState.radius = Math.hypot(rdx, rdy, rdz) || camState.radius
	dirToAngles(rdx, rdy, rdz, _tmpAngles)
	camState.yaw = _tmpAngles.yaw
	camState.pitch = _tmpAngles.pitch
}

/**
 * Update a single split's camera position.
 *
 * Position is damped in **world space** toward `desired`, then spherical state
 * is synced from the resulting world position. This ensures a static `desired`
 * stays put even when `lerpTargetPos` moves (spherical-reconstruction would
 * drift because spherical coords are relative to the target).
 *
 * Drag: OC owns camPosition — we only sync spherical for smooth resume.
 */
export function updateCameraForSplit(
	camPosition: Vector3,
	camState: SplitCamState,
	state: ViewSplitState,
	lerpTargetPos: Vector3,
	desired: Vector3,
	delta: number
): void {
	if (camState.isDragging) {
		// OC owns camPosition — sync spherical so follow resumes smoothly after drag
		syncSpherical(camPosition, camState, lerpTargetPos)
		return
	}

	if (camState.inited) {
		const alphaPos = 1 - Math.exp(-state.smoothnessPos * delta * 60)

		// Desired spherical coords relative to lerped target
		const ddx = lerpTargetPos.x - desired.x
		const ddy = lerpTargetPos.y - desired.y
		const ddz = lerpTargetPos.z - desired.z
		const desiredRadius = Math.hypot(ddx, ddy, ddz) || camState.radius
		dirToAngles(ddx, ddy, ddz, _tmpAngles)
		const desiredYaw = _tmpAngles.yaw
		const desiredPitch = _tmpAngles.pitch

		// Max angular step (angle = arc / radius)
		const maxAngleDelta = state.maxAngleSpeed === Infinity ? Infinity : state.maxAngleSpeed * delta

		camState.yaw = dampAngleStep(camState.yaw, desiredYaw, alphaPos, 0, maxAngleDelta)
		camState.pitch = dampStep(camState.pitch, desiredPitch, alphaPos)
		camState.radius = dampStep(camState.radius, desiredRadius, alphaPos)
	} else {
		const ddx = lerpTargetPos.x - desired.x
		const ddy = lerpTargetPos.y - desired.y
		const ddz = lerpTargetPos.z - desired.z
		camState.radius = Math.hypot(ddx, ddy, ddz) || camState.radius
		dirToAngles(ddx, ddy, ddz, _tmpAngles)
		camState.yaw = _tmpAngles.yaw
		camState.pitch = _tmpAngles.pitch
		camState.inited = true
	}

	// Reconstruct world position from spherical coords
	anglesToDir(camState.yaw, camState.pitch, _tmpDir)

	_tmpPos.x = lerpTargetPos.x - _tmpDir.x * camState.radius
	_tmpPos.y = lerpTargetPos.y - _tmpDir.y * camState.radius
	_tmpPos.z = lerpTargetPos.z - _tmpDir.z * camState.radius

	if (!isClose(_tmpPos, camPosition)) {
		camPosition.copy(_tmpPos)
	}
}

const EPS = 0.0001

function isClose(a: Vector3, b: Vector3) {
	return Math.abs(a.x - b.x) < EPS && Math.abs(a.y - b.y) < EPS && Math.abs(a.z - b.z) < EPS
}

/**
 * Lerp (or snap) lerpTargetPos toward resolved target position.
 * Returns true if snap occurred (first frame).
 */
export function updateTargetLerp(
	lerpTargetPos: Vector3,
	resolvedPos: Vector3,
	alpha: number,
	inited: boolean
): void {
	if (!inited) {
		lerpTargetPos.copy(resolvedPos)
	} else if (lerpTargetPos.distanceToSquared(resolvedPos) > 1e-6) {
		lerpTargetPos.lerp(resolvedPos, alpha)
	} else {
		lerpTargetPos.copy(resolvedPos)
	}
}
