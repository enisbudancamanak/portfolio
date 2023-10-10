<script lang="ts">
  import Loading from '$lib/components/Loading.svelte'
  import ProjectSingle from '$lib/components/Scenes/ProjectSingle/ProjectSingle.svelte'
  import { assetsProjectsSingle } from '$lib/stores/stores'

  let title = 'WAGENFELD REDESIGN'
  let color = '#ff03ee'

  let titlePicture = '/pictures/projects/WagenfeldRedesign/1.png'
  let pictures = [
    '/pictures/projects/WagenfeldRedesign/2.png',
    '/pictures/projects/WagenfeldRedesign/3.png',
  ]

  let video = '/pictures/projects/WagenfeldRedesign/website.mp4'
  let gameVideo: any = null
  let description = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat.`

  let completed = '2022'
  let client = 'Student-Project at the University Of Applied Sciences in Bremen'
  let type = 'Website'

  let link = 'https://wagenfeld-redesign.netlify.app/'
</script>

{#if $assetsProjectsSingle}
  <ProjectSingle
    {title}
    {pictures}
    {video}
    {titlePicture}
    {gameVideo}
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
