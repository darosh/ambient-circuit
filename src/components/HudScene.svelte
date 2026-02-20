<script lang="ts">
	import { T } from '@threlte/core'
	import { useViewport } from '@threlte/extras'

	const viewport = useViewport()
</script>

<T.OrthographicCamera makeDefault zoom={80} position={[0, 0, 10]} />

<T.Mesh position={[-$viewport.width / 2 + 1, $viewport.height / 2 - 1, 0]}>
	<T.SphereGeometry args={[1]} />
	<T.MeshBasicMaterial color="white" />
</T.Mesh>
