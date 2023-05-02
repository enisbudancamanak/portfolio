<script>
  import ProjectSingle from '../../../components/Scenes/ProjectSingle/ProjectSingle.svelte'

  let title = 'Interactive Graphics'
  let color = '#1f86ab'

  let titlePicture = '/pictures/projects/interactiveGraphics/1.png'

  let pictures = [
    '/pictures/projects/interactiveGraphics/2.png',
    '/pictures/projects/interactiveGraphics/3.png',
  ]
  let video = '/pictures/projects/interactiveGraphics/video.mp4'
  let gameVideo = null

  let description = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat.`

  let completed = '2021'
  let client = 'Student-Project at the University Of Applied Sciences in Bremen'
  let type = 'Website'

  let link = 'https://enisbudancamanak.github.io/datengrafik_dashboard/'
</script>

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
