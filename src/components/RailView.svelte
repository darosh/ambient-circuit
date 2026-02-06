<script lang="ts">
	import { T } from '@threlte/core'
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras'
	import type { Rail } from '../lib/rail'
	import { resolveRail } from '../lib/rail-resolve'
	import { buildRailCurve } from '../lib/rail-geometry'

	type Props = {
		rail: Rail
		color?: string
		width?: number
		showPoints?: boolean
	}

	let { rail, color = '#00ffff', width = 0.1, showPoints = false }: Props = $props()

	const resolved = $derived(resolveRail(rail))
	const mainPoints = $derived(buildRailCurve(resolved.points))
	const branchCurves = $derived(
		resolved.splits.flatMap((s) => s.branches.map((b) => buildRailCurve(b.points)))
	)
</script>

{#if mainPoints.length >= 2}
	<T.Mesh>
		<MeshLineGeometry points={mainPoints} />
		<MeshLineMaterial {width} {color} opacity={0.9} />
	</T.Mesh>
{/if}

{#each branchCurves as points}
	{#if points.length >= 2}
		<T.Mesh>
			<MeshLineGeometry {points} />
			<MeshLineMaterial {width} {color} opacity={0.7} />
		</T.Mesh>
	{/if}
{/each}

{#if showPoints}
	{#each resolved.points as pt}
		<T.Mesh position={[pt.p[0], pt.p[1], pt.p[2]]}>
			<T.SphereGeometry args={[0.04, 8, 8]} />
			<T.MeshBasicMaterial color={pt.round ? '#ffffff' : color} />
		</T.Mesh>
	{/each}
	{#each resolved.splits as split}
		{#each split.branches as branch}
			{#each branch.points as pt}
				<T.Mesh position={[pt.p[0], pt.p[1], pt.p[2]]}>
					<T.SphereGeometry args={[0.04, 8, 8]} />
					<T.MeshBasicMaterial color={pt.round ? '#ffffff' : color} />
				</T.Mesh>
			{/each}
		{/each}
	{/each}
{/if}
