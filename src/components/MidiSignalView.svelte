<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { LineCurve3, Vector3 } from 'three/webgpu'
	import { CubicBezierCurve3, type Vector3Tuple } from 'three/webgpu'
	import { untrack } from 'svelte'
	import { buildImpactMaterial } from '../lib/video/material-impact'

	const TUBE_SEGMENTS_STRAIGHT = 1
	const TUBE_SEGMENTS_CURVED = 12
	const CURVE_TANGENT = 0.5
	const NODE_LENGTH = 0.2
	const LINE_SHIFT = NODE_LENGTH / 2
	const INS_SHIFT = 0.025

	type SignalLink = {
		from: Vector3Tuple
		to: Vector3Tuple
		signal: { intensity: number }
		color?: string
	}

	let {
		links,
		curved = true,
		alpha = 0.5
	}: { links: SignalLink[]; curved?: boolean; alpha?: number } = $props()

	const FLASH_DURATION = 0.5
	const TUBE_R = 0.02

	const curves = $derived(
		links.map((l) => {
			const useCurve = curved && true
			const f = new Vector3(l.from[0], l.from[1] + INS_SHIFT, l.from[2])
			const t = new Vector3(l.to[0], l.to[1] - LINE_SHIFT, l.to[2])
			// const d = (l.to[1] - l.from[1]) * CURVE_TANGENT
			const len = f.distanceTo(t)
			const d = Math.max(l.to[1] - l.from[1], len / 2) * CURVE_TANGENT
			return {
				useCurve,
				segments: useCurve ? Math.round(TUBE_SEGMENTS_CURVED * len) : TUBE_SEGMENTS_STRAIGHT,
				curve: useCurve
					? new CubicBezierCurve3(
							f,
							new Vector3(l.from[0], l.from[1] + d, l.from[2]),
							new Vector3(l.to[0], l.to[1] - LINE_SHIFT - d, l.to[2]),
							t
						)
					: new LineCurve3(f, t)
			}
		})
	)

	const materials = $derived(
		untrack(() => links).map((l) =>
			buildImpactMaterial(l.color ?? '#ffffff', l.color ?? '#ffffff', alpha, true, 1, 0.7)
		)
	)

	const animTimes = $state<number[]>([])

	$effect(() => {
		animTimes.length = untrack(() => links.length)
		animTimes.fill(0)
	})

	useTask((delta) => {
		for (let i = 0; i < links.length; i++) {
			if (links[i].signal.intensity > 0) {
				animTimes[i] = FLASH_DURATION
				links[i].signal.intensity = 0
			}

			if (animTimes[i] > 0) {
				animTimes[i] = Math.max(0, animTimes[i] - delta)
				materials[i].impactT.value = animTimes[i] / FLASH_DURATION
			}
		}
	})
</script>

{#each links as _, i (i)}
	<T.Mesh material={materials[i].mat}>
		<T.TubeGeometry args={[curves[i].curve, curves[i].segments, TUBE_R, 4, false]} />
	</T.Mesh>
{/each}
