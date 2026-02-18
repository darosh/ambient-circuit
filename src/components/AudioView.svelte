<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import type { AudioEngine, AnalyzerType } from '../lib/audio'
	import { Color, type HSL, type Vector3Tuple } from 'three/webgpu'
	import { Vector3, LineCurve3, CubicBezierCurve3, MeshStandardMaterial } from 'three/webgpu'
	import AnalyserView from './AnalyserView.svelte'
	import { MathUtils } from 'three/webgpu'
	import { audioLayout, type NodeInfo } from '../lib/audio-layout'
	import TubeText from './TubeText.svelte'
	import { easeInQuart, easeOutQuart } from '../lib/easing'

	let {
		engine,
		offset = [0, 0, 0],
		visible = true,
		curved = true,
		baseColor = '#ddddff'
	}: {
		engine: AudioEngine
		offset?: Vector3Tuple
		visible?: boolean
		curved?: boolean
		baseColor?: string
	} = $props()

	const LAYER_GAP = 1 // spacing row between layers
	const COL_SPACING = 1
	const NODE_SPACING = 0.5
	const NODE_RADIUS = 0.1
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
	const COLOR_DURATION = 0.75
	const BASE_INTENSITY = 0.9
	const PEAK_INTENSITY = 2.0
	let nodeMaterials: MeshStandardMaterial[] = $state([])
	const animTimes: number[] = []
	const startColors: HSL[] = []

	const baseHsl = $derived.by(() => {
		const hsl = <HSL>(<unknown>{})
		new Color(baseColor).getHSL(hsl)
		return hsl
	})

	useTask((delta) => {
		const nodes = layout.nodes
		for (let ni = 0; ni < nodes.length; ni++) {
			const chain = nodes[ni].chain
			if (!chain) continue
			const mat = nodeMaterials[ni]
			if (!mat) continue
			const sig = chain.audioSignal

			if (sig.intensity > 0) {
				animTimes[ni] = FLASH_DURATION
				mat.emissive.set(sig.color)
				sig.intensity = 0
				startColors[ni] = <HSL>{}
				new Color(sig.color).getHSL(<HSL>(<unknown>startColors[ni]))
			}

			if (animTimes[ni] > 0) {
				animTimes[ni] = Math.max(0, animTimes[ni] - delta)
				const t = animTimes[ni] / FLASH_DURATION
				mat.emissiveIntensity = BASE_INTENSITY + easeOutQuart(t) * (PEAK_INTENSITY - BASE_INTENSITY)
				const sc: HSL = startColors[ni]

				const tt = t > COLOR_DURATION ? 0 : 1 - t / COLOR_DURATION
				const l = sc.l + easeInQuart(tt) * (baseHsl.l - sc.l)
				const nc = new Color().setHSL(sc.h, sc.s, l)

				mat.emissive.set(nc.getHex())

				if (animTimes[ni] === 0) {
					mat.emissiveIntensity = BASE_INTENSITY
					mat.emissive.set(baseColor)
				}
			}
		}
	})

	// Derive layout from engine state
	const layout = $derived.by(() => {
		const chains = engine.instanceChains
		const buses = engine.buses
		const master = engine.masterChain

		const nodes: NodeInfo[] = audioLayout(
			chains,
			buses,
			master,
			NODE_SPACING,
			LAYER_GAP,
			COL_SPACING
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

		// Analyzer info for VU meters
		function resolveAnalyzerType(cfg: AnalyzerType | undefined): 'fft' | 'waveform' | 'meter' {
			if (cfg === 'meter') return 'meter'
			if (cfg === 'waveform') return 'waveform'
			return 'fft' // true and 'fft' both create FFT analyzer
		}

		const analyzerInfos: {
			analyzer: import('tone').ToneAudioNode
			pos: Vector3Tuple
			height: number
			type: 'fft' | 'waveform' | 'meter'
		}[] = nodes
			.filter((n) => (n.bus || n.chain || n.master)?.analyzer)
			.map((n) => ({
				analyzer: <import('tone').ToneAudioNode>(n?.chain || n?.bus || n?.master)!.analyzer,
				pos: [n.x + COL_SPACING / 2, n.y, n.z - NODE_LENGTH / 2],
				height: METER_HEIGHT,
				type: resolveAnalyzerType(
					<AnalyzerType>(<unknown>(n?.chain || n?.bus || n?.master)!.config.analyzer!)
				)
			}))

		return { nodes, tubes, analyzerInfos }
	})
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
				{#if node.isGenerator}
					<T.CylinderGeometry args={[NODE_RADIUS, NODE_RADIUS, NODE_LENGTH, 8]} />
					<T.MeshStandardMaterial
						bind:ref={nodeMaterials[ni]}
						color="#000000"
						emissive={baseColor}
						emissiveIntensity={0.9}
					/>
				{:else}
					<T.ConeGeometry args={[NODE_RADIUS, NODE_LENGTH, 8]} />
					<T.MeshStandardMaterial
						bind:ref={nodeMaterials[ni]}
						opacity={0.5}
						color="#000000"
						emissive={baseColor}
						emissiveIntensity={0.9}
					/>
				{/if}
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
		{#each layout.analyzerInfos as info, ai (ai)}
			<T.Group position={info.pos} rotation.x={DEG_90}>
				<!--				<Billboard>-->
				<AnalyserView
					baseColor={baseColor}
					analyzer={info.analyzer}
					type={info.type}
					height={info.height}
					width={METER_WIDTH}
				/>
				<!--				</Billboard>-->
			</T.Group>
		{/each}
	</T.Group>
{/if}
