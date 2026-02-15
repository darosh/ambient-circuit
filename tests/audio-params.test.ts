import { describe, it, expect } from 'vitest'
import { unflattenParams, setNodeParam, getNodeParam } from '../src/lib/audio/engine'

describe('unflattenParams', () => {
	it('passes flat keys through', () => {
		expect(unflattenParams({ mix: 50, decay: 600 })).toEqual({ mix: 50, decay: 600 })
	})

	it('unflattens dot-paths', () => {
		expect(unflattenParams({ 'envelope.attack': 0.01, 'envelope.sustain': 0.5 })).toEqual({
			envelope: { attack: 0.01, sustain: 0.5 }
		})
	})

	it('handles multi-level nesting', () => {
		expect(unflattenParams({ 'a.b.c': 1 })).toEqual({ a: { b: { c: 1 } } })
	})

	it('handles mixed flat and nested', () => {
		expect(unflattenParams({ x: 3, 'a.b': 1 })).toEqual({ x: 3, a: { b: 1 } })
	})

	it('handles string values', () => {
		expect(unflattenParams({ 'oscillator.type': 'triangle' })).toEqual({
			oscillator: { type: 'triangle' }
		})
	})
})

describe('setNodeParam / getNodeParam', () => {
	it('sets and gets flat property on mock object', () => {
		const obj = { volume: 0 }
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setNodeParam(obj as any, 'volume', -12)
		expect((obj as { volume: number }).volume).toBe(-12)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(getNodeParam(obj as any, 'volume')).toBe(-12)
	})

	it('sets and gets nested property via dot-path', () => {
		const obj = { envelope: { attack: 0.1, release: 0.5 } }
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setNodeParam(obj as any, 'envelope.attack', 0.01)
		expect(obj.envelope.attack).toBe(0.01)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(getNodeParam(obj as any, 'envelope.attack')).toBe(0.01)
	})

	it('returns undefined for missing path', () => {
		const obj = { x: 1 }
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(getNodeParam(obj as any, 'y.z')).toBeUndefined()
	})

	it('handles RNBO device with parameters array', () => {
		const device = {
			scheduleEvent: () => {},
			parameters: [
				{ name: 'mix', id: 'mix', value: 50 },
				{ name: 'decay', id: 'decay', value: 600 }
			]
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setNodeParam(device as any, 'mix', 80)
		expect(device.parameters[0].value).toBe(80)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(getNodeParam(device as any, 'mix')).toBe(80)
	})
})
