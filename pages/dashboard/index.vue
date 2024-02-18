<template>
  <div class="pt-[20px]">
    <div v-if="loading" class="flex justify-center" style="padding-top: 40px">
      <Loading :text="'Loading'" />
    </div>
    <!-- delivery department -->
    <DeliveryDepartment v-if="loading == false" 
      :class="{ 'ml-[60px]': (lang = 'en'), 'mr-[60px]': (lang = 'ar') }"
    />
    <!-- pricing department -->
    <PricingDepartment v-if="loading == false" 
      :class="{ 'ml-[60px]': (lang = 'en'), 'mr-[60px]': (lang = 'ar') }"
    />
    <!-- purchasing department -->
    <PurchasingDepartment v-if="loading == false" 
      :class="{ 'ml-[60px]': (lang = 'en'), 'mr-[60px]': (lang = 'ar') }"
    />
    <!-- Requester department -->
    <RequesterDepartment v-if="loading == false" 
      :class="{ 'ml-[60px]': (lang = 'en'), 'mr-[60px]': (lang = 'ar') }"
    />
    <!-- sales department -->
    <SalesDepartment v-if="loading == false" 
      :class="{ 'ml-[60px]': (lang = 'en'), 'mr-[60px]': (lang = 'ar') }"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    // change language
    this.lang = localStorage.getItem("lang");
    if (this.lang == "en") {
      this.$i18n.locale = "en";
    } else if (this.lang == "ar") {
      this.$i18n.locale = "ar";
    }
    setTimeout(() => {
      console.log("loading:", this.loading);
      this.loading = false;
    }, 5000);
  },
  methods: {},
};
</script>
<style scoped>
/* response time */
</style>
