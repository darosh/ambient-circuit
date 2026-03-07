#!/usr/bin/env tsx
// scripts/architecture.ts — reads TS source files, parses types, generates Mermaid flowchart
// Dynamically discovers types by following references from seed types.
// Run: npx tsx scripts/architecture.ts

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// Source directories to scan for type definitions
const SRC_DIRS = ['src/lib/core', 'src/lib/audio']

const GRAPHS: { seed: string; blacklist?: string[]; unions?: boolean }[] = [
	{
		seed: 'SceneConfig',
		blacklist: [
			'RailTransform',
			'RailRender',
			'RailShapeTransform',
			'RailNode',
			'TriggerHandler',
			'GlobalBeatHandler',
			'BounceHandler',
			'Vec3'
		]
	},
	{
		seed: 'SceneCtx',
		blacklist: ['SceneConfig']
	},
	{
		seed: 'TriggerContext',
		blacklist: ['SceneCtx', 'SceneConfig']
	}
]

// ---- Types ----
type PropDef = { name: string; typeStr: string; optional: boolean }
type TypeDef = { name: string; props: PropDef[]; extends?: string[]; file: string }

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
		if (c === '{') {
			depth++
			if (depth === 1) result += '{...}'
		} else if (c === '}') {
			depth--
		} else if (depth === 0) result += c
	}
	return result
}

/** Parse ALL type/interface declarations from a file (no filtering) */
function parseTypesFromFile(src: string, file: string): TypeDef[] {
	const results: TypeDef[] = []

	// Match: (export )? (type|interface) Name (extends X)? (= body | body)
	const declRe =
		/(?:export\s+)?(?:type|interface)\s+(\w+)(?:\s+extends\s+([\w,\s]+?))?\s*(?:[^=\n{]*=\s*(?:[\w<>[\],\s|&]+&\s*)?\{|\{)/g
	let m: RegExpExecArray | null
	while ((m = declRe.exec(src)) !== null) {
		const name = m[1]
		const extendsStr = m[2]
		const extendsTypes = extendsStr
			? extendsStr
					.split(',')
					.map((s) => s.trim())
					.filter(Boolean)
			: undefined

		const bracePos = src.lastIndexOf('{', m.index + m[0].length)
		if (bracePos === -1) continue
		const [body] = extractBody(src, bracePos)
		results.push({ name, props: parseProps(body), extends: extendsTypes, file })
	}

	// Union type aliases: type X = A | B | C
	const unionRe = /(?:export\s+)?type\s+(\w+)\s*=\s*([^{(=\n][^=\n]+?)\s*(?:;|$)/gm
	while ((m = unionRe.exec(src)) !== null) {
		const name = m[1]
		if (results.some((t) => t.name === name)) continue
		const rhs = m[2].trim()
		if (rhs.startsWith('{') || rhs.startsWith('(')) continue
		results.push({
			name,
			props: [
				{
					name: '(union)',
					typeStr: rhs.length > 60 ? rhs.slice(0, 58) + '…' : rhs,
					optional: false
				}
			],
			file
		})
	}

	// Function type aliases: type TriggerHandler = (ctx: TriggerContext) => void
	const fnRe = /(?:export\s+)?type\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>/g
	while ((m = fnRe.exec(src)) !== null) {
		const name = m[1]
		if (results.some((t) => t.name === name)) continue
		const param = m[2].trim()
		const pm = param.match(/(\w+)\s*:\s*(.+)/)
		results.push({
			name,
			props: pm ? [{ name: pm[1], typeStr: pm[2].trim(), optional: false }] : [],
			file
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
		if (/^\w+\(/.test(line)) continue

		const m = line.match(/^(\w+)(\??):\s*(.*)$/)
		if (!m) continue
		const [, propName, opt, rest] = m

		let typeStr = rest.replace(/;$/, '').trim()
		const countChar = (s: string, c: string) => (s.match(new RegExp(`[${c}]`, 'g')) || []).length
		let depth = countChar(typeStr, '{') - countChar(typeStr, '}')
		while ((depth > 0 || typeStr === '' || /[|&]$/.test(typeStr)) && i < lines.length) {
			const next = lines[i].trim()
			i++
			typeStr += ' ' + next
			depth += countChar(next, '{') - countChar(next, '}')
			typeStr = typeStr.trim()
		}
		typeStr = flattenBraces(typeStr).replace(/\s+/g, ' ').trim()
		props.push({ name: propName, optional: opt === '?', typeStr })
	}
	return props
}

/** Extract type names referenced in a type string (identifiers starting with uppercase) */
function extractTypeRefs(typeStr: string): string[] {
	// Match capitalized identifiers that look like type names
	const matches = typeStr.match(/\b[A-Z]\w+/g) || []
	// Filter out common non-type words and built-in types
	const builtins = new Set([
		'Record',
		'Partial',
		'Required',
		'Readonly',
		'Pick',
		'Omit',
		'Exclude',
		'Extract',
		'Map',
		'Set',
		'Array',
		'Promise',
		'Function',
		'Object',
		'String',
		'Number',
		'Boolean',
		'Infinity',
		'NaN',
		'Vector3Tuple',
		'Matrix4'
	])
	return [...new Set(matches.filter((m) => !builtins.has(m)))]
}

/** Shorten a type string for display */
function displayType(s: string): string {
	s = s.replace(/\s*\/\/.*$/, '').trim()
	if (s.length > 44) s = s.slice(0, 42) + '…'
	return s
}

/** Escape quotes for Mermaid labels */
function esc(s: string): string {
	return s.replace(/"/g, "'").replace(/</g, '‹').replace(/>/g, '›')
}

// ---- Discovery ----

/** Scan all TS files in SRC_DIRS and parse all type definitions */
function scanAllTypes(): TypeDef[] {
	const allTypes: TypeDef[] = []

	for (const dir of SRC_DIRS) {
		const absDir = resolve(ROOT, dir)
		let files: string[]
		try {
			files = readdirSync(absDir).filter(
				(f: string) => f.endsWith('.ts') && !f.endsWith('.test.ts')
			)
		} catch {
			continue
		}
		for (const file of files) {
			const filePath = join(absDir, file)
			const src = readFileSync(filePath, 'utf-8')
			const relPath = `${dir}/${file}`
			allTypes.push(...parseTypesFromFile(src, relPath))
		}
	}

	return allTypes
}

/** Starting from seeds, recursively discover all referenced types */
function discoverTypes(
	seeds: string[],
	allTypes: TypeDef[],
	blacklist: string[] = [],
	unions = false
): Map<string, TypeDef> {
	const byName = new Map<string, TypeDef>()
	for (const t of allTypes) {
		if (!byName.has(t.name)) byName.set(t.name, t)
	}

	const blocked = new Set(blacklist)
	const discovered = new Map<string, TypeDef>()
	const queue = [...seeds]

	while (queue.length > 0) {
		const name = queue.shift()!
		if (discovered.has(name)) continue

		const typeDef = byName.get(name)
		if (!typeDef) continue

		discovered.set(name, typeDef)

		for (const prop of typeDef.props) {
			if (!unions && prop.name === '(union)') {
				continue
			}

			for (const ref of extractTypeRefs(prop.typeStr)) {
				if (!discovered.has(ref) && byName.has(ref) && !blocked.has(ref)) {
					queue.push(ref)
				}
			}
		}

		if (typeDef.extends) {
			for (const ext of typeDef.extends) {
				if (!discovered.has(ext) && byName.has(ext) && !blocked.has(ext)) {
					queue.push(ext)
				}
			}
		}
	}

	return discovered
}

// ---- Build diagram ----

function buildFlowchart(discovered: Map<string, TypeDef>): string {
	const names = [...discovered.keys()]
	const lines: string[] = ['flowchart LR']

	for (const name of names) {
		const type = discovered.get(name)!

		lines.push(``)
		lines.push(`  subgraph ${name}["${name}"]`)

		for (const prop of type.props) {
			const refs = extractTypeRefs(prop.typeStr).filter((r) => r !== name && discovered.has(r))
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
	for (const name of names) {
		const type = discovered.get(name)!
		if (!type.extends?.length) continue
		for (const base of type.extends) {
			if (discovered.has(base)) lines.push(`  ${name} -.->|extends| ${base}`)
		}
	}

	// Prop → type edges
	lines.push('')
	lines.push('  %% Relationships')
	for (const name of names) {
		const type = discovered.get(name)!
		for (const prop of type.props) {
			const refs = extractTypeRefs(prop.typeStr).filter((r) => r !== name && discovered.has(r))
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

const allTypes = scanAllTypes()
const sections: string[] = ['# Architecture\n']

for (const graph of GRAPHS) {
	const discovered = discoverTypes([graph.seed], allTypes, graph.blacklist, graph.unions)
	const mermaid = buildFlowchart(discovered)
	sections.push(`## ${graph.seed}\n`)
	sections.push(`\`\`\`mermaid\n${mermaid}\n\`\`\`\n`)
	console.log(`${graph.seed}: ${discovered.size} types discovered`)
	if (!discovered.has(graph.seed)) console.warn(`Missing seed: ${graph.seed}`)
}

writeFileSync(resolve(ROOT, 'ARCHITECTURE.md'), sections.join('\n'))
console.log(`Written ARCHITECTURE.md (${GRAPHS.length} graphs from ${allTypes.length} total types)`)
