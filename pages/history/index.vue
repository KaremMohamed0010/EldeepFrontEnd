<template>
  <div class="p-[12px]">
    <div v-if="loading == false" class="mb-[13px] flex justify-space-between">
      <!-- add btn -->
      <div
        :class="{
          'p-[30px]': open == 'true',
          'p-[25px]': open == 'false',
        }"
        class="bg-filter flex items-center w-[200px]"
      >
        <img src="../../assets/imgs/verticalNav/award.png" alt="" />
        <h1 class="kpis">{{ $t("Your KPIs") }}</h1>
        <h3 class="kpi-number">{{ Kpi }}</h3>
      </div>

      <div
        :class="{
          'p-[20px]': open == 'true',
          'p-[25px]': open == 'false',
        }"
        class="bg-filter flex items-center justify-between w-[270px]"
      >
        <img src="../../assets/imgs/verticalNav/Icon.svg" alt="" />

        <h1 class="total-requests">{{ $t("Total Requests") }}</h1>
        <h3 class="kpi-number">{{ request }}</h3>
      </div>

      <div class="bg-filter w-[72%] flex">
        <div class="items-center flex p-[30px]">
          <h1 class="filter-text">{{ $t("Filter") }}</h1>
        </div>
        <!-- seacrh -->
        <div class="w-[50%] flex items-center">
          <div
            class="items-center search-round justify-between flex rounded-full shadow-lg p-2 sticky w-[100%]"
            style="top: 5px"
          >
            <div style="border-right: 1px solid #ebebeb">
              <div
                class="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <img
                  class="w-[70%]"
                  src="../../assets/imgs/verticalNav/search-status.png"
                  alt=""
                />
              </div>
            </div>

            <input
              class="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
              type="text"
              v-model="search"
              :placeholder="$t('search')"
            />

            <div :class="[{ rotate: lang == 'ar' }]" class="cursor-pointer">
              <img
                class="w-[70%]"
                src="../../assets/imgs/verticalNav/send.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <!--  -->
        <div class="w-[40%] ml-[21px] flex items-center">
          <div
            class="items-center date-round justify-between flex rounded-full shadow-lg p-2 sticky w-[100%]"
            style="top: 5px"
          >
            <div class="flex items-center">
              <div class="mr-4">
                <input
                  id="start_date"
                  class="font-bold uppercase rounded-full py-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                  type="date"
                  v-model="startDate"
                  placeholder="Start Date"
                />
              </div>

              <div>
                <input
                  id="end_date"
                  class="font-bold uppercase rounded-full py-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                  type="date"
                  v-model="endDate"
                  placeholder="End Date"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- apply btn  -->
        <div
          :class="{ 'mr-[20px]': lang == 'ar' }"
          class="grid ml-[22px] mr-[20px] items-center"
        >
          <button
            @click="filterData()"
            class="bg-blue-500 bg-[#394889] flex add-new hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          >
            <p class="">
              {{ $t("Apply") }}
            </p>
          </button>
        </div>
      </div>
    </div>
    <div v-if="loading == true" class="flex justify-center w-[100%]">
      <Loading :text="'Loading'" />
    </div>
    <div
      v-if="loading == false && pricing.length > 0"
      class="p-[20px] bg-table"
    >
      <div class="p-[20px] flex justify-between">
        <div class="flex">
          <h1 class="total-request">{{ startDate }} : {{ endDate }}</h1>
          <span class="total-request-number">
            {{ request }} {{ $t("Request") }}</span
          >
        </div>
      </div>
      <!-- add new parts -->

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
                <p
                  v-if="price.PartNO != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.PartNO }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.Vendor != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.Vendor }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.Address.length"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.Address }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.PricingGroup != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.PricingGroup }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.price != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.price }}
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

      pricing: [],
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
      pricee: [],
      Kpi: "",
      request: "",
      startDate: "",
      endDate: "",
      search: "",
    };
  },
  components: {
    Multiselect,
  },
  mounted() {
    // get all Pricing
    this.$axios.$post("/Pricing/GetPricingRequest").then((res) => {
      this.request = res.TotalRequest;
      this.Kpi = res.KPI;
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

    // get all parts
    this.$axios.$get("/Part/GetParts").then((res) => {
      this.partsTable = res.Parts.data;
    });

    // get all Vendors

    this.$axios.$get("/Vendor/GetAllVendor").then((res) => {
      this.vendorTable = res.Vendor.data;
    });

    // get all locations
    this.$axios.$get("/Location/GetAllLocationDropDownList").then((res) => {
      this.locations = res.Location;
    });
  },
  created() {},
  methods: {
    // filter data
    filterData() {
      let data = {
        start_date: this.startDate,
        end_date: this.endDate,
        search: this.search,
      };
      this.$axios.$post("/Pricing/GetPricingRequest", data).then((res) => {
        this.request = res.TotalRequest;
        this.Kpi = res.KPI;
        this.pricing = res.quotes.data;
        this.totalPages = res.quotes.meta.last_page;
        this.perPage = res.quotes.meta.per_page;
        this.total = res.quotes.meta.total;
        this.loading = false;
      });
    },
    // show more
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    },
    // add new parts
    // add new part
    addNewParts(status) {
      document.getElementById(`addPart`).classList.toggle("hidden");
      // tabs
      // Select tabs and tab buttons
      const tabs = document.querySelectorAll(".tab");
      const tabBtns = document.querySelectorAll(".tabbtn");

      // each tab button will have a  click event  listener
      tabBtns.forEach((tabBtn) => {
        tabBtn.addEventListener("click", () => {
          // hiding all tabs
          // tabs.forEach((tab) => {
          //   tab.classList.add("hidden");
          // });

          // showing only the tab that this tab button should show
          const tab = tabBtn.getAttribute("data-tabopen");
          document.getElementById(tab).classList.remove("hidden");

          //  we will give same styles to all tab
          if (this.type == "Informations") {
            tabBtns.forEach((tabBtn) => {
              tabBtn.className =
                " px-2 py-1 cursor-pointer ml-[26px] tab-un-active ";
            });
            //  we will give special styles to the active tab
            tabBtn.className = "tab-style cursor-pointer";
          }
          tabBtns.forEach((tabBtn) => {
            tabBtn.className =
              " px-2 py-1 cursor-pointer ml-[26px] tab-un-active ";
          });

          //  we will give special styles to the active tab
          tabBtn.className = "tab-style cursor-pointer";
        });
      });

      // post method api
      // validation messages
      this.clearData();
    },
    // add new Alternative
    addNewAlternative() {
      document.getElementById(`addAlternative`).classList.toggle("hidden");
    },

    // post a new alternative
    postnNewAlternative() {
      // localStorage.setItem("alternative" , this.alternatives);
      document.getElementById(`addAlternative`).classList.toggle("hidden");
    },
    // add alternative
    addField() {
      this.fieldCount++;
      this.alternatives.push({ alternative_id: this.fieldCount, code: "" });
    },
    removeField(id) {
      this.alternatives = this.alternatives.filter(
        (obj) => obj.alternative_id !== id
      );
    },
    //

    // clear data of parts
    // clear data
    clearData() {
      (this.model = null),
        (this.part_name_ar = null),
        (this.part_numberr = null),
        (this.vat_number = null),
        (this.branch_id = null),
        (this.employee_email = null),
        (this.area = null),
        (this.start_date = null),
        (this.end_date = null),
        (this.vin_number = null),
        (this.dimensions = null),
        (this.national_id = null),
        (this.id = ""),
        (this.unit = null),
        (this.breakable = false),
        (this.warranty = false),
        (this.alternatives = [{ alternative_id: 1, code: "" }]);
    },
    // save pricin index
    SavePricingRow(price, index) {
      console.log("Price at index", index, this.pricee);
      const sameIndex = index;
      if (sameIndex == index) {
        const dataToSave = {
          part_number: this.part_number[index],
          vendor_id: this.vendor_id[index],
          location_id: this.location_id[index],
          pricing_group: this.pricing_group[index],
          price: this.pricee[index],
        };
        this.$axios
          .$post(`Pricing/UpdatePricingRequest/${price.id}`, dataToSave)
          .then((res) => {
            if (res.status == 200) {
              this.$toast.success(" Pricing Saved Successfully");
            } else {
              this.$toast.error(res.message);
            }
          });
      }
    },

    // post parts
    // post and add part
    postParts(status) {
      const requiredFields = ["part_name_ar", "part_number"];

      const emptyFields = requiredFields.filter(
        (field) => this[field] === "" || this[field] === null
      );

      this.emptyField = emptyFields;
      console.log(emptyFields);
      if (emptyFields.length != 0) {
        return emptyFields;
      } else if (this.invalidEmail == true) {
        return;
      }
      if (this.errorpasswordValidation == true) {
        return;
      } else if (emptyFields.length == 0) {
        if (status == "add") {
          this.loading = true;
          let formdata = new FormData();

          formdata.append("part_name_ar", this.part_name_ar);
          formdata.append("part_number", this.part_numberr);
          formdata.append("model", this.model);
          formdata.append("image", this.image);
          formdata.append("unit", this.unit);
          if (this.warranty == false) {
            formdata.append("warrenty", 0);
          } else if (this.warranty == true) {
            formdata.append("warrenty", 1);
          }
          if (this.breakable == false) {
            formdata.append("breakable", 0);
          } else if (this.breakable == true) {
            formdata.append("breakable", 1);
          }
          formdata.append("dimensions", this.dimensions);
          formdata.append("code", this.part_name_ar);

          this.alternatives.forEach((value, index) => {
            console.log(value, index);
            formdata.append(`alternative_id[${index}]`, value.alternative_id);
            formdata.append(`code[${index}]`, value.code);
          });

          this.$axios.$post(`/Part/AddPart`, formdata).then((res) => {
            if (res.status == 200) {
              this.loading = false;
              this.$toast.success("Part Added Successfully");
              // get data again
              this.$axios.$get("/Part/GetParts").then((res) => {
                this.partsTable = res.Parts.data;
              });
              document.getElementById(`addPart`).classList.toggle("hidden");
              this.addNewParts();
            } else {
              this.$toast.error(res.message);
              this.loading = false;
            }
          });
        }
      }
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
.arrow-select-vendor {
  position: absolute;
  margin-top: 19px;
  width: 20px;
  margin-left: 118px;
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

/* history  */
.kpis {
  color: var(--msgs-colors-success, #8cc051);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.2px;
}
.kpi-number {
  color: var(--PRIMARY-Dark, #424242);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-size: 23px;
  font-style: normal;
  font-weight: 900;
  line-height: 24px; /* 104.348% */
  letter-spacing: -0.2px;
}
.total-requests {
  margin-left: 12px;
  color: var(--SECONDARY-1, #757777);
  leading-trim: both;
  text-edge: cap;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.2px;
}
.date-round {
  border-radius: 20px;
  border: 1px solid var(--primary-dark-20, rgba(66, 66, 66, 0.2));
  background: var(--colors-base-00, #fff);

  /* Shadow/lg */
  box-shadow: 0px 8px 11px -4px rgba(45, 54, 67, 0.04),
    0px 20px 24px -4px rgba(45, 54, 67, 0.04);
}
.search-round {
  border-radius: 20px;
  border: 1px solid var(--primary-dark-20, rgba(66, 66, 66, 0.2));
  background: var(--colors-base-00, #fff);

  /* Shadow/lg */
  box-shadow: 0px 8px 11px -4px rgba(45, 54, 67, 0.04),
    0px 20px 24px -4px rgba(45, 54, 67, 0.04);
}
</style>
