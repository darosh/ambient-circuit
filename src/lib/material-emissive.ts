// based on https://github.com/mrdoob/three.js/blob/master/examples/webgpu_tsl_vfx_tornado.html

import * as THREE from 'three/webgpu'
import {
	luminance,
	cos,
	min,
	time,
	atan,
	uniform,
	pass,
	PI,
	TWO_PI,
	color,
	positionLocal,
	sin,
	texture,
	Fn,
	uv,
	vec2,
	vec3,
	vec4
} from 'three/tsl'

const textureLoader = new THREE.TextureLoader()
const perlinTexture = textureLoader.load('./rgb-256x256.png')
perlinTexture.wrapS = THREE.RepeatWrapping
perlinTexture.wrapT = THREE.RepeatWrapping

const emissiveColor = uniform(color('#ff8b4d'))
const timeScale = uniform(0.2)
const parabolStrength = uniform(1)
const parabolOffset = uniform(0.3)
const parabolAmplitude = uniform(0.2)

const toSkewedUv = Fn(([uv, skew]: any[]) => {
	return vec2(uv.x.add(uv.y.mul(skew.x)), uv.y.add(uv.x.mul(skew.y)))
}) as (...args: any[]) => any

const twistedCylinder = Fn(([position, parabolStrength, parabolOffset, parabolAmplitude, time]: any[]) => {
	const angle = atan(position.z, position.x).toVar()
	const elevation = position.y

	// parabol
	const radius = parabolStrength
		.mul(position.y.sub(parabolOffset))
		.pow(2)
		.add(parabolAmplitude)
		.toVar()

	// turbulences
	radius.addAssign(sin(elevation.sub(time).mul(20).add(angle.mul(2))).mul(0.05))

	const twistedPosition = vec3(cos(angle).mul(radius), elevation, sin(angle).mul(radius))

	return twistedPosition
}) as (...args: any[]) => any

export const emissiveMaterial = new THREE.MeshBasicNodeMaterial({
	transparent: true,
	side: THREE.DoubleSide,
	wireframe: false
})

emissiveMaterial.positionNode = twistedCylinder(
	positionLocal,
	parabolStrength,
	parabolOffset,
	parabolAmplitude.sub(0.05),
	time.mul(timeScale)
)

emissiveMaterial.outputNode = Fn(() => {
	const scaledTime = time.mul(timeScale)

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

	// output
	return vec4(
		emissiveColor.mul(1.2).div(emissiveColorLuminance), // emissive
		effect.smoothstep(0, 0.1) // alpha
	)
})()
