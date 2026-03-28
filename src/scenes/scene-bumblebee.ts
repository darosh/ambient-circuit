import type { SceneConfig } from '../lib/core/scene'
import { triggerHandler } from '../lib/core/trigger-handler'
import { circle } from '../lib/core/rail-primitives'
import { MIDI } from './utils/midi-notes'
import { getNthNote, getBeatPattern } from '../lib/core/note-seq'

const midi = MIDI['bumblebee-1']
const midiBpm = 170 // midi.bpm
const totalBeats = 3 * 4
const track = midi.tracks[0]

// 16th note resolution: 4 subdivisions per beat
const granularity = 8
const beatPositions = getBeatPattern(track, totalBeats, midi.bpm, granularity)

const instruments = beatPositions.map((beat) => ({
	type: 'poly' as const,
	sides: 3,
	beat,
	noteSeq: getNthNote(track, beat, totalBeats, midi.bpm, granularity),
	audio: { id: 'pluck' }
}))

export const scene: SceneConfig = {
	id: 'scene-bumblebee',
	description: 'MIDI test',
	bpm: midiBpm,
	camera: [0, 10, 17],
	target: [0, -0.5, 0],
	polar: true,
	rotatePlay: true,
	sequencerMode: 'compact',
	sequencerColors: true,
	beats: true,
	tint: [1.5, 1.2, 1],
	particles: true,
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
						volume: -6,
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
			id: 'bumblebee',
			nodes: circle({ radius: 5, points: totalBeats }),
			color: '#ffbe44',
			marbles: [{ speed: 1 }],
			instruments
		}
	]
}
