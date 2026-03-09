// @ts-nocheck — RNBO WASM AudioWorklet processor (runs in worklet context)
import p from './rnbo-runtime-helpers.js'

var t
;(function (t) {
	t[(t.Float32Audio = 0)] = 'Float32Audio'
	t[(t.TypedArray = 1)] = 'TypedArray'
})((t ||= {}))
class e {
	constructor() {
		this.type = t.TypedArray
	}
	serialize() {
		return {
			type: this.type
		}
	}
}
class n {
	constructor(e, n) {
		this.channels = 0
		this.sampleRate = 0
		this.type = t.Float32Audio
		this.channels = e
		this.sampleRate = n
	}
	static fromAudioBuffer(t) {
		return new n(t.numberOfChannels, t.sampleRate)
	}
	get isInterleaved() {
		return true
	}
	serialize() {
		return {
			channels: this.channels,
			sampleRate: this.sampleRate,
			type: this.type
		}
	}
}
var r
var i
var s
var a
;(function (t) {
	t[(t.BufferTransfer = 0)] = 'BufferTransfer'
	t[(t.ClockEvent = 1)] = 'ClockEvent'
	t[(t.DataRefEvent = 2)] = 'DataRefEvent'
	t[(t.MessageEvent = 3)] = 'MessageEvent'
	t[(t.MIDIEvent = 4)] = 'MIDIEvent'
	t[(t.ParameterEvent = 5)] = 'ParameterEvent'
	t[(t.ParameterBangEvent = 6)] = 'ParameterBangEvent'
	t[(t.PresetEvent = 7)] = 'PresetEvent'
	t[(t.StartupEvent = 8)] = 'StartupEvent'
	t[(t.TransportEvent = 9)] = 'TransportEvent'
	t[(t.TempoEvent = 10)] = 'TempoEvent'
	t[(t.BeatTimeEvent = 11)] = 'BeatTimeEvent'
	t[(t.TimeSignatureEvent = 12)] = 'TimeSignatureEvent'
})((r ||= {}))
class o {
	constructor(t = 0, e) {
		this.invalid = false
		this.time = t
		this.eventTarget = e
	}
	serialize() {
		return {
			eventTarget: this.eventTarget,
			invalid: this.invalid,
			source: this.source,
			time: this.time
		}
	}
}
;(function (t) {
	t[(t.Update = 1)] = 'Update'
})((i ||= {}))
class u extends o {
	constructor(t, e, n, i = '', s) {
		super(t, s)
		this.type = r.MessageEvent
		this.objectId = i
		this.tag = e
		this.payload = n
	}
	serialize() {
		return Object.assign(super.serialize(), {
			payload: this.payload,
			objectId: this.objectId,
			tag: this.tag,
			type: this.type
		})
	}
}
class h extends o {
	constructor(t, e, n, i) {
		super(t, i)
		this.type = r.MIDIEvent
		if (n.length > 3) {
			throw new Error(`MIDIData can only contain a maximum of 3 bytes. Received ${n.length}`)
		}
		this.data = n
		if (this.data.length < 3) {
			const t = n.length
			this.data.length = 3
			this.data = this.data.fill(undefined, t, 3)
		}
		let s = 0
		for (let t = 0; t < 3; t++) {
			if (n[t] !== undefined) {
				s++
			}
		}
		if (s < 1) {
			throw new Error('MIDIData must at least have the first byte set.')
		}
		this.length = s
		this.status = n[0] & 240
		this.channel = n[0] & 15
		this.port = e
	}
	serialize() {
		return Object.assign(super.serialize(), {
			channel: this.channel,
			data: this.data,
			port: this.port,
			type: this.type
		})
	}
}
class c extends o {
	constructor(t, e, n, i, s) {
		super(t, s)
		this.type = r.ParameterEvent
		this.target = e
		this.value = n
		this.source = i
	}
	serialize() {
		return Object.assign(super.serialize(), {
			target: this.target,
			type: this.type,
			value: this.value
		})
	}
}
;(function (t) {
	t[(t.Set = 1)] = 'Set'
	t[(t.Touched = 2)] = 'Touched'
})((s ||= {}))
class f extends o {
	constructor(t, e, n) {
		super(t, undefined)
		this.type = r.PresetEvent
		this.action = e
		this.preset = n
	}
	serialize() {
		return Object.assign(super.serialize(), {
			action: this.action,
			type: this.type,
			preset: this.preset
		})
	}
}
;(function (t) {
	t[(t.BEGIN = 0)] = 'BEGIN'
	t[(t.END = 1)] = 'END'
})((a ||= {}))
var _
var l
;(function (t) {
	t[(t.Number = 0)] = 'Number'
	t[(t.Bang = 1)] = 'Bang'
	t[(t.List = 2)] = 'List'
	t[(t.Signal = 3)] = 'Signal'
	t[(t.Count = 4)] = 'Count'
	t[(t.Enum = 5)] = 'Enum'
})((_ ||= {}))
;(function (t) {
	t[(t.All = 0)] = 'All'
	t[(t.Internal = 1)] = 'Internal'
})((l ||= {}))
;(() => {
	try {
		if (typeof WebAssembly == 'object' && typeof WebAssembly.instantiate == 'function') {
			const t = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0))
			if (t instanceof WebAssembly.Module) {
				return new WebAssembly.Instance(t) instanceof WebAssembly.Instance
			}
		}
	} catch (t) {}
})()
if (typeof isSecureContext != 'undefined') {
	isSecureContext
}
Math.pow(10, 4)
const I = (t) => t.slice()
class M {
	constructor() {
		this.t = []
		this.i = []
	}
	get listenerCount() {
		return this.t.length + this.i.length
	}
	emit(t) {
		if (this.t.length) {
			const e = I(this.t)
			for (let n = 0, r = e.length; n < r; n++) {
				e[n](t)
			}
		}
		if (this.i.length) {
			const e = I(this.i)
			for (let n = 0, r = e.length; n < r; n++) {
				e[n](t)
			}
			e.forEach((t) => this.unsubscribe(t))
		}
	}
	once(t) {
		this.i.push(t)
		return {
			unsubscribe: () => this.unsubscribe(t)
		}
	}
	subscribe(t) {
		this.t.push(t)
		return {
			unsubscribe: () => this.unsubscribe(t)
		}
	}
	unsubscribe(t) {
		const e = this.t.indexOf(t)
		if (e >= 0) {
			this.t.splice(e, 1)
		}
		const n = this.i.indexOf(t)
		if (n >= 0) {
			this.i.splice(n, 1)
		}
	}
	removeAllSubscriptions() {
		this.t = []
		this.i = []
	}
}
function b(t) {
	return class extends t {
		constructor(...t) {
			super()
			this.changeEvent = new M()
			this.o = new M()
			const e = t[0]
			this.u = e.notificationSetting
			this.convertFromNormalizedValue = e.scaling.convertFromNormalized
			this.convertToNormalizedValue = e.scaling.convertToNormalized
			this.constrainParameterValue = e.scaling.constrainParameterValue
			this.initialValue = e.initialValue
			this.h = e.initialValue
			this.displayName = e.displayName || e.name
			this.exponent = e.exponent
			this.id = e.id
			this.index = e.index
			this.min = e.min
			this.max = e.max
			this.name = e.name
			this.steps = e.steps
			this.unit = e.unit || ''
		}
		get notificationSetting() {
			return this.u
		}
		get normalizedValue() {
			return this.convertToNormalizedValue(this.h)
		}
		set normalizedValue(t) {
			this._(this.convertFromNormalizedValue(t))
		}
		l(t) {
			this.u = t
		}
		_(t) {
			t = this.constrainParameterValue(t)
			if (this.h !== t) {
				this.h = t
				this.o.emit(this)
				if (this.notificationSetting === l.All) {
					this.changeEvent.emit(t)
				}
			}
		}
		I(t) {
			this.h = t
			this.changeEvent.emit(t)
		}
	}
}
b(Object)
b(Object)
b(Object)
class d {
	constructor() {
		this.M = {}
		this.p = new Float32Array(128)
	}
	addParam(t, e) {
		if (t.type == p.ParameterTypeSignal && t.ioType === p.IOTypeInput) {
			this.M[t.signalIndex] = {
				name: e,
				param: new Float32Array(128)
			}
		}
	}
	getParamName(t) {
		let e = this.M[t]
		if (e !== undefined) {
			return e.name
		} else {
			return undefined
		}
	}
	getParamArray(t, e, n) {
		if (e.length == n) {
			return e
		}
		{
			let r = this.M[t]
			if (r.param.length != n) {
				r.param = new Float32Array(n)
			}
			return r.param.fill(e[0])
		}
	}
}
class y {
	constructor(t, e) {
		this.m = 0
		this.v = 0
		this.S = false
		this.D = new d()
		this.A = e
		let n = new this.A.CoreObject()
		this.g = n
		let r = {
			handleParameterEvent: t.handleParameterEvent.bind(t),
			handleMidiEvent: t.handleMidiEvent.bind(t),
			handleMessageEvent: t.handleMessageEvent.bind(t),
			handlePresetEvent: t.handlePresetEvent.bind(t)
		}
		let i = this.A.EventHandler.implement(r)
		this.O = n.createParameterInterface(i)
		for (let t = 0; t < n.getNumParameters(); t++) {
			let e = n.getParameterInfo(t)
			this.D.addParam(e, n.getParameterName(t))
		}
		this.m = n.getNumInputChannels() + n.getNumSignalInParameters()
		this.v = n.getNumOutputChannels()
		this.S = true
	}
	isReady() {
		return this.S
	}
	pushArray(t) {
		let e = this.g.getArrayPassingHEAP(t.length)
		this.A.HEAPF64.set(t, e >> 3)
		return e
	}
	retrieveArray(t) {
		let e = []
		for (let n = 0; n < t.size(); n++) {
			e.push(t.get(n))
		}
		return e
	}
	setExternalData(t, r, i) {
		const s = new Uint8Array(r)
		const a = this.g.getNewMemoryBuffer(s.byteLength)
		this.A.HEAPU8.set(s, a)
		if (i instanceof n) {
			this.g.setExternalAudioBuffer(t, a, s.byteLength, i.channels, i.sampleRate)
		} else if (i instanceof e) {
			this.g.setExternalUntypedBuffer(t, a, s.byteLength)
		}
	}
	releaseExternalData(t) {
		let r
		let i = this.g.getDataRefIndex(t)
		let s = this.g.getDataRefType(i)
		let a = this.g.getDataRefData(i)
		let o = new Uint8Array(a.sizeInBytes)
		o.set(this.A.HEAPU8.subarray(a.data, a.data + a.sizeInBytes))
		r = s.type == 1 ? new n(s.channels, s.sampleRate) : new e()
		this.g.releaseDataRef(i)
		return [o.buffer, r]
	}
	getCurrentTime() {
		return this.g.getCurrentTime()
	}
	setCurrentTime(t) {
		this.g.setCurrentTime(t)
	}
	prepareToProcess(t, e) {
		this.g.prepareToProcess(t, e)
	}
	process(t, e, n, r, i, s) {
		let a = 0
		let o = 0
		for (let n = 0; n < e && a < this.m; n++) {
			let e = t[n]
			let r = this.g.getInputChannel(a)
			this.A.HEAPF64.set(e, r >> 3)
			a++
		}
		if (s) {
			for (let t = a; t < this.m; t++) {
				let e = this.D.getParamName(t)
				if (e !== undefined) {
					let n = this.g.getInputChannel(t)
					this.A.HEAPF64.set(this.D.getParamArray(t, s[e], i), n >> 3)
					a++
				}
			}
		}
		this.g.process(a, this.v, i)
		for (let t = 0; t < r && o < this.v; t++) {
			let e = n[t]
			let r = this.g.getOutputChannel(o) >> 3
			e.set(this.A.HEAPF64.subarray(r, r + e.length))
			o++
		}
	}
	resolveTag(t) {
		return this.g.resolveTag(t)
	}
	scheduleEvent(t) {
		if (t.type === r.MIDIEvent) {
			this.g.scheduleMidiEvent(t.time, t.port, t.data[0], t.data[1], t.data[2])
		} else if (t.type === r.ParameterEvent) {
			this.g.scheduleParameterEvent(t.target, t.time, t.value, t.source)
		} else if (t.type === r.ParameterBangEvent) {
			this.g.scheduleParameterBangEvent(t.target, t.time)
		} else if (t.type === r.MessageEvent) {
			if (Array.isArray(t.payload)) {
				this.g.sendListMessage(
					t.tag,
					t.objectId,
					this.pushArray(t.payload),
					t.payload.length,
					t.time
				)
			} else if (typeof t.payload == 'number') {
				this.g.sendNumMessage(t.tag, t.objectId, t.payload, t.time)
			} else if (t.payload === undefined) {
				this.g.sendBangMessage(t.tag, t.objectId, t.time)
			}
		} else if (t.type === r.TransportEvent) {
			this.g.scheduleTransportEvent(t.time, t.state)
		} else if (t.type === r.TempoEvent) {
			this.g.scheduleTempoEvent(t.time, t.tempo)
		} else if (t.type === r.BeatTimeEvent) {
			this.g.scheduleBeatTimeEvent(t.time, t.beattime)
		} else if (t.type === r.TimeSignatureEvent) {
			this.g.scheduleTimeSignatureEvent(t.time, t.numerator, t.denominator)
		}
	}
	getNumParameters() {
		return this.g.getNumParameters()
	}
	getParameterValue(t) {
		return this.g.getParameterValue(t)
	}
	numIns() {
		return this.m
	}
	numOuts() {
		return this.v
	}
	getPreset() {
		return this.g.getPreset()
	}
	setPreset(t) {
		this.g.setPreset(t)
	}
}
var m
var v
;(function (t) {
	t[(t.LoadPatcher = 0)] = 'LoadPatcher'
	t[(t.ScheduleEvent = 1)] = 'ScheduleEvent'
	t[(t.TransferBuffer = 2)] = 'TransferBuffer'
	t[(t.ReleaseBuffer = 3)] = 'ReleaseBuffer'
	t[(t.SetPreset = 4)] = 'SetPreset'
	t[(t.GetPreset = 5)] = 'GetPreset'
	t[(t.Invalidate = 6)] = 'Invalidate'
})((m ||= {}))
;(function (t) {
	t[(t.LoadPatcherFinished = 1000)] = 'LoadPatcherFinished'
	t[(t.OutgoingEvent = 1002)] = 'OutgoingEvent'
	t[(t.ReleasedBuffer = 1003)] = 'ReleasedBuffer'
	t[(t.TransferBufferFinished = 1004)] = 'TransferBufferFinished'
	t[(t.GetPresetResponse = 1005)] = 'GetPresetResponse'
})((v ||= {}))
class S extends AudioWorkletProcessor {
	constructor(r) {
		super(r)
		this.P = true
		this.T = 128
		this.B = (r) => {
			switch (r.data[0]) {
				case m.LoadPatcher:
					rnbo_module().then((t) => {
						this.N = new y(this, t)
						this.port.postMessage([v.LoadPatcherFinished])
					})
					break
				case m.ScheduleEvent:
					const i = r.data[1]
					this.N.scheduleEvent(i)
					break
				case m.TransferBuffer: {
					const i = r.data[1]
					const s = ((r) => {
						switch (r.type) {
							case t.Float32Audio:
								return new n(r.channels, r.sampleRate)
							case t.TypedArray:
								return new e()
							default:
								throw new Error(`Unable to deserialize RNBODataDesc of type ${r.type}`)
						}
					})(i.typeDesc)
					this.N.setExternalData(i.memoryId, i.data, s)
					this.port.postMessage([
						v.TransferBufferFinished,
						{
							memoryId: i.memoryId
						}
					])
					break
				}
				case m.ReleaseBuffer: {
					const t = r.data[1]
					const [e, n] = this.N.releaseExternalData(t.memoryId)
					this.port.postMessage(
						[
							v.ReleasedBuffer,
							{
								memoryId: t.memoryId,
								data: e,
								typeDesc: n.serialize()
							}
						],
						[e]
					)
					break
				}
				case m.GetPreset: {
					const t = JSON.parse(this.N.getPreset())
					this.port.postMessage([
						v.GetPresetResponse,
						{
							preset: t
						}
					])
					break
				}
				case m.SetPreset: {
					const t = r.data[1]
					this.N.setPreset(JSON.stringify(t.preset))
					break
				}
				case m.Invalidate:
					this.P = false
					this.N = null
			}
		}
		this.port.onmessage = this.B
		this.port.start()
	}
	static get parameterDescriptors() {
		return RNBO_PARAM_DESCRIPTORS
	}
	handleParameterEvent(t) {
		this.port.postMessage([
			v.OutgoingEvent,
			new c(t.time, t.index, t.value, t.source, undefined).serialize()
		])
	}
	handleMidiEvent(t) {
		const e = new h(t.time, t.port, [t.b1, t.b2, t.b3], undefined)
		this.port.postMessage([v.OutgoingEvent, e.serialize()])
	}
	handleMessageEvent(t) {
		const e = new u(
			t.time,
			this.N.resolveTag(t.tag),
			t.type == 0 ? t.numValue : t.type === 1 ? this.N.retrieveArray(t.listValue) : undefined,
			this.N.resolveTag(t.objectId)
		)
		this.port.postMessage([v.OutgoingEvent, e.serialize()])
	}
	handlePresetEvent(t) {
		const e = new f(t.time, s.Touched)
		this.port.postMessage([v.OutgoingEvent, e.serialize()])
	}
	process(t, e, n) {
		let r = 0
		let i = 0
		if (!this.P) {
			return false
		}
		if (!this.N || !this.N.isReady()) {
			return true
		}
		let s = 0
		if (e.length && e[0] && e[0].length && e[0][0]) {
			s = e[0][0].length
		} else if (t.length && t[0] && t[0].length && t[0][0]) {
			s = t[0][0].length
		}
		s ||= this.T
		if (this.T < s) {
			this.T = s
		}
		this.N.setCurrentTime(currentTime * 1000)
		this.N.prepareToProcess(sampleRate, s)
		const a = []
		for (let e = 0; e < t.length && r < this.N.numIns(); e++) {
			const n = t[e]
			for (let t = 0; t < n.length && r < this.N.numIns() && n[t].length > 0; t++) {
				a.push(n[t])
				r++
			}
		}
		const o = []
		for (let t = 0; t < e.length && i < this.N.numOuts(); t++) {
			const n = e[t]
			for (let t = 0; t < n.length && i < this.N.numOuts(); t++) {
				o.push(n[t])
				i++
			}
		}
		this.N.process(a, r, o, i, s, n)
		return true
	}
}
registerProcessor(RNBO_PROCESSOR_NAME || 'RNBOProcessor', S)
