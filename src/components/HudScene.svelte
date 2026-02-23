<script lang="ts">
	import { extend, T, useTask, useThrelte } from '@threlte/core'
	import { interactivity, Align } from '@threlte/extras'
	import type { AudioEngine, AudioChain } from '../lib/audio'
	import { resolveAnalyzerType, getChainLabel, toggleMute } from '../lib/audio/engine'
	import { buildImpactMaterial } from '../lib/video/material-impact'
	import { createInstrumentGeometry, type ArrowKind } from '../lib/video/instrument-geometry'
	import AnalyserView from './AnalyserView.svelte'
	import SequencerView, { type NoteEvent } from './SequencerView.svelte'
	import { MeshStandardNodeMaterial, MeshStandardMaterial, MeshBasicMaterial } from 'three/webgpu'
	import GeoText from './GeoText.svelte'
	import { easeInCubic, easeOutCubic } from '../lib/easing'
	import { onDestroy, onMount } from 'svelte'
	import type { TempoState } from '../lib/tempo'
	import type { SceneCtx } from '../lib/scene-ctx'

	function readLS(key: string, def: boolean): boolean {
		if (typeof localStorage === 'undefined') return def
		const v = localStorage.getItem(key)
		return v === null ? def : v === 'true'
	}
	function writeLS(key: string, v: boolean) {
		localStorage.setItem(key, v ? 'true' : 'false')
	}

	type MenuItem = {
		label: string
		lsKey: string
		def: boolean
		condition?: () => boolean
		get: () => boolean
		set: (v: boolean) => void
	}

	extend({ MeshStandardNodeMaterial, MeshStandardMaterial, MeshBasicMaterial })

	interactivity()

	let {
		engine,
		defaultAnalyser,
		baseColor = '#ffffff',
		title = 'Scene-Title',
		onPlay,
		onStop,
		onRewind,
		onNextScene,
		onPrevScene,
		currentBeat = 0,
		sequencerMode,
		beatsVisible = 8,
		sequencerColors,
		bpm = 120,
		tempo,
		description,
		freeze = false,
		sceneCtx,
		fps = 0,
		showStats = $bindable(true),
		wireframe = $bindable(false),
		showAnalyzers = $bindable(true),
		showAudio = $bindable(true)
	}: {
		engine: AudioEngine | null
		defaultAnalyser: string | undefined
		baseColor: string
		title: string
		onPlay: (event: MouseEvent) => void
		onStop: (event: MouseEvent) => void
		onRewind: () => void
		onNextScene: () => void
		onPrevScene: () => void
		currentBeat?: number
		sequencerMode?: 'time' | 'compact'
		sequencerColors?: boolean
		beatsVisible?: number
		bpm?: number
		tempo: TempoState
		freeze?: boolean
		description?: string
		sceneCtx?: SceneCtx
		fps: number
		showStats?: boolean
		wireframe?: boolean
		showAnalyzers?: boolean
		showAudio?: boolean
	} = $props()

	const { size } = useThrelte()
	const HUD_ZOOM = 80

	const MIN_SPHERE_R = 0.08
	const BASE_SPHERE_R = 0.2
	const FLASH_DURATION = 0.8
	const CHAR_WIDTH = 0.69

	type RowState = {
		chain: AudioChain
		fx: ReturnType<typeof buildImpactMaterial>
		animTime: number
		lastSeen: number
	}

	// Non-reactive animation state (mutated in useTask, not read by template)
	let rowStates: RowState[] = []
	let prevChainRefs: AudioChain[] = []

	// Reactive labels (written from useTask via in-place mutation)
	let labels = $state<string[]>([])
	// Reactive rows for template (rebuilt on chain change)
	let rows = $state<{ chain: AudioChain; fx: ReturnType<typeof buildImpactMaterial> }[]>([])

	// Sequencer note history per chain (reactive so template re-renders)
	let seqEvents = $state<NoteEvent[][]>([])
	// Non-reactive lastSeen per chain for sequencer (separate from rowStates.lastSeen)
	let seqLastSeen: number[] = []

	// Adaptive layout
	const rowCount = $derived(rows.length)
	const availHeight = $derived($size.height / HUD_ZOOM - 1)
	const vpWidth = $derived($size.width / HUD_ZOOM)
	const sphereR = $derived(Math.max(MIN_SPHERE_R, Math.min(BASE_SPHERE_R, availHeight / rowCount)))
	const rowSpacing = $derived(sphereR * 3)
	const otherSpacing = $derived(sphereR * 2.5)

	// Animated analyser X positions (easeInQuad, 200ms)
	const ANIM_DUR = 0.1
	let analyserAnimX = $state<number[]>([])
	const _aStartX: number[] = []
	const _aTargetX: number[] = []
	const _aAnimT: number[] = []

	// --- Transport controls ---
	const TRANSPORT_FLASH = 0.4
	const SPIN_DURATION = 0.2 // seconds for full 360°
	const THROTTLE_DURATION = SPIN_DURATION + 0.05
	const SPIN = Math.PI
	const HOVER_INTENSITY = 0.3
	const IDLE_TIMEOUT = 6 // seconds before fade
	const FADE_DURATION = 0.4 // seconds for fade in/out

	let idleTimer = 0
	let controlsOpacity = $state(1)
	let targetOpacity = 1

	// Edge proximity for right menu
	let mouseXNorm = 0
	let edgeFade = $state(0)
	let targetEdgeFade = 0
	let menuSlideT = $state(0) // 0=hidden 1=visible, drives slide offset

	// Local toggles (from localStorage)
	let pinHud = $state(false)
	let showTracker = $state(true)
	let showScale = $state(true)
	let showHarmony = $state(true)
	let showDescription = $state(true)
	let showNotes = $state(true)

	// Single source-of-truth menu config — reorder freely, no index handling needed
	const MENU_ITEMS: MenuItem[] = [
		{
			label: 'HUD',
			lsKey: 'ac-pin-hud',
			def: false,
			get: () => pinHud,
			set: (v) => {
				pinHud = v
			}
		},
		{
			label: 'INFO',
			lsKey: 'ac-show-desc',
			def: true,
			get: () => showDescription,
			set: (v) => {
				showDescription = v
			}
		},
		{
			label: 'HARMONY',
			lsKey: 'ac-show-harmony',
			def: true,
			condition: () => !!sequencerMode,
			get: () => showHarmony,
			set: (v) => {
				showHarmony = v
			}
		},
		{
			label: 'SCALE',
			lsKey: 'ac-show-scale',
			def: true,
			condition: () => !!sequencerMode,
			get: () => showScale,
			set: (v) => {
				showScale = v
			}
		},
		{
			label: 'TRACKER',
			lsKey: 'ac-show-tracker',
			def: true,
			condition: () => !!sequencerMode,
			get: () => showTracker,
			set: (v) => {
				showTracker = v
			}
		},
		{
			label: 'ANALYZERS',
			lsKey: 'ac-show-analyzers',
			def: true,
			condition: () => !!sequencerMode && !!sceneCtx?.hasAnalyzers?.chains,
			get: () => showAnalyzers,
			set: (v) => {
				showAnalyzers = v
			}
		},
		{
			label: 'NOTES',
			lsKey: 'ac-show-notes',
			def: true,
			condition: () => !!sequencerMode,
			get: () => showNotes,
			set: (v) => {
				showNotes = v
			}
		},
		{
			label: 'GRAPH',
			lsKey: 'ac-show-audio',
			def: true,
			condition: () => !!sequencerMode && !!sceneCtx?.config?.audioView,
			get: () => showAudio,
			set: (v) => {
				showAudio = v
			}
		},
		{
			label: 'FPS',
			lsKey: 'ac-show-fps',
			def: true,
			get: () => showStats,
			set: (v) => {
				showStats = v
			}
		},
		// {
		// 	label: 'OUTLINE',
		// 	lsKey: 'ac-wireframe',
		// 	def: false,
		// 	get: () => wireframe,
		// 	set: (v) => {
		// 		wireframe = v
		// 	}
		// }
	]

	onMount(() => {
		for (const item of MENU_ITEMS) item.set(readLS(item.lsKey, item.def))
		isMuted = readLS('ac-muted', false)
	})

	// Per-item menu material states (parallel to MENU_ITEMS)
	type MenuItemState = {
		label: string
		fx: ReturnType<typeof buildImpactMaterial>
		hovered: boolean
		animTime: number
	}
	const menuItemStates: MenuItemState[] = MENU_ITEMS.map(({ label }) => ({
		label,
		fx: buildImpactMaterial(baseColor, baseColor, 1, true, 0.9, 0.5, 1.3),
		hovered: false,
		animTime: 0
	}))

	function resetMats() {
		for (const s of menuItemStates) {
			s.fx.impactT.value = 0
			s.hovered = false
			s.animTime = 0
		}
	}

	let prevLength = 0

	$effect(() => {
		if (menuItems.length !== prevLength) {
			prevLength = menuItems.length
			resetMats()
		}
	})

	const menuItemDic: Record<string, MenuItemState> = Object.fromEntries(
		menuItemStates.map((state) => [state.label, state])
	)

	function toggleMenuItem(idx: number) {
		const item = menuItems[idx]
		const v = !item.get()
		item.set(v)
		writeLS(item.lsKey, v)
		menuItemDic[item.label].animTime = TRANSPORT_FLASH
	}

	const menuItems = $derived(MENU_ITEMS.filter((item) => !item.condition || item.condition()))

	const textMat = $derived(buildImpactMaterial(baseColor, baseColor, 0.5, true, 0.9, 0.4, 2))
	const textMatLarge = $derived(buildImpactMaterial(baseColor, baseColor, 0.5, true, 0.9, 0.2, 2))

	function onMouseActivity(event?: PointerEvent) {
		idleTimer = 0
		targetOpacity = 1
		if (event?.clientX != null) mouseXNorm = event.clientX / window.innerWidth
	}

	$effect(() => {
		if (title) {
			idleTimer = 0
			targetOpacity = 1
		}
	})

	$effect(() => {
		window.addEventListener('pointermove', onMouseActivity)
		window.addEventListener('pointerdown', onMouseActivity)
		return () => {
			window.removeEventListener('pointermove', onMouseActivity)
			window.removeEventListener('pointerdown', onMouseActivity)
		}
	})

	type BtnDef = { kind: ArrowKind; action: (e: unknown) => void; rotY?: number; rotX?: number }

	let isMuted = $state(false)
	let chord = $derived(sceneCtx?.chord?.current?.chord)
	let scale = $derived(sceneCtx?.chord?.scale?.name)
	let scaleNotes = $derived(sceneCtx?.chord?.scale?.notes)

	const btnDefs: BtnDef[] = [
		{
			kind: 'plain',
			rotY: Math.PI,
			action: () => setTimeout(onPrevScene, THROTTLE_DURATION * 1000)
		},
		{
			kind: 'plain',
			action: () => setTimeout(onNextScene, THROTTLE_DURATION * 1000)
		},
		{
			kind: 'repro',
			// rotX: Math.PI,
			action: () => {
				isMuted = !isMuted
				writeLS('ac-muted', isMuted)
				toggleMute(engine, isMuted)
			}
		},
		{
			kind: 'fwd',
			rotY: Math.PI,
			action: () => onRewind()
		},
		{
			kind: 'stop',
			action: (event) => onStop((<{ nativeEvent: MouseEvent }>event).nativeEvent)
		},
		{
			kind: 'play',
			action: (event) => onPlay((<{ nativeEvent: MouseEvent }>event).nativeEvent)
		}
	]

	type BtnState = {
		fx: ReturnType<typeof buildImpactMaterial>
		animTime: number
		spinFrom: number
		spinTo: number
		spinT: number // 0=idle, >0=animating (counts down from SPIN_DURATION)
		hovered: boolean
	}

	const btnStates: BtnState[] = btnDefs.map(() => ({
		fx: buildImpactMaterial(baseColor, baseColor, 0.5, true, 0.9, 0.5, 2),
		animTime: 0,
		spinFrom: 0,
		spinTo: 0,
		spinT: 0,
		hovered: false
	}))

	// Reactive spin angles for template
	let btnSpinAngles = $state<number[]>(btnDefs.map(() => 0))

	function onBtnClick(event: unknown, i: number) {
		onMouseActivity()
		btnDefs[i].action(event)
		const b = btnStates[i]
		b.animTime = TRANSPORT_FLASH
		b.fx.impactColor.value.set(baseColor)
		// Start spin: from current angle to next full 360°
		b.spinFrom =
			b.spinT > 0 ? b.spinFrom + (b.spinTo - b.spinFrom) * (1 - b.spinT / SPIN_DURATION) : b.spinTo
		b.spinTo = b.spinFrom + SPIN
		b.spinT = SPIN_DURATION
	}

	function onBtnEnter(i: number) {
		btnStates[i].hovered = true
	}

	function onBtnLeave(i: number) {
		btnStates[i].hovered = false
	}

	// Poll for chain changes
	useTask(() => {
		if (!engine) {
			if (rowStates.length > 0) {
				rowStates = []
				prevChainRefs = []
				rows = []
				labels = []
				seqEvents = []
				seqLastSeen = []
			}
			return
		}
		const chains = engine.instanceChains.filter((c) => c.generator)
		let changed = chains.length !== prevChainRefs.length
		if (!changed) {
			for (let i = 0; i < chains.length; i++) {
				if (chains[i] !== prevChainRefs[i]) {
					changed = true
					break
				}
			}
		}
		if (changed) {
			// Dispose old row materials
			for (const s of rowStates) s.fx.mat.dispose()
			prevChainRefs = chains
			const nextStates: RowState[] = []
			const nextRows: typeof rows = []
			const nextLabels: string[] = []
			for (let i = 0; i < chains.length; i++) {
				const fx = buildImpactMaterial(baseColor, baseColor, 0.5, true, 0.9, 0.5, 2)
				nextStates.push({ chain: chains[i], fx, animTime: 0, lastSeen: 0 })
				nextRows.push({ chain: chains[i], fx })
				nextLabels.push('.')
			}
			rowStates = nextStates
			rows = nextRows
			labels = nextLabels
			seqEvents = chains.map(() => [])
			seqLastSeen = chains.map(() => 0)
			// Init animated X — no animation on chain setup, snap to target
			const initBaseX = -vpWidth / 2 + sphereR * 2
			analyserAnimX = chains.map(() => initBaseX + sphereR * 4)
			_aStartX.length = chains.length
			_aTargetX.length = chains.length
			_aAnimT.length = chains.length
			for (let i = 0; i < chains.length; i++) {
				_aStartX[i] = analyserAnimX[i]
				_aTargetX[i] = analyserAnimX[i]
				_aAnimT[i] = ANIM_DUR
			}
		}
	})

	const SEQ_MAX = 16 // keep only enough for SequencerView to detect; ring buffer handles history

	// Animation + label update
	useTask((delta) => {
		for (let i = 0; i < rowStates.length; i++) {
			const s = rowStates[i]
			const chain = s.chain

			if (chain.lastTrigger > s.lastSeen) {
				s.lastSeen = chain.lastTrigger
				s.animTime = FLASH_DURATION
				s.fx.impactColor.value.set(chain.audioSignal.color)
				const newLabel = getChainLabel(chain) || '*'
				// In-place mutation — Svelte 5 $state proxy tracks element-level changes
				if (labels[i] !== newLabel) labels[i] = newLabel
			}

			// Sequencer: detect new trigger per-row
			if (i < seqLastSeen.length && chain.lastTrigger > seqLastSeen[i]) {
				seqLastSeen[i] = chain.lastTrigger
				const ev: NoteEvent = {
					label: getChainLabel(chain) || '*',
					color: chain.audioSignal.color,
					time: Date.now(),
					beat: currentBeat
				}
				const arr = seqEvents[i]
				arr.push(ev)
				if (arr.length > SEQ_MAX) arr.splice(0, arr.length - SEQ_MAX)
			}

			if (s.animTime > 0) {
				s.animTime = Math.max(0, s.animTime - delta)
				s.fx.impactT.value = s.animTime / FLASH_DURATION
			}
		}

		// Animate analyser X positions (easeInCubic 100ms)
		const baseX = -vpWidth / 2 + sphereR * 2
		for (let i = 0; i < rowStates.length; i++) {
			const label = labels[i] ?? ''
			const targetX = baseX + sphereR * 4 + Math.max(label.length - 2, 0) * sphereR * CHAR_WIDTH
			if (_aTargetX[i] !== targetX) {
				_aStartX[i] = analyserAnimX[i] ?? targetX
				_aTargetX[i] = targetX
				_aAnimT[i] = 0
			}
			if (_aAnimT[i] < ANIM_DUR) {
				_aAnimT[i] = Math.min(ANIM_DUR, (_aAnimT[i] ?? ANIM_DUR) + delta)
				const t = _aAnimT[i] / ANIM_DUR
				// In-place mutation — no array spread
				analyserAnimX[i] = _aStartX[i] + (targetX - _aStartX[i]) * easeInCubic(t)
			}
		}

		// Idle timer + fade
		idleTimer += delta
		if (idleTimer >= IDLE_TIMEOUT && !pinHud) targetOpacity = 0
		const opacityStep = delta / FADE_DURATION
		if (controlsOpacity < targetOpacity) {
			controlsOpacity = Math.min(targetOpacity, controlsOpacity + opacityStep)
		} else if (controlsOpacity > targetOpacity) {
			controlsOpacity = Math.max(targetOpacity, controlsOpacity - opacityStep)
		}
		for (let i = 0; i < btnStates.length; i++) {
			btnStates[i].fx.alpha.value = controlsOpacity
		}

		// Edge fade for right menu
		targetEdgeFade = mouseXNorm > 0.85 ? 1 : 0
		if (edgeFade < targetEdgeFade) {
			edgeFade = Math.min(targetEdgeFade, edgeFade + delta / FADE_DURATION)
		} else if (edgeFade > targetEdgeFade) {
			edgeFade = Math.max(targetEdgeFade, edgeFade - delta / FADE_DURATION)
		}
		// Slide animation — separate speed from fade
		if (menuSlideT < targetEdgeFade) {
			menuSlideT = Math.min(targetEdgeFade, menuSlideT + delta / FADE_DURATION)
		} else if (menuSlideT > targetEdgeFade) {
			menuSlideT = Math.max(targetEdgeFade, menuSlideT - delta / FADE_DURATION)
		}
		const menuAlpha = controlsOpacity * edgeFade
		for (let i = 0; i < menuItemStates.length; i++) {
			const ms = menuItemStates[i]
			ms.fx.alpha.value = menuAlpha
			if (ms.animTime > 0) {
				ms.animTime = Math.max(0, ms.animTime - delta)
				ms.fx.impactT.value = ms.animTime / TRANSPORT_FLASH + (ms.hovered ? HOVER_INTENSITY : 0)
			} else {
				ms.fx.impactT.value = ms.hovered ? HOVER_INTENSITY : 0
			}
		}

		textMat.alpha.value = controlsOpacity
		textMatLarge.alpha.value = controlsOpacity

		// Transport button animation
		for (let i = 0; i < btnStates.length; i++) {
			const b = btnStates[i]

			// Flash decay
			if (b.animTime > 0) {
				b.animTime = Math.max(0, b.animTime - delta)
				b.fx.impactT.value = b.animTime / TRANSPORT_FLASH + (b.hovered ? HOVER_INTENSITY : 0)
			} else {
				b.fx.impactT.value = b.hovered ? HOVER_INTENSITY : 0
			}

			// Spin tween (easeOut)
			if (b.spinT > 0) {
				b.spinT = Math.max(0, b.spinT - delta)
				const t = 1 - b.spinT / SPIN_DURATION
				const eased = 1 - (1 - t) * (1 - t) // easeOutQuad
				const angle = b.spinFrom + (b.spinTo - b.spinFrom) * eased
				// In-place mutation — no array spread
				btnSpinAngles[i] = angle
			}
		}
	})

	$effect(() => {
		for (const { fx } of btnStates) {
			fx.emissiveColor.value.set(baseColor)
			fx.impactColor.value.set(baseColor)
		}
		for (const ms of menuItemStates) {
			ms.fx.emissiveColor.value.set(baseColor)
			ms.fx.impactColor.value.set(baseColor)
		}
		textMat.impactColor.value.set(baseColor)
		textMat.emissiveColor.value.set(baseColor)
		textMatLarge.impactColor.value.set(baseColor)
		textMatLarge.emissiveColor.value.set(baseColor)
	})

	onDestroy(() => {
		for (const s of rowStates) s.fx.mat.dispose()
		for (const b of btnStates) b.fx.mat.dispose()
		for (const ms of menuItemStates) ms.fx.mat.dispose()
		textMat?.mat?.dispose()
		textMatLarge?.mat?.dispose()
	})

	const anal = $derived(rows?.[0]?.chain?.analyzer)
	const x = $derived(-$size.width / HUD_ZOOM / 2 + sphereR * 2)
	const analyserEndX = $derived(
		anal
			? x + sphereR * 4 + (sequencerMode === 'time' ? 2 : 5) * sphereR
			: x + (sequencerMode === 'time' ? 0 : 4) * sphereR
	)

	const seqX = $derived(analyserEndX + sphereR)
	const seqWidth = $derived($size.width / HUD_ZOOM / 2 - otherSpacing - seqX)

	const lines = $derived(description?.split('\n') || [])
	const descWidth = $derived(
		showDescription ? Math.max(0, ...lines.map((l) => l.length)) * sphereR * 1.2 * CHAR_WIDTH : 0
	)
	const reduceWidth = $derived((descWidth + otherSpacing) * (controlsOpacity > 0.2 ? 1 : 0))

	const reduceVisibleBeats = $derived(
		sequencerMode === 'time' ? reduceWidth * (beatsVisible / seqWidth) : 0
	)

	const widthFps = 8
	const widthChords = 6

	const posChord = $derived(showStats ? widthFps : 0)
	const posScale = $derived(showHarmony ? posChord + widthChords : showStats ? widthFps : 0)
</script>

<T.OrthographicCamera makeDefault zoom={80} position={[0, 0, 10]} />

{#each rows as row, i (i)}
	{@const analyzerType = resolveAnalyzerType(row.chain.config.analyzer, defaultAnalyser)}
	{@const y = $size.height / HUD_ZOOM / 2 - sphereR / 2 - i * rowSpacing - otherSpacing}
	{@const label = labels[i] ?? ''}

	<!-- Note/chord label -->
	{#if showNotes}
		<T.Group position={[x, y - sphereR / 2 + sphereR * 0.075, 0]}>
			<GeoText cache material={row.fx.mat} text={label.toUpperCase()} size={sphereR} />
		</T.Group>
	{/if}

	{#if showAnalyzers && row.chain.analyzer}
		<AnalyserView
			material={row.fx.mat}
			analyzer={row.chain.analyzer}
			type={analyzerType}
			height={sphereR * 2}
			width={sphereR * 2}
			position={[
				(showNotes ? analyserAnimX[i] : x + sphereR * 1.5) ??
					x + sphereR * 4 + Math.max(label.length - 2, 0) * sphereR * CHAR_WIDTH,
				y - sphereR / 2,
				0
			]}
		/>
	{/if}

	{#if sequencerMode && showTracker && seqEvents[i] && seqWidth > 0}
		<T.Group position={[seqX, y - sphereR / 2 + sphereR * 0.075, 0]}>
			<SequencerView
				events={seqEvents[i]}
				mode={sequencerMode}
				width={seqWidth - reduceWidth}
				height={sphereR * 2}
				charWidth={CHAR_WIDTH / 2}
				colors={sequencerColors}
				beatsVisible={beatsVisible - reduceVisibleBeats}
				{bpm}
				{baseColor}
				{freeze}
			/>
		</T.Group>
	{/if}
{/each}

<T.Group
	position={[
		$size.width / HUD_ZOOM / 2 - otherSpacing,
		-$size.height / HUD_ZOOM / 2 + sphereR * 3 + otherSpacing,
		0
	]}
>
	{#key title}
		<Align x={-1} y={1} z={false}>
			<GeoText cache material={textMatLarge.mat} text={title.toUpperCase()} size={sphereR * 1.8} />
		</Align>
	{/key}
</T.Group>

{#if showDescription && description}
	{#each lines as line, idx (line)}
		{@const textSize = sphereR * 1.2}
		{@const marginX = 2.5 * sphereR}
		{@const marginY = marginX + textSize}
		<T.Group
			position={[
				$size.width / HUD_ZOOM / 2 - marginX - line.length * textSize * CHAR_WIDTH,
				$size.height / HUD_ZOOM / 2 -
					marginY -
					(1 + 1.5 * CHAR_WIDTH) * textSize * idx +
					sphereR * 0.08,
				0
			]}
		>
			<GeoText cache material={textMat.mat} text={line.toUpperCase()} size={textSize} />
		</T.Group>
	{/each}
{/if}

{#if tempo.isPlaying}
	{@const beatSize = sphereR * 1.2}
	{@const beatText = tempo.currentBeat.toString()}
	<T.Group
		position={[
			$size.width / HUD_ZOOM / 2 -
				otherSpacing -
				sphereR * 21.9 -
				beatText.length * beatSize * CHAR_WIDTH,
			-$size.height / HUD_ZOOM / 2 + sphereR * 1.5,
			0
		]}
	>
		<GeoText cache material={textMat.mat} text={beatText} size={beatSize} />
	</T.Group>
{/if}

{#if showHarmony && chord}
	{@const beatSize = sphereR}
	{@const beatText = chord.toUpperCase()}
	<T.Group
		position={[
			-$size.width / HUD_ZOOM / 2 + sphereR * (posChord + 2),
			-$size.height / HUD_ZOOM / 2 + sphereR * 1.5,
			0
		]}
	>
		<GeoText cache material={textMat.mat} text={beatText} size={beatSize} />
	</T.Group>
{/if}

{#if showScale && scale}
	{@const beatSize = sphereR}
	{@const beatText =
		scale.toUpperCase() + (scaleNotes?.length ? ` (${scaleNotes?.join(', ')})` : '')}
	<T.Group
		position={[
			-$size.width / HUD_ZOOM / 2 + sphereR * (posScale + 2),
			-$size.height / HUD_ZOOM / 2 + sphereR * 1.5,
			0
		]}
	>
		<GeoText cache material={textMat.mat} text={beatText} size={beatSize} />
	</T.Group>
{/if}

{#if showStats && fps}
	{@const beatSize = sphereR}
	{@const beatText = `${fps} FPS`.toString()}
	<T.Group
		position={[
			-$size.width / HUD_ZOOM / 2 + sphereR * 2,
			-$size.height / HUD_ZOOM / 2 + sphereR * 1.5,
			0
		]}
	>
		<GeoText cache material={textMat.mat} text={beatText} size={beatSize} />
	</T.Group>
{/if}

<!-- Right-side settings menu (edge proximity + HUD fade) -->
{#each menuItems as item, i (item.label)}
	{@const val = item.get()}
	{@const itemText = item.label + (val ? ' *' : '  ')}
	{@const menuSize = sphereR}
	{@const menuMarginX = otherSpacing}
	{@const menuRowSpacing = (1 + 1.5 * CHAR_WIDTH) * menuSize}
	{@const width = itemText.length * menuSize * CHAR_WIDTH}
	{@const slideEased = easeOutCubic(menuSlideT)}
	{@const overlay = 11 * menuSize * CHAR_WIDTH + menuSize + otherSpacing}
	{@const slideOffset = ((1 - slideEased) * sphereR) / 2}
	{@const mx = $size.width / HUD_ZOOM / 2 - width - menuMarginX + slideOffset}
	{@const my =
		-$size.height / HUD_ZOOM / 2 + (menuItems.length - i - 1) * menuRowSpacing + otherSpacing * 5}
	{@const overlayX = width - overlay / 2 + otherSpacing}
	<T.Group position={[mx, my, 0]}>
		<GeoText cache material={menuItemDic[item.label].fx.mat} text={itemText} size={menuSize} />
		<!-- Invisible hitbox -->
		<T.Mesh
			position.x={overlayX}
			position.y={sphereR * 0.4}
			onclick={() => toggleMenuItem(i)}
			onpointerenter={() => {
				menuItemDic[item.label].hovered = true
			}}
			onpointerleave={() => {
				menuItemDic[item.label].hovered = false
			}}
		>
			<T.BoxGeometry args={[overlay, menuSize * 2, menuSize]} />
			<T.MeshBasicMaterial transparent opacity={0} depthWrite={false} />
		</T.Mesh>
	</T.Group>
{/each}

<!-- Transport controls (bottom-right) -->
{#each btnDefs as btn, i (i)}
	{@const btnSize = sphereR * 3}
	{@const btnMargin = sphereR * 0.5}
	{@const bx = $size.width / HUD_ZOOM / 2 - otherSpacing - sphereR * 0.9}
	{@const by = -$size.height / HUD_ZOOM / 2 + sphereR * 2}
	{@const kind = btn.kind === 'repro' && isMuted ? 'muted' : btn.kind}
	{@const geom = createInstrumentGeometry({
		type: 'arrow',
		kind,
		size: btnSize / 2,
		width: btnSize * 0.06,
		cornerRadius: btnSize * 0.075
	})}
	<T.Group position={[bx - (btnDefs.length - 1 - i) * (btnSize + btnMargin), by, 0]}>
		<T.Mesh
			geometry={geom}
			material={btnStates[i].fx.mat}
			rotation.x={(btn.rotX ?? 0) + btnSpinAngles[i]}
			rotation.y={(btn.rotY ?? 0) + Math.PI / 2}
		/>
		<!-- Invisible hitbox -->
		<T.Mesh
			onclick={(event: MouseEvent) => onBtnClick(event, i)}
			onpointerenter={() => onBtnEnter(i)}
			onpointerleave={() => onBtnLeave(i)}
		>
			<T.BoxGeometry args={[btnSize, btnSize, btnSize]} />
			<T.MeshBasicMaterial transparent opacity={0} depthWrite={false} />
		</T.Mesh>
	</T.Group>
{/each}
