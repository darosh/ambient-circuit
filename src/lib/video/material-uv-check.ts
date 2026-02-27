import { MeshBasicNodeMaterial, DoubleSide } from 'three/webgpu'
import { uniform, color, Fn, uv, vec4, floor, mod } from 'three/tsl'

/**
 * UV checker material — same return signature as buildRailMaterial.
 * Renders a checkerboard in UV space to verify UV mapping.
 */
export function buildUvCheckMaterial(
	hexColor: string = '#ffffff',
	_initialIntensity: number = 0.7,
	_transparent: boolean = true
) {
	const emissiveColor = uniform(color(hexColor))
	const impactIntensity = uniform(0)
	const activeUniform = uniform(1)

	const mat = new MeshBasicNodeMaterial({ side: DoubleSide })

	mat.outputNode = Fn(() => {
		// 8x8 checker grid
		const scale = 8
		const cx = floor(mod(uv().x.mul(scale), 2))
		const cy = floor(mod(uv().y.mul(scale), 2))
		const checker = cx.add(cy).mod(2)
		const uvs = uv()
		const inFirstCol = floor(uvs.x.mul(scale)).equal(0)
		const inFirstRow = floor(uvs.y.mul(scale)).equal(0)
		const inLastCol = floor(uvs.x.mul(scale)).equal(scale - 1)
		const inLastRow = floor(uvs.y.mul(scale)).equal(scale - 1)
		const isRedCell = inFirstCol.and(inFirstRow)
		const isBlueCell = inLastCol.and(inLastRow)
		const grey = vec4(checker, checker, checker, 1)
		const red = vec4(1, 0, 0, 1)
		const blue = vec4(0, 0, 1, 1)
		return isRedCell.select(red, isBlueCell.select(blue, grey))
	})()

	return { mat, impactIntensity, emissiveColor, activeUniform }
}
