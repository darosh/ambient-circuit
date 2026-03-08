import { describe, it, expect } from 'vitest'
import { pipe, curry } from 'rambdax'
import { pitch, pitchQuantizeFactory } from '../src/lib/midi/pitch'
import { quantizeFactory } from '../src/lib/midi/quantize-factory'

describe('pitch', () => {
	it('transposes single note up', () => expect(pitch(60, 7)).toBe(67))
	it('transposes single note down', () => expect(pitch(60, -12)).toBe(48))
	it('zero semitones is identity', () => expect(pitch(60, 0)).toBe(60))
	it('transposes array', () => expect(pitch([60, 64, 67], 5)).toEqual([65, 69, 72]))
	it('transposes array down', () => expect(pitch([60, 62, 64], -2)).toEqual([58, 60, 62]))
})

describe('pipe: pitch → quantize', () => {
	// C major: 0 2 4 5 7 9 11
	it('pitch up 1 then quantize up snaps to scale', () => {
		// C(60) + 1 = C#(61), quantize up → D(62)
		const process = pipe((n: number) => pitch(n, 1), quantizeFactory('C major', 1))
		expect(process(60)).toBe(62)
	})

	it('pitch down 1 then quantize down snaps to scale', () => {
		// E(64) - 1 = D#(63), quantize down → D(62)
		const process = pipe((n: number) => pitch(n, -1), quantizeFactory('C major', -1))
		expect(process(64)).toBe(62)
	})

	it('pitch + quantize nearest on array', () => {
		// [C(60), E(64), G(67)] + 6 = [F#(66), A#(70), C#(73)]
		// quantize nearest in C major: F#→G(67), A#→B(71), C#→D(74)
		const process = pipe((n: number[]) => pitch(n, 6), quantizeFactory<number[]>('C major', 0))
		expect(process([60, 64, 67])).toEqual([67, 71, 74])
	})

	it('octave shift then quantize preserves octave', () => {
		// G(67) + 12 = G(79), already in C major
		const process = pipe((n: number) => pitch(n, 12), quantizeFactory('C major', 0))
		expect(process(67)).toBe(79)
	})

	it('pipe with semitones', () => {
		const process = pipe((n: number, semi: number) => pitch(n, semi), quantizeFactory('C major', 1))
		expect(process(60, 1)).toBe(62)
	})

	it('pitchQuantizeFactory', () => {
		const process = pitchQuantizeFactory()
		expect(process(60, 1)).toBe(62)
	})

	it('pitchQuantizeFactory curry', () => {
		const process = curry(pitchQuantizeFactory())(1)
		expect(process(60)).toBe(62)
	})

	it('pitchQuantizeFactory array', () => {
		const process = pitchQuantizeFactory()
		expect(process([60, 70, 80], 2)).toEqual([62, 72, 83])
	})
})
