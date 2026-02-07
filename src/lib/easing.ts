/**
 * Easing functions for marble movement.
 * Based on https://easings.net/
 */

export type EasingFunction = (t: number) => number

// Linear (no easing)
export const linear: EasingFunction = (t) => t

// Quad
export const easeInQuad: EasingFunction = (t) => t * t
export const easeOutQuad: EasingFunction = (t) => 1 - (1 - t) * (1 - t)
export const easeInOutQuad: EasingFunction = (t) =>
	t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

// Cubic
export const easeInCubic: EasingFunction = (t) => t * t * t
export const easeOutCubic: EasingFunction = (t) => 1 - Math.pow(1 - t, 3)
export const easeInOutCubic: EasingFunction = (t) =>
	t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

// Elastic
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

export const easeInBounce: EasingFunction = (t) => 1 - easeOutBounce(1 - t)

export const easeInOutBounce: EasingFunction = (t) =>
	t < 0.5 ? (1 - easeOutBounce(1 - 2 * t)) / 2 : (1 + easeOutBounce(2 * t - 1)) / 2

// Back
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

// Expo
export const easeOutExpo: EasingFunction = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
export const easeInOutExpo: EasingFunction = (t) =>
	t === 0
		? 0
		: t === 1
			? 1
			: t < 0.5
				? Math.pow(2, 20 * t - 10) / 2
				: (2 - Math.pow(2, -20 * t + 10)) / 2

// Lookup table
export const easingFunctions: Record<string, EasingFunction> = {
	linear,
	easeInQuad,
	easeOutQuad,
	easeInOutQuad,
	easeInCubic,
	easeOutCubic,
	easeInOutCubic,
	easeOutElastic,
	easeInOutElastic,
	easeOutBounce,
	easeInBounce,
	easeInOutBounce,
	easeOutBack,
	easeInOutBack,
	easeOutExpo,
	easeInOutExpo,
}

export const easingNames = Object.keys(easingFunctions)
