import { sharedInstrumentMaterial } from '../video/material-instrument'
import { clearImpactMaterialCache } from '../video/material-impact'
import { MeshStandardMaterial } from 'three/webgpu'
import { clearTubeMaterialCache } from '../video/material-text-tube'

// Singleton material instances — needs to be disposed to complete RenderObjects teardown
export const instrumentMaterial = sharedInstrumentMaterial()
export const railMaterial = instrumentMaterial
export const marbleMaterial = instrumentMaterial
export const wireframeMaterial = new MeshStandardMaterial({ wireframe: true, color: 0x99_99_99 })

export function disposeSharedMaterials() {
	railMaterial.mat.dispose()
	instrumentMaterial.mat.dispose()
	wireframeMaterial.dispose()

	clearImpactMaterialCache(true)
	clearTubeMaterialCache(true)
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
