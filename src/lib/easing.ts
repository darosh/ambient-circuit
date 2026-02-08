/**
 * Easing functions for marble movement.
 * Uses maath where available, custom implementations for missing ones.
 * Based on https://easings.net/
 */

import * as maathEasing from 'maath/easing'

export type EasingFunction = (t: number) => number

// ── From maath ──────────────────────────────────────────────

export const linear = maathEasing.linear

// Sine
export const easeInSine = maathEasing.sine.in
export const easeOutSine = maathEasing.sine.out
export const easeInOutSine = maathEasing.sine.inOut

// Cubic
export const easeInCubic = maathEasing.cubic.in
export const easeOutCubic = maathEasing.cubic.out
export const easeInOutCubic = maathEasing.cubic.inOut

// Quart
export const easeInQuart = maathEasing.quart.in
export const easeOutQuart = maathEasing.quart.out
export const easeInOutQuart = maathEasing.quart.inOut

// Quint
export const easeInQuint = maathEasing.quint.in
export const easeOutQuint = maathEasing.quint.out
export const easeInOutQuint = maathEasing.quint.inOut

// Circ
export const easeInCirc = maathEasing.circ.in
export const easeOutCirc = maathEasing.circ.out
export const easeInOutCirc = maathEasing.circ.inOut

// Expo
export const easeInExpo = maathEasing.expo.in
export const easeOutExpo = maathEasing.expo.out
export const easeInOutExpo = maathEasing.expo.inOut

// ── Custom (not in maath) ───────────────────────────────────

// Quad
export const easeInQuad: EasingFunction = (t) => t * t
export const easeOutQuad: EasingFunction = (t) => 1 - (1 - t) * (1 - t)
export const easeInOutQuad: EasingFunction = (t) =>
	t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

// Elastic
export const easeInElastic: EasingFunction = (t) => {
	const c4 = (2 * Math.PI) / 3
	return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
}

export const easeOutElastic: EasingFunction = (t) => {
	const c4 = (2 * Math.PI) / 3
	return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
}

export const easeInOutElastic: EasingFunction = (t) => {
	const c5 = (2 * Math.PI) / 4.5
	return t === 0
		? 0
		: t === 1
			? 1
			: t < 0.5
				? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
				: (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1
}

// Bounce
export const easeInBounce: EasingFunction = (t) => {
	return 1 - easeOutBounce(1 - t)
}

export const easeOutBounce: EasingFunction = (t) => {
	const n1 = 7.5625
	const d1 = 2.75

	if (t < 1 / d1) {
		return n1 * t * t
	} else if (t < 2 / d1) {
		return n1 * (t -= 1.5 / d1) * t + 0.75
	} else if (t < 2.5 / d1) {
		return n1 * (t -= 2.25 / d1) * t + 0.9375
	} else {
		return n1 * (t -= 2.625 / d1) * t + 0.984375
	}
}

export const easeInOutBounce: EasingFunction = (t) =>
	t < 0.5 ? (1 - easeOutBounce(1 - 2 * t)) / 2 : (1 + easeOutBounce(2 * t - 1)) / 2

// Back
export const easeInBack: EasingFunction = (t) => {
	const c1 = 1.70158
	const c3 = c1 + 1
	return c3 * t * t * t - c1 * t * t
}

export const easeOutBack: EasingFunction = (t) => {
	const c1 = 1.70158
	const c3 = c1 + 1
	return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

export const easeInOutBack: EasingFunction = (t) => {
	const c1 = 1.70158
	const c2 = c1 * 1.525
	return t < 0.5
		? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
		: (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2
}

// ── Lookup table ────────────────────────────────────────────

export const easingFunctions: Record<string, EasingFunction> = {
	linear,
	easeInQuad,
	easeOutQuad,
	easeInOutQuad,
	easeInCubic,
	easeOutCubic,
	easeInOutCubic,
	easeInQuart,
	easeOutQuart,
	easeInOutQuart,
	easeInQuint,
	easeOutQuint,
	easeInOutQuint,
	easeInSine,
	easeOutSine,
	easeInOutSine,
	easeInCirc,
	easeOutCirc,
	easeInOutCirc,
	easeInExpo,
	easeOutExpo,
	easeInOutExpo,
	easeInElastic,
	easeOutElastic,
	easeInOutElastic,
	easeInBounce,
	easeOutBounce,
	easeInOutBounce,
	easeInBack,
	easeOutBack,
	easeInOutBack
}

export const easingNames = Object.keys(easingFunctions)
