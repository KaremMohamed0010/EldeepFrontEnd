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
          {{ $t("Pricing department") }}
        </p>
      </h1>
    </div>
    <div class="grid grid-cols-4 gap-3 p-[20px]">
      <div class="bg-white col-span-2 p-10 rounded">
        <div class="flex justify-space-between">
          <h1 class="apex-line-title">
            {{ $t("Average time request response") }}
          </h1>
          <button
            type="button"
            class="flex over-all-btn bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <p class="mr-[12px]">{{ $t("Overall") }}</p>
            <img
              class="w-[18px]"
              src="../../assets/imgs/dashboard/filter-search.png"
              alt=""
            />
          </button>
        </div>
        <div id="chart">
          <apexchart v-if="series[0].data.length"
            class="flex justify-center apex ltr"
            type="bar"
            height="350"
            width="500"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
      <div class="col-span-2 bg-white p-[20px] rounded">
        <div class="flex justify-space-between">
          <h1 class="apex-line-title">
            {{ $t("Loss of sales Or Unavailable items") }}
          </h1>
          <button
            type="button"
            class="flex over-all-btn bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <p class="mr-[12px]">{{ $t("Overall") }}</p>
            <img
              class="w-[18px]"
              src="../../assets/imgs/dashboard/filter-search.png"
              alt=""
            />
          </button>
        </div>

        <div
          style="height: 390px; overflow-y: auto"
          class="relative overflow-x-auto"
        >
          <table class="min-w-full leading-normal table-style">
            <thead>
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex">
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Part name") }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap table-headers">
                    {{ $t("Part Number") }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap table-headers">
                    {{ $t("Price") }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap table-headers">
                    {{ $t("Condition") }}
                  </p>
                </td>
                <!-- <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap table-headers">
                    {{ $t("Request time") }}
                  </p>
                </td> -->
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {{ $t("reason") }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in UnavailableItems" :key="i">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex">
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap table-text">
                        {{ item.NameEn }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap table-text">
                    {{ item.PartNum }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap table-text">
                    {{ item.Price }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap table-text">
                    <span
                      class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                    >
                      <span
                        aria-hidden
                        class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                      ></span>
                      <span class="relative">{{ item.Condition }}</span>
                    </span>
                  </p>
                </td>
                <!-- <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap table-text">
                    12/02/2023 08:00 am
                  </p>
                </td> -->

                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {{ item.reason }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // pagination data
      page: 1,
      totalPages: 1,
      total: 2,
      perPage: 4,
      currentPage: 1,
      hasMorePages: true,
      UnavailableItems: [],

      // pricing department
      // series

      series: [
        {
          name: "Agent",
          data: [],
        },
        // {
        //   name: "Time",
        //   data: [70, 55, 65, 54, 51, 56, 59, 55],
        // },
      ],
      // chart options line chart
      chartOptions: {
        colors: ["#41C5B8", "#394889"],
        chart: {
          type: "bar",
          height: 350,
          colors: ["#41C5B8", "#394889"],
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
            borderRadius: 2,
            barWidth: "80%",
          },
        },
        dataLabels: {
          enabled: false,
          offsetY: 100,
          style: {
            fontSize: "12px",
            colors: ["#41C5B8", "#394889"],
          },
        },
        stroke: {
          show: true,
          width: 5,
          colors: ["#41C5B8", "#394889"],
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          // title: {
          //   text: "$ (thousands)",
          // },
        },
        fill: {
          opacity: 1,
          colors: ["#41C5B8", "#394889"],
        },
      },

      lang: "",
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
    this.$axios.post("/Dashboard/LossOfSalesOrUnavailableItems").then((res) => {
      this.UnavailableItems = res.data.Data;
    });

    this.$axios.post("/Dashboard/AvDeliveryTime").then((res) => {
      this.series[0].data = res.data.series;
      this.chartOptions.xaxis.categories = res.data.labels;
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
</style>
