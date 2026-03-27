import type { AudioEngine, AudioChain } from './types'
import type { SceneConfig } from '../core/scene'
import type { SceneCtx } from '../core/scene-ctx'
import type { RailConfig } from '../core/rail-config'
import { initAudio, buildChain, buildBuses, setNodeParam } from './engine'

export function hasAudioConfig(scene: SceneConfig, rails: RailConfig[]): boolean {
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
	rails: RailConfig[],
	sceneCtx: SceneCtx,
	defaultAnalyser?: string
): Promise<AudioChain[]> {
	await initAudio(engine)
	if (engine.disposed) return []

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

	if (engine.disposed) return []

	// Build shared/named chains from scene config
	if (scene.audio?.chains) {
		for (const [id, config] of Object.entries(scene.audio.chains)) {
			if (engine.disposed) return []
			await buildChain(engine, { ...config, id }, defaultAnalyser)
		}
	}

	// Build per-instrument chains
	for (const ie of sceneCtx.instruments) {
		if (engine.disposed) return []
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
			if (engine.disposed) return []
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

	// Subscribe buses to CtrlBus
	if (scene.audio?.buses) {
		for (const [busName, busConfig] of Object.entries(scene.audio.buses)) {
			const bus = engine.buses.get(busName)
			if (!bus || !busConfig.ctrl) continue
			for (const entry of busConfig.ctrl) {
				const { cc, channel, param, range, fxIndex = 0 } = entry
				// console.log(
				// 	'[ctrl] subscribe bus',
				// 	busName,
				// 	'to',
				// 	channel + ':' + cc,
				// 	'→ fx.' + fxIndex + '.' + param,
				// 	range
				// )
				sceneCtx.ctrlBus.subscribe(
					channel,
					cc,
					{ param, range },
					{
						onCC(p, value) {
							if (bus.fx[fxIndex]) setNodeParam(bus.fx[fxIndex], p, value)
						}
					}
				)
			}
		}
	}

	// Subscribe master chain to CtrlBus
	if (scene.audio?.master?.ctrl && engine.masterChain) {
		const master = engine.masterChain
		for (const entry of scene.audio.master.ctrl) {
			const { cc, channel, param, range, fxIndex = 0 } = entry
			// console.log(
			// 	'[ctrl] subscribe master to',
			// 	channel + ':' + cc,
			// 	'→ fx.' + fxIndex + '.' + param,
			// 	range
			// )
			sceneCtx.ctrlBus.subscribe(
				channel,
				cc,
				{ param, range },
				{
					onCC(p, value) {
						if (master.fx[fxIndex]) setNodeParam(master.fx[fxIndex], p, value)
					}
				}
			)
		}
	}

	// Subscribe chains to CtrlBus based on their ctrl config
	for (const chain of engine.instanceChains) {
		const ctrlEntries = chain.config.ctrl
		if (!ctrlEntries) continue
		for (const entry of ctrlEntries) {
			const { cc, channel, param, range, fxIndex } = entry
			// const target = fxIndex === undefined ? 'gen' : 'fx.' + fxIndex
			// console.log(
			// 	'[ctrl] subscribe chain',
			// 	chain.config.id,
			// 	'to',
			// 	channel + ':' + cc,
			// 	'→',
			// 	target + '.' + param,
			// 	range
			// )
			sceneCtx.ctrlBus.subscribe(
				channel,
				cc,
				{ param, range },
				{
					onCC(p, value) {
						// console.log(
						// 	'[ctrl] cc',
						// 	channel + ':' + cc,
						// 	'→',
						// 	target + '.' + p,
						// 	'=',
						// 	value.toFixed(1)
						// )
						if (fxIndex === undefined) {
							if (chain.generator) setNodeParam(chain.generator, p, value)
						} else {
							if (chain.fx[fxIndex]) setNodeParam(chain.fx[fxIndex], p, value)
						}
					}
				}
			)
		}
	}

	return engine.instanceChains
}
