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
	import type { Material } from 'three/webgpu'

	// Animation constants
	const TANGENT_VERTICAL_THRESHOLD = 0.9
	const COIL_SPIN_SPEED = 2 // rotations per second

	// Scratch objects for rotation — created once per marble instance, reused every frame
	const _mRef = new Vector3(),
		_mUp = new Vector3(),
		_mRight = new Vector3()
	const _mCorrUp = new Vector3(),
		_mMat = new Matrix4(),
		_mTmpMat = new Matrix4()
	const _mEuler = new Euler()
	const _POLY_ROT = new Matrix4().makeRotationZ(-Math.PI / 2)

	type Props = {
		marble: Marble
		rail: ResolvedRail
		railData: RailData
		color: string
		wireframe?: boolean
		fxMarbles?: boolean
		selected?: boolean
		onselect?: () => void
	}

	let {
		marble = $bindable(),
		rail,
		railData,
		color,
		wireframe = false,
		fxMarbles = true,
		selected = false,
		onselect
	}: Props = $props()

	let hovered = $state(false)

	const effectiveColor = $derived(marble.runtime.color ?? color)
	const effectiveVisible = $derived(marble.runtime.visible ?? true)

	// Apply rail render transform to marble position
	const transformedPosition = $derived.by(() => {
		const basePos = new Vector3(marble.position.x, marble.position.y, marble.position.z)
		const matrix = railData.runtime?.renderVersion ? railData.runtime?.renderMatrix as Matrix4 | undefined : undefined
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
	const angle = $derived(marble.runtime.angle ?? marble.config.angle ?? 60)

	// Create memoized geometry based on type
	const geometry = $derived.by(() => {
		return createMarbleGeometry({
			type: type as MarbleType,
			sides,
			rounds,
			angle
		})
	})

	const IMPACT_DURATION = 0.3
	let impactTime = $state(0)
	let spinAngle = $state(0)

	// Compute rotation to align normal with tangent
	const rotation = $derived.by((): [number, number, number] => {
		if (type === 'ball') return [0, 0, 0]

		const tx = marble.tangent.x,
			ty = marble.tangent.y,
			tz = marble.tangent.z

		// Gram-Schmidt: choose ref, project out tangent component
		if (Math.abs(ty) < TANGENT_VERTICAL_THRESHOLD) _mRef.set(0, 1, 0)
		else _mRef.set(1, 0, 0)
		const dot = _mRef.x * tx + _mRef.y * ty + _mRef.z * tz
		_mUp.set(_mRef.x - tx * dot, _mRef.y - ty * dot, _mRef.z - tz * dot).normalize()

		// Reuse _mRef as tangent copy for cross products
		_mRef.set(tx, ty, tz)
		_mRight.crossVectors(_mUp, _mRef).normalize()
		_mCorrUp.crossVectors(_mRef, _mRight).normalize()
		_mMat.makeBasis(_mRight, _mCorrUp, _mRef)

		if (type === 'poly') _mMat.multiply(_POLY_ROT)

		const tiltRad = ((rail.tilt ?? 0) * Math.PI) / 180
		if (tiltRad !== 0) {
			_mTmpMat.makeRotationZ(tiltRad)
			_mMat.multiply(_mTmpMat)
		}

		if (type === 'coil') {
			_mTmpMat.makeRotationZ(spinAngle)
			_mMat.multiply(_mTmpMat)
		}

		_mEuler.setFromRotationMatrix(_mMat)
		return [_mEuler.x, _mEuler.y, _mEuler.z]
	})

	const glowBaseline = $derived(selected ? 0.4 : hovered ? 0.2 : 0)

	useTask((delta) => {
		if (marble.signal.intensity > 0) {
			impactTime = IMPACT_DURATION
			marble.signal.intensity = 0
		}

		if (impactTime > 0 && fx) {
			impactTime = Math.max(0, impactTime - delta)
			fx.impactIntensity.value = easeOutQuart(impactTime / IMPACT_DURATION) + glowBaseline
		} else if (fx) {
			fx.impactIntensity.value = glowBaseline
		}

		// Continuous spinning for coil type
		if (type === 'coil') {
			spinAngle += delta * COIL_SPIN_SPEED * Math.PI * 2
		}
	})

	onDestroy(() => {
		geometry?.dispose()

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
			onclick={(e: Event) => {
				e.stopPropagation()
				onselect?.()
			}}
			onpointerenter={() => {
				hovered = true
			}}
			onpointerleave={() => {
				hovered = false
			}}
		>
			<T.SphereGeometry args={[BALL_RADIUS, BALL_WIDTH_SEGMENTS, BALL_HEIGHT_SEGMENTS]} />
		</T.Mesh>
	{:else if geometry}
		<T.Mesh
			position={[transformedPosition.x, transformedPosition.y, transformedPosition.z]}
			{rotation}
			{geometry}
			material={<Material>(fxMarbles ? fx.mat : plainMaterial)}
			onclick={(e: Event) => {
				e.stopPropagation()
				onselect?.()
			}}
			onpointerenter={() => {
				hovered = true
			}}
			onpointerleave={() => {
				hovered = false
			}}
		/>
	{/if}
{/if}
