const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {},
    fontFamily: {
      bebasNeue: ['Bebas Neue'],
      quicksand: ['Quicksand'],
    },
  },

  plugins: [require('daisyui')],
}

module.exports = config
