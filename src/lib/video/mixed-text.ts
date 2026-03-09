import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import type { BufferGeometry } from 'three/webgpu'

export type TextSeg = { text: string; sizeScale: number; yShift: number }

const CHAR_WIDTH = 0.69

// superscript size scale (3/4)
export const HALF_SIZE = 0.75
const HALF_SHIFT = 0.23

// ─── Parsers ──────────────────────────────────────────────────────────────────

export function parseNoteLabel(text: string): TextSeg[] {
	const m = text.match(/^([A-G])([#b]?)(\d?)$/)
	if (!m) return [{ text, sizeScale: 1, yShift: 0 }]
	const [, root, acc, oct] = m
	const sup = acc + oct
	if (!sup) return [{ text: root, sizeScale: 1, yShift: 0 }]
	return [
		{ text: root, sizeScale: 1, yShift: 0 },
		{ text: sup, sizeScale: HALF_SIZE, yShift: HALF_SHIFT }
	]
}

export function parseChordLabel(text: string): TextSeg[] {
	const m = text.match(/^([A-G])([#b]?)(.*)$/)
	if (!m) return [{ text, sizeScale: 1, yShift: 0 }]
	const [, letter, acc, quality] = m
	if (!acc && !quality) return [{ text: letter, sizeScale: 1, yShift: 0 }]
	const segs: TextSeg[] = [{ text: letter, sizeScale: 1, yShift: 0 }]
	const sup = acc + quality
	if (sup) segs.push({ text: sup, sizeScale: HALF_SIZE, yShift: HALF_SHIFT })
	return segs
}

export function parseScaleText(text: string): TextSeg[] {
	const segs: TextSeg[] = []
	let i = 0
	let plain = ''
	while (i < text.length) {
		const ch = text[i]
		const next = text[i + 1]
		if (ch >= 'A' && ch <= 'G' && (next === '#' || next === 'b')) {
			if (plain) {
				segs.push({ text: plain, sizeScale: 1, yShift: 0 })
				plain = ''
			}
			segs.push(
				{ text: ch, sizeScale: 1, yShift: 0 },
				{ text: next, sizeScale: HALF_SIZE, yShift: HALF_SHIFT }
			)
			i += 2
		} else {
			plain += ch
			i++
		}
	}
	if (plain) segs.push({ text: plain, sizeScale: 1, yShift: 0 })
	return segs
}

const NOTE_RE = /^[A-G][#b]?\d?$/
const CHORD_RE = /^[A-G][#b]?.+/

export function parseMixedText(text: string): TextSeg[] {
	if (NOTE_RE.test(text)) return parseNoteLabel(text)
	if (CHORD_RE.test(text) && !text.includes(' ')) return parseChordLabel(text)
	return parseScaleText(text)
}

// ─── Width ────────────────────────────────────────────────────────────────────

export function mixedTextCharWidth(text: string): number {
	const segs = parseMixedText(text)
	let w = 0
	for (const seg of segs) w += seg.text.length * seg.sizeScale
	return w
}

// ─── Geometry ─────────────────────────────────────────────────────────────────

function makeTextGeo(text: string, size: number, font: Font): TextGeometry {
	const g = new TextGeometry(text, { font, size, depth: 0, curveSegments: 3 })
	g.computeBoundingBox()
	return g
}

export function buildMixedGeometry(segs: TextSeg[], baseSize: number, font: Font): BufferGeometry {
	if (segs.length === 1 && segs[0].sizeScale === 1 && segs[0].yShift === 0) {
		return makeTextGeo(segs[0].text, baseSize, font)
	}

	let xCursor = 0
	const parts: TextGeometry[] = []

	for (const seg of segs) {
		const size = baseSize * seg.sizeScale
		const g = makeTextGeo(seg.text, size, font)
		const w = CHAR_WIDTH * size * seg.text.length
		// const bb = g.boundingBox!
		// const w = bb.max.x - bb.min.x
		g.translate(xCursor, baseSize * seg.yShift, 0)
		parts.push(g)
		xCursor += w
	}

	const merged = mergeGeometries(parts, false)
	for (const p of parts) p.dispose()
	return merged as BufferGeometry
}
