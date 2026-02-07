<script lang="ts">
	import { Canvas, extend } from '@threlte/core'
	import { Pane, Checkbox, Slider, Folder, Monitor, List } from 'svelte-tweakpane-ui'
	import Scene from './components/Scene.svelte'
	import { createTempoState } from './lib/tempo'
	import { easingNames } from './lib/easing'
	import { rails } from './lib/rail-data'
	import { WebGPURenderer } from 'three/webgpu'
	import * as THREE from 'three/webgpu'
	
	extend(THREE)
	
	let showPoints = $state(false)
	let showBeats = $state(false)
	let tempo = $state(createTempoState())
	let easing = $state('linear')
	let railVisibility = $state(rails.map(() => true))

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
		<Checkbox label="play" bind:value={tempo.isPlaying} />
		<Slider label="BPM" bind:value={tempo.config.bpm} min={30} max={300} />
		<Monitor label="beat" value={Math.floor(tempo.currentBeat)} />
	</Folder>
	<Folder title="Marbles">
		<List label="easing" bind:value={easing} options={easingNames} />
	</Folder>
	<Folder title="Debug">
		<Checkbox label="points" bind:value={showPoints} />
		<Checkbox label="beats" bind:value={showBeats} />
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
	<Scene {showPoints} {showBeats} bind:tempo bind:easing bind:railVisibility />
</Canvas>
