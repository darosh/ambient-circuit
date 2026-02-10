<script lang="ts">
	import { T, useThrelte, useTask } from '@threlte/core'
	import { Text3DGeometry, Align, Suspense } from '@threlte/extras'
	import type { Rail, ResolvedPoint } from '../lib/rail'
	import type { Instrument } from '../lib/instrument'
	import { resolveRail } from '../lib/rail-resolve'
	import { buildSegmentCurve, computeBeatPositions, toV3 } from '../lib/rail-geometry'
	import {
		type BufferGeometry,
		CurvePath,
		Group,
		LineCurve3,
		MeshStandardMaterial,
		Vector3
	} from 'three/webgpu'
	import InstrumentView from './InstrumentView.svelte'
	import { makeRailMaterial } from '../lib/config'
	import { buildTubeGeometry } from '../lib/tube-geometry'
	import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'

	type Props = {
		rail: Rail
		color?: string
		width?: number
		showPoints?: boolean
		showBeats?: boolean
		showNames?: boolean
		wireframe?: boolean
		fxRails?: boolean
		fxInstruments?: boolean
		instruments?: Instrument[]
		font?: Font
	}

	let {
		rail,
		color = '#00ffff',
		width = 0.1,
		showPoints = false,
		showBeats = false,
		showNames = false,
		wireframe = false,
		fxRails = true,
		fxInstruments = true,
		instruments = [],
		font
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

	$effect(() => {
		fxMaterial.wireframe = wireframe
		plainMaterial.wireframe = wireframe
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

	function makeTube(
		curvePath: CurvePath<Vector3> | null,
		opacity: number,
		closed = false
	): { geometry: BufferGeometry; opacity: number } | null {
		if (!curvePath) return null
		try {
			const radius = Math.max(width / 2, 0.001)
			return { geometry: buildTubeGeometry(curvePath.curves, radius, 8, 12, closed), opacity }
		} catch (e) {
			console.warn('Failed to create tube:', e)
			return null
		}
	}

	const mainMeshes = $derived.by(() => {
		const pts = resolved.points
		const first = pts[0]?.p
		const last = pts[pts.length - 1]?.p
		const closed =
			!!first &&
			!!last &&
			Math.abs(first[0] - last[0]) < 1e-6 &&
			Math.abs(first[1] - last[1]) < 1e-6 &&
			Math.abs(first[2] - last[2]) < 1e-6
		const m = makeTube(buildCurvePath(pts), 0.9, closed)
		return m ? [m] : []
	})

	const branchMeshes = $derived.by(() => {
		const meshes: Array<{ geometry: BufferGeometry; opacity: number }> = []
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

	const railNamePosition = $derived.by(() => {
		if (!showNames || resolved.points.length === 0) return null
		let minX = Infinity,
			maxX = -Infinity
		let maxY = -Infinity
		let minZ = Infinity
		for (const pt of resolved.points) {
			if (pt.p[0] < minX) minX = pt.p[0]
			if (pt.p[0] > maxX) maxX = pt.p[0]
			if (pt.p[1] > maxY) maxY = pt.p[1]
			if (pt.p[2] < minZ) minZ = pt.p[2]
		}
		for (const split of resolved.splits) {
			for (const branch of split.branches) {
				for (const pt of branch.points) {
					if (pt.p[0] < minX) minX = pt.p[0]
					if (pt.p[0] > maxX) maxX = pt.p[0]
					if (pt.p[1] > maxY) maxY = pt.p[1]
					if (pt.p[2] < minZ) minZ = pt.p[2]
				}
			}
		}
		const midX = (minX + maxX) / 2
		return new Vector3(midX, maxY + 0.5, minZ)
	})

	const { camera } = useThrelte()
	let nameGroup = $state<Group | undefined>()
	const beatGroups = $state<(Group | undefined)[]>([])

	// Progressive rendering: batch text creation to avoid blocking
	let visibleBeats = $state<typeof beatPositions>([])
	let renderCancelled = false

	$effect(() => {
		// Reset when beatPositions or showBeats changes
		if (!showBeats || beatPositions.length === 0) {
			visibleBeats = []
			renderCancelled = true
			return
		}

		renderCancelled = false
		visibleBeats = []
		const batchSize = 1 // beats per frame
		let index = 0

		function renderBatch() {
			if (renderCancelled) return
			const end = Math.min(index + batchSize, beatPositions.length)
			visibleBeats = beatPositions.slice(0, end)
			index = end
			if (index < beatPositions.length) {
				requestAnimationFrame(renderBatch)
			}
		}

		requestAnimationFrame(renderBatch)

		return () => {
			renderCancelled = true
		}
	})

	// Defer rail name to next frame
	let showNameDeferred = $state(false)

	$effect(() => {
		if (!showNames || !railNamePosition) {
			showNameDeferred = false
			return
		}

		setTimeout(() => {
			showNameDeferred = true
		}, Math.random() * 250)
	})

	// Progressive instrument rendering
	let visibleInstruments = $state<typeof instruments>([])

	$effect(() => {
		visibleInstruments = []
		let index = 0
		const batchSize = 16 // instruments per frame

		function renderBatch() {
			if (index >= instruments.length) return

			const end = Math.min(index + batchSize, instruments.length)
			visibleInstruments = instruments.slice(0, end)
			index = end

			if (index < instruments.length) {
				setTimeout(() => requestAnimationFrame(renderBatch), 0)
			}
		}

		setTimeout(() => requestAnimationFrame(renderBatch), 0)
	})

	useTask(() => {
		if (!camera.current) return
		const rot = camera.current.quaternion
		if (nameGroup) nameGroup.quaternion.copy(rot)
		for (const group of beatGroups) {
			if (group) group.quaternion.copy(rot)
		}
	})
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
	{#each visibleBeats as bp, bpIndex (bpIndex)}
		{@const isDownbeat = bp.beat === resolved.beatOffset}
		<T.Group
			bind:ref={beatGroups[bpIndex]}
			position={[bp.position.x + 0.1, bp.position.y + (isDownbeat ? -0.25 : 0.05), bp.position.z]}
		>
			<Suspense>
				<T.Mesh>
					<Text3DGeometry
						text={bp.beat.toString()}
						size={isDownbeat ? 0.2 : 0.2}
						depth={0.01}
						bevelEnabled={false}
						{font}
					/>
					<T.MeshBasicMaterial {color} />
				</T.Mesh>
			</Suspense>
		</T.Group>
	{/each}
{/if}

{#if showNameDeferred && railNamePosition}
	<T.Group
		bind:ref={nameGroup}
		position={[railNamePosition.x, railNamePosition.y, railNamePosition.z]}
	>
		<Suspense>
			<Align>
				{#snippet children({ align })}
					<T.Mesh>
						<Text3DGeometry
							text={rail.id.toUpperCase()}
							size={0.26}
							depth={0.01}
							bevelEnabled={false}
							{font}
							oncreate={align}
						/>
						<T.MeshBasicMaterial {color} />
					</T.Mesh>
				{/snippet}
			</Align>
		</Suspense>
	</T.Group>
{/if}

{#each visibleInstruments as instrument, idx (idx)}
	<InstrumentView {color} size={0.5} {instrument} rail={resolved} {fxInstruments} {wireframe} />
{/each}
