<script>
  import Portal from 'svelte-portal'
  import { page } from '$app/stores'
  import { gsap } from 'gsap'
  import { beforeNavigate, goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { positionProjects } from '../../stores'

  let projects = [
    'sinOfSloth',
    'interactiveGraphics',
    'slimeHero',
    'ARthlete',
    'carShowcase',
    'shioriList',
    'wagenfeldRedesign',
    'toyroom',
  ]

  function gotoNext() {
    let nextIndex =
      projects.indexOf($page.route.id?.replace('/projects/', '')) + 1
    let checkIndex = nextIndex > 7 ? 0 : nextIndex
    positionProjects.set(nextIndex)
    goto('/projects/' + projects[checkIndex])
  }

  onMount(() => {
    nextCardFunction()
  })

  function nextCardFunction() {
    if ($page.route.id?.includes('/projects/')) {
      gsap.to('#nextCard', {
        right: '-2.5rem',
        ease: 'Power2.easeOut',
        duration: 1,
        delay: 0.2,
      })
    }
  }

  $: $page && nextCardFunction()
</script>

<Portal>
  <div
    class="invisible sm:visible absolute right-0 w-max h-screen flex items-center py-8 z-[99999] transition-all duration-200"
  >
    <div
      on:mousedown={gotoNext}
      id="nextCard"
      class="relative flex items-center p-4 h-max w-max rounded-l-[2rem] cursor-pointer -right-32 hover:-translate-x-8 duration-200 transition-all"
    >
      <div
        style="writing-mode: vertical-rl;
text-orientation: upright;"
        class="mr-8 text-2xl font-bold tracking-tighter font-bebasNeue"
      >
        NEXT
      </div>
    </div>
  </div>

  <div
    id="backgroundColorProjects"
    class="absolute z-[999] w-screen h-screen bg-[#151517]"
  />
</Portal>

<div class="absolute z-[99999999999999999999999999] w-screen h-screen">
  <slot />
</div>

<style>
  :global(#nextCard) {
    /* From https://css.glass */
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    filter: drop-shadow(2px 2px 10px #151517);
    -webkit-backdrop-filter: blur(20px);
  }
</style>
