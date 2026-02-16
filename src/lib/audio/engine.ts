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
	ParamMap,
	AnalyzerType,
	NodePresetInfo
} from './types'
import type { ToneAudioNode, Param } from 'tone'
import { createDevice, MIDIEvent } from '@rnbo/js'
import type { Device, MIDIByte } from '@rnbo/js'

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
		sharedAnalyzer: null
	}
}

/**
 * Initialize audio (called once on first play)
 */
export async function initAudio(engine: AudioEngine): Promise<void> {
	if (engine.initialized) return

	const ctx = new AudioContext()
	engine.ctx = ctx

	// Dynamic import Tone.js and set shared context

	if (typeof self === 'object') {
		;(<Record<string, boolean>>(<unknown>self)).TONE_SILENCE_LOGGING = true
	}

	const Tone = await import('tone')
	Tone.setContext(ctx)
	await Tone.start()
	engine.Tone = Tone

	// Master gain → destination
	const masterGain = ctx.createGain()
	masterGain.connect(ctx.destination)
	engine.masterGain = masterGain

	// Shared analyzer for UI visualization
	engine.sharedAnalyzer = new Tone.Analyser('fft', 64) as unknown as ToneAudioNode

	engine.initialized = true
}

/**
 * Build master chain and buses from scene audio config
 */
export async function buildBuses(
	engine: AudioEngine,
	config: { buses?: Record<string, BusConfig>; master?: MasterConfig }
): Promise<void> {
	if (!engine.ctx || !engine.masterGain) throw new Error('Audio engine not initialized')

	// 1. Build master chain
	if (config.master) {
		engine.masterChain = await buildBus(engine, config.master, engine.masterGain)
	}

	// 2. Build buses → output to master chain input (or masterGain)
	const busTarget = engine.masterChain ? engine.masterChain.input : engine.masterGain
	if (config.buses) {
		for (const [name, busConfig] of Object.entries(config.buses)) {
			const bus = await buildBus(engine, busConfig, busTarget)
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
	destination: GainNode | AudioNode
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
		analyzer = await buildAnalyzer(engine, config.analyzer)
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
	config: AudioChainConfig
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
		analyzer = await buildAnalyzer(engine, config.analyzer)
	}

	// Connect chain: generator → fx[0] → fx[1] → ... → analyzer? → output
	const nodes: Array<ToneAudioNode | Device | GainNode> = []
	if (generator) nodes.push(generator)
	for (const f of fx) nodes.push(f)
	if (analyzer) nodes.push(analyzer)
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

	const chain: AudioChain = {
		config,
		generator,
		fx,
		analyzer,
		output,
		nodePresets,
		onParamChange: null,
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
			return addParamsFromConfig(
				chain.generator ? listNodeParams(chain.generator) : [],
				config?.generator?.params ?? {},
				<ToneAudioNode>chain.generator
			)
		},
		listFxParams(index) {
			return addParamsFromConfig(
				chain.fx[index] ? listNodeParams(chain.fx[index]) : [],
				config?.fx?.[index]?.params ?? {},
				<ToneAudioNode>chain.fx[index]
			)
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
	config: AnalyzerType
): Promise<ToneAudioNode | null> {
	if (!config || !engine.Tone) return null
	const Tone = engine.Tone

	if (config === true || config === 'fft') {
		return new Tone.Analyser('fft', 64) as unknown as ToneAudioNode
	} else if (config === 'waveform') {
		return new Tone.Analyser('waveform', 256) as unknown as ToneAudioNode
	} else if (config === 'meter') {
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

/**
 * Trigger a note on a chain
 */
export function triggerChain(
	chain: AudioChain,
	note: number,
	velocity: number,
	durationMs: number
): void {
	if (!chain.generator) return

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
			const freq = midiToFreq(note)
			s.triggerAttackRelease(freq, durationMs / 1000, undefined, velocity / 127)
		}
	}
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

// --- Param helpers (exported for testing) ---

export type ParamInfo = { path: string; value: number; min: number; max: number }

export function addParamsFromConfig(
	paramInfos: ParamInfo[],
	paramMap: ParamMap,
	generator: ToneAudioNode
): ParamInfo[] {
	const add: ParamInfo[] = []

	for (const [key, value] of Object.entries(paramMap)) {
		if (!paramInfos.some((x) => x.path === key) && typeof value === 'number') {
			const param = <Param>(<unknown>getNodeParam(generator, 'key', false))

			add.push({
				path: key,
				value,
				min: param?.minValue ?? 0,
				max: param?.maxValue ?? 1
			})
		}
	}

	if (add.length) {
		return [...add, ...paramInfos]
	}

	return paramInfos
}

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

/**
 * Set param on a live node by dot-path
 */
export function setNodeParam(node: ToneAudioNode | Device, path: string, value: ParamValue): void {
	if (isDevice(node)) {
		const p = node.parameters.find((p) => p.name === path || p.id === path)
		if (p) p.value = value as number
	} else {
		// Tone.js: walk dot-path
		const parts = path.split('.')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let cur: any = node
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
		let cur: any = node
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
	return addParamsFromConfig(
		bus.fx[index] ? listNodeParams(bus.fx[index]) : [],
		bus.config?.fx?.[index]?.params ?? {},
		<ToneAudioNode>bus.fx[index]
	)
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
function listNodeParams(node: ToneAudioNode | Device): ParamInfo[] {
	if (isDevice(node)) {
		return node.parameters.map((p) => ({
			path: p.name || p.id,
			value: p.value,
			min: p.min,
			max: p.max
		}))
	}
	// Tone.js: enumerate AudioParam-like properties
	const params: { path: string; value: number; min: number; max: number }[] = []
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const obj = node as any
	for (const key of Object.keys(obj)) {
		if (
			key.startsWith('_') ||
			key === 'context' ||
			key === 'input' ||
			key === 'output' ||
			key === 'frequency'
		)
			continue
		const val = obj[key]
		if (
			val &&
			typeof val === 'object' &&
			typeof val.value === 'number' &&
			'setValueAtTime' in val
		) {
			const min = (val.minValue ?? 0) < -1e5 ? -100 : (val.minValue ?? 0)
			const max = (val.maxValue ?? 0) > 1e5 ? 0 : (val.maxValue ?? 0)
			params.push({ path: key, value: val.value, min, max })
		}
	}
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
	if ('rnbo' in config) {
		const result = await loadRNBO(engine, config.rnbo, config.params, config.preset)
		return {
			node: result.device,
			presetNames: result.presetNames,
			activePreset: result.activePreset
		}
	} else {
		return {
			node: createToneNode(engine, config.tone, config.params),
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
		const resp = await fetch(`/patchers/${path}.json`)
		patcher = await resp.json()
		engine.rnboCache.set(path, patcher)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const device = await createDevice({ context: engine.ctx, patcher: patcher as any })

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
	params?: Record<string, ParamValue>
): ToneAudioNode {
	if (!engine.Tone) throw new Error('Tone.js not loaded')

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const ToneLib = engine.Tone as any
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
	const fromWeb = getWebAudioNode(from, engine)
	const toWeb = getWebAudioNode(to, engine)
	if (fromWeb && toWeb) {
		fromWeb.connect(toWeb)
	}
}

function getWebAudioNode(
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
			return cur._analysers[0]
		}

		if (cur instanceof AudioNode) return cur
		if (cur._gainNode instanceof AudioNode) return cur._gainNode
		if (cur.output != null) {
			cur = cur.output
			continue
		}
		break
	}
	return null
}

function disposeNode(node: ToneAudioNode | Device): void {
	if (isDevice(node)) {
		node.node.disconnect()
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
