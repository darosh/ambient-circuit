export const f8 = (() => {
  try {
    if (typeof WebAssembly == "object" && typeof WebAssembly.instantiate == "function") {
      const t = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
      if (t instanceof WebAssembly.Module) {
        return new WebAssembly.Instance(t) instanceof WebAssembly.Instance;
      }
    }
  } catch (t) {}
  return false;
})();
export class e1 {
  fromRNBOtime(t) {
    return t * 0.001;
  }
  toRNBOtime(t) {
    return t * 1000;
  }
}
export const I7 = typeof isSecureContext != "undefined" && isSecureContext && typeof AudioWorkletNode != "undefined";
let a = Math.pow(10, 4);
export const EL = () => {
  if (a >= Number.MAX_SAFE_INTEGER) {
    a = Math.pow(10, 4);
  }
  return parseInt(`${Date.now().toString(10).slice(-3)}${(a++).toString(10).slice(-4)}`, 10);
};
const u = t => t.slice();
export class BM {
  constructor() {
    this.Z = [];
    this.H = [];
  }
  get listenerCount() {
    return this.Z.length + this.H.length;
  }
  emit(t) {
    if (this.Z.length) {
      const e = u(this.Z);
      for (let r = 0, n = e.length; r < n; r++) {
        e[r](t);
      }
    }
    if (this.H.length) {
      const e = u(this.H);
      for (let r = 0, n = e.length; r < n; r++) {
        e[r](t);
      }
      e.forEach(t => this.unsubscribe(t));
    }
  }
  once(t) {
    this.H.push(t);
    return {
      unsubscribe: () => this.unsubscribe(t)
    };
  }
  subscribe(t) {
    this.Z.push(t);
    return {
      unsubscribe: () => this.unsubscribe(t)
    };
  }
  unsubscribe(t) {
    const e = this.Z.indexOf(t);
    if (e >= 0) {
      this.Z.splice(e, 1);
    }
    const r = this.H.indexOf(t);
    if (r >= 0) {
      this.H.splice(r, 1);
    }
  }
  removeAllSubscriptions() {
    this.Z = [];
    this.H = [];
  }
}