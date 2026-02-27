import { Vector3 } from 'three/webgpu'
import { AudioBus, AudioChain } from './audio'
import { cfgName } from './audio/engine'

export type NodeInfo = {
	x: number
	y: number
	z: number
	label: string
	isGenerator: boolean
	bus?: AudioBus | null
	master?: AudioBus | null
	chain?: AudioChain
	next?: number | null
}

export function audioLayout(
	chains: AudioChain[],
	buses: Map<string, AudioBus>,
	master: AudioBus | null,
	NODE_SPACING: number,
	LAYER_GAP: number,
	COL_SPACING: number,
	showAllNodes: boolean
) {
	const nodes: NodeInfo[] = []

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
	const busEntries = [...buses.entries()]
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

	const instrumentNodes = chains.reduce((acc, chain) => {
		return acc + (chain.generator ? 1 : 0) + chain.fx.length
	}, 0)

	const busNodes = busEntries.reduce(
		(acc, [key, bus]) => {
			acc.map[key] = instrumentNodes + acc.total
			acc.total += bus.fx.length
			return acc
		},
		{ total: 0, map: <Record<string, number>>{} }
	)

	const masterNodes = master ? instrumentNodes + busNodes.total : undefined

	// Instrument chains
	for (let ci = 0; ci < chains.length; ci++) {
		const chain = chains[ci]
		const cx = (ci - (chains.length - 1) / 2) * COL_SPACING
		let nz = 0

		if (chain.generator) {
			nodes.push({
				chain,
				x: cx,
				y: 0,
				z: nz,
				label: cfgName(chain.config.generator) ?? 'gen',
				isGenerator: true,
				next: showAllNodes
					? chain.fx.length > 0
						? nodes.length + 1
						: chain.config.bus
							? busNodes.map[chain.config.bus]
							: masterNodes
					: undefined
			})
			nz += NODE_SPACING
		}

		if (!showAllNodes) continue

		for (let fi = 0; fi < chain.fx.length; fi++) {
			nodes.push({
				x: cx,
				y: 0,
				z: nz,
				label: cfgName(chain.config.fx?.[fi]) ?? 'fx',
				isGenerator: false,
				next:
					fi < chain.fx.length - 1
						? nodes.length + 1
						: chain.config.bus
							? busNodes.map[chain.config.bus]
							: masterNodes
			})
			nz += NODE_SPACING
		}
	}

	if (!showAllNodes) return nodes

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
				bus: fi ? null : bus,
				x: bx,
				y: 0,
				z: busLayerZ + nz,
				label: cfgName(bus.config.fx?.[fi]) ?? 'fx',
				isGenerator: false,
				next: fi < bus.fx.length - 1 ? nodes.length + 1 : masterNodes
			})
			nz += NODE_SPACING
		}
		busEndPositions[name] = new Vector3(bx, 0, busLayerZ + nz - NODE_SPACING)
	}

	// Master chain
	if (master) {
		let nz = 0
		for (let fi = 0; fi < master.fx.length; fi++) {
			nodes.push({
				master: fi ? null : master,
				x: 0,
				y: busNodes.total ? COL_SPACING : 0,
				z: masterLayerZ + nz,
				label: cfgName(master.config.fx?.[fi]) ?? 'fx',
				isGenerator: false,
				next: fi < master.fx.length - 1 ? nodes.length + 1 : null
			})
			nz += NODE_SPACING
		}
	}

	return nodes
}
