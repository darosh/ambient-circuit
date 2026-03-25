import { Matrix4, Quaternion, Vector3, Color } from 'three/webgpu'

const MAX_PARTICLES = 2048

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
	// orbit (spiral trajectory around burst tangent)
	otx: Float32Array
	oty: Float32Array
	otz: Float32Array
	orbitSpeed: Float32Array
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
		otx: new Float32Array(max),
		oty: new Float32Array(max),
		otz: new Float32Array(max),
		orbitSpeed: new Float32Array(max),
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
	speed: number = 3,
	duration: number = 1,
	radius: number = 1,
	spin: number = 1,
	rotation: number = 0,
	range: number = 1,
	spread: number = 0.3
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
		const s = speed * (0.3 + Math.random() * 0.7) * range
		// Cone sampling: phi = angle from disc plane, spread = half-angle
		const phi = (Math.random() - 0.5) * 2 * spread
		const cosPhi = Math.cos(phi)
		const sinPhi = Math.sin(phi)
		const cosT = Math.cos(theta) * cosPhi
		const sinT = Math.sin(theta) * cosPhi

		pool.px[idx] = x + (Math.random() - 0.5) * 0.05
		pool.py[idx] = y + (Math.random() - 0.5) * 0.05
		pool.pz[idx] = z + (Math.random() - 0.5) * 0.05

		pool.vx[idx] = (_right.x * cosT + _up.x * sinT + _tangent.x * sinPhi) * s
		pool.vy[idx] = (_right.y * cosT + _up.y * sinT + _tangent.y * sinPhi) * s
		pool.vz[idx] = (_right.z * cosT + _up.z * sinT + _tangent.z * sinPhi) * s

		const lifetime = (0.25 + Math.random() * 0.35) * duration
		pool.life[idx] = 1
		pool.maxLife[idx] = lifetime

		const sc = (0.015 + Math.random() * 0.025) * radius
		pool.scale[idx] = sc
		pool.scale0[idx] = sc

		pool.rotation[idx] = Math.random() * Math.PI * 2
		pool.rotSpeed[idx] = (Math.random() - 0.5) * 16 * spin

		// Orbit axis = burst tangent, speed proportional to rotation param
		pool.otx[idx] = _tangent.x
		pool.oty[idx] = _tangent.y
		pool.otz[idx] = _tangent.z
		pool.orbitSpeed[idx] = rotation * (4 + Math.random() * 4) * (Math.random() < 0.5 ? -1 : 1)

		pool.cr[idx] = _color.r
		pool.cg[idx] = _color.g
		pool.cb[idx] = _color.b
	}
}

export function updatePool(
	pool: ParticlePool,
	delta: number,
	gx: number = 0,
	gy: number = 0,
	gz: number = 0
) {
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
				pool.otx[i] = pool.otx[last]
				pool.oty[i] = pool.oty[last]
				pool.otz[i] = pool.otz[last]
				pool.orbitSpeed[i] = pool.orbitSpeed[last]
				pool.cr[i] = pool.cr[last]
				pool.cg[i] = pool.cg[last]
				pool.cb[i] = pool.cb[last]
			}
			pool.count--
			continue
		}

		// Orbit: rotate velocity direction around burst tangent axis (preserve magnitude)
		const os = pool.orbitSpeed[i]
		if (os !== 0) {
			const angle = os * delta
			const ca = Math.cos(angle)
			const sa = Math.sin(angle)
			const ax = pool.otx[i],
				ay = pool.oty[i],
				az = pool.otz[i]
			const vx0 = pool.vx[i],
				vy0 = pool.vy[i],
				vz0 = pool.vz[i]
			const mag = Math.hypot(vx0, vy0, vz0)
			if (mag > 1e-6) {
				// Rodrigues' rotation: v' = v*cos + (k×v)*sin + k*(k·v)*(1-cos)
				const dot = ax * vx0 + ay * vy0 + az * vz0
				const cx = ay * vz0 - az * vy0
				const cy = az * vx0 - ax * vz0
				const cz = ax * vy0 - ay * vx0
				const omc = 1 - ca
				const rx = vx0 * ca + cx * sa + ax * dot * omc
				const ry = vy0 * ca + cy * sa + ay * dot * omc
				const rz = vz0 * ca + cz * sa + az * dot * omc
				// Re-normalize to original magnitude so rotation doesn't shrink range
				const rmag = Math.hypot(rx, ry, rz)
				const ns = mag / rmag
				pool.vx[i] = rx * ns
				pool.vy[i] = ry * ns
				pool.vz[i] = rz * ns
			}
		}

		// Gravity
		pool.vx[i] += gx * delta
		pool.vy[i] += gy * delta
		pool.vz[i] += gz * delta

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
