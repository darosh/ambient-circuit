import { BloomConfig, ViewSplitConfig } from '../../core/scene'
import { defaultBloom } from '../config'

export function resolveBloom(
	cfg: ViewSplitConfig['bloom'],
	defaults: BloomConfig | undefined
): BloomConfig | null {
	if (!cfg) return null
	const d = defaults ?? {}
	if (cfg === true) {
		return {
			strength: d.strength ?? defaultBloom.strength,
			radius: d.radius ?? defaultBloom.radius,
			threshold: d.threshold ?? defaultBloom.threshold
		}
	}

	return {
		strength: cfg.strength ?? d.strength ?? defaultBloom.strength,
		radius: cfg.radius ?? d.radius ?? defaultBloom.radius,
		threshold: cfg.threshold ?? d.threshold ?? defaultBloom.threshold
	}
}
