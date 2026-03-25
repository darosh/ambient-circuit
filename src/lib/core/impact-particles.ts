import { Matrix4, Quaternion, Vector3, Color } from 'three/webgpu'

const MAX_PARTICLES = 256

// Module-level scratch objects (zero per-frame allocation)
const _mat = new Matrix4()
const _quat = new Quaternion()
const _pos = new Vector3()
const _scale = new Vector3()
const _right = new Vector3()
const _up = new Vector3()
const _tangent = new Vector3()
const _yAxis = new Vector3(0, 1, 0)
const _xAxis = new Vector3(1, 0, 0)

export type ParticlePool = {
	count: number
	maxCount: number
	// position
	px: Float32Array
	py: Float32Array
	pz: Float32Array
	// velocity
	vx: Float32Array
	vy: Float32Array
	vz: Float32Array
	// state
	life: Float32Array
	maxLife: Float32Array
	scale: Float32Array
	scale0: Float32Array // initial scale (for expansion calc)
	rotation: Float32Array
	rotSpeed: Float32Array
	// color
	cr: Float32Array
	cg: Float32Array
	cb: Float32Array
}

export function createPool(max: number = MAX_PARTICLES): ParticlePool {
	return {
		count: 0,
		maxCount: max,
		px: new Float32Array(max),
		py: new Float32Array(max),
		pz: new Float32Array(max),
		vx: new Float32Array(max),
		vy: new Float32Array(max),
		vz: new Float32Array(max),
		life: new Float32Array(max),
		maxLife: new Float32Array(max),
		scale: new Float32Array(max),
		scale0: new Float32Array(max),
		rotation: new Float32Array(max),
		rotSpeed: new Float32Array(max),
		cr: new Float32Array(max),
		cg: new Float32Array(max),
		cb: new Float32Array(max)
	}
}

const _color = new Color()

export function spawnBurst(
	pool: ParticlePool,
	x: number,
	y: number,
	z: number,
	tx: number,
	ty: number,
	tz: number,
	colorHex: string,
	count: number = 24,
	speed: number = 3
) {
	_color.set(colorHex)

	// Build perpendicular plane via Gram-Schmidt
	_tangent.set(tx, ty, tz).normalize()
	// Choose reference axis not parallel to tangent
	const ref = Math.abs(_tangent.dot(_yAxis)) > 0.9 ? _xAxis : _yAxis
	_right.crossVectors(_tangent, ref).normalize()
	_up.crossVectors(_right, _tangent).normalize()

	for (let i = 0; i < count; i++) {
		if (pool.count >= pool.maxCount) break
		const idx = pool.count++

		const theta = Math.random() * Math.PI * 2
		const s = speed * (0.3 + Math.random() * 0.7)
		const cosT = Math.cos(theta)
		const sinT = Math.sin(theta)
		const tangentComponent = (Math.random() - 0.5) * 0.6 * s

		pool.px[idx] = x + (Math.random() - 0.5) * 0.05
		pool.py[idx] = y + (Math.random() - 0.5) * 0.05
		pool.pz[idx] = z + (Math.random() - 0.5) * 0.05

		pool.vx[idx] = _right.x * cosT * s + _up.x * sinT * s + _tangent.x * tangentComponent
		pool.vy[idx] = _right.y * cosT * s + _up.y * sinT * s + _tangent.y * tangentComponent
		pool.vz[idx] = _right.z * cosT * s + _up.z * sinT * s + _tangent.z * tangentComponent

		const lifetime = 0.25 + Math.random() * 0.35
		pool.life[idx] = 1
		pool.maxLife[idx] = lifetime

		const sc = 0.015 + Math.random() * 0.025
		pool.scale[idx] = sc
		pool.scale0[idx] = sc

		pool.rotation[idx] = Math.random() * Math.PI * 2
		pool.rotSpeed[idx] = (Math.random() - 0.5) * 16

		pool.cr[idx] = _color.r
		pool.cg[idx] = _color.g
		pool.cb[idx] = _color.b
	}
}

export function updatePool(pool: ParticlePool, delta: number) {
	const drag = 1 - 3 * delta
	let i = 0
	while (i < pool.count) {
		pool.life[i] -= delta / pool.maxLife[i]
		if (pool.life[i] <= 0) {
			// Swap-remove with last
			const last = pool.count - 1
			if (i !== last) {
				pool.px[i] = pool.px[last]
				pool.py[i] = pool.py[last]
				pool.pz[i] = pool.pz[last]
				pool.vx[i] = pool.vx[last]
				pool.vy[i] = pool.vy[last]
				pool.vz[i] = pool.vz[last]
				pool.life[i] = pool.life[last]
				pool.maxLife[i] = pool.maxLife[last]
				pool.scale[i] = pool.scale[last]
				pool.scale0[i] = pool.scale0[last]
				pool.rotation[i] = pool.rotation[last]
				pool.rotSpeed[i] = pool.rotSpeed[last]
				pool.cr[i] = pool.cr[last]
				pool.cg[i] = pool.cg[last]
				pool.cb[i] = pool.cb[last]
			}
			pool.count--
			continue
		}

		// Drag
		pool.vx[i] *= drag
		pool.vy[i] *= drag
		pool.vz[i] *= drag

		// Integrate position
		pool.px[i] += pool.vx[i] * delta
		pool.py[i] += pool.vy[i] * delta
		pool.pz[i] += pool.vz[i] * delta

		// Scale expansion — grow to ~2.5x over lifetime
		const t = 1 - pool.life[i]
		pool.scale[i] = pool.scale0[i] * (1 + t * 1.5)

		// Rotation
		pool.rotation[i] += pool.rotSpeed[i] * delta

		i++
	}
}

/**
 * Write pool → instanceMatrix + instanceColor.
 * Life is baked into color intensity: dead particles → black → invisible with additive blending.
 * Both buffers are managed by InstancedMesh (uploaded atomically, no desync).
 */
export function writeInstances(pool: ParticlePool, matrices: Float32Array, colors: Float32Array) {
	for (let i = 0; i < pool.count; i++) {
		const s = pool.scale[i]
		const r = pool.rotation[i]
		const life = pool.life[i]
		// Intensity: bright at birth, fades to black (invisible with additive blending)
		const intensity = life * life * 3 // quadratic falloff, peak=3

		_pos.set(pool.px[i], pool.py[i], pool.pz[i])
		_quat.setFromAxisAngle(_tangent.set(0, 0, 1), r)
		_scale.set(s, s, s)
		_mat.compose(_pos, _quat, _scale)
		_mat.toArray(matrices, i * 16)

		colors[i * 3] = pool.cr[i] * intensity
		colors[i * 3 + 1] = pool.cg[i] * intensity
		colors[i * 3 + 2] = pool.cb[i] * intensity
	}
}
