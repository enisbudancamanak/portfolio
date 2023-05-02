<script>
  import ProjectSingle from '../../../components/Scenes/ProjectSingle/ProjectSingle.svelte'

  let title = 'Slime Hero'
  let color = '#6e439e'

  let titlePicture = '/pictures/projects/SlimeHero/1.png'

  let pictures = [
    '/pictures/projects/SlimeHero/2.png',
    '/pictures/projects/SlimeHero/3.png',
  ]
  let video = '/pictures/projects/SlimeHero/video.mp4'
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
  let type = 'Game'

  let link = 'https://slimehero.netlify.app'
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
