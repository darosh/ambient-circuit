<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { untrack } from 'svelte'
	import { OrbitControls } from '@threlte/extras'
	import RailView from './RailView.svelte'
	import MarbleView from './MarbleView.svelte'
	import Bloom from './Bloom.svelte'
	import { createTempoState, updateTempo, type TempoState } from '../lib/tempo'
	import { createMarble } from '../lib/marble'
	import { updateMarbles } from '../lib/marble-system'
	import { resolveRail } from '../lib/rail-resolve'
	import type { MidiState } from '../lib/midi'
	import type { SceneConfig } from '../lib/scene'
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
	import { useLoader } from '@threlte/core'
	import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'

	export const font = <Font>(<unknown>useLoader(FontLoader).load('./outfit-medium-regular.json'))

	let {
		scene,
		showGrid = false,
		showPoints = false,
		showBeats = false,
		showNames = false,
		wireframe = false,
		fxPost = true,
		fxRails = true,
		fxMarbles = true,
		fxInstruments = true,
		autoRotate = false,
		midiState = null,
		tempo = $bindable(),
		easing = $bindable(),
		railVisibility = $bindable(),
		fps = $bindable()
	}: {
		scene: SceneConfig
		showGrid?: boolean
		showPoints?: boolean
		showBeats?: boolean
		showNames?: boolean
		wireframe?: boolean
		fxPost?: boolean
		fxRails?: boolean
		fxMarbles?: boolean
		fxInstruments?: boolean
		autoRotate?: boolean
		showStats?: boolean
		midiState?: MidiState | null
		tempo?: TempoState
		easing?: string
		railVisibility?: boolean[]
		fps?: number
	} = $props()

	// Init tempo state
	if (!tempo) tempo = createTempoState()

	// Create marbles once at mount (component remounts per scene via {#key})
	const rails = untrack(() => scene.rails)

	// Create reactive signal map - wrap all instrument signals in $state
	const signalStates = $state<Array<{ intensity: number }>>(
		(() => {
			const signals: Array<{ intensity: number }> = []
			for (const { instruments } of rails) {
				instruments?.forEach(() => {
					signals.push({ intensity: 0 })
				})
			}
			return signals
		})()
	)

	// Assign signals to instruments (reactive reference)
	let signalIndex = 0
	for (const { instruments } of rails) {
		instruments?.forEach((ins) => {
			ins.signal = signalStates[signalIndex++]
		})
	}

	const _init = (() => {
		const ms = []
		const indices: number[] = []
		const resolved = []
		for (let i = 0; i < rails.length; i++) {
			const { rail, marbles: mds } = rails[i]
			const resolvedRail = resolveRail(rail)
			resolved.push(resolvedRail)

			const configs = mds && mds.length > 0 ? mds : mds === false ? [] : [{}]

			for (const m of configs) {
				ms.push(
					createMarble({
						resolvedRail,
						startBeat: m.start ?? 0,
						direction: m.direction ?? 'forward',
						sequenceMode: m.mode ?? 'looping',
						easing: easing || 'linear',
						speed: m.speed ?? 1,
						note: m.note,
						type: m.type,
						...('sides' in m ? { sides: m.sides } : {}),
						...(m.type === 'coil' ? { rounds: m.rounds } : {})
					})
				)
				indices.push(i)
			}
		}
		return { ms, indices, resolved }
	})()
	let marbles = $state(_init.ms)
	const marbleRailIndices = _init.indices
	const resolvedRails = _init.resolved

	// Init rail visibility (reset if length mismatch from scene change)
	if (!railVisibility || railVisibility.length !== rails.length) {
		railVisibility = rails.map(() => true)
	}

	// FPS tracking
	if (fps === undefined) fps = 0
	let frames = 0
	let lastTime = performance.now()

	// Update loop
	useTask((delta) => {
		// Calculate FPS
		frames++
		const now = performance.now()
		if (now >= lastTime + 1000) {
			fps = Math.round((frames * 1000) / (now - lastTime))
			frames = 0
			lastTime = now
		}

		updateTempo(tempo, delta * 1000)

		// Update easing based on prop
		for (const marble of marbles) {
			marble.config.easing = easing || 'linear'
		}

		const instrumentsPerMarble = marbleRailIndices.map((i) => rails[i].instruments || [])
		const railIdPerMarble = marbleRailIndices.map((i) => rails[i].rail.id)
		updateMarbles(
			marbles,
			tempo,
			instrumentsPerMarble,
			railIdPerMarble,
			scene.triggerHandler,
			midiState
		)
	})
</script>

{#if fxPost}
	<Bloom strength={0.5} radius={0.2} threshold={0.5} />
{/if}

<T.PerspectiveCamera makeDefault position={[5, 7, 9]} fov={30}>
	<OrbitControls enableDamping target={[0, 1, 0]} {autoRotate} autoRotateSpeed={0.5} />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
<T.AmbientLight intensity={0.4} />

{#if showGrid}
	<T.GridHelper
		position.y={-0.01}
		cellColor="#999999"
		sectionColor="#555555"
		sectionThickness={0}
		fadeDistance={25}
		cellSize={1}
	/>
{/if}

{#each rails as { rail, color, instruments }, railIndex (railIndex)}
	{#if railVisibility[railIndex]}
		<RailView
			{rail}
			{color}
			width={0.06}
			{showPoints}
			{showBeats}
			{showNames}
			{wireframe}
			{instruments}
			{fxRails}
			{fxInstruments}
			{font}
		/>
	{/if}
{/each}

{#each marbles as _m, idx (idx)}
	{#if railVisibility[marbleRailIndices[idx]]}
		<MarbleView
			bind:marble={marbles[idx]}
			rail={resolvedRails[marbleRailIndices[idx]]}
			color={rails[marbleRailIndices[idx]].color || '#ffffff'}
			{wireframe}
			{fxMarbles}
		/>
	{/if}
{/each}
