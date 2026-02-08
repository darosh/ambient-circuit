import type { Instrument, InstrumentTriggerContext } from './instrument'
import type { Marble } from './marble'
import type { MidiState } from './midi'
import type { RailData } from './rail-data'

export type SceneTriggerContext = InstrumentTriggerContext & {
	instrument: Instrument
	marble: Marble
	midiState: MidiState | null
}

export type TriggerHandler = (ctx: SceneTriggerContext) => void

export type SceneConfig = {
	id: string
	bpm: number
	rails: RailData[]
	triggerHandler?: TriggerHandler
}
