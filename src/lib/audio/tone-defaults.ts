export default <Record<string, Record<string, number | string | number[]>>>(<unknown>{
	Synth: {
		volume: 0,
		detune: 0,
		portamento: 0,
		'envelope.attack': 0.005,
		'envelope.decay': 0.1,
		'envelope.release': 1,
		'envelope.sustain': 0.3
	},
	PluckSynth: {
		volume: 0,
		attackNoise: 1,
		dampening: 4000,
		resonance: 0.7,
		release: 1
	},
	MetalSynth: {
		volume: 0,
		detune: 0,
		portamento: 0,
		'envelope.attack': 0.001,
		'envelope.decay': 1.4,
		'envelope.release': 0.2,
		'envelope.sustain': 0.5,
		harmonicity: 5.1,
		octaves: 1.5,
		resonance: 4000
	},
	NoiseSynth: {
		volume: 0,
		'envelope.attack': 0.01,
		'envelope.decay': 0.1,
		'envelope.release': 1,
		'envelope.sustain': 0,
		'noise.fadeIn': 0,
		'noise.fadeOut': 0,
		'noise.playbackRate': 1
	},
	AMSynth: {
		volume: 0,
		detune: 0,
		portamento: 0,
		harmonicity: 3,
		'envelope.attack': 0.01,
		'envelope.decay': 0.01,
		'envelope.release': 0.5,
		'envelope.sustain': 1,
		'modulationEnvelope.attack': 0.5,
		'modulationEnvelope.decay': 0,
		'modulationEnvelope.release': 0.5,
		'modulationEnvelope.sustain': 1
	},
	FMSynth: {
		volume: 0,
		detune: 0,
		portamento: 0,
		harmonicity: 3,
		'envelope.attack': 0.01,
		'envelope.decay': 0.01,
		'envelope.release': 0.5,
		'envelope.sustain': 1,
		'modulationEnvelope.attack': 0.5,
		'modulationEnvelope.decay': 0,
		'modulationEnvelope.release': 0.5,
		'modulationEnvelope.sustain': 1
	},
	MembraneSynth: {
		volume: 0,
		detune: 0,
		portamento: 0,
		'envelope.attack': 0.001,
		'envelope.decay': 0.4,
		'envelope.release': 1.4,
		'envelope.sustain': 0.01,
		octaves: 10,
		pitchDecay: 0.05
	},
	MonoSynth: {
		volume: 0,
		detune: 0,
		portamento: 0,
		'envelope.attack': 0.005,
		'envelope.decay': 0.1,
		'envelope.release': 1,
		'envelope.sustain': 0.9,
		'filter.Q': 1,
		'filter.detune': 0,
		'filter.gain': 0,
		'filterEnvelope.attack': 0.6,
		'filterEnvelope.decay': 0.2,
		'filterEnvelope.release': 2,
		'filterEnvelope.sustain': 0.5,
		'filterEnvelope.baseFrequency': 200,
		'filterEnvelope.exponent': 2,
		'filterEnvelope.octaves': 3,
		'oscillator.detune': 0
	},
	DuoSynth: {
		volume: 0,
		detune: 0,
		portamento: 0,
		vibratoAmount: 0.5,
		vibratoRate: 5,
		harmonicity: 1.5
	}
})
