(() => {
  var __webpack_modules__ = {
    133: (module, __unused_webpack_exports, __webpack_require__) => {
      var Float32Buffer = __webpack_require__(852).Float32Buffer;
      var Float64Buffer = __webpack_require__(852).Float64Buffer;
      var Float32MultiBuffer = __webpack_require__(852).Float32MultiBuffer;
      var Float64MultiBuffer = __webpack_require__(852).Float64MultiBuffer;
      var IntBuffer = __webpack_require__(852).IntBuffer;
      var UInt8Buffer = __webpack_require__(852).UInt8Buffer;
      var SampleBuffer = __webpack_require__(852).SampleBuffer;
      var ExternalLoaderFactory = __webpack_require__(126).ExternalLoaderFactory;
      let Xoshiro = __webpack_require__(925);
      var patcherSerialKey = "XX__PatcherSerialKey__XX";
      var eventTargetKey = "XX__EventTargetKey__XX";
      var ParameterTypeNumber = 0;
      var ParameterTypeBang = 1;
      var ParameterTypeList = 2;
      var ParameterTypeSignal = 3;
      var ParameterTypeCount = 4;
      var IOTypeInput = 0;
      var IOTypeOutput = 1;
      var IOTypeUndefined = 2;
      var INVALID_INDEX = Number.MAX_SAFE_INTEGER;
      function globalrandom() {
        return Math.random();
      }
      function pi01() {
        return Math.PI;
      }
      var rnbo_abs = Math.abs;
      var rnbo_fabs = Math.abs;
      var rnbo_acos = Math.acos;
      var rnbo_acosh = Math.acosh;
      var rnbo_asin = Math.asin;
      var rnbo_asinh = Math.asinh;
      var rnbo_atan = Math.atan;
      var rnbo_atan2 = Math.atan2;
      var rnbo_atanh = Math.atanh;
      var rnbo_cbrt = Math.cbrt;
      var rnbo_ceil = Math.ceil;
      var rnbo_cos = Math.cos;
      var rnbo_cosh = Math.cosh;
      var rnbo_exp = Math.exp;
      var rnbo_expm1 = Math.expm1;
      var rnbo_floor = Math.floor;
      var rnbo_fround = Math.round;
      var rnbo_imul = Math.imul;
      var rnbo_log = Math.log;
      var rnbo_log10 = Math.log10;
      var rnbo_log1p = Math.log1p;
      var rnbo_log2 = Math.log2;
      var rnbo_pow = Math.pow;
      var rnbo_round = rnbo_fround;
      var rnbo_sign = Math.sign;
      var rnbo_sin = Math.sin;
      var rnbo_sinh = Math.sinh;
      var rnbo_sqrt = Math.sqrt;
      var rnbo_tan = Math.tan;
      var rnbo_tanh = Math.tanh;
      var trunc = Math.trunc;
      var rnbo_trunc = Math.trunc;
      var rnbo_number_max = () => Math.MAX_VALUE;
      var rnbo_isnan = isNaN;
      function fixnan(t) {
        if (isNaN(t)) {
          return 0;
        } else {
          return t;
        }
      }
      function fract(t) {
        return t % 1;
      }
      function fixdenorm(t) {
        return t;
      }
      function isdenorm(t) {
        return false;
      }
      var fastsin = Math.sin;
      var fastcos = Math.cos;
      var fastexp = Math.exp;
      var fastpow = Math.pow;
      var fasttan = Math.tan;
      function nextpoweroftwo(t) {
        if (t === 0) {
          return 1;
        } else {
          t--;
          t |= t >> 1;
          t |= t >> 2;
          t |= t >> 4;
          t |= t >> 8;
          return (t |= t >> 16) + 1;
        }
      }
      var MAX_32BIT_INT = Math.pow(2, 32);
      function uint32_add(t, e) {
        var n = t + e;
        if (n >= MAX_32BIT_INT) {
          n -= MAX_32BIT_INT;
        }
        return Math.trunc(n);
      }
      function uint32_trunc(t) {
        return t >>> 0;
      }
      function uint32_rshift(t, e) {
        return t >>> e;
      }
      function imod(t, e) {
        return (t | 0) % (e | 0);
      }
      function imod_nocast(t, e) {
        return t % e;
      }
      function getArrayValueAtIndex(t, e) {
        return t[e];
      }
      function allocateArray(t, e) {
        return new Array(t);
      }
      function createListCopy(t) {
        return t.slice(0);
      }
      function jsCreateListCopy(t) {
        return createListCopy(t);
      }
      function list() {
        let t = [];
        for (let e = 0; e < arguments.length; e++) {
          let n = arguments[e];
          if (Array.isArray(n)) {
            for (let e = 0; e < n.length; e++) {
              t.push(n[e]);
            }
          } else {
            t.push(n);
          }
        }
        return t;
      }
      function resizeSignal(t, e, n) {
        var r = t || [];
        for (var i = e; i < n; i++) {
          r[i] = 0;
        }
        return r;
      }
      function freeSignal(t) {
        return null;
      }
      function zeroSignal(t, e) {
        if (t) {
          t.fill(0);
        }
      }
      function fillSignal(t, e, n, r) {
        if (t) {
          t.fill(n, r);
        }
      }
      function copySignal(t, e, n) {
        for (let r = 0; r < n; r++) {
          t[r] = e[r];
        }
      }
      function containsValue(t) {
        return t !== undefined;
      }
      function addressOf(t) {
        return t;
      }
      function systemticks() {
        return Date.now();
      }
      function bitwiseFloat(t) {
        var e = new Uint32Array(1);
        e[0] = t;
        return new DataView(e.buffer).getFloat32(0, true);
      }
      function imul(t, e) {
        return Math.imul(t, e);
      }
      var MIDI_StatusByteReceived = 1;
      var MIDI_SecondByteReceived = 2;
      var MIDI_NoteOff = 3;
      var MIDI_NoteOn = 4;
      var MIDI_Aftertouch = 5;
      var MIDI_CC = 6;
      var MIDI_ProgramChange = 7;
      var MIDI_ChannelPressure = 8;
      var MIDI_PitchBend = 9;
      var MIDI_Sysex_Started = 10;
      var MIDI_Sysex_Complete = 11;
      var MIDI_Generic = 99;
      var MIDI_InvalidByte = -1;
      var MIDI_NoteOffMask = 128;
      var MIDI_NoteOnMask = 144;
      var MIDI_AfterTouchMask = 160;
      var MIDI_CCMask = 176;
      var MIDI_ProgramChangeMask = 192;
      var MIDI_ChannelPressureMask = 208;
      var MIDI_PitchBendMask = 224;
      var MIDI_QuarterFrame = 241;
      var MIDI_SongPos = 242;
      var MIDI_SongSel = 243;
      var MIDI_TuneRequest = 246;
      var MIDI_SysexStart = 240;
      var MIDI_SysexEnd = 247;
      var MIDI_Clock = 248;
      var MIDI_Start = 250;
      var MIDI_Continue = 251;
      var MIDI_Stop = 252;
      var MIDI_ActiveSense = 254;
      var MIDI_Reset = 255;
      var MIDI_CC_Sustain = 64;
      var MIDI_CC_Sostenuto = 66;
      var MIDI_CC_AllNotesOff = 123;
      var MIDI_CC_PressureMSB = 70;
      var MIDI_CC_PressureLSB = 102;
      var MIDI_CC_TimbreMSB = 74;
      var MIDI_CC_TimbreLSB = 106;
      var MIDI_NoteState_Off = 0;
      var MIDI_NoteState_On = 1;
      var MIDI_NoteState_Sustained = 2;
      var CLOCKS_PER_SEC = 1;
      function parseMidi(t, e, n) {
        if (e == 240) {
          return MIDI_Sysex_Started;
        }
        if (t == MIDI_Sysex_Started) {
          if (e == 247) {
            return MIDI_Sysex_Complete;
          } else if (e <= 127) {
            return t;
          } else {
            return MIDI_InvalidByte;
          }
        }
        if (e > 127) {
          return MIDI_StatusByteReceived;
        }
        var r = n & 240;
        if (t == MIDI_StatusByteReceived) {
          if (r == MIDI_ProgramChangeMask) {
            return MIDI_ProgramChange;
          } else if (r == MIDI_ChannelPressureMask) {
            return MIDI_ChannelPressure;
          } else {
            return MIDI_SecondByteReceived;
          }
        } else if (t == MIDI_SecondByteReceived) {
          if (r == MIDI_NoteOffMask || r == MIDI_NoteOnMask && e == 0) {
            return MIDI_NoteOff;
          } else if (r == MIDI_NoteOnMask) {
            return MIDI_NoteOn;
          } else if (r == MIDI_AfterTouchMask) {
            return MIDI_Aftertouch;
          } else if (r == MIDI_CCMask) {
            return MIDI_CC;
          } else if (r == MIDI_PitchBendMask) {
            return MIDI_PitchBend;
          } else {
            return MIDI_Generic;
          }
        } else {
          return t;
        }
      }
      function getMIDIChannel(t) {
        var e = t & 240;
        if (e >= 128 && e <= 224) {
          return t & 15;
        } else {
          return 0;
        }
      }
      function initDataRef(t, e, n) {
        (t = {}).name = e;
        t.isValid = false;
        t.wantsFillFlag = false;
        t.bytesToAllocate = 0;
        t.channels = 0;
        t.sampleRate = 0;
        t.internal = n;
        t.index = -1;
        t.wantsFill = function () {
          return this.wantsFillFlag;
        };
        t.setWantsFill = function (t) {
          this.wantsFillFlag = t;
        };
        t.requestSizeInBytes = function (t, e) {
          if (t > this.bytesToAllocate || e) {
            this.bytesToAllocate = t;
          }
        };
        t.getRequestedSizeInBytes = function () {
          return this.bytesToAllocate;
        };
        t.resetRequestedSizeInByte = function () {
          this.bytesToAllocate = 0;
        };
        t.getSizeInBytes = function () {
          return this.arrayBuffer.byteLength;
        };
        t.hasRequestedSize = function () {
          return this.bytesToAllocate > 0;
        };
        t.isInternal = function () {
          return this.internal;
        };
        t.getIndex = function () {
          return this.index;
        };
        t.setIndex = function (t) {
          this.index = t;
        };
        t.getCurrentIndex = function () {
          return 0;
        };
        t.clear = function () {
          t.arrayBuffer = new ArrayBuffer(0);
        };
        t.clear();
        return t;
      }
      function initMultiRef() {
        var t = {
          index: 0,
          current: 0,
          dataRefs: [],
          count: 0
        };
        for (let e = 0; e < arguments.length; e++) {
          t.dataRefs.push(arguments[e]);
          t.count++;
        }
        t.setCurrent = function (t) {
          if (t >= 0 && t < this.count) {
            this.current = t;
          }
        };
        t.getCurrentIndex = function () {
          return this.current;
        };
        t.getIndex = function () {
          return this.index;
        };
        t.setIndex = function (t) {
          this.index = t;
        };
        return t;
      }
      function updateMultiRef(t, e, n) {
        if (e.setCurrent && e.getIndex) {
          e.setCurrent(n);
          t.getEngine().sendDataRefUpdated(e.getIndex());
        }
      }
      function updateDataRef(t, e) {
        t.getEngine().sendDataRefUpdated(e.getIndex());
      }
      function reInitDataView(t, e) {
        return new t.reinitConstructor(e);
      }
      function FIXEDSIZEARRAYINIT() {
        let t = arguments[0];
        if (t !== undefined) {
          let e = new Array(t);
          e.fill(0);
          if (arguments[1] !== undefined) {
            let n = Array.from(arguments);
            n.splice(0, 1);
            for (let r = 0; r < t; r++) {
              e[r] = FIXEDSIZEARRAYINIT.apply(null, n);
            }
          }
          return e;
        }
        return new Array();
      }
      function TAG(t) {
        let e = 0;
        for (let n = 0; n < t.length; n++) {
          e = t.charCodeAt(n) + (e << 6) + (e << 16) - e;
        }
        return e | 0;
      }
      function serializeArrayToList(t, e) {
        return t;
      }
      function deserializeArrayFromList(t, e, n) {
        t;
      }
      function serializeDataRef(t) {
        t.resetRequestedSizeInByte();
        return t;
      }
      function serializeBuffer(t) {
        return {
          data: t.arrayBuffer.slice(0),
          channels: t.channels,
          sampleRate: t.sampleRate
        };
      }
      function deserializeBuffer(t, e, n) {
        e.arrayBuffer = n.data.slice(0);
        t.getEngine().sendDataRefUpdated(e.getIndex());
      }
      function RNBO_ASSERT() {}
      function _evalSrc(src) {
        var rnboObj;
        eval(src);
        return rnboObj;
      }
      function getSubState(t, e) {
        if (t[e] === undefined) {
          t[e] = {};
        }
        return t[e];
      }
      function getSubStateAt(t, e, n) {
        if (t[e] === undefined) {
          t[e] = [];
        }
        if (t[e][n] === undefined) {
          t[e][n] = {};
        }
        return t[e][n];
      }
      function stateIsEmpty(t) {
        return Object.keys(t).length === 0;
      }
      function TransportState(t) {
        return t;
      }
      function listWithSize(t) {
        return new Array(t);
      }
      let intlistWithSize = listWithSize;
      let indexlistWithSize = listWithSize;
      function RNBO_UNUSED() {}
      function ENGINE() {}
      function EXTERNALENGINE() {}
      function INTERNALENGINE() {}
      let xoshiro_reset = Xoshiro.reset;
      let xoshiro_next = Xoshiro.next;
      module.exports = {
        deserializeSrc: function (t) {
          return _evalSrc(t);
        },
        deserializeJSON: function (t) {
          var e = t;
          if (typeof e == "string") {
            e = {
              src: t
            };
          }
          return _evalSrc(e.src);
        },
        extractOptionsFromJSON: function (t) {
          var e = t;
          if (typeof e == "string") {
            e = JSON.parse(t);
          }
          if (e.options) {
            return e.options;
          } else {
            return {};
          }
        },
        evalFunction(functionAsString) {
          var tmpFunction;
          var functionAsString = "tmpFunction = " + functionAsString;
          eval(functionAsString);
          return tmpFunction;
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
      };
    },
    852: t => {
      function e() {
        let t = this.dataRef.getSizeInBytes() / this.BASEARRAYVIEW.BYTES_PER_ELEMENT;
        let e = this.getChannels();
        if (e) {
          return t / e;
        } else {
          return 0;
        }
      }
      function n(t, e) {
        let n = t * this.BASEARRAYVIEW.BYTES_PER_ELEMENT * e;
        this.requestedChannels = e;
        this.dataRef.requestSizeInBytes(n, false);
      }
      function r(t, e) {
        return this[this.getChannels() * Math.floor(e) + t];
      }
      function i(t, e) {
        const n = this.getChannels();
        if (t < 0 || t >= n || e < 0 || e >= this.getSize()) {
          return 0;
        } else {
          return this[n * Math.floor(e) + t];
        }
      }
      function s(t, e, n) {
        this[this.getChannels() * Math.floor(e) + t] = n;
      }
      function a(t, e, n) {
        const r = this.getChannels();
        if (!(t < 0) && !(t >= r) && !(e < 0) && !(e >= this.getSize())) {
          this[r * Math.floor(e) + t] = n;
        }
      }
      function o() {
        return this.dataRef.channels;
      }
      function u() {
        return this.dataRef.sampleRate;
      }
      function h(t) {
        this.dataRef.sampleRate = t;
      }
      function c() {
        this.dataRef.clear();
      }
      function f(t) {
        if (t !== this.dataRef.channels) {
          let e = this.getSize();
          this.clear();
          this.dataRef.channels = t;
          return this.setSize(e);
        }
        return this;
      }
      function _() {
        if (this.isAudioBuffer && this.requestedChannels !== this.getChannels() && this.requestedChannels !== 0) {
          if (this.getChannels() > 0) {
            this.setZero();
          }
          this.dataRef.channels = this.requestedChannels;
          this.requestedChannels = 0;
        }
        if (this.dataRef.bytesToAllocate > 0 && (this.dataRef.bytesToAllocate !== this.dataRef.getSizeInBytes() || !this.dataRef.isInternallyAllocated)) {
          let t;
          if (this.dataRef.isInternallyAllocated) {
            let e = Math.min(this.dataRef.arrayBuffer.byteLength, this.dataRef.bytesToAllocate);
            e /= this.BASEARRAYVIEW.BYTES_PER_ELEMENT;
            t = new this.BASEARRAYVIEW(this.dataRef.arrayBuffer, 0, e);
          }
          this.dataRef.arrayBuffer = new ArrayBuffer(this.dataRef.bytesToAllocate);
          this.dataRef.isInternallyAllocated = true;
          let e = new this.BASEARRAYVIEW(this.dataRef.arrayBuffer);
          if (t) {
            e.set(t);
          } else {
            this.dataRef.wantsFillFlag = true;
          }
          m(e, this.dataRef, this.BASEARRAYVIEW);
          if (this.isAudioBuffer) {
            v(e);
          }
          e.reinitConstructor = this.reinitConstructor;
          return e;
        }
        return this;
      }
      function l(t) {
        let e = this.getChannels();
        this.requestedChannels = e;
        this.dataRef.requestSizeInBytes(t * this.BASEARRAYVIEW.BYTES_PER_ELEMENT * e, true);
        return this.allocateIfNeeded();
      }
      function I() {
        if (this.fill) {
          this.fill(0);
        }
      }
      function M() {
        return this.touched;
      }
      function b(t) {
        this.touched = t;
      }
      function p(t) {
        this.dataRef.setWantsFill(t);
      }
      function d() {
        return this.dataRef.getIndex();
      }
      function y() {
        return 0;
      }
      function m(t, r, i) {
        t.dataRef = r;
        t.BASEARRAYVIEW = i;
        t.getSize = e;
        t.requestSize = n;
        t.setSize = l;
        t.allocateIfNeeded = _;
        t.setZero = I;
        t.clear = c;
        t.getChannels = o;
        t.getSampleRate = u;
        t.setWantsFill = p;
        t.getIndex = d;
        r.setZero = function () {
          t.setZero();
        };
        t.touched = false;
        t.getTouched = M;
        t.setTouched = b;
      }
      function v(t) {
        t.getSample = r;
        t.getSampleSafe = i;
        t.setSample = s;
        t.setSampleSafe = a;
        t.setChannels = f;
        t.setSampleRate = h;
        t.isAudioBuffer = true;
        t.requestedChannels = 0;
        t.getCurrentIndex = y;
      }
      let S = function (t, e) {
        let n;
        n = t.arrayBuffer ? new e(t.arrayBuffer) : {};
        m(n, t, e);
        n.reinitConstructor = this.constructor;
        return n;
      };
      (S.prototype = Object.create(null)).constructor = S;
      let D = function (t, e) {
        let n = S.call(this, t, e);
        v(n);
        return n;
      };
      (D.prototype = Object.create(S)).constructor = D;
      let w = function (t) {
        return D.call(this, t, Float32Array);
      };
      (w.prototype = Object.create(D.prototype)).constructor = w;
      let A = function (t) {
        return D.call(this, t, Float64Array);
      };
      (A.prototype = Object.create(D.prototype)).constructor = A;
      let g = function (t, e) {
        let n = new e(t.dataRefs[t.current]);
        n.multiRef = t;
        n.setCurrent = function (t) {
          this.multiRef.setCurrent(Math.round(t));
        };
        n.getIndex = function () {
          return this.multiRef.getIndex();
        };
        n.getCurrentIndex = function () {
          return this.multiRef.getCurrentIndex();
        };
        n.reinitConstructor = this.constructor;
        return n;
      };
      g.prototype = Object.create(null);
      g.constructor = g;
      let E = function (t) {
        return g.call(this, t, w);
      };
      (E.prototype = Object.create(g.prototype)).constructor = E;
      let O = function (t) {
        return g.call(this, t, A);
      };
      (O.prototype = Object.create(g.prototype)).constructor = O;
      let P = function (t) {
        return S.call(this, t, Int32Array);
      };
      (P.prototype = Object.create(S.prototype)).constructor = P;
      let T = function (t) {
        return S.call(this, t, Uint8Array);
      };
      (T.prototype = Object.create(S.prototype)).constructor = T;
      t.exports = {
        Float32Buffer: w,
        Float64Buffer: A,
        SampleBuffer: A,
        Float32MultiBuffer: E,
        Float64MultiBuffer: O,
        IntBuffer: P,
        UInt8Buffer: T
      };
    },
    126: t => {
      function e() {}
      (e.prototype = Object.create(null)).constructor = e;
      e.prototype.setEngineAndPatcher = function () {};
      e.prototype.initialize = function () {};
      e.prototype.getNumParameters = function () {
        return 0;
      };
      e.prototype.setParameterValue = function () {};
      e.prototype.prepareToProcess = function () {};
      e.prototype.process = function () {};
      t.exports = {
        ExternalLoaderFactory: function () {
          console.log("WARNING: Externals are not yet supported in Javascript");
          return new e();
        }
      };
    },
    925: t => {
      function e(t, e, n, r) {
        n[r] = t[e] + 0x9e3779b97f4a7c15n;
        n[r] = 0xbf58476d1ce4e5b9n * (n[r] ^ n[r] >> 30n);
        n[r] = 0x94d049bb133111ebn * (n[r] ^ n[r] >> 27n);
        n[r] = n[r] ^ n[r] >> 31n;
      }
      t.exports = {
        reset: function (t, n) {
          let r = new BigUint64Array(1);
          r[0] = BigInt(Math.trunc(t * 1000000));
          e(r, 0, n, 0);
          e(n, 0, n, 1);
          e(n, 1, n, 2);
          e(n, 2, n, 3);
        },
        next: function (t) {
          let e = new BigUint64Array(1);
          let n = new BigUint64Array(1);
          n[0] = t[0] + t[3];
          e[0] = t[1] << 17n;
          t[2] ^= t[0];
          t[3] ^= t[1];
          t[1] ^= t[2];
          t[0] ^= t[3];
          t[2] ^= e[0];
          t[3] = t[3] << 45n | t[3] >> 19n;
          n[0] = n[0] >> 11n;
          return Number(n[0]) * 2.220446049250313e-16 - 1;
        }
      };
    }
  };
  var __webpack_module_cache__ = {};
  function __webpack_require__(t) {
    var e = __webpack_module_cache__[t];
    if (e !== undefined) {
      return e.exports;
    }
    var n = __webpack_module_cache__[t] = {
      exports: {}
    };
    __webpack_modules__[t](n, n.exports, __webpack_require__);
    return n.exports;
  }
  var __webpack_exports__ = {};
  (() => {
    var t;
    (function (t) {
      t[t.Float32Audio = 0] = "Float32Audio";
      t[t.TypedArray = 1] = "TypedArray";
    })(t ||= {});
    class e {
      constructor() {
        this.type = t.TypedArray;
      }
      serialize() {
        return {
          type: this.type
        };
      }
    }
    class n {
      constructor(e, n) {
        this.channels = 0;
        this.sampleRate = 0;
        this.type = t.Float32Audio;
        this.channels = e;
        this.sampleRate = n;
      }
      static fromAudioBuffer(t) {
        return new n(t.numberOfChannels, t.sampleRate);
      }
      get isInterleaved() {
        return true;
      }
      serialize() {
        return {
          channels: this.channels,
          sampleRate: this.sampleRate,
          type: this.type
        };
      }
    }
    var r;
    var i;
    var s;
    var a;
    (function (t) {
      t[t.BufferTransfer = 0] = "BufferTransfer";
      t[t.ClockEvent = 1] = "ClockEvent";
      t[t.DataRefEvent = 2] = "DataRefEvent";
      t[t.MessageEvent = 3] = "MessageEvent";
      t[t.MIDIEvent = 4] = "MIDIEvent";
      t[t.ParameterEvent = 5] = "ParameterEvent";
      t[t.ParameterBangEvent = 6] = "ParameterBangEvent";
      t[t.PresetEvent = 7] = "PresetEvent";
      t[t.StartupEvent = 8] = "StartupEvent";
      t[t.TransportEvent = 9] = "TransportEvent";
      t[t.TempoEvent = 10] = "TempoEvent";
      t[t.BeatTimeEvent = 11] = "BeatTimeEvent";
      t[t.TimeSignatureEvent = 12] = "TimeSignatureEvent";
    })(r ||= {});
    class o {
      constructor(t = 0, e) {
        this.invalid = false;
        this.time = t;
        this.eventTarget = e;
      }
      serialize() {
        return {
          eventTarget: this.eventTarget,
          invalid: this.invalid,
          source: this.source,
          time: this.time
        };
      }
    }
    (function (t) {
      t[t.Update = 1] = "Update";
    })(i ||= {});
    class u extends o {
      constructor(t, e, n, i = "", s) {
        super(t, s);
        this.type = r.MessageEvent;
        this.objectId = i;
        this.tag = e;
        this.payload = n;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          payload: this.payload,
          objectId: this.objectId,
          tag: this.tag,
          type: this.type
        });
      }
    }
    class h extends o {
      constructor(t, e, n, i) {
        super(t, i);
        this.type = r.MIDIEvent;
        if (n.length > 3) {
          throw new Error(`MIDIData can only contain a maximum of 3 bytes. Received ${n.length}`);
        }
        this.data = n;
        if (this.data.length < 3) {
          const t = n.length;
          this.data.length = 3;
          this.data = this.data.fill(undefined, t, 3);
        }
        let s = 0;
        for (let t = 0; t < 3; t++) {
          if (n[t] !== undefined) {
            s++;
          }
        }
        if (s < 1) {
          throw new Error("MIDIData must at least have the first byte set.");
        }
        this.length = s;
        this.status = n[0] & 240;
        this.channel = n[0] & 15;
        this.port = e;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          channel: this.channel,
          data: this.data,
          port: this.port,
          type: this.type
        });
      }
    }
    class c extends o {
      constructor(t, e, n, i, s) {
        super(t, s);
        this.type = r.ParameterEvent;
        this.target = e;
        this.value = n;
        this.source = i;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          target: this.target,
          type: this.type,
          value: this.value
        });
      }
    }
    (function (t) {
      t[t.Set = 1] = "Set";
      t[t.Touched = 2] = "Touched";
    })(s ||= {});
    class f extends o {
      constructor(t, e, n) {
        super(t, undefined);
        this.type = r.PresetEvent;
        this.action = e;
        this.preset = n;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          action: this.action,
          type: this.type,
          preset: this.preset
        });
      }
    }
    (function (t) {
      t[t.BEGIN = 0] = "BEGIN";
      t[t.END = 1] = "END";
    })(a ||= {});
    var _;
    var l;
    (function (t) {
      t[t.Number = 0] = "Number";
      t[t.Bang = 1] = "Bang";
      t[t.List = 2] = "List";
      t[t.Signal = 3] = "Signal";
      t[t.Count = 4] = "Count";
      t[t.Enum = 5] = "Enum";
    })(_ ||= {});
    (function (t) {
      t[t.All = 0] = "All";
      t[t.Internal = 1] = "Internal";
    })(l ||= {});
    (() => {
      try {
        if (typeof WebAssembly == "object" && typeof WebAssembly.instantiate == "function") {
          const t = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
          if (t instanceof WebAssembly.Module) {
            return new WebAssembly.Instance(t) instanceof WebAssembly.Instance;
          }
        }
      } catch (t) {}
    })();
    if (typeof isSecureContext != "undefined") {
      isSecureContext;
    }
    Math.pow(10, 4);
    const I = t => t.slice();
    class M {
      constructor() {
        this.t = [];
        this.i = [];
      }
      get listenerCount() {
        return this.t.length + this.i.length;
      }
      emit(t) {
        if (this.t.length) {
          const e = I(this.t);
          for (let n = 0, r = e.length; n < r; n++) {
            e[n](t);
          }
        }
        if (this.i.length) {
          const e = I(this.i);
          for (let n = 0, r = e.length; n < r; n++) {
            e[n](t);
          }
          e.forEach(t => this.unsubscribe(t));
        }
      }
      once(t) {
        this.i.push(t);
        return {
          unsubscribe: () => this.unsubscribe(t)
        };
      }
      subscribe(t) {
        this.t.push(t);
        return {
          unsubscribe: () => this.unsubscribe(t)
        };
      }
      unsubscribe(t) {
        const e = this.t.indexOf(t);
        if (e >= 0) {
          this.t.splice(e, 1);
        }
        const n = this.i.indexOf(t);
        if (n >= 0) {
          this.i.splice(n, 1);
        }
      }
      removeAllSubscriptions() {
        this.t = [];
        this.i = [];
      }
    }
    function b(t) {
      return class extends t {
        constructor(...t) {
          super();
          this.changeEvent = new M();
          this.o = new M();
          const e = t[0];
          this.u = e.notificationSetting;
          this.convertFromNormalizedValue = e.scaling.convertFromNormalized;
          this.convertToNormalizedValue = e.scaling.convertToNormalized;
          this.constrainParameterValue = e.scaling.constrainParameterValue;
          this.initialValue = e.initialValue;
          this.h = e.initialValue;
          this.displayName = e.displayName || e.name;
          this.exponent = e.exponent;
          this.id = e.id;
          this.index = e.index;
          this.min = e.min;
          this.max = e.max;
          this.name = e.name;
          this.steps = e.steps;
          this.unit = e.unit || "";
        }
        get notificationSetting() {
          return this.u;
        }
        get normalizedValue() {
          return this.convertToNormalizedValue(this.h);
        }
        set normalizedValue(t) {
          this._(this.convertFromNormalizedValue(t));
        }
        l(t) {
          this.u = t;
        }
        _(t) {
          t = this.constrainParameterValue(t);
          if (this.h !== t) {
            this.h = t;
            this.o.emit(this);
            if (this.notificationSetting === l.All) {
              this.changeEvent.emit(t);
            }
          }
        }
        I(t) {
          this.h = t;
          this.changeEvent.emit(t);
        }
      };
    }
    b(Object);
    b(Object);
    b(Object);
    var p = __webpack_require__(133);
    class d {
      constructor() {
        this.M = {};
        this.p = new Float32Array(128);
      }
      addParam(t, e) {
        if (t.type == p.ParameterTypeSignal && t.ioType === p.IOTypeInput) {
          this.M[t.signalIndex] = {
            name: e,
            param: new Float32Array(128)
          };
        }
      }
      getParamName(t) {
        let e = this.M[t];
        if (e !== undefined) {
          return e.name;
        } else {
          return undefined;
        }
      }
      getParamArray(t, e, n) {
        if (e.length == n) {
          return e;
        }
        {
          let r = this.M[t];
          if (r.param.length != n) {
            r.param = new Float32Array(n);
          }
          return r.param.fill(e[0]);
        }
      }
    }
    class y {
      constructor(t, e) {
        this.m = 0;
        this.v = 0;
        this.S = false;
        this.D = new d();
        this.A = e;
        let n = new this.A.CoreObject();
        this.g = n;
        let r = {
          handleParameterEvent: t.handleParameterEvent.bind(t),
          handleMidiEvent: t.handleMidiEvent.bind(t),
          handleMessageEvent: t.handleMessageEvent.bind(t),
          handlePresetEvent: t.handlePresetEvent.bind(t)
        };
        let i = this.A.EventHandler.implement(r);
        this.O = n.createParameterInterface(i);
        for (let t = 0; t < n.getNumParameters(); t++) {
          let e = n.getParameterInfo(t);
          this.D.addParam(e, n.getParameterName(t));
        }
        this.m = n.getNumInputChannels() + n.getNumSignalInParameters();
        this.v = n.getNumOutputChannels();
        this.S = true;
      }
      isReady() {
        return this.S;
      }
      pushArray(t) {
        let e = this.g.getArrayPassingHEAP(t.length);
        this.A.HEAPF64.set(t, e >> 3);
        return e;
      }
      retrieveArray(t) {
        let e = [];
        for (let n = 0; n < t.size(); n++) {
          e.push(t.get(n));
        }
        return e;
      }
      setExternalData(t, r, i) {
        const s = new Uint8Array(r);
        const a = this.g.getNewMemoryBuffer(s.byteLength);
        this.A.HEAPU8.set(s, a);
        if (i instanceof n) {
          this.g.setExternalAudioBuffer(t, a, s.byteLength, i.channels, i.sampleRate);
        } else if (i instanceof e) {
          this.g.setExternalUntypedBuffer(t, a, s.byteLength);
        }
      }
      releaseExternalData(t) {
        let r;
        let i = this.g.getDataRefIndex(t);
        let s = this.g.getDataRefType(i);
        let a = this.g.getDataRefData(i);
        let o = new Uint8Array(a.sizeInBytes);
        o.set(this.A.HEAPU8.subarray(a.data, a.data + a.sizeInBytes));
        r = s.type == 1 ? new n(s.channels, s.sampleRate) : new e();
        this.g.releaseDataRef(i);
        return [o.buffer, r];
      }
      getCurrentTime() {
        return this.g.getCurrentTime();
      }
      setCurrentTime(t) {
        this.g.setCurrentTime(t);
      }
      prepareToProcess(t, e) {
        this.g.prepareToProcess(t, e);
      }
      process(t, e, n, r, i, s) {
        let a = 0;
        let o = 0;
        for (let n = 0; n < e && a < this.m; n++) {
          let e = t[n];
          let r = this.g.getInputChannel(a);
          this.A.HEAPF64.set(e, r >> 3);
          a++;
        }
        if (s) {
          for (let t = a; t < this.m; t++) {
            let e = this.D.getParamName(t);
            if (e !== undefined) {
              let n = this.g.getInputChannel(t);
              this.A.HEAPF64.set(this.D.getParamArray(t, s[e], i), n >> 3);
              a++;
            }
          }
        }
        this.g.process(a, this.v, i);
        for (let t = 0; t < r && o < this.v; t++) {
          let e = n[t];
          let r = this.g.getOutputChannel(o) >> 3;
          e.set(this.A.HEAPF64.subarray(r, r + e.length));
          o++;
        }
      }
      resolveTag(t) {
        return this.g.resolveTag(t);
      }
      scheduleEvent(t) {
        if (t.type === r.MIDIEvent) {
          this.g.scheduleMidiEvent(t.time, t.port, t.data[0], t.data[1], t.data[2]);
        } else if (t.type === r.ParameterEvent) {
          this.g.scheduleParameterEvent(t.target, t.time, t.value, t.source);
        } else if (t.type === r.ParameterBangEvent) {
          this.g.scheduleParameterBangEvent(t.target, t.time);
        } else if (t.type === r.MessageEvent) {
          if (Array.isArray(t.payload)) {
            this.g.sendListMessage(t.tag, t.objectId, this.pushArray(t.payload), t.payload.length, t.time);
          } else if (typeof t.payload == "number") {
            this.g.sendNumMessage(t.tag, t.objectId, t.payload, t.time);
          } else if (t.payload === undefined) {
            this.g.sendBangMessage(t.tag, t.objectId, t.time);
          }
        } else if (t.type === r.TransportEvent) {
          this.g.scheduleTransportEvent(t.time, t.state);
        } else if (t.type === r.TempoEvent) {
          this.g.scheduleTempoEvent(t.time, t.tempo);
        } else if (t.type === r.BeatTimeEvent) {
          this.g.scheduleBeatTimeEvent(t.time, t.beattime);
        } else if (t.type === r.TimeSignatureEvent) {
          this.g.scheduleTimeSignatureEvent(t.time, t.numerator, t.denominator);
        }
      }
      getNumParameters() {
        return this.g.getNumParameters();
      }
      getParameterValue(t) {
        return this.g.getParameterValue(t);
      }
      numIns() {
        return this.m;
      }
      numOuts() {
        return this.v;
      }
      getPreset() {
        return this.g.getPreset();
      }
      setPreset(t) {
        this.g.setPreset(t);
      }
    }
    var m;
    var v;
    (function (t) {
      t[t.LoadPatcher = 0] = "LoadPatcher";
      t[t.ScheduleEvent = 1] = "ScheduleEvent";
      t[t.TransferBuffer = 2] = "TransferBuffer";
      t[t.ReleaseBuffer = 3] = "ReleaseBuffer";
      t[t.SetPreset = 4] = "SetPreset";
      t[t.GetPreset = 5] = "GetPreset";
      t[t.Invalidate = 6] = "Invalidate";
    })(m ||= {});
    (function (t) {
      t[t.LoadPatcherFinished = 1000] = "LoadPatcherFinished";
      t[t.OutgoingEvent = 1002] = "OutgoingEvent";
      t[t.ReleasedBuffer = 1003] = "ReleasedBuffer";
      t[t.TransferBufferFinished = 1004] = "TransferBufferFinished";
      t[t.GetPresetResponse = 1005] = "GetPresetResponse";
    })(v ||= {});
    class S extends AudioWorkletProcessor {
      constructor(r) {
        super(r);
        this.P = true;
        this.T = 128;
        this.B = r => {
          switch (r.data[0]) {
            case m.LoadPatcher:
              rnbo_module().then(t => {
                this.N = new y(this, t);
                this.port.postMessage([v.LoadPatcherFinished]);
              });
              break;
            case m.ScheduleEvent:
              const i = r.data[1];
              this.N.scheduleEvent(i);
              break;
            case m.TransferBuffer:
              {
                const i = r.data[1];
                const s = (r => {
                  switch (r.type) {
                    case t.Float32Audio:
                      return new n(r.channels, r.sampleRate);
                    case t.TypedArray:
                      return new e();
                    default:
                      throw new Error(`Unable to deserialize RNBODataDesc of type ${r.type}`);
                  }
                })(i.typeDesc);
                this.N.setExternalData(i.memoryId, i.data, s);
                this.port.postMessage([v.TransferBufferFinished, {
                  memoryId: i.memoryId
                }]);
                break;
              }
            case m.ReleaseBuffer:
              {
                const t = r.data[1];
                const [e, n] = this.N.releaseExternalData(t.memoryId);
                this.port.postMessage([v.ReleasedBuffer, {
                  memoryId: t.memoryId,
                  data: e,
                  typeDesc: n.serialize()
                }], [e]);
                break;
              }
            case m.GetPreset:
              {
                const t = JSON.parse(this.N.getPreset());
                this.port.postMessage([v.GetPresetResponse, {
                  preset: t
                }]);
                break;
              }
            case m.SetPreset:
              {
                const t = r.data[1];
                this.N.setPreset(JSON.stringify(t.preset));
                break;
              }
            case m.Invalidate:
              this.P = false;
              this.N = null;
          }
        };
        this.port.onmessage = this.B;
        this.port.start();
      }
      static get parameterDescriptors() {
        return RNBO_PARAM_DESCRIPTORS;
      }
      handleParameterEvent(t) {
        this.port.postMessage([v.OutgoingEvent, new c(t.time, t.index, t.value, t.source, undefined).serialize()]);
      }
      handleMidiEvent(t) {
        const e = new h(t.time, t.port, [t.b1, t.b2, t.b3], undefined);
        this.port.postMessage([v.OutgoingEvent, e.serialize()]);
      }
      handleMessageEvent(t) {
        const e = new u(t.time, this.N.resolveTag(t.tag), t.type == 0 ? t.numValue : t.type === 1 ? this.N.retrieveArray(t.listValue) : undefined, this.N.resolveTag(t.objectId));
        this.port.postMessage([v.OutgoingEvent, e.serialize()]);
      }
      handlePresetEvent(t) {
        const e = new f(t.time, s.Touched);
        this.port.postMessage([v.OutgoingEvent, e.serialize()]);
      }
      process(t, e, n) {
        let r = 0;
        let i = 0;
        if (!this.P) {
          return false;
        }
        if (!this.N || !this.N.isReady()) {
          return true;
        }
        let s = 0;
        if (e.length && e[0] && e[0].length && e[0][0]) {
          s = e[0][0].length;
        } else if (t.length && t[0] && t[0].length && t[0][0]) {
          s = t[0][0].length;
        }
        s ||= this.T;
        if (this.T < s) {
          this.T = s;
        }
        this.N.setCurrentTime(currentTime * 1000);
        this.N.prepareToProcess(sampleRate, s);
        const a = [];
        for (let e = 0; e < t.length && r < this.N.numIns(); e++) {
          const n = t[e];
          for (let t = 0; t < n.length && r < this.N.numIns() && n[t].length > 0; t++) {
            a.push(n[t]);
            r++;
          }
        }
        const o = [];
        for (let t = 0; t < e.length && i < this.N.numOuts(); t++) {
          const n = e[t];
          for (let t = 0; t < n.length && i < this.N.numOuts(); t++) {
            o.push(n[t]);
            i++;
          }
        }
        this.N.process(a, r, o, i, s, n);
        return true;
      }
    }
    registerProcessor(RNBO_PROCESSOR_NAME || "RNBOProcessor", S);
  })();
})();