// nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },

  components: true,

  runtimeConfig: {
    public: {
      apiToken: process.env.NUXT_API_TOKEN, // API token from .env
      apiUrl: process.env.NUXT_API_URL,
    },
  },

  devtools: { enabled: true },
  compatibilityDate: "2024-10-20",
});
