<template>
  <div class="__nuxt-error-page">
    <div class="error">
      <div v-if="message == 'This page could not be found'">
        <div class="flex justify-center content-center flex-wrap">
          <p style="font-weight: 900;" class="font-sans text-[#d3394c] error-text">404</p>
        </div>
        <div class="title">{{ message }}</div>

        <button @click="refreshThePage" class="errorrrr">
          {{ $t("Go Back to The Home Page") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NuxtError",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    if (this.error.message) {
      console.log("error");
      localStorage.setItem("error", "yes");
      this.$router.push({
        name: "EXAMPLE",
        params: { errors: "123" },
      });

      return this.error.message || "Error";
    } else if (this.error == null) {
      console.log("not error");
      localStorage.setItem("error", "no");
    }
  },
  methods: {
    refreshThePage() {
      location.reload();
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      if (this.error.message) {
        localStorage.setItem("error", "yes");
        return this.error.message || "Error";
      } else {
        localStorage.setItem("error", "no");
      }
    },
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,minimum-scale=1.0",
        },
      ],
    };
  },
};
</script>

<style>
.__nuxt-error-page {
  padding: 1rem;
  background: #f7f8fb;
  color: #47494e;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.__nuxt-error-page .error {
  max-width: 450px;
}
.__nuxt-error-page .title {
  font-size: 1.5rem;
  margin-top: 15px;
  color: #47494e;
  margin-bottom: 8px;
}
.__nuxt-error-page .description {
  color: #7f828b;
  line-height: 21px;
  margin-bottom: 10px;
}
/* .__nuxt-error-page a {
  color: #7f828b !important;
  text-decoration: none;
} */
.__nuxt-error-page .logo {
  position: fixed;
  left: 12px;
  bottom: 12px;
}

.error-text {
  color: #d3394c;
  font-size: 130px;
  font-weight: 900;
}
.errorrrr {
  color: #d3394c;
}

@media (min-width: 768px) {
  .error-text {
    font-size: 220px;
      font-weight: 900;

  }
}
</style>
