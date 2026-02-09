import { describe, it, expect } from 'vitest'
import { expandPathString } from '../src/lib/rail-path'

describe('expandPathString', () => {
	it('space-delimited tokens emit points', () => {
		const result = expandPathString('r u i')
		expect(result).toEqual([
			[1, 0, 0],
			[1, 1, 0],
			[1, 1, -1]
		])
	})

	it('mixed chars in single token emit one point', () => {
		const result = expandPathString('ru')
		expect(result).toEqual([[1, 1, 0]])
	})

	it('repeated chars in single token emit one point', () => {
		const result = expandPathString('lll')
		expect(result).toEqual([[-3, 0, 0]])
	})

	it('rounding suffix on single token', () => {
		const result = expandPathString('rt u')
		expect(result).toEqual([{ p: [1, 0, 0], round: 'to' }, [1, 1, 0]])
	})

	it('rounding suffix overrides on same token', () => {
		const result = expandPathString('rb')
		expect(result).toEqual([{ p: [1, 0, 0], round: 'both' }])
	})

	it('numeric multiplier in single token', () => {
		const result = expandPathString('l3')
		expect(result).toEqual([[-3, 0, 0]])
	})

	it('multiple numeric multipliers in single token', () => {
		const result = expandPathString('l3u2')
		expect(result).toEqual([[-3, 2, 0]])
	})

	it('mixed: chars and multipliers in single token', () => {
		const result = expandPathString('rl3u2i')
		expect(result).toEqual([[-2, 2, -1]])
	})

	it('float multiplier emits one point', () => {
		const result = expandPathString('l0.1')
		expect(result).toEqual([[-0.1, 0, 0]])
	})

	it('startPos offset', () => {
		const result = expandPathString('r', [5, 0, 0])
		expect(result).toEqual([[6, 0, 0]])
	})

	it('tokens with rounding suffix', () => {
		const result = expandPathString('l i ib u i lb i')
		expect(result).toEqual([
			[-1, 0, 0],
			[-1, 0, -1],
			{ p: [-1, 0, -2], round: 'both' },
			[-1, 1, -2],
			[-1, 1, -3],
			{ p: [-2, 1, -3], round: 'both' },
			[-2, 1, -4]
		])
	})

	it('tokens with rounding and tangent suffix', () => {
		const result = expandPathString('l i ib1 u i lb0.2 i')
		expect(result).toEqual([
			[-1, 0, 0],
			[-1, 0, -1],
			{ p: [-1, 0, -2], round: 'both', tangent: 1 },
			[-1, 1, -2],
			[-1, 1, -3],
			{ p: [-2, 1, -3], round: 'both', tangent: 0.2 },
			[-2, 1, -4]
		])
	})

	it('complex mixed token', () => {
		const result = expandPathString('r2u3l ilt0.5')
		expect(result).toEqual([[1, 3, 0], { p: [0, 3, -1], round: 'to', tangent: 0.5 }])
	})

	it('each space-delimited token emits one Vec3', () => {
		const result = expandPathString('rrrr ddd ll oooo uu')
		expect(result).toEqual([
			[4, 0, 0],
			[4, -3, 0],
			[2, -3, 0],
			[2, -3, 4],
			[2, -1, 4]
		])
		for (const pt of result) {
			expect(Array.isArray(pt)).toBe(true)
		}
	})

	it('all directions', () => {
		const result = expandPathString('r l u d i o')
		expect(result).toEqual([
			[1, 0, 0],
			[0, 0, 0],
			[0, 1, 0],
			[0, 0, 0],
			[0, 0, -1],
			[0, 0, 0]
		])
	})
})
