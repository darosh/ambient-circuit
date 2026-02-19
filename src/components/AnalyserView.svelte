<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import type { ToneAudioNode } from 'tone'
	import type { Vector3Tuple } from 'three/webgpu'

	let {
		analyzer,
		height = 1,
		width = 1,
		position = [0, 0, 0],
		baseColor = '#ccccff',
		type = 'waveform'
	}: {
		analyzer: ToneAudioNode | null
		height?: number
		width?: number
		position?: Vector3Tuple
		baseColor?: string
		type?: 'fft' | 'waveform' | 'meter'
	} = $props()

	const binCount = $derived(type === 'meter' ? 1 : 16)
	const barGap = 0.05
	const barWidth = $derived((width - barGap * 15) / 16)
	const alignCount = 16 // 16 - left, 1 for centering

	let values = <number[]>$derived(Array.from({ length: binCount }).fill(0))

	// Colors: green→yellow→red
	function barColor(_v: number): string {
		return baseColor

		// if (v < 0.05) return '#000000'
		// if (v < 0.4) return '#00ff44'
		// if (v < 0.7) return '#ffdd00'
		// return '#ff3300'
	}

	useTask(() => {
		if (!analyzer) return
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const raw = (analyzer as any).getValue() as number[] | Float32Array | number
			if (type === 'meter') {
				const db = typeof raw === 'number' ? raw : Array.isArray(raw) ? raw[0] : raw[0]
				// Convert dB to 0..1 range (-60dB..0dB)
				values = [Math.max(0, Math.min(1, (db + 60) / 60))]
			} else {
				const arr = raw as number[] | Float32Array
				const step = Math.max(1, Math.floor(arr.length / binCount))
				const next: number[] = []
				for (let i = 0; i < binCount; i++) {
					let v = arr[i * step] ?? 0
					if (type === 'fft') {
						// dB to 0..1
						v = Math.max(0, Math.min(1, (v + 100) / 100))
					} else {
						// waveform: -1..1 to 0..1
						v = Math.abs(v)
						// v = (v + 1) / 2
					}
					next.push(v)
				}
				values = next
			}
		} catch {
			// analyzer not ready
		}
	})
</script>

<T.Group position.x={position[0]} position.y={position[1]} position.z={position[2]}>
	{#each values as v, i (i)}
		{@const h = Math.max(0.01, v * Math.abs(height))}
		<T.Mesh
			position.x={(i - alignCount / 2) * (barWidth + barGap)}
			position.y={(Math.sign(height) * h) / 2}
			scale.y={h}
		>
			<T.BoxGeometry args={[barWidth, 1, barWidth]} />
			<T.MeshStandardMaterial color={barColor(v)} emissive={barColor(v)} emissiveIntensity={0.5} />
		</T.Mesh>
	{/each}
</T.Group>
