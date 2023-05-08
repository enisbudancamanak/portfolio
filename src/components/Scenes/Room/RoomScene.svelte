<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { OrthographicCamera, CineonToneMapping, Group } from 'three'

  import { onMount } from 'svelte'
  import { beforeNavigate, goto } from '$app/navigation'
  import Room from './Room.svelte'
  import { Float, Text } from '@threlte/extras'
  import { gsap } from 'gsap'
  import Postprocessing from '../../Postprocessing.svelte'

  export let isMobile

  let groupRoom = new Group()
  let groupText = new Group()

  const { renderer, size } = useThrelte()

  let frustrum = 10
  let aspect = $size.width / $size.height
  let cameraVariable: OrthographicCamera

  onMount(() => {
    window.addEventListener('resize', () => {
      aspect = $size.width / $size.height
      cameraVariable.left = (-aspect * frustrum) / 2
      cameraVariable.right = (aspect * frustrum) / 2
      cameraVariable.top = frustrum / 2
      cameraVariable.bottom = -frustrum / 2
      cameraVariable.updateProjectionMatrix()
    })
    gsap.from(groupText.position, {
      x: -20,
      ease: 'Power4.easeOut',
      duration: 2,
    })
  })
  let animateTime = false
  beforeNavigate((navigation) => {
    if (navigation.from?.route.id != navigation.to?.route.id)
      if (!animateTime) {
        // if (isMobile) {
        // } else if (!isMobile) {
        let timeline = gsap.timeline().add('start')
        timeline.to(
          groupText.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: 'Power4.easeOut',
            duration: 0.4,
          },
          'start'
        )
        timeline.to(
          groupRoom.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: 'Power4.easeOut',
            duration: 0.4,
          },
          'start'
        )
        timeline.to(
          groupText.position,
          {
            x: -20,
            ease: 'Power4.easeOut',
            duration: 0.8,
          },
          'start'
        )
        timeline.to(
          groupRoom.position,
          {
            x: 20,
            ease: 'Power4.easeOut',
            duration: 0.8,
            onComplete: () => {
              goto(navigation.to.route.id)
            },
          },
          'start'
        )
      }
  })

  $: if (renderer) {
    if (!isMobile) renderer.toneMapping = CineonToneMapping
    // renderer.physicallyCorrectLights = true
    // renderer.outputEncoding = sRGBEncoding
    // renderer.toneMappingExposure = 1.75
    // renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = PCFSoftShadowMap
    // renderer.setSize($size.width, $size.height)
  }
</script>

{#if !isMobile}
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
  zoom="100"
/>

<T.AmbientLight intensity={1} color="#c2c3d1" />
<T
  is={groupRoom}
  scale={isMobile ? 0.26 : 0.55}
  position={[isMobile ? 0 : 4, isMobile ? 0 : 0.5, 0]}
  rotation={[0.3, -0.8, 0]}
>
  <Float
    speed={!isMobile ? 2 : 0}
    rotationIntensity={!isMobile ? 0.25 : 0}
    rotationSpeed={!isMobile ? 2 : 0}
  >
    <T.DirectionalLight
      castShadow
      position={[5, 10, 5]}
      color="#ffffff"
      intensity="3"
    >
      {#if !isMobile}
        <T.PerspectiveCamera
          attach="shadow.camera"
          near={0.1}
          far={100}
          bias={-0.0005}
        />
        <T.Vector2 attach="shadow.mapSize" args={[2048, 2048]} />
      {/if}
    </T.DirectionalLight>

    <Room {isMobile} />
  </Float>
  <T.DirectionalLight
    castShadow
    position={[5, 10, 5]}
    color="#ffffff"
    intensity="3"
  />
</T>

<T is={groupText} scale={isMobile ? 0.9 : 2}>
  <T.Group position={[isMobile ? -2.15 : -4, isMobile ? 2.7 : 1.1, 0]}>
    <Text
      text={'FRONT END DEVELOPER WHO LOVES TO BUILD BEAUTIFUL WEB EXPERIENCES'}
      color="#ffffff"
      font="fonts/bebas-neue-v9-latin-regular.woff"
      fontSize={0.5}
      maxWidth={4.3}
      lineHeight={0.85}
      letterSpacing={0.01}
      textAlign={isMobile ? 'center' : 'left'}
    />
  </T.Group>
</T>
