// based on https://github.com/mrdoob/three.js/blob/master/examples/webgpu_tsl_vfx_tornado.html

import { MeshBasicNodeMaterial, DoubleSide } from 'three/webgpu'
import type { Node } from 'three/webgpu'
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

// Create this **once** — e.g. at app startup or in a material cache
export function sharedRailMaterial() {
	const emissiveColor = uniform(color('#ffffff'))
	const initialIntensity = uniform(0.7)
	const impactIntensity = uniform(0)
	const activeUniform = uniform(1)
	const uvFreqUniform = uniform(0.75)
	const useFadeUniform = float(0.5)

	/* eslint-disable @typescript-eslint/no-explicit-any */
	emissiveColor.onObjectUpdate((frame: any) => {
		const d = frame.object?.userData?.railData
		if (d) emissiveColor.value.copy(d.color)
	})
	initialIntensity.onObjectUpdate((frame: any) => {
		const d = frame.object?.userData?.railData
		if (d) initialIntensity.value = d.initialIntensity
	})
	impactIntensity.onObjectUpdate((frame: any) => {
		const d = frame.object?.userData?.railData
		if (d) impactIntensity.value = d.intensity
	})
	activeUniform.onObjectUpdate((frame: any) => {
		const d = frame.object?.userData?.railData
		if (d) activeUniform.value = d.active
	})
	/* eslint-enable @typescript-eslint/no-explicit-any */

	const mat = new MeshBasicNodeMaterial({
		transparent: true,
		side: DoubleSide
	})

	mat.outputNode = Fn(() => {
		const scaledTime = time.mul(timeScale).mul(2).negate()

		const angle = uv().y.mul(float(Math.PI * 2))
		const cx = cos(angle).mul(0.5)
		const cy = sin(angle).mul(0.5)

		const u1 = uv().x.mul(uvFreqUniform).add(scaledTime).add(positionWorld.x.mul(10.3))
		const noise1 = (
			perlinNoise({ position: vec3(cx.add(u1.mul(0.3)), cy, u1), scale: 2 }) as Node<'vec3'>
		).r.remap(0.2, 0.95)

		const u2 = uv()
			.x.mul(uvFreqUniform.mul(2.5))
			.add(scaledTime.mul(0.5))
			.add(positionWorld.z.mul(0.3))
		const noise2 = (
			perlinNoise({ position: vec3(cx.add(u2.mul(0.15)), cy, u2), scale: 2 }) as Node<'vec3'>
		).g.remap(0.2, 0.95)

		const outerFade = min(uv().y.smoothstep(0, 0.1), uv().y.oneMinus().smoothstep(0, 0.4))
		const fadeFactor = outerFade.mul(useFadeUniform).add(useFadeUniform.oneMinus())

		const effect = noise1
			.mul(noise2)
			.mul(fadeFactor)
			.mul(impactIntensity.add(initialIntensity.mul(0.8)))

		const emissiveColorLuminance = luminance(emissiveColor)
		const baseColor = emissiveColor
			.mul(impactIntensity.add(initialIntensity))
			.div(emissiveColorLuminance)

		const grayColor = vec3(emissiveColorLuminance.mul(0.3))
		const activeColor = mix(grayColor, baseColor, activeUniform.oneMinus().mul(0.7).oneMinus())

		return vec4(activeColor, effect.smoothstep(0, 0.03))
	})()

	return { mat, emissiveColor, initialIntensity, impactIntensity, activeUniform, uvFreqUniform }
}
