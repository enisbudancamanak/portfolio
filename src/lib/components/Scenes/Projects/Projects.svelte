<script lang="ts">
	import { onMount } from 'svelte'
	import { beforeNavigate, goto } from '$app/navigation'

	// Threlte
	import { T, useFrame, useThrelte } from '@threlte/core'
	import { Float, Text, interactivity } from '@threlte/extras'

	// Three.js
	import {
		ShaderMaterial,
		DoubleSide,
		Vector4,
		PlaneGeometry,
		Group,
		Vector2,
		TextureLoader,
		Color,
		Mesh as MeshThree,
		Camera,
		Scene,
	} from 'three'

	// Utils
	import gsap from 'gsap'
	import VirtualScroll from 'virtual-scroll'
	import { dragControls, mouseDown } from '$lib/dragControls'

	// Stores
	import {
		assetsProjects as assets,
		positionProjects,
	} from '$lib/stores/stores'
	import isMobile from '$lib/stores/mobile.store'

	// Shaders
	import fragment from '$lib/shaders/fragmentText.glsl'
	import vertexText from '$lib/shaders/vertexText.glsl'
	import vertexPicture from '$lib/shaders/vertexPicture.glsl'
	import fragmentPicture from '$lib/shaders/fragmentPicture.glsl'

	interactivity()
	export const { scene, renderer, size, camera } = useThrelte()

	let animateTime = false
	beforeNavigate((navigation: any) => {
		if (navigation.from?.route.id != navigation.to?.route.id)
			if (!animateTime) {
				// composer?.dispose()
				animateTime = true
				navigation.cancel()

				outgoingAnimation(navigation.to.route.id)
			}
	})

	let projectTitles = [
		'SIN OF SLOTH',
		'ANICAFE',
		'INTERACTIVE GRAPHICS',
		'SLIME HERO',
		'ARTHLETE',
		'3D CAR SHOWCASE',
		'SHIORILIST',
		'WAGENFELD REDESIGN',
		'TOYROOM GAME',
		'SIN OF SLOTH',
		'ANICAFE',
		'INTERACTIVE GRAPHICS',
		'SLIME HERO',
		'ARTHLETE',
		'3D CAR SHOWCASE',
		'SHIORILIST',
		'WAGENFELD REDESIGN',
		'TOYROOM GAME',
		'SIN OF SLOTH',
		'ANICAFE',
		'INTERACTIVE GRAPHICS',
		'SLIME HERO',
		'ARTHLETE',
		'3D CAR SHOWCASE',
		'SHIORILIST',
		'WAGENFELD REDESIGN',
		'TOYROOM GAME',
		'SIN OF SLOTH',
		'ANICAFE',
		'INTERACTIVE GRAPHICS',
		'SLIME HERO',
		'ARTHLETE',
		'3D CAR SHOWCASE',
		'SHIORILIST',
		'WAGENFELD REDESIGN',
		'TOYROOM GAME',
	]

	let paths = [
		'pictures/projects/sinOfSloth.png',
		'pictures/projects/AniCafe.png',
		'pictures/projects/interactiveGraphics.png',
		'pictures/projects/slimeHero.png',
		'pictures/projects/ARthlete.png',
		'pictures/projects/carShowcase.png',
		'pictures/projects/shioriList.png',
		'pictures/projects/wagenfeldRedesign.png',
		'pictures/projects/toyroom.png',
		'pictures/projects/sinOfSloth.png',
		'pictures/projects/AniCafe.png',
		'pictures/projects/interactiveGraphics.png',
		'pictures/projects/slimeHero.png',
		'pictures/projects/ARthlete.png',
		'pictures/projects/carShowcase.png',
		'pictures/projects/shioriList.png',
		'pictures/projects/wagenfeldRedesign.png',
		'pictures/projects/toyroom.png',
		'pictures/projects/sinOfSloth.png',
		'pictures/projects/AniCafe.png',
		'pictures/projects/interactiveGraphics.png',
		'pictures/projects/slimeHero.png',
		'pictures/projects/ARthlete.png',
		'pictures/projects/carShowcase.png',
		'pictures/projects/shioriList.png',
		'pictures/projects/wagenfeldRedesign.png',
		'pictures/projects/toyroom.png',
		'pictures/projects/sinOfSloth.png',
		'pictures/projects/AniCafe.png',
		'pictures/projects/interactiveGraphics.png',
		'pictures/projects/slimeHero.png',
		'pictures/projects/ARthlete.png',
		'pictures/projects/carShowcase.png',
		'pictures/projects/shioriList.png',
		'pictures/projects/wagenfeldRedesign.png',
		'pictures/projects/toyroom.png',
	]

	let position: any = $positionProjects
	let speed: number = 0
	let targetSpeed: number = 0
	let transitionOn: boolean = false
	let entryAnimationCheck: boolean = false
	let planeMaterial: ShaderMaterial
	let geometryPlane: PlaneGeometry
	let timelineIntro: gsap.core.Timeline
	let textures: any = []
	let speedLerp: number = 0

	export const scene1: Scene = scene
	export const camera1: Camera = $camera
	export const referenceGroup: Group = new Group()
	export const pictureMesh: MeshThree = new MeshThree()

	function dragAction(deltaY: number) {
		speed += deltaY / 2
	}

	onMount(() => {
		dragControls(renderer?.domElement as HTMLCanvasElement, dragAction)

		const scroller: any = new VirtualScroll()
		scroller.on((event: any) => {
			speed = event.deltaY * ($isMobile ? 7 : 1)
			speed = speed > 150 ? 150 : speed < -150 ? -150 : speed
		})

		createPlane()
		entryAnimation()
	})

	useFrame(() => {
		if (entryAnimationCheck && !transitionOn) {
			targetSpeed += (speed - targetSpeed) * 0.15
			position += speed / 1500
			speed *= 0.89

			let rounded = Math.round(position)
			let diff = rounded - position
			if (!mouseDown)
				position +=
					Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.03

			if (!transitionOn) {
				referenceGroup.children[0].children.forEach((text: any, i) => {
					text._baseMaterial.uniforms.uSpeed.value = targetSpeed
				})

				infiniteTexts()
			}
		}
		updatePlaneTexture()
	})

	function entryAnimation() {
		let margin = 0.16
		let wholeHeight = projectTitles.length * margin

		let calcPos = position * -0.16
		referenceGroup.children[0].children.forEach((text, i) => {
			text.position.y =
				((margin * i - 7 + calcPos + 42069 * wholeHeight) %
					wholeHeight) -
				wholeHeight / 2
		})

		timelineIntro = gsap.timeline().add('start')
		referenceGroup.children[0].children.forEach((text: any, i) => {
			let index = Math.round(position + 100000000) % textures.length

			if (i != index) {
				if (text.position.y > 0.5) {
					timelineIntro.from(
						text._baseMaterial.uniforms.uSpeed,
						{
							value: '-2000',
							duration: 2,
							ease: 'power3.out',
						},
						'start'
					)
					timelineIntro.from(
						text.position,
						{
							y: '+=1.8',
							duration: 2,
							ease: 'power4.out',
							delay: 0.3,
						},
						'start'
					)
				}
				if (text.position.y < 0.5) {
					timelineIntro.from(
						text._baseMaterial.uniforms.uSpeed,
						{
							value: '2000',
							duration: 2,
							ease: 'power3.out',
							onComplete: () => {
								entryAnimationCheck = true
							},
						},
						'start'
					)
					timelineIntro.from(
						text.position,
						{
							y: '-=1.8',
							duration: 2,
							ease: 'power4.out',
							delay: 0.3,
						},
						'start'
					)
				}
			} else {
				timelineIntro.from(
					text._baseMaterial.uniforms.opacity,
					{
						value: '0',
						duration: 0.5,
						delay: 0.5,
						ease: 'power2.in',
					},
					'start'
				)
				timelineIntro.from(
					pictureMesh.rotation,
					{
						y: -1 * Math.PI,
						duration: 1.2,
						delay: 0.1,
						ease: 'power2.out',
					},
					'start'
				)
				timelineIntro.from(
					planeMaterial.uniforms.opacity,
					{
						value: '0',
						duration: 1.1,
						delay: 0.2,
						ease: 'power2.out',
					},
					'start'
				)
				timelineIntro.from(
					pictureMesh.scale,
					{
						x: 0,
						y: 0,
						z: 0,
						duration: 1.2,
						delay: 0.1,
						ease: 'power2.out',
					},
					'start'
				)
			}
		})
	}

	function infiniteTexts() {
		let margin = 0.16
		let wholeHeight = projectTitles.length * margin

		let calcPos = position * -0.16
		referenceGroup.children[0].children.forEach((text, i) => {
			text.position.y =
				((margin * i - 7 + calcPos + 42069 * wholeHeight) %
					wholeHeight) -
				wholeHeight / 2
		})
	}

	function outgoingAnimation(path: string) {
		transitionOn = true

		referenceGroup.children[0].children.forEach((text: any, i) => {
			let index = Math.round(position + 100000000) % textures.length
			positionProjects.set(position)

			text._baseMaterial.uniforms.uSpeed.value = 0
			if (i != index) {
				if (text.position.y > 0.5) {
					text.opacity = 0
					gsap.to(text.position, {
						y: '+=0.05',
						duration: 0.4,
						ease: 'power2.out',
						onUpdate: () => {
							text._baseMaterial.uniforms.uSpeed.value -= -0.3
						},
						onComplete: () => {
							gsap.to(text.position, {
								y: '+=2.5',
								duration: 1.5,
								ease: 'power4.out',
								onUpdate: () => {
									text._baseMaterial.uniforms.uSpeed.value -=
										-1
								},
							})
						},
					})
				}
				if (text.position.y < 0.5) {
					gsap.to(text.position, {
						y: '-=0.05',
						duration: 0.4,
						ease: 'power2.out',
						onUpdate: () => {
							text._baseMaterial.uniforms.uSpeed.value += -0.3
						},
						onComplete: () => {
							gsap.to(text.position, {
								y: '-=2.5',
								duration: 1.5,
								ease: 'power4.out',
								onUpdate: () => {
									text._baseMaterial.uniforms.uSpeed.value +=
										-1
								},
							})
						},
					})
				}
			} else {
				planeMaterial.uniforms.uOffset.value = 0
				gsap.to(text._baseMaterial.uniforms.opacity, {
					value: '0',
					duration: 0.3,
					delay: 0.5,
					ease: 'power2.out',
					onComplete: () => {
						if (!path) gotoProject()
						else goto(path)
					},
				})

				gsap.to(planeMaterial.uniforms.opacity, {
					value: '0',
					duration: 0.4,
					delay: 0.5,
					ease: 'power2.out',
				})
				gsap.to(pictureMesh.scale, {
					x: 0,
					y: 0,
					z: 0,
					duration: 0.8,
					delay: 0.8,
					ease: 'power2.out',
				})
				gsap.to(pictureMesh.rotation, {
					y: -1 * Math.PI,
					duration: 0.7,
					delay: 0.5,
					ease: 'power2.out',
				})
			}
		})
	}

	function gotoProject() {
		let index = Math.round(position + 100000000) % textures.length
		goto(
			'/projects/' +
				paths[index]
					.split('/')[2]
					.replace('.png', '')
					.replace('.jpg', '')
		)
	}

	function createPlane() {
		textures = paths
		textures = textures.map((t) => {
			return $assets['/' + t.replace('http://localhost:5173', '')]
		})
		planeMaterial = new ShaderMaterial({
			extensions: {
				derivatives: '#extension GL_OES_standard_derivatives : enable',
			},
			side: DoubleSide,
			uniforms: {
				time: { value: 0 },
				uTexture: { value: textures[0] },
				displacement: {
					value: new TextureLoader().load(
						'textures/displacementImage.png'
					),
				},
				opacity: {
					value: 0.3,
				},
				uOffset: { value: new Vector2(0.0, 0.0) },
				resolution: { value: new Vector4() },
			},
			vertexShader: vertexPicture,
			fragmentShader: fragmentPicture,
		})

		geometryPlane = new PlaneGeometry(1.77 / 2, 1 / 2, 30, 30).translate(
			0,
			0,
			1
		)
		let pos = geometryPlane.attributes.position.array
		let newpos = []
		let r = 1

		for (let i = 0; i < pos.length; i += 3) {
			let x = pos[i]
			let y = pos[i + 1]
			let z = pos[i + 2]

			let xz = new Vector2(x, z).normalize().multiplyScalar(r)

			newpos.push(xz.x, y, xz.y)
		}
	}

	function lerp(start: number, end: number, amt: number) {
		return (1 - amt) * start + amt * end
	}

	function updatePlaneTexture() {
		if (textures) {
			let index = Math.round(position + 100000000) % textures.length

			planeMaterial.uniforms.uTexture.value = textures[index]

			speedLerp = lerp(speedLerp, targetSpeed, 0.1)
			planeMaterial.uniforms.uOffset.value =
				(targetSpeed - speedLerp) * 0.0006

			referenceGroup.children[0].children.forEach((text: any, i) => {
				if (i != index) {
					text.material.depthTest = true
					text.material.uniforms.uColor.value = new Color('#cc00cc')
				} else {
					text.material.depthTest = false
					text.material.uniforms.uColor.value = new Color('#ffffff')
				}
			})
		}
	}

	function textHover(event: any) {
		document.body.style.cursor = 'pointer'
	}

	function unhoverText(event: any) {
		document.body.style.cursor = 'default'
	}
</script>

<div>
	<T.Layers layers={'all'}>
		<T.Group>
			<T is={referenceGroup}>
				<T.Group position={[-1.35, -0.6, 0]} scale={1.9}>
					{#each projectTitles as project, index}
						<Text
							text={project}
							viewportAware={true}
							position={[0, index * 0.16, 0]}
							font="/fonts/bebas-neue-v9-latin-regular.woff"
							fontSize={0.18}
							material={new ShaderMaterial({
								extensions: {
									derivatives:
										'#extension GL_OES_standard_derivatives : enable',
								},
								side: DoubleSide,
								uniforms: {
									time: { value: 0 },
									uSpeed: { value: 0 },
									uColor: { value: new Color('#cc00cc') },
									resolution: { value: new Vector4() },
									opacity: { value: 1 },
								},
								vertexShader: vertexText,
								fragmentShader: fragment,
							})} />
					{/each}
				</T.Group>
			</T>
		</T.Group>

		<Float
			speed={1.5}
			rotationIntensity={0.3}
			rotationSpeed={1.5}
			floatingRange={[0.05, 0.01]}>
			<T is={pictureMesh}>
				<T.Mesh
					geometry={geometryPlane}
					material={planeMaterial}
					scale={1.5}
					interactive
					on:pointerenter={textHover}
					on:pointerleave={unhoverText}
					on:pointerup={outgoingAnimation} />
			</T>
		</Float>
	</T.Layers>
</div>

<style>
	div {
		height: 100%;
		width: 100%;
	}

	body {
		overscroll-behavior: none;
	}
</style>
