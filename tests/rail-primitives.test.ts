import { describe, it, expect } from 'vitest'
import { circle, roundedRect, coil, spiral } from '../src/lib/rail-primitives'
import type { RailPointFull, Vec3 } from '../src/lib/rail'
import { isPointFull, isVec3 } from '../src/lib/rail'

function getPositions(nodes: (Vec3 | RailPointFull | any)[]): Vec3[] {
	return nodes.map((n: any) => (Array.isArray(n) ? n : n.p))
}

describe('circle', () => {
	it('defaults: 4 points + closing point, all both', () => {
		const r = circle()
		expect(r.id).toBe('circle')
		expect(r.nodes).toHaveLength(5) // 4 + close
		for (const n of r.nodes) {
			expect(isPointFull(n as any)).toBe(true)
			expect((n as RailPointFull).round).toBe('both')
		}
	})

	it('first and last point same position (closed loop)', () => {
		const r = circle()
		const pos = getPositions(r.nodes)
		expect(pos[0][0]).toBeCloseTo(pos[4][0])
		expect(pos[0][1]).toBeCloseTo(pos[4][1])
		expect(pos[0][2]).toBeCloseTo(pos[4][2])
	})

	it('custom radius', () => {
		const r = circle({ radius: 3 })
		const pos = getPositions(r.nodes)
		// first point at angle 0 → x=3
		expect(pos[0][0]).toBeCloseTo(3)
		expect(pos[0][2]).toBeCloseTo(0)
	})

	it('custom point count', () => {
		const r = circle({ points: 6 })
		expect(r.nodes).toHaveLength(7) // 6 + close
	})

	it('min 3 points', () => {
		const r = circle({ points: 1 })
		expect(r.nodes).toHaveLength(4) // 3 + close
	})

	it('position offset', () => {
		const r = circle({ pos: { x: 5, y: 2, z: -1 }, radius: 1 })
		const pos = getPositions(r.nodes)
		// first point: cos(0)*1+5=6, 0+2=2, sin(0)*1-1=-1
		expect(pos[0][0]).toBeCloseTo(6)
		expect(pos[0][1]).toBeCloseTo(2)
		expect(pos[0][2]).toBeCloseTo(-1)
	})

	it('custom id', () => {
		expect(circle({ id: 'ring' }).id).toBe('ring')
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
		{ p: [3, 0, -2] },
	]

	it('matches original fixture with equivalent params', () => {
		const r = roundedRect({ pos: { x: 3.5, z: -0.5 }, width: 3, height: 3, cornerRadius: 1 })
		const pos = getPositions(r.nodes)
		const fixturePos = fixture.map(f => f.p)
		expect(pos).toHaveLength(fixturePos.length)
		for (let i = 0; i < pos.length; i++) {
			expect(pos[i][0]).toBeCloseTo(fixturePos[i][0])
			expect(pos[i][1]).toBeCloseTo(fixturePos[i][1])
			expect(pos[i][2]).toBeCloseTo(fixturePos[i][2])
		}
	})

	it('rounding matches fixture: even=plain, odd=from', () => {
		const r = roundedRect()
		for (let i = 0; i < 8; i++) {
			const n = r.nodes[i]
			if (i % 2 === 0) {
				expect(isVec3(n as any)).toBe(true)
			} else {
				expect(isPointFull(n as any)).toBe(true)
				expect((n as RailPointFull).round).toBe('from')
			}
		}
	})

	it('9 nodes (8 + close), closed loop', () => {
		const r = roundedRect()
		expect(r.nodes).toHaveLength(9)
		const pos = getPositions(r.nodes)
		expect(pos[0]).toEqual(pos[8])
	})

	it('position offset applied to all points', () => {
		const r = roundedRect({ pos: { x: 10 } })
		const pos = getPositions(r.nodes)
		for (const p of pos) {
			expect(p[0]).toBeGreaterThanOrEqual(10 - 1.5 - 0.01) // hw=1.5
		}
	})

	it('custom dimensions', () => {
		const r = roundedRect({ width: 6, height: 4 })
		const pos = getPositions(r.nodes)
		const xs = pos.map(p => p[0])
		const zs = pos.map(p => p[2])
		expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(6)
		expect(Math.max(...zs) - Math.min(...zs)).toBeLessThanOrEqual(4)
	})

	it('cornerRadius clamped to half shorter side', () => {
		const r = roundedRect({ width: 2, height: 4, cornerRadius: 100 })
		const pos = getPositions(r.nodes)
		const xs = pos.map(p => p[0])
		// cr clamped to hw=1, so all x between -1 and 1
		expect(Math.max(...xs)).toBeCloseTo(1)
		expect(Math.min(...xs)).toBeCloseTo(-1)
	})
})

describe('coil', () => {
	it('defaults: lead-in + coil points + lead-out', () => {
		const r = coil()
		expect(r.id).toBe('coil')
		// 2*4+1 = 9 coil points + 2 leads = 11
		expect(r.nodes).toHaveLength(11)
	})

	it('first and last nodes are plain Vec3 (leads)', () => {
		const r = coil()
		expect(isVec3(r.nodes[0] as any)).toBe(true)
		expect(isVec3(r.nodes[r.nodes.length - 1] as any)).toBe(true)
	})

	it('inner points have correct rounding', () => {
		const r = coil()
		const inner = r.nodes.slice(1, -1) as RailPointFull[]
		expect(inner[0].round).toBe('from')
		expect(inner[inner.length - 1].round).toBe('to')
		for (let i = 1; i < inner.length - 1; i++) {
			expect(inner[i].round).toBe('both')
		}
	})

	it('height distributes across coil points', () => {
		const r = coil({ height: 4 })
		const inner = r.nodes.slice(1, -1) as RailPointFull[]
		expect(inner[0].p[1]).toBeCloseTo(0)
		expect(inner[inner.length - 1].p[1]).toBeCloseTo(4)
	})

	it('custom rounds and density', () => {
		const r = coil({ rounds: 3, density: 6 })
		// 3*6+1 = 19 coil points + 2 leads = 21
		expect(r.nodes).toHaveLength(21)
	})

	it('position offset', () => {
		const r = coil({ pos: { x: 10, y: 5 } })
		const inner = r.nodes.slice(1, -1) as RailPointFull[]
		// first coil point at angle 0: x = cos(0)*1 + 10 = 11
		expect(inner[0].p[0]).toBeCloseTo(11)
		expect(inner[0].p[1]).toBeCloseTo(5)
	})
})

describe('spiral', () => {
	it('defaults: lead-in + spiral points + lead-out', () => {
		const r = spiral()
		expect(r.id).toBe('spiral')
		// 2*4+1 = 9 spiral points + 2 leads = 11
		expect(r.nodes).toHaveLength(11)
	})

	it('radius increases with each revolution', () => {
		const r = spiral({ startRadius: 0.5, radiusStep: 0.5, density: 4, rounds: 2 })
		const inner = r.nodes.slice(1, -1) as RailPointFull[]
		// points at angle 0 (i=0 and i=4) should have increasing distance from center
		const dist0 = Math.sqrt(inner[0].p[0] ** 2 + inner[0].p[2] ** 2)
		const dist4 = Math.sqrt(inner[4].p[0] ** 2 + inner[4].p[2] ** 2)
		expect(dist4).toBeGreaterThan(dist0)
	})

	it('inner points have correct rounding', () => {
		const r = spiral()
		const inner = r.nodes.slice(1, -1) as RailPointFull[]
		expect(inner[0].round).toBe('from')
		expect(inner[inner.length - 1].round).toBe('to')
		for (let i = 1; i < inner.length - 1; i++) {
			expect(inner[i].round).toBe('both')
		}
	})

	it('position offset', () => {
		const r = spiral({ pos: { y: 3 } })
		const inner = r.nodes.slice(1, -1) as RailPointFull[]
		expect(inner[0].p[1]).toBeCloseTo(3)
	})

	it('custom id', () => {
		expect(spiral({ id: 'vortex' }).id).toBe('vortex')
	})
})
