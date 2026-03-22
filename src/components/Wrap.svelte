<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import Scene from './Scene.svelte'
	import Bloom from './Bloom.svelte'
	import HudScene from './HudScene.svelte'
	import BloomHud from './BloomHud.svelte'
	import type { SceneCtx } from '../lib/core/scene-ctx'
	import type { AudioChain } from '../lib/audio'
	import { panelState } from '../lib/components/hud/panel-state.svelte'
	import { Vector3 } from 'three/webgpu'
	import {
		resolveMarbleOrVec,
		updateCameraForSplit,
		updateTargetLerp,
		type SplitCamState,
		type ResolvedTarget
	} from '../lib/components/multi-view/multi-view'

	let {
		sceneId,
		sceneIndex,
		activeScene,
		mountedScene,
		limitFps,
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
		onReady,
		freeze = false
	} = $props()

	let sceneCtx = $state<SceneCtx | undefined>()

	const DRAGGING_COOLDOWN = 1.6 // seconds
	const DRAGGING_DELAY = 800 // milliseconds

	// Single-view auto-camera state
	const _camState: SplitCamState = {
		radius: Math.hypot(5, 7, 9),
		yaw: 0,
		pitch: 0,
		inited: false,
		isDragging: false,
		isDraggingEnd: 0
	}
	const _lerpTargetPos = new Vector3(0, 1, 0)
	const _resolvedCam: ResolvedTarget = {
		pos: new Vector3(),
		tangent: new Vector3(),
		hasTangent: false
	}
	const _resolvedTarget: ResolvedTarget = {
		pos: new Vector3(),
		tangent: new Vector3(),
		hasTangent: false
	}
	const _desired = new Vector3()

	const { camera: threlteCamera } = useThrelte()

	useTask(
		(delta) => {
			const autoCfg = activeScene?.autoCamera
			if (!autoCfg || !sceneCtx?.autoCamera) return
			const state = sceneCtx.autoCamera
			if (state.camera == null) return

			const cam = threlteCamera.current
			if (!cam) return

			if (_camState.isDraggingEnd > 0) _camState.isDraggingEnd -= delta

			// Resolve target
			const targetVal = state.target
			const defaultTarget = activeScene.target ?? ([0, 1, 0] as [number, number, number])
			const tgt =
				targetVal == null
					? null
					: resolveMarbleOrVec(
							targetVal as Parameters<typeof resolveMarbleOrVec>[0],
							sceneCtx,
							_resolvedTarget
						)
			const targetPos = tgt
				? tgt.pos
				: _resolvedTarget.pos.set(defaultTarget[0], defaultTarget[1], defaultTarget[2])

			const alphaTarget = 1 - Math.exp(-state.smoothnessTarget * delta * 60)
			updateTargetLerp(_lerpTargetPos, targetPos, alphaTarget, _camState.inited)

			// Resolve camera position
			const camResolved = resolveMarbleOrVec(
				state.camera as Parameters<typeof resolveMarbleOrVec>[0],
				sceneCtx,
				_resolvedCam
			)
			if (!camResolved) return

			_desired.copy(camResolved.pos)
			if (autoCfg.tangentOffset && camResolved.hasTangent) {
				_desired.addScaledVector(camResolved.tangent, -autoCfg.tangentOffset)
			}

			const camPos = cam.position
			updateCameraForSplit(camPos, _camState, state, _lerpTargetPos, _desired, delta)
			cam.lookAt(_lerpTargetPos)
		},
		{ autoInvalidate: false }
	)

	let _orbitControls = $state<
		import('three/addons/controls/OrbitControls.js').OrbitControls | undefined
	>()
	let _dragTimeout: ReturnType<typeof setTimeout> | undefined

	$effect(() => {
		const oc = _orbitControls
		if (!oc || !activeScene?.autoCamera) return
		const onStart = () => {
			_camState.isDragging = true
			clearTimeout(_dragTimeout)
		}
		const onEnd = () => {
			clearTimeout(_dragTimeout)
			_dragTimeout = setTimeout(() => {
				_camState.isDraggingEnd = DRAGGING_COOLDOWN
				_camState.isDragging = false
			}, DRAGGING_DELAY)
		}
		oc.addEventListener('start', onStart)
		oc.addEventListener('end', onEnd)
		return () => {
			oc.removeEventListener('start', onStart)
			oc.removeEventListener('end', onEnd)
			clearTimeout(_dragTimeout)
		}
	})

	// Reset cam state on scene change
	$effect(() => {
		if (activeScene) {
			_camState.inited = false
			_lerpTargetPos.set(0, 1, 0)
		}
	})

	function onAudioTargetChange(target: string) {
		if (!audioEngineRef) return
		if (target.startsWith('chain:')) {
			const idx = Number.parseInt(target.slice(6))
			const chains = audioEngineRef.instanceChains.filter((ch: AudioChain) => ch.generator)
			if (chains[idx]) selectedAudioChain = chains[idx]
		} else {
			selectedAudioChain = undefined
		}
	}
</script>

{#snippet hudContent(_arg?: unknown)}
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
			{sceneIndex}
			{fps}
			bind:showStats
			bind:wireframe
			bind:showAnalyzers
			bind:showAudio
			{selectedAudioChain}
			{onAudioTargetChange}
		/>
	{/if}
{/snippet}

{#if mountedScene}
	<Scene
		onSceneCtx={(ctx) => (sceneCtx = ctx)}
		scene={mountedScene}
		{limitFps}
		{showGrid}
		{showPoints}
		{showBeats}
		{showNames}
		{wireframe}
		{showStats}
		{showAnalyzers}
		fxPost={fxPost && !wireframe}
		{showAudio}
		bind:tempo
		bind:easing
		bind:railVisibility
		bind:fps
		bind:selectedEntity
		bind:selectedAudioChain
		bind:allAudioChains
		bind:audioEngineRef
		hudContent={mountedScene.view ? hudContent : undefined}
		{onReady}
	/>
{/if}

{#if !activeScene.view}
	<T.PerspectiveCamera
		makeDefault
		position={activeScene.camera ?? [5, 7, 9]}
		fov={activeScene.autoCamera?.fov ?? 30}
	>
		<OrbitControls
			bind:ref={_orbitControls}
			enableDamping
			enabled={!panelState.pointerLock}
			target={activeScene.target ?? [0, 1, 0]}
			autoRotate={activeScene.rotatePlay && tempo.isPlaying ? true : autoRotate}
			autoRotateSpeed={(activeScene.rotatePlay ?? 1) * 0.5}
		/>
	</T.PerspectiveCamera>

	<!-- Example: <BloomHud hudFx={fxPost ? (color) => gaussianBlur(color, null, 2) : undefined} -->
	{#if fxPost && !(showHud && activeScene && tempo)}
		<Bloom tint={activeScene.tint} />
	{:else}
		<BloomHud enabled={fxPost} hudBloom={fxPost && fxHud} tint={activeScene.tint}>
			{#snippet children(_arg)}
				<!-- eslint-disable-next-line sonarjs/no-use-of-empty-return-value -->
				{@render hudContent(_arg)}
			{/snippet}
		</BloomHud>
	{/if}
{/if}
