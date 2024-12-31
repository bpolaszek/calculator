// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icon',
    '@vite-pwa/nuxt'
  ],
  runtimeConfig: {
    public: {
      maxHistorySize: 50
    }
  },
  pwa: {
    manifest: {
      name: 'Calculator PWA',
      short_name: 'Calc',
      description: 'A modern calculator with history',
      theme_color: '#323232',
      background_color: '#111827',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    vueI18n: './i18n.config.ts'
  }
})