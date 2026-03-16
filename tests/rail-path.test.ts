import { describe, it, expect } from 'vitest'
import { expandPathString, railToString } from '../src/lib/core/rail-path'
import { resolveRail } from '../src/lib/core/rail-resolve'
import { roundedRect } from '../src/lib/core/rail-primitives'
import {
	type RailPointFull,
	RailShapeConfig,
	type RailSplit,
	type Vec3
} from '../src/lib/core/rail'
import { svgRailMulti } from '../src/lib/core/rail-svg'
import { createMarbleInstance } from '../src/lib/core/marble'
import { updateMarble } from '../src/lib/core/marble-system'
import { createTempoState } from '../src/lib/core/tempo'

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

describe('SPLIT nodes', () => {
	it('expandPathString: inline SPLIT at current position', () => {
		const nodes = expandPathString('r d2[\1](r | l)')
		expect(nodes.length).toBe(2)
		expect(Array.isArray(nodes[0])).toBe(true)
		expect(nodes[0]).toEqual([1, 0, 0])
		const s = nodes[1] as { split: { p: number[]; weights: number[]; branches: unknown[][] } }
		expect(s.split.p).toEqual([1, -2, 0])
		expect(s.split.weights).toEqual([1, 1])
		expect(s.split.branches).toHaveLength(2)
		expect(s.split.branches[0]).toEqual([[2, -2, 0]])
		expect(s.split.branches[1]).toEqual([[0, -2, 0]])
	})

	it('expandPathString: SPLIT at same position (no direction prefix)', () => {
		const nodes = expandPathString('r2 [\1](u | d)')
		expect(nodes.length).toBe(2)
		expect(nodes[0]).toEqual([2, 0, 0])
		const s = nodes[1] as { split: { p: number[] } }
		expect(s.split.p).toEqual([2, 0, 0])
	})

	it('railToString: RailSplit node produces SPLIT token', () => {
		const nodes = expandPathString('r d2[\1](r | l)')
		const str = railToString(nodes)
		expect(str).toContain('[\1]')
		expect(str).toContain(' | ')
	})

	it('round-trip: SPLIT serializes and re-parses correctly', () => {
		const original = 'r d2[\1](r | l d)'
		const nodes = expandPathString(original)
		const serialized = railToString(nodes)
		const nodes2 = expandPathString(serialized)
		expect(nodes2).toEqual(nodes)
	})

	it('round-trip: nested SPLIT', () => {
		const original = 'r2[\1](d2[\1](r | l) | u2)'
		const nodes = expandPathString(original)
		const serialized = railToString(nodes)
		const nodes2 = expandPathString(serialized)
		expect(nodes2).toEqual(nodes)
	})

	it('round-trip: SPLIT with empty branches preserves branch count', () => {
		const original = 'r[\1](u |  | d)'
		const nodes = expandPathString(original)
		const serialized = railToString(nodes)
		const nodes2 = expandPathString(serialized)
		const s = nodes2.at(-1) as { split: { weights: number[]; branches: unknown[] } }
		expect(s.split.branches).toHaveLength(3)
		expect(s.split.weights).toHaveLength(3)
	})

	it('round-trip: svg', () => {
		const original =
			'M 57.5,10 V 30 M 50,10 v 40 m -7.5,-40 5e-6,59.49382 M 80,10 72.5,20 M 65,10 72.5,20 m 0,0 v 10 m 0,0 L 65,40 M 57.5,30 65,40 m 0,0 v 10 m 0,0 -7.5,10 M 50,50 57.5,60 m 0,0 v 10 m 0,0 L 50,80 M 42.5,70 50,80 m 0,0 v 10'
		const nodes = svgRailMulti(original)[0]
		const serialized = railToString(<Array<Vec3 | RailPointFull | RailSplit>>nodes)
		const resolved = expandPathString(serialized)
		expect(nodes).toEqual(resolved)
	})
})

describe('nested SPLIT resolution', () => {
	it('resolves nested splits with correct beat numbering', () => {
		// r d2 = two points (beat 0, beat 1), then SPLIT at beat 2
		const nodes = expandPathString('r d2 d2[\1](d2[\1](r | l) | u2)')
		const rail = <RailShapeConfig>{ id: 'nested', nodes }
		const res = resolveRail(rail)

		expect(res.splits.length).toBe(1)
		expect(res.splits[0].beat).toBe(2)
		expect(res.splits[0].branches.length).toBe(2)

		// First branch has a nested split
		const branch0 = res.splits[0].branches[0]
		expect(branch0.splits.length).toBe(1)
		expect(branch0.splits[0].branches.length).toBe(2)

		// Second branch has no nested splits
		const branch1 = res.splits[0].branches[1]
		expect(branch1.splits.length).toBe(0)
		expect(branch1.points.length).toBeGreaterThan(0)
	})

	// Structure:
	//   beat 0 → beat 1 → [\1]
	//                        ├─ branch0: d2(beat 3) → [\1]
	//                        │                          ├─ r2 (beat 5)
	//                        │                          └─ l2 (beat 5)
	//                        └─ branch1: u2(beat 3)
	const nestedRailDef = () => {
		const nodes = expandPathString('r d2 d2[\1](d2[\1](r2 | l2) | u2)')
		return resolveRail(<RailShapeConfig>{ id: 'nested', nodes })
	}

	it('resolved structure has expected beats', () => {
		const res = nestedRailDef()
		// Main trunk: 3 points (beat 0, 1, 2) — split point included
		const mainBeats = res.points.map((p) => p.beat)
		expect(mainBeats).toEqual([0, 1, 2])

		// Top split at beat 2
		expect(res.splits[0].beat).toBe(2)

		// Branch 0: has points and a nested split
		const b0 = res.splits[0].branches[0]
		const b0Beats = b0.points.map((p) => p.beat)
		// branch0: d2 point at beat 3, nested split at beat 3 (same pos)
		expect(b0Beats).toEqual([3])
		expect(b0.splits.length).toBe(1)
		expect(b0.splits[0].beat).toBe(3)

		// Nested branch leaves at beat 4
		const leaf0 = b0.splits[0].branches[0]
		const leaf1 = b0.splits[0].branches[1]
		expect(leaf0.points.map((p) => p.beat)).toEqual([4])
		expect(leaf1.points.map((p) => p.beat)).toEqual([4])

		// Branch 1: u2, no nested splits
		const b1 = res.splits[0].branches[1]
		expect(b1.points.map((p) => p.beat)).toEqual([3])
		expect(b1.splits.length).toBe(0)
	})

	it('marble on trunk returns main points only', () => {
		const res = nestedRailDef()
		const marble = createMarbleInstance({
			resolvedRail: res,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		// At beat 0.5 — on trunk before split
		tempo.currentBeat = 0
		tempo.beatProgress = 0.5
		updateMarble(marble, tempo)
		expect(marble.branchPath).toEqual([])
	})

	it('marble enters first branch and has correct position', () => {
		const res = nestedRailDef()
		const marble = createMarbleInstance({
			resolvedRail: res,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		// Step to beat 1 first (stay on trunk)
		tempo.currentBeat = 1
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		expect(marble.branchPath).toEqual([])

		// Step to beat 2.5 — past first split at beat 2, on branch0
		tempo.currentBeat = 2
		tempo.beatProgress = 0.5
		updateMarble(marble, tempo)
		expect(marble.branchPath[0]).toBe(0)
		// Branch0 goes d2 — marble should be moving downward
		expect(marble.position.y).toBeLessThan(0)
	})

	it('marble enters nested split and position stays on geometry', () => {
		const res = nestedRailDef()
		const marble = createMarbleInstance({
			resolvedRail: res,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		// Step incrementally
		tempo.currentBeat = 1
		tempo.beatProgress = 0
		updateMarble(marble, tempo)

		tempo.currentBeat = 2
		tempo.beatProgress = 0
		updateMarble(marble, tempo)

		// At beat 2, marble enters branch0 (past split at beat 2)
		expect(marble.branchPath.length).toBeGreaterThanOrEqual(1)

		tempo.currentBeat = 3
		tempo.beatProgress = 0
		updateMarble(marble, tempo)

		// At beat 3, marble is at branch0's point AND nested split (beat 3)
		// Should have entered nested split too
		expect(marble.branchPath.length).toBe(2)
		const posAtBeat3 = { x: marble.position.x, y: marble.position.y, z: marble.position.z }

		// Step to beat 3.5 — midway through leaf branch
		tempo.currentBeat = 3
		tempo.beatProgress = 0.5
		updateMarble(marble, tempo)

		const posAtBeat3_5 = { x: marble.position.x, y: marble.position.y, z: marble.position.z }

		// Position should be nearby (on the leaf branch, not empty space)
		const dx = posAtBeat3_5.x - posAtBeat3.x
		const dy = posAtBeat3_5.y - posAtBeat3.y
		const dz = posAtBeat3_5.z - posAtBeat3.z
		const dist = Math.hypot(dx, dy, dz)
		expect(dist).toBeLessThan(5) // should be nearby, not jumping to empty space

		// Coordinates should be valid numbers
		expect(posAtBeat3_5.x).not.toBeNaN()
		expect(posAtBeat3_5.y).not.toBeNaN()
		expect(posAtBeat3_5.z).not.toBeNaN()
	})

	it('routing alternates independently at each split level', () => {
		const res = nestedRailDef()
		const marble = createMarbleInstance({
			resolvedRail: res,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		// First loop: enter splits
		tempo.currentBeat = 1
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		tempo.currentBeat = 2
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		tempo.currentBeat = 3
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		const firstPath = [...marble.branchPath]
		expect(firstPath).toEqual([0, 0]) // first branch at both levels

		// Loop back (past maxBeat=4)
		tempo.currentBeat = 4
		tempo.beatProgress = 0.5
		updateMarble(marble, tempo)
		expect(marble.branchPath).toEqual([])

		// Second loop: should alternate at level 0
		tempo.currentBeat = 5
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		tempo.currentBeat = 6
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		const secondPath = [...marble.branchPath]
		expect(secondPath[0]).toBe(1) // level 0 alternated

		// Third loop: alternate again at level 0
		tempo.currentBeat = 7
		tempo.beatProgress = 0
		updateMarble(marble, tempo) // loop
		tempo.currentBeat = 8
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		tempo.currentBeat = 9
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		expect(marble.branchPath[0]).toBe(0) // level 0 back to branch 0
		// level 1 should also alternate from first time
		expect(marble.branchPath[1]).toBe(1) // level 1 alternated
	})

	it('marble loops back and resets branchPath', () => {
		const res = nestedRailDef()
		const marble = createMarbleInstance({
			resolvedRail: res,
			startBeat: 0,
			direction: 'forward' as const,
			sequenceMode: 'looping' as const,
			easing: 'linear'
		})
		const tempo = createTempoState({ bpm: 120, beatsPerBar: 4 })

		// Progress through both splits
		tempo.currentBeat = 1
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		tempo.currentBeat = 2
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		tempo.currentBeat = 3
		tempo.beatProgress = 0
		updateMarble(marble, tempo)
		expect(marble.branchPath.length).toBe(2)

		// Past maxBeat (4) → should loop, reset branchPath
		tempo.currentBeat = 4
		tempo.beatProgress = 0.5
		updateMarble(marble, tempo)
		expect(marble.branchPath).toEqual([])
		expect(marble.currentBeat).toBeLessThan(2) // wrapped back to trunk
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
