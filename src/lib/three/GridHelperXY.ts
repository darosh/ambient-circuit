import { LineSegments } from 'three/webgpu'
import { LineBasicMaterial } from 'three/webgpu'
import { Float32BufferAttribute } from 'three/webgpu'
import { BufferGeometry } from 'three/webgpu'
import { Color } from 'three/webgpu'

class GridHelperXY extends LineSegments {
	type = 'GridHelperXY'

	constructor(sizeX = 10, sizeY = 10, divisionsX = 10, divisionsY = 10, color = 0x888888) {
		const halfX = sizeX / 2
		const halfY = sizeY / 2

		const stepX = sizeX / divisionsX
		const stepY = sizeY / divisionsY

		const vertices = []

		// Vertical lines (parallel to Y axis)
		for (let i = 0; i <= divisionsX; i++) {
			const x = -halfX + i * stepX
			vertices.push(x, -halfY, 0, x, halfY, 0)
		}

		// Horizontal lines (parallel to X axis)
		for (let j = 0; j <= divisionsY; j++) {
			const y = -halfY + j * stepY
			vertices.push(-halfX, y, 0, halfX, y, 0)
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

export { GridHelperXY }
