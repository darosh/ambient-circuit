import { createRailMaterial } from './material-rail'
import { createMarbleMaterial } from './material-marble'
// import { createInstrumentMaterial } from './material-instrument'

export const makeRailMaterial = createRailMaterial
export const makeMarbleMaterial = createMarbleMaterial
export const makeInstrumentMaterial = (c: string) => createRailMaterial(c, 0.6)
