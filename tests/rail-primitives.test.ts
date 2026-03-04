import { describe, it, expect } from 'vitest'
import { circle, roundedRect, coil, spiral, svgRail } from '../src/lib/core/rail-primitives'
import type { RailPointFull, Vec3 } from '../src/lib/core/rail'
import { isPointFull, isVec3 } from '../src/lib/core/rail'

function getPositions(nodes: (Vec3 | RailPointFull)[]): Vec3[] {
	return nodes.map((n: Vec3 | RailPointFull) => (Array.isArray(n) ? n : n.p))
}

describe('circle', () => {
	it('defaults: 4 points + closing point, all both', () => {
		const nodes = circle()
		expect(nodes).toHaveLength(5) // 4 + close
		for (const n of nodes) {
			expect(isPointFull(n)).toBe(true)
			expect((n as RailPointFull).round).toBe('both')
		}
	})

	it('first and last point same position (closed loop)', () => {
		const nodes = circle()
		const pos = getPositions(nodes)
		expect(pos[0][0]).toBeCloseTo(pos[4][0])
		expect(pos[0][1]).toBeCloseTo(pos[4][1])
		expect(pos[0][2]).toBeCloseTo(pos[4][2])
	})

	it('custom radius', () => {
		const nodes = circle({ radius: 3 })
		const pos = getPositions(nodes)
		// first point at angle 0 → x=3
		expect(pos[0][0]).toBeCloseTo(3)
		expect(pos[0][2]).toBeCloseTo(0)
	})

	it('custom point count', () => {
		const nodes = circle({ points: 6 })
		expect(nodes).toHaveLength(7) // 6 + close
	})

	it('min 3 points', () => {
		const nodes = circle({ points: 1 })
		expect(nodes).toHaveLength(4) // 3 + close
	})

	it('position offset', () => {
		const nodes = circle({ pos: { x: 5, y: 2, z: -1 }, radius: 1 })
		const pos = getPositions(nodes)
		// first point: cos(0)*1+5=6, 0+2=2, sin(0)*1-1=-1
		expect(pos[0][0]).toBeCloseTo(6)
		expect(pos[0][1]).toBeCloseTo(2)
		expect(pos[0][2]).toBeCloseTo(-1)
	})
})

describe('roundedRect', () => {
	// original hand-authored fixture (center 3.5, -0.5; w=3, h=3, cr=1)
	const fixture = [
		{ p: [3, 0, -2] },
		{ p: [4, 0, -2], round: 'from' },
		{ p: [5, 0, -1] },
		{ p: [5, 0, 0], round: 'from' },
		{ p: [4, 0, 1] },
		{ p: [3, 0, 1], round: 'from' },
		{ p: [2, 0, 0] },
		{ p: [2, 0, -1], round: 'from' },
		{ p: [3, 0, -2] }
	]

	it('matches original fixture with equivalent params', () => {
		const nodes = roundedRect({ pos: { x: 3.5, z: -0.5 }, width: 3, height: 3, cornerRadius: 1 })
		const pos = getPositions(nodes)
		const fixturePos = fixture.map((f) => f.p)
		expect(pos).toHaveLength(fixturePos.length)
		for (const [i, po] of pos.entries()) {
			expect(po[0]).toBeCloseTo(fixturePos[i][0])
			expect(po[1]).toBeCloseTo(fixturePos[i][1])
			expect(po[2]).toBeCloseTo(fixturePos[i][2])
		}
	})

	it('rounding matches fixture: even=plain, odd=from', () => {
		const nodes = roundedRect()
		for (let i = 0; i < 8; i++) {
			const n = nodes[i]
			if (i % 2 === 0) {
				expect(isVec3(n)).toBe(true)
			} else {
				expect(isPointFull(n)).toBe(true)
				expect((n as RailPointFull).round).toBe('from')
			}
		}
	})

	it('9 nodes (8 + close), closed loop', () => {
		const nodes = roundedRect()
		expect(nodes).toHaveLength(9)
		const pos = getPositions(nodes)
		expect(pos[0]).toEqual(pos[8])
	})

	it('position offset applied to all points', () => {
		const nodes = roundedRect({ pos: { x: 10 } })
		const pos = getPositions(nodes)
		for (const p of pos) {
			expect(p[0]).toBeGreaterThanOrEqual(10 - 1.5 - 0.01) // hw=1.5
		}
	})

	it('custom dimensions', () => {
		const nodes = roundedRect({ width: 6, height: 4 })
		const pos = getPositions(nodes)
		const xs = pos.map((p) => p[0])
		const zs = pos.map((p) => p[2])
		expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(6)
		expect(Math.max(...zs) - Math.min(...zs)).toBeLessThanOrEqual(4)
	})

	it('cornerRadius clamped to half shorter side', () => {
		const nodes = roundedRect({ width: 2, height: 4, cornerRadius: 100 })
		const pos = getPositions(nodes)
		const xs = pos.map((p) => p[0])
		// cr clamped to hw=1, so all x between -1 and 1
		expect(Math.max(...xs)).toBeCloseTo(1)
		expect(Math.min(...xs)).toBeCloseTo(-1)
	})
})

describe('coil', () => {
	it('defaults: lead-in + coil points + lead-out', () => {
		const nodes = coil()
		// 2*4+1 = 9 coil points + 2 leads = 11
		expect(nodes).toHaveLength(11)
	})

	it('first and last nodes are plain Vec3 (leads)', () => {
		const nodes = coil()
		expect(isVec3(nodes[0])).toBe(true)
		expect(isVec3(nodes.at(-1)!)).toBe(true)
	})

	it('inner points have correct rounding', () => {
		const nodes = coil()
		const inner = nodes.slice(1, -1) as RailPointFull[]
		expect(inner[0].round).toBe('from')
		expect(inner.at(-1)!.round).toBe('to')
		for (let i = 1; i < inner.length - 1; i++) {
			expect(inner[i].round).toBe('both')
		}
	})

	it('height distributes across coil points', () => {
		const nodes = coil({ height: 4 })
		const inner = nodes.slice(1, -1) as RailPointFull[]
		expect(inner[0].p[1]).toBeCloseTo(0)
		expect(inner.at(-1)!.p[1]).toBeCloseTo(4)
	})

	it('custom rounds and density', () => {
		const nodes = coil({ rounds: 3, density: 6 })
		// 3*6+1 = 19 coil points + 2 leads = 21
		expect(nodes).toHaveLength(21)
	})

	it('position offset', () => {
		const nodes = coil({ pos: { x: 10, y: 5 } })
		const inner = nodes.slice(1, -1) as RailPointFull[]
		// first coil point at angle 0: x = cos(0)*1 + 10 = 11
		expect(inner[0].p[0]).toBeCloseTo(11)
		expect(inner[0].p[1]).toBeCloseTo(5)
	})
})

describe('svgRail', () => {
	// M 25,70 V 20 H 67 C 80,20 80,40 67,40 H 35 v 30  (scale=10, XZ plane)
	// C tangent: handle=13 SVG, chord=20 SVG → t = 13/20 = 0.65
	it('M/V/H/C/H/v → 6 points', () => {
		const nodes = svgRail('M 25,70 V 20 H 67 C 80,20 80,40 67,40 H 35 v 30')
		expect(nodes).toHaveLength(6)
	})

	it('straight commands produce plain Vec3', () => {
		const nodes = svgRail('M 25,70 V 20 H 67 C 80,20 80,40 67,40 H 35 v 30')
		expect(isVec3(nodes[0])).toBe(true) // M
		expect(isVec3(nodes[1])).toBe(true) // V
		expect(isVec3(nodes[4])).toBe(true) // H
		expect(isVec3(nodes[5])).toBe(true) // v
	})

	it('point before C gets round:from with tangent', () => {
		const nodes = svgRail('M 25,70 V 20 H 67 C 80,20 80,40 67,40 H 35 v 30')
		const fromPt = nodes[2] as RailPointFull
		expect(isPointFull(fromPt)).toBe(true)
		expect(fromPt.round).toBe('from')
		expect(fromPt.tangent).toBeCloseTo(0.65)
	})

	it('C endpoint gets round:to with tangent', () => {
		const nodes = svgRail('M 25,70 V 20 H 67 C 80,20 80,40 67,40 H 35 v 30')
		const toPt = nodes[3] as RailPointFull
		expect(isPointFull(toPt)).toBe(true)
		expect(toPt.round).toBe('to')
		expect(toPt.tangent).toBeCloseTo(0.65)
	})

	it('coordinates match (XZ plane, scale 10)', () => {
		const nodes = svgRail('M 25,70 V 20 H 67 C 80,20 80,40 67,40 H 35 v 30')
		const positions = nodes.map((n) => (Array.isArray(n) ? n : (n as RailPointFull).p))
		expect(positions[0]).toEqual([2.5, 0, 7]) // M 25,70
		expect(positions[1]).toEqual([2.5, 0, 2]) // V 20
		expect(positions[2][0]).toBeCloseTo(6.7) // H 67 (from-point)
		expect(positions[2][2]).toBeCloseTo(2)
		expect(positions[3][0]).toBeCloseTo(6.7) // C endpoint
		expect(positions[3][2]).toBeCloseTo(4)
		expect(positions[4]).toEqual([3.5, 0, 4]) // H 35
		expect(positions[5]).toEqual([3.5, 0, 7]) // v 30
	})
})

describe('spiral', () => {
	it('defaults: lead-in + spiral points + lead-out', () => {
		const nodes = spiral()
		// 2*4+1 = 9 spiral points + 2 leads = 11
		expect(nodes).toHaveLength(11)
	})

	it('radius increases with each revolution', () => {
		const nodes = spiral({ startRadius: 0.5, radiusStep: 0.5, density: 4, rounds: 2 })
		const inner = nodes.slice(1, -1) as RailPointFull[]
		// points at angle 0 (i=0 and i=4) should have increasing distance from center
		const dist0 = Math.hypot(inner[0].p[0], inner[0].p[2])
		const dist4 = Math.hypot(inner[4].p[0], inner[4].p[2])
		expect(dist4).toBeGreaterThan(dist0)
	})

	it('inner points have correct rounding', () => {
		const nodes = spiral()
		const inner = nodes.slice(1, -1) as RailPointFull[]
		expect(inner[0].round).toBe('from')
		expect(inner.at(-1)!.round).toBe('to')
		for (let i = 1; i < inner.length - 1; i++) {
			expect(inner[i].round).toBe('both')
		}
	})

	it('position offset', () => {
		const nodes = spiral({ pos: { y: 3 } })
		const inner = nodes.slice(1, -1) as RailPointFull[]
		expect(inner[0].p[1]).toBeCloseTo(3)
	})
})
