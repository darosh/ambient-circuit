import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	plugins: [svelte()],
	base: './',
	build: {
		target: 'esnext',
		outDir: './docs',
		rollupOptions: {
			output: {
				manualChunks: {
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
		include: ['three'],
		esbuildOptions: {
			target: 'esnext'
		}
	},
	resolve: {
		dedupe: ['three']
	}
})
