import * as tslib__WEBPACK_IMPORTED_MODULE_3__ from "./tslib-awaiter.js";
import * as _baseEngine__WEBPACK_IMPORTED_MODULE_0__ from "./rnbo-base-engine.js";
import * as _wasmHelper__WEBPACK_IMPORTED_MODULE_1__ from "./rnbo-wasm-helper.js";
import * as _event__WEBPACK_IMPORTED_MODULE_2__ from "./rnbo-events.js";
export class s extends _baseEngine__WEBPACK_IMPORTED_MODULE_0__.v {
  getCurrentTime() {
    return this.R.getCurrentTime();
  }
  setCurrentTime(t) {
    if (this.R.isReady()) {
      this.R.setCurrentTime(t);
    }
  }
  prepareToProcess(t, e, r) {
    if (r || t !== this.M || e !== this.A) {
      this.R.prepareToProcess(t, e);
    }
  }
  process(t, e, r, n, i, s, a) {
    this.R.process(t, e, r, n, i);
  }
  scheduleMidiEvent(t, e) {
    this.scheduleEvent(new _event__WEBPACK_IMPORTED_MODULE_2__.Ym(this.I, t, e));
  }
  handleParameterEvent(t) {
    this.parameterChangeEvent.emit(new _event__WEBPACK_IMPORTED_MODULE_2__.DB(t.time, t.index, t.value, t.source));
  }
  handleMidiEvent(t) {
    this.outgoingEvent.emit(new _event__WEBPACK_IMPORTED_MODULE_2__.Ym(t.time, t.port, [t.b1, t.b2, t.b3], undefined));
  }
  handleMessageEvent(t) {
    this.outgoingEvent.emit(new _event__WEBPACK_IMPORTED_MODULE_2__.f3(t.time, this.R.resolveTag(t.tag), t.type === 0 ? t.numValue : t.type === 1 ? this.R.retrieveArray(t.listValue) : undefined, this.R.resolveTag(t.objectId)));
  }
  handlePresetEvent(t) {
    this.outgoingEvent.emit(new _event__WEBPACK_IMPORTED_MODULE_2__.bt(t.time, _event__WEBPACK_IMPORTED_MODULE_2__.l0.Touched));
  }
  getParameterValue(t) {
    return this.R.getParameterValue(t);
  }
  get isSync() {
    return true;
  }
  scheduleEvent(t) {
    this.R.scheduleEvent(t);
  }
  setPatcherCode(code) {
    return (0, tslib__WEBPACK_IMPORTED_MODULE_3__.mG)(this, undefined, undefined, function* () {
      return new Promise((resolve, reject) => {
        let restoredRnboModule;
        const restoredWASM = code + "restoredRnboModule = rnbo_module;";
        eval(restoredWASM);
        restoredRnboModule().then(t => {
          delete t.then;
          this.R = new _wasmHelper__WEBPACK_IMPORTED_MODULE_1__.z(this, t);
          return resolve();
        });
      });
    });
  }
  setExternalData(t, e, r) {
    return (0, tslib__WEBPACK_IMPORTED_MODULE_3__.mG)(this, undefined, undefined, function* () {
      this.R.setExternalData(t, e, r);
    });
  }
  releaseExternalData(t) {
    return (0, tslib__WEBPACK_IMPORTED_MODULE_3__.mG)(this, undefined, undefined, function* () {
      const [e, r] = this.R.releaseExternalData(t);
      return {
        data: e,
        typeDesc: r
      };
    });
  }
  getPreset() {
    return (0, tslib__WEBPACK_IMPORTED_MODULE_3__.mG)(this, undefined, undefined, function* () {
      return JSON.parse(this.R.getPreset());
    });
  }
  setPreset(t) {
    this.R.setPreset(JSON.stringify(t));
  }
}