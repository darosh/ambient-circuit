<script lang="ts">
	// import { Inspector } from 'three/addons/inspector/Inspector.js'
	import { Canvas } from '@threlte/core'
	import {
		ThemeUtils,
		Pane,
		Checkbox,
		Slider,
		Folder,
		Monitor,
		List,
		Element
	} from 'svelte-tweakpane-ui'
	import type { Theme } from 'svelte-tweakpane-ui'
	import { createTempoState } from './lib/core/tempo'
	import { easingNames } from './lib/helpers/easing'
	import { scenes } from './scenes'
	import { initMidi, setMidiPort, type MidiState, setMidiState } from './lib/midi/midi'
	import type { SelectedEntity } from './components/Scene.svelte'
	import type { AudioChain, AudioEngine } from './lib/audio/types'
	import { connectSharedAnalyzer } from './lib/audio/engine'
	import { WebGPURenderer } from 'three/webgpu'
	import { clearMarbleGeometryCache } from './lib/video/geometry-marble'
	import { clearInstrumentGeometryCache } from './lib/video/geometry-instrument'
	import { clearGeoTextCache } from './lib/video/geometry-text'
	import { clearTubeTextCache } from './lib/video/geometry-text-tube'
	import { clearMixedTextParsedCache } from './lib/video/geometry-text-mixed'
	import { clearImpactMaterialCache } from './lib/video/material-impact'
	import { clearStandardMaterialCache } from './lib/video/material-standard'
	import Wrap from './components/Wrap.svelte'
	import { createKeydownHandler } from './lib/helpers/keyboard'
	import { onMount, tick, untrack } from 'svelte'
	import './components/GeoText.svelte'
	import { font, fontCache } from './lib/video/geometry-text'
	import { Font } from 'three/examples/jsm/loaders/FontLoader.js'
	import { globalState } from './components/global-state.svelte'
	import GlobalState from './components/GlobalState.svelte'

	// import * as THREE from 'three/webgpu'
	// extend(THREE)

	const buttonBackgroundColor = 'hsl(230, 7%, 16%)'
	const inputBackgroundColor = 'hsl(230, 7%, 24%)'
	const customizedTheme: Theme = {
		...ThemeUtils.presets.translucent,
		bladeValueWidth: '160px',
		buttonBackgroundColor,
		buttonBackgroundColorActive: buttonBackgroundColor,
		buttonBackgroundColorFocus: buttonBackgroundColor,
		buttonBackgroundColorHover: buttonBackgroundColor,
		buttonForegroundColor: 'hsl(230, 7%, 70%)',
		inputBackgroundColor,
		inputBackgroundColorActive: inputBackgroundColor,
		inputBackgroundColorFocus: inputBackgroundColor,
		inputBackgroundColorHover: inputBackgroundColor
	}

	let showGrid = $state(true)
	let showPoints = $state(false)
	let showBeats = $state(false)
	let showNames = $state(false)
	let wireframe = $state(false)
	let showStats = $state(false)
	let showAnalyzers = $state(true)
	let showHud = $state(false)
	let useFreeze = $state(false)
	let fxPost = $state(true)
	let fxHud = $state(true)
	let autoRotate = $state(false)
	let showAudio = $state(true)
	let fps = $state(0)
	let tempo = $state(createTempoState())
	let easing = $state('linear')
	let midiEnabled = $state(false)
	let debugEnabled = $state(false)
	let midiState = $state<MidiState | null>(null)
	let midiPortOptions = $derived(
		midiState ? midiState.outputs.map((p) => ({ text: p.name, value: p.id })) : []
	)
	let selectedMidiPort = $state<string | null>(null)

	let selectedEntity = $state<SelectedEntity>(null)
	let selectedAudioChain = $state.raw<AudioChain | undefined>()
	let allAudioChains = $state.raw<AudioChain[]>([])
	let audioEngineRef = $state.raw<AudioEngine | null>(null)

	onMount(async () => {
		fontCache.font = <Font>await font
		setTimeout(() => {
			showHud = true
		}, 0)
	})

	// Shared analyzer: reconnect when selection changes
	$effect(() => {
		const engine = audioEngineRef
		if (!engine) return
		if (selectedAudioChain) {
			connectSharedAnalyzer(engine, selectedAudioChain)
		} else {
			connectSharedAnalyzer(engine, null)
		}
	})

	function parseHash(hash: string) {
		const raw = hash.slice(1)
		const q = raw.indexOf('?')
		if (q === -1) return { id: raw, params: new URLSearchParams() }
		return { id: raw.slice(0, q), params: new URLSearchParams(raw.slice(q + 1)) }
	}

	const initialHash = parseHash(globalThis.location.hash)
	let sceneId = $state(initialHash.id || scenes[0].id)

	$effect(() => {
		function onHashChange() {
			const h = parseHash(globalThis.location.hash)
			sceneId = h.id || scenes[0].id
		}

		globalThis.addEventListener('hashchange', onHashChange)
		return () => globalThis.removeEventListener('hashchange', onHashChange)
	})

	$effect(() => {
		if (initialHash.params.has('play')) tempo.isPlaying = true
	})
	let activeScene = $derived(scenes.find((s) => s.id === sceneId) ?? scenes[0])
	let mountedScene = $state<typeof activeScene | null>(untrack(() => activeScene))

	// Sequence scene switches: unmount old (onDestroy fires) before mounting new
	$effect(() => {
		const scene = activeScene
		if (untrack(() => mountedScene)?.id === scene.id) return
		mountedScene = null
		tick().then(() => {
			mountedScene = scene
		})
	})

	// Called by Scene.svelte onMount — geometries created during Threlte's first RAF,
	// so sweep after two RAFs to ensure all refCounts are incremented
	function onSceneReady() {
		clearMarbleGeometryCache()
		clearInstrumentGeometryCache()
		clearGeoTextCache()
		clearTubeTextCache()
		clearMixedTextParsedCache()
		clearImpactMaterialCache()
		clearStandardMaterialCache()
	}

	// eslint-disable-next-line svelte/prefer-writable-derived
	let railVisibility = $state<boolean[]>([])
	$effect(() => {
		railVisibility = activeScene.rails.map((rail) => rail.visible !== false)
	})

	$effect(() => {
		if (
			globalThis.location.hash === `#${sceneId}` ||
			globalThis.location.hash.startsWith(`#${sceneId}?`)
		) {
			return
		}

		globalThis.location.hash = sceneId
		selectedEntity = null
	})

	$effect(() => {
		tempo.config.bpm = activeScene.bpm
		tempo.beatProgress = 0
		tempo.currentBeat = 0
	})

	// Lazy init MIDI when enabled
	$effect(() => {
		if (midiEnabled && !midiState) {
			initMidi().then((state) => {
				midiState = state
				setMidiState(midiState)
				selectedMidiPort = state.selectedPortId
			})
		}
	})

	// Update port when changed
	$effect(() => {
		if (midiState && selectedMidiPort) {
			setMidiPort(midiState, selectedMidiPort)
		}
	})

	// Update enabled state
	$effect(() => {
		if (midiState) {
			midiState.enabled = midiEnabled
		}
	})

	let sceneIndex = $derived(scenes.findIndex((d) => d.id === sceneId))

	const handleKeydown = createKeydownHandler([
		{
			code: 'Space',
			action: (event) => {
				tempo.isPlaying = !tempo.isPlaying

				if (!tempo.isPlaying && event.shiftKey) {
					useFreeze = true
				} else if (!tempo.isPlaying && !event.shiftKey) {
					useFreeze = false
				}
			}
		},
		{ code: 'KeyW', action: () => (wireframe = !wireframe) },
		{ code: 'KeyR', action: () => (autoRotate = !autoRotate) },
		{
			code: 'KeyE',
			action: () => (easing = easingNames[(easingNames.indexOf(easing) + 1) % easingNames.length])
		},
		{ code: 'KeyB', action: () => (showBeats = !showBeats) },
		{ code: 'KeyN', action: () => (showNames = !showNames) },
		{ code: 'KeyG', action: () => (showGrid = !showGrid) },
		{ code: 'KeyM', action: () => (midiEnabled = !midiEnabled) },
		{ code: 'KeyD', action: () => (debugEnabled = !debugEnabled) },
		{ code: 'KeyF', action: () => (showStats = !showStats) },
		{
			code: 'KeyS',
			action: () =>
				(sceneId = scenes[(scenes.findIndex((d) => d.id === sceneId) + 1) % scenes.length].id)
		},
		{
			code: 'ArrowRight',
			action: () =>
				(sceneId = scenes[(scenes.findIndex((d) => d.id === sceneId) + 1) % scenes.length].id)
		},
		{
			code: 'KeyA',
			action: () =>
				(sceneId =
					scenes[(scenes.findIndex((d) => d.id === sceneId) - 1 + scenes.length) % scenes.length]
						.id)
		},
		{
			code: 'ArrowLeft',
			action: () =>
				(sceneId =
					scenes[(scenes.findIndex((d) => d.id === sceneId) - 1 + scenes.length) % scenes.length]
						.id)
		},
		{
			code: 'ArrowDown',
			action: () => {
				tempo.rewind++
				tempo.currentBeat = 0
				tempo.beatProgress = 0
			}
		},
		{
			code: 'ArrowUp',
			action: () => {
				globalState.isMuted = !globalState.isMuted
			}
		}
	])
</script>

<GlobalState engine={audioEngineRef}></GlobalState>
<svelte:window onkeydown={handleKeydown} />

{#if debugEnabled}
	<Pane title={`Debug v${__APP_VERSION__}`} position="fixed" width={320} theme={customizedTheme}>
		<List
			label="Scene"
			bind:value={sceneId}
			options={scenes.map((s) => ({ text: s.id.replaceAll('scene-', ''), value: s.id }))}
		/>
		<Checkbox label="Play" bind:value={tempo.isPlaying} />
		<Folder title="Tempo" expanded={false}>
			<Slider label="BPM" bind:value={tempo.config.bpm} min={30} max={300} />
			<Monitor label="Beat" value={Math.floor(tempo.currentBeat)} />
		</Folder>
		<Folder title="FX" expanded={false}>
			<List label="Easing" bind:value={easing} options={easingNames} />
			<Checkbox label="Post" bind:value={fxPost} />
			<Checkbox label="Hud" bind:value={fxHud} />
			<Checkbox label="Auto Rotate" bind:value={autoRotate} />
		</Folder>
		<Folder title="Debug" expanded={false}>
			<Checkbox label="HUD" bind:value={showHud} />
			<Checkbox label="Stats" bind:value={showStats} />
			<Checkbox label="Grid" bind:value={showGrid} />
			<Checkbox label="Points" bind:value={showPoints} />
			<Checkbox label="Beats" bind:value={showBeats} />
			<Checkbox label="Names" bind:value={showNames} />
			<Checkbox label="Wireframe" bind:value={wireframe} />
			<Checkbox label="Freeze" bind:value={useFreeze} />
			<Checkbox label="Audio" bind:value={showAudio} />
			<Checkbox label="MIDI" bind:value={midiEnabled} />
			{#if midiEnabled && midiState && midiState.outputs.length > 0}
				<List label="Port" bind:value={selectedMidiPort} options={midiPortOptions} />
			{/if}
		</Folder>
		<Folder title="Rails" expanded={false}>
			{#each activeScene.rails as rc, i (rc.id)}
				{#if i < railVisibility.length}
					<Checkbox label={rc.id} bind:value={railVisibility[i]} />
				{/if}
			{/each}
		</Folder>
		<Folder title="Hotkeys" expanded={false}>
			<Element>
				<div class="help">
					Space: Play<br />
					D: Debug<br />
					F: FPS<br />
					<br />
					W: Wireframe<br />
					R: Rotation<br />
					E: Easing<br />
					B: Beats<br />
					N: Names<br />
					G: Grid<br />
					M: MIDI<br />
					S: Next scene<br />
					A: Previous scene<br />
				</div>
			</Element>
		</Folder>
	</Pane>
{/if}

<Canvas
	createRenderer={(canvas) => {
		const renderer = new WebGPURenderer({
			canvas,

			// antialias: false,
			antialias: true,
			forceWebGL: false,
			alpha: true,
			depth: false,
			samples: 2
			// outputBufferType: UnsignedByteType
		})

		// renderer.inspector = new Inspector()
		renderer.dispose = () => {}

		return renderer
	}}
>
	<Wrap
		{sceneId}
		{sceneIndex}
		{activeScene}
		{mountedScene}
		{showGrid}
		{showPoints}
		{showBeats}
		{showNames}
		bind:wireframe
		bind:showStats
		bind:showAnalyzers
		{showHud}
		freeze={useFreeze && !tempo.isPlaying}
		fxPost={fxPost && !wireframe}
		{fxHud}
		{showAudio}
		bind:tempo
		{easing}
		bind:railVisibility
		bind:fps
		bind:selectedEntity
		bind:selectedAudioChain
		bind:allAudioChains
		bind:audioEngineRef
		{autoRotate}
		onPlay={(event: MouseEvent) => {
			tempo.isPlaying = !tempo.isPlaying

			if (!tempo.isPlaying && event.shiftKey) {
				useFreeze = true
			} else if (!tempo.isPlaying && !event.shiftKey) {
				useFreeze = false
			}
		}}
		onStop={(event: MouseEvent) => {
			tempo.isPlaying = false

			if (!tempo.isPlaying && event.shiftKey) {
				useFreeze = true
			} else if (!tempo.isPlaying && !event.shiftKey) {
				useFreeze = false
			}
		}}
		onRewind={() => {
			tempo.rewind++
			tempo.currentBeat = 0
			tempo.beatProgress = 0
		}}
		onNextScene={() =>
			(sceneId = scenes[(scenes.findIndex((d) => d.id === sceneId) + 1) % scenes.length].id)}
		onPrevScene={() =>
			(sceneId =
				scenes[(scenes.findIndex((d) => d.id === sceneId) - 1 + scenes.length) % scenes.length].id)}
		onReady={onSceneReady}
	></Wrap>
</Canvas>

<style>
	.help {
		font-family: 'Roboto Mono', 'Source Code Pro', Menlo, Courier, monospace;
		font-size: 12px;
		font-weight: 500;
		line-height: 18px;
		color: #fff;
		padding: 9px;
	}

	:global(.tp-dfwv) {
		overflow-y: scroll;
		max-height: calc(100vh - 16px);
	}
</style>
