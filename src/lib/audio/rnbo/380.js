import * as n from "./20.js";
import * as i from "./761.js";
import * as s from "./944.js";
import a from "./271.js";
import o from "./950.js";
import u from "./744.js";
import h from "./357.js";
var f = Object.prototype.toString;
function c(t) {
  if (!(this instanceof c)) {
    return new c(t);
  }
  this.options = i.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ""
  }, t || {});
  var e = this.options;
  if (e.raw && e.windowBits >= 0 && e.windowBits < 16) {
    e.windowBits = -e.windowBits;
    if (e.windowBits === 0) {
      e.windowBits = -15;
    }
  }
  if (!!(e.windowBits >= 0) && !!(e.windowBits < 16) && (!t || !t.windowBits)) {
    e.windowBits += 32;
  }
  if (e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15) == 0) {
    e.windowBits |= 15;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new u();
  this.strm.avail_out = 0;
  var r = n.inflateInit2(this.strm, e.windowBits);
  if (r !== a.Z_OK) {
    throw new Error(o[r]);
  }
  this.header = new h();
  n.inflateGetHeader(this.strm, this.header);
  if (e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = s.string2buf(e.dictionary) : f.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (r = n.inflateSetDictionary(this.strm, e.dictionary)) !== a.Z_OK)) {
    throw new Error(o[r]);
  }
}
function l(t, e) {
  var r = new c(e);
  r.push(t, true);
  if (r.err) {
    throw r.msg || o[r.err];
  }
  return r.result;
}
c.prototype.push = function (t, e) {
  var r;
  var o;
  var u;
  var h;
  var c;
  var l = this.strm;
  var p = this.options.chunkSize;
  var d = this.options.dictionary;
  var g = false;
  if (this.ended) {
    return false;
  }
  o = e === ~~e ? e : e === true ? a.Z_FINISH : a.Z_NO_FLUSH;
  if (typeof t == "string") {
    l.input = s.binstring2buf(t);
  } else if (f.call(t) === "[object ArrayBuffer]") {
    l.input = new Uint8Array(t);
  } else {
    l.input = t;
  }
  l.next_in = 0;
  l.avail_in = l.input.length;
  do {
    if (l.avail_out === 0) {
      l.output = new i.Buf8(p);
      l.next_out = 0;
      l.avail_out = p;
    }
    if ((r = n.inflate(l, a.Z_NO_FLUSH)) === a.Z_NEED_DICT && d) {
      r = n.inflateSetDictionary(this.strm, d);
    }
    if (r === a.Z_BUF_ERROR && g === true) {
      r = a.Z_OK;
      g = false;
    }
    if (r !== a.Z_STREAM_END && r !== a.Z_OK) {
      this.onEnd(r);
      this.ended = true;
      return false;
    }
    if (l.next_out) {
      if (l.avail_out === 0 || r === a.Z_STREAM_END || l.avail_in === 0 && (o === a.Z_FINISH || o === a.Z_SYNC_FLUSH)) {
        if (this.options.to === "string") {
          u = s.utf8border(l.output, l.next_out);
          h = l.next_out - u;
          c = s.buf2string(l.output, u);
          l.next_out = h;
          l.avail_out = p - h;
          if (h) {
            i.arraySet(l.output, l.output, u, h, 0);
          }
          this.onData(c);
        } else {
          this.onData(i.shrinkBuf(l.output, l.next_out));
        }
      }
    }
    if (l.avail_in === 0 && l.avail_out === 0) {
      g = true;
    }
  } while ((l.avail_in > 0 || l.avail_out === 0) && r !== a.Z_STREAM_END);
  if (r === a.Z_STREAM_END) {
    o = a.Z_FINISH;
  }
  if (o === a.Z_FINISH) {
    r = n.inflateEnd(this.strm);
    this.onEnd(r);
    this.ended = true;
    return r === a.Z_OK;
  } else {
    return o !== a.Z_SYNC_FLUSH || (this.onEnd(a.Z_OK), l.avail_out = 0, true);
  }
};
c.prototype.onData = function (t) {
  this.chunks.push(t);
};
c.prototype.onEnd = function (t) {
  if (t === a.Z_OK) {
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
export var Inflate = c;
export var inflate = l;
export var inflateRaw = function (t, e) {
  (e = e || {}).raw = true;
  return l(t, e);
};
export var ungzip = l;