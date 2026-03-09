export default function (t, e, r, n) {
  var i = t & 65535 | 0;
  var s = t >>> 16 & 65535 | 0;
  var a = 0;
  for (; r !== 0;) {
    r -= a = r > 2000 ? 2000 : r;
    do {
      s = s + (i = i + e[n++] | 0) | 0;
    } while (--a);
    i %= 65521;
    s %= 65521;
  }
  return i | s << 16 | 0;
};