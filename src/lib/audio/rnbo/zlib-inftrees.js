import * as n from "./zlib-utils.js";
var i = 15;
var s = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
var a = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78];
var o = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0];
var u = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
export default function (t, e, r, h, f, c, l, p) {
  var d;
  var g;
  var m;
  var _;
  var y;
  var v;
  var b;
  var I;
  var w;
  var E = p.bits;
  var M = 0;
  var A = 0;
  var T = 0;
  var S = 0;
  var B = 0;
  var P = 0;
  var R = 0;
  var D = 0;
  var O = 0;
  var N = 0;
  var C = null;
  var k = 0;
  var x = new n.Buf16(16);
  var U = new n.Buf16(16);
  var z = null;
  var j = 0;
  for (M = 0; M <= i; M++) {
    x[M] = 0;
  }
  for (A = 0; A < h; A++) {
    x[e[r + A]]++;
  }
  B = E;
  S = i;
  for (; S >= 1 && x[S] === 0; S--);
  if (B > S) {
    B = S;
  }
  if (S === 0) {
    f[c++] = 20971520;
    f[c++] = 20971520;
    p.bits = 1;
    return 0;
  }
  for (T = 1; T < S && x[T] === 0; T++);
  if (B < T) {
    B = T;
  }
  D = 1;
  M = 1;
  for (; M <= i; M++) {
    D <<= 1;
    if ((D -= x[M]) < 0) {
      return -1;
    }
  }
  if (D > 0 && (t === 0 || S !== 1)) {
    return -1;
  }
  U[1] = 0;
  M = 1;
  for (; M < i; M++) {
    U[M + 1] = U[M] + x[M];
  }
  for (A = 0; A < h; A++) {
    if (e[r + A] !== 0) {
      l[U[e[r + A]]++] = A;
    }
  }
  if (t === 0) {
    C = z = l;
    v = 19;
  } else if (t === 1) {
    C = s;
    k -= 257;
    z = a;
    j -= 257;
    v = 256;
  } else {
    C = o;
    z = u;
    v = -1;
  }
  N = 0;
  A = 0;
  M = T;
  y = c;
  P = B;
  R = 0;
  m = -1;
  _ = (O = 1 << B) - 1;
  if (t === 1 && O > 852 || t === 2 && O > 592) {
    return 1;
  }
  while (true) {
    b = M - R;
    if (l[A] < v) {
      I = 0;
      w = l[A];
    } else if (l[A] > v) {
      I = z[j + l[A]];
      w = C[k + l[A]];
    } else {
      I = 96;
      w = 0;
    }
    d = 1 << M - R;
    T = g = 1 << P;
    do {
      f[y + (N >> R) + (g -= d)] = b << 24 | I << 16 | w | 0;
    } while (g !== 0);
    for (d = 1 << M - 1; N & d;) {
      d >>= 1;
    }
    if (d !== 0) {
      N &= d - 1;
      N += d;
    } else {
      N = 0;
    }
    A++;
    if (--x[M] == 0) {
      if (M === S) {
        break;
      }
      M = e[r + l[A]];
    }
    if (M > B && (N & _) !== m) {
      if (R === 0) {
        R = B;
      }
      y += T;
      D = 1 << (P = M - R);
      while (P + R < S && !((D -= x[P + R]) <= 0)) {
        P++;
        D <<= 1;
      }
      O += 1 << P;
      if (t === 1 && O > 852 || t === 2 && O > 592) {
        return 1;
      }
      f[m = N & _] = B << 24 | P << 16 | y - c | 0;
    }
  }
  if (N !== 0) {
    f[y + N] = M - R << 24 | 4194304 | 0;
  }
  p.bits = B;
  return 0;
};