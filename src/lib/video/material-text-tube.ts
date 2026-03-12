import { MeshBasicNodeMaterial } from 'three/webgpu'
import { luminance, mix, uniform, color as colorShader, Fn, vec3, vec4 } from 'three/tsl'
import type { UniformNode, Color } from 'three/webgpu'
import { debug } from 'debug'

const log = debug('mat:tube')

const tubeCache = new Map<
	string,
	{
		mat: MeshBasicNodeMaterial
		emissiveColor: UniformNode<'color', Color>
		activeUniform: UniformNode<'float', number>
	}
>()

export type TubeMat = {
	mat: MeshBasicNodeMaterial
	emissiveColor: UniformNode<'color', Color>
	activeUniform: UniformNode<'float', number>
}

export function clearTubeMaterialCache(all = false): void {
	for (const [key, { mat }] of tubeCache.entries()) {
		if (!mat.userData.refCount || all) {
			log('disposing', key)
			mat.dispose()
			tubeCache.delete(key)
		}
	}
	log('cached materials', tubeCache.size)
}

export function createTubeMaterialCached(id: string, color: string): TubeMat {
	let material = tubeCache.get(id)

	if (material) {
		log('reusing', id)
		material.mat.userData.refCount++
		return material
	}

	log('creating', id)
	material = createTubeMaterial(color)
	material.mat.userData.refCount = 1
	tubeCache.set(id, material)

	return material
}

function createTubeMaterial(color: string): TubeMat {
	const mat = new MeshBasicNodeMaterial({
		color,
		transparent: true
	})

	const emissiveColor = uniform(colorShader(color))
	const activeUniform = uniform(1)

	mat.colorNode = Fn(() => {
		const lum = luminance(emissiveColor)
		const baseColor = emissiveColor.div(lum.mul(1.9))
		const grayColor = vec3(lum.mul(0.3))
		const activeColor = mix(grayColor, baseColor, activeUniform.oneMinus().mul(0.7).oneMinus())
		return vec4(activeColor, 1)
	})()

	return { mat, emissiveColor, activeUniform }
}
