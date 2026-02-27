export type MidiPort = {
	id: string
	name: string
}

export type MidiState = {
	access: MIDIAccess | null
	outputs: MidiPort[]
	selectedPortId: string | null
	enabled: boolean
}

const STORAGE_KEY = 'ac-midi-port'

let midiState: MidiState

export function getMidiState() {
	return midiState
}

export function setMidiState(midiState_: MidiState) {
	midiState = midiState_
}

export async function initMidi(): Promise<MidiState> {
	try {
		const access = await navigator.requestMIDIAccess()
		const outputs: MidiPort[] = []
		for (const output of (<Map<string, MIDIOutput>>(<unknown>access.outputs)).values()) {
			outputs.push({ id: output.id, name: output.name || 'Unnamed' })
		}

		// Load saved port from localStorage
		const savedPortId = localStorage.getItem(STORAGE_KEY)
		const selectedPortId =
			savedPortId && outputs.some((p) => p.id === savedPortId)
				? savedPortId
				: outputs.length > 0
					? outputs[0].id
					: null

		return {
			access,
			outputs,
			selectedPortId,
			enabled: outputs.length > 0
		}
	} catch (error) {
		console.warn('MIDI init failed:', error)
		return {
			access: null,
			outputs: [],
			selectedPortId: null,
			enabled: false
		}
	}
}

export function setMidiPort(state: MidiState, portId: string | null) {
	state.selectedPortId = portId
	if (portId) {
		localStorage.setItem(STORAGE_KEY, portId)
	} else {
		localStorage.removeItem(STORAGE_KEY)
	}
}

export function sendMidiNote(
	state: MidiState,
	channel: number,
	note: number,
	velocity: number,
	lengthMs: number
) {
	if (!state.access || !state.selectedPortId) return

	const output = (<Map<string, MIDIOutput>>(<unknown>state.access.outputs)).get(
		state.selectedPortId
	)
	if (!output) return

	const ch = Math.max(0, Math.min(15, channel - 1)) // 1-16 → 0-15
	const noteOn = [0x90 | ch, note, velocity]
	const noteOff = [0x80 | ch, note, 0]

	output.send(noteOn)
	setTimeout(() => output.send(noteOff), lengthMs)
}
