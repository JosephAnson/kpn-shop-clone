export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'kpn-coding-challenge',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/i18n'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    'nuxt-windicss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://github.com/LinusBorg/portal-vue
    'portal-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/anteriovieira/nuxt-material-design-icons
    'nuxt-material-design-icons',
    // i18n
    [
      '@nuxtjs/i18n',
      {
        strategy: 'no_prefix',
        vueI18nLoader: true,
        fallbackLocale: 'nl',
        locales: [
          {
            name: 'Nederlands',
            code: 'nl',
            file: 'nl-NL.js'
          },
          {
            name: 'English',
            code: 'en',
            file: 'en-US.js',
            icon: 'gb'
          }
        ],
        silentFallbackWarn: true,
        defaultLocale: 'en',
        lazy: true,
        langDir: 'lang/',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_lang',
          alwaysRedirect: true
        }
      }
    ],
    // import modules https://vueschool.io/articles/vuejs-tutorials/domain-driven-design-in-nuxt-apps/
    '~/modules/phones/index.js'
  ],

  // Router Config
  router: {
    extendRoutes(routes) {
      routes.push({
        name: 'index',
        path: '/',
        redirect: '/phones'
      });
    }
  },

  serverMiddleware: [{ path: '/api', handler: '~/server-middleware/products.js' }],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
