import { LineSegments } from 'three/webgpu'
import { LineBasicMaterial } from 'three/webgpu'
import { Float32BufferAttribute } from 'three/webgpu'
import { BufferGeometry } from 'three/webgpu'
import { Color } from 'three/webgpu'

class GridHelperIO extends LineSegments {
	type = 'GridHelperIO'

	constructor(
		radius = 10,
		innerRadius = 0,
		sectors = 16,
		rings = 8,
		divisions = 64,
		color = 0x88_88_88
	) {
		innerRadius = Math.max(0, innerRadius)
		radius = Math.max(innerRadius, radius)

		const vertices = []

		// ----- SECTORS -----
		if (sectors > 0) {
			for (let i = 0; i < sectors; i++) {
				const angle = (i / sectors) * (Math.PI * 2)

				const sin = Math.sin(angle)
				const cos = Math.cos(angle)

				// start at innerRadius (not 0)
				vertices.push(sin * innerRadius, 0, cos * innerRadius, sin * radius, 0, cos * radius)
			}
		}

		// ----- RINGS -----
		if (rings > 0) {
			const ringStep = (radius - innerRadius) / rings

			for (let i = 0; i <= rings; i++) {
				const r = innerRadius + ringStep * i

				for (let j = 0; j < divisions; j++) {
					const v1 = (j / divisions) * (Math.PI * 2)
					const v2 = ((j + 1) / divisions) * (Math.PI * 2)

					vertices.push(
						Math.sin(v1) * r,
						0,
						Math.cos(v1) * r,
						Math.sin(v2) * r,
						0,
						Math.cos(v2) * r
					)
				}
			}
		}

		const geometry = new BufferGeometry()
		geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))

		const material = new LineBasicMaterial({
			color: new Color(color),
			toneMapped: false
		})

		super(geometry, material)
	}

	dispose() {
		this.geometry.dispose()
		;(<LineBasicMaterial>this.material).dispose()
	}
}

export { GridHelperIO }
