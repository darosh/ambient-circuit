<script module lang="ts">
	export const globalState = $state<{
		engine: import('../lib/audio').AudioEngine | null
		isMuted: boolean
	}>({
		engine: null,
		isMuted: readLS('ac-muted', false)
	})

	function readLS(key: string, def: boolean): boolean {
		if (typeof localStorage === 'undefined') return def
		const v = localStorage.getItem(key)
		return v === null ? def : v === 'true'
	}
</script>
