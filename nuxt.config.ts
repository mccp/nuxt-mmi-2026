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

  sanity: {
    projectId: 'rwem0xku',
    dataset: 'production',
    visualEditing: {
      token: process.env.NUXT_SANITY_API_TOKEN, // required
      studioUrl: process.env.NUXT_SANITY_STUDIO_URL, // required
      stega: false
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: ''
    }
  },
  
  vite: {
    optimizeDeps: {
      include: ['react-compiler-runtime', 'react', 'react-dom']
    },
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
  
  },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/test-utils', '@nuxtjs/sanity']
})