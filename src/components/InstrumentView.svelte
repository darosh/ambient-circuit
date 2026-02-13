<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import type { Instrument } from '../lib/instrument'
	import type { ResolvedRail } from '../lib/rail'
	import { getBeatTransform, getPointsForPath } from '../lib/rail-curve'
	import { Vector3, Euler, Matrix4, Color } from 'three/webgpu'
	import { easeOutQuart, easeInBounce } from '../lib/easing'
	import { makeInstrumentMaterial } from '../lib/config'
	import { createStandardMaterial } from '../lib/video/material-standard'
	import {
		createInstrumentGeometry,
		createInstrumentFillGeometry,
		type InstrumentType
	} from '../lib/video/instrument-geometry'

	type Props = {
		instrument: Instrument
		rail: ResolvedRail
		color: string
		signal?: { intensity: number }
		size?: number
		width?: number
		cornerRadius?: number
		wireframe?: boolean
		fxInstruments?: boolean
	}

	let {
		instrument,
		rail,
		size = 1,
		color,
		signal = $bindable(),
		width = 0.06,
		cornerRadius = 0.075,
		wireframe = false,
		fxInstruments = true
	}: Props = $props()

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

	const fx = makeInstrumentMaterial(effectiveColor, effectiveType !== 'heart')
	const plainMaterial = $derived(createStandardMaterial(effectiveColor))
	const effectiveVisible = $derived(instrument.runtime?.visible ?? true)

	$effect(() => {
		fx.emissiveColor.value = new Color(effectiveColor)
	})

	$effect(() => {
		fx.mat.wireframe = wireframe
		plainMaterial.wireframe = wireframe
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

	let spinAngle = $state(0)
	let impactTime = 0
	let impactBaseAngle = 0
	let activeRotation = $state(0)
	let impactBoostSpeed = $state(0)
	let bounceOffset = $state(0)

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

		const tangent = transform.tangent

		// Compute proper up vector perpendicular to tangent (Gram-Schmidt)
		// Use world Y unless tangent is nearly vertical
		const ref = Math.abs(tangent.y) < 0.9 ? new Vector3(0, 1, 0) : new Vector3(1, 0, 0)
		// Project out component parallel to tangent
		const up = ref
			.clone()
			.sub(tangent.clone().multiplyScalar(ref.dot(tangent)))
			.normalize()

		const right = new Vector3().crossVectors(up, tangent).normalize()
		const correctedUp = new Vector3().crossVectors(tangent, right).normalize()

		// Align normal with tangent
		const m = new Matrix4()
		m.makeBasis(right, correctedUp, tangent)

		// Apply base rotation offset based on type
		const type = instrument.type || 'poly'
		if (type === 'poly' || type === 'star' || type === 'heart') {
			m.multiply(new Matrix4().makeRotationZ(-Math.PI / 2))
		} else if (type === 'cross' || type === 'whirl' || type === 'sun') {
			m.multiply(new Matrix4().makeRotationZ(Math.PI / 2))
		} else if (type === 'cone' || type === 'spiral') {
			m.multiply(new Matrix4().makeRotationZ(-Math.PI))
		}

		// Apply rail tilt (design element)
		const tiltRad = ((rail.tilt ?? 0) * Math.PI) / 180
		if (tiltRad !== 0) {
			m.multiply(new Matrix4().makeRotationZ(tiltRad))
		}

		// Apply active rotation (continuous for spiral/cone)
		if (activeRotationEnabled) {
			m.multiply(new Matrix4().makeRotationZ(activeRotation))
		}

		// Apply impact spin (for non-pulse types or when pulse is disabled)
		if (!pulseAnimationEnabled) {
			m.multiply(new Matrix4().makeRotationZ(spinAngle))
		}

		const euler = new Euler().setFromRotationMatrix(m)
		return [euler.x, euler.y, euler.z]
	})

	// Compute position with bounce offset for pulse animation
	const position = $derived.by((): [number, number, number] => {
		if (!transform) return [0, 0, 0]
		const base = transform.position.clone()

		if (pulseAnimationEnabled && bounceOffset > 0) {
			// Bounce along world Y axis (up)
			base.y += bounceOffset
		}

		return [base.x, base.y, base.z]
	})

	useTask((delta) => {
		if (signal && signal.intensity > 0) {
			impactBaseAngle = spinAngle
			impactTime = IMPACT_DURATION
			impactBoostSpeed = IMPACT_BOOST_SPEED
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
		if (pulseAnimationEnabled && impactTime > 0) {
			bounceOffset = BOUNCE_AMPLITUDE * easeInBounce(impactTime / IMPACT_DURATION)
		} else {
			bounceOffset = 0
		}

		if (impactTime > 0) {
			impactTime = Math.max(0, impactTime - delta)
			fx.impactIntensity.value = easeOutQuart(impactTime / IMPACT_DURATION)

			// Impact spin for non-pulse types
			if (!pulseAnimationEnabled) {
				spinAngle = impactBaseAngle + easeOutQuart(1 - impactTime / IMPACT_DURATION) * Math.PI * 2
			}
		}
	})
</script>

{#if transform && effectiveVisible}
	<T.Mesh {position} {rotation} {geometry} material={fxInstruments ? fx.mat : plainMaterial} />
	{#if innerGeometry}
		<T.Mesh
			{position}
			{rotation}
			geometry={innerGeometry}
			material={fxInstruments ? fx.mat : plainMaterial}
		/>
	{/if}
{/if}
