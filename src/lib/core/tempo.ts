export interface TempoConfig {
	bpm: number
	beatsPerBar: number
}

export interface TempoState {
	config: TempoConfig
	currentBeat: number
	isPlaying: boolean
	beatProgress: number // 0-1 progress to next beat
	rewind: number
}

export function createTempoState(config: TempoConfig = { bpm: 120, beatsPerBar: 4 }): TempoState {
	return {
		config,
		currentBeat: 0,
		isPlaying: false,
		beatProgress: 0,
		rewind: 0
	}
}

export function updateTempo(state: TempoState, deltaTimeMs: number): void {
	if (!state.isPlaying) return

	const beatsPerSecond = state.config.bpm / 60
	const beatsPerMs = beatsPerSecond / 1000
	const deltaBeat = beatsPerMs * deltaTimeMs

	state.beatProgress += deltaBeat

	while (state.beatProgress >= 1) {
		state.beatProgress -= 1
		state.currentBeat += 1
	}
}

export function resetTempo(state: TempoState): void {
	state.currentBeat = 0
	state.beatProgress = 0
}
