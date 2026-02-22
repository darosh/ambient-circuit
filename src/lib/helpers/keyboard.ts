type KeyBinding = {
	code: string
	action: (e: KeyboardEvent) => void
}

export function createKeydownHandler(bindings: KeyBinding[]): (e: KeyboardEvent) => void {
	const map = new Map<string, (e: KeyboardEvent) => void>()
	for (const b of bindings) map.set(b.code, b.action)

	return (e: KeyboardEvent) => {
		if (e.target !== document.body) return
		const action = map.get(e.code)
		if (action) {
			if (e.code === 'Space') e.preventDefault()
			action(e)
		}
	}
}
