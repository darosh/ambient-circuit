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
- [x] audio engine caching
- [ ] review need for lazy instruments load
- [ ] scene switch leaks
- [ ] check analyser view leaks?
- [ ] check all new obj and reusability
- [ ] hide debug
- [ ] hide fps
- [x] preserve hash params
- [ ] collision examples
- [ ] tone PolySynth
- [ ] use gigaverb from examples, freeverb too

/Users/jan/.nvm/versions/node/v24.8.0/bin/npm run heap:play:preview

> ambient-circuit@0.0.1 heap:play:preview
> node scripts/heap-snapshot.js --url=http://localhost:4173/#scene-rings --no-headless --type=preview --switching --wait=30

{
WAIT_S: 30,
TARGET_URL: 'http://localhost:4173/#scene-rings',
OUT_DIR: 'heap-snapshots',
SERVER_TYPE: 'preview',
SWITCH_SCENES: [
'scene-test',
'scene-structure',
'scene-rings',
'scene-instruments',
'scene-orientation',
'scene-logic'
]
}
Starting vite dev server...
Dev server ready
Navigating to http://localhost:4173/#scene-rings...
Taking snapshot A...
Saved: heap-snapshots/snap-A-1771498239149.heapsnapshot
Waiting 30s...
Scene: scene-test
Scene: scene-structure
Scene: scene-rings
Scene: scene-instruments
Scene: scene-orientation
Scene: scene-logic
Taking snapshot B...
Saved: heap-snapshots/snap-B-1771498270669.heapsnapshot

Heap Analysis — Ambient Circuit
──────────────────────────────────────────────────────
Snapshot A: 17.3 MB (274,140 nodes)
Snapshot B: 40.2 MB (632,188 nodes) [after 30s]
Delta: 23 MB (approx) (+358048 nodes)

Top 10 by size growth:
#1 system / JSArrayBufferData +250 objs +6018 KB ⚠ geometry data
#2 (object elements) +7803 objs +5137 KB
#3 +15304 objs +2147 KB
#4 Object +47173 objs +1596 KB
#5 heap number +100883 objs +1182 KB
#6 R +34417 objs +807 KB
#7 Ei +6666 objs +547 KB
#8 system / Context +12804 objs +436 KB
#9 system / TrustedByteArray +1640 objs +348 KB
#10Ae +3992 objs +344 KB

Three.js resources in snapshot B:
InterleavedBufferAttribute 1 40 B
WebGLCubeRenderTarget 1 36 B
MeshStandardMaterial 1 32 B
MeshBasicMaterial 1 32 B
MeshPhysicalMaterial 1 32 B
LineBasicMaterial 1 32 B
WebGLRenderTarget 1 32 B
BufferGeometry 1 28 B
BufferAttribute 1 28 B
ShaderMaterial 1 28 B
CanvasTexture 1 28 B
InstancedMesh 1 28 B
DataTexture 1 24 B
VideoTexture 1 24 B
SkinnedMesh 1 24 B
Material 1 20 B
Texture 1 20 B
AudioBuffer 1 0 B
AudioBufferSourceNode 1 0 B

Vite dev server stopped

Process finished with exit code 0
