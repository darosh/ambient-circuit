<script lang="ts">
	import { T, useThrelte, useTask, createSceneContext, createCameraContext } from '@threlte/core'
	import { onMount, untrack } from 'svelte'
	import type { Snippet } from 'svelte'
	import { PostProcessing, type WebGPURenderer } from 'three/webgpu'
	import { pass, mix, max, vec3, uniform, add } from 'three/tsl'
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
		tint?: [number, number, number]
		hudFx?: (color: TslNode) => TslNode
		children?: Snippet<[{ ref: import('three').Scene }]>
	}

	let {
		enabled = true,
		strength = 1,
		radius = 0.1,
		threshold = 1,
		hudBloom = false,
		tint = [1, 1, 1],
		hudFx,
		children
	}: Props = $props()

	const { renderer, scene, camera, renderStage, autoRender } = useThrelte()

	// HUD gets its own scene + camera context
	const { scene: hudScene } = createSceneContext()
	const { camera: hudCamera } = createCameraContext()
	const tintUniform = uniform(vec3(...untrack(() => tint)))

	const postProcessing = new PostProcessing(renderer as unknown as WebGPURenderer)

	// Store bloom node ref for uniform updates
	let bloomNode: TslNode = null

	// Build pipeline once (recompiles only when camera/HUD structure changes)
	// Guarded: skip until main camera is ready (avoids wasteful build during init)
	// strength/radius/threshold are untracked — handled by uniform updates in second $effect
	$effect(() => {
		if (!camera.current) return
		const s = untrack(() => strength)
		const r = untrack(() => radius)
		const th = untrack(() => threshold)
		const scenePass = pass(scene, camera.current)
		const scenePassColor = scenePass.getTextureNode('output')
		bloomNode = bloom(scenePassColor, s, r, th)

		let output: TslNode

		if (hudCamera.current) {
			const hudPass = pass(hudScene, hudCamera.current)
			let hudColor: TslNode = hudPass.getTextureNode('output')

			// Apply HUD effects (blur, etc.)
			if (hudFx) hudColor = hudFx(hudColor)

			const hudMask = max(hudColor.r, max(hudColor.g, hudColor.b))

			if (hudBloom) {
				// Composite HUD before bloom — both get bloomed
				const combined = add(
					scenePassColor.add(bloom(scenePassColor, s, r, th)),
					hudColor.add(bloom(hudColor, s, r, th))
				)

				output = combined.mul(tintUniform)
			} else {
				// Composite HUD after bloom — HUD stays crisp
				output = mix(scenePassColor.add(bloomNode), hudColor, hudMask).mul(tintUniform)
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

	$effect(() => {
		if (!tint) return
		tintUniform.value.fromArray(tint)
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
