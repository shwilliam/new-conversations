const pkg = require('./package')

module.exports = {
  mode: 'spa',

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }
    ]
  },

  loading: { color: '#fff' },

  css: [
    './assets/styles/reset.css',
    './assets/styles/variables.css',
    './assets/styles/utilities.css',
    './assets/styles/fonts.css'
  ],

  plugins: [
  ],

  modules: [
  ],

  router: {
    middleware: 'router-auth'
  },

  build: {
    extend(config, ctx) {
      // eslint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
