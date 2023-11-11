export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  error: "~/pages/nuxt-error.vue",
  head: {
    title: "El-Deep",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/axios",
    { src: "~/plugins/apexcChart.js", mode: "client" },
   
    // Other plugins
  ], // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/fontawesome",
    "@nuxtjs/axios",
  ],

  // FOnt Awesome
  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },

  script: [
    {
      body: true,
      src: "https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js",
    },
  ],

  // i18n: {
  //   locales: ["en", "ar"],
  //   defaultLocale: "en",
  //   vueI18n: {
  //     fallbackLocale: "en",
  //     messages: {
  //       en: require("./locales/en.json"),
  //       ar: require("./locales/ar.json"),
  //     },
  //   },
  // },

  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: require("./locales/en.json"),
        ar: require("./locales/ar.json"),
      },
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "nuxt-i18n",
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    [
      "vue-toastification/nuxt",
      {
        timeout: 3000,
        draggable: false,
        position: "top-center",
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ["vue-apexchart"],
    
  },
  axios: {
    baseURL: "https://admin.eldeepauto.net/api",
  },
};
