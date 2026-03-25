<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { onDestroy, untrack } from 'svelte'
	import {
		InstancedMesh,
		SphereGeometry,
		MeshBasicNodeMaterial,
		AdditiveBlending,
		DoubleSide,
		Matrix4,
		Color
	} from 'three/webgpu'
	import { createPool, updatePool, spawnBurst, writeInstances } from '../lib/core/impact-particles'
	import type { SceneCtx } from '../lib/core/scene-ctx'
	import type { SceneConfig } from '../lib/core/scene'

	type Props = {
		sceneCtx: SceneCtx
		config?: SceneConfig['particles']
	}

	let { sceneCtx, config }: Props = $props()

	const cfg = untrack(() => config)
	const o = typeof cfg === 'object' && cfg !== null ? cfg : null
	const burstCount = o?.count ?? 24
	const burstSpeed = o?.speed ?? 3
	const burstDuration = o?.duration ?? 1
	const burstRadius = o?.radius ?? 1
	const burstSpin = o?.spin ?? 1
	const burstRotation = o?.rotation ?? 0
	const burstRange = o?.range ?? 1
	const burstSpread = o?.spread ?? 0.3
	const gravity = o?.gravity ?? [0, 0, 0]
	const opacity = o?.opacity ?? 1
	const MAX = burstCount * 12

	const pool = createPool(MAX)
	const geo = new SphereGeometry(1, 3, 3)

	// Material: additive blending, vertexColors for per-instance color
	// Life baked into color intensity: dead → black → invisible with additive blending
	const mat = new MeshBasicNodeMaterial({
		transparent: true,
		blending: AdditiveBlending,
		depthWrite: false,
		side: DoubleSide,
		opacity
	})

	const mesh = new InstancedMesh(geo, mat, MAX)
	mesh.frustumCulled = false

	// Enable built-in instanceColor (managed atomically with instanceMatrix by Three.js)
	const black = new Color(0, 0, 0)
	for (let i = 0; i < MAX; i++) {
		mesh.setColorAt(i, black)
	}

	// Init all matrices to zero-scale
	const zeroMat = new Matrix4().makeScale(0, 0, 0)
	for (let i = 0; i < MAX; i++) {
		mesh.setMatrixAt(i, zeroMat)
	}
	mesh.instanceMatrix.needsUpdate = true
	mesh.instanceColor!.needsUpdate = true
	mesh.count = MAX

	let highWater = 0

	useTask((delta) => {
		const bursts = sceneCtx.particleBursts
		for (const b of bursts) {
			spawnBurst(
				pool,
				b.x,
				b.y,
				b.z,
				b.tx,
				b.ty,
				b.tz,
				b.color,
				burstCount,
				burstSpeed,
				burstDuration,
				burstRadius,
				burstSpin,
				burstRotation,
				burstRange,
				burstSpread
			)
		}
		bursts.length = 0

		updatePool(pool, delta, gravity[0], gravity[1], gravity[2])

		const matArr = mesh.instanceMatrix.array as Float32Array
		const colArr = mesh.instanceColor!.array as Float32Array

		// Write live particles (matrix + color with life baked in)
		if (pool.count > 0) {
			writeInstances(pool, matArr, colArr)
		}

		// Zero out dead slots (black color + zero-scale matrix)
		const newHigh = pool.count
		for (let i = newHigh; i < highWater; i++) {
			const o = i * 16
			matArr[o] = 0
			matArr[o + 5] = 0
			matArr[o + 10] = 0
			colArr[i * 3] = 0
			colArr[i * 3 + 1] = 0
			colArr[i * 3 + 2] = 0
		}

		if (newHigh > 0 || highWater > 0) {
			mesh.instanceMatrix.needsUpdate = true
			mesh.instanceColor!.needsUpdate = true
		}

		highWater = newHigh === 0 ? 0 : Math.max(newHigh, highWater)
	})

	onDestroy(() => {
		geo.dispose()
		mat.dispose()
	})
</script>

<T is={mesh} />
