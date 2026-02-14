<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { untrack, onMount, onDestroy } from 'svelte'
	import { OrbitControls } from '@threlte/extras'
	import RailView from './RailView.svelte'
	import MarbleView from './MarbleView.svelte'
	import Bloom from './Bloom.svelte'
	import { createTempoState, updateTempo, type TempoState } from '../lib/tempo'
	import { createMarble } from '../lib/marble'
	import { updateMarbles, fireGlobalBeatInit, fireGlobalBeatDestroy } from '../lib/marble-system'
	import { resolveRail } from '../lib/rail-resolve'
	import type { SceneConfig } from '../lib/scene'
	import { createSceneCtx, updateSceneCtx } from '../lib/scene-ctx-factory'

	let {
		scene,
		showGrid = false,
		showPoints = false,
		showBeats = false,
		showNames = false,
		wireframe = false,
		fxPost = true,
		fxRails = true,
		fxMarbles = true,
		fxInstruments = true,
		autoRotate = false,
		tempo = $bindable(),
		easing = $bindable(),
		railVisibility = $bindable(),
		fps = $bindable()
	}: {
		scene: SceneConfig
		showGrid?: boolean
		showPoints?: boolean
		showBeats?: boolean
		showNames?: boolean
		wireframe?: boolean
		fxPost?: boolean
		fxRails?: boolean
		fxMarbles?: boolean
		fxInstruments?: boolean
		autoRotate?: boolean
		showStats?: boolean
		tempo?: TempoState
		easing?: string
		railVisibility?: boolean[]
		fps?: number
	} = $props()

	// Init tempo state
	if (!tempo) tempo = createTempoState()

	// Create marbles once at mount (component remounts per scene via {#key})
	const rails = untrack(() => scene.rails)

	// Create reactive signal and runtime maps
	const signalStates = $state<Array<{ intensity: number }>>(
		(() => {
			const signals: Array<{ intensity: number }> = []
			for (const { instruments } of rails) {
				instruments?.forEach(() => {
					signals.push({ intensity: 0 })
				})
			}
			return signals
		})()
	)

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const runtimeStates = $state<Array<Record<string, any>>>(
		(() => {
			const runtimes: Array<Record<string, any>> = []
			/* eslint-enable @typescript-eslint/no-explicit-any */
			for (const { instruments } of rails) {
				instruments?.forEach(() => {
					runtimes.push({})
				})
			}
			return runtimes
		})()
	)

	// Assign signals and runtimes to instruments (reactive references)
	let signalIndex = 0
	for (const { instruments } of rails) {
		instruments?.forEach((ins) => {
			ins.signal = signalStates[signalIndex]
			ins.runtime = runtimeStates[signalIndex]
			signalIndex++
		})
	}

	// Create reactive runtime states for rails
	const railRuntimeStates = $state<Array<{ color?: string }>>(rails.map(() => ({})))

	// Assign runtimes to rails (reactive references)
	for (let i = 0; i < rails.length; i++) {
		rails[i].runtime = railRuntimeStates[i]
	}

	const _init = (() => {
		const ms = []
		const indices: number[] = []
		for (let i = 0; i < rails.length; i++) {
			const { rail, marbles: mds } = rails[i]
			const resolvedRail = resolveRail(rail)

			const configs = mds && mds.length > 0 ? mds : mds === false ? [] : [{}]

			for (const m of configs) {
				ms.push(
					createMarble({
						resolvedRail,
						startBeat: m.start ?? 0,
						direction: m.direction ?? 'forward',
						sequenceMode: m.mode ?? 'looping',
						easing: m.easing ?? (easing || 'linear'),
						color: m.color,
						speed: m.speed ?? 1,
						note: m.note,
						type: m.type,
						bouncer: m.bouncer ?? false,
						...('sides' in m ? { sides: m.sides } : {}),
						...(m.type === 'coil' ? { rounds: m.rounds } : {})
					})
				)
				indices.push(i)
			}
		}
		return { ms, indices }
	})()
	let marbles = $state(_init.ms)
	const marbleRailIndices = _init.indices

	// Init rail visibility (reset if length mismatch from scene change)
	if (!railVisibility || railVisibility.length !== rails.length) {
		railVisibility = rails.map(() => true)
	}

	// Create scene context once at mount (non-reactive to avoid loops)
	const sceneCtx = (() => {
		const ctx = createSceneCtx(marbles, rails, marbleRailIndices, tempo)
		return ctx
	})()

	// Fire init handler on mount
	onMount(() => {
		if (scene.globalBeatHandler) {
			fireGlobalBeatInit(tempo, sceneCtx, scene.globalBeatHandler)
		}
	})

	// Fire destroy handler on unmount
	onDestroy(() => {
		if (scene.globalBeatHandler) {
			fireGlobalBeatDestroy(tempo, sceneCtx, scene.globalBeatHandler)
		}
	})

	// FPS tracking
	if (fps === undefined) fps = 0
	let frames = 0
	let lastTime = performance.now()

	// Update loop
	useTask((delta) => {
		// Calculate FPS
		frames++
		const now = performance.now()
		if (now >= lastTime + 1000) {
			fps = Math.round((frames * 1000) / (now - lastTime))
			frames = 0
			lastTime = now
		}

		updateTempo(tempo, delta * 1000)

		// Update scene context (beat/play state)
		if (sceneCtx) {
			updateSceneCtx(sceneCtx, tempo)
		}

		// Update easing based on prop (respect runtime overrides)
		for (const marble of marbles) {
			if (!marble.runtime.easing) {
				marble.config.easing = marble.config.easing || easing || 'linear'
			}
		}

		// Compute live rail indices (respects runtime switches)
		const marbleRailIndicesLive = marbles.map((m, i) => {
			const currentRailId = m.runtime.railId ?? m.config.resolvedRail.id
			const railIdx = rails.findIndex((r) => r.rail.id === currentRailId)
			return railIdx >= 0 ? railIdx : marbleRailIndices[i]
		})

		const instrumentsPerMarble = marbleRailIndicesLive.map((i) => rails[i].instruments || [])
		const railIdPerMarble = marbleRailIndicesLive.map((i) => rails[i].rail.id)
		updateMarbles(
			marbles,
			tempo,
			instrumentsPerMarble,
			railIdPerMarble,
			scene.triggerHandler,
			sceneCtx,
			scene.globalBeatHandler,
			scene.globalBeatResolution
		)
	})
</script>

{#if fxPost}
	<Bloom strength={0.5} radius={0.2} threshold={0.5} />
{/if}

<T.PerspectiveCamera makeDefault position={scene.camera ?? [5, 7, 9]} fov={30}>
	<OrbitControls
		enableDamping
		target={scene.target ?? [0, 1, 0]}
		{autoRotate}
		autoRotateSpeed={0.5}
	/>
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
<T.AmbientLight intensity={0.4} />

{#if showGrid}
	{#if !scene.polar}
		<T.GridHelper position.y={-0.01} args={[10, 10, 0x777777, 0x777777]} />
	{/if}
	{#if scene.polar}
		<T.PolarGridHelper position.y={-0.01} args={[5, 24, 10, 64, 0x777777, 0x777777]} />
	{/if}
{/if}

{#each rails as railData, railIndex (railIndex)}
	{#if railVisibility[railIndex]}
		<RailView
			{railData}
			width={0.06}
			{showPoints}
			{showBeats}
			{showNames}
			{wireframe}
			{fxRails}
			{fxInstruments}
			{tempo}
			{sceneCtx}
			renderPlayOnly={scene.renderPlayOnly}
		/>
	{/if}
{/each}

{#each marbles as _m, idx (idx)}
	{@const currentRailId = marbles[idx].runtime.railId ?? marbles[idx].config.resolvedRail.id}
	{@const railIdx = rails.findIndex((r) => r.rail.id === currentRailId)}
	{@const railIndex = railIdx >= 0 ? railIdx : marbleRailIndices[idx]}
	{#if railVisibility[railIndex]}
		<MarbleView
			bind:marble={marbles[idx]}
			rail={marbles[idx].config.resolvedRail}
			railData={rails[railIndex]}
			color={rails[railIndex].color || '#ffffff'}
			{wireframe}
			{fxMarbles}
		/>
	{/if}
{/each}
