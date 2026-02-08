<script lang="ts">
import { T, useTask } from '@threlte/core'
import { OrbitControls } from '@threlte/extras'
import RailView from './RailView.svelte'
import { createTempoState, updateTempo, type TempoState } from '../lib/tempo'
import { createMarble } from '../lib/marble'
import { updateMarbles } from '../lib/marble-system'
import { resolveRail } from '../lib/rail-resolve'
import { createRails } from '../lib/rail-data'
import type { MidiState } from '../lib/midi'

let {
	showGrid = false,
	showPoints = false,
	showBeats = false,
	midiState = null,
	tempo = $bindable(),
	easing = $bindable(),
	railVisibility = $bindable(),
	fps = $bindable()
}: {
	showPoints?: boolean
	showBeats?: boolean
	showStats?: boolean
	midiState?: MidiState | null
	tempo?: TempoState
	easing?: string
	railVisibility?: boolean[]
	fps?: number
} = $props()

// Init rail visibility if not provided
if (!railVisibility) railVisibility = rails.map(() => true)

// Init tempo state
if (!tempo) tempo = createTempoState()

// Create marbles (1 per rail, beat 0, looping, forward)
// Use static rails initially, then update with MIDI-enabled rails
const staticRails = createRails(null, [])
let marbles = $state(staticRails.map(({ rail, direction, mode, speed }) =>
	createMarble({
		resolvedRail: resolveRail(rail),
		startBeat: 0,
		direction: direction || 'forward',
		sequenceMode: mode || 'looping',
		easing: easing || 'linear',
		speed: speed ?? 1
	})
))

// Create MIDI-enabled rails (reactive to midiState changes)
let rails = $derived(createRails(midiState, marbles))

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

	const instrumentsPerRail = rails.map(r => r.instruments || [])
	const railIds = rails.map(r => r.rail.id)
	updateMarbles(marbles, tempo, instrumentsPerRail, railIds)
})
</script>

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
		<RailView {rail} {color} width={0.08} {showPoints} {showBeats} {instruments} />
	{/if}
{/each}

{#each marbles as marble, idx (idx)}
	{#if railVisibility[idx]}
		<T.Mesh position={[marble.position.x, marble.position.y, marble.position.z]}>
			<T.SphereGeometry args={[0.15, 16, 16]} />
			<T.MeshStandardMaterial metalness={.8} roughness={.6} color={rails[idx].color} emissive={rails[idx].color}
															emissiveIntensity={0.1} />
		</T.Mesh>
	{/if}
{/each}
