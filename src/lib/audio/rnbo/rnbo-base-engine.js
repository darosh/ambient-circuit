import * as n from './tslib-awaiter.js'
import * as i from './rnbo-enums.js'
import * as s from './rnbo-platform.js'
import a from './rnbo-runtime-helpers.js'
export class v {
	constructor() {
		this.I = 0
		this.M = 44100
		this.A = 64
		this.outgoingEvent = new s.BM()
		this.parameterChangeEvent = new s.BM()
		this.T = this.sampsToMs(this.A)
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
						const a = v.deserializeConversion(s)
						if (s.isPolyphonic) {
							e[i] = [a]
						} else {
							e[i] = a
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
		return this.M
	}
	getSamplesPerBlock() {
		return this.A
	}
	sampsToMs(t) {
		return (t / this.M) * 1000
	}
	getNumInputChannels() {
		if (this.B) {
			return this.B.numInputChannels
		} else {
			return 0
		}
	}
	getNumOutputChannels() {
		if (this.B) {
			return this.B.numOutputChannels
		} else {
			return 0
		}
	}
	getNumMIDIInputPorts() {
		if (this.B) {
			return this.B.numMidiInputPorts
		} else {
			return 0
		}
	}
	getNumMIDIOutputPorts() {
		if (this.B) {
			return this.B.numMidiOutputPorts
		} else {
			return 0
		}
	}
	getNumParameters() {
		if (this.B) {
			return this.B.numParameters
		} else {
			return 0
		}
	}
	getNumSignalInParameters() {
		if (this.B) {
			return this.B.numSignalInParameters
		} else {
			return 0
		}
	}
	getNumSignalOutParameters() {
		if (this.B) {
			return this.B.numSignalOutParameters
		} else {
			return 0
		}
	}
	getPatcherSerial() {
		if (this.B !== undefined) {
			return this.B.patcherSerial
		} else {
			return 0
		}
	}
	getParameterName(t) {
		if (!this.B || t >= this.B.parameters.length) {
			throw new Error(`Parameter index ${t} out of bounds.`)
		}
		return this.B.parameters[t].name
	}
	getParameterId(t) {
		if (!this.B || t >= this.B.parameters.length) {
			throw new Error(`Parameter index ${t} out of bounds.`)
		}
		return this.B.parameters[t].paramId
	}
	getParameterToNormalizedFunction(t) {
		return (e) => this.P.convertToNormalizedParameterValue(t, e)
	}
	getParameterFromNormalizedFunction(t) {
		return (e) => this.P.convertFromNormalizedParameterValue(t, e)
	}
	constrainParameterValue(t) {
		return (e) => this.P.constrainParameterValue(t, e)
	}
	getParameterInfo(t) {
		if (!this.B || t >= this.B.parameters.length) {
			throw new Error(`Parameter index ${t} out of bounds.`)
		}
		const e = this.B.parameters[t]
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
		if (this.B !== undefined) {
			return this.B.externalDataRefs.length
		} else {
			return 0
		}
	}
	getExternalDataId(t) {
		if (this.B !== undefined) {
			return this.B.externalDataRefs[t].id
		} else {
			return ''
		}
	}
	getExternalDataRefIds() {
		let t
		if (this.B) {
			t = []
			Object.keys(this.B.externalDataRefs).forEach((e) => {
				let r = this.B.externalDataRefs[e]
				t.push(r.id)
			})
		}
		return t
	}
	getExternalDataRefInfos() {
		if (this.B !== undefined) {
			return this.B.externalDataRefs
		} else {
			return []
		}
	}
	getNumMessages() {
		if (this.B !== undefined) {
			return this.B.inports.length + this.B.outports.length
		} else {
			return 0
		}
	}
	getMessageInfos() {
		let t = []
		if (this.B !== undefined) {
			Object.keys(this.B.outports).forEach((e) => {
				t.push({
					tag: this.B.outports[e].tag,
					type: i.s.Outport,
					meta: this.B.outports[e].meta
				})
			})
			Object.keys(this.B.inports).forEach((e) => {
				t.push({
					tag: this.B.inports[e].tag,
					type: i.s.Inport,
					meta: this.B.inports[e].meta
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
		return (0, n.mG)(this, undefined, undefined, function* () {
			this.B = t
			this.P = v.deserializeConversion(this.B.paramConversion)
		})
	}
}
