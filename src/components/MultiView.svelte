<script lang="ts">
	import { T, useThrelte, useTask, createSceneContext, createCameraContext } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { onMount, untrack } from 'svelte'
	import type { Snippet } from 'svelte'
	import { Vector3, PerspectiveCamera as ThreePerspectiveCamera, PostProcessing } from 'three/webgpu'
	import type { WebGPURenderer, Scene } from 'three/webgpu'
	import { pass, select, screenUV, mix, max, vec2 } from 'three/tsl'
	import { bloom } from 'three/addons/tsl/display/BloomNode.js'
	import type { ViewConfig, ViewSplitConfig, BloomConfig } from '../lib/scene'
	import type { SceneCtx, MarbleEntity, ViewSplitState } from '../lib/scene-ctx'

	type OC = import('three/addons/controls/OrbitControls.js').OrbitControls
	type MarbleOrVec = MarbleEntity | number | [number, number, number] | null
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

	const { renderer, scene, renderStage, autoRender, size } = useThrelte()

	// Separate scene + camera context for HUD overlay
	const { scene: hudScene } = createSceneContext()
	const { camera: hudCamera } = createCameraContext()

	const postProcessing = new PostProcessing(renderer as unknown as WebGPURenderer)

	// Per-split lerped positions (pre-allocated) — untrack: config is static after mount
	const lerpCameraPos: Vector3[] = untrack(() => config.splits.map(() => new Vector3(5, 7, 9)))
	const lerpTargetPos: Vector3[] = untrack(() => config.splits.map(() => new Vector3(0, 1, 0)))

	/* eslint-disable @typescript-eslint/no-explicit-any */
	let cameras = $state<CamRef[]>(untrack(() => config.splits.map((): any => void 0)))
	let orbitControls = $state<OCRef[]>(untrack(() => config.splits.map((): any => void 0)))
	/* eslint-enable @typescript-eslint/no-explicit-any */

	let activeSplitIndex = $state(0)

	const splitStates: ViewSplitState[] = untrack(() =>
		config.splits.map((s) => ({
			camera: s.camera ?? null,
			target: s.target ?? null,
			smoothness: s.smoothness ?? 8
		}))
	)
	untrack(() => {
		sceneCtx.view = { splits: splitStates }
	})

	// ── Helpers ───────────────────────────────────────────────────────────────

	function resolveBloom(cfg: ViewSplitConfig['bloom'], defaults: BloomConfig | undefined): BloomConfig | null {
		if (!cfg) return null
		const d = defaults ?? {}
		if (cfg === true) return { strength: d.strength ?? 0.5, radius: d.radius ?? 0.2, threshold: d.threshold ?? 0.5 }
		return { strength: cfg.strength ?? d.strength ?? 0.5, radius: cfg.radius ?? d.radius ?? 0.2, threshold: cfg.threshold ?? d.threshold ?? 0.5 }
	}

	/**
	 * Returns a TSL UV node that remaps the split's canvas region [lo,hi] → [0,1].
	 * Must be called inside buildPipeline (TSL context).
	 */
	function splitRemapUV(layout: ViewConfig['layout'], n: number, i: number) {
		const cols = Math.ceil(Math.sqrt(n))
		const rows = Math.ceil(n / cols)
		const col = i % cols
		const row = Math.floor(i / cols)

		if (layout === 'horizontal') {
			// screenUV.x in [i/n, (i+1)/n] → [0,1]
			return vec2(screenUV.x.sub(i / n).mul(n), screenUV.y)
		}
		if (layout === 'vertical') {
			// Split 0 = CSS top = screenUV.y ∈ [(n-1)/n, 1]; split i ∈ [(n-1-i)/n, (n-i)/n]
			return vec2(screenUV.x, screenUV.y.sub((n - 1 - i) / n).mul(n))
		}
		// grid: top-to-bottom rows, left-to-right cols
		return vec2(screenUV.x.sub(col / cols).mul(cols), screenUV.y.sub((rows - 1 - row) / rows).mul(rows))
	}

	/* eslint-disable @typescript-eslint/no-explicit-any */
	function buildComposite(nodes: any[], layout: ViewConfig['layout'], n: number): any {
		if (n === 1) return nodes[0]

		if (layout === 'horizontal') {
			let result = nodes[n - 1]
			for (let i = n - 2; i >= 0; i--) result = select(screenUV.x.lessThan((i + 1) / n), nodes[i], result)
			return result
		}

		if (layout === 'vertical') {
			// Split 0 at top (high screenUV.y)
			let result = nodes[n - 1]
			for (let i = n - 2; i >= 0; i--) result = select(screenUV.y.greaterThan((n - 1 - i) / n), nodes[i], result)
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
				if (idx < n) rowResult = select(screenUV.x.lessThan((col + 1) / cols), nodes[idx], rowResult)
			}
			rowNodes.push(rowResult)
		}
		let result = rowNodes[rows - 1]
		for (let row = rows - 2; row >= 0; row--) result = select(screenUV.y.greaterThan((rows - 1 - row) / rows), rowNodes[row], result)
		return result
	}
	/* eslint-enable @typescript-eslint/no-explicit-any */

	// ── Pipeline building ─────────────────────────────────────────────────────

	// Build pipeline once all split cameras are bound (without HUD if not yet ready)
	$effect(() => {
		const cams = cameras
		if (cams.some((c) => !c)) return
		untrack(() => buildPipeline(cams as ThreePerspectiveCamera[]))
	})

	// Rebuild pipeline when HUD camera arrives (deferred — HudScene mounts after cameras)
	$effect(() => {
		if (!children) return
		return hudCamera.subscribe((cam) => {
			if (!cam) return
			const cams = cameras
			if (cams.some((c) => !c)) return
			buildPipeline(cams as ThreePerspectiveCamera[])
		})
	})

	function buildPipeline(cams: ThreePerspectiveCamera[]) {
		const n = config.splits.length

		const splitOutputs = cams.map((cam, i) => {
			const splitCfg = config.splits[i]
			const scenePass = pass(scene, cam)

			// Remap UV so split i's canvas region [lo,hi] maps to [0,1] in the pass texture.
			// This is required because pass() renders to the full canvas-size render target;
			// without remapping the split center would appear at the full-canvas center.
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const passTexNode = scenePass.getTextureNode('output') as any
			// .uv() calls clone() + sets uvNode + sets referenceNode (prevents TSL hash deduplication)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const color: any = passTexNode.sample(splitRemapUV(config.layout, n, i))

			const bloomCfg = resolveBloom(splitCfg.bloom, config.bloomDefaults)
			if (!bloomCfg) return color
			return color.add(bloom(color, bloomCfg.strength, bloomCfg.radius, bloomCfg.threshold))
		})

		let composed = buildComposite(splitOutputs, config.layout, n)

		if (children && hudCamera.current) {
			const hudPass = pass(hudScene, hudCamera.current)
			const hudColor = hudPass.getTextureNode('output')
			// Use max(r,g,b,a) for mask — same alpha trick as BloomHud; ensures dark/transparent HUD
			// elements still properly occlude the scene when alpha > rgb
			const hudMask = max(hudColor.r, hudColor.g, hudColor.b, hudColor.a)

			// hudBloom defaults to true so HUD glows like in BloomHud with fxHud=true
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

	// ── Viewport rects (also used for pointer tracking) ─────────────────────

	function onPointerMove(e: PointerEvent) {
		const canvas = (renderer as unknown as { domElement: HTMLCanvasElement }).domElement
		const rect = canvas.getBoundingClientRect()
		const px = e.clientX - rect.left
		const py = e.clientY - rect.top
		// Use cached _rects (updated every frame in useTask)
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
		return () => {
			autoRender.set(before)
			canvas.removeEventListener('pointermove', onPointerMove)
			sceneCtx.view = undefined
		}
	})

	// ── Per-frame: aspect update + camera lerps + render ─────────────────────

	const _tmp = new Vector3()

	// Pre-allocated scratch vectors for resolveVec3 — never returned, only read via outPos/outTangent
	const _resolvePos = new Vector3()
	const _resolveTangent = new Vector3()
	const _resolveResult = { pos: _resolvePos, tangent: _resolveTangent, hasTangent: false }

	function resolveVec3(val: MarbleOrVec, ctx: SceneCtx): typeof _resolveResult | null {
		if (val == null) return null
		if (typeof val === 'number') {
			const entity = ctx.marbles[val]
			if (!entity) return null
			const m = entity.marble
			_resolvePos.set(m.position.x, m.position.y, m.position.z)
			_resolveTangent.set(m.tangent.x, m.tangent.y, m.tangent.z)
			_resolveResult.hasTangent = true
			return _resolveResult
		}
		if (Array.isArray(val)) {
			_resolvePos.set(val[0], val[1], val[2])
			_resolveResult.hasTangent = false
			return _resolveResult
		}
		const m = (val as MarbleEntity).marble
		_resolvePos.set(m.position.x, m.position.y, m.position.z)
		_resolveTangent.set(m.tangent.x, m.tangent.y, m.tangent.z)
		_resolveResult.hasTangent = true
		return _resolveResult
	}

	// Pre-allocated rects array — reused every frame
	const _rects: { x: number; y: number; width: number; height: number }[] = untrack(() => config.splits.map(() => ({ x: 0, y: 0, width: 0, height: 0 })))
	let _lastW = 0
	let _lastH = 0

	function updateRects(layout: ViewConfig['layout'], n: number, w: number, h: number) {
		if (w === _lastW && h === _lastH) return
		_lastW = w
		_lastH = h
		if (layout === 'horizontal') {
			const sw = Math.floor(w / n)
			for (let i = 0; i < n; i++) { _rects[i].x = i * sw; _rects[i].y = 0; _rects[i].width = i === n - 1 ? w - i * sw : sw; _rects[i].height = h }
		} else if (layout === 'vertical') {
			const sh = Math.floor(h / n)
			for (let i = 0; i < n; i++) { _rects[i].x = 0; _rects[i].y = i * sh; _rects[i].width = w; _rects[i].height = i === n - 1 ? h - i * sh : sh }
		} else {
			const cols = Math.ceil(Math.sqrt(n))
			const rows = Math.ceil(n / cols)
			const sw = Math.floor(w / cols)
			const sh = Math.floor(h / rows)
			for (let i = 0; i < n; i++) {
				const col = i % cols
				const row = Math.floor(i / cols)
				_rects[i].x = col * sw; _rects[i].y = row * sh
				_rects[i].width = col === cols - 1 ? w - col * sw : sw
				_rects[i].height = row === rows - 1 ? h - row * sh : sh
			}
		}
	}

	// Scratch vector for tangent offset
	const _desired = new Vector3()
	// Track last aspect per camera to avoid redundant updateProjectionMatrix
	const _lastAspect: number[] = untrack(() => config.splits.map(() => 0))

	useTask(
		(delta) => {
			const n = config.splits.length
			updateRects(config.layout, n, size.current.width, size.current.height)

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
				const alpha = 1 - Math.exp(-state.smoothness * delta * 60)

				const camVal = (state.camera == null ? (splitCfg.camera ?? null) : state.camera) as MarbleOrVec
				const camResolved = resolveVec3(camVal, sceneCtx)
				if (camResolved) {
					_desired.copy(camResolved.pos)
					if (splitCfg.tangentOffset && camResolved.hasTangent) {
						_tmp.copy(camResolved.tangent).multiplyScalar(-splitCfg.tangentOffset)
						_desired.add(_tmp)
					}
					lerpCameraPos[i].lerp(_desired, alpha)
					cam.position.copy(lerpCameraPos[i])
				}

				const tgtVal = (state.target == null ? (splitCfg.target ?? null) : state.target) as MarbleOrVec
				const tgtResolved = resolveVec3(tgtVal, sceneCtx)
				if (tgtResolved) {
					lerpTargetPos[i].lerp(tgtResolved.pos, alpha)
					const oc = orbitControls[i]
					if (oc) oc.target.copy(lerpTargetPos[i])
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
			enableDamping
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
