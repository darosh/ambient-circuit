import { defineConfig, type Plugin } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { version } from './package.json'
import { build } from 'esbuild'
import path from 'node:path'

/**
 * Bundles worklet files into self-contained scripts in dev mode.
 * Needed because RNBO fetches worklet source as text, prepends a preamble,
 * and loads via Blob URL — ESM imports can't resolve in that context.
 * In production, Vite's ?worker&url already bundles everything.
 */
function bundleWorklets(): Plugin {
	const workletFiles = new Set(['worklet-js.js', 'worklet-wasm.js'])
	const PREFIX = '\0bundled-worklet:'
	return {
		name: 'bundle-worklets',
		enforce: 'pre',
		apply: 'serve',
		resolveId(source, importer) {
			if (!source.includes('worker') || !source.includes('url')) return
			const qIdx = source.indexOf('?')
			const clean = qIdx === -1 ? source : source.slice(0, qIdx)
			if (!workletFiles.has(path.basename(clean))) return
			const resolved = importer ? path.resolve(path.dirname(importer), clean) : clean
			return PREFIX + resolved
		},
		async load(id) {
			if (!id.startsWith(PREFIX)) return
			const filePath = id.slice(PREFIX.length)
			const result = await build({
				entryPoints: [filePath],
				bundle: true,
				write: false,
				format: 'esm',
				platform: 'browser',
				target: 'esnext'
			})
			const code = result.outputFiles[0].text
			return `const blob = new Blob(${JSON.stringify([code])}, { type: "text/javascript" });
export default URL.createObjectURL(blob);`
		}
	}
}

export default defineConfig({
	define: {
		__APP_VERSION__: JSON.stringify(version)
	},
	plugins: [bundleWorklets(), svelte()],
	base: './',
	build: {
		chunkSizeWarningLimit: 900,
		target: 'esnext',
		outDir: './docs',
		rollupOptions: {
			onwarn(warning, warn) {
				if (warning.code === 'EVAL') return
				warn(warning)
			},
			output: {
				manualChunks: {
					rnbo: ['src/lib/audio/rnbo'],
					tone: ['tone'],
					three: ['three'],
					'three-webgpu': ['three/webgpu', 'three/tsl']
				}
			}
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}']
	},
	optimizeDeps: {
		include: ['three', 'tone'],
		esbuildOptions: {
			target: 'esnext'
		}
	},
	resolve: {
		dedupe: ['three']
	}
})
