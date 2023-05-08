<script>
  import {
    DoubleSide,
    LinearFilter,
    OrthographicCamera,
    RGBAFormat,
    ShaderMaterial,
    TextureLoader,
    WebGLRenderTarget,
  } from 'three'
  import vertex from '../../shaders/vertex.glsl'
  import fragment from '../../shaders/fragmentRipple.glsl'
  const { renderer, scene, composer, camera } = useThrelte()

  import { useFrame, useThrelte } from '@threlte/core'
  import Ripples from './Ripples.svelte'
  import { onMount } from 'svelte'
  import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

  let ripplesCamera
  let baseTexture = new WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBAFormat,
    }
  )

  let baseTexture1 = new WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight
  )

  let material = new ShaderMaterial({
    extensions: {
      derivatives: '#extension GL_OES_standard_derivatives : enable',
    },
    side: DoubleSide,
    uniforms: {
      time: { value: 0 },
      uDisplacement: { value: null },
      uTexture: { value: null },
    },
    vertexShader: vertex,
    fragmentShader: fragment,
  })

  useFrame(() => {
    renderer.setRenderTarget(baseTexture)
    renderer.render(scene, ripplesCamera)
    material.uniforms.uDisplacement.value = baseTexture.texture

    // renderer.setRenderTarget(baseTexture1)
    // renderer.render(scene1, camera1)
    // material.uniforms.uTexture.value = baseTexture1.texture

    material.uniforms.tDiffuse = composer?.renderTarget1.texture

    renderer.setRenderTarget(null)
    renderer.clear()
  })

  onMount(() => {
    composer?.addPass(new ShaderPass(material))

    ripplesCamera = new OrthographicCamera(
      (window.innerHeight * (window.innerWidth / window.innerHeight)) / -2,
      (window.innerHeight * (window.innerWidth / window.innerHeight)) / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      -1000,
      1000
    )

    ripplesCamera.layers.enable(2)
    ripplesCamera.layers.set(2)
  })
</script>

<Ripples {scene} camera={$camera} {material} {ripplesCamera} {baseTexture} />
