import * as Tone from 'tone'
import { flattenObject } from 'rambda'

import TONE_DEFAULTS from '../src/lib/audio/tone-defaults.ts'

const entries = Object.keys(TONE_DEFAULTS).map((className) => {
	const defaults = Tone[className].getDefaults()
	const flatten = flattenObject(defaults)
	const filtered = Object.entries(flatten).filter(
		([key]) => !['context.', 'onsilence', 'voice0.', 'voice1.'].some((fbn) => key.startsWith(fbn))
	)
	const modifiable = filtered.filter(([key, val]) => {
		return (
			![
				'modulationFrequency',
				'modulationIndex',
				'width',
				'.harmonicity',
				'.phase',
				'.count',
				'.spread',
				'.rolloff',
				'.frequency',
				'partialCount'
			].some((fu) => key.endsWith(fu)) && typeof val === 'number'
		)
	})

	return [
		className,
		JSON.parse(
			JSON.stringify({
				...Object.fromEntries(modifiable)
			})
		)
	]
})

console.log(Object.fromEntries(entries))
