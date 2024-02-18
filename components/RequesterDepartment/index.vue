<template>
  <div>
    <div>
      <h1
        :class="{ 'mr-[20px]': lang == 'ar' }"
        class="delivery-department flex ml-[20px] pt-[20px] pb-[10px]"
      >
        <img
          class="w-[32px]"
          src="../../assets/imgs/dashboard/Icon.png"
          alt=""
        />
        <p :class="{ 'mr-[20px]': lang == 'ar' }" class="ml-[20px]">
          {{ $t("Requester department") }}
        </p>
      </h1>
    </div>
    <div
      :class="'ml-[20px]' ? lang == 'en' : 'mr-[20px]'"
      class="grid grid-cols-3 gap-2 p-[20px]"
    >
      <div class="bg-white p-10 rounded">
        <div class="flex justify-space-between">
          <h1 class="apex-line-title">
            {{ $t("Rejected items with reason") }}
          </h1>
        </div>
        <div id="chart">
          <apexchart
            type="pie"
            class="ltr"
            :options="chartOptionsPiePricingChart"
            :series="seriesPiePricingChart"
          ></apexchart>
        </div>
      </div>
      <div class="col-span-2 bg-white p-[20px] rounded">
        <div class="flex justify-space-between mb-[20px]">
          <h1 class="apex-line-title flex items-center">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="30"
                cy="30"
                r="30"
                fill="#00B074"
                fill-opacity="0.15"
              />
              <path
                d="M13.2656 45.3699C15.5193 45.3699 17.3608 43.5262 17.3608 41.2697V14.8521H41.2722V41.2697C41.2722 43.5262 39.4307 45.3699 37.177 45.3699"
                fill="#00B074"
              />
              <path
                d="M33.0813 41.27V38.1604H9.16992V41.27C9.16992 43.5265 11.0114 45.3702 13.2651 45.3702H37.1765C34.9227 45.3702 33.0813 43.5265 33.0813 41.27Z"
                fill="#0A5239"
              />
              <path
                d="M24.6947 20.1086H21.6445V21.4295H24.6947V20.1086Z"
                fill="white"
              />
              <path
                d="M36.4366 20.1079H27.0645V21.4288H36.4366V20.1079Z"
                fill="#F7C604"
              />
              <path
                d="M24.6947 24.7866H21.6445V26.1075H24.6947V24.7866Z"
                fill="white"
              />
              <path
                d="M36.4366 24.7866H27.0645V26.1075H36.4366V24.7866Z"
                fill="#F7C604"
              />
              <path
                d="M24.6947 29.4646H21.6445V30.7855H24.6947V29.4646Z"
                fill="white"
              />
              <path
                d="M36.4366 29.4646H27.0645V30.7855H36.4366V29.4646Z"
                fill="#F7C604"
              />
              <path
                d="M24.6947 34.1426H21.6445V35.4635H24.6947V34.1426Z"
                fill="white"
              />
              <path
                d="M36.4366 34.1426H27.0645V35.4635H36.4366V34.1426Z"
                fill="#F7C604"
              />
            </svg>
            <p :class="{ 'mr-[20px]': lang == 'ar' }" class="ml-[12px]">
              {{ $t("Total Quotation sales") }}
            </p>
          </h1>
          <!-- <select
            v-model="filter"
            class="border-select w-[140px] h-[43px] py-1 px-2 bg-white"
            name="whatever"
            id="frm-whatever"
          >
            <option value="Select Branch" disabled>
              <p class="mr-[12px]">{{ $t("Overall") }}</p>
              <img
                class="w-[18px]"
                src="../../assets/imgs/dashboard/filter-search.png"
                alt=""
              />
            </option>
            <option value="Customer">Cutomer</option>
            <option value="Location">Location</option>
            <option value="Date">Date</option>
          </select> -->
        </div>

        <div style="height: 300px; overflow-y: auto;" class="relative overflow-x-auto">
          <table class="min-w-full leading-normal table-style">
            <thead>
              <tr>
                <td
                  style="width: 80px"
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                  <div class="flex">
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("quote") }}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  style="width: 80px"
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                  {{ $t("value") }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in structuredQuotes" :key="i">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex">
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap table-text">
                        {{ item.quote }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap table-text">
                    {{ item.value }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <tr>
                <td
                  style="width: 80px"
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                  <div class="flex">
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Customer") }}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  style="width: 80px"
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                </td>
              </tr>
              <tr>
                <td
                  style="width: 80px"
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                  <div class="flex">
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Location") }}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  style="width: 80px"
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                
                </td>
              </tr> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Requester department
      filter: "",
      customerr: "",
      customer: "Select Customer",
      location: "Select Location",
      seriesPiePricingChart: [],
      chartOptionsPiePricingChart: {
        colors: ["#7B61FF", "#002D56", "#FFC125", "#FF0000"],
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["ReturnOrder", "PoorMaterial", "HighCost", "PartDefect"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },

      lang: "",
      structuredQuotes: [],
    };
  },
  methods: {
    // show more data
    // show more
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    },
  },
  mounted() {
    this.lang = localStorage.getItem("lang");
    this.$axios.get("/Dashboard/RejectedItemWithReason").then((res) => {
      console.log(res.data.Labels, "res");
      this.labels = res.data.Labels;
      this.seriesPiePricingChart = res.data.Series;
    });
    this.$axios.post("Dashboard/TotalQuotationSale").then((res) => {
      this.structuredQuotes = res.data.structuredQuotes;
    });
  },
};
</script>

<style scoped>
.response-time {
  border-radius: 6px;
  background: var(--light, #ebebeb);
  padding: 5px;
  width: 100px;
  color: var(--layout-800, #222);
  leading-trim: both;
  text-edge: cap;
  /* Uppercase/Big */
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 166.667% */
  text-transform: uppercase;
}
.table-text {
  color: #333;
  leading-trim: both;
  text-edge: cap;
  /* Uppercase/Big */
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 166.667% */
  text-transform: uppercase;
}
.text-sales {
  overflow: hidden;
  color: var(--theme-color-dark, #464255);
  font-feature-settings: "clig" off, "liga" off;
  text-overflow: ellipsis;
  whitespace: nowrap;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.input-time {
  border: 1px solid black;
  width: 200px;
  padding: 5px;
  border-radius: 9px;
}
.border-select {
  border-radius: 6px;
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
  padding: 8px;
  padding-top: 8px;
  padding-left: 8px;
  padding-left: 14px;
  padding-top: 13px;
}
</style>
