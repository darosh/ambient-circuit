import { MathUtils, Matrix4, Euler, Vector3 } from 'three/webgpu'
import type { Vector2Tuple } from 'three/webgpu'
import type { SceneCtx } from '../../lib/scene-ctx'
import type { TempoState } from '../../lib/tempo'
import {
	easeInBounce,
	easeInBounceCustom,
	easeInBouncePhysical,
	easeInElastic,
	easeInElasticCustom,
	easeInOutBack,
	easeOutBack,
	easeOutCirc,
	easeOutElastic,
	type EasingFunction,
	linear
} from '../../lib/easing'
import type { RailData } from '../../lib/rail-data'
import type { Vec3 } from '../../lib/rail'
import { resolveRail } from '../../lib/rail-resolve'

export type FloatingConfig = {
	speed?: number | [number, number, number]
	floatIntensity?: number | [number, number, number]
	floatingRange?: Vector2Tuple | [Vector2Tuple, Vector2Tuple, Vector2Tuple]
	/** World rotation speed (around origin or center) */
	rotationSpeed?: number | [number, number, number]
	/** World rotation intensity */
	rotationIntensity?: number | [number, number, number]
	/** Pivot point for world rotation */
	center?: Vec3
	/** Local pivot rotation speed (around object's own center) */
	pivotRotationSpeed?: number | [number, number, number]
	/** Local pivot rotation intensity */
	pivotRotationIntensity?: number | [number, number, number]
	/** Local pivot point (defaults to railCenter if pivot rotation is used) */
	pivot?: Vec3
	seed?: number
	/** Separate seed for world rotation phase (default 0) */
	rotationSeed?: number
	/** Single easing for both directions, or [easeIn, easeOut] for asymmetric motion */
	easing?: EasingFunction | [EasingFunction, EasingFunction]
	/** Oscillator waveform: 'tri' oscillates back and forth, 'saw' spins continuously (default 'tri') */
	waveform?: 'tri' | 'saw'
}

export const FLOATING_DEFAULT: FloatingConfig = {
	speed: 2,
	floatIntensity: 0.5,
	floatingRange: [-0.5, 0.5],
	rotationSpeed: 0,
	rotationIntensity: 0,
	pivotRotationSpeed: 0,
	pivotRotationIntensity: 0
}

export const FLOATING_SHAKING: FloatingConfig = {
	speed: [70, 1, 80],
	floatIntensity: [0.1, 1, 0.1],
	floatingRange: [-0.5, 0.5],
	rotationSpeed: 0,
	rotationIntensity: 0,
	pivotRotationSpeed: 10,
	pivotRotationIntensity: Math.PI / 36
}

export const FLOATING_BOUNCING: Partial<FloatingConfig> = {
	speed: 6,
	floatIntensity: 1,
	floatingRange: [0, 0.5],
	rotationSpeed: 0,
	rotationIntensity: 0,
	pivotRotationSpeed: 0,
	pivotRotationIntensity: 0,
	easing: [easeOutBack, easeInBounceCustom(7, 3)]
}

export const FLOATING_TRAMPOLINING: Partial<FloatingConfig> = {
	speed: 6,
	floatIntensity: 1,
	floatingRange: [0, 0.5],
	rotationSpeed: 0,
	rotationIntensity: 0,
	pivotRotationSpeed: 0,
	pivotRotationIntensity: 0,
	easing: [easeOutBack, easeInElasticCustom(10, 6)]
}

export const FLOATING_SPRINGING: Partial<FloatingConfig> = {
	speed: 16,
	floatIntensity: 0.5,
	floatingRange: [0, 1],
	rotationSpeed: 0,
	rotationIntensity: 0,
	pivotRotationSpeed: 0,
	pivotRotationIntensity: 0,
	easing: [easeOutElastic, easeInElastic]
}

export const FLOATING_ROTATING: Partial<FloatingConfig> = {
	speed: 10,
	floatIntensity: 0.1,
	rotationSpeed: 1,
	rotationIntensity: Math.PI * 2,
	waveform: 'saw'
}

export const FLOATING_ORBITING: Partial<FloatingConfig> = {
	speed: 10,
	floatIntensity: 0.1,
	rotationSpeed: 1,
	rotationIntensity: Math.PI * 2,
	pivotRotationSpeed: 8,
	pivotRotationIntensity: Math.PI * 2,
	waveform: 'saw'
}

export const FLOATING_SPINNING: Partial<FloatingConfig> = {
	speed: 10,
	floatIntensity: 0.1,
	pivotRotationSpeed: 4,
	pivotRotationIntensity: Math.PI * 2,
	waveform: 'saw'
}

const map = MathUtils.mapLinear

function toVec3(v: number | [number, number, number]): [number, number, number] {
	return Array.isArray(v) ? v : [v, v, v]
}

function toVec3Y(v: number | [number, number, number]): [number, number, number] {
	return Array.isArray(v) ? v : [0, v, 0]
}

function isNonZero(v: [number, number, number]) {
	return v[0] !== 0 || v[1] !== 0 || v[2] !== 0
}

/** Compute bounding box center from resolved rail points */
export function railCenter(railData: RailData): Vec3 {
	const resolved = resolveRail(railData.rail)
	const pts = resolved.points
	if (!pts.length) return [0, 0, 0]

	const min = [Infinity, Infinity, Infinity]
	const max = [-Infinity, -Infinity, -Infinity]

	for (let i = 0; i < pts.length; i++) {
		const p = pts[i].p
		for (let j = 0; j < 3; j++) {
			if (p[j] < min[j]) min[j] = p[j]
			if (p[j] > max[j]) max[j] = p[j]
		}
	}

	// Include branch points
	for (const split of resolved.splits) {
		for (const branch of split.branches) {
			for (const pt of branch.points) {
				for (let j = 0; j < 3; j++) {
					if (pt.p[j] < min[j]) min[j] = pt.p[j]
					if (pt.p[j] > max[j]) max[j] = pt.p[j]
				}
			}
		}
	}

	return [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2]
}

export function createFloating(config: FloatingConfig = {}) {
	const {
		speed = FLOATING_DEFAULT.speed!,
		floatIntensity = FLOATING_DEFAULT.floatIntensity!,
		floatingRange = FLOATING_DEFAULT.floatingRange!,
		rotationSpeed = FLOATING_DEFAULT.rotationSpeed!,
		rotationIntensity = FLOATING_DEFAULT.rotationIntensity!,
		pivotRotationSpeed = FLOATING_DEFAULT.pivotRotationSpeed!,
		pivotRotationIntensity = FLOATING_DEFAULT.pivotRotationIntensity!,
		pivot,
		center,
		seed = 10_000 * Math.random(),
		rotationSeed = 0,
		easing,
		waveform = 'tri'
	} = config

	const fSpeed = toVec3(speed)
	const fIntensity = toVec3Y(floatIntensity)
	const fRange: [Vector2Tuple, Vector2Tuple, Vector2Tuple] =
		floatingRange.length === 3 && Array.isArray(floatingRange[0])
			? (floatingRange as [Vector2Tuple, Vector2Tuple, Vector2Tuple])
			: [
					floatingRange as Vector2Tuple,
					floatingRange as Vector2Tuple,
					floatingRange as Vector2Tuple
				]

	const rSpeed = toVec3(rotationSpeed)
	const rIntensity = toVec3Y(rotationIntensity)
	const hasWorldRot = isNonZero(rIntensity)

	const pSpeed = toVec3(pivotRotationSpeed)
	const pIntensity = toVec3Y(pivotRotationIntensity)
	const hasPivotRot = isNonZero(pIntensity)

	let t = seed
	let tRot = rotationSeed

	// Per-instance scratch
	const _euler = new Euler()
	const _pos = new Vector3()
	const _tmp = new Matrix4()

	// World rotation pivot
	const _centerPre = center
		? new Matrix4().makeTranslation(-center[0], -center[1], -center[2])
		: null
	const _centerPost = center ? new Matrix4().makeTranslation(center[0], center[1], center[2]) : null

	// Local pivot rotation
	const _pivotPre = pivot ? new Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]) : null
	const _pivotPost = pivot ? new Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]) : null

	// Waveform generators:
	// 'tri' = oscillate back and forth (-1..1), easing shapes the curve
	// 'saw' = continuous ramp (0→1 repeating), easing shapes the ramp
	const isSaw = waveform === 'saw'
	const easeUp = Array.isArray(easing) ? easing[0] : easing
	const easeDown = Array.isArray(easing) ? easing[1] : easing

	function easedTri(phase: number) {
		if (!easeUp) return 0
		if (phase < 0.5) {
			return easeUp(phase * 2) * 2 - 1
		}
		return easeDown!(1 - (phase - 0.5) * 2) * 2 - 1
	}

	// Normalized phase 0→1 from time*speed
	function phase(time: number, spd: number) {
		return ((((time * spd) / (Math.PI * 2)) % 1) + 1) % 1
	}

	function oscPos(time: number, spd: number) {
		if (!easeUp) return Math.sin(time * spd)
		return easedTri(phase(time, spd))
	}

	// Oscillator: returns -1..1 for tri, 0..1 for saw
	function osc(time: number, spd: number) {
		if (isSaw) {
			const p = phase(time, spd)
			return easeUp ? easeUp(p) : p
		}
		if (!easeUp) return Math.sin(time * spd)
		return easedTri(phase(time, spd))
	}

	// Cosine-phase variant (quarter-period offset), only for tri
	function oscCos(time: number, spd: number) {
		if (isSaw) return osc(time, spd) // saw has no phase distinction
		if (!easeUp) return Math.cos(time * spd)
		return easedTri((phase(time, spd) + 0.25) % 1)
	}

	return (out: Matrix4, _ctx: SceneCtx, _beat: number, _tempo: TempoState, delta: number) => {
		t += delta
		tRot += delta
		const tt = t / 4
		const tr = tRot / 4

		// Float position
		_pos.set(
			map(oscPos(tt, fSpeed[0]) / 10, -0.1, 0.1, fRange[0][0], fRange[0][1]) * fIntensity[0],
			map(oscPos(tt, fSpeed[1]) / 10, -0.1, 0.1, fRange[1][0], fRange[1][1]) * fIntensity[1],
			map(oscPos(tt, fSpeed[2]) / 10, -0.1, 0.1, fRange[2][0], fRange[2][1]) * fIntensity[2]
		)

		out.identity()

		// World rotation (around center or origin)
		// Intensity is in radians: Math.PI = half turn, Math.PI*2 = full turn
		if (hasWorldRot) {
			_euler.set(
				oscCos(tr, rSpeed[0]) * rIntensity[0],
				osc(tr, rSpeed[1]) * rIntensity[1],
				osc(tr, rSpeed[2]) * rIntensity[2]
			)
			_tmp.makeRotationFromEuler(_euler)
			if (_centerPre && _centerPost) {
				out.multiply(_centerPost).multiply(_tmp).multiply(_centerPre)
			} else {
				out.multiply(_tmp)
			}
		}

		// Pivot rotation (around object's own center)
		if (hasPivotRot && _pivotPre && _pivotPost) {
			_euler.set(
				oscCos(tr, pSpeed[0]) * pIntensity[0],
				osc(tr, pSpeed[1]) * pIntensity[1],
				osc(tr, pSpeed[2]) * pIntensity[2]
			)
			_tmp.makeRotationFromEuler(_euler)
			out.multiply(_pivotPost).multiply(_tmp).multiply(_pivotPre)
		}

		// Add float offset to accumulated translation
		out.setPosition(_pos.x + out.elements[12], _pos.y + out.elements[13], _pos.z + out.elements[14])
	}
}
