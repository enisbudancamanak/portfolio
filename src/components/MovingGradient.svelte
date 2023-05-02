<script>
  import gsap from 'gsap'
  import { onMount } from 'svelte'

  onMount(() => {
    const blob = document.getElementById('blob')
    window.onpointermove = (event) => {
      const { clientX, clientY } = event
      blob.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 10, fill: 'forwards' }
      )
    }

    gsap.from('#blob', {
      opacity: 0,
      ease: 'power4.out',
      duration: 1,
    })
  })
</script>

<div
  id="gradientDiv"
  class="w-screen h-screen absolute bg-[#151517] overflow-hidden"
>
  <div id="blob" />
  <div id="blur" />
</div>

<style>
  @keyframes rotate {
    from {
      rotate: 0deg;
    }

    50% {
      scale: 1 1.5;
    }

    to {
      rotate: 360deg;
    }
  }

  #blob {
    height: 20vmax;
    aspect-ratio: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    background: linear-gradient(to right, purple, mediumpurple);
    animation: rotate 20s infinite;
    opacity: 1;
  }

  #blur {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 2;
    backdrop-filter: blur(12vmax);
  }
</style>
