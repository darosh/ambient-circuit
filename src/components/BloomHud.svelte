<script lang="ts">
	import { T, useThrelte, useTask, createSceneContext, createCameraContext } from '@threlte/core'
	import { onMount, untrack } from 'svelte'
	import type { Snippet } from 'svelte'
	import { PostProcessing, type WebGPURenderer, type Scene, type Node } from 'three/webgpu'
	import { pass, mix, max, vec3, uniform } from 'three/tsl'
	import { bloom } from 'three/addons/tsl/display/BloomNode.js'
	import { defaultBloom } from '../lib/components/config'

	type TslNode = Node

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
		children?: Snippet<[{ ref: Scene }]>
	}

	let {
		enabled = true,
		strength = defaultBloom.strength,
		radius = defaultBloom.radius,
		threshold = defaultBloom.threshold,
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
	let bloomNode: ReturnType<typeof bloom> | null = null

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
		let hudPass: ReturnType<typeof pass> | null = null

		if (hudCamera.current) {
			hudPass = pass(hudScene, hudCamera.current)
			let hudColor: TslNode = hudPass.getTextureNode('output')

			// Apply HUD effects (blur, etc.)
			if (hudFx) hudColor = hudFx(hudColor)

			const hudMask = max(hudColor.r, hudColor.g, hudColor.b, hudColor.a)

			if (hudBloom) {
				const scpC = scenePassColor.add(bloom(scenePassColor, s, r, th))
				const hudC = hudColor.add(bloom(hudColor, s, r, th))
				const hudMaskBloom = hudC.a.smoothstep(1, 2.5).sub(0.01).mul(1.02).clamp(0, 1)
				const mixed = mix(scpC, hudC, hudMaskBloom)
				output = mixed.mul(tintUniform)
			} else {
				// Composite HUD after bloom — HUD stays crisp
				output = mix(scenePassColor.add(bloomNode), hudColor, hudMask).mul(tintUniform)
			}
		} else {
			output = scenePassColor.add(bloomNode)
		}

		postProcessing.outputNode = output
		postProcessing.needsUpdate = true

		return () => {
			scenePass.dispose()
			hudPass?.dispose()
		}
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

<T is={hudScene} attach={false}>
	{@render children?.({ ref: hudScene })}
</T>
