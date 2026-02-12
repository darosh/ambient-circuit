import { createRailMaterial } from './video/material-rail'

export const makeRailMaterial = createRailMaterial
export const makeMarbleMaterial = (c: string) => createRailMaterial(c, 0.51)
export const makeInstrumentMaterial = (c: string, transparent = true) =>
	createRailMaterial(c, 0.51, transparent)
