<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Pane, Checkbox, Slider, Folder, Monitor, List } from 'svelte-tweakpane-ui'
	import Scene from './components/Scene.svelte'
	import { createTempoState } from './lib/tempo'
	import { easingNames } from './lib/easing'

	let showPoints = $state(false)
	let showBeats = $state(false)
	let tempo = $state(createTempoState())
	let easing = $state('linear')
	let railVisibility = $state([true, true, true, true, true, true]) // 6 rails
</script>

<Pane title="Debug" position="fixed">
	<Folder title="Tempo">
		<Checkbox label="play" bind:value={tempo.isPlaying} />
		<Slider label="BPM" bind:value={tempo.config.bpm} min={30} max={300} />
		<Monitor label="beat" value={Math.floor(tempo.currentBeat)} />
	</Folder>
	<Folder title="Marbles">
		<List label="easing" bind:value={easing} options={easingNames} />
	</Folder>
	<Folder title="Rails">
		<Checkbox label="rail1" bind:value={railVisibility[0]} />
		<Checkbox label="rail2" bind:value={railVisibility[1]} />
		<Checkbox label="rail3" bind:value={railVisibility[2]} />
		<Checkbox label="rail4" bind:value={railVisibility[3]} />
		<Checkbox label="rail5" bind:value={railVisibility[4]} />
		<Checkbox label="fork-demo" bind:value={railVisibility[5]} />
	</Folder>
	<Folder title="Debug">
		<Checkbox label="points" bind:value={showPoints} />
		<Checkbox label="beats" bind:value={showBeats} />
	</Folder>
</Pane>

<Canvas>
	<Scene {showPoints} {showBeats} bind:tempo bind:easing bind:railVisibility />
</Canvas>
