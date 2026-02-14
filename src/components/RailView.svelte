<script lang="ts">
	import { T, useThrelte, useTask } from '@threlte/core'
	import { Align } from '@threlte/extras'
	import type { ResolvedPoint } from '../lib/rail'
	import type { RailData } from '../lib/rail-data'
	import type { SceneCtx } from '../lib/scene-ctx'
	import type { TempoState } from '../lib/tempo'
	import { resolveRail } from '../lib/rail-resolve'
	import { buildSegmentCurve, computeBeatPositions, toV3 } from '../lib/rail-curve'
	import {
		type BufferGeometry,
		Color,
		CurvePath,
		Euler,
		Group,
		LineCurve3,
		Matrix4,
		Quaternion,
		Vector3
	} from 'three/webgpu'
	import InstrumentView from './InstrumentView.svelte'
	import { buildTubeGeometry } from '../lib/video/tube-geometry'
	import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'
	// import LineText from './LineText.svelte'
	import LineText from './TubeText.svelte'
	import { onDestroy, untrack } from 'svelte'
	import { makeStandardMaterial } from '../lib/video/material-standard'
	import { makeRailMaterial } from '../lib/config'
	import { Material } from 'three'

	type Props = {
		railData: RailData
		width?: number
		showPoints?: boolean
		showBeats?: boolean
		showNames?: boolean
		wireframe?: boolean
		fxRails?: boolean
		fxInstruments?: boolean
		fxText?: boolean
		font?: Font
		tempo?: TempoState
		sceneCtx?: SceneCtx
		renderPlayOnly?: boolean
		id: string
	}

	let {
		railData,
		width = 0.1,
		showPoints = false,
		showBeats = false,
		showNames = false,
		wireframe = false,
		fxRails = true,
		fxInstruments = true,
		fxText = true,
		tempo,
		sceneCtx,
		renderPlayOnly = false,
		id
	}: Props = $props()

	const BEAT_TEXT_WIDTH = 2
	const BEAT_TEXT_SIZE = 0.2
	const RAIL_TEXT_WIDTH = 4
	const RAIL_TEXT_SIZE = 0.2

	const rail = $derived(railData.rail)
	const color = $derived(railData.runtime?.color ?? railData.color)
	const instruments = $derived(railData.instruments ?? [])
	const render = $derived(railData.render)

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

	function isScaled(v: Vector3) {
		// Return true if scale is meaningful (NOT near identity)
		return !(v.x < 1.001 && v.x > 0.999 && v.y < 1.001 && v.y > 0.999 && v.z < 1.001 && v.z > 0.999)
	}

	const resolved = $derived(resolveRail(rail))
	// Create materials once, update uniforms on color change
	const fxMaterialObj = makeRailMaterial(
		untrack(() => color),
		0.7,
		true
	)
	const plainMaterial = $derived(!fxRails ? makeStandardMaterial(untrack(() => color)) : null)

	$effect(() => {
		fxMaterialObj.emissiveColor.value = new Color(color)

		if (plainMaterial) {
			plainMaterial.color = new Color(color)
		}
	})

	// Runtime render transform
	let renderMatrix = $state(new Matrix4())

	// Extract position/rotation for group, scale for geometry
	const renderTransform = $derived.by(() => {
		if (!(render && (!renderPlayOnly || tempo?.isPlaying))) return null

		const position = new Vector3()
		const rotation = new Euler()
		let scale: Vector3 | null = new Vector3()

		const quaternion = new Quaternion()
		renderMatrix.decompose(position, quaternion, scale)
		rotation.setFromQuaternion(quaternion)

		if (!isScaled(scale)) {
			scale = null
		}

		return {
			position: position.toArray(),
			rotation: [rotation.x, rotation.y, rotation.z] as [number, number, number],
			scale,
			quaternion
		}
	})

	// Apply scale to rail points for geometry (not instruments)
	const displayPoints = $derived.by(() => {
		if (!renderTransform?.scale) return resolved.points

		const { x, y, z } = renderTransform.scale

		return resolved.points.map((pt) => ({
			...pt,
			p: [pt.p[0] * x, pt.p[1] * y, pt.p[2] * z] as ResolvedPoint['p']
		}))
	})

	const displaySplits = $derived.by(() => {
		if (!renderTransform?.scale) return resolved.splits

		const { x, y, z } = renderTransform.scale
		return resolved.splits.map((split) => ({
			...split,
			p: [split.p[0] * x, split.p[1] * y, split.p[2] * z] as typeof split.p,
			branches: split.branches.map((branch) => ({
				...branch,
				points: branch.points.map((pt) => ({
					...pt,
					p: [pt.p[0] * x, pt.p[1] * y, pt.p[2] * z] as ResolvedPoint['p']
				}))
			}))
		}))
	})

	// Create display rail with scaled points for instrument positioning
	const displayResolved = $derived.by(() => {
		if (!renderTransform) return resolved

		return {
			...resolved,
			points: displayPoints,
			splits: displaySplits
		}
	})

	$effect(() => {
		fxMaterialObj.mat.wireframe = wireframe

		if (plainMaterial) {
			plainMaterial.wireframe = wireframe
		}
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
		const pts = displayPoints
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
		for (const s of displaySplits) {
			const splitIdx = displayPoints.findIndex((p) => p.beat === s.beat)
			const prev = splitIdx > 0 ? displayPoints[splitIdx - 1] : null
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

	// Dispose geometries when meshes change
	$effect(() => {
		const current = [...mainMeshes, ...branchMeshes]
		return () => {
			for (const mesh of current) {
				mesh.geometry.dispose()
			}
		}
	})

	const allMeshes = $derived([...mainMeshes, ...branchMeshes])

	const railNamePosition = $derived.by(() => {
		if (!showNames || displayPoints.length === 0) return null
		let minX = Infinity,
			maxX = -Infinity
		let maxY = -Infinity
		let minZ = Infinity
		for (const pt of displayPoints) {
			if (pt.p[0] < minX) minX = pt.p[0]
			if (pt.p[0] > maxX) maxX = pt.p[0]
			if (pt.p[1] > maxY) maxY = pt.p[1]
			if (pt.p[2] < minZ) minZ = pt.p[2]
		}
		for (const split of displaySplits) {
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
		return new Vector3(midX, maxY + 0.4, minZ - 0.3)
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

	useTask((delta) => {
		// Update render matrix
		if (render && tempo && sceneCtx && (!renderPlayOnly || tempo.isPlaying)) {
			renderMatrix = render(tempo.currentBeat + tempo.beatProgress, tempo, delta, sceneCtx)

			// Store in runtime for marble access
			if (railData.runtime) {
				railData.runtime.renderMatrix = renderMatrix
			}
		}

		// Billboard text to camera
		if (!camera.current) return
		const rot = camera.current.quaternion
		if (nameGroup) nameGroup.quaternion.copy(rot)
		for (const group of beatGroups) {
			if (group) group.quaternion.copy(rot)
		}
	})

	onDestroy(() => {
		const current = [...mainMeshes, ...branchMeshes]

		for (const mesh of current) {
			mesh.geometry.dispose()
		}

		if (fxMaterialObj) {
			fxMaterialObj.mat.dispose()
		}

		if (plainMaterial) {
			plainMaterial.dispose()
		}
	})
</script>

{#if renderTransform}
	{#if showBeats}
		{#each visibleBeats as bp, bpIndex (bpIndex)}
			{@const isDownbeat = bp.beat === resolved.beatOffset}
			<T.Group
				bind:ref={beatGroups[bpIndex]}
				position={bp.position
					.clone()
					.applyQuaternion(renderTransform.quaternion)
					.add(new Vector3(0.2, isDownbeat ? -0.2 : 0.2, 0))
					.toArray()}
			>
				<Align>
					<LineText
						fx={fxText}
						{id}
						text={bp.beat.toString()}
						{color}
						spacing={1}
						size={BEAT_TEXT_SIZE}
						width={BEAT_TEXT_WIDTH}
					/>
				</Align>
			</T.Group>
		{/each}
	{/if}

	{#if showNameDeferred && railNamePosition}
		<T.Group
			bind:ref={nameGroup}
			position={railNamePosition.clone().applyQuaternion(renderTransform.quaternion).toArray()}
		>
			<Align>
				<LineText
					fx={fxText}
					{id}
					text={rail.id.toUpperCase()}
					{color}
					size={RAIL_TEXT_SIZE}
					width={RAIL_TEXT_WIDTH}
					spacing={2}
				/>
			</Align>
		</T.Group>
	{/if}

	<T.Group position={renderTransform.position} rotation={renderTransform.rotation}>
		{#each allMeshes as { geometry }, idx (idx)}
			<T.Mesh {geometry} material={<Material>(fxRails ? fxMaterialObj.mat : plainMaterial)} />
		{/each}

		{#if showPoints}
			{#each displayPoints as pt, ptIndex (ptIndex)}
				<T.Mesh position={[pt.p[0], pt.p[1], pt.p[2]]}>
					<T.SphereGeometry args={[0.04, 8, 8]} />
					<T.MeshBasicMaterial color={pt.round ? '#ffffff' : color} />
				</T.Mesh>
			{/each}
			{#each displaySplits as split, splitIndex (splitIndex)}
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

		{#each visibleInstruments as instrument, idx (idx)}
			<InstrumentView
				{color}
				size={0.5}
				{instrument}
				rail={displayResolved}
				bind:signal={instrument.signal}
				{fxInstruments}
				{wireframe}
			/>
		{/each}
	</T.Group>
{:else}
	{#each allMeshes as { geometry }, idx (idx)}
		<T.Mesh {geometry} material={<Material>(fxRails ? fxMaterialObj.mat : plainMaterial)} />
	{/each}

	{#if showPoints}
		{#each displayPoints as pt, ptIndex (ptIndex)}
			<T.Mesh position={[pt.p[0], pt.p[1], pt.p[2]]}>
				<T.SphereGeometry args={[0.04, 8, 8]} />
				<T.MeshBasicMaterial color={pt.round ? '#ffffff' : color} />
			</T.Mesh>
		{/each}
		{#each displaySplits as split, splitIndex (splitIndex)}
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
				position={[bp.position.x + 0.2, bp.position.y + (isDownbeat ? -0.2 : 0.2), bp.position.z]}
			>
				<Align>
					<LineText
						fx={fxText}
						{id}
						text={bp.beat.toString()}
						{color}
						size={BEAT_TEXT_SIZE}
						spacing={1}
						width={BEAT_TEXT_WIDTH}
					/>
				</Align>
			</T.Group>
		{/each}
	{/if}

	{#if showNameDeferred && railNamePosition}
		<T.Group
			bind:ref={nameGroup}
			position={[railNamePosition.x, railNamePosition.y, railNamePosition.z]}
		>
			<Align>
				<LineText
					fx={fxText}
					{id}
					text={rail.id.toUpperCase()}
					{color}
					size={RAIL_TEXT_SIZE}
					width={RAIL_TEXT_WIDTH}
					spacing={2}
				/>
			</Align>
		</T.Group>
	{/if}

	{#each visibleInstruments as instrument, idx (idx)}
		<InstrumentView
			{color}
			size={0.5}
			{instrument}
			rail={resolved}
			bind:signal={instrument.signal}
			{fxInstruments}
			{wireframe}
		/>
	{/each}
{/if}
