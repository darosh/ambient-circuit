import type { InstrumentEntity, MarbleEntity, RailEntity } from '../core/scene-ctx'
import { Vector3, Matrix4, Quaternion } from 'three/webgpu'
import type { Vector3Tuple } from 'three/webgpu'
import { toRailShapeConfig } from '../core/rail-config'
import type { NodeInfo } from '../components/audio-view/audio-layout'
import { resolveRail } from '../core/rail-resolve'
import { getBeatTransform, getPointsForPath } from '../core/rail-curve'

export function getMidiSignalLinks(
	instruments: InstrumentEntity[],
	nodes: NodeInfo[],
	rails: RailEntity[],
	AUDIO_OFFSET: Vector3Tuple
) {
	const links: Array<{
		from: [number, number, number]
		to: [number, number, number]
		signal: { intensity: number }
		color: string
	}> = []
	let instrIdx = 0
	for (const re of rails) {
		const railData = re.railData
		const resolved = resolveRail(toRailShapeConfig(railData))
		for (const instrument of railData.instruments ?? []) {
			const ie = instruments[instrIdx]
			if (ie?.audio && instrument.midiSignal) {
				const pts = getPointsForPath(resolved, instrument.path)
				const xform = getBeatTransform(pts, instrument.beat)
				if (xform) {
					let worldPos = xform.position.clone()
					const rm = re.runtime.renderMatrix as Matrix4 | undefined
					if (rm) {
						const pos = new Vector3(),
							q = new Quaternion(),
							sc = new Vector3()
						rm.decompose(pos, q, sc)
						worldPos = worldPos.applyQuaternion(q).add(pos)
					}
					const genNode = nodes.find((n) => n.chain === ie.audio && n.isGenerator)
					if (genNode) {
						const wx = genNode.x + AUDIO_OFFSET[0]
						const wy = genNode.z + (AUDIO_OFFSET[1] + 4)
						const wz = -genNode.y + AUDIO_OFFSET[2]
						links.push({
							from: worldPos.toArray() as [number, number, number],
							to: [wx, wy, wz],
							signal: instrument.midiSignal,
							color: railData.color ?? '#ffffff'
						})
					}
				}
			}
			instrIdx++
		}
	}
	return links
}

export function getMarbleSignalLinks(
	marbles: MarbleEntity[],
	nodes: NodeInfo[],
	rails: RailEntity[],
	AUDIO_OFFSET: Vector3Tuple
) {
	const links: Array<{
		from: [number, number, number]
		to: [number, number, number]
		signal: { intensity: number }
		color: string
	}> = []

	for (const me of marbles) {
		if (!me.audio) continue
		const genNode = nodes.find((n) => n.chain === me.audio && n.isGenerator)
		if (!genNode) continue

		const currentRailId: string = me.marble.runtime.railId ?? me.marble.resolved.resolvedRail.id
		const railIdx = rails.findIndex((r) => r.id === currentRailId)
		const re = rails[railIdx]

		let pos = new Vector3(me.marble.position.x, me.marble.position.y, me.marble.position.z)
		const rm = re?.runtime.renderMatrix as Matrix4 | undefined
		if (rm) {
			const rPos = new Vector3(),
				q = new Quaternion(),
				sc = new Vector3()
			rm.decompose(rPos, q, sc)
			pos = pos.applyQuaternion(q).add(rPos)
		}

		const wx = genNode.x + AUDIO_OFFSET[0]
		const wy = genNode.z + (AUDIO_OFFSET[1] + 4)
		const wz = -genNode.y + AUDIO_OFFSET[2]
		links.push({
			from: pos.toArray() as [number, number, number],
			to: [wx, wy, wz],
			signal: me.marble.midiSignal,
			color:
				me.marble.runtime.color ??
				me.marble.resolved.color ??
				rails[railIdx]?.railData.color ??
				'#ffffff'
		})
	}
	return links
}
