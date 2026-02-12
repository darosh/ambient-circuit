import { buildRailMaterial, createRailMaterial } from './video/material-rail'
// import { createMarbleMaterial } from './video/material-marble'
// import { createInstrumentMaterial } from './video/material-instrument'

export const makeRailMaterial = createRailMaterial
export const makeMarbleMaterial = (c: string) => buildRailMaterial(c, 0.51)
export const makeInstrumentMaterial = (c: string, transparent = true) =>
	buildRailMaterial(c, 0.51, transparent)
