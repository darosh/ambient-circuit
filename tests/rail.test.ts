import { describe, it, expect } from 'vitest'
import type { Rail } from '../src/lib/rail'
import { resolveRail, validateNoDuplicateMidPathPositions } from '../src/lib/rail-resolve'

describe('resolveRail', () => {
	it('straight rail: auto-increments beats from 0', () => {
		const rail: Rail = {
			id: 'kick',
			nodes: [
				[0, 0, 0],
				[1, 0, 0],
				[2, 0, 0],
				[3, 0, 0]
			]
		}
		const r = resolveRail(rail)
		expect(r.id).toBe('kick')
		expect(r.beatOffset).toBe(0)
		expect(r.reverse).toBe(false)
		expect(r.points).toHaveLength(4)
		expect(r.points.map((p) => p.beat)).toEqual([0, 1, 2, 3])
		expect(r.points.every((p) => p.round === null)).toBe(true)
	})

	it('beatOffset shifts all beats', () => {
		const rail: Rail = {
			id: 'off',
			beatOffset: 4,
			nodes: [
				[0, 0, 0],
				[1, 0, 0]
			]
		}
		const r = resolveRail(rail)
		expect(r.beatOffset).toBe(4)
		expect(r.points.map((p) => p.beat)).toEqual([4, 5])
	})

	it('reverse flag preserved', () => {
		const rail: Rail = {
			id: 'rev',
			reverse: true,
			nodes: [[0, 0, 0]]
		}
		expect(resolveRail(rail).reverse).toBe(true)
	})

	it('rounding preserved', () => {
		const rail: Rail = {
			id: 'mel',
			nodes: [
				[0, 0, 0],
				{ p: [1, 0, 0], round: 'to' },
				{ p: [2, 0, 0], round: 'from' },
				{ p: [3, 0, 0], round: 'both' },
				[4, 0, 0]
			]
		}
		const r = resolveRail(rail)
		expect(r.points[0].round).toBe(null)
		expect(r.points[1].round).toBe('to')
		expect(r.points[2].round).toBe('from')
		expect(r.points[3].round).toBe('both')
		expect(r.points[4].round).toBe(null)
	})

	it('explicit beat override', () => {
		const rail: Rail = {
			id: 'jump',
			nodes: [[0, 0, 0], { p: [1, 0, 0], beat: 4 }, [2, 0, 0]]
		}
		const r = resolveRail(rail)
		expect(r.points.map((p) => p.beat)).toEqual([0, 4, 5])
	})

	it('split: resolves branches with correct beats', () => {
		const rail: Rail = {
			id: 'fork',
			nodes: [
				[0, 0, 0],
				{
					split: {
						p: [1, 0, 0],
						weights: [2, 4],
						branches: [
							[
								[2, 1, 0],
								[3, 1, 0]
							],
							[
								[2, -1, 0],
								[3, -1, 0]
							]
						]
					}
				},
				[4, 0, 0]
			]
		}
		const r = resolveRail(rail)

		expect(r.points).toHaveLength(3)
		expect(r.points.map((p) => p.beat)).toEqual([0, 1, 2])

		expect(r.splits).toHaveLength(1)
		const s = r.splits[0]
		expect(s.beat).toBe(1)
		expect(s.weights).toEqual([2, 4])
		expect(s.branches).toHaveLength(2)

		expect(s.branches[0].points.map((p) => p.beat)).toEqual([2, 3])
		expect(s.branches[1].points.map((p) => p.beat)).toEqual([2, 3])
	})

	it('split: can be first element now', () => {
		const rail: Rail = {
			id: 'split-first',
			nodes: [
				{
					split: {
						p: [0, 0, 0],
						weights: [1, 1],
						branches: [[[1, 0, 0]], [[1, 1, 0]]]
					}
				}
			]
		}
		const r = resolveRail(rail)
		expect(r.points).toHaveLength(1)
		expect(r.splits).toHaveLength(1)
	})

	it('nested splits', () => {
		const rail: Rail = {
			id: 'nested',
			nodes: [
				[0, 0, 0],
				{
					split: {
						p: [1, 0, 0],
						weights: [1, 1],
						branches: [
							[
								{ p: [1, 1, 0], beat: 2 },
								{
									split: {
										p: [2, 1, 0],
										weights: [1, 2],
										branches: [[[2, 2, 0]], [[2, 0, 0]]]
									}
								},
								[3, 1, 0]
							],
							[
								[1, -1, 0],
								[2, -1, 0]
							]
						]
					}
				},
				[4, 0, 0]
			]
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
			nodes: [[1.5, -2.3, 0.7], { p: [3.14, 0, -1], round: 'both' }]
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

	it('resolves eight (validation detects mid-path duplicate)', () => {
		const rail: Rail = {
			id: 'eight',
			nodes: [[0, 0, 0], 'ir or ol il il ol or ir']
		}

		const r = resolveRail(rail)
		expect(r.points).toHaveLength(9)

		// Validation function (for testing only) detects duplicate
		expect(() => validateNoDuplicateMidPathPositions(r.points, rail.id)).toThrow(
			/duplicate positions in the middle of a path/i
		)
		expect(() => validateNoDuplicateMidPathPositions(r.points, rail.id)).toThrow(/beat 4/)
	})

	it('resolves eight-no-cross', () => {
		const rail: Rail = {
			id: 'eight-ext',
			nodes: [[0, 0, -3], 'ir or ol ilu0.01 il ol or ird0.01 ']
		}

		const r = resolveRail(rail)

		expect(r.points).toHaveLength(9)
		expect(r.splits).toHaveLength(0)
	})

	it('validation detects duplicate mid-path positions', () => {
		const rail: Rail = {
			id: 'duplicate-test',
			nodes: [
				[0, 0, 0],
				[1, 0, 0],
				[2, 0, 0],
				[1, 0, 0],
				[3, 0, 0]
			]
		}

		const r = resolveRail(rail)
		expect(() => validateNoDuplicateMidPathPositions(r.points, rail.id)).toThrow(
			/duplicate positions in the middle of a path/i
		)
		expect(() => validateNoDuplicateMidPathPositions(r.points, rail.id)).toThrow(
			/beat (1|3).*beat (1|3)/i
		)
	})

	it('validation allows closed loop with first == last', () => {
		const rail: Rail = {
			id: 'closed-loop',
			nodes: [
				[0, 0, 0],
				[1, 0, 0],
				[1, 1, 0],
				[0, 1, 0],
				[0, 0, 0]
			]
		}

		const r = resolveRail(rail)
		expect(() => validateNoDuplicateMidPathPositions(r.points, rail.id)).not.toThrow()
	})
})
