import type { Instrument, InstrumentTriggerContext } from './instrument'
import type { Marble } from './marble'
import type { MarbleState } from './marble-state'
import type { MidiState } from './midi'
import type { RailData } from './rail-data'
import { Vector3Tuple } from 'three/webgpu'

export type SceneTriggerContext = InstrumentTriggerContext & {
	instrument: Instrument
	marble: Marble
	state: MarbleState
	midiState: MidiState | null
}

export type TriggerHandler = (ctx: SceneTriggerContext) => void

export type SceneConfig = {
	id: string
	bpm: number
	rails: RailData[]
	triggerHandler?: TriggerHandler
	camera?: Vector3Tuple
	target?: Vector3Tuple
}
