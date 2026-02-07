<script lang="ts">
	import { T } from '@threlte/core'
	import { Billboard, MeshLineGeometry, MeshLineMaterial, Text } from '@threlte/extras'
	import type { Rail } from '../lib/rail'
	import { resolveRail } from '../lib/rail-resolve'
	import { buildRailCurve, computeBeatPositions } from '../lib/rail-geometry'

	type Props = {
		rail: Rail
		color?: string
		width?: number
		showPoints?: boolean
		showBeats?: boolean
	}

	let { rail, color = '#00ffff', width = 0.1, showPoints = false, showBeats = false }: Props = $props()

	const resolved = $derived(resolveRail(rail))
	const mainPoints = $derived(buildRailCurve(resolved.points))
	const branchCurves = $derived.by(() => {
		const result: import('three').Vector3[][] = []
		for (const s of resolved.splits) {
			for (const b of s.branches) {
				// Prepend split point to connect branch to split
				const pointsWithSplit = [
					{ p: s.p, beat: s.beat, round: null },
					...b.points
				]
				result.push(buildRailCurve(pointsWithSplit))
			}
		}
		return result
	})
	const beatPositions = $derived.by(() => {
		if (!showBeats) return []
		const result = computeBeatPositions(resolved.points)
		for (const s of resolved.splits) {
			for (const b of s.branches) {
				// Branch beat positions (split point already in main rail)
				const branchBeats = computeBeatPositions(b.points)
				result.push(...branchBeats)
			}
		}
		return result
	})
</script>

{#if mainPoints.length >= 2}
	<T.Mesh>
		<MeshLineGeometry points={mainPoints} />
		<MeshLineMaterial {width} {color} opacity={0.9} />
	</T.Mesh>
{/if}

{#each branchCurves as points, pointsIndex (pointsIndex)}
	{#if points.length >= 2}
		<T.Mesh>
			<MeshLineGeometry {points} />
			<MeshLineMaterial {width} {color} opacity={0.7} />
		</T.Mesh>
	{/if}
{/each}

{#if showPoints}
	{#each resolved.points as pt, ptIndex (ptIndex)}
		<T.Mesh position={[pt.p[0], pt.p[1], pt.p[2]]}>
			<T.SphereGeometry args={[0.04, 8, 8]} />
			<T.MeshBasicMaterial color={pt.round ? '#ffffff' : color} />
		</T.Mesh>
	{/each}
	{#each resolved.splits as split, splitIndex (splitIndex)}
		{#each split.branches as branch, branchIndex (branchIndex)}
			{#each branch.points as pt, ptIndex (ptIndex)}
				<T.Mesh position={[pt.p[0], pt.p[1], pt.p[2]]}>
					<T.SphereGeometry args={[0.04, 8, 8]} />
					<T.MeshBasicMaterial color={pt.round ? '#ffffff' : color} />
				</T.Mesh>
			{/each}
		{/each}
	{/each}
{/if}

{#if showBeats}
	{#each beatPositions as bp, bpIndex (bpIndex)}
		{@const isDownbeat = bp.beat === (resolved.beatOffset)}
		<Billboard position={[bp.position.x, bp.position.y + 0.12 * (isDownbeat ? -1 : 1), bp.position.z]}>
			<Text
				text={String(bp.beat)}
				font="./Outfit-Medium.ttf"
				fontSize={isDownbeat ? 0.15 : 0.1}
				color={isDownbeat ? '#ffffff' : color}
				anchorX="center"
				anchorY="middle"
			/>
		</Billboard>
	{/each}
{/if}
