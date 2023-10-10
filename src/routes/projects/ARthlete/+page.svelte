<script lang="ts">
  import Loading from '$lib/components/Loading.svelte'
  import ProjectSingle from '$lib/components/Scenes/ProjectSingle/ProjectSingle.svelte'
  import { assetsProjectsSingle } from '$lib/stores/stores'

  let title = 'ARthlete'
  let color = '#474b96'

  let titlePicture = '/pictures/projects/ARthlete/1.png'

  let pictures = [
    '/pictures/projects/ARthlete/2.png',
    '/pictures/projects/ARthlete/3.png',
  ]
  let video = '/pictures/projects/ARthlete/video.mp4'
  let gameVideo: any = null

  let description = `ARthlete uses augmented reality to display sports exercises. It offers a deck of cards with different bodyweight exercises that can be displayed in 3D by scanning them with the mobile phone camera. The user can optimise the view of the model through gesture control and positioning of the mobile device. ARthlete is designed to help children and adults who have had little contact with bodyweight exercises to get a playful introduction to this field.`

  let completed = '2022'
  let client = 'Student-Project at the University Of Applied Sciences in Bremen'
  let type = 'Mobile Appliction / AR'

  let link: any = null
</script>

{#if $assetsProjectsSingle}
  <ProjectSingle
    {title}
    {pictures}
    {video}
    {gameVideo}
    {titlePicture}
    {description}
    {completed}
    {client}
    {type}
    {link}
    {color}
  />
{:else}
  <Loading />
{/if}
