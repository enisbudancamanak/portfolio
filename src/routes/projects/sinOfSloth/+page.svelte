<script lang="ts">
  import Loading from '$lib/components/Loading.svelte'
  import ProjectSingle from '$lib/components/Scenes/ProjectSingle/ProjectSingle.svelte'
  import { assetsProjectsSingle } from '$lib/stores/stores'

  let title = 'Sin Of Sloth'
  let color = '#ff336d'

  let titlePicture = '/pictures/projects/SinOfSloth/1.png'

  let pictures = ['/pictures/projects/SinOfSloth/2.png']

  let video = '/pictures/projects/SinOfSloth/website.mp4'
  let gameVideo = '/pictures/projects/SinOfSloth/game.mp4'
  let description = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat.`

  let completed = '2021'
  let client = 'Student-Project at the University Of Applied Sciences in Bremen'
  let type = 'Game / Website'

  let link = 'https://enisbudancamanak.github.io/SinOfSlothWebsite'
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
