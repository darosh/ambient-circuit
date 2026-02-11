<script lang="ts">
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
	import Scene from './components/Scene.svelte'
	import { createTempoState } from './lib/tempo'
	import { easingNames } from './lib/easing'
	import { scenes } from './data'
	import { initMidi, setMidiPort, type MidiState, setMidiState } from './lib/midi/midi'
	import { WebGPURenderer } from 'three/webgpu'

	// import * as THREE from 'three/webgpu'
	// extend(THREE)

	const buttonBackgroundColor = 'hsl(230, 7%, 10%)'
	const customizedTheme: Theme = {
		...ThemeUtils.presets.translucent,
		bladeValueWidth: '100px',
		buttonBackgroundColor,
		buttonBackgroundColorActive: buttonBackgroundColor,
		buttonBackgroundColorFocus: buttonBackgroundColor,
		buttonBackgroundColorHover: buttonBackgroundColor,
		buttonForegroundColor: 'hsl(230, 7%, 70%)'
	}

	let showGrid = $state(true)
	let showPoints = $state(false)
	let showBeats = $state(false)
	let showNames = $state(false)
	let wireframe = $state(false)
	let showStats = $state(true)
	let fxPost = $state(true)
	let fxRails = $state(true)
	let fxMarbles = $state(true)
	let fxInstruments = $state(true)
	let autoRotate = $state(false)
	let fps = $state(0)
	let tempo = $state(createTempoState())
	let easing = $state('linear')
	let midiEnabled = $state(false)
	let debugEnabled = $state(true)
	let midiState = $state<MidiState | null>(null)
	let midiPortOptions = $derived(
		midiState ? midiState.outputs.map((p) => ({ text: p.name, value: p.id })) : []
	)
	let selectedMidiPort = $state<string | null>(null)

	let sceneId = $state(window.location.hash.slice(1) || scenes[0].id)
	let activeScene = $derived(scenes.find((s) => s.id === sceneId) ?? scenes[0])
	// eslint-disable-next-line svelte/prefer-writable-derived
	let railVisibility = $state<boolean[]>([])
	$effect(() => {
		railVisibility = activeScene.rails.map(() => true)
	})

	$effect(() => {
		window.location.hash = sceneId
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

	function handleKeydown(e: KeyboardEvent) {
		if (e.code === 'Space' && e.target === document.body) {
			e.preventDefault()
			tempo.isPlaying = !tempo.isPlaying
		}

		if (e.code === 'KeyW' && e.target === document.body) {
			wireframe = !wireframe
		}

		if (e.code === 'KeyR' && e.target === document.body) {
			autoRotate = !autoRotate
		}

		if (e.code === 'KeyE' && e.target === document.body) {
			easing = easingNames[(easingNames.findIndex((x) => x === easing) + 1) % easingNames.length]
		}

		if (e.code === 'KeyB' && e.target === document.body) {
			showBeats = !showBeats
		}

		if (e.code === 'KeyN' && e.target === document.body) {
			showNames = !showNames
		}

		if (e.code === 'KeyG' && e.target === document.body) {
			showGrid = !showGrid
		}

		if (e.code === 'KeyM' && e.target === document.body) {
			midiEnabled = !midiEnabled
		}

		if (e.code === 'KeyD' && e.target === document.body) {
			debugEnabled = !debugEnabled
		}

		if (e.code === 'KeyF' && e.target === document.body) {
			showStats = !showStats
		}

		if (e.code === 'KeyS' && e.target === document.body) {
			sceneId = scenes[(scenes.findIndex((d) => d.id === sceneId) + 1) % scenes.length].id
		}

		if (e.code === 'KeyA' && e.target === document.body) {
			sceneId =
				scenes[(scenes.findIndex((d) => d.id === sceneId) - 1 + scenes.length) % scenes.length].id
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if debugEnabled}
	<Pane title="Debug" position="fixed" width={200} theme={customizedTheme}>
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
			<Checkbox label="Rails" bind:value={fxRails} />
			<Checkbox label="Marbles" bind:value={fxMarbles} />
			<Checkbox label="Instruments" bind:value={fxInstruments} />
			<Checkbox label="Auto Rotate" bind:value={autoRotate} />
		</Folder>
		<Folder title="Debug" expanded={false}>
			<Checkbox label="Stats" bind:value={showStats} />
			<Checkbox label="Grid" bind:value={showGrid} />
			<Checkbox label="Points" bind:value={showPoints} />
			<Checkbox label="Beats" bind:value={showBeats} />
			<Checkbox label="Names" bind:value={showNames} />
			<Checkbox label="Wireframe" bind:value={wireframe} />
			<Checkbox label="MIDI" bind:value={midiEnabled} />
			{#if midiEnabled && midiState && midiState.outputs.length > 0}
				<List label="Port" bind:value={selectedMidiPort} options={midiPortOptions} />
			{/if}
		</Folder>
		<Folder title="Rails" expanded={false}>
			{#each activeScene.rails as { rail }, i (rail.id)}
				{#if i < railVisibility.length}
					<Checkbox label={rail.id} bind:value={railVisibility[i]} />
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
			antialias: true,
			forceWebGL: false
		})

		renderer.dispose = () => {}

		return renderer
	}}
>
	{#key sceneId}
		<Scene
			scene={activeScene}
			{showGrid}
			{showPoints}
			{showBeats}
			{showNames}
			{wireframe}
			{showStats}
			fxPost={fxPost && !wireframe}
			fxRails={fxRails && !wireframe}
			fxMarbles={fxMarbles && !wireframe}
			fxInstruments={fxInstruments && !wireframe}
			{autoRotate}
			bind:tempo
			bind:easing
			bind:railVisibility
			bind:fps
		/>
	{/key}
</Canvas>

{#if showStats}
	<div class="fps">{fps}</div>
{/if}

<style>
	.fps {
		position: fixed;
		bottom: 8px;
		left: 8px;
		color: white;
		opacity: 0.5;
		font-size: 32px;
		pointer-events: none;
		text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
		z-index: 1000;
	}

	.help {
		font-family: 'Roboto Mono', 'Source Code Pro', Menlo, Courier, monospace;
		font-size: 13px;
		font-weight: 500;
		line-height: 18px;
		color: #fff;
		padding: 9px;
	}
</style>
