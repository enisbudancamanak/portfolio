<script lang="ts">
  import '../app.postcss'

  // Threlte
  import { Canvas } from '@threlte/core'

  // Components
  import Menu from '$lib/components/Menu.svelte'

  // Utils
  import Preloader from '$lib/components/PreLoader.svelte'
</script>

<svelte:head>
  <title>PORTFOLIO</title>
</svelte:head>

<div class="w-screen h-screen overflow-hidden absolute bg-transparent z-[9999]">
  <Canvas>
    <slot />
    <Preloader />
  </Canvas>
</div>
<Menu />

<style>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

  :global(body, html) {
    background-color: #151517 !important;
    overflow: hidden;
  }

  :global(html) {
    scroll-behavior: smooth;
  }
</style>
