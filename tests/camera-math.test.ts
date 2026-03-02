import { describe, it, expect } from 'vitest'
import {
	unwrapAngle,
	dampAngleStep,
	dirToAngles,
	anglesToDir
} from '../src/lib/components/multi-view/camera-math'

describe('unwrapAngle', () => {
	it('no wrapping needed', () => {
		expect(unwrapAngle(0, 1)).toBeCloseTo(1)
	})
	it('wraps across +π boundary', () => {
		const result = unwrapAngle(Math.PI - 0.1, -Math.PI + 0.1)
		expect(result).toBeCloseTo(Math.PI + 0.1, 5)
	})
	it('wraps across -π boundary', () => {
		const result = unwrapAngle(-Math.PI + 0.1, Math.PI - 0.1)
		expect(result).toBeCloseTo(-Math.PI - 0.1, 5)
	})
	it('handles large differences', () => {
		const result = unwrapAngle(0, 7)
		// 7 - 2π ≈ 0.717, within [-π,π] of 0
		expect(result).toBeCloseTo(7 - 2 * Math.PI, 5)
	})
})

describe('dampAngleStep', () => {
	it('dead-zone prevents movement', () => {
		const result = dampAngleStep(1, 1.000_05, 0.5, 0.001)
		expect(result).toBe(1)
	})
	it('alpha=0 returns cur', () => {
		expect(dampAngleStep(1, 2, 0, 0)).toBeCloseTo(1)
	})
	it('alpha=1 reaches unwrapped target', () => {
		const result = dampAngleStep(0, 1, 1, 0)
		expect(result).toBeCloseTo(1)
	})
	it('maxDelta clamps large steps', () => {
		// alpha=1 would move 1 rad, but maxDelta=0.1 clamps it
		const result = dampAngleStep(0, 1, 1, 0, 0.1)
		expect(result).toBeCloseTo(0.1, 5)
	})
	it('maxDelta does not clamp small steps', () => {
		const result = dampAngleStep(0, 0.05, 1, 0, 0.1)
		expect(result).toBeCloseTo(0.05, 5)
	})
	it('wraps and steps correctly', () => {
		const cur = Math.PI - 0.1
		const target = -Math.PI + 0.1
		// unwrapped target = π + 0.1, diff = 0.2, alpha=0.5 → cur + 0.1
		const result = dampAngleStep(cur, target, 0.5, 0)
		expect(result).toBeCloseTo(cur + 0.1, 5)
	})
})

describe('dirToAngles + anglesToDir round-trip', () => {
	const cases: [number, number, number][] = [
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
		[-1, 0, 0],
		[0, -1, 0],
		[1, 1, 1],
		[0.5, -0.3, 0.8]
	]
	for (const [dx, dy, dz] of cases) {
		it(`round-trip (${dx},${dy},${dz})`, () => {
			const len = Math.hypot(dx, dy, dz)
			const nx = dx / len,
				ny = dy / len,
				nz = dz / len
			const angles = { yaw: 0, pitch: 0 }
			dirToAngles(nx, ny, nz, angles)
			const out = { x: 0, y: 0, z: 0 }
			anglesToDir(angles.yaw, angles.pitch, out)
			expect(out.x).toBeCloseTo(nx, 5)
			expect(out.y).toBeCloseTo(ny, 5)
			expect(out.z).toBeCloseTo(nz, 5)
		})
	}
})

describe('anglesToDir', () => {
	it('yaw=0, pitch=0 → (1,0,0)', () => {
		const out = { x: 0, y: 0, z: 0 }
		anglesToDir(0, 0, out)
		expect(out.x).toBeCloseTo(1)
		expect(out.y).toBeCloseTo(0)
		expect(out.z).toBeCloseTo(0)
	})
	it('pitch=π/2 → (0,1,0)', () => {
		const out = { x: 0, y: 0, z: 0 }
		anglesToDir(0, Math.PI / 2, out)
		expect(out.x).toBeCloseTo(0)
		expect(out.y).toBeCloseTo(1)
		expect(out.z).toBeCloseTo(0)
	})
	it('yaw=π/2, pitch=0 → (0,0,1)', () => {
		const out = { x: 0, y: 0, z: 0 }
		anglesToDir(Math.PI / 2, 0, out)
		expect(out.x).toBeCloseTo(0)
		expect(out.y).toBeCloseTo(0)
		expect(out.z).toBeCloseTo(1)
	})
})
