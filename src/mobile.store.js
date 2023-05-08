import { writable } from 'svelte/store'

function create_store(query = '(max-width: 800px)') {
  const { subscribe } = writable(false, (set) => {
    const media_query = window.matchMedia(query)

    set(media_query.matches)
    function handle_media_query(e) {
      set(e.matches)
    }

    media_query.addListener(handle_media_query)

    return () => {
      media_query.removeListener(handle_media_query)
    }
  })

  return {
    subscribe,
  }
}

const isMobile = create_store()

export default isMobile
