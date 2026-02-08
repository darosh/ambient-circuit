<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import type { Instrument } from '../lib/instrument'
	import type { ResolvedRail } from '../lib/rail'
	import { getBeatTransform, getPointsForPath } from '../lib/rail-geometry'
	import {
		MeshStandardMaterial,
		CurvePath,
		LineCurve3,
		QuadraticBezierCurve3,
		TubeGeometry,
		Vector3,
		Euler,
		Matrix4
	} from 'three'
	import { easeOutQuart } from '../lib/easing'
	import { makeInstrumentMaterial } from '../lib/config'

	type Props = {
		instrument: Instrument
		rail: ResolvedRail
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
		width = 0.06,
		cornerRadius = 0.075,
		wireframe = false,
		fxInstruments = true
	}: Props = $props()

	const fx = $derived(makeInstrumentMaterial(instrument.color))
	const plainMaterial = $derived(new MeshStandardMaterial({ color: instrument.color }))

	$effect(() => {
		fx.mat.wireframe = wireframe
		plainMaterial.wireframe = wireframe
	})

	// Get points for the instrument's path
	const points = $derived(getPointsForPath(rail, instrument.path))

	// Get position and tangent at instrument beat
	const transform = $derived(getBeatTransform(points, instrument.beat))

	// Create tube geometry following polygon path with optional rounded corners
	const geometry = $derived.by(() => {
		const n = instrument.sides
		const r = size / 2
		const cr = cornerRadius
		const path = new CurvePath<Vector3>()

		const verts: Vector3[] = []
		for (let i = 0; i < n; i++) {
			const angle = (i / n) * Math.PI * 2 - Math.PI / 2
			verts.push(new Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0))
		}

		for (let i = 0; i < n; i++) {
			const curr = verts[i]
			const next = verts[(i + 1) % n]
			const prev = verts[(i - 1 + n) % n]

			const inDir = new Vector3().subVectors(curr, prev).normalize()
			const outDir = new Vector3().subVectors(next, curr).normalize()

			const arcStart = curr.clone().addScaledVector(inDir, -cr)
			const arcEnd = curr.clone().addScaledVector(outDir, cr)
			const nextArcStart = next.clone().addScaledVector(outDir, -cr)

			if (cr > 0) {
				path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
			}
			path.add(new LineCurve3(arcEnd, nextArcStart))
		}

		return new TubeGeometry(
			path as unknown as import('three').Curve<Vector3>,
			n * 21,
			width / 2,
			8,
			true
		)
	})

	const IMPACT_DURATION = 0.4 // seconds

	let spinAngle = $state(0)
	let impactTime = 0
	let impactBaseAngle = 0

	// Compute rotation to align normal with tangent, then spin around tangent axis
	const rotation = $derived.by((): [number, number, number] => {
		if (!transform) return [0, 0, 0]

		const tangent = transform.tangent
		const up = new Vector3(0, 1, 0)

		if (Math.abs(tangent.dot(up)) > 0.99) {
			up.set(0, 0, 1)
		}

		const right = new Vector3().crossVectors(up, tangent).normalize()
		const correctedUp = new Vector3().crossVectors(tangent, right).normalize()

		// Align normal with tangent, then spin around tangent (local Z)
		const m = new Matrix4()
		m.makeBasis(right, correctedUp, tangent)
		m.multiply(new Matrix4().makeRotationZ(spinAngle))

		const euler = new Euler().setFromRotationMatrix(m)
		return [euler.x, euler.y, euler.z]
	})

	useTask((delta) => {
		if (instrument.signal && instrument.signal.intensity > 0) {
			impactBaseAngle = spinAngle
			impactTime = IMPACT_DURATION
			instrument.signal.intensity = 0
		}

		if (impactTime > 0) {
			impactTime = Math.max(0, impactTime - delta)
			fx.impactIntensity.value = easeOutQuart(impactTime / IMPACT_DURATION)
			spinAngle = impactBaseAngle + easeOutQuart(1 - impactTime / IMPACT_DURATION) * Math.PI * 2
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
