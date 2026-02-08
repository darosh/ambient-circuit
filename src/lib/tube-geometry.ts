import { BufferAttribute, BufferGeometry, type Curve, Vector3 } from 'three'

/**
 * Build a tube geometry from sub-curves with junction-aware Frenet frames.
 * Unlike TubeGeometry, computes analytical tangents at each sub-curve's endpoints
 * and blends them at junctions to avoid normal-frame kinks.
 */
export function buildTubeGeometry(
	curves: Curve<Vector3>[],
	radius: number,
	radialSegments: number,
	density: number,
	closed: boolean
): BufferGeometry {
	// --- 1. Sample positions and blended tangents ---
	interface Frame {
		p: Vector3
		t: Vector3
		n: Vector3
		b: Vector3
	}
	const frames: Frame[] = []

	const lastCi = curves.length - 1
	for (let ci = 0; ci < curves.length; ci++) {
		const curve = curves[ci]
		const n = Math.max(2, Math.ceil(curve.getLength() * density))
		// When closed, skip the last endpoint of the final curve — it coincides with the start
		const iMax = closed && ci === lastCi ? n - 1 : n

		for (let i = ci === 0 ? 0 : 1; i <= iMax; i++) {
			const u = i / n
			const p = curve.getPointAt(u)

			let t: Vector3
			if (i === 0 && ci > 0) {
				// Interior junction: blend end of previous + start of this
				const t0 = curves[ci - 1].getTangentAt(1).normalize()
				const t1 = curve.getTangentAt(0).normalize()
				t = t0.add(t1).normalize()
			} else if (i === 0 && ci === 0 && closed) {
				// Closing junction (start): blend end of last curve + start of first
				const t0 = curves[lastCi].getTangentAt(1).normalize()
				const t1 = curve.getTangentAt(0).normalize()
				t = t0.add(t1).normalize()
			} else if (i === n && ci < lastCi) {
				// Interior junction: blend end of this + start of next
				const t0 = curve.getTangentAt(1).normalize()
				const t1 = curves[ci + 1].getTangentAt(0).normalize()
				t = t0.add(t1).normalize()
			} else if (i === iMax && ci === lastCi && closed) {
				// Closing junction (end): blend end of last curve + start of first
				const t0 = curve.getTangentAt(1).normalize()
				const t1 = curves[0].getTangentAt(0).normalize()
				t = t0.add(t1).normalize()
			} else {
				t = curve.getTangentAt(u).normalize()
			}

			frames.push({ p, t, n: new Vector3(), b: new Vector3() })
		}
	}

	if (frames.length < 2) return new BufferGeometry()

	// --- 2. Initial normal perpendicular to first tangent ---
	const t0 = frames[0].t
	const perp = Math.abs(t0.x) <= 0.9 ? new Vector3(1, 0, 0) : new Vector3(0, 1, 0)
	frames[0].n = perp
		.clone()
		.sub(t0.clone().multiplyScalar(perp.dot(t0)))
		.normalize()
	frames[0].b = new Vector3().crossVectors(frames[0].t, frames[0].n)

	// --- 3. Propagate via rotation minimizing transport ---
	for (let i = 1; i < frames.length; i++) {
		const prev = frames[i - 1]
		const curr = frames[i]
		const axis = new Vector3().crossVectors(prev.t, curr.t)
		if (axis.length() > 1e-10) {
			const angle = Math.acos(Math.min(1, Math.max(-1, prev.t.dot(curr.t))))
			curr.n = prev.n.clone().applyAxisAngle(axis.normalize(), angle)
		} else {
			curr.n = prev.n.clone()
		}
		curr.b = new Vector3().crossVectors(curr.t, curr.n)
	}

	// --- 4. Closed loop: correct accumulated twist ---
	if (closed && frames.length > 1) {
		// Propagate one virtual frame through the closing gap to measure true loop twist
		const lastF = frames[frames.length - 1]
		const firstT = frames[0].t
		const closeAxis = new Vector3().crossVectors(lastF.t, firstT)
		let closingN: Vector3
		if (closeAxis.length() > 1e-10) {
			const angle = Math.acos(Math.min(1, Math.max(-1, lastF.t.dot(firstT))))
			closingN = lastF.n.clone().applyAxisAngle(closeAxis.normalize(), angle)
		} else {
			closingN = lastF.n.clone()
		}
		const firstN = frames[0].n
		const dot = Math.min(1, Math.max(-1, closingN.dot(firstN)))
		const cross = new Vector3().crossVectors(closingN, firstN)
		const twist = Math.acos(dot) * (cross.dot(firstT) >= 0 ? 1 : -1)
		const step = twist / frames.length
		for (let i = 1; i < frames.length; i++) {
			frames[i].n.applyAxisAngle(frames[i].t, step * i)
			frames[i].b.crossVectors(frames[i].t, frames[i].n)
		}
	}

	// --- 5. Extrude rings ---
	// For closed tubes: add one extra ring (UV duplicate of ring 0) so the closing stitch
	// has continuous UV.x instead of jumping from 1 back to 0.
	const N = frames.length
	const numRings = closed ? N + 1 : N
	const R = radialSegments
	const positions: number[] = []
	const normals: number[] = []
	const uvs: number[] = []
	const indices: number[] = []

	for (let i = 0; i < numRings; i++) {
		const fi = closed && i === N ? 0 : i
		const { p, n, b } = frames[fi]
		const uvX = closed ? i / N : i / (N - 1)
		for (let j = 0; j <= R; j++) {
			const angle = (j / R) * Math.PI * 2
			const cos = Math.cos(angle)
			const sin = Math.sin(angle)
			const nx = cos * n.x + sin * b.x
			const ny = cos * n.y + sin * b.y
			const nz = cos * n.z + sin * b.z
			positions.push(p.x + radius * nx, p.y + radius * ny, p.z + radius * nz)
			normals.push(nx, ny, nz)
			uvs.push(uvX, j / R)
		}
	}

	// --- 6. Stitch rings (uniform loop — no special closing stitch needed) ---
	for (let i = 0; i < numRings - 1; i++) {
		for (let j = 0; j < R; j++) {
			const a = i * (R + 1) + j
			const b = a + R + 1
			const c = a + 1
			const d = b + 1
			indices.push(a, b, d, a, d, c)
		}
	}

	const geo = new BufferGeometry()
	geo.setIndex(indices)
	geo.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
	geo.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3))
	geo.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2))
	return geo
}
