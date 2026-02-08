<script lang="ts">
	import { T } from '@threlte/core'
	import { Text3DGeometry } from '@threlte/extras'
	import type { Rail, ResolvedPoint } from '../lib/rail'
	import type { Instrument } from '../lib/instrument'
	import { resolveRail } from '../lib/rail-resolve'
	import { buildSegmentCurve, computeBeatPositions, toV3 } from '../lib/rail-geometry'
	import { CurvePath, LineCurve3, MeshStandardMaterial, TubeGeometry, Vector3 } from 'three'
	import InstrumentView from './InstrumentView.svelte'
	import { makeRailMaterial } from '../lib/config'

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

	let {
		rail,
		color = '#00ffff',
		width = 0.1,
		showPoints = false,
		showBeats = false,
		fxRails = true,
		fxInstruments = true,
		instruments = []
	}: Props = $props()

	function buildCurvePath(points: ResolvedPoint[], skipFirst = 0): CurvePath<Vector3> | null {
		const path = new CurvePath<Vector3>()
		for (let i = skipFirst; i < points.length - 1; i++) {
			const p0 = toV3(points[i].p)
			const p1 = toV3(points[i + 1].p)
			if (p0.distanceTo(p1) < 1e-6) continue
			const bezier = buildSegmentCurve(points, i)
			path.add(bezier ?? new LineCurve3(p0, p1))
		}
		return path.curves.length > 0 ? path : null
	}

	const resolved = $derived(resolveRail(rail))
	// Always create both materials - switching avoids WebGPU state issues on toggle
	const fxMaterial = $derived(makeRailMaterial(color).mat)
	const plainMaterial = $derived(new MeshStandardMaterial({ color }))
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

	function makeTube(
		curvePath: CurvePath<Vector3> | null,
		opacity: number
	): { geometry: TubeGeometry; opacity: number } | null {
		if (!curvePath) return null
		try {
			const segments = Math.min(Math.max(curvePath.curves.length * 8, 16), 512)
			const radius = Math.max(width / 2, 0.001)
			return { geometry: new TubeGeometry(curvePath, segments, radius, 8, false), opacity }
		} catch (e) {
			console.warn('Failed to create tube:', e)
			return null
		}
	}

	const mainMeshes = $derived.by(() => {
		const m = makeTube(buildCurvePath(resolved.points), 0.9)
		return m ? [m] : []
	})

	const branchMeshes = $derived.by(() => {
		const meshes: Array<{ geometry: TubeGeometry; opacity: number }> = []
		for (const s of resolved.splits) {
			const splitIdx = resolved.points.findIndex((p) => p.beat === s.beat)
			const prev = splitIdx > 0 ? resolved.points[splitIdx - 1] : null
			for (const b of s.branches) {
				const pts: ResolvedPoint[] = prev
					? [prev, { p: s.p, beat: s.beat, round: null, tangent: 0.39 }, ...b.points]
					: [{ p: s.p, beat: s.beat, round: null, tangent: 0.39 }, ...b.points]
				const m = makeTube(buildCurvePath(pts, prev ? 1 : 0), 0.7)
				if (m) meshes.push(m)
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
		{@const isDownbeat = bp.beat === resolved.beatOffset}
		<T.Mesh
			position={[bp.position.x + 0.1, bp.position.y + (isDownbeat ? -0.25 : 0.05), bp.position.z]}
		>
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
	<InstrumentView size={0.5} {instrument} rail={resolved} {fxInstruments} />
{/each}
