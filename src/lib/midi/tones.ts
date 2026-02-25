export const toneNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const tones = Array.from({ length: 128 }).map(
	(_n, i) => `${toneNames[i % 12]}${Math.floor(i / 12) - 1}`
)
