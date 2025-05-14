import { dark } from "@clerk/themes";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      bucketPrefixUrl: process.env.R2_BUCKET_PUBLIC_URL
    }
  },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@prisma/nuxt', '@clerk/nuxt'],
  css: ['@/assets/css/main.css'],
  eslint: {
    config: {
      stylistic: true
    }
  },
  ui: {
    prefix: 'nui'
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
