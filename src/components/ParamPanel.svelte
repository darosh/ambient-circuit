<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core'
	import { connectSharedAnalyzer } from '../lib/audio'
	import type { AudioEngine, AudioChain, AudioBus, ParamValue } from '../lib/audio'
	import { cfgName, genName, setBusFxParam, soloChain, triggerChain } from '../lib/audio/engine'
	import type { ParamInfo } from '../lib/audio/engine'
	import { readChainParams, readBusParams } from '../lib/helpers/audio-params'
	import { buildImpactMaterial } from '../lib/video/material-impact'
	import { panelState } from '../lib/hud/panel-state.svelte'
	import GeoText from './GeoText.svelte'
	import { onDestroy } from 'svelte'
	import { parseHex, formatHex, convertRgbToOklab, convertOklabToRgb, type Rgb } from 'culori/fn'
	import type { NodePresetInfo } from '../lib/audio/types'
	import { GridHelperXY } from '../lib/three/GridHelperXY'
	import { extend } from '@threlte/core'
	import { debug } from 'debug'
	import AnalyserView from './AnalyserView.svelte'

	const log = debug('<ParamPanel>')

	extend({ GridHelperXY })

	// Layout (sphereR multiples unless noted)
	export const MARGIN_X = 17
	export const MARGIN_Y = 12
	export const TEXT_SIZE = 1.2
	export const ROW_H = 2
	export const SLIDER_H = 0.2
	export const TRACK_H = 0.2
	export const THUMB_R = 0.333
	export const BG_OPACITY = 0.9
	export const BG_COLOR = '#000000'
	export const DUMMY_OPACITY = 0

	// Animation
	export const FLASH_DUR = 0.4

	// Scroll
	export const SCROLL_SPEED = 3

	// Char width ratio (same as HudScene)
	export const CHAR_WIDTH = 0.69

	const LEFT = '◃'
	const RIGHT = '▹'
	const UP = '▵'
	const DOWN = '▿'
	const ELLIP = '…'

	const HUD_ZOOM = 80
	const VAL_DECIMALS = 3

	export type PanelTarget =
		| { type: 'chain'; index: number }
		| { type: 'bus'; name: string }
		| { type: 'master' }

	export type NodeEntry = {
		label: string
		nodeIndex: number // -1 = generator, 0+ = fx index
		presets: NodePresetInfo | undefined
		params: ParamInfo[]
		paramValues: Record<string, number>
	}

	let {
		engine,
		baseColor = '#ffffff',
		sphereR = 0.2,
		visible = false,
		selectedChain,
		close,
		onTargetChange
	}: {
		engine: AudioEngine | null
		baseColor?: string
		sphereR?: number
		visible?: boolean
		close?: () => void
		selectedChain?: AudioChain
		onTargetChange?: (target: string) => void
	} = $props()

	const { size } = useThrelte()

	function textW(s: string) {
		return s.length + (s.includes(ELLIP) ? 1 : 0)
	}

	// --- State ---
	let target = $state<PanelTarget | null>(null)
	let activeNodeIdx = $state(0)
	let scrollOffset = $state(0)
	let paramVersion = $state(0)
	let soloMode = $state(false)
	let soloHovered = $state(false)
	let tabScrollOffset = $state(0)
	let presetScrollOffset = $state(0)
	let sidebarScrollOffset = $state(0)
	let tabsHovered = false
	let presetsHovered = false
	let sidebarHovered = false
	let localParamVersion = $state(0)
	let dragging = $state<{
		paramPath: string
		nodeIndex: number
		startX: number
		startVal: number
		fine: boolean
	} | null>(null)
	let didDrag = false

	// --- Derived layout ---
	const vpW = $derived($size.width / HUD_ZOOM)
	const vpH = $derived($size.height / HUD_ZOOM)
	const textSize = $derived(TEXT_SIZE * sphereR)
	const textMid = $derived(textSize * 0.43)
	const charW = $derived(textSize * CHAR_WIDTH)
	const rowH = $derived(ROW_H * sphereR)
	const gridColor = $derived.by(() => {
		const rgb = <Rgb>parseHex(baseColor)
		const oklab = convertRgbToOklab(rgb)
		oklab.l = 0.4
		const backRgb = convertOklabToRgb(oklab)

		return formatHex(backRgb)
	})

	// Compute label/value widths from actual content
	const maxLabelChars = $derived.by(() => {
		if (!activeNode) return 8
		let mx = 0
		for (const p of activeNode.params) {
			const sn = shortName(p.path)
			const snLength = textW(sn)

			if (snLength > mx) mx = snLength
		}
		return Math.max(mx, 4)
	})
	const labelW = $derived(maxLabelChars * charW + sphereR)
	// Value: toFixed(3) max width — e.g. "-1000.000" = 9 chars, but use actual max
	const maxValChars = $derived.by(() => {
		if (!activeNode) return 8
		let mx = 0
		for (const p of activeNode.params) {
			const v = activeNode.paramValues[p.path] ?? p.value
			const len = fmt(v).length
			if (len > mx) mx = len
		}
		// Also check min/max extremes
		for (const p of activeNode.params) {
			const lMin = fmt(p.min).length
			const lMax = fmt(p.max).length
			if (lMin > mx) mx = lMin
			if (lMax > mx) mx = lMax
		}
		return Math.max(mx, 5)
	})
	const valueW = $derived(maxValChars * charW)

	// Panel size
	const panelW = $derived.by(() => {
		const available = vpW - MARGIN_X * sphereR
		return available / charW > 52
			? Math.max(1, Math.floor(available / charW / 2) * charW * 2)
			: Math.max(1, Math.floor((vpW - charW * 4) / charW / 2) * charW * 2)
	})
	const panelH = $derived.by(() => {
		const available = vpH - MARGIN_Y * sphereR
		return available / rowH > 16
			? Math.max(1, Math.floor(available / rowH) * rowH)
			: Math.max(1, Math.floor((vpH - sphereR * 3) / rowH) * rowH)
	})

	const panelCols = $derived(Math.round(panelW / charW / 2))
	const panelRows = $derived(Math.round(panelH / rowH))
	const MAX_VISIBLE_PARAMS = $derived(panelRows - 5)
	const globalOffset = $derived(panelH / rowH >= 16 ? +2 * sphereR : (vpH - panelH) / 2)

	// --- Materials (init with placeholder color, $effect syncs baseColor) ---
	const _c = '#ffffff'
	const textFx = buildImpactMaterial(_c, _c, 0.5, true, 0.9, 0.3, 2)
	const sliderFillFx = buildImpactMaterial(_c, _c, 0.6, true, 0.9, 0.3, 1.5)
	const thumbFx = buildImpactMaterial(_c, _c, 0.8, true, 0.9, 0.5, 2)
	const activeFx = buildImpactMaterial(_c, _c, 0.9, true, 0.9, 0.6, 2.5)
	const analyzerFx = buildImpactMaterial(_c, _c, 0.9, true, 0.9, 0.6, 2.5)
	const closeFx = buildImpactMaterial(_c, _c, 0.5, true, 0.9, 0.3, 2)
	const copyFx = buildImpactMaterial(_c, _c, 0.5, true, 0.9, 0.3, 2)
	const trigFx = buildImpactMaterial(_c, _c, 0.5, true, 0.9, 0.3, 2)
	const soloFx = buildImpactMaterial(_c, _c, 0.5, true, 0.9, 0.3, 2)

	// Per-tab materials (avoid shared hover highlight)
	const MAX_TABS = 8
	const tabFxPool: ReturnType<typeof buildImpactMaterial>[] = []
	for (let i = 0; i < MAX_TABS; i++) {
		tabFxPool.push(buildImpactMaterial(_c, _c, 0.7, true, 0.9, 0.4, 2))
	}

	// Per-sidebar-item materials (avoid shared hover highlight)
	const MAX_SIDEBAR = 20
	const sidebarFxPool: ReturnType<typeof buildImpactMaterial>[] = []
	for (let i = 0; i < MAX_SIDEBAR; i++) {
		sidebarFxPool.push(buildImpactMaterial(_c, _c, 0.5, true, 0.9, 0.3, 2))
	}

	// Per +/- button and preset materials
	const MAX_PARAM_ROWS = 16
	const plusFxPool: ReturnType<typeof buildImpactMaterial>[] = []
	const minusFxPool: ReturnType<typeof buildImpactMaterial>[] = []
	for (let i = 0; i < MAX_PARAM_ROWS; i++) {
		plusFxPool.push(buildImpactMaterial(_c, _c, 0.5, true, 0.9, 0.3, 2))
		minusFxPool.push(buildImpactMaterial(_c, _c, 0.5, true, 0.9, 0.3, 2))
	}
	const MAX_PRESETS = 16
	const presetFxPool: ReturnType<typeof buildImpactMaterial>[] = []
	for (let i = 0; i < MAX_PRESETS; i++) {
		presetFxPool.push(buildImpactMaterial(_c, _c, 0.5, true, 0.9, 0.3, 2))
	}

	let copyFlash = 0
	let trigFlash = 0

	// --- Sidebar items ---
	type SidebarItem = { label: string; targetKey: string; panelTarget: PanelTarget }

	const sidebarItems = $derived.by(() => {
		if (!engine) return [] as SidebarItem[]
		const items: SidebarItem[] = []
		const chains = engine.instanceChains.filter((c) => c.generator)
		for (let i = 0; i < chains.length; i++) {
			const label = chains[i].config.id ?? `ch:${i}`
			items.push({ label, targetKey: `chain:${i}`, panelTarget: { type: 'chain', index: i } })
		}
		for (const name of engine.buses.keys()) {
			items.push({
				label: `bus:${name}`,
				targetKey: `bus:${name}`,
				panelTarget: { type: 'bus', name }
			})
		}
		if (engine.masterChain) {
			items.push({ label: 'master', targetKey: 'master', panelTarget: { type: 'master' } })
		}
		return items
	})

	const sidebarW = $derived((Math.max(4, ...sidebarItems.map((x) => x.label.length)) + 4) * charW)
	const contentX = $derived(-panelW / 2 + sidebarW)
	const contentY = $derived(panelH / 2)
	const contentW = $derived(panelW - sidebarW)
	const contentRight = $derived(contentX + contentW)

	// Header layout: node tabs left
	const tabsAvailW = $derived(contentW - charW * 2)

	// Node tab labels with smart abbreviation
	const nodeTabLabels = $derived.by(() => {
		if (!nodes.length) return [] as string[]
		const raw = nodes.map((n) => n.label)
		return getLabels(raw, tabsAvailW)
	})

	function getLabels(raw: string[], tabsAvailW: number) {
		const totalRaw = raw.reduce((s, l) => s + l.length, 0) * charW + (raw.length - 1) * charW * 2

		if (totalRaw <= tabsAvailW) return raw

		// Need to abbreviate — find max chars per label that fits
		const gapTotal = (raw.length - 1) * charW * 2
		const availChars = Math.floor((tabsAvailW - gapTotal) / charW)
		const maxPerTab = Math.max(1, Math.floor(availChars / raw.length))

		return raw.map((l) =>
			l.length > maxPerTab ? (maxPerTab > 1 ? l.slice(0, maxPerTab - 1) + '.' : l[0]) : l
		)
	}

	// Slider layout: label | slider | value(right-aligned) | - | +
	const sliderW = $derived(Math.max(1, contentW - labelW - valueW - charW * 2 - charW * 7))

	const actionButtons = [
		{
			label: 'CLOSE',
			onclick: () => close && close(),
			mat: closeFx
		},
		{
			label: 'COPY',
			onclick: () => copyParams(),
			mat: copyFx
		},
		{
			label: 'SOLO',
			onclick: () => {
				toggleSolo()
			},
			mat: soloFx,
			solo: true
		},
		{
			label: 'TRIG',
			mat: trigFx,
			onclick: () => trigCurrent()
		}
	]

	// Resolve chain/bus
	function getChain(): AudioChain | null {
		if (!engine || !target || target.type !== 'chain') return null
		const chains = engine.instanceChains.filter((c) => c.generator)
		return chains[target.index] ?? null
	}
	function getBus(): AudioBus | null {
		if (!engine || !target) return null
		if (target.type === 'bus') return engine.buses.get(target.name) ?? null
		if (target.type === 'master') return engine.masterChain
		return null
	}

	const targetKey = $derived.by(() => {
		if (!target) return ''
		if (target.type === 'chain') return `chain:${target.index}`
		if (target.type === 'bus') return `bus:${target.name}`
		return 'master'
	})

	const analyzer = $derived(engine?.sharedAnalyzer)

	// --- Node entries ---
	let nodes = $state.raw<NodeEntry[]>([])

	function refreshNodes() {
		log('refreshNodes')
		const chain = getChain()
		const bus = getBus()
		if (chain) {
			connectSharedAnalyzer(engine!, chain)
			log('refresh chain', chain)
			const result = readChainParams(chain)
			const entries: NodeEntry[] = []
			if (result.genParamInfos.length > 0 || chain.nodePresets.has(-1)) {
				entries.push({
					label: genName(chain) ?? 'Gen',
					nodeIndex: -1,
					presets: chain.nodePresets.get(-1),
					params: result.genParamInfos,
					paramValues: result.genParams
				})
			}
			const fxList = chain.config.fx ?? []
			for (let i = 0; i < fxList.length; i++) {
				const k = i.toString()
				const fxPreset = chain.nodePresets.get(i)
				if (result.fxParamInfos[k] || fxPreset) {
					entries.push({
						label: cfgName(fxList[i]) ?? `fx:${i}`,
						nodeIndex: i,
						presets: fxPreset,
						params: result.fxParamInfos[k] ?? [],
						paramValues: result.fxParams[k] ?? {}
					})
				}
			}
			nodes = entries
		} else if (bus) {
			connectSharedAnalyzer(engine!, bus)
			const result = readBusParams(bus)
			const entries: NodeEntry[] = []
			const fxList = bus.config.fx ?? []
			for (let i = 0; i < fxList.length; i++) {
				const k = i.toString()
				const presetInfo = bus.nodePresets.get(i)
				if (result.busFxParamInfos[k] || presetInfo) {
					entries.push({
						label: cfgName(fxList[i]) ?? `fx:${i}`,
						nodeIndex: i,
						presets: presetInfo,
						params: result.busFxParamInfos[k] ?? [],
						paramValues: result.busFxParams[k] ?? {}
					})
				}
			}
			nodes = entries
		} else {
			connectSharedAnalyzer(engine!, null)
			nodes = []
		}

		log('updated nodes', nodes)

		if (activeNodeIdx >= nodes.length && activeNodeIdx !== 0) {
			activeNodeIdx = 0
		}
	}

	let prevTargetKey = ''
	let prevParamVersion = -1
	let prevLocalParamVersion = -1
	let prevEngine: typeof engine = null

	$effect(() => {
		const tk = targetKey
		const pv = paramVersion
		const pvl = localParamVersion
		const eng = engine
		if (
			tk === prevTargetKey &&
			pv === prevParamVersion &&
			pvl === prevLocalParamVersion &&
			eng === prevEngine
		)
			return
		prevTargetKey = tk
		prevParamVersion = pv
		prevLocalParamVersion = pvl
		prevEngine = eng
		refreshNodes()
	})

	$effect(() => {
		const tk = targetKey
		if (!engine || !tk) return
		const chain = getChain()
		if (chain) {
			chain.onParamChange = () => {
				paramVersion++
			}
			return () => {
				chain.onParamChange = null
			}
		}
		const bus = getBus()
		if (bus) {
			bus.onParamChange = () => {
				paramVersion++
			}
			return () => {
				bus.onParamChange = null
			}
		}
	})

	// Sync external selectedChain prop → target (only when selectedChain actually changes)
	let prevSelectedChainOutput: AudioNode | null = null
	$effect(() => {
		if (!selectedChain || !engine) return
		if (selectedChain.output === prevSelectedChainOutput) return
		prevSelectedChainOutput = selectedChain.output
		const chains = engine.instanceChains.filter((c) => c.generator)
		const idx = chains.findIndex((c) => c.output === selectedChain.output)
		if (idx >= 0) {
			target = { type: 'chain', index: idx }
		}
	})

	$effect(() => {
		if (!target && sidebarItems.length > 0) {
			target = sidebarItems[0].panelTarget
		}
	})

	// Solo: sync to engine
	$effect(() => {
		if (!engine) return
		const allChains = engine.instanceChains.filter((c) => c.generator)
		const chain = getChain()
		soloChain(allChains, soloMode ? (chain ?? undefined) : undefined)
	})

	const activeNode = $derived(nodes[activeNodeIdx])
	const visibleParams = $derived.by(() => {
		if (!activeNode) return []
		const start = Math.floor(scrollOffset)
		return activeNode.params.slice(start, start + MAX_VISIBLE_PARAMS)
	})
	const canScrollUp = $derived(scrollOffset > 0)
	const canScrollDown = $derived(
		activeNode ? scrollOffset < activeNode.params.length - MAX_VISIBLE_PARAMS : false
	)

	// Reset tab scroll when nodes change
	$effect(() => {
		void nodes
		tabScrollOffset = 0
	})
	// Reset preset scroll when active node changes
	$effect(() => {
		void activeNodeIdx
		presetScrollOffset = 0
	})

	// Sidebar scroll
	const MAX_VISIBLE_SIDEBAR = $derived(panelRows - 3)

	const visibleSidebarItems = $derived(
		sidebarItems.slice(sidebarScrollOffset, sidebarScrollOffset + MAX_VISIBLE_SIDEBAR)
	)

	const canScrollSidebarUp = $derived(sidebarScrollOffset > 0)

	const canScrollSidebarDown = $derived(
		sidebarScrollOffset + MAX_VISIBLE_SIDEBAR < sidebarItems.length
	)

	// Tab scroll

	const visibleTabData = $derived.by(() => {
		const total = nodes.length
		if (total === 0) return { indices: [] as number[], showLeft: false, showRight: false }
		const offset = tabScrollOffset
		const showLeft = offset > 0
		const avail = tabsAvailW - (showLeft ? 4 * charW : 0)
		const indices: number[] = []
		let usedW = 0
		for (let i = offset; i < total; i++) {
			const label = nodeTabLabels[i] ?? nodes[i].label
			const w = (label.length + 2) * charW
			const moreAfter = i + 1 < total
			const rightReserve = moreAfter ? 4 * charW : 0
			if (usedW + w + rightReserve > avail && indices.length > 0) break
			indices.push(i)
			usedW += w
		}
		const showRight = indices.length > 0 && offset + indices.length < total
		return { indices, showLeft, showRight }
	})

	// Preset scroll
	const visiblePresetData = $derived.by(() => {
		const names = activeNode?.presets?.names ?? []
		const total = names.length
		if (total === 0) return { indices: [] as number[], showLeft: false, showRight: false }
		const offset = presetScrollOffset
		const showLeft = offset > 0
		const avail = tabsAvailW - (showLeft ? 4 * charW : 0)
		const indices: number[] = []
		let usedW = 0
		for (let i = offset; i < total; i++) {
			const w = (names[i].length + 2) * charW
			const moreAfter = i + 1 < total
			const rightReserve = moreAfter ? 4 * charW : 0
			if (usedW + w + rightReserve > avail && indices.length > 0) break
			indices.push(i)
			usedW += w
		}
		const showRight = indices.length > 0 && offset + indices.length < total
		return { indices, showLeft, showRight }
	})

	// --- Actions ---
	function setParam(nodeIndex: number, path: string, value: number) {
		const chain = getChain()
		const bus = getBus()
		if (chain) {
			if (nodeIndex === -1) chain.setParam(path, value)
			else chain.setFxParam(nodeIndex, path, value)
		} else if (bus) {
			setBusFxParam(bus, nodeIndex, path, value)
		}
		for (const n of nodes) {
			if (n.nodeIndex === nodeIndex && n.paramValues[path] !== undefined) {
				n.paramValues[path] = value
			}
		}
		// Force visibleParams to re-derive (Tone.js has no onParamChange callback)
		localParamVersion++
	}

	const activePresetName = $derived(activeNode?.presets?.active)

	function applyPreset(info: NodePresetInfo, name: string) {
		log('prev preset', info.active)
		info.set(name)
		log('set preset', info.active)

		setTimeout(() => {
			paramVersion++
		}, 50)
	}

	function copyParams() {
		if (!activeNode) return
		const chain = getChain()
		const bus = getBus()
		const nodeIndex = activeNode.nodeIndex
		let nodeCfg: import('../lib/audio/types').NodeConfig | undefined
		if (chain) {
			nodeCfg = nodeIndex === -1 ? chain.config.generator : (chain.config.fx ?? [])[nodeIndex]
		} else if (bus) {
			nodeCfg = (bus.config.fx ?? [])[nodeIndex]
		}
		const params: Record<string, ParamValue> = {}
		for (const [k, v] of Object.entries(activeNode.paramValues)) params[k] = v
		const preset = activeNode.presets?.active
		let out: Record<string, unknown>
		if (nodeCfg && 'rnbo' in nodeCfg) {
			out = { rnbo: nodeCfg.rnbo, ...(Object.keys(params).length ? { params } : {}), ...(preset ? { preset } : {}) }
		} else if (nodeCfg && 'tone' in nodeCfg) {
			out = { tone: nodeCfg.tone, ...(Object.keys(params).length ? { params } : {}) }
		} else {
			out = { ...(Object.keys(params).length ? { params } : {}), ...(preset ? { preset } : {}) }
		}
		navigator.clipboard.writeText(JSON.stringify(out))
		copyFlash = FLASH_DUR
	}

	function trigCurrent() {
		const chain = getChain()
		if (!chain) return
		const lastNote = chain.audioSignal?.lastNote ?? 60
		triggerChain(chain, lastNote, 100, 200)
		trigFlash = FLASH_DUR
	}

	function toggleSolo() {
		soloMode = !soloMode
	}

	function selectSidebarItem(item: SidebarItem) {
		target = item.panelTarget
		activeNodeIdx = 0
		scrollOffset = 0
		onTargetChange?.(item.targetKey)
	}

	// Drag
	function startDrag(event: PointerEvent, info: ParamInfo, nodeIndex: number) {
		dragging = {
			paramPath: info.path,
			nodeIndex,
			startX: event.clientX,
			startVal: activeNode?.paramValues[info.path] ?? info.value,
			fine: event.shiftKey
		}
	}
	function onPointerMove(event: PointerEvent) {
		if (!dragging || !activeNode) return
		const info = activeNode.params.find((p) => p.path === dragging!.paramPath)
		if (!info) return
		const sensitivity = dragging.fine ? 0.1 : 1
		const range = info.max - info.min
		const dx = (event.clientX - dragging.startX) * sensitivity
		if (Math.abs(dx) > 2) didDrag = true
		const newVal = Math.max(info.min, Math.min(info.max, dragging.startVal + (dx / 200) * range))
		setParam(dragging.nodeIndex, info.path, newVal)
	}
	function stopDrag() {
		dragging = null
	}
	function startDragHitbox(e: { nativeEvent: PointerEvent }, info: ParamInfo, nodeIndex: number) {
		didDrag = false
		startDrag(e.nativeEvent, info, nodeIndex)
	}
	function onSliderClick(e: { point: { x: number } }, info: ParamInfo, nodeIndex: number, trackX: number) {
		if (didDrag) { didDrag = false; return }
		const norm2 = Math.max(0, Math.min(1, (e.point.x - trackX) / sliderW))
		setParam(nodeIndex, info.path, info.min + norm2 * (info.max - info.min))
	}

	$effect(() => {
		if (!dragging) return
		window.addEventListener('pointermove', onPointerMove)
		window.addEventListener('pointerup', stopDrag)
		return () => {
			window.removeEventListener('pointermove', onPointerMove)
			window.removeEventListener('pointerup', stopDrag)
		}
	})

	// Scroll: wheel on canvas when panel is hovered
	let panelHovered = false
	function onWheel(e: WheelEvent) {
		if (!panelHovered) return
		e.preventDefault()
		const dir = e.deltaY > 0 ? 1 : -1
		if (tabsHovered) {
			tabScrollOffset = Math.max(0, Math.min(nodes.length - 1, tabScrollOffset + dir))
		} else if (presetsHovered) {
			const maxP = Math.max(0, (activeNode?.presets?.names.length ?? 0) - 1)
			presetScrollOffset = Math.max(0, Math.min(maxP, presetScrollOffset + dir))
		} else if (sidebarHovered) {
			const maxS = Math.max(0, sidebarItems.length - MAX_VISIBLE_SIDEBAR)
			sidebarScrollOffset = Math.max(0, Math.min(maxS, sidebarScrollOffset + dir))
		} else if (activeNode) {
			const maxScroll = Math.max(0, activeNode.params.length - MAX_VISIBLE_PARAMS)
			scrollOffset = Math.max(0, Math.min(maxScroll, scrollOffset + dir))
		}
	}
	$effect(() => {
		if (!visible) return
		const canvas = document.querySelector('canvas')
		if (!canvas) return
		canvas.addEventListener('wheel', onWheel, { passive: false })
		return () => canvas.removeEventListener('wheel', onWheel)
	})

	function enterPanel() {
		panelHovered = true
		panelState.pointerLock = true
	}
	function leavePanel() {
		panelHovered = false
		panelState.pointerLock = false
	}

	// Color sync
	$effect(() => {
		const allFx = [
			textFx,
			sliderFillFx,
			thumbFx,
			activeFx,
			copyFx,
			trigFx,
			soloFx,
			closeFx,
			analyzerFx
		]
		for (const fx of allFx) {
			fx.emissiveColor.value.set(baseColor)
			fx.impactColor.value.set(baseColor)
		}
		for (let i = 0; i < MAX_TABS; i++) {
			tabFxPool[i].emissiveColor.value.set(baseColor)
			tabFxPool[i].impactColor.value.set(baseColor)
		}
		for (let i = 0; i < MAX_SIDEBAR; i++) {
			sidebarFxPool[i].emissiveColor.value.set(baseColor)
			sidebarFxPool[i].impactColor.value.set(baseColor)
		}
		for (let i = 0; i < MAX_PARAM_ROWS; i++) {
			plusFxPool[i].emissiveColor.value.set(baseColor)
			plusFxPool[i].impactColor.value.set(baseColor)
			minusFxPool[i].emissiveColor.value.set(baseColor)
			minusFxPool[i].impactColor.value.set(baseColor)
		}
		for (let i = 0; i < MAX_PRESETS; i++) {
			presetFxPool[i].emissiveColor.value.set(baseColor)
			presetFxPool[i].impactColor.value.set(baseColor)
		}
	})

	useTask((delta) => {
		if (copyFlash > 0) {
			copyFlash = Math.max(0, copyFlash - delta)
			copyFx.impactT.value = copyFlash / FLASH_DUR
		}
		if (trigFlash > 0) {
			trigFlash = Math.max(0, trigFlash - delta)
			trigFx.impactT.value = trigFlash / FLASH_DUR
		}
		// Solo: keep lit while active, respect hover
		soloFx.impactT.value = soloMode ? 0.6 : soloHovered ? 0.3 : 0
	})

	function fmt(v: number): string {
		return v.toFixed(VAL_DECIMALS).toUpperCase()
	}

	function shortName(path: string): string {
		const parts = path.split('.')
		if (parts.length > 1) return parts[0].slice(0, 3) + ELLIP + parts[parts.length - 1]
		return path.length > 12 ? path.slice(0, 11) + '.' : path
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.code === 'KeyT') {
			actionButtons.find((x) => x.label === 'TRIG')?.onclick()
			e.preventDefault()
		} else if (e.code === 'KeyS') {
			actionButtons.find((x) => x.label === 'SOLO' && (e.ctrlKey || e.metaKey))?.onclick()
			e.preventDefault()
		} else if (e.code === 'KeyC' && (e.ctrlKey || e.metaKey)) {
			actionButtons.find((x) => x.label === 'COPY')?.onclick()
			e.preventDefault()
		}
	}

	onDestroy(() => {
		panelState.pointerLock = false
		textFx.mat.dispose()
		for (const fx of tabFxPool) fx.mat.dispose()
		sliderFillFx.mat.dispose()
		thumbFx.mat.dispose()
		activeFx.mat.dispose()
		copyFx.mat.dispose()
		trigFx.mat.dispose()
		soloFx.mat.dispose()
		for (const fx of sidebarFxPool) fx.mat.dispose()
		for (const fx of plusFxPool) fx.mat.dispose()
		for (const fx of minusFxPool) fx.mat.dispose()
		for (const fx of presetFxPool) fx.mat.dispose()
	})
</script>

<svelte:window {onkeydown} />

{#if visible && engine}
	<T.Group position={[0, globalOffset, 1]}>
		<!-- Background (static geom, reactive scale) -->
		<T.Mesh scale={[panelW, panelH, 1]} onpointerenter={enterPanel} onpointerleave={leavePanel}>
			<T.PlaneGeometry args={[1, 1]} />
			<T
				is={GridHelperXY}
				position.z={0.01}
				scale={[1, 1, 1]}
				args={[1, 1, panelCols, panelRows, gridColor]}
			/>
			<T.MeshBasicMaterial color={BG_COLOR} transparent opacity={BG_OPACITY} depthWrite={false} />
		</T.Mesh>

		<!-- Sidebar items -->
		{#each visibleSidebarItems as item, i (item.targetKey)}
			{@const globalI = sidebarScrollOffset + i}
			{@const iy = panelH / 2 - textMid - (i + 1) * rowH}
			{@const isSelected = targetKey === item.targetKey}
			{@const sFx = sidebarFxPool[globalI % MAX_SIDEBAR]}
			{@const itemMat = isSelected ? activeFx.mat : sFx.mat}
			<T.Group position={[-panelW / 2 + charW * 2, iy, 0.02]}>
				<GeoText cache material={itemMat} text={item.label.toUpperCase()} size={textSize} />
				<T.Mesh
					position.x={sidebarW / 2 - sphereR}
					position.y={textSize * 0.5}
					scale={[Math.max(0.1, sidebarW - sphereR), ROW_H * sphereR, 0.1]}
					onclick={() => selectSidebarItem(item)}
					onpointerenter={() => {
						if (!isSelected) sFx.impactT.value = 0.3
					}}
					onpointerleave={() => {
						sFx.impactT.value = 0
					}}
				>
					<T.BoxGeometry args={[1, 1, 1]} />
					<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
				</T.Mesh>
			</T.Group>
		{/each}
		<!-- Sidebar hover zone (plane, no depth → doesn't block sliders) -->
		<T.Mesh
			position={[-panelW / 2 + sidebarW / 2, 0, 0.005]}
			scale={[sidebarW, panelH, 1]}
			onpointerenter={() => {
				sidebarHovered = true
			}}
			onpointerleave={() => {
				sidebarHovered = false
			}}
		>
			<T.PlaneGeometry args={[1, 1]} />
			<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
		</T.Mesh>
		{#if canScrollSidebarUp}
			{@const iy = -panelH / 2 - textMid + 2 * rowH}
			<T.Group position={[-panelW / 2 + charW * 2, iy, 0.02]}>
				<GeoText cache material={textFx.mat} text={UP} size={textSize} />
			</T.Group>
		{/if}
		{#if canScrollSidebarDown}
			{@const iy = -panelH / 2 - textMid + 2 * rowH}
			<T.Group position={[-panelW / 2 + sidebarW - charW * 4, iy, 0.02]}>
				<GeoText cache material={textFx.mat} text={DOWN} size={textSize} />
			</T.Group>
		{/if}

		<!-- Header: node tabs (left) -->
		{#if nodes.length > 0}
			{@const headerY = panelH / 2 - textMid - rowH}
			<T.Group position={[contentX, headerY, 0.02]}>
				<!-- Tab row hover zone -->
				<T.Mesh
					position.x={contentW / 2}
					position.y={textSize * 0.4}
					position.z={0.005}
					scale={[contentW, rowH, 1]}
					onpointerenter={() => {
						tabsHovered = true
					}}
					onpointerleave={() => {
						tabsHovered = false
					}}
				>
					<T.PlaneGeometry args={[1, 1]} />
					<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
				</T.Mesh>
				{#if visibleTabData.showLeft}
					<T.Group position={[0, 0, 0.01]}>
						<GeoText cache material={textFx.mat} text={LEFT} size={textSize} />
						<T.Mesh
							position.x={charW * 0.5}
							position.y={textSize * 0.4}
							scale={[charW * 2, rowH, 0.1]}
							onclick={() => {
								tabScrollOffset = Math.max(0, tabScrollOffset - 1)
							}}
						>
							<T.BoxGeometry args={[1, 1, 1]} />
							<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
						</T.Mesh>
					</T.Group>
				{/if}
				{@const tabsStartX = visibleTabData.showLeft ? 4 * charW : 0}
				{#each visibleTabData.indices as ni (ni)}
					{@const node = nodes[ni]}
					{@const isActive = ni === activeNodeIdx}
					{@const tFx = tabFxPool[ni % MAX_TABS]}
					{@const tabMat = isActive ? activeFx.mat : tFx.mat}
					{@const tabLabel = nodeTabLabels[ni] ?? node.label}
					{@const prevIndices = visibleTabData.indices.slice(0, visibleTabData.indices.indexOf(ni))}
					{@const tabX =
						tabsStartX +
						prevIndices.reduce(
							(s, j) => s + ((nodeTabLabels[j] ?? nodes[j].label).length + 2) * charW,
							0
						)}
					<T.Group position={[tabX, 0, 0.01]}>
						<GeoText cache material={tabMat} text={tabLabel.toUpperCase()} size={textSize} />
						<T.Mesh
							position.x={(tabLabel.length * charW) / 2}
							position.y={textSize * 0.4}
							scale={[tabLabel.length * charW + sphereR * 0.5, rowH, 0.1]}
							onclick={() => {
								activeNodeIdx = ni
								scrollOffset = 0
							}}
							onpointerenter={() => {
								if (!isActive) tFx.impactT.value = 0.3
							}}
							onpointerleave={() => {
								tFx.impactT.value = 0
							}}
						>
							<T.BoxGeometry args={[1, 1, 1]} />
							<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
						</T.Mesh>
					</T.Group>
				{/each}
				{#if visibleTabData.showRight}
					{@const rightX = contentW - charW * 4}
					<T.Group position={[rightX, 0, 0.01]}>
						<GeoText cache material={textFx.mat} text={RIGHT} size={textSize} />
						<T.Mesh
							position.x={charW * 0.5}
							position.y={textSize * 0.4}
							scale={[charW * 2, rowH, 0.1]}
							onclick={() => {
								tabScrollOffset = Math.min(nodes.length - 1, tabScrollOffset + 1)
							}}
						>
							<T.BoxGeometry args={[1, 1, 1]} />
							<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
						</T.Mesh>
					</T.Group>
				{/if}
			</T.Group>
		{/if}

		<!-- Right bottom buttons (from right edge) -->
		<T.Group position={[panelW / 2, -panelH / 2 - textMid + rowH, 0.02]}>
			{#each actionButtons as btn, idx (idx)}
				{@const btnX =
					charW * actionButtons.slice(0, idx + 1).reduce((s, l) => s - (l.label.length + 2), 0)}
				<T.Group position={[btnX, 0, 0]}>
					<GeoText cache material={btn.mat.mat} text={btn.label} size={textSize} />
					<T.Mesh
						position.x={(btn.label.length * charW) / 2}
						position.y={textSize * 0.4}
						scale={[btn.label.length * charW, rowH, 0.1]}
						onclick={() => btn.onclick()}
						onpointerenter={() => {
							if (btn.label === 'SOLO') soloHovered = true
							btn.mat.impactT.value = 0.3
						}}
						onpointerleave={() => {
							if (btn.label === 'SOLO') soloHovered = false
							btn.mat.impactT.value = 0
						}}
					>
						<T.BoxGeometry args={[1, 1, 1]} />
						<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
					</T.Mesh>
				</T.Group>
			{/each}
		</T.Group>

		<!-- Presets -->
		{#if activeNode?.presets}
			{@const presets = activeNode.presets}
			<T.Group position={[contentX, contentY - textMid - rowH * 2, 0.02]}>
				<!-- Preset row hover zone -->
				<T.Mesh
					position.x={contentW / 2}
					position.y={textSize * 0.4}
					position.z={0.005}
					scale={[contentW, rowH, 1]}
					onpointerenter={() => {
						presetsHovered = true
					}}
					onpointerleave={() => {
						presetsHovered = false
					}}
				>
					<T.PlaneGeometry args={[1, 1]} />
					<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
				</T.Mesh>
				{#if visiblePresetData.showLeft}
					<T.Group position={[0, 0, 0.01]}>
						<GeoText cache material={textFx.mat} text={LEFT} size={textSize} />
						<T.Mesh
							position.x={charW * 0.5}
							position.y={textSize * 0.4}
							scale={[charW * 2, rowH, 0.1]}
							onclick={() => {
								presetScrollOffset = Math.max(0, presetScrollOffset - 1)
							}}
						>
							<T.BoxGeometry args={[1, 1, 1]} />
							<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
						</T.Mesh>
					</T.Group>
				{/if}
				{@const presetsStartX = visiblePresetData.showLeft ? 4 * charW : 0}
				{#each visiblePresetData.indices as pi (pi)}
					{@const name = presets.names[pi]}
					{@const isActivePreset = name === activePresetName}
					{@const pFx = presetFxPool[pi % MAX_PRESETS]}
					{@const pMat = isActivePreset ? activeFx.mat : pFx.mat}
					{@const prevPi = visiblePresetData.indices.slice(
						0,
						visiblePresetData.indices.indexOf(pi)
					)}
					{@const pX =
						presetsStartX + prevPi.reduce((s, j) => s + (presets.names[j].length + 2) * charW, 0)}
					<T.Group position={[pX, 0, 0.05]}>
						<GeoText cache material={pMat} text={name.toUpperCase()} size={textSize} />
						<T.Mesh
							position.x={(name.length * charW) / 2}
							position.y={textSize / 2}
							scale={[name.length * charW, rowH, 0.1]}
							onclick={() => {
								applyPreset(presets, name)
							}}
							onpointerenter={() => {
								if (!isActivePreset) pFx.impactT.value = 0.3
							}}
							onpointerleave={() => {
								pFx.impactT.value = 0
							}}
						>
							<T.BoxGeometry args={[1, 1, 1]} />
							<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
						</T.Mesh>
					</T.Group>
				{/each}
				{#if visiblePresetData.showRight}
					{@const rightX = contentW - charW * 4}
					<T.Group position={[rightX, 0, 0.01]}>
						<GeoText cache material={textFx.mat} text={RIGHT} size={textSize} />
						<T.Mesh
							position.x={charW * 0.5}
							position.y={textSize * 0.4}
							scale={[charW * 2, rowH, 0.1]}
							onclick={() => {
								presetScrollOffset = Math.min(presets.names.length - 1, presetScrollOffset + 1)
							}}
						>
							<T.BoxGeometry args={[1, 1, 1]} />
							<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
						</T.Mesh>
					</T.Group>
				{/if}
			</T.Group>
		{/if}

		<!-- Param sliders -->
		{#if activeNode && sliderW > 0}
			{#each visibleParams as info, vi (info.path)}
				{@const py = contentY - textMid - (vi + 3) * rowH}
				{@const val = activeNode.paramValues[info.path] ?? info.value}
				{@const norm = info.max > info.min ? (val - info.min) / (info.max - info.min) : 0}
				{@const labelText = shortName(info.path)}
				{@const valText = fmt(val)}
				{@const trackX = contentX + labelW + charW}
				{@const thumbX = trackX + norm * sliderW}
				{@const btnPlusX = contentRight - charW * 3}
				{@const btnMinusX = contentRight - charW * 6}
				{@const valRightX = btnMinusX}
				{@const valTextX = valRightX - valText.length * charW}

				<T.Group position={[0, py, 0.02]}>
					<!-- Label -->
					<T.Group position={[contentX, 0, 0]}>
						<GeoText cache material={textFx.mat} text={labelText.toUpperCase()} size={textSize} />
					</T.Group>

					<!-- Track -->
					<T.Mesh
						position={[trackX + sliderW / 2, textMid, 0]}
						scale={[sliderW, TRACK_H * sphereR, 1]}
					>
						<T.PlaneGeometry args={[1, 1]} />
						<T.MeshBasicMaterial color={gridColor} transparent opacity={0.6} depthWrite={false} />
					</T.Mesh>

					<!-- Fill -->
					{#if norm > 0.001}
						<T.Mesh
							position={[trackX + (norm * sliderW) / 2, textMid, 0.01]}
							scale={[norm * sliderW, SLIDER_H * sphereR, 1]}
							material={sliderFillFx.mat}
						>
							<T.PlaneGeometry args={[1, 1]} />
						</T.Mesh>
					{/if}

					<!-- Thumb -->
					<T.Mesh position={[thumbX, textMid, 0.02]} material={thumbFx.mat}>
						<T.CircleGeometry args={[THUMB_R * sphereR, 12]} />
					</T.Mesh>

					<!-- Value (right-aligned before +/- buttons) -->
					<T.Group position={[valTextX, 0, 0]}>
						<GeoText cache material={textFx.mat} text={valText} size={textSize} />
					</T.Group>

					<!-- - button -->
					<T.Mesh
						position={[btnMinusX + charW / 2 + charW, textMid, 0.03]}
						scale={[charW, rowH, 0.1]}
						onclick={(e: { nativeEvent: MouseEvent }) => {
							const step = (info.max - info.min) / 100
							const s = e.nativeEvent.shiftKey ? step / 10 : step
							setParam(activeNode.nodeIndex, info.path, Math.max(info.min, val - s))
						}}
						onpointerenter={() => {
							minusFxPool[vi % MAX_PARAM_ROWS].impactT.value = 0.3
						}}
						onpointerleave={() => {
							minusFxPool[vi % MAX_PARAM_ROWS].impactT.value = 0
						}}
					>
						<T.BoxGeometry args={[1, 1, 1]} />
						<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
					</T.Mesh>
					<T.Group position={[btnMinusX + charW, 0, 0]}>
						<GeoText
							cache
							material={minusFxPool[vi % MAX_PARAM_ROWS].mat}
							text="-"
							size={textSize}
						/>
					</T.Group>

					<!-- + button -->
					<T.Mesh
						position={[btnPlusX + charW / 2, textMid, 0.03]}
						scale={[charW, rowH, 0.1]}
						onclick={(e: { nativeEvent: MouseEvent }) => {
							const step = (info.max - info.min) / 100
							const s = e.nativeEvent.shiftKey ? step / 10 : step
							setParam(activeNode.nodeIndex, info.path, Math.min(info.max, val + s))
						}}
						onpointerenter={() => {
							plusFxPool[vi % MAX_PARAM_ROWS].impactT.value = 0.3
						}}
						onpointerleave={() => {
							plusFxPool[vi % MAX_PARAM_ROWS].impactT.value = 0
						}}
					>
						<T.BoxGeometry args={[1, 1, 1]} />
						<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
					</T.Mesh>
					<T.Group position={[btnPlusX, textSize * -0.05, 0]}>
						<GeoText
							cache
							material={plusFxPool[vi % MAX_PARAM_ROWS].mat}
							text="+"
							size={textSize}
						/>
					</T.Group>
					<!-- Drag hitbox (over slider track) -->
					<T.Mesh
						position={[trackX + sliderW / 2, textSize * 0.3, 0.03]}
						scale={[sliderW + THUMB_R * sphereR, rowH, 0.1]}
						onpointerdown={(e: { nativeEvent: PointerEvent }) =>
							startDragHitbox(e, info, activeNode.nodeIndex)}
						onclick={(e: { point: { x: number } }) =>
							onSliderClick(e, info, activeNode.nodeIndex, trackX)}
					>
						<T.BoxGeometry args={[1, 1, 1]} />
						<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
					</T.Mesh>
				</T.Group>
			{/each}
		{/if}

		<!-- Scroll indicators -->
		{#if canScrollUp}
			{@const bottomY = -contentY + rowH * 2 - textMid}
			<T.Group position={[contentX, bottomY, 0]}>
				<GeoText cache material={textFx.mat} text={UP} size={textSize} />
			</T.Group>
		{/if}
		{#if canScrollDown}
			{@const bottomY = -contentY + rowH * 2 - textMid}
			<T.Group position={[contentX + (maxLabelChars - 2) * charW, bottomY, 0.03]}>
				<GeoText cache material={textFx.mat} text={DOWN} size={textSize} />
			</T.Group>
		{/if}
	</T.Group>

	{#if analyzer}
		<AnalyserView
			{analyzer}
			material={analyzerFx.mat}
			type="fft"
			height={rowH * 2}
			width={charW * 8}
			position={[-panelW / 2 + charW * 6, -panelH / 2 + rowH, 1]}
		/>
	{/if}
{/if}
