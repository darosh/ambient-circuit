import { createDevice, MIDIEvent } from '@rnbo/js'
import type { Device, 
	// IPatcher, 
	MIDIByte } from '@rnbo/js'
import PATCHER_SYNTH from './patchers/feedback-synth.export.json'
import PATCHER_SHIM from './patchers/rnbo.shimmerev.json'
import type { ToneAudioNode } from 'tone'

export async function testRNBO() {
	const {context,  outputNode} = await load()
	
	const device1 = await createDevice({ context, patcher: PATCHER_SYNTH })
	const device2 = await createDevice({ context, patcher: PATCHER_SHIM })

	console.log({outputNode, device1, device2})
	
	device1.node.connect(device2.node)
	device2.node.connect(outputNode.output)

	device2.parameters[0].value = 100
	device2.parameters[1].value = 100
	device2.parameters[2].value = 60
	device2.parameters[4].value = 100
	device2.parameters[5].value = 100
	device2.parameters[6].value = 100
	device2.parameters[8].value = 100
	device2.parameters[12].value = 50
	device2.parameters[14].value = 1000
	
	console.log(device2.parameters.map(x => x.displayName))
	console.log(device2.parameters)
	console.log('tone params', getToneParams(outputNode))

	setInterval(() => {
		midiNote(device1, 44 + Math.round(Math.random() * 22), 750)
	}, 1000)
}

export async function load() {
	const WAContext = window.AudioContext
	const context = new WAContext()
	// const outputNode = context.createGain()
	
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	const Tone = await import('tone')
	Tone.setContext(context)
	await Tone.start()
	// const context = Tone.getContext().rawContext
	const outputNode = new Tone.Gain().toDestination()
	// const context = outputNode.defaultContext?.rawContext
	// outputNode.gain.value = 0.5
	// outputNode.connect(context.destination)
	
	return {outputNode, context}
}

export function isMidi(device: Device) {
	return device.numMIDIInputPorts === 0
}

type MIDIByte3 = [MIDIByte, MIDIByte, MIDIByte]

export function midiNote(device: Device, note: number, noteDurationMs: number = 250) {
	const midiChannel = 0

	// Format a MIDI message paylaod, this constructs a MIDI on event
	const noteOnMessage: MIDIByte3 = [
		144 + midiChannel, // Code for a note on: 10010000 & midi channel (0-15)
		note, // MIDI Note
		100 // MIDI Velocity
	]

	const noteOffMessage: MIDIByte3 = [
		128 + midiChannel, // Code for a note off: 10000000 & midi channel (0-15)
		note, // MIDI Note
		0 // MIDI Velocity
	]

	// Including rnbo.min.js (or the unminified rnbo.js) will add the RNBO object
	// to the global namespace. This includes the TimeNow constant as well as
	// the MIDIEvent constructor.
	const midiPort = 0

	// When scheduling an event to occur in the future, use the current audio context time
	// multiplied by 1000 (converting seconds to milliseconds) for now.
	const noteOnEvent = new MIDIEvent(device.context.currentTime * 1000, midiPort, noteOnMessage)
	const noteOffEvent = new MIDIEvent(
		device.context.currentTime * 1000 + noteDurationMs,
		midiPort,
		noteOffMessage
	)

	device.scheduleEvent(noteOnEvent)
	device.scheduleEvent(noteOffEvent)
}

function getToneParams(node: ToneAudioNode) {
	console.log(node)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return Object.keys(node).filter((key) => (<Record<string, any>>node)[key]._param instanceof AudioParam)
}