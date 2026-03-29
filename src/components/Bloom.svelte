<script lang="ts">
	import { useThrelte, useTask } from '@threlte/core'
	import { onMount, untrack } from 'svelte'
	import { RenderPipeline, type WebGPURenderer } from 'three/webgpu'
	import { pass, uniform, vec3 } from 'three/tsl'
	import { bloom } from 'three/addons/tsl/display/BloomNode.js'
	import { defaultBloom } from '../lib/components/config'
	import { applyFx } from '../lib/components/post-fx'
	import type { FxFn } from '../lib/core/scene'

	type Props = {
		strength?: number
		radius?: number
		threshold?: number
		tint?: [number, number, number]
		postFx?: FxFn[]
	}

	let {
		strength = defaultBloom.strength,
		radius = defaultBloom.radius,
		threshold = defaultBloom.threshold,
		tint = [1, 1, 1],
		postFx
	}: Props = $props()

	const { renderer, scene, camera, renderStage, autoRender } = useThrelte()

	const postProcessing = new RenderPipeline(renderer as unknown as WebGPURenderer)
	const tintUniform = uniform(vec3(...untrack(() => tint)))

	$effect(() => {
		const scenePass = pass(scene, camera.current)
		const scenePassColor = scenePass.getTextureNode('output')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let out: any
		if (postFx?.length) {
			out = applyFx(scenePassColor, postFx)
		} else {
			const bloomPass = bloom(scenePassColor, strength, radius, threshold)
			out = scenePassColor.add(bloomPass).mul(tintUniform)
		}
		postProcessing.outputNode = out
		return () => scenePass.dispose()
	})

	$effect(() => {
		if (!tint) return
		tintUniform.value.fromArray(tint)
	})

	onMount(() => {
		const before = autoRender.current
		autoRender.set(false)
		return () => {
			autoRender.set(before)
			postProcessing.dispose()
		}
	})

	useTask(
		() => {
			postProcessing.render()
		},
		{ stage: renderStage, autoInvalidate: false }
	)
</script>
