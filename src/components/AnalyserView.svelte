<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { BoxGeometry, Mesh, Group } from 'three/webgpu'
	import type { ToneAudioNode } from 'tone'
	import type { Vector3Tuple } from 'three/webgpu'
	import type { Material } from 'three/webgpu'

	let {
		analyzer,
		material,
		height = 1,
		width = 1,
		position = [0, 0, 0],
		type = 'waveform'
	}: {
		analyzer: ToneAudioNode | null
		material?: Material
		height?: number
		width?: number
		position?: Vector3Tuple
		type?: 'fft' | 'waveform' | 'meter'
	} = $props()

	const BAR_COUNT = 16
	const barGap = 0.05

	let groupRef = $state.raw<Group | undefined>()
	let barMeshes: Mesh[] = []

	// Create bar meshes imperatively — zero Svelte context overhead
	$effect(() => {
		const group = groupRef
		if (!group) return

		const bw = (width - barGap * 15) / 16
		const geom = new BoxGeometry(bw, 1, bw)
		const meshes: Mesh[] = []
		for (let i = 0; i < BAR_COUNT; i++) {
			const m = new Mesh(geom)
			m.visible = false
			group.add(m)
			meshes.push(m)
		}
		barMeshes = meshes

		return () => {
			for (const m of meshes) group.remove(m)
			geom.dispose()
			barMeshes = []
		}
	})

	useTask(() => {
		if (!analyzer || barMeshes.length === 0) return

		const barWidth = (width - barGap * (BAR_COUNT - 1)) / BAR_COUNT
		const binCount = type === 'meter' ? 1 : 16

		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const raw = (analyzer as any).getValue() as number[] | Float32Array | number

			for (let i = 0; i < BAR_COUNT; i++) {
				const mesh = barMeshes[i]

				if (i >= binCount) {
					mesh.visible = false
					continue
				}

				let v: number
				if (type === 'meter') {
					const db =
						typeof raw === 'number' ? raw : Array.isArray(raw) ? raw[0] : (raw as Float32Array)[0]
					v = Math.max(0, Math.min(1, (db + 60) / 60))
				} else {
					const arr = raw as number[] | Float32Array
					const step = Math.max(1, Math.floor(arr.length / binCount))
					v = arr[i * step] ?? 0
					v = type === 'fft' ? Math.max(0, Math.min(1, (v + 100) / 100)) : Math.abs(v)
				}

				const h = Math.max(0.01, v * Math.abs(height))
				mesh.position.x = -width / 2 + barWidth / 2 + i * (barWidth + barGap)
				mesh.position.y = (Math.sign(height) * h) / 2
				mesh.scale.y = h
				if (material && mesh.material !== material) mesh.material = material
				mesh.visible = true
			}
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
