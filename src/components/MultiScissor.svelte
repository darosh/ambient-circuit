<script lang="ts">
	import { T, useThrelte, useTask, createSceneContext, createCameraContext } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { onMount, untrack } from 'svelte'
	import type { Snippet } from 'svelte'
	import {
		Vector3,
		PerspectiveCamera as ThreePerspectiveCamera,
		PostProcessing,
		RenderTarget
	} from 'three/webgpu'
	import type { WebGPURenderer, Scene } from 'three/webgpu'
	import { HalfFloatType } from 'three/webgpu'
	import { pass, mix, max, texture } from 'three/tsl'
	import { bloom } from 'three/addons/tsl/display/BloomNode.js'
	import type { ViewConfig, ViewSplitConfig } from '../lib/core/scene'
	import type { SceneCtx } from '../lib/core/scene-ctx'
	import {
		initSplitStates,
		initCamStates,
		initLerpTargets,
		updateRects,
		resolveMarbleOrVec,
		updateCameraForSplit,
		updateTargetLerp,
		type SplitRect,
		type ResolvedTarget,
		isClose
	} from '../lib/components/multi-view/multi-view'
	import { resolveBloom } from '../lib/components/multi-view/tsl'
	import { hudBloom } from '../lib/components/config'
	import { pause } from '../lib/helpers/pause'

	type OC = import('three/addons/controls/OrbitControls.js').OrbitControls
	type MarbleOrVec = number | [number, number, number] | null
	type CamRef = ThreePerspectiveCamera | undefined
	type OCRef = OC | undefined

	let {
		config,
		sceneCtx,
		children
	}: {
		config: ViewConfig
		sceneCtx: SceneCtx
		children?: Snippet<[{ ref: Scene }]>
	} = $props()

	const DRAGGING_COOLDOWN = 1.6 // seconds
	const DRAGGING_DELAY = 800 // milliseconds

	const { renderer, scene, renderStage, autoRender, size, dpr } = useThrelte()

	const { scene: hudScene } = createSceneContext()
	const { camera: hudCamera } = createCameraContext()

	const postProcessing = new PostProcessing(renderer as unknown as WebGPURenderer)

	const lerpTargetPos = untrack(() => initLerpTargets(config.splits))
	const camStates = untrack(() => initCamStates(config.splits))
	const splitStates = untrack(() => initSplitStates(config.splits))

	untrack(() => {
		sceneCtx.view = { splits: splitStates }
	})

	/* eslint-disable @typescript-eslint/no-explicit-any */
	let cameras = $state<CamRef[]>(untrack(() => config.splits.map((): any => void 0)))
	let orbitControls = $state<OCRef[]>(untrack(() => config.splits.map((): any => void 0)))
	/* eslint-enable @typescript-eslint/no-explicit-any */

	let activeSplitIndex = $state(-1)

	// Track OC user interaction via start/end events
	$effect(() => {
		const ocs = orbitControls
		const cleanups: (() => void)[] = []
		for (const [i, oc] of ocs.entries()) {
			if (!oc) continue
			const cs = camStates[i]
			let to: number
			const onStart = () => {
				cs.isDragging = true
				clearTimeout(to)
			}
			const onEnd = () => {
				to = <number>(<unknown>setTimeout(() => {
					cs.isDraggingEnd = DRAGGING_COOLDOWN
					cs.isDragging = false
				}, DRAGGING_DELAY))
			}
			oc.addEventListener('start', onStart)
			oc.addEventListener('end', onEnd)
			cleanups.push(() => {
				oc.removeEventListener('start', onStart)
				oc.removeEventListener('end', onEnd)
			})
		}
		return () => {
			for (const fn of cleanups) fn()
		}
	})

	// ── Atlas render target ────────────────────────────────────────────────────
	// All splits rendered into one atlas texture via viewport/scissor per camera.
	// This keeps the TSL pipeline to a single texture sampler regardless of split count,
	// avoiding WebGPU's 16-sampler-per-stage limit.

	let _atlasTarget: RenderTarget | null = null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let _atlasTexNode: any = null
	// Per-split compile ready flags — split renders as soon as its cam compiles
	let _splitReady: boolean[] = []

	let _buildPending = false
	function scheduleBuild(cams: ThreePerspectiveCamera[]) {
		if (_buildPending) return
		_buildPending = true
		queueMicrotask(() => {
			_buildPending = false
			buildPipeline(cams)
		})
	}

	$effect(() => {
		const cams = cameras
		if (cams.some((c) => !c)) return
		if (children) {
			return untrack(() =>
				hudCamera.subscribe((hudCam) => {
					if (!hudCam) return
					scheduleBuild(cams as ThreePerspectiveCamera[])
				})
			)
		}
		untrack(() => scheduleBuild(cams as ThreePerspectiveCamera[]))
	})

	function buildPipeline(_cams: ThreePerspectiveCamera[]) {
		const n = config?.splits?.length ?? 0
		if (!n) return

		if (_lastSize.w === 0) {
			updateRects(
				config.layout,
				config.splits,
				size.current.width,
				size.current.height,
				dpr.current,
				_rects,
				_lastSize
			)

			for (let i = 0; i < n; i++) {
				_rectsDpr[i].x = _rects[i].x * dpr.current
				_rectsDpr[i].y = _rects[i].y * dpr.current
				_rectsDpr[i].width = _rects[i].width * dpr.current
				_rectsDpr[i].height = _rects[i].height * dpr.current
			}
		}

		const pw = Math.max(1, Math.round(_lastSize.w * _lastSize.dpr))
		const ph = Math.max(1, Math.round(_lastSize.h * _lastSize.dpr))

		if (_atlasTarget) {
			_atlasTarget.setSize(pw, ph)
		} else {
			_atlasTarget = new RenderTarget(pw, ph, { samples: 0, type: HalfFloatType })
		}
		// Recreate tex node after (re)build so it references current texture
		_atlasTexNode = texture(_atlasTarget.texture)

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let composed: any = _atlasTexNode //.sample(screenUV)

		// Global bloom — use first split's bloom config or scene defaults
		const firstBloom = config.splits.find((s) => s.bloom)?.bloom ?? true
		const bloomCfg = resolveBloom(firstBloom ?? !!config.bloomDefaults, config.bloomDefaults)
		if (bloomCfg) {
			composed = composed.add(
				bloom(composed, bloomCfg.strength, bloomCfg.radius, bloomCfg.threshold)
			)
		}

		if (children && hudCamera.current) {
			const hudPass = pass(hudScene, hudCamera.current)
			const hudColor = hudPass.getTextureNode('output')
			const hudMask = max(hudColor.r, hudColor.g, hudColor.b, hudColor.a)
			const doHudBloom = config.hudBloom ?? true
			if (doHudBloom) {
				const b = config.bloomDefaults ?? hudBloom
				const hudBloomed = hudColor.add(bloom(hudColor, b.strength, b.radius, b.threshold))
				const hudMaskBloom = hudBloomed.a.smoothstep(1, 2.5).sub(0.01).mul(1.02).clamp(0, 1)
				composed = mix(composed, hudBloomed, hudMaskBloom)
			} else {
				composed = mix(composed, hudColor, hudMask)
			}
		}

		postProcessing.outputNode = composed
		postProcessing.needsUpdate = true

		// Per-split async compile: each split becomes ready as soon as its camera's
		// materials are compiled. Splits with different view frustums see different
		// objects → each camera compiles its own subset of scene materials.
		// Progressive rendering shows splits as they become ready instead of waiting
		// for all N cameras to finish (avoids N×compile_time total stall).
		_splitReady = Array.from({ length: _cams.length }, () => false)
		const r = renderer as unknown as WebGPURenderer

		(async () => {
			for (const [i, _cam] of _cams.entries()) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				await (r as any).compileAsync(scene, _cam)
				await pause(0)
				_splitReady[i] = true
			}
		})()
	}

	// ── Viewport rects ─────────────────────────────────────────────────────────

	const _rects: SplitRect[] = untrack(() =>
		config.splits.map(() => ({ x: 0, y: 0, width: 0, height: 0, aspect: 0 }))
	)
	const _rectsDpr: SplitRect[] = untrack(() =>
		config.splits.map(() => ({ x: 0, y: 0, width: 0, height: 0 }))
	)

	const _lastSize = { w: 0, h: 0, dpr: 0 }

	function resetViewport() {
		const r = renderer as unknown as WebGPURenderer
		r.setRenderTarget(null)
		r.setScissorTest(false)
		r.setViewport(0, 0, size.current.width, size.current.height)
	}

	function onPointerMove(e: PointerEvent) {
		const canvas = (renderer as unknown as { domElement: HTMLCanvasElement }).domElement
		const rect = canvas.getBoundingClientRect()
		const px = e.clientX - rect.left
		const py = e.clientY - rect.top
		for (const [i, r] of _rects.entries()) {
			if (px >= r.x && px < r.x + r.width && py >= r.y && py < r.y + r.height) {
				activeSplitIndex = i
				break
			}
		}
	}

	onMount(() => {
		const before = autoRender.current
		autoRender.set(false)
		const canvas = (renderer as unknown as { domElement: HTMLCanvasElement }).domElement
		canvas.addEventListener('pointermove', onPointerMove)
		canvas.addEventListener('pointerdown', onPointerMove)

		return () => {
			autoRender.set(before)
			canvas.removeEventListener('pointermove', onPointerMove)
			canvas.removeEventListener('pointerdown', onPointerMove)
			sceneCtx.view = undefined
			resetViewport()
			_atlasTarget?.dispose()
			_atlasTarget = null
			_atlasTexNode = null
		}
	})

	// ── Per-frame: aspect update + camera follow + render ──────────────────────

	const _tmp = new Vector3()
	const _desired = new Vector3()

	// Pre-allocated resolve scratch (reused per split per frame)
	const _resolveOut: ResolvedTarget = {
		pos: new Vector3(),
		tangent: new Vector3(),
		hasTangent: false
	}

	useTask(
		(delta) => {
			const n = config.splits.length
			const viewportDirty = updateRects(
				config.layout,
				config.splits,
				size.current.width,
				size.current.height,
				dpr.current,
				_rects,
				_lastSize
			)

			if (viewportDirty) {
				for (let i = 0; i < n; i++) {
					_rectsDpr[i].x = _rects[i].x * dpr.current
					_rectsDpr[i].y = _rects[i].y * dpr.current
					_rectsDpr[i].width = _rects[i].width * dpr.current
					_rectsDpr[i].height = _rects[i].height * dpr.current
				}
			}

			if (viewportDirty && _atlasTarget) {
				const pw = Math.max(1, Math.round(_lastSize.w * _lastSize.dpr))
				const ph = Math.max(1, Math.round(_lastSize.h * _lastSize.dpr))
				_atlasTarget.setSize(pw, ph)
				// No needsUpdate — atlas texture node is shared by reference, resize
				// doesn't change the TSL graph structure so no recompile needed
			}

			for (let i = 0; i < n; i++) {
				const cam = cameras[i]
				if (!cam) continue

				const splitCfg: ViewSplitConfig = config.splits[i]
				const state = splitStates[i]
				const cs = camStates[i]

				if (cs.isDraggingEnd > 0) {
					cs.isDraggingEnd -= delta
				}

				const alphaTgt = 1 - Math.exp(-state.smoothnessTarget * delta * 60)

				// ── Target (look-at pivot) ───────────────────────────────────
				const tgtVal = (
					state.target == null ? (splitCfg.target ?? null) : state.target
				) as MarbleOrVec
				const tgtResolved = resolveMarbleOrVec(tgtVal, sceneCtx, _resolveOut)
				if (tgtResolved) {
					updateTargetLerp(lerpTargetPos[i], tgtResolved.pos, alphaTgt, cs.inited)
				}

				// ── Camera world position ────────────────────────────────────
				const camVal = (
					state.camera == null ? (splitCfg.camera ?? null) : state.camera
				) as MarbleOrVec
				const camResolved = resolveMarbleOrVec(camVal, sceneCtx, _resolveOut)
				if (camResolved) {
					_desired.copy(camResolved.pos)
					if (splitCfg.tangentOffset && camResolved.hasTangent) {
						_tmp.copy(camResolved.tangent).multiplyScalar(-splitCfg.tangentOffset)
						_desired.add(_tmp)
					}
					updateCameraForSplit(cam.position, cs, state, lerpTargetPos[i], _desired, delta)

					if (
						tgtResolved &&
						orbitControls[i] &&
						!isClose(lerpTargetPos[i], orbitControls[i]!.target)
					) {
						cam.lookAt(lerpTargetPos[i])
					}
				}
			}

			// ── Render ready splits into atlas via viewport/scissor ─────────
			if (_atlasTarget && _splitReady.length > 0) {
				const r = renderer as unknown as WebGPURenderer

				r.setRenderTarget(_atlasTarget)
				r.setScissorTest(false)
				r.clear()
				r.autoClear = false

				for (let i = 0; i < n; i++) {
					if (!_splitReady[i]) continue
					const cam = cameras[i]
					if (!cam) continue

					const rect = _rects[i]

					if (cam.aspect !== rect.aspect) {
						cam.aspect = rect.aspect!
						cam.updateProjectionMatrix()
					}

					r.setRenderTarget(_atlasTarget)
					r.setScissorTest(true)
					r.setScissor(rect.x, rect.y, rect.width, rect.height)
					r.setViewport(rect.x, rect.y, rect.width, rect.height)

					const rectDpr = _rectsDpr[i]
					_atlasTarget.viewport.set(rectDpr.x, rectDpr.y, rectDpr.width, rectDpr.height)

					r.render(scene, cam)
				}

				r.setRenderTarget(null)
				r.setScissorTest(false)
				r.setViewport(0, 0, _lastSize.w, _lastSize.h)
			}

			postProcessing.render()
		},
		{ stage: renderStage, autoInvalidate: false }
	)
</script>

{#each config.splits as splitCfg, i (i)}
	<T.PerspectiveCamera
		fov={splitCfg.fov ?? 30}
		near={0.1}
		far={1000}
		position={[5, 7, 9]}
		bind:ref={cameras[i]}
	>
		<OrbitControls
			enableDamping={false}
			enabled={activeSplitIndex === i}
			autoRotate={splitCfg.autoRotate === true || typeof splitCfg.autoRotate === 'number'}
			autoRotateSpeed={typeof splitCfg.autoRotate === 'number' ? splitCfg.autoRotate * 0.5 : 0.5}
			bind:ref={orbitControls[i]}
		/>
	</T.PerspectiveCamera>
{/each}

<!-- HUD overlay scene (children render here via snippet) -->
<T is={hudScene} attach={false}>
	{@render children?.({ ref: hudScene })}
</T>
