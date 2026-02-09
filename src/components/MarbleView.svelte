<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import type { Marble } from '../lib/marble'
	import {
		MeshStandardMaterial,
		CurvePath,
		LineCurve3,
		QuadraticBezierCurve3,
		TubeGeometry,
		Vector3,
		Euler,
		Matrix4
	} from 'three/webgpu'
	import { makeMarbleMaterial } from '../lib/config'
	import { easeOutQuart } from '../lib/easing'
	import { buildTubeGeometry } from '../lib/tube-geometry'

	type Props = {
		marble: Marble
		color: string
		wireframe?: boolean
		fxMarbles?: boolean
	}

	let { marble = $bindable(), color, wireframe = false, fxMarbles = true }: Props = $props()

	const fx = $derived(makeMarbleMaterial(color))
	const plainMaterial = $derived(new MeshStandardMaterial({ color }))

	$effect(() => {
		fx.mat.wireframe = wireframe
		plainMaterial.wireframe = wireframe
	})

	const type = $derived(marble.config.type || 'ball')
	const sides = $derived(marble.config.sides || 6)
	const rounds = $derived(marble.config.rounds || 3)

	// Create geometry based on type
	const geometry = $derived.by(() => {
		if (type === 'ball') {
			return null // use declarative geometry in template
		}

		const width = 0.06
		const size = 0.2
		const cr = 0.02

		if (type === 'poly') {
			const n = sides
			const r = size / (1 + Math.cos(Math.PI / n))
			const curves: import('three').Curve<Vector3>[] = []
			const verts: Vector3[] = []

			for (let i = 0; i < n; i++) {
				const angle = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n
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
					curves.push(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
				}
				curves.push(new LineCurve3(arcEnd, nextArcStart))
			}

			return buildTubeGeometry(curves, width / 2, 8, 12, true)
		} else if (type === 'coil') {
			const path = new CurvePath<Vector3>()
			const r = size / 2
			const length = width * 3 * rounds

			for (let i = 0; i < rounds * 16; i++) {
				const t = i / (rounds * 16)
				const angle = t * rounds * Math.PI * 2
				const z = t * length - length / 2

				const curr = new Vector3(Math.cos(angle) * r, Math.sin(angle) * r, z)
				const nextT = (i + 1) / (rounds * 16)
				const nextAngle = nextT * rounds * Math.PI * 2
				const nextZ = nextT * length - length / 2
				const next = new Vector3(Math.cos(nextAngle) * r, Math.sin(nextAngle) * r, nextZ)

				path.add(new LineCurve3(curr, next))
			}

			return new TubeGeometry(
				path as unknown as import('three').Curve<Vector3>,
				rounds * 16,
				width / 2,
				8,
				false
			)
		}

		return null
	})

	const IMPACT_DURATION = 0.3
	let impactTime = $state(0)
	let spinAngle = $state(0)

	// Compute rotation to align normal with tangent
	const rotation = $derived.by((): [number, number, number] => {
		if (type === 'ball') return [0, 0, 0]

		const tangent = new Vector3(marble.tangent.x, marble.tangent.y, marble.tangent.z)
		const up = new Vector3(marble.up.x, marble.up.y, marble.up.z)

		const right = new Vector3().crossVectors(up, tangent).normalize()
		const correctedUp = new Vector3().crossVectors(tangent, right).normalize()

		// Align normal with tangent, then spin around tangent (local Z)
		const m = new Matrix4()
		m.makeBasis(right, correctedUp, tangent)

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

		if (impactTime > 0) {
			impactTime = Math.max(0, impactTime - delta)
			fx.impactIntensity.value = easeOutQuart(impactTime / IMPACT_DURATION)
		}

		// Continuous spinning for coil type
		if (type === 'coil') {
			const spinSpeed = 2 // rotations per second
			spinAngle += delta * spinSpeed * Math.PI * 2
		}
	})
</script>

{#if type === 'ball'}
	<T.Mesh
		position={[marble.position.x, marble.position.y, marble.position.z]}
		material={fxMarbles ? fx.mat : plainMaterial}
	>
		<T.SphereGeometry args={[0.12, 16, 16]} />
	</T.Mesh>
{:else if geometry}
	<T.Mesh
		position={[marble.position.x, marble.position.y, marble.position.z]}
		{rotation}
		{geometry}
		material={fxMarbles ? fx.mat : plainMaterial}
	/>
{/if}
