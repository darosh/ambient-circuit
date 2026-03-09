var r = typeof Uint8Array != "undefined" && typeof Uint16Array != "undefined" && typeof Int32Array != "undefined";
function n(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
export var assign = function (t) {
  for (var e = Array.prototype.slice.call(arguments, 1); e.length;) {
    var r = e.shift();
    if (r) {
      if (typeof r != "object") {
        throw new TypeError(r + "must be non-object");
      }
      for (var i in r) {
        if (n(r, i)) {
          t[i] = r[i];
        }
      }
    }
  }
  return t;
};
export var shrinkBuf = function (t, e) {
  if (t.length === e) {
    return t;
  } else if (t.subarray) {
    return t.subarray(0, e);
  } else {
    t.length = e;
    return t;
  }
};
var i = {
  arraySet: function (t, e, r, n, i) {
    if (e.subarray && t.subarray) {
      t.set(e.subarray(r, r + n), i);
    } else {
      for (var s = 0; s < n; s++) {
        t[i + s] = e[r + s];
      }
    }
  },
  flattenChunks: function (t) {
    var e;
    var r;
    var n;
    var i;
    var s;
    var a;
    n = 0;
    e = 0;
    r = t.length;
    for (; e < r; e++) {
      n += t[e].length;
    }
    a = new Uint8Array(n);
    i = 0;
    e = 0;
    r = t.length;
    for (; e < r; e++) {
      s = t[e];
      a.set(s, i);
      i += s.length;
    }
    return a;
  }
};
var s = {
  arraySet: function (t, e, r, n, i) {
    for (var s = 0; s < n; s++) {
      t[i + s] = e[r + s];
    }
  },
  flattenChunks: function (t) {
    return [].concat.apply([], t);
  }
};
export var Buf8, Buf16, Buf32, arraySet, flattenChunks;
export var setTyped = function (t) {
  if (t) {
    Buf8 = Uint8Array;
    Buf16 = Uint16Array;
    Buf32 = Int32Array;
    arraySet = i.arraySet;
    flattenChunks = i.flattenChunks;
  } else {
    Buf8 = Array;
    Buf16 = Array;
    Buf32 = Array;
    arraySet = s.arraySet;
    flattenChunks = s.flattenChunks;
  }
};
setTyped(r);
