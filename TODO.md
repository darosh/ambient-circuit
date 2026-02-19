# TODO (no AI)

- [x] global handler factory
- [x] refactor MIDI
- [x] reset global beat on scene change
- [ ] transport rewind
- [ ] scene description
- [ ] rail deactivation -> inherited by instruments and marbler
- [ ] active uniform reducing lightness in rail material
- [ ] ball destruction and creation in handlers
- [ ] add <Stars>
- [ ] try <Float> on rails
- [ ] replace the Perlin texture with procedural generation
- [ ] make RNBO synth
- [ ] make RNBO karplus-strong synth https://rnbo.cycling74.com/explore/synth-building-blocks-intro
- [ ] use rails for camera path? or scene path? and keep the camera for user only
- [ ] remove overlapping beats from structure scene
- [x] /data to /scene
- [x] impact material for audio view
- [x] test moving rails
- [ ] test marble as instrument
- [x] hide audio text,
- [x] show audio analyzers
- [x] show all nodes
- [x] default analyzer
- [x] audio view color
- [x] no offset for no bus
- [x] reuse node layout
- [ ] scene switch leaks
- [ ] hide debug
- [ ] hide fps
- [ ] preserve hash params
- [ ] collision examples
- [ ] tone PolySynth

Summary of changes across 3 files:

marble-system.ts (biggest impact — ~5 allocations/marble/frame eliminated):

- 3 module-level \_tmp0, \_tmp1, \_tmpRight buffers
- Curved segments: curve.getPoint(t, marble.position) / getTangent(t, marble.tangent) — writes in-place,
  zero allocation
- Straight segments: \_tmp0.set(...) / lerpVectors / subVectors in-place — zero allocation
- Removed dead parallel transport block (was comparing tangent to itself, condition was always false,
  allocating 5 vectors for nothing)
- Snake: \_tmpRight.crossVectors(...) and marble.tangent.addScaledVector(...).normalize() in-place

MarbleView.svelte (~7 objects/marble/frame → 0):

- Scratch \_mRef/Up/Right/CorrUp/Mat/TmpMat/Euler per instance; \_POLY_ROT constant matrix
- Manual Gram-Schmidt (no .clone(), no multiplyScalar)

InstrumentView.svelte (~8 objects/instrument/frame → 0):

- Same scratch pattern; 3 module-level constant rotation matrices (\_ROT_NEG_HALF_PI etc.)
- position derived: removed .clone() entirely (reads transform.position directly)

✻ Cooked for 8m 18s

❯ Uncaught TypeError: point.set is not a function  
at calculateMarblePosition (marble-system.ts:205:9)  
at updateMarble (marble-system.ts:865:2)  
at updateMarbles (marble-system.ts:890:3)  
at Task.callback (Scene.svelte:504:3)

⏺ Searched for 1 pattern (ctrl+o to expand)

⏺ The root cause: marble.position and marble.tangent are initialized as plain objects ({ x: 0, y: 0, z: 0 },
not real Vector3 instances), so calling Three.js prototype methods on them fails. The old code always did
marble.position = curve.getPoint(...) (assignment), which worked fine. The fix: use tmp vectors for all
Three.js operations, then write x/y/z back via property assignment — works on plain objects and Vector3
alike.
