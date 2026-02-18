<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { LineCurve3, Color, MeshStandardMaterial, Vector3 } from 'three/webgpu'
	import type { Vector3Tuple } from 'three'
	import { easeOutQuart } from '../lib/easing'

	type SignalLink = {
		from: Vector3Tuple
		to: Vector3Tuple
		signal: { intensity: number }
		color?: string
	}

	let { links }: { links: SignalLink[] } = $props()

	const DURATION = 0.5,
		BASE = 0.15,
		PEAK = 2.0,
		TUBE_R = 0.02

	const curves = $derived(
		links.map((l) => new LineCurve3(new Vector3(...l.from), new Vector3(...l.to)))
	)
	const materials = $derived(
		links.map(
			(l) =>
				new MeshStandardMaterial({
					color: 0x000000,
					emissive: new Color(l.color ?? '#ffffff'),
					emissiveIntensity: BASE
				})
		)
	)

	const animTimes = $state<number[]>([])
	$effect(() => {
		animTimes.length = links.length
		animTimes.fill(0)
	})

	useTask((delta) => {
		for (let i = 0; i < links.length; i++) {
			if (links[i].signal.intensity > 0) {
				animTimes[i] = DURATION
				links[i].signal.intensity = 0
			}
			if (animTimes[i] > 0) {
				animTimes[i] = Math.max(0, animTimes[i] - delta)
				materials[i].emissiveIntensity =
					BASE + easeOutQuart(animTimes[i] / DURATION) * (PEAK - BASE)
			}
		}
	})
</script>

{#each links as _, i (i)}
	<T.Mesh material={materials[i]}>
		<T.TubeGeometry args={[curves[i], 1, TUBE_R, 4, false]} />
	</T.Mesh>
{/each}
