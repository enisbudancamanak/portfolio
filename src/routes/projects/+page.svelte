<script>
  import gsap from 'gsap'
  import { onMount } from 'svelte'
  import ProjectsScene from '../../components/Scenes/Projects/ProjectsScene.svelte'
  import Layout from '../+layout.svelte'

  onMount(() => {
    gsap.to(document.querySelector('#backgroundColorProjects'), {
      backgroundColor: '#151517',
      duration: 1.5,
      ease: 'Power4.out',
    })
  })
</script>

<ProjectsScene />

<style>
</style>
