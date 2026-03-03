import { buildInstrumentMaterial } from '../video/material-instrument-gen'

export const makeMarbleMaterial = (c: string) => buildInstrumentMaterial(c, 0.51)
export const makeInstrumentMaterial = (c: string, transparent = true) =>
	buildInstrumentMaterial(c, 0.51, transparent)

export { buildRailMaterial as makeRailMaterial } from '../video/material-rail-gen'

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
