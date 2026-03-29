import { screenUV, uniform, float, mix, vec2, vec3, vec4, step, time } from 'three/tsl'
import { bloom as bloomTsl } from 'three/addons/tsl/display/BloomNode.js'
import { gaussianBlur } from 'three/addons/tsl/display/GaussianBlurNode.js'
import { defaultBloom } from './config'

// Config types defined inline to avoid circular import with scene.ts
type BloomCfg = { strength?: number; radius?: number; threshold?: number }
type CrtCfg = { scanlines?: number; strength?: number }
type VignetteCfg = { intensity?: number; smoothness?: number }
type CurveCfg = { curvature?: number }
type JitterCfg = {
	/** Horizontal scanline jitter strength (default 0.003) */
	strength?: number
	/** Noise animation speed multiplier (default 1) */
	speed?: number
}
type ChromaticCfg = {
	/** Chromatic aberration X offset (default 0.005) */
	amount?: number
}
/** @deprecated use jitter() + chromatic() */
type VhsCfg = JitterCfg & ChromaticCfg & { chromatic?: number }

/**
 * Context passed through the FxFn chain.
 * - `source`: original scene texture node — UV-remapping effects resample from this
 * - `uv`: accumulated UV after previous effects — compose UV transforms by reading + writing this
 */
export type FxCtx = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	source: any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	uv: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FxFn = (color: any, ctx: FxCtx) => any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyFx(color: any, fns: FxFn[]): any {
	const ctx: FxCtx = { source: color, uv: screenUV }
	return fns.reduce((c, fn) => fn(c, ctx), color)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cloneAt(src: any, uv: any): any {
	const node = src.clone()
	node.uvNode = uv
	return node
}

export function bloom(cfg?: BloomCfg | true): FxFn {
	const c = !cfg || cfg === true ? {} : cfg
	const s = c.strength ?? defaultBloom.strength
	const r = c.radius ?? defaultBloom.radius
	const th = c.threshold ?? defaultBloom.threshold
	return (color) => color.add(bloomTsl(color, s, r, th))
}

export function tint(rgb: [number, number, number]): FxFn {
	const u = uniform(vec3(...rgb))
	// Multiply only RGB, preserve alpha (vec4*vec3 can zero alpha in TSL)
	return (color) => vec4(color.rgb.mul(u), color.a)
}

export function crt(cfg?: CrtCfg | true): FxFn {
	const c = !cfg || cfg === true ? {} : cfg
	const lines = uniform(float(c.scanlines ?? 600))
	const strength = uniform(float(c.strength ?? 0.25))
	return (color) => {
		const scanline = screenUV.y.mul(lines).mul(Math.PI).sin().abs()
		const factor = mix(float(1).sub(strength), float(1), scanline)
		return color.mul(factor)
	}
}

export function vignette(cfg?: VignetteCfg | true): FxFn {
	const c = !cfg || cfg === true ? {} : cfg
	const intensity = uniform(float(c.intensity ?? 1.4))
	const smoothness = uniform(float(c.smoothness ?? 0.5))
	return (color) => {
		const dist = screenUV.sub(vec2(0.5, 0.5)).length()
		const vig = dist.mul(intensity).smoothstep(smoothness, float(1)).oneMinus()
		return color.mul(vig)
	}
}

/**
 * VHS distortion: per-scanline horizontal jitter + chromatic aberration.
 * Updates ctx.uv with the jitter so subsequent UV effects (e.g. curve) compose on top.
 * R/G/B channels are sampled at slightly different X positions for color fringing.
 */
/**
 * Per-scanline horizontal jitter. Updates ctx.uv so subsequent UV effects (curve, chromatic)
 * stack on top. Place before curve() in the chain.
 */
export function jitter(cfg?: JitterCfg | true): FxFn {
	const c = !cfg || cfg === true ? {} : cfg
	const strength = uniform(float(c.strength ?? 0.003))
	const speed = uniform(float(c.speed ?? 0.5))
	return (_color, ctx) => {
		const t = time.mul(speed)
		const hash = ctx.uv.y.mul(127.1).add(t.mul(311.7)).sin().mul(43_758.545).fract()
		const j = hash.sub(0.5).mul(strength)
		const jitteredUV = vec2(ctx.uv.x.add(j), ctx.uv.y)
		ctx.uv = jitteredUV
		return cloneAt(ctx.source, jitteredUV)
	}
}

/**
 * Chromatic aberration: R and B channels sampled at ±amount offset from ctx.uv.
 * Uses _color.g for the green channel (no extra sample).
 * Place after jitter() and curve() so offsets are in the warped UV space.
 */
export function chromatic(cfg?: ChromaticCfg | true): FxFn {
	const c = !cfg || cfg === true ? {} : cfg
	const amount = uniform(float(c.amount ?? 0.005))
	return (_color, ctx) => {
		const uvR = vec2(ctx.uv.x.add(amount), ctx.uv.y)
		const uvB = vec2(ctx.uv.x.sub(amount), ctx.uv.y)
		const sR = cloneAt(ctx.source, uvR)
		const sB = cloneAt(ctx.source, uvB)
		return vec4(sR.r, _color.g, sB.b, _color.a)
	}
}

/** @deprecated use jitter() + chromatic() separately for correct composition with curve() */
export function vhs(cfg?: VhsCfg | true): FxFn {
	const c = !cfg || cfg === true ? {} : cfg
	const jitterFn = jitter({ strength: c.strength, speed: c.speed })
	const chromaticFn = chromatic({ amount: c.chromatic ?? c.amount })
	return (color, ctx) => chromaticFn(jitterFn(color, ctx), ctx)
}

/**
 * Barrel (CRT screen) distortion.
 * Uses ctx.uv as base so it stacks correctly after vhs() jitter.
 * Pixels outside [0,1] are blacked out.
 */
export function curve(cfg?: CurveCfg | true): FxFn {
	const c = !cfg || cfg === true ? {} : cfg
	const curvature = uniform(float(c.curvature ?? 0.3))
	return (_color, ctx) => {
		// Barrel: f = 1 + r²·curvature; distorted = f·(uv−0.5)+0.5
		const centered = ctx.uv.sub(vec2(0.5, 0.5))
		const r2 = centered.dot(centered)
		const f = float(1).add(r2.mul(curvature)).mul(curvature.div(4).oneMinus())
		const distortedUV = f.mul(centered).add(vec2(0.5, 0.5))
		ctx.uv = distortedUV // update for subsequent effects

		// Black outside [0,1]
		const inBounds = step(float(0), distortedUV.x)
			.mul(step(distortedUV.x, float(1)))
			.mul(step(float(0), distortedUV.y))
			.mul(step(distortedUV.y, float(1)))

		return mix(vec4(0, 0, 0, 1), cloneAt(ctx.source, distortedUV), inBounds)
	}
}

export function blur(amount?: number): FxFn {
	return (color) => gaussianBlur(color, null, amount ?? 2)
}
