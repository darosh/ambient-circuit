import type {
	AudioEngine,
	AudioChain,
	AudioChainConfig,
	GeneratorConfig,
	FxConfig,
	ParamValue,
	ParamMap
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
		rnboCache: new Map()
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
	const Tone = await import('tone')
	Tone.setContext(ctx)
	await Tone.start()
	engine.Tone = Tone

	// Master gain → destination
	const masterGain = ctx.createGain()
	masterGain.connect(ctx.destination)
	engine.masterGain = masterGain

	engine.initialized = true
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

	const output = engine.ctx.createGain()
	output.connect(engine.masterGain)

	let generator: ToneAudioNode | Device | null = null
	if (config.generator) {
		generator = await buildNode(engine, config.generator)
	}

	const fx: (ToneAudioNode | Device)[] = []
	if (config.fx) {
		for (const fxConfig of config.fx) {
			fx.push(await buildNode(engine, fxConfig))
		}
	}

	const analyzer = engine.ctx.createAnalyser()

	// Connect chain: generator → fx[0] → fx[1] → ... → analyzer? → output
	const nodes: Array<ToneAudioNode | Device | AnalyserNode | GainNode> = []
	if (generator) nodes.push(generator)
	for (const f of fx) nodes.push(f)
	if (analyzer) nodes.push(analyzer)
	nodes.push(output)

	for (let i = 0; i < nodes.length - 1; i++) {
		connectNodes(nodes[i], nodes[i + 1], engine)
	}

	const chain: AudioChain = {
		config,
		generator,
		fx,
		analyzer,
		output,
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
			return chain.fx[index] ? listNodeParams(chain.fx[index]) : []
		}
	}

	// Register named chains
	if (config.id) {
		engine.chains.set(config.id, chain)
	}
	engine.instanceChains.push(chain)

	return chain
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
		chain.analyzer.disconnect()
	}
	chain.output.disconnect()
	chain.generator = null
	chain.fx = []
	chain.analyzer = null
}

/**
 * Dispose all chains for scene change (keep ctx + masterGain alive)
 */
export function disposeScene(engine: AudioEngine): void {
	for (const chain of engine.instanceChains) {
		disposeChain(chain)
	}
	engine.chains.clear()
	engine.instanceChains = []
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
			const min = (val.minValue ?? 0 < -1e5) ? -100 : (val.minValue ?? 0)
			const max = (val.maxValue ?? 0 > 1e5) ? 0 : (val.maxValue ?? 0)
			params.push({ path: key, value: val.value, min, max })
		}
	}
	return params
}

// --- Internal helpers ---

async function buildNode(
	engine: AudioEngine,
	config: GeneratorConfig | FxConfig
): Promise<ToneAudioNode | Device> {
	if (config.engine === 'rnbo') {
		return await loadRNBO(engine, config.path, config.params)
	} else {
		return createToneNode(engine, config.name, config.params)
	}
}

async function loadRNBO(
	engine: AudioEngine,
	path: string,
	params?: Record<string, ParamValue>
): Promise<Device> {
	if (!engine.ctx) throw new Error('No AudioContext')

	let patcher = engine.rnboCache.get(path)
	if (!patcher) {
		const resp = await fetch(`/patchers/${path}.json`)
		patcher = await resp.json()
		engine.rnboCache.set(path, patcher)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const device = await createDevice({ context: engine.ctx, patcher: patcher as any })

	if (params) {
		for (const [key, val] of Object.entries(params)) {
			const p = device.parameters.find((p) => p.name === key || p.id === key)
			if (p) p.value = val as number
		}
	}

	return device
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
