// based on https://github.com/mrdoob/three.js/blob/master/examples/webgpu_tsl_vfx_tornado.html

import { MeshBasicNodeMaterial, DoubleSide } from 'three/webgpu'
import {
	luminance,
	min,
	mix,
	time,
	uniform,
	color,
	Fn,
	uv,
	vec3,
	vec4,
	positionWorld,
	sin,
	cos,
	float
} from 'three/tsl'
import { perlinNoise } from 'tsl-textures'

const timeScale = uniform(0.2)

// Material cache: key = `${color}_${intensity}_${transparent}`
/* eslint-disable @typescript-eslint/no-explicit-any */
const materialCache = new Map<
	string,
	{ mat: MeshBasicNodeMaterial; impactIntensity: any; emissiveColor: any; activeUniform: any }
>()
/* eslint-enable @typescript-eslint/no-explicit-any */

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
export function createRailMaterialCached(
	hexColor: string,
	initialIntensity = 0.7,
	transparent = true
) {
	const key = getMaterialCacheKey(hexColor, initialIntensity, transparent)
	const cached = materialCache.get(key)
	if (cached) return cached

	const material = buildRailMaterial(hexColor, initialIntensity, transparent)
	materialCache.set(key, material)
	return material
}

/**
 * Clear material cache (call on cleanup)
 */
export function clearRailMaterialCache(): void {
	for (const { mat } of materialCache.values()) {
		mat.dispose()
	}
	materialCache.clear()
}

/**
 * Build rail material (internal, not cached)
 */
export function buildRailMaterial(
	hexColor: string,
	initialIntensity: number = 0.7,
	transparent: boolean = true,
	uvFreq: number = 0.75,
	useFade = 0.5
) {
	const emissiveColor = uniform(color(hexColor))
	const impactIntensity = uniform(0.0)
	const activeUniform = uniform(1.0)
	const uvFreqUniform = uniform(uvFreq)
	const useFadeUniform = float(useFade)

	const mat = new MeshBasicNodeMaterial({
		transparent,
		side: DoubleSide
	})

	mat.outputNode = Fn(() => {
		const scaledTime = time.mul(timeScale).mul(2).negate()

		// Map v (0→1 around tube circumference) onto a circle so noise is seamlessly periodic.
		// u (0→1 along tube length) becomes the z-axis stretched for line streaks.
		// positionWorld.xz offsets the noise differently per rail (deterministic variation).
		const angle = uv().y.mul(float(Math.PI * 2))
		const cx = cos(angle).mul(0.5)
		const cy = sin(angle).mul(0.5)

		// noise 1: wider streaks, flows forward
		const u1 = uv().x.mul(uvFreqUniform).add(scaledTime).add(positionWorld.x.mul(10.3))
		const noise1 = perlinNoise({ position: vec3(cx.add(u1.mul(0.3)), cy, u1), scale: 2 }).r.remap(
			0.2,
			0.95
		)

		// noise 2: tighter streaks, flows at half speed
		const u2 = uv()
			.x.mul(uvFreqUniform.mul(2.5))
			.add(scaledTime.mul(0.5))
			.add(positionWorld.z.mul(0.3))
		const noise2 = perlinNoise({ position: vec3(cx.add(u2.mul(0.15)), cy, u2), scale: 2 }).g.remap(
			0.2,
			0.95
		)

		// outer fade
		const outerFade = min(uv().y.smoothstep(0, 0.1), uv().y.oneMinus().smoothstep(0, 0.4))
		const fadeFactor = outerFade.mul(useFadeUniform).add(useFadeUniform.oneMinus())

		// effect
		const effect = noise1
			.mul(noise2)
			.mul(fadeFactor)
			.mul(impactIntensity.add(initialIntensity * 0.8))

		const emissiveColorLuminance = luminance(emissiveColor)
		const baseColor = emissiveColor
			.mul(impactIntensity.add(initialIntensity))
			.div(emissiveColorLuminance)

		// Desaturate when inactive: mix toward dim gray
		const grayColor = vec3(emissiveColorLuminance.mul(0.3))
		const activeColor = mix(grayColor, baseColor, activeUniform.oneMinus().mul(0.7).oneMinus())

		return vec4(activeColor, effect.smoothstep(0, 0.03))
	})()

	return { mat, impactIntensity, emissiveColor, activeUniform }
}
