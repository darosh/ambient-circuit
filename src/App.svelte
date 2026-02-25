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
	import { createTempoState } from './lib/tempo'
	import { easingNames } from './lib/easing'
	import { scenes } from './scenes'
	import { initMidi, setMidiPort, type MidiState, setMidiState } from './lib/midi/midi'
	import type { SelectedEntity } from './components/Scene.svelte'
	import type {
		AudioChain,
		AudioBus,
		AudioEngine,
		ParamValue,
		NodePresetInfo
	} from './lib/audio/types'
	import {
		cfgName,
		connectSharedAnalyzer,
		genName,
		setBusFxParam,
		soloChain
	} from './lib/audio/engine'
	import { WebGPURenderer } from 'three/webgpu'
	import { clearMarbleGeometryCache } from './lib/video/marble-geometry'
	import { clearInstrumentGeometryCache } from './lib/video/instrument-geometry'
	import Wrap from './components/Wrap.svelte'
	import { createKeydownHandler } from './lib/helpers/keyboard'
	import { readChainParams, readBusParams, type ParamInfo } from './lib/helpers/audio-params'
	import { onMount } from 'svelte'
	import './components/GeoText.svelte'
	import { font, fontCache } from './lib/video/geo-geometry'
	import { Font } from 'three/examples/jsm/loaders/FontLoader.js'

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
	let fxRails = $state(true)
	let fxMarbles = $state(true)
	let fxInstruments = $state(true)
	let fxText = $state(true)
	let autoRotate = $state(false)
	let showAudio = $state(true)
	let fps = $state(0)
	let tempo = $state(createTempoState())
	let easing = $state('linear')
	let midiEnabled = $state(false)
	let debugEnabled = $state(false)
	let waveData = $state<number[]>([])
	let midiState = $state<MidiState | null>(null)
	let midiPortOptions = $derived(
		midiState ? midiState.outputs.map((p) => ({ text: p.name, value: p.id })) : []
	)
	let selectedMidiPort = $state<string | null>(null)

	let selectedEntity = $state<SelectedEntity>(null)
	let selectedAudioChain = $state.raw<AudioChain | undefined>(undefined)
	let allAudioChains = $state.raw<AudioChain[]>([])
	let soloMode = $state(false)
	let audioEngineRef = $state.raw<AudioEngine | null>(null)
	let selectedAudioTarget = $state<string>('')
	let analyzerRafId = 0

	onMount(async () => {
		fontCache.font = <Font>await font
		setTimeout(() => {
			showHud = true
		}, 0)
	})

	// Build dropdown options for chain/bus/master selector
	let audioTargetOptions = $derived(
		(() => {
			const opts: { text: string; value: string }[] = []
			if (!audioEngineRef) return opts
			// Chains (by index, show config id or index)
			for (let i = 0; i < allAudioChains.length; i++) {
				const c = allAudioChains[i]
				const label = c.config.id ?? `chain:${i}`
				opts.push({ text: label, value: `chain:${i}` })
			}
			// Buses
			for (const name of audioEngineRef.buses.keys()) {
				opts.push({ text: `bus:${name}`, value: `bus:${name}` })
			}
			// Master
			if (audioEngineRef.masterChain) {
				opts.push({ text: 'master', value: 'master' })
			}
			return opts
		})()
	)

	// Resolve selected target to chain or bus
	function getTargetChain(): AudioChain | null {
		if (!audioEngineRef || !selectedAudioTarget) return null
		if (selectedAudioTarget.startsWith('chain:')) {
			const idx = parseInt(selectedAudioTarget.slice(6))
			return allAudioChains[idx] ?? null
		}
		return null
	}

	function getTargetBus(): AudioBus | null {
		if (!audioEngineRef || !selectedAudioTarget) return null
		if (selectedAudioTarget.startsWith('bus:')) {
			return audioEngineRef.buses.get(selectedAudioTarget.slice(4)) ?? null
		}
		if (selectedAudioTarget === 'master') {
			return audioEngineRef.masterChain
		}
		return null
	}

	// Bus fx params state
	let busFxParamInfos = $state<Record<string, ParamInfo[]>>({})
	let busFxParams = $state<Record<string, Record<string, number>>>({})

	// Populate bus fx params when target changes or version bumps
	$effect(() => {
		const _v = paramVersion
		const bus = getTargetBus()
		if (!bus) {
			busFxParamInfos = {}
			busFxParams = {}
			return
		}
		const result = readBusParams(bus)
		busFxParamInfos = result.busFxParamInfos
		busFxParams = result.busFxParams
	})

	function handleBusFxParam(fxIdx: number, path: string, value: number) {
		if (!busFxParams[fxIdx.toString()]) busFxParams[fxIdx.toString()] = {}
		busFxParams[fxIdx.toString()][path] = value
		const bus = getTargetBus()
		if (bus) setBusFxParam(bus, fxIdx, path, value)
	}

	// Reactive param values for selected chain
	let genParamInfos = $state<ParamInfo[]>([])
	let genParams = $state<Record<string, number>>({})
	let fxParamInfos = $state<Record<string, ParamInfo[]>>({})
	let fxParams = $state<Record<string, Record<string, number>>>({})

	// Sync entity selection → dropdown target
	$effect(() => {
		if (!selectedAudioChain) return
		const output = selectedAudioChain.output
		const idx = allAudioChains.findIndex((c) => c.output === output)
		if (idx >= 0) {
			selectedAudioTarget = `chain:${idx}`
		}
	})

	// Sync dropdown target → selectedAudioChain
	$effect(() => {
		const chain = getTargetChain()
		if (chain && chain.output !== selectedAudioChain?.output) {
			selectedAudioChain = chain
		}
		if (!chain && getTargetBus()) {
			// Bus selected — clear chain params
			selectedAudioChain = undefined
		}
	})

	function setGenParam(path: string, value: number) {
		if (genParams[path] === value) {
			return
		}

		genParams[path] = value
		selectedAudioChain?.setParam(path, value)
	}
	function setFxParam(fxIdx: number, path: string, value: number) {
		if (!fxParams[fxIdx.toString()]) fxParams[fxIdx.toString()] = {}
		fxParams[fxIdx.toString()][path] = value
		selectedAudioChain?.setFxParam(fxIdx, path, value)
	}

	// Solo: use Tone.Solo (all instances auto-coordinate muting)
	$effect(() => {
		soloChain(allAudioChains, soloMode ? selectedAudioChain : undefined)
	})

	// Clear solo when deselected
	$effect(() => {
		if (!selectedEntity) soloMode = false
	})

	// Shared analyzer: reconnect when selection changes (entity or target dropdown)
	$effect(() => {
		const engine = audioEngineRef
		if (!engine) return
		// Priority: dropdown target > entity selection
		const targetChain = getTargetChain()
		const targetBus = getTargetBus()
		if (targetChain) {
			connectSharedAnalyzer(engine, targetChain)
		} else if (targetBus) {
			connectSharedAnalyzer(engine, targetBus)
		} else if (selectedAudioChain) {
			connectSharedAnalyzer(engine, selectedAudioChain)
		} else {
			connectSharedAnalyzer(engine, null)
		}
	})

	// Analyzer visualization using shared Tone.Analyser
	$effect(() => {
		const engine = audioEngineRef
		const hasTarget = selectedAudioChain || selectedAudioTarget
		if (analyzerRafId) {
			cancelAnimationFrame(analyzerRafId)
			analyzerRafId = 0
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const analyzer = engine?.sharedAnalyzer as any
		if (!analyzer || !hasTarget) {
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

	function parseHash(hash: string) {
		const raw = hash.slice(1)
		const q = raw.indexOf('?')
		if (q === -1) return { id: raw, params: new URLSearchParams() }
		return { id: raw.slice(0, q), params: new URLSearchParams(raw.slice(q + 1)) }
	}

	const initialHash = parseHash(window.location.hash)
	let sceneId = $state(initialHash.id || scenes[0].id)

	$effect(() => {
		function onHashChange() {
			const h = parseHash(window.location.hash)
			sceneId = h.id || scenes[0].id
		}

		window.addEventListener('hashchange', onHashChange)
		return () => window.removeEventListener('hashchange', onHashChange)
	})

	$effect(() => {
		if (initialHash.params.has('play')) tempo.isPlaying = true
	})
	let activeScene = $derived(scenes.find((s) => s.id === sceneId) ?? scenes[0])
	// eslint-disable-next-line svelte/prefer-writable-derived
	let railVisibility = $state<boolean[]>([])
	$effect(() => {
		railVisibility = activeScene.rails.map(() => true)
	})

	$effect(() => {
		if (window.location.hash === `#${sceneId}` || window.location.hash.startsWith(`#${sceneId}?`)) {
			return
		}

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

	// Version counter to force re-read of params after preset change
	let paramVersion = $state(0)

	function applyPreset(info: NodePresetInfo, name: string) {
		info.set(name)
		// Defer param re-read to allow RNBO to propagate values
		setTimeout(() => {
			paramVersion++
		}, 50)
	}

	// Subscribe to RNBO param changes for live UI sync (chain + bus)
	$effect(() => {
		const chain = selectedAudioChain
		if (chain) {
			chain.onParamChange = () => {
				paramVersion++
			}
			return () => {
				chain.onParamChange = null
			}
		}
	})
	$effect(() => {
		const bus = getTargetBus()
		if (bus) {
			bus.onParamChange = () => {
				paramVersion++
			}
			return () => {
				bus.onParamChange = null
			}
		}
	})

	// Populate/refresh params on chain change or version bump (preset change)
	$effect(() => {
		const _v = paramVersion
		const chain = selectedAudioChain
		if (!chain) {
			genParamInfos = []
			genParams = {}
			fxParamInfos = {}
			fxParams = {}
			return
		}
		const result = readChainParams(chain)
		genParamInfos = result.genParamInfos
		genParams = result.genParams
		fxParamInfos = result.fxParamInfos
		fxParams = result.fxParams
	})

	function copyParams(params: Record<string, number>, presetInfo?: NodePresetInfo) {
		const out: Record<string, ParamValue> = {}
		for (const [k, v] of Object.entries(params)) out[k] = v
		if (presetInfo?.active) out['preset'] = presetInfo.active
		navigator.clipboard.writeText(JSON.stringify(out))
	}

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
			action: () =>
				(easing =
					easingNames[(easingNames.findIndex((x) => x === easing) + 1) % easingNames.length])
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
			code: 'KeyA',
			action: () =>
				(sceneId =
					scenes[(scenes.findIndex((d) => d.id === sceneId) - 1 + scenes.length) % scenes.length]
						.id)
		}
	])

	function getShortName(path: string) {
		const parts = path.split('.')

		if (parts.length > 1) {
			return `${parts[0].slice(0, 3)}…${parts.at(-1)}`
		}

		return path
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if debugEnabled}
	<Pane title={`Debug v${__APP_VERSION__}`} position="fixed" width={320} theme={customizedTheme}>
		<List
			label="Scene"
			bind:value={sceneId}
			options={scenes.map((s) => ({ text: s.id.replaceAll('scene-', ''), value: s.id }))}
		/>
		<Checkbox label="Play" bind:value={tempo.isPlaying} />
		{#if audioTargetOptions.length > 0}
			<Folder title="Audio" expanded={true}>
				<List label="Target" bind:value={selectedAudioTarget} options={audioTargetOptions} />
				{#if selectedAudioChain}
					<Checkbox label="Solo" bind:value={soloMode} />
					{#if waveData.length > 0}
						<WaveformMonitor value={waveData} min={0} max={255} interval={100} />
					{/if}
					{#if genParamInfos.length > 0 || selectedAudioChain.nodePresets.has(-1)}
						<Folder
							title={`Generator: ${selectedAudioChain?.config?.generator && ('tone' in selectedAudioChain.config.generator ? selectedAudioChain.config.generator.tone : selectedAudioChain.config?.generator?.rnbo)}`}
							expanded={true}
						>
							{@const genPresetInfo = selectedAudioChain.nodePresets.get(-1)}
							{#if genPresetInfo}
								<List
									label="Preset"
									value={genPresetInfo.active ?? genPresetInfo.names[0]}
									options={genPresetInfo.names.map((n) => ({ text: n, value: n }))}
									on:change={(e) => applyPreset(genPresetInfo, e.detail.value as string)}
								/>
							{/if}
							<Button
								title={`Copy ${genName(selectedAudioChain)}`}
								on:click={() => copyParams(genParams, genPresetInfo)}
							/>
							{#each genParamInfos as info (info.path)}
								<Slider
									label={getShortName(info.path)}
									value={genParams[info.path]}
									min={info.min}
									max={info.max}
									on:change={(e) => setGenParam(info.path, e.detail.value)}
								/>
							{/each}
						</Folder>
					{/if}
					{#each selectedAudioChain.config.fx ?? [] as fxConfig, fxIdx (fxIdx)}
						{@const fxPresetInfo = selectedAudioChain.nodePresets.get(fxIdx)}
						{#if fxParamInfos[fxIdx.toString()] || fxPresetInfo}
							<Folder title={'FX: ' + cfgName(fxConfig)} expanded={false}>
								{#if fxPresetInfo}
									<List
										label="Preset"
										value={fxPresetInfo.active ?? fxPresetInfo.names[0]}
										options={fxPresetInfo.names.map((n) => ({ text: n, value: n }))}
										on:change={(e) => applyPreset(fxPresetInfo, e.detail.value as string)}
									/>
								{/if}
								{#if fxParamInfos[fxIdx.toString()]}
									<Button
										title={`Copy ${cfgName(fxConfig)}`}
										on:click={() => copyParams(fxParams[fxIdx.toString()], fxPresetInfo)}
									/>
									{#each fxParamInfos[fxIdx.toString()] as info (selectedAudioTarget + fxIdx + info.path)}
										<Slider
											label={getShortName(info.path)}
											value={fxParams[fxIdx.toString()][info.path]}
											min={info.min}
											max={info.max}
											on:change={(e) => setFxParam(fxIdx, info.path, e.detail.value as number)}
										/>
									{/each}
								{/if}
							</Folder>
						{/if}
					{/each}
				{/if}
				{#if getTargetBus()}
					{@const bus = getTargetBus()}
					{#if bus}
						{#each bus.fx as _fx, fxIdx (fxIdx)}
							{@const busFxPresetInfo = bus.nodePresets.get(fxIdx)}
							{#if busFxParamInfos[fxIdx.toString()] || busFxPresetInfo}
								<Folder
									title={'FX: ' +
										(bus.config.fx?.[fxIdx] ? cfgName(bus.config.fx[fxIdx]) : `fx:${fxIdx}`)}
									expanded={true}
								>
									{#if busFxPresetInfo}
										<List
											label="Preset"
											value={busFxPresetInfo.active ?? busFxPresetInfo.names[0]}
											options={busFxPresetInfo.names.map((n) => ({ text: n, value: n }))}
											on:change={(e) => applyPreset(busFxPresetInfo, e.detail.value as string)}
										/>
									{/if}
									{#if busFxParamInfos[fxIdx.toString()]}
										<Button
											title={`Copy ${cfgName(bus.config.fx?.[fxIdx])}`}
											on:click={() => copyParams(busFxParams[fxIdx.toString()], busFxPresetInfo)}
										/>
										{#each busFxParamInfos[fxIdx.toString()] as info (info.path)}
											<Slider
												label={info.path.split('.').pop() ?? info.path}
												value={busFxParams[fxIdx.toString()][info.path]}
												min={info.min}
												max={info.max}
												on:change={(e) =>
													handleBusFxParam(fxIdx, info.path, e.detail.value as number)}
											/>
										{/each}
									{/if}
								</Folder>
							{/if}
						{/each}
					{/if}
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
			<Checkbox label="Hud" bind:value={fxHud} />
			<Checkbox label="Rails" bind:value={fxRails} />
			<Checkbox label="Marbles" bind:value={fxMarbles} />
			<Checkbox label="Instruments" bind:value={fxInstruments} />
			<Checkbox label="Text" bind:value={fxText} />
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
	<Wrap
		{sceneId}
		{activeScene}
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
		fxRails={fxRails && !wireframe}
		fxMarbles={fxMarbles && !wireframe}
		fxText={fxText && !wireframe}
		fxInstruments={fxInstruments && !wireframe}
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
			tempo.currentBeat = 0
			tempo.beatProgress = 0
		}}
		onNextScene={() =>
			(sceneId = scenes[(scenes.findIndex((d) => d.id === sceneId) + 1) % scenes.length].id)}
		onPrevScene={() =>
			(sceneId =
				scenes[(scenes.findIndex((d) => d.id === sceneId) - 1 + scenes.length) % scenes.length].id)}
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
