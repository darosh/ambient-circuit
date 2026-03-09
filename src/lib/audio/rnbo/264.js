export default {
  src: [{
    code: "class RNBOPatcher{constructor(){this._currentTime=0,this.audioProcessSampleCount=0,this.sampleOffsetIntoNextAudioBuffer=0,this.vs=0,this.maxvs=0,this.sr=44100,this.invsr=2267573696e-14,this.zeroBuffer=0,this.dummyBuffer=0,this.voiceIndex=0,this.noteNumber=0}getParameterIndexForID(e){return-1}getNumMidiInputPorts(){return 0}processMidiEvent(e,t,s,r){this.updateTime(e)}getNumMidiOutputPorts(){return 0}process(e,t,s,r,i){this.vs=i,this.updateTime(this.getEngine().getCurrentTime()),this.audioProcessSampleCount=this.msToSamps(this._currentTime,this.sr)}prepareToProcess(e,t){this.vs=t,this.maxvs=t,this.zeroBuffer=resizeSignal(this.zeroBuffer,0,t),this.dummyBuffer=resizeSignal(this.dummyBuffer,0,t),this.sr=e,this.invsr=1/e}msToSamps(e,t){return rnbo_floor(e*t*.001)}sampsToMs(e){return e*(1e3*this.invsr)}getNumInputChannels(){return 0}getNumOutputChannels(){return 0}getDataRef(e){return 0}getNumDataRefs(){return 0}fillDataRef(e,t){e}processDataViewUpdate(e,t){this.updateTime(t)}initialize(e){this.assign_defaults(),this.applyState(e),this.initializeObjects(e),this.allocateDataRefs(),this.startup(e)}initializeObjects(e){}allocateDataRefs(){}startup(e){}setIsMuted(e){}getPatcherSerial(){return 7}extractState(e){e[eventTargetKey]=this,e[patcherSerialKey]=this.getPatcherSerial(),e.p7=1,e.p7_noteNumber=this.noteNumber}applyState(e){e[patcherSerialKey]==this.getPatcherSerial()&&(containsValue(e[eventTargetKey])&&this.getEngine().updatePatcherEventTarget(e[eventTargetKey],this),containsValue(e.p7_noteNumber)&&(this.noteNumber=e.p7_noteNumber))}setParameterValue(e,t,s){this.updateTime(s)}processParameterEvent(e,t,s){this.setParameterValue(e,t,s)}processNormalizedParameterEvent(e,t,s){this.setParameterValueNormalized(e,t,s)}getParameterValue(e){return 0}getNumSignalInParameters(){return 0}getNumParameters(){return 0}getParameterName(e){return\"bogus\"}getParameterId(e){return\"bogus\"}getParameterInfo(e,t){e}sendParameter(e){this.getEngine().notifyParameterValueChanged(e,this.getParameterValue(e))}processClockEvent(e,t,s,r){this.updateTime(e)}processOutletAtCurrentTime(e,t,s){}processOutletEvent(e,t,s,r){this.updateTime(r),this.processOutletAtCurrentTime(e,t,s)}sendOutlet(e,t){this.getEngine().sendOutlet(this,e,t)}schedule(e,t){this.getEngine().scheduleClockEvent(this,e,t+this._currentTime)}scheduleValue(e,t,s){this.getEngine().scheduleClockEventWithValue(this,e,t+this._currentTime,s)}stop(e){this.getEngine().flushClockEvents(this,e,!1)}stopWithValue(e,v){this.getEngine().flushClockEventsWithValue(this,e,v,!1)}processNumMessage(e,o,t,s){this.updateTime(t)}processListMessage(e,o,t,s){this.updateTime(t)}resolveTag(e){return\"\"}sendMidiEvent(e,t,s,r){this.getEngine().sendMidiEvent(e,t,s,r)}sendMidiEventList(e,t){this.getEngine().sendMidiEventList(e,t)}updateTime(e){this._currentTime=e,this.sampleOffsetIntoNextAudioBuffer=this.msToSamps(e,this.sr)-this.vs-this.audioProcessSampleCount}assign_defaults(){}setEngineAndPatcher(e,t){this._engineInterface=e,this._parentPatcher=t}getEngine(){return this._engineInterface}getPatcher(){return this._parentPatcher}}rnboObj=new RNBOPatcher;",
    encoding: "utf-8",
    type: "js"
  }],
  options: {
    classname: "rnbomatic",
    minifyOutput: true
  },
  desc: {
    parameters: [],
    numParameters: 0,
    numSignalInParameters: 0,
    layouts: [{
      name: "layout",
      boxes: []
    }],
    numInputChannels: 0,
    numOutputChannels: 0,
    patcherSerial: 0,
    externalDataRefs: []
  }
};