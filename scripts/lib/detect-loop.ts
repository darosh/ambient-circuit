/**
 * Zero-crossing loop detection on float32 PCM.
 * Supports mono or interleaved stereo (channels=2: L0,R0,L1,R1,...).
 * Returns { loopStartSample, loopEndSample } in per-frame indices, or null.
 */

export type DetectOptions = {
	amplitudeTolerance?: number
	minCycles?: number
	searchFromEnd?: number
}

export function detectLoop(
	pcm: Float32Array,
	sampleRate: number,
	opts: DetectOptions & { channels?: number } = {}
) {
	const { amplitudeTolerance = 0.03, minCycles = 12, searchFromEnd = 0.35, channels = 1 } = opts

	const totalSamples = pcm.length / channels
	const searchStart = Math.floor((1 - searchFromEnd) * totalSamples)
	const searchEnd = totalSamples - Math.floor(sampleRate * 0.01) // avoid last 10ms

	// Find rising zero crossings where ALL channels cross simultaneously (±1 sample tolerance)
	const crossings = []
	for (let i = searchStart; i < searchEnd; i++) {
		let allCross = true
		for (let c = 0; c < channels; c++) {
			const prev = pcm[(i - 1) * channels + c]
			const cur = pcm[i * channels + c]
			if (!(prev < 0 && cur >= 0 && Math.abs(cur) <= amplitudeTolerance)) {
				allCross = false
				break
			}
		}
		if (allCross) crossings.push(i)
	}
	if (crossings.length < minCycles + 1) return null

	// Estimate fundamental period via autocorrelation on ch0 near end
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
			const a = pcm[j * channels]
			const b = pcm[(j + lag) * channels]
			corr += a * b
			norm += a * a
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
