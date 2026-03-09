import a from './rnbo-runtime-helpers.js'
import B from './rnbo-default-patcher.js'
import { Buffer as U } from 'buffer'

var t
function e(t, e, r, n) {
	return new (r ||= Promise)(function (i, s) {
		function o(t) {
			try {
				a(n.next(t))
			} catch (t) {
				s(t)
			}
		}
		function u(t) {
			try {
				a(n.throw(t))
			} catch (t) {
				s(t)
			}
		}
		function a(t) {
			var e
			if (t.done) {
				i(t.value)
			} else {
				;((e = t.value),
				e instanceof r
					? e
					: new r(function (t) {
							t(e)
						})).then(o, u)
			}
		}
		a((n = n.apply(t, e || [])).next())
	})
}
;(function (t) {
	t[(t.Float32Audio = 0)] = 'Float32Audio'
	t[(t.TypedArray = 1)] = 'TypedArray'
})((t ||= {}))
class r {
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
	constructor(e, r) {
		this.channels = 0
		this.sampleRate = 0
		this.type = t.Float32Audio
		this.channels = e
		this.sampleRate = r
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
var i
var s
;(function (t) {
	t[(t.Inport = 0)] = 'Inport'
	t[(t.Outport = 1)] = 'Outport'
	t[(t.Undefined = 2)] = 'Undefined'
})((i ||= {}))
;(function (t) {
	t[(t.STOPPED = 0)] = 'STOPPED'
	t[(t.RUNNING = 1)] = 'RUNNING'
})((s ||= {}))
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
const o = (t) => t.slice()
class u {
	constructor() {
		this.o = []
		this.u = []
	}
	get listenerCount() {
		return this.o.length + this.u.length
	}
	emit(t) {
		if (this.o.length) {
			const e = o(this.o)
			for (let r = 0, n = e.length; r < n; r++) {
				e[r](t)
			}
		}
		if (this.u.length) {
			const e = o(this.u)
			for (let r = 0, n = e.length; r < n; r++) {
				e[r](t)
			}
			e.forEach((t) => this.unsubscribe(t))
		}
	}
	once(t) {
		this.u.push(t)
		return {
			unsubscribe: () => this.unsubscribe(t)
		}
	}
	subscribe(t) {
		this.o.push(t)
		return {
			unsubscribe: () => this.unsubscribe(t)
		}
	}
	unsubscribe(t) {
		const e = this.o.indexOf(t)
		if (e >= 0) {
			this.o.splice(e, 1)
		}
		const r = this.u.indexOf(t)
		if (r >= 0) {
			this.u.splice(r, 1)
		}
	}
	removeAllSubscriptions() {
		this.o = []
		this.u = []
	}
}
class h {
	constructor() {
		this.h = 0
		this.l = 44100
		this.p = 64
		this.outgoingEvent = new u()
		this.parameterChangeEvent = new u()
		this.m = this.sampsToMs(this.p)
	}
	static getNonConversionObject() {
		return {
			applyStepsToNormalizedParameterValue: function (t) {
				return t
			},
			convertToNormalizedParameterValue: function (t) {
				return t
			},
			convertFromNormalizedParameterValue: function (t) {
				return t
			},
			getNumParameters: function () {
				return 0
			},
			constrainParameterValue: function (t) {
				return t
			},
			isPolyphonic: false,
			subpatches: []
		}
	}
	static deserializeConversion(t) {
		if (t) {
			const e = {}
			const r = Object.keys(t)
			for (let n = 0; n < r.length; n++) {
				const i = r[n]
				if (i === 'subpatches') {
					const r = Object.keys(t.subpatches)
					for (let n = 0; n < r.length; n++) {
						const i = r[n]
						const s = t.subpatches[i]
						const o = h.deserializeConversion(s)
						if (s.isPolyphonic) {
							e[i] = [o]
						} else {
							e[i] = o
						}
					}
				} else {
					e[i] = a.evalFunction(t[i])
				}
			}
			return e
		}
		return this.getNonConversionObject()
	}
	getSampleRate() {
		return this.l
	}
	getSamplesPerBlock() {
		return this.p
	}
	sampsToMs(t) {
		return (t / this.l) * 1000
	}
	getNumInputChannels() {
		if (this._) {
			return this._.numInputChannels
		} else {
			return 0
		}
	}
	getNumOutputChannels() {
		if (this._) {
			return this._.numOutputChannels
		} else {
			return 0
		}
	}
	getNumMIDIInputPorts() {
		if (this._) {
			return this._.numMidiInputPorts
		} else {
			return 0
		}
	}
	getNumMIDIOutputPorts() {
		if (this._) {
			return this._.numMidiOutputPorts
		} else {
			return 0
		}
	}
	getNumParameters() {
		if (this._) {
			return this._.numParameters
		} else {
			return 0
		}
	}
	getNumSignalInParameters() {
		if (this._) {
			return this._.numSignalInParameters
		} else {
			return 0
		}
	}
	getNumSignalOutParameters() {
		if (this._) {
			return this._.numSignalOutParameters
		} else {
			return 0
		}
	}
	getPatcherSerial() {
		if (this._ !== undefined) {
			return this._.patcherSerial
		} else {
			return 0
		}
	}
	getParameterName(t) {
		if (!this._ || t >= this._.parameters.length) {
			throw new Error(`Parameter index ${t} out of bounds.`)
		}
		return this._.parameters[t].name
	}
	getParameterId(t) {
		if (!this._ || t >= this._.parameters.length) {
			throw new Error(`Parameter index ${t} out of bounds.`)
		}
		return this._.parameters[t].paramId
	}
	getParameterToNormalizedFunction(t) {
		return (e) => this.g.convertToNormalizedParameterValue(t, e)
	}
	getParameterFromNormalizedFunction(t) {
		return (e) => this.g.convertFromNormalizedParameterValue(t, e)
	}
	constrainParameterValue(t) {
		return (e) => this.g.constrainParameterValue(t, e)
	}
	getParameterInfo(t) {
		if (!this._ || t >= this._.parameters.length) {
			throw new Error(`Parameter index ${t} out of bounds.`)
		}
		const e = this._.parameters[t]
		let r
		let n
		switch (e.type) {
			case 'ParameterTypeBang':
				n = a.ParameterTypeBang
				break
			case 'ParameterTypeCount':
				n = a.ParameterTypeCount
				break
			case 'ParameterTypeList':
				n = a.ParameterTypeList
				break
			case 'ParameterTypeNumber':
				n = a.ParameterTypeNumber
				break
			case 'ParameterTypeSignal':
				n = a.ParameterTypeSignal
				break
			default:
				throw new Error(`Unknown Parameter Type from patcher description ${e.type}`)
		}
		switch (e.ioType) {
			case 'IOTypeInput':
				r = a.IOTypeInput
				break
			case 'IOTypeOutput':
				r = a.IOTypeOutput
				break
			case 'IOTypeUndefined':
				r = a.IOTypeUndefined
				break
			default:
				throw new Error(`Unknown Parameter IOType from patcher description ${e.type}`)
		}
		return {
			displayName: e.displayName,
			enumValues: e.enumValues,
			exponent: e.exponent,
			id: e.paramId,
			index: t,
			initialValue: e.initialValue,
			ioType: r,
			isEnum: e.isEnum,
			max: e.maximum,
			min: e.minimum,
			name: e.name,
			signalIndex: e.signalIndex,
			steps: e.steps,
			type: n,
			unit: e.unit,
			visible: e.visible
		}
	}
	getNumExternalDataRefs() {
		if (this._ !== undefined) {
			return this._.externalDataRefs.length
		} else {
			return 0
		}
	}
	getExternalDataId(t) {
		if (this._ !== undefined) {
			return this._.externalDataRefs[t].id
		} else {
			return ''
		}
	}
	getExternalDataRefIds() {
		let t
		if (this._) {
			t = []
			Object.keys(this._.externalDataRefs).forEach((e) => {
				let r = this._.externalDataRefs[e]
				t.push(r.id)
			})
		}
		return t
	}
	getExternalDataRefInfos() {
		if (this._ !== undefined) {
			return this._.externalDataRefs
		} else {
			return []
		}
	}
	getNumMessages() {
		if (this._ !== undefined) {
			return this._.inports.length + this._.outports.length
		} else {
			return 0
		}
	}
	getMessageInfos() {
		let t = []
		if (this._ !== undefined) {
			Object.keys(this._.outports).forEach((e) => {
				t.push({
					tag: this._.outports[e].tag,
					type: i.Outport,
					meta: this._.outports[e].meta
				})
			})
			Object.keys(this._.inports).forEach((e) => {
				t.push({
					tag: this._.inports[e].tag,
					type: i.Inport,
					meta: this._.inports[e].meta
				})
			})
		}
		return t
	}
	removeAllSubscriptions() {
		this.outgoingEvent.removeAllSubscriptions()
		this.parameterChangeEvent.removeAllSubscriptions()
	}
	invalidateProcessor() {}
	setPatcherDesc(t) {
		return e(this, undefined, undefined, function* () {
			this._ = t
			this.g = h.deserializeConversion(this._.paramConversion)
		})
	}
}
var f
var c
var l
var d
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
})((f ||= {}))
class p {
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
class m extends p {
	constructor(t, e, r, n) {
		super(t, n)
		this.type = f.ClockEvent
		this.clockIndex = e
		this.value = r
	}
	get hasValue() {
		return this.value !== undefined
	}
	serialize() {
		return Object.assign(super.serialize(), {
			clockIndex: this.clockIndex,
			type: this.type,
			value: this.value
		})
	}
}
;(function (t) {
	t[(t.Update = 1)] = 'Update'
})((c ||= {}))
class _ extends p {
	constructor(t, e, r, n) {
		super(t, n)
		this.type = f.DataRefEvent
		this.dataRefIndex = e
		this.action = r
	}
	serialize() {
		return Object.assign(super.serialize(), {
			action: this.action,
			dataRefIndex: this.dataRefIndex,
			type: this.type
		})
	}
}
class g extends p {
	constructor(t, e, r, n = '', i) {
		super(t, i)
		this.type = f.MessageEvent
		this.objectId = n
		this.tag = e
		this.payload = r
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
class y extends p {
	constructor(t, e, r, n) {
		super(t, n)
		this.type = f.MIDIEvent
		if (r.length > 3) {
			throw new Error(`MIDIData can only contain a maximum of 3 bytes. Received ${r.length}`)
		}
		this.data = r
		if (this.data.length < 3) {
			const t = r.length
			this.data.length = 3
			this.data = this.data.fill(undefined, t, 3)
		}
		let i = 0
		for (let t = 0; t < 3; t++) {
			if (r[t] !== undefined) {
				i++
			}
		}
		if (i < 1) {
			throw new Error('MIDIData must at least have the first byte set.')
		}
		this.length = i
		this.status = r[0] & 240
		this.channel = r[0] & 15
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
class b extends p {
	constructor(t, e, r, n, i) {
		super(t, i)
		this.type = f.ParameterEvent
		this.target = e
		this.value = r
		this.source = n
	}
	serialize() {
		return Object.assign(super.serialize(), {
			target: this.target,
			type: this.type,
			value: this.value
		})
	}
}
class I extends p {
	constructor(t, e, r) {
		super(t, r)
		this.type = f.ParameterBangEvent
		this.target = e
	}
	serialize() {
		return Object.assign(super.serialize(), {
			target: this.target,
			type: this.type
		})
	}
}
;(function (t) {
	t[(t.Set = 1)] = 'Set'
	t[(t.Touched = 2)] = 'Touched'
})((l ||= {}))
class w extends p {
	constructor(t, e, r) {
		super(t, undefined)
		this.type = f.PresetEvent
		this.action = e
		this.preset = r
	}
	serialize() {
		return Object.assign(super.serialize(), {
			action: this.action,
			type: this.type,
			preset: this.preset
		})
	}
}
class v extends p {
	constructor(t, e) {
		super(t, undefined)
		this.type = f.TransportEvent
		this.state = e
	}
	serialize() {
		return Object.assign(super.serialize(), {
			state: this.state,
			type: this.type
		})
	}
}
class M extends p {
	constructor(t, e) {
		super(t, undefined)
		this.type = f.TempoEvent
		this.tempo = e
	}
	serialize() {
		return Object.assign(super.serialize(), {
			tempo: this.tempo,
			type: this.type
		})
	}
}
class E extends p {
	constructor(t, e) {
		super(t, undefined)
		this.type = f.BeatTimeEvent
		this.beattime = e
	}
	serialize() {
		return Object.assign(super.serialize(), {
			beattime: this.beattime,
			type: this.type
		})
	}
}
class S extends p {
	constructor(t, e, r) {
		super(t, undefined)
		this.type = f.TimeSignatureEvent
		this.numerator = e
		this.denominator = r
	}
	serialize() {
		return Object.assign(super.serialize(), {
			numerator: this.numerator,
			denominator: this.denominator,
			type: this.type
		})
	}
}
;(function (t) {
	t[(t.BEGIN = 0)] = 'BEGIN'
	t[(t.END = 1)] = 'END'
})((d ||= {}))
class T extends p {
	constructor(t, e) {
		super(t, undefined)
		this.type = f.StartupEvent
		this.phase = e
	}
	serialize() {
		return Object.assign(super.serialize(), {
			phase: this.phase,
			type: this.type
		})
	}
}
function A(t, e) {
	return t.time - e.time
}
function P(t) {
	t.sort(A)
}
class O extends h {
	constructor() {
		super()
		this.I = false
		this.v = false
		this.M = undefined
		this.S = -1
		this.T = []
		this.I = false
		this.setPatcherDesc(B.desc)
		this.setPatcherCode(B.src[0].code)
	}
	B(t) {
		const e = t.eventTarget || this.A
		t.time = Math.max(t.time, this.h)
		this.M = t
		if (t.type === f.ParameterEvent) {
			const r = t
			e.setParameterValue(r.target, r.value, t.time)
		} else if (t.type === f.ParameterBangEvent) {
			const r = t
			e.processParameterBangEvent(r.target, t.time)
		} else if (t.type === f.MIDIEvent) {
			const r = t
			e.processMidiEvent(r.time, r.port, r.data, r.length)
		} else if (t.type === f.ClockEvent) {
			const r = t
			e.processClockEvent(r.time, r.clockIndex, r.hasValue, r.value)
		} else if (t.type === f.DataRefEvent) {
			const r = t
			if (r.action === c.Update) {
				e.processDataViewUpdate(r.dataRefIndex, r.time)
			}
		} else if (t.type === f.MessageEvent) {
			const r = t
			if (Array.isArray(r.payload)) {
				e.processListMessage(a.TAG(r.tag), a.TAG(r.objectId), r.time, r.payload)
			} else if (r.payload === undefined) {
				e.processBangMessage(a.TAG(r.tag), a.TAG(r.objectId), r.time)
			} else {
				e.processNumMessage(a.TAG(r.tag), a.TAG(r.objectId), r.time, r.payload)
			}
		} else if (t.type === f.PresetEvent) {
			const e = t
			if (e.action === l.Set) {
				this.v = true
				this.A.setPreset(e.time, e.preset)
				this.v = false
			}
		} else if (t.type === f.TransportEvent) {
			const e = t
			this.A.processTransportEvent(e.time, e.state)
		} else if (t.type === f.TempoEvent) {
			const e = t
			this.A.processTempoEvent(e.time, e.tempo)
		} else if (t.type === f.BeatTimeEvent) {
			const e = t
			this.A.processBeatTimeEvent(e.time, e.beattime)
		} else if (t.type === f.TimeSignatureEvent) {
			const e = t
			this.A.processTimeSignatureEvent(e.time, e.numerator, e.denominator)
		} else if (t.type === f.StartupEvent) {
			const e = t
			this.v = e.phase === d.BEGIN
		}
		this.M = undefined
	}
	getCurrentTime() {
		return this.h
	}
	setCurrentTime(t) {
		this.h = t
	}
	prepareToProcess(t, e, r) {
		if (r || t !== this.l || e !== this.p) {
			this.l = t
			this.p = e
			this.m = this.sampsToMs(this.p)
			if (this.isSync) {
				this.A.prepareToProcess(this.l, this.p)
			}
		}
	}
	process(t, e, r, n, i, s, o) {
		const u = Math.min(e, this.getNumInputChannels() + this.getNumSignalInParameters())
		const a = Math.min(n, this.getNumOutputChannels())
		const h = Math.min(i, this.p)
		this.S = this.h + this.m
		if (this.midiInput !== undefined) {
			this.T.push.apply(this.T, s)
			this.I = true
		}
		if (this.I) {
			P(this.T)
			this.I = false
		}
		while (this.T.length > 0 && this.T[0].time < this.S) {
			this.B(this.T.shift())
		}
		this.A.process(t, u, r, a, h)
		this.h = this.S
		this.S = -1
	}
	scheduleMidiEvent(t, e) {
		this.scheduleEvent(new y(this.h, t, e, this.A))
	}
	notifyParameterValueChanged(t, e) {
		let r = this.M ? this.M.source : undefined
		this.parameterChangeEvent.emit(new b(this.getCurrentTime(), t, e, r))
	}
	scheduleParameterChange(t, e, r) {
		this.scheduleEvent(new b(this.getCurrentTime(), t, e, undefined))
	}
	scheduleParameterBang(t, e) {
		this.scheduleEvent(new I(this.getCurrentTime(), t))
	}
	sendNumMessage(t, e, r) {
		const n = new g(this.h, this.A.resolveTag(t), r, this.A.resolveTag(e))
		this.outgoingEvent.emit(n)
	}
	sendBangMessage(t, e) {
		const r = new g(this.h, this.A.resolveTag(t), undefined, this.A.resolveTag(e))
		this.outgoingEvent.emit(r)
	}
	sendListMessage(t, e, r) {
		const n = new g(this.h, this.A.resolveTag(t), r, this.A.resolveTag(e))
		this.outgoingEvent.emit(n)
	}
	getParameterValue(t) {
		return this.A.getParameterValue(t)
	}
	flushClockEvents(t, e, r) {
		this.flushClockEventsWithValue(t, e, undefined, r)
	}
	flushClockEventsWithValue(t, e, r, n) {
		for (let i = 0; i < this.T.length; i++) {
			if (this.T[i] instanceof m) {
				const s = this.T[i]
				if (
					s.eventTarget === t &&
					(s.clockIndex === e || s.clockIndex === undefined) &&
					(r === undefined || s.value === r)
				) {
					this.T.splice(i, 1)
					if (n) {
						this.B(s)
					}
					i--
				}
			}
		}
	}
	deleteClockEvents(t) {
		this.flushClockEvents(t, undefined, false)
	}
	scheduleClockEvent(t, e, r) {
		this.scheduleClockEventWithValue(t, e, r, undefined)
	}
	scheduleClockEventWithValue(t, e, r, n) {
		this.scheduleEvent(new m(r, e, n, t))
	}
	sendMidiEvent(t, e, r, n) {
		const i = new y(this.getCurrentTime(), t, [e, r, n], undefined)
		this.outgoingEvent.emit(i)
	}
	sendMidiEventList(t, e) {
		let r
		for (r = 2; r < e.length; r += 3) {
			this.sendMidiEvent(t, e[r - 2], e[r - 1], e[r])
		}
		r -= 3
		if (r < e.length) {
			var n = r - e.length
			this.sendMidiEvent(t, e[r], n > 1 ? e[r + 1] : undefined, n > 2 ? e[r + 2] : undefined)
		}
	}
	sendOutlet(t, e, r) {
		console.log('sendOutlet', t, e, r)
	}
	updatePatcherEventTarget(t, e) {
		for (let r = 0; r < this.T.length; r++) {
			if (this.T[r].eventTarget === t) {
				this.T[r].eventTarget = e
				this.T[r].invalid = false
			}
		}
	}
	rescheduleEventTarget(t) {
		for (let e = 0; e < this.T.length; e++) {
			if (this.T[e].eventTarget === t) {
				this.T[e].invalid = false
			}
		}
	}
	isInProcess() {
		return this.S > -1
	}
	sendDataRefUpdated(t) {
		this.scheduleEvent(new _(this.getCurrentTime(), t, c.Update, this.A))
	}
	get isSync() {
		return true
	}
	scheduleEvent(t) {
		this.T.push(t)
		if (this.isInProcess()) {
			P(this.T)
		} else {
			this.I = true
		}
	}
	setPatcherCode(t) {
		return e(this, undefined, undefined, function* () {
			const e = {}
			if (this.A) {
				this.A.extractState(e)
			}
			this.A = a.deserializeSrc(t)
			for (let t = 0; t < this.T.length; t++) {
				if (this.T[t].eventTarget) {
					this.T[t].invalid = true
				}
			}
			this.A.setEngineAndPatcher(this, null)
			this.scheduleEvent(new T(this.h, d.BEGIN))
			this.A.initialize(e)
			this.scheduleEvent(new T(this.h, d.END))
			this.A.prepareToProcess(this.l, this.p, true)
			for (let t = this.T.length - 1; t >= 0; t--) {
				if (this.T[t].invalid) {
					this.T.splice(t, 1)
				}
			}
		})
	}
	setExternalData(t, r, i) {
		return e(this, undefined, undefined, function* () {
			const e = this.A.getNumDataRefs()
			for (let s = 0; s < e; s++) {
				const e = this.A.getDataRef(s)
				if (e.name == t) {
					e.arrayBuffer = r
					if (i instanceof n) {
						e.channels = i.channels
						e.sampleRate = i.sampleRate
					}
					this.sendDataRefUpdated(s)
					break
				}
			}
		})
	}
	releaseExternalData(t) {
		return e(this, undefined, undefined, function* () {
			const e = this.A.getNumDataRefs()
			let i
			let s
			for (let o = 0; o < e; o++) {
				const e = this.A.getDataRef(o)
				if (e.name == t) {
					i = e.arrayBuffer
					e.arrayBuffer = new ArrayBuffer(0)
					if (e.channels) {
						s = new n(e.channels, e.sampleRate)
						e.channels = 0
						e.sampleRate = 0
					} else {
						s = new r()
					}
					this.sendDataRefUpdated(o)
					break
				}
			}
			if (!i) {
				throw new Error(`Invalid DataBuffer. No DataBuffer with id ${t} found.`)
			}
			return {
				data: i,
				typeDesc: s
			}
		})
	}
	getPreset() {
		return e(this, undefined, undefined, function* () {
			let t = {}
			this.A.getPreset(t)
			return t
		})
	}
	setPreset(t) {
		this.scheduleEvent(new w(this.h, l.Set, t))
	}
	presetTouched() {
		if (!this.v) {
			this.outgoingEvent.emit(new w(this.h, l.Touched, undefined))
		}
	}
}
var N
var D
function R(t) {
	return class extends t {
		constructor(...t) {
			super()
			this.changeEvent = new u()
			this.P = new u()
			const e = t[0]
			this.O = e.notificationSetting
			this.convertFromNormalizedValue = e.scaling.convertFromNormalized
			this.convertToNormalizedValue = e.scaling.convertToNormalized
			this.constrainParameterValue = e.scaling.constrainParameterValue
			this.initialValue = e.initialValue
			this.N = e.initialValue
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
			return this.O
		}
		get normalizedValue() {
			return this.convertToNormalizedValue(this.N)
		}
		set normalizedValue(t) {
			this.D(this.convertFromNormalizedValue(t))
		}
		R(t) {
			this.O = t
		}
		D(t) {
			t = this.constrainParameterValue(t)
			if (this.N !== t) {
				this.N = t
				this.P.emit(this)
				if (this.notificationSetting === D.All) {
					this.changeEvent.emit(t)
				}
			}
		}
		C(t) {
			this.N = t
			this.changeEvent.emit(t)
		}
	}
}
;(function (t) {
	t[(t.Number = 0)] = 'Number'
	t[(t.Bang = 1)] = 'Bang'
	t[(t.List = 2)] = 'List'
	t[(t.Signal = 3)] = 'Signal'
	t[(t.Count = 4)] = 'Count'
	t[(t.Enum = 5)] = 'Enum'
})((N ||= {}))
;(function (t) {
	t[(t.All = 0)] = 'All'
	t[(t.Internal = 1)] = 'Internal'
})((D ||= {}))
R(Object)
R(Object)
R(Object)
class x {
	constructor() {
		this.k = {}
		this.U = new Float32Array(128)
	}
	addParam(t, e) {
		if (t.type == a.ParameterTypeSignal && t.ioType === a.IOTypeInput) {
			this.k[t.signalIndex] = {
				name: e,
				param: new Float32Array(128)
			}
		}
	}
	getParamName(t) {
		let e = this.k[t]
		if (e !== undefined) {
			return e.name
		} else {
			return undefined
		}
	}
	getParamArray(t, e, r) {
		if (e.length == r) {
			return e
		}
		{
			let n = this.k[t]
			if (n.param.length != r) {
				n.param = new Float32Array(r)
			}
			return n.param.fill(e[0])
		}
	}
}
var C
var k
;(function (t) {
	t[(t.LoadPatcher = 0)] = 'LoadPatcher'
	t[(t.ScheduleEvent = 1)] = 'ScheduleEvent'
	t[(t.TransferBuffer = 2)] = 'TransferBuffer'
	t[(t.ReleaseBuffer = 3)] = 'ReleaseBuffer'
	t[(t.SetPreset = 4)] = 'SetPreset'
	t[(t.GetPreset = 5)] = 'GetPreset'
	t[(t.Invalidate = 6)] = 'Invalidate'
})((C ||= {}))
;(function (t) {
	t[(t.LoadPatcherFinished = 1000)] = 'LoadPatcherFinished'
	t[(t.OutgoingEvent = 1002)] = 'OutgoingEvent'
	t[(t.ReleasedBuffer = 1003)] = 'ReleasedBuffer'
	t[(t.TransferBufferFinished = 1004)] = 'TransferBufferFinished'
	t[(t.GetPresetResponse = 1005)] = 'GetPresetResponse'
})((k ||= {}))
const z = JSON.parse(U.from(RNBO_PATCHER_DESC, 'base64').toString('utf-8'))
const j = U.from(RNBO_PATCHER_SRC, 'base64').toString('utf-8')
class X extends AudioWorkletProcessor {
	constructor(i) {
		super(i)
		this.j = new O()
		this.X = []
		this.F = []
		this.$ = new x()
		this.V = (i) =>
			e(this, undefined, undefined, function* () {
				switch (i.data[0]) {
					case C.LoadPatcher:
						yield this.j.setPatcherDesc(z)
						yield this.j.setPatcherCode(j)
						for (let t = 0; t < this.j.getNumParameters(); t++) {
							const e = this.j.getParameterInfo(t)
							this.$.addParam(e, this.j.getParameterName(t))
						}
						this.X = new Array(this.j.getNumInputChannels() + this.j.getNumSignalInParameters())
						this.F = new Array(this.j.getNumOutputChannels() + this.j.getNumSignalOutParameters())
						this.j.process([], 0, [[]], 1, 0)
						this.port.postMessage([k.LoadPatcherFinished])
						break
					case C.ScheduleEvent:
						this.j.scheduleEvent(
							((t) => {
								switch (t.type) {
									case f.ClockEvent:
										return new m(t.time, t.clockIndex, t.value, t.eventTarget)
									case f.DataRefEvent:
										return new _(t.time, t.dataRefIndex, t.action, t.eventTarget)
									case f.MessageEvent:
										return new g(t.time, t.tag, t.payload, t.objectId, t.eventTarget)
									case f.MIDIEvent:
										return new y(t.time, t.port, t.data, t.eventTarget)
									case f.ParameterEvent:
										return new b(t.time, t.target, t.value, t.source, t.eventTarget)
									case f.ParameterBangEvent:
										return new I(t.time, t.target, t.eventTarget)
									case f.PresetEvent:
										return new w(t.time, t.action, t.preset)
									case f.TransportEvent:
										return new v(t.time, t.state)
									case f.TempoEvent:
										return new M(t.time, t.tempo)
									case f.BeatTimeEvent:
										return new E(t.time, t.beattime)
									case f.TimeSignatureEvent:
										return new S(t.time, t.numerator, t.denominator)
									case f.StartupEvent:
										return new T(t.time, t.phase)
									default:
										throw new Error(`Unable to deserialize RNBOEvent of type ${t.type}`)
								}
							})(i.data[1])
						)
						break
					case C.TransferBuffer: {
						const e = i.data[1]
						this.j.setExternalData(
							e.memoryId,
							e.data,
							((e) => {
								switch (e.type) {
									case t.Float32Audio:
										return new n(e.channels, e.sampleRate)
									case t.TypedArray:
										return new r()
									default:
										throw new Error(`Unable to deserialize RNBODataDesc of type ${e.type}`)
								}
							})(e.typeDesc)
						)
						this.port.postMessage([
							k.TransferBufferFinished,
							{
								memoryId: e.memoryId
							}
						])
						break
					}
					case C.ReleaseBuffer: {
						const t = i.data[1]
						const { data: e, typeDesc: r } = yield this.j.releaseExternalData(t.memoryId)
						this.port.postMessage(
							[
								k.ReleasedBuffer,
								{
									memoryId: t.memoryId,
									data: e,
									typeDesc: r.serialize()
								}
							],
							[e]
						)
						break
					}
					case C.GetPreset: {
						const t = yield this.j.getPreset()
						this.port.postMessage([
							k.GetPresetResponse,
							{
								preset: t
							}
						])
						break
					}
					case C.SetPreset: {
						const t = i.data[1]
						this.j.setPreset(t.preset)
					}
				}
			})
		this.L = (t) => {
			this.port.postMessage([k.OutgoingEvent, t.serialize()])
		}
		this.q = (t) => {
			this.port.postMessage([k.OutgoingEvent, t.serialize()])
		}
		this.j.outgoingEvent.subscribe(this.L)
		this.j.parameterChangeEvent.subscribe(this.q)
		this.port.onmessage = this.V
		this.port.start()
	}
	static get parameterDescriptors() {
		return RNBO_PARAM_DESCRIPTORS
	}
	process(t, e, r) {
		let n
		let i
		let s = 0
		let o = 0
		for (n = 0; n < t.length; n++) {
			const e = t[n]
			for (i = 0; i < e.length && s < this.X.length && e[i].length; i++) {
				this.X[s] = e[i]
				s++
			}
		}
		for (n = 0; n < e.length; n++) {
			const t = e[n]
			for (i = 0; i < t.length && o < this.F.length; i++) {
				this.F[o] = t[i]
				o++
			}
		}
		let u = 0
		if (o > 0 && this.F.length && this.F[0]) {
			u = this.F[0].length
		} else if (e.length && e[0] && e[0].length && e[0][0]) {
			u = e[0][0].length
		} else if (s > 0 && this.X.length && this.X[0]) {
			u = this.X[0].length
		} else if (t.length && t[0] && t[0].length && t[0][0]) {
			u = t[0][0].length
		}
		u ||= 128
		for (let t = s; t < this.X.length; t++) {
			const e = this.$.getParamName(t)
			if (e !== undefined) {
				this.X[t] = this.$.getParamArray(t, r[e], u)
				s++
			}
		}
		this.j.setCurrentTime(currentTime * 1000)
		this.j.prepareToProcess(sampleRate, u)
		this.j.process(this.X, s, this.F, o, u)
		return true
	}
}
registerProcessor(RNBO_PROCESSOR_NAME || 'RNBOProcessor', X)
