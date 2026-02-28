/**
 * Pure helper functions for MultiView.svelte — no Svelte, no renderer.
 */

import { Vector3 } from 'three/webgpu'
import type { ViewConfig, ViewSplitConfig } from './scene'
import type { SceneCtx, MarbleEntity, ViewSplitState } from './scene-ctx'
import { dirToAngles, dampAngleStep, dampStep } from './camera-math'

export type SplitCamState = {
	radius: number
	yaw: number
	pitch: number
	inited: boolean
	isDragging: boolean
	dragTimeoutId: ReturnType<typeof setTimeout> | null
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
		maxAngleSpeed: s.maxAngleSpeed ?? Infinity,
	}))
}

export function initCamStates(splits: ViewSplitConfig[]): SplitCamState[] {
	return splits.map(() => ({
		radius: Math.hypot(5, 7, 9),
		yaw: 0,
		pitch: 0,
		inited: false,
		isDragging: false,
		dragTimeoutId: null,
	}))
}

export function initLerpTargets(splits: ViewSplitConfig[]): Vector3[] {
	return splits.map((s) =>
		Array.isArray(s.target) ? new Vector3(s.target[0], s.target[1], s.target[2]) : new Vector3(0, 1, 0)
	)
}

// ── Rects ─────────────────────────────────────────────────────────────────────

export function updateRects(
	layout: ViewConfig['layout'],
	n: number,
	w: number,
	h: number,
	out: SplitRect[],
	_last: { w: number; h: number },
): boolean {
	if (w === _last.w && h === _last.h) return false
	_last.w = w
	_last.h = h
	if (layout === 'horizontal') {
		const sw = Math.floor(w / n)
		for (let i = 0; i < n; i++) {
			out[i].x = i * sw; out[i].y = 0
			out[i].width = i === n - 1 ? w - i * sw : sw; out[i].height = h
		}
	} else if (layout === 'vertical') {
		const sh = Math.floor(h / n)
		for (let i = 0; i < n; i++) {
			out[i].x = 0; out[i].y = i * sh
			out[i].width = w; out[i].height = i === n - 1 ? h - i * sh : sh
		}
	} else {
		const cols = Math.ceil(Math.sqrt(n))
		const rows = Math.ceil(n / cols)
		const sw = Math.floor(w / cols)
		const sh = Math.floor(h / rows)
		for (let i = 0; i < n; i++) {
			const col = i % cols
			const row = Math.floor(i / cols)
			out[i].x = col * sw; out[i].y = row * sh
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
	out: ResolvedTarget,
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

const ANGLE_DEAD_ZONE = 0.0002 // ~0.01°, prevents micro-jitter oscillation
const MAX_PITCH = 1.55          // ~88°, prevents gimbal at poles

export { ANGLE_DEAD_ZONE, MAX_PITCH }

const _tmpAngles = { yaw: 0, pitch: 0 }

/**
 * Update a single split's camera position.
 *
 * Bug fix: `isDragging` no longer permanently freezes marble-following.
 * When dragging → sync spherical FROM cam position (capture OC-induced orbit),
 * then still reconstruct cam.position from spherical. Since sync+reconstruct are
 * inverses the position is unchanged during drag, but spherical state stays in
 * sync so transitions are smooth when drag ends and marble-following resumes.
 */
export function updateCameraForSplit(
	camPosition: { x: number; y: number; z: number },
	camState: SplitCamState,
	state: ViewSplitState,
	lerpTargetPos: Vector3,
	desired: Vector3,
	camResolved: ResolvedTarget,
	delta: number,
): void {
	const alphaPos   = 1 - Math.exp(-state.smoothnessPos   * delta * 60)
	const alphaAngle = 1 - Math.exp(-state.smoothnessAngle * delta * 60)

	if (camState.isDragging) {
		// Sync spherical state from current cam position (capture OC-induced orbit)
		const rdx = lerpTargetPos.x - camPosition.x
		const rdy = lerpTargetPos.y - camPosition.y
		const rdz = lerpTargetPos.z - camPosition.z
		camState.radius = Math.hypot(rdx, rdy, rdz) || camState.radius
		dirToAngles(rdx, rdy, rdz, _tmpAngles)
		camState.yaw   = _tmpAngles.yaw
		camState.pitch = _tmpAngles.pitch
		// inited stays as-is; if not yet inited, first non-drag frame will snap
	} else {
		// Convert desired world pos to spherical relative to lerped target
		const dsx = lerpTargetPos.x - desired.x
		const dsy = lerpTargetPos.y - desired.y
		const dsz = lerpTargetPos.z - desired.z
		const desiredRadius = Math.hypot(dsx, dsy, dsz) || camState.radius
		dirToAngles(dsx, dsy, dsz, _tmpAngles)

		if (camState.inited) {
			camState.radius = dampStep(camState.radius, desiredRadius, alphaPos)
			const maxDelta = state.maxAngleSpeed * delta
			camState.yaw   = dampAngleStep(camState.yaw,   _tmpAngles.yaw,   alphaAngle, ANGLE_DEAD_ZONE, maxDelta)
			camState.pitch = dampAngleStep(camState.pitch, _tmpAngles.pitch, alphaAngle, ANGLE_DEAD_ZONE, maxDelta)
			if (camState.pitch >  MAX_PITCH) camState.pitch =  MAX_PITCH
			if (camState.pitch < -MAX_PITCH) camState.pitch = -MAX_PITCH
		} else {
			// Snap on first valid frame
			camState.radius = desiredRadius
			camState.yaw    = _tmpAngles.yaw
			camState.pitch  = _tmpAngles.pitch
			camState.inited = true
		}
	}

	// Always reconstruct world position from spherical.
	// When dragging: sync+reconstruct = identity (position unchanged, OC stays in control).
	// When not dragging: reconstruction follows marble.
	const cpcy = Math.cos(camState.pitch) * Math.cos(camState.yaw)
	const sp   = Math.sin(camState.pitch)
	const cpsy = Math.cos(camState.pitch) * Math.sin(camState.yaw)
	camPosition.x = lerpTargetPos.x - camState.radius * cpcy
	camPosition.y = lerpTargetPos.y - camState.radius * sp
	camPosition.z = lerpTargetPos.z - camState.radius * cpsy
}

/**
 * Lerp (or snap) lerpTargetPos toward resolved target position.
 * Returns true if snap occurred (first frame).
 */
export function updateTargetLerp(
	lerpTargetPos: Vector3,
	resolvedPos: Vector3,
	alpha: number,
	inited: boolean,
): void {
	if (!inited) {
		lerpTargetPos.copy(resolvedPos)
	} else if (lerpTargetPos.distanceToSquared(resolvedPos) > 1e-6) {
		lerpTargetPos.lerp(resolvedPos, alpha)
	} else {
		lerpTargetPos.copy(resolvedPos)
	}
}
