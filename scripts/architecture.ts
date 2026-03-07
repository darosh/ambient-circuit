#!/usr/bin/env tsx
// scripts/architecture.ts — reads TS source files, parses types, generates Mermaid flowchart
// Run: npx tsx scripts/architecture.ts

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const FILES = [
	'src/lib/core/scene.ts',
	'src/lib/core/scene-ctx.ts',
	'src/lib/core/marble.ts',
	'src/lib/core/instrument.ts',
	'src/lib/core/rail-data.ts',
	'src/lib/audio/types.ts',
]

// Types to render as subgraphs — order controls top-down layout
const TRACKED = [
	'SceneConfig',
	'RailData', 'RailRuntime', 'MarbleDataBase', 'MarbleData', 'Instrument', 'InstrumentBase', 'InstrumentRuntime',
	'ViewConfig', 'ViewSplitConfig', 'BloomConfig',
	'TriggerContext', 'TriggerHandler', 'BounceContext', 'BounceHandler', 'GlobalBeatContext', 'GlobalBeatHandler', 'InstrumentTriggerContext',
	'SceneCtx', 'MarbleEntity', 'InstrumentEntity', 'RailEntity', 'ViewState', 'ViewSplitState',
	'Marble', 'MarbleConfig', 'MarbleRuntime',
	'AudioChainConfig', 'NodeConfig', 'AudioChain', 'BusConfig', 'MasterConfig', 'ChordInfo',
]
const TRACKED_SET = new Set(TRACKED)

// ---- Types ----
type PropDef = { name: string; typeStr: string; optional: boolean }
type TypeDef = { name: string; props: PropDef[]; extends?: string[] }

// ---- Parsing ----

/** Extract balanced-brace body starting at `openPos` in `src`. Returns [body, endIndex]. */
function extractBody(src: string, openPos: number): [string, number] {
	let depth = 1
	let i = openPos + 1
	while (i < src.length && depth > 0) {
		if (src[i] === '{') depth++
		else if (src[i] === '}') depth--
		i++
	}
	return [src.slice(openPos + 1, i - 1), i]
}

/** Flatten a type string by removing nested brace blocks → "{...}" */
function flattenBraces(s: string): string {
	let result = ''
	let depth = 0
	for (const c of s) {
		if (c === '{') { depth++; if (depth === 1) result += '{...}' }
		else if (c === '}') { depth-- }
		else if (depth === 0) result += c
	}
	return result
}

function parseTypesFromFile(src: string): TypeDef[] {
	const results: TypeDef[] = []

	// Match: (export )? (type|interface) Name (extends X)? (= body | body)
	// Also handles intersection: type X = A & { ... }
	const declRe = /(?:export\s+)?(?:type|interface)\s+(\w+)(?:\s+extends\s+([\w,\s]+?))?\s*(?:[^=\n{]*=\s*(?:[\w<>[\],\s|&]+&\s*)?\{|\{)/g
	let m: RegExpExecArray | null
	while ((m = declRe.exec(src)) !== null) {
		const name = m[1]
		if (!TRACKED_SET.has(name)) continue
		const extendsStr = m[2]
		const extendsTypes = extendsStr
			? extendsStr.split(',').map(s => s.trim()).filter(s => TRACKED_SET.has(s))
			: undefined

		// Find opening brace of body (last `{` in the match or right after)
		const bracePos = src.lastIndexOf('{', m.index + m[0].length)
		if (bracePos === -1) continue
		const [body] = extractBody(src, bracePos)
		results.push({ name, props: parseProps(body), extends: extendsTypes })
	}

	// Handle union type aliases: type MarbleData = A | B | C (non-object)
	const unionRe = /(?:export\s+)?type\s+(\w+)\s*=\s*([^{(=\n][^=\n]+?)\s*(?:;|$)/gm
	while ((m = unionRe.exec(src)) !== null) {
		const name = m[1]
		if (!TRACKED_SET.has(name)) continue
		if (results.some(t => t.name === name)) continue
		const rhs = m[2].trim()
		if (rhs.startsWith('{') || rhs.startsWith('(')) continue // handled above
		// Collect referenced tracked types from union/intersection
		const refTypes = TRACKED.filter(t => t !== name && new RegExp(`\\b${t}\\b`).test(rhs))
		results.push({ name, props: [{ name: '(union)', typeStr: rhs.length > 60 ? rhs.slice(0, 58) + '…' : rhs, optional: false }], extends: refTypes })
	}

	// Handle function type aliases: type TriggerHandler = (ctx: TriggerContext) => void
	const fnRe = /(?:export\s+)?type\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>/g
	while ((m = fnRe.exec(src)) !== null) {
		const name = m[1]
		if (!TRACKED_SET.has(name)) continue
		if (results.some(t => t.name === name)) continue
		const param = m[2].trim()
		// extract param: "ctx: TriggerContext" → prop
		const pm = param.match(/(\w+)\s*:\s*(.+)/)
		results.push({
			name,
			props: pm ? [{ name: pm[1], typeStr: pm[2].trim(), optional: false }] : [],
		})
	}

	return results
}

function parseProps(body: string): PropDef[] {
	const props: PropDef[] = []
	const lines = body.split('\n')
	let i = 0
	while (i < lines.length) {
		const line = lines[i].trim()
		i++
		if (!line || line.startsWith('//') || line.startsWith('*') || line.startsWith('/*')) continue
		// Skip method signatures (contain parens before colon)
		if (/^\w+\(/.test(line)) continue

		const m = line.match(/^(\w+)(\??):\s*(.*)$/)
		if (!m) continue
		const [, propName, opt, rest] = m

		// Accumulate lines until braces balance and expression is complete
		let typeStr = rest.replace(/;$/, '').trim()
		const countChar = (s: string, c: string) => (s.match(new RegExp(`[${c}]`, 'g')) || []).length
		let depth = countChar(typeStr, '{') - countChar(typeStr, '}')
		// Also continue if typeStr is empty or ends with | or & (multiline union/intersection)
		while ((depth > 0 || typeStr === '' || /[|&]$/.test(typeStr)) && i < lines.length) {
			const next = lines[i].trim()
			i++
			typeStr += ' ' + next
			depth += countChar(next, '{') - countChar(next, '}')
			typeStr = typeStr.trim()
		}
		// Flatten nested braces for display
		typeStr = flattenBraces(typeStr).replace(/\s+/g, ' ').trim()
		props.push({ name: propName, optional: opt === '?', typeStr })
	}
	return props
}

/** Find tracked types referenced inside a type string */
function findRefs(typeStr: string, selfName: string): string[] {
	return TRACKED.filter(t => t !== selfName && new RegExp(`\\b${t}\\b`).test(typeStr))
}

/** Shorten a type string for display */
function displayType(s: string): string {
	// Remove trailing comments
	s = s.replace(/\s*\/\/.*$/, '').trim()
	if (s.length > 44) s = s.slice(0, 42) + '…'
	return s
}

/** Escape quotes for Mermaid labels */
function esc(s: string): string {
	return s.replace(/"/g, "'").replace(/</g, '‹').replace(/>/g, '›')
}

// ---- Build diagram ----

function buildFlowchart(allTypes: TypeDef[]): string {
	const byName = new Map(allTypes.map(t => [t.name, t]))
	const lines: string[] = ['flowchart LR']

	for (const name of TRACKED) {
		const type = byName.get(name)
		if (!type) continue

		lines.push(``)
		lines.push(`  subgraph ${name}["${name}"]`)

		for (const prop of type.props) {
			const refs = findRefs(prop.typeStr, name)
			// Only show props that reference another tracked type
			if (!refs.length) continue
			const nodeId = `${name}__${prop.name.replace(/[^a-zA-Z0-9_]/g, '_')}`
			const label = esc(`${prop.name}${prop.optional ? '?' : ''}: ${displayType(prop.typeStr)}`)
			lines.push(`    ${nodeId}(["${label}"])`)
		}

		lines.push(`  end`)
	}

	// Inheritance / extends edges
	lines.push('')
	lines.push('  %% Inheritance')
	for (const name of TRACKED) {
		const type = byName.get(name)
		if (!type?.extends?.length) continue
		for (const base of type.extends) {
			if (byName.has(base)) lines.push(`  ${name} -.->|extends| ${base}`)
		}
	}

	// Prop → type edges
	lines.push('')
	lines.push('  %% Relationships')
	for (const name of TRACKED) {
		const type = byName.get(name)
		if (!type) continue
		for (const prop of type.props) {
			const refs = findRefs(prop.typeStr, name).filter(r => byName.has(r))
			if (!refs.length) continue
			const nodeId = `${name}__${prop.name.replace(/[^a-zA-Z0-9_]/g, '_')}`
			for (const ref of refs) {
				lines.push(`  ${nodeId} --> ${ref}`)
			}
		}
	}

	return lines.join('\n')
}

// ---- Main ----

const allTypes: TypeDef[] = []
for (const rel of FILES) {
	const src = readFileSync(resolve(ROOT, rel), 'utf-8')
	allTypes.push(...parseTypesFromFile(src))
}

// Deduplicate
const seen = new Set<string>()
const unique = allTypes.filter(t => {
	if (seen.has(t.name)) return false
	seen.add(t.name)
	return true
})

const mermaid = buildFlowchart(unique)
writeFileSync(resolve(ROOT, 'ARCHITECTURE.md'), `# Architecture\n\n\`\`\`mermaid\n${mermaid}\n\`\`\`\n`)
console.log(`Written ARCHITECTURE.md (${unique.length} types parsed)`)
console.log('Parsed:', unique.map(t => t.name).join(', '))
const missing = TRACKED.filter(t => !unique.some(u => u.name === t))
if (missing.length) console.warn('Missing:', missing.join(', '))
