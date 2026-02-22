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

main(fontPath, jsonPath, characters).catch((err) => {
	console.error('Error:', err)
	process.exit(1)
})
