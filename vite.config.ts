import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	plugins: [svelte()],
	base: './',
	build: {
		chunkSizeWarningLimit: 721, // three
		target: 'esnext',
		outDir: './docs',
		rollupOptions: {
			onwarn(warning, warn) {
				if (warning.code === 'EVAL') return
				warn(warning)
			},
			output: {
				manualChunks: {
					rnbo: ['@rnbo/js'],
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
		exclude: ['@rnbo/js'],
		include: ['three'],
		esbuildOptions: {
			target: 'esnext'
		}
	},
	resolve: {
		dedupe: ['three']
	}
})
