/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
export var read = function (t, e, r, n, i) {
  var s;
  var a;
  var o = i * 8 - n - 1;
  var u = (1 << o) - 1;
  var h = u >> 1;
  var f = -7;
  var c = r ? i - 1 : 0;
  var l = r ? -1 : 1;
  var p = t[e + c];
  c += l;
  s = p & (1 << -f) - 1;
  p >>= -f;
  f += o;
  for (; f > 0; f -= 8) {
    s = s * 256 + t[e + c];
    c += l;
  }
  a = s & (1 << -f) - 1;
  s >>= -f;
  f += n;
  for (; f > 0; f -= 8) {
    a = a * 256 + t[e + c];
    c += l;
  }
  if (s === 0) {
    s = 1 - h;
  } else {
    if (s === u) {
      if (a) {
        return NaN;
      } else {
        return (p ? -1 : 1) * Infinity;
      }
    }
    a += Math.pow(2, n);
    s -= h;
  }
  return (p ? -1 : 1) * a * Math.pow(2, s - n);
};
export var write = function (t, e, r, n, i, s) {
  var a;
  var o;
  var u;
  var h = s * 8 - i - 1;
  var f = (1 << h) - 1;
  var c = f >> 1;
  var l = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var p = n ? 0 : s - 1;
  var d = n ? 1 : -1;
  var g = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  e = Math.abs(e);
  if (isNaN(e) || e === Infinity) {
    o = isNaN(e) ? 1 : 0;
    a = f;
  } else {
    a = Math.floor(Math.log(e) / Math.LN2);
    if (e * (u = Math.pow(2, -a)) < 1) {
      a--;
      u *= 2;
    }
    if ((e += a + c >= 1 ? l / u : l * Math.pow(2, 1 - c)) * u >= 2) {
      a++;
      u /= 2;
    }
    if (a + c >= f) {
      o = 0;
      a = f;
    } else if (a + c >= 1) {
      o = (e * u - 1) * Math.pow(2, i);
      a += c;
    } else {
      o = e * Math.pow(2, c - 1) * Math.pow(2, i);
      a = 0;
    }
  }
  for (; i >= 8; i -= 8) {
    t[r + p] = o & 255;
    p += d;
    o /= 256;
  }
  a = a << i | o;
  h += i;
  for (; h > 0; h -= 8) {
    t[r + p] = a & 255;
    p += d;
    a /= 256;
  }
  t[r + p - d] |= g * 128;
};