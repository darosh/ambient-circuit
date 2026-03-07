import { describe, it, expect } from 'vitest'
import { expandPathString, railToString } from '../src/lib/core/rail-path'
import { resolveRail } from '../src/lib/core/rail-resolve'
import { roundedRect } from '../src/lib/core/rail-primitives'
import { RailShapeConfig } from '../src/lib/core/rail'

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

	it('leading decimal multiplier', () => {
		const result = expandPathString('l.4')
		expect(result).toEqual([[-0.4, 0, 0]])
	})

	it('leading decimal tangent suffix', () => {
		const result = expandPathString('lb.8')
		expect(result).toEqual([{ p: [-1, 0, 0], round: 'both', tangent: 0.8 }])
	})

	it('leading decimal in complex token', () => {
		const result = expandPathString('l.4u.8')
		expect(result).toEqual([[-0.4, 0.8, 0]])
	})

	it('standalone number sets beat on previous Vec3 point', () => {
		const result = expandPathString('llll 10 llll 11')
		expect(result).toEqual([
			{ p: [-4, 0, 0], beat: 10 },
			{ p: [-8, 0, 0], beat: 11 }
		])
	})

	it('standalone number sets beat on previous RailPointFull', () => {
		const result = expandPathString('lb 10')
		expect(result).toEqual([{ p: [-1, 0, 0], round: 'both', beat: 10 }])
	})

	it('standalone number with no previous point is ignored', () => {
		const result = expandPathString('10 r')
		expect(result).toEqual([[1, 0, 0]])
	})

	it('standalone float beat', () => {
		const result = expandPathString('r 7.5 u')
		expect(result).toEqual([{ p: [1, 0, 0], beat: 7.5 }, [1, 1, 0]])
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

describe('railToString', () => {
	function roundtrip(str: string, startPos?: [number, number, number]) {
		const points = expandPathString(str, startPos)
		const back = railToString(points, startPos)
		return expandPathString(back, startPos)
	}

	it('basic directions roundtrip', () => {
		expect(roundtrip('r u i')).toEqual(expandPathString('r u i'))
	})

	it('multipliers roundtrip', () => {
		expect(roundtrip('l3u2')).toEqual(expandPathString('l3u2'))
	})

	it('rounding suffix roundtrip', () => {
		expect(roundtrip('l i ib u i lb i')).toEqual(expandPathString('l i ib u i lb i'))
	})

	it('rounding + tangent roundtrip', () => {
		expect(roundtrip('l i ib1 u i lb0.2 i')).toEqual(expandPathString('l i ib1 u i lb0.2 i'))
	})

	it('beat annotation roundtrip', () => {
		expect(roundtrip('llll 10 llll 11')).toEqual(expandPathString('llll 10 llll 11'))
	})

	it('beat on RailPointFull roundtrip', () => {
		expect(roundtrip('lb 10')).toEqual(expandPathString('lb 10'))
	})

	it('float beat roundtrip', () => {
		expect(roundtrip('r 7.5 u')).toEqual(expandPathString('r 7.5 u'))
	})

	it('float multiplier roundtrip', () => {
		expect(roundtrip('l0.1')).toEqual(expandPathString('l0.1'))
	})

	it('startPos offset roundtrip', () => {
		expect(roundtrip('r u i', [5, 3, -2])).toEqual(expandPathString('r u i', [5, 3, -2]))
	})

	it('complex token roundtrip', () => {
		expect(roundtrip('r2u3l ilt0.5')).toEqual(expandPathString('r2u3l ilt0.5'))
	})

	it('all axes roundtrip', () => {
		expect(roundtrip('r l u d i o')).toEqual(expandPathString('r l u d i o'))
	})

	it('negative delta roundtrip', () => {
		expect(roundtrip('r3 l5 u2 d4')).toEqual(expandPathString('r3 l5 u2 d4'))
	})

	it('mixed axes in single token roundtrip', () => {
		expect(roundtrip('r2u3i4')).toEqual(expandPathString('r2u3i4'))
	})

	it('rounding + beat roundtrip', () => {
		expect(roundtrip('rt 4 u lb 8')).toEqual(expandPathString('rt 4 u lb 8'))
	})

	it('direct: Vec3 array', () => {
		const points = expandPathString('r u i')
		const str = railToString(points)
		expect(str).toBe('r u i')
	})

	it('direct: multipliers', () => {
		const points = expandPathString('l3u2')
		const str = railToString(points)
		expect(str).toBe('l3u2')
	})

	it('direct: rounding both', () => {
		const points = expandPathString('ib')
		const str = railToString(points)
		expect(str).toBe('ib')
	})

	it('direct: rounding to + tangent', () => {
		// axis order may differ; roundtrip must match
		expect(roundtrip('ilt0.5')).toEqual(expandPathString('ilt0.5'))
	})

	it('direct: beat on plain point', () => {
		const points = expandPathString('r 7.5 u')
		const str = railToString(points)
		expect(str).toBe('r 7.5 u')
	})

	it('curve mode beat roundtrip', () => {
		const points = expandPathString('r 8c u')
		const str = railToString(points)
		expect(str).toBe('r 8c u')
	})
})

describe('beat interpolation mode', () => {
	it('expandPathString: c suffix sets mode curve', () => {
		const pts = expandPathString('r u 8c l')
		expect(pts[1]).toMatchObject({ beat: 8, mode: 'curve' })
	})

	it('expandPathString: plain number has no mode', () => {
		const pts = expandPathString('r u 8 l')
		expect((pts[1] as { mode?: string }).mode).toBeUndefined()
	})

	it('points mode: uniform beat distribution', () => {
		// roundedRect has 9 points (indices 0-8); single anchor at index 8 beat 8
		const rail = <RailShapeConfig>{ id: 'r', nodes: [railToString(roundedRect()) + ' 8'] }
		const res = resolveRail(rail)
		for (let i = 0; i < res.points.length; i++) expect(res.points[i].beat).toBeCloseTo(i)
	})

	it('curve mode: arc-length beat distribution', () => {
		const rail = <RailShapeConfig>{ id: 'r', nodes: [railToString(roundedRect()) + ' 8c'] }
		const res = resolveRail(rail)
		// roundedRect corners are shorter than straight sides, so corner points
		// (odd indices, round:'from') should get beats less than their index
		for (let i = 1; i < res.points.length - 1; i += 2) {
			expect(res.points[i].beat).toBeLessThan(i)
		}
		// straight-side midpoints (even indices 2,4,6) land at their index (symmetric rect)
		expect(res.points[0].beat).toBeCloseTo(0)
		expect(res.points[2].beat).toBeCloseTo(2)
		expect(res.points[4].beat).toBeCloseTo(4)
		expect(res.points[6].beat).toBeCloseTo(6)
		expect(res.points[8].beat).toBeCloseTo(8)
	})

	it('curve mode: beats differ from points mode', () => {
		const railP = <RailShapeConfig>{ id: 'p', nodes: [railToString(roundedRect()) + ' 8'] }
		const railC = <RailShapeConfig>{ id: 'c', nodes: [railToString(roundedRect()) + ' 8c'] }
		const resP = resolveRail(railP)
		const resC = resolveRail(railC)
		// at least one intermediate point must differ
		const differs = resP.points.some((pt, i) => Math.abs(pt.beat - resC.points[i].beat) > 0.01)
		expect(differs).toBe(true)
	})
})
