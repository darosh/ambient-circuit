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

/**
 * Build instrument material (internal, not cached).
 *
 * For closed geometries call setUvMax(geo.userData.uvMax) after building geometry —
 * this snaps uvFreq to an integer repeat count so the pattern is seamless and
 * density/speed are consistent regardless of tube length.
 * For open geometries uvMax=0 (default) keeps the original linear UV sampling.
 */
export function buildInstrumentMaterial(
	hexColor: string,
	initialIntensity: number = 0.7,
	transparent: boolean = true,
	uvFreq: number = 0.1,
	useFade = 0.5
) {
	const emissiveColor = uniform(color(hexColor))
	const impactIntensity = uniform(0)
	const activeUniform = uniform(1)
	const uvFreqEffective = uniform(uvFreq)
	const useFadeUniform = float(useFade)

	const mat = new MeshBasicNodeMaterial({
		transparent,
		side: DoubleSide
	})

	mat.outputNode = Fn(() => {
		const scaledTime = time.mul(timeScale).mul(0.8).negate()

		// y always maps to a circle so angular seam is seamless
		const TWO_PI = float(Math.PI * 2)
		const angleY = uv().y.mul(TWO_PI)
		const cosY = cos(angleY)
		const sinY = sin(angleY)
		const R2 = float(0.25)

		// angle = (uv.x * uvFreqEffective + scaledTime) * 2π
		// uvFreqEffective = round(uvMax*uvFreq)/uvMax → integer repeats, seamless at seam
		// scaledTime term gives same world-space flow speed regardless of tube length
		const r1 = uvFreqEffective.add(R2.mul(cosY))
		const angleX1 = uv().x.mul(uvFreqEffective).add(scaledTime).mul(TWO_PI)
		const noisePos1 = vec3(r1.mul(cos(angleX1)), r1.mul(sin(angleX1)), R2.mul(sinY))

		const r2 = uvFreqEffective.mul(2.5).add(R2.mul(cosY))
		const angleX2 = uv()
			.x.mul(uvFreqEffective.mul(1))
			.add(scaledTime.mul(0.75))
			.add(positionWorld.x.mul(0.3))
			.mul(TWO_PI)
		const noisePos2 = vec3(r2.mul(cos(angleX2)), r2.mul(sin(angleX2)), R2.mul(sinY))

		const noise1 = perlinNoise({ position: noisePos1, scale: 3 }).r.remap(0.2, 0.95)
		const noise2 = perlinNoise({ position: noisePos2, scale: 2 }).g.remap(0.2, 0.95)

		// outer fade
		const outerFade = min(uv().y.smoothstep(0, 0.1), uv().y.oneMinus().smoothstep(0, 0.4))
		const fadeFactor = outerFade.mul(useFadeUniform).add(useFadeUniform.oneMinus())

		const effect = noise1
			.mul(noise2)
			.mul(fadeFactor)
			.mul(impactIntensity.add(initialIntensity * 0.8))

		const emissiveColorLuminance = luminance(emissiveColor)
		const baseColor = emissiveColor
			.mul(impactIntensity.add(initialIntensity))
			.div(emissiveColorLuminance)

		const grayColor = vec3(emissiveColorLuminance.mul(0.3))
		const activeColor = mix(grayColor, baseColor, activeUniform.oneMinus().mul(0.7).oneMinus())

		return vec4(activeColor, effect.smoothstep(0, 0.03))
	})()

	/** Call after building geometry. Snaps uvFreq to integer repeats for seamless tiling. */
	function setUvMax(uvMax: number) {
		uvFreqEffective.value = uvMax > 0 ? Math.max(1, Math.round(uvMax * uvFreq)) / uvMax : uvFreq
	}

	return { mat, impactIntensity, emissiveColor, activeUniform, setUvMax }
}
