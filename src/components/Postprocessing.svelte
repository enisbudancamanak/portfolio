<script>
  import { useThrelte, useRender } from '@threlte/core'
  import {
    EffectComposer,
    EffectPass,
    RenderPass,
    ChromaticAberrationEffect,
    GlitchEffect,
  } from 'postprocessing'
  import { Vector2 } from 'three'

  const { scene, renderer, camera } = useThrelte()

  const composer = new EffectComposer(renderer)

  const setupEffectComposer = (camera) => {
    composer.removeAllPasses()
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new EffectPass(camera, new ChromaticAberrationEffect()))
    composer.addPass(
      new EffectPass(
        camera,
        new GlitchEffect({
          delay: new Vector2(2, 22),
          strength: new Vector2(0.01, 0.01),
        })
      )
    )
  }

  $: setupEffectComposer($camera)

  useRender((_, delta) => {
    composer.render(delta)
  })
</script>
