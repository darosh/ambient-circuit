# TODO (no AI)

- [ ] scene switch leaks
- [ ] review need for lazy instruments load
- [ ] use gigaverb from examples
- [ ] freeverb too
- [ ] rail deactivation -> inherited by instruments and marbler
- [ ] active uniform reducing lightness in rail material
- [ ] ball destruction and creation in handlers (reset on rewind)
- [ ] chord info in context, global chord
- [ ] try <Float> on rails
- [ ] replace the Perlin texture with procedural generation
- [ ] make RNBO synth
- [ ] make RNBO karplus-strong synth https://rnbo.cycling74.com/explore/synth-building-blocks-intro
- [ ] use rails for camera path? or scene path? and keep the camera for user only
- [x] transport rewind
- [x] scene description
- [x] global handler factory
- [x] refactor MIDI
- [x] reset global beat on scene change
- [x] add <Stars>
- [x] ~~remove overlapping beats from structure scene~~
- [x] /data to /scene
- [x] impact material for audio view
- [x] test moving rails
- [x] test marble as instrument
- [x] hide audio text,
- [x] show audio analyzers
- [x] show all nodes
- [x] default analyzer
- [x] audio view color
- [x] no offset for no bus
- [x] reuse node layout
- [x] audio engine caching
- [x] check analyser view leaks?
- [x] preserve hash params
- [x] collision examples
- [x] tone PolySynth
- [x] check all new obj and reusability
- [x] hide debug
- [x] hide fps
- [x] negative Z audio view
- [x] HUD
- [x] fix sequencer offset in scene-rings
- [x] shift + play -> freeze
- [x] version in app

The 627 MeshBasicMaterial count likely comes from new Mesh() without material arg (Three.js creates a default
MeshBasicMaterial per mesh): 48 × N_rows SequencerView + 16 × N_rows AnalyserView + transport hitboxes. A future
task could share a single dummy material or pass pool materials at construction time.
