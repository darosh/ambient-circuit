<script lang="ts">
	import { T, useThrelte, useTask } from '@threlte/core'
	import { Align } from '@threlte/extras'
	import type { ResolvedPoint } from '../lib/core/rail'
	import type { RailData } from '../lib/core/rail-data'
	import type { SceneCtx } from '../lib/core/scene-ctx'
	import type { TempoState } from '../lib/core/tempo'
	import { resolveRail } from '../lib/core/rail-resolve'
	import { buildSegmentCurve, computeBeatPositions, toV3 } from '../lib/core/rail-curve'
	import {
		type BufferGeometry,
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
	import { onDestroy } from 'svelte'
	import { makeStandardMaterial } from '../lib/video/material-standard'
	import { railMaterial } from '../lib/components/config'
	import { computeRailNamePosition, scalePoints, scaleSplits } from '../lib/helpers/rail-geometry'
	import { Color, type Mesh, type Material } from 'three/webgpu'

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
		visible?: boolean
		id: string
		railIdx?: number
		selectedInstrumentIdx?: number | null
		onSelectInstrument?: (railIdx: number, idx: number) => void
		textOrientation?: [number, number, number]
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
		visible = true,
		id,
		railIdx = 0,
		selectedInstrumentIdx = null,
		onSelectInstrument,
		textOrientation
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
	const plainMaterial = $derived(fxRails ? null : makeStandardMaterial(color))

	// Per-rail data written to shared material uniforms in onBeforeRender
	const ud = { color: new Color(), initialIntensity: 0.7, intensity: 0, active: 1 }

	$effect(() => {
		ud.color.set(color)
		if (plainMaterial) plainMaterial.color.set(color)
	})

	const effectiveActive = $derived(railData.runtime?.active ?? true)

	$effect(() => {
		ud.active = effectiveActive ? 1 : 0
		if (plainMaterial) plainMaterial.opacity = effectiveActive ? 1 : 0.3
	})

	let meshRefs = $state<(Mesh | undefined)[]>([])

	function setupRailMesh(mesh: Mesh) {
		mesh.onBeforeRender = () => {
			railMaterial.emissiveColor.value.copy(ud.color)
			railMaterial.initialIntensity.value = ud.initialIntensity
			railMaterial.impactIntensity.value = ud.intensity
			railMaterial.activeUniform.value = ud.active
			railMaterial.uvFreqUniform.value = 0.04
		}
	}

	$effect(() => {
		for (const mesh of meshRefs) {
			if (mesh) setupRailMesh(mesh)
		}
	})

	// Runtime render transform (pre-allocated, filled in-place by render fn)
	const _renderOut = new Matrix4()
	let _renderVersion = $state(0) // incremented each frame to trigger $derived

	// Extract position/rotation for group, scale for geometry
	const renderTransform = $derived.by(() => {
		if (!(render && (!renderPlayOnly || tempo?.isPlaying))) return null

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		_renderVersion // establish reactivity dependency

		const position = new Vector3()
		const rotation = new Euler()
		let scale: Vector3 | null = new Vector3()

		const quaternion = new Quaternion()
		_renderOut.decompose(position, quaternion, scale)
		rotation.setFromQuaternion(quaternion)

		if (!isScaled(scale)) {
			scale = null
		}

		return {
			position: position.toArray() as [number, number, number],
			rotation: [rotation.x, rotation.y, rotation.z] as [number, number, number],
			scale,
			quaternion
		}
	})

	// Apply scale to rail points for geometry (not instruments)
	const displayPoints = $derived(
		renderTransform?.scale ? scalePoints(resolved.points, renderTransform.scale) : resolved.points
	)

	const displaySplits = $derived(
		renderTransform?.scale ? scaleSplits(resolved.splits, renderTransform.scale) : resolved.splits
	)

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
		railMaterial.mat.wireframe = wireframe
		if (plainMaterial) plainMaterial.wireframe = wireframe
	})
	const beatPositions = $derived.by(() => {
		if (!showBeats) return []
		const result = computeBeatPositions(displayPoints)
		for (const s of displaySplits) {
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
			// uvScale: lower than default (1/2πr) → sparser UV → faster noise animation on long rails
			const uvScale = 0.15 / radius
			return {
				geometry: buildTubeGeometry(curvePath.curves, radius, 8, 12, closed, true, uvScale),
				opacity
			}
		} catch (error) {
			console.warn('Failed to create tube:', error)
			return null
		}
	}

	const mainMeshes = $derived.by(() => {
		const pts = displayPoints
		const first = pts[0]?.p
		const last = pts.at(-1)?.p
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

	// Unified group transform (identity when no renderTransform)
	const _identityQuat = new Quaternion()
	const _zeroTuple: [number, number, number] = [0, 0, 0]
	const _scratchVec = new Vector3()
	const _beatOffset = new Vector3()
	const groupPosition = $derived(renderTransform?.position ?? _zeroTuple)
	const groupRotation = $derived(renderTransform?.rotation ?? _zeroTuple)
	const groupQuaternion = $derived(renderTransform?.quaternion ?? _identityQuat)
	const displayRail = $derived(renderTransform ? displayResolved : resolved)

	const railNamePosition = $derived(
		showNames ? computeRailNamePosition(displayPoints, displaySplits) : null
	)

	const beatLabelPositions = $state<[number, number, number][]>([])

	$effect(() => {
		const vb = visibleBeats
		const gp = groupPosition

		for (const [i, bp] of vb.entries()) {
			const isDownbeat = bp.beat === resolved.beatOffset
			_scratchVec.copy(bp.position)
			_scratchVec.applyQuaternion(groupQuaternion)
			_scratchVec.x += gp[0] + 0.2
			_scratchVec.y += gp[1] + (isDownbeat ? -0.2 : 0.2)
			_scratchVec.z += gp[2]

			if (beatLabelPositions[i]) {
				beatLabelPositions[i][0] = _scratchVec.x
				beatLabelPositions[i][1] = _scratchVec.y
				beatLabelPositions[i][2] = _scratchVec.z
			} else {
				beatLabelPositions[i] = [_scratchVec.x, _scratchVec.y, _scratchVec.z]
			}
		}
	})

	const nameLabelPosition = $derived.by(() => {
		if (!railNamePosition) return null
		const gp = groupPosition
		_beatOffset.copy(railNamePosition)
		_beatOffset.applyQuaternion(groupQuaternion)
		_beatOffset.x += gp[0]
		_beatOffset.y += gp[1]
		_beatOffset.z += gp[2]
		return [_beatOffset.x, _beatOffset.y, _beatOffset.z] as [number, number, number]
	})

	const { camera } = useThrelte()
	let nameGroup = $state<Group | undefined>()
	const beatGroups = $state<(Group | undefined)[]>([])

	const _lookMat = new Matrix4()
	const _upVec = new Vector3(0, 1, 0)
	const _dirVec = new Vector3()
	const _fixedQuat = new Quaternion()

	// Progressive rendering: batch text creation to avoid blocking
	let visibleBeats = $state<typeof beatPositions>([])
	let renderCancelled = false

	$effect(() => {
		// Reset when beatPositions or showBeats changes
		if (!showBeats || beatPositions.length === 0) {
			renderCancelled = true

			if (visibleBeats?.length) {
				visibleBeats = []
			}

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

		// Used to be: setTimeout(() => {}, Math.random() * 250)
		showNameDeferred = true
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
		// Update render matrix (fills _renderOut in-place, no allocation)
		if (render && tempo && sceneCtx && (!renderPlayOnly || tempo.isPlaying)) {
			render(_renderOut, sceneCtx, tempo.currentBeat + tempo.beatProgress, tempo, delta)
			_renderVersion++

			// Clone for runtime so MarbleView's $derived detects the new reference
			if (railData.runtime) {
				railData.runtime.renderMatrix = _renderOut //.clone()
				railData.runtime.renderVersion = _renderVersion
			}
		}

		// Billboard text
		let rot: Quaternion
		if (textOrientation) {
			_dirVec.set(textOrientation[0], textOrientation[1], textOrientation[2])
			_lookMat.lookAt(_dirVec, new Vector3(0, 0, 0), _upVec)
			_fixedQuat.setFromRotationMatrix(_lookMat)
			rot = _fixedQuat
		} else {
			if (!camera.current) return
			rot = camera.current.quaternion
		}
		if (nameGroup) nameGroup.quaternion.copy(rot)
		for (const group of beatGroups) {
			if (group) group.quaternion.copy(rot)
		}
	})

	onDestroy(() => {
		for (const mesh of [...mainMeshes, ...branchMeshes]) {
			mesh.geometry.dispose()
		}
		plainMaterial?.dispose()
	})
</script>

{#if visible && showBeats}
	{#each visibleBeats as bp, bpIndex (bpIndex)}
		<T.Group bind:ref={beatGroups[bpIndex]} position={beatLabelPositions[bpIndex]}>
			<Align>
				<LineText
					fx={fxText}
					{id}
					text={bp.beat.toString()}
					{color}
					active={effectiveActive}
					spacing={1}
					size={BEAT_TEXT_SIZE}
					width={BEAT_TEXT_WIDTH}
				/>
			</Align>
		</T.Group>
	{/each}
{/if}

{#if visible && showNameDeferred && nameLabelPosition}
	<T.Group bind:ref={nameGroup} position={nameLabelPosition}>
		<Align>
			<LineText
				fx={fxText}
				{id}
				text={rail.id.toUpperCase()}
				{color}
				active={effectiveActive}
				size={RAIL_TEXT_SIZE}
				width={RAIL_TEXT_WIDTH}
				spacing={2}
			/>
		</Align>
	</T.Group>
{/if}

<T.Group position={groupPosition} rotation={groupRotation} {visible}>
	{#each allMeshes as { geometry }, idx (idx)}
		<T.Mesh
			bind:ref={meshRefs[idx]}
			{geometry}
			material={<Material>(fxRails ? railMaterial.mat : plainMaterial)}
		/>
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
			{railData}
			rail={displayRail}
			bind:signal={instrument.signal}
			{fxInstruments}
			{wireframe}
			selected={selectedInstrumentIdx === idx}
			onselect={() => onSelectInstrument?.(railIdx, idx)}
		/>
	{/each}
</T.Group>
