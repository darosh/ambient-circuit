<script lang="ts">
	import { T, useThrelte, useTask } from '@threlte/core'
	import type { RailConfig, RailRuntime } from '../lib/core/rail-config'
	import { toRailShapeConfig } from '../lib/core/rail-config'
	import type { SceneCtx } from '../lib/core/scene-ctx'
	import type { TempoState } from '../lib/core/tempo'
	import { resolveRail } from '../lib/core/rail-resolve'
	import { computeBeatPositions } from '../lib/core/rail-curve'
	import {
		DoubleSide,
		Euler,
		Group,
		Matrix4,
		MeshBasicNodeMaterial,
		Quaternion,
		Shape,
		ShapeGeometry,
		Vector3
	} from 'three/webgpu'
	import InstrumentView from './InstrumentView.svelte'
	import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'
	import TubeText from './TubeText.svelte'
	import { onDestroy } from 'svelte'
	import { railMaterial, wireframeMaterial } from '../lib/components/config'
	import {
		buildRailCurvePath,
		buildRailGeometry,
		computeRailNamePosition,
		disposeRailGeometry,
		scalePoints,
		scaleSplits
	} from '../lib/helpers/rail-geometry'
	import { Color, type Mesh } from 'three/webgpu'
	import { convertOklabToRgb, convertRgbToOklab, parseHex, type Rgb } from 'culori/fn'

	type Props = {
		railData: RailConfig
		railRuntime: RailRuntime
		width?: number
		showPoints?: boolean
		showBeats?: boolean
		showNames?: boolean
		wireframe?: boolean
		font?: Font
		tempo?: TempoState
		sceneCtx?: SceneCtx
		renderPlayOnly?: boolean
		visible?: boolean
		renderVersion?: number // bindable
		id: string
		railIdx?: number
		selectedInstrumentIdx?: number | null
		onSelectInstrument?: (railIdx: number, idx: number) => void
		textOrientation?: [number, number, number]
		name: string
	}

	let {
		railData,
		railRuntime = $bindable(),
		width = 0.1,
		showPoints = false,
		showBeats = false,
		showNames = false,
		wireframe = false,
		tempo,
		sceneCtx,
		renderPlayOnly = false,
		visible = true,
		renderVersion = $bindable(0),
		id,
		railIdx = 0,
		selectedInstrumentIdx = null,
		onSelectInstrument,
		textOrientation,
		name = 'rail'
	}: Props = $props()

	const BEAT_TEXT_WIDTH = 2
	const BEAT_TEXT_SIZE = 0.2
	const RAIL_TEXT_WIDTH = 4
	const RAIL_TEXT_SIZE = 0.2

	const color = $derived(railRuntime.color ?? railData.color)
	const instruments = $derived(railData.instruments ?? [])
	const render = $derived(railData.render)

	function isScaled(v: Vector3) {
		// Return true if scale is meaningful (NOT near identity)
		return !(v.x < 1.001 && v.x > 0.999 && v.y < 1.001 && v.y > 0.999 && v.z < 1.001 && v.z > 0.999)
	}

	const resolved = $derived(resolveRail(toRailShapeConfig(railData)))

	const ud = {
		color: new Color(),
		initialIntensity: 0.7,
		intensity: 0,
		active: 1,
		uvFreq: 0.1
	}

	$effect(() => {
		ud.color.set(color)
	})

	const effectiveActive = $derived(railRuntime.active ?? true)

	$effect(() => {
		ud.active = effectiveActive ? 1 : 0
	})

	let meshRefs = $state<(Mesh | undefined)[]>([])

	$effect(() => {
		for (const mesh of meshRefs) {
			if (mesh) mesh.userData.material = ud
		}
	})

	// Runtime render transform (pre-allocated, filled in-place by render fn)
	const _renderOut = new Matrix4()
	let _renderVersion = $state(0)

	// Pre-fill before first render so group doesn't flash at identity transform
	$effect.pre(() => {
		if (_renderVersion > 0 || !render || !tempo || !sceneCtx) return
		render(_renderOut, sceneCtx, tempo.currentBeat, tempo, 0)
		railRuntime.renderMatrix = _renderOut
		railRuntime.renderVersion = 1
		_renderVersion = 1
		renderVersion = 1
	})

	// Extract position/rotation for group, scale for geometry
	const renderTransform = $derived.by(() => {
		if (!(render && (!renderPlayOnly || tempo?.isPlaying))) return null

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		_renderVersion // establish reactivity dependency

		_renderOut.decompose(_rtPos, _rtQuat, _rtScale)
		_rtRot.setFromQuaternion(_rtQuat)

		const scale = isScaled(_rtScale) ? _rtScale : null

		return {
			position: _rtPos.toArray() as [number, number, number],
			rotation: [_rtRot.x, _rtRot.y, _rtRot.z] as [number, number, number],
			scale,
			quaternion: _rtQuat
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

	const allMeshes = $derived(buildRailGeometry(displayPoints, displaySplits, width, name))

	// Dispose geometries when meshes change
	$effect(() => {
		const current = allMeshes
		return () => {
			for (const mesh of current) {
				mesh.geometry.dispose()
			}
		}
	})

	const fillGeometry = $derived.by(() => {
		if (!railData.fill) return null
		const path = buildRailCurvePath(displayPoints)
		if (!path) return null
		const pts = path.getSpacedPoints(64)

		// Centroid
		const centroid = new Vector3()
		for (const p of pts) centroid.add(p)
		centroid.divideScalar(pts.length)

		// Newell's method: compute plane normal from polygon winding
		const normal = new Vector3()
		for (let i = 0; i < pts.length; i++) {
			const cur = pts[i]
			const nxt = pts[(i + 1) % pts.length]
			normal.x += (cur.y - nxt.y) * (cur.z + nxt.z)
			normal.y += (cur.z - nxt.z) * (cur.x + nxt.x)
			normal.z += (cur.x - nxt.x) * (cur.y + nxt.y)
		}
		normal.normalize()

		// Local 2D frame: pick reference vector to avoid degeneracy with normal
		const worldRef = Math.abs(normal.y) < 0.99 ? new Vector3(0, 1, 0) : new Vector3(1, 0, 0)
		const right = new Vector3().crossVectors(worldRef, normal).normalize()
		const up = new Vector3().crossVectors(normal, right) // right-handed: normal × right

		// Project onto local frame
		const shape = new Shape()
		for (const [i, pt] of pts.entries()) {
			const rel = pt.clone().sub(centroid)
			const x = rel.dot(right)
			const y = rel.dot(up)
			if (i === 0) shape.moveTo(x, y)
			else shape.lineTo(x, y)
		}
		shape.closePath()

		const geo = new ShapeGeometry(shape)
		// makeBasis maps shape X→right, shape Y→up, shape Z→normal (correct full-frame rotation)
		geo.applyMatrix4(new Matrix4().makeBasis(right, up, normal))
		geo.translate(centroid.x, centroid.y, centroid.z)
		return geo
	})

	$effect(() => {
		const geo = fillGeometry
		return () => {
			geo?.dispose()
		}
	})

	const fillMat = new MeshBasicNodeMaterial({
		transparent: true,
		opacity: 0.25,
		side: DoubleSide,
		depthWrite: false
	})
	$effect(() => {
		// const bc = bright(color)
		fillMat.color.set(color)
	})

	// Unified group transform (identity when no renderTransform)
	const _rtPos = new Vector3()
	const _rtRot = new Euler()
	const _rtScale = new Vector3()
	const _rtQuat = new Quaternion()
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
	let nameGroup = $state.raw<Group | undefined>()
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
			railRuntime.renderMatrix = _renderOut //.clone()
			railRuntime.renderVersion = _renderVersion
			renderVersion = _renderVersion // sync to $state in Scene.svelte
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
		disposeRailGeometry(allMeshes)
		fillMat.dispose()
	})

	const _color = new Color()

	function bright(base: string = '#ffffff') {
		_color.set(base)
		const rgb = <Rgb>parseHex(_color.getHexString())
		const oklab = convertRgbToOklab(rgb)
		oklab.l = 0.5
		const backRgb = convertOklabToRgb(oklab)
		const l = Math.max(backRgb.r * 2, backRgb.g, backRgb.b)
		const m = l * 10
		return new Color(backRgb.r * m, backRgb.g * m, backRgb.b * m)
	}
</script>

{#if visible && showBeats}
	{#each visibleBeats as bp, bpIndex (bpIndex)}
		<T.Group bind:ref={beatGroups[bpIndex]} position={beatLabelPositions[bpIndex]}>
			<TubeText
				align
				fx={!wireframe}
				{id}
				text={bp.beat.toString()}
				{color}
				active={effectiveActive}
				spacing={1}
				size={BEAT_TEXT_SIZE}
				width={BEAT_TEXT_WIDTH}
			/>
		</T.Group>
	{/each}
{/if}

{#if visible && showNameDeferred && nameLabelPosition}
	<T.Group bind:ref={nameGroup} position={nameLabelPosition}>
		<TubeText
			align
			fx={!wireframe}
			{id}
			text={railData.id.toUpperCase()}
			{color}
			active={effectiveActive}
			size={RAIL_TEXT_SIZE}
			width={RAIL_TEXT_WIDTH}
			spacing={2}
		/>
	</T.Group>
{/if}

<T.Group position={groupPosition} rotation={groupRotation} {visible}>
	{#if fillGeometry}
		<T.Mesh geometry={fillGeometry} material={wireframe ? wireframeMaterial : fillMat} />
	{/if}

	{#each allMeshes as { geometry }, idx (idx)}
		<T.Mesh
			bind:ref={meshRefs[idx]}
			{geometry}
			material={wireframe ? wireframeMaterial : railMaterial.mat}
		/>
	{/each}

	{#if showPoints}
		{#each displayPoints as pt, ptIndex (ptIndex)}
			<T.Mesh position={[pt.p[0], pt.p[1], pt.p[2]]}>
				<T.SphereGeometry args={[0.06, 8, 8]} />
				<T.MeshBasicMaterial color={bright(color)} />
			</T.Mesh>
		{/each}
		{#each displaySplits as split, splitIndex (splitIndex)}
			{#each split.branches as branch, branchIndex (branchIndex)}
				{#each branch.points as pt, ptIndex (ptIndex)}
					<T.Mesh position={[pt.p[0], pt.p[1], pt.p[2]]}>
						<T.SphereGeometry args={[0.06, 8, 8]} />
						<T.MeshBasicMaterial {color} />
					</T.Mesh>
				{/each}
			{/each}
		{/each}
	{/if}

	{#each visibleInstruments as instrument, idx (idx)}
		<InstrumentView
			name={`${name}-instrument-${idx}`}
			{color}
			size={0.5}
			{instrument}
			{railRuntime}
			rail={displayRail}
			bind:signal={instrument.signal}
			{wireframe}
			selected={selectedInstrumentIdx === idx}
			onselect={() => onSelectInstrument?.(railIdx, idx)}
		/>
	{/each}
</T.Group>
