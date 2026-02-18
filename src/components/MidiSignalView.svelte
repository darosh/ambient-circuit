<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { LineCurve3, Color, MeshStandardMaterial, Vector3 } from 'three/webgpu'
	import { CubicBezierCurve3, type Vector3Tuple } from 'three/webgpu'
	import { easeOutQuart } from '../lib/easing'

	const TUBE_SEGMENTS_STRAIGHT = 1
	const TUBE_SEGMENTS_CURVED = 32
	const CURVE_TANGENT = 0.5
	const NODE_LENGTH = 0.2
	const LINE_SHIFT = NODE_LENGTH / 2
	const INS_SHIFT = 0.3

	type SignalLink = {
		from: Vector3Tuple
		to: Vector3Tuple
		signal: { intensity: number }
		color?: string
	}

	let { links, curved = true }: { links: SignalLink[]; curved?: boolean } = $props()

	const DURATION = 0.5,
		BASE = 0.15,
		PEAK = 2.0,
		TUBE_R = 0.02

	const curves = $derived(
		links.map((l) => {
			const useCurve = curved && true
			const d = (l.to[1] - l.from[1]) * CURVE_TANGENT
			return {
				useCurve,
				curve: useCurve
					? new CubicBezierCurve3(
							new Vector3(l.from[0], l.from[1] + INS_SHIFT, l.from[2]),
							new Vector3(l.from[0], l.from[1] + d, l.from[2]),
							new Vector3(l.to[0], l.to[1] - LINE_SHIFT - d, l.to[2]),
							new Vector3(l.to[0], l.to[1] - LINE_SHIFT, l.to[2])
						)
					: new LineCurve3(
							new Vector3(l.from[0], l.from[1] + INS_SHIFT, l.from[2]),
							new Vector3(l.to[0], l.to[1] - LINE_SHIFT, l.to[2])
						)
			}
		})
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
		<T.TubeGeometry
			args={[
				curves[i].curve,
				curves[i].useCurve ? TUBE_SEGMENTS_CURVED : TUBE_SEGMENTS_STRAIGHT,
				TUBE_R,
				4,
				false
			]}
		/>
	</T.Mesh>
{/each}
