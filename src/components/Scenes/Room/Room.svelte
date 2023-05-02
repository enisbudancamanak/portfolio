<script>
  import { onMount } from 'svelte'
  import { T } from '@threlte/core'
  import gsap from 'gsap'
  import { spring } from 'svelte/motion'
  import {
    MeshBasicMaterial,
    MeshPhysicalMaterial,
    NearestFilter,
    sRGBEncoding,
    TextureLoader,
    VideoTexture,
  } from 'three'
  import { gltfRoom, firstTimeLoad } from '../../../stores.js'
  import { beforeNavigate } from '$app/navigation'
  import { useGltf, useSuspense } from '@threlte/extras'

  let pointerX = 0
  let pointerY = 0
  let tekkenVideo
  let videoTextureTekken
  let pacManVideo
  let videoTexturePacMan
  let screenSaverVideo
  let videoTextureScreenSaver
  const offsetX = spring(pointerX * 0.03)
  $: offsetX.set(pointerX * 0.03)
  const offsetY = spring(pointerY * 0.03)
  $: offsetY.set(pointerY * 0.03)

  let animateTime = false
  beforeNavigate((navigation) => {
    if (navigation.from?.route.id != navigation.to?.route.id)
      if (!animateTime) {
        gsap.to(model.scene.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: 'Power4.out',
          delay: 0,
        })
        // gsap.to(model.scene.position, {
        //   x: 40,
        //   y: 10,
        //   duration: 2,
        //   ease: 'Power4.out',
        //   delay: 0,
        // })
      }
  })

  $: if (model) {
    gsap.to(model.scene.scale, {
      x: 0.88,
      y: 0.88,
      z: 0.88,
      duration: 1.2,
      ease: 'Power4.out',
    })

    // gsap.from(model.scene.position, {
    //   x: 20,
    //   ease: 'Power4.easeOut',
    //   duration: 2,
    // })
  }

  onMount(() => {
    window.addEventListener('mousemove', (e) => {
      pointerX = e.clientX * 0.001
      pointerY = e.clientY * 0.0005
    })
  })

  onMount(() => {
    tekkenVideo = document.getElementById('tekkenGameplay')
    tekkenVideo.play()
    videoTextureTekken = new VideoTexture(tekkenVideo)
    videoTextureTekken.flipY = false
    videoTextureTekken.minFilter = NearestFilter
    videoTextureTekken.magFilter = NearestFilter
    videoTextureTekken.generateMipmaps = false
    videoTextureTekken.encoding = sRGBEncoding
    pacManVideo = document.getElementById('pacManGameplay')
    pacManVideo.play()
    videoTexturePacMan = new VideoTexture(pacManVideo)
    videoTexturePacMan.flipY = false
    videoTexturePacMan.minFilter = NearestFilter
    videoTexturePacMan.magFilter = NearestFilter
    videoTexturePacMan.generateMipmaps = false
    videoTexturePacMan.encoding = sRGBEncoding
    screenSaverVideo = document.getElementById('screenSaverPurple')
    // screenSaverVideo.play()
    videoTextureScreenSaver = new VideoTexture(screenSaverVideo)
    videoTextureScreenSaver.flipY = false
    videoTextureScreenSaver.minFilter = NearestFilter
    videoTextureScreenSaver.magFilter = NearestFilter
    videoTextureScreenSaver.generateMipmaps = false
    videoTextureScreenSaver.encoding = sRGBEncoding
  })

  $: if (model && !$firstTimeLoad) {
    model.scene.traverse(function (child) {
      if (child.name == 'MachineScreen') {
        child.material = new MeshBasicMaterial({ map: videoTextureTekken })
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
    model.scene.traverse(function (child) {
      if (child.name == 'Machine') {
        return
      }

      if (child.name == 'MachineScreen') {
        child.material = new MeshBasicMaterial({ map: videoTextureTekken })
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

    model.scene.children.forEach((element, index) => {
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
          map: new TextureLoader().load(
            '/textures/blackwood/black-parquet.jpg'
          ),
          normalMap: new TextureLoader().load(
            '/textures/blackwood/NormalMap.png'
          ),
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
  }

  const suspend = useSuspense()

  const gltf = suspend(
    useGltf('/models/arcadeRoomDraco.glb', {
      useDraco: true,
    })
  )

  $: model = $gltf
</script>

{#if model}
  <T
    castShadow
    is={model.scene}
    rotation={[$offsetY, $offsetX, -$offsetY]}
    position={[0, -2.5, 0]}
  />
{/if}

<!-- {#if $gltfRoom}
  <T.Object3DInstance
    object={$gltfRoom.scene}
    position={{ x: 0, y: -2.5, z: 0 }}
    rotation={{ x: $offsetY, y: $offsetX, z: -$offsetY }}
    scale={{ x: 0, y: 0, z: 0 }}
    castShadow
  />
{/if} -->

<video
  id="tekkenGameplay"
  loop
  crossOrigin="anonymous"
  playsinline
  class="hidden"
  autoplay
  muted
>
  <source src="/videos/Tekken-Gameplay.mp4" type="video/mp4;" />
</video>

<video
  id="pacManGameplay"
  loop
  crossOrigin="anonymous"
  playsinline
  class="hidden"
  autoplay
  muted
>
  <source src="/videos/PacMan-Gameplay.mp4" type="video/mp4;" />
</video>

<video
  id="screenSaverPurple"
  loop
  crossOrigin="anonymous"
  playsinline
  class="hidden"
  autoplay
  muted
>
  <source src="/videos/ScreenSaver-Galaxy.mp4" type="video/mp4;" />
</video>
