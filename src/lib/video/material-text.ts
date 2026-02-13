import { Line2NodeMaterial } from 'three/webgpu'
import { luminance, uniform, color as colorShader, Fn, vec4, min, max, uv } from 'three/tsl'
import type { UniformNode, Color } from 'three/webgpu'

const colorCache = new Map<string, { mat: Line2NodeMaterial; emissiveColor: UniformNode<Color> }>()

export function getTextMaterialCached(color: string, width: number) {
	const materialKey = `${color}-${width}`
	let material = colorCache.get(materialKey)

	if (!material) {
		material = getTextMaterial(color, width)

		colorCache.set(materialKey, material)
	}

	return material
}

export type LineMat = {
	mat: Line2NodeMaterial
	emissiveColor: UniformNode<Color>
}

export function getTextMaterial(color: string, width: number): LineMat {
	const mat = new Line2NodeMaterial({
		color,
		linewidth: width / 200,
		vertexColors: false,
		dashed: false,
		alphaToCoverage: true,
		worldUnits: true
	})

	const emissiveColor = uniform(colorShader(color))

	mat.outputNode = Fn(() => {
		const outerFade = max(uv().y.smoothstep(0.5, 1), uv().y.oneMinus().smoothstep(0, 0.9))
		const m = emissiveColor.mul(outerFade)
		const emissiveColorLuminance = luminance(m.mul(2))
		return vec4(
			min(m.mul(3), 1.5).div(emissiveColorLuminance).mul(outerFade),
			outerFade.min(1) //.mul(max(.7, fract(time.mul(33))))
		)
	})()

	return { mat, emissiveColor }
}
