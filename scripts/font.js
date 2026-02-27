// usage node ./scripts/font.js ./.fonts/NanumGothicCoding-Regular.ttf ./public/fonts/nanumgothiccoding-regular.json "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ+-_:.,;|()[]{} #*/'…<>♭♯♪♬♩☆★"

import opentype from 'opentype.js'
import { readFile, writeFile } from 'node:fs/promises'

// https://github.com/gero3/facetype.js/blob/ce2f078003edbb5fd494fe7277face2f312567ca/javascripts/main.js#L49
const convertFont = (font, { weight, variant, characters }) => {
	const scale = (1000 * 100) / ((font.unitsPerEm || 2048) * 72)
	const result = { glyphs: {} }

	const exportGlyph = (char, glyph) => {
		const token = {}
		token.ha = Math.round(glyph.advanceWidth * scale)
		token.x_min = Math.round(glyph.xMin * scale)
		token.x_max = Math.round(glyph.xMax * scale)
		token.o = ''
		glyph.path.commands.forEach(function (command) {
			if (command.type.toLowerCase() === 'c') {
				command.type = 'b'
			}
			token.o += command.type.toLowerCase()
			token.o += ' '
			if (command.x !== undefined && command.y !== undefined) {
				token.o += Math.round(command.x * scale)
				token.o += ' '
				token.o += Math.round(command.y * scale)
				token.o += ' '
			}
			if (command.x1 !== undefined && command.y1 !== undefined) {
				token.o += Math.round(command.x1 * scale)
				token.o += ' '
				token.o += Math.round(command.y1 * scale)
				token.o += ' '
			}
			if (command.x2 !== undefined && command.y2 !== undefined) {
				token.o += Math.round(command.x2 * scale)
				token.o += ' '
				token.o += Math.round(command.y2 * scale)
				token.o += ' '
			}
		})
		result.glyphs[char] = token
	}

	if (characters) {
		// Use charmap lookup so glyphs like space (unicode=0 in glyph but mapped from char 32) are found correctly
		for (const char of characters) {
			const glyph = font.charToGlyph(char)
			if (glyph && glyph.advanceWidth) {
				exportGlyph(char, glyph)
			}
		}
	} else {
		Object.values(font.glyphs.glyphs).forEach(function (glyph) {
			if (glyph.unicode !== undefined) {
				exportGlyph(String.fromCharCode(glyph.unicode), glyph)
			}
		})
	}

	result.familyName = font.familyName
	result.ascender = Math.round(font.ascender * scale)
	result.descender = Math.round(font.descender * scale)

	result.underlinePosition = Math.round(font.tables.post.underlinePosition * scale)

	result.underlineThickness = Math.round(font.tables.post.underlineThickness * scale)

	result.boundingBox = {
		yMin: Math.round(font.tables.head.yMin * scale),
		xMin: Math.round(font.tables.head.xMin * scale),
		yMax: Math.round(font.tables.head.yMax * scale),
		xMax: Math.round(font.tables.head.xMax * scale)
	}

	result.resolution = 1000
	result.original_font_information = font.tables.name
	result.cssFontWeight = weight
	result.cssFontStyle = variant

	return result
}

async function main(fontPath, jsonPath, characters) {
	const buffer = await readFile(fontPath)

	const font = opentype.parse(buffer.buffer)

	// Extract weight and variant from font name or use defaults
	const weight = font.tables.name.fontSubfamily?.en?.toLowerCase().includes('bold')
		? 'bold'
		: 'normal'
	const variant = font.tables.name.fontSubfamily?.en?.toLowerCase().includes('italic')
		? 'italic'
		: 'normal'

	const fontAsJson = convertFont(font, { weight, variant, characters })

	if (jsonPath.includes('nanumgothiccoding')) {
		fontAsJson.glyphs['*'] = shiftGlyphY(fontAsJson.glyphs['*'], -60)
		// fontAsJson.glyphs['…'] = shiftGlyphY(fontAsJson.glyphs['…'], -525)
		// fontAsJson.glyphs['…'] = matchGlyphWidth(fontAsJson.glyphs['…'], fontAsJson.glyphs['_'])
	}

	await writeFile(jsonPath, JSON.stringify(fontAsJson))
	console.log(`✓ Converted ${fontPath} → ${jsonPath}`)
	console.log(`  Characters: ${characters || 'all'}`)
}

// Parse command line arguments
const [fontPath, jsonPath, characters] = process.argv.slice(2)

if (!fontPath || !jsonPath) {
	console.error('Usage: node font.js <fontPath> <jsonPath> [characters]')
	process.exit(1)
}

// type Glyph = {
// 	ha: number;
// 	x_min: number;
// 	x_max: number;
// 	o: string;
// };

// export function shiftGlyphY(glyph: Glyph, offset: number): Glyph {
export function shiftGlyphY(glyph, offset) {
	const commands = glyph.o.trim().split(/\s+/)
	// const result: string[] = [];
	const result = []

	let i = 0

	while (i < commands.length) {
		const cmd = commands[i]

		result.push(cmd)
		i++

		switch (cmd) {
			case 'm':
			case 'l':
				// x y
				result.push(commands[i]) // x
				result.push(String(Number(commands[i + 1]) + offset)) // y shifted
				i += 2
				break

			case 'q':
				// cx cy x y
				result.push(commands[i]) // cx
				result.push(String(Number(commands[i + 1]) + offset)) // cy shifted
				result.push(commands[i + 2]) // x
				result.push(String(Number(commands[i + 3]) + offset)) // y shifted
				i += 4
				break

			case 'b':
				// cx1 cy1 cx2 cy2 x y
				result.push(commands[i]) // cx1
				result.push(String(Number(commands[i + 1]) + offset)) // cy1
				result.push(commands[i + 2]) // cx2
				result.push(String(Number(commands[i + 3]) + offset)) // cy2
				result.push(commands[i + 4]) // x
				result.push(String(Number(commands[i + 5]) + offset)) // y
				i += 6
				break

			case 'z':
				break

			default:
				throw new Error(`Unsupported command: ${cmd}`)
		}
	}

	return {
		...glyph,
		o: result.join(' ')
	}
}

// export function tightenEllipsis(glyph: Glyph, spacingReduction: number): Glyph {
export function tightenEllipsis(glyph, spacingReduction) {
	const tokens = glyph.o.trim().split(/\s+/)
	// const result: string[] = [];
	const result = []

	let i = 0
	let dotIndex = -1

	while (i < tokens.length) {
		const cmd = tokens[i]
		result.push(cmd)
		i++

		const shiftAmount = dotIndex <= 0 ? 0 : -spacingReduction * dotIndex

		switch (cmd) {
			case 'm': {
				dotIndex++ // new contour = new dot
				const x = Number(tokens[i]) + shiftAmount
				const y = Number(tokens[i + 1])
				result.push(String(x), String(y))
				i += 2
				break
			}

			case 'l': {
				const x = Number(tokens[i]) + shiftAmount
				const y = Number(tokens[i + 1])
				result.push(String(x), String(y))
				i += 2
				break
			}

			case 'q': {
				const cx = Number(tokens[i]) + shiftAmount
				const cy = Number(tokens[i + 1])
				const x = Number(tokens[i + 2]) + shiftAmount
				const y = Number(tokens[i + 3])
				result.push(String(cx), String(cy), String(x), String(y))
				i += 4
				break
			}

			case 'b': {
				const cx1 = Number(tokens[i]) + shiftAmount
				const cy1 = Number(tokens[i + 1])
				const cx2 = Number(tokens[i + 2]) + shiftAmount
				const cy2 = Number(tokens[i + 3])
				const x = Number(tokens[i + 4]) + shiftAmount
				const y = Number(tokens[i + 5])
				result.push(String(cx1), String(cy1), String(cx2), String(cy2), String(x), String(y))
				i += 6
				break
			}

			case 'z':
				break

			default:
				throw new Error(`Unsupported command: ${cmd}`)
		}
	}

	const newXMax = glyph.x_max - spacingReduction * 2
	const newHa = glyph.ha - spacingReduction * 2

	return {
		...glyph,
		o: result.join(' '),
		x_max: newXMax,
		ha: newHa
	}
}

// export function matchGlyphWidth(ellipsis: Glyph, reference: Glyph): Glyph {
export function matchGlyphWidth(ellipsis, reference) {
	const ellipsisWidth = ellipsis.x_max - ellipsis.x_min
	const targetWidth = reference.x_max - reference.x_min

	const totalReduction = ellipsisWidth - targetWidth

	if (totalReduction <= 0) {
		// already smaller or equal
		return ellipsis
	}

	// We assume 3 dots → reduce spacing in 2 gaps
	const spacingReduction = totalReduction / 2

	console.log({
		ellipsisWidth,
		targetWidth,
		totalReduction,
		spacingReduction
	})

	return tightenEllipsis(ellipsis, spacingReduction)
}

main(fontPath, jsonPath, characters).catch((err) => {
	console.error('Error:', err)
	process.exit(1)
})
