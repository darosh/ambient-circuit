/**
 * Zero-crossing loop detection on float32 PCM.
 * Supports mono or interleaved stereo (channels=2: L0,R0,L1,R1,...).
 * Returns { loopStartSample, loopEndSample } in per-frame indices, or throws.
 */

export type DetectOptions = {
	amplitudeTolerance?: number
	minCycles?: number
	start?: number
	end?: number
}

export function detectLoop(
	pcm: Float32Array,
	sampleRate: number,
	opts: DetectOptions & { channels?: number } = {}
) {
	const { amplitudeTolerance = 0.03, minCycles = 11, start = 0.25, end = 0.5, channels = 1 } = opts

	console.log({ start, end })
	const totalSamples = pcm.length / channels
	const searchStart = Math.floor(start * totalSamples)
	const searchEnd = Math.floor(end * totalSamples)

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
	if (crossings.length < minCycles + 1)
		throw new Error(
			`too few zero crossings: found ${crossings.length}, need ${minCycles + 1} (amplitudeTolerance=${amplitudeTolerance})`
		)

	// Estimate fundamental period via autocorrelation on ch0 near end
	const windowStart = crossings[crossings.length - Math.min(8, crossings.length)]
	const windowEnd = crossings[crossings.length - 1]
	const winLen = windowEnd - windowStart
	if (winLen < 2) throw new Error('zero-crossing window too short for autocorrelation')

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
	if (bestLag < 2 || bestCorr < 0.3)
		throw new Error(
			`autocorrelation too weak: bestLag=${bestLag}, bestCorr=${bestCorr.toFixed(3)} (need ≥0.3)`
		)

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
	if (loopStartSample >= loopEndSample)
		throw new Error(`degenerate loop: start=${loopStartSample} >= end=${loopEndSample}`)

	return { loopStartSample, loopEndSample }
}
