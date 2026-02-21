<script lang="ts">
	import { extend, T, useTask } from '@threlte/core'
	import { useViewport } from '@threlte/extras'
	import type { AudioEngine, AudioChain } from '../lib/audio'
	import { resolveAnalyzerType, getChainLabel } from '../lib/audio/engine'
	import { buildImpactMaterial } from '../lib/video/material-impact'
	import AnalyserView from './AnalyserView.svelte'
	import { Color, MeshStandardNodeMaterial, MeshStandardMaterial } from 'three/webgpu'
	import TubeText from './TubeText.svelte'

	extend({ MeshStandardNodeMaterial, MeshStandardMaterial })

	let {
		engine,
		defaultAnalyser,
		baseColor = '#ffffff'
	}: {
		engine: AudioEngine | null
		defaultAnalyser: string | undefined
		baseColor: string
	} = $props()

	const viewport = useViewport()

	const MIN_SPHERE_R = 0.08
	const BASE_SPHERE_R = 0.2
	const FLASH_DURATION = 0.8

	type RowState = {
		chain: AudioChain
		fx: ReturnType<typeof buildImpactMaterial>
		animTime: number
		lastSeen: number
	}

	// Non-reactive animation state (mutated in useTask, not read by template)
	let rowStates: RowState[] = []
	let prevChainRefs: AudioChain[] = []

	// Reactive labels + flash state (written from useTask via assignment)
	let labels = $state<string[]>([])
	let flashing = $state<boolean[]>([])
	// Reactive rows for template (rebuilt on chain change)
	let rows = $state<{ chain: AudioChain; fx: ReturnType<typeof buildImpactMaterial> }[]>([])

	// Adaptive layout
	const rowCount = $derived(rows.length)
	const availHeight = $derived($viewport.height - 1)
	const sphereR = $derived(Math.max(MIN_SPHERE_R, Math.min(BASE_SPHERE_R, availHeight / rowCount)))
	const rowSpacing = $derived(sphereR * 2 + 0.25)

	// Poll for chain changes
	useTask(() => {
		if (!engine) {
			if (rowStates.length > 0) {
				rowStates = []
				prevChainRefs = []
				rows = []
				labels = []
				flashing = []
			}
			return
		}
		const chains = engine.instanceChains.filter((c) => c.generator)
		let changed = chains.length !== prevChainRefs.length
		if (!changed) {
			for (let i = 0; i < chains.length; i++) {
				if (chains[i] !== prevChainRefs[i]) {
					changed = true
					break
				}
			}
		}
		if (changed) {
			prevChainRefs = chains
			const nextStates: RowState[] = []
			const nextRows: typeof rows = []
			const nextLabels: string[] = []
			const nextFlashing: boolean[] = []
			for (let i = 0; i < chains.length; i++) {
				const fx = buildImpactMaterial(baseColor, baseColor, 0.5, true, 0.9, 0.5, 2)
				nextStates.push({ chain: chains[i], fx, animTime: 0, lastSeen: 0 })
				nextRows.push({ chain: chains[i], fx })
				nextLabels.push('_')
				nextFlashing.push(false)
			}
			rowStates = nextStates
			rows = nextRows
			labels = nextLabels
			flashing = nextFlashing
		}
	})

	// Animation + label update
	useTask((delta) => {
		let labelsChanged = false
		let flashChanged = false
		for (let i = 0; i < rowStates.length; i++) {
			const s = rowStates[i]
			const chain = s.chain

			if (chain.lastTrigger > s.lastSeen) {
				s.lastSeen = chain.lastTrigger
				s.animTime = FLASH_DURATION
				s.fx.impactColor.value = new Color(chain.audioSignal.color)
				const newLabel = getChainLabel(chain) || '*'
				if (labels[i] !== newLabel) {
					labels[i] = newLabel
					labelsChanged = true
				}
			}

			const wasFlashing = flashing[i]
			if (s.animTime > 0) {
				s.animTime = Math.max(0, s.animTime - delta)
				s.fx.impactT.value = s.animTime / FLASH_DURATION
				if (!wasFlashing) {
					flashing[i] = true
					flashChanged = true
				}
			} else if (wasFlashing) {
				flashing[i] = false
				flashChanged = true
			}
		}
		if (labelsChanged) labels = [...labels]
		if (flashChanged) flashing = [...flashing]
	})
</script>

<T.OrthographicCamera makeDefault zoom={80} position={[0, 0, 10]} />

{#each rows as row, i (i)}
	{@const x = -$viewport.width / 2 + sphereR * 2}
	{@const y = $viewport.height / 2 - sphereR * 2.5 - i * rowSpacing}
	{@const analyzerType = resolveAnalyzerType(row.chain.config.analyzer, defaultAnalyser)}
	{@const label = labels[i] ?? ''}

	<!-- Impact sphere -->
	<!--	<T.Mesh position={[x - sp, y, 0]} material={row.fx.mat}>-->
	<!--		<T.SphereGeometry args={[sphereR / 4]} />-->
	<!--	</T.Mesh>-->

	<!-- Note/chord label -->
	{#if label}
		{#key label}
			<T.Group position={[x, y - sphereR / 2, 0]}>
				<TubeText
					fx={true}
					material={row.fx.mat}
					id={`hud-${i}`}
					text={label.toUpperCase()}
					color={baseColor}
					spacing={2}
					size={sphereR}
					width={4}
				/>
				<!--			<Suspense>-->
				<!--					<T.Mesh material={row.fx.mat}>-->
				<!--						<Text3DGeometry size={sphereR} text={label.toUpperCase()} />-->
				<!--					</T.Mesh>-->
				<!--			</Suspense>-->
			</T.Group>
		{/key}
	{/if}

	{#if row.chain.analyzer}
		<AnalyserView
			material={row.fx.mat}
			analyzer={row.chain.analyzer}
			type={analyzerType}
			height={sphereR * 2}
			width={sphereR * 2}
			position={[
				x + sphereR * 4 + Math.max(label.length - 2, 0) * sphereR * 0.8,
				y - sphereR / 2,
				0
			]}
			{baseColor}
		/>
	{/if}
{/each}
