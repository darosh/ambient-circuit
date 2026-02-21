<script lang="ts">
	import { T, useTask } from '@threlte/core'
	// import { MeshStandardNodeMaterial } from 'three/webgpu'
	import { SphereGeometry } from 'three/webgpu'
	import { buildImpactMaterial } from '../lib/video/material-impact'
	import GeoText from './GeoText.svelte'
	// import { DoubleSide } from 'three/src/constants'

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

	// Match HudScene: size = sphereR = height/2, charWidth = sphereR * 0.8 = height * 0.4
	// Gap between notes = 1 * sphereR = height * 0.5
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
		// new MeshStandardNodeMaterial({
		// 	transparent: true,
		// 	side: DoubleSide,
		// 	opacity: .5,
		// 	alphaToCoverage: true,
		// 	emissive: '#ffffff',
		// 	emissiveIntensity: 1,
		// 	color: '#ffffff',
		// })
		buildImpactMaterial(baseColor, baseColor, 0, true, 0.9, 0.5, 0.5)
	)

	// ─── Reactive display list ───────────────────────────────────────────────────
	// Updated only when new note arrives (compact) or every frame (time mode).
	// Keyed by poolIdx so Svelte only patches the one changed slot.
	type DisplaySlot = { poolIdx: number; text: string; x: number; collapsed?: boolean }
	let displaySlots = $state<DisplaySlot[]>([])

	function rebuildDisplay() {
		const result: DisplaySlot[] = []
		if (mode === 'time') {
			// Beat-mapped using wall-clock time for smooth per-frame movement
			// elapsed beats = (Date.now() - ev.time) / ms_per_beat
			const msPerBeat = 60000 / bpm
			const now = Date.now()

			// Track rightEdge to detect overlapping notes (collapse to dots)
			let rightEdge = -Infinity

			for (let d = 0; d < fillCount; d++) {
				const idx = (headIdx + d) % MAX_SLOTS
				const elapsed = (now - ring[idx].time) / msPerBeat
				if (elapsed < 0) continue
				const x = position[0] + (elapsed / beatsVisible) * width
				if (x > position[0] + width) {
					// pool[idx].opacity = 0
					pool[idx].alpha.value = 0
					continue
				}
				const alpha = getAlpha(x)
				if (alpha <= 0.01) {
					pool[idx].alpha.value = 0
					continue
				}
				// pool[idx].opacity = alpha
				pool[idx].alpha.value = alpha
				// pool[idx].emissive.set(ring[idx].color)
				// pool[idx].emissiveColor.value.set(ring[idx].color)
				const noteW = ringWidths[idx]
				const collapsed = x < rightEdge
				if (!collapsed) rightEdge = x + noteW
				result.push({ poolIdx: idx, text: ring[idx].text, x, collapsed })
			}
		} else {
			// Compact: newest (d=0) pinned to position[0]; older notes (d>=1) shift by _oldOffset
			let x = position[0]
			let rightEdge = -Infinity

			for (let d = 0; d < fillCount; d++) {
				const idx = (headIdx + d) % MAX_SLOTS
				// d=0 is always at position[0]; older notes carry the slide offset
				const xPos = d > 0 ? x + _oldOffset : x
				if (xPos > position[0] + width) {
					for (let r = d; r < fillCount; r++) pool[(headIdx + r) % MAX_SLOTS].alpha.value = 0
					// for (let r = d; r < fillCount; r++) pool[(headIdx + r) % MAX_SLOTS].opacity = 0
					break
				}
				const alpha = getAlpha(xPos)
				// pool[idx].opacity = alpha
				pool[idx].alpha.value = alpha
				// pool[idx].color.set(ring[idx].color)
				pool[idx].emissiveColor.value.set(ring[idx].color)
				if (alpha > 0.01) {
					// Collapse uses final x (not animated xPos) — prevents false dots during slide
					const collapsed = x < rightEdge
					if (!collapsed) rightEdge = x + ringWidths[idx]
					result.push({ poolIdx: idx, text: ring[idx].text, x: xPos, collapsed })
				}
				x += ringWidths[idx]
			}
		}
		displaySlots = result
	}

	let lastSeenTime = -1

	// Compact slide animation — offset applied uniformly to all notes, eased once per frame
	const COMPACT_ANIM_DUR = 0.2
	let _oldOffset = 0
	let _oldOffsetFrom = 0
	let _oldOffsetAnimT = COMPACT_ANIM_DUR // start as done

	useTask((delta) => {
		if (freeze) return

		// Advance compact slide animation (computed once, applied to all notes in rebuildDisplay)
		if (mode === 'compact' && _oldOffsetAnimT < COMPACT_ANIM_DUR) {
			_oldOffsetAnimT = Math.min(COMPACT_ANIM_DUR, _oldOffsetAnimT + delta)
			const t = _oldOffsetAnimT / COMPACT_ANIM_DUR
			_oldOffset = _oldOffsetFrom * (1 - t * t * t) // easeInCubic toward 0
		}

		const len = events?.length ?? 0
		const newest = len > 0 ? events[len - 1] : null
		if (!newest || newest.time <= lastSeenTime) {
			if (mode === 'time' || _oldOffsetAnimT < COMPACT_ANIM_DUR) rebuildDisplay()
			return
		}
		// Collect all new events (time > lastSeenTime), scanning backwards from end
		let firstNew = len - 1
		while (firstNew > 0 && events[firstNew - 1] && events[firstNew - 1].time > lastSeenTime) {
			firstNew--
		}
		let totalNewWidth = 0
		for (let i = firstNew; i < len; i++) {
			const ev = events[i]
			if (!ev) continue
			headIdx = (headIdx - 1 + MAX_SLOTS) % MAX_SLOTS
			ring[headIdx].text = ev.label
			ring[headIdx].color = ev.color
			ring[headIdx].beat = ev.beat
			ring[headIdx].time = ev.time
			ringWidths[headIdx] = labelWidth(ev.label, mode === 'time')
			totalNewWidth += ringWidths[headIdx]
			fillCount = Math.min(fillCount + 1, MAX_SLOTS)
		}
		lastSeenTime = newest.time
		// Trigger slide: all notes start at old positions, ease into new ones
		// if (mode === 'compact' && totalNewWidth > 0) {
		// 	_oldOffsetFrom = -totalNewWidth // always reset: no accumulation across rapid fires
		// 	_oldOffset = _oldOffsetFrom
		// 	_oldOffsetAnimT = 0
		// }
		rebuildDisplay()
	})
</script>

{#each displaySlots as ds (ds.poolIdx)}
	{#if ds.collapsed}
		<T.Mesh
			geometry={dotGeom}
			material={pool[ds.poolIdx].mat}
			position={[ds.x + dotRadius, position[1] - dotRadius * 2.5, position[2]]}
		/>
	{:else}
		{#key ds.text}
			<T.Group position={[ds.x, position[1], position[2]]}>
				<!--				<GeoText-->
				<!--					cache-->
				<!--					material={pool[ds.poolIdx].mat}-->
				<!--					text={ds.x.toFixed(2).toUpperCase() || '0' || ds.text.toUpperCase()}-->
				<!--					size={height / 2}-->
				<!--				/>-->
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
