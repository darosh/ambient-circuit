<script lang="ts">
	import { globalState } from './global-state.svelte'
	import { toggleMute } from '../lib/audio/engine'
	import type { AudioEngine } from '../lib/audio'

	const { engine }: { engine: AudioEngine | null } = $props()

	function writeLS(key: string, v: boolean) {
		localStorage.setItem(key, v ? 'true' : 'false')
	}

	$effect(() => {
		globalState.engine = engine
	})

	$effect(() => {
		writeLS('ac-muted', globalState.isMuted)

		if (globalState.engine) {
			toggleMute(globalState.engine, globalState.isMuted)
		}
	})
</script>
