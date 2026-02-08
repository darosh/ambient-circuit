<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import type { Marble } from '../lib/marble'
	import { MeshStandardMaterial } from 'three'
	import { makeMarbleMaterial } from '../lib/config'
	import { easeOutQuart } from '../lib/easing'

	type Props = {
		marble: Marble
		color: string
		wireframe?: boolean
		fxMarbles?: boolean
	}

	let { marble, color, wireframe = false, fxMarbles = true }: Props = $props()

	const fx = $derived(makeMarbleMaterial(color))
	const plainMaterial = $derived(new MeshStandardMaterial({ color }))

	$effect(() => {
		fx.mat.wireframe = wireframe
		plainMaterial.wireframe = wireframe
	})

	const IMPACT_DURATION = 0.3
	let impactTime = $state(0)

	useTask((delta) => {
		if (marble.signal.intensity > 0) {
			impactTime = IMPACT_DURATION
			marble.signal.intensity = 0
		}

		if (impactTime > 0) {
			impactTime = Math.max(0, impactTime - delta)
			fx.impactIntensity.value = easeOutQuart(impactTime / IMPACT_DURATION)
		}
	})
</script>

<T.Mesh
	position={[marble.position.x, marble.position.y, marble.position.z]}
	material={fxMarbles ? fx.mat : plainMaterial}
>
	<T.SphereGeometry args={[0.12, 16, 16]} />
</T.Mesh>
