// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@prisma/nuxt'],
  css: ['@/assets/css/main.css'],
  eslint: {
    config: {
      stylistic: true
    }
  },
  ui: {
    prefix: 'nui',
    colorMode: false
  }
})