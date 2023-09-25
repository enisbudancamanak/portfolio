<script>
  import { goto, beforeNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import gsap from 'gsap'
  import { onMount } from 'svelte'
  import SingleProjectThree from './SingleProjectThree.svelte'
  import viewport from '../../../useViewportAction'
  import Portal from 'svelte-portal'
  import { positionProjects } from '../../../stores'
  import { fade, fly } from 'svelte/transition'
  import isMobile from '../../../mobile.store'

  export let title
  export let type
  export let completed
  export let client
  export let description
  export let link
  export let pictures
  export let video
  export let gameVideo
  export let color
  export let titlePicture

  document.documentElement.style.setProperty('--color', color)

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let outro = false
  let scrollElement

  // ff336d

  let projects = [
    'sinOfSloth',
    'interactiveGraphics',
    'slimeHero',
    'ARthlete',
    'carShowcase',
    'shioriList',
    'wagenfeldRedesign',
    'toyroom',
  ]

  function gotoNext() {
    let nextIndex =
      projects.indexOf($page.route.id?.replace('/projects/', '')) + 1
    let checkIndex = nextIndex > 7 ? 0 : nextIndex
    positionProjects.set(nextIndex)
    goto('/projects/' + projects[checkIndex])
  }

  let animateTime = false
  beforeNavigate((navigation) => {
    if (navigation.from?.route.id != navigation.to?.route.id)
      if (!animateTime) {
        // composer?.dispose()
        animateTime = true
        navigation.cancel()

        if (!navigation.to?.route.id?.includes('/projects/')) {
          gsap.to('#nextCard', {
            right: '-8rem',
            ease: 'Power2.easeOut',
            duration: 0.3,
          })
        }

        outroAnimation(navigation.to.route.id)
      }
  })

  function hackEffect(event) {
    let iteration = 0

    let interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index]
          }

          return letters[Math.floor(Math.random() * 26)]
        })
        .join('')

      if (iteration >= event.target.dataset.value.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3
    }, 30)
  }

  let timelineIntro
  onMount(() => {
    timelineIntro = gsap.timeline().add('start')

    timelineIntro.to(
      [
        document.querySelector('#backgroundColorProjects'),
        document.querySelector('#titleCard'),
      ],
      {
        backgroundColor: color,
        duration: 1,
        ease: 'Power4.out',
      },
      'start'
    )

    timelineIntro.from(
      document.querySelector('#titleCard'),
      {
        top: '-100%',
        duration: 1,
        ease: 'Power3.easeOut',
      },
      'start'
    )
    timelineIntro.to(
      document.querySelector('#detailsCard'),
      {
        left: '-90%',
        ease: 'Power4.in',
        duration: 1,
      },
      'start'
    )

    timelineIntro.to(
      document.querySelector('#backToProjects'),
      {
        opacity: '1',
        ease: 'Power4.in',
        delay: 0.5,
        duration: 0.4,
      },
      'start'
    )

    timelineIntro.from(
      document.querySelectorAll('.links'),
      {
        opacity: 0,
        ease: 'Power4.in',
        delay: 1,
        duration: 0.5,
      },
      'start'
    )
  })

  function outroAnimation(path) {
    outro = true

    timelineIntro.pause()
    gsap.to(document.querySelector('#titleCard'), {
      top: '-20%',
      duration: 0.7,
      ease: 'Power4.easeOut',
      delay: 0.2,
    })

    gsap.to(document.querySelector('#detailsCard'), {
      left: '-101%',
      ease: 'Power2.easeOut',
      duration: 0.2,
    })

    gsap.to(document.querySelector('.btm-nav'), {
      translateY: '105%',
      ease: 'Power2.easeOut',
      duration: 0.3,
    })

    gsap.to(document.querySelector('#backToProjects'), {
      opacity: '0',
      duration: 0.3,
      ease: 'Power2.easeOut',
    })

    gsap.to(document.querySelectorAll('.links'), {
      opacity: 0,
      ease: 'Power4.out',
      duration: 0.5,
    })

    gsap.to(document.querySelectorAll('h3'), {
      opacity: 0,
      stagger: 0.05,
      ease: 'Power4.out',
      duration: 0.5,
    })

    gsap.to(document.querySelectorAll('h4'), {
      opacity: 0,
      stagger: 0.05,
      ease: 'Power4.out',
      duration: 0.5,
    })

    gsap.to(document.querySelector('#backgroundColorProjects'), {
      backgroundColor: '#151517',
      duration: 0.7,
      ease: '"slow(0.7, 0.7, false)"',
      onComplete: () => {
        if (!path) goto('/projects')
        else goto(path)
      },
    })
  }

  let detailsOpen = false
  function toggleDetails() {
    if (detailsOpen) {
      //close

      gsap.to('#textDetails', {
        opacity: 1,
        duration: 0.2,
        ease: 'Sine.easeOut',
        delay: 0.4,
      })
      gsap.to('#detailsCard', {
        left: '-90%',
        ease: 'Power2.easeOut',
        borderTopRightRadius: '6rem',
        borderBottomRightRadius: '6rem',
        duration: 0.3,
        onComplete: () => {
          gsap.to(
            [document.querySelectorAll('h4'), document.querySelectorAll('h3')],
            {
              opacity: 0,
              stagger: 0.02,
              ease: 'Power4.out',
              duration: 0.2,
            }
          )
        },
      })
    } else {
      //open

      gsap.to('#textDetails', {
        opacity: 0,
        duration: 0.2,
        ease: 'Sine.easeOut',
        delay: 0.2,
      })
      gsap.to('#detailsCard', {
        left: '0',
        ease: 'Power2.easeOut',
        borderTopRightRadius: '2rem',
        borderBottomRightRadius: '2rem',
        duration: 0.3,
        onComplete: () => {
          gsap.to(
            [document.querySelectorAll('h3'), document.querySelectorAll('h4')],
            {
              opacity: 1,
              stagger: 0.03,
              delay: 0.1,
              ease: 'Power4.out',
              duration: 0.5,
            }
          )
        },
      })
    }
    detailsOpen = !detailsOpen
  }
</script>

<Portal>
  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="modal-details" class="modal-toggle" />
  <label for="modal-details" class="modal cursor-pointer z-[99999999999999]">
    <label class="relative modal-box" for="">
      <label
        for="modal-details"
        class="absolute btn btn-sm btn-circle right-2 top-2">✕</label
      >
      <div class="flex flex-col gap-8">
        <div class="flex gap-24">
          <div>
            <h3
              class="mb-0.5 text-md font-medium tracking-widest text-gray-300 font-bebasNeue"
            >
              Type
            </h3>
            <h4 class="text-sm tracking-wide text-white font-quicksand">
              {type}
            </h4>
          </div>
          <div>
            <h3
              class="mb-0.5 text-md font-medium tracking-widest text-gray-300 font-bebasNeue"
            >
              Completed
            </h3>
            <h4 class="text-sm tracking-wide text-white font-quicksand">
              {completed}
            </h4>
          </div>
        </div>
        <div>
          <h3
            class="mb-0.5 text-md font-medium tracking-widest text-gray-300 font-bebasNeue"
          >
            Client
          </h3>
          <h4 class="text-sm tracking-wide text-white font-quicksand">
            {client}
          </h4>
        </div>
        <div>
          <h3
            class="mb-0.5 text-md font-medium tracking-widest text-gray-300 font-bebasNeue"
          >
            Description
          </h3>
          <h4
            class="text-sm tracking-wide text-white font-quicksand max-w-[55ch] overflow-hidden text-justify leading-6"
          >
            {description}
          </h4>
        </div>
      </div>
    </label>
  </label>

  <button
    on:mousedown={() => {
      outroAnimation()
    }}
    id="backToProjects"
    class="md:invisible btn btn-sm text-xs btn-circle absolute top-2 left-3 z-[9999999999999] text-[var(--color)] border-none opacity-0"
  >
    <svg
      class="w-5 h-5"
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="arrowLeftTopIconTitle"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="square"
      stroke-linejoin="miter"
      fill="none"
    >
      <title id="arrowLeftTopIconTitle" /> <path d="M5 13V5h8" />
      <path stroke-linecap="round" d="M5 5l1 1" /> <path d="M6 6l13 13" />
    </svg>
  </button>

  <div
    class="fixed w-screen h-screen flex justify-center top-0 left-0 z-[9999999999] pointer-events-none"
  >
    <div
      id="titleCard"
      class="w-max h-max rounded-b-[10rem] relative flex justify-center items-center"
    >
      <div
        class="w-max px-12 py-2 xl:py-3 h-max rounded-b-[20rem] bg-[#151517]/60"
      >
        <h1
          data-value={title}
          use:viewport
          on:enterViewport={hackEffect}
          id="title"
          class="text-2xl font-bold tracking-widest text-white md:text-4xl lg:text-6xl font-bebasNeue whitespace-nowrap"
        >
          {title}
        </h1>
      </div>
    </div>
  </div>

  {#if !$isMobile}
    <div
      id="detailsPosition"
      class="absolute w-max h-screen flex flex-col justify-between py-8 top-0 left-0 z-[9999999999]"
    >
      <div
        on:mousedown={() => {
          outroAnimation()
        }}
        class="ml-[5%] links border-b border-[#d1d5db] max-w-max flex items-center gap-1 font-bebasNeue text-gray-300 tracking-widest cursor-pointer"
      >
        <svg
          width="14px"
          height="14px"
          viewBox="0 0 24 24"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="arrowLeftTopIconTitle"
          stroke="#d1d5db"
          stroke-width="3"
          stroke-linecap="square"
          stroke-linejoin="miter"
          fill="none"
          color="#d1d5db"
          class="mb-1"
        >
          <title id="arrowLeftTopIconTitle" /> <path d="M5 13V5h8" />
          <path stroke-linecap="round" d="M5 5l1 1" /> <path d="M6 6l13 13" />
        </svg>
        <p>Back to projects</p>
      </div>

      <div
        on:mousedown={toggleDetails}
        id="detailsCard"
        class="flex items-center relative p-8 h-max w-max rounded-r-[6rem] -left-[200%] cursor-pointer duration-300 transition-all {!detailsOpen
          ? 'hover:translate-x-8'
          : 0}"
      >
        <div
          id="textDetails"
          style="writing-mode: vertical-rl;
      text-orientation: upright;"
          class="absolute text-2xl font-bold right-5 font-bebasNeue"
        >
          DETAILS
        </div>
        <div class="flex flex-col gap-8">
          <div class="flex gap-24">
            <div>
              <h3
                class="mb-0.5 text-lg font-medium tracking-widest text-gray-300 font-bebasNeue opacity-0"
              >
                Type
              </h3>
              <h4
                class="tracking-wide text-white opacity-0 text-md font-quicksand"
              >
                {type}
              </h4>
            </div>
            <div>
              <h3
                class="mb-0.5 text-lg font-medium tracking-widest text-gray-300 font-bebasNeue opacity-0"
              >
                Completed
              </h3>
              <h4
                class="tracking-wide text-white opacity-0 text-md font-quicksand"
              >
                {completed}
              </h4>
            </div>
          </div>
          <div>
            <h3
              class="mb-0.5 text-lg font-medium tracking-widest text-gray-300 font-bebasNeue opacity-0"
            >
              Client
            </h3>
            <h4
              class="tracking-wide text-white opacity-0 text-md font-quicksand"
            >
              {client}
            </h4>
          </div>
          <div>
            <h3
              class="mb-0.5 text-lg font-medium tracking-widest text-gray-300 font-bebasNeue opacity-0"
            >
              Description
            </h3>
            <h4
              class="text-md tracking-wide text-white font-quicksand max-w-[55ch] overflow-hidden text-justify leading-6 opacity-0"
            >
              {description}
            </h4>
          </div>
        </div>
      </div>

      <div
        class="ml-[5%] border-b border-[#d1d5db] max-w-max links font-bebasNeue text-gray-300 tracking-widest"
      >
        {#if link}
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            class="flex items-center gap-1"
            >visit site
            <svg
              width="14px"
              height="14px"
              viewBox="0 0 24 24"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="arrowRightTopIconTitle"
              stroke="#d1d5db"
              stroke-width="3"
              stroke-linecap="square"
              stroke-linejoin="miter"
              fill="none"
              color="#d1d5db"
              class="mb-1"
            >
              <title id="arrowRightTopIconTitle">Arrow Right Top</title>
              <path d="M19 13V5h-8" />
              <path stroke-linecap="round" d="M19 5l-1 1" />
              <path d="M18 6L5 19" />
            </svg>
          </a>
        {/if}
      </div>
    </div>
  {:else}
    <div
      in:fly={{ y: 200, duration: 1000, delay: 500 }}
      class="btm-nav btm-nav-lg z-[9999999] rounded-t-[2rem]"
    >
      {#if link}
        <a
          class="text-[var(--color)]"
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667ZM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94Zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13ZM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333A8.008 8.008 0 0 0 4.062 11Zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248A15.905 15.905 0 0 0 10.03 11Zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667Z"
            /></svg
          >

          <span class="font-medium tracking-wide btm-nav-label font-bebasNeue"
            >VISIT SITE</span
          >
        </a>
      {/if}

      <button class="text-[var(--color)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        <label
          for="modal-details"
          class="font-medium tracking-wide btm-nav-label font-bebasNeue"
          >DETAILS</label
        >
      </button>
      <button on:click={gotoNext} class="text-[var(--color)]">
        <svg
          class="w-5 h-5"
          viewBox="0 0 24 24"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="arrowRightTopIconTitle"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="square"
          stroke-linejoin="miter"
          fill="none"
        >
          <title id="arrowRightTopIconTitle">Arrow Right Top</title>
          <path d="M19 13V5h-8" />
          <path stroke-linecap="round" d="M19 5l-1 1" />
          <path d="M18 6L5 19" />
        </svg>
        <span class="font-medium tracking-wide btm-nav-label font-bebasNeue"
          >NEXT PROJECT</span
        >
      </button>
    </div>
  {/if}
</Portal>

<Portal target="#backgroundColorProjects">
  <div
    id="frontElement"
    class=" flex w-screen h-screen absolute bg-[#151517]/90 gap-8 pr-6 overflow-x-hidden md:flex-nowrap flex-wrap"
  />
</Portal>

<SingleProjectThree bind:outro {pictures} {video} {gameVideo} {titlePicture} />

<!-- <div
    class="absolute w-screen flex flex-col h-screen pl-6 lg:pl-[5%] gap-5 justify-between py-8 md:w-auto z-[99999999999999999999999]"
  >
    <div
      on:mousedown={() => {
        outroAnimation()
      }}
      class="links border-b border-[#d1d5db] max-w-max flex items-center gap-1 font-bebasNeue text-gray-300 tracking-widest cursor-pointer"
    >
      <svg
        width="14px"
        height="14px"
        viewBox="0 0 24 24"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="arrowLeftTopIconTitle"
        stroke="#d1d5db"
        stroke-width="3"
        stroke-linecap="square"
        stroke-linejoin="miter"
        fill="none"
        color="#d1d5db"
        class="mb-1"
      >
        <title id="arrowLeftTopIconTitle" /> <path d="M5 13V5h8" />
        <path stroke-linecap="round" d="M5 5l1 1" /> <path d="M6 6l13 13" />
      </svg>
      <p>Back to projects</p>
    </div>

    <div
      class="border-b border-[#d1d5db] max-w-max links font-bebasNeue text-gray-300 tracking-widest"
    >
      {#if link}
        <a
          href={link}
          target="_blank"
          class="flex items-center gap-1"
          rel="noreferrer"
          >visit site
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="arrowRightTopIconTitle"
            stroke="#d1d5db"
            stroke-width="3"
            stroke-linecap="square"
            stroke-linejoin="miter"
            fill="none"
            color="#d1d5db"
            class="mb-1"
          >
            <title id="arrowRightTopIconTitle">Arrow Right Top</title>
            <path d="M19 13V5h-8" />
            <path stroke-linecap="round" d="M19 5l-1 1" />
            <path d="M18 6L5 19" />
          </svg>
        </a>
      {/if}
    </div>
  </div> -->

<style>
  :global(canvas) {
    touch-action: none;
  }

  :global(#detailsCard, .btm-nav, #backToProjects) {
    /* From https://css.glass */
    background: rgba(0, 0, 0, 0.6) !important;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
    backdrop-filter: blur(20px) !important;
    filter: drop-shadow(2px 2px 10px #151517) !important;
    -webkit-backdrop-filter: blur(20px) !important;
  }

  :global(#titleCard) {
    filter: drop-shadow(2px 2px 10px #151517);
  }
</style>
