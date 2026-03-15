<script lang="ts">
	import { Inspector } from 'three/addons/inspector/Inspector.js'
	import { Canvas } from '@threlte/core'
	import { createTempoState } from './lib/core/tempo'
	import { easingNames } from './lib/helpers/easing'
	import { onUpdate, scenes } from './scenes'
	import { initMidi, setMidiPort, type MidiState, setMidiState } from './lib/midi/midi'
	import type { SelectedEntity } from './components/Scene.svelte'
	import type { AudioChain, AudioEngine } from './lib/audio'
	import { connectSharedAnalyzer } from './lib/audio'
	import { WebGPURenderer } from 'three/webgpu'
	import { clearMarbleGeometryCache } from './lib/video/geometry-marble'
	import { clearInstrumentGeometryCache } from './lib/video/geometry-instrument'
	import { clearGeoTextCache } from './lib/video/geometry-text'
	import { clearTubeTextCache } from './lib/video/geometry-text-tube'
	import { clearMixedTextParsedCache } from './lib/video/geometry-text-mixed'
	import { clearImpactMaterialCache } from './lib/video/material-impact'
	import Wrap from './components/Wrap.svelte'
	import { createKeydownHandler } from './lib/helpers/keyboard'
	import { onMount, tick, untrack } from 'svelte'
	import './components/GeoText.svelte'
	import { font, fontCache } from './lib/video/geometry-text'
	import { Font } from 'three/examples/jsm/loaders/FontLoader.js'
	import { globalState } from './components/global-state.svelte'
	import GlobalState from './components/GlobalState.svelte'
	import { clearTubeMaterialCache } from './lib/video/material-text-tube'
	import type { SceneConfig } from './lib/core/scene'

	// import * as THREE from 'three/webgpu'
	// extend(THREE)

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
	let limitFps = $state(import.meta.env.DEV)
	let autoRotate = $state(false)
	let showAudio = $state(true)
	let fps = $state(0)
	let tempo = $state(createTempoState())
	let easing = $state('linear')
	let midiEnabled = $state(false)
	let debugEnabled = $state(false)
	let midiState = $state<MidiState | null>(null)
	let selectedMidiPort = $state<string | null>(null)

	let selectedEntity = $state<SelectedEntity>(null)
	let selectedAudioChain = $state.raw<AudioChain | undefined>()
	let allAudioChains = $state.raw<AudioChain[]>([])
	let audioEngineRef = $state.raw<AudioEngine | null>(null)

	onMount(async () => {
		fontCache.font = <Font>await font
		setTimeout(() => {
			showHud = true
		}, 0)
	})

	let reloadScene = $state<SceneConfig | undefined>()

	onUpdate((s: SceneConfig[]) => {
		if (s.length === 0) {
			return
		}

		scenes.splice(0)
		scenes.push(...s)
		reloadScene = s.find((d) => d.id === sceneId)
	})

	// Shared analyzer: reconnect when selection changes
	$effect(() => {
		const engine = audioEngineRef
		if (!engine) return
		if (selectedAudioChain) {
			connectSharedAnalyzer(engine, selectedAudioChain)
		} else {
			connectSharedAnalyzer(engine, null)
		}
	})

	function parseHash(hash: string) {
		const raw = hash.slice(1)
		const q = raw.indexOf('?')
		if (q === -1) return { id: raw, params: new URLSearchParams() }
		return { id: raw.slice(0, q), params: new URLSearchParams(raw.slice(q + 1)) }
	}

	const initialHash = parseHash(globalThis.location.hash)
	let sceneId = $state(initialHash.id || scenes[0].id)

	$effect(() => {
		function onHashChange() {
			const h = parseHash(globalThis.location.hash)
			sceneId = h.id || scenes[0].id
		}

		globalThis.addEventListener('hashchange', onHashChange)
		return () => globalThis.removeEventListener('hashchange', onHashChange)
	})

	$effect(() => {
		if (initialHash.params.has('play')) tempo.isPlaying = true
	})

	$effect(() => {
		if (sceneId) {
			reloadScene = undefined
		}
	})

	let activeScene = $derived(reloadScene ?? scenes.find((s) => s.id === sceneId) ?? scenes[0])
	let mountedScene = $state<typeof activeScene | null>(untrack(() => activeScene))

	// Sequence scene switches: unmount old (onDestroy fires) before mounting new
	$effect(() => {
		const scene = activeScene
		if (!reloadScene && untrack(() => mountedScene)?.id === scene.id) return
		mountedScene = null
		tick().then(() => {
			mountedScene = scene
		})
	})

	// Called by Scene.svelte onMount — geometries created during Threlte's first RAF,
	// so sweep after two RAFs to ensure all refCounts are incremented
	function onSceneReady() {
		clearMarbleGeometryCache()
		clearInstrumentGeometryCache()
		clearGeoTextCache()
		clearTubeTextCache()
		clearMixedTextParsedCache()
		clearImpactMaterialCache()
		clearTubeMaterialCache()
	}

	// eslint-disable-next-line svelte/prefer-writable-derived
	let railVisibility = $state<boolean[]>([])
	$effect(() => {
		railVisibility = activeScene.rails.map((rail) => rail.visible !== false)
	})

	$effect(() => {
		if (
			globalThis.location.hash === `#${sceneId}` ||
			globalThis.location.hash.startsWith(`#${sceneId}?`)
		) {
			return
		}

		globalThis.location.hash = sceneId
		selectedEntity = null
	})

	$effect(() => {
		tempo.config.bpm = activeScene.bpm
		tempo.beatProgress = 0
		tempo.currentBeat = 0
	})

	// Lazy init MIDI when enabled
	$effect(() => {
		if (midiEnabled) {
			initMidi().then((state) => {
				midiState = state
				setMidiState(midiState)
				selectedMidiPort = state.selectedPortId
				updateMidiPortControl()
			})
		}
		if (!midiEnabled) removeMidiPortControl()
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

	let sceneIndex = $derived(scenes.findIndex((d) => d.id === sceneId))

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
			action: () => (easing = easingNames[(easingNames.indexOf(easing) + 1) % easingNames.length])
		},
		{ code: 'KeyB', action: () => (showBeats = !showBeats) },
		{ code: 'KeyP', action: () => (showPoints = !showPoints) },
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
			code: 'ArrowRight',
			action: () =>
				(sceneId = scenes[(scenes.findIndex((d) => d.id === sceneId) + 1) % scenes.length].id)
		},
		{
			code: 'KeyA',
			action: () =>
				(sceneId =
					scenes[(scenes.findIndex((d) => d.id === sceneId) - 1 + scenes.length) % scenes.length]
						.id)
		},
		{
			code: 'ArrowLeft',
			action: () =>
				(sceneId =
					scenes[(scenes.findIndex((d) => d.id === sceneId) - 1 + scenes.length) % scenes.length]
						.id)
		},
		{
			code: 'ArrowDown',
			action: () => {
				tempo.rewind++
				tempo.currentBeat = 0
				tempo.beatProgress = 0
			}
		},
		{
			code: 'ArrowUp',
			action: () => {
				globalState.isMuted = !globalState.isMuted
			}
		},
		{
			code: 'KeyL',
			action: () => {
				limitFps = !limitFps
			}
		}
	])

	let rendererRef: WebGPURenderer | null = null
	let inspectorRef: Inspector | null = null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let railsGuiRef: any = null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let sceneGuiRef: any = null
	// Inspector controller refs for external-state sync (updateDisplay instead of polling)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const inspCtrl: Record<string, any> = {}

	const beatProxy = { Beat: 0 }
	$effect(() => {
		beatProxy.Beat = Math.floor(tempo.currentBeat)
	})

	function populateRailsGui(railsGui: ReturnType<Inspector['createParameters']>) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const gui = railsGui as any
		// Remove existing items from DOM and clear registry
		if (gui.objects) {
			for (const entry of gui.objects) entry.subItem.domElement.remove()
			gui.objects = []
		}
		for (let i = 0; i < activeScene.rails.length; i++) {
			if (i >= railVisibility.length) break
			const rc = activeScene.rails[i]
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const proxy: any = {
				get [rc.id]() {
					return railVisibility[i]
				},
				set [rc.id](v: boolean) {
					railVisibility[i] = v
				}
			}
			railsGui.add(proxy, rc.id)
		}
	}

	function removeMidiPortControl() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const gui = sceneGuiRef as any
		if (!gui?.objects) return
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const idx = gui.objects.findIndex((e: any) => e.key === 'MIDI Port')
		if (idx === -1) return
		gui.objects[idx].subItem.domElement.remove()
		gui.objects.splice(idx, 1)
	}

	function updateMidiPortControl() {
		if (!sceneGuiRef) return
		removeMidiPortControl()
		if (!midiState || midiState.outputs.length === 0) return
		const options = Object.fromEntries(midiState.outputs.map((p) => [p.name, p.id]))
		const proxy = {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			get 'MIDI Port'(): any {
				return selectedMidiPort ?? ''
			},
			set 'MIDI Port'(v: string) {
				selectedMidiPort = v
			}
		}
		sceneGuiRef.add(proxy, 'MIDI Port', options)
	}

	function buildInspector() {
		if (!rendererRef) return null
		const inspector = new Inspector()
		rendererRef.inspector = inspector
		document.querySelector('#ins')!.append(inspector.domElement)

		const sceneFolder = inspector.createParameters('Scene')
		sceneGuiRef = sceneFolder
		const sceneProps = {
			get Scene() {
				return sceneId
			},
			set Scene(v: string) {
				sceneId = v
			}
		}

		inspCtrl.Scene = sceneFolder.add(
			sceneProps,
			'Scene',
			Object.fromEntries(scenes.map((s) => [s.id.replaceAll('scene-', ''), s.id]))
		)
		inspCtrl.Play = sceneFolder.add(
			{
				get Play() {
					return tempo.isPlaying
				},
				set Play(v: boolean) {
					tempo.isPlaying = v
				}
			},
			'Play'
		)
		sceneFolder.add(beatProxy, 'Beat').listen()
		inspCtrl.Mute = sceneFolder.add(
			{
				get Mute() {
					return globalState.isMuted
				},
				set Mute(v: boolean) {
					globalState.isMuted = v
				}
			},
			'Mute'
		)
		inspCtrl.BPM = sceneFolder.add(
			{
				get BPM() {
					return tempo.config.bpm
				},
				set BPM(v: number) {
					tempo.config.bpm = v
				}
			},
			'BPM',
			30,
			300,
			1
		)
		inspCtrl.Rotate = sceneFolder.add(
			{
				get Rotate() {
					return autoRotate
				},
				set Rotate(v: boolean) {
					autoRotate = v
				}
			},
			'Rotate'
		)
		inspCtrl.Easing = sceneFolder.add(
			{
				get Easing() {
					return easing
				},
				set Easing(v: string) {
					easing = v
				}
			},
			'Easing',
			Object.fromEntries(easingNames.map((n) => [n, n]))
		)
		inspCtrl.MIDI = sceneFolder.add(
			{
				get MIDI() {
					return midiEnabled
				},
				set MIDI(v: boolean) {
					midiEnabled = v
				}
			},
			'MIDI'
		)
		// MIDI port control added dynamically via updateMidiPortControl()

		const viewFolder = inspector.createParameters('View')
		;(<{ close: () => void }>(<unknown>viewFolder)).close()
		inspCtrl.Audio = viewFolder.add(
			{
				get Audio() {
					return showAudio
				},
				set Audio(v: boolean) {
					showAudio = v
				}
			},
			'Audio'
		)
		inspCtrl.Grid = viewFolder.add(
			{
				get Grid() {
					return showGrid
				},
				set Grid(v: boolean) {
					showGrid = v
				}
			},
			'Grid'
		)
		inspCtrl.Names = viewFolder.add(
			{
				get Names() {
					return showNames
				},
				set Names(v: boolean) {
					showNames = v
				}
			},
			'Names'
		)
		inspCtrl.Beats = viewFolder.add(
			{
				get Beats() {
					return showBeats
				},
				set Beats(v: boolean) {
					showBeats = v
				}
			},
			'Beats'
		)
		inspCtrl.Points = viewFolder.add(
			{
				get Points() {
					return showPoints
				},
				set Points(v: boolean) {
					showPoints = v
				}
			},
			'Points'
		)

		const interfaceFolder = inspector.createParameters('Interface')
		;(<{ close: () => void }>(<unknown>interfaceFolder)).close()
		inspCtrl.HUD = interfaceFolder.add(
			{
				get HUD() {
					return showHud
				},
				set HUD(v: boolean) {
					showHud = v
				}
			},
			'HUD'
		)
		inspCtrl.Stats = interfaceFolder.add(
			{
				get Stats() {
					return showStats
				},
				set Stats(v: boolean) {
					showStats = v
				}
			},
			'Stats'
		)
		inspCtrl.Freeze = interfaceFolder.add(
			{
				get 'Freeze sequencer'() {
					return useFreeze
				},
				set 'Freeze sequencer'(v: boolean) {
					useFreeze = v
				}
			},
			'Freeze sequencer'
		)
		inspCtrl.SceneFX = interfaceFolder.add(
			{
				get 'Scene FX'() {
					return fxPost
				},
				set 'Scene FX'(v: boolean) {
					fxPost = v
				}
			},
			'Scene FX'
		)
		inspCtrl.HudFX = interfaceFolder.add(
			{
				get 'HUD FX'() {
					return fxHud
				},
				set 'HUD FX'(v: boolean) {
					fxHud = v
				}
			},
			'HUD FX'
		)
		inspCtrl.Wireframe = interfaceFolder.add(
			{
				get Wireframe() {
					return wireframe
				},
				set Wireframe(v: boolean) {
					wireframe = v
				}
			},
			'Wireframe'
		)
		inspCtrl.Limit = interfaceFolder.add(
			{
				get 'Limit FPS'() {
					return limitFps
				},
				set 'Limit FPS'(v: boolean) {
					limitFps = v
				}
			},
			'Limit FPS'
		)

		railsGuiRef = viewFolder.addFolder('Rails')
		railsGuiRef.close()
		populateRailsGui(railsGuiRef)

		return inspector
	}

	// Lazy init: show on first D press, hide/show after
	$effect(() => {
		if (debugEnabled) {
			if (!rendererRef) return
			if (inspectorRef) {
				inspectorRef.domElement.style.display = 'block'
			} else {
				inspectorRef = buildInspector()
			}
		} else if (inspectorRef) {
			inspectorRef.domElement.style.display = 'none'
		}
	})

	// Refresh Rails tab on scene change (keep inspector alive)
	$effect(() => {
		void activeScene // track dependency
		if (inspectorRef && railsGuiRef) populateRailsGui(railsGuiRef)
	})

	// Sync inspector controls when state changes externally (spacebar, HUD transport, etc.)
	// Direct DOM mutations avoid setValue() which dispatches change and re-fires the setter.
	function syncBool(key: string, val: boolean) {
		const c = inspCtrl[key]
		if (c?.checkbox) c.checkbox.checked = val
	}
	function syncNum(key: string, val: number) {
		const c = inspCtrl[key]
		if (c?.slider) {
			c.slider.value = val
			c.numberInput.value = val
		} else if (c?.input) c.input.value = val
	}
	function syncSel(key: string, val: string) {
		const c = inspCtrl[key]
		if (c?.select) c.select.value = val.replace('scene-', '')
	}

	$effect(() => {
		syncSel('Scene', sceneId)
	})
	$effect(() => {
		syncBool('Play', tempo.isPlaying)
	})
	$effect(() => {
		syncBool('Mute', globalState.isMuted)
	})
	$effect(() => {
		syncBool('Limit', limitFps)
	})
	$effect(() => {
		syncNum('BPM', tempo.config.bpm)
	})
	$effect(() => {
		syncBool('Rotate', autoRotate)
	})
	$effect(() => {
		syncBool('Grid', showGrid)
	})
	$effect(() => {
		syncBool('Points', showPoints)
	})
	$effect(() => {
		syncBool('Beats', showBeats)
	})
	$effect(() => {
		syncBool('Names', showNames)
	})
	$effect(() => {
		syncBool('Wireframe', wireframe)
	})
	$effect(() => {
		syncBool('Audio', showAudio)
	})
	$effect(() => {
		syncBool('HUD', showHud)
	})
	$effect(() => {
		syncBool('Stats', showStats)
	})
	$effect(() => {
		syncSel('Easing', easing)
	})
	$effect(() => {
		syncBool('MIDI', midiEnabled)
	})
</script>

<GlobalState engine={audioEngineRef}></GlobalState>
<svelte:window onkeydown={handleKeydown} />

<Canvas
	renderMode={limitFps ? 'manual' : 'on-demand'}
	createRenderer={(canvas) => {
		const renderer = new WebGPURenderer({
			canvas,

			// antialias: false,
			antialias: true,
			forceWebGL: false,
			alpha: true,
			depth: false,
			samples: 2
			// outputBufferType: UnsignedByteType
		})

		rendererRef = renderer
		renderer.dispose = () => {}

		return renderer
	}}
>
	<Wrap
		{sceneId}
		{sceneIndex}
		{activeScene}
		{mountedScene}
		{limitFps}
		{showGrid}
		showPoints={mountedScene?.points ?? showPoints}
		{showBeats}
		{showNames}
		bind:wireframe
		bind:showStats
		bind:showAnalyzers
		{showHud}
		freeze={useFreeze && !tempo.isPlaying}
		fxPost={fxPost && !wireframe}
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
			tempo.rewind++
			tempo.currentBeat = 0
			tempo.beatProgress = 0
		}}
		onNextScene={() =>
			(sceneId = scenes[(scenes.findIndex((d) => d.id === sceneId) + 1) % scenes.length].id)}
		onPrevScene={() =>
			(sceneId =
				scenes[(scenes.findIndex((d) => d.id === sceneId) - 1 + scenes.length) % scenes.length].id)}
		onReady={onSceneReady}
	></Wrap>
</Canvas>

<div id="ins"></div>

<style>
	#ins {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 100;
	}
</style>
