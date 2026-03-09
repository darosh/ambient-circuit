<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { SphereGeometry, Mesh, Group } from 'three/webgpu'
	import { buildImpactMaterial } from '../lib/video/material-impact'
	import { getCachedMixedGeometry } from '../lib/video/geo-geometry'
	import { mixedTextCharWidth } from '../lib/video/mixed-text'
	import { onDestroy } from 'svelte'

	export type NoteEvent = {
		label: string
		color: string
		time: number
		beat: number
	}

	const MAX_SLOTS = 48
	const WORD_SPACE = 0.33

	let {
		events,
		mode = 'time',
		width,
		height,
		charWidth,
		fadeThreshold = 0,
		beatsVisible = 8,
		bpm = 120,
		baseColor,
		colors = false,
		freeze = false
	}: {
		events: NoteEvent[]
		mode?: 'time' | 'compact'
		width: number
		height: number
		charWidth: number
		fadeThreshold?: number
		beatsVisible?: number
		bpm?: number
		baseColor: string
		colors?: boolean
		freeze?: boolean
	} = $props()

	function labelWidth(label: string, isTime: boolean) {
		const charCount = mixedTextCharWidth(label.toUpperCase())
		return (
			Math.max(charCount, isTime ? 1 : 6) * height * charWidth +
			(isTime ? charWidth * WORD_SPACE : charWidth) * height
		)
	}

	function getAlpha(x: number): number {
		const nx = (x - 0) / width
		const clamped = Math.max(0, Math.min(1, (nx - fadeThreshold) / (1 - fadeThreshold)))
		return 1 - clamped
	}

	// Dot geometry for collapsed notes
	let dotGeom: SphereGeometry | undefined
	let dotRadius = 0
	$effect(() => {
		dotRadius = height * 0.08
		const g = new SphereGeometry(dotRadius, 5, 4)
		dotGeom = g
		return () => g.dispose()
	})

	// ─── Ring buffer ─────────────────────────────────────────────────────────────
	type RingSlot = { text: string; color: string; beat: number; time: number }
	const ring: RingSlot[] = Array.from({ length: MAX_SLOTS }, () => ({
		text: '',
		color: baseColor,
		beat: 0,
		time: 0
	}))
	const ringWidths = new Float32Array(MAX_SLOTS)
	let headIdx = 0
	let fillCount = 0

	// Pre-allocate material pool — stable indices, never reallocated
	const pool = Array.from({ length: MAX_SLOTS }, () =>
		buildImpactMaterial(baseColor, baseColor, 0, true, 0.9, 0.5, 0.5)
	)

	// ─── Imperative mesh pool ────────────────────────────────────────────────────
	// Plain Three.js meshes — zero Svelte context overhead
	let groupRef = $state<Group | undefined>()
	let slotMeshes: Mesh[] = []

	$effect(() => {
		const group = groupRef
		if (!group) return

		const meshes: Mesh[] = []
		for (let i = 0; i < MAX_SLOTS; i++) {
			const m = new Mesh()
			m.visible = false
			group.add(m)
			meshes.push(m)
		}
		slotMeshes = meshes

		return () => {
			for (const m of meshes) group.remove(m)
			slotMeshes = []
		}
	})

	let lastSeenTime = -1

	// Per-slot slide animation
	const ringSlides = new Float32Array(MAX_SLOTS)
	const SLIDE_SPEED = 6

	// Per-slot fade-in (0=just inserted, 1=fully visible)
	const ringFadeIns = new Float32Array(MAX_SLOTS).fill(1)
	const FADE_IN_SPEED = $derived(mode === 'time' ? 2 : 0.5)

	let _sliding = false
	let _fadingIn = false

	function updateVisuals() {
		const textSize = height / 2

		if (mode === 'time') {
			const msPerBeat = 60_000 / bpm
			const now = Date.now()
			let rightEdge = -Infinity

			for (let d = 0; d < MAX_SLOTS; d++) {
				const mesh = slotMeshes[d]
				if (!mesh) continue

				if (d >= fillCount) {
					mesh.visible = false
					continue
				}

				const idx = (headIdx + d) % MAX_SLOTS
				const elapsed = (now - ring[idx].time) / msPerBeat
				if (elapsed < 0) {
					mesh.visible = false
					continue
				}
				const x = 0 + (elapsed / beatsVisible) * width
				if (x > 0 + width) {
					pool[idx].alpha.value = 0
					mesh.visible = false
					continue
				}
				const alpha = getAlpha(x) * ringFadeIns[idx]
				if (alpha <= 0.01) {
					pool[idx].alpha.value = 0
					mesh.visible = false
					continue
				}
				pool[idx].alpha.value = alpha

				const noteW = ringWidths[idx]
				const collapsed = x < rightEdge
				if (!collapsed) rightEdge = x + noteW

				mesh.material = pool[idx].mat

				if (collapsed) {
					mesh.geometry = dotGeom!
					mesh.position.set(x + dotRadius, -dotRadius * 2.5, 0)
				} else {
					const geom = getCachedMixedGeometry(ring[idx].text.toUpperCase(), textSize)
					if (geom) {
						mesh.geometry = geom
						mesh.position.set(x, 0, 0)
					} else {
						mesh.visible = false
						continue
					}
				}
				mesh.visible = true
			}
		} else {
			// Compact mode
			let x = 0
			let rightEdge = -Infinity
			let d = 0
			for (; d < fillCount && d < MAX_SLOTS; d++) {
				const mesh = slotMeshes[d]
				if (!mesh) continue

				const idx = (headIdx + d) % MAX_SLOTS
				const noteW = ringWidths[idx]
				const slide = ringSlides[idx]

				if (x + slide > 0 + width) {
					for (let r = d; r < fillCount && r < MAX_SLOTS; r++) {
						pool[(headIdx + r) % MAX_SLOTS].alpha.value = 0
						if (slotMeshes[r]) slotMeshes[r].visible = false
					}
					break
				}
				const alpha = getAlpha(x + slide) * ringFadeIns[idx]
				pool[idx].alpha.value = alpha

				if (colors) {
					pool[idx].emissiveColor.value.set(ring[idx].color)
				}

				if (alpha <= 0.01) {
					mesh.visible = false
					x += noteW
					continue
				}

				const collapsed = x < rightEdge
				if (!collapsed) rightEdge = x + noteW

				mesh.material = pool[idx].mat

				if (collapsed) {
					mesh.geometry = dotGeom!
					mesh.position.set(x + slide + dotRadius, -dotRadius * 2.5, 0)
				} else {
					const geom = getCachedMixedGeometry(ring[idx].text.toUpperCase(), textSize)
					if (geom) {
						mesh.geometry = geom
						mesh.position.set(x + slide, 0, 0)
					} else {
						mesh.visible = false
						x += noteW
						continue
					}
				}
				mesh.visible = true
				x += noteW
			}
			// Hide unused slots
			for (; d < MAX_SLOTS; d++) {
				if (slotMeshes[d]) slotMeshes[d].visible = false
			}
		}
	}

	useTask((delta) => {
		if (freeze) return

		// Advance per-slot fade-ins toward 1
		if (_fadingIn) {
			_fadingIn = false
			for (let d = 0; d < fillCount; d++) {
				const idx = (headIdx + d) % MAX_SLOTS
				if (ringFadeIns[idx] < 1) {
					ringFadeIns[idx] = Math.min(1, ringFadeIns[idx] + FADE_IN_SPEED * delta)
					if (ringFadeIns[idx] < 1) _fadingIn = true
				}
			}
		}

		// Decay per-slot slides toward 0
		if (mode === 'compact' && _sliding) {
			const decay = Math.exp(-SLIDE_SPEED * delta)
			_sliding = false
			for (let d = 0; d < fillCount; d++) {
				const idx = (headIdx + d) % MAX_SLOTS
				if (ringSlides[idx] !== 0) {
					ringSlides[idx] *= decay
					if (Math.abs(ringSlides[idx]) < 0.001) ringSlides[idx] = 0
					else _sliding = true
				}
			}
		}

		const len = events?.length ?? 0
		const newest = len > 0 ? events[len - 1] : null
		if (!newest || newest.time <= lastSeenTime) {
			if (mode === 'time' || _sliding || _fadingIn) updateVisuals()
			return
		}
		// Collect all new events
		let firstNew = len - 1
		while (firstNew > 0 && events[firstNew - 1] && events[firstNew - 1].time > lastSeenTime) {
			firstNew--
		}
		// Pre-compute total width of new events
		let totalNewWidth = 0
		for (let i = firstNew; i < len; i++) {
			if (events[i]) totalNewWidth += labelWidth(events[i].label, mode === 'time')
		}
		// Shift existing slots' slides
		if (mode === 'compact' && totalNewWidth > 0) {
			for (let d = 0; d < fillCount; d++) {
				ringSlides[(headIdx + d) % MAX_SLOTS] -= totalNewWidth
			}
			_sliding = true
		}
		// Insert new events into ring buffer
		for (let i = firstNew; i < len; i++) {
			const ev = events[i]
			if (!ev) continue
			headIdx = (headIdx - 1 + MAX_SLOTS) % MAX_SLOTS
			ring[headIdx].text = ev.label
			ring[headIdx].color = ev.color
			ring[headIdx].beat = ev.beat
			ring[headIdx].time = ev.time
			ringWidths[headIdx] = labelWidth(ev.label, mode === 'time')
			ringSlides[headIdx] = 0
			ringFadeIns[headIdx] = 0
			_fadingIn = true
			fillCount = Math.min(fillCount + 1, MAX_SLOTS)
		}
		lastSeenTime = newest.time
		updateVisuals()
	})

	onDestroy(() => {
		for (const p of pool) p.mat.dispose()
	})
</script>

<T.Group bind:ref={groupRef} />
