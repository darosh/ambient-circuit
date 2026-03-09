export var m5;
export var VH;
export var l0;
export var gA;
import * as o from "./module-676.js";
(function (t) {
  t[t.BufferTransfer = 0] = "BufferTransfer";
  t[t.ClockEvent = 1] = "ClockEvent";
  t[t.DataRefEvent = 2] = "DataRefEvent";
  t[t.MessageEvent = 3] = "MessageEvent";
  t[t.MIDIEvent = 4] = "MIDIEvent";
  t[t.ParameterEvent = 5] = "ParameterEvent";
  t[t.ParameterBangEvent = 6] = "ParameterBangEvent";
  t[t.PresetEvent = 7] = "PresetEvent";
  t[t.StartupEvent = 8] = "StartupEvent";
  t[t.TransportEvent = 9] = "TransportEvent";
  t[t.TempoEvent = 10] = "TempoEvent";
  t[t.BeatTimeEvent = 11] = "BeatTimeEvent";
  t[t.TimeSignatureEvent = 12] = "TimeSignatureEvent";
})(m5 ||= {});
export class j4 {
  constructor(t = o.D, e) {
    this.invalid = false;
    this.time = t;
    this.eventTarget = e;
  }
  serialize() {
    return {
      eventTarget: this.eventTarget,
      invalid: this.invalid,
      source: this.source,
      time: this.time
    };
  }
}
export class J9 extends j4 {
  constructor(t, e, r, i) {
    super(t, i);
    this.type = m5.ClockEvent;
    this.clockIndex = e;
    this.value = r;
  }
  get hasValue() {
    return this.value !== undefined;
  }
  serialize() {
    return Object.assign(super.serialize(), {
      clockIndex: this.clockIndex,
      type: this.type,
      value: this.value
    });
  }
}
(function (t) {
  t[t.Update = 1] = "Update";
})(VH ||= {});
export class Lk extends j4 {
  constructor(t, e, r, i) {
    super(t, i);
    this.type = m5.DataRefEvent;
    this.dataRefIndex = e;
    this.action = r;
  }
  serialize() {
    return Object.assign(super.serialize(), {
      action: this.action,
      dataRefIndex: this.dataRefIndex,
      type: this.type
    });
  }
}
export class f3 extends j4 {
  constructor(t, e, r, i = "", s) {
    super(t, s);
    this.type = m5.MessageEvent;
    this.objectId = i;
    this.tag = e;
    this.payload = r;
  }
  serialize() {
    return Object.assign(super.serialize(), {
      payload: this.payload,
      objectId: this.objectId,
      tag: this.tag,
      type: this.type
    });
  }
}
export class Ym extends j4 {
  constructor(t, e, r, i) {
    super(t, i);
    this.type = m5.MIDIEvent;
    if (r.length > 3) {
      throw new Error(`MIDIData can only contain a maximum of 3 bytes. Received ${r.length}`);
    }
    this.data = r;
    if (this.data.length < 3) {
      const t = r.length;
      this.data.length = 3;
      this.data = this.data.fill(undefined, t, 3);
    }
    let s = 0;
    for (let t = 0; t < 3; t++) {
      if (r[t] !== undefined) {
        s++;
      }
    }
    if (s < 1) {
      throw new Error("MIDIData must at least have the first byte set.");
    }
    this.length = s;
    this.status = r[0] & 240;
    this.channel = r[0] & 15;
    this.port = e;
  }
  serialize() {
    return Object.assign(super.serialize(), {
      channel: this.channel,
      data: this.data,
      port: this.port,
      type: this.type
    });
  }
}
export class DB extends j4 {
  constructor(t, e, r, i, s) {
    super(t, s);
    this.type = m5.ParameterEvent;
    this.target = e;
    this.value = r;
    this.source = i;
  }
  serialize() {
    return Object.assign(super.serialize(), {
      target: this.target,
      type: this.type,
      value: this.value
    });
  }
}
export class zz extends j4 {
  constructor(t, e, r) {
    super(t, r);
    this.type = m5.ParameterBangEvent;
    this.target = e;
  }
  serialize() {
    return Object.assign(super.serialize(), {
      target: this.target,
      type: this.type
    });
  }
}
(function (t) {
  t[t.Set = 1] = "Set";
  t[t.Touched = 2] = "Touched";
})(l0 ||= {});
export class bt extends j4 {
  constructor(t, e, r) {
    super(t, undefined);
    this.type = m5.PresetEvent;
    this.action = e;
    this.preset = r;
  }
  serialize() {
    return Object.assign(super.serialize(), {
      action: this.action,
      type: this.type,
      preset: this.preset
    });
  }
}
export class cr extends j4 {
  constructor(t, e) {
    super(t, undefined);
    this.type = m5.TransportEvent;
    this.state = e;
  }
  serialize() {
    return Object.assign(super.serialize(), {
      state: this.state,
      type: this.type
    });
  }
}
export class gs extends j4 {
  constructor(t, e) {
    super(t, undefined);
    this.type = m5.TempoEvent;
    this.tempo = e;
  }
  serialize() {
    return Object.assign(super.serialize(), {
      tempo: this.tempo,
      type: this.type
    });
  }
}
export class J0 extends j4 {
  constructor(t, e) {
    super(t, undefined);
    this.type = m5.BeatTimeEvent;
    this.beattime = e;
  }
  serialize() {
    return Object.assign(super.serialize(), {
      beattime: this.beattime,
      type: this.type
    });
  }
}
export class QU extends j4 {
  constructor(t, e, r) {
    super(t, undefined);
    this.type = m5.TimeSignatureEvent;
    this.numerator = e;
    this.denominator = r;
  }
  serialize() {
    return Object.assign(super.serialize(), {
      numerator: this.numerator,
      denominator: this.denominator,
      type: this.type
    });
  }
}
(function (t) {
  t[t.BEGIN = 0] = "BEGIN";
  t[t.END = 1] = "END";
})(gA ||= {});
export class j6 extends j4 {
  constructor(t, e) {
    super(t, undefined);
    this.type = m5.StartupEvent;
    this.phase = e;
  }
  serialize() {
    return Object.assign(super.serialize(), {
      phase: this.phase,
      type: this.type
    });
  }
}
export const f4 = t => {
  switch (t.type) {
    case m5.ClockEvent:
      return new J9(t.time, t.clockIndex, t.value, t.eventTarget);
    case m5.DataRefEvent:
      return new Lk(t.time, t.dataRefIndex, t.action, t.eventTarget);
    case m5.MessageEvent:
      return new f3(t.time, t.tag, t.payload, t.objectId, t.eventTarget);
    case m5.MIDIEvent:
      return new Ym(t.time, t.port, t.data, t.eventTarget);
    case m5.ParameterEvent:
      return new DB(t.time, t.target, t.value, t.source, t.eventTarget);
    case m5.ParameterBangEvent:
      return new zz(t.time, t.target, t.eventTarget);
    case m5.PresetEvent:
      return new bt(t.time, t.action, t.preset);
    case m5.TransportEvent:
      return new cr(t.time, t.state);
    case m5.TempoEvent:
      return new gs(t.time, t.tempo);
    case m5.BeatTimeEvent:
      return new J0(t.time, t.beattime);
    case m5.TimeSignatureEvent:
      return new QU(t.time, t.numerator, t.denominator);
    case m5.StartupEvent:
      return new j6(t.time, t.phase);
    default:
      throw new Error(`Unable to deserialize RNBOEvent of type ${t.type}`);
  }
};