<script>
	import { T } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import Scene from './Scene.svelte'
	import Bloom from './Bloom.svelte'
	import HudScene from './HudScene.svelte'
	import BloomHud from './BloomHud.svelte'

	let {
		sceneId,
		activeScene,
		showGrid,
		showPoints,
		showBeats,
		showNames,
		wireframe,
		showStats,
		showHud,
		fxHud,
		fxPost,
		fxRails,
		fxMarbles,
		fxText,
		fxInstruments,
		showAudio,
		tempo = $bindable(),
		easing,
		railVisibility = $bindable(),
		fps = $bindable(),
		selectedEntity,
		selectedAudioChain,
		allAudioChains = $bindable(),
		audioEngineRef,
		autoRotate
	} = $props()
</script>

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
		fxText={fxText && !wireframe}
		fxInstruments={fxInstruments && !wireframe}
		{showAudio}
		bind:tempo
		bind:easing
		bind:railVisibility
		bind:fps
		bind:selectedEntity
		bind:selectedAudioChain
		bind:allAudioChains
		bind:audioEngineRef
	/>
{/key}

<T.PerspectiveCamera makeDefault position={activeScene.camera ?? [5, 7, 9]} fov={30}>
	<OrbitControls
		enableDamping
		target={activeScene.target ?? [0, 1, 0]}
		autoRotate={activeScene.rotatePlay && tempo.isPlaying ? true : autoRotate}
		autoRotateSpeed={(activeScene.rotatePlay ?? 1) * 0.5}
	/>
</T.PerspectiveCamera>

<!-- Example: <BloomHud hudFx={fxPost ? (color) => gaussianBlur(color, null, 2) : undefined} -->

{#if fxPost && !showHud}
	<Bloom strength={0.5} radius={0.2} threshold={0.5} tint={activeScene.tint} />
{:else}
	<BloomHud
		enabled={fxPost}
		hudBloom={fxPost && fxHud}
		strength={0.5}
		radius={0.2}
		threshold={0.5}
		tint={activeScene.tint}
	>
		{#if showHud}
			<HudScene
				baseColor={activeScene?.audioView?.color}
				engine={audioEngineRef}
				defaultAnalyser={activeScene?.audioView?.defaultAnalyser}
			/>
		{/if}
	</BloomHud>
{/if}
