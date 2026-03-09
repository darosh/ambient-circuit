import * as n from "./zlib-utils.js";
var i = true;
var s = true;
try {
  String.fromCharCode.apply(null, [0]);
} catch (t) {
  i = false;
}
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch (t) {
  s = false;
}
var a = new n.Buf8(256);
for (var o = 0; o < 256; o++) {
  a[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1;
}
function u(t, e) {
  if (e < 65534 && (t.subarray && s || !t.subarray && i)) {
    return String.fromCharCode.apply(null, n.shrinkBuf(t, e));
  }
  var r = "";
  for (var a = 0; a < e; a++) {
    r += String.fromCharCode(t[a]);
  }
  return r;
}
a[254] = a[254] = 1;
export var string2buf = function (t) {
  var e;
  var r;
  var i;
  var s;
  var a;
  var o = t.length;
  var u = 0;
  for (s = 0; s < o; s++) {
    if (((r = t.charCodeAt(s)) & 64512) == 55296 && s + 1 < o && ((i = t.charCodeAt(s + 1)) & 64512) == 56320) {
      r = 65536 + (r - 55296 << 10) + (i - 56320);
      s++;
    }
    u += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
  }
  e = new n.Buf8(u);
  a = 0;
  s = 0;
  for (; a < u; s++) {
    if (((r = t.charCodeAt(s)) & 64512) == 55296 && s + 1 < o && ((i = t.charCodeAt(s + 1)) & 64512) == 56320) {
      r = 65536 + (r - 55296 << 10) + (i - 56320);
      s++;
    }
    if (r < 128) {
      e[a++] = r;
    } else if (r < 2048) {
      e[a++] = r >>> 6 | 192;
      e[a++] = r & 63 | 128;
    } else if (r < 65536) {
      e[a++] = r >>> 12 | 224;
      e[a++] = r >>> 6 & 63 | 128;
      e[a++] = r & 63 | 128;
    } else {
      e[a++] = r >>> 18 | 240;
      e[a++] = r >>> 12 & 63 | 128;
      e[a++] = r >>> 6 & 63 | 128;
      e[a++] = r & 63 | 128;
    }
  }
  return e;
};
export var buf2binstring = function (t) {
  return u(t, t.length);
};
export var binstring2buf = function (t) {
  var e = new n.Buf8(t.length);
  for (var r = 0, i = e.length; r < i; r++) {
    e[r] = t.charCodeAt(r);
  }
  return e;
};
export var buf2string = function (t, e) {
  var r;
  var n;
  var i;
  var s;
  var o = e || t.length;
  var h = new Array(o * 2);
  n = 0;
  r = 0;
  while (r < o) {
    if ((i = t[r++]) < 128) {
      h[n++] = i;
    } else if ((s = a[i]) > 4) {
      h[n++] = 65533;
      r += s - 1;
    } else {
      for (i &= s === 2 ? 31 : s === 3 ? 15 : 7; s > 1 && r < o;) {
        i = i << 6 | t[r++] & 63;
        s--;
      }
      if (s > 1) {
        h[n++] = 65533;
      } else if (i < 65536) {
        h[n++] = i;
      } else {
        i -= 65536;
        h[n++] = i >> 10 & 1023 | 55296;
        h[n++] = i & 1023 | 56320;
      }
    }
  }
  return u(h, n);
};
export var utf8border = function (t, e) {
  var r;
  if ((e = e || t.length) > t.length) {
    e = t.length;
  }
  r = e - 1;
  while (r >= 0 && (t[r] & 192) == 128) {
    r--;
  }
  if (r < 0 || r === 0) {
    return e;
  } else if (r + a[t[r]] > e) {
    return r;
  } else {
    return e;
  }
};