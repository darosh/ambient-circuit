import { readdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import {
	detectNonWavLoop,
	detectWavLoop,
	hasFfmpeg,
	parseWavMeta,
	probeWithFfprobe
} from './audio-utils'

// ---- Types ------------------------------------------------------------------

export type SidecarNote = {
	loopStartSample?: number
	loopEndSample?: number
}

/** Shape of public/samples/<instrument>/samples.json */
export type Sidecar = {
	sampleRate?: number
	channels?: number
	bitDepth?: number
	duration?: number
	samples?: number
	/** Global loop default applied to all notes (used when all notes share one sample) */
	loopStartSample?: number
	loopEndSample?: number
	/** Per-note overrides */
	notes?: Record<string, SidecarNote>
}

export type AudioMeta = {
	sampleRate: number
	channels: number
	duration: number
	samples: number
	bitDepth?: number
}

// ---- Helpers ----------------------------------------------------------------

const AUDIO_EXTS = new Set(['.wav', '.mp3', '.ogg'])

function noteNameFromFile(file: string): string {
	return basename(file, extname(file)).replace('s', '#')
}

/** Return the global loop from sidecar, or null if absent. */
function globalLoopFromSidecar(sidecar: Sidecar): SidecarNote | null {
	if (sidecar.loopStartSample !== undefined && sidecar.loopEndSample !== undefined) {
		return { loopStartSample: sidecar.loopStartSample, loopEndSample: sidecar.loopEndSample }
	}
	return null
}

/** Detect loop info for one audio file. Returns null if detection fails. */
async function detectFileLoop(
	absPath: string,
	ext: string
): Promise<{ loop: SidecarNote; meta: AudioMeta } | null> {
	if (ext === '.wav') {
		const meta = await parseWavMeta(absPath)

		if (!meta) {
			return null
		}

		const loop = await detectWavLoop(absPath, meta)

		return loop ? { loop, meta } : null
	}

	if (!hasFfmpeg) {
		throw new Error('Missing FFMPEG!')
	}

	const probe = probeWithFfprobe(absPath)

	if (!probe) {
		return null
	}

	const loop = detectNonWavLoop(absPath, probe.sampleRate)

	if (!loop) {
		return null
	}

	return {
		loop,
		meta: {
			sampleRate: probe.sampleRate,
			channels: probe.channels,
			duration: probe.duration,
			samples: probe.samples
		}
	}
}

// ---- Core -------------------------------------------------------------------

/**
 * Read or initialise a sidecar for one instrument directory.
 * Detects loop points for any note that doesn't already have them.
 * Writes the sidecar back to disk only if something changed.
 */
async function processInstrument(full: string, sidecarPath: string): Promise<Sidecar> {
	// Load existing sidecar
	let sidecar: Sidecar = {}
	if (existsSync(sidecarPath)) {
		try {
			sidecar = JSON.parse(await readFile(sidecarPath, 'utf8')) as Sidecar
		} catch {
			console.warn(`  warn: could not parse ${sidecarPath}`)
		}
	}

	const globalLoop = globalLoopFromSidecar(sidecar)
	const files = await readdir(full)
	const audioFiles = files.filter((f) => AUDIO_EXTS.has(extname(f).toLowerCase()))

	let changed = false
	let representativeMeta: AudioMeta | null = null

	for (const file of audioFiles) {
		const ext = extname(file).toLowerCase()
		const noteName = noteNameFromFile(file)
		const absPath = join(full, file)

		// Note already has loop info — skip detection
		const perNote = sidecar.notes?.[noteName]
		if (perNote?.loopStartSample !== undefined && perNote?.loopEndSample !== undefined) continue
		if (globalLoop) continue // global default covers this note

		// Detect
		const result = await detectFileLoop(absPath, ext)
		if (!result) continue

		const { loop, meta } = result
		if (!representativeMeta) representativeMeta = meta

		console.log(
			`  auto-loop ${noteName}: ${loop.loopStartSample}–${loop.loopEndSample} @ ${meta.sampleRate}Hz`
		)

		sidecar.notes ??= {}
		sidecar.notes[noteName] = loop
		changed = true
	}

	// Populate top-level metadata if missing and we have a detection result
	if (representativeMeta) {
		if (!sidecar.sampleRate) {
			sidecar.sampleRate = representativeMeta.sampleRate
			changed = true
		}
		if (!sidecar.channels) {
			sidecar.channels = representativeMeta.channels
			changed = true
		}
		if (!sidecar.duration) {
			sidecar.duration = representativeMeta.duration
			changed = true
		}
		if (!sidecar.samples) {
			sidecar.samples = representativeMeta.samples
			changed = true
		}
		if (representativeMeta.bitDepth && !('bitDepth' in sidecar)) {
			;(sidecar as Record<string, unknown>).bitDepth = representativeMeta.bitDepth
			changed = true
		}
	}

	// Hoist single-note loop to global level
	const noteKeys = Object.keys(sidecar.notes ?? {})
	if (noteKeys.length === 1 && !globalLoop) {
		const only = sidecar.notes![noteKeys[0]]
		sidecar.loopStartSample = only.loopStartSample
		sidecar.loopEndSample = only.loopEndSample
		delete sidecar.notes
		changed = true
	}

	if (changed) {
		await writeFile(sidecarPath, JSON.stringify(sidecar, null, 2) + '\n')
		console.log(`  wrote ${sidecarPath}`)
	}

	return sidecar
}

/**
 * Process all instrument directories under samplesDir.
 * Creates/updates samples.json sidecars where needed.
 */
export async function updateSidecars(samplesDir: string): Promise<void> {
	const entries = await readdir(samplesDir, { withFileTypes: true })
	const dirs = entries
		.filter((e) => e.isDirectory())
		.map((e) => e.name)
		.sort()

	for (const dir of dirs) {
		const full = join(samplesDir, dir)
		const sidecarPath = join(full, 'samples.json')
		console.log(`processing ${dir}…`)
		await processInstrument(full, sidecarPath)
	}
}
