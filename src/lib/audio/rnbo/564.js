import * as n from "./761.js";
function i(t) {
  for (var e = t.length; --e >= 0;) {
    t[e] = 0;
  }
}
var s = 256;
var a = 286;
var o = 30;
var u = 15;
var h = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
var f = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
var c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
var l = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
var p = new Array(576);
i(p);
var d = new Array(60);
i(d);
var g = new Array(512);
i(g);
var m = new Array(256);
i(m);
var _ = new Array(29);
i(_);
var y;
var v;
var b;
var I = new Array(o);
function w(t, e, r, n, i) {
  this.static_tree = t;
  this.extra_bits = e;
  this.extra_base = r;
  this.elems = n;
  this.max_length = i;
  this.has_stree = t && t.length;
}
function E(t, e) {
  this.dyn_tree = t;
  this.max_code = 0;
  this.stat_desc = e;
}
function M(t) {
  if (t < 256) {
    return g[t];
  } else {
    return g[256 + (t >>> 7)];
  }
}
function A(t, e) {
  t.pending_buf[t.pending++] = e & 255;
  t.pending_buf[t.pending++] = e >>> 8 & 255;
}
function T(t, e, r) {
  if (t.bi_valid > 16 - r) {
    t.bi_buf |= e << t.bi_valid & 65535;
    A(t, t.bi_buf);
    t.bi_buf = e >> 16 - t.bi_valid;
    t.bi_valid += r - 16;
  } else {
    t.bi_buf |= e << t.bi_valid & 65535;
    t.bi_valid += r;
  }
}
function S(t, e, r) {
  T(t, r[e * 2], r[e * 2 + 1]);
}
function B(t, e) {
  var r = 0;
  do {
    r |= t & 1;
    t >>>= 1;
    r <<= 1;
  } while (--e > 0);
  return r >>> 1;
}
function P(t, e, r) {
  var n;
  var i;
  var s = new Array(16);
  var a = 0;
  for (n = 1; n <= u; n++) {
    s[n] = a = a + r[n - 1] << 1;
  }
  for (i = 0; i <= e; i++) {
    var o = t[i * 2 + 1];
    if (o !== 0) {
      t[i * 2] = B(s[o]++, o);
    }
  }
}
function R(t) {
  var e;
  for (e = 0; e < a; e++) {
    t.dyn_ltree[e * 2] = 0;
  }
  for (e = 0; e < o; e++) {
    t.dyn_dtree[e * 2] = 0;
  }
  for (e = 0; e < 19; e++) {
    t.bl_tree[e * 2] = 0;
  }
  t.dyn_ltree[512] = 1;
  t.opt_len = t.static_len = 0;
  t.last_lit = t.matches = 0;
}
function D(t) {
  if (t.bi_valid > 8) {
    A(t, t.bi_buf);
  } else if (t.bi_valid > 0) {
    t.pending_buf[t.pending++] = t.bi_buf;
  }
  t.bi_buf = 0;
  t.bi_valid = 0;
}
function O(t, e, r, n) {
  var i = e * 2;
  var s = r * 2;
  return t[i] < t[s] || t[i] === t[s] && n[e] <= n[r];
}
function N(t, e, r) {
  for (var n = t.heap[r], i = r << 1; i <= t.heap_len && (i < t.heap_len && O(e, t.heap[i + 1], t.heap[i], t.depth) && i++, !O(e, n, t.heap[i], t.depth));) {
    t.heap[r] = t.heap[i];
    r = i;
    i <<= 1;
  }
  t.heap[r] = n;
}
function C(t, e, r) {
  var n;
  var i;
  var a;
  var o;
  var u = 0;
  if (t.last_lit !== 0) {
    do {
      n = t.pending_buf[t.d_buf + u * 2] << 8 | t.pending_buf[t.d_buf + u * 2 + 1];
      i = t.pending_buf[t.l_buf + u];
      u++;
      if (n === 0) {
        S(t, i, e);
      } else {
        S(t, (a = m[i]) + s + 1, e);
        if ((o = h[a]) !== 0) {
          T(t, i -= _[a], o);
        }
        S(t, a = M(--n), r);
        if ((o = f[a]) !== 0) {
          T(t, n -= I[a], o);
        }
      }
    } while (u < t.last_lit);
  }
  S(t, 256, e);
}
function k(t, e) {
  var r;
  var n;
  var i;
  var s = e.dyn_tree;
  var a = e.stat_desc.static_tree;
  var o = e.stat_desc.has_stree;
  var h = e.stat_desc.elems;
  var f = -1;
  t.heap_len = 0;
  t.heap_max = 573;
  r = 0;
  for (; r < h; r++) {
    if (s[r * 2] !== 0) {
      t.heap[++t.heap_len] = f = r;
      t.depth[r] = 0;
    } else {
      s[r * 2 + 1] = 0;
    }
  }
  while (t.heap_len < 2) {
    s[(i = t.heap[++t.heap_len] = f < 2 ? ++f : 0) * 2] = 1;
    t.depth[i] = 0;
    t.opt_len--;
    if (o) {
      t.static_len -= a[i * 2 + 1];
    }
  }
  e.max_code = f;
  r = t.heap_len >> 1;
  for (; r >= 1; r--) {
    N(t, s, r);
  }
  i = h;
  do {
    r = t.heap[1];
    t.heap[1] = t.heap[t.heap_len--];
    N(t, s, 1);
    n = t.heap[1];
    t.heap[--t.heap_max] = r;
    t.heap[--t.heap_max] = n;
    s[i * 2] = s[r * 2] + s[n * 2];
    t.depth[i] = (t.depth[r] >= t.depth[n] ? t.depth[r] : t.depth[n]) + 1;
    s[r * 2 + 1] = s[n * 2 + 1] = i;
    t.heap[1] = i++;
    N(t, s, 1);
  } while (t.heap_len >= 2);
  t.heap[--t.heap_max] = t.heap[1];
  (function (t, e) {
    var r;
    var n;
    var i;
    var s;
    var a;
    var o;
    var h = e.dyn_tree;
    var f = e.max_code;
    var c = e.stat_desc.static_tree;
    var l = e.stat_desc.has_stree;
    var p = e.stat_desc.extra_bits;
    var d = e.stat_desc.extra_base;
    var g = e.stat_desc.max_length;
    var m = 0;
    for (s = 0; s <= u; s++) {
      t.bl_count[s] = 0;
    }
    h[t.heap[t.heap_max] * 2 + 1] = 0;
    r = t.heap_max + 1;
    for (; r < 573; r++) {
      if ((s = h[h[(n = t.heap[r]) * 2 + 1] * 2 + 1] + 1) > g) {
        s = g;
        m++;
      }
      h[n * 2 + 1] = s;
      if (!(n > f)) {
        t.bl_count[s]++;
        a = 0;
        if (n >= d) {
          a = p[n - d];
        }
        o = h[n * 2];
        t.opt_len += o * (s + a);
        if (l) {
          t.static_len += o * (c[n * 2 + 1] + a);
        }
      }
    }
    if (m !== 0) {
      do {
        for (s = g - 1; t.bl_count[s] === 0;) {
          s--;
        }
        t.bl_count[s]--;
        t.bl_count[s + 1] += 2;
        t.bl_count[g]--;
        m -= 2;
      } while (m > 0);
      for (s = g; s !== 0; s--) {
        for (n = t.bl_count[s]; n !== 0;) {
          if (!((i = t.heap[--r]) > f)) {
            if (h[i * 2 + 1] !== s) {
              t.opt_len += (s - h[i * 2 + 1]) * h[i * 2];
              h[i * 2 + 1] = s;
            }
            n--;
          }
        }
      }
    }
  })(t, e);
  P(s, f, t.bl_count);
}
function x(t, e, r) {
  var n;
  var i;
  var s = -1;
  var a = e[1];
  var o = 0;
  var u = 7;
  var h = 4;
  if (a === 0) {
    u = 138;
    h = 3;
  }
  e[(r + 1) * 2 + 1] = 65535;
  n = 0;
  for (; n <= r; n++) {
    i = a;
    a = e[(n + 1) * 2 + 1];
    if (!(++o < u) || i !== a) {
      if (o < h) {
        t.bl_tree[i * 2] += o;
      } else if (i !== 0) {
        if (i !== s) {
          t.bl_tree[i * 2]++;
        }
        t.bl_tree[32]++;
      } else if (o <= 10) {
        t.bl_tree[34]++;
      } else {
        t.bl_tree[36]++;
      }
      o = 0;
      s = i;
      if (a === 0) {
        u = 138;
        h = 3;
      } else if (i === a) {
        u = 6;
        h = 3;
      } else {
        u = 7;
        h = 4;
      }
    }
  }
}
function U(t, e, r) {
  var n;
  var i;
  var s = -1;
  var a = e[1];
  var o = 0;
  var u = 7;
  var h = 4;
  if (a === 0) {
    u = 138;
    h = 3;
  }
  n = 0;
  for (; n <= r; n++) {
    i = a;
    a = e[(n + 1) * 2 + 1];
    if (!(++o < u) || i !== a) {
      if (o < h) {
        do {
          S(t, i, t.bl_tree);
        } while (--o != 0);
      } else if (i !== 0) {
        if (i !== s) {
          S(t, i, t.bl_tree);
          o--;
        }
        S(t, 16, t.bl_tree);
        T(t, o - 3, 2);
      } else if (o <= 10) {
        S(t, 17, t.bl_tree);
        T(t, o - 3, 3);
      } else {
        S(t, 18, t.bl_tree);
        T(t, o - 11, 7);
      }
      o = 0;
      s = i;
      if (a === 0) {
        u = 138;
        h = 3;
      } else if (i === a) {
        u = 6;
        h = 3;
      } else {
        u = 7;
        h = 4;
      }
    }
  }
}
i(I);
var z = false;
function j(t, e, r, i) {
  T(t, 0 + (i ? 1 : 0), 3);
  (function (t, e, r, i) {
    D(t);
    if (i) {
      A(t, r);
      A(t, ~r);
    }
    n.arraySet(t.pending_buf, t.window, e, r, t.pending);
    t.pending += r;
  })(t, e, r, true);
}
export var p = function (t) {
  if (!z) {
    (function () {
      var t;
      var e;
      var r;
      var n;
      var i;
      var s = new Array(16);
      r = 0;
      n = 0;
      for (; n < 28; n++) {
        _[n] = r;
        t = 0;
        for (; t < 1 << h[n]; t++) {
          m[r++] = n;
        }
      }
      m[r - 1] = n;
      i = 0;
      n = 0;
      for (; n < 16; n++) {
        I[n] = i;
        t = 0;
        for (; t < 1 << f[n]; t++) {
          g[i++] = n;
        }
      }
      for (i >>= 7; n < o; n++) {
        I[n] = i << 7;
        t = 0;
        for (; t < 1 << f[n] - 7; t++) {
          g[256 + i++] = n;
        }
      }
      for (e = 0; e <= u; e++) {
        s[e] = 0;
      }
      for (t = 0; t <= 143;) {
        p[t * 2 + 1] = 8;
        t++;
        s[8]++;
      }
      while (t <= 255) {
        p[t * 2 + 1] = 9;
        t++;
        s[9]++;
      }
      while (t <= 279) {
        p[t * 2 + 1] = 7;
        t++;
        s[7]++;
      }
      while (t <= 287) {
        p[t * 2 + 1] = 8;
        t++;
        s[8]++;
      }
      P(p, 287, s);
      t = 0;
      for (; t < o; t++) {
        d[t * 2 + 1] = 5;
        d[t * 2] = B(t, 5);
      }
      y = new w(p, h, 257, a, u);
      v = new w(d, f, 0, o, u);
      b = new w(new Array(0), c, 0, 19, 7);
    })();
    z = true;
  }
  t.l_desc = new E(t.dyn_ltree, y);
  t.d_desc = new E(t.dyn_dtree, v);
  t.bl_desc = new E(t.bl_tree, b);
  t.bi_buf = 0;
  t.bi_valid = 0;
  R(t);
};
export var m = j;
export var h = function (t, e, r, n) {
  var i;
  var a;
  var o = 0;
  if (t.level > 0) {
    if (t.strm.data_type === 2) {
      t.strm.data_type = function (t) {
        var e;
        var r = 4093624447;
        for (e = 0; e <= 31; e++, r >>>= 1) {
          if (r & 1 && t.dyn_ltree[e * 2] !== 0) {
            return 0;
          }
        }
        if (t.dyn_ltree[18] !== 0 || t.dyn_ltree[20] !== 0 || t.dyn_ltree[26] !== 0) {
          return 1;
        }
        for (e = 32; e < s; e++) {
          if (t.dyn_ltree[e * 2] !== 0) {
            return 1;
          }
        }
        return 0;
      }(t);
    }
    k(t, t.l_desc);
    k(t, t.d_desc);
    o = function (t) {
      var e;
      x(t, t.dyn_ltree, t.l_desc.max_code);
      x(t, t.dyn_dtree, t.d_desc.max_code);
      k(t, t.bl_desc);
      e = 18;
      for (; e >= 3 && t.bl_tree[l[e] * 2 + 1] === 0; e--);
      t.opt_len += (e + 1) * 3 + 5 + 5 + 4;
      return e;
    }(t);
    i = t.opt_len + 3 + 7 >>> 3;
    if ((a = t.static_len + 3 + 7 >>> 3) <= i) {
      i = a;
    }
  } else {
    i = a = r + 5;
  }
  if (r + 4 <= i && e !== -1) {
    j(t, e, r, n);
  } else if (t.strategy === 4 || a === i) {
    T(t, 2 + (n ? 1 : 0), 3);
    C(t, p, d);
  } else {
    T(t, 4 + (n ? 1 : 0), 3);
    (function (t, e, r, n) {
      var i;
      T(t, e - 257, 5);
      T(t, r - 1, 5);
      T(t, n - 4, 4);
      i = 0;
      for (; i < n; i++) {
        T(t, t.bl_tree[l[i] * 2 + 1], 3);
      }
      U(t, t.dyn_ltree, e - 1);
      U(t, t.dyn_dtree, r - 1);
    })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, o + 1);
    C(t, t.dyn_ltree, t.dyn_dtree);
  }
  R(t);
  if (n) {
    D(t);
  }
};
export var l = function (t, e, r) {
  t.pending_buf[t.d_buf + t.last_lit * 2] = e >>> 8 & 255;
  t.pending_buf[t.d_buf + t.last_lit * 2 + 1] = e & 255;
  t.pending_buf[t.l_buf + t.last_lit] = r & 255;
  t.last_lit++;
  if (e === 0) {
    t.dyn_ltree[r * 2]++;
  } else {
    t.matches++;
    e--;
    t.dyn_ltree[(m[r] + s + 1) * 2]++;
    t.dyn_dtree[M(e) * 2]++;
  }
  return t.last_lit === t.lit_bufsize - 1;
};
export var g = function (t) {
  T(t, 2, 3);
  S(t, 256, p);
  (function (t) {
    if (t.bi_valid === 16) {
      A(t, t.bi_buf);
      t.bi_buf = 0;
      t.bi_valid = 0;
    } else if (t.bi_valid >= 8) {
      t.pending_buf[t.pending++] = t.bi_buf & 255;
      t.bi_buf >>= 8;
      t.bi_valid -= 8;
    }
  })(t);
};