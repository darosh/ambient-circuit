<script lang="ts">
	import { T } from '@threlte/core'
	import type { Instrument } from '../lib/instrument'
	import type { ResolvedPoint } from '../lib/rail'
	import { getBeatTransform } from '../lib/rail-geometry'
	import { Shape, ShapeGeometry, Vector2, Quaternion, Vector3, Euler, Matrix4 } from 'three'

	type Props = {
		instrument: Instrument
		points: ResolvedPoint[]
		size?: number
	}

	let { instrument, points, size = 1 }: Props = $props()

	// Get position and tangent at instrument beat
	const transform = $derived(getBeatTransform(points, instrument.beat))

	// Create polygon shape
	const shape = $derived.by(() => {
		const s = new Shape()
		const n = instrument.sides
		const radius = size / 2

		for (let i = 0; i <= n; i++) {
			const angle = (i / n) * Math.PI * 2 - Math.PI / 2
			const x = Math.cos(angle) * radius
			const y = Math.sin(angle) * radius
			if (i === 0) {
				s.moveTo(x, y)
			} else {
				s.lineTo(x, y)
			}
		}

		return new ShapeGeometry(s)
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
</script>

{#if transform}
	<T.Mesh
		position={[transform.position.x, transform.position.y, transform.position.z]}
		rotation={rotation}
		geometry={shape}
	>
		<T.MeshStandardMaterial color={instrument.color} side={2} />
	</T.Mesh>
{/if}
