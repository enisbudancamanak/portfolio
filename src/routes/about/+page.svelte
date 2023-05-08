<script>
  import Portal from 'svelte-portal'
  import { Gradient } from '../../gradient.js'
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { beforeNavigate, goto } from '$app/navigation'
  import MovingGradient from '../../components/MovingGradient.svelte'

  onMount(() => {
    const gradient = new Gradient()
    gradient.initGradient('#gradient-canvas')

    gsap.from('#content', {
      padding: 0,
      duration: 1,
      ease: 'Power4.out',
    })

    gsap.from('#gradient-canvas', {
      opacity: 0,
      duration: 3,
      ease: 'Power4.in',
    })
  })

  let animateTime = false
  beforeNavigate((navigation) => {
    if (navigation.from?.route.id != navigation.to?.route.id)
      if (!animateTime) {
        animateTime = true
        navigation.cancel()

        gsap.to('#content', {
          padding: 0,
          duration: 0.6,
          ease: 'Power4.out',
        })

        gsap.to('#gradient-canvas', {
          opacity: 0,
          duration: 0.5,
          ease: 'Power4.out',
          onComplete: () => {
            goto(navigation.to?.route.id)
          },
        })
      }
  })
</script>

<!-- //data-js-darken-top -->
<Portal>
  <div class="absolute z-[99999999] w-screen h-screen p-24">
    <div class="w-full h-full overflow-x-hidden overflow-y-scroll">
      <div class="flex items-center pl-[5%] w-full h-full text-white">
        <h1 class="font-medium tracking-wide text-9xl font-bebasNeue w-[10ch]">
          HELLO MY NAME IS ENIS
        </h1>
        <h2 class="w-[40ch] font-bebasNeue font-medium tracking-wide">
          I am a multidisciplinary developer based in Germany, and my primary
          focus is on crafting engaging web experiences. I have a deep-seated
          passion for creative development and 3D experiences, which is why I am
          currently building real-time 3D graphics using WebGL. My
          specialization lies in creating interactive experiences that leave a
          lasting impression on users. I am always experimenting with new
          technology to achieve this.
        </h2>
      </div>
      <div class="flex items-center justify-center w-full h-full">
        <h1
          class="text-9xl text-[#151517] font-bebasNeue font-medium tracking-wide"
        >
          <!-- HELLO MY NAME IS ENIS -->
        </h1>
      </div>
      <div class="flex items-center justify-center w-full h-full">
        <h1
          class="text-9xl text-[#151517] font-bebasNeue font-medium tracking-wide"
        >
          <!-- HELLO MY NAME IS ENIS -->
        </h1>
      </div>
    </div>
  </div>

  <div id="content" class="absolute w-screen h-screen p-24">
    <canvas
      id="gradient-canvas"
      class="z-0 rounded-xl opacity-90"
      data-transition-in
      data-js-darken-top
    />
  </div>
</Portal>

<style>
  :global(#gradient-canvas) {
    width: 100%;
    height: 100%;
    --gradient-color-1: #6e41ca;
    --gradient-color-2: #9b89b3;
    --gradient-color-3: #9d9b9f; /*//fcf7ff*/
    --gradient-color-4: #d730ab;
  }

  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: #410164 transparent;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #410164;
    border-radius: 10px 0px 0px 10px;
  }
</style>
