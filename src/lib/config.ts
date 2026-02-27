
import { buildInstrumentMaterial } from './video/material-instrument-gen'


export const makeMarbleMaterial = (c: string) => buildInstrumentMaterial(c, 0.51)
export const makeInstrumentMaterial = (c: string, transparent = true) =>
	buildInstrumentMaterial(c, 0.51, transparent)

export {buildRailMaterial as makeRailMaterial} from './video/material-rail-gen'