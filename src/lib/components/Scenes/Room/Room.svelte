<script lang="ts">
	import { onMount } from 'svelte'
	import { spring } from 'svelte/motion'

	// Threlte
	import { T } from '@threlte/core'
	import { interactivity, useInteractivity } from '@threlte/extras'

	// THREE.js
	import {
		MeshBasicMaterial,
		MeshPhysicalMaterial,
		sRGBEncoding,
		VideoTexture,
	} from 'three'

	// Utils
	import gsap from 'gsap'

	// Stores
	import {
		gltfRoom,
		firstTimeLoad,
		assetsTextures as assets,
	} from '$lib/stores/stores'

	interactivity()
	const { pointer } = useInteractivity()
	import isMobile from '$lib/stores/mobile.store'

	let pointerX: number = 0
	let pointerY: number = 0
	let tekkenVideo: HTMLVideoElement
	let videoTextureTekken: VideoTexture
	let pacManVideo: HTMLVideoElement
	let videoTexturePacMan: VideoTexture
	let screenSaverVideo: HTMLVideoElement
	let videoTextureScreenSaver: VideoTexture
	$: model = $gltfRoom as any

	let pointerSpring = spring(
		{ x: $pointer.x, y: $pointer.y },
		{
			stiffness: 0.1,
		}
	)
	$: pointerSpring.set({ x: $pointer.x * 0.04, y: $pointer.y * 0.04 })

	$: if (model) {
		gsap.to(model.scene.scale, {
			x: 0.66,
			y: 0.66,
			z: 0.66,
			duration: 1.2,
			ease: 'Power4.out',
			delay: 0.3,
		})
	}

	onMount(() => {
		if (!$isMobile)
			window.addEventListener('mousemove', (e) => {
				pointerX = e.clientX * 0.001
				pointerY = e.clientY * 0.0005
			})
	})

	onMount(() => {
		if (!$isMobile) {
			// Tekken-Gameplay
			tekkenVideo = document.getElementById(
				'tekkenGameplay'
			) as HTMLVideoElement
			// tekkenVideo.play()
			videoTextureTekken = new VideoTexture(tekkenVideo)
			videoTextureTekken.flipY = false
			videoTextureTekken.generateMipmaps = false
			videoTextureTekken.encoding = sRGBEncoding
			// PacMan-Gameplay
			pacManVideo = document.getElementById(
				'pacManGameplay'
			) as HTMLVideoElement
			// pacManVideo.play()
			videoTexturePacMan = new VideoTexture(pacManVideo)
			videoTexturePacMan.flipY = false
			videoTexturePacMan.generateMipmaps = false
			videoTexturePacMan.encoding = sRGBEncoding
			// Galaxy ScreenSaver
			screenSaverVideo = document.getElementById(
				'screenSaverPurple'
			) as HTMLVideoElement
			// screenSaverVideo.play()
			videoTextureScreenSaver = new VideoTexture(screenSaverVideo)
			videoTextureScreenSaver.flipY = false
			videoTextureScreenSaver.generateMipmaps = false
			videoTextureScreenSaver.encoding = sRGBEncoding
		}
	})

	$: if (model && !$firstTimeLoad) {
		if (!$isMobile)
			model.scene.traverse(function (child: any) {
				if (child.name == 'MachineScreen') {
					child.material = new MeshBasicMaterial({
						map: videoTextureTekken,
					})
				} else if (child.name == 'Machine2Screen') {
					child.material = new MeshBasicMaterial({
						color: '#f2ddf8',
						map: videoTexturePacMan,
					})
				} else if (child.name == 'Screen' || child.name == 'Screen2') {
					// $projectsRenderer.renderTarget1.texture.flipX = true
					child.material = new MeshBasicMaterial({
						color: '#f2ddf8',
						map: videoTextureScreenSaver,
						// map: $projectsRenderer.renderTarget1.texture,
					})
				} else if (child.name == 'ScreenLaptop') {
					child.material = new MeshBasicMaterial({
						color: '#f2ddf8',
						map: videoTextureScreenSaver,
					})
				}
			})
	}

	$: if (model && $firstTimeLoad) {
		firstTimeLoad.set(false)
		if (!$isMobile) {
			model.scene.traverse(function (child: any) {
				if (child.name == 'Machine') {
					return
				}

				if (!$isMobile) {
					if (child.name == 'MachineScreen') {
						child.material = new MeshBasicMaterial({
							map: videoTextureTekken,
						})
					} else if (child.name == 'Machine2Screen') {
						child.material = new MeshBasicMaterial({
							color: '#f2ddf8',
							map: videoTexturePacMan,
						})
					} else if (
						child.name == 'Screen' ||
						child.name == 'Screen2'
					) {
						// $projectsRenderer.renderTarget1.texture.flipX = true
						child.material = new MeshBasicMaterial({
							color: '#f2ddf8',
							map: videoTextureScreenSaver,
							// map: $projectsRenderer.renderTarget1.texture,
						})
					} else if (child.name == 'ScreenLaptop') {
						child.material = new MeshBasicMaterial({
							color: '#f2ddf8',
							map: videoTextureScreenSaver,
						})
					}
				} else {
					if (
						child.name == 'Screen' ||
						child.name == 'Screen2' ||
						child.name == 'ScreenLaptop'
					) {
						// $projectsRenderer.renderTarget1.texture.flipX = true
						child.material = new MeshBasicMaterial({
							color: '#000000',
						})
					}
				}

				if (
					child.name == 'Screen' ||
					child.name == 'Monitor' ||
					child.name == 'Screen2' ||
					child.name == 'Monitor2' ||
					child.name == 'MonitorStand' ||
					child.name == 'MonitorStand2'
				)
					return

				// @ts-ignore
				if (child.isMesh) {
					child.receiveShadow = true
					child.castShadow = true
				}
			})

			model.scene.children.forEach((element: any, index: number) => {
				if (
					element.name == 'Room' ||
					element.name == 'Machine' ||
					element.name == 'Machine2' ||
					element.name == 'Table' ||
					element.name == 'Lightstrip' ||
					element.name == 'MachineScreen' ||
					element.name == 'Machine2Screen' ||
					element.name == 'Monitor' ||
					element.name == 'Monitor2' ||
					element.name == 'Screen' ||
					element.name == 'Screen2'
				)
					return

				if (element.name == 'Floor') {
					element.material = new MeshPhysicalMaterial({
						color: '#000000', //82007F
						map: $assets['/textures/blackwood/black-parquet.jpg'],
						normalMap: $assets['/textures/blackwood/NormalMap.png'],
					})
					return
				}

				let x = element.scale.x
				let y = element.scale.y
				let z = element.scale.z
				element.scale.set(0, 0, 0)

				setTimeout(function timer() {
					if (element.name == 'OfficeChair') {
						gsap.from(element.rotation, {
							y: -10,
							duration: 4,
							ease: 'back.out(2.2)',
							onComplete: () => {
								gsap.to(element.rotation, {
									y: 5.35,
									duration: 4,
									ease: 'back.out(2.2)',
									delay: 5,
									repeat: -1,
									repeatDelay: 10,
								})
							},
						})
					}
					if (element.name == 'Machine1StickLeft') {
						gsap.to(element.rotation, {
							y: 200,
							duration: 12,
							// ease: 'slow(0.7, 0.1, true)',
							repeat: -1,
							ease: 'steps(38)',
						})
					}
					if (element.name == 'Machine1StickRight') {
						gsap.to(element.rotation, {
							y: 200,
							duration: 12,
							// ease: 'slow(0.7, 0.1, true)',
							repeat: -1,
							ease: 'steps(45)',
						})
					}
					gsap.to(element.scale, {
						x: x,
						y: y,
						z: z,
						duration: 0.5,
						ease: 'back.out(2.2)',
					})
				}, index * 100)
			})
		} else {
			model.scene.children.forEach((element: any, index: any) => {
				if (
					element.name == 'Room' ||
					element.name == 'Machine' ||
					element.name == 'Machine2' ||
					element.name == 'Table' ||
					element.name == 'Lightstrip' ||
					element.name == 'MachineScreen' ||
					element.name == 'Machine2Screen' ||
					element.name == 'Monitor' ||
					element.name == 'Monitor2' ||
					element.name == 'Screen' ||
					element.name == 'Screen2'
				)
					return

				if (element.name == 'Floor') {
					element.material = new MeshPhysicalMaterial({
						color: '#000000', //82007F
						map: $assets['/textures/blackwood/black-parquet.jpg'],
						normalMap: $assets['/textures/blackwood/NormalMap.png'],
					})
					return
				}
			})
		}
	} else {
	}
</script>

{#if model}
	<T
		castShadow
		is={model.scene}
		rotation={[-$pointerSpring.y, $pointerSpring.x, $pointerSpring.y]}
		position={[0, -2, 0]}
		scale={0} />
{/if}

<!-- {#if !$isMobile} -->
<video
	id="tekkenGameplay"
	loop
	crossOrigin="anonymous"
	playsinline
	class="hidden"
	autoplay
	muted>
	<source src="/videos/Tekken-Gameplay.mp4" type="video/mp4;" />
</video>

<video
	id="pacManGameplay"
	loop
	crossOrigin="anonymous"
	playsinline
	class="hidden"
	autoplay
	muted>
	<source src="/videos/PacMan-Gameplay.mp4" type="video/mp4;" />
</video>

<video
	id="screenSaverPurple"
	loop
	crossOrigin="anonymous"
	playsinline
	class="hidden"
	autoplay
	muted>
	<source src="/videos/ScreenSaver-Galaxy.mp4" type="video/mp4;" />
</video>
<!-- {/if} -->
