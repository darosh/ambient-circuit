import type {
	AudioEngine,
	AudioChain,
	AudioChainConfig,
	AudioBus,
	BusConfig,
	MasterConfig,
	GeneratorConfig,
	FxConfig,
	ParamValue,
	AnalyzerType,
	NodePresetInfo,
	VoiceTracker
} from './types'
import type { ToneAudioNode } from 'tone'
import { createDevice, type IPatcher, MIDIEvent } from '@rnbo/js'
import type { Device, MIDIByte } from '@rnbo/js'
import TONE_DEFAULTS from './tone-defaults'
import { debug } from 'debug'

const log = debug('audio')

const KEEP_PAST = 16

export function resolveAnalyzerType(cfg?: AnalyzerType, def?: string) {
	if (cfg === 'meter') return 'meter'
	if (cfg === 'waveform') return 'waveform'
	if (cfg === 'fft') return 'fft'

	return <'fft' | 'waveform' | 'meter'>def ?? 'meter'
}

/**
 * Create audio engine (no AudioContext yet — lazy init)
 */
export function createAudioEngine(): AudioEngine {
	return {
		ctx: null,
		masterGain: null,
		Tone: null,
		chains: new Map(),
		instanceChains: [],
		initialized: false,
		rnboCache: new Map(),
		buses: new Map(),
		masterChain: null,
		sharedAnalyzer: null,
		muted: engineCache.muted ?? false
	}
}

/**
 * Initialize audio (called once on first play)
 */

const engineCache: Partial<AudioEngine> = {}

export async function initAudio(engine: AudioEngine): Promise<void> {
	if (engine.initialized) return

	if (engineCache.initialized) {
		Object.assign(engine, engineCache)
		return
	}

	engine.ctx = new AudioContext()

	// Dynamic import Tone.js and set shared context

	if (typeof self === 'object') {
		;(<Record<string, boolean>>(<unknown>self)).TONE_SILENCE_LOGGING = true
	}

	engine.Tone = await import('tone')
	engine.Tone.setContext(engine.ctx)
	await engine.Tone.start()

	// Master gain → destination
	engine.masterGain = engine.ctx.createGain()
	engine.masterGain.connect(engine.ctx.destination)

	toggleMute(engine, engine.muted)

	// Shared analyzer for UI visualization
	engine.sharedAnalyzer = new engine.Tone.Analyser('fft', 64) as unknown as ToneAudioNode

	engine.initialized = true

	const { initialized, sharedAnalyzer, masterGain, Tone, ctx, rnboCache, muted } = engine
	Object.assign(engineCache, {
		initialized,
		sharedAnalyzer,
		masterGain,
		Tone,
		ctx,
		rnboCache,
		muted
	})

	// Apply muted state from cache (user toggled mute before engine init)
	if (engineCache.muted) {
		engine.muted = true
		engine.masterGain.gain.value = 0
	}

	log('initialized')
}

const MUTE_RAMP = 0.05

/**
 * Toggle mute state. Works before/after audio init.
 */
export function toggleMute(engine: AudioEngine | null, value?: boolean): boolean {
	engineCache.muted = value ?? !engineCache.muted

	if (!engine) return engineCache.muted

	engine.muted = engineCache.muted

	if (engine.masterGain) {
		const ctx = engine.masterGain.context
		engine.masterGain.gain.cancelScheduledValues(ctx.currentTime)
		engine.masterGain.gain.setValueAtTime(engine.masterGain.gain.value, ctx.currentTime)
		engine.masterGain.gain.linearRampToValueAtTime(
			engine.muted ? 0 : 1,
			ctx.currentTime + MUTE_RAMP
		)
	}
	return engine.muted
}

/**
 * Build master chain and buses from scene audio config
 */
export async function buildBuses(
	engine: AudioEngine,
	config: { buses?: Record<string, BusConfig>; master?: MasterConfig },
	def?: string
): Promise<void> {
	if (!engine.ctx || !engine.masterGain) throw new Error('Audio engine not initialized')

	// 1. Build master chain
	if (config.master) {
		engine.masterChain = await buildBus(engine, config.master, engine.masterGain, def)
	}

	// 2. Build buses → output to master chain input (or masterGain)
	const busTarget = engine.masterChain ? engine.masterChain.input : engine.masterGain
	if (config.buses) {
		for (const [name, busConfig] of Object.entries(config.buses)) {
			const bus = await buildBus(engine, busConfig, busTarget, def)
			engine.buses.set(name, bus)
		}
	}
}

/**
 * Build a single bus (used for named buses and master chain)
 */
async function buildBus(
	engine: AudioEngine,
	config: BusConfig,
	destination: GainNode | AudioNode,
	def?: string
): Promise<AudioBus> {
	if (!engine.ctx) throw new Error('No AudioContext')

	const input = engine.ctx.createGain()
	const output = engine.ctx.createGain()
	output.connect(destination as AudioNode)

	const fx: (ToneAudioNode | Device)[] = []
	if (config.fx) {
		for (const fxConfig of config.fx) {
			const result = await buildNode(engine, fxConfig)
			fx.push(result.node)
		}
	}

	let analyzer: ToneAudioNode | null = null
	if (config.analyzer) {
		analyzer = await buildAnalyzer(engine, config.analyzer, def)
	}

	// Connect: input → fx[0] → ... → analyzer? → output
	const nodes: Array<ToneAudioNode | Device | GainNode> = [input]
	for (const f of fx) nodes.push(f)
	if (analyzer) nodes.push(analyzer)
	nodes.push(output)

	for (let i = 0; i < nodes.length - 1; i++) {
		connectNodes(nodes[i], nodes[i + 1], engine)
	}

	const nodePresets = new Map<number, NodePresetInfo>()
	if (config.fx) {
		for (let i = 0; i < config.fx.length; i++) {
			if ('rnbo' in config.fx[i]) {
				const fxNode = fx[i]
				const info = makeNodePresetInfo(engine, config.fx[i] as { rnbo: string }, fxNode)
				if (info) nodePresets.set(i, info)
			}
		}
	}

	const bus: AudioBus = { config, fx, analyzer, input, output, nodePresets, onParamChange: null }

	// Subscribe RNBO fx to param changes
	for (const f of fx) {
		if (isDevice(f)) {
			f.parameterChangeEvent.subscribe((param) => {
				if (bus.onParamChange) bus.onParamChange(param.id, param.value)
			})
		}
	}

	return bus
}

/**
 * Build a live AudioChain from config
 */
export async function buildChain(
	engine: AudioEngine,
	config: AudioChainConfig,
	def?: string
): Promise<AudioChain> {
	if (!engine.ctx || !engine.masterGain) {
		throw new Error('Audio engine not initialized')
	}

	// Determine output destination: bus → master chain → masterGain
	let destination: AudioNode = engine.masterGain
	if (config.bus) {
		const bus = engine.buses.get(config.bus)
		if (bus) destination = bus.input
	} else if (engine.masterChain) {
		destination = engine.masterChain.input
	}

	const output = engine.ctx.createGain()
	output.connect(destination)

	let generator: ToneAudioNode | Device | null = null
	let genActivePreset: string | null = null
	if (config.generator) {
		const result = await buildNode(engine, config.generator)
		generator = result.node
		genActivePreset = result.activePreset
	}

	const fx: (ToneAudioNode | Device)[] = []
	if (config.fx) {
		for (const fxConfig of config.fx) {
			const result = await buildNode(engine, fxConfig)
			fx.push(result.node)
		}
	}

	let analyzer: ToneAudioNode | null = null
	if (config.analyzer) {
		analyzer = await buildAnalyzer(engine, config.analyzer, def)
	}

	// Solo node for mute/solo control
	let solo: import('tone').Solo | null = null
	if (engine.Tone) {
		solo = new engine.Tone.Solo()
	}

	// Connect chain: generator → fx[0] → ... → analyzer? → solo? → output
	const nodes: Array<ToneAudioNode | Device | GainNode> = []
	if (generator) nodes.push(generator)
	for (const f of fx) nodes.push(f)
	if (analyzer) nodes.push(analyzer)
	if (solo) nodes.push(solo as unknown as ToneAudioNode)
	nodes.push(output)

	for (let i = 0; i < nodes.length - 1; i++) {
		connectNodes(nodes[i], nodes[i + 1], engine)
	}

	// Build nodePresets map: -1 = generator, 0+ = fx index
	const nodePresets = new Map<number, NodePresetInfo>()
	if (generator && config.generator && 'rnbo' in config.generator) {
		const info = makeNodePresetInfo(engine, config.generator, generator)
		if (info) {
			// Apply initial preset from buildNode result
			if (genActivePreset) info.active = genActivePreset
			nodePresets.set(-1, info)
		}
	}
	if (config.fx) {
		for (let i = 0; i < config.fx.length; i++) {
			if ('rnbo' in config.fx[i]) {
				const info = makeNodePresetInfo(engine, config.fx[i] as { rnbo: string }, fx[i])
				if (info) nodePresets.set(i, info)
			}
		}
	}

	const genPoly = config.generator?.poly
	const maxVoices =
		genPoly !== undefined ? genPoly : config.generator && 'rnbo' in config.generator ? 8 : 1
	const voices: VoiceTracker = { max: maxVoices, endTimes: [] }

	const chain: AudioChain = {
		config,
		generator,
		fx,
		analyzer,
		solo,
		output,
		voices,
		nodePresets,
		onParamChange: null,
		audioSignal: { intensity: 0, color: '#ffffff', lastNote: 0, activeNotes: [] },
		lastTrigger: 0,
		chordInfo: { notes: [], chord: '', time: 0 },
		chordHistory: [],
		setParam(path, value) {
			if (chain.generator) setNodeParam(chain.generator, path, value)
		},
		setFxParam(index, path, value) {
			if (chain.fx[index]) setNodeParam(chain.fx[index], path, value)
		},
		getParam(path) {
			return chain.generator ? getNodeParam(chain.generator, path) : undefined
		},
		listParams() {
			if (!chain.generator) return []
			const gc = config.generator!
			return listNodeParams(chain.generator, gc.params, 'tone' in gc ? gc.tone : undefined)
		},
		listFxParams(index) {
			if (!chain.fx[index]) return []
			const fc = config.fx![index]
			return listNodeParams(chain.fx[index], fc.params, 'tone' in fc ? fc.tone : undefined)
		}
	}

	// Subscribe all RNBO nodes to param changes
	const rnboNodes: (ToneAudioNode | Device)[] = []
	if (generator && isDevice(generator)) rnboNodes.push(generator)
	for (const f of fx) {
		if (isDevice(f)) rnboNodes.push(f)
	}
	for (const node of rnboNodes) {
		;(node as Device).parameterChangeEvent.subscribe((param) => {
			if (chain.onParamChange) chain.onParamChange(param.id, param.value)
		})
	}

	// Register named chains
	if (config.id) {
		engine.chains.set(config.id, chain)
	}
	engine.instanceChains.push(chain)

	return chain
}

/**
 * Build analyzer node from config
 */
async function buildAnalyzer(
	engine: AudioEngine,
	config: AnalyzerType,
	def?: string
): Promise<ToneAudioNode | null> {
	if (!config || !engine.Tone) return null
	const Tone = engine.Tone

	const ana = resolveAnalyzerType(config, def)

	if (ana === 'fft') {
		return new Tone.Analyser('fft', 64) as unknown as ToneAudioNode
	} else if (ana === 'waveform') {
		return new Tone.Analyser('waveform', 256) as unknown as ToneAudioNode
	} else if (ana === 'meter') {
		return new Tone.Meter() as unknown as ToneAudioNode
	}
	return null
}

/**
 * Connect shared analyzer to a chain's output (for UI visualization)
 */
export function connectSharedAnalyzer(
	engine: AudioEngine,
	chain: AudioChain | AudioBus | null
): void {
	if (!engine.sharedAnalyzer) return

	// Disconnect from previous
	const webNode = getWebAudioNode(engine.sharedAnalyzer, engine)
	if (webNode) {
		try {
			webNode.disconnect()
		} catch {
			// ignore if not connected
		}
	}

	if (!chain) return

	// Connect chain output → shared analyzer
	connectNodes(chain.output, engine.sharedAnalyzer, engine)
}

export function genName(chain: AudioChain) {
	return chain.config.generator
		? 'tone' in chain.config.generator
			? chain.config.generator.tone
			: chain.config.generator.rnbo
		: undefined
}

export function cfgName(chain: GeneratorConfig | FxConfig | undefined) {
	if (!chain) {
		return
	}

	return 'tone' in chain ? chain.tone : chain.rnbo
}

/**
 * Try to allocate a voice slot for the given duration.
 * Returns true if a slot was available and has been reserved.
 * Uses AudioContext time for accurate note-length tracking.
 */
export function getVoice(chain: AudioChain, durationMs: number): boolean {
	if (!chain.generator) return false
	const now = chain.output.context.currentTime
	const v = chain.voices
	// Expire finished voices
	const alive: number[] = []
	for (let i = 0; i < v.endTimes.length; i++) {
		if (v.endTimes[i] > now) alive.push(v.endTimes[i])
	}
	v.endTimes = alive
	if (v.endTimes.length >= v.max) return false
	v.endTimes.push(now + durationMs / 1000)
	return true
}

/**
 * Trigger a note on a chain. Returns false if no voice was available.
 */
export function triggerChain(
	chain: AudioChain,
	note: number,
	velocity: number,
	durationMs: number
): boolean {
	if (!chain.generator) return false
	if (!getVoice(chain, durationMs)) return false
	chain.lastTrigger = Date.now()
	chain.audioSignal.lastNote = note
	const sig = chain.audioSignal
	const now = chain.output.context.currentTime
	// Expire old notes and push new one
	const alive: { midi: number; end: number }[] = []
	for (let i = 0; i < sig.activeNotes.length; i++) {
		if (sig.activeNotes[i].end > now) alive.push(sig.activeNotes[i])
	}
	alive.push({ midi: note, end: now + durationMs / 1000 })
	sig.activeNotes = alive

	const ci = computeChordInfo(alive, now)
	chain.chordInfo = ci
	if (chain.chordHistory.length >= KEEP_PAST) chain.chordHistory.shift()
	chain.chordHistory.push(ci)

	if (isDevice(chain.generator)) {
		// RNBO: send MIDI events
		const device = chain.generator
		const midiChannel = 0
		const vel = Math.min(127, Math.max(0, velocity))
		const noteOn: [MIDIByte, MIDIByte, MIDIByte] = [
			(144 + midiChannel) as MIDIByte,
			note as MIDIByte,
			vel as MIDIByte
		]
		const noteOff: [MIDIByte, MIDIByte, MIDIByte] = [
			(128 + midiChannel) as MIDIByte,
			note as MIDIByte,
			0 as MIDIByte
		]
		const now = device.context.currentTime * 1000
		device.scheduleEvent(new MIDIEvent(now, 0, noteOn))
		device.scheduleEvent(new MIDIEvent(now + durationMs, 0, noteOff))
	} else {
		// Tone.js: triggerAttackRelease
		const synth = chain.generator
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const s = synth as any
		if (typeof s.triggerAttackRelease === 'function') {
			if (note - Math.floor(note) || !note) {
				// triggerAttackRelease(duration, time?, velocity?):
				log('trigger-perc', genName(chain), note || durationMs / 1000, undefined, velocity / 127)
				s.triggerAttackRelease(note || durationMs / 1000, undefined, velocity / 127)
			} else {
				const freq = midiToFreq(note)
				log('trigger', genName(chain), freq, durationMs / 1000, undefined, velocity / 127)
				s.triggerAttackRelease(freq, durationMs / 1000, undefined, velocity / 127)
			}
		}
	}
	return true
}

/**
 * Dispose a single chain (disconnect all nodes)
 */
export function disposeChain(chain: AudioChain): void {
	if (chain.generator) {
		disposeNode(chain.generator)
	}
	for (const f of chain.fx) {
		disposeNode(f)
	}
	if (chain.analyzer) {
		disposeNode(chain.analyzer)
	}
	if (chain.solo) {
		chain.solo.dispose()
		chain.solo = null
	}
	chain.output.disconnect()
	chain.generator = null
	chain.fx = []
	chain.analyzer = null
}

/**
 * Dispose a bus
 */
function disposeBus(bus: AudioBus): void {
	for (const f of bus.fx) {
		disposeNode(f)
	}
	if (bus.analyzer) {
		disposeNode(bus.analyzer)
	}
	bus.input.disconnect()
	bus.output.disconnect()
	bus.fx = []
	bus.analyzer = null
}

/**
 * Dispose all chains, buses, master for scene change (keep ctx + masterGain alive)
 */
export function disposeScene(engine: AudioEngine): void {
	// Disconnect shared analyzer
	if (engine.sharedAnalyzer) {
		const webNode = getWebAudioNode(engine.sharedAnalyzer, engine)
		if (webNode) {
			try {
				webNode.disconnect()
			} catch {
				// ignore
			}
		}
	}

	for (const chain of engine.instanceChains) {
		disposeChain(chain)
	}
	engine.chains.clear()
	engine.instanceChains = []

	for (const bus of engine.buses.values()) {
		disposeBus(bus)
	}
	engine.buses.clear()

	if (engine.masterChain) {
		disposeBus(engine.masterChain)
		engine.masterChain = null
	}
}

export function soloChain(chains: AudioChain[], selected: AudioChain | undefined) {
	if (!chains.length) return

	for (const chain of chains) {
		if (chain.solo) {
			const setSolo = chain.output === selected?.output

			if (chain.solo.solo !== setSolo) {
				log('solo-set', setSolo, genName(chain) || cfgName(chain.config?.fx?.[0]))
				chain.solo.solo = setSolo
			} else {
				log('solo-keep', setSolo, genName(chain) || cfgName(chain.config?.fx?.[0]))
			}
		}
	}
}

// --- Param helpers (exported for testing) ---

export type ParamInfo = { path: string; value: number; min: number; max: number }

/**
 * Unflatten dot-path params: {'a.b': 1, 'a.c': 2, x: 3} → {a: {b: 1, c: 2}, x: 3}
 */
export function unflattenParams(flat: Record<string, ParamValue>): Record<string, unknown> {
	const result: Record<string, unknown> = {}
	for (const [key, val] of Object.entries(flat)) {
		const parts = key.split('.')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let cur: any = result
		for (let i = 0; i < parts.length - 1; i++) {
			if (cur[parts[i]] == null || typeof cur[parts[i]] !== 'object') {
				cur[parts[i]] = {}
			}
			cur = cur[parts[i]]
		}
		cur[parts[parts.length - 1]] = val
	}
	return result
}

/** PolySynth has .maxPolyphony and routes params via .set()/.get() on voice options */
function isPolySynth(node: ToneAudioNode): boolean {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return typeof (node as any).maxPolyphony === 'number'
}

/**
 * Set param on a live node by dot-path
 */
export function setNodeParam(node: ToneAudioNode | Device, path: string, value: ParamValue): void {
	log('setting', path, value)

	if (isDevice(node)) {
		const p = node.parameters.find((p) => p.name === path || p.id === path)
		if (p) p.value = value as number
	} else {
		// Tone.js: walk dot-path
		const parts = path.split('.')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let cur: any = isPolySynth(node) ? (node as any).options : node

		for (let i = 0; i < parts.length - 1; i++) {
			if (cur == null) return
			cur = cur[parts[i]]
		}

		if (cur != null) {
			if (cur[parts[parts.length - 1]]?.value !== undefined) {
				cur[parts[parts.length - 1]].value = value
			} else {
				cur[parts[parts.length - 1]] = value
			}
		}
	}
}

/**
 * Get param from a live node by dot-path
 */
export function getNodeParam(
	node: ToneAudioNode | Device,
	path: string,
	forceValue = true
): ParamValue | undefined {
	if (isDevice(node)) {
		const p = node.parameters.find((p) => p.name === path || p.id === path)
		return p ? p.value : undefined
	} else {
		const parts = path.split('.')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let cur: any = isPolySynth(node) ? (node as any).options : node
		for (const part of parts) {
			if (cur == null) return undefined
			cur = cur[part]
		}

		if (forceValue) {
			return (cur?.value ?? cur) as ParamValue | undefined
		} else {
			return cur as ParamValue | undefined
		}
	}
}

/**
 * List fx params for a bus by fx index
 */
export function listBusFxParams(bus: AudioBus, index: number): ParamInfo[] {
	if (!bus.fx[index]) return []
	const fc = bus.config.fx![index]
	return listNodeParams(bus.fx[index], fc.params, 'tone' in fc ? fc.tone : undefined)
}

/**
 * Set fx param on a bus by fx index + path
 */
export function setBusFxParam(bus: AudioBus, index: number, path: string, value: ParamValue): void {
	if (bus.fx[index]) setNodeParam(bus.fx[index], path, value)
}

/**
 * List all params from a live node
 */

function listNodeParams(
	node: ToneAudioNode | Device,
	configParams?: Record<string, ParamValue>,
	toneClass?: string
): ParamInfo[] {
	if (isDevice(node)) {
		return node.parameters.map((p) => ({
			path: p.name || p.id,
			value: p.value,
			min: p.min,
			max: p.max
		}))
	}
	// Tone.js: resolve params from known keys (config + defaults)
	const defaults = toneClass ? (TONE_DEFAULTS[toneClass] ?? {}) : {}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const known: Record<string, any> = { ...defaults, ...configParams }
	const params: ParamInfo[] = []

	for (const [path, defaultVal] of Object.entries(known)) {
		if (typeof defaultVal !== 'number') continue
		const raw = getNodeParam(node, path, false)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const param = raw as any
		const isAudioParam = param && typeof param === 'object' && 'setValueAtTime' in param
		const value = isAudioParam ? param.value : typeof raw === 'number' ? raw : defaultVal

		let min = isAudioParam ? param.minValue : 0
		let max = isAudioParam ? param.maxValue : 1

		if (isAudioParam) {
			const u = param.units
			if (u === 'decibels' || u === 'gain') {
				if (min < -1e30) min = -60
				if (max > 1e30) max = 60
			} else if (u === 'cents') {
				if (min < -1e30) min = -240
				if (max > 1e30) max = 240
			}
		} else if (path === 'dampening') {
			min = 0.1
			max = 7000
		} else if (path === 'resonance' && defaults[path] > 1) {
			max = 7000
		} else if (path === 'resonance' && defaults[path] < 1) {
			max = 0.999
		} else if (path === 'attackNoise') {
			min = 0.1
			max = 20
		} else if (path.endsWith('.baseFrequency')) {
			max = 7000
		} else if (path === 'frequency') {
			min = 0.1
			max = 7000
		}

		params.push({ path, value, min, max })
	}

	log('params', params)
	return params
}

// --- Internal helpers ---

function makeNodePresetInfo(
	engine: AudioEngine,
	config: { rnbo: string },
	node: ToneAudioNode | Device
): NodePresetInfo | null {
	if (!isDevice(node)) return null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const patcher = engine.rnboCache.get(config.rnbo) as any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const entries: { name: string; preset: any }[] = patcher?.presets ?? []
	if (entries.length === 0) return null
	const device = node
	return {
		names: entries.map((p) => p.name),
		active: null,
		set(name: string) {
			const entry = entries.find((p) => p.name === name)
			if (entry) {
				device.setPreset(entry.preset)
				this.active = name
			}
		}
	}
}

type NodeResult = {
	node: ToneAudioNode | Device
	presetNames: string[]
	activePreset: string | null
}

async function buildNode(
	engine: AudioEngine,
	config: GeneratorConfig | FxConfig
): Promise<NodeResult> {
	log('build-node', cfgName(config))

	if ('rnbo' in config) {
		const result = await loadRNBO(engine, config.rnbo, config.params, config.preset)
		return {
			node: result.device,
			presetNames: result.presetNames,
			activePreset: result.activePreset
		}
	} else {
		return {
			node: createToneNode(engine, config.tone, config.params, config.poly),
			presetNames: [],
			activePreset: null
		}
	}
}

type RNBOResult = {
	device: Device
	presetNames: string[]
	activePreset: string | null
}

async function loadRNBO(
	engine: AudioEngine,
	path: string,
	params?: Record<string, ParamValue>,
	preset?: string
): Promise<RNBOResult> {
	if (!engine.ctx) throw new Error('No AudioContext')

	let patcher = engine.rnboCache.get(path)
	if (!patcher) {
		const resp = await fetch(`./patchers/${path}.json`)
		patcher = await resp.json()
		engine.rnboCache.set(path, patcher)

		// Empty attempt to dispose RNBO device, reusing disposedRnbos instead
		// if (!engine.rnboCache.get('empty')) {
		// 	const resp = await fetch(`./patchers/empty.json`)
		// 	const patcher = await resp.json()
		// 	engine.rnboCache.set('empty', patcher)
		// }
	}

	const device = await createDevice(
		{ context: engine.ctx, patcher: patcher as IPatcher },
		disposedRnbos.shift()
	)

	// Extract and apply presets
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const patcherObj = patcher as any
	const presetEntries: { name: string; preset: unknown }[] = patcherObj?.presets ?? []
	const presetNames = presetEntries.map((p) => p.name)
	let activePreset: string | null = null

	if (presetEntries.length > 0) {
		const target =
			preset ??
			(presetEntries.find((p) => p.name === 'Default') ? 'Default' : presetEntries[0].name)
		const entry = presetEntries.find((p) => p.name === target)
		if (entry) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await device.setPreset(entry.preset as any)
			activePreset = entry.name
		}
	}

	// Apply explicit params AFTER preset (overrides)
	if (params) {
		for (const [key, val] of Object.entries(params)) {
			const p = device.parameters.find((p) => p.name === key || p.id === key)
			if (p) p.value = val as number
		}
	}

	return { device, presetNames, activePreset }
}

function createToneNode(
	engine: AudioEngine,
	name: string,
	params?: Record<string, ParamValue>,
	poly?: number
): ToneAudioNode {
	if (!engine.Tone) throw new Error('Tone.js not loaded')

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const ToneLib = engine.Tone as any

	if (poly !== undefined && poly > 1) {
		const VoiceClass = ToneLib[name]
		if (!VoiceClass) throw new Error(`Unknown Tone voice: ${name}`)
		const opts = params
			? { options: unflattenParams(params), voice: VoiceClass, maxPolyphony: poly }
			: { voice: VoiceClass, maxPolyphony: poly }

		return new ToneLib.PolySynth(opts) as ToneAudioNode
	}

	const NodeClass = ToneLib[name]
	if (!NodeClass) throw new Error(`Unknown Tone node: ${name}`)

	const opts = params ? unflattenParams(params) : undefined
	const node = opts ? new NodeClass(opts) : new NodeClass()
	return node as ToneAudioNode
}

function isDevice(node: ToneAudioNode | Device): node is Device {
	return 'scheduleEvent' in node
}

function connectNodes(
	from: ToneAudioNode | Device | AnalyserNode | GainNode,
	to: ToneAudioNode | Device | AnalyserNode | GainNode,
	engine: AudioEngine
): void {
	const fromWeb = getOutputNode(from, engine)
	const toWeb = getInputNode(to, engine)

	if (fromWeb && toWeb) {
		log('connect', from, '→', to)
		fromWeb.connect(toWeb)
	} else {
		console.error('Connect failed!')
	}
}

/** Get the OUTPUT AudioNode (for connecting FROM this node) */
function getOutputNode(
	node: ToneAudioNode | Device | AnalyserNode | GainNode,
	_engine: AudioEngine
): AudioNode | null {
	if (node instanceof GainNode || node instanceof AnalyserNode) return node
	if (isDevice(node as ToneAudioNode | Device)) return (node as Device).node

	// Tone.js node — recurse through .output until we hit a raw AudioNode
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let cur: any = node

	for (let i = 0; i < 10; i++) {
		if (cur?._analysers?.length) {
			log('output-analyser', node)
			return cur._analysers[0]
		}

		if (cur instanceof AudioNode) {
			log('output-audio', node)
			return cur
		}

		if (cur._gainNode instanceof AudioNode) {
			log('output-_gain', node)
			return cur._gainNode
		}

		if (cur.output != null) {
			log('output-deeper', node)
			cur = cur.output
			continue
		}

		break
	}

	console.error('No output node!', node)
	return null
}

/** Get the INPUT AudioNode (for connecting TO this node) */
function getInputNode(
	node: ToneAudioNode | Device | AnalyserNode | GainNode,
	_engine: AudioEngine
): AudioNode | null {
	if (node instanceof GainNode || node instanceof AnalyserNode) return node
	if (isDevice(node as ToneAudioNode | Device)) return (node as Device).node

	// Tone.js effects/nodes have .input — use it so signal goes through processing
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const n = node as any

	// Try .input first (Tone.js effects have separate input/output)
	if (n.input != null) {
		let cur = n.input
		for (let i = 0; i < 10; i++) {
			if (cur instanceof AudioNode) {
				log('input-audio', node)
				return cur
			}
			if (cur._gainNode instanceof AudioNode) {
				log('input-_gain', node)
				return cur._gainNode
			}
			if (cur.input != null) {
				log('input-deeper', node)
				cur = cur.input
				continue
			}
			break
		}
	}

	// Fallback to output traversal (simple nodes where input === output)
	return getOutputNode(node, _engine)
}

/** Get web audio node — used for analyzer access (output side) */
function getWebAudioNode(
	node: ToneAudioNode | Device | AnalyserNode | GainNode,
	engine: AudioEngine
): AudioNode | null {
	return getOutputNode(node, engine)
}

const disposedRnbos: Device[] = []

function disposeNode(node: ToneAudioNode | Device): void {
	if (isDevice(node)) {
		node.node.disconnect()
		node.parameterChangeEvent.removeAllSubscriptions()

		for (const { id } of [...node.dataBufferDescriptions]) {
			node.releaseDataBuffer(id).then()
		}

		// empty attempt using disposedRnbos instead
		// createDevice({context: node.context, patcher: <IPatcher>engineCache.rnboCache?.get('empty')}, node).then()
		disposedRnbos.push(node)
	} else {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const n = node as any
		if (typeof n.dispose === 'function') n.dispose()
		else if (typeof n.disconnect === 'function') n.disconnect()
	}
}

function midiToFreq(note: number): number {
	return 440 * Math.pow(2, (note - 69) / 12)
}

// --- Chord / note label ---

import { detect } from '@tonaljs/chord-detect'
import { detect as scale } from '@tonaljs/scale'
import { tones, toneNames } from '../../scenes/utils/tones'
import type { ChordInfo } from './types'
import type { SceneCtx } from '../scene-ctx'

function computeChordInfo(activeNotes: { midi: number; end: number }[], now: number): ChordInfo {
	const alive: { midi: number; end: number }[] = []
	for (let i = 0; i < activeNotes.length; i++) {
		if (activeNotes[i].end > now) alive.push(activeNotes[i])
	}
	const notes: number[] = []
	const pcs = new Set<string>()
	let lastNote = 0
	for (let i = 0; i < alive.length; i++) {
		notes.push(alive[i].midi)
		pcs.add(toneNames[alive[i].midi % 12])
		lastNote = alive[i].midi
	}
	let chord = ''
	if (pcs.size >= 2) {
		const chords = detect(Array.from(pcs))
		if (chords.length > 0) chord = chords[0]
	} else if (lastNote > 0) {
		chord = tones[lastNote] ?? ''
	}
	return { notes, chord, time: now }
}

function isPerc(note: number) {
	return note - Math.floor(note) || !note
}

export function updateGlobalChord(ctx: SceneCtx, audioCtx: BaseAudioContext): void {
	const now = audioCtx.currentTime
	const allNotes: { midi: number; end: number }[] = []
	for (let i = 0; i < ctx.instruments.length; i++) {
		const chain = ctx.instruments[i].audio
		if (chain) {
			for (let j = 0; j < chain.audioSignal.activeNotes.length; j++) {
				if (!isPerc(chain.audioSignal.activeNotes[j].midi)) {
					allNotes.push(chain.audioSignal.activeNotes[j])
				}
			}
		}
	}
	for (let i = 0; i < ctx.marbles.length; i++) {
		const chain = ctx.marbles[i].audio
		if (chain) {
			for (let j = 0; j < chain.audioSignal.activeNotes.length; j++) {
				if (!isPerc(chain.audioSignal.activeNotes[j].midi)) {
					allNotes.push(chain.audioSignal.activeNotes[j])
				}
			}
		}
	}
	const ci = computeChordInfo(allNotes, now)

	if (ci.chord) {
		ctx.chord.current = ci
	}

	if (ctx.chord.history.length >= KEEP_PAST) ctx.chord.history.shift()
	ctx.chord.history.push(ci)

	ctx.chord.scale = getScale(ctx)
}

function getScale(ctx: SceneCtx) {
	const completeNotes = new Set<number>()

	for (const h of ctx.chord.history) {
		for (const n of h.notes) {
			completeNotes.add(n % 12)
		}
	}

	const notes = []

	for (const v of Array.from(completeNotes.values()).sort()) {
		notes.push(toneNames[v])
	}

	const name = scale(notes)[0]

	return {
		name,
		notes
	}
}

/**
 * Get a label for a chain: chord name if 3+ unique pitch classes sounding, else note name
 */
export function getChainLabel(chain: AudioChain): string {
	const sig = chain.audioSignal
	const now = chain.output.context.currentTime

	// Expire old notes
	const alive: { midi: number; end: number }[] = []
	for (let i = 0; i < sig.activeNotes.length; i++) {
		if (sig.activeNotes[i].end > now) alive.push(sig.activeNotes[i])
	}
	sig.activeNotes = alive

	// Collect unique pitch classes
	const pcs = new Set<string>()
	for (let i = 0; i < alive.length; i++) {
		pcs.add(toneNames[alive[i].midi % 12])
	}

	if (pcs.size >= 2) {
		const chords = detect(Array.from(pcs))
		if (chords.length > 0) return chords[0]
	}

	if (sig.lastNote > 0) return tones[sig.lastNote] ?? ''
	return ''
}
