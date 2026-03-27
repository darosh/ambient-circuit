<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { BoxGeometry, Mesh, Group } from 'three/webgpu'
	import type { Material } from 'three/webgpu'
	import { getCachedTextGeometry } from '../lib/video/geometry-text'

	export type CcCol = {
		label: string
		/** Returns current normalized value (0-1) */
		getValue: () => number
	}

	const N_POINTS = 24
	const N_HIST = 32
	const DENSITY = 0.25
	const PUSH_INTERVAL = 1 / 15 // ~15 samples/sec
	const SPARKLINE_HEIGHT = 0.885
	const OFFSET_Y = -0.035
	const THICKNESS = 0.07

	let {
		cols,
		height = 1,
		charWidth = 0.69,
		material,
		freeze = false,
		maxWidth = Infinity,
		onRowCount
	}: {
		cols: CcCol[]
		height?: number
		charWidth?: number
		material?: Material
		freeze?: boolean
		maxWidth?: number
		onRowCount?: (count: number) => void
	} = $props()

	let outerRef = $state.raw<Group | undefined>()

	// Per-column: segment meshes + local history — all plain JS, no Svelte reactivity
	// N_POINTS-1 thin BoxGeometry(1, t, t) segments, rotated each frame to connect points
	let segPools: Mesh[][] = []
	let colGroups: Group[] = []
	let hists: Float32Array[] = []
	let histHeads: number[] = []
	let pushAccums: number[] = []

	$effect(() => {
		const outer = outerRef
		if (!outer) return

		for (const g of colGroups) outer.remove(g)
		colGroups = []
		segPools = []
		hists = []
		histHeads = []
		pushAccums = []

		const thickness = height * THICKNESS
		const rowH = height * 3 // same as rowSpacing in HudScene
		let curRowX = 0
		let curRow = 0

		for (const col of cols) {
			const colW = (col.label.length + 1 + N_POINTS * DENSITY + 1) * charWidth * height

			// Wrap to next row if exceeding maxWidth (but always place at least one per row)
			if (curRowX > 0 && curRowX + colW > maxWidth) {
				curRow++
				curRowX = 0
			}

			const colGroup = new Group()
			colGroup.position.x = curRowX
			colGroup.position.y = -curRow * rowH
			outer.add(colGroup)
			colGroups.push(colGroup)

			curRowX += colW

			// Label
			const labelGeom = getCachedTextGeometry(col.label, height)
			if (labelGeom) {
				labelGeom.userData.refCount = (labelGeom.userData.refCount ?? 0) + 1
				const labelMesh = new Mesh(labelGeom, material)
				// labelMesh.position.y = height * 0.075
				labelMesh.position.y = 0
				colGroup.add(labelMesh)
			}

			// N_POINTS-1 unit-length thin boxes, rotated each frame to connect consecutive samples
			const segGeom = new BoxGeometry(1, thickness, thickness)
			const pool: Mesh[] = []
			for (let s = 0; s < N_POINTS - 1; s++) {
				const m = new Mesh(segGeom, material)
				m.visible = false
				colGroup.add(m)
				pool.push(m)
			}
			segPools.push(pool)
			hists.push(new Float32Array(N_HIST))
			histHeads.push(0)
			pushAccums.push(0)
		}

		onRowCount?.(curRow + 1)

		return () => {
			for (const g of colGroups) {
				for (const child of g.children) {
					const m = child as Mesh
					if (m.geometry?.userData?.cached) {
						m.geometry.userData.refCount--
					} else {
						m.geometry?.dispose()
					}
				}
				outer.remove(g)
			}
			colGroups = []
			segPools = []
			hists = []
			histHeads = []
			pushAccums = []
		}
	})

	useTask((delta) => {
		if (freeze) return
		const stepX = charWidth * height * DENSITY

		for (const [i, col] of cols.entries()) {
			const pool = segPools[i]
			if (!pool) continue

			pushAccums[i] += delta
			if (pushAccums[i] >= PUSH_INTERVAL) {
				pushAccums[i] = 0 // reset (not subtract) to avoid burst after pause
				hists[i][histHeads[i] % N_HIST] = col.getValue()
				histHeads[i]++
			}

			const head = histHeads[i]

			// Walk segments: each connects sample p to p+1
			let x0 = (col.label.length + 0.5) * charWidth * height
			let y0 =
				(hists[i][(head - N_POINTS + N_HIST) % N_HIST] ?? 0) * height * SPARKLINE_HEIGHT +
				OFFSET_Y * height

			for (const [s, seg] of pool.entries()) {
				const slot = (head - N_POINTS + s + 1 + N_HIST) % N_HIST
				const x1 = x0 + stepX
				const y1 = (hists[i][slot] ?? 0) * height * SPARKLINE_HEIGHT + OFFSET_Y * height

				const dx = x1 - x0
				const dy = y1 - y0
				const len = Math.hypot(dx, dy)

				seg.position.x = (x0 + x1) / 2
				seg.position.y = (y0 + y1) / 2
				seg.scale.x = Math.max(len, 0.001)
				seg.rotation.z = Math.atan2(dy, dx)
				if (material && seg.material !== material) seg.material = material
				seg.visible = true

				x0 = x1
				y0 = y1
			}
		}
	})
</script>

<T.Group bind:ref={outerRef} />
