export var byteLength = function (t) {
  var e = u(t);
  var r = e[0];
  var n = e[1];
  return (r + n) * 3 / 4 - n;
};
export var toByteArray = function (t) {
  var e;
  var r;
  var s = u(t);
  var a = s[0];
  var o = s[1];
  var h = new i(function (t, e, r) {
    return (e + r) * 3 / 4 - r;
  }(0, a, o));
  var f = 0;
  var c = o > 0 ? a - 4 : a;
  for (r = 0; r < c; r += 4) {
    e = n[t.charCodeAt(r)] << 18 | n[t.charCodeAt(r + 1)] << 12 | n[t.charCodeAt(r + 2)] << 6 | n[t.charCodeAt(r + 3)];
    h[f++] = e >> 16 & 255;
    h[f++] = e >> 8 & 255;
    h[f++] = e & 255;
  }
  if (o === 2) {
    e = n[t.charCodeAt(r)] << 2 | n[t.charCodeAt(r + 1)] >> 4;
    h[f++] = e & 255;
  }
  if (o === 1) {
    e = n[t.charCodeAt(r)] << 10 | n[t.charCodeAt(r + 1)] << 4 | n[t.charCodeAt(r + 2)] >> 2;
    h[f++] = e >> 8 & 255;
    h[f++] = e & 255;
  }
  return h;
};
export var fromByteArray = function (t) {
  var e;
  var n = t.length;
  var i = n % 3;
  var s = [];
  for (var a = 16383, o = 0, u = n - i; o < u; o += a) {
    s.push(h(t, o, o + a > u ? u : o + a));
  }
  if (i === 1) {
    e = t[n - 1];
    s.push(r[e >> 2] + r[e << 4 & 63] + "==");
  } else if (i === 2) {
    e = (t[n - 2] << 8) + t[n - 1];
    s.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "=");
  }
  return s.join("");
};
var r = [];
var n = [];
var i = typeof Uint8Array != "undefined" ? Uint8Array : Array;
var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var a = 0, o = s.length; a < o; ++a) {
  r[a] = s[a];
  n[s.charCodeAt(a)] = a;
}
function u(t) {
  var e = t.length;
  if (e % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var r = t.indexOf("=");
  if (r === -1) {
    r = e;
  }
  return [r, r === e ? 0 : 4 - r % 4];
}
function h(t, e, n) {
  var i;
  var s;
  var a = [];
  for (var o = e; o < n; o += 3) {
    i = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (t[o + 2] & 255);
    a.push(r[(s = i) >> 18 & 63] + r[s >> 12 & 63] + r[s >> 6 & 63] + r[s & 63]);
  }
  return a.join("");
}
n["-".charCodeAt(0)] = 62;
n["_".charCodeAt(0)] = 63;