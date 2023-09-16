<template>
  <div :class="[{ ltr: lang === 'en', rtl: lang === 'ar' }]">
    <div v-if="loading" class="flex justify-center" style="padding-top: 40px">
      <Loading :text="'Loading'" />
    </div>
    <div v-if="loading == false" class="" :class="{ hidden: loading == true }">
      <div class="flex nuxt-app">
        <VerticalNavBar v-if="this.$route.path != '/'" />
        <div class="flex w-[100%] flex-col">
          <HorizontalNavBar v-if="this.$route.path != '/'" />
          <Nuxt />
        </div>
      </div>
    </div>
    <div
      v-if="loading == false && this.$route.path == '/'"
      class="blur-login-image justify-center flex-col mt-[150px]"
    >
      <img
        src="../assets/imgs/comman/desktopLogin-removebg-preview.png"
        alt="Blur Login"
      />
      <div>
        <h1 class="text-center open-website mt-[30px]">
          {{ $t("Please Try to Open El-Deep Website with Your Own Laptop") }}
        </h1>
      </div>
    </div>
    <div
      v-if="loading == false && this.$route.path != '/'"
      class="blur-login-image justify-center flex-col mt-[150px]"
    >
      <img
        src="../assets/imgs/comman/Screenshot_from_2023-08-19_02-01-52-removebg-preview.png"
        alt="Blur Login"
      />
      <div>
        <h1 class="text-center open-website mt-[30px]">
          {{ $t("Please Try to Open El-Deep Website with Your Own Laptop") }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      lang: "en",
    };
  },
  mounted() {
    setTimeout(() => {
      console.log("loading:", this.loading);
       this.loading = false;
    }, 2000);
    this.lang = localStorage.getItem("lang");
    if (this.lang == "en") {
      this.$i18n.locale = "en";
    } else if (this.lang == "ar") {
      this.$i18n.locale = "ar";
    }
  },
  created() {
    if (this.$cookies.get("token")) {
      return;
    } else if (!this.$cookies.get("token")) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
@media screen and (max-width: 1100px) {
  .blur-login-image {
    display: flex;
  }
  .nuxt-app {
    display: none;
  }
}

/* Optional: Hide the image by default on larger screens */
@media screen and (min-width: 1100px) {
  .blur-login-image {
    display: none;
  }
  .nuxt-app {
    display: flex;
  }
}
.open-website {
  color: #000;
  font-style: normal;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
}
</style>
