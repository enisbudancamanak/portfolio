<script lang="ts">
  import gsap from 'gsap'
  import { onMount } from 'svelte'
  import { beforeNavigate, goto } from '$app/navigation'
  import RoomScene from '../components/Scenes/Room/RoomScene.svelte'
  import Portal from 'svelte-portal'
  import ProfileCard from '../components/ProfileCard.svelte'
  import MovingGradient from '../components/MovingGradient.svelte'

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

  onMount(() => {
    gsap.from(document.querySelector('#gradientDiv'), {
      opacity: 0,
      ease: 'Power4.easeIn',
      duration: 0.8,
    })
    gsap.from(document.querySelector('#profileCard'), {
      bottom: '-100%',
      duration: 1,
      ease: 'Sine.EaseIn',
      delay: 0.2,
    })
  })

  let animateTime = false
  beforeNavigate((navigation) => {
    if (navigation.from?.route.id != navigation.to?.route.id)
      if (!animateTime) {
        animateTime = true
        navigation.cancel()

        gsap.to(document.querySelector('#gradientDiv'), {
          opacity: 0,
          ease: 'Power4.easeOut',
          duration: 0.4,
        })

        gsap.to(document.querySelector('#profileCard'), {
          bottom: '-20%',
          duration: 1,
          ease: 'Power4.easeOut',
          delay: 0,
          onComplete: () => {
            goto(navigation.to.route.id)
          },
        })
      }
  })
</script>

<RoomScene {isMobile} />

<Portal>
  <MovingGradient />
  <ProfileCard />
</Portal>

<style>
</style>
