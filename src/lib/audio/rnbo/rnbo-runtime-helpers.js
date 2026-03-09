import {
	Float32Buffer,
	Float64Buffer,
	Float32MultiBuffer,
	Float64MultiBuffer,
	IntBuffer,
	UInt8Buffer,
	SampleBuffer
} from './rnbo-buffer-types.js'
import _126 from './rnbo-external-loader.js'
var ExternalLoaderFactory = _126.ExternalLoaderFactory
import Xoshiro from './xoshiro256-prng.js'
var patcherSerialKey = 'XX__PatcherSerialKey__XX'
var eventTargetKey = 'XX__EventTargetKey__XX'
var ParameterTypeNumber = 0
var ParameterTypeBang = 1
var ParameterTypeList = 2
var ParameterTypeSignal = 3
var ParameterTypeCount = 4
var IOTypeInput = 0
var IOTypeOutput = 1
var IOTypeUndefined = 2
var INVALID_INDEX = Number.MAX_SAFE_INTEGER
function globalrandom() {
	return Math.random()
}
function pi01() {
	return Math.PI
}
var rnbo_abs = Math.abs
var rnbo_fabs = Math.abs
var rnbo_acos = Math.acos
var rnbo_acosh = Math.acosh
var rnbo_asin = Math.asin
var rnbo_asinh = Math.asinh
var rnbo_atan = Math.atan
var rnbo_atan2 = Math.atan2
var rnbo_atanh = Math.atanh
var rnbo_cbrt = Math.cbrt
var rnbo_ceil = Math.ceil
var rnbo_cos = Math.cos
var rnbo_cosh = Math.cosh
var rnbo_exp = Math.exp
var rnbo_expm1 = Math.expm1
var rnbo_floor = Math.floor
var rnbo_fround = Math.round
var rnbo_imul = Math.imul
var rnbo_log = Math.log
var rnbo_log10 = Math.log10
var rnbo_log1p = Math.log1p
var rnbo_log2 = Math.log2
var rnbo_pow = Math.pow
var rnbo_round = rnbo_fround
var rnbo_sign = Math.sign
var rnbo_sin = Math.sin
var rnbo_sinh = Math.sinh
var rnbo_sqrt = Math.sqrt
var rnbo_tan = Math.tan
var rnbo_tanh = Math.tanh
var trunc = Math.trunc
var rnbo_trunc = Math.trunc
var rnbo_number_max = () => Math.MAX_VALUE
var rnbo_isnan = isNaN
function fixnan(t) {
	if (isNaN(t)) {
		return 0
	} else {
		return t
	}
}
function fract(t) {
	return t % 1
}
function fixdenorm(t) {
	return t
}
function isdenorm(t) {
	return false
}
var fastsin = Math.sin
var fastcos = Math.cos
var fastexp = Math.exp
var fastpow = Math.pow
var fasttan = Math.tan
function nextpoweroftwo(t) {
	if (t === 0) {
		return 1
	} else {
		t--
		t |= t >> 1
		t |= t >> 2
		t |= t >> 4
		t |= t >> 8
		return 1 + (t |= t >> 16)
	}
}
var MAX_32BIT_INT = Math.pow(2, 32)
function uint32_add(t, e) {
	var r = t + e
	if (r >= MAX_32BIT_INT) {
		r -= MAX_32BIT_INT
	}
	return Math.trunc(r)
}
function uint32_trunc(t) {
	return t >>> 0
}
function uint32_rshift(t, e) {
	return t >>> e
}
function imod(t, e) {
	return (t | 0) % (e | 0)
}
function imod_nocast(t, e) {
	return t % e
}
function getArrayValueAtIndex(t, e) {
	return t[e]
}
function allocateArray(t, e) {
	return new Array(t)
}
function createListCopy(t) {
	return t.slice(0)
}
function jsCreateListCopy(t) {
	return createListCopy(t)
}
function list() {
	let t = []
	for (let e = 0; e < arguments.length; e++) {
		let r = arguments[e]
		if (Array.isArray(r)) {
			for (let e = 0; e < r.length; e++) {
				t.push(r[e])
			}
		} else {
			t.push(r)
		}
	}
	return t
}
function resizeSignal(t, e, r) {
	var n = t || []
	for (var i = e; i < r; i++) {
		n[i] = 0
	}
	return n
}
function freeSignal(t) {
	return null
}
function zeroSignal(t, e) {
	if (t) {
		t.fill(0)
	}
}
function fillSignal(t, e, r, n) {
	if (t) {
		t.fill(r, n)
	}
}
function copySignal(t, e, r) {
	for (let n = 0; n < r; n++) {
		t[n] = e[n]
	}
}
function containsValue(t) {
	return t !== undefined
}
function addressOf(t) {
	return t
}
function systemticks() {
	return Date.now()
}
function bitwiseFloat(t) {
	var e = new Uint32Array(1)
	e[0] = t
	return new DataView(e.buffer).getFloat32(0, true)
}
function imul(t, e) {
	return Math.imul(t, e)
}
var MIDI_StatusByteReceived = 1
var MIDI_SecondByteReceived = 2
var MIDI_NoteOff = 3
var MIDI_NoteOn = 4
var MIDI_Aftertouch = 5
var MIDI_CC = 6
var MIDI_ProgramChange = 7
var MIDI_ChannelPressure = 8
var MIDI_PitchBend = 9
var MIDI_Sysex_Started = 10
var MIDI_Sysex_Complete = 11
var MIDI_Generic = 99
var MIDI_InvalidByte = -1
var MIDI_NoteOffMask = 128
var MIDI_NoteOnMask = 144
var MIDI_AfterTouchMask = 160
var MIDI_CCMask = 176
var MIDI_ProgramChangeMask = 192
var MIDI_ChannelPressureMask = 208
var MIDI_PitchBendMask = 224
var MIDI_QuarterFrame = 241
var MIDI_SongPos = 242
var MIDI_SongSel = 243
var MIDI_TuneRequest = 246
var MIDI_SysexStart = 240
var MIDI_SysexEnd = 247
var MIDI_Clock = 248
var MIDI_Start = 250
var MIDI_Continue = 251
var MIDI_Stop = 252
var MIDI_ActiveSense = 254
var MIDI_Reset = 255
var MIDI_CC_Sustain = 64
var MIDI_CC_Sostenuto = 66
var MIDI_CC_AllNotesOff = 123
var MIDI_CC_PressureMSB = 70
var MIDI_CC_PressureLSB = 102
var MIDI_CC_TimbreMSB = 74
var MIDI_CC_TimbreLSB = 106
var MIDI_NoteState_Off = 0
var MIDI_NoteState_On = 1
var MIDI_NoteState_Sustained = 2
var CLOCKS_PER_SEC = 1
function parseMidi(t, e, r) {
	if (e == 240) {
		return MIDI_Sysex_Started
	}
	if (t == MIDI_Sysex_Started) {
		if (e == 247) {
			return MIDI_Sysex_Complete
		} else if (e <= 127) {
			return t
		} else {
			return MIDI_InvalidByte
		}
	}
	if (e > 127) {
		return MIDI_StatusByteReceived
	}
	var n = r & 240
	if (t == MIDI_StatusByteReceived) {
		if (n == MIDI_ProgramChangeMask) {
			return MIDI_ProgramChange
		} else if (n == MIDI_ChannelPressureMask) {
			return MIDI_ChannelPressure
		} else {
			return MIDI_SecondByteReceived
		}
	} else if (t == MIDI_SecondByteReceived) {
		if (n == MIDI_NoteOffMask || (n == MIDI_NoteOnMask && e == 0)) {
			return MIDI_NoteOff
		} else if (n == MIDI_NoteOnMask) {
			return MIDI_NoteOn
		} else if (n == MIDI_AfterTouchMask) {
			return MIDI_Aftertouch
		} else if (n == MIDI_CCMask) {
			return MIDI_CC
		} else if (n == MIDI_PitchBendMask) {
			return MIDI_PitchBend
		} else {
			return MIDI_Generic
		}
	} else {
		return t
	}
}
function getMIDIChannel(t) {
	var e = t & 240
	if (e >= 128 && e <= 224) {
		return t & 15
	} else {
		return 0
	}
}
function initDataRef(t, e, r) {
	;(t = {}).name = e
	t.isValid = false
	t.wantsFillFlag = false
	t.bytesToAllocate = 0
	t.channels = 0
	t.sampleRate = 0
	t.internal = r
	t.index = -1
	t.wantsFill = function () {
		return this.wantsFillFlag
	}
	t.setWantsFill = function (t) {
		this.wantsFillFlag = t
	}
	t.requestSizeInBytes = function (t, e) {
		if (t > this.bytesToAllocate || e) {
			this.bytesToAllocate = t
		}
	}
	t.getRequestedSizeInBytes = function () {
		return this.bytesToAllocate
	}
	t.resetRequestedSizeInByte = function () {
		this.bytesToAllocate = 0
	}
	t.getSizeInBytes = function () {
		return this.arrayBuffer.byteLength
	}
	t.hasRequestedSize = function () {
		return this.bytesToAllocate > 0
	}
	t.isInternal = function () {
		return this.internal
	}
	t.getIndex = function () {
		return this.index
	}
	t.setIndex = function (t) {
		this.index = t
	}
	t.getCurrentIndex = function () {
		return 0
	}
	t.clear = function () {
		t.arrayBuffer = new ArrayBuffer(0)
	}
	t.clear()
	return t
}
function initMultiRef() {
	var t = {
		index: 0,
		current: 0,
		dataRefs: [],
		count: 0
	}
	for (let e = 0; e < arguments.length; e++) {
		t.dataRefs.push(arguments[e])
		t.count++
	}
	t.setCurrent = function (t) {
		if (t >= 0 && t < this.count) {
			this.current = t
		}
	}
	t.getCurrentIndex = function () {
		return this.current
	}
	t.getIndex = function () {
		return this.index
	}
	t.setIndex = function (t) {
		this.index = t
	}
	return t
}
function updateMultiRef(t, e, r) {
	if (e.setCurrent && e.getIndex) {
		e.setCurrent(r)
		t.getEngine().sendDataRefUpdated(e.getIndex())
	}
}
function updateDataRef(t, e) {
	t.getEngine().sendDataRefUpdated(e.getIndex())
}
function reInitDataView(t, e) {
	return new t.reinitConstructor(e)
}
function FIXEDSIZEARRAYINIT() {
	let t = arguments[0]
	if (t !== undefined) {
		let e = new Array(t)
		e.fill(0)
		if (arguments[1] !== undefined) {
			let r = Array.from(arguments)
			r.splice(0, 1)
			for (let n = 0; n < t; n++) {
				e[n] = FIXEDSIZEARRAYINIT.apply(null, r)
			}
		}
		return e
	}
	return new Array()
}
function TAG(t) {
	let e = 0
	for (let r = 0; r < t.length; r++) {
		e = t.charCodeAt(r) + (e << 6) + (e << 16) - e
	}
	return e | 0
}
function serializeArrayToList(t, e) {
	return t
}
function deserializeArrayFromList(t, e, r) {}
function serializeDataRef(t) {
	t.resetRequestedSizeInByte()
	return t
}
function serializeBuffer(t) {
	return {
		data: t.arrayBuffer.slice(0),
		channels: t.channels,
		sampleRate: t.sampleRate
	}
}
function deserializeBuffer(t, e, r) {
	e.arrayBuffer = r.data.slice(0)
	t.getEngine().sendDataRefUpdated(e.getIndex())
}
function RNBO_ASSERT() {}
function _evalSrc(src) {
	var rnboObj
	eval(src)
	return rnboObj
}
function getSubState(t, e) {
	if (t[e] === undefined) {
		t[e] = {}
	}
	return t[e]
}
function getSubStateAt(t, e, r) {
	if (t[e] === undefined) {
		t[e] = []
	}
	if (t[e][r] === undefined) {
		t[e][r] = {}
	}
	return t[e][r]
}
function stateIsEmpty(t) {
	return Object.keys(t).length === 0
}
function TransportState(t) {
	return t
}
function listWithSize(t) {
	return new Array(t)
}
let intlistWithSize = listWithSize
let indexlistWithSize = listWithSize
function RNBO_UNUSED() {}
function ENGINE() {}
function EXTERNALENGINE() {}
function INTERNALENGINE() {}
let xoshiro_reset = Xoshiro.reset
let xoshiro_next = Xoshiro.next
export default {
	deserializeSrc: function (t) {
		return _evalSrc(t)
	},
	deserializeJSON: function (t) {
		var e = t
		if (typeof e == 'string') {
			e = {
				src: t
			}
		}
		return _evalSrc(e.src)
	},
	extractOptionsFromJSON: function (t) {
		var e = t
		if (typeof e == 'string') {
			e = JSON.parse(t)
		}
		if (e.options) {
			return e.options
		} else {
			return {}
		}
	},
	evalFunction(functionAsString) {
		var tmpFunction
		var functionAsString = 'tmpFunction = ' + functionAsString
		eval(functionAsString)
		return tmpFunction
	},
	nextpoweroftwo,
	ParameterTypeNumber,
	ParameterTypeBang,
	ParameterTypeList,
	ParameterTypeSignal,
	ParameterTypeCount,
	IOTypeInput,
	IOTypeOutput,
	IOTypeUndefined: IOTypeUndefined.length,
	TAG
}
