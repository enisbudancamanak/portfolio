<script>
  import ProjectSingle from '../../../components/Scenes/ProjectSingle/ProjectSingle.svelte'

  let title = 'Car Showcase'
  let color = '#890a6e'

  let titlePicture = '/pictures/projects/CarShowcase/1.png'

  let pictures = [
    '/pictures/projects/CarShowcase/2.png',
    '/pictures/projects/CarShowcase/3.png',
  ]
  let video = '/pictures/projects/CarShowcase/video.mp4'
  let gameVideo = null

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

  let link = null
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
