#!/usr/bin/env node
// Heap memory analysis script for Ambient Circuit
// Usage: npm run heap [-- --wait=N --url=URL]

import puppeteer from 'puppeteer-core'
import { spawn } from 'child_process'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

// --- CLI args ---
const args = Object.fromEntries(
	process.argv
		.slice(2)
		.filter((a) => a.startsWith('--'))
		.map((a) => {
			const [k, v] = a.slice(2).split('=')
			return [k, v ?? true]
		})
)
const WAIT_S = Number(args.wait ?? 8)
const TARGET_URL = args.url ?? 'http://localhost:5173'
const HEADLESS = !('no-headless' in args)
const OUT_DIR = 'heap-snapshots'
const SERVER_TYPE = args.type ?? 'dev'
const SWITCH_SCENES =
	'switching' in args
		? [
				'scene-test',
				'scene-structure',
				'scene-rings',
				'scene-instruments',
				'scene-orientation',
				'scene-logic'
			]
		: null

console.log({
	WAIT_S,
	TARGET_URL,
	OUT_DIR,
	SERVER_TYPE,
	...(SWITCH_SCENES ? { SWITCH_SCENES } : {})
})

// --- Chrome detection ---
const CHROME_PATHS = [
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	'/Applications/Chromium.app/Contents/MacOS/Chromium',
	process.env.CHROME_PATH
].filter(Boolean)

function findChrome() {
	for (const p of CHROME_PATHS) {
		if (existsSync(p)) return p
	}
	console.error('Chrome not found. Set CHROME_PATH env or install Chrome/Chromium.')
	process.exit(1)
}

// --- Dev server management ---
let viteProc = null

async function ensureDevServer() {
	try {
		const res = await fetch(TARGET_URL, { signal: AbortSignal.timeout(2000) })
		if (res.ok || res.status < 500) {
			console.log(`Dev server already running at ${TARGET_URL}`)
			return
		}
	} catch {} // eslint-disable-line no-empty

	console.log('Starting vite dev server...')
	viteProc = spawn('npx', ['vite', SERVER_TYPE], { stdio: ['ignore', 'pipe', 'pipe'] })

	await new Promise((resolve, reject) => {
		const timeout = setTimeout(() => reject(new Error('Vite dev server timeout')), 15000)
		const check = async () => {
			try {
				const res = await fetch(TARGET_URL, { signal: AbortSignal.timeout(1000) })
				if (res.ok || res.status < 500) {
					clearTimeout(timeout)
					resolve()
					return
				}
			} catch {} // eslint-disable-line no-empty
			setTimeout(check, 500)
		}
		viteProc.stdout.on('data', (d) => {
			const s = d.toString()
			if (s.includes('Local') || s.includes('localhost')) setTimeout(check, 500)
		})
		viteProc.on('error', (e) => {
			clearTimeout(timeout)
			reject(e)
		})
		setTimeout(check, 2000)
	})
	console.log('Dev server ready')
}

// --- Heap snapshot via CDP ---
async function takeSnapshot(cdpSession, label) {
	console.log(`Taking snapshot ${label}...`)
	await cdpSession.send('HeapProfiler.enable')

	const chunks = []
	const handler = ({ chunk }) => chunks.push(chunk)
	cdpSession.on('HeapProfiler.addHeapSnapshotChunk', handler)

	await cdpSession.send('HeapProfiler.takeHeapSnapshot', { reportProgress: false })
	cdpSession.off('HeapProfiler.addHeapSnapshotChunk', handler)

	const raw = chunks.join('')

	mkdirSync(OUT_DIR, { recursive: true })
	const filename = join(OUT_DIR, `snap-${label}-${Date.now()}.heapsnapshot`)
	writeFileSync(filename, raw)
	console.log(`  Saved: ${filename}`)

	return JSON.parse(raw)
}

// --- Snapshot parsing ---
const THREE_RESOURCES = new Set([
	'BufferGeometry',
	'BufferAttribute',
	'InterleavedBufferAttribute',
	'Material',
	'MeshStandardMaterial',
	'MeshBasicMaterial',
	'MeshPhysicalMaterial',
	'ShaderMaterial',
	'LineBasicMaterial',
	'Texture',
	'DataTexture',
	'CanvasTexture',
	'VideoTexture',
	'WebGLRenderTarget',
	'WebGLCubeRenderTarget',
	'AudioBuffer',
	'AudioBufferSourceNode',
	'InstancedMesh',
	'SkinnedMesh'
])

function parseSnapshot(snap) {
	const { nodes, strings, snapshot } = snap
	const meta = snapshot.meta
	const fields = meta.node_fields
	const stride = fields.length

	const nameIdx = fields.indexOf('name')
	const selfSizeIdx = fields.indexOf('self_size')

	const groups = new Map() // name → {count, totalBytes}

	for (let i = 0; i < nodes.length; i += stride) {
		const name = strings[nodes[i + nameIdx]]
		const size = nodes[i + selfSizeIdx]
		const g = groups.get(name) ?? { count: 0, totalBytes: 0 }
		g.count++
		g.totalBytes += size
		groups.set(name, g)
	}

	const totalNodes = nodes.length / stride
	const totalBytes = [...groups.values()].reduce((s, g) => s + g.totalBytes, 0)

	return { groups, totalNodes, totalBytes }
}

function fmtBytes(n) {
	if (Math.abs(n) >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`
	if (Math.abs(n) >= 1024) return `${(n / 1024).toFixed(0)} KB`
	return `${n} B`
}

function fmtSign(n) {
	return n > 0 ? `+${n}` : `${n}`
}

// --- Main ---
async function main() {
	const chromePath = findChrome()
	await ensureDevServer()

	const browser = await puppeteer.launch({
		executablePath: chromePath,
		headless: HEADLESS ? 'shell' : false,
		args: [
			'--enable-unsafe-webgpu',
			'--enable-features=WebGPU',
			'--no-sandbox',
			'--disable-setuid-sandbox'
		]
	})

	try {
		const page = await browser.newPage()
		console.log(`Navigating to ${TARGET_URL}...`)
		await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 })

		// Wait for canvas + settle
		await page.waitForSelector('canvas', { timeout: 15000 })
		await new Promise((r) => setTimeout(r, 2000))

		const cdp = await page.createCDPSession()

		const snapA = await takeSnapshot(cdp, 'A')
		const parsedA = parseSnapshot(snapA)

		console.log(`Waiting ${WAIT_S}s...`)
		if (SWITCH_SCENES) {
			const step = Math.floor((WAIT_S * 1000) / SWITCH_SCENES.length)
			for (const sceneId of SWITCH_SCENES) {
				await page.evaluate((id) => {
					window.location.hash = `#${id}`
				}, sceneId)
				console.log(`  Scene: ${sceneId}`)
				await new Promise((r) => setTimeout(r, step))
			}
		} else {
			await new Promise((r) => setTimeout(r, WAIT_S * 1000))
		}

		const snapB = await takeSnapshot(cdp, 'B')
		const parsedB = parseSnapshot(snapB)

		// --- Diff ---
		const diffs = []
		const allNames = new Set([...parsedA.groups.keys(), ...parsedB.groups.keys()])

		for (const name of allNames) {
			const a = parsedA.groups.get(name) ?? { count: 0, totalBytes: 0 }
			const b = parsedB.groups.get(name) ?? { count: 0, totalBytes: 0 }
			const deltaCount = b.count - a.count
			const deltaBytes = b.totalBytes - a.totalBytes
			if (deltaBytes !== 0 || deltaCount !== 0) {
				diffs.push({ name, deltaCount, deltaBytes, bCount: b.count, bBytes: b.totalBytes })
			}
		}

		diffs.sort((a, b) => b.deltaBytes - a.deltaBytes)

		// --- Report ---
		const sep = '─'.repeat(54)
		console.log()
		console.log('Heap Analysis — Ambient Circuit')
		console.log(sep)
		console.log(
			`Snapshot A:  ${fmtBytes(parsedA.totalBytes).padStart(8)}  (${parsedA.totalNodes.toLocaleString()} nodes)`
		)
		console.log(
			`Snapshot B:  ${fmtBytes(parsedB.totalBytes).padStart(8)}  (${parsedB.totalNodes.toLocaleString()} nodes)   [after ${WAIT_S}s]`
		)
		const deltaBytes = parsedB.totalBytes - parsedA.totalBytes
		const deltaNodes = parsedB.totalNodes - parsedA.totalNodes
		console.log(
			`Delta:       ${fmtSign(Math.round((deltaBytes / 1024 / 1024) * 10) / 10 + ' MB (approx)').padStart(8)}  (${fmtSign(deltaNodes)} nodes)`
		)
		console.log()

		const top10 = diffs.slice(0, 10)
		if (top10.length > 0) {
			console.log('Top 10 by size growth:')
			top10.forEach((d, i) => {
				const flag = THREE_RESOURCES.has(d.name) ? '⚠ THREE resource' : ''
				const warn =
					d.name.includes('Float32Array') || d.name.includes('ArrayBuffer')
						? '⚠ geometry data'
						: flag
				const line = [
					`  #${i + 1}`.padEnd(5),
					d.name.padEnd(34),
					`${fmtSign(d.deltaCount)} objs`.padStart(10),
					`${fmtSign(Math.round(d.deltaBytes / 1024))} KB`.padStart(10),
					warn ? `  ${warn}` : ''
				].join('')
				console.log(line)
			})
		} else {
			console.log('No growth detected.')
		}

		// Three.js resource summary in B
		const threeInB = []
		for (const name of THREE_RESOURCES) {
			const b = parsedB.groups.get(name)
			if (b && b.count > 0) threeInB.push({ name, ...b })
		}
		threeInB.sort((a, b) => b.totalBytes - a.totalBytes)

		if (threeInB.length > 0) {
			console.log()
			console.log('Three.js resources in snapshot B:')
			for (const r of threeInB) {
				console.log(
					`  ${r.name.padEnd(34)} ${String(r.count).padStart(4)}   ${fmtBytes(r.totalBytes)}`
				)
			}
		}
		console.log()
	} finally {
		await browser.close()
		if (viteProc) {
			viteProc.kill()
			console.log('Vite dev server stopped')
		}
	}
}

main().catch((e) => {
	console.error(e)
	if (viteProc) viteProc.kill()
	process.exit(1)
})
