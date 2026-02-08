import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [svelte()],
	base: './',
	build: {
		target: 'esnext',
		outDir: './docs'
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}']
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext'
		}
	}
})
