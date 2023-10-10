import { writable } from 'svelte/store'

export const projectsScene = writable(null)
export const projectsRenderer = writable(null)
export const projectsCamera = writable(null)
export const distortionFinished = writable(false)

export const currentSite = writable(null)
export const gltfRoomLoaded = writable(false)
export const gltfRoom = writable(null)
export const firstTimeLoad = writable(true)
export const positionProjects = writable(0)

export const assetsTextures = writable(null)
export const assetsProjects = writable(null)
export const assetsProjectsSingle = writable(null)

export const assetsLoaded = writable(false)
