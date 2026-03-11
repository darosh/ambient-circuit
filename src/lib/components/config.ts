import { sharedInstrumentMaterial } from '../video/material-instrument-gen'
import { sharedRailMaterial } from '../video/material-rail-gen'
import { clearImpactMaterialCache } from '../video/material-impact'
import { clearStandardMaterialCache } from '../video/material-standard'

// Singleton material instances — never disposed, live for app lifetime
export const railMaterial = sharedRailMaterial()
export const instrumentMaterial = sharedInstrumentMaterial()
export const marbleMaterial = instrumentMaterial

export function disposeSharedMaterials() {
	railMaterial.mat.dispose()
	instrumentMaterial.mat.dispose()

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
