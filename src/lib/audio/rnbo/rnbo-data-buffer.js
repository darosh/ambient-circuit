var n
;(function (t) {
	t[(t.Float32Audio = 0)] = 'Float32Audio'
	t[(t.TypedArray = 1)] = 'TypedArray'
})((n ||= {}))
export class nc {
	constructor() {
		this.type = n.TypedArray
	}
	serialize() {
		return {
			type: this.type
		}
	}
}
export class Le {
	constructor(t, e) {
		this.channels = 0
		this.sampleRate = 0
		this.type = n.Float32Audio
		this.channels = t
		this.sampleRate = e
	}
	static fromAudioBuffer(t) {
		return new Le(t.numberOfChannels, t.sampleRate)
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
export class OM {
	constructor(t, e) {
		this.buffer = t
		this._ = e
	}
	getAsAudioBuffer(t) {
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
export const n_ = (t) => {
	switch (t.type) {
		case n.Float32Audio:
			return new Le(t.channels, t.sampleRate)
		case n.TypedArray:
			return new nc()
		default:
			throw new Error(`Unable to deserialize RNBODataDesc of type ${t.type}`)
	}
}
