import { dark } from "@clerk/themes";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-13',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'es'
      }
    }
  },
  runtimeConfig: {
    public: {
      bucketPrefixUrl: process.env.R2_BUCKET_PUBLIC_URL
    }
  },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@prisma/nuxt', '@clerk/nuxt', 'motion-v/nuxt'],
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    },
  },
  css: ['@/assets/css/main.css'],
  eslint: {
    config: {
      stylistic: true
    }
  },
  ui: {
    fonts: false,
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  clerk: {
    appearance: {
      baseTheme: dark
    }
  }
})
