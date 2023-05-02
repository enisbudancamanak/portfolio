<script>
</script>

<div id="profileCard" class="z-[9999] btm-nav min-h-max py-20 rounded-t-[2rem]">
  <div class="absolute flex items-start w-screen pb-12 xl:pb-10 z-20 top-5">
    <div
      class="flex flex-col items-center gap-4 xl:gap-0 xl:flex-row xl:items-center xl:justify-around w-full flex-wrap"
    >
      <div class="flex items-center">
        <img src="logo.png" alt="" srcset="" class="w-16 xl:w-24 h-auto" />
        <div class="flex flex-col">
          <h1
            id="titleName"
            class="text-xl xl:text-3xl font-bold text-white font-quicksand"
          >
            Enis Budancamanak
          </h1>

          <h2
            class="text-lg xl:text-xl tracking-wider text-white font-quicksand"
          >
            Front End Developer
          </h2>
        </div>
      </div>
      <div
        class="flex gap-2 text-sm xl:gap-5 xl:text-lg font-semibold capitalize font-quicksand"
      >
        <h3 class="text-white">SvelteKit</h3>
        <h3 class="text-white">Angular</h3>
        <h3 class="text-white">ThreeJS - WebGL</h3>
        <h3 class="text-white">Unity</h3>
        <h3 class="text-white">& more</h3>
      </div>
      <div id="currentlyText" class="flex items-center gap-2">
        <span class="relative flex w-3 h-3">
          <span
            class="absolute inline-flex w-full h-full bg-pink-300 rounded-full opacity-75 animate-ping"
          />
          <span
            class="relative inline-flex w-3 h-3 bg-purple-500 rounded-full"
          />
        </span>
        <h4
          class="text-sm xl:text-lg tracking-wide text-white font-semibold font-quicksand"
        >
          in Bremen, Germany
        </h4>
      </div>
    </div>
  </div>

  <style>
  </style>
</div>

<style>
  #profileCard {
    /* From https://css.glass */
    background: rgba(0, 0, 0, 0.64);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
</style>
