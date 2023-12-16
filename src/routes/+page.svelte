<script lang="ts">
	// Svelte
	import { beforeNavigate } from '$app/navigation'
	import { onMount } from 'svelte'

	// Components
	import RoomScene from '$lib/components/Scenes/Room/RoomScene.svelte'
	import Loading from '$lib/components/Loading.svelte'
	import ProfileCard from '$lib/components/ProfileCard.svelte'
	import MovingGradient from '$lib/components/MovingGradient.svelte'

	// Utils
	import gsap from 'gsap'
	import Portal from 'svelte-portal'

	// Stores
	import { assetsTextures, gltfRoom } from '$lib/stores/stores'

	// Animate on mount
	onMount(() => {
		gsap.from(document.querySelector('#gradientDiv'), {
			opacity: 0,
			ease: 'Power4.easeIn',
			duration: 0.8,
		})
		gsap.from(document.querySelector('#profileCard'), {
			bottom: '-100%',
			duration: 1,
			ease: 'Sine.EaseIn',
			delay: 0.2,
		})
	})

	let animateTime = false
	// Animation before navigation
	beforeNavigate((navigation) => {
		if (navigation.from?.route.id != navigation.to?.route.id)
			if (!animateTime) {
				animateTime = true
				navigation.cancel()

				gsap.to(document.querySelector('#gradientDiv'), {
					opacity: 0,
					ease: 'Power4.easeOut',
					duration: 0.4,
				})

				gsap.to(document.querySelector('#profileCard'), {
					bottom: '-20%',
					duration: 0.8,
					ease: 'Power4.easeOut',
					delay: 0,
				})
			}
	})
</script>

{#if $gltfRoom && $assetsTextures}
	<RoomScene />
{:else}
	<Loading />
{/if}

<Portal>
	<!-- <MovingGradient /> -->
	<!-- <ProfileCard /> -->
</Portal>

<style>
</style>
