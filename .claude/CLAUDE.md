# Ambient Circuit

> Non-linear physical sequencer combining physics with audio synthesis and visual feedback

## Project Vision

Create a "marble-machine-inspired" music sequencer where:
- Physical marbles trigger or carry musical notes through 3D space
- Collisions with zones produce sound and visual effects (lightning, glows)
- Hybrid audio engine combining Tone.js and RMBO for high-quality ambient audio processing (reverb, saturation, compression)
- Satisfying physics-driven generative music with beautiful graphics, neon glowing aesthetics, complex circuit structure, Tron inspired
- There should be few layouts/songs where the circuit will fill sphere/cylinder/cube, each with own color scheme

## Concepts

- `Marbles`
  - objects moving on `Rails`
  - triggering `Instruments`
  - carry note or are in vanilla mode
  - note can be represented by color
  - note could be changed by `Modifier`
- `Rails`
   - sequencer lines, like connections in printed circuit board
   - single line
   - the `Marbles` travel on the lines
   - lines can have straight and curved parts
   - lines can `Split` or `Merge` into multiple lines
   - each rail is a sequencer
   - `Marbles` travel in loop or in open-ended case they reverse or start from beginning
   - the definition of the `Rails` should be simple, just points in space and connection metadata, the curves should be computed automatically where required
   - the definition should be able to produce: straight lines, rounded corners, circles spirals, coils shapes
   - points should define which `BarBeat` beat they belong to
   - the movement speed of `Marbles` should be compensated to match the `BarBeat`
   - we should support linear and eased movement between the `BarBeats`
- `Split` points should have "weight" options, something like [2,4] pick first twice, then second four times 
- `Instruments`
   - could look like a portals around `Rails`, like rounded lens in a way of laser beam
   - instruments should be positioned at `BarBeat` units
- `AudioPaths`, `FX` would be elaborated later, they would serve as visualization of the audio events and processing  
- Physics should be used only is specific areas for note bouncing or granular FX

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
- **Rapier** - Physics engine for marble simulation
- **Tone.js**
- **RNBO** - High-quality audio effects (reverb, saturation, compression, shimmer)
- **Svelte** - UI framework and build system

### Physics Integration
- Frame-independent physics using delta time or fixed framerate
- Collision detection via Rapier contact pairs

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

- Physics framerate independence is CRITICAL (use delta time always)
- Audio timing precision matters for musical applications
- Visual feedback loop (collision → sound → light) is core to UX
- Keep zone system modular for easy experimentation
- RNBO patches should be edited in Max, then exported to JSON
