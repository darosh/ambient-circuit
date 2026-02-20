<script lang="ts">
	import { T, useThrelte, useTask, createSceneContext, createCameraContext } from '@threlte/core'
	import { onMount } from 'svelte'
	import type { Snippet } from 'svelte'
	import { PostProcessing, type WebGPURenderer } from 'three/webgpu'
	import { pass, mix, max } from 'three/tsl'
	import { bloom } from 'three/addons/tsl/display/BloomNode.js'

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type TslNode = any

	type Props = {
		enabled?: boolean
		strength?: number
		radius?: number
		threshold?: number
		/** Bloom the HUD too (composites before bloom instead of after) */
		hudBloom?: boolean
		/** Transform HUD color node with TSL effects (e.g. blur) */
		hudFx?: (color: TslNode) => TslNode
		children?: Snippet<[{ ref: import('three').Scene }]>
	}

	let {
		enabled = true,
		strength = 1,
		radius = 0.1,
		threshold = 1,
		hudBloom = false,
		hudFx,
		children
	}: Props = $props()

	const { renderer, scene, camera, renderStage, autoRender } = useThrelte()

	// HUD gets its own scene + camera context
	const { scene: hudScene } = createSceneContext()
	const { camera: hudCamera } = createCameraContext()

	const postProcessing = new PostProcessing(renderer as unknown as WebGPURenderer)

	// Store bloom node ref for uniform updates
	let bloomNode: TslNode = null

	// Build pipeline once (recompiles only when camera/HUD structure changes)
	$effect(() => {
		const scenePass = pass(scene, camera.current)
		const scenePassColor = scenePass.getTextureNode('output')
		bloomNode = bloom(scenePassColor, strength, radius, threshold)

		let output: TslNode

		if (hudCamera.current) {
			const hudPass = pass(hudScene, hudCamera.current)
			let hudColor: TslNode = hudPass.getTextureNode('output')

			// Apply HUD effects (blur, etc.)
			if (hudFx) hudColor = hudFx(hudColor)

			const hudMask = max(hudColor.r, max(hudColor.g, hudColor.b))

			if (hudBloom) {
				// Composite HUD before bloom — both get bloomed
				const combined = mix(scenePassColor, hudColor, hudMask)
				output = combined.add(bloom(combined, strength, radius, threshold))
			} else {
				// Composite HUD after bloom — HUD stays crisp
				output = mix(scenePassColor.add(bloomNode), hudColor, hudMask)
			}
		} else {
			output = scenePassColor.add(bloomNode)
		}

		postProcessing.outputNode = output
		postProcessing.needsUpdate = true
	})

	// Update bloom uniforms at runtime (no recompilation)
	$effect(() => {
		if (!bloomNode) return
		bloomNode.strength.value = enabled ? strength : 0
		bloomNode.radius.value = radius
		bloomNode.threshold.value = threshold
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

<T is={hudScene} attach={false}>
	{@render children?.({ ref: hudScene })}
</T>
