export function randomizer(p = 1) {
	let previous = p

	return () => {
		previous = (previous * 16_807) % 2_147_483_647
		return previous / 2_147_483_647
	}
}
