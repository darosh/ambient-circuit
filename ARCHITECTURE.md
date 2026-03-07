# Architecture

## SceneConfig

```mermaid
flowchart LR

  subgraph SceneConfig["SceneConfig"]
    SceneConfig__rails(["rails: RailConfig[]"])
    SceneConfig__renderFactory(["renderFactory?: RenderFactory | undefined"])
    SceneConfig__view(["view?: ViewConfig"])
  end

  subgraph RailConfig["RailConfig"]
    RailConfig__nodes(["nodes: RailDef"])
    RailConfig__marbles(["marbles?: MarbleConfig[] | false"])
    RailConfig__instruments(["instruments?: InstrumentConfig[]"])
  end

  subgraph RenderFactory["RenderFactory"]
    RenderFactory__railData(["railData: RailConfig, index: number"])
  end

  subgraph ViewConfig["ViewConfig"]
    ViewConfig__splits(["splits: ViewSplitConfig[]"])
    ViewConfig__bloomDefaults(["bloomDefaults?: BloomConfig"])
  end

  subgraph RailDef["RailDef"]
  end

  subgraph MarbleConfig["MarbleConfig"]
  end

  subgraph InstrumentConfig["InstrumentConfig"]
  end

  subgraph ViewSplitConfig["ViewSplitConfig"]
    ViewSplitConfig__bloom(["bloom?: boolean | BloomConfig"])
  end

  subgraph BloomConfig["BloomConfig"]
  end

  %% Inheritance

  %% Relationships
  SceneConfig__rails --> RailConfig
  SceneConfig__renderFactory --> RenderFactory
  SceneConfig__view --> ViewConfig
  RailConfig__nodes --> RailDef
  RailConfig__marbles --> MarbleConfig
  RailConfig__instruments --> InstrumentConfig
  RenderFactory__railData --> RailConfig
  ViewConfig__splits --> ViewSplitConfig
  ViewConfig__bloomDefaults --> BloomConfig
  ViewSplitConfig__bloom --> BloomConfig
```

## SceneCtx

```mermaid
flowchart LR

  subgraph SceneCtx["SceneCtx"]
    SceneCtx__marbles(["marbles: MarbleEntity[]"])
    SceneCtx__instruments(["instruments: InstrumentEntity[]"])
    SceneCtx__rails(["rails: RailEntity[]"])
    SceneCtx__railById(["railById: Map‹string, RailEntity›"])
    SceneCtx__instrumentByRef(["instrumentByRef: WeakMap‹InstrumentConfig, InstrumentEntity›"])
    SceneCtx__view(["view?: ViewState"])
  end

  subgraph MarbleEntity["MarbleEntity"]
    MarbleEntity__marble(["marble: MarbleInstance"])
    MarbleEntity__audio(["audio?: AudioChain"])
  end

  subgraph InstrumentEntity["InstrumentEntity"]
    InstrumentEntity__instrument(["instrument: InstrumentConfig"])
    InstrumentEntity__audio(["audio?: AudioChain"])
  end

  subgraph RailEntity["RailEntity"]
    RailEntity__railData(["railData: RailConfig"])
    RailEntity__resolvedRail(["resolvedRail: ResolvedRail"])
    RailEntity__runtime(["runtime: RailRuntime"])
  end

  subgraph InstrumentConfig["InstrumentConfig"]
  end

  subgraph ViewState["ViewState"]
    ViewState__splits(["splits: ViewSplitState[]"])
  end

  subgraph MarbleInstance["MarbleInstance"]
    MarbleInstance__resolved(["resolved: ResolvedMarble"])
    MarbleInstance__runtime(["runtime: MarbleRuntime"])
    MarbleInstance__direction(["direction: MarbleDirection"])
    MarbleInstance__midiSignal(["midiSignal: InstrumentSignal"])
  end

  subgraph AudioChain["AudioChain"]
    AudioChain__config(["config: AudioChainConfig"])
    AudioChain__voices(["voices: VoiceTracker"])
    AudioChain__nodePresets(["nodePresets: Map‹number, NodePresetInfo›"])
    AudioChain__chordInfo(["chordInfo: ChordInfo"])
    AudioChain__chordHistory(["chordHistory: ChordInfo[]"])
  end

  subgraph RailConfig["RailConfig"]
    RailConfig__nodes(["nodes: RailDef"])
    RailConfig__offset(["offset?: Vec3"])
    RailConfig__marbles(["marbles?: MarbleConfig[] | false"])
    RailConfig__instruments(["instruments?: InstrumentConfig[]"])
    RailConfig__render(["render?: RailRender"])
  end

  subgraph ResolvedRail["ResolvedRail"]
  end

  subgraph RailRuntime["RailRuntime"]
  end

  subgraph ViewSplitState["ViewSplitState"]
    ViewSplitState__camera(["camera: MarbleEntity | number | Vector3Tuple | null"])
    ViewSplitState__target(["target: MarbleEntity | number | Vector3Tuple | null"])
  end

  subgraph ResolvedMarble["ResolvedMarble"]
    ResolvedMarble__resolvedRail(["resolvedRail: ResolvedRail"])
    ResolvedMarble__direction(["direction: MarbleDirection"])
    ResolvedMarble__sequenceMode(["sequenceMode: MarbleSequenceMode"])
    ResolvedMarble__easing(["easing: EasingMode"])
    ResolvedMarble__type(["type?: MarbleType"])
  end

  subgraph MarbleRuntime["MarbleRuntime"]
    MarbleRuntime__lastTriggeredDirection(["lastTriggeredDirection?: MarbleDirection"])
    MarbleRuntime__type(["type?: MarbleType"])
    MarbleRuntime__easing(["easing?: EasingMode"])
  end

  subgraph MarbleDirection["MarbleDirection"]
  end

  subgraph InstrumentSignal["InstrumentSignal"]
  end

  subgraph AudioChainConfig["AudioChainConfig"]
    AudioChainConfig__generator(["generator?: GeneratorConfig"])
    AudioChainConfig__fx(["fx?: FxConfig[]"])
    AudioChainConfig__analyzer(["analyzer?: AnalyzerType"])
  end

  subgraph VoiceTracker["VoiceTracker"]
  end

  subgraph NodePresetInfo["NodePresetInfo"]
  end

  subgraph ChordInfo["ChordInfo"]
  end

  subgraph RailDef["RailDef"]
  end

  subgraph Vec3["Vec3"]
  end

  subgraph MarbleConfig["MarbleConfig"]
  end

  subgraph RailRender["RailRender"]
  end

  subgraph MarbleSequenceMode["MarbleSequenceMode"]
  end

  subgraph EasingMode["EasingMode"]
  end

  subgraph MarbleType["MarbleType"]
  end

  subgraph GeneratorConfig["GeneratorConfig"]
  end

  subgraph FxConfig["FxConfig"]
  end

  subgraph AnalyzerType["AnalyzerType"]
  end

  %% Inheritance

  %% Relationships
  SceneCtx__marbles --> MarbleEntity
  SceneCtx__instruments --> InstrumentEntity
  SceneCtx__rails --> RailEntity
  SceneCtx__railById --> RailEntity
  SceneCtx__instrumentByRef --> InstrumentConfig
  SceneCtx__instrumentByRef --> InstrumentEntity
  SceneCtx__view --> ViewState
  MarbleEntity__marble --> MarbleInstance
  MarbleEntity__audio --> AudioChain
  InstrumentEntity__instrument --> InstrumentConfig
  InstrumentEntity__audio --> AudioChain
  RailEntity__railData --> RailConfig
  RailEntity__resolvedRail --> ResolvedRail
  RailEntity__runtime --> RailRuntime
  ViewState__splits --> ViewSplitState
  MarbleInstance__resolved --> ResolvedMarble
  MarbleInstance__runtime --> MarbleRuntime
  MarbleInstance__direction --> MarbleDirection
  MarbleInstance__midiSignal --> InstrumentSignal
  AudioChain__config --> AudioChainConfig
  AudioChain__voices --> VoiceTracker
  AudioChain__nodePresets --> NodePresetInfo
  AudioChain__chordInfo --> ChordInfo
  AudioChain__chordHistory --> ChordInfo
  RailConfig__nodes --> RailDef
  RailConfig__offset --> Vec3
  RailConfig__marbles --> MarbleConfig
  RailConfig__instruments --> InstrumentConfig
  RailConfig__render --> RailRender
  ViewSplitState__camera --> MarbleEntity
  ViewSplitState__target --> MarbleEntity
  ResolvedMarble__resolvedRail --> ResolvedRail
  ResolvedMarble__direction --> MarbleDirection
  ResolvedMarble__sequenceMode --> MarbleSequenceMode
  ResolvedMarble__easing --> EasingMode
  ResolvedMarble__type --> MarbleType
  MarbleRuntime__lastTriggeredDirection --> MarbleDirection
  MarbleRuntime__type --> MarbleType
  MarbleRuntime__easing --> EasingMode
  AudioChainConfig__generator --> GeneratorConfig
  AudioChainConfig__fx --> FxConfig
  AudioChainConfig__analyzer --> AnalyzerType
```

## TriggerContext

```mermaid
flowchart LR

  subgraph TriggerContext["TriggerContext"]
    TriggerContext__marble(["marble: MarbleEntity"])
    TriggerContext__instrument(["instrument: InstrumentEntity"])
    TriggerContext__rail(["rail: RailEntity"])
  end

  subgraph MarbleEntity["MarbleEntity"]
    MarbleEntity__marble(["marble: MarbleInstance"])
    MarbleEntity__audio(["audio?: AudioChain"])
  end

  subgraph InstrumentEntity["InstrumentEntity"]
    InstrumentEntity__instrument(["instrument: InstrumentConfig"])
    InstrumentEntity__audio(["audio?: AudioChain"])
  end

  subgraph RailEntity["RailEntity"]
    RailEntity__railData(["railData: RailConfig"])
    RailEntity__resolvedRail(["resolvedRail: ResolvedRail"])
    RailEntity__runtime(["runtime: RailRuntime"])
  end

  subgraph MarbleInstance["MarbleInstance"]
    MarbleInstance__resolved(["resolved: ResolvedMarble"])
    MarbleInstance__runtime(["runtime: MarbleRuntime"])
    MarbleInstance__direction(["direction: MarbleDirection"])
    MarbleInstance__midiSignal(["midiSignal: InstrumentSignal"])
  end

  subgraph AudioChain["AudioChain"]
    AudioChain__config(["config: AudioChainConfig"])
    AudioChain__voices(["voices: VoiceTracker"])
    AudioChain__nodePresets(["nodePresets: Map‹number, NodePresetInfo›"])
    AudioChain__chordInfo(["chordInfo: ChordInfo"])
    AudioChain__chordHistory(["chordHistory: ChordInfo[]"])
  end

  subgraph InstrumentConfig["InstrumentConfig"]
  end

  subgraph RailConfig["RailConfig"]
    RailConfig__nodes(["nodes: RailDef"])
    RailConfig__offset(["offset?: Vec3"])
    RailConfig__marbles(["marbles?: MarbleConfig[] | false"])
    RailConfig__instruments(["instruments?: InstrumentConfig[]"])
    RailConfig__render(["render?: RailRender"])
  end

  subgraph ResolvedRail["ResolvedRail"]
  end

  subgraph RailRuntime["RailRuntime"]
  end

  subgraph ResolvedMarble["ResolvedMarble"]
    ResolvedMarble__resolvedRail(["resolvedRail: ResolvedRail"])
    ResolvedMarble__direction(["direction: MarbleDirection"])
    ResolvedMarble__sequenceMode(["sequenceMode: MarbleSequenceMode"])
    ResolvedMarble__easing(["easing: EasingMode"])
    ResolvedMarble__type(["type?: MarbleType"])
  end

  subgraph MarbleRuntime["MarbleRuntime"]
    MarbleRuntime__lastTriggeredDirection(["lastTriggeredDirection?: MarbleDirection"])
    MarbleRuntime__type(["type?: MarbleType"])
    MarbleRuntime__easing(["easing?: EasingMode"])
  end

  subgraph MarbleDirection["MarbleDirection"]
  end

  subgraph InstrumentSignal["InstrumentSignal"]
  end

  subgraph AudioChainConfig["AudioChainConfig"]
    AudioChainConfig__generator(["generator?: GeneratorConfig"])
    AudioChainConfig__fx(["fx?: FxConfig[]"])
    AudioChainConfig__analyzer(["analyzer?: AnalyzerType"])
  end

  subgraph VoiceTracker["VoiceTracker"]
  end

  subgraph NodePresetInfo["NodePresetInfo"]
  end

  subgraph ChordInfo["ChordInfo"]
  end

  subgraph RailDef["RailDef"]
  end

  subgraph Vec3["Vec3"]
  end

  subgraph MarbleConfig["MarbleConfig"]
  end

  subgraph RailRender["RailRender"]
  end

  subgraph MarbleSequenceMode["MarbleSequenceMode"]
  end

  subgraph EasingMode["EasingMode"]
  end

  subgraph MarbleType["MarbleType"]
  end

  subgraph GeneratorConfig["GeneratorConfig"]
  end

  subgraph FxConfig["FxConfig"]
  end

  subgraph AnalyzerType["AnalyzerType"]
  end

  %% Inheritance

  %% Relationships
  TriggerContext__marble --> MarbleEntity
  TriggerContext__instrument --> InstrumentEntity
  TriggerContext__rail --> RailEntity
  MarbleEntity__marble --> MarbleInstance
  MarbleEntity__audio --> AudioChain
  InstrumentEntity__instrument --> InstrumentConfig
  InstrumentEntity__audio --> AudioChain
  RailEntity__railData --> RailConfig
  RailEntity__resolvedRail --> ResolvedRail
  RailEntity__runtime --> RailRuntime
  MarbleInstance__resolved --> ResolvedMarble
  MarbleInstance__runtime --> MarbleRuntime
  MarbleInstance__direction --> MarbleDirection
  MarbleInstance__midiSignal --> InstrumentSignal
  AudioChain__config --> AudioChainConfig
  AudioChain__voices --> VoiceTracker
  AudioChain__nodePresets --> NodePresetInfo
  AudioChain__chordInfo --> ChordInfo
  AudioChain__chordHistory --> ChordInfo
  RailConfig__nodes --> RailDef
  RailConfig__offset --> Vec3
  RailConfig__marbles --> MarbleConfig
  RailConfig__instruments --> InstrumentConfig
  RailConfig__render --> RailRender
  ResolvedMarble__resolvedRail --> ResolvedRail
  ResolvedMarble__direction --> MarbleDirection
  ResolvedMarble__sequenceMode --> MarbleSequenceMode
  ResolvedMarble__easing --> EasingMode
  ResolvedMarble__type --> MarbleType
  MarbleRuntime__lastTriggeredDirection --> MarbleDirection
  MarbleRuntime__type --> MarbleType
  MarbleRuntime__easing --> EasingMode
  AudioChainConfig__generator --> GeneratorConfig
  AudioChainConfig__fx --> FxConfig
  AudioChainConfig__analyzer --> AnalyzerType
```
