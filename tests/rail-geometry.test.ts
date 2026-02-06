import { describe, it, expect } from 'vitest'
import type { ResolvedPoint } from '../src/lib/rail'
import { computeBeatPositions, toV3 } from '../src/lib/rail-geometry'

function pt(p: [number, number, number], beat: number, round: 'to' | 'from' | 'both' | null = null): ResolvedPoint {
	return { p, beat, round }
}

describe('computeBeatPositions', () => {
	it('empty points → empty result', () => {
		expect(computeBeatPositions([])).toEqual([])
	})

	it('single point → single beat', () => {
		const r = computeBeatPositions([pt([1, 2, 3], 5)])
		expect(r).toHaveLength(1)
		expect(r[0].beat).toBe(5)
		expect(r[0].position.x).toBeCloseTo(1)
	})

	it('sequential beats (gap=1): positions match control points', () => {
		const points = [pt([0, 0, 0], 0), pt([1, 0, 0], 1), pt([2, 0, 0], 2)]
		const r = computeBeatPositions(points)
		expect(r.map((b) => b.beat)).toEqual([0, 1, 2])
		expect(r[0].position.x).toBeCloseTo(0)
		expect(r[1].position.x).toBeCloseTo(1)
		expect(r[2].position.x).toBeCloseTo(2)
	})

	it('gap > 1 on straight segment: evenly spaced', () => {
		const points = [pt([0, 0, 0], 0), pt([4, 0, 0], 4)]
		const r = computeBeatPositions(points)
		expect(r.map((b) => b.beat)).toEqual([0, 1, 2, 3, 4])
		expect(r[0].position.x).toBeCloseTo(0)
		expect(r[1].position.x).toBeCloseTo(1)
		expect(r[2].position.x).toBeCloseTo(2)
		expect(r[3].position.x).toBeCloseTo(3)
		expect(r[4].position.x).toBeCloseTo(4)
	})

	it('gap > 1 on curved segment: intermediate beats on the arc', () => {
		// Quarter of a closed circle with gap on one segment
		// 4-point circle: tangent context available from adjacent points
		const points = [
			pt([1, 0, 0], 0, 'both'),
			pt([0, 0, 1], 4, 'both'),  // gap=4 on this segment
			pt([-1, 0, 0], 5, 'both'),
			pt([0, 0, -1], 6, 'both'),
			pt([1, 0, 0], 7, 'both'),  // close loop
		]
		const r = computeBeatPositions(points)
		expect(r).toHaveLength(8) // beats 0..7
		// midpoint of first segment (beat 2) should be near radius=1
		const mid = r[2].position
		const dist = Math.sqrt(mid.x ** 2 + mid.y ** 2 + mid.z ** 2)
		expect(dist).toBeGreaterThan(0.9)
	})

	it('mixed gaps', () => {
		const points = [
			pt([0, 0, 0], 0),
			pt([1, 0, 0], 1),
			pt([4, 0, 0], 4),
		]
		const r = computeBeatPositions(points)
		expect(r.map((b) => b.beat)).toEqual([0, 1, 2, 3, 4])
		// beat 1 at exact control point
		expect(r[1].position.x).toBeCloseTo(1)
		// beats 2,3 interpolated between [1,0,0] and [4,0,0]
		expect(r[2].position.x).toBeCloseTo(2)
		expect(r[3].position.x).toBeCloseTo(3)
	})

	it('closed loop: last point emitted', () => {
		const points = [
			pt([1, 0, 0], 0, 'both'),
			pt([0, 0, 1], 1, 'both'),
			pt([-1, 0, 0], 2, 'both'),
			pt([0, 0, -1], 3, 'both'),
			pt([1, 0, 0], 4, 'both'),
		]
		const r = computeBeatPositions(points)
		expect(r).toHaveLength(5)
		expect(r[0].beat).toBe(0)
		expect(r[4].beat).toBe(4)
		// first and last should be at the same position
		expect(r[0].position.x).toBeCloseTo(r[4].position.x)
		expect(r[0].position.z).toBeCloseTo(r[4].position.z)
	})

	it('gap=0: emits beat once', () => {
		const points = [pt([0, 0, 0], 3), pt([1, 0, 0], 3)]
		const r = computeBeatPositions(points)
		expect(r.map((b) => b.beat)).toEqual([3])
	})

	it('fractional beats: emits only integer beats', () => {
		// Simulates geometric-only intermediate points (circle with beat 0→2)
		const points = [
			pt([1, 0, 0], 0, 'both'),
			pt([0, 0, 1], 0.5, 'both'),
			pt([-1, 0, 0], 1.0, 'both'),
			pt([0, 0, -1], 1.5, 'both'),
			pt([1, 0, 0], 2, 'both'),
		]
		const r = computeBeatPositions(points)
		expect(r.map((b) => b.beat)).toEqual([0, 1, 2])
		// beat 1 should be at (-1,0,0) — the control point at fractional beat 1.0
		expect(r[1].position.x).toBeCloseTo(-1)
	})
})
