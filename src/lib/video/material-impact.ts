// based on https://github.com/mrdoob/three.js/blob/master/examples/webgpu_tsl_vfx_tornado.html

import { MeshBasicNodeMaterial, DoubleSide } from 'three/webgpu'
import { luminance, uniform, color, Fn, vec4 } from 'three/tsl'

/* eslint-disable @typescript-eslint/no-explicit-any */
const materialCache = new Map<string, { mat: MeshBasicNodeMaterial; impactIntensity: any }>()

function getMaterialCacheKey(
	hexColor: string,
	initialIntensity: number,
	transparent: boolean
): string {
	return `${hexColor}_${initialIntensity}_${transparent}`
}

/**
 * Create a glowing noise-based rail material (WebGPU/TSL) with memoization.
 */
export function createImpactMaterialCached(
	hexColor: string,
	initialIntensity = 0.7,
	transparent = true
) {
	const key = getMaterialCacheKey(hexColor, initialIntensity, transparent)
	const cached = materialCache.get(key)
	if (cached) return cached

	const material = buildImpactMaterial(hexColor, initialIntensity, transparent)
	materialCache.set(key, material)
	return material
}

/**
 * Clear material cache (call on cleanup)
 */
export function clearImpactMaterialCache(): void {
	for (const { mat } of materialCache.values()) {
		mat.dispose()
	}
	materialCache.clear()
}

/**
 * Build rail material (internal, not cached)
 */
export function buildImpactMaterial(
	hexColor: string,
	initialIntensity: number = 0.7,
	transparent: boolean = true
) {
	const emissiveColor = uniform(color(hexColor))
	const impactIntensity = uniform(0.0)

	const mat = new MeshBasicNodeMaterial({
		transparent,
		side: DoubleSide
	})

	mat.outputNode = Fn(() => {
		// effect
		const emissiveColorLuminance = luminance(emissiveColor)

		return vec4(
			emissiveColor.mul(impactIntensity.add(initialIntensity)).div(emissiveColorLuminance),
			1
		)
	})()

	return { mat, impactIntensity, emissiveColor }
}
