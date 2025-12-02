// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    head: {
      title: '??'
    }
  },

  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  css: ['~/styles/main.scss'],

  components: [
    { path: '~/components', pathPrefix: false, extensions: ['vue'] }
  ],

  typescript: {
    typeCheck: true
  },

  runtimeConfig: {
    public: {
      apiUrl: ''
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils'
  ],
  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/styles/foundations/functions" as *;
            @use "@/styles/foundations/variables" as *;
            @use "@/styles/foundations/mixins" as *;
          `
        }
      }
    }
  }
})