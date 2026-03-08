/**
 * Zero-crossing loop detection on mono float32 PCM.
 * Returns { loopStartSample, loopEndSample } in source sample units, or null.
 */

export type DetectOptions = {
	amplitudeTolerance?: number
	minCycles?: number
	searchFromEnd?: number
}

export function detectLoop(mono: Float32Array, sampleRate: number, opts: DetectOptions = {}) {
	const { amplitudeTolerance = 0.03, minCycles = 12, searchFromEnd = 0.35 } = opts

	const totalSamples = mono.length
	const searchStart = Math.floor((1 - searchFromEnd) * totalSamples)
	const searchEnd = totalSamples - Math.floor(sampleRate * 0.01) // avoid last 10ms

	// Find rising zero crossings in search region
	const crossings = []
	for (let i = searchStart; i < searchEnd; i++) {
		if (mono[i - 1] < 0 && mono[i] >= 0 && Math.abs(mono[i]) <= amplitudeTolerance) {
			crossings.push(i)
		}
	}
	if (crossings.length < minCycles + 1) return null

	// Estimate fundamental period via autocorrelation on a window near end
	const windowStart = crossings[crossings.length - Math.min(8, crossings.length)]
	const windowEnd = crossings[crossings.length - 1]
	const winLen = windowEnd - windowStart
	if (winLen < 2) return null

	let bestLag = 0,
		bestCorr = -1
	const minLag = Math.floor(winLen / 4)
	for (let lag = minLag; lag <= winLen; lag++) {
		let corr = 0,
			norm = 0
		for (let j = windowStart; j < windowEnd && j + lag < totalSamples; j++) {
			corr += mono[j] * mono[j + lag]
			norm += mono[j] * mono[j]
		}
		if (norm > 0) corr /= norm
		if (corr > bestCorr) {
			bestCorr = corr
			bestLag = lag
		}
	}
	if (bestLag < 2 || bestCorr < 0.3) return null

	const loopEndSample = crossings[crossings.length - 1]
	const targetStart = loopEndSample - minCycles * bestLag
	let loopStartSample = crossings[0]
	let minDist = Math.abs(crossings[0] - targetStart)
	for (let i = 1; i < crossings.length - 1; i++) {
		const d = Math.abs(crossings[i] - targetStart)
		if (d < minDist) {
			minDist = d
			loopStartSample = crossings[i]
		}
	}
	if (loopStartSample >= loopEndSample) return null

	return { loopStartSample, loopEndSample }
}
