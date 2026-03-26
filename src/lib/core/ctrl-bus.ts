// CC/CV bus — scene-level dispatcher connecting ctrl signals to audio params

export type CcMapEntry = {
	param: string
	range: [number, number]
}

export type CcSubscriber = {
	/** Called when a CC value changes; value already mapped to range */
	onCC(param: string, value: number): void
}

type Subscription = {
	entry: CcMapEntry
	subscriber: CcSubscriber
}

/**
 * Scene-level CC dispatcher.
 * Instruments emit normalized (0-1) CC values.
 * Chains subscribe by channel:cc key and receive range-mapped values.
 */
export type CtrlBus = {
	/** Emit a normalized (0-1) CC value */
	emit(channel: number, cc: number, value: number): void
	/** Subscribe to a channel:cc pair */
	subscribe(channel: number, cc: number, entry: CcMapEntry, subscriber: CcSubscriber): void
	/** Remove all subscriptions (cleanup on scene change) */
	clear(): void
}

export function createCtrlBus(): CtrlBus {
	// key: "channel:cc"
	const subs = new Map<string, Subscription[]>()

	function key(channel: number, cc: number): string {
		return channel + ':' + cc
	}

	return {
		emit(channel: number, cc: number, value: number) {
			const list = subs.get(key(channel, cc))
			if (!list) return
			for (const s of list) {
				const [min, max] = s.entry.range
				s.subscriber.onCC(s.entry.param, min + value * (max - min))
			}
		},

		subscribe(channel: number, cc: number, entry: CcMapEntry, subscriber: CcSubscriber) {
			const k = key(channel, cc)
			let list = subs.get(k)
			if (!list) {
				list = []
				subs.set(k, list)
			}
			list.push({ entry, subscriber })
		},

		clear() {
			subs.clear()
		}
	}
}
