<script>
  import { useFrame, useThrelte } from '@threlte/core'
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
  import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
  import { CustomPass } from './CustomPass'
  import { Pane } from 'tweakpane'
  const { composer } = useThrelte()

  export let progress

  let time = 0
  let settings = {
    progress: progress.progress,
    scale: 1,
  }
  let effect = new ShaderPass(CustomPass)
  composer?.addPass(effect)

  // tweakpane
  // const pane = new Pane({ title: 'Scene' })
  // pane.addInput(progress, 'progress', {
  //   min: 0,
  //   max: 1,
  //   step: 0.01,
  // })
  // pane.addInput(settings, 'scale', {
  //   min: 0,
  //   max: 10,
  //   step: 0.01,
  // })

  useFrame(() => {
    time += 0.001
    effect.material.uniforms.time.value = time
    effect.material.uniforms.progress.value = progress.progress
    effect.material.uniforms.scale.value = settings.scale
  })
</script>
