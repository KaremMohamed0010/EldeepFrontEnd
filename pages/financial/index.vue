<template>
  <div :class="lang == 'en' ? 'ml-[68px]' : 'mr-[68px]'" class="p-[12px]">
    <div v-if="loading == true" class="flex justify-center w-[100%]">
      <Loading :text="'Loading'" />
    </div>
    <div
      v-if="loading == false && financial.length > 0"
      class="p-[20px] bg-table"
    >
      <div class="p-[20px] flex justify-between">
        <div class="flex">
          <h1 class="total-request">{{ $t("total_request") }}</h1>
          <span class="total-request-number">
            {{ financial.length }} {{ $t("Request") }}</span
          >
        </div>
      </div>
      <!-- add new parts -->
      <div class="table-container overflow-x-auto">
        <table class="min-w-full leading-normal table-style">
          <thead>
            <tr>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex"></div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap table-headers">
                      {{ $t("Serial") }}
                    </p>
                  </div>
                </div>
              </td>
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
                  {{ $t("customer_name") }}
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
                  {{ $t("Pricing group") }}
                </p>
              </td>
               <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Price") }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Payment Term") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("customer Code") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Approval") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers"></p>
              </td>
            </tr>
          </thead>
          <tbody v-for="(data, index) in financial" :key="index">
            <tr>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex"></div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex"></div>
              </td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>

              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>

              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                --
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                --
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                --
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                --
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                --
              </td>
            </tr>
            <tr v-for="(price, i) in data.QuoteParts" :key="i">
              <td></td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ price.SerialPart }}
                    </p>
                  </div>
                </div>
              </td>
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
                  {{ price.CustomerName }}
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
                  v-if="price.VinNumber != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.VinNumber }}
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
                  v-if="price.model != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.model }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="relative">
                  <select
                    style="padding: 12px"
                    v-model="pricing_group[index + i]"
                    class="border-select w-[153px] py-1 p-[12px] px-2 bg-white"
                    name="whatever"
                    id="frm-whatever"
                  >
                    <option value="100">100</option>
                    <option value="130">130</option>
                    <option value="140">140</option>
                  </select>
                </div>
              </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.Price != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.Price }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.PaymentMethod != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.PaymentMethod }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="relative">
                  <select
                    style="padding: 12px"
                    v-model="customer_id[index + i]"
                    class="border-select w-[153px] py-1 p-[12px] px-2 bg-white"
                    name="whatever"
                    id="frm-whatever"
                  >
                    <option
                      v-for="(customer, i) in Customers"
                      :value="customer.id"
                      :key="i"
                    >
                      {{ customer.customer_code }}
                    </option>
                  </select>
                </div>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="relative">
                  <label
                    :for="`toggle` + price.Id"
                    class="flex items-center cursor-pointer"
                  >
                    <input
                      v-model="approve[index + i]"
                      type="checkbox"
                      :id="`toggle` + price.Id"
                      class="sr-only peer"
                    />
                    <div
                      class="block relative bg-[#D1D1D1] w-16 h-9 p-1 rounded-full before:absolute before:bg-[#394889] before:w-7 before:h-7 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-8 peer-checked:bg-[#394889] peer-checked:before:bg-white"
                    ></div>
                  </label>
                </div>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                  :disabled="loading"
                  :class="{
                    'cusror-disabled': loading,
                  }"
                  @click="saveFinancial(price.Id , index)"
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
    <div v-else-if="loading == false && financial.length == 0" class="w-[100%]">
      <div class="flex justify-center mt-[135px]">
        <img
          src="../../assets/imgs/comman/no-data-empty-data-concept-vector-41830412-removebg-preview.png"
          alt=""
        />
      </div>
      <h1 class="text-center no-data">
        {{ $t("There is No Financial") }}
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
      showInformation: true,
      showPayemnt: false,
      showVichels: false,

      model: null,
      part_name_ar: null,
      part_numberr: null,
      vat_number: null,
      breakable: false,
      warranty: false,
      fieldCount: 1,
      emptyField: "",
      alternatives: [{ alternative_id: 1, code: "" }],
      dimensions: null,
      national_id: null,
      unit: null,

      financial: [],
      loading: true,
      hasMorePages: true,
      currentPage: 1,
      partsTable: [],
      vendorTable: [],
      locations: [],

      part_number: [],
      vendor_id: [],
      location_id: [],
      pricing_group: [],
      customer_id: [],
      pricee: [],
      request: "",
      lastCounts: {}, // Object to store last counts for each pricing index
      Customers: [],
      approve: [],
    };
  },
  components: {
    Multiselect,
  },
  mounted() {
    // get all Pricing

    this.$axios.$post("/Financial/GetFinancialRequest").then((res) => {
      this.request = res.totalRequests;
      this.financial = res.quotes.data;
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
    // get all customers

    this.$axios.$get("UnPaginated/allCustomerWithout").then((res) => {
      this.Customers = res.Customers;
    });
  },
  created() {},
  methods: {
    // toggle modal add new price
    addNewPrice(status, id) {
      document.getElementById(`addPrice` + id).classList.toggle("hidden");
    },
    // show more
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    },
    saveFinancial(id , index) {
      let data = {
        customer_id: this.customer_id[index],
        pricing_group: this.pricing_group[index],
        request_approve_status: this.approve[index],
      };
      this.$axios.$post(`Financial/UpdateFinancial/${id}`, data).then((res) => {
        if (res.status == 200) {
          this.$toast.success("saved Successfully");
          this.$axios.$post("/Financial/GetFinancialRequest").then((res) => {
            this.request = res.totalRequests;
            this.financial = res.quotes.data;
            this.totalPages = res.quotes.meta.last_page;
            this.perPage = res.quotes.meta.per_page;
            this.total = res.quotes.meta.total;
            this.loading = false;
          });
        }
      });
    },
  },
  watch: {
    // currect page
    currentPage(value) {
      console.log(value);

      this.$axios
        .$post(`/Pricing/GetPricingRequest?page=${value}`)
        .then((res) => {
          this.request = res.TotalRequest;
          this.pricing = res.quotes.data;
          this.totalPages = res.quotes.meta.last_page;
          this.perPage = res.quotes.meta.per_page;
          this.total = res.quotes.meta.total;
          this.loading = false;
        });
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
.total-request-number {
  border-radius: 6px;
  background: var(--colors-primary-slate-50, #f0f3f9);
  display: flex;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-left: 13px;
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
  margin-left: 83px;
}
.arrow-select-arrabic {
  position: absolute;
  margin-top: 19px;
  width: 20px;
  margin-left: 15px;
}
.arrow-select-vendor {
  position: absolute;
  margin-top: 19px;
  width: 20px;
  margin-left: 118px;
}
.arrow-select-vendor-arabic {
  position: absolute;
  margin-top: 19px;
  width: 20px;
  margin-left: 15px;
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
  left: 655px;
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
