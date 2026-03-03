import { LineSegments, LineBasicMaterial, Float32BufferAttribute, BufferGeometry, Color } from 'three/webgpu'
import type { SplitRect } from '../components/multi-view/multi-view'

/**
 * Draws interior boundary lines between split cells in XY plane, centered at origin.
 * Takes actual rects from updateRects — correctly handles spanning cells.
 * No outer border; only edges between adjacent cells are drawn.
 */
class GridHelperCells extends LineSegments {
	type = 'GridHelperCells'

	constructor(
		rects: SplitRect[],
		totalW: number,
		totalH: number,
		drawW = 1,
		drawH = 1,
		color = 0x88_88_88
	) {
		const halfW = drawW / 2
		const halfH = drawH / 2
		const vertices: number[] = []
		const seen = new Set<string>()
		// Rects use screen Y (down=+), Three.js Y is up=+ — flip
		const sy = (screenY: number) => halfH - (screenY / totalH) * drawH
		const sx = (screenX: number) => (screenX / totalW) * drawW - halfW

		for (const r of rects) {
			// Left edge
			if (r.x > 0) {
				const key = `v:${r.x}:${r.y}:${r.y + r.height}`
				if (!seen.has(key)) {
					seen.add(key)
					vertices.push(sx(r.x), sy(r.y), 0, sx(r.x), sy(r.y + r.height), 0)
				}
			}
			// Top edge (screen top = positive 3D y)
			if (r.y > 0) {
				const key = `h:${r.y}:${r.x}:${r.x + r.width}`
				if (!seen.has(key)) {
					seen.add(key)
					vertices.push(sx(r.x), sy(r.y), 0, sx(r.x + r.width), sy(r.y), 0)
				}
			}
			// Right edge
			if (r.x + r.width < totalW) {
				const key = `v:${r.x + r.width}:${r.y}:${r.y + r.height}`
				if (!seen.has(key)) {
					seen.add(key)
					vertices.push(sx(r.x + r.width), sy(r.y), 0, sx(r.x + r.width), sy(r.y + r.height), 0)
				}
			}
			// Bottom edge
			if (r.y + r.height < totalH) {
				const key = `h:${r.y + r.height}:${r.x}:${r.x + r.width}`
				if (!seen.has(key)) {
					seen.add(key)
					vertices.push(sx(r.x), sy(r.y + r.height), 0, sx(r.x + r.width), sy(r.y + r.height), 0)
				}
			}
		}

		const geometry = new BufferGeometry()
		geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))

		const material = new LineBasicMaterial({ color: new Color(color), toneMapped: false })

		super(geometry, material)
	}

	dispose() {
		this.geometry.dispose()
		;(<LineBasicMaterial>this.material).dispose()
	}
}

export { GridHelperCells }
