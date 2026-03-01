<script lang="ts">
	import { T, useThrelte, useTask, createSceneContext, createCameraContext } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { onMount, untrack } from 'svelte'
	import type { Snippet } from 'svelte'
	import {
		Vector3,
		PerspectiveCamera as ThreePerspectiveCamera,
		PostProcessing
	} from 'three/webgpu'
	import type { WebGPURenderer, Scene } from 'three/webgpu'
	import { pass, select, screenUV, mix, max } from 'three/tsl'
	import { bloom } from 'three/addons/tsl/display/BloomNode.js'
	import type { ViewConfig, ViewSplitConfig, BloomConfig } from '../lib/scene'
	import type { SceneCtx } from '../lib/scene-ctx'
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
	} from '../lib/multi-view'

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
					cs.isDraggingEnd = 0.2
					cs.isDragging = false
				}, 800))
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

	// ── TSL pipeline helpers ───────────────────────────────────────────────────

	function resolveBloom(
		cfg: ViewSplitConfig['bloom'],
		defaults: BloomConfig | undefined
	): BloomConfig | null {
		if (!cfg) return null
		const d = defaults ?? {}
		if (cfg === true)
			return { strength: d.strength ?? 0.5, radius: d.radius ?? 0.2, threshold: d.threshold ?? 0.5 }
		return {
			strength: cfg.strength ?? d.strength ?? 0.5,
			radius: cfg.radius ?? d.radius ?? 0.2,
			threshold: cfg.threshold ?? d.threshold ?? 0.5
		}
	}

	/* eslint-disable @typescript-eslint/no-explicit-any */
	function buildComposite(nodes: any[], layout: ViewConfig['layout'], n: number): any {
		if (n === 1) return nodes[0]
		if (layout === 'horizontal') {
			let result = nodes[n - 1]
			for (let i = n - 2; i >= 0; i--)
				result = select(screenUV.x.lessThan((i + 1) / n), nodes[i], result)
			return result
		}
		if (layout === 'vertical') {
			let result = nodes[n - 1]
			for (let i = n - 2; i >= 0; i--)
				result = select(screenUV.y.greaterThan((n - 1 - i) / n), nodes[i], result)
			return result
		}
		const cols = Math.ceil(Math.sqrt(n))
		const rows = Math.ceil(n / cols)
		const rowNodes: any[] = []
		for (let row = 0; row < rows; row++) {
			const base = row * cols
			let rowResult = nodes[Math.min(base + cols - 1, n - 1)]
			for (let col = cols - 2; col >= 0; col--) {
				const idx = base + col
				if (idx < n)
					rowResult = select(screenUV.x.lessThan((col + 1) / cols), nodes[idx], rowResult)
			}
			rowNodes.push(rowResult)
		}
		let result = rowNodes[rows - 1]
		for (let row = rows - 2; row >= 0; row--)
			result = select(screenUV.y.greaterThan((rows - 1 - row) / rows), rowNodes[row], result)
		return result
	}
	/* eslint-enable @typescript-eslint/no-explicit-any */

	// ── Pipeline building ──────────────────────────────────────────────────────

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let _scenePasses: any[] = []
	let _devicePixelRatio = 0

	$effect(() => {
		const cams = cameras
		if (cams.some((c) => !c)) return
		if (children) {
			return hudCamera.subscribe((hudCam) => {
				if (!hudCam) return
				untrack(() => buildPipeline(cams as ThreePerspectiveCamera[]))
			})
		}
		untrack(() => buildPipeline(cams as ThreePerspectiveCamera[]))
	})

	const SINGLE_BLOOM = false

	function buildPipeline(cams: ThreePerspectiveCamera[]) {
		const n = config.splits.length
		_scenePasses = []
		const splitOutputs = cams.map((cam, i) => {
			const splitCfg = config.splits[i]
			const scenePass = pass(scene, cam)
			_scenePasses[i] = scenePass
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const passTexNode = scenePass.getTextureNode('output') as any
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const color: any = passTexNode.sample(screenUV)

			if (!SINGLE_BLOOM) {
				const bloomCfg = resolveBloom(splitCfg.bloom ?? true, config.bloomDefaults)
				if (!bloomCfg) return color
				return color.add(bloom(color, bloomCfg.strength, bloomCfg.radius, bloomCfg.threshold))
			}

			return color
		})

		let composed = buildComposite(splitOutputs, config.layout, n)

		if (SINGLE_BLOOM) {
			const splitCfg = config.splits[0]
			const bloomCfg = resolveBloom(splitCfg.bloom ?? true, config.bloomDefaults)

			if (bloomCfg) {
				composed = composed.add(
					bloom(composed, bloomCfg.strength, bloomCfg.radius, bloomCfg.threshold)
				)
			}
		}

		if (children && hudCamera.current) {
			const hudPass = pass(hudScene, hudCamera.current)
			const hudColor = hudPass.getTextureNode('output')
			const hudMask = max(hudColor.r, hudColor.g, hudColor.b, hudColor.a)
			const doHudBloom = config.hudBloom ?? true
			if (doHudBloom) {
				const b = config.bloomDefaults ?? { strength: 0.5, radius: 0.2, threshold: 0.5 }
				const hudBloomed = hudColor.add(bloom(hudColor, b.strength, b.radius, b.threshold))
				const hudMaskBloom = hudBloomed.a.smoothstep(1, 2.5).sub(0.01).mul(1.02).clamp(0, 1)
				composed = mix(composed, hudBloomed, hudMaskBloom)
			} else {
				composed = mix(composed, hudColor, hudMask)
			}
		}

		postProcessing.outputNode = composed
		postProcessing.needsUpdate = true
	}

	// ── Viewport rects ─────────────────────────────────────────────────────────

	const _rects: SplitRect[] = untrack(() =>
		config.splits.map(() => ({ x: 0, y: 0, width: 0, height: 0 }))
	)
	const _lastSize = { w: 0, h: 0, dpr: 0 }

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
			for (const p of _scenePasses) p?.dispose()
			_scenePasses = []
		}
	})

	// ── Per-frame: aspect update + camera follow + render ──────────────────────

	const _tmp = new Vector3()
	const _desired = new Vector3()
	const _lastAspect: number[] = untrack(() => config.splits.map(() => 0))

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
				n,
				size.current.width,
				size.current.height,
				dpr.current,
				_rects,
				_lastSize
			)

			// setViewport/setScissor after render() so _pixelRatio is populated
			if (viewportDirty) {
				for (let i = 0; i < n; i++) {
					const r = _rects[i]
					_scenePasses[i]?.setPixelRatio(_lastSize.dpr)
					_scenePasses[i]?.setViewport(r.x, r.y, r.width, r.height)
					_scenePasses[i]?.setScissor(r.x, r.y, r.width, r.height)
				}

				postProcessing.needsUpdate = true
			}

			for (let i = 0; i < n; i++) {
				const cam = cameras[i]
				if (!cam) continue

				const rect = _rects[i]
				const aspect = rect.width / rect.height
				if (aspect !== _lastAspect[i]) {
					cam.aspect = aspect
					cam.updateProjectionMatrix()
					_lastAspect[i] = aspect
				}

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
