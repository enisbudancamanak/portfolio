<script lang="ts">
	import { onMount } from 'svelte'
	import { beforeNavigate, goto } from '$app/navigation'
	import type { BeforeNavigate } from '@sveltejs/kit'

	// Threlte
	import { T, useThrelte } from '@threlte/core'
	import { Float, Text } from '@threlte/extras'

	// Three
	import {
		OrthographicCamera,
		sRGBEncoding,
		CineonToneMapping,
		PCFSoftShadowMap,
		Group,
	} from 'three'

	// Components
	import Room from './Room.svelte'
	import Postprocessing from '$lib/components/PostProcessing.svelte'

	// Utils
	import { gsap } from 'gsap'
	import isMobile from '$lib/stores/mobile.store'

	let groupRoom: Group = new Group()
	let groupText: Group = new Group()

	const { renderer, size } = useThrelte()

	let cameraVariable: OrthographicCamera

	onMount(() => {
		gsap.from(groupText.position, {
			x: -20,
			ease: 'Power4.easeOut',
			duration: 2,
		})
	})

	// let animateTime = false
	// beforeNavigate((navigation: BeforeNavigate) => {
	// 	if (navigation.from?.route.id != navigation.to?.route.id)
	// 		if (!animateTime) {
	// 			// if ($isMobile) {
	// 			// } else if (!$isMobile) {
	// 			let timeline = gsap.timeline().add('start')
	// 			timeline.to(
	// 				groupRoom.scale,
	// 				{
	// 					x: 0,
	// 					y: 0,
	// 					z: 0,
	// 					ease: 'Power4.easeOut',
	// 					duration: 0.3,
	// 				},
	// 				'start'
	// 			)
	// 		}
	// })

	$: if (renderer) {
		renderer.outputEncoding = sRGBEncoding
		renderer.setSize($size.width, $size.height)

		if (!$isMobile) {
			// renderer.physicallyCorrectLights = true
			renderer.toneMapping = CineonToneMapping
			// renderer.toneMappingExposure = 1.75
			// renderer.shadowMap.enabled = true
			renderer.shadowMap.type = PCFSoftShadowMap
		}
	}
</script>

{#if !$isMobile}
	<Postprocessing />
{/if}

<T.OrthographicCamera
	left={-1.2}
	right={1.2}
	top={1.1}
	bottom={-1.1}
	makeDefault
	bind:ref={cameraVariable}
	position={[0, 0, 20]}
	zoom={Math.max(
		50,
		2 *
			Math.atan((1 * ($size.width / $size.height)) / (0.75 * 2)) *
			(180 / Math.PI)
	)} />

<T.AmbientLight intensity={1} color="#5c5c58" />
<T
	is={groupRoom}
	scale={0.55}
	position={[$isMobile ? 0 : 0, $isMobile ? 0 : 0.5, 0]}
	rotation={[0.3, -0.8, 0]}>
	<Float
		rotationIntensity={0.2}
		rotationSpeed={5}
		floatingRange={[-0.02, 0.02]}
		floatIntensity={2}
		speed={4}>
		<T.DirectionalLight
			castShadow
			position={[5, 10, 5]}
			color="#ffffff"
			intensity="3">
			<T.PerspectiveCamera
				attach="shadow.camera"
				near={0.1}
				far={100}
				bias={-0.0005} />
			<T.Vector2 attach="shadow.mapSize" args={[2048, 2048]} />
		</T.DirectionalLight>

		<Room />
	</Float>
</T>

<!-- <T is={groupText} scale={$isMobile ? 0.9 : 2}>
	<T.Group position={[$isMobile ? -2.15 : -4, $isMobile ? 2.7 : 1.1, 0]}>
		<Text
			text={'FULL-STACK-DEVELOPER WHO LOVES TO BUILD BEAUTIFUL WEB EXPERIENCES'}
			color="#ffffff"
			font="fonts/bebas-neue-v9-latin-regular.woff"
			fontSize={0.5}
			maxWidth={4.3}
			lineHeight={0.85}
			letterSpacing={0.01}
			textAlign={$isMobile ? 'center' : 'left'} />
	</T.Group>
</T> -->
