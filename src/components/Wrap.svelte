<script lang="ts">
	import { T } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import Scene from './Scene.svelte'
	import Bloom from './Bloom.svelte'
	import HudScene from './HudScene.svelte'
	import BloomHud from './BloomHud.svelte'
	import type { SceneCtx } from '../lib/scene-ctx'

	let {
		sceneId,
		activeScene,
		showGrid,
		showPoints,
		showBeats,
		showNames,
		wireframe = $bindable(false),
		showStats = $bindable(false),
		showAnalyzers = $bindable(true),
		showAudio = $bindable(true),
		showHud,
		fxHud,
		fxPost,
		fxRails,
		fxMarbles,
		fxText,
		fxInstruments,
		tempo = $bindable(),
		easing,
		railVisibility = $bindable(),
		fps = $bindable(),
		selectedEntity = $bindable(),
		selectedAudioChain = $bindable(),
		allAudioChains = $bindable(),
		audioEngineRef = $bindable(),
		autoRotate,
		onPlay,
		onStop,
		onRewind,
		onNextScene,
		onPrevScene,
		freeze = false
	} = $props()

	let sceneCtx = $state<SceneCtx | undefined>(undefined)
</script>

{#key sceneId}
	<Scene
		onSceneCtx={(ctx) => (sceneCtx = ctx)}
		scene={activeScene}
		{showGrid}
		{showPoints}
		{showBeats}
		showNames={activeScene.names ?? showNames}
		{wireframe}
		{showStats}
		{showAnalyzers}
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

{#if fxPost && !(showHud && activeScene && tempo)}
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
		{#if showHud && activeScene && tempo}
			<HudScene
				baseColor={activeScene?.audioView?.color}
				engine={audioEngineRef}
				defaultAnalyser={activeScene?.audioView?.defaultAnalyser}
				title={sceneId.replace('scene-', '')}
				currentBeat={tempo?.currentBeat ?? 0}
				bpm={tempo?.config?.bpm ?? 120}
				{tempo}
				description={activeScene.description}
				beatsVisible={activeScene.sequencerBeats}
				sequencerMode={activeScene.sequencerMode}
				sequencerColors={activeScene.sequencerColors}
				{onPlay}
				{onStop}
				{onRewind}
				{onNextScene}
				{onPrevScene}
				{freeze}
				{sceneCtx}
				{fps}
				bind:showStats
				bind:wireframe
				bind:showAnalyzers
				bind:showAudio
			/>
		{/if}
	</BloomHud>
{/if}
