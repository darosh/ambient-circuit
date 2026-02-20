import type { AudioChain, AudioBus } from '../audio/types'
import { listBusFxParams } from '../audio/engine'

export type ParamInfo = { path: string; value: number; min: number; max: number }

export function readChainParams(chain: AudioChain): {
	genParamInfos: ParamInfo[]
	genParams: Record<string, number>
	fxParamInfos: Record<string, ParamInfo[]>
	fxParams: Record<string, Record<string, number>>
} {
	const genParamInfos = chain.listParams()
	const genParams: Record<string, number> = {}
	for (const p of genParamInfos) genParams[p.path] = p.value

	const fxParamInfos: Record<string, ParamInfo[]> = {}
	const fxParams: Record<string, Record<string, number>> = {}
	const fxList = chain.config.fx ?? []
	for (let i = 0; i < fxList.length; i++) {
		const fInfos = chain.listFxParams(i)
		if (fInfos.length > 0) {
			fxParamInfos[i.toString()] = fInfos
			const p: Record<string, number> = {}
			for (const f of fInfos) p[f.path] = f.value
			fxParams[i.toString()] = p
		}
	}
	return { genParamInfos, genParams, fxParamInfos, fxParams }
}

export function readBusParams(bus: AudioBus): {
	busFxParamInfos: Record<string, ParamInfo[]>
	busFxParams: Record<string, Record<string, number>>
} {
	const busFxParamInfos: Record<string, ParamInfo[]> = {}
	const busFxParams: Record<string, Record<string, number>> = {}
	for (let i = 0; i < bus.fx.length; i++) {
		const infos = listBusFxParams(bus, i)
		if (infos.length > 0) {
			busFxParamInfos[i.toString()] = infos
			const p: Record<string, number> = {}
			for (const f of infos) p[f.path] = f.value
			busFxParams[i.toString()] = p
		}
	}
	return { busFxParamInfos, busFxParams }
}
