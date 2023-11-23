<template>
  <div class="p-[12px]">
    <div v-if="loading == true" class="flex justify-center w-[100%]">
      <Loading :text="'Loading'" />
    </div>
    <div
      v-if="loading == false && pricing.length > 0"
      class="p-[20px] bg-table"
    >
      <div class="p-[20px]">
        <h1 class="total-request">{{ $t("total_request") }}</h1>
      </div>
      <div class="table-container overflow-x-auto">
        <table class="min-w-full leading-normal table-style">
          <thead>
            <tr>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap table-headers">
                      {{ $t("Req N.O.") }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Part Name") }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Condition") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("QTY") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Vin Car") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Car Type") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Model") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Part N.O.") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Vendor") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Location") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Pricing group") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Price") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers"></p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(price, index) in pricing" :key="index">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ price.Req_No }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ price.PartName }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ price.Condition }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ price.QTY }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.VinCar != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.VinCar }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.CarType != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.CarType }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.Model != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.Model }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="relative">
                  <img
                    :class="{
                      'arrow-select-arabic-city': lang == 'ar',
                    }"
                    class="arrow-select"
                    src="../../assets/imgs/comman/Icon.png"
                    alt=""
                  />
                  <select
                    v-model="city_name"
                    class="appearance-none border-select w-[117px] py-1 px-2 bg-white"
                    name="whatever"
                    id="frm-whatever"
                  >
                    <option v-for="(city, i) in cities" :value="city" :key="i">
                      {{ city }}
                    </option>
                  </select>
                </div>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="relative">
                  <img
                    :class="{
                      'arrow-select-arabic-city': lang == 'ar',
                    }"
                    class="arrow-select-vendor"
                    src="../../assets/imgs/comman/Icon.png"
                    alt=""
                  />
                  <select
                    v-model="city_name"
                    class="appearance-none border-select w-[153px] py-1 px-2 bg-white"
                    name="whatever"
                    id="frm-whatever"
                  >
                    <option v-for="(city, i) in cities" :value="city" :key="i">
                      {{ city }}
                    </option>
                  </select>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="relative">
                  <img
                    :class="{
                      'arrow-select-arabic-city': lang == 'ar',
                    }"
                    class="arrow-select arrow-select-vendor"
                    src="../../assets/imgs/comman/Icon.png"
                    alt=""
                  />
                  <select
                    v-model="city_name"
                    class="appearance-none border-select w-[153px] py-1 px-2 bg-white"
                    name="whatever"
                    id="frm-whatever"
                  >
                    <option v-for="(city, i) in cities" :value="city" :key="i">
                      {{ city }}
                    </option>
                  </select>
                </div>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="relative">
                  <img
                    :class="{
                      'arrow-select-arabic-city': lang == 'ar',
                    }"
                    class="arrow-select-vendor"
                    src="../../assets/imgs/comman/Icon.png"
                    alt=""
                  />
                  <select
                    v-model="city_name"
                    class="appearance-none border-select w-[153px] py-1 px-2 bg-white"
                    name="whatever"
                    id="frm-whatever"
                  >
                    <option v-for="(city, i) in cities" :value="city" :key="i">
                      {{ city }}
                    </option>
                  </select>
                </div>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <input
                  id="1"
                  type="text"
                  v-model="area"
                  placeholder=""
                  class="peer w-[120px] input-style h-10 rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                />
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                  :disabled="loading"
                  :class="{
                    'cusror-disabled': loading,
                  }"
                  @click="addNewLocation('close')"
                  class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                >
                  {{ $t("save") }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-[20px]">
        <pagination
          :total-pages="totalPages"
          :total="total"
          v-model="currentPage"
          :per-page="perPage"
          :current-page="currentPage"
          :has-more-pages="hasMorePages"
          @pagechanged="showMore"
        >
        </pagination>
      </div>
    </div>
    <div v-else-if="loading == false && pricing.length == 0" class="w-[100%]">
      <div class="flex justify-center mt-[135px]">
        <img
          src="../../assets/imgs/comman/no-data-empty-data-concept-vector-41830412-removebg-preview.png"
          alt=""
        />
      </div>
      <h1 class="text-center no-data">
        {{ $t("There is No Pricing") }}
      </h1>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  data() {
    return {
      pricing: [],
      loading: true,
      currentPage: 1,
    };
  },
  components: {
    Multiselect,
  },
  mounted() {
    // get all locations

    this.$axios.$post("/Pricing/GetPricingRequest").then((res) => {
      console.log(res);
      this.pricing = res.quotes.data;
      this.totalPages = res.quotes.meta.last_page;
      this.perPage = res.quotes.meta.per_page;
      this.total = res.quotes.meta.total;
      this.loading = false;
    });

    // tabs code
    this.lang = localStorage.getItem("lang");

    if (this.lang == "en") {
      this.$i18n.locale = "en";
    } else if (this.lang == "ar") {
      this.$i18n.locale = "ar";
    }

    this.open = localStorage.getItem("open");
  },
  methods: {
    // show more
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    },
  },
  watch: {
    // currect page
    currentPage(value) {
      console.log(value);
      this.$axios.$get(`/Location/GetAllLocation?page=${value}`).then((res) => {
        this.locations = res.Location.data;
        this.totalPages = res.Location.meta.last_page;
        this.perPage = res.Location.meta.per_page;
        this.total = res.Location.meta.total;
        this.permissions = res.permissions;
        this.loading = false;
      });

      this.$router.push({ path: "/locations", query: { page: value } });
    },
  },
};
</script>
<style scoped>
.total-request {
  color: var(--colors-primary-slate-600, #455468);
  /* Paragraph: 1/SemiBold */
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px; /* 159.091% */
  letter-spacing: -0.3px;
}
.active-user {
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  letter-spacing: -0.2px;
}
/* credit limit */
.credit-limit {
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 120% */
  letter-spacing: -0.2px;
}
/* dropdown s style */
/* dropdown  */
dropdown {
  /* display: inline-block; */
}
dropdown label,
dropdown ul li {
  display: block;
  width: 140px;
  height: 46px;
  background: #fff;
  padding: 10px;
  padding-left: 18px;
}
dropdown label:hover,
dropdown ul li:hover {
  text-decoration: underline;
  color: black;
  cursor: pointer;
}
dropdown label {
  border-radius: 20px;
  border: 1px solid var(--primary-dark-20, rgba(66, 66, 66, 0.2));
  background: var(--colors-base-00, #fff);
  /* Shadow/lg */
  box-shadow: 0px 8px 11px -4px rgba(45, 54, 67, 0.04),
    0px 20px 24px -4px rgba(45, 54, 67, 0.04);
  color: #000000;
  position: relative;
  z-index: 2;
}
dropdown input {
  display: none;
}
dropdown input ~ ul {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  top: -20px;
  z-index: 1;
}
dropdown input:checked + label {
  background: #ffffff;
  color: #000000;
}

dropdown input:checked ~ ul {
  visibility: visible;
  opacity: 1;
  top: 0;
}
/* select branch  */
.branches {
  display: block;
  width: 140px;
  height: 40px;
  background: #fff;
  padding: 10px;
  padding-left: 18px;
}

.animate {
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* Chrome and Safari */
  -moz-backface-visibility: hidden; /* Firefox */
  -ms-backface-visibility: hidden; /* Internet Explorer */
}
/* pagination styel */
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}
.w-fulll {
  width: 100%;
}
.remove-margin-left {
  padding-left: auto !important;
  padding-right: auto !important;
}
/* image style */

.btn {
  background-color: #d3394c;
  border: 0;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  padding: 15px 35px;
  position: relative;
}

.btn:hover {
  background-color: #722040;
}

input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.align-center {
  text-align: center;
}

.helper {
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  width: 0;
}

.hidden {
  display: none !important;
}

.hidden.image {
  display: inline-block !important;
}

.display-inline {
  display: inline-block;
  vertical-align: middle;
}

.img {
  border: 1px solid #f6f6f6;
  display: inline-block;
  height: auto;
  max-height: 80%;
  max-width: 80%;
  width: auto;
}

.drop {
  background-color: #f2f2f2;
  border: 4px dashed #ccc;
  background-color: #f6f6f6;
  border-radius: 2px;
  height: 100%;
  max-height: 400px;
  max-width: 600px;
  width: 100%;
}
.border-select {
  border-radius: 10px;
  border: 1px solid var(--primary-dark-20, rgba(66, 66, 66, 0.2));
  background: var(--colors-base-00, #fff);

  /* Shadow/lg */
  box-shadow: 0px 8px 11px -4px rgba(45, 54, 67, 0.04),
    0px 20px 24px -4px rgba(45, 54, 67, 0.04);
  color: var(--colors-primary-slate-400, #8897ae);

  /* Paragraph: 5/Medium */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
  letter-spacing: -0.2px;
}
/* arrow of select */
.arrow-select {
  position: absolute;
  margin-top: 19px;
  width: 20px;
  margin-left: 69px;
}
.arrow-select-vendor {
  position: absolute;
  margin-top: 19px;
  width: 20px;
  margin-left: 108px;
}
.arrow-select-arabic {
  position: absolute;
  right: 331px;
  left: 0px !important;
  margin-top: 19px;
  width: 20px;
}
.arrow-select-arabic-city {
  position: absolute;
  right: 655px;
  left: 0px !important;
  margin-top: 19px;
  width: 20px;
}
/* input type date  */
.date-input {
  border-radius: 20px;
  border: 1px solid var(--primary-dark-20, rgba(66, 66, 66, 0.2));
  background: var(--colors-base-00, #fff);

  /* Shadow/lg */
  box-shadow: 0px 8px 11px -4px rgba(45, 54, 67, 0.04),
    0px 20px 24px -4px rgba(45, 54, 67, 0.04);
}

/* profile picture */
.profile-pic {
  color: transparent;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  position: absolute;
  right: 60px;
  height: 165px;
  width: 165px;
  top: 120px;
}
.arabic-profile-pic {
  color: transparent;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  position: absolute;
  right: 570px;
  height: 165px;
  width: 165px;
  top: 120px;
}
.profile-pic input {
  display: none;
}
.profile-pic img {
  position: absolute;
  object-fit: cover;
  bottom: 0px;
  /* width: 165px;
  height: 165px; */
  /* box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.35); */
  border-radius: 20px;
  /* border: 3px solid var(--primary-dark-20, rgba(66, 66, 66, 0.2)); */
  z-index: 0;
}
.profile-pic .-label {
  cursor: pointer;
  height: 165px;
  width: 165px;
}
.profile-pic:hover .-label {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(235, 235, 235, 0.8);
  z-index: 10000;
  color: #fafafa;
  transition: background-color 0.2s ease-in-out;
  border-radius: 20px;
  margin-bottom: 0;
}
.profile-pic span {
  display: inline-flex;
  padding: 0.2em;
  height: 2em;
}
@media (max-width: 1550px) {
  .media {
    height: 650px;
    overflow-y: auto;
  }
}
.close-btn {
  border-radius: 10px !important;
}
.input-style {
  border-radius: 10px !important;
}
.table-container {
  overflow-x: auto;
}
</style>
