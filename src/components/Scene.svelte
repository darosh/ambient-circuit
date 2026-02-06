<script lang="ts">
import { T } from '@threlte/core'
import { Grid, OrbitControls } from '@threlte/extras'
import type { Rail, RailPointFull } from '../lib/rail'
import RailView from './RailView.svelte'

let { showPoints = false }: { showPoints?: boolean } = $props()

// circle from 4 points — all 'both'
const circle: Rail = {
	id: 'circle',
	nodes: [
		{ p: [1, 0, 0], round: 'both' },
		{ p: [0, 0, 1], round: 'both' },
		{ p: [-1, 0, 0], round: 'both' },
		{ p: [0, 0, -1], round: 'both' },
		{ p: [1, 0, 0], round: 'both' }
	]
}

// rounded rectangle from 8 points — 4 corners with 'to'
const roundedRect: Rail = {
	id: 'rounded-rect',
	nodes: [
		{ p: [3, 0, -2] },
		{ p: [4, 0, -2], round: 'from' },
		{ p: [5, 0, -1] },
		{ p: [5, 0, 0], round: 'from' },
		{ p: [4, 0, 1] },
		{ p: [3, 0, 1], round: 'from' },
		{ p: [2, 0, 0] },
		{ p: [2, 0, -1], round: 'from' },
		{ p: [3, 0, -2], }
	]
}

// vertical coil with smooth entry/exit

const coilHeight = 1
const coilRounds = 2
const coilDensity = 4
const coilLength = coilRounds * coilDensity + 1

const coilPoints: RailPointFull[] = Array.from({ length: coilLength }, (_, i) => {
	const t = (i / coilDensity) * 2 * Math.PI

	return {
		p: [Math.cos(t) - 3, i / (coilLength - 1) * coilHeight, Math.sin(t)] as [number, number, number],
		round: i === 0 ? 'from' as const : i === coilLength - 1 ? 'to' as const : 'both' as const
	}
})

const coil: Rail = {
	id: 'coil',
	nodes: [
		[-2, 0, -1],
		...coilPoints,
		[-2, 1, 1]
	]
}

const spiralPoints: RailPointFull[] = Array.from({ length: coilLength }, (_, i) => {
	const t = (i / coilDensity) * 2 * Math.PI
	const r = Math.ceil((1 + i) / coilDensity) * .5

	return {
		p: [Math.cos(t) * r - 5.5, i / (coilLength - 1) * coilHeight, Math.sin(t) * r] as [number, number, number],
		round: i === 0 ? 'from' as const : i === coilLength - 1 ? 'to' as const : 'both' as const
	}
})

const spiral: Rail = {
	id: 'coil',
	nodes: [
		[-5, 0, -1],
		...spiralPoints,
		[-4, 1, 1]
	]
}
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

<RailView rail={circle} color="#00ffff" width={0.08} {showPoints} />
<RailView rail={roundedRect} color="#ff00ff" width={0.08} {showPoints} />
<RailView rail={coil} color="#ffff00" width={0.08} {showPoints} />
<RailView rail={spiral} color="#ff0000" width={0.08} {showPoints} />
