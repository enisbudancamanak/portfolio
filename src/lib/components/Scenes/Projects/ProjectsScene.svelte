<script lang="ts">
  import Scene from './Projects.svelte'
  import { T, useThrelte } from '@threlte/core'
  const { size } = useThrelte()
</script>

<div class="w-screen h-screen">
  <Scene />
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
</div>

<style>
</style>
