<script lang="ts">
  import gsap from 'gsap'
  import { onMount } from 'svelte'
  import { beforeNavigate, goto } from '$app/navigation'
  import RoomScene from '../components/Scenes/Room/RoomScene.svelte'
  import Portal from 'svelte-portal'
  import ProfileCard from '../components/ProfileCard.svelte'
  import MovingGradient from '../components/MovingGradient.svelte'
  import Loading from '../components/Loading.svelte'
  import { assetsTextures, gltfRoom } from '../stores'

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
          duration: 0.8,
          ease: 'Power4.easeOut',
          delay: 0,
        })
      }
  })
</script>

{#if $gltfRoom && $assetsTextures}
  <RoomScene />
{:else}
  <Loading />
{/if}

<Portal>
  <MovingGradient />
  <ProfileCard />
</Portal>

<style>
</style>
