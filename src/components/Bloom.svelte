<script lang="ts">
	import { useThrelte, useTask } from '@threlte/core'
	import { onMount } from 'svelte'
	import { PostProcessing, type WebGPURenderer } from 'three/webgpu'
	import { pass } from 'three/tsl'
	import { bloom } from 'three/addons/tsl/display/BloomNode.js'

	type Props = {
		strength?: number
		radius?: number
		threshold?: number
	}

	let { strength = 1, radius = 0.1, threshold = 1 }: Props = $props()

	const { renderer, scene, camera, renderStage, autoRender } = useThrelte()

	const postProcessing = new PostProcessing(renderer as unknown as WebGPURenderer)

	$effect(() => {
		const scenePass = pass(scene, camera.current)
		const scenePassColor = scenePass.getTextureNode('output')
		const bloomPass = bloom(scenePassColor, strength, radius, threshold)
		postProcessing.outputNode = scenePassColor.add(bloomPass)
	})

	onMount(() => {
		const before = autoRender.current
		autoRender.set(false)
		return () => autoRender.set(before)
	})

	useTask(
		() => {
			postProcessing.render()
		},
		{ stage: renderStage, autoInvalidate: false }
	)
</script>
