<script lang="ts">
import { T } from '@threlte/core'
import { Grid, OrbitControls } from '@threlte/extras'
import { circle, roundedRect, coil, spiral } from '../lib/rail-primitives'
import RailView from './RailView.svelte'

let { showPoints = false }: { showPoints?: boolean } = $props()

const rails = [
	{ rail: circle(), color: '#00ffff' },
	{ rail: roundedRect({ pos: { x: 3.5 } }), color: '#ff00ff' },
	{ rail: coil({ pos: { x: -3 }, lead: 1 }), color: '#ffff00' },
	{ rail: spiral({ pos: { x: 0 }, lead: 1 }), color: '#ff0000' },
]
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

{#each rails as { rail, color }}
	<RailView {rail} {color} width={0.08} {showPoints} />
{/each}
