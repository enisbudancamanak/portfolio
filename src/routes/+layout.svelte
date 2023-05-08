<script>
  import '../app.postcss'
  import Menu from '../components/Menu.svelte'
  import { useGltf } from '@threlte/extras'
  import { Canvas } from '@threlte/core'
  import MovingGradient from '../components/MovingGradient.svelte'
  import ProfileCard from '../components/ProfileCard.svelte'
  import Preloader from '../components/Preloader.svelte'
  import { gltfRoom } from '../stores.js'
  import Loading from '../components/Loading.svelte'
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
