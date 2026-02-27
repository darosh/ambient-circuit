<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import type { Instrument } from '../lib/instrument'
	import type { ResolvedRail } from '../lib/rail'
	import { getBeatTransform, getPointsForPath } from '../lib/rail-curve'
	import { Vector3, Euler, Matrix4, Color } from 'three/webgpu'
	import { easeOutQuart, easeInBounce, easeOutBack } from '../lib/easing'
	import { makeInstrumentMaterial } from '../lib/config'
	import {
		createInstrumentGeometry,
		createInstrumentFillGeometry,
		type InstrumentType
	} from '../lib/video/instrument-geometry'
	import { onDestroy, untrack } from 'svelte'
	import { makeStandardMaterial } from '../lib/video/material-standard'
	import type { Material } from 'three/webgpu'

	// Constant rotation matrices for type-based offsets (computed once at module load)
	const _ROT_NEG_HALF_PI = new Matrix4().makeRotationZ(-Math.PI / 2)
	const _ROT_HALF_PI = new Matrix4().makeRotationZ(Math.PI / 2)
	const _ROT_NEG_PI = new Matrix4().makeRotationZ(-Math.PI)

	import type { RailData } from '../lib/rail-data'

	type Props = {
		instrument: Instrument
		rail: ResolvedRail
		railData?: RailData
		color: string
		signal?: { intensity: number }
		size?: number
		width?: number
		cornerRadius?: number
		wireframe?: boolean
		fxInstruments?: boolean
		selected?: boolean
		onselect?: () => void
	}

	let {
		instrument,
		rail,
		railData,
		size = 1,
		color,
		signal = $bindable(),
		width = 0.06,
		cornerRadius = 0.075,
		wireframe = false,
		fxInstruments = true,
		selected = false,
		onselect
	}: Props = $props()

	let hovered = $state(false)

	// Derived values for visual properties (runtime overrides config)
	const effectiveColor = $derived(instrument.runtime?.color ?? instrument.color ?? color)
	const effectiveType = $derived(instrument.runtime?.type ?? instrument.type ?? 'poly')
	/* eslint-disable @typescript-eslint/no-explicit-any */
	const effectiveSides = $derived(instrument.runtime?.sides ?? (instrument as any).sides)
	const effectiveRounds = $derived(instrument.runtime?.rounds ?? (instrument as any).rounds)
	const effectiveBrightness = $derived(
		instrument.runtime?.brightness ?? (instrument as any).brightness
	)
	const effectiveFill = $derived(instrument.runtime?.fill ?? (instrument as any).fill)
	const effectiveCounterCW = $derived(
		instrument.runtime?.counterCW ?? (instrument as any).counterCW
	)
	const effectiveAlign = $derived(instrument.runtime?.align ?? (instrument as any).align)
	const effectivePoint = $derived(instrument.runtime?.point ?? (instrument as any).point)
	const effectiveKind = $derived(instrument.runtime?.kind ?? (instrument as any).kind)
	const effectiveAngle = $derived(instrument.runtime?.angle ?? (instrument as any).angle)
	const effectiveRays = $derived(instrument.runtime?.rays ?? (instrument as any).rays)
	/* eslint-enable @typescript-eslint/no-explicit-any */

	const fxMaterial = makeInstrumentMaterial(
		untrack(() => effectiveColor),
		true
	)
	const plainMaterial = $derived(
		fxInstruments ? null : makeStandardMaterial(untrack(() => effectiveColor))
	)
	const effectiveVisible = $derived(instrument.runtime?.visible ?? true)
	const effectiveActive = $derived(
		(instrument.runtime?.active ?? instrument.active ?? true) && (railData?.runtime?.active ?? true)
	)
	const colorValue = new Color()

	$effect(() => {
		colorValue.set(effectiveColor)
	})

	$effect(() => {
		if (fxMaterial && !fxMaterial.emissiveColor.value.equals(colorValue)) {
			fxMaterial.emissiveColor.value = colorValue
		}

		if (plainMaterial && !plainMaterial.color.equals(colorValue)) {
			plainMaterial.color = colorValue
		}
	})

	$effect(() => {
		fxMaterial.mat.wireframe = wireframe

		if (plainMaterial) {
			plainMaterial.wireframe = wireframe
		}
	})

	$effect(() => {
		fxMaterial.activeUniform.value = effectiveActive ? 1 : 0
		if (plainMaterial) plainMaterial.opacity = effectiveActive ? 1 : 0.3
	})

	$effect(() => {
		fxMaterial.setUvMax(geometry?.userData?.uvMax ?? 0)
	})

	// Get points for the instrument's path
	const points = $derived(getPointsForPath(rail, instrument.path))

	// Get position and tangent at instrument beat
	const transform = $derived(getBeatTransform(points, instrument.beat))

	// Create memoized geometry based on instrument type
	const geometry = $derived.by(() => {
		return createInstrumentGeometry({
			type: effectiveType as InstrumentType,
			size,
			width,
			cornerRadius,
			sides: effectiveSides,
			rounds: effectiveRounds,
			counterCW: effectiveCounterCW,
			point: effectivePoint,
			align: effectiveAlign,
			kind: effectiveKind,
			angle: effectiveAngle,
			rays: effectiveRays,
			brightness: effectiveBrightness,
			fill: false
		})
	})

	// Inner geometry for fill mode (poly only)
	const innerGeometry = $derived.by(() => {
		if (!effectiveFill || effectiveType !== 'poly') return null
		return createInstrumentFillGeometry(effectiveSides ?? 3, size, width, cornerRadius)
	})

	// OLD GEOMETRY CODE - DELETE THIS BLOCK

	const IMPACT_DURATION = 0.4 // seconds
	const ACTIVE_ROTATION_SPEED = 1 // rotations per second
	const IMPACT_BOOST_SPEED = 3 // additional rotations/sec on impact
	const IMPACT_BOOST_DECAY = 0.6 // seconds to decay boost
	const BOUNCE_AMPLITUDE = 0.2 // units
	const SNAP_DURATION = 0.15 // seconds

	let spinAngle = $state(0)
	let impactTime = 0

	// Scratch objects for rotation — created once per instrument instance, reused every frame
	const _iRef = new Vector3(),
		_iUp = new Vector3(),
		_iRight = new Vector3()
	const _iCorrUp = new Vector3(),
		_iMat = new Matrix4(),
		_iTmpMat = new Matrix4()
	const _iEuler = new Euler()
	let impactBaseAngle = 0
	let activeRotation = $state(0)
	let impactBoostSpeed = $state(0)
	let bounceOffset = $state(0)
	let snapTime = $state(0)
	let snapStartAngle = 0
	let snapTargetAngle = 0

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const effectiveSpinning = $derived(instrument.runtime?.spinning ?? (instrument as any).spinning)
	/* eslint-enable @typescript-eslint/no-explicit-any */
	const activeRotationEnabled = $derived.by(() => {
		if (instrument.type === 'spiral') {
			return effectiveSpinning ?? true
		}
		if (instrument.type === 'cone') {
			return effectiveSpinning ?? true
		}
		return false
	})

	const pulseAnimationEnabled = $derived.by(() => {
		return instrument.type === 'heart' && (instrument.pulse ?? true)
	})

	// Compute rotation to align normal with tangent, then apply base rotation offsets and spin
	const rotation = $derived.by((): [number, number, number] => {
		if (!transform) return [0, 0, 0]

		const { x: tx, y: ty, z: tz } = transform.tangent

		// Gram-Schmidt: choose ref, project out tangent component
		if (Math.abs(ty) < 0.9) _iRef.set(0, 1, 0)
		else _iRef.set(1, 0, 0)
		const dot = _iRef.x * tx + _iRef.y * ty + _iRef.z * tz
		_iUp.set(_iRef.x - tx * dot, _iRef.y - ty * dot, _iRef.z - tz * dot).normalize()

		// Reuse _iRef as tangent copy for cross products
		_iRef.set(tx, ty, tz)
		_iRight.crossVectors(_iUp, _iRef).normalize()
		_iCorrUp.crossVectors(_iRef, _iRight).normalize()
		_iMat.makeBasis(_iRight, _iCorrUp, _iRef)

		// Apply type-based constant rotation
		const type = instrument.type || 'poly'
		switch (type) {
		case 'poly': 
		case 'star': 
		case 'heart': {
			_iMat.multiply(_ROT_NEG_HALF_PI)
		
		break;
		}
		case 'cross': 
		case 'whirl': 
		case 'sun': 
		case 'eater': {
			_iMat.multiply(_ROT_HALF_PI)
		
		break;
		}
		case 'cone': 
		case 'spiral': {
			_iMat.multiply(_ROT_NEG_PI)
		
		break;
		}
		// No default
		}

		const tiltRad = ((rail.tilt ?? 0) * Math.PI) / 180
		if (tiltRad !== 0) {
			_iTmpMat.makeRotationZ(tiltRad)
			_iMat.multiply(_iTmpMat)
		}

		if (activeRotationEnabled) {
			_iTmpMat.makeRotationZ(activeRotation)
			_iMat.multiply(_iTmpMat)
		}

		if (!pulseAnimationEnabled) {
			_iTmpMat.makeRotationZ(spinAngle)
			_iMat.multiply(_iTmpMat)
		}

		_iEuler.setFromRotationMatrix(_iMat)
		return [_iEuler.x, _iEuler.y, _iEuler.z]
	})

	// Compute position with bounce offset for pulse animation
	const position = $derived.by((): [number, number, number] => {
		if (!transform) return [0, 0, 0]
		const base = transform.position
		const y = pulseAnimationEnabled && bounceOffset > 0 ? base.y + bounceOffset : base.y
		return [base.x, y, base.z]
	})

	// Hover/select glow baseline
	const glowBaseline = $derived(selected ? 0.4 : hovered ? 0.2 : 0)

	useTask((delta) => {
		if (signal && signal.intensity > 0) {
			impactBaseAngle = spinAngle
			impactTime = IMPACT_DURATION
			impactBoostSpeed = IMPACT_BOOST_SPEED
			snapTime = 0 // Cancel snap
			signal.intensity = 0
		}

		// Active rotation for spiral/cone
		if (activeRotationEnabled) {
			activeRotation += delta * (ACTIVE_ROTATION_SPEED + impactBoostSpeed) * Math.PI * 2
		}

		// Decay impact boost
		if (impactBoostSpeed > 0) {
			impactBoostSpeed = Math.max(
				0,
				impactBoostSpeed - delta * (IMPACT_BOOST_SPEED / IMPACT_BOOST_DECAY)
			)
		}

		// Pulse animation for heart
		bounceOffset = pulseAnimationEnabled && impactTime > 0 ? BOUNCE_AMPLITUDE * easeInBounce(impactTime / IMPACT_DURATION) : 0;

		if (impactTime > 0) {
			impactTime = Math.max(0, impactTime - delta)
			fxMaterial.impactIntensity.value = easeOutQuart(impactTime / IMPACT_DURATION) + glowBaseline

			// Impact spin for non-pulse types
			if (!pulseAnimationEnabled) {
				spinAngle = impactBaseAngle + easeOutQuart(1 - impactTime / IMPACT_DURATION) * Math.PI * 2
			}
		}

		// Apply hover/select glow when no impact
		if (impactTime === 0) {
			fxMaterial.impactIntensity.value = glowBaseline
		}

		// Detect misalignment when impact completes and trigger snap
		if (impactTime === 0 && !activeRotationEnabled && !pulseAnimationEnabled && snapTime === 0) {
			const normalized = ((spinAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
			const alignmentError = Math.min(normalized, Math.PI * 2 - normalized)

			if (alignmentError > 0.01) {
				snapStartAngle = spinAngle
				snapTargetAngle = Math.round(spinAngle / (Math.PI * 2)) * Math.PI * 2
				snapTime = SNAP_DURATION
			}
		}

		// Animate snap
		if (snapTime > 0 && !activeRotationEnabled && !pulseAnimationEnabled) {
			snapTime = Math.max(0, snapTime - delta)
			const progress = 1 - snapTime / SNAP_DURATION
			const eased = easeOutBack(progress)
			spinAngle = snapStartAngle + (snapTargetAngle - snapStartAngle) * eased
		}
	})

	onDestroy(() => {
		geometry?.dispose()
		innerGeometry?.dispose()

		if (fxMaterial) {
			fxMaterial.mat.dispose()
		}

		if (plainMaterial) {
			plainMaterial.dispose()
		}
	})
</script>

{#if transform && effectiveVisible}
	<T.Mesh
		{position}
		{rotation}
		{geometry}
		material={<Material>(fxInstruments ? fxMaterial.mat : plainMaterial)}
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
	{#if innerGeometry}
		<T.Mesh
			{position}
			{rotation}
			geometry={innerGeometry}
			material={<Material>(fxInstruments ? fxMaterial.mat : plainMaterial)}
		/>
	{/if}
{/if}
