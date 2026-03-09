/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
import * as n from "./base64-codec.js";
import * as i from "./ieee754.js";
const s = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
export var Buffer = u;
export var SlowBuffer = function (t) {
  if (+t != t) {
    t = 0;
  }
  return u.alloc(+t);
};
export var INSPECT_MAX_BYTES = 50;
const a = 2147483647;
function o(t) {
  if (t > a) {
    throw new RangeError("The value \"" + t + "\" is invalid for option \"size\"");
  }
  const e = new Uint8Array(t);
  Object.setPrototypeOf(e, u.prototype);
  return e;
}
function u(t, e, r) {
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
      if (!u.isEncoding(e)) {
        throw new TypeError("Unknown encoding: " + e);
      }
      const r = g(t, e) | 0;
      let n = o(r);
      const i = n.write(t, e);
      if (i !== r) {
        n = n.slice(0, i);
      }
      return n;
    }(t, e);
  }
  if (ArrayBuffer.isView(t)) {
    return function (t) {
      if (Y(t, Uint8Array)) {
        const e = new Uint8Array(t);
        return p(e.buffer, e.byteOffset, e.byteLength);
      }
      return l(t);
    }(t);
  }
  if (t == null) {
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
  }
  if (Y(t, ArrayBuffer) || t && Y(t.buffer, ArrayBuffer)) {
    return p(t, e, r);
  }
  if (typeof SharedArrayBuffer != "undefined" && (Y(t, SharedArrayBuffer) || t && Y(t.buffer, SharedArrayBuffer))) {
    return p(t, e, r);
  }
  if (typeof t == "number") {
    throw new TypeError("The \"value\" argument must not be of type number. Received type number");
  }
  const n = t.valueOf && t.valueOf();
  if (n != null && n !== t) {
    return u.from(n, e, r);
  }
  const i = function (t) {
    if (u.isBuffer(t)) {
      const e = d(t.length) | 0;
      const r = o(e);
      if (r.length !== 0) {
        t.copy(r, 0, 0, e);
      }
      return r;
    }
    if (t.length !== undefined) {
      if (typeof t.length != "number" || Z(t.length)) {
        return o(0);
      } else {
        return l(t);
      }
    } else if (t.type === "Buffer" && Array.isArray(t.data)) {
      return l(t.data);
    } else {
      return undefined;
    }
  }(t);
  if (i) {
    return i;
  }
  if (typeof Symbol != "undefined" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] == "function") {
    return u.from(t[Symbol.toPrimitive]("string"), e, r);
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
  return o(t < 0 ? 0 : d(t) | 0);
}
function l(t) {
  const e = t.length < 0 ? 0 : d(t.length) | 0;
  const r = o(e);
  for (let n = 0; n < e; n += 1) {
    r[n] = t[n] & 255;
  }
  return r;
}
function p(t, e, r) {
  if (e < 0 || t.byteLength < e) {
    throw new RangeError("\"offset\" is outside of buffer bounds");
  }
  if (t.byteLength < e + (r || 0)) {
    throw new RangeError("\"length\" is outside of buffer bounds");
  }
  let n;
  n = e === undefined && r === undefined ? new Uint8Array(t) : r === undefined ? new Uint8Array(t, e) : new Uint8Array(t, e, r);
  Object.setPrototypeOf(n, u.prototype);
  return n;
}
function d(t) {
  if (t >= a) {
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a.toString(16) + " bytes");
  }
  return t | 0;
}
function g(t, e) {
  if (u.isBuffer(t)) {
    return t.length;
  }
  if (ArrayBuffer.isView(t) || Y(t, ArrayBuffer)) {
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
        return $(t).length;
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
            return $(t).length;
          }
        }
        e = ("" + e).toLowerCase();
        i = true;
    }
  }
}
function m(t, e, r) {
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
        return R(this, e, r);
      case "utf8":
      case "utf-8":
        return T(this, e, r);
      case "ascii":
        return B(this, e, r);
      case "latin1":
      case "binary":
        return P(this, e, r);
      case "base64":
        return A(this, e, r);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return D(this, e, r);
      default:
        if (n) {
          throw new TypeError("Unknown encoding: " + t);
        }
        t = (t + "").toLowerCase();
        n = true;
    }
  }
}
function _(t, e, r) {
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
  if (Z(r = +r)) {
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
    e = u.from(e, n);
  }
  if (u.isBuffer(e)) {
    if (e.length === 0) {
      return -1;
    } else {
      return v(t, e, r, n, i);
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
      return v(t, [e], r, n, i);
    }
  }
  throw new TypeError("val must be string, number or Buffer");
}
function v(t, e, r, n, i) {
  let s;
  let a = 1;
  let o = t.length;
  let u = e.length;
  if (n !== undefined && ((n = String(n).toLowerCase()) === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
    if (t.length < 2 || e.length < 2) {
      return -1;
    }
    a = 2;
    o /= 2;
    u /= 2;
    r /= 2;
  }
  function h(t, e) {
    if (a === 1) {
      return t[e];
    } else {
      return t.readUInt16BE(e * a);
    }
  }
  if (i) {
    let n = -1;
    for (s = r; s < o; s++) {
      if (h(t, s) === h(e, n === -1 ? 0 : s - n)) {
        if (n === -1) {
          n = s;
        }
        if (s - n + 1 === u) {
          return n * a;
        }
      } else {
        if (n !== -1) {
          s -= s - n;
        }
        n = -1;
      }
    }
  } else {
    if (r + u > o) {
      r = o - u;
    }
    s = r;
    for (; s >= 0; s--) {
      let r = true;
      for (let n = 0; n < u; n++) {
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
function b(t, e, r, n) {
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
  let a;
  if (n > s / 2) {
    n = s / 2;
  }
  a = 0;
  for (; a < n; ++a) {
    const n = parseInt(e.substr(a * 2, 2), 16);
    if (Z(n)) {
      return a;
    }
    t[r + a] = n;
  }
  return a;
}
function I(t, e, r, n) {
  return K($(e, t.length - r), t, r, n);
}
function w(t, e, r, n) {
  return K(function (t) {
    const e = [];
    for (let r = 0; r < t.length; ++r) {
      e.push(t.charCodeAt(r) & 255);
    }
    return e;
  }(e), t, r, n);
}
function E(t, e, r, n) {
  return K(G(e), t, r, n);
}
function M(t, e, r, n) {
  return K(function (t, e) {
    let r;
    let n;
    let i;
    const s = [];
    for (let a = 0; a < t.length && !((e -= 2) < 0); ++a) {
      r = t.charCodeAt(a);
      n = r >> 8;
      i = r % 256;
      s.push(i);
      s.push(n);
    }
    return s;
  }(e, t.length - r), t, r, n);
}
function A(t, e, r) {
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
    let a = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
    if (i + a <= r) {
      let r;
      let n;
      let o;
      let u;
      switch (a) {
        case 1:
          if (e < 128) {
            s = e;
          }
          break;
        case 2:
          r = t[i + 1];
          if ((r & 192) == 128) {
            u = (e & 31) << 6 | r & 63;
            if (u > 127) {
              s = u;
            }
          }
          break;
        case 3:
          r = t[i + 1];
          n = t[i + 2];
          if ((r & 192) == 128 && (n & 192) == 128) {
            u = (e & 15) << 12 | (r & 63) << 6 | n & 63;
            if (u > 2047 && (u < 55296 || u > 57343)) {
              s = u;
            }
          }
          break;
        case 4:
          r = t[i + 1];
          n = t[i + 2];
          o = t[i + 3];
          if ((r & 192) == 128 && (n & 192) == 128 && (o & 192) == 128) {
            u = (e & 15) << 18 | (r & 63) << 12 | (n & 63) << 6 | o & 63;
            if (u > 65535 && u < 1114112) {
              s = u;
            }
          }
      }
    }
    if (s === null) {
      s = 65533;
      a = 1;
    } else if (s > 65535) {
      s -= 65536;
      n.push(s >>> 10 & 1023 | 55296);
      s = s & 1023 | 56320;
    }
    n.push(s);
    i += a;
  }
  return function (t) {
    const e = t.length;
    if (e <= S) {
      return String.fromCharCode.apply(String, t);
    }
    let r = "";
    let n = 0;
    while (n < e) {
      r += String.fromCharCode.apply(String, t.slice(n, n += S));
    }
    return r;
  }(n);
}
export var kMaxLength = a;
u.TYPED_ARRAY_SUPPORT = function () {
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
if (!u.TYPED_ARRAY_SUPPORT && typeof console != "undefined" && typeof console.error == "function") {
  console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
}
Object.defineProperty(u.prototype, "parent", {
  enumerable: true,
  get: function () {
    if (u.isBuffer(this)) {
      return this.buffer;
    }
  }
});
Object.defineProperty(u.prototype, "offset", {
  enumerable: true,
  get: function () {
    if (u.isBuffer(this)) {
      return this.byteOffset;
    }
  }
});
u.poolSize = 8192;
u.from = function (t, e, r) {
  return h(t, e, r);
};
Object.setPrototypeOf(u.prototype, Uint8Array.prototype);
Object.setPrototypeOf(u, Uint8Array);
u.alloc = function (t, e, r) {
  return function (t, e, r) {
    f(t);
    if (t <= 0) {
      return o(t);
    } else if (e !== undefined) {
      if (typeof r == "string") {
        return o(t).fill(e, r);
      } else {
        return o(t).fill(e);
      }
    } else {
      return o(t);
    }
  }(t, e, r);
};
u.allocUnsafe = function (t) {
  return c(t);
};
u.allocUnsafeSlow = function (t) {
  return c(t);
};
u.isBuffer = function (t) {
  return t != null && t.t === true && t !== u.prototype;
};
u.compare = function (t, e) {
  if (Y(t, Uint8Array)) {
    t = u.from(t, t.offset, t.byteLength);
  }
  if (Y(e, Uint8Array)) {
    e = u.from(e, e.offset, e.byteLength);
  }
  if (!u.isBuffer(t) || !u.isBuffer(e)) {
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
u.isEncoding = function (t) {
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
u.concat = function (t, e) {
  if (!Array.isArray(t)) {
    throw new TypeError("\"list\" argument must be an Array of Buffers");
  }
  if (t.length === 0) {
    return u.alloc(0);
  }
  let r;
  if (e === undefined) {
    e = 0;
    r = 0;
    for (; r < t.length; ++r) {
      e += t[r].length;
    }
  }
  const n = u.allocUnsafe(e);
  let i = 0;
  for (r = 0; r < t.length; ++r) {
    let e = t[r];
    if (Y(e, Uint8Array)) {
      if (i + e.length > n.length) {
        if (!u.isBuffer(e)) {
          e = u.from(e);
        }
        e.copy(n, i);
      } else {
        Uint8Array.prototype.set.call(n, e, i);
      }
    } else {
      if (!u.isBuffer(e)) {
        throw new TypeError("\"list\" argument must be an Array of Buffers");
      }
      e.copy(n, i);
    }
    i += e.length;
  }
  return n;
};
u.byteLength = g;
u.prototype.t = true;
u.prototype.swap16 = function () {
  const t = this.length;
  if (t % 2 != 0) {
    throw new RangeError("Buffer size must be a multiple of 16-bits");
  }
  for (let e = 0; e < t; e += 2) {
    _(this, e, e + 1);
  }
  return this;
};
u.prototype.swap32 = function () {
  const t = this.length;
  if (t % 4 != 0) {
    throw new RangeError("Buffer size must be a multiple of 32-bits");
  }
  for (let e = 0; e < t; e += 4) {
    _(this, e, e + 3);
    _(this, e + 1, e + 2);
  }
  return this;
};
u.prototype.swap64 = function () {
  const t = this.length;
  if (t % 8 != 0) {
    throw new RangeError("Buffer size must be a multiple of 64-bits");
  }
  for (let e = 0; e < t; e += 8) {
    _(this, e, e + 7);
    _(this, e + 1, e + 6);
    _(this, e + 2, e + 5);
    _(this, e + 3, e + 4);
  }
  return this;
};
u.prototype.toString = function () {
  const t = this.length;
  if (t === 0) {
    return "";
  } else if (arguments.length === 0) {
    return T(this, 0, t);
  } else {
    return m.apply(this, arguments);
  }
};
u.prototype.toLocaleString = u.prototype.toString;
u.prototype.equals = function (t) {
  if (!u.isBuffer(t)) {
    throw new TypeError("Argument must be a Buffer");
  }
  return this === t || u.compare(this, t) === 0;
};
u.prototype.inspect = function () {
  let t = "";
  const r = INSPECT_MAX_BYTES;
  t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim();
  if (this.length > r) {
    t += " ... ";
  }
  return "<Buffer " + t + ">";
};
if (s) {
  u.prototype[s] = u.prototype.inspect;
}
u.prototype.compare = function (t, e, r, n, i) {
  if (Y(t, Uint8Array)) {
    t = u.from(t, t.offset, t.byteLength);
  }
  if (!u.isBuffer(t)) {
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
  let a = (r >>>= 0) - (e >>>= 0);
  const o = Math.min(s, a);
  const h = this.slice(n, i);
  const f = t.slice(e, r);
  for (let t = 0; t < o; ++t) {
    if (h[t] !== f[t]) {
      s = h[t];
      a = f[t];
      break;
    }
  }
  if (s < a) {
    return -1;
  } else if (a < s) {
    return 1;
  } else {
    return 0;
  }
};
u.prototype.includes = function (t, e, r) {
  return this.indexOf(t, e, r) !== -1;
};
u.prototype.indexOf = function (t, e, r) {
  return y(this, t, e, r, true);
};
u.prototype.lastIndexOf = function (t, e, r) {
  return y(this, t, e, r, false);
};
u.prototype.write = function (t, e, r, n) {
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
        return b(this, t, e, r);
      case "utf8":
      case "utf-8":
        return I(this, t, e, r);
      case "ascii":
      case "latin1":
      case "binary":
        return w(this, t, e, r);
      case "base64":
        return E(this, t, e, r);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return M(this, t, e, r);
      default:
        if (s) {
          throw new TypeError("Unknown encoding: " + n);
        }
        n = ("" + n).toLowerCase();
        s = true;
    }
  }
};
u.prototype.toJSON = function () {
  return {
    type: "Buffer",
    data: Array.prototype.slice.call(this.i || this, 0)
  };
};
const S = 4096;
function B(t, e, r) {
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
function R(t, e, r) {
  const n = t.length;
  if (!e || e < 0) {
    e = 0;
  }
  if (!r || r < 0 || r > n) {
    r = n;
  }
  let i = "";
  for (let n = e; n < r; ++n) {
    i += H[t[n]];
  }
  return i;
}
function D(t, e, r) {
  const n = t.slice(e, r);
  let i = "";
  for (let t = 0; t < n.length - 1; t += 2) {
    i += String.fromCharCode(n[t] + n[t + 1] * 256);
  }
  return i;
}
function O(t, e, r) {
  if (t % 1 != 0 || t < 0) {
    throw new RangeError("offset is not uint");
  }
  if (t + e > r) {
    throw new RangeError("Trying to access beyond buffer length");
  }
}
function N(t, e, r, n, i, s) {
  if (!u.isBuffer(t)) {
    throw new TypeError("\"buffer\" argument must be a Buffer instance");
  }
  if (e > i || e < s) {
    throw new RangeError("\"value\" argument is out of bounds");
  }
  if (r + n > t.length) {
    throw new RangeError("Index out of range");
  }
}
function C(t, e, r, n, i) {
  X(e, n, i, t, r, 7);
  let s = Number(e & BigInt(4294967295));
  t[r++] = s;
  s >>= 8;
  t[r++] = s;
  s >>= 8;
  t[r++] = s;
  s >>= 8;
  t[r++] = s;
  let a = Number(e >> BigInt(32) & BigInt(4294967295));
  t[r++] = a;
  a >>= 8;
  t[r++] = a;
  a >>= 8;
  t[r++] = a;
  a >>= 8;
  t[r++] = a;
  return r;
}
function k(t, e, r, n, i) {
  X(e, n, i, t, r, 7);
  let s = Number(e & BigInt(4294967295));
  t[r + 7] = s;
  s >>= 8;
  t[r + 6] = s;
  s >>= 8;
  t[r + 5] = s;
  s >>= 8;
  t[r + 4] = s;
  let a = Number(e >> BigInt(32) & BigInt(4294967295));
  t[r + 3] = a;
  a >>= 8;
  t[r + 2] = a;
  a >>= 8;
  t[r + 1] = a;
  a >>= 8;
  t[r] = a;
  return r + 8;
}
function x(t, e, r, n, i, s) {
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
    x(t, 0, r, 4);
  }
  i.write(t, e, r, n, 23, 4);
  return r + 4;
}
function z(t, e, r, n, s) {
  e = +e;
  r >>>= 0;
  if (!s) {
    x(t, 0, r, 8);
  }
  i.write(t, e, r, n, 52, 8);
  return r + 8;
}
u.prototype.slice = function (t, e) {
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
  Object.setPrototypeOf(n, u.prototype);
  return n;
};
u.prototype.readUintLE = u.prototype.readUIntLE = function (t, e, r) {
  t >>>= 0;
  e >>>= 0;
  if (!r) {
    O(t, e, this.length);
  }
  let n = this[t];
  let i = 1;
  let s = 0;
  while (++s < e && (i *= 256)) {
    n += this[t + s] * i;
  }
  return n;
};
u.prototype.readUintBE = u.prototype.readUIntBE = function (t, e, r) {
  t >>>= 0;
  e >>>= 0;
  if (!r) {
    O(t, e, this.length);
  }
  let n = this[t + --e];
  let i = 1;
  while (e > 0 && (i *= 256)) {
    n += this[t + --e] * i;
  }
  return n;
};
u.prototype.readUint8 = u.prototype.readUInt8 = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 1, this.length);
  }
  return this[t];
};
u.prototype.readUint16LE = u.prototype.readUInt16LE = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 2, this.length);
  }
  return this[t] | this[t + 1] << 8;
};
u.prototype.readUint16BE = u.prototype.readUInt16BE = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 2, this.length);
  }
  return this[t] << 8 | this[t + 1];
};
u.prototype.readUint32LE = u.prototype.readUInt32LE = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 4, this.length);
  }
  return (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216;
};
u.prototype.readUint32BE = u.prototype.readUInt32BE = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 4, this.length);
  }
  return this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
};
u.prototype.readBigUInt64LE = J(function (t) {
  V(t >>>= 0, "offset");
  const e = this[t];
  const r = this[t + 7];
  if (e === undefined || r === undefined) {
    q(t, this.length - 8);
  }
  const n = e + this[++t] * 256 + this[++t] * 65536 + this[++t] * 16777216;
  const i = this[++t] + this[++t] * 256 + this[++t] * 65536 + r * 16777216;
  return BigInt(n) + (BigInt(i) << BigInt(32));
});
u.prototype.readBigUInt64BE = J(function (t) {
  V(t >>>= 0, "offset");
  const e = this[t];
  const r = this[t + 7];
  if (e === undefined || r === undefined) {
    q(t, this.length - 8);
  }
  const n = e * 16777216 + this[++t] * 65536 + this[++t] * 256 + this[++t];
  const i = this[++t] * 16777216 + this[++t] * 65536 + this[++t] * 256 + r;
  return (BigInt(n) << BigInt(32)) + BigInt(i);
});
u.prototype.readIntLE = function (t, e, r) {
  t >>>= 0;
  e >>>= 0;
  if (!r) {
    O(t, e, this.length);
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
u.prototype.readIntBE = function (t, e, r) {
  t >>>= 0;
  e >>>= 0;
  if (!r) {
    O(t, e, this.length);
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
u.prototype.readInt8 = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 1, this.length);
  }
  if (this[t] & 128) {
    return (255 - this[t] + 1) * -1;
  } else {
    return this[t];
  }
};
u.prototype.readInt16LE = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 2, this.length);
  }
  const r = this[t] | this[t + 1] << 8;
  if (r & 32768) {
    return r | -65536;
  } else {
    return r;
  }
};
u.prototype.readInt16BE = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 2, this.length);
  }
  const r = this[t + 1] | this[t] << 8;
  if (r & 32768) {
    return r | -65536;
  } else {
    return r;
  }
};
u.prototype.readInt32LE = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 4, this.length);
  }
  return this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
};
u.prototype.readInt32BE = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 4, this.length);
  }
  return this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
};
u.prototype.readBigInt64LE = J(function (t) {
  V(t >>>= 0, "offset");
  const e = this[t];
  const r = this[t + 7];
  if (e === undefined || r === undefined) {
    q(t, this.length - 8);
  }
  const n = this[t + 4] + this[t + 5] * 256 + this[t + 6] * 65536 + (r << 24);
  return (BigInt(n) << BigInt(32)) + BigInt(e + this[++t] * 256 + this[++t] * 65536 + this[++t] * 16777216);
});
u.prototype.readBigInt64BE = J(function (t) {
  V(t >>>= 0, "offset");
  const e = this[t];
  const r = this[t + 7];
  if (e === undefined || r === undefined) {
    q(t, this.length - 8);
  }
  const n = (e << 24) + this[++t] * 65536 + this[++t] * 256 + this[++t];
  return (BigInt(n) << BigInt(32)) + BigInt(this[++t] * 16777216 + this[++t] * 65536 + this[++t] * 256 + r);
});
u.prototype.readFloatLE = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 4, this.length);
  }
  return i.read(this, t, true, 23, 4);
};
u.prototype.readFloatBE = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 4, this.length);
  }
  return i.read(this, t, false, 23, 4);
};
u.prototype.readDoubleLE = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 8, this.length);
  }
  return i.read(this, t, true, 52, 8);
};
u.prototype.readDoubleBE = function (t, e) {
  t >>>= 0;
  if (!e) {
    O(t, 8, this.length);
  }
  return i.read(this, t, false, 52, 8);
};
u.prototype.writeUintLE = u.prototype.writeUIntLE = function (t, e, r, n) {
  t = +t;
  e >>>= 0;
  r >>>= 0;
  if (!n) {
    N(this, t, e, r, Math.pow(2, r * 8) - 1, 0);
  }
  let i = 1;
  let s = 0;
  for (this[e] = t & 255; ++s < r && (i *= 256);) {
    this[e + s] = t / i & 255;
  }
  return e + r;
};
u.prototype.writeUintBE = u.prototype.writeUIntBE = function (t, e, r, n) {
  t = +t;
  e >>>= 0;
  r >>>= 0;
  if (!n) {
    N(this, t, e, r, Math.pow(2, r * 8) - 1, 0);
  }
  let i = r - 1;
  let s = 1;
  for (this[e + i] = t & 255; --i >= 0 && (s *= 256);) {
    this[e + i] = t / s & 255;
  }
  return e + r;
};
u.prototype.writeUint8 = u.prototype.writeUInt8 = function (t, e, r) {
  t = +t;
  e >>>= 0;
  if (!r) {
    N(this, t, e, 1, 255, 0);
  }
  this[e] = t & 255;
  return e + 1;
};
u.prototype.writeUint16LE = u.prototype.writeUInt16LE = function (t, e, r) {
  t = +t;
  e >>>= 0;
  if (!r) {
    N(this, t, e, 2, 65535, 0);
  }
  this[e] = t & 255;
  this[e + 1] = t >>> 8;
  return e + 2;
};
u.prototype.writeUint16BE = u.prototype.writeUInt16BE = function (t, e, r) {
  t = +t;
  e >>>= 0;
  if (!r) {
    N(this, t, e, 2, 65535, 0);
  }
  this[e] = t >>> 8;
  this[e + 1] = t & 255;
  return e + 2;
};
u.prototype.writeUint32LE = u.prototype.writeUInt32LE = function (t, e, r) {
  t = +t;
  e >>>= 0;
  if (!r) {
    N(this, t, e, 4, 4294967295, 0);
  }
  this[e + 3] = t >>> 24;
  this[e + 2] = t >>> 16;
  this[e + 1] = t >>> 8;
  this[e] = t & 255;
  return e + 4;
};
u.prototype.writeUint32BE = u.prototype.writeUInt32BE = function (t, e, r) {
  t = +t;
  e >>>= 0;
  if (!r) {
    N(this, t, e, 4, 4294967295, 0);
  }
  this[e] = t >>> 24;
  this[e + 1] = t >>> 16;
  this[e + 2] = t >>> 8;
  this[e + 3] = t & 255;
  return e + 4;
};
u.prototype.writeBigUInt64LE = J(function (t, e = 0) {
  return C(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
});
u.prototype.writeBigUInt64BE = J(function (t, e = 0) {
  return k(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
});
u.prototype.writeIntLE = function (t, e, r, n) {
  t = +t;
  e >>>= 0;
  if (!n) {
    const n = Math.pow(2, r * 8 - 1);
    N(this, t, e, r, n - 1, -n);
  }
  let i = 0;
  let s = 1;
  let a = 0;
  for (this[e] = t & 255; ++i < r && (s *= 256);) {
    if (t < 0 && a === 0 && this[e + i - 1] !== 0) {
      a = 1;
    }
    this[e + i] = (t / s >> 0) - a & 255;
  }
  return e + r;
};
u.prototype.writeIntBE = function (t, e, r, n) {
  t = +t;
  e >>>= 0;
  if (!n) {
    const n = Math.pow(2, r * 8 - 1);
    N(this, t, e, r, n - 1, -n);
  }
  let i = r - 1;
  let s = 1;
  let a = 0;
  for (this[e + i] = t & 255; --i >= 0 && (s *= 256);) {
    if (t < 0 && a === 0 && this[e + i + 1] !== 0) {
      a = 1;
    }
    this[e + i] = (t / s >> 0) - a & 255;
  }
  return e + r;
};
u.prototype.writeInt8 = function (t, e, r) {
  t = +t;
  e >>>= 0;
  if (!r) {
    N(this, t, e, 1, 127, -128);
  }
  if (t < 0) {
    t = 255 + t + 1;
  }
  this[e] = t & 255;
  return e + 1;
};
u.prototype.writeInt16LE = function (t, e, r) {
  t = +t;
  e >>>= 0;
  if (!r) {
    N(this, t, e, 2, 32767, -32768);
  }
  this[e] = t & 255;
  this[e + 1] = t >>> 8;
  return e + 2;
};
u.prototype.writeInt16BE = function (t, e, r) {
  t = +t;
  e >>>= 0;
  if (!r) {
    N(this, t, e, 2, 32767, -32768);
  }
  this[e] = t >>> 8;
  this[e + 1] = t & 255;
  return e + 2;
};
u.prototype.writeInt32LE = function (t, e, r) {
  t = +t;
  e >>>= 0;
  if (!r) {
    N(this, t, e, 4, 2147483647, -2147483648);
  }
  this[e] = t & 255;
  this[e + 1] = t >>> 8;
  this[e + 2] = t >>> 16;
  this[e + 3] = t >>> 24;
  return e + 4;
};
u.prototype.writeInt32BE = function (t, e, r) {
  t = +t;
  e >>>= 0;
  if (!r) {
    N(this, t, e, 4, 2147483647, -2147483648);
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
u.prototype.writeBigInt64LE = J(function (t, e = 0) {
  return C(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
u.prototype.writeBigInt64BE = J(function (t, e = 0) {
  return k(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
u.prototype.writeFloatLE = function (t, e, r) {
  return U(this, t, e, true, r);
};
u.prototype.writeFloatBE = function (t, e, r) {
  return U(this, t, e, false, r);
};
u.prototype.writeDoubleLE = function (t, e, r) {
  return z(this, t, e, true, r);
};
u.prototype.writeDoubleBE = function (t, e, r) {
  return z(this, t, e, false, r);
};
u.prototype.copy = function (t, e, r, n) {
  if (!u.isBuffer(t)) {
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
u.prototype.fill = function (t, e, r, n) {
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
    if (typeof n == "string" && !u.isEncoding(n)) {
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
    const s = u.isBuffer(t) ? t : u.from(t, n);
    const a = s.length;
    if (a === 0) {
      throw new TypeError("The value \"" + t + "\" is invalid for argument \"value\"");
    }
    for (i = 0; i < r - e; ++i) {
      this[i + e] = s[i % a];
    }
  }
  return this;
};
const j = {};
function F(t, e, r) {
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
function L(t) {
  let e = "";
  let r = t.length;
  const n = t[0] === "-" ? 1 : 0;
  for (; r >= n + 4; r -= 3) {
    e = `_${t.slice(r - 3, r)}${e}`;
  }
  return `${t.slice(0, r)}${e}`;
}
function X(t, e, r, n, i, s) {
  if (t > r || t < e) {
    const n = typeof e == "bigint" ? "n" : "";
    let i;
    i = s > 3 ? e === 0 || e === BigInt(0) ? `>= 0${n} and < 2${n} ** ${(s + 1) * 8}${n}` : `>= -(2${n} ** ${(s + 1) * 8 - 1}${n}) and < 2 ** ${(s + 1) * 8 - 1}${n}` : `>= ${e}${n} and <= ${r}${n}`;
    throw new j.ERR_OUT_OF_RANGE("value", i, t);
  }
  (function (t, e, r) {
    V(e, "offset");
    if (t[e] === undefined || t[e + r] === undefined) {
      q(e, t.length - (r + 1));
    }
  })(n, i, s);
}
function V(t, e) {
  if (typeof t != "number") {
    throw new j.ERR_INVALID_ARG_TYPE(e, "number", t);
  }
}
function q(t, e, r) {
  if (Math.floor(t) !== t) {
    V(t, r);
    throw new j.ERR_OUT_OF_RANGE(r || "offset", "an integer", t);
  }
  if (e < 0) {
    throw new j.ERR_BUFFER_OUT_OF_BOUNDS();
  }
  throw new j.ERR_OUT_OF_RANGE(r || "offset", `>= ${r ? 1 : 0} and <= ${e}`, t);
}
F("ERR_BUFFER_OUT_OF_BOUNDS", function (t) {
  if (t) {
    return `${t} is outside of buffer bounds`;
  } else {
    return "Attempt to access memory outside buffer bounds";
  }
}, RangeError);
F("ERR_INVALID_ARG_TYPE", function (t, e) {
  return `The "${t}" argument must be of type number. Received type ${typeof e}`;
}, TypeError);
F("ERR_OUT_OF_RANGE", function (t, e, r) {
  let n = `The value of "${t}" is out of range.`;
  let i = r;
  if (Number.isInteger(r) && Math.abs(r) > 4294967296) {
    i = L(String(r));
  } else if (typeof r == "bigint") {
    i = String(r);
    if (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) {
      i = L(i);
    }
    i += "n";
  }
  n += ` It must be ${e}. Received ${i}`;
  return n;
}, RangeError);
const W = /[^+/0-9A-Za-z-_]/g;
function $(t, e) {
  let r;
  e = e || Infinity;
  const n = t.length;
  let i = null;
  const s = [];
  for (let a = 0; a < n; ++a) {
    r = t.charCodeAt(a);
    if (r > 55295 && r < 57344) {
      if (!i) {
        if (r > 56319) {
          if ((e -= 3) > -1) {
            s.push(239, 191, 189);
          }
          continue;
        }
        if (a + 1 === n) {
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
    if ((t = (t = t.split("=")[0]).trim().replace(W, "")).length < 2) {
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
function Y(t, e) {
  return t instanceof e || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === e.name;
}
function Z(t) {
  return t != t;
}
const H = function () {
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
function J(t) {
  if (typeof BigInt == "undefined") {
    return Q;
  } else {
    return t;
  }
}
function Q() {
  throw new Error("BigInt not supported");
}