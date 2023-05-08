<script>
  import { useLoader } from '@threlte/core'
  import { TextureLoader } from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import {
    gltfRoom,
    assetsProjects,
    assetsTextures,
    assetsProjectsSingle,
  } from '../stores.js'
  import { useGltf, useSuspense } from '@threlte/extras'

  // GLTF
  const suspend = useSuspense()
  const gltf = suspend(
    useGltf('/models/arcadeRoomDraco.glb', {
      useDraco: true,
    })
  )

  // TEXTURES
  const { load } = useLoader(TextureLoader)
  const textures = load({
    '/textures/blackwood/black-parquet.jpg':
      '/textures/blackwood/black-parquet.jpg',
    '/textures/blackwood/NormalMap.png': '/textures/blackwood/NormalMap.png',
  })

  const texturesProjects = load({
    '/pictures/projects/sinOfSloth.png': '/pictures/projects/sinOfSloth.png',
    '/pictures/projects/interactiveGraphics.png':
      '/pictures/projects/interactiveGraphics.png',
    '/pictures/projects/slimeHero.png': '/pictures/projects/slimeHero.png',
    '/pictures/projects/ARthlete.png': '/pictures/projects/ARthlete.png',
    '/pictures/projects/carShowcase.png': '/pictures/projects/carShowcase.png',
    '/pictures/projects/shioriList.png': '/pictures/projects/shioriList.png',
    '/pictures/projects/wagenfeldRedesign.png':
      '/pictures/projects/wagenfeldRedesign.png',
    '/pictures/projects/toyroom.png': '/pictures/projects/toyroom.png',
  })

  const textureProjectsSingle = load({
    '/pictures/projects/ARthlete/1.png': '/pictures/projects/ARthlete/1.png',
    '/pictures/projects/ARthlete/2.png': '/pictures/projects/ARthlete/2.png',
    '/pictures/projects/ARthlete/3.png': '/pictures/projects/ARthlete/3.png',
    '/pictures/projects/CarShowcase/1.png':
      '/pictures/projects/CarShowcase/1.png',
    '/pictures/projects/CarShowcase/2.png':
      '/pictures/projects/CarShowcase/2.png',
    '/pictures/projects/CarShowcase/3.png':
      '/pictures/projects/CarShowcase/3.png',
    '/pictures/projects/interactiveGraphics/1.png':
      '/pictures/projects/interactiveGraphics/1.png',
    '/pictures/projects/interactiveGraphics/2.png':
      '/pictures/projects/interactiveGraphics/2.png',
    '/pictures/projects/interactiveGraphics/3.png':
      '/pictures/projects/interactiveGraphics/3.png',
    '/pictures/projects/shioriList/1.png':
      '/pictures/projects/shioriList/1.png',
    '/pictures/projects/shioriList/2.png':
      '/pictures/projects/shioriList/2.png',
    '/pictures/projects/shioriList/3.png':
      '/pictures/projects/shioriList/3.png',
    '/pictures/projects/shioriList/4.png':
      '/pictures/projects/shioriList/4.png',
    '/pictures/projects/shioriList/5.png':
      '/pictures/projects/shioriList/5.png',
    '/pictures/projects/shioriList/6.png':
      '/pictures/projects/shioriList/6.png',
    '/pictures/projects/shioriList/7.png':
      '/pictures/projects/shioriList/7.png',
    '/pictures/projects/SinOfSloth/1.png':
      '/pictures/projects/SinOfSloth/1.png',
    '/pictures/projects/SinOfSloth/2.png':
      '/pictures/projects/SinOfSloth/2.png',
    '/pictures/projects/SlimeHero/1.png': '/pictures/projects/SlimeHero/1.png',
    '/pictures/projects/SlimeHero/2.png': '/pictures/projects/SlimeHero/2.png',
    '/pictures/projects/SlimeHero/3.png': '/pictures/projects/SlimeHero/3.png',
    '/pictures/projects/toyroom/1.png': '/pictures/projects/toyroom/1.png',
    '/pictures/projects/toyroom/2.png': '/pictures/projects/toyroom/2.png',
    '/pictures/projects/toyroom/3.png': '/pictures/projects/toyroom/3.png',
    '/pictures/projects/WagenfeldRedesign/1.png':
      '/pictures/projects/WagenfeldRedesign/1.png',
    '/pictures/projects/WagenfeldRedesign/2.png':
      '/pictures/projects/WagenfeldRedesign/2.png',
    '/pictures/projects/WagenfeldRedesign/3.png':
      '/pictures/projects/WagenfeldRedesign/3.png',
  })

  $: assetsTextures.set($textures),
    gltfRoom.set($gltf),
    assetsProjects.set($texturesProjects),
    assetsProjectsSingle.set($textureProjectsSingle)
  // [Texture, Texture]
</script>
