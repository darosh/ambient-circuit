<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { SphereGeometry } from 'three/webgpu'
	import { buildImpactMaterial } from '../lib/video/material-impact'
	import GeoText from './GeoText.svelte'

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
		position,
		fadeThreshold = 0,
		beatsVisible = 8,
		bpm = 120,
		baseColor,
		freeze = false
	}: {
		events: NoteEvent[]
		mode?: 'time' | 'compact'
		width: number
		height: number
		charWidth: number
		position: [number, number, number]
		fadeThreshold?: number
		beatsVisible?: number
		bpm?: number
		baseColor: string
		freeze?: boolean
	} = $props()

	function labelWidth(label: string, isTime: boolean) {
		return (
			Math.max(label.length, isTime ? 1 : 6) * height * charWidth +
			(isTime ? charWidth * WORD_SPACE : charWidth) * height
		)
	}

	function getAlpha(x: number): number {
		const nx = (x - position[0]) / width
		const clamped = Math.max(0, Math.min(1, (nx - fadeThreshold) / (1 - fadeThreshold)))
		return 1 - clamped
	}

	// Dot geometry for collapsed notes
	let dotGeom = $state<SphereGeometry | undefined>(undefined)
	let dotRadius = $state(0)
	$effect(() => {
		dotRadius = height * 0.08
		const g = new SphereGeometry(dotRadius, 5, 4)
		dotGeom = g
		return () => g.dispose()
	})

	// ─── Ring buffer ─────────────────────────────────────────────────────────────
	// Each slot has a stable poolIdx — text only changes when the slot is reused
	// for a new note. On new note: only the head slot changes text → 1 GeoText rebuild.
	type RingSlot = { text: string; color: string; beat: number; time: number }
	const ring: RingSlot[] = Array.from({ length: MAX_SLOTS }, () => ({
		text: '',
		color: baseColor,
		beat: 0,
		time: 0
	}))
	const ringWidths = new Float32Array(MAX_SLOTS)
	let headIdx = 0
	let fillCount = 0 // how many slots are populated

	// Pre-allocate material pool — stable indices, never reallocated
	const pool = Array.from({ length: MAX_SLOTS }, () =>
		buildImpactMaterial(baseColor, baseColor, 0, true, 0.9, 0.5, 0.5)
	)

	// ─── Reactive display list ───────────────────────────────────────────────────
	// Updated only when new note arrives (compact) or every frame (time mode).
	// Keyed by poolIdx so Svelte only patches the one changed slot.
	type DisplaySlot = {
		poolIdx: number
		text: string
		x: number
		slide: number
		collapsed?: boolean
	}
	let displaySlots = $state<DisplaySlot[]>([])

	function rebuildDisplay() {
		const result: DisplaySlot[] = []
		if (mode === 'time') {
			const msPerBeat = 60000 / bpm
			const now = Date.now()
			let rightEdge = -Infinity

			for (let d = 0; d < fillCount; d++) {
				const idx = (headIdx + d) % MAX_SLOTS
				const elapsed = (now - ring[idx].time) / msPerBeat
				if (elapsed < 0) continue
				const x = position[0] + (elapsed / beatsVisible) * width
				if (x > position[0] + width) {
					pool[idx].alpha.value = 0
					continue
				}
				const alpha = getAlpha(x)
				if (alpha <= 0.01) {
					pool[idx].alpha.value = 0
					continue
				}
				pool[idx].alpha.value = alpha
				const noteW = ringWidths[idx]
				const collapsed = x < rightEdge
				if (!collapsed) rightEdge = x + noteW
				result.push({ poolIdx: idx, text: ring[idx].text, x, slide: 0, collapsed })
			}
		} else {
			// Compact: .x = pure grid layout, .slide = per-slot animation offset
			let x = position[0]
			let rightEdge = -Infinity
			for (let d = 0; d < fillCount; d++) {
				const idx = (headIdx + d) % MAX_SLOTS
				const noteW = ringWidths[idx]
				const slide = ringSlides[idx]

				if (x + slide > position[0] + width) {
					for (let r = d; r < fillCount; r++) pool[(headIdx + r) % MAX_SLOTS].alpha.value = 0
					break
				}
				const alpha = getAlpha(x + slide)
				pool[idx].alpha.value = alpha
				pool[idx].emissiveColor.value.set(ring[idx].color)
				if (alpha > 0.01) {
					const collapsed = x < rightEdge
					if (!collapsed) rightEdge = x + noteW
					result.push({ poolIdx: idx, text: ring[idx].text, x, slide, collapsed })
				}
				x += noteW
			}
		}
		displaySlots = result
	}

	let lastSeenTime = -1

	// Per-slot slide animation — each slot has its own offset that decays to 0
	const ringSlides = new Float32Array(MAX_SLOTS)
	const SLIDE_SPEED = 12 // higher = faster settle

	let _sliding = false // true while any slot has non-zero slide

	useTask((delta) => {
		if (freeze) return

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
			if (mode === 'time' || _sliding) rebuildDisplay()
			return
		}
		// Collect all new events (time > lastSeenTime), scanning backwards from end
		let firstNew = len - 1
		while (firstNew > 0 && events[firstNew - 1] && events[firstNew - 1].time > lastSeenTime) {
			firstNew--
		}
		// Pre-compute total width of new events
		let totalNewWidth = 0
		for (let i = firstNew; i < len; i++) {
			if (events[i]) totalNewWidth += labelWidth(events[i].label, mode === 'time')
		}
		// Shift existing slots' slides so they stay at their current visual position
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
			ringSlides[headIdx] = 0 // new notes appear at grid position immediately
			fillCount = Math.min(fillCount + 1, MAX_SLOTS)
		}
		lastSeenTime = newest.time
		rebuildDisplay()
	})
</script>

{#each displaySlots as ds (ds.poolIdx)}
	{#if ds.collapsed}
		<T.Mesh
			geometry={dotGeom}
			material={pool[ds.poolIdx].mat}
			position={[ds.x + ds.slide + dotRadius, position[1] - dotRadius * 2.5, position[2]]}
		/>
	{:else}
		{#key ds.text}
			<T.Group position={[ds.x + ds.slide, position[1], position[2]]}>
				<GeoText
					cache
					material={pool[ds.poolIdx].mat}
					text={ds.text.toUpperCase()}
					size={height / 2}
				/>
			</T.Group>
		{/key}
	{/if}
{/each}
