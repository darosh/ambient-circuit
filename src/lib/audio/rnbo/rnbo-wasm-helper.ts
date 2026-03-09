// @ts-nocheck — RNBO WASM helper
import * as n from './rnbo-data-buffer.js'
import * as i from './rnbo-events.js'
import * as s from './rnbo-parameters.js'
export class z {
	constructor(t, e) {
		this.O = 0
		this.N = 0
		this.C = false
		this.k = new s.aO()
		this.U = e
		let r = new this.U.CoreObject()
		this.j = r
		let n = {
			handleParameterEvent: t.handleParameterEvent.bind(t),
			handleMidiEvent: t.handleMidiEvent.bind(t),
			handleMessageEvent: t.handleMessageEvent.bind(t),
			handlePresetEvent: t.handlePresetEvent.bind(t)
		}
		let i = this.U.EventHandler.implement(n)
		this.F = r.createParameterInterface(i)
		for (let t = 0; t < r.getNumParameters(); t++) {
			let e = r.getParameterInfo(t)
			this.k.addParam(e, r.getParameterName(t))
		}
		this.O = r.getNumInputChannels() + r.getNumSignalInParameters()
		this.N = r.getNumOutputChannels()
		this.C = true
	}
	isReady() {
		return this.C
	}
	pushArray(t) {
		let e = this.j.getArrayPassingHEAP(t.length)
		this.U.HEAPF64.set(t, e >> 3)
		return e
	}
	retrieveArray(t) {
		let e = []
		for (let r = 0; r < t.size(); r++) {
			e.push(t.get(r))
		}
		return e
	}
	setExternalData(t, e, r) {
		const i = new Uint8Array(e)
		const s = this.j.getNewMemoryBuffer(i.byteLength)
		this.U.HEAPU8.set(i, s)
		if (r instanceof n.Le) {
			this.j.setExternalAudioBuffer(t, s, i.byteLength, r.channels, r.sampleRate)
		} else if (r instanceof n.nc) {
			this.j.setExternalUntypedBuffer(t, s, i.byteLength)
		}
	}
	releaseExternalData(t) {
		let e
		let r = this.j.getDataRefIndex(t)
		let i = this.j.getDataRefType(r)
		let s = this.j.getDataRefData(r)
		let a = new Uint8Array(s.sizeInBytes)
		a.set(this.U.HEAPU8.subarray(s.data, s.data + s.sizeInBytes))
		e = i.type == 1 ? new n.Le(i.channels, i.sampleRate) : new n.nc()
		this.j.releaseDataRef(r)
		return [a.buffer, e]
	}
	getCurrentTime() {
		return this.j.getCurrentTime()
	}
	setCurrentTime(t) {
		this.j.setCurrentTime(t)
	}
	prepareToProcess(t, e) {
		this.j.prepareToProcess(t, e)
	}
	process(t, e, r, n, i, s) {
		let a = 0
		let o = 0
		for (let r = 0; r < e && a < this.O; r++) {
			let e = t[r]
			let n = this.j.getInputChannel(a)
			this.U.HEAPF64.set(e, n >> 3)
			a++
		}
		if (s) {
			for (let t = a; t < this.O; t++) {
				let e = this.k.getParamName(t)
				if (e !== undefined) {
					let r = this.j.getInputChannel(t)
					this.U.HEAPF64.set(this.k.getParamArray(t, s[e], i), r >> 3)
					a++
				}
			}
		}
		this.j.process(a, this.N, i)
		for (let t = 0; t < n && o < this.N; t++) {
			let e = r[t]
			let n = this.j.getOutputChannel(o) >> 3
			e.set(this.U.HEAPF64.subarray(n, n + e.length))
			o++
		}
	}
	resolveTag(t) {
		return this.j.resolveTag(t)
	}
	scheduleEvent(t) {
		if (t.type === i.m5.MIDIEvent) {
			this.j.scheduleMidiEvent(t.time, t.port, t.data[0], t.data[1], t.data[2])
		} else if (t.type === i.m5.ParameterEvent) {
			this.j.scheduleParameterEvent(t.target, t.time, t.value, t.source)
		} else if (t.type === i.m5.ParameterBangEvent) {
			this.j.scheduleParameterBangEvent(t.target, t.time)
		} else if (t.type === i.m5.MessageEvent) {
			if (Array.isArray(t.payload)) {
				this.j.sendListMessage(
					t.tag,
					t.objectId,
					this.pushArray(t.payload),
					t.payload.length,
					t.time
				)
			} else if (typeof t.payload == 'number') {
				this.j.sendNumMessage(t.tag, t.objectId, t.payload, t.time)
			} else if (t.payload === undefined) {
				this.j.sendBangMessage(t.tag, t.objectId, t.time)
			}
		} else if (t.type === i.m5.TransportEvent) {
			this.j.scheduleTransportEvent(t.time, t.state)
		} else if (t.type === i.m5.TempoEvent) {
			this.j.scheduleTempoEvent(t.time, t.tempo)
		} else if (t.type === i.m5.BeatTimeEvent) {
			this.j.scheduleBeatTimeEvent(t.time, t.beattime)
		} else if (t.type === i.m5.TimeSignatureEvent) {
			this.j.scheduleTimeSignatureEvent(t.time, t.numerator, t.denominator)
		}
	}
	getNumParameters() {
		return this.j.getNumParameters()
	}
	getParameterValue(t) {
		return this.j.getParameterValue(t)
	}
	numIns() {
		return this.O
	}
	numOuts() {
		return this.N
	}
	getPreset() {
		return this.j.getPreset()
	}
	setPreset(t) {
		this.j.setPreset(t)
	}
}
