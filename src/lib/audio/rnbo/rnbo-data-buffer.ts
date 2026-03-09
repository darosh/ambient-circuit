enum DataDescType {
	Float32Audio = 0,
	TypedArray = 1
}

export class nc {
	type = DataDescType.TypedArray
	serialize() {
		return {
			type: this.type
		}
	}
}

export class Le {
	channels = 0
	sampleRate = 0
	type = DataDescType.Float32Audio

	constructor(t: number, e: number) {
		this.channels = t
		this.sampleRate = e
	}
	static fromAudioBuffer(t: AudioBuffer): Le {
		return new Le(t.numberOfChannels, t.sampleRate)
	}
	get isInterleaved(): boolean {
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

export class OM {
	buffer: ArrayBuffer
	_: Le | nc

	constructor(t: ArrayBuffer, e: Le | nc) {
		this.buffer = t
		this._ = e
	}
	getAsAudioBuffer(t: BaseAudioContext): AudioBuffer {
		if (this._ instanceof Le && this._.channels > 0) {
			const e = new Float32Array(this.buffer)
			const r = e.length / this._.channels
			const n = t.createBuffer(this._.channels, r, this._.sampleRate)
			for (let t = 0; t < this._.channels; t++) {
				const r = n.getChannelData(t)
				for (let i = 0, s = r.length; i < s; i++) {
					r[i] = e[i * n.numberOfChannels + t]
				}
			}
			return n
		}
		const e = new Float32Array(this.buffer)
		const r = t.createBuffer(1, e.length, t.sampleRate)
		r.copyToChannel(e, 0)
		return r
	}
}

export const n_ = (t: { type: number; channels?: number; sampleRate?: number }): Le | nc => {
	switch (t.type) {
		case DataDescType.Float32Audio:
			return new Le(t.channels!, t.sampleRate!)
		case DataDescType.TypedArray:
			return new nc()
		default:
			throw new Error(`Unable to deserialize RNBODataDesc of type ${t.type}`)
	}
}
