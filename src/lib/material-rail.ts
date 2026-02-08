// based on https://github.com/mrdoob/three.js/blob/master/examples/webgpu_tsl_vfx_tornado.html

import * as THREE from 'three/webgpu'
import { luminance, min, time, uniform, color, texture, Fn, uv, vec2, vec4 } from 'three/tsl'

const textureLoader = new THREE.TextureLoader()
const perlinTexture = textureLoader.load('./rgb-256x256.png')
perlinTexture.wrapS = THREE.RepeatWrapping
perlinTexture.wrapT = THREE.RepeatWrapping

const timeScale = uniform(0.2)

/* eslint-disable @typescript-eslint/no-explicit-any */
const toSkewedUv = Fn(([uvCoord, skew]: any[]) => {
	return vec2(uvCoord.x.add(uvCoord.y.mul(skew.x)), uvCoord.y.add(uvCoord.x.mul(skew.y)))
}) as (...args: any[]) => any
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Create a glowing noise-based rail material (WebGPU/TSL).
 */
export function createRailMaterial(hexColor: string) {
	const emissiveColor = uniform(color(hexColor))
	const impactIntensity = uniform(0.0)

	const mat = new THREE.MeshBasicNodeMaterial({
		transparent: true,
		side: THREE.DoubleSide
	})

	mat.outputNode = Fn(() => {
		const scaledTime = time.mul(timeScale).negate()

		// noise 1
		const noise1Uv = uv().add(vec2(scaledTime, scaledTime.negate())).toVar()
		noise1Uv.assign(toSkewedUv(noise1Uv, vec2(-1, 0)))
		noise1Uv.mulAssign(vec2(2, 0.25))
		const noise1 = texture(perlinTexture, noise1Uv, 1).r.remap(0.45, 0.7)

		// noise 2
		const noise2Uv = uv()
			.add(vec2(scaledTime.mul(0.5), scaledTime.negate()))
			.toVar()
		noise2Uv.assign(toSkewedUv(noise2Uv, vec2(-1, 0)))
		noise2Uv.mulAssign(vec2(5, 1))
		const noise2 = texture(perlinTexture, noise2Uv, 1).g.remap(0.45, 0.7)

		// outer fade
		const outerFade = min(uv().y.smoothstep(0, 0.1), uv().y.oneMinus().smoothstep(0, 0.4))

		// effect
		const effect = noise1.mul(noise2).mul(outerFade)

		const emissiveColorLuminance = luminance(emissiveColor)

		return vec4(emissiveColor.mul(1.2).div(emissiveColorLuminance), effect.smoothstep(0, 0.1))
	})()

	return { mat, impactIntensity }
}
