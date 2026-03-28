import type { SceneConfig } from '../lib/core/scene'
import { triggerHandler } from '../lib/core/trigger-handler'
import { circle } from '../lib/core/rail-primitives'
import { MIDI } from './utils/midi-notes'
import { getNthNote, getBeatPattern } from '../lib/core/note-seq'
import { InstrumentConfig } from '../lib/core/instrument'

const midi = MIDI['test-1']
const midiBpm = 170 // midi.bpm
const totalBeats = 4 * 4
const track = midi.tracks[0]

// 16th note resolution: 4 subdivisions per beat
const granularity = 24
const beatPositions = getBeatPattern(track, totalBeats, midi.bpm, granularity)

const instruments = beatPositions.map(
	(beat) =>
		<InstrumentConfig>{
			type: 'poly' as const,
			sides: 3,
			beat,
			noteSeq: getNthNote(track, beat, totalBeats, midi.bpm, granularity),
			audio: { id: 'pluck' }
		}
)

export const scene: SceneConfig = {
	id: 'scene-midi',
	description: 'MIDI test',
	bpm: midiBpm,
	camera: [0, 10, 17],
	target: [0, -0.5, 0],
	polar: true,
	grid: [8 * 4, 4],
	// rotatePlay: true,
	sequencerBeats: 16,
	sequencerMode: 'compact',
	sequencerColors: true,
	beats: true,
	tint: [1, 1.75, 1.2],
	triggerHandler,
	audio: {
		chains: {
			pluck: {
				generator: {
					tone: 'Synth',
					poly: 8,
					params: {
						'envelope.attack': 0.005,
						'envelope.decay': 0.12,
						'envelope.sustain': 0.5,
						'envelope.release': 0.1,
						volume: 0,
						'oscillator.type': 'sawtooth'
					}
				},
				fx: [
					{
						tone: 'EQ3',
						params: { low: 6, mid: 3 }
					}
				]
			}
		},
		master: {
			analyzer: ['meter', 'waveform'],
			fx: [{ tone: 'Reverb', params: { decay: 10.2, wet: 0.75 } }, { tone: 'Compressor' }]
		}
	},
	rails: [
		{
			id: 'midi',
			nodes: circle({ radius: 5, points: totalBeats }),
			color: '#44ffd3',
			marbles: [{ speed: 1 }],
			instruments
		}
	]
}
