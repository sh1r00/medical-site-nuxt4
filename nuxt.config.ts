// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: true },

  modules: [
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-security',

  ],

  i18n: {
    strategy: 'prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'am', name: 'አማርኛ', file: 'am.json' },
    ],
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    devOptions: { enabled: false },
    manifest: { name: 'App', short_name: 'App', theme_color: '#000000', background_color: '#ffffff', display: 'standalone' },
    workbox: { globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2,json}'], navigateFallback: '/', cleanupOutdatedCaches: true, skipWaiting: true, clientsClaim: true,
      runtimeCaching: [
        { urlPattern: /\\.json$/, handler: 'StaleWhileRevalidate', options: { cacheName: 'i18n' } },
        { urlPattern: /\\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/, handler: 'CacheFirst', options: { cacheName: 'images' } },
        { urlPattern: /^https:\/\/fonts\\.googleapis\\.com/, handler: 'StaleWhileRevalidate', options: { cacheName: 'google-fonts' } },
        { urlPattern: /^https:\/\/fonts\\.gstatic\\.com/, handler: 'CacheFirst', options: { cacheName: 'google-webfonts' } },
      ],
    },
  },
  security: {
    headers: process.env.NODE_ENV === "development" ? false : {
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com', 'https://fonts.googleapis.com'],
        'img-src': ["'self'", 'data:', 'https:'],
        'connect-src': ["'self'"],
        'frame-src': ["'self'"],
        'frame-ancestors': ["'self'"],
        'base-uri': ["'self'"],
        'form-action': ["'self'"],
      },
    },
    rateLimiter: false,
    xssValidator: process.env.NODE_ENV !== "development",
  },

  app: {
    head: {
      title: 'MediCare Plus — Compassionate Healthcare for Every Family',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'MediCare Plus provides world-class healthcare services with compassion and excellence. Cardiology, neurology, pediatrics, and more.' },
        { name: 'theme-color', content: '#0d9488' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' },
      ],
    },
  },

  
  components: {
    dirs: [
      { path: '~/app/components/atoms', pathPrefix: false },
      { path: '~/app/components/molecules', pathPrefix: false },
      { path: '~/app/components/organisms', pathPrefix: false },
    ],
  },

  css: ['~/assets/css/main.css'],
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'pinia'],
    },
  },
})
