import { buildRailMaterial } from './video/material-rail'

export const makeRailMaterial = buildRailMaterial
export const makeMarbleMaterial = (c: string) => buildRailMaterial(c, 0.51)
export const makeInstrumentMaterial = (c: string, transparent = true) =>
	buildRailMaterial(c, 0.51, transparent)
