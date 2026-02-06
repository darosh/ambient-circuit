<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Pane, Checkbox } from 'svelte-tweakpane-ui'
	import Scene from './components/Scene.svelte'

	let showPoints = $state(false)
</script>

<Pane title="Debug" position="fixed">
	<Checkbox label="points" bind:value={showPoints} />
</Pane>

<Canvas>
	<Scene {showPoints} />
</Canvas>
