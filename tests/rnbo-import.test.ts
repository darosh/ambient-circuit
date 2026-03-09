import { describe, it, expect } from 'vitest'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

describe('rnbo modules', () => {
	it('imports index', async () => {
		const rnbo = await import('../src/lib/audio/rnbo')
		expect(rnbo.createDevice).toBeDefined()
		expect(rnbo.version).toBeDefined()
	})

	it('imports all rnbo js sub-modules', async () => {
		const dir = path.resolve(import.meta.dirname, '../src/lib/audio/rnbo')
		const files = await readdir(dir)

		const jsFiles = files.filter((f) => f.endsWith('.js') && !f.startsWith('worklet-'))

		for (const file of jsFiles) {
			const fullPath = path.join(dir, file)
			const moduleUrl = pathToFileURL(fullPath).href

			const mod = await import(moduleUrl)
			expect(mod).toBeDefined()
		}
	})
})
