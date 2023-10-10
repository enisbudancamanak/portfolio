<script>
  import { useFrame, T } from '@threlte/core'
  import { onMount } from 'svelte'
  import {
    MeshBasicMaterial,
    PlaneGeometry,
    TextureLoader,
    Group as GroupMeshes,
    AdditiveBlending,
    Vector2,
    Layers,
  } from 'three'

  export let scene
  export let camera
  export let material
  export let ripplesCamera
  export let baseTexture

  let max = 100
  let currentWave = 0

  export const meshes = new GroupMeshes()

  let mouse = new Vector2(0, 0)
  let prevMouse = new Vector2(0, 0)

  let geometry = new PlaneGeometry(40, 40, 1, 1)
  // let geometryFullscreen = new PlaneGeometry(1920, 1080, 1, 1)

  function mouseEvents() {
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX - window.innerWidth / 2
      mouse.y = window.innerHeight / 2 - e.clientY
    })
  }

  function setNewWave(x, y, index) {
    let mesh = meshes.children[index].children[0]
    mesh.visible = true
    mesh.position.set(x, y, 0)
    mesh.scale.x = mesh.scale.y = 0.2
    mesh.material.opacity = 0.5
  }

  function trackMousePos() {
    if (
      Math.abs(mouse.x - prevMouse.x) < 4 &&
      Math.abs(mouse.y - prevMouse.y) < 4
    ) {
      // nothing
    } else {
      setNewWave(mouse.x, mouse.y, currentWave)
      currentWave = (currentWave + 1) % max
    }

    prevMouse.x = mouse.x
    prevMouse.y = mouse.y
  }

  onMount(() => {
    mouseEvents()
    handleResize()
  })

  useFrame(() => {
    trackMousePos()

    meshes.children.forEach((meshArray) => {
      let mesh = meshArray.children[0]
      if (mesh.visible) {
        mesh.rotation.z += 0.02
        mesh.material.opacity *= 0.97
        mesh.scale.x = 0.98 * mesh.scale.x + 0.17
        mesh.scale.y = mesh.scale.x
        if (mesh.material.opacity < 0.002) {
          mesh.visible = false
        }
      }
    })
  })

  function handleResize() {
    window.addEventListener('resize', () => {
      // NOCH AUSLAGERN
      camera.left = -window.innerWidth
      camera.right = window.innerWidth
      camera.top = window.innerHeight
      camera.bottom = -window.innerHeight
      camera.aspect = window.innerWidth / window.innerHeight
      baseTexture.setSize(window.innerWidth, window.innerHeight)
      camera.updateProjectionMatrix()

      ripplesCamera.left = -window.innerWidth
      ripplesCamera.right = window.innerWidth
      ripplesCamera.top = window.innerHeight
      ripplesCamera.bottom = -window.innerHeight
      ripplesCamera.aspect = window.innerWidth / window.innerHeight
      // baseTexture1.setSize(window.innerWidth, window.innerHeight)
      ripplesCamera.updateProjectionMatrix()
    })
  }
</script>

<!-- invisible -->
{#each Array(max) as element}
  <T is={meshes}>
    <T.Group>
      <T.Mesh
        visible={false}
        rotation={[0, 0, 2 * Math.PI * Math.random()]}
        {geometry}
        material={new MeshBasicMaterial({
          map: new TextureLoader().load('textures/brush.png'),
          transparent: true,
          blending: AdditiveBlending,
          depthTest: false,
          depthWrite: false,
        })}
      />
    </T.Group>
  </T>
{/each}
