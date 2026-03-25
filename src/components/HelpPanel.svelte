<script lang="ts">
	import { T, useThrelte } from '@threlte/core'
	import { createImpactMaterialCached } from '../lib/video/material-impact'
	import { panelState } from '../lib/components/hud/panel-state.svelte'
	import GeoText from './GeoText.svelte'
	import { onDestroy } from 'svelte'
	import { parseHex, formatHex, convertRgbToOklab, convertOklabToRgb, type Rgb } from 'culori/fn'
	import { GridHelperXY } from '../lib/three/GridHelperXY'
	import { extend } from '@threlte/core'

	extend({ GridHelperXY })

	const MARGIN_X = 17
	const MARGIN_Y = 12
	const TEXT_SIZE = 1.2
	const ROW_H = 2
	const BG_OPACITY = 0.9
	const BG_COLOR = '#000000'
	const DUMMY_OPACITY = 0
	const CHAR_WIDTH = 0.69
	const HUD_ZOOM = 80
	const ELLIP = '…'

	let {
		baseColor = '#ffffff',
		sphereR = 0.2,
		close
	}: {
		baseColor?: string
		sphereR?: number
		close?: () => void
	} = $props()

	const { size } = useThrelte()

	// --- Layout ---
	const vpW = $derived($size.width / HUD_ZOOM)
	const vpH = $derived($size.height / HUD_ZOOM)
	const textSize = $derived(TEXT_SIZE * sphereR)
	const textMid = $derived(textSize * 0.43)
	const charW = $derived(textSize * CHAR_WIDTH)
	const rowH = $derived(ROW_H * sphereR)

	const gridColor = $derived.by(() => {
		const rgb = <Rgb>parseHex(baseColor)
		const oklab = convertRgbToOklab(rgb)
		oklab.l = 0.4
		const backRgb = convertOklabToRgb(oklab)
		return formatHex(backRgb)
	})

	const panelW = $derived.by(() => {
		const available = vpW - MARGIN_X * sphereR
		return available / charW > 52
			? Math.max(1, Math.floor(available / charW / 2) * charW * 2)
			: Math.max(1, Math.floor((vpW - charW * 4) / charW / 2) * charW * 2)
	})
	const panelH = $derived.by(() => {
		const available = vpH - MARGIN_Y * sphereR
		return available / rowH > 16
			? Math.max(1, Math.floor(available / rowH) * rowH)
			: Math.max(1, Math.floor((vpH - sphereR * 3) / rowH) * rowH)
	})

	const panelCols = $derived(Math.round(panelW / charW / 2))
	const panelRows = $derived(Math.round(panelH / rowH))
	const MAX_VISIBLE_ROWS = $derived(panelRows - 3)
	const globalOffset = $derived(panelH / rowH >= 16 ? +2 * sphereR : (vpH - panelH) / 2)

	// --- Content ---
	type ContentRow = { text?: string; header?: boolean; link?: string }

	const BASE_CONTENT: ContentRow[] = [
		{ text: 'AMBIENT CIRCUIT', header: true },
		{ text: 'NON-LINEAR SEQUENCING AUDIO-VISUAL EXPERIMENT' },
		{ text: 'BUILD WITH TONE.JS, RNBO, SVELTE, THRELTE AND THREE.JS' },
		{},
		{ text: 'HOTKEYS', header: true },
		{ text: 'ESC            SHOW / HIDE PANELS' },
		{ text: 'SPACE          PLAY / PAUSE' },
		{ text: 'SPACE + SHIFT  PAUSE + FREEZE TRACKER' },
		{ text: 'LEFT / RIGHT   PREV / NEXT SCENE' },
		{ text: 'A / S          PREV / NEXT SCENE' },
		{ text: 'DOWN           REWIND' },
		{ text: 'UP             MUTE / UNMUTE' },
		{ text: 'N              RAIL NAMES' },
		{ text: 'B              BEAT NUMBERS' },
		{ text: 'P              POINTS' },
		{ text: 'D              DEBUG + MIDI SETTINGS' },
		{ text: 'M              MIDI' },
		{ text: 'W              WIREFRAME' },
		{ text: 'R              AUTO-ROTATE' },
		{ text: 'G              GRID' },
		{ text: 'I              PARTICLES' },
		{ text: 'E              EASING' },
		{ text: 'L              LIMIT FPS' },
		{ text: 'F              FPS' },
		{},
		{ text: 'HOTKEYS: PARAMS PANEL', header: true },
		{ text: 'T              TRIGGER SOUND' },
		{ text: 'CTRL/META + S  SOLO CHAIN' },
		{ text: 'CTRL/META + C  COPY PARAMS' },
		{ text: 'CTRL/META + V  PASTE PARAMS' },
		{ text: 'DRAG + SHIFT   FINE-TUNING' },
		{ text: 'ESC            CLOSE' },
		{},
		{ text: 'SOURCE CODE', header: true },
		{ text: 'GITHUB.COM/DAROSH/AMBIENT-CIRCUIT', link: 'https://github.com/darosh/ambient-circuit' }
	]

	const availChars = $derived(Math.max(8, Math.floor(panelW / charW) - 4))

	function wrapText(text: string, maxChars: number): string[] {
		const words = text.split(' ')
		const lines: string[] = []
		let cur = ''
		for (const w of words) {
			if (!cur) {
				cur = w
				continue
			}
			if (cur.length + 1 + w.length <= maxChars) cur += ' ' + w
			else {
				lines.push(cur)
				cur = w
			}
		}
		if (cur) lines.push(cur)
		return lines.length > 0 ? lines : [text]
	}

	function truncate(text: string, maxChars: number): string {
		return text.length <= maxChars ? text : text.slice(0, maxChars - 2) + ELLIP
	}

	const processedContent = $derived.by(() => {
		const rows: ContentRow[] = []
		for (const row of BASE_CONTENT) {
			if (!row.text) {
				rows.push(row)
				continue
			}
			if (row.link) {
				rows.push({ ...row, text: truncate(row.text, availChars) })
			} else if (row.header) {
				rows.push(row)
			} else {
				const lines = wrapText(row.text, availChars)
				rows.push({ ...row, text: lines[0] })
				for (let i = 1; i < lines.length; i++) rows.push({ text: lines[i] })
			}
		}
		return rows
	})

	const totalRows = $derived(processedContent.length)

	// --- State ---
	let scrollOffset = $state(0)

	const visibleContent = $derived.by(() => {
		const start = Math.floor(scrollOffset)
		return processedContent.slice(start, start + MAX_VISIBLE_ROWS)
	})

	const canScrollUp = $derived(scrollOffset > 0)
	const canScrollDown = $derived(scrollOffset < totalRows - MAX_VISIBLE_ROWS)

	// --- Materials ---
	const _c = '#ffffff'
	const headerFx = createImpactMaterialCached('hud-help-header', _c, _c, 0.9, true, 0.9, 0.6, 2.5)
	const textFx = createImpactMaterialCached('hud-help-text', _c, _c, 0.5, true, 0.9, 0.3, 2)
	const closeFx = createImpactMaterialCached('hud-help-close', _c, _c, 0.5, true, 0.9, 0.3, 2)
	const linkFx = createImpactMaterialCached('hud-help-link', _c, _c, 0.7, true, 0.9, 0.5, 2.5)

	// Per-link materials to isolate hover state
	const MAX_LINKS = 8
	const linkFxPool: ReturnType<typeof createImpactMaterialCached>[] = []
	for (let i = 0; i < MAX_LINKS; i++) {
		linkFxPool.push(
			createImpactMaterialCached(`hud-help-link-${i}`, _c, _c, 0.7, true, 0.9, 0.5, 2.5)
		)
	}

	$effect(() => {
		for (const fx of [headerFx, textFx, closeFx, linkFx, ...linkFxPool]) {
			fx.emissiveColor.value.set(baseColor)
			fx.impactColor.value.set(baseColor)
		}
	})

	// --- Scroll ---
	let panelHovered = false

	function onWheel(e: WheelEvent) {
		if (!panelHovered) return
		e.preventDefault()
		const maxScroll = Math.max(0, totalRows - MAX_VISIBLE_ROWS)
		scrollOffset = Math.max(0, Math.min(maxScroll, scrollOffset + (e.deltaY > 0 ? 1 : -1)))
	}

	$effect(() => {
		const canvas = document.querySelector('canvas')
		if (!canvas) return
		canvas.addEventListener('wheel', onWheel, { passive: false })
		return () => canvas.removeEventListener('wheel', onWheel)
	})

	function enterPanel() {
		panelHovered = true
		panelState.pointerLock = true
	}

	function leavePanel() {
		panelHovered = false
		panelState.pointerLock = false
	}

	// Link index per processedContent row (stable pool index for hover isolation)
	const linkIndices = $derived.by(() => {
		const arr = processedContent.map(() => -1)
		let li = 0
		for (const [i, element] of processedContent.entries()) {
			if (element.link) arr[i] = li++
		}
		return arr
	})

	onDestroy(() => {
		panelState.pointerLock = false
		headerFx.mat.userData.refCount--
		textFx.mat.userData.refCount--
		closeFx.mat.userData.refCount--
		linkFx.mat.userData.refCount--
		for (const fx of linkFxPool) fx.mat.userData.refCount--
	})

	const UP = '▵'
	const DOWN = '▿'
</script>

<T.Group position={[0, globalOffset, 1]}>
	<!-- Background -->
	<T.Mesh scale={[panelW, panelH, 1]} onpointerenter={enterPanel} onpointerleave={leavePanel}>
		<T.PlaneGeometry args={[1, 1]} />
		<T
			is={GridHelperXY}
			position.z={0.01}
			scale={[1, 1, 1]}
			args={[1, 1, panelCols, panelRows, gridColor]}
		/>
		<T.MeshBasicMaterial color={BG_COLOR} transparent opacity={BG_OPACITY} depthWrite={false} />
	</T.Mesh>

	<!-- CLOSE button top-right -->
	{@const closeLabel = 'CLOSE'}
	{@const closeX = panelW / 2 - closeLabel.length * charW - charW * 2}
	{@const closeY = -panelH / 2 - textMid + rowH}
	<T.Group position={[closeX, closeY, 0.02]}>
		<GeoText cache material={closeFx.mat} text={closeLabel} size={textSize} />
		<T.Mesh
			position.x={(closeLabel.length * charW) / 2}
			position.y={textSize * 0.4}
			scale={[closeLabel.length * charW, rowH, 0.1]}
			onclick={() => close?.()}
			onpointerenter={() => {
				closeFx.impactT.value = 0.3
			}}
			onpointerleave={() => {
				closeFx.impactT.value = 0
			}}
		>
			<T.BoxGeometry args={[1, 1, 1]} />
			<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
		</T.Mesh>
	</T.Group>

	<!-- Content rows -->
	{#each visibleContent as row, vi (vi)}
		{@const ry = panelH / 2 - textMid - (vi + 1) * rowH}
		{@const startIdx = Math.floor(scrollOffset)}
		{@const contentIdx = startIdx + vi}
		{@const lIdx = linkIndices[contentIdx]}
		{@const lFx = lIdx >= 0 ? linkFxPool[lIdx % MAX_LINKS] : null}
		{@const mat = row.header ? headerFx.mat : lFx ? lFx.mat : textFx.mat}
		{#if row.text}
			<T.Group position={[-panelW / 2 + charW * 2, ry, 0.02]}>
				<GeoText cache material={mat} text={row.text} size={textSize} />
				{#if row.link && lFx}
					{@const hitW = row.text.length * charW + charW}
					<T.Mesh
						position.x={hitW / 2}
						position.y={textSize * 0.4}
						scale={[hitW, rowH, 0.1]}
						onclick={() => window.open(row.link, '_blank')}
						onpointerenter={() => {
							lFx.impactT.value = 0.03
						}}
						onpointerleave={() => {
							lFx.impactT.value = 0
						}}
					>
						<T.BoxGeometry args={[1, 1, 1]} />
						<T.MeshBasicMaterial transparent opacity={DUMMY_OPACITY} depthWrite={false} />
					</T.Mesh>
				{/if}
			</T.Group>
		{/if}
	{/each}

	<!-- Scroll indicators -->
	{#if canScrollUp}
		<T.Group position={[-panelW / 2 + charW * 2, -panelH / 2 + rowH - textMid, 0]}>
			<GeoText cache material={textFx.mat} text={UP} size={textSize} />
		</T.Group>
	{/if}
	{#if canScrollDown}
		<T.Group position={[-panelW / 2 + charW * 4, -panelH / 2 + rowH - textMid, 0.03]}>
			<GeoText cache material={textFx.mat} text={DOWN} size={textSize} />
		</T.Group>
	{/if}
</T.Group>
