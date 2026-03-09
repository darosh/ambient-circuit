export const f8: boolean = (() => {
	try {
		if (typeof WebAssembly == 'object' && typeof WebAssembly.instantiate == 'function') {
			const t = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0))
			if (t instanceof WebAssembly.Module) {
				return new WebAssembly.Instance(t) instanceof WebAssembly.Instance
			}
		}
	} catch (t) {}
	return false
})()

export class e1 {
	fromRNBOtime(t: number): number {
		return t * 0.001
	}
	toRNBOtime(t: number): number {
		return t * 1000
	}
}

export const I7: boolean =
	typeof isSecureContext != 'undefined' && isSecureContext && typeof AudioWorkletNode != 'undefined'

let a = Math.pow(10, 4)
export const EL = (): number => {
	if (a >= Number.MAX_SAFE_INTEGER) {
		a = Math.pow(10, 4)
	}
	return parseInt(`${Date.now().toString(10).slice(-3)}${(a++).toString(10).slice(-4)}`, 10)
}

type Listener<T> = (value: T) => void
type Subscription = { unsubscribe: () => void }

const u = <T>(t: T[]): T[] => t.slice()

export class BM<T = unknown> {
	Z: Listener<T>[] = []
	H: Listener<T>[] = []

	get listenerCount(): number {
		return this.Z.length + this.H.length
	}
	emit(t: T) {
		if (this.Z.length) {
			const e = u(this.Z)
			for (let r = 0, n = e.length; r < n; r++) {
				e[r](t)
			}
		}
		if (this.H.length) {
			const e = u(this.H)
			for (let r = 0, n = e.length; r < n; r++) {
				e[r](t)
			}
			e.forEach((t) => this.unsubscribe(t))
		}
	}
	once(t: Listener<T>): Subscription {
		this.H.push(t)
		return {
			unsubscribe: () => this.unsubscribe(t)
		}
	}
	subscribe(t: Listener<T>): Subscription {
		this.Z.push(t)
		return {
			unsubscribe: () => this.unsubscribe(t)
		}
	}
	unsubscribe(t: Listener<T>) {
		const e = this.Z.indexOf(t)
		if (e >= 0) {
			this.Z.splice(e, 1)
		}
		const r = this.H.indexOf(t)
		if (r >= 0) {
			this.H.splice(r, 1)
		}
	}
	removeAllSubscriptions() {
		this.Z = []
		this.H = []
	}
}
