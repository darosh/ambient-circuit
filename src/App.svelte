<script lang="ts">
	import { Canvas, extend } from '@threlte/core'
	import { Pane, Checkbox, Slider, Folder, Monitor, List } from 'svelte-tweakpane-ui'
	import Scene from './components/Scene.svelte'
	import { createTempoState } from './lib/tempo'
	import { easingNames } from './lib/easing'
	import { rails } from './lib/rail-data'
	import { initMidi, setMidiPort, type MidiState } from './lib/midi'
	import { WebGPURenderer } from 'three/webgpu'
	import * as THREE from 'three/webgpu'

	extend(THREE)
	
	let showGrid = $state(true)
	let showPoints = $state(false)
	let showBeats = $state(false)
	let showStats = $state(true)
	let fxPost = $state(true)
	let fxRails = $state(true)
	let fxMarbles = $state(true)
	let fxInstruments = $state(true)
	let fps = $state(0)
	let tempo = $state(createTempoState())
	let easing = $state('linear')
	let railVisibility = $state(rails.map(() => true))
	let midiEnabled = $state(false)
	let midiState = $state<MidiState | null>(null)
	let midiPortOptions = $derived(midiState ? midiState.outputs.map(p => ({ text: p.name, value: p.id })) : [])
	let selectedMidiPort = $state<string | null>(null)

	// Lazy init MIDI when enabled
	$effect(() => {
		if (midiEnabled && !midiState) {
			initMidi().then(state => {
				midiState = state
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
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<Pane title="Debug" position="fixed">
	<Folder title="Tempo">
		<Checkbox label="Play" bind:value={tempo.isPlaying} />
		<Slider label="BPM" bind:value={tempo.config.bpm} min={30} max={300} />
		<Monitor label="Beat" value={Math.floor(tempo.currentBeat)} />
	</Folder>
	<Folder title="Marbles">
		<List label="Easing" bind:value={easing} options={easingNames} />
	</Folder>
	<Folder title="FX">
		<Checkbox label="Post" bind:value={fxPost} />
		<Checkbox label="Rails" bind:value={fxRails} />
		<Checkbox label="Marbles" bind:value={fxMarbles} />
		<Checkbox label="Instruments" bind:value={fxInstruments} />
	</Folder>
	<Folder title="Debug">
		<Checkbox label="Stats" bind:value={showStats} />
		<Checkbox label="Grid" bind:value={showGrid} />
		<Checkbox label="Points" bind:value={showPoints} />
		<Checkbox label="Beats" bind:value={showBeats} />
		<Checkbox label="MIDI" bind:value={midiEnabled} />
		{#if midiEnabled && midiState && midiState.outputs.length > 0}
			<List label="Port" bind:value={selectedMidiPort} options={midiPortOptions} />
		{/if}
	</Folder>
	<Folder title="Rails" expanded={false}>
		{#each rails as { rail }, i (rail.id)}
			<Checkbox label={rail.id} bind:value={railVisibility[i]} />
		{/each}
	</Folder>
</Pane>

<Canvas createRenderer={(canvas) => {
    return new WebGPURenderer({
      canvas,
      antialias: true,
      forceWebGL: false
    })
  }}>
	<Scene {showGrid} {showPoints} {showBeats} {showStats} {fxPost} {fxRails} {fxMarbles} {fxInstruments} {midiState} bind:tempo bind:easing bind:railVisibility bind:fps />
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
		opacity: .5;
		font-size: 32px;
		pointer-events: none;
		text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
		z-index: 1000;
	}
</style>
