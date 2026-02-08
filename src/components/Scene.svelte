<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { untrack } from 'svelte'
	import { OrbitControls } from '@threlte/extras'
	import RailView from './RailView.svelte'
	import Bloom from './Bloom.svelte'
	import { createTempoState, updateTempo, type TempoState } from '../lib/tempo'
	import { createMarble } from '../lib/marble'
	import { updateMarbles } from '../lib/marble-system'
	import { resolveRail } from '../lib/rail-resolve'
	import type { MidiState } from '../lib/midi'
	import type { SceneConfig } from '../lib/scene'
	import { MeshStandardMaterial } from 'three'
	import { makeMarbleMaterial } from '../lib/config'

	let {
		scene,
		showGrid = false,
		showPoints = false,
		showBeats = false,
		wireframe = false,
		fxPost = true,
		fxRails = true,
		fxMarbles = true,
		fxInstruments = true,
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
		wireframe?: boolean
		fxPost?: boolean
		fxRails?: boolean
		fxMarbles?: boolean
		fxInstruments?: boolean
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
	const _init = (() => {
		const ms = []
		const indices: number[] = []
		for (let i = 0; i < rails.length; i++) {
			const { rail, marbles: mds } = rails[i]
			const resolvedRail = resolveRail(rail)

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
						note: m.note
					})
				)
				indices.push(i)
			}
		}
		return { ms, indices }
	})()
	let marbles = $state(_init.ms)
	const marbleRailIndices = _init.indices

	// Init rail visibility (reset if length mismatch from scene change)
	if (!railVisibility || railVisibility.length !== rails.length) {
		railVisibility = rails.map(() => true)
	}

	// Marble materials (both always created to avoid toggle issues)
	const marbleFxMaterials = $derived(rails.map((r) => makeMarbleMaterial(r.color || '#ffffff').mat))
	const marblePlainMaterials = $derived(
		rails.map((r) => new MeshStandardMaterial({ color: r.color }))
	)

	$effect(() => {
		for (const m of marbleFxMaterials) m.wireframe = wireframe
		for (const m of marblePlainMaterials) m.wireframe = wireframe
	})

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
	<Bloom strength={.5} radius={.2} threshold={0.5} />
{/if}

<T.PerspectiveCamera makeDefault position={[4, 6, 8]} fov={30}>
	<OrbitControls enableDamping target={[0, 1, 0]} />
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
			{wireframe}
			{instruments}
			{fxRails}
			{fxInstruments}
		/>
	{/if}
{/each}

{#each marbles as marble, idx (idx)}
	{#if railVisibility[marbleRailIndices[idx]]}
		<T.Mesh
			position={[marble.position.x, marble.position.y, marble.position.z]}
			material={fxMarbles
				? marbleFxMaterials[marbleRailIndices[idx]]
				: marblePlainMaterials[marbleRailIndices[idx]]}
		>
			<T.SphereGeometry args={[0.12, 16, 16]} />
		</T.Mesh>
	{/if}
{/each}
