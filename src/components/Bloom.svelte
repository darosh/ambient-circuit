<script lang="ts">
	import { useThrelte, useTask } from '@threlte/core'
	import { onMount, untrack } from 'svelte'
	import { PostProcessing, type WebGPURenderer } from 'three/webgpu'
	import { pass, uniform, vec3 } from 'three/tsl'
	import { bloom } from 'three/addons/tsl/display/BloomNode.js'

	type Props = {
		strength?: number
		radius?: number
		threshold?: number
		tint?: [number, number, number]
	}

	let { strength = 1, radius = 0.1, threshold = 1, tint = [1, 1, 1] }: Props = $props()

	const { renderer, scene, camera, renderStage, autoRender } = useThrelte()

	const postProcessing = new PostProcessing(renderer as unknown as WebGPURenderer)
	const tintUniform = uniform(vec3(...untrack(() => tint)))

	$effect(() => {
		const scenePass = pass(scene, camera.current)
		const scenePassColor = scenePass.getTextureNode('output')
		const bloomPass = bloom(scenePassColor, strength, radius, threshold)
		postProcessing.outputNode = scenePassColor.add(bloomPass).mul(tintUniform)
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
