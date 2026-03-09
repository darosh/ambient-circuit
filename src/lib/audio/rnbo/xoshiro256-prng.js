function e(t, e, r, n) {
  r[n] = t[e] + 0x9e3779b97f4a7c15n;
  r[n] = 0xbf58476d1ce4e5b9n * (r[n] ^ r[n] >> 30n);
  r[n] = 0x94d049bb133111ebn * (r[n] ^ r[n] >> 27n);
  r[n] = r[n] ^ r[n] >> 31n;
}
export default {
  reset: function (t, r) {
    let n = new BigUint64Array(1);
    n[0] = BigInt(Math.trunc(t * 1000000));
    e(n, 0, r, 0);
    e(r, 0, r, 1);
    e(r, 1, r, 2);
    e(r, 2, r, 3);
  },
  next: function (t) {
    let e = new BigUint64Array(1);
    let r = new BigUint64Array(1);
    r[0] = t[0] + t[3];
    e[0] = t[1] << 17n;
    t[2] ^= t[0];
    t[3] ^= t[1];
    t[1] ^= t[2];
    t[0] ^= t[3];
    t[2] ^= e[0];
    t[3] = t[3] << 45n | t[3] >> 19n;
    r[0] = r[0] >> 11n;
    return Number(r[0]) * 2.220446049250313e-16 - 1;
  }
};