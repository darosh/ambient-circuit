import { describe, it, expect } from 'vitest'
import { scenes } from '../src/scenes/index'

describe('scene ids', () => {
	it('scene ids are unique', () => {
		const ids = scenes.map((s) => s.id)
		const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
		expect(dupes).toEqual([])
	})

	it('rail ids are unique within each scene', () => {
		for (const scene of scenes) {
			const ids = scene.rails.map((r) => r.id)
			const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
			expect(dupes, `scene '${scene.id}' has duplicate rail ids`).toEqual([])
		}
	})
})
