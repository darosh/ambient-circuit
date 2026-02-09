import { describe, it, expect } from 'vitest'
import { expandPathString } from '../src/lib/rail-path'

describe('expandPathString', () => {
	it('emits points for direction chars', () => {
		const result = expandPathString('r u i')
		expect(result).toEqual([
			[1, 0, 0],
			[1, 1, 0],
			[1, 1, -1]
		])
	})

	it('mixed chars still emit per-char', () => {
		const result = expandPathString('ru')
		expect(result).toEqual([
			[1, 0, 0],
			[1, 1, 0]
		])
	})

	it('repeated chars collapse to one point', () => {
		const result = expandPathString('lll')
		expect(result).toEqual([[-3, 0, 0]])
	})

	it('rounding char converts last point', () => {
		const result = expandPathString('r t u')
		expect(result).toEqual([{ p: [1, 0, 0], round: 'to' }, [1, 1, 0]])
	})

	it('rounding on existing RailPointFull', () => {
		const result = expandPathString('r t b')
		expect(result).toEqual([{ p: [1, 0, 0], round: 'both' }])
	})

	it('full word tokens', () => {
		const result = expandPathString('right up')
		expect(result).toEqual([
			[1, 0, 0],
			[1, 1, 0]
		])
	})

	it('mixed full-word and char', () => {
		const result = expandPathString('right u')
		expect(result).toEqual([
			[1, 0, 0],
			[1, 1, 0]
		])
	})

	it('numeric multiplier emits one point', () => {
		const result = expandPathString('l3')
		expect(result).toEqual([[-3, 0, 0]])
	})

	it('float multiplier emits one point', () => {
		const result = expandPathString('l0.1')
		expect(result).toEqual([[-0.1, 0, 0]])
	})

	it('startPos offset', () => {
		const result = expandPathString('r', [5, 0, 0])
		expect(result).toEqual([[6, 0, 0]])
	})

	it('compound dir+round tokens', () => {
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

	it('compound dir+round tokens with tangents', () => {
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

	it('collapsed repeats produce plain Vec3', () => {
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
