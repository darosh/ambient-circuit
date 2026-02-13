import { MeshStandardMaterial } from 'three/webgpu'

// Material cache: key = color hex string
const materialCache = new Map<string, MeshStandardMaterial>()

/**
 * Create a MeshStandardMaterial with color memoization
 */
export function createStandardMaterialCached(color: string): MeshStandardMaterial {
	const cached = materialCache.get(color)
	if (cached) return cached

	const material = makeStandardMaterial(color)
	materialCache.set(color, material)
	return material
}

/**
 * Clear material cache (call on cleanup)
 */
export function clearStandardMaterialCache(): void {
	for (const material of materialCache.values()) {
		material.dispose()
	}
	materialCache.clear()
}

export function makeStandardMaterial(color: string) {
	return new MeshStandardMaterial({ color })
}
