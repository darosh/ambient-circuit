import { mergeGeometries as mg } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { BufferGeometry } from 'three'

export function mergeGeometries(geometries: BufferGeometry[]): BufferGeometry {
	const uvMax = Math.max(...geometries.map(g => g.userData.uvMax ?? 0))
	const g = mg(geometries)
	g.userData.uvMax = uvMax

	console.log(uvMax)
	return g
}
