import { tones } from './tones'

export const notes = Object.fromEntries(
	tones.map((t, i) => [t.replace('-', '_').replace('#', 's'), i])
)
