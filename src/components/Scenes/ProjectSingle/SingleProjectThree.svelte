<script>
  import { useFrame, useThrelte, T, useLoader } from '@threlte/core'
  import {
    ShaderMaterial,
    DoubleSide,
    Vector4,
    PlaneGeometry,
    Vector2,
    TextureLoader,
    Mesh as MeshThree,
    Group as GroupThree,
    VideoTexture,
    sRGBEncoding,
    NearestFilter,
  } from 'three'
  import { onMount } from 'svelte'
  import vertexPicture from '../../shaders/vertexPicture.glsl'
  import fragmentPicture from '../../shaders/fragmentPicture.glsl'
  import VirtualScroll from 'virtual-scroll'
  const { size, renderer, camera, scene } = useThrelte()
  import gsap from 'gsap'
  import { assets } from '../../../stores'
  import { dragControls, mouseDown } from '../../../dragControls'

  export let pictures
  export let titlePicture
  export let video
  export let gameVideo
  export let isMobile

  let position = 0
  let speed = 0
  let targetSpeed = 0

  let websiteVideoTexture
  let gameVideoTexture

  let rgbEffectFinished = false

  export let outro = false

  $: if (outro) {
    ref.children[0].children.forEach((mesh) => {
      gsap.to(mesh.material.uniforms.uOffset, {
        value: -0.05,
        duration: 1,
        ease: 'Sine.easeOut',
      })
    })
    gsap.to(ref.children[0].position, {
      y: -5,
      duration: 0.55,
      ease: 'Power2.easeIn',
      // delay: 0.2,
    })
  }

  export const ref = new GroupThree()

  function dragAction(deltaX, deltaY, object) {
    speed += deltaY / 2
  }
  onMount(() => {
    dragControls(document.querySelector('#frontElement'), dragAction)

    if (video) {
      let websiteVideo = document.getElementById('websiteVideo')
      websiteVideo.play()
      websiteVideoTexture = new VideoTexture(websiteVideo)
      websiteVideoTexture.flipY = true
      websiteVideoTexture.generateMipmaps = false
    }

    if (gameVideo) {
      let gameVideo = document.getElementById('gameVideo')
      gameVideo.play()
      gameVideoTexture = new VideoTexture(gameVideo)
      gameVideoTexture.flipY = true
      gameVideoTexture.generateMipmaps = false
      // gameVideoTexture.encoding = sRGBEncoding
    }

    const scroller = new VirtualScroll()
    scroller.on((event) => {
      speed = event.deltaY
    })

    createPlane()

    setTimeout(() => {
      ref.children[0].children.forEach((mesh) => {
        gsap.from(mesh.material.uniforms.uOffset, {
          value: 0.05,
          duration: 0.4,
          ease: 'Power4.out',
          delay: 1.5,
          onComplete: () => {
            rgbEffectFinished = true
          },
        })
      })

      gsap.to(ref.children[0].position, {
        y: 0.52,
        duration: 1,
        ease: 'back.out(1)',
        delay: 1,
      })
    }, 10)
  })

  useFrame(() => {
    targetSpeed += (speed - targetSpeed) * 0.15
    position += speed / 1500
    speed *= 0.89

    let rounded = Math.round(position)
    let diff = rounded - position
    if (!mouseDown)
      position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.03

    if (!outro) infinitePictures()
    if (rgbEffectFinished && !outro) updatePlaneTexture()
  })

  function infinitePictures() {
    let margin = 0.9
    let wholeHeight = ref.children[0].children.length * margin

    let calcPos = position * 0.9
    ref.children[0].children.forEach((picture, i) => {
      picture.position.y = -(
        ((margin * i + 2 + calcPos + 42069 * wholeHeight) % wholeHeight) -
        wholeHeight / 2
      )
    })
  }

  export const pictureMesh = new MeshThree()
  // let planeMaterial
  let geometryPlane
  let textures = []
  function createPlane() {
    textures = [...pictures]
    textures = textures.map((t) => {
      return $assets[t]
    })

    geometryPlane = new PlaneGeometry(1.77 / 2, 1 / 2, 30, 30).translate(
      0,
      0,
      1
    )
  }

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
  }

  let speedLerp = 0
  function updatePlaneTexture() {
    if (textures) {
      speedLerp = lerp(speedLerp, targetSpeed, 0.1)
      ref.children[0].children.forEach((mesh) => {
        mesh.material.uniforms.uOffset.value =
          (targetSpeed - speedLerp) * -0.0012
      })
    }
  }
</script>

<div>
  <T.PerspectiveCamera
    makeDefault
    position={[0.05, isMobile ? 0.4 : 0.32, isMobile ? 4.3 : 5]}
    fov={Math.max(
      24,
      2 *
        Math.atan(1.2 / ($size.width / $size.height) / (2 * 2)) *
        (180 / Math.PI)
    )}
  />

  <T.Layers layers={'all'}>
    <T is={ref}>
      <T.Group position={[0.05, -5, 0]}>
        {#each textures as element, i}
          <T.Mesh
            geometry={geometryPlane}
            material={new ShaderMaterial({
              extensions: {
                derivatives: '#extension GL_OES_standard_derivatives : enable',
              },
              side: DoubleSide,
              uniforms: {
                time: { value: 0 },
                uTexture: { value: textures[i] },
                displacement: {
                  value: new TextureLoader().load(
                    '/textures/displacementImage.png'
                  ),
                },
                opacity: {
                  value: 1,
                },
                uOffset: { value: 0 },
                resolution: { value: new Vector4() },
              },
              vertexShader: vertexPicture,
              fragmentShader: fragmentPicture,
            })}
            scale={1.7}
            interactive
          />
        {/each}

        {#if titlePicture}
          <T.Mesh
            geometry={geometryPlane}
            material={new ShaderMaterial({
              extensions: {
                derivatives: '#extension GL_OES_standard_derivatives : enable',
              },
              side: DoubleSide,
              uniforms: {
                time: { value: 0 },
                uTexture: { value: $assets[titlePicture] },
                displacement: {
                  value: new TextureLoader().load(
                    '/textures/displacementImage.png'
                  ),
                },
                opacity: {
                  value: 1,
                },
                uOffset: { value: 0 },
                resolution: { value: new Vector4() },
              },
              vertexShader: vertexPicture,
              fragmentShader: fragmentPicture,
            })}
            scale={1.7}
            interactive
          />
        {/if}
        {#if video}
          <T.Mesh
            geometry={geometryPlane}
            material={new ShaderMaterial({
              extensions: {
                derivatives: '#extension GL_OES_standard_derivatives : enable',
              },
              side: DoubleSide,
              uniforms: {
                time: { value: 0 },
                uTexture: { value: websiteVideoTexture },
                displacement: {
                  value: new TextureLoader().load(
                    '/textures/displacementImage.png'
                  ),
                },
                opacity: {
                  value: 1,
                },
                uOffset: { value: 0 },
                resolution: { value: new Vector4() },
              },
              vertexShader: vertexPicture,
              fragmentShader: fragmentPicture,
            })}
            scale={1.7}
            interactive
          />
        {/if}
        {#if gameVideo}
          <T.Mesh
            geometry={geometryPlane}
            material={new ShaderMaterial({
              extensions: {
                derivatives: '#extension GL_OES_standard_derivatives : enable',
              },
              side: DoubleSide,
              uniforms: {
                time: { value: 0 },
                uTexture: { value: gameVideoTexture },
                displacement: {
                  value: new TextureLoader().load(
                    '/textures/displacementImage.png'
                  ),
                },
                opacity: {
                  value: 1,
                },
                uOffset: { value: 0 },
                resolution: { value: new Vector4() },
              },
              vertexShader: vertexPicture,
              fragmentShader: fragmentPicture,
            })}
            scale={1.7}
            interactive
          />
        {/if}
      </T.Group>
    </T>
  </T.Layers>
</div>

{#if video}
  <video
    id="websiteVideo"
    loop
    crossOrigin="anonymous"
    playsinline
    class="hidden"
    autoplay
    muted
  >
    <source src={video} type="video/mp4;" />
  </video>
{/if}

{#if gameVideo}
  <video
    id="gameVideo"
    loop
    crossOrigin="anonymous"
    playsinline
    class="hidden"
    autoplay
    muted
  >
    <source src={gameVideo} type="video/mp4;" />
  </video>
{/if}

<style>
  div {
    height: 100%;
    width: 100%;
  }

  body {
    overscroll-behavior: none;
  }
</style>
