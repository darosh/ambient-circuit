import { LineMat } from './material-text-line'
import { Line2NodeMaterial } from 'three/webgpu'
import { uniform, color as colorShader } from 'three/tsl'
import type { UniformNode, Color } from 'three/webgpu'

// Material cache: key = color hex string
const materialCache = new Map<
	string,
	{ mat: Line2NodeMaterial; emissiveColor: UniformNode<Color> }
>()

/**
 * Create a MeshStandardMaterial with color memoization
 */
export function createLineMaterialCached(id: string, color: string, width: number) {
	const materialKey = `${id}-${width}`

	const cached = materialCache.get(materialKey)

	if (cached) return cached

	const material = getLineMaterial(color, width)
	materialCache.set(color, material)
	return material
}

/**
 * Clear material cache (call on cleanup)
 */
export function clearLineMaterialCache(): void {
	for (const material of materialCache.values()) {
		material.mat.dispose()
	}
	materialCache.clear()
}

export function getLineMaterial(color: string, width: number): LineMat {
	const emissiveColor = uniform(colorShader(color))

	const mat = new Line2NodeMaterial({
		color,
		linewidth: width / 200,
		vertexColors: false,
		dashed: false,
		alphaToCoverage: true,
		worldUnits: true
	})

	return { mat, emissiveColor }
}
