import * as n from "./789.js";
import * as i from "./761.js";
import * as s from "./944.js";
import a from "./950.js";
import o from "./744.js";
var u = Object.prototype.toString;
function h(t) {
  if (!(this instanceof h)) {
    return new h(t);
  }
  this.options = i.assign({
    level: -1,
    method: 8,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: 0,
    to: ""
  }, t || {});
  var e = this.options;
  if (e.raw && e.windowBits > 0) {
    e.windowBits = -e.windowBits;
  } else if (e.gzip && e.windowBits > 0 && e.windowBits < 16) {
    e.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new o();
  this.strm.avail_out = 0;
  var r = n.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
  if (r !== 0) {
    throw new Error(a[r]);
  }
  if (e.header) {
    n.deflateSetHeader(this.strm, e.header);
  }
  if (e.dictionary) {
    var f;
    f = typeof e.dictionary == "string" ? s.string2buf(e.dictionary) : u.call(e.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(e.dictionary) : e.dictionary;
    if ((r = n.deflateSetDictionary(this.strm, f)) !== 0) {
      throw new Error(a[r]);
    }
    this.u = true;
  }
}
function f(t, e) {
  var r = new h(e);
  r.push(t, true);
  if (r.err) {
    throw r.msg || a[r.err];
  }
  return r.result;
}
h.prototype.push = function (t, e) {
  var r;
  var a;
  var o = this.strm;
  var h = this.options.chunkSize;
  if (this.ended) {
    return false;
  }
  a = e === ~~e ? e : e === true ? 4 : 0;
  if (typeof t == "string") {
    o.input = s.string2buf(t);
  } else if (u.call(t) === "[object ArrayBuffer]") {
    o.input = new Uint8Array(t);
  } else {
    o.input = t;
  }
  o.next_in = 0;
  o.avail_in = o.input.length;
  do {
    if (o.avail_out === 0) {
      o.output = new i.Buf8(h);
      o.next_out = 0;
      o.avail_out = h;
    }
    if ((r = n.deflate(o, a)) !== 1 && r !== 0) {
      this.onEnd(r);
      this.ended = true;
      return false;
    }
    if (o.avail_out === 0 || o.avail_in === 0 && (a === 4 || a === 2)) {
      if (this.options.to === "string") {
        this.onData(s.buf2binstring(i.shrinkBuf(o.output, o.next_out)));
      } else {
        this.onData(i.shrinkBuf(o.output, o.next_out));
      }
    }
  } while ((o.avail_in > 0 || o.avail_out === 0) && r !== 1);
  if (a === 4) {
    r = n.deflateEnd(this.strm);
    this.onEnd(r);
    this.ended = true;
    return r === 0;
  } else {
    return a !== 2 || (this.onEnd(0), o.avail_out = 0, true);
  }
};
h.prototype.onData = function (t) {
  this.chunks.push(t);
};
h.prototype.onEnd = function (t) {
  if (t === 0) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = i.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = t;
  this.msg = this.strm.msg;
};
export var Deflate = h;
export var deflate = f;
export var deflateRaw = function (t, e) {
  (e = e || {}).raw = true;
  return f(t, e);
};
export var gzip = function (t, e) {
  (e = e || {}).gzip = true;
  return f(t, e);
};