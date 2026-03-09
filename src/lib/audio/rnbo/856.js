import * as n from "./400.js";
import * as i from "./389.js";
import h from "./133.js";
export let rH = n.r;
export let EX = n.E;
export function IR(t) {
  return class extends t {
    constructor(...t) {
      super();
      this.changeEvent = new i.BM();
      this.L = new i.BM();
      const e = t[0];
      this.X = e.notificationSetting;
      this.convertFromNormalizedValue = e.scaling.convertFromNormalized;
      this.convertToNormalizedValue = e.scaling.convertToNormalized;
      this.constrainParameterValue = e.scaling.constrainParameterValue;
      this.initialValue = e.initialValue;
      this.V = e.initialValue;
      this.displayName = e.displayName || e.name;
      this.exponent = e.exponent;
      this.id = e.id;
      this.index = e.index;
      this.min = e.min;
      this.max = e.max;
      this.name = e.name;
      this.steps = e.steps;
      this.unit = e.unit || "";
    }
    get notificationSetting() {
      return this.X;
    }
    get normalizedValue() {
      return this.convertToNormalizedValue(this.V);
    }
    set normalizedValue(t) {
      this.q(this.convertFromNormalizedValue(t));
    }
    W(t) {
      this.X = t;
    }
    q(t) {
      t = this.constrainParameterValue(t);
      if (this.V !== t) {
        this.V = t;
        this.L.emit(this);
        if (this.notificationSetting === n.E.All) {
          this.changeEvent.emit(t);
        }
      }
    }
    $(t) {
      this.V = t;
      this.changeEvent.emit(t);
    }
  };
}
export class BX extends IR(Object) {
  constructor(t) {
    super(t);
    this.type = n.r.Number;
  }
  get value() {
    return this.V;
  }
  set value(t) {
    this.q(t);
  }
}
export class V2 extends IR(Object) {
  constructor(t) {
    super(t);
    this.type = n.r.Enum;
    this.G = t.enumValues;
  }
  get enumValues() {
    return this.G.slice();
  }
  get enumValue() {
    return this.G[this.value];
  }
  set enumValue(t) {
    const e = this.G.indexOf(t);
    if (e < 0) {
      throw new Error(`Invalid EnumValue. ${t} is not an available value on the enum parameter ${this.name}`);
    }
    this.value = e;
  }
  get value() {
    return this.V;
  }
  set value(t) {
    this.q(t);
  }
}
export class jN extends IR(Object) {
  constructor() {
    super(...arguments);
    this.type = n.r.Bang;
  }
  get isActive() {
    return this.V === 1;
  }
  bang() {
    this.q(1);
  }
}
export const zT = (t, e, r, i) => t.type === n.r.Number && t.enumValues.length ? new V2(Object.assign(Object.assign({}, t), {
  scaling: i,
  index: e,
  notificationSetting: r
})) : t.type === n.r.Bang ? new jN(Object.assign(Object.assign({}, t), {
  scaling: i,
  index: e,
  notificationSetting: r
})) : (t.type, n.r.Number, new BX(Object.assign(Object.assign({}, t), {
  scaling: i,
  index: e,
  notificationSetting: r
})));
export class aO {
  constructor() {
    this.K = {};
    this.Y = new Float32Array(128);
  }
  addParam(t, e) {
    if (t.type == h.ParameterTypeSignal && t.ioType === h.IOTypeInput) {
      this.K[t.signalIndex] = {
        name: e,
        param: new Float32Array(128)
      };
    }
  }
  getParamName(t) {
    let e = this.K[t];
    if (e !== undefined) {
      return e.name;
    } else {
      return undefined;
    }
  }
  getParamArray(t, e, r) {
    if (e.length == r) {
      return e;
    }
    {
      let n = this.K[t];
      if (n.param.length != r) {
        n.param = new Float32Array(r);
      }
      return n.param.fill(e[0]);
    }
  }
}