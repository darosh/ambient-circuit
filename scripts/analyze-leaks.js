#!/usr/bin/env node
// Heap leak analysis for Ambient Circuit
// Usage: node --max-old-space-size=8192 scripts/analyze-leaks.js [snapshot.heapsnapshot]
// Default: .heap-snapshots/LEAKS.heapsnapshot

import { readFileSync } from 'fs'

const snapshotPath = process.argv[2] ?? '.heap-snapshots/LEAKS.heapsnapshot'

console.log(`Loading ${snapshotPath}...`)
const raw = readFileSync(snapshotPath)
console.log(`File size: ${(raw.length / 1024 / 1024).toFixed(1)} MB`)
console.log('Parsing JSON (may take 30-60s for large snapshots)...')

let snap
try {
	snap = JSON.parse(raw)
} catch (e) {
	console.error('JSON.parse failed:', e.message)
	console.error('Try: node --max-old-space-size=8192 scripts/analyze-leaks.js')
	process.exit(1)
}

const { nodes, edges, strings, snapshot } = snap
const meta = snapshot.meta

// --- Node field offsets ---
const nFields = meta.node_fields
const nStride = nFields.length
const nType = nFields.indexOf('type')
const nName = nFields.indexOf('name')
const nSelfSize = nFields.indexOf('self_size')
const nEdgeCount = nFields.indexOf('edge_count')

const nodeTypes = meta.node_types[0]

// --- Edge field offsets ---
const eFields = meta.edge_fields
const eStride = eFields.length
const eType = eFields.indexOf('type')
const eName = eFields.indexOf('name_or_index')
const eToNode = eFields.indexOf('to_node')

const edgeTypes = meta.edge_types[0]

const nodeCount = nodes.length / nStride
console.log(
	`Nodes: ${nodeCount.toLocaleString()}, Edges: ${(edges.length / eStride).toLocaleString()}, Strings: ${strings.length.toLocaleString()}`
)

// --- Node helpers ---
function nodeName(i) {
	return strings[nodes[i * nStride + nName]]
}
function nodeTypeName(i) {
	return nodeTypes[nodes[i * nStride + nType]]
}
function nodeSelfSize(i) {
	return nodes[i * nStride + nSelfSize]
}

// --- Build edge start index per node ---
console.log('Building edge index...')
const edgeStartArr = new Int32Array(nodeCount + 1)
{
	let eIdx = 0
	for (let i = 0; i < nodeCount; i++) {
		edgeStartArr[i] = eIdx
		eIdx += nodes[i * nStride + nEdgeCount]
	}
	edgeStartArr[nodeCount] = eIdx
}

// Map edge index → owning node index (binary search)
function edgeOwner(eIdx) {
	let lo = 0,
		hi = nodeCount - 1
	while (lo < hi) {
		const mid = (lo + hi + 1) >> 1
		if (edgeStartArr[mid] <= eIdx) lo = mid
		else hi = mid - 1
	}
	return lo
}

// --- Build retainer graph ---
console.log('Building retainer graph...')
// Use arrays-of-arrays — stored as flat typed arrays for memory efficiency
// retainerFrom[i] = list of node indices pointing to node i
// Store as Array<number[]> — acceptable for analysis script
const retainers = /** @type {{from:number,edgeName:string}[][]} */ (new Array(nodeCount))
for (let i = 0; i < nodeCount; i++) retainers[i] = []

const totalEdges = edges.length / eStride
for (let e = 0; e < totalEdges; e++) {
	const base = e * eStride
	const toNodeIdx = edges[base + eToNode] / nStride
	const fromNodeIdx = edgeOwner(e)
	const etStr = edgeTypes[edges[base + eType]]
	const enRaw = edges[base + eName]
	const enStr =
		etStr === 'element' || etStr === 'hidden' ? `[${enRaw}]` : (strings[enRaw] ?? `[${enRaw}]`)
	retainers[toNodeIdx].push({ from: fromNodeIdx, edgeName: `.${enStr}(${etStr})` })
}

// --- Scene IDs ---
const ALL_SCENE_IDS = [
	'scene-test',
	'scene-structure',
	'scene-rings',
	'scene-instruments',
	'scene-orientation',
	'scene-logic',
	'scene-easing',
	'scene-collisions',
	'scene-create-destroy',
	'scene-rail-switch',
	'scene-ctx-test',
	'scene-global-beat',
	'scene-audio',
	'scene-sampler-pad',
	'scene-sampler-pad-deeper'
]
const CURRENT_SCENE = 'scene-sampler-pad-deeper'

function extractSceneId(name) {
	for (const id of ALL_SCENE_IDS) {
		if (id !== CURRENT_SCENE && name.includes(id)) return id
	}
	return null
}

// --- BFS retainer path to root ---
function isGcRoot(nodeIdx) {
	const t = nodeTypeName(nodeIdx)
	return nodeIdx === 0 || t === '(GC roots)' || t === 'synthetic' || retainers[nodeIdx].length === 0
}

function shortestRetainerPath(targetIdx, maxDepth = 6) {
	const visited = new Set([targetIdx])
	// queue entries: {idx, path: string[]}
	const queue = [{ idx: targetIdx, path: [] }]
	while (queue.length > 0) {
		const { idx, path } = queue.shift()
		if (isGcRoot(idx) || path.length >= maxDepth) return path
		for (const { from, edgeName } of retainers[idx]) {
			if (visited.has(from)) continue
			visited.add(from)
			const label = `${nodeTypeName(from)}[${nodeName(from)}]${edgeName}`
			queue.push({ idx: from, path: [...path, label] })
		}
	}
	return null
}

// --- Find leaked objects by scene ID in name ---
console.log('\nSearching for leaked scene objects...')
const leakedByScene = new Map()

for (let i = 0; i < nodeCount; i++) {
	const name = nodeName(i)
	const sceneId = extractSceneId(name)
	if (sceneId) {
		const arr = leakedByScene.get(sceneId) ?? []
		arr.push({ nodeIdx: i, name, typeName: nodeTypeName(i), selfSize: nodeSelfSize(i) })
		leakedByScene.set(sceneId, arr)
	}
}

// --- Broad type-based counts ---
const LEAKED_TYPES = new Set([
	'BufferGeometry',
	'Material',
	'MeshBasicNodeMaterial',
	'MeshStandardMaterial',
	'MeshBasicMaterial',
	'MeshPhysicalMaterial',
	'ShaderMaterial',
	'Texture'
])

const broadGroups = new Map()
for (let i = 0; i < nodeCount; i++) {
	const type = nodeTypeName(i)
	if (!LEAKED_TYPES.has(type)) continue
	const name = nodeName(i)
	const key = `${type}::${name}`
	const g = broadGroups.get(key) ?? { type, name, count: 0, totalSize: 0, samples: [] }
	g.count++
	g.totalSize += nodeSelfSize(i)
	if (g.samples.length < 2) g.samples.push(i)
	broadGroups.set(key, g)
}

// ─── REPORT ───────────────────────────────────────────────────────────────────

function fmtBytes(n) {
	if (n >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`
	if (n >= 1024) return `${(n / 1024).toFixed(0)} KB`
	return `${n} B`
}

console.log()
console.log('═'.repeat(60))
console.log('LEAKED OBJECTS BY SCENE ID (in node name)')
console.log('═'.repeat(60))

if (leakedByScene.size === 0) {
	console.log('(none found — geometry names may not embed scene IDs)')
} else {
	for (const [sceneId, items] of [...leakedByScene].sort((a, b) => b[1].length - a[1].length)) {
		const totalSize = items.reduce((s, x) => s + x.selfSize, 0)
		console.log(`\n── ${sceneId}  (${items.length} objects, ${fmtBytes(totalSize)}) ──`)
		for (const { nodeIdx, name, typeName } of items.slice(0, 5)) {
			console.log(`  [${typeName}] ${name}`)
			const path = shortestRetainerPath(nodeIdx)
			if (path?.length > 0) {
				for (const step of path) console.log(`    ← ${step}`)
			} else {
				console.log(`    ← (no retainer path / root)`)
			}
		}
		if (items.length > 5) console.log(`  ... and ${items.length - 5} more`)
	}
}

console.log()
console.log('═'.repeat(60))
console.log('ALL GEOMETRY/MATERIAL INSTANCES (broad, by count)')
console.log('═'.repeat(60))

const sortedBroad = [...broadGroups.values()].sort((a, b) => b.count - a.count)
console.log(`\nTop 20:`)
for (const g of sortedBroad.slice(0, 20)) {
	console.log(
		`  ${String(g.count).padStart(5)}x  [${g.type}] "${g.name}"  ${fmtBytes(g.totalSize)}`
	)
}

console.log()
console.log('═'.repeat(60))
console.log('RETAINER CHAINS — top 3 geometry/material groups')
console.log('═'.repeat(60))

for (const g of sortedBroad.slice(0, 3)) {
	console.log(`\n[${g.type}] "${g.name}" — ${g.count} instances`)
	for (const nodeIdx of g.samples) {
		console.log(`  Node #${nodeIdx}:`)
		const path = shortestRetainerPath(nodeIdx)
		if (path?.length > 0) {
			for (const step of path) console.log(`    ← ${step}`)
		} else {
			console.log(`    ← (root or no path)`)
		}
	}
}

console.log('\nDone.')
