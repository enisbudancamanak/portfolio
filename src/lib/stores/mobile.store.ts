import { browser } from '$app/environment'
import { writable } from 'svelte/store'

function create_store(max_width = 600, init = true) {
  const { subscribe } = writable(false, (set) => {
    if (!init) return

    const media_query = window.matchMedia(`(max-width: ${max_width}px)`)

    function handle_media_query(e) {
      set(e.matches)
    }

    media_query.addListener(handle_media_query)

    handle_media_query(media_query)

    return () => media_query.removeListener(handle_media_query)
  })

  return {
    subscribe,
  }
}

const isMobile = create_store(600, browser)

export default isMobile
