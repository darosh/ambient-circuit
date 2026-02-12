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
- Physics: minimal at start, may be introduced later for specific areas (note bouncing, granular FX)

---

## Current Status

**Phase:** Marbles & sequencing

**Last Updated:** 2026-02-10

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
- [x] Arc-length-based beat positioning (marbles hit beats accurately)
- [x] Marble movement matches visualization exactly (arc-length interpolation on rail polyline)
- [x] Context-aware marble positioning (beat-to-polyline mapping handles mid-path position duplicates)
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
- [ ] Non-linear sequencing - advanced
  - [x] Change instrument params in TriggerHandler
  - [ ] Marble collisions: `bouncer: true` reverses on collision
  - [ ] Multi-marble interaction patterns
  - [ ] Active state enforcement (skip inactive instruments/marbles)
  - [ ] Rail switching API (teleport between rails)
- [ ] Visual polishing, WebGPU, TSL
  - [x] rails
  - [x] marbles
  - [x] instruments
  - [ ] feedback (lightning effects on collision)
- [ ] Audio instruments triggering (Tone.js)
- [ ] `FX`, audio processing
- [ ] RNBO `FX` audio processing

**Next Steps:**

1. Rail `transform` function in `SceneConfig` for complex astrolabe rotations
2. Nodes transform operations (rotate, scale), for use in `SceneConfig.nodes`
3. Fix: Beat jump doesn't trigger jumped-to instrument (middle arrow not triggered on way back)
4. Fix: We need single source of truth handling of default values, not this: ```return this.instrument.runtime!.spinning ?? typed.spinning ?? true```
5. Fix: Instrument on last and first beat is never triggered, in both sequencing modes
6. Fix: `visible` prop missing in `InstrumentBase`
7. Fix: missing `type` prop in `InstrumentState`
8. Active state enforcement (Phase 2.2): Skip inactive instruments/marbles in triggers
9. Rail switching API (Phase 3): Teleport marbles between rails with validation
10. Marble collisions (Phase 4): Bouncer marbles with collision detection
11. Fix skipped `tests/marble-state.test.ts`

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
/src/lib/marble-system.ts  - Marble movement logic (arc-length + curve following)
/src/lib/instrument.ts     - Instrument type with MIDI properties
/src/lib/instrument-state.ts - InstrumentState API (safe mutations with visible/active)
/src/lib/rail-state.ts     - RailState API (safe mutations with visible/active)
/src/lib/scene.ts          - TriggerContext, GlobalBeatContext, SceneConfig types
/src/lib/scene-ctx.ts      - SceneCtx types (MarbleEntity/InstrumentEntity/RailEntity)
/src/lib/scene-ctx-factory.ts - createSceneCtx(), updateSceneCtx()
/src/lib/easing.ts         - Easing functions (maath + custom)
/src/lib/midi/midi.ts      - Web MIDI API wrapper (init, port selection, sendNote)
/src/lib/rail-data.ts      - Rail definitions with MIDI-enabled onTrigger handlers
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

### For Claude Code

**DO:**

- In all interactions and commit messages, be extremely concise and sacrifice grammar for the sake of concision.
- Use Typescript in ./src/lib
- Use vitest for library functions
- Keep marble logic modular (easy to add zone types)
- Run lint, check and dev before asking for commit

**DON'T:**

- Read files in `/archive` (obsolete experiments)
- Use Line2/MeshLine/examples/jsm materials with WebGPU renderer
- Use `any` without `eslint-disable` — TSL `Fn()` param types require it, wrap with block comments

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
