<script lang="ts">
	import { T } from '@threlte/core'
	import type { AudioEngine, AnalyzerType } from '../lib/audio/types'
	import type { Vector3Tuple } from 'three'
	import { Vector3, LineCurve3 } from 'three'
	import { cfgName } from '../lib/audio/engine'
	import VUMeterView from './VUMeterView.svelte'

	let {
		engine,
		offset = [0, 0, 0],
		visible = true
	}: {
		engine: AudioEngine
		offset?: Vector3Tuple
		visible?: boolean
	} = $props()

	const ROW_SPACING = 2
	const COL_SPACING = 1.5
	const NODE_SPACING = 0.8
	const NODE_RADIUS = 0.15
	const TUBE_RADIUS = 0.02
	const TUBE_SEGMENTS = 8

	type NodeInfo = { x: number; y: number; z: number; label: string; isGenerator: boolean }
	type TubeInfo = { from: Vector3; to: Vector3; color: string }

	// Derive layout from engine state
	const layout = $derived.by(() => {
		const chains = engine.instanceChains
		const buses = engine.buses
		const master = engine.masterChain

		const nodes: NodeInfo[] = []
		const tubes: TubeInfo[] = []
		const chainEndpoints: { pos: Vector3; bus?: string }[] = []

		// Row 0: instrument chains
		for (let ci = 0; ci < chains.length; ci++) {
			const chain = chains[ci]
			const cx = (ci - (chains.length - 1) / 2) * COL_SPACING
			const cz = 0
			let nz = 0

			// Generator node
			if (chain.generator) {
				nodes.push({
					x: cx,
					y: 0,
					z: cz + nz,
					label: cfgName(chain.config.generator) ?? 'gen',
					isGenerator: true
				})
				const prevZ = nz
				nz += NODE_SPACING

				// Tube from generator to first fx (or end)
				if (chain.fx.length > 0) {
					tubes.push({
						from: new Vector3(cx, 0, cz + prevZ),
						to: new Vector3(cx, 0, cz + nz),
						color: '#666666'
					})
				}
			}

			// FX nodes
			for (let fi = 0; fi < chain.fx.length; fi++) {
				nodes.push({
					x: cx,
					y: 0,
					z: cz + nz,
					label: cfgName(chain.config.fx?.[fi]) ?? 'fx',
					isGenerator: false
				})
				const prevZ = nz
				nz += NODE_SPACING

				if (fi < chain.fx.length - 1) {
					tubes.push({
						from: new Vector3(cx, 0, cz + prevZ),
						to: new Vector3(cx, 0, cz + nz),
						color: '#666666'
					})
				}
			}

			chainEndpoints.push({
				pos: new Vector3(cx, 0, cz + nz - NODE_SPACING),
				bus: chain.config.bus
			})
		}

		// Row 1: buses
		const busEntries = Array.from(buses.entries())
		const busPositions: Record<string, Vector3> = {}
		for (let bi = 0; bi < busEntries.length; bi++) {
			const [name, bus] = busEntries[bi]
			const bx = (bi - (busEntries.length - 1) / 2) * COL_SPACING
			const bz = ROW_SPACING
			let nz = 0

			// Input point
			const inputPos = new Vector3(bx, 0, bz)
			busPositions[name] = inputPos

			// FX nodes
			for (let fi = 0; fi < bus.fx.length; fi++) {
				nodes.push({
					x: bx,
					y: 0,
					z: bz + nz,
					label: cfgName(bus.config.fx?.[fi]) ?? 'fx',
					isGenerator: false
				})
				const prevZ = nz
				nz += NODE_SPACING

				if (fi > 0) {
					tubes.push({
						from: new Vector3(bx, 0, bz + prevZ - NODE_SPACING),
						to: new Vector3(bx, 0, bz + prevZ),
						color: '#446688'
					})
				}
			}
		}

		// Row 2: master chain
		const masterPos = new Vector3(0, 0, ROW_SPACING * 2)
		if (master) {
			let nz = 0
			for (let fi = 0; fi < master.fx.length; fi++) {
				nodes.push({
					x: 0,
					y: 0,
					z: ROW_SPACING * 2 + nz,
					label: cfgName(master.config.fx?.[fi]) ?? 'fx',
					isGenerator: false
				})
				if (fi > 0) {
					tubes.push({
						from: new Vector3(0, 0, ROW_SPACING * 2 + nz - NODE_SPACING),
						to: new Vector3(0, 0, ROW_SPACING * 2 + nz),
						color: '#884444'
					})
				}
				nz += NODE_SPACING
			}
		}

		// Connection tubes: chain → bus or master
		for (const ep of chainEndpoints) {
			const target = ep.bus && busPositions[ep.bus] ? busPositions[ep.bus] : masterPos
			tubes.push({
				from: ep.pos,
				to: target,
				color: '#444444'
			})
		}

		// Bus → master tubes
		for (const pos of Object.values(busPositions)) {
			tubes.push({
				from: new Vector3(
					pos.x,
					0,
					pos.z + (buses.values().next().value?.fx.length ?? 1) * NODE_SPACING - NODE_SPACING
				),
				to: masterPos,
				color: '#664444'
			})
		}

		// Analyzer info for VU meters
		function resolveAnalyzerType(cfg: AnalyzerType | undefined): 'fft' | 'waveform' | 'meter' {
			if (cfg === 'meter') return 'meter'
			if (cfg === 'waveform') return 'waveform'
			return 'fft' // true and 'fft' both create FFT analyzer
		}
		const analyzerInfos: {
			analyzer: import('tone').ToneAudioNode
			pos: Vector3Tuple
			type: 'fft' | 'waveform' | 'meter'
		}[] = []
		for (let ci = 0; ci < chains.length; ci++) {
			const chain = chains[ci]
			if (chain.analyzer) {
				const cx = (ci - (chains.length - 1) / 2) * COL_SPACING
				analyzerInfos.push({
					analyzer: chain.analyzer,
					pos: [cx, 0.4, 0],
					type: resolveAnalyzerType(chain.config.analyzer)
				})
			}
		}
		for (const [, bus] of buses) {
			if (bus.analyzer) {
				analyzerInfos.push({
					analyzer: bus.analyzer,
					pos: [0, 0.4, ROW_SPACING],
					type: resolveAnalyzerType(bus.config.analyzer)
				})
			}
		}
		if (master?.analyzer) {
			analyzerInfos.push({
				analyzer: master.analyzer,
				pos: [0, 0.4, ROW_SPACING * 2],
				type: resolveAnalyzerType(master.config.analyzer)
			})
		}

		return { nodes, tubes, analyzerInfos }
	})
</script>

{#if visible}
	<T.Group position.x={offset[0]} position.y={offset[1]} position.z={offset[2]}>
		<!-- Nodes -->
		{#each layout.nodes as node, ni (ni)}
			<T.Mesh position.x={node.x} position.y={node.y} position.z={node.z}>
				{#if node.isGenerator}
					<T.CylinderGeometry args={[NODE_RADIUS, NODE_RADIUS, 0.3, 8]} />
					<T.MeshStandardMaterial color="#4488ff" emissive="#224488" emissiveIntensity={0.3} />
				{:else}
					<T.ConeGeometry args={[NODE_RADIUS, 0.3, 8]} />
					<T.MeshStandardMaterial color="#ff8844" emissive="#884422" emissiveIntensity={0.3} />
				{/if}
			</T.Mesh>
		{/each}

		<!-- Connection tubes -->
		{#each layout.tubes as tube, ti (ti)}
			{@const curve = new LineCurve3(tube.from, tube.to)}
			<T.Mesh>
				<T.TubeGeometry args={[curve, TUBE_SEGMENTS, TUBE_RADIUS, 4, false]} />
				<T.MeshStandardMaterial color={tube.color} />
			</T.Mesh>
		{/each}

		<!-- VU Meters -->
		{#each layout.analyzerInfos as info, ai (ai)}
			<VUMeterView analyzer={info.analyzer} position={info.pos} type={info.type} />
		{/each}
	</T.Group>
{/if}
