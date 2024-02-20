export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['./assets/index.css'],
  modules: ['@vueuse/nuxt', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Poppins: true,
    },
  },
});
