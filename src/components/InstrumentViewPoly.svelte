<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import type { Instrument } from '../lib/instrument'
	import type { ResolvedRail } from '../lib/rail'
	import { getBeatTransform, getPointsForPath } from '../lib/rail-geometry'
	import {
		MeshStandardMaterial,
		Shape,
		Path,
		ExtrudeGeometry,
		Vector3,
		Euler,
		Matrix4
	} from 'three/webgpu'
	import { easeOutQuart } from '../lib/easing'
	import { makeInstrumentMaterial } from '../lib/config'

	type Props = {
		instrument: Instrument
		rail: ResolvedRail
		size?: number
		depth?: number
		fxInstruments?: boolean
	}

	let { instrument, rail, size = 1, depth = 0.07, fxInstruments = true }: Props = $props()

	const fx = $derived(makeInstrumentMaterial(instrument.color))
	const plainMaterial = $derived(new MeshStandardMaterial({ color: instrument.color }))

	// Get points for the instrument's path
	const points = $derived(getPointsForPath(rail, instrument.path))

	// Get position and tangent at instrument beat
	const transform = $derived(getBeatTransform(points, instrument.beat))

	// Create extruded polygon ring geometry (hollow — glowing edges only)
	const geometry = $derived.by(() => {
		const s = new Shape()
		const n = instrument.sides
		const radius = size / 2
		const innerRadius = radius * 0.72

		for (let i = 0; i <= n; i++) {
			const angle = (i / n) * Math.PI * 2 - Math.PI / 2
			const x = Math.cos(angle) * radius
			const y = Math.sin(angle) * radius
			if (i === 0) s.moveTo(x, y)
			else s.lineTo(x, y)
		}

		const hole = new Path()
		for (let i = 0; i <= n; i++) {
			const angle = (i / n) * Math.PI * 2 - Math.PI / 2
			const x = Math.cos(angle) * innerRadius
			const y = Math.sin(angle) * innerRadius
			if (i === 0) hole.moveTo(x, y)
			else hole.lineTo(x, y)
		}
		s.holes.push(hole)

		const geom = new ExtrudeGeometry(s, {
			depth: depth,
			bevelEnabled: false
		})

		// Center along extrusion axis (Z)
		geom.translate(0, 0, -depth / 2)

		return geom
	})

	// Compute rotation to align normal with tangent
	const rotation = $derived.by((): [number, number, number] => {
		if (!transform) return [0, 0, 0]

		const tangent = transform.tangent
		const up = new Vector3(0, 1, 0)

		// If tangent is parallel to up, use different reference
		if (Math.abs(tangent.dot(up)) > 0.99) {
			up.set(0, 0, 1)
		}

		const right = new Vector3().crossVectors(up, tangent).normalize()
		const correctedUp = new Vector3().crossVectors(tangent, right).normalize()

		// Build rotation matrix: tangent = forward (Z), correctedUp = up (Y), right = right (X)
		const m = new Matrix4()
		m.makeBasis(right, correctedUp, tangent)

		const euler = new Euler().setFromRotationMatrix(m)
		return [euler.x, euler.y, euler.z]
	})

	const IMPACT_DURATION = 0.2 // seconds
	let impactTime = 0

	// Animate impact uniform over fixed duration using easing
	useTask((delta) => {
		if (instrument.signal && instrument.signal.intensity > 0) {
			impactTime = IMPACT_DURATION
			instrument.signal.intensity = 0
		}
		if (impactTime > 0) {
			impactTime = Math.max(0, impactTime - delta)
			fx.impactIntensity.value = easeOutQuart(impactTime / IMPACT_DURATION)
		}
	})
</script>

{#if transform}
	<T.Mesh
		position={[transform.position.x, transform.position.y, transform.position.z]}
		{rotation}
		{geometry}
		material={fxInstruments ? fx.mat : plainMaterial}
	/>
{/if}
