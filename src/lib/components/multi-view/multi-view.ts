/**
 * Pure helper functions for MultiView.svelte — no Svelte, no renderer.
 */

import { Vector3 } from 'three/webgpu'
import type { ViewConfig, ViewSplitConfig } from '../../core/scene'
import type { SceneCtx, MarbleEntity, ViewSplitState } from '../../core/scene-ctx'
import { dirToAngles, anglesToDir, dampAngleStep, dampStep, unwrapAngle } from './camera-math'

export type SplitCamState = {
	radius: number
	yaw: number
	pitch: number
	inited: boolean
	isDragging: boolean
	isDraggingEnd: number
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
		smoothnessRadius: s.smoothnessRadius ?? 0.05,
		smoothnessYaw: s.smoothnessYaw ?? 0.05,
		smoothnessPitch: s.smoothnessPitch ?? 0.05,
		smoothnessTarget: s.smoothnessTarget ?? 0.05,
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
		isDraggingEnd: 0
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
	splits: Pick<ViewSplitConfig, 'cols' | 'rows'>[],
	w: number,
	h: number,
	dpr: number,
	out: SplitRect[],
	_last: { w: number; h: number; dpr: number }
): boolean {
	if (w === _last.w && h === _last.h && _last.dpr === dpr) return false
	_last.w = w
	_last.h = h
	_last.dpr = dpr
	const n = splits.length
	if (layout === 'horizontal') {
		let totalCols = 0
		for (let i = 0; i < n; i++) totalCols += splits[i].cols ?? 1
		let x = 0
		for (let i = 0; i < n; i++) {
			const sc = splits[i].cols ?? 1
			const sw = i === n - 1 ? w - x : Math.floor((sc / totalCols) * w)
			out[i].x = x
			out[i].y = 0
			out[i].width = sw
			out[i].height = h
			x += sw
		}
	} else if (layout === 'vertical') {
		let totalRows = 0
		for (let i = 0; i < n; i++) totalRows += splits[i].rows ?? 1
		let y = 0
		for (let i = 0; i < n; i++) {
			const sr = splits[i].rows ?? 1
			const sh = i === n - 1 ? h - y : Math.floor((sr / totalRows) * h)
			out[i].x = 0
			out[i].y = y
			out[i].width = w
			out[i].height = sh
			y += sh
		}
	} else {
		let totalCells = 0
		for (let i = 0; i < n; i++) totalCells += (splits[i].cols ?? 1) * (splits[i].rows ?? 1)
		let gridCols = Math.ceil(Math.sqrt(totalCells))
		let gridRows = Math.ceil(totalCells / gridCols)
		if (w > h && gridCols < gridRows) {
			const tmp = gridCols
			gridCols = gridRows
			gridRows = tmp
		}
		// Greedy row-major auto-placement
		const occupied: boolean[][] = []
		for (let r = 0; r < gridRows; r++) {
			occupied[r] = []
			for (let c = 0; c < gridCols; c++) occupied[r][c] = false
		}
		for (let i = 0; i < n; i++) {
			const sc = splits[i].cols ?? 1
			const sr = splits[i].rows ?? 1
			let placed = false
			const place = (): boolean => {
				for (let row = 0; row < gridRows; row++) {
					for (let col = 0; col < gridCols; col++) {
						if (col + sc > gridCols || row + sr > gridRows) continue
						let fits = true
						for (let dr = 0; dr < sr && fits; dr++)
							for (let dc = 0; dc < sc && fits; dc++)
								if (occupied[row + dr][col + dc]) fits = false
						if (fits) {
							for (let dr = 0; dr < sr; dr++)
								for (let dc = 0; dc < sc; dc++) occupied[row + dr][col + dc] = true
							const x = Math.floor((col / gridCols) * w)
							const y = Math.floor((row / gridRows) * h)
							const x2 = col + sc === gridCols ? w : Math.floor(((col + sc) / gridCols) * w)
							const y2 = row + sr === gridRows ? h : Math.floor(((row + sr) / gridRows) * h)
							out[i].x = x
							out[i].y = y
							out[i].width = x2 - x
							out[i].height = y2 - y
							return true
						}
					}
				}
				return false
			}
			placed = place()
			if (!placed) {
				out[i].x = 0
				out[i].y = 0
				out[i].width = w
				out[i].height = h
			}
		}
	}
	return true
}

export function getGrid(
	layout: ViewConfig['layout'],
	splits: Pick<ViewSplitConfig, 'cols' | 'rows'>[],
	w: number,
	h: number
) {
	const n = splits.length
	if (layout === 'horizontal') {
		let totalCols = 0
		for (let i = 0; i < n; i++) totalCols += splits[i].cols ?? 1
		return { x: totalCols, y: 1 }
	} else if (layout === 'vertical') {
		let totalRows = 0
		for (let i = 0; i < n; i++) totalRows += splits[i].rows ?? 1
		return { x: 1, y: totalRows }
	} else {
		let totalCells = 0
		for (let i = 0; i < n; i++) totalCells += (splits[i].cols ?? 1) * (splits[i].rows ?? 1)
		let x = Math.ceil(Math.sqrt(totalCells))
		let y = Math.ceil(totalCells / x)
		if (w > h && x < y) {
			const tmp = x
			x = y
			y = tmp
		}
		return { x, y }
	}
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
	camState.yaw = unwrapAngle(camState.yaw, _tmpAngles.yaw)
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
		const alphaRadius =
			(1 - Math.exp(-state.smoothnessRadius * delta * 60)) /
			(camState.isDraggingEnd > 0 ? camState.isDraggingEnd + 1 : 1)

		const alphaYaw =
			(1 - Math.exp(-state.smoothnessYaw * delta * 60)) /
			(camState.isDraggingEnd > 0 ? camState.isDraggingEnd + 1 : 1)

		const alphaPitch =
			(1 - Math.exp(-state.smoothnessPitch * delta * 60)) /
			(camState.isDraggingEnd > 0 ? camState.isDraggingEnd + 1 : 1)

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

		camState.yaw = dampAngleStep(camState.yaw, desiredYaw, alphaYaw, 0, maxAngleDelta)
		camState.pitch = dampStep(camState.pitch, desiredPitch, alphaPitch)
		camState.radius = dampStep(camState.radius, desiredRadius, alphaRadius)
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

export function isClose(a: Vector3, b: Vector3) {
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
