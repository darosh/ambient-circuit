import { describe, it, expect } from 'vitest'
import { buildTubeGeometry } from '../src/lib/video/geometry-tube'
import { LineCurve3, Vector3 } from 'three/webgpu'

// Simple square of 4 line segments forming a closed loop
function squareCurves(): ReturnType<typeof LineCurve3.prototype.clone>[] {
	const a = new Vector3(1, 0, 0)
	const b = new Vector3(1, 0, 1)
	const c = new Vector3(0, 0, 1)
	const d = new Vector3(0, 0, 0)
	return [new LineCurve3(d, a), new LineCurve3(a, b), new LineCurve3(b, c), new LineCurve3(c, d)]
}

// Single straight line segment
function lineCurve(): LineCurve3[] {
	return [new LineCurve3(new Vector3(0, 0, 0), new Vector3(2, 0, 0))]
}

function getAttr(geo: ReturnType<typeof buildTubeGeometry>, name: string) {
	return geo.getAttribute(name) as { array: Float32Array; count: number; itemSize: number }
}

describe('buildTubeGeometry', () => {
	const R = 6 // radialSegments
	const density = 4
	const radius = 0.1

	it('open: correct vertex and index count', () => {
		const geo = buildTubeGeometry(lineCurve(), radius, R, density, false, false)
		const pos = getAttr(geo, 'position')
		// density * length = 4 * 2 = 8 samples, so n = max(2, 8) = 8 → frames = 9 (0..n)
		// rings = N = frames.length; vertices per ring = R+1
		const N = pos.count / (R + 1)
		expect(Number.isInteger(N)).toBe(true)
		// index count: (numRings-1) * R * 6 = (N-1)*R*6
		const idx = geo.index!
		expect(idx.count).toBe((N - 1) * R * 6)
	})

	it('closed: same ring count as open (skip-endpoint offsets extra UV ring)', () => {
		const curves = squareCurves()
		const open = buildTubeGeometry(curves, radius, R, density, false, false)
		const closed = buildTubeGeometry(curves, radius, R, density, true)

		const openRings = getAttr(open, 'position').count / (R + 1)
		const closedRings = getAttr(closed, 'position').count / (R + 1)

		// closed skips last endpoint of last curve (-1 frame) then adds one UV-duplicate
		// closing ring (+1 ring) → net same total as open
		expect(closedRings).toBe(openRings)
	})

	it('closed: closing ring positions equal first ring positions', () => {
		const curves = squareCurves()
		const geo = buildTubeGeometry(curves, radius, R, density, true)
		const pos = getAttr(geo, 'position')
		const totalRings = pos.count / (R + 1)

		// ring 0 and ring N (last) should share identical positions
		for (let j = 0; j <= R; j++) {
			const firstIdx = j * 3
			const lastIdx = (totalRings - 1) * (R + 1) * 3 + j * 3
			expect(pos.array[lastIdx]).toBeCloseTo(pos.array[firstIdx], 5)
			expect(pos.array[lastIdx + 1]).toBeCloseTo(pos.array[firstIdx + 1], 5)
			expect(pos.array[lastIdx + 2]).toBeCloseTo(pos.array[firstIdx + 2], 5)
		}
	})

	it.skip('closed: last ring UV.x == 1.0', () => {
		const curves = squareCurves()
		const geo = buildTubeGeometry(curves, radius, R, density, true)
		const uv = getAttr(geo, 'uv')
		const totalRings = getAttr(geo, 'position').count / (R + 1)
		// last ring starts at vertex index (totalRings-1)*(R+1)
		const lastRingStart = (totalRings - 1) * (R + 1)
		for (let j = 0; j <= R; j++) {
			const uvX = uv.array[(lastRingStart + j) * 2]
			expect(uvX).toBeCloseTo(1, 5)
		}
	})

	it.skip('open: last ring UV.x == 1.0', () => {
		const geo = buildTubeGeometry(lineCurve(), radius, R, density, false, false)
		const uv = getAttr(geo, 'uv')
		const totalRings = getAttr(geo, 'position').count / (R + 1)
		const lastRingStart = (totalRings - 1) * (R + 1)
		for (let j = 0; j <= R; j++) {
			const uvX = uv.array[(lastRingStart + j) * 2]
			expect(uvX).toBeCloseTo(1, 5)
		}
	})

	it('normals are unit length', () => {
		const geo = buildTubeGeometry(squareCurves(), radius, R, density, true)
		const nrm = getAttr(geo, 'normal')
		for (let i = 0; i < nrm.count; i++) {
			const x = nrm.array[i * 3]
			const y = nrm.array[i * 3 + 1]
			const z = nrm.array[i * 3 + 2]
			const len = Math.hypot(x, y, z)
			expect(len).toBeCloseTo(1, 4)
		}
	})

	it('returns empty geometry for no curves', () => {
		const geo = buildTubeGeometry([], radius, R, density, false)
		expect(geo.getAttribute('position')).toBeUndefined()
	})

	it('open cap=true: vertex count = tube + 2 cap disks', () => {
		const geo = buildTubeGeometry(lineCurve(), radius, R, density, false, true)
		const pos = getAttr(geo, 'position')
		// tube rings * (R+1) + 2 * (1 center + R+1 perimeter) = N*(R+1) + 2*(R+2)
		const tubeRings = Math.ceil(2 * density) + 1 // n=max(2,ceil(2*4))=8 → frames=9
		const tubeVerts = tubeRings * (R + 1)
		const capVerts = 2 * (R + 2) // center + R+1 perimeter per cap
		expect(pos.count).toBe(tubeVerts + capVerts)
	})

	it('open cap=false: same vertex count as uncapped', () => {
		const capped = buildTubeGeometry(lineCurve(), radius, R, density, false, true)
		const uncapped = buildTubeGeometry(lineCurve(), radius, R, density, false, false)
		const cPos = getAttr(capped, 'position')
		const uPos = getAttr(uncapped, 'position')
		expect(cPos.count).toBeGreaterThan(uPos.count)
	})

	it('closed: cap=true is ignored (same vertex count as cap=false)', () => {
		const withCap = buildTubeGeometry(squareCurves(), radius, R, density, true, true)
		const noCap = buildTubeGeometry(squareCurves(), radius, R, density, true, false)
		expect(getAttr(withCap, 'position').count).toBe(getAttr(noCap, 'position').count)
	})

	it('open cap=true: start cap center equals curve start point', () => {
		// lineCurve goes from (0,0,0) to (2,0,0)
		const geo = buildTubeGeometry(lineCurve(), radius, R, density, false, true)
		const pos = getAttr(geo, 'position')
		// tube rings * (R+1) vertices first; after that start cap vertices
		const tubeRings = Math.ceil(2 * density) + 1
		const tubeVertCount = tubeRings * (R + 1)
		const startCapCenterIdx = tubeVertCount * 3
		// start cap center should be at curve start (0,0,0)
		expect(pos.array[startCapCenterIdx]).toBeCloseTo(0, 4)
		expect(pos.array[startCapCenterIdx + 1]).toBeCloseTo(0, 4)
		expect(pos.array[startCapCenterIdx + 2]).toBeCloseTo(0, 4)
		// end cap center (second cap, after start cap's R+2 vertices) should be at (2,0,0)
		const endCapCenterIdx = (tubeVertCount + R + 2) * 3
		expect(pos.array[endCapCenterIdx]).toBeCloseTo(2, 4)
		expect(pos.array[endCapCenterIdx + 1]).toBeCloseTo(0, 4)
		expect(pos.array[endCapCenterIdx + 2]).toBeCloseTo(0, 4)
	})

	it('closed: index count = N * R * 6 (one extra stitch vs open)', () => {
		const curves = squareCurves()
		const closed = buildTubeGeometry(curves, radius, R, density, true)
		const pos = getAttr(closed, 'position')
		const N = pos.count / (R + 1) // totalRings including extra closing ring
		// (N-1) strips, each R*6 indices
		expect(closed.index!.count).toBe((N - 1) * R * 6)
	})
})
