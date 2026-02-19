export async function pause(t = 0) {
	return new Promise((r) => setTimeout(r, t))
}
