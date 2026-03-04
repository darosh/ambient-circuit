export const colors = ['#0000ff', '#8800ff', '#ff8888', '#ff00ff', '#ff0000']
export const color2 = ['#0000ff', '#ff00ff', '#ff0000', '#ff8888', '#8800ff']
export const color3 = ['#0000ff', '#aa00aa', '#aa00aa']
export const color4 = [0, 1].map(
	(_, i, arr) => `hsl(${((i * 360) / (arr.length - 1.39)) % 360}, 100%, 60%)`
)

export function colorFactory(colors_ = colors, ci = 0) {
	return () => colors_[ci++ % colors_.length]
}
