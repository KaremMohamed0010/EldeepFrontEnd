<template>
  <div class="pt-[20px]">
    <!-- delivery department -->
    <DeliveryDepartment />
    <!-- pricing department -->
    <PricingDepartment />
    <!-- purchasing department -->
    <PurchasingDepartment />
    <!-- Requester department -->
    <RequesterDepartment />
    <!-- sales department -->
    <SalesDepartment />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // change language
    this.lang = localStorage.getItem("lang");
    if (this.lang == "en") {
      this.$i18n.locale = "en";
    } else if (this.lang == "ar") {
      this.$i18n.locale = "ar";
    }
  },
  methods: {},
};
</script>
<style scoped>
/* response time */
</style>
