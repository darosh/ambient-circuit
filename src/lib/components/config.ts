import { sharedInstrumentMaterial } from '../video/material-instrument'
import { sharedRailMaterial } from '../video/material-rail'
import { clearImpactMaterialCache } from '../video/material-impact'
import { clearStandardMaterialCache } from '../video/material-standard'
import { MeshStandardMaterial } from 'three/webgpu'

// Singleton material instances — needs to be disposed to complete RenderObjects teardown
export const railMaterial = sharedRailMaterial()
export const instrumentMaterial = sharedInstrumentMaterial()
export const marbleMaterial = instrumentMaterial
export const wireframeMaterial = new MeshStandardMaterial({ wireframe: true, color: 0x99_99_99 })

export function disposeSharedMaterials() {
	railMaterial.mat.dispose()
	instrumentMaterial.mat.dispose()
	wireframeMaterial.dispose()

	clearImpactMaterialCache(true)
	clearStandardMaterialCache(true)
}

export const defaultBloom = {
	strength: 0.5,
	radius: 0.2,
	threshold: 0.5
}

export const hudBloom = {
	strength: 0.5,
	radius: 0.2,
	threshold: 0.5
}
