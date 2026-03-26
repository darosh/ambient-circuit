import { describe, it, expect } from 'vitest'
import { createCtrlInstance, triggerCtrl, tickCtrl } from '../src/lib/core/ctrl'
import type { CtrlConfig } from '../src/lib/core/ctrl'

describe('ctrl', () => {
	describe('set', () => {
		it('returns configured value on trigger', () => {
			const config: CtrlConfig = { cc: 12, channel: 1, type: 'set', value: 0.7 }
			const inst = createCtrlInstance(config)
			expect(inst.value).toBe(0.7)
			const v = triggerCtrl(inst)
			expect(v).toBe(0.7)
			expect(inst.active).toBe(false)
		})
	})

	describe('envelope', () => {
		it('ramps up during attack, down during decay', () => {
			const config: CtrlConfig = {
				cc: 14,
				channel: 1,
				type: 'envelope',
				attack: 1,
				decay: 1
			}
			const inst = createCtrlInstance(config)
			triggerCtrl(inst)
			expect(inst.active).toBe(true)
			expect(inst.value).toBe(0)

			// Half attack
			tickCtrl(inst, 0.5, 120)
			expect(inst.value).toBeCloseTo(0.5)

			// End of attack
			tickCtrl(inst, 0.5, 120)
			expect(inst.value).toBeCloseTo(1)

			// Half decay
			tickCtrl(inst, 0.5, 120)
			expect(inst.value).toBeCloseTo(0.5)

			// End of decay
			tickCtrl(inst, 0.5, 120)
			expect(inst.value).toBe(0)
			expect(inst.active).toBe(false)
		})

		it('exponential curve', () => {
			const config: CtrlConfig = {
				cc: 14,
				channel: 1,
				type: 'envelope',
				attack: 1,
				decay: 1,
				curve: 'exponential'
			}
			const inst = createCtrlInstance(config)
			triggerCtrl(inst)

			tickCtrl(inst, 0.5, 120)
			// exponential attack: t^2 at t=0.5 → 0.25
			expect(inst.value).toBeCloseTo(0.25)
		})

		it('re-trigger resets phase', () => {
			const config: CtrlConfig = {
				cc: 14,
				channel: 1,
				type: 'envelope',
				attack: 1,
				decay: 1
			}
			const inst = createCtrlInstance(config)
			triggerCtrl(inst)
			tickCtrl(inst, 0.8, 120)
			expect(inst.value).toBeCloseTo(0.8)

			// Re-trigger resets
			triggerCtrl(inst)
			expect(inst.phase).toBe(0)
			expect(inst.value).toBe(0)
		})
	})

	describe('lfo', () => {
		it('sine oscillates 0-1', () => {
			const config: CtrlConfig = {
				cc: 15,
				channel: 1,
				type: 'lfo',
				shape: 'sine',
				rate: 1
			}
			const inst = createCtrlInstance(config)
			triggerCtrl(inst)

			// At phase 0: sin(0) = 0 → (0+1)/2 = 0.5
			tickCtrl(inst, 0, 120)
			// phase=0 → sin(0)=0 → 0.5 (but dt=0 so phase stays 0)

			// Quarter cycle: sin(π/2) = 1 → (1+1)/2 = 1
			tickCtrl(inst, 0.25, 120)
			expect(inst.value).toBeCloseTo(1)

			// Half cycle: sin(π) = 0 → 0.5
			tickCtrl(inst, 0.25, 120)
			expect(inst.value).toBeCloseTo(0.5)
		})

		it('freerun preserves phase on re-trigger', () => {
			const config: CtrlConfig = {
				cc: 15,
				channel: 1,
				type: 'lfo',
				shape: 'saw',
				rate: 1,
				freerun: true
			}
			const inst = createCtrlInstance(config)
			triggerCtrl(inst)
			tickCtrl(inst, 0.3, 120) // phase = 0.3

			triggerCtrl(inst) // freerun: phase stays
			expect(inst.phase).toBeCloseTo(0.3)
		})

		it('non-freerun resets phase', () => {
			const config: CtrlConfig = {
				cc: 15,
				channel: 1,
				type: 'lfo',
				shape: 'saw',
				rate: 1
			}
			const inst = createCtrlInstance(config)
			triggerCtrl(inst)
			tickCtrl(inst, 0.3, 120)

			triggerCtrl(inst)
			expect(inst.phase).toBe(0)
		})

		it('beat-synced rate', () => {
			const config: CtrlConfig = {
				cc: 15,
				channel: 1,
				type: 'lfo',
				shape: 'saw',
				rate: '1/4'
			}
			const inst = createCtrlInstance(config)
			triggerCtrl(inst)

			// At 120 BPM: beatsPerSec = 2, hz = 2 / (0.25 * 4) = 2
			tickCtrl(inst, 0.25, 120)
			// phase = 0.25 * 2 = 0.5 → saw = 0.5
			expect(inst.value).toBeCloseTo(0.5)
		})
	})

	describe('sequence', () => {
		it('cycles through values', () => {
			const config: CtrlConfig = {
				cc: 16,
				channel: 1,
				type: 'sequence',
				values: [0.2, 0.5, 0.8]
			}
			const inst = createCtrlInstance(config)

			expect(triggerCtrl(inst)).toBeCloseTo(0.2)
			expect(triggerCtrl(inst)).toBeCloseTo(0.5)
			expect(triggerCtrl(inst)).toBeCloseTo(0.8)
			expect(triggerCtrl(inst)).toBeCloseTo(0.2) // wraps
		})
	})

	describe('tickCtrl inactive', () => {
		it('returns -1 for inactive instance', () => {
			const config: CtrlConfig = { cc: 12, channel: 1, type: 'set', value: 0.5 }
			const inst = createCtrlInstance(config)
			expect(tickCtrl(inst, 0.016, 120)).toBe(-1)
		})
	})
})
