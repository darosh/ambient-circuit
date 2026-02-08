import * as THREE from 'three/webgpu'
import { color, time, sin, uniform, vec4, luminance } from 'three/tsl'

/**
 * Glowing pulsing marble material (WebGPU/TSL).
 */
export function createMarbleMaterial(hexColor: string) {
	const baseColor = uniform(color(hexColor))
	const pulseSpeed = uniform(2.0)
	const pulseAmount = uniform(0.2)

	const mat = new THREE.MeshBasicNodeMaterial({
		transparent: true
	})

	mat.outputNode = (() => {
		const pulse = sin(time.mul(pulseSpeed)).mul(pulseAmount).add(1.0)
		const colorNode = baseColor.mul(pulse)
		const lum = luminance(colorNode).max(0.01)
		const emissive = colorNode.mul(1.5).div(lum)
		return vec4(emissive, 1.0)
	})()

	return mat
}
