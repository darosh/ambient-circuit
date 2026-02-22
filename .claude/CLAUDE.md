# Ambient Circuit

> Non-linear sequencer combining audio synthesis and visual feedback

## Project Vision

Create a "marble-machine-inspired" music sequencer where:

- Marbles travel on rails and trigger instruments as they pass through zones
- Zones produce sound and visual effects (lightning, glows)
- **Tone.js** for synthesis, **RNBO** for high-quality effects (reverb, saturation, compression, shimmer)
- Satisfying generative music with beautiful graphics, neon glowing aesthetics, complex circuit structure, Tron inspired
- Predefined layouts/songs where the circuit fills sphere/cylinder/cube, each with own color scheme (procedural generation as future exploration)

## Concepts

- `Beat`
  - zero-based index representing a position in time
  - bars derived from global tempo and time signature
  - each point on a rail maps to a specific beat
  - marble speed compensated to arrive at beat positions in sync with tempo
- `Marbles`
  - objects moving on `Rails`, triggering `Instruments`
  - **note mode:** carries a note (represented by color), can be changed by `Modifiers`
  - **vanilla mode:** noteless trigger, used for drums or tuned percussive elements; can acquire a note later via `Modifier`
- `Rails`
  - sequencer lines, like connections in a printed circuit board
  - `Marbles` travel on the lines in a loop (or reverse/restart on open-ended rails)
  - defined as points in 3D space + connection metadata; curves computed automatically
  - rounding per point: `'to'` (incoming curved), `'from'` (outgoing curved), `'both'` (smooth pass-through)
  - cubic Bezier interpolation with tangent-aware control points; near-perfect circles from 4 points
  - capable of producing: straight lines, rounded corners, circles, spirals, coils
  - each point maps to a `Beat`
  - support **linear** and **eased** (bounce-in for snappy feel) movement between beats
- `Split` / `Merge`
  - rail forks/joins — like a fork in the road
  - split has weighted routing, e.g. `[2,4]` = first 2 marbles go left, next 4 go right, repeating
- `Modifiers`
  - zones on a rail that modify the marble's note as it passes through
  - examples: pitch shift, scale quantization
- `Instruments`
  - like MIDI instruments in a DAW (e.g. pluck, kick)
  - visually: portals/rounded lenses around rails, like a lens in a laser beam's path
  - positioned at `Beat` positions
- `AudioPaths`, `FX` — to be elaborated later; will serve as visualization of audio events and processing
- `AudioChain` — signal path: generator → fx → analyzer → output. Per-instrument by default, but named chains can be shared across instruments. Exposed via `ctx.instrument.audio` in handlers.
- `AudioEngine` — two engines sharing one `AudioContext`:
  - **Tone.js**: instruments, fx, analyzers. Dynamic import: `const Tone = await import('tone')`
  - **RNBO**: instruments & fx from Max patchers. Load by path: `rnbo.shimmerev` → `./rnbo/rnbo.shimmerev.json` (cached). Tone by name: `new Tone[name]`
  - Unified param interface across both engines
- `Marble audio` — marbles can have their own audio chain (independent of instruments). Collision between marbles triggers sound using notes from colliding marbles.
- `Event log` — global log of trigger/audio events, eventually displayed tracker-style
- Physics: minimal at start, may be introduced later for specific areas (note bouncing, granular FX)

---

## Current Status

**Phase:** Audio system

**Last Updated:** 2026-02-19

**What Works:**

- [x] Basic Threlte project template
- [x] `Rails` two-layer type system (authored → resolved)
- [x] `Rails` rendering with cubic Bezier curves (circles, rounded rects, coils)
- [x] Rounding modes: `to`, `from`, `both` with tangent-aware control points
- [x] Split/merge data structures with weighted routing
- [x] Debug UI (svelte-tweakpane-ui) with show-points, show-beats toggles
- [x] Beat index visualization on rails (arc-length based)
- [x] Global tempo system (BPM, play/pause, beat counter, spacebar toggle)
- [x] `Marbles` on rails, tempo-synced movement
- [x] Direct segment interpolation (marble position from beat via control points)
- [x] Sparse beat support (any beat spacing: 2, 16, fractional, etc.)
- [x] Marble movement matches visualization exactly (curve interpolation)
- [x] Easing system (31 functions via maath + custom: quad, elastic, bounce, back)
- [x] Sequence modes: looping (forward/backward), ping-pong (smooth bouncing)
- [x] Direction tracking: forward/backward with proper wrapping
- [x] Rail branching — marble routing at splits (weighted round-robin, delta-based positioning)
- [x] Branch tangent computation (includes previous point before split for correct curves)
- [x] Ping-pong mode with branches (branches reset and alternate on each pass)
- [x] Curved branches with rounding modes (visualization matches marble path)
- [x] Rail data module with RailData type (direction, mode per rail)
- [x] Primitives return nodes only (IDs assigned at data layer)
- [x] `Instruments` on `Rails`
- [x] Web MIDI output
  - [x] Port selection with localStorage persistence
  - [x] Instrument MIDI properties (channel, note, length, velocity)
  - [x] Marble note override support
  - [x] Lazy initialization (only when enabled)
- [x] String path shorthand for `RailNode` — space-delimited syntax
  - space = point delimiter, each token produces one point
  - direction chars: `r/l/u/d/i/o`, rounding: `t/f/b`, tangent: number suffix
  - examples: `ru` = one point [1,1,0], `l3u2` = one point [-3,2,0], `rub` = [1,1,0] with rounding both, `ilt0.5` = [i+l] with rounding to, tangent 0.5
- [x] Marble visual types
  - [x] 'ball' (default sphere)
  - [x] 'poly' (extruded polygon with `sides` param, oriented along rail)
  - [x] 'coil' (spiral with `rounds` param, spins on impact, oriented along rail)
- [x] Instrument visual types
  - [x] 'heart' (parametric cardioid, `sides` controls smoothness, uses buildTubeGeometry)
  - [x] 'spiral' (Archimedean spiral, `rounds` and `counterCW` params, non-uniform sampling for detail)
  - [x] 'cone' (3D conical spiral, `rounds`, `counterCW`, `align` [center/tip/back], `point` [forward/backward])
  - [x] 'arrow' (7 shape variants via `kind` prop: plain/play/fwd/rec/stop/step/pause)
  - [x] 'sun' (12-sided inner circle + configurable rays with `brightness` param)
- [x] Non-linear sequencing - runtime marble modification
  - [x] `MarbleState` API via `ctx.marble.state` in instrument handlers
  - [x] Speed modification: `ctx.marble.state.speed = 2` (runtime override)
  - [x] Direction reversal: `ctx.marble.state.reverse()` (prevents re-trigger oscillation)
  - [x] Beat positioning: `ctx.marble.state.beat = 6` or `ctx.marble.state.shiftBeat(3)`
  - [x] Note modification: `ctx.marble.state.note = 72`
  - [x] Re-trigger prevention (lastTriggeredBeat + direction tracking)
  - [x] Auto-clear on loop/bounce (fixes short rails < 1.5 beat range)
  - [x] Fractional beat support (7.3, 7.4, 7.5 trigger independently)
  - [x] Demo scene (scene-logic) with 10 examples
- [x] SceneCtx - global coordination architecture
  - [x] Scene-wide context: `ctx.scene` (all marbles/instruments/rails)
  - [x] Entity wrappers: MarbleEntity/InstrumentEntity/RailEntity with State API
  - [x] Clean TriggerContext: `ctx.marble`, `ctx.instrument`, `ctx.rail`
  - [x] Global beat handler with lifecycle (init/play/pause/tick/destroy)
  - [x] Configurable beat resolution (8=eighth notes, 16=sixteenth, etc.)
  - [x] Visibility enforcement (Phase 2.1): Views respect `visible` property
  - [x] Timer cleanup pattern via destroy phase
  - [x] Cross-entity manipulation (reverse all marbles, target specific entities)
  - [x] Test scenes: scene-ctx-test, scene-global-beat
  - [x] Rail rendering control via RailData.render property (`(out: Matrix4, ctx: SceneCtx, beat, tempo, delta) => void`)
  - [x] Rail transform operations via Rail.transform (three.js Object3D transforms)
  - [x] Beat jump instrument triggering (marble state changes trigger instruments correctly)
  - [x] Boundary beat triggering (first/last beat instruments work in both looping and ping-pong modes)
  - [x] Play state enforcement (instruments only trigger when tempo.isPlaying is true)
- [x] Runtime property system - visibility/activity/state
  - [x] InstrumentBase `visible` prop for initial state
  - [x] InstrumentState `type` getter/setter (change visual type at runtime)
  - [x] MarbleDataBase `easing` config support
  - [x] MarbleState `easing` runtime override
  - [x] Active state enforcement (skip inactive marbles in triggers)
  - [x] Scene-level easing prop with runtime override support
  - [x] Demo scene (scene-easing) with runtime easing changes
- [ ] Non-linear sequencing - advanced
  - [x] Change instrument params in TriggerHandler
  - [x] Rail switching API (teleport between rails)
    - [x] `ctx.marble.state.railId` getter/setter (deferred switch)
    - [x] Beat reset to target rail minBeat (user can override with `state.beat = N`)
    - [x] Rail-specific state reset (beat, branch, triggers)
    - [x] Identity preservation (speed, note, direction, visual props)
    - [x] Validation (warns on invalid railId, stays on current rail)
    - [x] Works with beat override (`state.railId = 'x'; state.beat = 5`)
    - [x] Demo scene (scene-rail-switch) with ping-pong/circular/conditional patterns
  - [x] Marble collisions: `bouncer: true` reverses on collision
    - [x] Beat-based interval collision detection (handles high speeds correctly)
    - [x] Bouncer property in MarbleConfig
    - [x] Cooldown period to prevent oscillation
    - [x] Signal intensity on collision
    - [x] Same-direction logic (only trailing marble reverses)
    - [x] Opposite-direction logic (both reverse)
    - [x] BounceHandler in SceneConfig (custom collision response)
    - [x] bouncerOnlyMode optimization flag
    - [x] Demo scene (scene-collisions) with 4 examples + bounce flash
    - [x] Test suite with 5 test cases
  - [ ] Multi-marble interaction patterns
- [ ] Visual polishing, WebGPU, TSL
  - [x] rails
  - [x] marbles
  - [x] instruments
  - [ ] feedback (lightning effects on collision)
- [ ] Audio system
  - [x] Shared AudioContext for Tone.js + RNBO
  - [x] Audio init: once on first play, not on scene load
  - [x] Scene change: stop/disconnect/dispose audio (keep main context + gain), ramp gain down/up
  - [x] Scenes without audio config skip audio init entirely
  - [x] AudioChain type: generator → fx → analyzer → solo → out
  - [x] Per-instrument chains + shared/named chains
  - [x] Marble audio chains (own generator, trigger on collision)
  - [x] Chain access from SceneCtx: `ctx.instrument.audio`, `ctx.marble.audio`
  - [x] Default triggerHandler plays audio automatically (like MIDI)
  - [x] Default bouncerHandler signals both marbles + triggers their audio chains on collision
  - [x] RNBO patcher loading with cache (`./rnbo/*.json` from static)
  - [x] Tone.js instrument creation by name (`new Tone[name]`)
  - [x] RNBO fx in chains (Tone Synth → RNBO shimmerev works)
  - [x] RNBO as generator (feedback-synth.export)
  - [x] Tone→RNBO node connection (recursive WebAudioNode extraction)
  - [x] Unified param interface across Tone.js and RNBO
  - [x] Config shorthand: `{tone: 'Synth'}` / `{rnbo: 'path'}` (replaces `{engine, name/path}`)
  - [x] Bus system: named buses with fx chains, chain routing via `bus` prop
  - [x] Master chain: scene-level fx before destination
  - [x] Shared Tone.Analyser for UI (reconnects on selection change)
  - [x] Per-chain/bus analyzer config: `boolean | 'fft' | 'waveform' | 'meter'`
  - [x] Demo scene (scene-audio) with buses + master chain
  - [x] RNBO preset support: per-node presets (generator + fx), preset dropdown in UI, param refresh on change
- [ ] Audio UI & interaction
  - [x] Mouse-over highlight on objects (hover glow via impactIntensity uniform)
  - [ ] Selection with bounding-box corners (smooth transition on change)
  - [x] Click instrument/marble → show param sliders for its chain
  - [x] Copy-to-clipboard JSON of non-default params `{[paramId]: number}`
  - [x] Audio init on first click (not just play) for immediate param access
  - [x] Param enumeration from live nodes (Tone.js AudioParams + RNBO device.parameters)
  - [x] `interactivity()` plugin enabled for raycasting
  - [x] Solo selected chain (Tone.Solo node per chain, auto-coordinates muting)
  - [x] Show analyzer visualization of selected instrument
  - [x] Chain/bus selector dropdown in Tweakpane (select chain/bus/master, show params)
  - [x] HUD overlay via BloomHud component (separate scene composited in PostProcessing pipeline)
  - [ ] Selection with bounding-box corners for selected instrument detail
- [ ] Audio visualization
  - [x] AudioView: 3D chain topology (generators=cylinders, fx=cones, tubes between nodes)
  - [x] AnalyserView: per-frame FFT/waveform/meter bars with color gradient
  - [x] Chain/bus/master analyzer visualization
  - [x] Debug toggle in Tweakpane
  - [x] MidiSignalView: tubes linking instrument 3D positions to AudioView generator nodes, flash on trigger (easeOutQuart decay)
  - [x] Marble audio signal links: tubes from marble positions → AudioView generator nodes, flash on collision (`audioView.marbleLinks`)
  - [x] AudioView generator node color flash on trigger (instrument color → rail color fallback, easeOutQuart decay)
  - [ ] Future: chain representations in separate layer, waveform rays, rail displacement by waveform
- [x] Event log / sequencer HUD
  - [x] SequencerView component: per-chain note history in HUD
  - [x] Two modes: `'time'` (beat-mapped scroll) and `'compact'` (newest pinned left, stack right)
  - [x] Ring buffer (MAX_SLOTS=48) with pooled materials for zero-alloc updates
  - [x] Per-slot slide animation (exponential decay) for smooth note insertion
  - [x] Collapse overlapping notes to dots
  - [x] Fade threshold (alpha ramp across width)
  - [x] GeoText: cached TextGeometry mode (`cache` prop) with module-level geometry cache
  - [x] SceneConfig: `sequencerMode` ('time'|'compact'), `sequencerBeats` (visible beat window)
  - [x] Animated analyser X position (easeInCubic, avoids label/analyser overlap)
  - [x] Freeze prop: pause HUD animations when not playing

**Next Steps:**

1. Multi-marble interaction patterns
2. Investigate 627 MeshBasicMaterial instances in heap (likely default materials from `new Mesh()` without material arg)
3. Visual polishing and effects (lightning on collision)

**Blocked/Questions:**

- None currently

---

## Tech Stack

### Core Technologies

- **Threlte** (Three.js + Svelte) - 3D rendering and scene management
- **Tone.js** - Audio synthesis (instruments)
- **RNBO** - High-quality audio effects (reverb, saturation, compression, shimmer)
- **Svelte** - UI framework and build system
- **Rapier** - Physics engine, reserved for future use in specific zones

### Timing

- Frame-independent movement using delta time
- Marble speed synced to tempo via beat-mapped rail points

---

## Code Organization

```
/src/lib/rail.ts           - Rail types (authored + resolved) and type guards
/src/lib/rail-path.ts      - expandPathString(): string path shorthand → Vec3/RailPointFull[]
/src/lib/rail-resolve.ts   - resolveRail(): authored → engine-internal form (flattens path strings)
/src/lib/rail-curve.ts     - buildRailCurve(): resolved points → Vector3 polyline
/src/lib/rail-primitives.ts - circle(), roundedRect(), coil(), spiral() helpers
/src/lib/tempo.ts          - Global tempo/beat system (BPM, play/pause)
/src/lib/marble.ts         - Marble types (config, state, direction, easing)
/src/lib/marble-state.ts   - MarbleState API (safe mutations with visible/active)
/src/lib/marble-system.ts  - Marble movement logic (direct segment interpolation)
/src/lib/instrument.ts     - Instrument type with MIDI properties
/src/lib/instrument-state.ts - InstrumentState API (safe mutations with visible/active)
/src/lib/rail-state.ts     - RailState API (safe mutations with visible/active)
/src/lib/scene.ts          - TriggerContext, GlobalBeatContext, SceneConfig types
/src/lib/scene-ctx.ts      - SceneCtx types (MarbleEntity/InstrumentEntity/RailEntity)
/src/lib/scene-ctx-factory.ts - createSceneCtx(), updateSceneCtx()
/src/lib/easing.ts         - Easing functions (maath + custom)
/src/lib/midi/midi.ts      - Web MIDI API wrapper (init, port selection, sendNote)
/src/lib/rail-data.ts      - Rail definitions with MIDI-enabled onTrigger handlers
/src/lib/audio/types.ts    - Audio types (AudioChainConfig, AudioChain, AudioEngine)
/src/lib/audio/engine.ts   - Audio engine lifecycle (init, build, trigger, dispose)
/src/lib/audio/scene-audio.ts - buildSceneAudio(), hasAudioConfig() (extracted from Scene.svelte)
/src/lib/audio/index.ts    - Re-exports from types + engine
/src/lib/audio/patchers/   - RNBO exported patchers (JSON from Max)
/src/lib/helpers/rail-geometry.ts - computeRailNamePosition, scalePoints, scaleSplits
/src/lib/helpers/scene-init.ts   - createInstrumentSignals, assignInstrumentSignals, createMarbleConfigs
/src/lib/helpers/keyboard.ts     - createKeydownHandler (config-driven key map)
/src/lib/helpers/audio-params.ts - readChainParams, readBusParams, ParamInfo type
/src/components/Bloom.svelte        - Post-processing bloom (scene only)
/src/components/BloomHud.svelte     - Post-processing bloom + HUD compositing
/src/components/HudScene.svelte     - HUD overlay content (ortho camera, transport, sequencer rows)
/src/components/SequencerView.svelte - Per-chain note history (ring buffer, two display modes)
/src/components/GeoText.svelte      - 3D text with optional geometry cache (module-level Map)
/src/components/AudioView.svelte - 3D audio chain topology visualization
/src/components/AnalyserView.svelte - per-frame VU meter (FFT/waveform/meter)
/src/components/Scene.svelte    - 3D scene with rails, marbles, tempo integration
/src/components/RailView.svelte - renders Rail as TubeGeometry + debug points/beats
/tests                     - vitest tests (not colocated)
```

---

## TriggerContext API

Instrument handlers receive `TriggerContext` with clean access to current and scene-wide state:

**Context structure:**
```typescript
ctx.marble        // MarbleEntity: current marble with .state API
ctx.instrument    // InstrumentEntity: current instrument with .state API
ctx.rail          // RailEntity: current rail with .state API
ctx.scene         // SceneCtx: all marbles/instruments/rails in scene
ctx.user          // SceneConfig.user (arbitrary scene state, passed through unchanged)
ctx.midiState     // MidiState | null
// + InstrumentTriggerContext fields (railId, marbleIndex, beat, globalBeat, etc.)
```

**Common patterns:**
```typescript
actionHandler(ctx) {
  // Modify current marble
  ctx.marble.state.reverse()
  ctx.marble.state.speed = 2
  ctx.marble.state.beat = 6
  ctx.marble.state.visible = false

  // Modify current instrument
  ctx.instrument.state.color = '#ff0000'
  ctx.instrument.state.visible = false

  // Access all entities (cross-entity manipulation)
  ctx.scene.marbles.forEach(m => m.state.reverse())
  ctx.scene.instruments[0].state.color = '#00ff00'

  // Access underlying objects when needed
  ctx.instrument.instrument.signal!.intensity = 1
  ctx.marble.marble.config.note
}

globalBeatHandler(ctx) {
  // Lifecycle phases: 'init' | 'tick' | 'play' | 'pause' | 'destroy'
  if (ctx.phase === 'destroy') {
    // Cleanup timers/intervals
  }

  // Access scene state
  ctx.scene.marbles[0].state.speed = 2
  ctx.beat  // current globalBeat (float)
  ctx.isPlaying
}
```

**Timer cleanup pattern:**
```typescript
const timers: number[] = []

globalBeatHandler(ctx) {
  if (ctx.phase === 'destroy') {
    timers.forEach(id => clearTimeout(id))
    timers.length = 0
  } else if (ctx.phase === 'tick') {
    const timer = setTimeout(() => { /* ... */ }, 100)
    timers.push(timer)
  }
}
```

---

## Development Guidelines

### Performance (Hot Paths)

- **`computeBeatPositions` is for visualization only** — never call in `updateMarble` or any per-frame path. Use `points[0].beat` / `points[last].beat` directly for min/max range.
- **`getCurve(points, i)`** in `marble-system.ts` wraps `buildSegmentCurve` with a module-level `WeakMap` cache keyed by the points array reference. `rail.points` is stable between frames so curves build once per rail. Branch combined paths (fresh array each call) miss cache — acceptable, they're infrequent.
- **No per-frame allocation in `calculateMarblePosition`**: uses reusable `_tmp0/_tmp1/_tmpRight` scratch vectors; `getCurve` hits cache; writes marble position via `x/y/z` not `new Vector3()`.
- **`RailData.render` fills `out: Matrix4` in-place** — no allocation in the render fn body; pre-allocate axes/scratch matrices at module level. RailView uses `_renderOut` + `_renderVersion` counter; stores both on `railData.runtime` (`renderMatrix` = same ref, `renderVersion` = counter). Scene.svelte reads `runtime.renderVersion` in derived to force re-runs. `MarbleView` re-runs naturally because `marble.position` changes every frame.
- **`SceneConfig.user`** — arbitrary scene state object passed through unchanged to all handler contexts (`ctx.user`) and render fns (`ctx.user` via SceneCtx). Use for mutable state (counters, flags) and to cache per-scene math objects (pre-allocated `Vector3`/`Matrix4`).

### HUD Performance

- **Imperative mesh pools**: AnalyserView and SequencerView use plain `new Mesh()` added to a `<T.Group>` — zero Svelte context overhead. Never use `{#each}` with `<T.Mesh bind:ref>` for per-frame-updated meshes.
- **No reactive array spreads**: never do `arr = [...arr]` to trigger Svelte 5 updates. `$state` proxy tracks in-place `arr[i] = val` mutations — spreads create new proxies + contexts every frame.
- **No `{#key}` for text changes**: use `<GeoText cache>` which swaps geometry reactively via the cache — no component remount needed.
- **BloomHud init timing**: HUD must mount after main scene camera is ready. `showHud` deferred via `setTimeout(0)` in App `onMount`, guarded by `showHud && activeScene && tempo` in Wrap. BloomHud pipeline `$effect` guarded by `if (!camera.current) return` to skip wasteful builds before camera mounts.
- **BloomHud `$effect` untrack**: `strength/radius/threshold` are `untrack()`ed in pipeline build effect — they're handled by uniform updates in a separate effect, shouldn't trigger shader recompilation.

### Memory / Scene Switch

- **Scene `onDestroy` clears signal/runtime refs**: `ins.signal`, `ins.midiSignal`, `ins.runtime`, `railData.runtime` are set to `undefined` to release `$state` proxy refs held by module-level scene config objects.
- **Geometry disposal**: `MarbleView` and `InstrumentView` call `geometry?.dispose()` / `innerGeometry?.dispose()` in `onDestroy`. Safe to double-call — `clearMarble/InstrumentGeometryCache()` may have already disposed them.

### WebGPU Rendering

**Context:**

- Using `WebGPURenderer` from `three/webgpu` (extended via `extend(THREE)` in App.svelte)
- WebGPU requires NodeMaterial-based materials; ShaderMaterial not compatible

**Compatible:**

- Standard materials via `<T>` catalogue: `<T.MeshStandardMaterial />`, `<T.MeshBasicMaterial />`
- Geometries from `three/webgpu`: `<T.TubeGeometry />`, `<T.SphereGeometry />`
- Three.js primitives: `<T.GridHelper />`, `<T.DirectionalLight />`

**NOT Compatible:**

- Line2/LineMaterial from `three/examples/jsm/lines` (uses ShaderMaterial)
- MeshLine from `@threelte/extras` (uses ShaderMaterial)
- Grid from `@threelte/extras` (uses ShaderMaterial internally)
- Text/Billboard from `@threlte/extras` (troika-three-text causes infinite values in drawIndexed)

**Rails Rendering:**

- Use `TubeGeometry` along CatmullRomCurve3 for thick lines
- Standard `MeshStandardMaterial` via `<T>` automatically uses NodeMaterial version
- Provides proper lighting/shadows support

### HUD & Post-Processing

**Architecture:**

- WebGPU `PostProcessing` renders via a single unified pipeline — cannot mix `postProcessing.render()` with `renderer.render()` calls
- Two components: `Bloom.svelte` (scene-only bloom) and `BloomHud.svelte` (bloom + HUD compositing)
- HUD uses `createSceneContext()` + `createCameraContext()` for a separate scene rendered as a second `pass()` node
- HUD composited via TSL `mix()` with RGB max mask (non-black HUD pixels overlay the scene)

**Runtime updates:**

- Bloom strength/radius/threshold: update `bloomNode.strength.value` etc. (internal uniforms, no recompilation)
- Toggling enabled/hudBloom or changing hudFx: rebuild `postProcessing.outputNode` + set `postProcessing.needsUpdate = true` to trigger shader recompilation

**Props (BloomHud):**

- `enabled` — toggle bloom effect (strength=0 when false)
- `hudBloom` — composite HUD before bloom (HUD elements glow) vs after (HUD stays crisp)
- `hudFx` — `(color: TslNode) => TslNode` transform for HUD effects (e.g. `gaussianBlur(color, null, 4)`)
- `children` — snippet rendered into HUD scene

**Caveat:** RGB mask means pure black HUD elements are transparent. Use non-black colors.

**Available TSL effects** for `hudFx`: `gaussianBlur`, `dotScreen`, `rgbShift`, `film`, `sobelOperator`, `chromaticAberration`, `pixelation`, `fxaa` — all from `three/addons/tsl/display/`

**Files:**

- `/src/components/Bloom.svelte` — scene-only bloom (no HUD)
- `/src/components/BloomHud.svelte` — bloom + HUD compositing pipeline
- `/src/components/HudScene.svelte` — HUD content (OrthographicCamera + overlay elements)
- `/src/components/HUD.svelte` — original threlte HUD copy (reference, not used with bloom)

### Sequencer HUD

**Architecture:**

- `SequencerView.svelte` renders per-chain note history as 3D text in the HUD layer
- Ring buffer (48 slots) with pre-allocated material pool — only head slot changes text per note
- Two display modes configured via `SceneConfig.sequencerMode`:
  - `'time'`: beat-mapped horizontal scroll using wall-clock elapsed time
  - `'compact'`: newest note pinned left, older notes stack right with slide animation
- `SceneConfig.sequencerBeats`: visible beat window (default 8)

**GeoText caching:**

- `cache` prop on `GeoText` uses module-level `Map<string, BufferGeometry>` keyed by `text_size`
- Creates `TextGeometry` directly (not `Text3DGeometry`) for synchronous cache hits
- `clearGeoTextCache()` exported for cleanup
- Font loaded once at module level (shared across all instances)

**Slide animation (compact mode):**

- Per-slot `Float32Array` offsets (`ringSlides[]`), not a uniform value
- On new note: existing slots get `slide -= totalNewWidth`, new slots get `slide = 0`
- Each frame: exponential decay toward 0 (`slide *= exp(-speed * delta)`)
- Grid position (`.x`) and animation offset (`.slide`) are separate; combined only at render (`x + slide`)

**HudScene integration:**

- `seqEvents[]`: per-chain `NoteEvent[]` arrays, pushed on `chain.lastTrigger` change
- Animated analyser X position (easeInCubic) to avoid label/analyser/sequencer overlap
- `freeze` prop pauses HUD animations when not playing

### MIDI System

**Architecture:**

- Web MIDI API via `midi.ts` (init, port selection, sendNote)
- Instrument MIDI properties: channel (default 1), note (default C4/60), length (default 200ms), velocity (default 100)
- Marble note override: `marble.config.note` takes precedence over instrument default
- Port selection saved to localStorage (`ambient-circuit-midi-port`)
- Lazy initialization: MIDI only initialized when checkbox enabled

**onTrigger Handlers:**

- Defined in `rail-data.ts` with `createMidiTrigger()` helper
- Handlers close over `midiState` and `marbles` for runtime access
- `createRails(midiState, marbles)` generates rails with MIDI-enabled handlers
- marble-system.ts triggers handlers, no MIDI logic in core system

### Audio System

**Architecture:**

- Two engines (Tone.js + RNBO) sharing one standard `AudioContext`
- Audio init: lazy, once on first play — scenes without audio skip entirely
- Scene change: stop → ramp gain down → disconnect/dispose chains → ramp gain up
- Main context + master gain persist across scene changes

**Config shorthand:**

- `{tone: 'Synth', params?: {...}}` for Tone.js nodes
- `{rnbo: 'rnbo.shimmerev', params?: {...}, preset?: 'Name'}` for RNBO patchers
- Used for both generators and fx
- RNBO presets: `preset` in config selects initial preset (falls back to "Default" → first); `params` override preset values
- Runtime: `chain.nodePresets` Map (-1=generator, 0+=fx index) with `NodePresetInfo {names, active, set(name)}`
- Buses also have `nodePresets` for their RNBO fx nodes

**Routing: chains → buses → master → destination:**

- AudioChain: generator → fx[] → analyzer? → solo → output
- Chain `bus` prop routes to named bus; otherwise routes to master chain (or masterGain)
- Buses: named fx chains with input/output GainNodes
- Master chain: scene-level fx before masterGain (compressor, limiter, etc.)
- Build order: master → buses → chains (so routing targets exist)

**Analyzers:**

- Per-chain/bus: `analyzer: boolean | 'fft' | 'waveform' | 'meter'` (Tone.Analyser/Meter)
- Shared analyzer: single `Tone.Analyser` on `AudioEngine.sharedAnalyzer`
- `connectSharedAnalyzer(engine, chain)` reconnects to selected chain for UI visualization
- `getWebAudioNode` checks `cur._analysers` array for Tone.Analyser internal nodes

**Chains:**

- Per-instrument by default; named chains can be shared across instruments
- Marbles can have own chain (triggers on collision using marble notes)
- Accessible in handlers: `ctx.instrument.audio`, `ctx.marble.audio`
- All chains accessible from `ctx.scene` for cross-entity audio manipulation

**Engines:**

- RNBO: `{rnbo: 'path'}` → loads `/patchers/path.json` (cached)
- Tone.js: `{tone: 'Name'}` → `new Tone[Name]`; dynamic import required
- Params unified across engines into common interface

**Integration:**

- Default `triggerHandler` plays audio automatically if chain configured (like MIDI)
- Note trigger uses marble note → instrument note fallback (same as MIDI)
- Scene definition stays TS code now, but keep JSON-serializable path open (no closures in chain config)

**Deferred:**

- CV / modulation / param automation — later
- Complex visualization (waveform rays, rail displacement) — after VU meter prototype

### Material Color Updates

**Pattern for runtime color changes:**

When colors can change at runtime (via `ctx.*.state.color = '#ff0000'`), use uniform updates instead of recreating materials:

```typescript
// GOOD - MarbleView pattern (✅ implemented)
const fx = makeMarbleMaterial(effectiveColor)  // create once
$effect(() => {
  fx.emissiveColor.value.set(effectiveColor)  // update uniform in-place (never create unnececary new Color())
})

// BAD - recreates material on every color change
const fx = $derived(makeInstrumentMaterial(effectiveColor))
```

**Status:**
- ✅ MarbleView: uses uniform pattern
- ✅ InstrumentView: uses uniform pattern
- ✅ RailView: uses uniform pattern

**Why:**
- Avoids WebGPU material compilation overhead
- Prevents memory leaks from undisposed materials
- Enables smooth color transitions

**Implementation:**
1. Remove `$derived()` wrapper from material creation
2. Create material once (not reactive)
3. Add `$effect()` to update `emissiveColor.value` uniform when color changes
4. Pattern applies to: `makeMarbleMaterial`, `makeInstrumentMaterial`, `makeRailMaterial` (already returns uniforms)

### For Claude Code

**DO:**

- In all interactions and commit messages, be extremely concise and sacrifice grammar for the sake of concision.
- Use Typescript in ./src/lib
- Use vitest for library functions
- Keep marble logic modular (easy to add zone types)
- Run lint, check and dev before asking for commit
- Use `vite build --outDir .build-check` when doing build check
- Use `check`, `lint` and `test` npm scripts when modifying TypeScript types

**DON'T:**

- Read files in `/archive` (obsolete experiments)
- Use Line2/MeshLine/examples/jsm materials with WebGPU renderer
- Use `any` without `eslint-disable` — TSL `Fn()` param types require it, wrap with block comments
- Block path to JSON scene serialization (avoid closures in audio chain config)
- Read RNBO JSON files and `/public/patchers`
- Run or commit default build on `/docs` for GitHub Pages
- Read files in `/docs`
- Read files in `/.fonts`
- Read files in `/.heap-snapshots`
- Run dev server
- Read `TODO.md`
---

## References

**Documentation:**

- Threlte: https://threlte.xyz/docs
- Rapier: https://rapier.rs/docs/user_guides/javascript/getting_started
- RNBO: https://rnbo.cycling74.com/learn/introduction-to-rnbo
- Three.js: https://threejs.org/docs/

---

## Notes

- Frame independence is CRITICAL (use delta time always)
- Audio timing precision matters for musical applications
- Visual feedback loop (trigger → sound → light) is core to UX
- Keep zone system modular for easy experimentation
- RNBO patches should be edited in Max, then exported to JSON
- Layouts defined as TypeScript data structures (for autocomplete), JSON-compatible
