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
		Element,
		Button,
		WaveformMonitor
	} from 'svelte-tweakpane-ui'
	import type { Theme } from 'svelte-tweakpane-ui'
	import Scene from './components/Scene.svelte'
	import { createTempoState } from './lib/tempo'
	import { easingNames } from './lib/easing'
	import { scenes } from './data'
	import { initMidi, setMidiPort, type MidiState, setMidiState } from './lib/midi/midi'
	import type { SelectedEntity } from './components/Scene.svelte'
	import type { AudioChain, AudioEngine, ParamValue } from './lib/audio/types'
	import { connectSharedAnalyzer } from './lib/audio/engine'
	import { WebGPURenderer } from 'three/webgpu'
	import { clearMarbleGeometryCache } from './lib/video/marble-geometry'
	import { clearInstrumentGeometryCache } from './lib/video/instrument-geometry'

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
	let showStats = $state(true)
	let fxPost = $state(true)
	let fxRails = $state(true)
	let fxMarbles = $state(true)
	let fxInstruments = $state(true)
	let fxText = $state(true)
	let autoRotate = $state(false)
	let fps = $state(0)
	let tempo = $state(createTempoState())
	let easing = $state('linear')
	let midiEnabled = $state(false)
	let debugEnabled = $state(true)
	let waveData = $state<number[]>([])
	let midiState = $state<MidiState | null>(null)
	let midiPortOptions = $derived(
		midiState ? midiState.outputs.map((p) => ({ text: p.name, value: p.id })) : []
	)
	let selectedMidiPort = $state<string | null>(null)

	let selectedEntity = $state<SelectedEntity>(null)
	let selectedAudioChain = $state<AudioChain | undefined>(undefined)
	let allAudioChains = $state<AudioChain[]>([])
	let soloMode = $state(false)
	let audioEngineRef = $state<AudioEngine | null>(null)
	let analyzerRafId = 0

	// Reactive param values for selected chain
	type ParamInfo = { path: string; value: number; min: number; max: number }
	let genParamInfos = $state<ParamInfo[]>([])
	let genParams = $state<Record<string, number>>({})
	let fxParamInfos = $state<Record<string, ParamInfo[]>>({})
	let fxParams = $state<Record<string, Record<string, number>>>({})

	// Populate params when selection/chain changes
	$effect(() => {
		if (!selectedAudioChain) {
			genParamInfos = []
			genParams = {}
			fxParamInfos = {}
			fxParams = {}
			return
		}
		const gInfos = selectedAudioChain.listParams()
		genParamInfos = gInfos
		const gp: Record<string, number> = {}
		for (const p of gInfos) {
			gp[p.path] = p.value
		}
		genParams = gp

		const fi: Record<string, ParamInfo[]> = {}
		const fp: Record<string, Record<string, number>> = {}
		const fxList = selectedAudioChain.config.fx ?? []
		for (let i = 0; i < fxList.length; i++) {
			const fInfos = selectedAudioChain.listFxParams(i)
			if (fInfos.length > 0) {
				fi[i.toString()] = fInfos
				const p: Record<string, number> = {}
				for (const f of fInfos) {
					p[f.path] = f.value
				}
				fp[i.toString()] = p
			}
		}
		fxParamInfos = fi
		fxParams = fp
	})

	// Push generator param changes to audio chain
	$effect(() => {
		if (!selectedAudioChain) return
		for (const [key, val] of Object.entries(genParams)) {
			selectedAudioChain.setParam(key, val)
		}
	})

	// Push fx param changes to audio chain
	$effect(() => {
		if (!selectedAudioChain) return
		for (const [idxStr, params] of Object.entries(fxParams)) {
			for (const [key, val] of Object.entries(params)) {
				selectedAudioChain.setFxParam(parseInt(idxStr), key, val)
			}
		}
	})

	// Solo: mute/unmute chains (compare by output identity to avoid Svelte proxy mismatch)
	$effect(() => {
		const selected = selectedAudioChain
		const solo = soloMode
		const chains = allAudioChains
		if (!chains.length) return
		const selectedOutput = selected?.output
		const now = chains[0]?.output?.context?.currentTime ?? 0
		for (const chain of chains) {
			const target = solo && selectedOutput && chain.output !== selectedOutput ? 0 : 1
			chain.output.gain.setValueAtTime(chain.output.gain.value, now)
			chain.output.gain.linearRampToValueAtTime(target, now + 0.1)
		}
	})

	// Clear solo when deselected
	$effect(() => {
		if (!selectedEntity) soloMode = false
	})

	// Shared analyzer: reconnect when selection changes
	$effect(() => {
		const chain = selectedAudioChain
		const engine = audioEngineRef
		if (engine) {
			connectSharedAnalyzer(engine, chain ?? null)
		}
	})

	// Analyzer visualization using shared Tone.Analyser
	$effect(() => {
		const engine = audioEngineRef
		const chain = selectedAudioChain
		if (analyzerRafId) {
			cancelAnimationFrame(analyzerRafId)
			analyzerRafId = 0
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const analyzer = engine?.sharedAnalyzer as any
		if (!analyzer || !chain) {
			waveData = []
			return
		}

		function draw() {
			const values = analyzer.getValue()
			if (values && values.length) {
				// Tone.Analyser returns Float32Array (dB values for FFT)
				// Normalize to 0-255 range for WaveformMonitor
				const arr: number[] = []
				for (let i = 0; i < values.length; i++) {
					// FFT values are in dB (-Infinity to 0), map to 0-255
					arr.push(Math.max(0, Math.min(255, (values[i] + 100) * 2.55)))
				}
				waveData = arr
			}
			analyzerRafId = requestAnimationFrame(draw)
		}
		draw()
	})

	let sceneId = $state(window.location.hash.slice(1) || scenes[0].id)
	let activeScene = $derived(scenes.find((s) => s.id === sceneId) ?? scenes[0])
	// eslint-disable-next-line svelte/prefer-writable-derived
	let railVisibility = $state<boolean[]>([])
	$effect(() => {
		railVisibility = activeScene.rails.map(() => true)
	})

	$effect(() => {
		window.location.hash = sceneId
		clearMarbleGeometryCache()
		clearInstrumentGeometryCache()
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
	<Pane title="Debug" position="fixed" width={320} theme={customizedTheme}>
		<List
			label="Scene"
			bind:value={sceneId}
			options={scenes.map((s) => ({ text: s.id.replaceAll('scene-', ''), value: s.id }))}
		/>
		<Checkbox label="Play" bind:value={tempo.isPlaying} />
		{#if selectedEntity}
			<Folder
				title={`Selected: ${selectedEntity.type}:${selectedEntity.railIdx}:${selectedEntity.idx}`}
				expanded={true}
			>
				{#if selectedAudioChain}
					<Checkbox label="Solo" bind:value={soloMode} />
					{#if genParamInfos.length > 0}
						<Folder title="Generator" expanded={true}>
							{#each genParamInfos as info (info.path)}
								<Slider
									label={info.path.split('.').pop() ?? info.path}
									bind:value={genParams[info.path]}
									min={info.min}
									max={info.max}
								/>
							{/each}
							<Button
								title="Copy params"
								on:click={() => {
									if (!selectedAudioChain) return
									const params: Record<string, ParamValue> = {}
									for (const [k, v] of Object.entries(genParams)) {
										params[k] = v
									}
									navigator.clipboard.writeText(JSON.stringify(params))
								}}
							/>
						</Folder>
					{/if}
					{#each selectedAudioChain.config.fx ?? [] as fxConfig, fxIdx (fxIdx)}
						{#if fxParamInfos[fxIdx.toString()]}
							<Folder
								title={'FX: ' + ('rnbo' in fxConfig ? fxConfig.rnbo : fxConfig.tone)}
								expanded={false}
							>
								{#each fxParamInfos[fxIdx.toString()] as info (info.path)}
									<Slider
										label={info.path.split('.').pop() ?? info.path}
										bind:value={fxParams[fxIdx.toString()][info.path]}
										min={info.min}
										max={info.max}
									/>
								{/each}
								<Button
									title="Copy params"
									on:click={() => {
										if (!selectedAudioChain) return
										const params: Record<string, ParamValue> = {}
										for (const [k, v] of Object.entries(fxParams[fxIdx.toString()])) {
											params[k] = v
										}
										navigator.clipboard.writeText(JSON.stringify(params))
									}}
								/>
							</Folder>
						{/if}
					{/each}
					<WaveformMonitor value={waveData} min={0} max={255} interval={100} />
				{/if}
			</Folder>
		{/if}
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
			<Checkbox label="Text" bind:value={fxText} />
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

			// antialias: false,
			antialias: true,
			forceWebGL: false,
			alpha: false,
			depth: false,
			samples: 2
			// outputBufferType: UnsignedByteType
		})

		// renderer.inspector = new Inspector()
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
			fxText={fxText && !wireframe}
			fxInstruments={fxInstruments && !wireframe}
			{autoRotate}
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
