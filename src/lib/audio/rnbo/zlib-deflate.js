var n;
import * as i from "./zlib-utils.js";
import * as s from "./zlib-trees.js";
import a from "./zlib-adler32.js";
import o from "./module-299.js";
import u from "./zlib-messages.js";
var h = -2;
var f = 258;
var c = 262;
var l = 103;
var p = 113;
var d = 666;
function g(t, e) {
  t.msg = u[e];
  return e;
}
function m(t) {
  return (t << 1) - (t > 4 ? 9 : 0);
}
function _(t) {
  for (var e = t.length; --e >= 0;) {
    t[e] = 0;
  }
}
function y(t) {
  var e = t.state;
  var r = e.pending;
  if (r > t.avail_out) {
    r = t.avail_out;
  }
  if (r !== 0) {
    i.arraySet(t.output, e.pending_buf, e.pending_out, r, t.next_out);
    t.next_out += r;
    e.pending_out += r;
    t.total_out += r;
    t.avail_out -= r;
    e.pending -= r;
    if (e.pending === 0) {
      e.pending_out = 0;
    }
  }
}
function v(t, e) {
  s.h(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e);
  t.block_start = t.strstart;
  y(t.strm);
}
function b(t, e) {
  t.pending_buf[t.pending++] = e;
}
function I(t, e) {
  t.pending_buf[t.pending++] = e >>> 8 & 255;
  t.pending_buf[t.pending++] = e & 255;
}
function w(t, e) {
  var r;
  var n;
  var i = t.max_chain_length;
  var s = t.strstart;
  var a = t.prev_length;
  var o = t.nice_match;
  var u = t.strstart > t.w_size - c ? t.strstart - (t.w_size - c) : 0;
  var h = t.window;
  var l = t.w_mask;
  var p = t.prev;
  var d = t.strstart + f;
  var g = h[s + a - 1];
  var m = h[s + a];
  if (t.prev_length >= t.good_match) {
    i >>= 2;
  }
  if (o > t.lookahead) {
    o = t.lookahead;
  }
  do {
    if (h[(r = e) + a] === m && h[r + a - 1] === g && h[r] === h[s] && h[++r] === h[s + 1]) {
      s += 2;
      r++;
      do {} while (h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && s < d);
      n = f - (d - s);
      s = d - f;
      if (n > a) {
        t.match_start = e;
        a = n;
        if (n >= o) {
          break;
        }
        g = h[s + a - 1];
        m = h[s + a];
      }
    }
  } while ((e = p[e & l]) > u && --i != 0);
  if (a <= t.lookahead) {
    return a;
  } else {
    return t.lookahead;
  }
}
function E(t) {
  var e;
  var r;
  var n;
  var s;
  var u;
  var h;
  var f;
  var l;
  var p;
  var d;
  var g = t.w_size;
  do {
    s = t.window_size - t.lookahead - t.strstart;
    if (t.strstart >= g + (g - c)) {
      i.arraySet(t.window, t.window, g, g, 0);
      t.match_start -= g;
      t.strstart -= g;
      t.block_start -= g;
      e = r = t.hash_size;
      do {
        n = t.head[--e];
        t.head[e] = n >= g ? n - g : 0;
      } while (--r);
      e = r = g;
      do {
        n = t.prev[--e];
        t.prev[e] = n >= g ? n - g : 0;
      } while (--r);
      s += g;
    }
    if (t.strm.avail_in === 0) {
      break;
    }
    h = t.strm;
    f = t.window;
    l = t.strstart + t.lookahead;
    p = s;
    d = undefined;
    if ((d = h.avail_in) > p) {
      d = p;
    }
    r = d === 0 ? 0 : (h.avail_in -= d, i.arraySet(f, h.input, h.next_in, d, l), h.state.wrap === 1 ? h.adler = a(h.adler, f, d, l) : h.state.wrap === 2 && (h.adler = o(h.adler, f, d, l)), h.next_in += d, h.total_in += d, d);
    t.lookahead += r;
    if (t.lookahead + t.insert >= 3) {
      u = t.strstart - t.insert;
      t.ins_h = t.window[u];
      t.ins_h = (t.ins_h << t.hash_shift ^ t.window[u + 1]) & t.hash_mask;
      while (t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[u + 3 - 1]) & t.hash_mask, t.prev[u & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = u, u++, t.insert--, !(t.lookahead + t.insert < 3)));
    }
  } while (t.lookahead < c && t.strm.avail_in !== 0);
}
function M(t, e) {
  var r;
  var n;
  while (true) {
    if (t.lookahead < c) {
      E(t);
      if (t.lookahead < c && e === 0) {
        return 1;
      }
      if (t.lookahead === 0) {
        break;
      }
    }
    r = 0;
    if (t.lookahead >= 3) {
      t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 3 - 1]) & t.hash_mask;
      r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h];
      t.head[t.ins_h] = t.strstart;
    }
    if (r !== 0 && t.strstart - r <= t.w_size - c) {
      t.match_length = w(t, r);
    }
    if (t.match_length >= 3) {
      n = s.l(t, t.strstart - t.match_start, t.match_length - 3);
      t.lookahead -= t.match_length;
      if (t.match_length <= t.max_lazy_match && t.lookahead >= 3) {
        t.match_length--;
        do {
          t.strstart++;
          t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 3 - 1]) & t.hash_mask;
          r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h];
          t.head[t.ins_h] = t.strstart;
        } while (--t.match_length != 0);
        t.strstart++;
      } else {
        t.strstart += t.match_length;
        t.match_length = 0;
        t.ins_h = t.window[t.strstart];
        t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
      }
    } else {
      n = s.l(t, 0, t.window[t.strstart]);
      t.lookahead--;
      t.strstart++;
    }
    if (n && (v(t, false), t.strm.avail_out === 0)) {
      return 1;
    }
  }
  t.insert = t.strstart < 2 ? t.strstart : 2;
  if (e === 4) {
    v(t, true);
    if (t.strm.avail_out === 0) {
      return 3;
    } else {
      return 4;
    }
  } else if (t.last_lit && (v(t, false), t.strm.avail_out === 0)) {
    return 1;
  } else {
    return 2;
  }
}
function A(t, e) {
  var r;
  var n;
  var i;
  while (true) {
    if (t.lookahead < c) {
      E(t);
      if (t.lookahead < c && e === 0) {
        return 1;
      }
      if (t.lookahead === 0) {
        break;
      }
    }
    r = 0;
    if (t.lookahead >= 3) {
      t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 3 - 1]) & t.hash_mask;
      r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h];
      t.head[t.ins_h] = t.strstart;
    }
    t.prev_length = t.match_length;
    t.prev_match = t.match_start;
    t.match_length = 2;
    if (r !== 0 && t.prev_length < t.max_lazy_match && t.strstart - r <= t.w_size - c) {
      t.match_length = w(t, r);
      if (t.match_length <= 5 && (t.strategy === 1 || t.match_length === 3 && t.strstart - t.match_start > 4096)) {
        t.match_length = 2;
      }
    }
    if (t.prev_length >= 3 && t.match_length <= t.prev_length) {
      i = t.strstart + t.lookahead - 3;
      n = s.l(t, t.strstart - 1 - t.prev_match, t.prev_length - 3);
      t.lookahead -= t.prev_length - 1;
      t.prev_length -= 2;
      do {
        if (++t.strstart <= i) {
          t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 3 - 1]) & t.hash_mask;
          r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h];
          t.head[t.ins_h] = t.strstart;
        }
      } while (--t.prev_length != 0);
      t.match_available = 0;
      t.match_length = 2;
      t.strstart++;
      if (n && (v(t, false), t.strm.avail_out === 0)) {
        return 1;
      }
    } else if (t.match_available) {
      if (n = s.l(t, 0, t.window[t.strstart - 1])) {
        v(t, false);
      }
      t.strstart++;
      t.lookahead--;
      if (t.strm.avail_out === 0) {
        return 1;
      }
    } else {
      t.match_available = 1;
      t.strstart++;
      t.lookahead--;
    }
  }
  if (t.match_available) {
    n = s.l(t, 0, t.window[t.strstart - 1]);
    t.match_available = 0;
  }
  t.insert = t.strstart < 2 ? t.strstart : 2;
  if (e === 4) {
    v(t, true);
    if (t.strm.avail_out === 0) {
      return 3;
    } else {
      return 4;
    }
  } else if (t.last_lit && (v(t, false), t.strm.avail_out === 0)) {
    return 1;
  } else {
    return 2;
  }
}
function T(t, e, r, n, i) {
  this.good_length = t;
  this.max_lazy = e;
  this.nice_length = r;
  this.max_chain = n;
  this.func = i;
}
function S() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = 8;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new i.Buf16(1146);
  this.dyn_dtree = new i.Buf16(122);
  this.bl_tree = new i.Buf16(78);
  _(this.dyn_ltree);
  _(this.dyn_dtree);
  _(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new i.Buf16(16);
  this.heap = new i.Buf16(573);
  _(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new i.Buf16(573);
  _(this.depth);
  this.l_buf = 0;
  this.lit_bufsize = 0;
  this.last_lit = 0;
  this.d_buf = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
function B(t) {
  var e;
  if (t && t.state) {
    t.total_in = t.total_out = 0;
    t.data_type = 2;
    (e = t.state).pending = 0;
    e.pending_out = 0;
    if (e.wrap < 0) {
      e.wrap = -e.wrap;
    }
    e.status = e.wrap ? 42 : p;
    t.adler = e.wrap === 2 ? 0 : 1;
    e.last_flush = 0;
    s.p(e);
    return 0;
  } else {
    return g(t, h);
  }
}
function P(t) {
  var e;
  var r = B(t);
  if (r === 0) {
    (e = t.state).window_size = e.w_size * 2;
    _(e.head);
    e.max_lazy_match = n[e.level].max_lazy;
    e.good_match = n[e.level].good_length;
    e.nice_match = n[e.level].nice_length;
    e.max_chain_length = n[e.level].max_chain;
    e.strstart = 0;
    e.block_start = 0;
    e.lookahead = 0;
    e.insert = 0;
    e.match_length = e.prev_length = 2;
    e.match_available = 0;
    e.ins_h = 0;
  }
  return r;
}
function R(t, e, r, n, s, a) {
  if (!t) {
    return h;
  }
  var o = 1;
  if (e === -1) {
    e = 6;
  }
  if (n < 0) {
    o = 0;
    n = -n;
  } else if (n > 15) {
    o = 2;
    n -= 16;
  }
  if (s < 1 || s > 9 || r !== 8 || n < 8 || n > 15 || e < 0 || e > 9 || a < 0 || a > 4) {
    return g(t, h);
  }
  if (n === 8) {
    n = 9;
  }
  var u = new S();
  t.state = u;
  u.strm = t;
  u.wrap = o;
  u.gzhead = null;
  u.w_bits = n;
  u.w_size = 1 << u.w_bits;
  u.w_mask = u.w_size - 1;
  u.hash_bits = s + 7;
  u.hash_size = 1 << u.hash_bits;
  u.hash_mask = u.hash_size - 1;
  u.hash_shift = ~~((u.hash_bits + 3 - 1) / 3);
  u.window = new i.Buf8(u.w_size * 2);
  u.head = new i.Buf16(u.hash_size);
  u.prev = new i.Buf16(u.w_size);
  u.lit_bufsize = 1 << s + 6;
  u.pending_buf_size = u.lit_bufsize * 4;
  u.pending_buf = new i.Buf8(u.pending_buf_size);
  u.d_buf = u.lit_bufsize * 1;
  u.l_buf = u.lit_bufsize * 3;
  u.level = e;
  u.strategy = a;
  u.method = r;
  return P(t);
}
n = [new T(0, 0, 0, 0, function (t, e) {
  var r = 65535;
  for (r > t.pending_buf_size - 5 && (r = t.pending_buf_size - 5);;) {
    if (t.lookahead <= 1) {
      E(t);
      if (t.lookahead === 0 && e === 0) {
        return 1;
      }
      if (t.lookahead === 0) {
        break;
      }
    }
    t.strstart += t.lookahead;
    t.lookahead = 0;
    var n = t.block_start + r;
    if ((t.strstart === 0 || t.strstart >= n) && (t.lookahead = t.strstart - n, t.strstart = n, v(t, false), t.strm.avail_out === 0)) {
      return 1;
    }
    if (t.strstart - t.block_start >= t.w_size - c && (v(t, false), t.strm.avail_out === 0)) {
      return 1;
    }
  }
  t.insert = 0;
  if (e === 4) {
    v(t, true);
    if (t.strm.avail_out === 0) {
      return 3;
    } else {
      return 4;
    }
  } else {
    if (t.strstart > t.block_start) {
      v(t, false);
      t.strm.avail_out;
    }
    return 1;
  }
}), new T(4, 4, 8, 4, M), new T(4, 5, 16, 8, M), new T(4, 6, 32, 32, M), new T(4, 4, 16, 16, A), new T(8, 16, 32, 32, A), new T(8, 16, 128, 128, A), new T(8, 32, 128, 256, A), new T(32, 128, 258, 1024, A), new T(32, 258, 258, 4096, A)];
export var deflateInit = function (t, e) {
  return R(t, e, 8, 15, 8, 0);
};
export var deflateInit2 = R;
export var deflateReset = P;
export var deflateResetKeep = B;
export var deflateSetHeader = function (t, e) {
  if (t && t.state) {
    if (t.state.wrap !== 2) {
      return h;
    } else {
      t.state.gzhead = e;
      return 0;
    }
  } else {
    return h;
  }
};
export var deflate = function (t, e) {
  var r;
  var i;
  var a;
  var u;
  if (!t || !t.state || e > 5 || e < 0) {
    if (t) {
      return g(t, h);
    } else {
      return h;
    }
  }
  i = t.state;
  if (!t.output || !t.input && t.avail_in !== 0 || i.status === d && e !== 4) {
    return g(t, t.avail_out === 0 ? -5 : h);
  }
  i.strm = t;
  r = i.last_flush;
  i.last_flush = e;
  if (i.status === 42) {
    if (i.wrap === 2) {
      t.adler = 0;
      b(i, 31);
      b(i, 139);
      b(i, 8);
      if (i.gzhead) {
        b(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0));
        b(i, i.gzhead.time & 255);
        b(i, i.gzhead.time >> 8 & 255);
        b(i, i.gzhead.time >> 16 & 255);
        b(i, i.gzhead.time >> 24 & 255);
        b(i, i.level === 9 ? 2 : i.strategy >= 2 || i.level < 2 ? 4 : 0);
        b(i, i.gzhead.os & 255);
        if (i.gzhead.extra && i.gzhead.extra.length) {
          b(i, i.gzhead.extra.length & 255);
          b(i, i.gzhead.extra.length >> 8 & 255);
        }
        if (i.gzhead.hcrc) {
          t.adler = o(t.adler, i.pending_buf, i.pending, 0);
        }
        i.gzindex = 0;
        i.status = 69;
      } else {
        b(i, 0);
        b(i, 0);
        b(i, 0);
        b(i, 0);
        b(i, 0);
        b(i, i.level === 9 ? 2 : i.strategy >= 2 || i.level < 2 ? 4 : 0);
        b(i, 3);
        i.status = p;
      }
    } else {
      var c = 8 + (i.w_bits - 8 << 4) << 8;
      c |= (i.strategy >= 2 || i.level < 2 ? 0 : i.level < 6 ? 1 : i.level === 6 ? 2 : 3) << 6;
      if (i.strstart !== 0) {
        c |= 32;
      }
      c += 31 - c % 31;
      i.status = p;
      I(i, c);
      if (i.strstart !== 0) {
        I(i, t.adler >>> 16);
        I(i, t.adler & 65535);
      }
      t.adler = 1;
    }
  }
  if (i.status === 69) {
    if (i.gzhead.extra) {
      for (a = i.pending; i.gzindex < (i.gzhead.extra.length & 65535) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > a && (t.adler = o(t.adler, i.pending_buf, i.pending - a, a)), y(t), a = i.pending, i.pending !== i.pending_buf_size));) {
        b(i, i.gzhead.extra[i.gzindex] & 255);
        i.gzindex++;
      }
      if (i.gzhead.hcrc && i.pending > a) {
        t.adler = o(t.adler, i.pending_buf, i.pending - a, a);
      }
      if (i.gzindex === i.gzhead.extra.length) {
        i.gzindex = 0;
        i.status = 73;
      }
    } else {
      i.status = 73;
    }
  }
  if (i.status === 73) {
    if (i.gzhead.name) {
      a = i.pending;
      do {
        if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > a && (t.adler = o(t.adler, i.pending_buf, i.pending - a, a)), y(t), a = i.pending, i.pending === i.pending_buf_size)) {
          u = 1;
          break;
        }
        u = i.gzindex < i.gzhead.name.length ? i.gzhead.name.charCodeAt(i.gzindex++) & 255 : 0;
        b(i, u);
      } while (u !== 0);
      if (i.gzhead.hcrc && i.pending > a) {
        t.adler = o(t.adler, i.pending_buf, i.pending - a, a);
      }
      if (u === 0) {
        i.gzindex = 0;
        i.status = 91;
      }
    } else {
      i.status = 91;
    }
  }
  if (i.status === 91) {
    if (i.gzhead.comment) {
      a = i.pending;
      do {
        if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > a && (t.adler = o(t.adler, i.pending_buf, i.pending - a, a)), y(t), a = i.pending, i.pending === i.pending_buf_size)) {
          u = 1;
          break;
        }
        u = i.gzindex < i.gzhead.comment.length ? i.gzhead.comment.charCodeAt(i.gzindex++) & 255 : 0;
        b(i, u);
      } while (u !== 0);
      if (i.gzhead.hcrc && i.pending > a) {
        t.adler = o(t.adler, i.pending_buf, i.pending - a, a);
      }
      if (u === 0) {
        i.status = l;
      }
    } else {
      i.status = l;
    }
  }
  if (i.status === l) {
    if (i.gzhead.hcrc) {
      if (i.pending + 2 > i.pending_buf_size) {
        y(t);
      }
      if (i.pending + 2 <= i.pending_buf_size) {
        b(i, t.adler & 255);
        b(i, t.adler >> 8 & 255);
        t.adler = 0;
        i.status = p;
      }
    } else {
      i.status = p;
    }
  }
  if (i.pending !== 0) {
    y(t);
    if (t.avail_out === 0) {
      i.last_flush = -1;
      return 0;
    }
  } else if (t.avail_in === 0 && m(e) <= m(r) && e !== 4) {
    return g(t, -5);
  }
  if (i.status === d && t.avail_in !== 0) {
    return g(t, -5);
  }
  if (t.avail_in !== 0 || i.lookahead !== 0 || e !== 0 && i.status !== d) {
    var w = i.strategy === 2 ? function (t, e) {
      var r;
      for (;;) {
        if (t.lookahead === 0 && (E(t), t.lookahead === 0)) {
          if (e === 0) {
            return 1;
          }
          break;
        }
        t.match_length = 0;
        r = s.l(t, 0, t.window[t.strstart]);
        t.lookahead--;
        t.strstart++;
        if (r && (v(t, false), t.strm.avail_out === 0)) {
          return 1;
        }
      }
      t.insert = 0;
      if (e === 4) {
        v(t, true);
        if (t.strm.avail_out === 0) {
          return 3;
        } else {
          return 4;
        }
      } else if (t.last_lit && (v(t, false), t.strm.avail_out === 0)) {
        return 1;
      } else {
        return 2;
      }
    }(i, e) : i.strategy === 3 ? function (t, e) {
      var r;
      var n;
      var i;
      var a;
      var o = t.window;
      while (true) {
        if (t.lookahead <= f) {
          E(t);
          if (t.lookahead <= f && e === 0) {
            return 1;
          }
          if (t.lookahead === 0) {
            break;
          }
        }
        t.match_length = 0;
        if (t.lookahead >= 3 && t.strstart > 0 && (n = o[i = t.strstart - 1]) === o[++i] && n === o[++i] && n === o[++i]) {
          a = t.strstart + f;
          do {} while (n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && i < a);
          t.match_length = f - (a - i);
          if (t.match_length > t.lookahead) {
            t.match_length = t.lookahead;
          }
        }
        if (t.match_length >= 3) {
          r = s.l(t, 1, t.match_length - 3);
          t.lookahead -= t.match_length;
          t.strstart += t.match_length;
          t.match_length = 0;
        } else {
          r = s.l(t, 0, t.window[t.strstart]);
          t.lookahead--;
          t.strstart++;
        }
        if (r && (v(t, false), t.strm.avail_out === 0)) {
          return 1;
        }
      }
      t.insert = 0;
      if (e === 4) {
        v(t, true);
        if (t.strm.avail_out === 0) {
          return 3;
        } else {
          return 4;
        }
      } else if (t.last_lit && (v(t, false), t.strm.avail_out === 0)) {
        return 1;
      } else {
        return 2;
      }
    }(i, e) : n[i.level].func(i, e);
    if (w === 3 || w === 4) {
      i.status = d;
    }
    if (w === 1 || w === 3) {
      if (t.avail_out === 0) {
        i.last_flush = -1;
      }
      return 0;
    }
    if (w === 2 && (e === 1 ? s.g(i) : e !== 5 && (s.m(i, 0, 0, false), e === 3 && (_(i.head), i.lookahead === 0 && (i.strstart = 0, i.block_start = 0, i.insert = 0))), y(t), t.avail_out === 0)) {
      i.last_flush = -1;
      return 0;
    }
  }
  if (e !== 4) {
    return 0;
  } else if (i.wrap <= 0) {
    return 1;
  } else {
    if (i.wrap === 2) {
      b(i, t.adler & 255);
      b(i, t.adler >> 8 & 255);
      b(i, t.adler >> 16 & 255);
      b(i, t.adler >> 24 & 255);
      b(i, t.total_in & 255);
      b(i, t.total_in >> 8 & 255);
      b(i, t.total_in >> 16 & 255);
      b(i, t.total_in >> 24 & 255);
    } else {
      I(i, t.adler >>> 16);
      I(i, t.adler & 65535);
    }
    y(t);
    if (i.wrap > 0) {
      i.wrap = -i.wrap;
    }
    if (i.pending !== 0) {
      return 0;
    } else {
      return 1;
    }
  }
};
export var deflateEnd = function (t) {
  var e;
  if (t && t.state) {
    if ((e = t.state.status) !== 42 && e !== 69 && e !== 73 && e !== 91 && e !== l && e !== p && e !== d) {
      return g(t, h);
    } else {
      t.state = null;
      if (e === p) {
        return g(t, -3);
      } else {
        return 0;
      }
    }
  } else {
    return h;
  }
};
export var deflateSetDictionary = function (t, e) {
  var r;
  var n;
  var s;
  var o;
  var u;
  var f;
  var c;
  var l;
  var p = e.length;
  if (!t || !t.state) {
    return h;
  }
  if ((o = (r = t.state).wrap) === 2 || o === 1 && r.status !== 42 || r.lookahead) {
    return h;
  }
  if (o === 1) {
    t.adler = a(t.adler, e, p, 0);
  }
  r.wrap = 0;
  if (p >= r.w_size) {
    if (o === 0) {
      _(r.head);
      r.strstart = 0;
      r.block_start = 0;
      r.insert = 0;
    }
    l = new i.Buf8(r.w_size);
    i.arraySet(l, e, p - r.w_size, r.w_size, 0);
    e = l;
    p = r.w_size;
  }
  u = t.avail_in;
  f = t.next_in;
  c = t.input;
  t.avail_in = p;
  t.next_in = 0;
  t.input = e;
  E(r);
  while (r.lookahead >= 3) {
    n = r.strstart;
    s = r.lookahead - 2;
    do {
      r.ins_h = (r.ins_h << r.hash_shift ^ r.window[n + 3 - 1]) & r.hash_mask;
      r.prev[n & r.w_mask] = r.head[r.ins_h];
      r.head[r.ins_h] = n;
      n++;
    } while (--s);
    r.strstart = n;
    r.lookahead = 2;
    E(r);
  }
  r.strstart += r.lookahead;
  r.block_start = r.strstart;
  r.insert = r.lookahead;
  r.lookahead = 0;
  r.match_length = r.prev_length = 2;
  r.match_available = 0;
  t.next_in = f;
  t.input = c;
  t.avail_in = u;
  r.wrap = o;
  return 0;
};
export var deflateInfo = "pako deflate (from Nodeca project)";