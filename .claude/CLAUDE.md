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
   - connections between points are either **straight** or **rounded** (smooth continuation from previous segment to next)
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

**Phase:** Early prototyping / architecture exploration

**Last Updated:** 2026-02-05

**What Works:**
- [x] Basic Threlte project template
- [ ] `Rails` definition architecture and rendering
- [ ] `Instruments`, audio trigger system
- [ ] Visual feedback (lightning effects on collision)
- [ ] `FX`, audio processing
- [ ] RNBO `FX` audio processing

**In Progress:**
- Deciding on `Rails` architecture
- Designing zone types and behaviors

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
/src - source
/src/lib - library functions
/src/components - svelte components
/tests - vitest tests
```

---

## Development Guidelines

### For Claude Code

**DO:**
- In all interactions and commit messages, be extremely concise and sacrifice grammar for the sake of concision.
- Use Typescript in ./src/lib
- Use vitest for library functions
- Keep marble logic modular (easy to add zone types)

**DON'T:**
- Read files in `/archive` (obsolete experiments)

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
