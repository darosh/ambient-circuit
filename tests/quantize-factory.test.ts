import { describe, it, expect } from 'vitest'
import { quantizeFactory } from '../src/lib/midi/quantize-factory'

// C major: C D E F G A B (chromas 0,2,4,5,7,9,11)
// C minor: C D Eb F G Ab Bb (chromas 0,2,3,5,7,8,10)

describe('quantizeFactory', () => {
	it('throws on unknown scale', () => {
		expect(() => quantizeFactory('Z bogus')).toThrow()
	})

	describe('in-scale notes pass through', () => {
		const q = quantizeFactory('C major')
		it.each([60, 62, 64, 65, 67, 69, 71, 72])('midi %i unchanged', (n) => {
			expect(q(n)).toBe(n)
		})
	})

	describe('dir=0 nearest', () => {
		const q = quantizeFactory('C major', 0)

		it('C# → D (1 up, 1 down → tie-break up)', () => expect(q(61)).toBe(62))
		it('D# → E (1 up, 2 down → up wins)', () => expect(q(63)).toBe(64))
		it('A# → B (1 up, 2 down → up wins)', () => expect(q(70)).toBe(71))
		it('F# → G (1 up, 2 down → up wins)', () => expect(q(66)).toBe(67))
		it('G# → A (1 up, 2 down → up wins)', () => expect(q(68)).toBe(69))
	})

	describe('dir=1 up', () => {
		const q = quantizeFactory('C major', 1)

		it('C# → D', () => expect(q(61)).toBe(62))
		it('D# → E', () => expect(q(63)).toBe(64))
		it('G# → A', () => expect(q(68)).toBe(69))
		it('A# → B', () => expect(q(70)).toBe(71))
		// wrap: B is 71, next scale note up is C (72)
		it('wraps correctly at octave boundary', () => {
			// use pentatonic: C E G A (0,4,7,9)
			const qPent = quantizeFactory('C major pentatonic', 1) // C D E G A (0,2,4,7,9)
			// F# (66): next scale note up is G (67)
			expect(qPent(66)).toBe(67)
			// B (71 not in pentatonic): next up is C(72)
			expect(qPent(71)).toBe(72)
		})
	})

	describe('dir=-1 down', () => {
		const q = quantizeFactory('C major', -1)

		it('C# → C', () => expect(q(61)).toBe(60))
		it('D# → D', () => expect(q(63)).toBe(62))
		it('G# → G', () => expect(q(68)).toBe(67))
		it('A# → A', () => expect(q(70)).toBe(69))
		it('wraps at octave boundary', () => {
			// C# (61) dir=-1 → C(60)
			const qPent = quantizeFactory('C major pentatonic', -1) // C D E G A
			// C# (61): down → C(60)
			expect(qPent(61)).toBe(60)
			// C (60 in scale) unchanged
			expect(qPent(60)).toBe(60)
			// Bb (70 not in pent): down → A(69)
			expect(qPent(70)).toBe(69)
			// F (65 not in pent): down → E(64)
			expect(qPent(65)).toBe(64)
			// D (62 in pent) unchanged
			expect(qPent(62)).toBe(62)
		})
	})

	describe('array input', () => {
		const q = quantizeFactory<number[]>('C major', 1)
		it('quantizes each note in array', () => {
			expect(q([61, 63, 66])).toEqual([62, 64, 67])
		})
	})

	describe('octave invariance', () => {
		const q = quantizeFactory('C major', 1)
		it('same interval regardless of octave', () => {
			// C# in octave 4 (61) and octave 5 (73), both → D
			expect(q(61)).toBe(62)
			expect(q(73)).toBe(74)
		})
	})

	describe('minor scale', () => {
		const q = quantizeFactory('C minor', 0)
		it('D# → Eb (already in scale as Eb=3)', () => expect(q(63)).toBe(63))
		it('F# → G (1 up) not Gb', () => expect(q(66)).toBe(67))
	})
})
