<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import type { AudioEngine, AnalyzerType } from '../lib/audio'
	import { type Vector3Tuple } from 'three/webgpu'
	import { Vector3, LineCurve3, CubicBezierCurve3, MeshStandardMaterial } from 'three/webgpu'
	import AnalyserView from './AnalyserView.svelte'
	import { MathUtils } from 'three/webgpu'
	import { audioLayout } from '../lib/components/audio-view/audio-layout'
	import TubeText from './TubeText.svelte'
	import { resolveAnalyzerType } from '../lib/audio/engine'
	import { buildImpactMaterial } from '../lib/video/material-impact'

	const NODE_RADIUS = 0.1

	let {
		engine,
		offset = [0, 0, 0],
		visible = true,
		curved = true,
		baseColor = '#ffffff',
		showText = false,
		showAnalysers = false,
		showAllNodes = false,
		module = NODE_RADIUS,
		defaultAnalyser
	}: {
		engine: AudioEngine
		offset?: Vector3Tuple
		visible?: boolean
		curved?: boolean
		baseColor?: string
		showText?: boolean
		showAnalysers?: boolean
		showAllNodes?: boolean
		module?: number
		defaultAnalyser?: string
	} = $props()

	const LAYER_GAP = 0.5 // spacing row between layers
	const COL_SPACING = 1
	const NODE_SPACING = 0.5
	const NODE_LENGTH = 0.2
	const METER_HEIGHT = 0.5
	const METER_WIDTH = 0.5
	const TUBE_RADIUS = 0.025
	const TUBE_SEGMENTS_STRAIGHT = 1
	const TUBE_SEGMENTS_CURVED = 32
	const CURVE_TANGENT = 0.5
	const DEG_90 = MathUtils.DEG2RAD * 90
	const LINE_SHIFT = new Vector3(0, 0, NODE_LENGTH / 2)

	type TubeInfo = { from: Vector3; to: Vector3; color?: string; crossColumn?: boolean }

	const FLASH_DURATION = 0.5

	let fxArr: ReturnType<typeof buildImpactMaterial>[] = $state([])
	const animTimes: number[] = []
	let analyzerMaterial = $state<MeshStandardMaterial | undefined>()

	$effect(() => {
		if (analyzerMaterial) {
			analyzerMaterial?.color.set(baseColor)
			analyzerMaterial?.emissive.set(baseColor)
		} else {
			analyzerMaterial = new MeshStandardMaterial({
				color: baseColor,
				emissive: baseColor,
				emissiveIntensity: 0.5
			})
		}

		return () => {
			analyzerMaterial?.dispose()
		}
	})

	// Derive layout from engine state
	const layout = $derived.by(() => {
		const chains = engine.instanceChains
		const buses = engine.buses
		const master = engine.masterChain
		const nodes = audioLayout(
			chains,
			buses,
			master,
			NODE_SPACING,
			LAYER_GAP,
			COL_SPACING,
			showAllNodes
		)

		const tubes: TubeInfo[] = nodes
			.filter((node) => node.next)
			.map((node) => {
				const next = nodes[node.next!]
				const from = new Vector3(node.x, node.y, node.z).add(LINE_SHIFT)
				const to = new Vector3(next.x, next.y, next.z).sub(LINE_SHIFT)

				return {
					from,
					to,
					crossColumn: from.x !== to.x || from.y !== to.y
				}
			})

		return { nodes, tubes }
	})

	// Create/dispose materials when layout changes
	$effect(() => {
		const nodes = layout.nodes
		const newFx = nodes.map(() => buildImpactMaterial(baseColor, baseColor, 1))
		fxArr = newFx
		return () => {
			for (const fx of newFx) fx.mat.dispose()
		}
	})

	// Update base color uniform when prop changes
	$effect(() => {
		for (const fx of fxArr) {
			fx.emissiveColor.value.set(baseColor)
		}
	})

	useTask((delta) => {
		const nodes = layout.nodes
		for (const [ni, node] of nodes.entries()) {
			const chain = node.chain
			if (!chain) continue
			const fx = fxArr[ni]
			if (!fx) continue
			const sig = chain.audioSignal

			if (sig.intensity > 0) {
				animTimes[ni] = FLASH_DURATION
				fx.impactColor.value.set(sig.color)
				sig.intensity = 0
			}

			if (animTimes[ni] > 0) {
				animTimes[ni] = Math.max(0, animTimes[ni] - delta)
				fx.impactT.value = animTimes[ni] / FLASH_DURATION
			}
		}
	})

	export function getNodes() {
		return layout.nodes
	}

	// Analyzer info for VU meters
	const analyzerInfos: {
		analyzer: import('tone').ToneAudioNode
		pos: Vector3Tuple
		height: number
		type: 'fft' | 'waveform' | 'meter'
	}[] = $derived(
		layout.nodes
			.filter((n) => (n.bus || n.chain || n.master)?.analyzer)
			.map((n) => ({
				analyzer: <import('tone').ToneAudioNode>(n?.chain || n?.bus || n?.master)!.analyzer,
				pos: [n.x + COL_SPACING / 2, n.y, n.z - NODE_LENGTH / 2],
				height: METER_HEIGHT,
				type: resolveAnalyzerType(
					<AnalyzerType>(<unknown>(n?.chain || n?.bus || n?.master)!.config.analyzer!),
					defaultAnalyser
				)
			}))
	)
</script>

{#if visible}
	<T.Group
		position.x={offset[0]}
		position.y={offset[1] + 4}
		position.z={offset[2]}
		rotation.x={-DEG_90}
	>
		<!-- Nodes -->
		{#each layout.nodes as node, ni (ni)}
			<T.Mesh position.x={node.x} position.y={node.y} position.z={node.z} rotation.x={-DEG_90}>
				<T.SphereGeometry args={[module, Math.round(module * 160), Math.round(module * 80)]} />
				{#if fxArr[ni]}
					<T is={fxArr[ni].mat} />
				{/if}
				{#if showText}
					<T.Group rotation.y={DEG_90} rotation.z={Math.PI} position.z=".2" position.y=".06">
						<TubeText
							fx={true}
							id={node.label}
							text={node.label.toUpperCase()}
							color={baseColor}
							size={0.14}
							width={2}
							spacing={1.25}
						/>
					</T.Group>
				{/if}
			</T.Mesh>
		{/each}

		<!-- Connection tubes -->
		{#each layout.tubes as tube, ti (ti)}
			{@const useCurve = curved && tube.crossColumn}
			{@const dz = tube.to.z - tube.from.z}
			{@const curve = useCurve
				? new CubicBezierCurve3(
						tube.from,
						new Vector3(tube.from.x, 0, tube.from.z + dz * CURVE_TANGENT),
						new Vector3(tube.to.x, 0, tube.to.z - dz * CURVE_TANGENT),
						tube.to
					)
				: new LineCurve3(tube.from, tube.to)}
			<T.Mesh>
				<T.TubeGeometry
					args={[
						curve,
						useCurve ? TUBE_SEGMENTS_CURVED : TUBE_SEGMENTS_STRAIGHT,
						TUBE_RADIUS,
						4,
						false
					]}
				/>
				<T.MeshStandardMaterial
					opacity={0.5}
					transparent
					emissive={baseColor}
					emissiveIntensity={1.6}
				/>
			</T.Mesh>
		{/each}

		<!-- VU Meters -->
		{#if showAnalysers && analyzerInfos}
			{#each analyzerInfos as info, ai (ai)}
				<T.Group position={info.pos} rotation.x={DEG_90}>
					<!--				<Billboard>-->
					<AnalyserView
						material={analyzerMaterial}
						analyzer={info.analyzer}
						type={info.type}
						height={info.height}
						width={METER_WIDTH}
					/>
					<!--				</Billboard>-->
				</T.Group>
			{/each}
		{/if}
	</T.Group>
{/if}
