<template>
  <div :class="lang == 'en' ? 'ml-[68px]' : 'mr-[68px]'" class="p-[12px]">
    <div v-if="loading == true" class="flex justify-center w-[100%]">
      <Loading :text="'Loading'" />
    </div>
    <div
      v-if="loading == false && delivery.length > 0"
      class="p-[20px] bg-table"
    >
      <div class="p-[20px] flex justify-between">
        <div class="flex">
          <h1 class="total-request">{{ $t("total_request") }}</h1>
          <span class="total-request-number">
            {{ request }} {{ $t("Request") }}</span
          >
        </div>
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
                  {{ $t("Item") }}
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
                  {{ $t("Status") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Price") }}
                </p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(price, i) in delivery" :key="i">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ price.Serial }}
                    </p>
                  </div>
                </div>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ price.ItemName }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ price.Condition }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ price.Qty }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.VendorName != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.VendorName }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.Location != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.Location.country }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.Status == '0'"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  <span
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                    >{{ $t("Not Delivered") }}</span
                  >
                </p>
                <p
                  v-if="price.Status == '1'"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  <span
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                    >{{ $t("Delivered") }}</span
                  >
                </p>
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
    <div v-else-if="loading == false && delivery.length == 0" class="w-[100%]">
      <div class="flex justify-center mt-[135px]">
        <img
          src="../../assets/imgs/comman/no-data-empty-data-concept-vector-41830412-removebg-preview.png"
          alt=""
        />
      </div>
      <h1 class="text-center no-data">
        {{ $t("There is No Delivery") }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      delivery: [],
      loading: true,
      hasMorePages: true,
      currentPage: 1,

      // delivery data

      vendorTable: [],
      emptyField: "",

      locations: [],

      // data
      transmit_at: "",
      vendor_id: "",
      location_id: "",
      picker: "",
      deliver_to: "",
      check: false,
      Req_No: "",
      date: "",
      QTY: "",
      Price: "",
      prcing_group: "",
      lang: "",
    };
  },
  mounted() {
    // get all Pricing

    this.$axios.$get("/Order/GetDelivery").then((res) => {
      this.delivery = res.quoteParts.data;
        this.totalPages = res.quoteParts.meta.last_page;
        this.perPage = res.quoteParts.meta.per_page;
        this.total = res.quoteParts.meta.total;
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
  created() {},
  methods: {
    // show more
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    },
    // show picker
    showPicker(id, Price) {
      document.getElementById(`pick${id}`).classList.toggle("hidden");
      this.Req_No = Price.Req_No;
      this.QTY = Price.QTY;
      this.vendor_id = Price.Vendor;
      this.location_id = Price.Location;
      this.Price = Price.Price;
    },
    // save picker
    savePicker(id) {
      let data = {
        quotes_id: id,
        price: this.Price,
        delivery: this.deliver_to,
        pick: this.picker,
        location_id: this.location_id,
        vendor_id: this.vendor_id,
        due_date: this.date,
        quantity: this.QTY,
        transmition: this.transmit_at,
        check: this.check,
        req_no: this.Req_No,
      };
      this.$axios.$post("/delivery/AddQuotedelivery", data).then((res) => {
        if (res.status == 200) {
          this.$toast.success("saved Successfully");
          document.getElementById(`pick${id}`).classList.toggle("hidden");
          this.removeData();
          this.$axios.$post("/delivery/GetdeliveryRequest").then((res) => {
            this.request = res.TotalRequest;
            this.delivery = res.quotes.data;
            this.totalPages = res.quotes.meta.last_page;
            this.perPage = res.quotes.meta.per_page;
            this.total = res.quotes.meta.total;
            this.loading = false;
          });
        }
      });
    },
    // remove Data
    removeData() {
      (this.Req_No = null),
        (this.QTY = null),
        (this.transmit_at = null),
        (this.vendor_id = null),
        (this.location_id = null),
        (this.picker = null),
        (this.Price = null),
        (this.deliver_to = null),
        (this.date = null),
        (this.check = false);
    },
  },
  watch: {
    // currect page
    currentPage(value) {
      console.log(value);

      this.$axios
        .$post(`/delivery/GetdeliveryRequest?page=${value}`)
        .then((res) => {
          this.request = res.TotalRequest;
          this.delivery = res.quotes.data;
          this.totalPages = res.delivery.meta.last_page;
          this.perPage = res.delivery.meta.per_page;
          this.total = res.delivery.meta.total;
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
  border-radius: 20px;
  border: 1px solid var(--primary-dark-20, rgba(66, 66, 66, 0.2));
  /* background: var(--Colors-Base-00, #FFF); */
}
.table-container {
  overflow-x: auto;
}
.cursor-disabled {
  background-color: rgb(239, 239, 239);
}
</style>
