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
	const DB_MAX = 60
	const barGap = 0.05

	// Meter tick dB levels → normalized 0-1 via (db + 60) / 60
	const TICK_DB = [0, -6, -12, -24, -36, -50]
	let groupRef = $state.raw<Group | undefined>()
	let barMeshes: Mesh[] = []

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

		const barWidth = (width - barGap * (BAR_COUNT - 1)) / BAR_COUNT
		const tickGeom = new BoxGeometry(barWidth * 2 + barGap, barGap / 10, barGap / 10)
		const ticks: Mesh[] = []

		for (const element of TICK_DB) {
			const m = new Mesh(tickGeom, material)
			const v = (element + DB_MAX) / DB_MAX
			m.position.y = Math.sign(height) * v * Math.abs(height)
			m.position.x = -width / 2 + barWidth / 2 + 0.5 * (barWidth + barGap)
			m.visible = type === 'meter'
			group.add(m)
			ticks.push(m)
		}

		return () => {
			for (const m of meshes) group.remove(m)
			geom.dispose()
			barMeshes = []
			for (const m of ticks) group.remove(m)
			tickGeom.dispose()
		}
	})

	useTask(() => {
		if (!analyzer || barMeshes.length === 0) return

		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const raw = (analyzer as any).getValue() as number[] | Float32Array | number

			const isStereoMeter = type === 'meter' && Array.isArray(raw) && raw.length >= 2
			const binCount = type === 'meter' ? (isStereoMeter ? 2 : 1) : 16
			const barWidth = (width - barGap * (BAR_COUNT - 1)) / BAR_COUNT

			for (let i = 0; i < BAR_COUNT; i++) {
				const mesh = barMeshes[i]

				if (i >= binCount) {
					mesh.visible = false
					continue
				}

				let v: number
				if (type === 'meter') {
					const db = isStereoMeter
						? (raw as number[])[i]
						: typeof raw === 'number'
							? raw
							: Array.isArray(raw)
								? raw[0]
								: (raw as Float32Array)[0]
					v = Math.max(0, Math.min(1, (db + DB_MAX) / DB_MAX))
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
