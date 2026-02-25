import { buildRailMaterial } from './video/material-rail-gen'
import { buildInstrumentMaterial } from './video/material-instrument-gen'

export const makeRailMaterial = buildRailMaterial
export const makeMarbleMaterial = (c: string) => buildInstrumentMaterial(c, 0.51)
export const makeInstrumentMaterial = (c: string, transparent = true) =>
	buildInstrumentMaterial(c, 0.51, transparent)
