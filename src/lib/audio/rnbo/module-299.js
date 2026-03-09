var e = function () {
  var t;
  var e = [];
  for (var r = 0; r < 256; r++) {
    t = r;
    for (var n = 0; n < 8; n++) {
      t = t & 1 ? t >>> 1 ^ -306674912 : t >>> 1;
    }
    e[r] = t;
  }
  return e;
}();
export default function (t, r, n, i) {
  var s = e;
  var a = i + n;
  t ^= -1;
  for (var o = i; o < a; o++) {
    t = t >>> 8 ^ s[(t ^ r[o]) & 255];
  }
  return t ^ -1;
};