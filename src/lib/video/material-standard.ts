import { MeshStandardMaterial } from 'three/webgpu'
import { debug } from 'debug'

const log = debug('mat:std')

// Material cache: key = color hex string
const materialCache = new Map<string, MeshStandardMaterial>()

/**
 * Create a MeshStandardMaterial with color memoization
 */
export function createStandardMaterialCached(id: string, color: string): MeshStandardMaterial {
	const cached = materialCache.get(id)
	if (cached) {
		log('reusing', id)
		cached.userData.refCount++
		return cached
	}

	const material = makeStandardMaterial(color, true)
	material.name = id
	material.userData.refCount = 1
	log('creating', id)
	materialCache.set(id, material)
	return material
}

/**
 * Sweep material cache — dispose only entries with refCount === 0
 */
export function clearStandardMaterialCache(all = false): void {
	for (const [key, material] of materialCache.entries()) {
		if (!material.userData.refCount || all) {
			log('disposing', key)
			material.dispose()
			materialCache.delete(key)
		}
	}

	log('cached materials', materialCache.size)
}

export function makeStandardMaterial(color: string, cached = false) {
	if (!cached) {
		log('building')
	}

	return new MeshStandardMaterial({ color })
}
