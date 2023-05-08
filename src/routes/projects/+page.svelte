<script>
  import gsap from 'gsap'
  import { onMount } from 'svelte'
  import ProjectsScene from '../../components/Scenes/Projects/ProjectsScene.svelte'
  import Portal from 'svelte-portal'
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
  import { beforeNavigate } from '$app/navigation'

  onMount(() => {
    gsap.to(document.querySelector('#backgroundColorProjects'), {
      backgroundColor: '#151517',
      duration: 1.5,
      ease: 'Power4.out',
    })

    gsap.from('#scrollDownMouse', {
      opacity: 0,
      duration: 1.5,
      ease: 'Power4.out',
      delay: 1,
    })
  })

  let animateTime = false
  beforeNavigate((navigation) => {
    if (navigation.from?.route.id != navigation.to?.route.id)
      if (!animateTime) {
        // composer?.dispose()
        animateTime = true
        navigation.cancel()

        gsap.to('#scrollDownMouse', {
          opacity: 0,
          duration: 0.5,
          ease: 'Power4.out',
        })
      }
  })
</script>

<ProjectsScene />

<Portal>
  <div
    id="scrollDownMouse"
    class="fixed z-[9999999999999999] bottom-8 right-4 flex gap-2 items-center opacity-60"
  >
    <LottiePlayer
      src="https://assets5.lottiefiles.com/packages/lf20_pcgerf64.json"
      autoplay={true}
      loop={true}
      renderer="svg"
      background="transparent"
      height={52}
      width={52}
    />
  </div>
</Portal>

<style>
</style>
