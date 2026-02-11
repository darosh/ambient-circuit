<!--"Glass Floor" WIP-->
<script>
	import { T, useScene } from '@threlte/core'

	import { MeshPhongNodeMaterial, DoubleSide } from 'three/webgpu'
	import { reflector } from 'three/tsl'

	const { scene: sa } = useScene()
	const reflection = reflector({ resolutionScale: 1 })
	reflection.target.rotateX(-Math.PI / 2)
	reflection.target.position.setY(0)
	sa.add(reflection.target)
	const floorMaterial = new MeshPhongNodeMaterial({
		transparent: true,
		side: DoubleSide
	})
	floorMaterial.colorNode = reflection.mul(0.1)
	floorMaterial.emissiveNode = reflection.mul(0.1)
</script>

<T.Mesh material={floorMaterial} position={[0, 0, 0]} receiveShadow={true}>
	<T.BoxGeometry args={[3000, 0.01, 3000]} />
</T.Mesh>
