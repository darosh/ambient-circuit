// based on https://github.com/mrdoob/three.js/blob/master/examples/webgpu_tsl_vfx_tornado.html

import { MeshBasicNodeMaterial, DoubleSide } from 'three/webgpu'
import { luminance, uniform, color, Fn, vec4, float } from 'three/tsl'
import { debug } from 'debug'

const log = debug('mat:impact')

const BASE_INTENSITY = 0.8
const PEAK_INTENSITY = 2

const materialCache = new Map<string, ReturnType<typeof buildImpactMaterial>>()

/**
 * Create a glowing impact material (WebGPU/TSL) with memoization.
 * `id` is the semantic cache key — e.g. 'hud-help-header', 'hud-param-tab-0'.
 * Color/alpha params only apply on first call; subsequent calls return cached instance.
 */
export function createImpactMaterialCached(
	id: string,
	baseHexColor: string,
	impactHexColor?: string,
	alpha = 1,
	transparent = true,
	colorPart?: number,
	baseIntensity?: number,
	peakIntensity?: number
) {
	const cached = materialCache.get(id)
	if (cached) {
		log('reusing', id)
		cached.mat.userData.refCount++
		return cached
	}

	const material = buildImpactMaterial(
		baseHexColor,
		impactHexColor,
		alpha,
		transparent,
		colorPart,
		baseIntensity,
		peakIntensity,
		true
	)
	material.mat.name = id
	material.mat.userData.refCount = 1
	log('creating', id)
	materialCache.set(id, material)
	return material
}

/**
 * Sweep material cache — dispose only entries with refCount === 0
 */
export function clearImpactMaterialCache(all = false): void {
	for (const [key, { mat }] of materialCache.entries()) {
		if (!mat.userData.refCount || all) {
			log('disposing', key)
			mat.dispose()
			materialCache.delete(key)
		}
	}
	log('cached materials', materialCache.size)
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
	alpha = 1,
	transparent = true,
	colorPart = 0.75,
	baseIntensity = BASE_INTENSITY,
	peakIntensity = PEAK_INTENSITY,
	cached = false
) {
	if (!cached) {
		log('building')
	}
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
