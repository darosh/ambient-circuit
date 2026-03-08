import { pipe } from 'rambdax'
import { quantizeFactory } from './quantize-factory'

/** Transpose note(s) by semitones */
export function pitch<T extends number | number[]>(note: T, semitones: number): T {
	if (Array.isArray(note)) return note.map((n) => n + semitones) as T
	return ((note as number) + semitones) as T
}

export function pitchQuantizeFactory(scale: string = 'C major', dir: number = 1) {
	return pipe((n: number | number[], semi: number) => pitch(n, semi), quantizeFactory(scale, dir))
}
