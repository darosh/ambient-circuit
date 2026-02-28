/**
 * Pure camera math helpers — no Three.js, no allocations, all out-args.
 */

/** Unwrap `next` to be within [-π,π] of `prev` (continuous angle tracking) */
export function unwrapAngle(prev: number, next: number): number {
	let d = next - prev
	while (d > Math.PI) d -= 2 * Math.PI
	while (d < -Math.PI) d += 2 * Math.PI
	return prev + d
}

/**
 * Exponential decay step for an angle with dead-zone and optional max delta.
 * Unwraps target relative to cur, skips movement within deadZone, steps by alpha,
 * then clamps step magnitude to maxDelta (pass maxSpeed * delta at call site).
 */
export function dampAngleStep(
	cur: number,
	target: number,
	alpha: number,
	deadZone: number,
	maxDelta = Infinity
): number {
	const t = unwrapAngle(cur, target)
	const diff = t - cur
	if (Math.abs(diff) <= deadZone) return cur
	const step = diff * alpha
	return cur + (Math.abs(step) > maxDelta ? Math.sign(step) * maxDelta : step)
}

/** Simple exponential decay step */
export function dampStep(cur: number, target: number, alpha: number): number {
	return cur + (target - cur) * alpha
}

/**
 * Direction vector (dx, dy, dz) → yaw + pitch angles.
 * yaw = atan2(dz, dx), pitch = atan2(dy, horizLen)
 */
export function dirToAngles(
	dx: number,
	dy: number,
	dz: number,
	out: { yaw: number; pitch: number }
): void {
	const horizLen = Math.hypot(dx, dz)
	out.yaw = Math.atan2(dz, dx)
	out.pitch = Math.atan2(dy, horizLen)
}

/**
 * yaw + pitch → unit direction vector
 */
export function anglesToDir(
	yaw: number,
	pitch: number,
	out: { x: number; y: number; z: number }
): void {
	const cosPitch = Math.cos(pitch)
	out.x = Math.cos(yaw) * cosPitch
	out.y = Math.sin(pitch)
	out.z = Math.sin(yaw) * cosPitch
}
