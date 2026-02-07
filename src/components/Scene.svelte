<script lang="ts">
import { T, useTask } from '@threlte/core'
import { Grid, OrbitControls } from '@threlte/extras'
import { circle, roundedRect, coil, spiral } from '../lib/rail-primitives'
import RailView from './RailView.svelte'
import { createTempoState, updateTempo, type TempoState } from '../lib/tempo'
import { createMarble } from '../lib/marble'
import { updateMarbles } from '../lib/marble-system'
import { resolveRail } from '../lib/rail-resolve'
import type { Rail } from '../lib/rail'

let {
	showPoints = false,
	showBeats = false,
	tempo = $bindable(),
	easing = $bindable(),
	railVisibility = $bindable()
}: {
	showPoints?: boolean
	showBeats?: boolean
	tempo?: TempoState
	easing?: string
	railVisibility?: boolean[]
} = $props()

const rails = [
	{ rail: circle({ pos: { y: -0.5 } }), color: '#00ffff' },
	{ rail: roundedRect({ pos: { x: 3.5 } }), color: '#ff00ff' },
	{ rail: coil({ pos: { x: -3 }, lead: 1 }), color: '#ffff00' },
	{ rail: spiral({ pos: { x: 0 }, lead: 1 }), color: '#ff0000' },
	{ rail: circle({ pos: { x: 0, y: 1.5 } }), color: '#ffffff' },
	// Fork example: main path a-b-c with split at b
	{
		rail: {
			id: 'fork-demo',
			offset: [0, 0, 2],
			nodes: [
				[-1, 0, 0], // a - beat 0
				{
					split: {
						p: [0, 0, 0],  // b - beat 1 (split point)
						weights: [1, 1], // alternate between branches
						branches: [
							[
								{ p: [1, 1, 0], beat: 2 }
							],
							[
								{ p: [1, -1, 0], beat: 2 }
							]
						]
					}
				}
			]
		} satisfies Rail,
		color: '#00ff00'
	},
	{
		rail: {
			id: 'fork-demo2',
			offset: [-3, 0, 2],
			nodes: [
				[-1, 0, 0], // a - beat 0
				{
					split: {
						p: [0, 0, 0],  // b - beat 1 (split point)
						weights: [1, 1], // alternate between branches
						branches: [
							[
								{ p: [1, 1, 0], beat: 2 }
							],
							[
								{ p: [1, -1, 0], beat: 2 }
							]
						]
					}
				}
			]
		} satisfies Rail,
		color: '#00ff00'
	}
]

// Init rail visibility if not provided
if (!railVisibility) railVisibility = rails.map(() => true)

rails[0].rail.offset = [0,0,-3]

// @ts-expect-error temporary
rails[4].rail.nodes[0].beat = 0
// @ts-expect-error temporary
rails[4].rail.nodes.at(-1).beat = 3

// Init tempo state
if (!tempo) tempo = createTempoState()

// Create marbles (1 per rail, beat 0, looping, forward)
let marbles = $state(rails.map(({ rail }) =>
	createMarble({
		resolvedRail: resolveRail(rail),
		startBeat: 0,
		direction: 'forward',
		sequenceMode: 'looping',
		easing: easing || 'linear'
	})
))

// Update loop
useTask((delta) => {
	updateTempo(tempo, delta * 1000)

	// Update easing based on prop
	for (const marble of marbles) {
		marble.config.easing = easing || 'linear'
	}

	updateMarbles(marbles, tempo)
})
</script>

<T.PerspectiveCamera makeDefault position={[4, 6, 8]} fov={30}>
	<OrbitControls enableDamping target={[0, 1, 0]} />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
<T.AmbientLight intensity={0.4} />

<Grid
	position.y={-0.01}
	cellColor="#999999"
	sectionColor="#555555"
	sectionThickness={0}
	fadeDistance={25}
	cellSize={1}
/>

{#each rails as { rail, color }, railIndex (railIndex)}
	{#if railVisibility[railIndex]}
		<RailView {rail} {color} width={0.08} {showPoints} {showBeats} />
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
