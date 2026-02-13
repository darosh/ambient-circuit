// based on https://github.com/mrdoob/three.js/blob/master/examples/webgpu_tsl_vfx_tornado.html

import { TextureLoader, MeshBasicNodeMaterial, RepeatWrapping, DoubleSide } from 'three/webgpu'
import {
	luminance,
	min,
	time,
	uniform,
	color,
	texture,
	Fn,
	uv,
	vec2,
	vec4,
	positionWorld
} from 'three/tsl'

const textureLoader = new TextureLoader()
const perlinTexture = textureLoader.load('./rgb-256x256.png')
perlinTexture.wrapS = RepeatWrapping
perlinTexture.wrapT = RepeatWrapping

const timeScale = uniform(0.2)

/* eslint-disable @typescript-eslint/no-explicit-any */
const toSkewedUv = Fn(([uvCoord, skew]: any[]) => {
	return vec2(uvCoord.x.add(uvCoord.y.mul(skew.x)), uvCoord.y.add(uvCoord.x.mul(skew.y)))
}) as (...args: any[]) => any
/* eslint-enable @typescript-eslint/no-explicit-any */

// Material cache: key = `${color}_${intensity}_${transparent}`
/* eslint-disable @typescript-eslint/no-explicit-any */
const materialCache = new Map<string, { mat: MeshBasicNodeMaterial; impactIntensity: any }>()
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
	transparent: boolean = true
) {
	const emissiveColor = uniform(color(hexColor))
	const impactIntensity = uniform(0.0)

	const mat = new MeshBasicNodeMaterial({
		transparent,
		side: DoubleSide
	})

	mat.outputNode = Fn(() => {
		const scaledTime = time.mul(timeScale).negate()

		// world-position-derived phase offset — varies per rail, deterministic
		const posPhase = positionWorld.xz.mul(0.5)

		// noise 1
		const noise1Uv = uv()
			.add(vec2(scaledTime.add(posPhase.x), scaledTime.negate().add(posPhase.y)))
			.toVar()
		noise1Uv.assign(toSkewedUv(noise1Uv, vec2(-1, 0)))
		noise1Uv.mulAssign(vec2(2, 0.25))

		const noise1 = texture(perlinTexture, noise1Uv, 1).r.remap(0.3, 0.95)

		// noise 2
		const noise2Uv = uv()
			.add(vec2(scaledTime.mul(0.5).add(posPhase.x), scaledTime.negate().add(posPhase.y)))
			.toVar()

		noise2Uv.assign(toSkewedUv(noise2Uv, vec2(-1, 0)))
		noise2Uv.mulAssign(vec2(5, 1))

		const noise2 = texture(perlinTexture, noise2Uv, 1).g.remap(0.3, 0.95)

		// outer fade
		const outerFade = min(uv().y.smoothstep(0, 0.1), uv().y.oneMinus().smoothstep(0, 0.4))

		// effect
		const effect = noise1
			.mul(noise2)
			.mul(outerFade)
			.mul(impactIntensity.add(initialIntensity * 0.8))

		const emissiveColorLuminance = luminance(emissiveColor)

		return vec4(
			emissiveColor.mul(impactIntensity.add(initialIntensity)).div(emissiveColorLuminance),
			effect.smoothstep(0, 0.03)
		)
	})()

	return { mat, impactIntensity, emissiveColor }
}
