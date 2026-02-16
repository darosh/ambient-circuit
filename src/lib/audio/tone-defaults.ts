export default <Record<string, Record<string, number>>>{
	Synth: {
		'envelope.attack': 0.005,
		'envelope.decay': 0.1,
		'envelope.sustain': 0.3,
		'envelope.release': 1,
		portamento: 0,
		detune: 0,
		volume: 1
	},
	PluckSynth: {
		attackNoise: 1,
		release: 1,
		resonance: 0.7,
		volume: 1
	},
	MetalSynth: {
		'envelope.attack': 0.001,
		'envelope.decay': 1.4,
		'envelope.sustain': 0,
		'envelope.release': 0.2,
		portamento: 0,
		detune: 0,
		volume: 1
	},
	NoiseSynth: {
		'envelope.attack': 0.01,
		'envelope.decay': 0.1,
		'envelope.sustain': 0,
		'envelope.release': 1
	},
	AMSynth: {},
	FMSynth: {},
	MembraneSynth: {},
	MonoSynth: {}
}
