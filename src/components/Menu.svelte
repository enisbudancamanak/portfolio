<script>
  import gsap, { Power4, TweenMax } from 'gsap'
  import { onMount } from 'svelte'
  import { currentSite } from '../stores'
  import { goto } from '$app/navigation'
  import viewport from '../useViewportAction'

  onMount(() => {})

  let strength = 20
  function moveMagnet(event) {
    var magnetButton = event.currentTarget
    var bounding = magnetButton.getBoundingClientRect()

    TweenMax.to(magnetButton, 1, {
      x:
        ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
        strength,
      y:
        ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
        strength,
      ease: Power4.easeOut,
    })
  }

  onMount(() => {
    var magnets = document.querySelectorAll('.magnetic')

    magnets.forEach((magnet) => {
      magnet.addEventListener('mousemove', moveMagnet)
      magnet.addEventListener('mouseout', function (event) {
        TweenMax.to(event.currentTarget, 1, {
          x: 0,
          y: 0,
          ease: Power4.easeOut,
        })
      })
    })
  })
</script>

<div
  class="z-[999999999999999999999999] fixed top-10 right-6 font-bebasNeue tracking-widest text-center text-sm text-gray-200 flex flex-col gap-1"
>
  <p
    on:pointerdown={() => {
      goto('/')
    }}
    class="cursor-pointer select-none magnetic"
  >
    home
  </p>
  <p
    on:pointerdown={() => {
      goto('/projects')
    }}
    class="cursor-pointer select-none magnetic"
  >
    projects
  </p>
  <p
    on:pointerdown={() => {
      goto('/about')
    }}
    class="cursor-pointer select-none magnetic"
  >
    about
  </p>
</div>
