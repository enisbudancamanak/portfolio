<script>
  import Portal from 'svelte-portal'
  import { Gradient } from '../../gradient.js'
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { beforeNavigate, goto } from '$app/navigation'
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
  import SplitType from 'split-type'

  onMount(() => {
    const gradient = new Gradient()
    gradient.initGradient('#gradient-canvas')

    new SplitType('.headline')
    new SplitType('.subheadline')
    gsap.to('.headline .char', {
      y: 0,
      stagger: 0.02,
      delay: 0.2,
      duration: 0.1,
      ease: 'Power4.in',
    })

    gsap.to('.subheadline .char', {
      y: 0,
      stagger: 0.005,
      delay: 0.8,
      duration: 0.1,
      ease: 'Power4.in',
    })

    gsap.from('#bottomBar', {
      y: 200,
      duration: 1,
      delay: 1,
      ease: 'Power4.in',
    })

    gsap.from('#content', {
      padding: 0,
      duration: 1,
      ease: 'Power4.out',
    })

    gsap.from('#gradient-canvas', {
      opacity: 0,
      duration: 3,
      ease: 'Power4.in',
    })
  })

  let animateTime = false
  beforeNavigate((navigation) => {
    if (navigation.from?.route.id != navigation.to?.route.id)
      if (!animateTime) {
        animateTime = true
        navigation.cancel()

        gsap.to('#content', {
          padding: 0,
          duration: 0.6,
          ease: 'Power4.out',
        })

        gsap.to('#gradient-canvas', {
          opacity: 0,
          duration: 0.5,
          ease: 'Power4.out',
          onComplete: () => {
            goto(navigation.to?.route.id)
          },
        })

        gsap.to(
          [
            '.headline',
            '.subheadline',
            document.querySelectorAll('h3'),
            '#bottomBar',
          ],
          {
            opacity: 0,
            duration: 0.2,
            ease: 'Power4.in',
          }
        )
      }
  })

  function outFunc() {
    document.getElementById('tooltip').innerHTML = 'Copy mail to clipboard?'
  }

  function copyEmail() {
    document.getElementById('tooltip').innerHTML = 'Mail is copied!'
    document.addEventListener(
      'copy',
      function (e) {
        e.clipboardData.setData('text/plain', 'Enis.Budancamanak@hotmail.com')
        e.preventDefault()
      },
      true
    )
    document.execCommand('copy')
  }
</script>

<!-- //data-js-darken-top -->
<Portal>
  <div class="absolute z-[99999999] w-screen h-screen px-4 pt-8 pb-40 xl:p-24">
    <div class="w-full h-full overflow-x-hidden overflow-y-scroll">
      <div
        class="flex items-center justify-center w-full h-full text-center text-white"
      >
        <div
          class="font-medium tracking-wide text-7xl max-w-max md:text-9xl font-bebasNeue"
        >
          <h1 class="pr-0 md:pr-36 headline">HELLO AGAIN</h1>
          <h1 class="md:-mt-6 md:-mb-6 md:pl-64 headline">MY NAME</h1>
          <div class="flex gap-2 md:pl-32">
            <h1 class="headline">IS ENIS</h1>
            <h2
              class="text-left subheadline text-sm md:text-xl max-w-[31ch] tracking mt-1 md:mt-2"
            >
              I am a multidisciplinary developer based in Germany
            </h2>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col w-full h-full gap-2 px-4 pt-8 pb-402 md:gap-0 md:justify-between xl:p-24"
      >
        <div>
          <h3
            class="font-medium tracking-wide text-white text-7xl md:text-8xl font-bebasNeue"
          >
            A LITTLE ABOUT ME
          </h3>
        </div>
        <div class="self-end">
          <h3
            class="text-xl md:text-3xl font-medium tracking-wide text-white font-bebasNeue max-w-[54ch]"
          >
            I'VE BEEN developing for 6 years and am currently pursuing a degree
            in Media Informatics at the University of Applied Sciences in
            Bremen. My passion lies in creating visually stunning 3D web
            experiences. I place great emphasis on ensuring that my work is of
            the highest quality. With each new project, I strive to push my
            limits even further and learn new and modern techniques to achieve
            my goals.
          </h3>
        </div>
      </div>
      <div
        class="flex flex-col justify-between w-full px-4 pt-8 mb-24 md:mb-0 xl:p-24 h-max"
      >
        <div />
        <div class="flex flex-col items-center w-full xl:items-start">
          <h3
            class="font-medium tracking-wide text-white text-6xl md:text-8xl font-bebasNeue max-w-[17ch]"
          >
            <div class="avatar">
              <div class="w-24 rounded-full md:w-36">
                <img src="/pictures/aboutMe_Pic.png" />
              </div>
            </div>
            FEEL FREE TO CONTACT ME!
          </h3>
          <div class="visible mb-14 md:hidden">
            <LottiePlayer
              src="https://assets10.lottiefiles.com/packages/lf20_ppjmx2th.json"
              autoplay={true}
              loop={true}
              renderer="svg"
              background="transparent"
              height={100}
              width={100}
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="content" class="absolute w-screen h-screen px-4 pt-4 pb-40 xl:p-24">
    <canvas
      id="gradient-canvas"
      class="z-0 rounded-xl opacity-90"
      data-transition-in
      data-js-darken-top
    />
  </div>

  <div
    id="bottomBar"
    class="flex justify-between items-center w-screen p-6 xl:px-28 xl:py-8 z-[999999999999999999] absolute bottom-0"
  >
    <div class="tooltip">
      <button
        class="link"
        on:pointerdown={copyEmail}
        on:pointerleave={outFunc()}
      >
        <span class="tooltiptext" id="tooltip">Copy mail to clipboard?</span>
        <span
          class="text-xl text-white transition-all duration-300 cursor-pointer md:text-3xl cc-text font-bebasNeue hover:underline"
          >ANY QUESTIONS? CONTACT ME</span
        >
      </button>
    </div>

    <!-- <h1
      on:pointerdown={copyEmail}
      id="email"
      class="text-3xl text-white transition-all duration-300 cursor-pointer font-bebasNeue hover:underline"
    >
      COPY MAIL?
    </h1> -->
    <div class="text-xl text-white font-bebasNeue">
      <a href="">IMPRESSUM</a>
      |
      <a href="">PRIVACY</a>
    </div>
  </div>
</Portal>

<style>
  :global(#gradient-canvas) {
    width: 100%;
    height: 100%;
    --gradient-color-1: #6e41ca;
    --gradient-color-2: #9b89b3;
    --gradient-color-3: #9d9b9f; /*//fcf7ff*/
    --gradient-color-4: #d730ab;
  }

  :global(.char) {
    transform: translateY(140px);
    transition: transform 0.5s;
  }

  :global(.headline, .subheadline) {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }

  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    display: none;
  }

  .tooltip {
    display: inline-block;
  }
  .cc-text {
    text-transform: uppercase;
  }
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 100%;
    background-color: white;
    color: #151517;
    text-align: center;
    padding: 7px 0;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 12px;
    letter-spacing: 1px;
  }
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
    animation: enter 0.35s ease infinite alternate;
  }
  @keyframes enter {
    from {
      transform: translateY(10px);
    }
    to {
      transform: translateY(6px);
    }
  }

  .tooltip .tooltiptext::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-color: white transparent transparent transparent;
  }

  .link:hover::after {
    width: 100%;
  }
</style>
