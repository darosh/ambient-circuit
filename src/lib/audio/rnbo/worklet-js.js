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
        var r = t + e;
        if (r >= MAX_32BIT_INT) {
          r -= MAX_32BIT_INT;
        }
        return Math.trunc(r);
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
          let r = arguments[e];
          if (Array.isArray(r)) {
            for (let e = 0; e < r.length; e++) {
              t.push(r[e]);
            }
          } else {
            t.push(r);
          }
        }
        return t;
      }
      function resizeSignal(t, e, r) {
        var n = t || [];
        for (var i = e; i < r; i++) {
          n[i] = 0;
        }
        return n;
      }
      function freeSignal(t) {
        return null;
      }
      function zeroSignal(t, e) {
        if (t) {
          t.fill(0);
        }
      }
      function fillSignal(t, e, r, n) {
        if (t) {
          t.fill(r, n);
        }
      }
      function copySignal(t, e, r) {
        for (let n = 0; n < r; n++) {
          t[n] = e[n];
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
      function parseMidi(t, e, r) {
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
        var n = r & 240;
        if (t == MIDI_StatusByteReceived) {
          if (n == MIDI_ProgramChangeMask) {
            return MIDI_ProgramChange;
          } else if (n == MIDI_ChannelPressureMask) {
            return MIDI_ChannelPressure;
          } else {
            return MIDI_SecondByteReceived;
          }
        } else if (t == MIDI_SecondByteReceived) {
          if (n == MIDI_NoteOffMask || n == MIDI_NoteOnMask && e == 0) {
            return MIDI_NoteOff;
          } else if (n == MIDI_NoteOnMask) {
            return MIDI_NoteOn;
          } else if (n == MIDI_AfterTouchMask) {
            return MIDI_Aftertouch;
          } else if (n == MIDI_CCMask) {
            return MIDI_CC;
          } else if (n == MIDI_PitchBendMask) {
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
      function initDataRef(t, e, r) {
        (t = {}).name = e;
        t.isValid = false;
        t.wantsFillFlag = false;
        t.bytesToAllocate = 0;
        t.channels = 0;
        t.sampleRate = 0;
        t.internal = r;
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
      function updateMultiRef(t, e, r) {
        if (e.setCurrent && e.getIndex) {
          e.setCurrent(r);
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
            let r = Array.from(arguments);
            r.splice(0, 1);
            for (let n = 0; n < t; n++) {
              e[n] = FIXEDSIZEARRAYINIT.apply(null, r);
            }
          }
          return e;
        }
        return new Array();
      }
      function TAG(t) {
        let e = 0;
        for (let r = 0; r < t.length; r++) {
          e = t.charCodeAt(r) + (e << 6) + (e << 16) - e;
        }
        return e | 0;
      }
      function serializeArrayToList(t, e) {
        return t;
      }
      function deserializeArrayFromList(t, e, r) {
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
      function deserializeBuffer(t, e, r) {
        e.arrayBuffer = r.data.slice(0);
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
      function getSubStateAt(t, e, r) {
        if (t[e] === undefined) {
          t[e] = [];
        }
        if (t[e][r] === undefined) {
          t[e][r] = {};
        }
        return t[e][r];
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
      function r(t, e) {
        let r = t * this.BASEARRAYVIEW.BYTES_PER_ELEMENT * e;
        this.requestedChannels = e;
        this.dataRef.requestSizeInBytes(r, false);
      }
      function n(t, e) {
        return this[this.getChannels() * Math.floor(e) + t];
      }
      function i(t, e) {
        const r = this.getChannels();
        if (t < 0 || t >= r || e < 0 || e >= this.getSize()) {
          return 0;
        } else {
          return this[r * Math.floor(e) + t];
        }
      }
      function s(t, e, r) {
        this[this.getChannels() * Math.floor(e) + t] = r;
      }
      function o(t, e, r) {
        const n = this.getChannels();
        if (!(t < 0) && !(t >= n) && !(e < 0) && !(e >= this.getSize())) {
          this[n * Math.floor(e) + t] = r;
        }
      }
      function u() {
        return this.dataRef.channels;
      }
      function a() {
        return this.dataRef.sampleRate;
      }
      function h(t) {
        this.dataRef.sampleRate = t;
      }
      function f() {
        this.dataRef.clear();
      }
      function c(t) {
        if (t !== this.dataRef.channels) {
          let e = this.getSize();
          this.clear();
          this.dataRef.channels = t;
          return this.setSize(e);
        }
        return this;
      }
      function l() {
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
          I(e, this.dataRef, this.BASEARRAYVIEW);
          if (this.isAudioBuffer) {
            w(e);
          }
          e.reinitConstructor = this.reinitConstructor;
          return e;
        }
        return this;
      }
      function d(t) {
        let e = this.getChannels();
        this.requestedChannels = e;
        this.dataRef.requestSizeInBytes(t * this.BASEARRAYVIEW.BYTES_PER_ELEMENT * e, true);
        return this.allocateIfNeeded();
      }
      function p() {
        if (this.fill) {
          this.fill(0);
        }
      }
      function m() {
        return this.touched;
      }
      function _(t) {
        this.touched = t;
      }
      function g(t) {
        this.dataRef.setWantsFill(t);
      }
      function y() {
        return this.dataRef.getIndex();
      }
      function b() {
        return 0;
      }
      function I(t, n, i) {
        t.dataRef = n;
        t.BASEARRAYVIEW = i;
        t.getSize = e;
        t.requestSize = r;
        t.setSize = d;
        t.allocateIfNeeded = l;
        t.setZero = p;
        t.clear = f;
        t.getChannels = u;
        t.getSampleRate = a;
        t.setWantsFill = g;
        t.getIndex = y;
        n.setZero = function () {
          t.setZero();
        };
        t.touched = false;
        t.getTouched = m;
        t.setTouched = _;
      }
      function w(t) {
        t.getSample = n;
        t.getSampleSafe = i;
        t.setSample = s;
        t.setSampleSafe = o;
        t.setChannels = c;
        t.setSampleRate = h;
        t.isAudioBuffer = true;
        t.requestedChannels = 0;
        t.getCurrentIndex = b;
      }
      let v = function (t, e) {
        let r;
        r = t.arrayBuffer ? new e(t.arrayBuffer) : {};
        I(r, t, e);
        r.reinitConstructor = this.constructor;
        return r;
      };
      (v.prototype = Object.create(null)).constructor = v;
      let M = function (t, e) {
        let r = v.call(this, t, e);
        w(r);
        return r;
      };
      (M.prototype = Object.create(v)).constructor = M;
      let E = function (t) {
        return M.call(this, t, Float32Array);
      };
      (E.prototype = Object.create(M.prototype)).constructor = E;
      let S = function (t) {
        return M.call(this, t, Float64Array);
      };
      (S.prototype = Object.create(M.prototype)).constructor = S;
      let T = function (t, e) {
        let r = new e(t.dataRefs[t.current]);
        r.multiRef = t;
        r.setCurrent = function (t) {
          this.multiRef.setCurrent(Math.round(t));
        };
        r.getIndex = function () {
          return this.multiRef.getIndex();
        };
        r.getCurrentIndex = function () {
          return this.multiRef.getCurrentIndex();
        };
        r.reinitConstructor = this.constructor;
        return r;
      };
      T.prototype = Object.create(null);
      T.constructor = T;
      let B = function (t) {
        return T.call(this, t, E);
      };
      (B.prototype = Object.create(T.prototype)).constructor = B;
      let A = function (t) {
        return T.call(this, t, S);
      };
      (A.prototype = Object.create(T.prototype)).constructor = A;
      let P = function (t) {
        return v.call(this, t, Int32Array);
      };
      (P.prototype = Object.create(v.prototype)).constructor = P;
      let O = function (t) {
        return v.call(this, t, Uint8Array);
      };
      (O.prototype = Object.create(v.prototype)).constructor = O;
      t.exports = {
        Float32Buffer: E,
        Float64Buffer: S,
        SampleBuffer: S,
        Float32MultiBuffer: B,
        Float64MultiBuffer: A,
        IntBuffer: P,
        UInt8Buffer: O
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
      function e(t, e, r, n) {
        r[n] = t[e] + 0x9e3779b97f4a7c15n;
        r[n] = 0xbf58476d1ce4e5b9n * (r[n] ^ r[n] >> 30n);
        r[n] = 0x94d049bb133111ebn * (r[n] ^ r[n] >> 27n);
        r[n] = r[n] ^ r[n] >> 31n;
      }
      t.exports = {
        reset: function (t, r) {
          let n = new BigUint64Array(1);
          n[0] = BigInt(Math.trunc(t * 1000000));
          e(n, 0, r, 0);
          e(r, 0, r, 1);
          e(r, 1, r, 2);
          e(r, 2, r, 3);
        },
        next: function (t) {
          let e = new BigUint64Array(1);
          let r = new BigUint64Array(1);
          r[0] = t[0] + t[3];
          e[0] = t[1] << 17n;
          t[2] ^= t[0];
          t[3] ^= t[1];
          t[1] ^= t[2];
          t[0] ^= t[3];
          t[2] ^= e[0];
          t[3] = t[3] << 45n | t[3] >> 19n;
          r[0] = r[0] >> 11n;
          return Number(r[0]) * 2.220446049250313e-16 - 1;
        }
      };
    },
    766: (t, e) => {
      e.byteLength = function (t) {
        var e = a(t);
        var r = e[0];
        var n = e[1];
        return (r + n) * 3 / 4 - n;
      };
      e.toByteArray = function (t) {
        var e;
        var r;
        var s = a(t);
        var o = s[0];
        var u = s[1];
        var h = new i(function (t, e, r) {
          return (e + r) * 3 / 4 - r;
        }(0, o, u));
        var f = 0;
        var c = u > 0 ? o - 4 : o;
        for (r = 0; r < c; r += 4) {
          e = n[t.charCodeAt(r)] << 18 | n[t.charCodeAt(r + 1)] << 12 | n[t.charCodeAt(r + 2)] << 6 | n[t.charCodeAt(r + 3)];
          h[f++] = e >> 16 & 255;
          h[f++] = e >> 8 & 255;
          h[f++] = e & 255;
        }
        if (u === 2) {
          e = n[t.charCodeAt(r)] << 2 | n[t.charCodeAt(r + 1)] >> 4;
          h[f++] = e & 255;
        }
        if (u === 1) {
          e = n[t.charCodeAt(r)] << 10 | n[t.charCodeAt(r + 1)] << 4 | n[t.charCodeAt(r + 2)] >> 2;
          h[f++] = e >> 8 & 255;
          h[f++] = e & 255;
        }
        return h;
      };
      e.fromByteArray = function (t) {
        var e;
        var n = t.length;
        var i = n % 3;
        var s = [];
        for (var o = 16383, u = 0, a = n - i; u < a; u += o) {
          s.push(h(t, u, u + o > a ? a : u + o));
        }
        if (i === 1) {
          e = t[n - 1];
          s.push(r[e >> 2] + r[e << 4 & 63] + "==");
        } else if (i === 2) {
          e = (t[n - 2] << 8) + t[n - 1];
          s.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "=");
        }
        return s.join("");
      };
      var r = [];
      var n = [];
      var i = typeof Uint8Array != "undefined" ? Uint8Array : Array;
      var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (var o = 0, u = s.length; o < u; ++o) {
        r[o] = s[o];
        n[s.charCodeAt(o)] = o;
      }
      function a(t) {
        var e = t.length;
        if (e % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var r = t.indexOf("=");
        if (r === -1) {
          r = e;
        }
        return [r, r === e ? 0 : 4 - r % 4];
      }
      function h(t, e, n) {
        var i;
        var s;
        var o = [];
        for (var u = e; u < n; u += 3) {
          i = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (t[u + 2] & 255);
          o.push(r[(s = i) >> 18 & 63] + r[s >> 12 & 63] + r[s >> 6 & 63] + r[s & 63]);
        }
        return o.join("");
      }
      n["-".charCodeAt(0)] = 62;
      n["_".charCodeAt(0)] = 63;
    },
    834: (t, e, r) => {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      const n = r(766);
      const i = r(181);
      const s = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
      e.Buffer = a;
      e.SlowBuffer = function (t) {
        if (+t != t) {
          t = 0;
        }
        return a.alloc(+t);
      };
      e.INSPECT_MAX_BYTES = 50;
      const o = 2147483647;
      function u(t) {
        if (t > o) {
          throw new RangeError("The value \"" + t + "\" is invalid for option \"size\"");
        }
        const e = new Uint8Array(t);
        Object.setPrototypeOf(e, a.prototype);
        return e;
      }
      function a(t, e, r) {
        if (typeof t == "number") {
          if (typeof e == "string") {
            throw new TypeError("The \"string\" argument must be of type string. Received type number");
          }
          return c(t);
        }
        return h(t, e, r);
      }
      function h(t, e, r) {
        if (typeof t == "string") {
          return function (t, e) {
            if (typeof e != "string" || e === "") {
              e = "utf8";
            }
            if (!a.isEncoding(e)) {
              throw new TypeError("Unknown encoding: " + e);
            }
            const r = m(t, e) | 0;
            let n = u(r);
            const i = n.write(t, e);
            if (i !== r) {
              n = n.slice(0, i);
            }
            return n;
          }(t, e);
        }
        if (ArrayBuffer.isView(t)) {
          return function (t) {
            if (J(t, Uint8Array)) {
              const e = new Uint8Array(t);
              return d(e.buffer, e.byteOffset, e.byteLength);
            }
            return l(t);
          }(t);
        }
        if (t == null) {
          throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
        }
        if (J(t, ArrayBuffer) || t && J(t.buffer, ArrayBuffer)) {
          return d(t, e, r);
        }
        if (typeof SharedArrayBuffer != "undefined" && (J(t, SharedArrayBuffer) || t && J(t.buffer, SharedArrayBuffer))) {
          return d(t, e, r);
        }
        if (typeof t == "number") {
          throw new TypeError("The \"value\" argument must not be of type number. Received type number");
        }
        const n = t.valueOf && t.valueOf();
        if (n != null && n !== t) {
          return a.from(n, e, r);
        }
        const i = function (t) {
          if (a.isBuffer(t)) {
            const e = p(t.length) | 0;
            const r = u(e);
            if (r.length !== 0) {
              t.copy(r, 0, 0, e);
            }
            return r;
          }
          if (t.length !== undefined) {
            if (typeof t.length != "number" || Y(t.length)) {
              return u(0);
            } else {
              return l(t);
            }
          }
          if (t.type === "Buffer" && Array.isArray(t.data)) {
            return l(t.data);
          }
        }(t);
        if (i) {
          return i;
        }
        if (typeof Symbol != "undefined" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] == "function") {
          return a.from(t[Symbol.toPrimitive]("string"), e, r);
        }
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
      }
      function f(t) {
        if (typeof t != "number") {
          throw new TypeError("\"size\" argument must be of type number");
        }
        if (t < 0) {
          throw new RangeError("The value \"" + t + "\" is invalid for option \"size\"");
        }
      }
      function c(t) {
        f(t);
        return u(t < 0 ? 0 : p(t) | 0);
      }
      function l(t) {
        const e = t.length < 0 ? 0 : p(t.length) | 0;
        const r = u(e);
        for (let n = 0; n < e; n += 1) {
          r[n] = t[n] & 255;
        }
        return r;
      }
      function d(t, e, r) {
        if (e < 0 || t.byteLength < e) {
          throw new RangeError("\"offset\" is outside of buffer bounds");
        }
        if (t.byteLength < e + (r || 0)) {
          throw new RangeError("\"length\" is outside of buffer bounds");
        }
        let n;
        n = e === undefined && r === undefined ? new Uint8Array(t) : r === undefined ? new Uint8Array(t, e) : new Uint8Array(t, e, r);
        Object.setPrototypeOf(n, a.prototype);
        return n;
      }
      function p(t) {
        if (t >= o) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
        }
        return t | 0;
      }
      function m(t, e) {
        if (a.isBuffer(t)) {
          return t.length;
        }
        if (ArrayBuffer.isView(t) || J(t, ArrayBuffer)) {
          return t.byteLength;
        }
        if (typeof t != "string") {
          throw new TypeError("The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. Received type " + typeof t);
        }
        const r = t.length;
        const n = arguments.length > 2 && arguments[2] === true;
        if (!n && r === 0) {
          return 0;
        }
        let i = false;
        while (true) {
          switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return r;
            case "utf8":
            case "utf-8":
              return W(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return r * 2;
            case "hex":
              return r >>> 1;
            case "base64":
              return G(t).length;
            default:
              if (i) {
                if (n) {
                  return -1;
                } else {
                  return W(t).length;
                }
              }
              e = ("" + e).toLowerCase();
              i = true;
          }
        }
      }
      function _(t, e, r) {
        let n = false;
        if (e === undefined || e < 0) {
          e = 0;
        }
        if (e > this.length) {
          return "";
        }
        if (r === undefined || r > this.length) {
          r = this.length;
        }
        if (r <= 0) {
          return "";
        }
        if ((r >>>= 0) <= (e >>>= 0)) {
          return "";
        }
        for (t ||= "utf8";;) {
          switch (t) {
            case "hex":
              return O(this, e, r);
            case "utf8":
            case "utf-8":
              return T(this, e, r);
            case "ascii":
              return A(this, e, r);
            case "latin1":
            case "binary":
              return P(this, e, r);
            case "base64":
              return S(this, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return N(this, e, r);
            default:
              if (n) {
                throw new TypeError("Unknown encoding: " + t);
              }
              t = (t + "").toLowerCase();
              n = true;
          }
        }
      }
      function g(t, e, r) {
        const n = t[e];
        t[e] = t[r];
        t[r] = n;
      }
      function y(t, e, r, n, i) {
        if (t.length === 0) {
          return -1;
        }
        if (typeof r == "string") {
          n = r;
          r = 0;
        } else if (r > 2147483647) {
          r = 2147483647;
        } else if (r < -2147483648) {
          r = -2147483648;
        }
        if (Y(r = +r)) {
          r = i ? 0 : t.length - 1;
        }
        if (r < 0) {
          r = t.length + r;
        }
        if (r >= t.length) {
          if (i) {
            return -1;
          }
          r = t.length - 1;
        } else if (r < 0) {
          if (!i) {
            return -1;
          }
          r = 0;
        }
        if (typeof e == "string") {
          e = a.from(e, n);
        }
        if (a.isBuffer(e)) {
          if (e.length === 0) {
            return -1;
          } else {
            return b(t, e, r, n, i);
          }
        }
        if (typeof e == "number") {
          e &= 255;
          if (typeof Uint8Array.prototype.indexOf == "function") {
            if (i) {
              return Uint8Array.prototype.indexOf.call(t, e, r);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(t, e, r);
            }
          } else {
            return b(t, [e], r, n, i);
          }
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function b(t, e, r, n, i) {
        let s;
        let o = 1;
        let u = t.length;
        let a = e.length;
        if (n !== undefined && ((n = String(n).toLowerCase()) === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
          if (t.length < 2 || e.length < 2) {
            return -1;
          }
          o = 2;
          u /= 2;
          a /= 2;
          r /= 2;
        }
        function h(t, e) {
          if (o === 1) {
            return t[e];
          } else {
            return t.readUInt16BE(e * o);
          }
        }
        if (i) {
          let n = -1;
          for (s = r; s < u; s++) {
            if (h(t, s) === h(e, n === -1 ? 0 : s - n)) {
              if (n === -1) {
                n = s;
              }
              if (s - n + 1 === a) {
                return n * o;
              }
            } else {
              if (n !== -1) {
                s -= s - n;
              }
              n = -1;
            }
          }
        } else {
          if (r + a > u) {
            r = u - a;
          }
          s = r;
          for (; s >= 0; s--) {
            let r = true;
            for (let n = 0; n < a; n++) {
              if (h(t, s + n) !== h(e, n)) {
                r = false;
                break;
              }
            }
            if (r) {
              return s;
            }
          }
        }
        return -1;
      }
      function I(t, e, r, n) {
        r = Number(r) || 0;
        const i = t.length - r;
        if (n) {
          if ((n = Number(n)) > i) {
            n = i;
          }
        } else {
          n = i;
        }
        const s = e.length;
        let o;
        if (n > s / 2) {
          n = s / 2;
        }
        o = 0;
        for (; o < n; ++o) {
          const n = parseInt(e.substr(o * 2, 2), 16);
          if (Y(n)) {
            return o;
          }
          t[r + o] = n;
        }
        return o;
      }
      function w(t, e, r, n) {
        return K(W(e, t.length - r), t, r, n);
      }
      function v(t, e, r, n) {
        return K(function (t) {
          const e = [];
          for (let r = 0; r < t.length; ++r) {
            e.push(t.charCodeAt(r) & 255);
          }
          return e;
        }(e), t, r, n);
      }
      function M(t, e, r, n) {
        return K(G(e), t, r, n);
      }
      function E(t, e, r, n) {
        return K(function (t, e) {
          let r;
          let n;
          let i;
          const s = [];
          for (let o = 0; o < t.length && !((e -= 2) < 0); ++o) {
            r = t.charCodeAt(o);
            n = r >> 8;
            i = r % 256;
            s.push(i);
            s.push(n);
          }
          return s;
        }(e, t.length - r), t, r, n);
      }
      function S(t, e, r) {
        if (e === 0 && r === t.length) {
          return n.fromByteArray(t);
        } else {
          return n.fromByteArray(t.slice(e, r));
        }
      }
      function T(t, e, r) {
        r = Math.min(t.length, r);
        const n = [];
        let i = e;
        while (i < r) {
          const e = t[i];
          let s = null;
          let o = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
          if (i + o <= r) {
            let r;
            let n;
            let u;
            let a;
            switch (o) {
              case 1:
                if (e < 128) {
                  s = e;
                }
                break;
              case 2:
                r = t[i + 1];
                if ((r & 192) == 128) {
                  a = (e & 31) << 6 | r & 63;
                  if (a > 127) {
                    s = a;
                  }
                }
                break;
              case 3:
                r = t[i + 1];
                n = t[i + 2];
                if ((r & 192) == 128 && (n & 192) == 128) {
                  a = (e & 15) << 12 | (r & 63) << 6 | n & 63;
                  if (a > 2047 && (a < 55296 || a > 57343)) {
                    s = a;
                  }
                }
                break;
              case 4:
                r = t[i + 1];
                n = t[i + 2];
                u = t[i + 3];
                if ((r & 192) == 128 && (n & 192) == 128 && (u & 192) == 128) {
                  a = (e & 15) << 18 | (r & 63) << 12 | (n & 63) << 6 | u & 63;
                  if (a > 65535 && a < 1114112) {
                    s = a;
                  }
                }
            }
          }
          if (s === null) {
            s = 65533;
            o = 1;
          } else if (s > 65535) {
            s -= 65536;
            n.push(s >>> 10 & 1023 | 55296);
            s = s & 1023 | 56320;
          }
          n.push(s);
          i += o;
        }
        return function (t) {
          const e = t.length;
          if (e <= B) {
            return String.fromCharCode.apply(String, t);
          }
          let r = "";
          let n = 0;
          while (n < e) {
            r += String.fromCharCode.apply(String, t.slice(n, n += B));
          }
          return r;
        }(n);
      }
      e.kMaxLength = o;
      a.TYPED_ARRAY_SUPPORT = function () {
        try {
          const t = new Uint8Array(1);
          const e = {
            foo: function () {
              return 42;
            }
          };
          Object.setPrototypeOf(e, Uint8Array.prototype);
          Object.setPrototypeOf(t, e);
          return t.foo() === 42;
        } catch (t) {
          return false;
        }
      }();
      if (!a.TYPED_ARRAY_SUPPORT && typeof console != "undefined" && typeof console.error == "function") {
        console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
      }
      Object.defineProperty(a.prototype, "parent", {
        enumerable: true,
        get: function () {
          if (a.isBuffer(this)) {
            return this.buffer;
          }
        }
      });
      Object.defineProperty(a.prototype, "offset", {
        enumerable: true,
        get: function () {
          if (a.isBuffer(this)) {
            return this.byteOffset;
          }
        }
      });
      a.poolSize = 8192;
      a.from = function (t, e, r) {
        return h(t, e, r);
      };
      Object.setPrototypeOf(a.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(a, Uint8Array);
      a.alloc = function (t, e, r) {
        return function (t, e, r) {
          f(t);
          if (t <= 0) {
            return u(t);
          } else if (e !== undefined) {
            if (typeof r == "string") {
              return u(t).fill(e, r);
            } else {
              return u(t).fill(e);
            }
          } else {
            return u(t);
          }
        }(t, e, r);
      };
      a.allocUnsafe = function (t) {
        return c(t);
      };
      a.allocUnsafeSlow = function (t) {
        return c(t);
      };
      a.isBuffer = function (t) {
        return t != null && t.t === true && t !== a.prototype;
      };
      a.compare = function (t, e) {
        if (J(t, Uint8Array)) {
          t = a.from(t, t.offset, t.byteLength);
        }
        if (J(e, Uint8Array)) {
          e = a.from(e, e.offset, e.byteLength);
        }
        if (!a.isBuffer(t) || !a.isBuffer(e)) {
          throw new TypeError("The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array");
        }
        if (t === e) {
          return 0;
        }
        let r = t.length;
        let n = e.length;
        for (let i = 0, s = Math.min(r, n); i < s; ++i) {
          if (t[i] !== e[i]) {
            r = t[i];
            n = e[i];
            break;
          }
        }
        if (r < n) {
          return -1;
        } else if (n < r) {
          return 1;
        } else {
          return 0;
        }
      };
      a.isEncoding = function (t) {
        switch (String(t).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      a.concat = function (t, e) {
        if (!Array.isArray(t)) {
          throw new TypeError("\"list\" argument must be an Array of Buffers");
        }
        if (t.length === 0) {
          return a.alloc(0);
        }
        let r;
        if (e === undefined) {
          e = 0;
          r = 0;
          for (; r < t.length; ++r) {
            e += t[r].length;
          }
        }
        const n = a.allocUnsafe(e);
        let i = 0;
        for (r = 0; r < t.length; ++r) {
          let e = t[r];
          if (J(e, Uint8Array)) {
            if (i + e.length > n.length) {
              if (!a.isBuffer(e)) {
                e = a.from(e);
              }
              e.copy(n, i);
            } else {
              Uint8Array.prototype.set.call(n, e, i);
            }
          } else {
            if (!a.isBuffer(e)) {
              throw new TypeError("\"list\" argument must be an Array of Buffers");
            }
            e.copy(n, i);
          }
          i += e.length;
        }
        return n;
      };
      a.byteLength = m;
      a.prototype.t = true;
      a.prototype.swap16 = function () {
        const t = this.length;
        if (t % 2 != 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let e = 0; e < t; e += 2) {
          g(this, e, e + 1);
        }
        return this;
      };
      a.prototype.swap32 = function () {
        const t = this.length;
        if (t % 4 != 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let e = 0; e < t; e += 4) {
          g(this, e, e + 3);
          g(this, e + 1, e + 2);
        }
        return this;
      };
      a.prototype.swap64 = function () {
        const t = this.length;
        if (t % 8 != 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let e = 0; e < t; e += 8) {
          g(this, e, e + 7);
          g(this, e + 1, e + 6);
          g(this, e + 2, e + 5);
          g(this, e + 3, e + 4);
        }
        return this;
      };
      a.prototype.toString = function () {
        const t = this.length;
        if (t === 0) {
          return "";
        } else if (arguments.length === 0) {
          return T(this, 0, t);
        } else {
          return _.apply(this, arguments);
        }
      };
      a.prototype.toLocaleString = a.prototype.toString;
      a.prototype.equals = function (t) {
        if (!a.isBuffer(t)) {
          throw new TypeError("Argument must be a Buffer");
        }
        return this === t || a.compare(this, t) === 0;
      };
      a.prototype.inspect = function () {
        let t = "";
        const r = e.INSPECT_MAX_BYTES;
        t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > r) {
          t += " ... ";
        }
        return "<Buffer " + t + ">";
      };
      if (s) {
        a.prototype[s] = a.prototype.inspect;
      }
      a.prototype.compare = function (t, e, r, n, i) {
        if (J(t, Uint8Array)) {
          t = a.from(t, t.offset, t.byteLength);
        }
        if (!a.isBuffer(t)) {
          throw new TypeError("The \"target\" argument must be one of type Buffer or Uint8Array. Received type " + typeof t);
        }
        if (e === undefined) {
          e = 0;
        }
        if (r === undefined) {
          r = t ? t.length : 0;
        }
        if (n === undefined) {
          n = 0;
        }
        if (i === undefined) {
          i = this.length;
        }
        if (e < 0 || r > t.length || n < 0 || i > this.length) {
          throw new RangeError("out of range index");
        }
        if (n >= i && e >= r) {
          return 0;
        }
        if (n >= i) {
          return -1;
        }
        if (e >= r) {
          return 1;
        }
        if (this === t) {
          return 0;
        }
        let s = (i >>>= 0) - (n >>>= 0);
        let o = (r >>>= 0) - (e >>>= 0);
        const u = Math.min(s, o);
        const h = this.slice(n, i);
        const f = t.slice(e, r);
        for (let t = 0; t < u; ++t) {
          if (h[t] !== f[t]) {
            s = h[t];
            o = f[t];
            break;
          }
        }
        if (s < o) {
          return -1;
        } else if (o < s) {
          return 1;
        } else {
          return 0;
        }
      };
      a.prototype.includes = function (t, e, r) {
        return this.indexOf(t, e, r) !== -1;
      };
      a.prototype.indexOf = function (t, e, r) {
        return y(this, t, e, r, true);
      };
      a.prototype.lastIndexOf = function (t, e, r) {
        return y(this, t, e, r, false);
      };
      a.prototype.write = function (t, e, r, n) {
        if (e === undefined) {
          n = "utf8";
          r = this.length;
          e = 0;
        } else if (r === undefined && typeof e == "string") {
          n = e;
          r = this.length;
          e = 0;
        } else {
          if (!isFinite(e)) {
            throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          }
          e >>>= 0;
          if (isFinite(r)) {
            r >>>= 0;
            if (n === undefined) {
              n = "utf8";
            }
          } else {
            n = r;
            r = undefined;
          }
        }
        const i = this.length - e;
        if (r === undefined || r > i) {
          r = i;
        }
        if (t.length > 0 && (r < 0 || e < 0) || e > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        n ||= "utf8";
        let s = false;
        while (true) {
          switch (n) {
            case "hex":
              return I(this, t, e, r);
            case "utf8":
            case "utf-8":
              return w(this, t, e, r);
            case "ascii":
            case "latin1":
            case "binary":
              return v(this, t, e, r);
            case "base64":
              return M(this, t, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return E(this, t, e, r);
            default:
              if (s) {
                throw new TypeError("Unknown encoding: " + n);
              }
              n = ("" + n).toLowerCase();
              s = true;
          }
        }
      };
      a.prototype.toJSON = function () {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this.i || this, 0)
        };
      };
      const B = 4096;
      function A(t, e, r) {
        let n = "";
        r = Math.min(t.length, r);
        for (let i = e; i < r; ++i) {
          n += String.fromCharCode(t[i] & 127);
        }
        return n;
      }
      function P(t, e, r) {
        let n = "";
        r = Math.min(t.length, r);
        for (let i = e; i < r; ++i) {
          n += String.fromCharCode(t[i]);
        }
        return n;
      }
      function O(t, e, r) {
        const n = t.length;
        if (!e || e < 0) {
          e = 0;
        }
        if (!r || r < 0 || r > n) {
          r = n;
        }
        let i = "";
        for (let n = e; n < r; ++n) {
          i += Z[t[n]];
        }
        return i;
      }
      function N(t, e, r) {
        const n = t.slice(e, r);
        let i = "";
        for (let t = 0; t < n.length - 1; t += 2) {
          i += String.fromCharCode(n[t] + n[t + 1] * 256);
        }
        return i;
      }
      function D(t, e, r) {
        if (t % 1 != 0 || t < 0) {
          throw new RangeError("offset is not uint");
        }
        if (t + e > r) {
          throw new RangeError("Trying to access beyond buffer length");
        }
      }
      function R(t, e, r, n, i, s) {
        if (!a.isBuffer(t)) {
          throw new TypeError("\"buffer\" argument must be a Buffer instance");
        }
        if (e > i || e < s) {
          throw new RangeError("\"value\" argument is out of bounds");
        }
        if (r + n > t.length) {
          throw new RangeError("Index out of range");
        }
      }
      function x(t, e, r, n, i) {
        $(e, n, i, t, r, 7);
        let s = Number(e & BigInt(4294967295));
        t[r++] = s;
        s >>= 8;
        t[r++] = s;
        s >>= 8;
        t[r++] = s;
        s >>= 8;
        t[r++] = s;
        let o = Number(e >> BigInt(32) & BigInt(4294967295));
        t[r++] = o;
        o >>= 8;
        t[r++] = o;
        o >>= 8;
        t[r++] = o;
        o >>= 8;
        t[r++] = o;
        return r;
      }
      function C(t, e, r, n, i) {
        $(e, n, i, t, r, 7);
        let s = Number(e & BigInt(4294967295));
        t[r + 7] = s;
        s >>= 8;
        t[r + 6] = s;
        s >>= 8;
        t[r + 5] = s;
        s >>= 8;
        t[r + 4] = s;
        let o = Number(e >> BigInt(32) & BigInt(4294967295));
        t[r + 3] = o;
        o >>= 8;
        t[r + 2] = o;
        o >>= 8;
        t[r + 1] = o;
        o >>= 8;
        t[r] = o;
        return r + 8;
      }
      function k(t, e, r, n, i, s) {
        if (r + n > t.length) {
          throw new RangeError("Index out of range");
        }
        if (r < 0) {
          throw new RangeError("Index out of range");
        }
      }
      function U(t, e, r, n, s) {
        e = +e;
        r >>>= 0;
        if (!s) {
          k(t, 0, r, 4);
        }
        i.write(t, e, r, n, 23, 4);
        return r + 4;
      }
      function z(t, e, r, n, s) {
        e = +e;
        r >>>= 0;
        if (!s) {
          k(t, 0, r, 8);
        }
        i.write(t, e, r, n, 52, 8);
        return r + 8;
      }
      a.prototype.slice = function (t, e) {
        const r = this.length;
        if ((t = ~~t) < 0) {
          if ((t += r) < 0) {
            t = 0;
          }
        } else if (t > r) {
          t = r;
        }
        if ((e = e === undefined ? r : ~~e) < 0) {
          if ((e += r) < 0) {
            e = 0;
          }
        } else if (e > r) {
          e = r;
        }
        if (e < t) {
          e = t;
        }
        const n = this.subarray(t, e);
        Object.setPrototypeOf(n, a.prototype);
        return n;
      };
      a.prototype.readUintLE = a.prototype.readUIntLE = function (t, e, r) {
        t >>>= 0;
        e >>>= 0;
        if (!r) {
          D(t, e, this.length);
        }
        let n = this[t];
        let i = 1;
        let s = 0;
        while (++s < e && (i *= 256)) {
          n += this[t + s] * i;
        }
        return n;
      };
      a.prototype.readUintBE = a.prototype.readUIntBE = function (t, e, r) {
        t >>>= 0;
        e >>>= 0;
        if (!r) {
          D(t, e, this.length);
        }
        let n = this[t + --e];
        let i = 1;
        while (e > 0 && (i *= 256)) {
          n += this[t + --e] * i;
        }
        return n;
      };
      a.prototype.readUint8 = a.prototype.readUInt8 = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 1, this.length);
        }
        return this[t];
      };
      a.prototype.readUint16LE = a.prototype.readUInt16LE = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 2, this.length);
        }
        return this[t] | this[t + 1] << 8;
      };
      a.prototype.readUint16BE = a.prototype.readUInt16BE = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 2, this.length);
        }
        return this[t] << 8 | this[t + 1];
      };
      a.prototype.readUint32LE = a.prototype.readUInt32LE = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 4, this.length);
        }
        return (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216;
      };
      a.prototype.readUint32BE = a.prototype.readUInt32BE = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 4, this.length);
        }
        return this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
      };
      a.prototype.readBigUInt64LE = H(function (t) {
        V(t >>>= 0, "offset");
        const e = this[t];
        const r = this[t + 7];
        if (e === undefined || r === undefined) {
          L(t, this.length - 8);
        }
        const n = e + this[++t] * 256 + this[++t] * 65536 + this[++t] * 16777216;
        const i = this[++t] + this[++t] * 256 + this[++t] * 65536 + r * 16777216;
        return BigInt(n) + (BigInt(i) << BigInt(32));
      });
      a.prototype.readBigUInt64BE = H(function (t) {
        V(t >>>= 0, "offset");
        const e = this[t];
        const r = this[t + 7];
        if (e === undefined || r === undefined) {
          L(t, this.length - 8);
        }
        const n = e * 16777216 + this[++t] * 65536 + this[++t] * 256 + this[++t];
        const i = this[++t] * 16777216 + this[++t] * 65536 + this[++t] * 256 + r;
        return (BigInt(n) << BigInt(32)) + BigInt(i);
      });
      a.prototype.readIntLE = function (t, e, r) {
        t >>>= 0;
        e >>>= 0;
        if (!r) {
          D(t, e, this.length);
        }
        let n = this[t];
        let i = 1;
        let s = 0;
        while (++s < e && (i *= 256)) {
          n += this[t + s] * i;
        }
        i *= 128;
        if (n >= i) {
          n -= Math.pow(2, e * 8);
        }
        return n;
      };
      a.prototype.readIntBE = function (t, e, r) {
        t >>>= 0;
        e >>>= 0;
        if (!r) {
          D(t, e, this.length);
        }
        let n = e;
        let i = 1;
        let s = this[t + --n];
        while (n > 0 && (i *= 256)) {
          s += this[t + --n] * i;
        }
        i *= 128;
        if (s >= i) {
          s -= Math.pow(2, e * 8);
        }
        return s;
      };
      a.prototype.readInt8 = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 1, this.length);
        }
        if (this[t] & 128) {
          return (255 - this[t] + 1) * -1;
        } else {
          return this[t];
        }
      };
      a.prototype.readInt16LE = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 2, this.length);
        }
        const r = this[t] | this[t + 1] << 8;
        if (r & 32768) {
          return r | -65536;
        } else {
          return r;
        }
      };
      a.prototype.readInt16BE = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 2, this.length);
        }
        const r = this[t + 1] | this[t] << 8;
        if (r & 32768) {
          return r | -65536;
        } else {
          return r;
        }
      };
      a.prototype.readInt32LE = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 4, this.length);
        }
        return this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
      };
      a.prototype.readInt32BE = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 4, this.length);
        }
        return this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
      };
      a.prototype.readBigInt64LE = H(function (t) {
        V(t >>>= 0, "offset");
        const e = this[t];
        const r = this[t + 7];
        if (e === undefined || r === undefined) {
          L(t, this.length - 8);
        }
        const n = this[t + 4] + this[t + 5] * 256 + this[t + 6] * 65536 + (r << 24);
        return (BigInt(n) << BigInt(32)) + BigInt(e + this[++t] * 256 + this[++t] * 65536 + this[++t] * 16777216);
      });
      a.prototype.readBigInt64BE = H(function (t) {
        V(t >>>= 0, "offset");
        const e = this[t];
        const r = this[t + 7];
        if (e === undefined || r === undefined) {
          L(t, this.length - 8);
        }
        const n = (e << 24) + this[++t] * 65536 + this[++t] * 256 + this[++t];
        return (BigInt(n) << BigInt(32)) + BigInt(this[++t] * 16777216 + this[++t] * 65536 + this[++t] * 256 + r);
      });
      a.prototype.readFloatLE = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 4, this.length);
        }
        return i.read(this, t, true, 23, 4);
      };
      a.prototype.readFloatBE = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 4, this.length);
        }
        return i.read(this, t, false, 23, 4);
      };
      a.prototype.readDoubleLE = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 8, this.length);
        }
        return i.read(this, t, true, 52, 8);
      };
      a.prototype.readDoubleBE = function (t, e) {
        t >>>= 0;
        if (!e) {
          D(t, 8, this.length);
        }
        return i.read(this, t, false, 52, 8);
      };
      a.prototype.writeUintLE = a.prototype.writeUIntLE = function (t, e, r, n) {
        t = +t;
        e >>>= 0;
        r >>>= 0;
        if (!n) {
          R(this, t, e, r, Math.pow(2, r * 8) - 1, 0);
        }
        let i = 1;
        let s = 0;
        for (this[e] = t & 255; ++s < r && (i *= 256);) {
          this[e + s] = t / i & 255;
        }
        return e + r;
      };
      a.prototype.writeUintBE = a.prototype.writeUIntBE = function (t, e, r, n) {
        t = +t;
        e >>>= 0;
        r >>>= 0;
        if (!n) {
          R(this, t, e, r, Math.pow(2, r * 8) - 1, 0);
        }
        let i = r - 1;
        let s = 1;
        for (this[e + i] = t & 255; --i >= 0 && (s *= 256);) {
          this[e + i] = t / s & 255;
        }
        return e + r;
      };
      a.prototype.writeUint8 = a.prototype.writeUInt8 = function (t, e, r) {
        t = +t;
        e >>>= 0;
        if (!r) {
          R(this, t, e, 1, 255, 0);
        }
        this[e] = t & 255;
        return e + 1;
      };
      a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function (t, e, r) {
        t = +t;
        e >>>= 0;
        if (!r) {
          R(this, t, e, 2, 65535, 0);
        }
        this[e] = t & 255;
        this[e + 1] = t >>> 8;
        return e + 2;
      };
      a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function (t, e, r) {
        t = +t;
        e >>>= 0;
        if (!r) {
          R(this, t, e, 2, 65535, 0);
        }
        this[e] = t >>> 8;
        this[e + 1] = t & 255;
        return e + 2;
      };
      a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function (t, e, r) {
        t = +t;
        e >>>= 0;
        if (!r) {
          R(this, t, e, 4, 4294967295, 0);
        }
        this[e + 3] = t >>> 24;
        this[e + 2] = t >>> 16;
        this[e + 1] = t >>> 8;
        this[e] = t & 255;
        return e + 4;
      };
      a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function (t, e, r) {
        t = +t;
        e >>>= 0;
        if (!r) {
          R(this, t, e, 4, 4294967295, 0);
        }
        this[e] = t >>> 24;
        this[e + 1] = t >>> 16;
        this[e + 2] = t >>> 8;
        this[e + 3] = t & 255;
        return e + 4;
      };
      a.prototype.writeBigUInt64LE = H(function (t, e = 0) {
        return x(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      a.prototype.writeBigUInt64BE = H(function (t, e = 0) {
        return C(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      a.prototype.writeIntLE = function (t, e, r, n) {
        t = +t;
        e >>>= 0;
        if (!n) {
          const n = Math.pow(2, r * 8 - 1);
          R(this, t, e, r, n - 1, -n);
        }
        let i = 0;
        let s = 1;
        let o = 0;
        for (this[e] = t & 255; ++i < r && (s *= 256);) {
          if (t < 0 && o === 0 && this[e + i - 1] !== 0) {
            o = 1;
          }
          this[e + i] = (t / s >> 0) - o & 255;
        }
        return e + r;
      };
      a.prototype.writeIntBE = function (t, e, r, n) {
        t = +t;
        e >>>= 0;
        if (!n) {
          const n = Math.pow(2, r * 8 - 1);
          R(this, t, e, r, n - 1, -n);
        }
        let i = r - 1;
        let s = 1;
        let o = 0;
        for (this[e + i] = t & 255; --i >= 0 && (s *= 256);) {
          if (t < 0 && o === 0 && this[e + i + 1] !== 0) {
            o = 1;
          }
          this[e + i] = (t / s >> 0) - o & 255;
        }
        return e + r;
      };
      a.prototype.writeInt8 = function (t, e, r) {
        t = +t;
        e >>>= 0;
        if (!r) {
          R(this, t, e, 1, 127, -128);
        }
        if (t < 0) {
          t = 255 + t + 1;
        }
        this[e] = t & 255;
        return e + 1;
      };
      a.prototype.writeInt16LE = function (t, e, r) {
        t = +t;
        e >>>= 0;
        if (!r) {
          R(this, t, e, 2, 32767, -32768);
        }
        this[e] = t & 255;
        this[e + 1] = t >>> 8;
        return e + 2;
      };
      a.prototype.writeInt16BE = function (t, e, r) {
        t = +t;
        e >>>= 0;
        if (!r) {
          R(this, t, e, 2, 32767, -32768);
        }
        this[e] = t >>> 8;
        this[e + 1] = t & 255;
        return e + 2;
      };
      a.prototype.writeInt32LE = function (t, e, r) {
        t = +t;
        e >>>= 0;
        if (!r) {
          R(this, t, e, 4, 2147483647, -2147483648);
        }
        this[e] = t & 255;
        this[e + 1] = t >>> 8;
        this[e + 2] = t >>> 16;
        this[e + 3] = t >>> 24;
        return e + 4;
      };
      a.prototype.writeInt32BE = function (t, e, r) {
        t = +t;
        e >>>= 0;
        if (!r) {
          R(this, t, e, 4, 2147483647, -2147483648);
        }
        if (t < 0) {
          t = 4294967295 + t + 1;
        }
        this[e] = t >>> 24;
        this[e + 1] = t >>> 16;
        this[e + 2] = t >>> 8;
        this[e + 3] = t & 255;
        return e + 4;
      };
      a.prototype.writeBigInt64LE = H(function (t, e = 0) {
        return x(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      a.prototype.writeBigInt64BE = H(function (t, e = 0) {
        return C(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      a.prototype.writeFloatLE = function (t, e, r) {
        return U(this, t, e, true, r);
      };
      a.prototype.writeFloatBE = function (t, e, r) {
        return U(this, t, e, false, r);
      };
      a.prototype.writeDoubleLE = function (t, e, r) {
        return z(this, t, e, true, r);
      };
      a.prototype.writeDoubleBE = function (t, e, r) {
        return z(this, t, e, false, r);
      };
      a.prototype.copy = function (t, e, r, n) {
        if (!a.isBuffer(t)) {
          throw new TypeError("argument should be a Buffer");
        }
        r ||= 0;
        if (!n && n !== 0) {
          n = this.length;
        }
        if (e >= t.length) {
          e = t.length;
        }
        e ||= 0;
        if (n > 0 && n < r) {
          n = r;
        }
        if (n === r) {
          return 0;
        }
        if (t.length === 0 || this.length === 0) {
          return 0;
        }
        if (e < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (r < 0 || r >= this.length) {
          throw new RangeError("Index out of range");
        }
        if (n < 0) {
          throw new RangeError("sourceEnd out of bounds");
        }
        if (n > this.length) {
          n = this.length;
        }
        if (t.length - e < n - r) {
          n = t.length - e + r;
        }
        const i = n - r;
        if (this === t && typeof Uint8Array.prototype.copyWithin == "function") {
          this.copyWithin(e, r, n);
        } else {
          Uint8Array.prototype.set.call(t, this.subarray(r, n), e);
        }
        return i;
      };
      a.prototype.fill = function (t, e, r, n) {
        if (typeof t == "string") {
          if (typeof e == "string") {
            n = e;
            e = 0;
            r = this.length;
          } else if (typeof r == "string") {
            n = r;
            r = this.length;
          }
          if (n !== undefined && typeof n != "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof n == "string" && !a.isEncoding(n)) {
            throw new TypeError("Unknown encoding: " + n);
          }
          if (t.length === 1) {
            const e = t.charCodeAt(0);
            if (n === "utf8" && e < 128 || n === "latin1") {
              t = e;
            }
          }
        } else if (typeof t == "number") {
          t &= 255;
        } else if (typeof t == "boolean") {
          t = Number(t);
        }
        if (e < 0 || this.length < e || this.length < r) {
          throw new RangeError("Out of range index");
        }
        if (r <= e) {
          return this;
        }
        let i;
        e >>>= 0;
        r = r === undefined ? this.length : r >>> 0;
        t ||= 0;
        if (typeof t == "number") {
          for (i = e; i < r; ++i) {
            this[i] = t;
          }
        } else {
          const s = a.isBuffer(t) ? t : a.from(t, n);
          const o = s.length;
          if (o === 0) {
            throw new TypeError("The value \"" + t + "\" is invalid for argument \"value\"");
          }
          for (i = 0; i < r - e; ++i) {
            this[i + e] = s[i % o];
          }
        }
        return this;
      };
      const j = {};
      function X(t, e, r) {
        j[t] = class extends r {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: e.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${t}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return t;
          }
          set code(t) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value: t,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${t}]: ${this.message}`;
          }
        };
      }
      function F(t) {
        let e = "";
        let r = t.length;
        const n = t[0] === "-" ? 1 : 0;
        for (; r >= n + 4; r -= 3) {
          e = `_${t.slice(r - 3, r)}${e}`;
        }
        return `${t.slice(0, r)}${e}`;
      }
      function $(t, e, r, n, i, s) {
        if (t > r || t < e) {
          const n = typeof e == "bigint" ? "n" : "";
          let i;
          i = s > 3 ? e === 0 || e === BigInt(0) ? `>= 0${n} and < 2${n} ** ${(s + 1) * 8}${n}` : `>= -(2${n} ** ${(s + 1) * 8 - 1}${n}) and < 2 ** ${(s + 1) * 8 - 1}${n}` : `>= ${e}${n} and <= ${r}${n}`;
          throw new j.ERR_OUT_OF_RANGE("value", i, t);
        }
        (function (t, e, r) {
          V(e, "offset");
          if (t[e] === undefined || t[e + r] === undefined) {
            L(e, t.length - (r + 1));
          }
        })(n, i, s);
      }
      function V(t, e) {
        if (typeof t != "number") {
          throw new j.ERR_INVALID_ARG_TYPE(e, "number", t);
        }
      }
      function L(t, e, r) {
        if (Math.floor(t) !== t) {
          V(t, r);
          throw new j.ERR_OUT_OF_RANGE(r || "offset", "an integer", t);
        }
        if (e < 0) {
          throw new j.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new j.ERR_OUT_OF_RANGE(r || "offset", `>= ${r ? 1 : 0} and <= ${e}`, t);
      }
      X("ERR_BUFFER_OUT_OF_BOUNDS", function (t) {
        if (t) {
          return `${t} is outside of buffer bounds`;
        } else {
          return "Attempt to access memory outside buffer bounds";
        }
      }, RangeError);
      X("ERR_INVALID_ARG_TYPE", function (t, e) {
        return `The "${t}" argument must be of type number. Received type ${typeof e}`;
      }, TypeError);
      X("ERR_OUT_OF_RANGE", function (t, e, r) {
        let n = `The value of "${t}" is out of range.`;
        let i = r;
        if (Number.isInteger(r) && Math.abs(r) > 4294967296) {
          i = F(String(r));
        } else if (typeof r == "bigint") {
          i = String(r);
          if (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) {
            i = F(i);
          }
          i += "n";
        }
        n += ` It must be ${e}. Received ${i}`;
        return n;
      }, RangeError);
      const q = /[^+/0-9A-Za-z-_]/g;
      function W(t, e) {
        let r;
        e = e || Infinity;
        const n = t.length;
        let i = null;
        const s = [];
        for (let o = 0; o < n; ++o) {
          r = t.charCodeAt(o);
          if (r > 55295 && r < 57344) {
            if (!i) {
              if (r > 56319) {
                if ((e -= 3) > -1) {
                  s.push(239, 191, 189);
                }
                continue;
              }
              if (o + 1 === n) {
                if ((e -= 3) > -1) {
                  s.push(239, 191, 189);
                }
                continue;
              }
              i = r;
              continue;
            }
            if (r < 56320) {
              if ((e -= 3) > -1) {
                s.push(239, 191, 189);
              }
              i = r;
              continue;
            }
            r = 65536 + (i - 55296 << 10 | r - 56320);
          } else if (i && (e -= 3) > -1) {
            s.push(239, 191, 189);
          }
          i = null;
          if (r < 128) {
            if ((e -= 1) < 0) {
              break;
            }
            s.push(r);
          } else if (r < 2048) {
            if ((e -= 2) < 0) {
              break;
            }
            s.push(r >> 6 | 192, r & 63 | 128);
          } else if (r < 65536) {
            if ((e -= 3) < 0) {
              break;
            }
            s.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128);
          } else {
            if (!(r < 1114112)) {
              throw new Error("Invalid code point");
            }
            if ((e -= 4) < 0) {
              break;
            }
            s.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128);
          }
        }
        return s;
      }
      function G(t) {
        return n.toByteArray(function (t) {
          if ((t = (t = t.split("=")[0]).trim().replace(q, "")).length < 2) {
            return "";
          }
          while (t.length % 4 != 0) {
            t += "=";
          }
          return t;
        }(t));
      }
      function K(t, e, r, n) {
        let i;
        for (i = 0; i < n && !(i + r >= e.length) && !(i >= t.length); ++i) {
          e[i + r] = t[i];
        }
        return i;
      }
      function J(t, e) {
        return t instanceof e || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === e.name;
      }
      function Y(t) {
        return t != t;
      }
      const Z = function () {
        const t = "0123456789abcdef";
        const e = new Array(256);
        for (let r = 0; r < 16; ++r) {
          const n = r * 16;
          for (let i = 0; i < 16; ++i) {
            e[n + i] = t[r] + t[i];
          }
        }
        return e;
      }();
      function H(t) {
        if (typeof BigInt == "undefined") {
          return Q;
        } else {
          return t;
        }
      }
      function Q() {
        throw new Error("BigInt not supported");
      }
    },
    181: (t, e) => {
      /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
      e.read = function (t, e, r, n, i) {
        var s;
        var o;
        var u = i * 8 - n - 1;
        var a = (1 << u) - 1;
        var h = a >> 1;
        var f = -7;
        var c = r ? i - 1 : 0;
        var l = r ? -1 : 1;
        var d = t[e + c];
        c += l;
        s = d & (1 << -f) - 1;
        d >>= -f;
        f += u;
        for (; f > 0; f -= 8) {
          s = s * 256 + t[e + c];
          c += l;
        }
        o = s & (1 << -f) - 1;
        s >>= -f;
        f += n;
        for (; f > 0; f -= 8) {
          o = o * 256 + t[e + c];
          c += l;
        }
        if (s === 0) {
          s = 1 - h;
        } else {
          if (s === a) {
            if (o) {
              return NaN;
            } else {
              return (d ? -1 : 1) * Infinity;
            }
          }
          o += Math.pow(2, n);
          s -= h;
        }
        return (d ? -1 : 1) * o * Math.pow(2, s - n);
      };
      e.write = function (t, e, r, n, i, s) {
        var o;
        var u;
        var a;
        var h = s * 8 - i - 1;
        var f = (1 << h) - 1;
        var c = f >> 1;
        var l = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var d = n ? 0 : s - 1;
        var p = n ? 1 : -1;
        var m = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
        e = Math.abs(e);
        if (isNaN(e) || e === Infinity) {
          u = isNaN(e) ? 1 : 0;
          o = f;
        } else {
          o = Math.floor(Math.log(e) / Math.LN2);
          if (e * (a = Math.pow(2, -o)) < 1) {
            o--;
            a *= 2;
          }
          if ((e += o + c >= 1 ? l / a : l * Math.pow(2, 1 - c)) * a >= 2) {
            o++;
            a /= 2;
          }
          if (o + c >= f) {
            u = 0;
            o = f;
          } else if (o + c >= 1) {
            u = (e * a - 1) * Math.pow(2, i);
            o += c;
          } else {
            u = e * Math.pow(2, c - 1) * Math.pow(2, i);
            o = 0;
          }
        }
        for (; i >= 8; i -= 8) {
          t[r + d] = u & 255;
          d += p;
          u /= 256;
        }
        o = o << i | u;
        h += i;
        for (; h > 0; h -= 8) {
          t[r + d] = o & 255;
          d += p;
          o /= 256;
        }
        t[r + d - p] |= m * 128;
      };
    },
    264: t => {
      t.exports = {
        src: [{
          code: "class RNBOPatcher{constructor(){this._currentTime=0,this.audioProcessSampleCount=0,this.sampleOffsetIntoNextAudioBuffer=0,this.vs=0,this.maxvs=0,this.sr=44100,this.invsr=2267573696e-14,this.zeroBuffer=0,this.dummyBuffer=0,this.voiceIndex=0,this.noteNumber=0}getParameterIndexForID(e){return-1}getNumMidiInputPorts(){return 0}processMidiEvent(e,t,s,r){this.updateTime(e)}getNumMidiOutputPorts(){return 0}process(e,t,s,r,i){this.vs=i,this.updateTime(this.getEngine().getCurrentTime()),this.audioProcessSampleCount=this.msToSamps(this._currentTime,this.sr)}prepareToProcess(e,t){this.vs=t,this.maxvs=t,this.zeroBuffer=resizeSignal(this.zeroBuffer,0,t),this.dummyBuffer=resizeSignal(this.dummyBuffer,0,t),this.sr=e,this.invsr=1/e}msToSamps(e,t){return rnbo_floor(e*t*.001)}sampsToMs(e){return e*(1e3*this.invsr)}getNumInputChannels(){return 0}getNumOutputChannels(){return 0}getDataRef(e){return 0}getNumDataRefs(){return 0}fillDataRef(e,t){e}processDataViewUpdate(e,t){this.updateTime(t)}initialize(e){this.assign_defaults(),this.applyState(e),this.initializeObjects(e),this.allocateDataRefs(),this.startup(e)}initializeObjects(e){}allocateDataRefs(){}startup(e){}setIsMuted(e){}getPatcherSerial(){return 7}extractState(e){e[eventTargetKey]=this,e[patcherSerialKey]=this.getPatcherSerial(),e.p7=1,e.p7_noteNumber=this.noteNumber}applyState(e){e[patcherSerialKey]==this.getPatcherSerial()&&(containsValue(e[eventTargetKey])&&this.getEngine().updatePatcherEventTarget(e[eventTargetKey],this),containsValue(e.p7_noteNumber)&&(this.noteNumber=e.p7_noteNumber))}setParameterValue(e,t,s){this.updateTime(s)}processParameterEvent(e,t,s){this.setParameterValue(e,t,s)}processNormalizedParameterEvent(e,t,s){this.setParameterValueNormalized(e,t,s)}getParameterValue(e){return 0}getNumSignalInParameters(){return 0}getNumParameters(){return 0}getParameterName(e){return\"bogus\"}getParameterId(e){return\"bogus\"}getParameterInfo(e,t){e}sendParameter(e){this.getEngine().notifyParameterValueChanged(e,this.getParameterValue(e))}processClockEvent(e,t,s,r){this.updateTime(e)}processOutletAtCurrentTime(e,t,s){}processOutletEvent(e,t,s,r){this.updateTime(r),this.processOutletAtCurrentTime(e,t,s)}sendOutlet(e,t){this.getEngine().sendOutlet(this,e,t)}schedule(e,t){this.getEngine().scheduleClockEvent(this,e,t+this._currentTime)}scheduleValue(e,t,s){this.getEngine().scheduleClockEventWithValue(this,e,t+this._currentTime,s)}stop(e){this.getEngine().flushClockEvents(this,e,!1)}stopWithValue(e,v){this.getEngine().flushClockEventsWithValue(this,e,v,!1)}processNumMessage(e,o,t,s){this.updateTime(t)}processListMessage(e,o,t,s){this.updateTime(t)}resolveTag(e){return\"\"}sendMidiEvent(e,t,s,r){this.getEngine().sendMidiEvent(e,t,s,r)}sendMidiEventList(e,t){this.getEngine().sendMidiEventList(e,t)}updateTime(e){this._currentTime=e,this.sampleOffsetIntoNextAudioBuffer=this.msToSamps(e,this.sr)-this.vs-this.audioProcessSampleCount}assign_defaults(){}setEngineAndPatcher(e,t){this._engineInterface=e,this._parentPatcher=t}getEngine(){return this._engineInterface}getPatcher(){return this._parentPatcher}}rnboObj=new RNBOPatcher;",
          encoding: "utf-8",
          type: "js"
        }],
        options: {
          classname: "rnbomatic",
          minifyOutput: true
        },
        desc: {
          parameters: [],
          numParameters: 0,
          numSignalInParameters: 0,
          layouts: [{
            name: "layout",
            boxes: []
          }],
          numInputChannels: 0,
          numOutputChannels: 0,
          patcherSerial: 0,
          externalDataRefs: []
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
    var r = __webpack_module_cache__[t] = {
      exports: {}
    };
    __webpack_modules__[t](r, r.exports, __webpack_require__);
    return r.exports;
  }
  var __webpack_exports__ = {};
  (() => {
    var t;
    function e(t, e, r, n) {
      return new (r ||= Promise)(function (i, s) {
        function o(t) {
          try {
            a(n.next(t));
          } catch (t) {
            s(t);
          }
        }
        function u(t) {
          try {
            a(n.throw(t));
          } catch (t) {
            s(t);
          }
        }
        function a(t) {
          var e;
          if (t.done) {
            i(t.value);
          } else {
            (e = t.value, e instanceof r ? e : new r(function (t) {
              t(e);
            })).then(o, u);
          }
        }
        a((n = n.apply(t, e || [])).next());
      });
    }
    (function (t) {
      t[t.Float32Audio = 0] = "Float32Audio";
      t[t.TypedArray = 1] = "TypedArray";
    })(t ||= {});
    class r {
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
      constructor(e, r) {
        this.channels = 0;
        this.sampleRate = 0;
        this.type = t.Float32Audio;
        this.channels = e;
        this.sampleRate = r;
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
    var i;
    var s;
    (function (t) {
      t[t.Inport = 0] = "Inport";
      t[t.Outport = 1] = "Outport";
      t[t.Undefined = 2] = "Undefined";
    })(i ||= {});
    (function (t) {
      t[t.STOPPED = 0] = "STOPPED";
      t[t.RUNNING = 1] = "RUNNING";
    })(s ||= {});
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
    const o = t => t.slice();
    class u {
      constructor() {
        this.o = [];
        this.u = [];
      }
      get listenerCount() {
        return this.o.length + this.u.length;
      }
      emit(t) {
        if (this.o.length) {
          const e = o(this.o);
          for (let r = 0, n = e.length; r < n; r++) {
            e[r](t);
          }
        }
        if (this.u.length) {
          const e = o(this.u);
          for (let r = 0, n = e.length; r < n; r++) {
            e[r](t);
          }
          e.forEach(t => this.unsubscribe(t));
        }
      }
      once(t) {
        this.u.push(t);
        return {
          unsubscribe: () => this.unsubscribe(t)
        };
      }
      subscribe(t) {
        this.o.push(t);
        return {
          unsubscribe: () => this.unsubscribe(t)
        };
      }
      unsubscribe(t) {
        const e = this.o.indexOf(t);
        if (e >= 0) {
          this.o.splice(e, 1);
        }
        const r = this.u.indexOf(t);
        if (r >= 0) {
          this.u.splice(r, 1);
        }
      }
      removeAllSubscriptions() {
        this.o = [];
        this.u = [];
      }
    }
    var a = __webpack_require__(133);
    class h {
      constructor() {
        this.h = 0;
        this.l = 44100;
        this.p = 64;
        this.outgoingEvent = new u();
        this.parameterChangeEvent = new u();
        this.m = this.sampsToMs(this.p);
      }
      static getNonConversionObject() {
        return {
          applyStepsToNormalizedParameterValue: function (t) {
            return t;
          },
          convertToNormalizedParameterValue: function (t) {
            return t;
          },
          convertFromNormalizedParameterValue: function (t) {
            return t;
          },
          getNumParameters: function () {
            return 0;
          },
          constrainParameterValue: function (t) {
            return t;
          },
          isPolyphonic: false,
          subpatches: []
        };
      }
      static deserializeConversion(t) {
        if (t) {
          const e = {};
          const r = Object.keys(t);
          for (let n = 0; n < r.length; n++) {
            const i = r[n];
            if (i === "subpatches") {
              const r = Object.keys(t.subpatches);
              for (let n = 0; n < r.length; n++) {
                const i = r[n];
                const s = t.subpatches[i];
                const o = h.deserializeConversion(s);
                if (s.isPolyphonic) {
                  e[i] = [o];
                } else {
                  e[i] = o;
                }
              }
            } else {
              e[i] = a.evalFunction(t[i]);
            }
          }
          return e;
        }
        return this.getNonConversionObject();
      }
      getSampleRate() {
        return this.l;
      }
      getSamplesPerBlock() {
        return this.p;
      }
      sampsToMs(t) {
        return t / this.l * 1000;
      }
      getNumInputChannels() {
        if (this._) {
          return this._.numInputChannels;
        } else {
          return 0;
        }
      }
      getNumOutputChannels() {
        if (this._) {
          return this._.numOutputChannels;
        } else {
          return 0;
        }
      }
      getNumMIDIInputPorts() {
        if (this._) {
          return this._.numMidiInputPorts;
        } else {
          return 0;
        }
      }
      getNumMIDIOutputPorts() {
        if (this._) {
          return this._.numMidiOutputPorts;
        } else {
          return 0;
        }
      }
      getNumParameters() {
        if (this._) {
          return this._.numParameters;
        } else {
          return 0;
        }
      }
      getNumSignalInParameters() {
        if (this._) {
          return this._.numSignalInParameters;
        } else {
          return 0;
        }
      }
      getNumSignalOutParameters() {
        if (this._) {
          return this._.numSignalOutParameters;
        } else {
          return 0;
        }
      }
      getPatcherSerial() {
        if (this._ !== undefined) {
          return this._.patcherSerial;
        } else {
          return 0;
        }
      }
      getParameterName(t) {
        if (!this._ || t >= this._.parameters.length) {
          throw new Error(`Parameter index ${t} out of bounds.`);
        }
        return this._.parameters[t].name;
      }
      getParameterId(t) {
        if (!this._ || t >= this._.parameters.length) {
          throw new Error(`Parameter index ${t} out of bounds.`);
        }
        return this._.parameters[t].paramId;
      }
      getParameterToNormalizedFunction(t) {
        return e => this.g.convertToNormalizedParameterValue(t, e);
      }
      getParameterFromNormalizedFunction(t) {
        return e => this.g.convertFromNormalizedParameterValue(t, e);
      }
      constrainParameterValue(t) {
        return e => this.g.constrainParameterValue(t, e);
      }
      getParameterInfo(t) {
        if (!this._ || t >= this._.parameters.length) {
          throw new Error(`Parameter index ${t} out of bounds.`);
        }
        const e = this._.parameters[t];
        let r;
        let n;
        switch (e.type) {
          case "ParameterTypeBang":
            n = a.ParameterTypeBang;
            break;
          case "ParameterTypeCount":
            n = a.ParameterTypeCount;
            break;
          case "ParameterTypeList":
            n = a.ParameterTypeList;
            break;
          case "ParameterTypeNumber":
            n = a.ParameterTypeNumber;
            break;
          case "ParameterTypeSignal":
            n = a.ParameterTypeSignal;
            break;
          default:
            throw new Error(`Unknown Parameter Type from patcher description ${e.type}`);
        }
        switch (e.ioType) {
          case "IOTypeInput":
            r = a.IOTypeInput;
            break;
          case "IOTypeOutput":
            r = a.IOTypeOutput;
            break;
          case "IOTypeUndefined":
            r = a.IOTypeUndefined;
            break;
          default:
            throw new Error(`Unknown Parameter IOType from patcher description ${e.type}`);
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
        };
      }
      getNumExternalDataRefs() {
        if (this._ !== undefined) {
          return this._.externalDataRefs.length;
        } else {
          return 0;
        }
      }
      getExternalDataId(t) {
        if (this._ !== undefined) {
          return this._.externalDataRefs[t].id;
        } else {
          return "";
        }
      }
      getExternalDataRefIds() {
        let t;
        if (this._) {
          t = [];
          Object.keys(this._.externalDataRefs).forEach(e => {
            let r = this._.externalDataRefs[e];
            t.push(r.id);
          });
        }
        return t;
      }
      getExternalDataRefInfos() {
        if (this._ !== undefined) {
          return this._.externalDataRefs;
        } else {
          return [];
        }
      }
      getNumMessages() {
        if (this._ !== undefined) {
          return this._.inports.length + this._.outports.length;
        } else {
          return 0;
        }
      }
      getMessageInfos() {
        let t = [];
        if (this._ !== undefined) {
          Object.keys(this._.outports).forEach(e => {
            t.push({
              tag: this._.outports[e].tag,
              type: i.Outport,
              meta: this._.outports[e].meta
            });
          });
          Object.keys(this._.inports).forEach(e => {
            t.push({
              tag: this._.inports[e].tag,
              type: i.Inport,
              meta: this._.inports[e].meta
            });
          });
        }
        return t;
      }
      removeAllSubscriptions() {
        this.outgoingEvent.removeAllSubscriptions();
        this.parameterChangeEvent.removeAllSubscriptions();
      }
      invalidateProcessor() {}
      setPatcherDesc(t) {
        return e(this, undefined, undefined, function* () {
          this._ = t;
          this.g = h.deserializeConversion(this._.paramConversion);
        });
      }
    }
    var f;
    var c;
    var l;
    var d;
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
    })(f ||= {});
    class p {
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
    class m extends p {
      constructor(t, e, r, n) {
        super(t, n);
        this.type = f.ClockEvent;
        this.clockIndex = e;
        this.value = r;
      }
      get hasValue() {
        return this.value !== undefined;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          clockIndex: this.clockIndex,
          type: this.type,
          value: this.value
        });
      }
    }
    (function (t) {
      t[t.Update = 1] = "Update";
    })(c ||= {});
    class _ extends p {
      constructor(t, e, r, n) {
        super(t, n);
        this.type = f.DataRefEvent;
        this.dataRefIndex = e;
        this.action = r;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          action: this.action,
          dataRefIndex: this.dataRefIndex,
          type: this.type
        });
      }
    }
    class g extends p {
      constructor(t, e, r, n = "", i) {
        super(t, i);
        this.type = f.MessageEvent;
        this.objectId = n;
        this.tag = e;
        this.payload = r;
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
    class y extends p {
      constructor(t, e, r, n) {
        super(t, n);
        this.type = f.MIDIEvent;
        if (r.length > 3) {
          throw new Error(`MIDIData can only contain a maximum of 3 bytes. Received ${r.length}`);
        }
        this.data = r;
        if (this.data.length < 3) {
          const t = r.length;
          this.data.length = 3;
          this.data = this.data.fill(undefined, t, 3);
        }
        let i = 0;
        for (let t = 0; t < 3; t++) {
          if (r[t] !== undefined) {
            i++;
          }
        }
        if (i < 1) {
          throw new Error("MIDIData must at least have the first byte set.");
        }
        this.length = i;
        this.status = r[0] & 240;
        this.channel = r[0] & 15;
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
    class b extends p {
      constructor(t, e, r, n, i) {
        super(t, i);
        this.type = f.ParameterEvent;
        this.target = e;
        this.value = r;
        this.source = n;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          target: this.target,
          type: this.type,
          value: this.value
        });
      }
    }
    class I extends p {
      constructor(t, e, r) {
        super(t, r);
        this.type = f.ParameterBangEvent;
        this.target = e;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          target: this.target,
          type: this.type
        });
      }
    }
    (function (t) {
      t[t.Set = 1] = "Set";
      t[t.Touched = 2] = "Touched";
    })(l ||= {});
    class w extends p {
      constructor(t, e, r) {
        super(t, undefined);
        this.type = f.PresetEvent;
        this.action = e;
        this.preset = r;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          action: this.action,
          type: this.type,
          preset: this.preset
        });
      }
    }
    class v extends p {
      constructor(t, e) {
        super(t, undefined);
        this.type = f.TransportEvent;
        this.state = e;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          state: this.state,
          type: this.type
        });
      }
    }
    class M extends p {
      constructor(t, e) {
        super(t, undefined);
        this.type = f.TempoEvent;
        this.tempo = e;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          tempo: this.tempo,
          type: this.type
        });
      }
    }
    class E extends p {
      constructor(t, e) {
        super(t, undefined);
        this.type = f.BeatTimeEvent;
        this.beattime = e;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          beattime: this.beattime,
          type: this.type
        });
      }
    }
    class S extends p {
      constructor(t, e, r) {
        super(t, undefined);
        this.type = f.TimeSignatureEvent;
        this.numerator = e;
        this.denominator = r;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          numerator: this.numerator,
          denominator: this.denominator,
          type: this.type
        });
      }
    }
    (function (t) {
      t[t.BEGIN = 0] = "BEGIN";
      t[t.END = 1] = "END";
    })(d ||= {});
    class T extends p {
      constructor(t, e) {
        super(t, undefined);
        this.type = f.StartupEvent;
        this.phase = e;
      }
      serialize() {
        return Object.assign(super.serialize(), {
          phase: this.phase,
          type: this.type
        });
      }
    }
    const B = __webpack_require__(264);
    function A(t, e) {
      return t.time - e.time;
    }
    function P(t) {
      t.sort(A);
    }
    class O extends h {
      constructor() {
        super();
        this.I = false;
        this.v = false;
        this.M = undefined;
        this.S = -1;
        this.T = [];
        this.I = false;
        this.setPatcherDesc(B.desc);
        this.setPatcherCode(B.src[0].code);
      }
      B(t) {
        const e = t.eventTarget || this.A;
        t.time = Math.max(t.time, this.h);
        this.M = t;
        if (t.type === f.ParameterEvent) {
          const r = t;
          e.setParameterValue(r.target, r.value, t.time);
        } else if (t.type === f.ParameterBangEvent) {
          const r = t;
          e.processParameterBangEvent(r.target, t.time);
        } else if (t.type === f.MIDIEvent) {
          const r = t;
          e.processMidiEvent(r.time, r.port, r.data, r.length);
        } else if (t.type === f.ClockEvent) {
          const r = t;
          e.processClockEvent(r.time, r.clockIndex, r.hasValue, r.value);
        } else if (t.type === f.DataRefEvent) {
          const r = t;
          if (r.action === c.Update) {
            e.processDataViewUpdate(r.dataRefIndex, r.time);
          }
        } else if (t.type === f.MessageEvent) {
          const r = t;
          if (Array.isArray(r.payload)) {
            e.processListMessage(a.TAG(r.tag), a.TAG(r.objectId), r.time, r.payload);
          } else if (r.payload === undefined) {
            e.processBangMessage(a.TAG(r.tag), a.TAG(r.objectId), r.time);
          } else {
            e.processNumMessage(a.TAG(r.tag), a.TAG(r.objectId), r.time, r.payload);
          }
        } else if (t.type === f.PresetEvent) {
          const e = t;
          if (e.action === l.Set) {
            this.v = true;
            this.A.setPreset(e.time, e.preset);
            this.v = false;
          }
        } else if (t.type === f.TransportEvent) {
          const e = t;
          this.A.processTransportEvent(e.time, e.state);
        } else if (t.type === f.TempoEvent) {
          const e = t;
          this.A.processTempoEvent(e.time, e.tempo);
        } else if (t.type === f.BeatTimeEvent) {
          const e = t;
          this.A.processBeatTimeEvent(e.time, e.beattime);
        } else if (t.type === f.TimeSignatureEvent) {
          const e = t;
          this.A.processTimeSignatureEvent(e.time, e.numerator, e.denominator);
        } else if (t.type === f.StartupEvent) {
          const e = t;
          this.v = e.phase === d.BEGIN;
        }
        this.M = undefined;
      }
      getCurrentTime() {
        return this.h;
      }
      setCurrentTime(t) {
        this.h = t;
      }
      prepareToProcess(t, e, r) {
        if (r || t !== this.l || e !== this.p) {
          this.l = t;
          this.p = e;
          this.m = this.sampsToMs(this.p);
          if (this.isSync) {
            this.A.prepareToProcess(this.l, this.p);
          }
        }
      }
      process(t, e, r, n, i, s, o) {
        const u = Math.min(e, this.getNumInputChannels() + this.getNumSignalInParameters());
        const a = Math.min(n, this.getNumOutputChannels());
        const h = Math.min(i, this.p);
        this.S = this.h + this.m;
        if (this.midiInput !== undefined) {
          this.T.push.apply(this.T, s);
          this.I = true;
        }
        if (this.I) {
          P(this.T);
          this.I = false;
        }
        while (this.T.length > 0 && this.T[0].time < this.S) {
          this.B(this.T.shift());
        }
        this.A.process(t, u, r, a, h);
        this.h = this.S;
        this.S = -1;
      }
      scheduleMidiEvent(t, e) {
        this.scheduleEvent(new y(this.h, t, e, this.A));
      }
      notifyParameterValueChanged(t, e) {
        let r = this.M ? this.M.source : undefined;
        this.parameterChangeEvent.emit(new b(this.getCurrentTime(), t, e, r));
      }
      scheduleParameterChange(t, e, r) {
        this.scheduleEvent(new b(this.getCurrentTime(), t, e, undefined));
      }
      scheduleParameterBang(t, e) {
        this.scheduleEvent(new I(this.getCurrentTime(), t));
      }
      sendNumMessage(t, e, r) {
        const n = new g(this.h, this.A.resolveTag(t), r, this.A.resolveTag(e));
        this.outgoingEvent.emit(n);
      }
      sendBangMessage(t, e) {
        const r = new g(this.h, this.A.resolveTag(t), undefined, this.A.resolveTag(e));
        this.outgoingEvent.emit(r);
      }
      sendListMessage(t, e, r) {
        const n = new g(this.h, this.A.resolveTag(t), r, this.A.resolveTag(e));
        this.outgoingEvent.emit(n);
      }
      getParameterValue(t) {
        return this.A.getParameterValue(t);
      }
      flushClockEvents(t, e, r) {
        this.flushClockEventsWithValue(t, e, undefined, r);
      }
      flushClockEventsWithValue(t, e, r, n) {
        for (let i = 0; i < this.T.length; i++) {
          if (this.T[i] instanceof m) {
            const s = this.T[i];
            if (s.eventTarget === t && (s.clockIndex === e || s.clockIndex === undefined) && (r === undefined || s.value === r)) {
              this.T.splice(i, 1);
              if (n) {
                this.B(s);
              }
              i--;
            }
          }
        }
      }
      deleteClockEvents(t) {
        this.flushClockEvents(t, undefined, false);
      }
      scheduleClockEvent(t, e, r) {
        this.scheduleClockEventWithValue(t, e, r, undefined);
      }
      scheduleClockEventWithValue(t, e, r, n) {
        this.scheduleEvent(new m(r, e, n, t));
      }
      sendMidiEvent(t, e, r, n) {
        const i = new y(this.getCurrentTime(), t, [e, r, n], undefined);
        this.outgoingEvent.emit(i);
      }
      sendMidiEventList(t, e) {
        let r;
        for (r = 2; r < e.length; r += 3) {
          this.sendMidiEvent(t, e[r - 2], e[r - 1], e[r]);
        }
        r -= 3;
        if (r < e.length) {
          var n = r - e.length;
          this.sendMidiEvent(t, e[r], n > 1 ? e[r + 1] : undefined, n > 2 ? e[r + 2] : undefined);
        }
      }
      sendOutlet(t, e, r) {
        console.log("sendOutlet", t, e, r);
      }
      updatePatcherEventTarget(t, e) {
        for (let r = 0; r < this.T.length; r++) {
          if (this.T[r].eventTarget === t) {
            this.T[r].eventTarget = e;
            this.T[r].invalid = false;
          }
        }
      }
      rescheduleEventTarget(t) {
        for (let e = 0; e < this.T.length; e++) {
          if (this.T[e].eventTarget === t) {
            this.T[e].invalid = false;
          }
        }
      }
      isInProcess() {
        return this.S > -1;
      }
      sendDataRefUpdated(t) {
        this.scheduleEvent(new _(this.getCurrentTime(), t, c.Update, this.A));
      }
      get isSync() {
        return true;
      }
      scheduleEvent(t) {
        this.T.push(t);
        if (this.isInProcess()) {
          P(this.T);
        } else {
          this.I = true;
        }
      }
      setPatcherCode(t) {
        return e(this, undefined, undefined, function* () {
          const e = {};
          if (this.A) {
            this.A.extractState(e);
          }
          this.A = a.deserializeSrc(t);
          for (let t = 0; t < this.T.length; t++) {
            if (this.T[t].eventTarget) {
              this.T[t].invalid = true;
            }
          }
          this.A.setEngineAndPatcher(this, null);
          this.scheduleEvent(new T(this.h, d.BEGIN));
          this.A.initialize(e);
          this.scheduleEvent(new T(this.h, d.END));
          this.A.prepareToProcess(this.l, this.p, true);
          for (let t = this.T.length - 1; t >= 0; t--) {
            if (this.T[t].invalid) {
              this.T.splice(t, 1);
            }
          }
        });
      }
      setExternalData(t, r, i) {
        return e(this, undefined, undefined, function* () {
          const e = this.A.getNumDataRefs();
          for (let s = 0; s < e; s++) {
            const e = this.A.getDataRef(s);
            if (e.name == t) {
              e.arrayBuffer = r;
              if (i instanceof n) {
                e.channels = i.channels;
                e.sampleRate = i.sampleRate;
              }
              this.sendDataRefUpdated(s);
              break;
            }
          }
        });
      }
      releaseExternalData(t) {
        return e(this, undefined, undefined, function* () {
          const e = this.A.getNumDataRefs();
          let i;
          let s;
          for (let o = 0; o < e; o++) {
            const e = this.A.getDataRef(o);
            if (e.name == t) {
              i = e.arrayBuffer;
              e.arrayBuffer = new ArrayBuffer(0);
              if (e.channels) {
                s = new n(e.channels, e.sampleRate);
                e.channels = 0;
                e.sampleRate = 0;
              } else {
                s = new r();
              }
              this.sendDataRefUpdated(o);
              break;
            }
          }
          if (!i) {
            throw new Error(`Invalid DataBuffer. No DataBuffer with id ${t} found.`);
          }
          return {
            data: i,
            typeDesc: s
          };
        });
      }
      getPreset() {
        return e(this, undefined, undefined, function* () {
          let t = {};
          this.A.getPreset(t);
          return t;
        });
      }
      setPreset(t) {
        this.scheduleEvent(new w(this.h, l.Set, t));
      }
      presetTouched() {
        if (!this.v) {
          this.outgoingEvent.emit(new w(this.h, l.Touched, undefined));
        }
      }
    }
    var N;
    var D;
    function R(t) {
      return class extends t {
        constructor(...t) {
          super();
          this.changeEvent = new u();
          this.P = new u();
          const e = t[0];
          this.O = e.notificationSetting;
          this.convertFromNormalizedValue = e.scaling.convertFromNormalized;
          this.convertToNormalizedValue = e.scaling.convertToNormalized;
          this.constrainParameterValue = e.scaling.constrainParameterValue;
          this.initialValue = e.initialValue;
          this.N = e.initialValue;
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
          return this.O;
        }
        get normalizedValue() {
          return this.convertToNormalizedValue(this.N);
        }
        set normalizedValue(t) {
          this.D(this.convertFromNormalizedValue(t));
        }
        R(t) {
          this.O = t;
        }
        D(t) {
          t = this.constrainParameterValue(t);
          if (this.N !== t) {
            this.N = t;
            this.P.emit(this);
            if (this.notificationSetting === D.All) {
              this.changeEvent.emit(t);
            }
          }
        }
        C(t) {
          this.N = t;
          this.changeEvent.emit(t);
        }
      };
    }
    (function (t) {
      t[t.Number = 0] = "Number";
      t[t.Bang = 1] = "Bang";
      t[t.List = 2] = "List";
      t[t.Signal = 3] = "Signal";
      t[t.Count = 4] = "Count";
      t[t.Enum = 5] = "Enum";
    })(N ||= {});
    (function (t) {
      t[t.All = 0] = "All";
      t[t.Internal = 1] = "Internal";
    })(D ||= {});
    R(Object);
    R(Object);
    R(Object);
    class x {
      constructor() {
        this.k = {};
        this.U = new Float32Array(128);
      }
      addParam(t, e) {
        if (t.type == a.ParameterTypeSignal && t.ioType === a.IOTypeInput) {
          this.k[t.signalIndex] = {
            name: e,
            param: new Float32Array(128)
          };
        }
      }
      getParamName(t) {
        let e = this.k[t];
        if (e !== undefined) {
          return e.name;
        } else {
          return undefined;
        }
      }
      getParamArray(t, e, r) {
        if (e.length == r) {
          return e;
        }
        {
          let n = this.k[t];
          if (n.param.length != r) {
            n.param = new Float32Array(r);
          }
          return n.param.fill(e[0]);
        }
      }
    }
    var C;
    var k;
    (function (t) {
      t[t.LoadPatcher = 0] = "LoadPatcher";
      t[t.ScheduleEvent = 1] = "ScheduleEvent";
      t[t.TransferBuffer = 2] = "TransferBuffer";
      t[t.ReleaseBuffer = 3] = "ReleaseBuffer";
      t[t.SetPreset = 4] = "SetPreset";
      t[t.GetPreset = 5] = "GetPreset";
      t[t.Invalidate = 6] = "Invalidate";
    })(C ||= {});
    (function (t) {
      t[t.LoadPatcherFinished = 1000] = "LoadPatcherFinished";
      t[t.OutgoingEvent = 1002] = "OutgoingEvent";
      t[t.ReleasedBuffer = 1003] = "ReleasedBuffer";
      t[t.TransferBufferFinished = 1004] = "TransferBufferFinished";
      t[t.GetPresetResponse = 1005] = "GetPresetResponse";
    })(k ||= {});
    var U = __webpack_require__(834).Buffer;
    const z = JSON.parse(U.from(RNBO_PATCHER_DESC, "base64").toString("utf-8"));
    const j = U.from(RNBO_PATCHER_SRC, "base64").toString("utf-8");
    class X extends AudioWorkletProcessor {
      constructor(i) {
        super(i);
        this.j = new O();
        this.X = [];
        this.F = [];
        this.$ = new x();
        this.V = i => e(this, undefined, undefined, function* () {
          switch (i.data[0]) {
            case C.LoadPatcher:
              yield this.j.setPatcherDesc(z);
              yield this.j.setPatcherCode(j);
              for (let t = 0; t < this.j.getNumParameters(); t++) {
                const e = this.j.getParameterInfo(t);
                this.$.addParam(e, this.j.getParameterName(t));
              }
              this.X = new Array(this.j.getNumInputChannels() + this.j.getNumSignalInParameters());
              this.F = new Array(this.j.getNumOutputChannels() + this.j.getNumSignalOutParameters());
              this.j.process([], 0, [[]], 1, 0);
              this.port.postMessage([k.LoadPatcherFinished]);
              break;
            case C.ScheduleEvent:
              this.j.scheduleEvent((t => {
                switch (t.type) {
                  case f.ClockEvent:
                    return new m(t.time, t.clockIndex, t.value, t.eventTarget);
                  case f.DataRefEvent:
                    return new _(t.time, t.dataRefIndex, t.action, t.eventTarget);
                  case f.MessageEvent:
                    return new g(t.time, t.tag, t.payload, t.objectId, t.eventTarget);
                  case f.MIDIEvent:
                    return new y(t.time, t.port, t.data, t.eventTarget);
                  case f.ParameterEvent:
                    return new b(t.time, t.target, t.value, t.source, t.eventTarget);
                  case f.ParameterBangEvent:
                    return new I(t.time, t.target, t.eventTarget);
                  case f.PresetEvent:
                    return new w(t.time, t.action, t.preset);
                  case f.TransportEvent:
                    return new v(t.time, t.state);
                  case f.TempoEvent:
                    return new M(t.time, t.tempo);
                  case f.BeatTimeEvent:
                    return new E(t.time, t.beattime);
                  case f.TimeSignatureEvent:
                    return new S(t.time, t.numerator, t.denominator);
                  case f.StartupEvent:
                    return new T(t.time, t.phase);
                  default:
                    throw new Error(`Unable to deserialize RNBOEvent of type ${t.type}`);
                }
              })(i.data[1]));
              break;
            case C.TransferBuffer:
              {
                const e = i.data[1];
                this.j.setExternalData(e.memoryId, e.data, (e => {
                  switch (e.type) {
                    case t.Float32Audio:
                      return new n(e.channels, e.sampleRate);
                    case t.TypedArray:
                      return new r();
                    default:
                      throw new Error(`Unable to deserialize RNBODataDesc of type ${e.type}`);
                  }
                })(e.typeDesc));
                this.port.postMessage([k.TransferBufferFinished, {
                  memoryId: e.memoryId
                }]);
                break;
              }
            case C.ReleaseBuffer:
              {
                const t = i.data[1];
                const {
                  data: e,
                  typeDesc: r
                } = yield this.j.releaseExternalData(t.memoryId);
                this.port.postMessage([k.ReleasedBuffer, {
                  memoryId: t.memoryId,
                  data: e,
                  typeDesc: r.serialize()
                }], [e]);
                break;
              }
            case C.GetPreset:
              {
                const t = yield this.j.getPreset();
                this.port.postMessage([k.GetPresetResponse, {
                  preset: t
                }]);
                break;
              }
            case C.SetPreset:
              {
                const t = i.data[1];
                this.j.setPreset(t.preset);
              }
          }
        });
        this.L = t => {
          this.port.postMessage([k.OutgoingEvent, t.serialize()]);
        };
        this.q = t => {
          this.port.postMessage([k.OutgoingEvent, t.serialize()]);
        };
        this.j.outgoingEvent.subscribe(this.L);
        this.j.parameterChangeEvent.subscribe(this.q);
        this.port.onmessage = this.V;
        this.port.start();
      }
      static get parameterDescriptors() {
        return RNBO_PARAM_DESCRIPTORS;
      }
      process(t, e, r) {
        let n;
        let i;
        let s = 0;
        let o = 0;
        for (n = 0; n < t.length; n++) {
          const e = t[n];
          for (i = 0; i < e.length && s < this.X.length && e[i].length; i++) {
            this.X[s] = e[i];
            s++;
          }
        }
        for (n = 0; n < e.length; n++) {
          const t = e[n];
          for (i = 0; i < t.length && o < this.F.length; i++) {
            this.F[o] = t[i];
            o++;
          }
        }
        let u = 0;
        if (o > 0 && this.F.length && this.F[0]) {
          u = this.F[0].length;
        } else if (e.length && e[0] && e[0].length && e[0][0]) {
          u = e[0][0].length;
        } else if (s > 0 && this.X.length && this.X[0]) {
          u = this.X[0].length;
        } else if (t.length && t[0] && t[0].length && t[0][0]) {
          u = t[0][0].length;
        }
        u ||= 128;
        for (let t = s; t < this.X.length; t++) {
          const e = this.$.getParamName(t);
          if (e !== undefined) {
            this.X[t] = this.$.getParamArray(t, r[e], u);
            s++;
          }
        }
        this.j.setCurrentTime(currentTime * 1000);
        this.j.prepareToProcess(sampleRate, u);
        this.j.process(this.X, s, this.F, o, u);
        return true;
      }
    }
    registerProcessor(RNBO_PROCESSOR_NAME || "RNBOProcessor", X);
  })();
})();