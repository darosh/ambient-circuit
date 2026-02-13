<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { onDestroy, untrack } from 'svelte'
	import type { Marble } from '../lib/marble'
	import { Vector3, Euler, Matrix4, Color } from 'three/webgpu'
	import { makeMarbleMaterial } from '../lib/config'
	import { easeOutQuart } from '../lib/easing'
	import type { ResolvedRail } from '../lib/rail'
	import type { RailData } from '../lib/rail-data'
	import {
		createMarbleGeometry,
		BALL_RADIUS,
		BALL_WIDTH_SEGMENTS,
		BALL_HEIGHT_SEGMENTS,
		type MarbleType
	} from '../lib/video/marble-geometry'
	import { makeStandardMaterial } from '../lib/video/material-standard'
	import { Material } from 'three'

	// Animation constants
	const TANGENT_VERTICAL_THRESHOLD = 0.9
	const COIL_SPIN_SPEED = 2 // rotations per second

	type Props = {
		marble: Marble
		rail: ResolvedRail
		railData: RailData
		color: string
		wireframe?: boolean
		fxMarbles?: boolean
	}

	let {
		marble = $bindable(),
		rail,
		railData,
		color,
		wireframe = false,
		fxMarbles = true
	}: Props = $props()

	const effectiveColor = $derived(marble.runtime.color ?? color)
	const effectiveVisible = $derived(marble.runtime.visible ?? true)

	// Apply rail render transform to marble position
	const transformedPosition = $derived.by(() => {
		const basePos = new Vector3(marble.position.x, marble.position.y, marble.position.z)
		const matrix = railData.runtime?.renderMatrix as Matrix4 | undefined
		if (matrix) {
			basePos.applyMatrix4(matrix)
		}
		return basePos
	})

	const fx = makeMarbleMaterial(untrack(() => effectiveColor))
	const plainMaterial = $derived(
		!fxMarbles ? makeStandardMaterial(untrack(() => effectiveColor)) : null
	)

	$effect(() => {
		if (fx) {
			fx.emissiveColor.value = new Color(effectiveColor)
		}

		if (plainMaterial) {
			plainMaterial.color = new Color(effectiveColor)
		}
	})

	$effect(() => {
		if (fx) {
			fx.mat.wireframe = wireframe
		}

		if (plainMaterial) {
			plainMaterial.wireframe = wireframe
		}
	})

	const type = $derived(marble.runtime.type ?? marble.config.type ?? 'ball')
	const sides = $derived(marble.runtime.sides ?? marble.config.sides ?? 6)
	const rounds = $derived(marble.runtime.rounds ?? marble.config.rounds ?? 3)

	// Create memoized geometry based on type
	const geometry = $derived.by(() => {
		return createMarbleGeometry({
			type: type as MarbleType,
			sides,
			rounds
		})
	})

	const IMPACT_DURATION = 0.3
	let impactTime = $state(0)
	let spinAngle = $state(0)

	// Compute rotation to align normal with tangent
	const rotation = $derived.by((): [number, number, number] => {
		if (type === 'ball') return [0, 0, 0]

		const tangent = new Vector3(marble.tangent.x, marble.tangent.y, marble.tangent.z)

		// Compute up vector using Gram-Schmidt (same as InstrumentView)
		// Use world Y unless tangent is nearly vertical
		const ref =
			Math.abs(tangent.y) < TANGENT_VERTICAL_THRESHOLD ? new Vector3(0, 1, 0) : new Vector3(1, 0, 0)
		const up = ref
			.clone()
			.sub(tangent.clone().multiplyScalar(ref.dot(tangent)))
			.normalize()

		const right = new Vector3().crossVectors(up, tangent).normalize()
		const correctedUp = new Vector3().crossVectors(tangent, right).normalize()

		// Align normal with tangent
		const m = new Matrix4()
		m.makeBasis(right, correctedUp, tangent)

		// Apply base rotation offset (match instrument orientation)
		if (type === 'poly') {
			m.multiply(new Matrix4().makeRotationZ(-Math.PI / 2))
		}

		// Apply rail tilt
		const tiltRad = ((rail.tilt ?? 0) * Math.PI) / 180
		if (tiltRad !== 0) {
			m.multiply(new Matrix4().makeRotationZ(tiltRad))
		}

		// Apply continuous spin for coil type
		if (type === 'coil') {
			m.multiply(new Matrix4().makeRotationZ(spinAngle))
		}

		const euler = new Euler().setFromRotationMatrix(m)
		return [euler.x, euler.y, euler.z]
	})

	useTask((delta) => {
		if (marble.signal.intensity > 0) {
			impactTime = IMPACT_DURATION
			marble.signal.intensity = 0
		}

		if (impactTime > 0 && fx) {
			impactTime = Math.max(0, impactTime - delta)
			fx.impactIntensity.value = easeOutQuart(impactTime / IMPACT_DURATION)
		}

		// Continuous spinning for coil type
		if (type === 'coil') {
			spinAngle += delta * COIL_SPIN_SPEED * Math.PI * 2
		}
	})

	onDestroy(() => {
		if (fx) {
			fx.mat.dispose()
		}

		if (plainMaterial) {
			plainMaterial.dispose()
		}
	})
</script>

{#if effectiveVisible}
	{#if type === 'ball'}
		<T.Mesh
			position={[transformedPosition.x, transformedPosition.y, transformedPosition.z]}
			material={<Material>(fxMarbles ? fx.mat : plainMaterial)}
		>
			<T.SphereGeometry args={[BALL_RADIUS, BALL_WIDTH_SEGMENTS, BALL_HEIGHT_SEGMENTS]} />
		</T.Mesh>
	{:else if geometry}
		<T.Mesh
			position={[transformedPosition.x, transformedPosition.y, transformedPosition.z]}
			{rotation}
			{geometry}
			material={<Material>(fxMarbles ? fx.mat : plainMaterial)}
		/>
	{/if}
{/if}
