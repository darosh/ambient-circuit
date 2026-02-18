<script lang="ts">
	import { T } from '@threlte/core'
	import type { AudioEngine, AnalyzerType } from '../lib/audio/types'
	import type { Vector3Tuple } from 'three'
	import { Vector3, LineCurve3, CubicBezierCurve3 } from 'three'
	import VUMeterView from './VUMeterView.svelte'
	import { MathUtils } from 'three/webgpu'
	import { audioLayout, type NodeInfo } from '../lib/audio-layout'
	import TubeText from './TubeText.svelte'

	let {
		engine,
		offset = [0, 0, 0],
		visible = true,
		curved = true
	}: {
		engine: AudioEngine
		offset?: Vector3Tuple
		visible?: boolean
		curved?: boolean
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
					<T.MeshStandardMaterial color="#000000" emissive="#ffffff" emissiveIntensity={0.9} />
				{:else}
					<T.ConeGeometry args={[NODE_RADIUS, NODE_LENGTH, 8]} />
					<T.MeshStandardMaterial
						opacity={0.5}
						color="#000000"
						emissive="#ffffff"
						emissiveIntensity={0.9}
					/>
				{/if}
				<T.Group rotation.y={DEG_90} rotation.z={Math.PI} position.z=".2" position.y=".06">
					<TubeText
						fx={true}
						id={node.label}
						text={node.label.toUpperCase()}
						color="#ffffff"
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
				<T.MeshStandardMaterial emissive="#aaaaaa" emissiveIntensity={0.8} />
			</T.Mesh>
		{/each}

		<!-- VU Meters -->
		{#each layout.analyzerInfos as info, ai (ai)}
			<T.Group position={info.pos} rotation.x={DEG_90}>
				<!--				<Billboard>-->
				<VUMeterView
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
