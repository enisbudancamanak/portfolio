<script lang="ts">
  import Loading from '$lib/components/Loading.svelte'
  import ProjectSingle from '$lib/components/Scenes/ProjectSingle/ProjectSingle.svelte'
  import { assetsProjectsSingle } from '$lib/stores/stores'

  let title = 'Toyroom Game'
  let color = '#c66be1'

  let titlePicture = '/pictures/projects/toyroom/1.png'

  let pictures = [
    '/pictures/projects/toyroom/2.png',
    '/pictures/projects/toyroom/3.png',
  ]

  let video: any = null
  let gameVideo = '/pictures/projects/toyroom/videocompressed.mp4'

  let description = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat.`

  let completed = '2023'
  let client = 'Student-Project at the University Of Applied Sciences in Bremen'
  let type = 'Game'

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
