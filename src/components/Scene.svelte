<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core'
	import { untrack, onMount, onDestroy, type Snippet, tick } from 'svelte'
	import type { Scene as ThreeScene } from 'three/webgpu'
	import { interactivity } from '@threlte/extras'
	import RailView from './RailView.svelte'
	import MarbleView from './MarbleView.svelte'
	import { createTempoState, updateTempo, type TempoState } from '../lib/core/tempo'
	import {
		updateMarbles,
		initMarblePositions,
		fireGlobalBeatInit,
		fireGlobalBeatDestroy,
		resetMarbleToConfig,
		type MarbleMutations
	} from '../lib/core/marble-system'
	import type { SceneConfig, ViewConfig } from '../lib/core/scene'
	import {
		createSceneCtx,
		updateSceneCtx,
		addMarbleEntity,
		removeMarbleEntity,
		reindexMarbles
	} from '../lib/core/scene-ctx-factory'
	import { createMarbleInstance, type MarbleInstance } from '../lib/core/marble'
	import type { InstrumentConfig } from '../lib/core/instrument'
	import { createAudioEngine, disposeScene } from '../lib/audio'
	import type { AudioEngine, AudioChain } from '../lib/audio'
	import { hasAudioConfig, buildSceneAudio } from '../lib/audio/scene-audio'
	import {
		createInstrumentSignals,
		assignInstrumentSignals,
		createMarbleConfigs
	} from '../lib/helpers/scene-init'
	import AudioView from './AudioView.svelte'
	import MultiView from './MultiScissor.svelte'
	import MidiSignalView from './MidiSignalView.svelte'
	import { getMarbleSignalLinks, getMidiSignalLinks } from '../lib/helpers/links'
	import Stars from './Stars.svelte'
	import Floor from './Floor.svelte'
	import type { SceneCtx } from '../lib/core/scene-ctx'
	import { toggleMute } from '../lib/audio/engine'
	import { convertOklabToRgb, convertRgbToOklab, formatHex, parseHex, type Rgb } from 'culori/fn'
	import { GridHelperIO } from '../lib/three/GridHelperIO'
	import { debug } from 'debug'
	import { disposeSharedMaterials, wireframeMaterial } from '../lib/components/config'
	import { disposeMarbleGeometryCache } from '../lib/video/geometry-marble'
	import { disposeInstrumentGeometryCache } from '../lib/video/geometry-instrument'
	import { disposeGeoTextCache } from '../lib/video/geometry-text'
	import { disposeTubeTextCache } from '../lib/video/geometry-text-tube'

	const log = debug('<Scene>')

	export type SelectedEntity = {
		type: 'instrument' | 'marble'
		railIdx: number
		idx: number
	} | null

	interactivity()

	let {
		scene,
		showGrid = false,
		showPoints = false,
		showBeats = false,
		showNames = false,
		showAudio = false,
		limitFps = false,
		showAnalyzers = true,
		wireframe = false,
		tempo = $bindable(),
		easing = $bindable(),
		railVisibility = $bindable(),
		fps = $bindable(),
		onSceneCtx,
		selectedEntity = $bindable<SelectedEntity>(null),
		selectedAudioChain = $bindable<AudioChain | undefined>(),
		allAudioChains = $bindable<AudioChain[]>([]),
		audioEngineRef = $bindable<AudioEngine | null>(null),
		hudContent,
		onReady
	}: {
		scene: SceneConfig
		showGrid?: boolean
		showPoints?: boolean
		showBeats?: boolean
		showNames?: boolean
		showAudio?: boolean
		limitFps?: boolean
		showAnalyzers?: boolean
		wireframe?: boolean
		fxPost?: boolean
		showStats?: boolean
		tempo?: TempoState
		easing?: string
		railVisibility?: boolean[]
		fps?: number
		onSceneCtx?: (ctx: SceneCtx) => void
		selectedEntity?: SelectedEntity
		selectedAudioChain?: AudioChain | undefined
		allAudioChains?: AudioChain[]
		audioEngineRef?: AudioEngine | null
		/** HUD content snippet forwarded to MultiView (multi-view mode only) */
		hudContent?: Snippet<[{ ref: ThreeScene }]>
		/** Called after mount; App uses this to sweep geometry caches after first render */
		onReady?: () => void
	} = $props()

	// Init tempo state
	if (!tempo) tempo = createTempoState()

	// Capture scene at mount — prop may become null before onDestroy fires
	const sceneRef = untrack(() => scene)
	// sceneRef.view is guaranteed non-null when {#if scene.view} is entered
	const sceneView = sceneRef.view as ViewConfig

	// Create marbles once at mount (component remounts per scene via {#key})
	const rails = untrack(() => {
		const r = scene.rails
		if (scene.renderFactory) {
			for (const [i, element] of r.entries()) {
				if (!element.render) element.render = scene.renderFactory(element, i)
			}
		}
		return r
	})

	// Create reactive signal and runtime maps
	const _insSignals = createInstrumentSignals(rails)
	const signalStates = $state(_insSignals.signals)
	const midiSignalStates = $state(_insSignals.midiSignals)
	/* eslint-disable @typescript-eslint/no-explicit-any */
	const runtimeStates = $state<Array<Record<string, any>>>(_insSignals.runtimes)
	/* eslint-enable @typescript-eslint/no-explicit-any */

	// Assign signals and runtimes to instruments (reactive references)
	assignInstrumentSignals(rails, signalStates, midiSignalStates, runtimeStates)

	// Rail runtime states — $state-proxied so RailView $derived tracks mutations
	/* eslint-disable @typescript-eslint/no-explicit-any */
	const railRuntimeStates = $state<Array<Record<string, any>>>(
		rails.map((rd) => {
			const rt: Record<string, any> = {}
			if (rd.running !== undefined) rt.running = rd.running
			if (rd.active !== undefined) rt.active = rd.active
			return rt
		})
	)
	/* eslint-enable @typescript-eslint/no-explicit-any */

	const _init = createMarbleConfigs(rails, easing || 'linear')
	initMarblePositions(_init.marbles)
	let marbles = $state(_init.marbles)
	const marbleRailIndices = _init.railIndices

	// Pre-allocated, updated in-place on rail switch (no per-frame allocation)
	const liveRailIndices: number[] = [...marbleRailIndices]
	const instrumentsPerRail: InstrumentConfig[][] = liveRailIndices.map(
		(i) => rails[i].instruments || []
	)
	const railIds: string[] = liveRailIndices.map((i) => rails[i].id)

	const noBouncers = $derived(!marbles.some((m) => m.resolved.bouncer))

	// Init rail visibility (reset if length mismatch from scene change)
	if (!railVisibility || railVisibility.length !== rails.length) {
		railVisibility = rails.map((rail) => rail.visible !== false)
	}

	// Reactive render version counters (one per rail), written by RailView, read by MarbleView
	const railRenderVersions: number[] = $state(Array.from({ length: rails.length }, () => 0))

	// Create scene context once at mount (non-reactive to avoid loops)
	const sceneCtx = (() => {
		const ctx = createSceneCtx(
			marbles,
			rails,
			marbleRailIndices,
			tempo,
			scene,
			scene.user ?? {},
			railRuntimeStates
		)

		if (onSceneCtx) {
			onSceneCtx(ctx)
		}

		return ctx
	})()

	function onSelectInstrument(railIdx: number, idx: number) {
		selectedEntity = { type: 'instrument', railIdx, idx }
		// Init audio on first interaction (not just play)
		if (!audioInitGuard && hasAudioConfig(scene, rails)) {
			initSceneAudio().then(() => {
				selectedAudioChain = getSelectedAudioChain()
			})
		} else {
			selectedAudioChain = getSelectedAudioChain()
		}
	}

	function onSelectMarble(railIdx: number, idx: number) {
		selectedEntity = { type: 'marble', railIdx, idx }
		if (!audioInitGuard && hasAudioConfig(scene, rails)) {
			initSceneAudio().then(() => {
				selectedAudioChain = getSelectedAudioChain()
			})
		} else {
			selectedAudioChain = getSelectedAudioChain()
		}
	}

	// Look up selected entity's audio chain (called in update loop for reactivity)
	function getSelectedAudioChain(): AudioChain | undefined {
		if (!selectedEntity) return undefined
		if (selectedEntity.type === 'instrument') {
			// Compute flat instrument index from railIdx + idx
			let flatIdx = 0
			for (let r = 0; r < selectedEntity.railIdx; r++) {
				flatIdx += (rails[r].instruments ?? []).length
			}
			flatIdx += selectedEntity.idx
			return sceneCtx.instruments[flatIdx]?.audio
		}
		// Marble: selectedEntity.idx is already global marble index
		return sceneCtx.marbles[selectedEntity.idx]?.audio
	}

	// Audio engine (lazy init on first play)
	const audioEngine: AudioEngine = createAudioEngine()

	if (localStorage.getItem('ac-muted') === 'true') {
		toggleMute(audioEngine, true)
	}

	let audioInitGuard = false
	let audioInitialized = $state(false)
	let noAudioScene = $derived(!hasAudioConfig(scene, rails))

	async function initSceneAudio() {
		if (audioInitGuard) return
		audioInitGuard = true

		audioEngine.pending = buildSceneAudio(
			audioEngine,
			scene,
			rails,
			sceneCtx,
			audioViewConfig?.defaultAnalyser
		)
		allAudioChains = await audioEngine.pending

		if (audioEngine.disposed) return

		audioEngine.pending = undefined
		audioEngineRef = audioEngine
		audioInitialized = true
	}

	// const AUDIO_NODE_SPACING = 0.5,
	// 	AUDIO_LAYER_GAP = .5,
	// 	AUDIO_COL_SPACING = 1

	const audioViewConfig = $derived(scene?.audioView || undefined)
	const AUDIO_OFFSET: [number, number, number] = $derived(audioViewConfig?.offset ?? [0, -2, 0])

	let audioView: AudioView | undefined = $state()

	const midiSignalLinks = $derived.by(() => {
		if (!audioInitialized) return []
		const nodes = audioView?.getNodes()
		if (!nodes?.length) return []
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		for (const v of railRenderVersions) v // establish dep on all rail render versions

		return getMidiSignalLinks(sceneCtx.instruments, nodes, sceneCtx.rails, AUDIO_OFFSET)
	})

	const marbleSignalLinks = $derived.by(() => {
		if (!audioInitialized || !audioViewConfig?.marbleLinks) return []
		const nodes = audioView?.getNodes()
		if (!nodes?.length) return []
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		for (const v of railRenderVersions) v // establish dep on all rail render versions

		return getMarbleSignalLinks(sceneCtx.marbles, nodes, sceneCtx.rails, AUDIO_OFFSET)
	})

	// Fire init handler on mount
	onMount(() => {
		log('mounted', scene.id)

		if (onReady) {
			tick().then(() => {
				setTimeout(() => {
					requestAnimationFrame(() => {
						log('ready', scene.id)
						onReady()
					})
				})
			})
		}

		if (scene.globalBeatHandler) {
			fireGlobalBeatInit(tempo, sceneCtx, scene.globalBeatHandler)
		}
	})

	// Fire destroy handler on unmount
	onDestroy(() => {
		log('destroyed', sceneRef?.id)

		// audioEngineRef = null
		// Release $state proxy refs from module-level scene config
		for (const railData of rails) {
			if (railData.instruments) {
				for (const ins of railData.instruments) {
					ins.signal = undefined
					ins.midiSignal = undefined
					ins.runtime = undefined
				}
			}
			// Rail runtime is on entity, cleared below
		}
		// Clear rail runtime refs (renderMatrix etc. hold $state proxies)
		for (const re of sceneCtx.rails) {
			re.runtime.renderMatrix = undefined
			re.runtime.renderVersion = 0
		}

		if (sceneRef?.globalBeatHandler) {
			fireGlobalBeatDestroy(tempo, sceneCtx, sceneRef.globalBeatHandler)
		}
		// Dispose audio chains
		allAudioChains = []
		disposeScene(audioEngine)
		disposeSharedMaterials()
		disposeMarbleGeometryCache()
		disposeInstrumentGeometryCache()
		disposeGeoTextCache()
		disposeTubeTextCache()
	})

	function applyMutations(mutations: MarbleMutations) {
		if (!mutations) return

		if (mutations.rewind) {
			const snap = sceneCtx.initialSnapshot

			// 1. Remove runtime-created marbles (reverse order to keep indices valid)
			for (let i = marbles.length - 1; i >= 0; i--) {
				if (marbles[i].runtime.created) {
					removeMarbleEntity(sceneCtx, marbles[i].id)
					marbles.splice(i, 1)
				}
			}

			// 2. Collect surviving marble IDs mapped by original snapshot index
			//    Destroyed marbles were already spliced out — need to re-create those
			const survivingById: Record<number, MarbleInstance> = {}
			for (const m of marbles) survivingById[m.id] = m

			// 3. Build final array: reuse existing, recreate destroyed
			const finalMarbles: MarbleInstance[] = []
			for (let i = 0; i < snap.configs.length; i++) {
				const origId = snap.originalIds[i]
				const existing = survivingById[origId]
				if (existing) {
					resetMarbleToConfig(existing, { ...snap.configs[i] })
					existing.index = i
					finalMarbles.push(existing)
					delete survivingById[origId]
				} else {
					// Was destroyed — recreate with same ID
					const m = createMarbleInstance({ ...snap.configs[i] }, i)
					// Overwrite auto-generated ID to reuse original (stable key)
					m.id = origId
					finalMarbles.push(m)
					addMarbleEntity(sceneCtx, m)
				}
			}

			// 4. Replace marbles array in-place
			marbles.length = 0
			for (const m of finalMarbles) marbles.push(m)

			// 5. Reset parallel arrays from snapshot
			liveRailIndices.length = snap.railIndices.length
			instrumentsPerRail.length = snap.railIndices.length
			railIds.length = snap.railIndices.length
			for (let i = 0; i < snap.railIndices.length; i++) {
				const ri = snap.railIndices[i]
				liveRailIndices[i] = ri
				instrumentsPerRail[i] = rails[ri].instruments || []
				railIds[i] = rails[ri].id
			}

			// 6. Sync sceneCtx.marbles order (reuse existing entities, just reorder)
			const entityById: Record<number, import('../lib/core/scene-ctx').MarbleEntity> = {}
			for (const e of sceneCtx.marbles) entityById[e.id] = e
			sceneCtx.marbles.length = 0
			for (const m of marbles) {
				const e = entityById[m.id]
				if (e) {
					e.marble = m
					sceneCtx.marbles.push(e)
				}
			}

			return
		}

		// Remove destroyed — collect IDs from sceneCtx entities (bypasses $state proxy)
		const destroyedIds: Record<number, true> = {}
		let destroyCount = 0
		for (let i = sceneCtx.marbles.length - 1; i >= 0; i--) {
			if (sceneCtx.marbles[i].marble.runtime.destroyed) {
				destroyedIds[sceneCtx.marbles[i].id] = true
				destroyCount++
				sceneCtx.marbles.splice(i, 1)
			}
		}
		if (destroyCount > 0) {
			for (let i = marbles.length - 1; i >= 0; i--) {
				if (destroyedIds[marbles[i].id]) {
					marbles.splice(i, 1)
					liveRailIndices.splice(i, 1)
					instrumentsPerRail.splice(i, 1)
					railIds.splice(i, 1)
				}
			}
		}

		// Add created
		for (const { marble, railIndex } of mutations.created) {
			marbles.push(marble)
			liveRailIndices.push(railIndex)
			instrumentsPerRail.push(rails[railIndex].instruments || [])
			railIds.push(rails[railIndex].id)
			addMarbleEntity(sceneCtx, marble)
		}

		// Re-index
		if (destroyCount > 0 || mutations.created.length > 0) {
			reindexMarbles(marbles)
		}
	}

	// FPS tracking
	if (fps === undefined) fps = 0
	let frames = 0
	let lastTime = performance.now()
	let lastTimeFps = lastTime
	const fpsInterval = 1000 / 6
	const targetFPS = 60
	const interval = 1000 / targetFPS
	const { advance, renderStage } = useThrelte()

	useTask(
		() => {
			const now = performance.now()
			frames++

			if (now >= lastTimeFps + fpsInterval) {
				fps = Math.round((frames * 1000) / (now - lastTimeFps))
				frames = 0
				lastTimeFps = now
			}
		},
		{ stage: renderStage }
	)

	// Update loop
	useTask((delta) => {
		const now = performance.now()

		if (limitFps && now - lastTime >= interval) {
			lastTime = now - ((now - lastTime) % interval) // drift correction
			advance()
		}

		if (audioInitialized || noAudioScene) {
			// prevent big jump on play start
			if (!tempo.currentBeat && !tempo.beatProgress && delta > 5) {
				delta = 1
			}

			updateTempo(tempo, delta * 1000)
		}

		// Lazy audio init on first play
		if (tempo.isPlaying && !audioInitGuard && hasAudioConfig(scene, rails)) {
			initSceneAudio()
		}

		// Update scene context (beat/play state)
		if (sceneCtx) {
			updateSceneCtx(sceneCtx, tempo)

			if (onSceneCtx) {
				onSceneCtx(sceneCtx)
			}
		}

		// Update easing based on prop (respect runtime overrides)
		for (const marble of marbles) {
			if (!marble.runtime.easing) {
				marble.resolved.easing = marble.resolved?.config?.easing || easing || 'linear'
			}
		}

		// Sync live rail indices from marble runtime (only changes on rail switch)
		for (const [i, marble] of marbles.entries()) {
			const ri = marble.runtime.railIndex ?? liveRailIndices[i] ?? marbleRailIndices[i]
			if (ri !== liveRailIndices[i]) {
				liveRailIndices[i] = ri
				instrumentsPerRail[i] = rails[ri].instruments || []
				railIds[i] = rails[ri].id
			}
		}

		const mutations = updateMarbles(
			marbles,
			tempo,
			instrumentsPerRail,
			railIds,
			scene.triggerHandler,
			sceneCtx,
			scene.globalBeatHandler,
			scene.globalBeatResolution,
			scene.bounceHandler,
			scene.bouncerOnlyMode,
			noBouncers
		)

		if (mutations) applyMutations(mutations)
	})

	const gridColor = $derived.by(() => {
		const base = scene?.audioView && scene.audioView?.color

		if (!base) {
			return 0x77_77_77
		}

		const rgb = <Rgb>parseHex(base)
		const oklab = convertRgbToOklab(rgb)
		oklab.l = 0.5
		const backRgb = convertOklabToRgb(oklab)

		return formatHex(backRgb)
	})

	$effect(() => {
		wireframeMaterial.color.set(scene?.audioView && scene.audioView?.color ? gridColor : 0x99_99_99)
	})

	/**
	function clearSelection() {
		selectedEntity = null
		selectedAudioChain = undefined
	}
 */

	// Derived selection state — avoids direct selectedEntity reads inside {#each} loops
	// (cross-scope reactive subscriptions from {#each} to parent App.svelte state leak
	//  geometry references when scene unmounts; $derived in Scene.svelte scope cleans up cleanly)
	const _selType = $derived(selectedEntity?.type ?? null)
	const _selRailIdx = $derived(selectedEntity?.railIdx ?? -1)
	const _selInstIdx = $derived(_selType === 'instrument' ? (selectedEntity?.idx ?? null) : null)
	const _selMarbleIdx = $derived(_selType === 'marble' ? (selectedEntity?.idx ?? -1) : -1)
</script>

<!-- Invisible plane for deselect on miss -->
<!--<T.Mesh-->
<!--	position={[0, 0, 0]}-->
<!--	rotation.x={-Math.PI / 2}-->
<!--	onclick={clearSelection}-->
<!--	visible={false}-->
<!--&gt;-->
<!--	<T.PlaneGeometry args={[1000, 1000]} />-->
<!--	<T.MeshBasicMaterial />-->
<!--</T.Mesh>-->

{#if scene}
	{#if scene.stars}
		<Stars />
	{/if}

	{#if wireframe}
		<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
		<T.AmbientLight intensity={0.4} />
	{/if}

	{#if showGrid}
		{#if !scene.polar}
			<T.GridHelper position.y={-0.01} args={[10, 10, gridColor, gridColor]} />
		{/if}
		{#if scene.polar}
			<!--		<T.PolarGridHelper position.y={-0.01} args={[5, 24, 10, 64, gridColor, gridColor]} />-->
			<T is={GridHelperIO} position.y={-0.01} args={[5, 0.5, 24, 10, 64, gridColor]} />
		{/if}
	{/if}

	{#if scene.floor}
		{@const fc = typeof scene.floor === 'object' ? scene.floor : {}}
		<Floor {...fc} />
	{/if}

	{#each rails as railData, railIndex (railIndex)}
		{#if railVisibility[railIndex]}
			<RailView
				name={`${scene.id}-rail-${railIndex}`}
				id={railIndex.toString()}
				{railData}
				bind:railRuntime={railRuntimeStates[railIndex]}
				width={0.06}
				{showPoints}
				{showBeats}
				{showNames}
				{wireframe}
				{tempo}
				{sceneCtx}
				renderPlayOnly={scene.renderPlayOnly}
				textOrientation={scene.textOrientation ?? (scene.view ? [0, 0, 1] : undefined)}
				railIdx={railIndex}
				selectedInstrumentIdx={_selType === 'instrument' && _selRailIdx === railIndex
					? _selInstIdx
					: null}
				{onSelectInstrument}
				bind:renderVersion={railRenderVersions[railIndex]}
			/>
		{/if}
	{/each}

	{#each marbles as _m, idx (_m.id)}
		{@const railIndex = liveRailIndices[idx] ?? marbleRailIndices[idx]}
		{#if railVisibility[railIndex]}
			<MarbleView
				name={`${scene.id}-marble-${_m.id}`}
				bind:marble={marbles[idx]}
				rail={marbles[idx].resolved.resolvedRail}
				railRuntime={railRuntimeStates[railIndex]}
				renderVersion={railRenderVersions[railIndex]}
				color={rails[railIndex].color || '#ffffff'}
				{wireframe}
				selected={_selType === 'marble' && _selRailIdx === railIndex && _selMarbleIdx === idx}
				onselect={() => onSelectMarble(railIndex, idx)}
			/>
		{/if}
	{/each}

	{#if scene.view}
		<MultiView config={sceneView} {sceneCtx}
			>{#snippet children(arg)}{@render hudContent?.(arg)}{/snippet}</MultiView
		>
	{/if}

	{#if audioInitialized && scene?.audioView !== false}
		<AudioView
			showAllNodes={scene?.audioView?.all}
			showAnalysers={showAnalyzers && (scene?.audioView?.analyzers ?? true)}
			showText={scene?.audioView?.text}
			defaultAnalyser={scene?.audioView?.defaultAnalyser}
			baseColor={scene?.audioView?.color}
			module={scene?.audioView?.module}
			bind:this={audioView}
			engine={audioEngine}
			offset={AUDIO_OFFSET}
			visible={showAudio}
			{wireframe}
		/>
		{#if showAudio}
			<MidiSignalView alpha={scene?.audioView?.midiAlpha} links={midiSignalLinks} {wireframe} />
			{#if scene?.audioView?.marbleLinks}
				<MidiSignalView alpha={scene?.audioView?.midiAlpha} links={marbleSignalLinks} {wireframe} />
			{/if}
		{/if}
	{/if}
{/if}
