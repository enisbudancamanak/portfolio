<script>
  import { onMount } from 'svelte'
  import Scene from './Projects.svelte'
  import RipplePass from '../../Effects/Ripples/RipplePass.svelte'
  import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader'
  import DistortionPass from '../../Effects/Distortion/DistortionPass.svelte'
  import { T, useThrelte } from '@threlte/core'
  const { size } = useThrelte()

  let scene1
  let camera1

  let isMobile = false
  onMount(() => {
    isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    window.addEventListener('resize', () => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) &&
        (window.innerWidth > 0 ? window.innerWidth : screen.width) < 1280
      )
        isMobile = true
      else isMobile = false
    })
  })
  // let shader = RGBShiftShader
  // shader.uniforms.amount.value = 0.0008

  // let distortion = {
  //   progress: 0,
  // }

  // gsap.to(distortion, {
  //   progress: 0,
  //   duration: 2,
  //   ease: 'back.out(1.8)',
  // })

  onMount(() => {
    // document.getElementById('three').style.pointerEvents = 'all'
  })
</script>

<div class="w-screen h-screen">
  <Scene {isMobile} />
  <T.PerspectiveCamera
    makeDefault
    position={[0, 0, 5]}
    fov={Math.max(
      30,
      2 *
        Math.atan(1.2 / ($size.width / $size.height) / (2 * 2)) *
        (180 / Math.PI)
    )}
  />
  <!-- EFFECTS -->
  <!-- <RipplePass /> -->
</div>

<style>
</style>
