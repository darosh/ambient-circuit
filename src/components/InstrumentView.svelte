<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import type { Instrument, PolyInstrument } from '../lib/instrument'
	import type { ResolvedRail } from '../lib/rail'
	import { getBeatTransform, getPointsForPath } from '../lib/rail-geometry'
	import {
		MeshStandardMaterial,
		CurvePath,
		LineCurve3,
		QuadraticBezierCurve3,
		TubeGeometry,
		Vector3,
		Euler,
		Matrix4
	} from 'three/webgpu'
	import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
	import { easeOutQuart, easeInBounce } from '../lib/easing'
	import { makeInstrumentMaterial } from '../lib/config'
	import { buildTubeGeometry } from '../lib/tube-geometry'
	import { lerp } from 'three/src/math/MathUtils.js'

	// Geometry segment multipliers
	const SPIRAL_SEGMENTS_PER_ROUND = 32
	const CONE_SEGMENTS_PER_ROUND = 32
	const ARROW_CIRCLE_SEGMENTS = 36
	const TUBULAR_SEGMENTS_SPIRAL = 64
	const TUBULAR_SEGMENTS_ARROW_CIRCLE = 72
	const TUBULAR_SEGMENTS_POLY = 21
	const TUBULAR_SEGMENTS_ARROW_OTHER = 16
	const TUBULAR_SEGMENTS_SUN_RAY = 16
	const RADIAL_SEGMENTS = 8
	const HEART_SEGMENTS = 36
	const HEART_CLOSED_SEGMENTS = 12

	type Props = {
		instrument: Instrument
		rail: ResolvedRail
		color: string
		size?: number
		width?: number
		cornerRadius?: number
		wireframe?: boolean
		fxInstruments?: boolean
	}

	let {
		instrument,
		rail,
		size = 1,
		color,
		width = 0.06,
		cornerRadius = 0.075,
		wireframe = false,
		fxInstruments = true
	}: Props = $props()

	const fx = $derived(
		makeInstrumentMaterial(instrument.color || color, instrument.type !== 'heart')
	)
	const plainMaterial = $derived(new MeshStandardMaterial({ color: instrument.color || color }))

	$effect(() => {
		fx.mat.wireframe = wireframe
		plainMaterial.wireframe = wireframe
	})

	// Get points for the instrument's path
	const points = $derived(getPointsForPath(rail, instrument.path))

	// Get position and tangent at instrument beat
	const transform = $derived(getBeatTransform(points, instrument.beat))

	// Create tube geometry based on instrument type
	const geometry = $derived.by(() => {
		const type = instrument.type || 'poly'
		const n =
			type === 'heart' || type === 'spiral' || type === 'cone' || type === 'arrow' || type === 'sun'
				? 0
				: (instrument as { sides: number }).sides
		const cr = cornerRadius
		const path = new CurvePath<Vector3>()
		let secondaryPath: CurvePath<Vector3> | null = null
		let sunRayPaths: CurvePath<Vector3>[] = []

		if (type === 'poly') {
			const adjustedSize = n === 2 ? size * 0.5 : size
			const r = adjustedSize / (1 + Math.cos(Math.PI / n))
			const verts: Vector3[] = []
			for (let i = 0; i < n; i++) {
				const angle = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n
				verts.push(new Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0))
			}

			for (let i = 0; i < n; i++) {
				const curr = verts[i]
				const next = verts[(i + 1) % n]
				const prev = verts[(i - 1 + n) % n]

				const inDir = new Vector3().subVectors(curr, prev).normalize()
				const outDir = new Vector3().subVectors(next, curr).normalize()

				const arcStart = curr.clone().addScaledVector(inDir, -cr)
				const arcEnd = curr.clone().addScaledVector(outDir, cr)
				const nextArcStart = next.clone().addScaledVector(outDir, -cr)

				if (cr > 0) {
					path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
				}
				path.add(new LineCurve3(arcEnd, nextArcStart))
			}
		} else if (type === 'star') {
			const adjustedSize = n === 2 ? size * 0.5 : size
			const outerR = adjustedSize / (1 + Math.cos(Math.PI / n))
			const innerR = outerR * 0.3
			const verts: Vector3[] = []

			for (let i = 0; i < n * 2; i++) {
				const angle = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2 + Math.PI / n
				const r = i % 2 === 0 ? outerR : innerR
				verts.push(new Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0))
			}

			for (let i = 0; i < n * 2; i++) {
				const curr = verts[i]
				const next = verts[(i + 1) % (n * 2)]
				const prev = verts[(i - 1 + n * 2) % (n * 2)]

				const inDir = new Vector3().subVectors(curr, prev).normalize()
				const outDir = new Vector3().subVectors(next, curr).normalize()

				const arcStart = curr.clone().addScaledVector(inDir, -cr)
				const arcEnd = curr.clone().addScaledVector(outDir, cr)
				const nextArcStart = next.clone().addScaledVector(outDir, -cr)

				if (cr > 0) {
					path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
				}
				path.add(new LineCurve3(arcEnd, nextArcStart))
			}
		} else if (type === 'whirl' || type === 'cross') {
			const adjustedSize = n === 2 ? size * 0.5 : size
			const outerR = adjustedSize / (1 + Math.cos(Math.PI / n))

			for (let i = 0; i < n; i++) {
				const angle = (i / n) * Math.PI * 2 - Math.PI / 2

				// Center point
				const center = new Vector3(0, 0, 0)

				// Outer point (tip of water drop)
				const tip = new Vector3(Math.cos(angle) * outerR, Math.sin(angle) * outerR, 0)

				// Control points for water drop shape
				const angleSpread = n === 2 ? 2 * Math.PI : Math.PI / n
				const leftAngle = angle - angleSpread * (type === 'whirl' ? -1.8 : 0)
				const rightAngle = angle + angleSpread * (type === 'whirl' ? 1.8 : 0)

				// Bezier control points for smooth water drop
				const leftCtrl = new Vector3(
					Math.cos(leftAngle) * outerR * 0.5,
					Math.sin(leftAngle) * outerR * 0.5,
					0
				)
				const rightCtrl = new Vector3(
					Math.cos(rightAngle) * outerR * 0.5,
					Math.sin(rightAngle) * outerR * 0.5,
					0
				)

				// Water drop: center → left → tip → right → center
				path.add(new QuadraticBezierCurve3(center, leftCtrl, tip))
				path.add(new QuadraticBezierCurve3(tip, rightCtrl, center))
			}
		} else if (type === 'heart') {
			const segments = HEART_SEGMENTS
			const scale = size * 0.5

			for (let i = 0; i < segments; i++) {
				const t = (i / segments) * Math.PI * 2
				const nextT = ((i + 1) / segments) * Math.PI * 2

				// Heart parametric: x = sin³(t), y = (13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t))/16
				const sin3 = Math.pow(Math.sin(t), 3)
				const x = scale * sin3
				const y =
					(scale *
						(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))) /
					16

				const nextSin3 = Math.pow(Math.sin(nextT), 3)
				const nextX = scale * nextSin3
				const nextY =
					(scale *
						(13 * Math.cos(nextT) -
							5 * Math.cos(2 * nextT) -
							2 * Math.cos(3 * nextT) -
							Math.cos(4 * nextT))) /
					16

				path.add(new LineCurve3(new Vector3(x, y, 0), new Vector3(nextX, nextY, 0)))
			}
		} else if (type === 'spiral') {
			const rounds = (instrument.type === 'spiral' ? instrument.rounds : undefined) || 3
			const counterCW = (instrument.type === 'spiral' ? instrument.counterCW : undefined) || false
			const innerR = width
			const outerR = width * 2 * rounds
			const segments = rounds * SPIRAL_SEGMENTS_PER_ROUND

			for (let i = 0; i < segments; i++) {
				// Non-uniform sampling: more detail at smaller radius (center)
				// Using t^1.5 concentrates more segments where radius is small
				const u = i / segments
				const t = Math.pow(u, 1.5)
				let theta = t * rounds * Math.PI * 2
				if (counterCW) theta = -theta

				const r = innerR + (outerR - innerR) * t
				const x = r * Math.cos(theta)
				const y = r * Math.sin(theta)

				const nextU = (i + 1) / segments
				const nextT = Math.pow(nextU, 1.5)
				let nextTheta = nextT * rounds * Math.PI * 2
				if (counterCW) nextTheta = -nextTheta

				const nextR = innerR + (outerR - innerR) * nextT
				const nextX = nextR * Math.cos(nextTheta)
				const nextY = nextR * Math.sin(nextTheta)

				path.add(new LineCurve3(new Vector3(x, y, 0), new Vector3(nextX, nextY, 0)))
			}
		} else if (type === 'cone') {
			const rounds = (instrument.type === 'cone' ? instrument.rounds : undefined) || 3
			const counterCW = (instrument.type === 'cone' ? instrument.counterCW : undefined) || false
			const point = (instrument.type === 'cone' ? instrument.point : undefined) || 'forward'
			const align = (instrument.type === 'cone' ? instrument.align : undefined) || 'center'
			const innerR = width
			const outerR = width * 1 * rounds
			const depth = width * 2 * rounds
			const segments = rounds * CONE_SEGMENTS_PER_ROUND

			// Z offset based on alignment (which part is at beat position)
			let zOffset = -0.5 // center (default)
			if (align === 'tip') zOffset = 0
			else if (align === 'back') zOffset = -1

			// Z scale based on point direction (which way tip points)
			let zScale = 1 // forward (default)
			if (point === 'backward') zScale = -1

			for (let i = 0; i < segments; i++) {
				// Non-uniform sampling: more detail at smaller radius (start)
				const u = i / segments
				const t = Math.pow(u, 1.5)
				let theta = t * rounds * Math.PI * 2
				if (counterCW) theta = -theta

				const r = innerR + (outerR - innerR) * t
				const z = depth * zScale * (t + zOffset)

				const x = r * Math.cos(theta)
				const y = r * Math.sin(theta)

				const nextU = (i + 1) / segments
				const nextT = Math.pow(nextU, 1.5)
				let nextTheta = nextT * rounds * Math.PI * 2
				if (counterCW) nextTheta = -nextTheta

				const nextR = innerR + (outerR - innerR) * nextT
				const nextZ = depth * zScale * (nextT + zOffset)

				const nextX = nextR * Math.cos(nextTheta)
				const nextY = nextR * Math.sin(nextTheta)

				path.add(new LineCurve3(new Vector3(x, y, z), new Vector3(nextX, nextY, nextZ)))
			}
		} else if (type === 'arrow') {
			const kind = (instrument.type === 'arrow' ? instrument.kind : undefined) || 'plain'
			const angle = (instrument.type === 'arrow' ? instrument.angle : undefined) ?? Math.PI / 3
			const point = (instrument.type === 'arrow' ? instrument.point : undefined) || 'forward'
			const align = (instrument.type === 'arrow' ? instrument.align : undefined) || 'center'

			const length = size * 1

			// Z offset based on alignment (for directional shapes)
			let zOffset = align === 'tip' ? 0 : align === 'back' ? -1 : -0.5

			// Z scale based on point direction (for directional shapes)
			const zScale = point === 'backward' ? -1 : 1

			if (kind === 'plain' || kind === 'step') {
				// V-shape: two rays from origin at ±(angle/2)
				const halfAngle = angle / 2
				const tipY1 = Math.sin(halfAngle) * length
				const tipY2 = -tipY1
				const tipZ = Math.cos(halfAngle) * length

				const origin = new Vector3(0, 0, -zScale * (length * zOffset))
				const tip1 = new Vector3(0, tipY1, -zScale * (tipZ + length * zOffset))
				const tip2 = new Vector3(0, tipY2, -zScale * (tipZ + length * zOffset))

				path.add(new LineCurve3(origin, tip1))
				path.add(new LineCurve3(origin, tip2))
			} else if (kind === 'play' || kind === 'fwd') {
				// Equilateral triangle with rounded corners
				const height = length
				const halfBase = height / Math.sqrt(3)
				const verts = [
					new Vector3(0, 0, zScale * (height + length * zOffset)),
					new Vector3(0, halfBase, zScale * (length * zOffset)),
					new Vector3(0, -halfBase, zScale * (length * zOffset))
				]

				for (let i = 0; i < 3; i++) {
					const curr = verts[i]
					const next = verts[(i + 1) % 3]
					const prev = verts[(i - 1 + 3) % 3]

					const inDir = new Vector3().subVectors(curr, prev).normalize()
					const outDir = new Vector3().subVectors(next, curr).normalize()

					const arcStart = curr.clone().addScaledVector(inDir, -cr)
					const arcEnd = curr.clone().addScaledVector(outDir, cr)
					const nextArcStart = next.clone().addScaledVector(outDir, -cr)

					if (cr > 0) {
						path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
					}
					path.add(new LineCurve3(arcEnd, nextArcStart))
				}
			} else if (kind === 'rec') {
				// Circle (centered, ignores align/point)
				const radius = length / 2
				const segments = ARROW_CIRCLE_SEGMENTS
				for (let i = 0; i < segments; i++) {
					const angle1 = (i / segments) * Math.PI * 2
					const angle2 = ((i + 1) / segments) * Math.PI * 2
					const p1 = new Vector3(0, Math.cos(angle1) * radius, Math.sin(angle1) * radius)
					const p2 = new Vector3(0, Math.cos(angle2) * radius, Math.sin(angle2) * radius)
					path.add(new LineCurve3(p1, p2))
				}
			} else if (kind === 'stop') {
				// Square with rounded corners (centered, ignores align/point)
				const halfSize = length / 2
				const verts = [
					new Vector3(0, halfSize, halfSize),
					new Vector3(0, halfSize, -halfSize),
					new Vector3(0, -halfSize, -halfSize),
					new Vector3(0, -halfSize, halfSize)
				]
				for (let i = 0; i < 4; i++) {
					const curr = verts[i]
					const next = verts[(i + 1) % 4]
					const prev = verts[(i - 1 + 4) % 4]
					const inDir = new Vector3().subVectors(curr, prev).normalize()
					const outDir = new Vector3().subVectors(next, curr).normalize()
					const arcStart = curr.clone().addScaledVector(inDir, -cr)
					const arcEnd = curr.clone().addScaledVector(outDir, cr)
					const nextArcStart = next.clone().addScaledVector(outDir, -cr)
					if (cr > 0) {
						path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
					}
					path.add(new LineCurve3(arcEnd, nextArcStart))
				}
			} else if (kind === 'pause') {
				// Two parallel vertical lines (centered, ignores align/point)
				const spacing = width * 2.5
				const height = length
				const line1Start = new Vector3(0, -height / 2, -spacing / 2)
				const line1End = new Vector3(0, height / 2, -spacing / 2)
				const line2Start = new Vector3(0, -height / 2, spacing / 2)
				const line2End = new Vector3(0, height / 2, spacing / 2)
				// Primary: first line
				path.add(new LineCurve3(line1Start, line1End))
				// Secondary: second line
				secondaryPath = new CurvePath<Vector3>()
				secondaryPath.add(new LineCurve3(line2Start, line2End))
			}

			if (kind === 'fwd' || kind === 'step') {
				// V-arrow + vertical line at base (two disconnected geometries)
				const halfAngle = angle / 2
				const tipY1 = Math.sin(halfAngle) * length
				const tipY2 = -tipY1
				const origin1 = new Vector3(0, tipY1, -zScale * (length * zOffset))
				const origin2 = new Vector3(0, tipY2, -zScale * (length * zOffset))

				// Secondary: base line
				secondaryPath = new CurvePath<Vector3>()
				secondaryPath.add(new LineCurve3(origin1, origin2))
			}
		} else if (type === 'sun') {
			const numRays = (instrument.type === 'sun' ? instrument.rays : undefined) ?? 6

			// Inner circle: 12-sided polygon (like poly inner fill with n=12)
			const n = 12
			const adjustedSize = size
			const outerR = adjustedSize / (1 + Math.cos(Math.PI / n))
			const coef = lerp(2.5, 2, (Math.min(n, 12) - 3) / 9)
			const innerR = outerR - coef * width

			const verts: Vector3[] = []
			for (let i = 0; i < n; i++) {
				const angle = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n
				verts.push(new Vector3(Math.cos(angle) * innerR, Math.sin(angle) * innerR, 0))
			}

			// Create inner circle with rounded corners
			for (let i = 0; i < n; i++) {
				const curr = verts[i]
				const next = verts[(i + 1) % n]
				const prev = verts[(i - 1 + n) % n]

				const inDir = new Vector3().subVectors(curr, prev).normalize()
				const outDir = new Vector3().subVectors(next, curr).normalize()

				const arcStart = curr.clone().addScaledVector(inDir, -cr)
				const arcEnd = curr.clone().addScaledVector(outDir, cr)
				const nextArcStart = next.clone().addScaledVector(outDir, -cr)

				if (cr > 0) {
					path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
				}
				path.add(new LineCurve3(arcEnd, nextArcStart))
			}

			// Rays: start at innerR + width gap, end at size * 1.5
			// Each ray is a separate path to avoid connection artifacts
			const brightness = (instrument.type === 'sun' ? instrument.brightness : undefined) ?? 2
			const rayStart = innerR + width
			const rayEnd = rayStart + width * brightness

			if (brightness && numRays) {
				for (let i = 0; i < numRays; i++) {
					const angle = (i / numRays) * Math.PI * 2 - Math.PI / 2
					const start = new Vector3(Math.cos(angle) * rayStart, Math.sin(angle) * rayStart, 0)
					const end = new Vector3(Math.cos(angle) * rayEnd, Math.sin(angle) * rayEnd, 0)
					const rayPath = new CurvePath<Vector3>()
					rayPath.add(new LineCurve3(start, end))
					sunRayPaths.push(rayPath)
				}
			}
		}

		// Use buildTubeGeometry for heart (smoother parametric curve)
		// Use TubeGeometry for others (works better for existing types)
		if (type === 'heart') {
			return buildTubeGeometry(
				path.curves,
				width / 2,
				RADIAL_SEGMENTS,
				HEART_CLOSED_SEGMENTS,
				true
			)
		}

		// Determine closed shapes
		// Open: spiral, cone, arrow kinds (plain, fwd, step, pause)
		// Closed: poly, star, whirl, cross, heart, arrow kinds (play, rec, stop), sun
		const arrowKind = instrument.type === 'arrow' ? instrument.kind || 'plain' : 'plain'
		const closed =
			type !== 'spiral' &&
			type !== 'cone' &&
			!(type === 'arrow' && ['plain', 'step', 'pause'].includes(arrowKind))

		// Calculate tubular segments based on type
		// For spiral/cone: use path complexity (rounds * segments per round)
		// For arrow: match poly segment count for equivalent shapes
		// For sun: 12-sided inner circle like poly 12
		// For polygon types: use polygon sides * density
		const tubularSegments =
			type === 'spiral' || type === 'cone'
				? ((instrument.type === 'spiral' || instrument.type === 'cone'
						? instrument.rounds
						: undefined) || 3) * TUBULAR_SEGMENTS_SPIRAL
				: type === 'arrow'
					? arrowKind === 'rec'
						? TUBULAR_SEGMENTS_ARROW_CIRCLE
						: arrowKind === 'play' || arrowKind === 'fwd'
							? 3 * TUBULAR_SEGMENTS_POLY
							: arrowKind === 'stop'
								? 4 * TUBULAR_SEGMENTS_POLY
								: TUBULAR_SEGMENTS_ARROW_OTHER
					: type === 'sun'
						? 12 * TUBULAR_SEGMENTS_POLY
						: n * TUBULAR_SEGMENTS_POLY

		const mainGeometry = new TubeGeometry(
			path as unknown as import('three').Curve<Vector3>,
			tubularSegments,
			width / 2,
			RADIAL_SEGMENTS,
			closed
		)

		// Merge secondary geometry if it exists (for disconnected shapes like step, pause)
		if (secondaryPath) {
			const secondaryGeometry = new TubeGeometry(
				secondaryPath as unknown as import('three').Curve<Vector3>,
				tubularSegments,
				width / 2,
				RADIAL_SEGMENTS,
				closed
			)
			return mergeGeometries([mainGeometry, secondaryGeometry])
		}

		// Merge sun ray geometries (each ray separate to avoid connection artifacts)
		if (sunRayPaths.length > 0) {
			const geometries = [mainGeometry]
			for (const rayPath of sunRayPaths) {
				const rayGeometry = new TubeGeometry(
					rayPath as unknown as import('three').Curve<Vector3>,
					TUBULAR_SEGMENTS_SUN_RAY,
					width / 2,
					RADIAL_SEGMENTS,
					false // Open shape
				)
				geometries.push(rayGeometry)
			}
			return mergeGeometries(geometries)
		}

		return mainGeometry
	})

	// Inner geometry for fill mode (poly only)
	const innerGeometry = $derived.by(() => {
		if (!(instrument as PolyInstrument).fill) return null

		const n = (instrument as PolyInstrument).sides

		if (n < 3) return null

		const cr = cornerRadius / 2
		const path = new CurvePath<Vector3>()

		const adjustedSize = n === 2 ? size * 0.5 : size
		const outerR = adjustedSize / (1 + Math.cos(Math.PI / n))
		const coef = n === 3 ? 3 : lerp(2.5, 2, (Math.min(n, 12) - 3) / 9)
		const innerR = outerR - coef * width

		if (innerR <= 0) return null

		const verts: Vector3[] = []

		for (let i = 0; i < n; i++) {
			const angle = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n
			verts.push(new Vector3(Math.cos(angle) * innerR, Math.sin(angle) * innerR, 0))
		}

		for (let i = 0; i < n; i++) {
			const curr = verts[i]
			const next = verts[(i + 1) % n]
			const prev = verts[(i - 1 + n) % n]

			const inDir = new Vector3().subVectors(curr, prev).normalize()
			const outDir = new Vector3().subVectors(next, curr).normalize()

			const arcStart = curr.clone().addScaledVector(inDir, -cr)
			const arcEnd = curr.clone().addScaledVector(outDir, cr)
			const nextArcStart = next.clone().addScaledVector(outDir, -cr)

			if (cr > 0) {
				path.add(new QuadraticBezierCurve3(arcStart, curr, arcEnd))
			}
			path.add(new LineCurve3(arcEnd, nextArcStart))
		}

		return new TubeGeometry(
			path as unknown as import('three').Curve<Vector3>,
			n * TUBULAR_SEGMENTS_POLY,
			width / 2,
			RADIAL_SEGMENTS,
			true
		)
	})

	const IMPACT_DURATION = 0.4 // seconds
	const ACTIVE_ROTATION_SPEED = 1 // rotations per second
	const IMPACT_BOOST_SPEED = 3 // additional rotations/sec on impact
	const IMPACT_BOOST_DECAY = 0.6 // seconds to decay boost
	const BOUNCE_AMPLITUDE = 0.2 // units

	let spinAngle = $state(0)
	let impactTime = 0
	let impactBaseAngle = 0
	let activeRotation = $state(0)
	let impactBoostSpeed = $state(0)
	let bounceOffset = $state(0)

	const activeRotationEnabled = $derived.by(() => {
		if (instrument.type === 'spiral') {
			return instrument.active ?? true
		}
		if (instrument.type === 'cone') {
			return instrument.active ?? true
		}
		return false
	})

	const pulseAnimationEnabled = $derived.by(() => {
		return instrument.type === 'heart' && (instrument.pulse ?? true)
	})

	// Compute rotation to align normal with tangent, then apply base rotation offsets and spin
	const rotation = $derived.by((): [number, number, number] => {
		if (!transform) return [0, 0, 0]

		const tangent = transform.tangent

		// Compute proper up vector perpendicular to tangent (Gram-Schmidt)
		// Use world Y unless tangent is nearly vertical
		const ref = Math.abs(tangent.y) < 0.9 ? new Vector3(0, 1, 0) : new Vector3(1, 0, 0)
		// Project out component parallel to tangent
		const up = ref
			.clone()
			.sub(tangent.clone().multiplyScalar(ref.dot(tangent)))
			.normalize()

		const right = new Vector3().crossVectors(up, tangent).normalize()
		const correctedUp = new Vector3().crossVectors(tangent, right).normalize()

		// Align normal with tangent
		const m = new Matrix4()
		m.makeBasis(right, correctedUp, tangent)

		// Apply base rotation offset based on type
		const type = instrument.type || 'poly'
		if (type === 'poly' || type === 'star' || type === 'heart') {
			m.multiply(new Matrix4().makeRotationZ(-Math.PI / 2))
		} else if (type === 'cross' || type === 'whirl' || type === 'sun') {
			m.multiply(new Matrix4().makeRotationZ(Math.PI / 2))
		} else if (type === 'cone' || type === 'spiral') {
			m.multiply(new Matrix4().makeRotationZ(-Math.PI))
		}

		// Apply rail tilt (design element)
		const tiltRad = ((rail.tilt ?? 0) * Math.PI) / 180
		if (tiltRad !== 0) {
			m.multiply(new Matrix4().makeRotationZ(tiltRad))
		}

		// Apply active rotation (continuous for spiral/cone)
		if (activeRotationEnabled) {
			m.multiply(new Matrix4().makeRotationZ(activeRotation))
		}

		// Apply impact spin (for non-pulse types or when pulse is disabled)
		if (!pulseAnimationEnabled) {
			m.multiply(new Matrix4().makeRotationZ(spinAngle))
		}

		const euler = new Euler().setFromRotationMatrix(m)
		return [euler.x, euler.y, euler.z]
	})

	// Compute position with bounce offset for pulse animation
	const position = $derived.by((): [number, number, number] => {
		if (!transform) return [0, 0, 0]
		const base = transform.position.clone()

		if (pulseAnimationEnabled && bounceOffset > 0) {
			// Bounce along world Y axis (up)
			base.y += bounceOffset
		}

		return [base.x, base.y, base.z]
	})

	useTask((delta) => {
		if (instrument.signal && instrument.signal.intensity > 0) {
			impactBaseAngle = spinAngle
			impactTime = IMPACT_DURATION
			impactBoostSpeed = IMPACT_BOOST_SPEED
			instrument.signal.intensity = 0
		}

		// Active rotation for spiral/cone
		if (activeRotationEnabled) {
			activeRotation += delta * (ACTIVE_ROTATION_SPEED + impactBoostSpeed) * Math.PI * 2
		}

		// Decay impact boost
		if (impactBoostSpeed > 0) {
			impactBoostSpeed = Math.max(
				0,
				impactBoostSpeed - delta * (IMPACT_BOOST_SPEED / IMPACT_BOOST_DECAY)
			)
		}

		// Pulse animation for heart
		if (pulseAnimationEnabled && impactTime > 0) {
			bounceOffset = BOUNCE_AMPLITUDE * easeInBounce(impactTime / IMPACT_DURATION)
		} else {
			bounceOffset = 0
		}

		if (impactTime > 0) {
			impactTime = Math.max(0, impactTime - delta)
			fx.impactIntensity.value = easeOutQuart(impactTime / IMPACT_DURATION)

			// Impact spin for non-pulse types
			if (!pulseAnimationEnabled) {
				spinAngle = impactBaseAngle + easeOutQuart(1 - impactTime / IMPACT_DURATION) * Math.PI * 2
			}
		}
	})
</script>

{#if transform}
	<T.Mesh {position} {rotation} {geometry} material={fxInstruments ? fx.mat : plainMaterial} />
	{#if innerGeometry}
		<T.Mesh
			{position}
			{rotation}
			geometry={innerGeometry}
			material={fxInstruments ? fx.mat : plainMaterial}
		/>
	{/if}
{/if}
