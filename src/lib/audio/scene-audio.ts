import type { AudioEngine, AudioChain } from './types'
import type { SceneConfig } from '../scene'
import type { SceneCtx } from '../scene-ctx'
import type { RailData } from '../rail-data'
import { initAudio, buildChain, buildBuses } from './engine'

export function hasAudioConfig(scene: SceneConfig, rails: RailData[]): boolean {
	if (scene.audio?.chains) return true
	for (const rd of rails) {
		if (rd.instruments) {
			for (const ins of rd.instruments) {
				if (ins.audio) return true
			}
		}
		const mds = rd.marbles
		if (mds && mds.length > 0) {
			for (const md of mds) {
				if ('audio' in md && md.audio) return true
			}
		}
	}
	return false
}

export async function buildSceneAudio(
	engine: AudioEngine,
	scene: SceneConfig,
	rails: RailData[],
	sceneCtx: SceneCtx,
	defaultAnalyser?: string
): Promise<AudioChain[]> {
	await initAudio(engine)

	// Build buses and master chain first (chains route to them)
	if (scene.audio?.buses || scene.audio?.master) {
		await buildBuses(
			engine,
			{
				buses: scene.audio.buses,
				master: scene.audio.master
			},
			defaultAnalyser
		)
	}

	// Build shared/named chains from scene config
	if (scene.audio?.chains) {
		for (const [id, config] of Object.entries(scene.audio.chains)) {
			await buildChain(engine, { ...config, id }, defaultAnalyser)
		}
	}

	// Build per-instrument chains
	for (const ie of sceneCtx.instruments) {
		if (ie.instrument.audio) {
			ie.audio =
				ie.instrument.audio.id && engine.chains.has(ie.instrument.audio.id)
					? engine.chains.get(ie.instrument.audio.id)
					: await buildChain(engine, ie.instrument.audio, defaultAnalyser)
		}
	}

	// Build per-marble chains
	let mIdx = 0
	for (const rd of rails) {
		const mds = rd.marbles && rd.marbles.length > 0 ? rd.marbles : rd.marbles === false ? [] : [{}]
		for (const md of mds) {
			if ('audio' in md && md.audio) {
				const me = sceneCtx.marbles[mIdx]
				if (me) {
					me.audio =
						md.audio.id && engine.chains.has(md.audio.id)
							? engine.chains.get(md.audio.id)
							: await buildChain(engine, md.audio, defaultAnalyser)
				}
			}
			mIdx++
		}
	}

	return engine.instanceChains
}
