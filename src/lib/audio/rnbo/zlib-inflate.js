import * as n from "./zlib-utils.js";
import i from "./zlib-adler32.js";
import s from "./module-299.js";
import a from "./zlib-inffast.js";
import o from "./zlib-inftrees.js";
var u = -2;
var h = 12;
var f = 30;
function c(t) {
  return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
}
function l() {
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new n.Buf16(320);
  this.work = new n.Buf16(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
function p(t) {
  var e;
  if (t && t.state) {
    e = t.state;
    t.total_in = t.total_out = e.total = 0;
    t.msg = "";
    if (e.wrap) {
      t.adler = e.wrap & 1;
    }
    e.mode = 1;
    e.last = 0;
    e.havedict = 0;
    e.dmax = 32768;
    e.head = null;
    e.hold = 0;
    e.bits = 0;
    e.lencode = e.lendyn = new n.Buf32(852);
    e.distcode = e.distdyn = new n.Buf32(592);
    e.sane = 1;
    e.back = -1;
    return 0;
  } else {
    return u;
  }
}
function d(t) {
  var e;
  if (t && t.state) {
    (e = t.state).wsize = 0;
    e.whave = 0;
    e.wnext = 0;
    return p(t);
  } else {
    return u;
  }
}
function g(t, e) {
  var r;
  var n;
  if (t && t.state) {
    n = t.state;
    if (e < 0) {
      r = 0;
      e = -e;
    } else {
      r = 1 + (e >> 4);
      if (e < 48) {
        e &= 15;
      }
    }
    if (e && (e < 8 || e > 15)) {
      return u;
    } else {
      if (n.window !== null && n.wbits !== e) {
        n.window = null;
      }
      n.wrap = r;
      n.wbits = e;
      return d(t);
    }
  } else {
    return u;
  }
}
function m(t, e) {
  var r;
  var n;
  if (t) {
    n = new l();
    t.state = n;
    n.window = null;
    if ((r = g(t, e)) !== 0) {
      t.state = null;
    }
    return r;
  } else {
    return u;
  }
}
var _;
var y;
var v = true;
function b(t) {
  if (v) {
    var e;
    _ = new n.Buf32(512);
    y = new n.Buf32(32);
    e = 0;
    while (e < 144) {
      t.lens[e++] = 8;
    }
    while (e < 256) {
      t.lens[e++] = 9;
    }
    while (e < 280) {
      t.lens[e++] = 7;
    }
    while (e < 288) {
      t.lens[e++] = 8;
    }
    o(1, t.lens, 0, 288, _, 0, t.work, {
      bits: 9
    });
    e = 0;
    while (e < 32) {
      t.lens[e++] = 5;
    }
    o(2, t.lens, 0, 32, y, 0, t.work, {
      bits: 5
    });
    v = false;
  }
  t.lencode = _;
  t.lenbits = 9;
  t.distcode = y;
  t.distbits = 5;
}
function I(t, e, r, i) {
  var s;
  var a = t.state;
  if (a.window === null) {
    a.wsize = 1 << a.wbits;
    a.wnext = 0;
    a.whave = 0;
    a.window = new n.Buf8(a.wsize);
  }
  if (i >= a.wsize) {
    n.arraySet(a.window, e, r - a.wsize, a.wsize, 0);
    a.wnext = 0;
    a.whave = a.wsize;
  } else {
    if ((s = a.wsize - a.wnext) > i) {
      s = i;
    }
    n.arraySet(a.window, e, r - i, s, a.wnext);
    if (i -= s) {
      n.arraySet(a.window, e, r - i, i, 0);
      a.wnext = i;
      a.whave = a.wsize;
    } else {
      a.wnext += s;
      if (a.wnext === a.wsize) {
        a.wnext = 0;
      }
      if (a.whave < a.wsize) {
        a.whave += s;
      }
    }
  }
  return 0;
}
export var inflateReset = d;
export var inflateReset2 = g;
export var inflateResetKeep = p;
export var inflateInit = function (t) {
  return m(t, 15);
};
export var inflateInit2 = m;
export var inflate = function (t, e) {
  var r;
  var l;
  var p;
  var d;
  var g;
  var m;
  var _;
  var y;
  var v;
  var w;
  var E;
  var M;
  var A;
  var T;
  var S;
  var B;
  var P;
  var R;
  var D;
  var O;
  var N;
  var C;
  var k;
  var x;
  var U = 0;
  var z = new n.Buf8(4);
  var j = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  if (!t || !t.state || !t.output || !t.input && t.avail_in !== 0) {
    return u;
  }
  if ((r = t.state).mode === h) {
    r.mode = 13;
  }
  g = t.next_out;
  p = t.output;
  _ = t.avail_out;
  d = t.next_in;
  l = t.input;
  m = t.avail_in;
  y = r.hold;
  v = r.bits;
  w = m;
  E = _;
  C = 0;
  t: while (true) {
    switch (r.mode) {
      case 1:
        if (r.wrap === 0) {
          r.mode = 13;
          break;
        }
        while (v < 16) {
          if (m === 0) {
            break t;
          }
          m--;
          y += l[d++] << v;
          v += 8;
        }
        if (r.wrap & 2 && y === 35615) {
          r.check = 0;
          z[0] = y & 255;
          z[1] = y >>> 8 & 255;
          r.check = s(r.check, z, 2, 0);
          y = 0;
          v = 0;
          r.mode = 2;
          break;
        }
        r.flags = 0;
        if (r.head) {
          r.head.done = false;
        }
        if (!(r.wrap & 1) || (((y & 255) << 8) + (y >> 8)) % 31) {
          t.msg = "incorrect header check";
          r.mode = f;
          break;
        }
        if ((y & 15) != 8) {
          t.msg = "unknown compression method";
          r.mode = f;
          break;
        }
        v -= 4;
        N = 8 + ((y >>>= 4) & 15);
        if (r.wbits === 0) {
          r.wbits = N;
        } else if (N > r.wbits) {
          t.msg = "invalid window size";
          r.mode = f;
          break;
        }
        r.dmax = 1 << N;
        t.adler = r.check = 1;
        r.mode = y & 512 ? 10 : h;
        y = 0;
        v = 0;
        break;
      case 2:
        while (v < 16) {
          if (m === 0) {
            break t;
          }
          m--;
          y += l[d++] << v;
          v += 8;
        }
        r.flags = y;
        if ((r.flags & 255) != 8) {
          t.msg = "unknown compression method";
          r.mode = f;
          break;
        }
        if (r.flags & 57344) {
          t.msg = "unknown header flags set";
          r.mode = f;
          break;
        }
        if (r.head) {
          r.head.text = y >> 8 & 1;
        }
        if (r.flags & 512) {
          z[0] = y & 255;
          z[1] = y >>> 8 & 255;
          r.check = s(r.check, z, 2, 0);
        }
        y = 0;
        v = 0;
        r.mode = 3;
      case 3:
        while (v < 32) {
          if (m === 0) {
            break t;
          }
          m--;
          y += l[d++] << v;
          v += 8;
        }
        if (r.head) {
          r.head.time = y;
        }
        if (r.flags & 512) {
          z[0] = y & 255;
          z[1] = y >>> 8 & 255;
          z[2] = y >>> 16 & 255;
          z[3] = y >>> 24 & 255;
          r.check = s(r.check, z, 4, 0);
        }
        y = 0;
        v = 0;
        r.mode = 4;
      case 4:
        while (v < 16) {
          if (m === 0) {
            break t;
          }
          m--;
          y += l[d++] << v;
          v += 8;
        }
        if (r.head) {
          r.head.xflags = y & 255;
          r.head.os = y >> 8;
        }
        if (r.flags & 512) {
          z[0] = y & 255;
          z[1] = y >>> 8 & 255;
          r.check = s(r.check, z, 2, 0);
        }
        y = 0;
        v = 0;
        r.mode = 5;
      case 5:
        if (r.flags & 1024) {
          while (v < 16) {
            if (m === 0) {
              break t;
            }
            m--;
            y += l[d++] << v;
            v += 8;
          }
          r.length = y;
          if (r.head) {
            r.head.extra_len = y;
          }
          if (r.flags & 512) {
            z[0] = y & 255;
            z[1] = y >>> 8 & 255;
            r.check = s(r.check, z, 2, 0);
          }
          y = 0;
          v = 0;
        } else if (r.head) {
          r.head.extra = null;
        }
        r.mode = 6;
      case 6:
        if (r.flags & 1024 && ((M = r.length) > m && (M = m), M && (r.head && (N = r.head.extra_len - r.length, r.head.extra ||= new Array(r.head.extra_len), n.arraySet(r.head.extra, l, d, M, N)), r.flags & 512 && (r.check = s(r.check, l, M, d)), m -= M, d += M, r.length -= M), r.length)) {
          break t;
        }
        r.length = 0;
        r.mode = 7;
      case 7:
        if (r.flags & 2048) {
          if (m === 0) {
            break t;
          }
          M = 0;
          do {
            N = l[d + M++];
            if (r.head && N && r.length < 65536) {
              r.head.name += String.fromCharCode(N);
            }
          } while (N && M < m);
          if (r.flags & 512) {
            r.check = s(r.check, l, M, d);
          }
          m -= M;
          d += M;
          if (N) {
            break t;
          }
        } else if (r.head) {
          r.head.name = null;
        }
        r.length = 0;
        r.mode = 8;
      case 8:
        if (r.flags & 4096) {
          if (m === 0) {
            break t;
          }
          M = 0;
          do {
            N = l[d + M++];
            if (r.head && N && r.length < 65536) {
              r.head.comment += String.fromCharCode(N);
            }
          } while (N && M < m);
          if (r.flags & 512) {
            r.check = s(r.check, l, M, d);
          }
          m -= M;
          d += M;
          if (N) {
            break t;
          }
        } else if (r.head) {
          r.head.comment = null;
        }
        r.mode = 9;
      case 9:
        if (r.flags & 512) {
          while (v < 16) {
            if (m === 0) {
              break t;
            }
            m--;
            y += l[d++] << v;
            v += 8;
          }
          if (y !== (r.check & 65535)) {
            t.msg = "header crc mismatch";
            r.mode = f;
            break;
          }
          y = 0;
          v = 0;
        }
        if (r.head) {
          r.head.hcrc = r.flags >> 9 & 1;
          r.head.done = true;
        }
        t.adler = r.check = 0;
        r.mode = h;
        break;
      case 10:
        while (v < 32) {
          if (m === 0) {
            break t;
          }
          m--;
          y += l[d++] << v;
          v += 8;
        }
        t.adler = r.check = c(y);
        y = 0;
        v = 0;
        r.mode = 11;
      case 11:
        if (r.havedict === 0) {
          t.next_out = g;
          t.avail_out = _;
          t.next_in = d;
          t.avail_in = m;
          r.hold = y;
          r.bits = v;
          return 2;
        }
        t.adler = r.check = 1;
        r.mode = h;
      case h:
        if (e === 5 || e === 6) {
          break t;
        }
      case 13:
        if (r.last) {
          y >>>= v & 7;
          v -= v & 7;
          r.mode = 27;
          break;
        }
        while (v < 3) {
          if (m === 0) {
            break t;
          }
          m--;
          y += l[d++] << v;
          v += 8;
        }
        r.last = y & 1;
        v -= 1;
        switch ((y >>>= 1) & 3) {
          case 0:
            r.mode = 14;
            break;
          case 1:
            b(r);
            r.mode = 20;
            if (e === 6) {
              y >>>= 2;
              v -= 2;
              break t;
            }
            break;
          case 2:
            r.mode = 17;
            break;
          case 3:
            t.msg = "invalid block type";
            r.mode = f;
        }
        y >>>= 2;
        v -= 2;
        break;
      case 14:
        y >>>= v & 7;
        v -= v & 7;
        while (v < 32) {
          if (m === 0) {
            break t;
          }
          m--;
          y += l[d++] << v;
          v += 8;
        }
        if ((y & 65535) != (y >>> 16 ^ 65535)) {
          t.msg = "invalid stored block lengths";
          r.mode = f;
          break;
        }
        r.length = y & 65535;
        y = 0;
        v = 0;
        r.mode = 15;
        if (e === 6) {
          break t;
        }
      case 15:
        r.mode = 16;
      case 16:
        if (M = r.length) {
          if (M > m) {
            M = m;
          }
          if (M > _) {
            M = _;
          }
          if (M === 0) {
            break t;
          }
          n.arraySet(p, l, d, M, g);
          m -= M;
          d += M;
          _ -= M;
          g += M;
          r.length -= M;
          break;
        }
        r.mode = h;
        break;
      case 17:
        while (v < 14) {
          if (m === 0) {
            break t;
          }
          m--;
          y += l[d++] << v;
          v += 8;
        }
        r.nlen = 257 + (y & 31);
        y >>>= 5;
        v -= 5;
        r.ndist = 1 + (y & 31);
        y >>>= 5;
        v -= 5;
        r.ncode = 4 + (y & 15);
        y >>>= 4;
        v -= 4;
        if (r.nlen > 286 || r.ndist > 30) {
          t.msg = "too many length or distance symbols";
          r.mode = f;
          break;
        }
        r.have = 0;
        r.mode = 18;
      case 18:
        while (r.have < r.ncode) {
          while (v < 3) {
            if (m === 0) {
              break t;
            }
            m--;
            y += l[d++] << v;
            v += 8;
          }
          r.lens[j[r.have++]] = y & 7;
          y >>>= 3;
          v -= 3;
        }
        while (r.have < 19) {
          r.lens[j[r.have++]] = 0;
        }
        r.lencode = r.lendyn;
        r.lenbits = 7;
        k = {
          bits: r.lenbits
        };
        C = o(0, r.lens, 0, 19, r.lencode, 0, r.work, k);
        r.lenbits = k.bits;
        if (C) {
          t.msg = "invalid code lengths set";
          r.mode = f;
          break;
        }
        r.have = 0;
        r.mode = 19;
      case 19:
        while (r.have < r.nlen + r.ndist) {
          while (B = (U = r.lencode[y & (1 << r.lenbits) - 1]) >>> 16 & 255, P = U & 65535, !((S = U >>> 24) <= v)) {
            if (m === 0) {
              break t;
            }
            m--;
            y += l[d++] << v;
            v += 8;
          }
          if (P < 16) {
            y >>>= S;
            v -= S;
            r.lens[r.have++] = P;
          } else {
            if (P === 16) {
              for (x = S + 2; v < x;) {
                if (m === 0) {
                  break t;
                }
                m--;
                y += l[d++] << v;
                v += 8;
              }
              y >>>= S;
              v -= S;
              if (r.have === 0) {
                t.msg = "invalid bit length repeat";
                r.mode = f;
                break;
              }
              N = r.lens[r.have - 1];
              M = 3 + (y & 3);
              y >>>= 2;
              v -= 2;
            } else if (P === 17) {
              for (x = S + 3; v < x;) {
                if (m === 0) {
                  break t;
                }
                m--;
                y += l[d++] << v;
                v += 8;
              }
              v -= S;
              N = 0;
              M = 3 + ((y >>>= S) & 7);
              y >>>= 3;
              v -= 3;
            } else {
              for (x = S + 7; v < x;) {
                if (m === 0) {
                  break t;
                }
                m--;
                y += l[d++] << v;
                v += 8;
              }
              v -= S;
              N = 0;
              M = 11 + ((y >>>= S) & 127);
              y >>>= 7;
              v -= 7;
            }
            if (r.have + M > r.nlen + r.ndist) {
              t.msg = "invalid bit length repeat";
              r.mode = f;
              break;
            }
            while (M--) {
              r.lens[r.have++] = N;
            }
          }
        }
        if (r.mode === f) {
          break;
        }
        if (r.lens[256] === 0) {
          t.msg = "invalid code -- missing end-of-block";
          r.mode = f;
          break;
        }
        r.lenbits = 9;
        k = {
          bits: r.lenbits
        };
        C = o(1, r.lens, 0, r.nlen, r.lencode, 0, r.work, k);
        r.lenbits = k.bits;
        if (C) {
          t.msg = "invalid literal/lengths set";
          r.mode = f;
          break;
        }
        r.distbits = 6;
        r.distcode = r.distdyn;
        k = {
          bits: r.distbits
        };
        C = o(2, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, k);
        r.distbits = k.bits;
        if (C) {
          t.msg = "invalid distances set";
          r.mode = f;
          break;
        }
        r.mode = 20;
        if (e === 6) {
          break t;
        }
      case 20:
        r.mode = 21;
      case 21:
        if (m >= 6 && _ >= 258) {
          t.next_out = g;
          t.avail_out = _;
          t.next_in = d;
          t.avail_in = m;
          r.hold = y;
          r.bits = v;
          a(t, E);
          g = t.next_out;
          p = t.output;
          _ = t.avail_out;
          d = t.next_in;
          l = t.input;
          m = t.avail_in;
          y = r.hold;
          v = r.bits;
          if (r.mode === h) {
            r.back = -1;
          }
          break;
        }
        for (r.back = 0; B = (U = r.lencode[y & (1 << r.lenbits) - 1]) >>> 16 & 255, P = U & 65535, !((S = U >>> 24) <= v);) {
          if (m === 0) {
            break t;
          }
          m--;
          y += l[d++] << v;
          v += 8;
        }
        if (B && (B & 240) == 0) {
          R = S;
          D = B;
          O = P;
          while (B = (U = r.lencode[O + ((y & (1 << R + D) - 1) >> R)]) >>> 16 & 255, P = U & 65535, !(R + (S = U >>> 24) <= v)) {
            if (m === 0) {
              break t;
            }
            m--;
            y += l[d++] << v;
            v += 8;
          }
          y >>>= R;
          v -= R;
          r.back += R;
        }
        y >>>= S;
        v -= S;
        r.back += S;
        r.length = P;
        if (B === 0) {
          r.mode = 26;
          break;
        }
        if (B & 32) {
          r.back = -1;
          r.mode = h;
          break;
        }
        if (B & 64) {
          t.msg = "invalid literal/length code";
          r.mode = f;
          break;
        }
        r.extra = B & 15;
        r.mode = 22;
      case 22:
        if (r.extra) {
          for (x = r.extra; v < x;) {
            if (m === 0) {
              break t;
            }
            m--;
            y += l[d++] << v;
            v += 8;
          }
          r.length += y & (1 << r.extra) - 1;
          y >>>= r.extra;
          v -= r.extra;
          r.back += r.extra;
        }
        r.was = r.length;
        r.mode = 23;
      case 23:
        while (B = (U = r.distcode[y & (1 << r.distbits) - 1]) >>> 16 & 255, P = U & 65535, !((S = U >>> 24) <= v)) {
          if (m === 0) {
            break t;
          }
          m--;
          y += l[d++] << v;
          v += 8;
        }
        if ((B & 240) == 0) {
          R = S;
          D = B;
          O = P;
          while (B = (U = r.distcode[O + ((y & (1 << R + D) - 1) >> R)]) >>> 16 & 255, P = U & 65535, !(R + (S = U >>> 24) <= v)) {
            if (m === 0) {
              break t;
            }
            m--;
            y += l[d++] << v;
            v += 8;
          }
          y >>>= R;
          v -= R;
          r.back += R;
        }
        y >>>= S;
        v -= S;
        r.back += S;
        if (B & 64) {
          t.msg = "invalid distance code";
          r.mode = f;
          break;
        }
        r.offset = P;
        r.extra = B & 15;
        r.mode = 24;
      case 24:
        if (r.extra) {
          for (x = r.extra; v < x;) {
            if (m === 0) {
              break t;
            }
            m--;
            y += l[d++] << v;
            v += 8;
          }
          r.offset += y & (1 << r.extra) - 1;
          y >>>= r.extra;
          v -= r.extra;
          r.back += r.extra;
        }
        if (r.offset > r.dmax) {
          t.msg = "invalid distance too far back";
          r.mode = f;
          break;
        }
        r.mode = 25;
      case 25:
        if (_ === 0) {
          break t;
        }
        M = E - _;
        if (r.offset > M) {
          if ((M = r.offset - M) > r.whave && r.sane) {
            t.msg = "invalid distance too far back";
            r.mode = f;
            break;
          }
          if (M > r.wnext) {
            M -= r.wnext;
            A = r.wsize - M;
          } else {
            A = r.wnext - M;
          }
          if (M > r.length) {
            M = r.length;
          }
          T = r.window;
        } else {
          T = p;
          A = g - r.offset;
          M = r.length;
        }
        if (M > _) {
          M = _;
        }
        _ -= M;
        r.length -= M;
        do {
          p[g++] = T[A++];
        } while (--M);
        if (r.length === 0) {
          r.mode = 21;
        }
        break;
      case 26:
        if (_ === 0) {
          break t;
        }
        p[g++] = r.length;
        _--;
        r.mode = 21;
        break;
      case 27:
        if (r.wrap) {
          while (v < 32) {
            if (m === 0) {
              break t;
            }
            m--;
            y |= l[d++] << v;
            v += 8;
          }
          E -= _;
          t.total_out += E;
          r.total += E;
          if (E) {
            t.adler = r.check = r.flags ? s(r.check, p, E, g - E) : i(r.check, p, E, g - E);
          }
          E = _;
          if ((r.flags ? y : c(y)) !== r.check) {
            t.msg = "incorrect data check";
            r.mode = f;
            break;
          }
          y = 0;
          v = 0;
        }
        r.mode = 28;
      case 28:
        if (r.wrap && r.flags) {
          while (v < 32) {
            if (m === 0) {
              break t;
            }
            m--;
            y += l[d++] << v;
            v += 8;
          }
          if (y !== (r.total & -1)) {
            t.msg = "incorrect length check";
            r.mode = f;
            break;
          }
          y = 0;
          v = 0;
        }
        r.mode = 29;
      case 29:
        C = 1;
        break t;
      case f:
        C = -3;
        break t;
      case 31:
        return -4;
      default:
        return u;
    }
  }
  t.next_out = g;
  t.avail_out = _;
  t.next_in = d;
  t.avail_in = m;
  r.hold = y;
  r.bits = v;
  if ((r.wsize || E !== t.avail_out && r.mode < f && (r.mode < 27 || e !== 4)) && I(t, t.output, t.next_out, E - t.avail_out)) {
    r.mode = 31;
    return -4;
  } else {
    w -= t.avail_in;
    E -= t.avail_out;
    t.total_in += w;
    t.total_out += E;
    r.total += E;
    if (r.wrap && E) {
      t.adler = r.check = r.flags ? s(r.check, p, E, t.next_out - E) : i(r.check, p, E, t.next_out - E);
    }
    t.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === h ? 128 : 0) + (r.mode === 20 || r.mode === 15 ? 256 : 0);
    if ((w === 0 && E === 0 || e === 4) && C === 0) {
      C = -5;
    }
    return C;
  }
};
export var inflateEnd = function (t) {
  if (!t || !t.state) {
    return u;
  }
  var e = t.state;
  e.window &&= null;
  t.state = null;
  return 0;
};
export var inflateGetHeader = function (t, e) {
  var r;
  if (t && t.state) {
    if (((r = t.state).wrap & 2) == 0) {
      return u;
    } else {
      r.head = e;
      e.done = false;
      return 0;
    }
  } else {
    return u;
  }
};
export var inflateSetDictionary = function (t, e) {
  var r;
  var n = e.length;
  if (t && t.state) {
    if ((r = t.state).wrap !== 0 && r.mode !== 11) {
      return u;
    } else if (r.mode === 11 && i(1, e, n, 0) !== r.check) {
      return -3;
    } else if (I(t, e, n, n)) {
      r.mode = 31;
      return -4;
    } else {
      r.havedict = 1;
      return 0;
    }
  } else {
    return u;
  }
};
export var inflateInfo = "pako inflate (from Nodeca project)";