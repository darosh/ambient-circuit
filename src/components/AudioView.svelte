<script lang="ts">
	import { T } from '@threlte/core'
	import type { AudioEngine, AnalyzerType } from '../lib/audio/types'
	import type { Vector3Tuple } from 'three'
	import { Vector3, LineCurve3 } from 'three'
	import { cfgName } from '../lib/audio/engine'
	import VUMeterView from './VUMeterView.svelte'
	import { MathUtils } from 'three/webgpu'

	let {
		engine,
		offset = [0, 0, 0],
		visible = true
	}: {
		engine: AudioEngine
		offset?: Vector3Tuple
		visible?: boolean
	} = $props()

	const LAYER_GAP = 1 // spacing row between layers
	const COL_SPACING = 1
	const NODE_SPACING = 0.25
	const NODE_RADIUS = 0.1
	const NODE_LENGTH = 0.2
	const METER_HEIGHT = 0.5
	const METER_WIDTH = 0.5
	const TUBE_RADIUS = 0.01
	const TUBE_SEGMENTS = 1
	const DEG_90 = MathUtils.DEG2RAD * 90
	const LINE_SHIFT = new Vector3(0, 0, NODE_LENGTH / 2)

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

		// Compute instrument layer depth (max nodes across all chains)
		let maxChainNodes = 0
		for (const chain of chains) {
			let count = 0
			if (chain.generator) count++
			count += chain.fx.length
			if (count > maxChainNodes) maxChainNodes = count
		}
		const instrLayerDepth = maxChainNodes * NODE_SPACING

		// Bus layer start
		const busEntries = Array.from(buses.entries())
		const hasBuses = busEntries.length > 0
		const busLayerZ = instrLayerDepth + LAYER_GAP

		// Compute bus layer depth
		let maxBusNodes = 0
		for (const [, bus] of busEntries) {
			if (bus.fx.length > maxBusNodes) maxBusNodes = bus.fx.length
		}
		const busLayerDepth = maxBusNodes * NODE_SPACING

		// Master layer start
		const masterLayerZ = hasBuses ? busLayerZ + busLayerDepth + LAYER_GAP : busLayerZ // no buses → master right after instrument gap

		// Instrument chains
		for (let ci = 0; ci < chains.length; ci++) {
			const chain = chains[ci]
			const cx = (ci - (chains.length - 1) / 2) * COL_SPACING
			let nz = 0

			if (chain.generator) {
				nodes.push({
					x: cx,
					y: 0,
					z: nz,
					label: cfgName(chain.config.generator) ?? 'gen',
					isGenerator: true
				})
				const prevZ = nz
				nz += NODE_SPACING
				if (chain.fx.length > 0) {
					tubes.push({
						from: new Vector3(cx, 0, prevZ),
						to: new Vector3(cx, 0, nz),
						color: '#00ff00'
					})
				}
			}

			for (let fi = 0; fi < chain.fx.length; fi++) {
				nodes.push({
					x: cx,
					y: 0,
					z: nz,
					label: cfgName(chain.config.fx?.[fi]) ?? 'fx',
					isGenerator: false
				})
				const prevZ = nz
				nz += NODE_SPACING
				if (fi < chain.fx.length - 1) {
					tubes.push({
						from: new Vector3(cx, 0, prevZ),
						to: new Vector3(cx, 0, nz),
						color: '#FF0000'
					})
				}
			}

			chainEndpoints.push({
				pos: new Vector3(cx, 0, nz - NODE_SPACING),
				bus: chain.config.bus
			})
		}

		// Buses
		const busPositions: Record<string, Vector3> = {}
		const busEndPositions: Record<string, Vector3> = {}
		for (let bi = 0; bi < busEntries.length; bi++) {
			const [name, bus] = busEntries[bi]
			const bx = (bi - (busEntries.length - 1) / 2) * COL_SPACING
			let nz = 0

			busPositions[name] = new Vector3(bx, 0, busLayerZ)

			for (let fi = 0; fi < bus.fx.length; fi++) {
				nodes.push({
					x: bx,
					y: 0,
					z: busLayerZ + nz,
					label: cfgName(bus.config.fx?.[fi]) ?? 'fx',
					isGenerator: false
				})
				if (fi > 0) {
					tubes.push({
						from: new Vector3(bx, 0, busLayerZ + nz - NODE_SPACING),
						to: new Vector3(bx, 0, busLayerZ + nz),
						color: '#0000ff'
					})
				}
				nz += NODE_SPACING
			}
			busEndPositions[name] = new Vector3(bx, 0, busLayerZ + nz - NODE_SPACING)
		}

		// Master chain
		const masterPos = new Vector3(0, 0, masterLayerZ)
		if (master) {
			let nz = 0
			for (let fi = 0; fi < master.fx.length; fi++) {
				nodes.push({
					x: 0,
					y: 0,
					z: masterLayerZ + nz,
					label: cfgName(master.config.fx?.[fi]) ?? 'fx',
					isGenerator: false
				})
				if (fi > 0) {
					tubes.push({
						from: new Vector3(0, 0, masterLayerZ + nz - NODE_SPACING),
						to: new Vector3(0, 0, masterLayerZ + nz),
						color: '#ffff00'
					})
				}
				nz += NODE_SPACING
			}
		}

		// Connection tubes: chain → bus or master
		for (const ep of chainEndpoints) {
			if (ep.bus && busPositions[ep.bus]) {
				// Chain → bus
				tubes.push({
					from: ep.pos.clone().add(LINE_SHIFT),
					to: busPositions[ep.bus].clone().sub(LINE_SHIFT),
					color: '#ff00ff'
				})
			} else {
				// Chain → master (no bus): straight down to bus layer end, then to master
				if (hasBuses) {
					// Add straight segment through bus layer
					const straightEnd = new Vector3(ep.pos.x, 0, busLayerZ + busLayerDepth)
					tubes.push({
						from: ep.pos,
						to: straightEnd,
						color: '#00ffff'
					})
					tubes.push({
						from: straightEnd,
						to: masterPos.clone().sub(LINE_SHIFT),
						color: '#00ffff'
					})
				} else {
					tubes.push({
						from: ep.pos,
						to: masterPos,
						color: '#444444'
					})
				}
			}
		}

		// Bus → master tubes
		for (const name of Object.keys(busEndPositions)) {
			tubes.push({
				from: busEndPositions[name],
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
			height: number
			type: 'fft' | 'waveform' | 'meter'
		}[] = []
		for (let ci = 0; ci < chains.length; ci++) {
			const chain = chains[ci]
			if (chain.analyzer) {
				const cx = (ci - (chains.length - 1) / 2) * COL_SPACING
				analyzerInfos.push({
					analyzer: chain.analyzer,
					pos: [cx + COL_SPACING / 2, 0, -NODE_LENGTH / 2],
					height: METER_HEIGHT,
					type: resolveAnalyzerType(chain.config.analyzer)
				})
			}
		}
		for (const [, bus] of buses) {
			if (bus.analyzer) {
				analyzerInfos.push({
					analyzer: bus.analyzer,
					pos: [COL_SPACING / 2, 0, busLayerZ - NODE_LENGTH / 2],
					height: METER_HEIGHT,
					type: resolveAnalyzerType(bus.config.analyzer)
				})
			}
		}
		if (master?.analyzer) {
			analyzerInfos.push({
				analyzer: master.analyzer,
				pos: [COL_SPACING / 2, 0, masterLayerZ],
				height: METER_HEIGHT,
				type: resolveAnalyzerType(master.config.analyzer)
			})
		}

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
			</T.Mesh>
		{/each}

		<!-- Connection tubes -->
		{#each layout.tubes as tube, ti (ti)}
			{@const curve = new LineCurve3(tube.from, tube.to)}
			<T.Mesh>
				<T.TubeGeometry args={[curve, TUBE_SEGMENTS, TUBE_RADIUS, 4, false]} />
				<T.MeshStandardMaterial opacity={0.5} emissive="#ffffff" emissiveIntensity={0.5} />
			</T.Mesh>
		{/each}

		<!-- VU Meters -->
		{#each layout.analyzerInfos as info, ai (ai)}
			<T.Group position={info.pos} rotation.x={DEG_90}>
				<VUMeterView
					analyzer={info.analyzer}
					type={info.type}
					height={info.height}
					width={METER_WIDTH}
				/>
			</T.Group>
		{/each}
	</T.Group>
{/if}
