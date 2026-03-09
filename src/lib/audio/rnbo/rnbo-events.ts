export enum EventType {
	BufferTransfer = 0,
	ClockEvent = 1,
	DataRefEvent = 2,
	MessageEvent = 3,
	MIDIEvent = 4,
	ParameterEvent = 5,
	ParameterBangEvent = 6,
	PresetEvent = 7,
	StartupEvent = 8,
	TransportEvent = 9,
	TempoEvent = 10,
	BeatTimeEvent = 11,
	TimeSignatureEvent = 12
}
// Minified alias
export { EventType as m5 }

export enum DataRefAction {
	Update = 1
}
export { DataRefAction as VH }

export enum PresetEventAction {
	Set = 1,
	Touched = 2
}
export { PresetEventAction as l0 }

export enum StartupPhase {
	BEGIN = 0,
	END = 1
}
export { StartupPhase as gA }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class j4 {
	invalid = false
	time: number
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	eventTarget: any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	source?: any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type?: any

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(t: number = 0, e?: any) {
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

export class J9 extends j4 {
	type = EventType.ClockEvent
	clockIndex: number
	value: number | undefined

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(t: number, e: number, r: number | undefined, i?: any) {
		super(t, i)
		this.clockIndex = e
		this.value = r
	}
	get hasValue(): boolean {
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

export class Lk extends j4 {
	type = EventType.DataRefEvent
	dataRefIndex: number
	action: DataRefAction

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(t: number, e: number, r: DataRefAction, i?: any) {
		super(t, i)
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

export class f3 extends j4 {
	type = EventType.MessageEvent
	objectId: string
	tag: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload: any

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(t: number, e: string, r: any, i: string = '', s?: any) {
		super(t, s)
		this.objectId = i
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

export class Ym extends j4 {
	type = EventType.MIDIEvent
	data: number[]
	length: number
	status: number
	channel: number
	port: number

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(t: number, e: number, r: any[], i?: any) {
		super(t, i)
		if (r.length > 3) {
			throw new Error(`MIDIData can only contain a maximum of 3 bytes. Received ${r.length}`)
		}
		this.data = r
		if (this.data.length < 3) {
			const t = r.length
			this.data.length = 3
			this.data = this.data.fill(undefined as unknown as number, t, 3)
		}
		let s = 0
		for (let t = 0; t < 3; t++) {
			if (r[t] !== undefined) {
				s++
			}
		}
		if (s < 1) {
			throw new Error('MIDIData must at least have the first byte set.')
		}
		this.length = s
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

export class DB extends j4 {
	type = EventType.ParameterEvent
	target: number
	value: number
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	override source: any

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(t: number, e: number, r: number, i?: any, s?: any) {
		super(t, s)
		this.target = e
		this.value = r
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

export class zz extends j4 {
	type = EventType.ParameterBangEvent
	target: number

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(t: number, e: number, r?: any) {
		super(t, r)
		this.target = e
	}
	serialize() {
		return Object.assign(super.serialize(), {
			target: this.target,
			type: this.type
		})
	}
}

export class bt extends j4 {
	type = EventType.PresetEvent
	action: PresetEventAction
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	preset: any

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(t: number, e: PresetEventAction, r?: any) {
		super(t, undefined)
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

export class cr extends j4 {
	type = EventType.TransportEvent
	state: number

	constructor(t: number, e: number) {
		super(t, undefined)
		this.state = e
	}
	serialize() {
		return Object.assign(super.serialize(), {
			state: this.state,
			type: this.type
		})
	}
}

export class gs extends j4 {
	type = EventType.TempoEvent
	tempo: number

	constructor(t: number, e: number) {
		super(t, undefined)
		this.tempo = e
	}
	serialize() {
		return Object.assign(super.serialize(), {
			tempo: this.tempo,
			type: this.type
		})
	}
}

export class J0 extends j4 {
	type = EventType.BeatTimeEvent
	beattime: number

	constructor(t: number, e: number) {
		super(t, undefined)
		this.beattime = e
	}
	serialize() {
		return Object.assign(super.serialize(), {
			beattime: this.beattime,
			type: this.type
		})
	}
}

export class QU extends j4 {
	type = EventType.TimeSignatureEvent
	numerator: number
	denominator: number

	constructor(t: number, e: number, r: number) {
		super(t, undefined)
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

export class j6 extends j4 {
	type = EventType.StartupEvent
	phase: StartupPhase

	constructor(t: number, e: StartupPhase) {
		super(t, undefined)
		this.phase = e
	}
	serialize() {
		return Object.assign(super.serialize(), {
			phase: this.phase,
			type: this.type
		})
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const f4 = (t: any): j4 => {
	switch (t.type) {
		case EventType.ClockEvent:
			return new J9(t.time, t.clockIndex, t.value, t.eventTarget)
		case EventType.DataRefEvent:
			return new Lk(t.time, t.dataRefIndex, t.action, t.eventTarget)
		case EventType.MessageEvent:
			return new f3(t.time, t.tag, t.payload, t.objectId, t.eventTarget)
		case EventType.MIDIEvent:
			return new Ym(t.time, t.port, t.data, t.eventTarget)
		case EventType.ParameterEvent:
			return new DB(t.time, t.target, t.value, t.source, t.eventTarget)
		case EventType.ParameterBangEvent:
			return new zz(t.time, t.target, t.eventTarget)
		case EventType.PresetEvent:
			return new bt(t.time, t.action, t.preset)
		case EventType.TransportEvent:
			return new cr(t.time, t.state)
		case EventType.TempoEvent:
			return new gs(t.time, t.tempo)
		case EventType.BeatTimeEvent:
			return new J0(t.time, t.beattime)
		case EventType.TimeSignatureEvent:
			return new QU(t.time, t.numerator, t.denominator)
		case EventType.StartupEvent:
			return new j6(t.time, t.phase)
		default:
			throw new Error(`Unable to deserialize RNBOEvent of type ${t.type}`)
	}
}
