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

	it('startPos offset', () => {
		const result = expandPathString('r', [5, 0, 0])
		expect(result).toEqual([[6, 0, 0]])
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
