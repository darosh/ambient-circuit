<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { LineCurve3, Vector3, TubeGeometry, BufferAttribute } from 'three/webgpu'
	import { CubicBezierCurve3, type Vector3Tuple } from 'three/webgpu'
	import { untrack } from 'svelte'
	import { buildImpactMaterial } from '../lib/video/material-impact'

	const TUBE_SEGMENTS_STRAIGHT = 1
	const TUBE_SEGMENTS_CURVED = 12
	const CURVE_TANGENT = 0.5
	const NODE_LENGTH = 0.2
	const LINE_SHIFT = NODE_LENGTH / 2
	const INS_SHIFT = 0.025

	type SignalLink = {
		from: Vector3Tuple
		to: Vector3Tuple
		signal: { intensity: number }
		color?: string
	}

	let {
		links,
		curved = true,
		alpha = 0.5
	}: { links: SignalLink[]; curved?: boolean; alpha?: number } = $props()

	const FLASH_DURATION = 0.5
	const TUBE_R = 0.02

	type CurveEntry = {
		curve: CubicBezierCurve3 | LineCurve3
		segments: number
		lastFrom: Vector3Tuple
		lastTo: Vector3Tuple
	}

	let curveEntries: CurveEntry[] = $state.raw([])
	let geoRefs: (TubeGeometry | undefined)[] = $state([])
	let linkCount = $state(0)
	let materials: ReturnType<typeof buildImpactMaterial>[] = $state.raw([])
	const animTimes: number[] = []

	function buildEntry(l: SignalLink): CurveEntry {
		const f = new Vector3(l.from[0], l.from[1] + INS_SHIFT, l.from[2])
		const t = new Vector3(l.to[0], l.to[1] - LINE_SHIFT, l.to[2])
		const len = f.distanceTo(t)
		const d = Math.max(l.to[1] - l.from[1], len / 2) * CURVE_TANGENT
		const segments = curved ? Math.round(TUBE_SEGMENTS_CURVED * len) : TUBE_SEGMENTS_STRAIGHT
		if (curved) {
			const v1 = new Vector3(l.from[0], l.from[1] + d, l.from[2])
			const v2 = new Vector3(l.to[0], l.to[1] - LINE_SHIFT - d, l.to[2])
			return {
				curve: new CubicBezierCurve3(f, v1, v2, t),
				segments: Math.max(1, segments),
				lastFrom: [l.from[0], l.from[1], l.from[2]],
				lastTo: [l.to[0], l.to[1], l.to[2]]
			}
		}
		return {
			curve: new LineCurve3(f, t),
			segments: TUBE_SEGMENTS_STRAIGHT,
			lastFrom: [l.from[0], l.from[1], l.from[2]],
			lastTo: [l.to[0], l.to[1], l.to[2]]
		}
	}

	function updateCurveInPlace(e: CurveEntry, l: SignalLink) {
		const f = l.from
		const t = l.to
		e.lastFrom = [f[0], f[1], f[2]]
		e.lastTo = [t[0], t[1], t[2]]
		if (e.curve instanceof CubicBezierCurve3) {
			const len = Math.hypot((t[0] - f[0]), (t[1] - f[1]), (t[2] - f[2]))
			const d = Math.max(t[1] - f[1], len / 2) * CURVE_TANGENT
			e.curve.v0.set(f[0], f[1] + INS_SHIFT, f[2])
			e.curve.v1.set(f[0], f[1] + d, f[2])
			e.curve.v2.set(t[0], t[1] - LINE_SHIFT - d, t[2])
			e.curve.v3.set(t[0], t[1] - LINE_SHIFT, t[2])
		} else {
			e.curve.v1.set(f[0], f[1] + INS_SHIFT, f[2])
			e.curve.v2.set(t[0], t[1] - LINE_SHIFT, t[2])
		}
	}

	function refreshGeometryBuffer(i: number) {
		const geo: TubeGeometry | undefined = geoRefs[i]
		if (!geo) return
		const e = curveEntries[i]
		const tmp = new TubeGeometry(e.curve, e.segments, TUBE_R, 4, false)
		const pos = geo.attributes['position'] as BufferAttribute
		const nrm = geo.attributes['normal'] as BufferAttribute
		const tmpPos = tmp.attributes['position'] as BufferAttribute
		const tmpNrm = tmp.attributes['normal'] as BufferAttribute
		if (pos && tmpPos) {
			const posArr = pos.array as Float32Array
			posArr.set(tmpPos.array as Float32Array)
			pos.needsUpdate = true
		}
		if (nrm && tmpNrm) {
			const nrmArr = nrm.array as Float32Array
			nrmArr.set(tmpNrm.array as Float32Array)
			nrm.needsUpdate = true
		}
		tmp.dispose()
	}

	$effect(() => {
		const len = links.length
		untrack(() => {
			if (len !== curveEntries.length) {
				for (const m of materials) m.mat.dispose()
				curveEntries = links.map(buildEntry)
				geoRefs = Array.from({ length: len })
				materials = links.map((l) =>
					buildImpactMaterial(l.color ?? '#ffffff', l.color ?? '#ffffff', alpha, true, 1, 0.7)
				)
				animTimes.length = len
				animTimes.fill(0)
				linkCount = len
			}
		})
	})

	// dispose final materials on destroy
	$effect(() => {
		return () => {
			for (const m of materials) m.mat.dispose()
		}
	})

	useTask((delta) => {
		const count = Math.min(links.length, curveEntries.length)
		for (let i = 0; i < count; i++) {
			const l = links[i]
			const e = curveEntries[i]
			const f = l.from
			const t = l.to
			if (
				f[0] !== e.lastFrom[0] ||
				f[1] !== e.lastFrom[1] ||
				f[2] !== e.lastFrom[2] ||
				t[0] !== e.lastTo[0] ||
				t[1] !== e.lastTo[1] ||
				t[2] !== e.lastTo[2]
			) {
				updateCurveInPlace(e, l)
				refreshGeometryBuffer(i)
			}
			if (l.signal.intensity > 0) {
				animTimes[i] = FLASH_DURATION
				l.signal.intensity = 0
			}
			if (animTimes[i] > 0) {
				animTimes[i] = Math.max(0, animTimes[i] - delta)
				materials[i].impactT.value = animTimes[i] / FLASH_DURATION
			}
		}
	})
</script>

{#each { length: linkCount } as _, i (i)}
	<T.Mesh material={materials[i].mat}>
		<T.TubeGeometry
			args={[curveEntries[i].curve, curveEntries[i].segments, TUBE_R, 4, false]}
			bind:ref={geoRefs[i]}
		/>
	</T.Mesh>
{/each}
