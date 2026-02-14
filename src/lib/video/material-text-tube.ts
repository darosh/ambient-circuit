import { MeshBasicNodeMaterial } from 'three/webgpu'
import { luminance, uniform, color as colorShader, Fn, vec4 } from 'three/tsl'
import type { UniformNode, Color } from 'three/webgpu'

const tubeCache = new Map<
	string,
	{ mat: MeshBasicNodeMaterial; emissiveColor: UniformNode<Color> }
>()

export type TubeMat = {
	mat: MeshBasicNodeMaterial
	emissiveColor: UniformNode<Color>
}

export function createTubeMaterialCached(id: string, color: string): TubeMat {
	let material = tubeCache.get(id)

	if (!material) {
		material = createTubeMaterial(color)
		tubeCache.set(id, material)
	}

	return material
}

function createTubeMaterial(color: string): TubeMat {
	const mat = new MeshBasicNodeMaterial({
		color,
		transparent: true
	})

	const emissiveColor = uniform(colorShader(color))

	mat.colorNode = Fn(() => {
		return vec4(emissiveColor.div(luminance(emissiveColor).mul(1.9)), 1)
	})()

	return { mat, emissiveColor }
}
