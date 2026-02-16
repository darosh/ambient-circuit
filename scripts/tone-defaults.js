import * as Tone from 'tone'

import TONE_DEFAULTS from '../src/lib/audio/tone-defaults.ts'

const entries = Object.keys(TONE_DEFAULTS).map((key) => [
	key,
	JSON.parse(
		JSON.stringify({ ...Tone[key].getDefaults(), context: undefined, onsilence: undefined })
	)
])

console.log(Object.fromEntries(entries))
