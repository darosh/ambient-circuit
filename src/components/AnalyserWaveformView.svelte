<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { BoxGeometry, InstancedMesh, Group, Matrix4 } from 'three/webgpu'
	import type { ToneAudioNode } from 'tone'
	import type { Vector3Tuple } from 'three/webgpu'
	import type { Material } from 'three/webgpu'

	let {
		analyzer,
		material,
		height = 1,
		width = 1,
		segments = 64,
		thickness = 0.01,
		/** New samples pushed into the ring per frame (controls scroll speed).
		 *  Defaults to 4. Higher = faster scroll. */
		stride = 4,
		position = [0, 0, 0]
	}: {
		analyzer: ToneAudioNode | null
		material?: Material
		height?: number
		width?: number
		segments?: number
		thickness?: number
		stride?: number
		position?: Vector3Tuple
	} = $props()

	let groupRef = $state.raw<Group | undefined>()

	// Ring buffer — plain arrays, no Svelte reactivity
	let ring = new Float32Array(0)
	let ringHead = 0 // next write position
	let ringFill = 0 // how many slots have been written (capped at segments)

	// Pre-allocated scratch matrix (reused every frame, zero-alloc)
	const _m4 = new Matrix4()
	const _e = _m4.elements // direct Float32Array reference — mutate in-place
	// Zero-scale matrix for hidden instances
	const _zero = new Matrix4()
	_zero.elements[0] = 0
	_zero.elements[5] = 0
	_zero.elements[10] = 0

	let iMesh: InstancedMesh | undefined

	$effect(() => {
		const group = groupRef
		if (!group) return

		const nSlots = segments
		const geom = new BoxGeometry(1, thickness, thickness)
		const mesh = new InstancedMesh(geom, material, nSlots)
		mesh.frustumCulled = false
		// Hide all instances initially via zero-scale matrix
		for (let i = 0; i < nSlots; i++) mesh.setMatrixAt(i, _zero)
		mesh.instanceMatrix.needsUpdate = true
		group.add(mesh)
		iMesh = mesh

		ring = new Float32Array(nSlots)
		ringHead = 0
		ringFill = 0

		return () => {
			group.remove(mesh)
			geom.dispose()
			iMesh = undefined
		}
	})

	useTask(() => {
		const im = iMesh
		if (!analyzer || !im) return

		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const raw = (analyzer as any).getValue() as Float32Array | number[]
			if (!raw || (raw as ArrayLike<number>).length === 0) return

			const buf = raw as ArrayLike<number>
			const bufLen = buf.length
			const nSegs = ring.length
			const advance = Math.max(1, stride)

			// Push `advance` new samples, evenly sampled from the current analyzer snapshot
			for (let k = 0; k < advance; k++) {
				const srcIdx = Math.min(Math.floor((k / advance) * bufLen), bufLen - 1)
				ring[ringHead] = (buf[srcIdx] ?? 0) as number
				ringHead = (ringHead + 1) % nSegs
				if (ringFill < nSegs) ringFill++
			}

			const filled = ringFill
			const halfW = width * 0.5
			const stepX = width / nSegs
			const halfH = Math.abs(height) * 0.5
			const startSlot = filled < nSegs ? 0 : ringHead

			// Pre-compute starting point
			let x0 = -halfW
			let y0 = ring[startSlot] * halfH
			// Manual slot counter to avoid % in hot loop
			let slot = (startSlot + 1) % nSegs

			for (let i = 0; i < filled - 1; i++) {
				const x1 = -halfW + (i + 1) * stepX
				const y1 = ring[slot] * halfH

				// Advance slot counter without modulo (branch-free wrap)
				slot++
				if (slot === nSegs) slot = 0

				const dx = x1 - x0
				const dy = y1 - y0
				// len and rotation: compute cos/sin directly — no atan2 needed
				const lenSq = dx * dx + dy * dy
				const len = lenSq > 1e-10 ? Math.sqrt(lenSq) : 0.001
				const invLen = 1 / len
				const cosT = dx * invLen
				const sinT = dy * invLen
				const cx = (x0 + x1) * 0.5
				const cy = (y0 + y1) * 0.5

				// Build column-major Matrix4 in-place (rotation+scale on X + translation)
				// col0: [len*cosT, len*sinT, 0, 0]
				// col1: [-sinT, cosT, 0, 0]
				// col2: [0, 0, 1, 0]
				// col3: [cx, cy, 0, 1]
				_e[0] = len * cosT
				_e[1] = len * sinT
				_e[2] = 0
				_e[3] = 0
				_e[4] = -sinT
				_e[5] = cosT
				_e[6] = 0
				_e[7] = 0
				_e[8] = 0
				_e[9] = 0
				_e[10] = 1
				_e[11] = 0
				_e[12] = cx
				_e[13] = cy
				_e[14] = 0
				_e[15] = 1

				im.setMatrixAt(i, _m4)

				x0 = x1
				y0 = y1
			}

			// Zero-scale any trailing instances (not yet filled)
			for (let i = Math.max(0, filled - 1); i < nSegs; i++) {
				im.setMatrixAt(i, _zero)
			}

			im.instanceMatrix.needsUpdate = true
		} catch {
			// analyzer not ready
		}
	})
</script>

<T.Group
	bind:ref={groupRef}
	position.x={position[0]}
	position.y={position[1]}
	position.z={position[2]}
/>
