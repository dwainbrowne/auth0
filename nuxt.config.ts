// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  plugins: ['~/plugins/auth0.client.ts'],
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
 runtimeConfig: {
    public: {
      auth0Domain: process.env.AUTH0_DOMAIN,
      auth0ClientId: process.env.AUTH0_CLIENT_ID,
      auth0Audience: process.env.AUTH0_AUDIENCE,
     
    }
  },
})