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

export function sharedInstrumentMaterial() {
	// Uniforms that can vary per instrument (or stay fixed)
	const emissiveColor = uniform(color('#ffffff')) // neutral default; overridden per mesh
	const impactIntensity = uniform(0)
	const initialIntensity = uniform(0.7)
	const activeUniform = uniform(1)
	const uvFreqEffective = uniform(0.1) // we'll update this dynamically too if using setUvMax
	const useFadeUniform = float(0.5)

	const mat = new MeshBasicNodeMaterial({
		transparent: true,
		side: DoubleSide
	})

	mat.outputNode = Fn(() => {
		const scaledTime = time.mul(timeScale).mul(0.8).negate()

		const TWO_PI = float(Math.PI * 2)
		const angleY = uv().y.mul(TWO_PI)
		const cosY = cos(angleY)
		const sinY = sin(angleY)
		const R2 = float(0.25)

		// noise1
		const r1 = uvFreqEffective.add(R2.mul(cosY))
		const angleX1 = uv().x.mul(uvFreqEffective).add(scaledTime).mul(TWO_PI)
		const noisePos1 = vec3(r1.mul(cos(angleX1)), r1.mul(sin(angleX1)), R2.mul(sinY))

		// noise2
		const r2 = uvFreqEffective.mul(2.5).add(R2.mul(cosY))
		const angleX2 = uv()
			.x.mul(uvFreqEffective.mul(1))
			.add(scaledTime.mul(0.75))
			.add(positionWorld.x.mul(0.3))
			.mul(TWO_PI)
		const noisePos2 = vec3(r2.mul(cos(angleX2)), r2.mul(sin(angleX2)), R2.mul(sinY))

		const noise1 = (perlinNoise({ position: noisePos1, scale: 3 }) as Node<'vec3'>).r.remap(0.2, 0.95)
		const noise2 = (perlinNoise({ position: noisePos2, scale: 2 }) as Node<'vec3'>).g.remap(0.2, 0.95)

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

	// Keep setUvMax as a helper — now it updates the shared uniform
	function setUvMax(uvMax: number, uvFreq: number = 0.1) {
		uvFreqEffective.value = uvMax > 0 ? Math.max(1, Math.round(uvMax * uvFreq)) / uvMax : uvFreq
	}

	function getUvMax(uvMax: number, uvFreq: number = 0.1) {
		return uvMax > 0 ? Math.max(1, Math.round(uvMax * uvFreq)) / uvMax : uvFreq
	}

	return {
		mat,
		emissiveColor,
		initialIntensity,
		impactIntensity,
		activeUniform,
		uvFreqEffective,
		setUvMax,
		getUvMax
	}
}
