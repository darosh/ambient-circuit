<script lang="ts">
	import { uniform, time, vec3, sin, positionLocal, positionWorld } from 'three/tsl'
	import { PointsNodeMaterial, AdditiveBlending, Points } from 'three/webgpu'
	import { BufferGeometry, BufferAttribute, Vector3, Spherical } from 'three/webgpu'
	import { T } from '@threlte/core'
	import type { Props } from '@threlte/core'
	import { untrack, onDestroy } from 'svelte'

	export type StarsProps = Props<Points> & {
		radius?: number
		depth?: number
		count?: number
		speed?: number
	}

	let { count = 5000, radius = 100, depth = 500, speed = 1 }: StarsProps = $props()

	const geometry = new BufferGeometry()
	const positions = new BufferAttribute(new Float32Array(untrack(() => count * 3)), 3)

	$effect.pre(() => {
		geometry.setAttribute('position', positions)
	})

	$effect.pre(() => {
		const increment = depth / count
		let r = radius + depth

		const vec = new Vector3()
		const sph = new Spherical()

		for (let i = 0; i < count; i++) {
			r -= increment * Math.random()
			vec.setFromSpherical(
				sph.set(r, Math.acos(1 - Math.random() * 2), Math.random() * Math.PI * 2)
			)
			positions.setXYZ(i, vec.x, vec.y, vec.z)
		}

		geometry.attributes.position.needsUpdate = true
	})

	const uniforms = {
		speed: uniform(untrack(() => speed))
	}

	const tslMaterial = new PointsNodeMaterial({
		colorNode: vec3(1)
			.mul(
				sin(positionWorld.x)
					.add(1)
					.mul(positionWorld.length().oneMinus())
					.oneMinus()
					.div(untrack(() => radius / 3))
			)
			.mul(
				sin(time.add(positionWorld.length().mul(positionLocal.length())).mul(uniforms.speed))
					.mul(0.5)
					.add(0.5)
			)
			// make farther stars slightly smaller / dimmer
			.mul(positionWorld.length().mul(0.001).oneMinus()),
		transparent: false,
		blending: AdditiveBlending,
		depthWrite: false,
		vertexColors: false
	})

	onDestroy(() => {
		geometry.dispose()
		tslMaterial.dispose()
	})
</script>

<T.Points args={[geometry, tslMaterial]}></T.Points>
