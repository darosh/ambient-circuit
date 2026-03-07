<script lang="ts">
	import { T, useThrelte, useTask, createSceneContext, createCameraContext } from '@threlte/core'
	import { OrbitControls as OCClass } from 'three/addons/controls/OrbitControls.js'
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

	type OC = import('three/addons/controls/OrbitControls.js').OrbitControls
	type MarbleOrVec = number | [number, number, number] | null

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

	// Single camera used for all rendering
	const renderCam = untrack(
		() => new ThreePerspectiveCamera(config.splits[0]?.fov ?? 30, 1, 0.1, 1000)
	)
	renderCam.position.set(5, 7, 9)

	// Per-split proxy cameras — used only by OrbitControls, never rendered
	const ocCams: ThreePerspectiveCamera[] = untrack(() =>
		config.splits.map(() => {
			const cam = new ThreePerspectiveCamera(30, 1, 0.1, 1000)
			cam.position.set(5, 7, 9)
			return cam
		})
	)
	const orbitControls: OC[] = []

	let activeSplitIndex = $state(-1)
	let nextSplitIndex = $state(-1)

	// ── Atlas render target ────────────────────────────────────────────────────

	let _atlasTarget: RenderTarget | null = null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let _atlasTexNode: any = null
	let _splitReady: boolean[] = []

	let _buildPending = false
	function scheduleBuild() {
		if (_buildPending) return
		_buildPending = true
		queueMicrotask(() => {
			_buildPending = false
			buildPipeline()
		})
	}

	function buildPipeline() {
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
		_atlasTexNode = texture(_atlasTarget.texture)

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let composed: any = _atlasTexNode

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

		_splitReady = Array.from({ length: n }, () => false)
		const r = renderer as unknown as WebGPURenderer
		;(async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await (r as any).compileAsync(scene, renderCam)
			// Render atlas once hidden to compile WebGPU atlas pipelines — fixes first-frame glitch
			renderAtlasFrame(r, n)
			_splitReady.fill(true)
		})()
	}

	function renderAtlasFrame(r: WebGPURenderer, n: number) {
		if (!_atlasTarget) return
		r.setRenderTarget(_atlasTarget)
		r.setScissorTest(false)
		r.clear()
		r.autoClear = false
		for (let i = 0; i < n; i++) {
			const rect = _rects[i]
			const splitCfg = config.splits[i]
			const newFov = splitCfg.fov ?? 30
			const newAspect = rect.aspect!
			if (renderCam.fov !== newFov || renderCam.aspect !== newAspect) {
				renderCam.fov = newFov
				renderCam.aspect = newAspect
				renderCam.updateProjectionMatrix()
			}
			renderCam.position.copy(ocCams[i].position)
			renderCam.lookAt(lerpTargetPos[i])
			// Set viewport on target BEFORE setRenderTarget so first activation sees correct viewport
			const rectDpr = _rectsDpr[i]
			_atlasTarget.viewport.set(rectDpr.x, rectDpr.y, rectDpr.width, rectDpr.height)
			r.setRenderTarget(_atlasTarget)
			r.setScissorTest(true)
			r.setScissor(rect.x, rect.y, rect.width, rect.height)
			r.setViewport(rect.x, rect.y, rect.width, rect.height)
			r.render(scene, renderCam)
		}
		r.autoClear = true
		r.setRenderTarget(null)
		r.setScissorTest(false)
		r.setViewport(0, 0, _lastSize.w, _lastSize.h)
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

	let _orbitPending = false

	function onPointerMove(e: PointerEvent) {
		const canvas = (renderer as unknown as { domElement: HTMLCanvasElement }).domElement
		const rect = canvas.getBoundingClientRect()
		const px = e.clientX - rect.left
		const py = e.clientY - rect.top
		for (const [i, r] of _rects.entries()) {
			if (px >= r.x && px < r.x + r.width && py >= r.y && py < r.y + r.height) {
				if (_orbitPending) {
					nextSplitIndex = i
				} else {
					nextSplitIndex = -1
					if (activeSplitIndex > -1) {
						orbitControls[activeSplitIndex].enabled = false
					}
					activeSplitIndex = i
					orbitControls[activeSplitIndex].enabled = true
				}
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

		// Create one OC per split, each bound to its proxy camera
		for (const [i, cam] of ocCams.entries()) {
			const oc = new OCClass(cam, canvas)
			oc.enableDamping = false
			// Only the active split's OC responds to pointer events
			oc.enabled = activeSplitIndex === i
			orbitControls.push(oc)

			const cs = camStates[i]
			let to: number
			oc.addEventListener('start', () => {
				_orbitPending = true
				cs.isDragging = true
				clearTimeout(to)
			})
			oc.addEventListener('end', () => {
				_orbitPending = false
				if (nextSplitIndex > -1 && nextSplitIndex !== activeSplitIndex) {
					orbitControls[activeSplitIndex].enabled = false
					if (nextSplitIndex > -1) {
						orbitControls[nextSplitIndex].enabled = true
						nextSplitIndex = -1
					}
				}

				to = <number>(<unknown>setTimeout(() => {
					cs.isDraggingEnd = DRAGGING_COOLDOWN

					cs.isDragging = false
				}, DRAGGING_DELAY))
			})
		}

		// Trigger pipeline build (wait for HUD camera if needed)
		if (children) {
			const unsub = hudCamera.subscribe((hc) => {
				if (hc) scheduleBuild()
			})
			return () => {
				unsub()
				cleanup()
			}
		} else {
			scheduleBuild()
		}

		return cleanup

		function cleanup() {
			autoRender.set(before)
			canvas.removeEventListener('pointermove', onPointerMove)
			canvas.removeEventListener('pointerdown', onPointerMove)
			for (const oc of orbitControls) oc.dispose()
			orbitControls.length = 0
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
			}

			for (let i = 0; i < n; i++) {
				const ocCam = ocCams[i]
				const oc = orbitControls[i]
				const splitCfg: ViewSplitConfig = config.splits[i]
				const state = splitStates[i]
				const cs = camStates[i]

				if (cs.isDraggingEnd > 0) {
					cs.isDraggingEnd -= delta
				}

				const alphaTgt = 1 - Math.exp(-state.smoothnessTarget * delta * 60)

				const tgtVal = (
					state.target == null ? (splitCfg.target ?? null) : state.target
				) as MarbleOrVec
				const tgtResolved = resolveMarbleOrVec(tgtVal, sceneCtx, _resolveOut)
				if (tgtResolved) {
					updateTargetLerp(lerpTargetPos[i], tgtResolved.pos, alphaTgt, cs.inited)
				}

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
					updateCameraForSplit(ocCam.position, cs, state, lerpTargetPos[i], _desired, delta)

					if (tgtResolved && oc && !isClose(lerpTargetPos[i], oc.target)) {
						ocCam.lookAt(lerpTargetPos[i])
					}
				}
			}

			// ── Render ready splits into atlas via viewport/scissor ─────────
			if (_atlasTarget && _splitReady.length > 0) {
				renderAtlasFrame(renderer as unknown as WebGPURenderer, n)
			}

			postProcessing.render()
		},
		{ stage: renderStage, autoInvalidate: false }
	)
</script>

<!-- HUD overlay scene (children render here via snippet) -->
<T is={hudScene} attach={false}>
	{@render children?.({ ref: hudScene })}
</T>
