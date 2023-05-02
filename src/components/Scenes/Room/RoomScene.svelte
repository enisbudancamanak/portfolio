<script lang="ts">
  import { useFrame, T, useThrelte } from '@threlte/core'
  import {
    OrthographicCamera,
    sRGBEncoding,
    CineonToneMapping,
    PCFSoftShadowMap,
    Group,
    AmbientLight,
  } from 'three'

  import { onMount } from 'svelte'
  import { beforeNavigate } from '$app/navigation'
  import Room from './Room.svelte'
  import { Float, Text, OrbitControls, GLTF } from '@threlte/extras'
  import { gsap } from 'gsap'
  import { degToRad } from 'three/src/math/MathUtils'

  export let isMobile

  let groupRoom = new Group()
  let groupText = new Group()

  const { renderer, camera, scene, size } = useThrelte()

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
        gsap.to(groupText.position, {
          x: -20,
          ease: 'Power4.easeOut',
          duration: 3,
        })
        gsap.to(groupRoom.position, {
          x: 20,
          ease: 'Power4.easeOut',
          duration: 3,
        })
        // gsap.to([groupRoom.scale, groupText.scale], {
        //   x: 0,
        //   y: 0,
        //   z: 0,
        //   duration: 1,
        //   ease: 'Power4.in',
        // })
      }
  })

  $: if (renderer) {
    renderer.physicallyCorrectLights = true
    renderer.outputEncoding = sRGBEncoding
    renderer.toneMapping = CineonToneMapping
    renderer.toneMappingExposure = 1.75
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap
    renderer.setSize($size.width, $size.height)
  }
</script>

<T.OrthographicCamera
  left={-1.2}
  right={1.2}
  top={1.1}
  bottom={-1.1}
  makeDefault
  bind:ref={cameraVariable}
  position={[0, 0, 20]}
  zoom="100"
>
  <OrbitControls />
</T.OrthographicCamera>
<T.AmbientLight intensity={1} color="#c2c3d1" />
<T
  is={groupRoom}
  scale={isMobile ? 0.32 : 0.55}
  position={[isMobile ? 0 : 4, isMobile ? 0 : 0.5, 0]}
  rotation={[0.3, -0.8, 0]}
>
  <Float speed={2} rotationIntensity={0.25} rotationSpeed={2}>
    <T.DirectionalLight
      castShadow
      position={[5, 10, 5]}
      color="#ffffff"
      intensity="3"
    >
      <T.PerspectiveCamera
        attach="shadow.camera"
        near={0.1}
        far={100}
        bias={-0.0005}
      />
      <T.Vector2 attach="shadow.mapSize" args={[2048, 2048]} />
    </T.DirectionalLight>

    <Room />
  </Float>
</T>

<T is={groupText}>
  <T.Group
    scale={isMobile ? 1 : 2}
    position={[isMobile ? -2.15 : -8, isMobile ? 3 : 2, 0]}
  >
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
