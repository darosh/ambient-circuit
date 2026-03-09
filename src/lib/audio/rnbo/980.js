export default function (t, e) {
  var r;
  var n;
  var i;
  var s;
  var a;
  var o;
  var u;
  var h;
  var f;
  var c;
  var l;
  var p;
  var d;
  var g;
  var m;
  var _;
  var y;
  var v;
  var b;
  var I;
  var w;
  var E;
  var M;
  var A;
  var T;
  r = t.state;
  n = t.next_in;
  A = t.input;
  i = n + (t.avail_in - 5);
  s = t.next_out;
  T = t.output;
  a = s - (e - t.avail_out);
  o = s + (t.avail_out - 257);
  u = r.dmax;
  h = r.wsize;
  f = r.whave;
  c = r.wnext;
  l = r.window;
  p = r.hold;
  d = r.bits;
  g = r.lencode;
  m = r.distcode;
  _ = (1 << r.lenbits) - 1;
  y = (1 << r.distbits) - 1;
  t: do {
    if (d < 15) {
      p += A[n++] << d;
      d += 8;
      p += A[n++] << d;
      d += 8;
    }
    v = g[p & _];
    e: while (true) {
      p >>>= b = v >>> 24;
      d -= b;
      if ((b = v >>> 16 & 255) == 0) {
        T[s++] = v & 65535;
      } else {
        if (!(b & 16)) {
          if ((b & 64) == 0) {
            v = g[(v & 65535) + (p & (1 << b) - 1)];
            continue e;
          }
          if (b & 32) {
            r.mode = 12;
            break t;
          }
          t.msg = "invalid literal/length code";
          r.mode = 30;
          break t;
        }
        I = v & 65535;
        if (b &= 15) {
          if (d < b) {
            p += A[n++] << d;
            d += 8;
          }
          I += p & (1 << b) - 1;
          p >>>= b;
          d -= b;
        }
        if (d < 15) {
          p += A[n++] << d;
          d += 8;
          p += A[n++] << d;
          d += 8;
        }
        v = m[p & y];
        r: while (true) {
          p >>>= b = v >>> 24;
          d -= b;
          if (!((b = v >>> 16 & 255) & 16)) {
            if ((b & 64) == 0) {
              v = m[(v & 65535) + (p & (1 << b) - 1)];
              continue r;
            }
            t.msg = "invalid distance code";
            r.mode = 30;
            break t;
          }
          w = v & 65535;
          if (d < (b &= 15)) {
            p += A[n++] << d;
            if ((d += 8) < b) {
              p += A[n++] << d;
              d += 8;
            }
          }
          if ((w += p & (1 << b) - 1) > u) {
            t.msg = "invalid distance too far back";
            r.mode = 30;
            break t;
          }
          p >>>= b;
          d -= b;
          if (w > (b = s - a)) {
            if ((b = w - b) > f && r.sane) {
              t.msg = "invalid distance too far back";
              r.mode = 30;
              break t;
            }
            E = 0;
            M = l;
            if (c === 0) {
              E += h - b;
              if (b < I) {
                I -= b;
                do {
                  T[s++] = l[E++];
                } while (--b);
                E = s - w;
                M = T;
              }
            } else if (c < b) {
              E += h + c - b;
              if ((b -= c) < I) {
                I -= b;
                do {
                  T[s++] = l[E++];
                } while (--b);
                E = 0;
                if (c < I) {
                  I -= b = c;
                  do {
                    T[s++] = l[E++];
                  } while (--b);
                  E = s - w;
                  M = T;
                }
              }
            } else {
              E += c - b;
              if (b < I) {
                I -= b;
                do {
                  T[s++] = l[E++];
                } while (--b);
                E = s - w;
                M = T;
              }
            }
            while (I > 2) {
              T[s++] = M[E++];
              T[s++] = M[E++];
              T[s++] = M[E++];
              I -= 3;
            }
            if (I) {
              T[s++] = M[E++];
              if (I > 1) {
                T[s++] = M[E++];
              }
            }
          } else {
            E = s - w;
            do {
              T[s++] = T[E++];
              T[s++] = T[E++];
              T[s++] = T[E++];
              I -= 3;
            } while (I > 2);
            if (I) {
              T[s++] = T[E++];
              if (I > 1) {
                T[s++] = T[E++];
              }
            }
          }
          break;
        }
      }
      break;
    }
  } while (n < i && s < o);
  n -= I = d >> 3;
  p &= (1 << (d -= I << 3)) - 1;
  t.next_in = n;
  t.next_out = s;
  t.avail_in = n < i ? i - n + 5 : 5 - (n - i);
  t.avail_out = s < o ? o - s + 257 : 257 - (s - o);
  r.hold = p;
  r.bits = d;
};