export async function pause(t = 0) {
	return new Promise((r) => setTimeout(r, t))
}

export async function queue() {
	return new Promise<void>((r) => queueMicrotask(r))
}
