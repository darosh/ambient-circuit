<script lang="ts">
	import { T } from '@threlte/core'
	import { Text3DGeometry } from '@threlte/extras'
	import type { Rail } from '../lib/rail'
	import type { Instrument } from '../lib/instrument'
	import { resolveRail } from '../lib/rail-resolve'
	import { buildRailCurve, computeBeatPositions } from '../lib/rail-geometry'
	import { CatmullRomCurve3, MeshStandardMaterial, TubeGeometry, Vector3 } from 'three'
	import { createRailMaterial } from '../lib/material-rail'
	import InstrumentView from './InstrumentView.svelte'

	type Props = {
		rail: Rail
		color?: string
		width?: number
		showPoints?: boolean
		showBeats?: boolean
		fxRails?: boolean
		fxInstruments?: boolean
		instruments?: Instrument[]
	}

	let { rail, color = '#00ffff', width = 0.1, showPoints = false, showBeats = false, fxRails = true, fxInstruments = true, instruments = [] }: Props = $props()

	const resolved = $derived(resolveRail(rail))
	const mainPoints = $derived(buildRailCurve(resolved.points))
	// Always create both materials - switching avoids WebGPU state issues on toggle
	const fxMaterial = $derived(createRailMaterial(color))
	const plainMaterial = $derived(new MeshStandardMaterial({ color }))
	const branchCurves = $derived.by(() => {
		const result: import('three').Vector3[][] = []
		for (const s of resolved.splits) {
			// Find the point before the split in main rail for proper tangent computation
			const splitIdx = resolved.points.findIndex(p => p.beat === s.beat)
			const prevPoint = splitIdx > 0 ? resolved.points[splitIdx - 1] : null

			for (const b of s.branches) {
				// Prepend prev point and split point to branch for correct tangent computation
				const pointsForCurve = prevPoint
					? [prevPoint, { p: s.p, beat: s.beat, round: null, tangent: 0.39 }, ...b.points]
					: [{ p: s.p, beat: s.beat, round: null, tangent: 0.39 }, ...b.points]

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
				const branchBeats = computeBeatPositions(b.points)
				result.push(...branchBeats)
			}
		}
		return result
	})

	// Create tube mesh for main rail
	const mainMeshes = $derived.by(() => {
		if (mainPoints.length < 2) return []
		try {
			const curve = new CatmullRomCurve3(mainPoints)
			const segments = Math.min(Math.max(mainPoints.length * 4, 8), 256)
			const radius = Math.max(width / 2, 0.001)
			const geometry = new TubeGeometry(curve, segments, radius, 8, false)
			return [{ geometry, opacity: 0.9 }]
		} catch (e) {
			console.warn('Failed to create main rail tube:', e)
			return []
		}
	})

	// Create tube meshes for branches
	const branchMeshes = $derived.by(() => {
		const meshes: Array<{ geometry: TubeGeometry; opacity: number }> = []
		for (const points of branchCurves) {
			if (points.length < 2) continue
			try {
				const curve = new CatmullRomCurve3(points)
				const segments = Math.min(Math.max(points.length * 4, 8), 256)
				const radius = Math.max(width / 2, 0.001)
				const geometry = new TubeGeometry(curve, segments, radius, 8, false)
				meshes.push({ geometry, opacity: 0.7 })
			} catch (e) {
				console.warn('Failed to create branch tube:', e)
			}
		}
		return meshes
	})

	const allMeshes = $derived([...mainMeshes, ...branchMeshes])
</script>

{#each allMeshes as { geometry }, idx (idx)}
	<T.Mesh {geometry} material={fxRails ? fxMaterial : plainMaterial} />
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
		<T.Mesh position={[bp.position.x + .1, bp.position.y + (isDownbeat ? -.25 : .05), bp.position.z]}>
			<Text3DGeometry
				text={String(bp.beat)}
				size={isDownbeat ? 0.2 : 0.2}
				depth={0.01}
				bevelEnabled={false}
			/>
			<T.MeshBasicMaterial color={isDownbeat ? '#ffffff' : color} />
		</T.Mesh>
	{/each}
{/if}

{#each instruments as instrument, idx (idx)}
	<InstrumentView {instrument} rail={resolved} {fxInstruments} />
{/each}
