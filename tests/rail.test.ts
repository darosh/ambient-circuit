import { describe, it, expect } from 'vitest'
import type { Rail } from '../src/lib/rail'
import { resolveRail } from '../src/lib/rail-resolve'

describe('resolveRail', () => {
	it('straight rail: auto-increments beats from 0', () => {
		const rail: Rail = {
			id: 'kick',
			nodes: [
				[0, 0, 0],
				[1, 0, 0],
				[2, 0, 0],
				[3, 0, 0],
			],
		}
		const r = resolveRail(rail)
		expect(r.id).toBe('kick')
		expect(r.beatOffset).toBe(0)
		expect(r.reverse).toBe(false)
		expect(r.points).toHaveLength(4)
		expect(r.points.map((p) => p.beat)).toEqual([0, 1, 2, 3])
		expect(r.points.every((p) => p.conn === 'straight')).toBe(true)
	})

	it('beatOffset shifts all beats', () => {
		const rail: Rail = {
			id: 'off',
			beatOffset: 4,
			nodes: [
				[0, 0, 0],
				[1, 0, 0],
			],
		}
		const r = resolveRail(rail)
		expect(r.beatOffset).toBe(4)
		expect(r.points.map((p) => p.beat)).toEqual([4, 5])
	})

	it('reverse flag preserved', () => {
		const rail: Rail = {
			id: 'rev',
			reverse: true,
			nodes: [[0, 0, 0]],
		}
		expect(resolveRail(rail).reverse).toBe(true)
	})

	it('rounded corner preserved', () => {
		const rail: Rail = {
			id: 'mel',
			nodes: [[0, 0, 0], [2, 0, 0], { p: [4, 0, 0], conn: 'rounded' }, [4, 2, 0]],
		}
		const r = resolveRail(rail)
		expect(r.points[2].conn).toBe('rounded')
		expect(r.points[2].p).toEqual([4, 0, 0])
		expect(r.points[0].conn).toBe('straight')
	})

	it('explicit beat override', () => {
		const rail: Rail = {
			id: 'jump',
			nodes: [
				[0, 0, 0],
				{ p: [1, 0, 0], beat: 4 },
				[2, 0, 0],
			],
		}
		const r = resolveRail(rail)
		expect(r.points.map((p) => p.beat)).toEqual([0, 4, 5])
	})

	it('split: resolves branches with correct beats', () => {
		const rail: Rail = {
			id: 'fork',
			nodes: [
				[0, 0, 0],
				[1, 0, 0],
				{
					split: {
						weights: [2, 4],
						branches: [
							[
								[2, 1, 0],
								[3, 1, 0],
							],
							[
								[2, -1, 0],
								[3, -1, 0],
							],
						],
					},
				},
				[4, 0, 0],
			],
		}
		const r = resolveRail(rail)

		// main points: before split + after split
		expect(r.points).toHaveLength(3)
		expect(r.points.map((p) => p.beat)).toEqual([0, 1, 2])

		// split
		expect(r.splits).toHaveLength(1)
		const s = r.splits[0]
		expect(s.beat).toBe(1)
		expect(s.weights).toEqual([2, 4])
		expect(s.branches).toHaveLength(2)

		// branch beats start at splitBeat + 1 = 2
		expect(s.branches[0].points.map((p) => p.beat)).toEqual([2, 3])
		expect(s.branches[1].points.map((p) => p.beat)).toEqual([2, 3])
	})

	it('split: throws if first element', () => {
		const rail: Rail = {
			id: 'bad',
			nodes: [
				{
					split: {
						weights: [1, 1],
						branches: [[[0, 0, 0]], [[1, 0, 0]]],
					},
				},
			],
		}
		expect(() => resolveRail(rail)).toThrow('Split cannot be first element')
	})

	it('nested splits', () => {
		const rail: Rail = {
			id: 'nested',
			nodes: [
				[0, 0, 0],
				{
					split: {
						weights: [1, 1],
						branches: [
							[
								[1, 1, 0],
								{
									split: {
										weights: [1, 2],
										branches: [[[2, 2, 0]], [[2, 0, 0]]],
									},
								},
								[3, 1, 0],
							],
							[[1, -1, 0], [2, -1, 0]],
						],
					},
				},
				[4, 0, 0],
			],
		}
		const r = resolveRail(rail)
		const outerSplit = r.splits[0]
		expect(outerSplit.branches).toHaveLength(2)

		const innerSplit = outerSplit.branches[0].splits[0]
		expect(innerSplit.weights).toEqual([1, 2])
		expect(innerSplit.branches).toHaveLength(2)
	})

	it('positions preserved exactly', () => {
		const rail: Rail = {
			id: 'pos',
			nodes: [
				[1.5, -2.3, 0.7],
				{ p: [3.14, 0, -1], conn: 'rounded' },
			],
		}
		const r = resolveRail(rail)
		expect(r.points[0].p).toEqual([1.5, -2.3, 0.7])
		expect(r.points[1].p).toEqual([3.14, 0, -1])
	})

	it('empty rail', () => {
		const rail: Rail = { id: 'empty', nodes: [] }
		const r = resolveRail(rail)
		expect(r.points).toHaveLength(0)
		expect(r.splits).toHaveLength(0)
	})
})
