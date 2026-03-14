import { describe, it, expect } from 'vitest'
import { svgRail } from '../src/lib/core/rail-svg'
import type { RailPointFull } from '../src/lib/core/rail'
import { railToString } from '../src/lib/core/rail-path'
import { isClosed } from '../src/lib/helpers/rail-geometry'
import { resolveRail } from '../src/lib/core/rail-resolve'
import { RailConfig, toRailShapeConfig } from '../src/lib/core/rail-config'

describe('svgRail', () => {
	it('closed path: start node becomes both with averaged tangent', () => {
		// Simplified version of the diamond/star shape from drawing-formlines.svg
		const d =
			'm 80.4,75.8 c -3.2,-0.1 -7.7,6 -9.2,3.1 -1.6,-2.8 5.9,-3.4 7.5,-6.2 1.7,-2.8 -1.3,-9.6 1.9,-9.6 3.3,0.1 0,6.8 1.6,9.6 1.6,2.8 9.1,3.5 7.3,6.4 -1.7,2.9 -6,-3.4 -9.1,-3.4 z'
		const pts = svgRail(d)

		// First point must be 'both' (not 'from') for a smooth closed loop
		const first = pts[0] as RailPointFull
		expect(Array.isArray(first)).toBe(false)
		expect(first.round).toBe('both')

		// Z-added plain Vec3 (straight close) must be removed — path has 6 curves = 7 points
		expect(pts.length).toBe(7)

		// All points should be 'both' or 'to' (no orphan 'from')
		for (let i = 1; i < pts.length; i++) {
			const pt = pts[i] as RailPointFull
			expect(Array.isArray(pt)).toBe(false)
			expect(['both', 'to']).toContain(pt.round)
		}
	})

	it('closed path with large gap: closing segment preserved', () => {
		// S-shape from formlines: last curve ends ~10 SVG units from start → Z adds closing point
		const d = 'M 40,50 C 35,50 35,55 40,55 C 45,55 45,50 50,50 z'
		const pts = svgRail(d)
		// Should have: M + 2 curves + closing point = 4 points
		// The closing segment (50,50 → 40,50 = 10 units) must NOT be removed
		expect(pts.length).toBe(4)
		// First point stays plain Vec3 (closing segment is straight, not curve)
		// Last point is the closing point (plain Vec3)
		expect(Array.isArray(pts[pts.length - 1])).toBe(true) // eslint-disable-line unicorn/prefer-at
	})

	it('closed path: first point round=from stays if close gap is large', () => {
		// When gap is large (> 0.2), closing segment is straight, first point keeps original rounding
		const d = 'M 0,0 C 5,0 10,5 10,10 C 10,15 5,20 0,20 L 0,0 z'
		const pts = svgRail(d)
		// L 0,0 lands exactly on start → Z doesn't add point (1e-4 threshold)
		// First point should NOT be upgraded to 'both' since Z closure is via L not curve
		const first = pts[0]
		// First point was plain M, then first C marked it 'from'
		if (!Array.isArray(first)) {
			expect((first as RailPointFull).round).toBe('from')
		}
	})
})

describe('round-trip close test', () => {
	it('lines', () => {
		const linesSvg = 'M 27.5,62.5 22.5,65 l -7.5,12.5 -10,0 5,-2.5 7.5,-12.5 z'
		const railString = railToString(svgRail(linesSvg))
		const railStringExpected = 'l2.25o1.25 l.5o.25 l.75o1.25 l r.5i.25 r.75i1.25 r'

		expect(railString).toEqual(railStringExpected)

		const railConfig: RailConfig = {
			id: 'test',
			color: '#ffffff',
			nodes: [railString]
		}

		const resolved = resolveRail(toRailShapeConfig(railConfig))
		expect(resolved.points[0].p).toEqual(resolved.points.at(-1)?.p)
		const closed = isClosed(resolved.points[0].p, resolved.points.at(-1)?.p ?? null)
		expect(closed).toEqual(true)
	})

	it('curves', () => {
		const linesSvg =
			'm 80.4,75.8 c -3.2,-0.1 -7.7,6 -9.2,3.1 -1.6,-2.8 5.9,-3.4 7.5,-6.2 1.7,-2.8 -1.3,-9.6 1.9,-9.6 3.3,0.1 0,6.8 1.6,9.6 1.6,2.8 9.1,3.5 7.3,6.4 -1.7,2.9 -6,-3.4 -9.1,-3.4 z'
		const railString = railToString(svgRail(linesSvg))
		const railStringExpected =
			'r3.04o2.58b.32 l.92o.31b.33 r.75i.62b.33 r.19i.96b.33 r.16o.96b.33 r.73o.64b.35 l.91i.33t.32'

		expect(railString).toEqual(railStringExpected)

		const railConfig: RailConfig = {
			id: 'test',
			color: '#ffffff',
			nodes: [railString]
		}

		const resolved = resolveRail(toRailShapeConfig(railConfig))
		expect(resolved.points[0].p).toEqual(resolved.points.at(-1)?.p)

		const closed = isClosed(resolved.points[0].p, resolved.points.at(-1)?.p ?? null)
		expect(closed).toEqual(true)
	})
})
