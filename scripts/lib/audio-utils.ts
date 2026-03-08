import { readFile } from 'fs/promises'
import { execSync } from 'child_process'
import { detectLoop } from './detect-loop'

export const hasFfmpeg = ffmpegAvailable()

function ffmpegAvailable() {
	try {
		execSync('ffmpeg -version', { stdio: 'ignore' })
		return true
	} catch {
		return false
	}
}

/**
 * Parse WAV header → { sampleRate, channels, bitDepth, duration }
 * Handles PCM (format 1) and IEEE float (format 3).
 * Returns null if not a valid WAV.
 */
export async function parseWavMeta(filePath: string) {
	try {
		const fd = await readFile(filePath)
		const view = new DataView(fd.buffer, fd.byteOffset, fd.byteLength)
		// RIFF header
		if (fd.toString('ascii', 0, 4) !== 'RIFF') return null
		if (fd.toString('ascii', 8, 12) !== 'WAVE') return null

		let offset = 12
		let sampleRate = 0,
			channels = 0,
			bitDepth = 0,
			dataSize = 0

		while (offset + 8 <= fd.length) {
			const chunkId = fd.toString('ascii', offset, offset + 4)
			const chunkSize = view.getUint32(offset + 4, true)
			offset += 8

			if (chunkId === 'fmt ') {
				// audioFormat = view.getUint16(offset, true) // 1=PCM, 3=float
				channels = view.getUint16(offset + 2, true)
				sampleRate = view.getUint32(offset + 4, true)
				bitDepth = view.getUint16(offset + 14, true)
			} else if (chunkId === 'data') {
				dataSize = chunkSize
				break
			}
			offset += chunkSize + (chunkSize & 1) // word-align
		}

		if (!sampleRate || !channels || !bitDepth || !dataSize) return null
		const bytesPerSample = bitDepth / 8
		const totalSamples = dataSize / (channels * bytesPerSample)
		const duration = totalSamples / sampleRate

		return { sampleRate, channels, bitDepth, duration, samples: totalSamples }
	} catch {
		return null
	}
}

/**
 * Get audio duration and metadata via ffprobe.
 */
export function probeWithFfprobe(filePath: string) {
	try {
		const out = execSync(
			`ffprobe -v error -select_streams a:0 -show_entries stream=sample_rate,channels,duration,duration_ts -of csv=p=0 "${filePath}" 2>/dev/null`,
			{ encoding: 'utf8' }
		).trim()
		const [sr, ch, samps, dur] = out.split(',')
		if (!sr || !ch || !dur || !samps) return null

		const samples = parseInt(samps)
		const sampleRate = parseInt(sr)

		return {
			sampleRate,
			channels: parseInt(ch),
			duration: samples / sampleRate,
			samples
		}
	} catch {
		return null
	}
}

/**
 * Decode WAV to mono float32, then run loop detection.
 */
export async function detectWavLoop(
	filePath: string,
	meta: { sampleRate: number; channels: number; bitDepth: number }
) {
	try {
		const fd = await readFile(filePath)
		const view = new DataView(fd.buffer, fd.byteOffset, fd.byteLength)

		let offset = 12,
			dataOffset = -1,
			dataSize = 0
		while (offset + 8 <= fd.length) {
			const chunkId = fd.toString('ascii', offset, offset + 4)
			const chunkSize = view.getUint32(offset + 4, true)
			offset += 8
			if (chunkId === 'data') {
				dataOffset = offset
				dataSize = chunkSize
				break
			}
			offset += chunkSize + (chunkSize & 1)
		}
		if (dataOffset < 0) return null

		const { sampleRate, channels, bitDepth } = meta
		const totalSamples = Math.floor(dataSize / (channels * (bitDepth / 8)))
		const interleaved = new Float32Array(totalSamples * channels)

		if (bitDepth === 16) {
			for (let i = 0; i < totalSamples; i++) {
				for (let c = 0; c < channels; c++)
					interleaved[i * channels + c] =
						view.getInt16(dataOffset + (i * channels + c) * 2, true) / 32768
			}
		} else if (bitDepth === 24) {
			for (let i = 0; i < totalSamples; i++) {
				for (let c = 0; c < channels; c++) {
					const base = dataOffset + (i * channels + c) * 3
					let val = fd[base] | (fd[base + 1] << 8) | (fd[base + 2] << 16)
					if (val & 0x800000) val |= ~0xff_ffff
					interleaved[i * channels + c] = val / 8_388_608
				}
			}
		} else return null

		return detectLoop(interleaved, sampleRate, { channels })
	} catch {
		return null
	}
}

/**
 * Decode OGG/MP3/etc via ffmpeg, then run loop detection.
 */
export function detectNonWavLoop(filePath: string, sampleRate: number) {
	if (!hasFfmpeg) return null
	const probe = probeWithFfprobe(filePath)
	const channels = probe?.channels ?? 1
	const decoded = decodeWithFfmpeg(filePath, sampleRate, channels)
	if (!decoded) return null
	return detectLoop(decoded.samples, sampleRate, { channels })
}

/**
 * Decode audio file to interleaved float32 PCM via ffmpeg.
 * Returns { sampleRate, channels, samples: Float32Array } or null.
 */
function decodeWithFfmpeg(filePath: string, targetSR = 44100, channels = 1) {
	try {
		const buf = execSync(
			`ffmpeg -i "${filePath}" -f f32le -ac ${channels} -ar ${targetSR} pipe:1 2>/dev/null`,
			{ maxBuffer: 64 * 1024 * 1024 }
		)
		const samples = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4)
		return { sampleRate: targetSR, channels, samples }
	} catch {
		return null
	}
}
