<script lang="ts">
	import { T } from '@threlte/core'
	import { Billboard, MeshLineGeometry, MeshLineMaterial, Text } from '@threlte/extras'
	import type { Rail } from '../lib/rail'
	import type { Instrument } from '../lib/instrument'
	import { resolveRail } from '../lib/rail-resolve'
	import { buildRailCurve, computeBeatPositions } from '../lib/rail-geometry'
	import { Vector3 } from 'three'
	import InstrumentView from './InstrumentView.svelte'

	type Props = {
		rail: Rail
		color?: string
		width?: number
		showPoints?: boolean
		showBeats?: boolean
		instruments?: Instrument[]
	}

	let { rail, color = '#00ffff', width = 0.1, showPoints = false, showBeats = false, instruments = [] }: Props = $props()

	const resolved = $derived(resolveRail(rail))
	const mainPoints = $derived(buildRailCurve(resolved.points))
	const branchCurves = $derived.by(() => {
		const result: import('three').Vector3[][] = []
		for (const s of resolved.splits) {
			// Find the point before the split in main rail for proper tangent computation
			const splitIdx = resolved.points.findIndex(p => p.beat === s.beat)
			const prevPoint = splitIdx > 0 ? resolved.points[splitIdx - 1] : null

			for (const b of s.branches) {
				// Prepend prev point and split point to branch for correct tangent computation
				const pointsForCurve = prevPoint
					? [prevPoint, { p: s.p, beat: s.beat, round: null }, ...b.points]
					: [{ p: s.p, beat: s.beat, round: null }, ...b.points]

				const curve = buildRailCurve(pointsForCurve)

				// If prev point exists, find the split point in curve and slice from there
				if (prevPoint && curve.length > 1) {
					const splitV3 = new Vector3(s.p[0], s.p[1], s.p[2])
					let splitCurveIdx = 0
					let minDist = Infinity
					for (let i = 0; i < curve.length; i++) {
						const dist = curve[i].distanceToSquared(splitV3)
						if (dist < minDist) {
							minDist = dist
							splitCurveIdx = i
						}
					}
					result.push(curve.slice(splitCurveIdx))
				} else {
					result.push(curve)
				}
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

{#each instruments as instrument, idx (idx)}
	<InstrumentView {instrument} points={resolved.points} />
{/each}
