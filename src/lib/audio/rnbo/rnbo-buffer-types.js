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
function a(t, e, r) {
  const n = this.getChannels();
  if (!(t < 0) && !(t >= n) && !(e < 0) && !(e >= this.getSize())) {
    this[n * Math.floor(e) + t] = r;
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
    b(e, this.dataRef, this.BASEARRAYVIEW);
    if (this.isAudioBuffer) {
      I(e);
    }
    e.reinitConstructor = this.reinitConstructor;
    return e;
  }
  return this;
}
function p(t) {
  let e = this.getChannels();
  this.requestedChannels = e;
  this.dataRef.requestSizeInBytes(t * this.BASEARRAYVIEW.BYTES_PER_ELEMENT * e, true);
  return this.allocateIfNeeded();
}
function d() {
  if (this.fill) {
    this.fill(0);
  }
}
function g() {
  return this.touched;
}
function m(t) {
  this.touched = t;
}
function _(t) {
  this.dataRef.setWantsFill(t);
}
function y() {
  return this.dataRef.getIndex();
}
function v() {
  return 0;
}
function b(t, n, i) {
  t.dataRef = n;
  t.BASEARRAYVIEW = i;
  t.getSize = e;
  t.requestSize = r;
  t.setSize = p;
  t.allocateIfNeeded = l;
  t.setZero = d;
  t.clear = f;
  t.getChannels = o;
  t.getSampleRate = u;
  t.setWantsFill = _;
  t.getIndex = y;
  n.setZero = function () {
    t.setZero();
  };
  t.touched = false;
  t.getTouched = g;
  t.setTouched = m;
}
function I(t) {
  t.getSample = n;
  t.getSampleSafe = i;
  t.setSample = s;
  t.setSampleSafe = a;
  t.setChannels = c;
  t.setSampleRate = h;
  t.isAudioBuffer = true;
  t.requestedChannels = 0;
  t.getCurrentIndex = v;
}
let w = function (t, e) {
  let r;
  r = t.arrayBuffer ? new e(t.arrayBuffer) : {};
  b(r, t, e);
  r.reinitConstructor = this.constructor;
  return r;
};
(w.prototype = Object.create(null)).constructor = w;
let E = function (t, e) {
  let r = w.call(this, t, e);
  I(r);
  return r;
};
(E.prototype = Object.create(w)).constructor = E;
let M = function (t) {
  return E.call(this, t, Float32Array);
};
(M.prototype = Object.create(E.prototype)).constructor = M;
let A = function (t) {
  return E.call(this, t, Float64Array);
};
(A.prototype = Object.create(E.prototype)).constructor = A;
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
let S = function (t) {
  return T.call(this, t, M);
};
(S.prototype = Object.create(T.prototype)).constructor = S;
let B = function (t) {
  return T.call(this, t, A);
};
(B.prototype = Object.create(T.prototype)).constructor = B;
let P = function (t) {
  return w.call(this, t, Int32Array);
};
(P.prototype = Object.create(w.prototype)).constructor = P;
let R = function (t) {
  return w.call(this, t, Uint8Array);
};
(R.prototype = Object.create(w.prototype)).constructor = R;
export { M as Float32Buffer, A as Float64Buffer, A as SampleBuffer, S as Float32MultiBuffer, B as Float64MultiBuffer, P as IntBuffer, R as UInt8Buffer };