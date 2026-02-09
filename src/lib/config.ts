import { createRailMaterial } from './material-rail'
// import { createMarbleMaterial } from './material-marble'
// import { createInstrumentMaterial } from './material-instrument'

export const makeRailMaterial = createRailMaterial
export const makeMarbleMaterial = (c: string) => createRailMaterial(c, 0.51)
export const makeInstrumentMaterial = (c: string, transparent = true) => createRailMaterial(c, 0.51, transparent)
