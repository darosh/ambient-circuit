// based on https://github.com/mrdoob/three.js/blob/master/examples/webgpu_tsl_vfx_tornado.html

import { MeshBasicNodeMaterial, DoubleSide } from 'three/webgpu'
import { luminance, uniform, color, Fn, vec4, float } from 'three/tsl'

const BASE_INTENSITY = 0.8
const PEAK_INTENSITY = 2.0

const materialCache = new Map<string, ReturnType<typeof buildImpactMaterial>>()

function getMaterialCacheKey(
	baseHexColor: string,
	impactHexColor: string,
	alpha: number,
	transparent: boolean
): string {
	return `${baseHexColor}_${impactHexColor}_${alpha}_${transparent}`
}

/**
 * Create a glowing impact material (WebGPU/TSL) with memoization.
 */
export function createImpactMaterialCached(
	baseHexColor: string,
	impactHexColor?: string,
	alpha = 1.0,
	transparent = true
) {
	const key = getMaterialCacheKey(baseHexColor, impactHexColor ?? baseHexColor, alpha, transparent)
	const cached = materialCache.get(key)
	if (cached) return cached

	const material = buildImpactMaterial(baseHexColor, impactHexColor, alpha, transparent)
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
 * Build impact material (not cached).
 * impactT: 1 = just triggered, 0 = resting.
 * Color transitions from impactColor → emissiveColor over last 75% of flash.
 * Intensity easeOutQuart from PEAK → BASE.
 */
export function buildImpactMaterial(
	baseHexColor: string,
	impactHexColor?: string,
	alpha = 1.0,
	transparent = true,
	colorPart = 0.75,
	baseIntensity = BASE_INTENSITY,
	peakIntensity = PEAK_INTENSITY
) {
	const emissiveColor = uniform(color(baseHexColor))
	const impactColor = uniform(color(impactHexColor ?? baseHexColor))
	/* eslint-disable @typescript-eslint/no-explicit-any */
	const impactT = uniform(0)
	const alphaU = uniform(alpha)

	const mat = new MeshBasicNodeMaterial({
		transparent,
		side: DoubleSide
	})

	mat.outputNode = Fn(() => {
		// colorT: 0 while impactT > 0.75 (stays impactColor), then 0→1 as impactT → 0
		const colorT4 = (impactT as any).div(colorPart).oneMinus().clamp(0, 1).pow(4)
		// manual blend — avoids .mix() return type issues with luminance/div
		const blendedColor = (impactColor as any)
			.mul((colorT4 as any).oneMinus())
			.add(emissiveColor.mul(colorT4))

		// easeOutQuart: 1 at impactT=1 (peak), 0 at impactT=0 (rest)
		const intensityEase = (impactT as any).oneMinus().pow(4).oneMinus()
		const finalIntensity = float(baseIntensity).add(
			intensityEase.mul(peakIntensity - baseIntensity)
		)

		// normalize by emissiveColor luminance (stable reference matching original pattern)
		const lum = luminance(blendedColor) //.max(0.01)
		return vec4(blendedColor.div(lum).mul(finalIntensity), alphaU)
	})()
	/* eslint-enable @typescript-eslint/no-explicit-any */

	return { mat, impactT, emissiveColor, impactColor, alpha: alphaU }
}
