<template>
  <div>
    <div>
      <div class="w-[99%]">
        <div class="flex justify-between">
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
              {{ $t("Purchasing department") }}
            </p>
          </h1>
         
          
        </div>
      </div>
      <div class="grid grid-cols-5 gap-2 p-[20px]">
        <div class="rounded">
          <!-- first card -->
          <div class="flex card-style">
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
            <h1
              :class="{ 'mr-[20px]': lang == 'ar' }"
              class="actual-cost ml-[20px]"
            >
              {{ $t("Actual cost vs planned cost") }}
              <p class="card-number">3123 / 78</p>
            </h1>
          </div>
          <!-- Second card -->
          <div class="flex card-style mt-[20px]">
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
            <h1
              :class="{ 'mr-[20px]': lang == 'ar' }"
              class="actual-cost ml-[20px]"
            >
              {{ $t("Purchase value in stock vs external vendors") }}
              <p class="card-number">899 / 60</p>
            </h1>
          </div>
        </div>

        <!-- table design  -->
        <div class="col-span-4 bg-white p-[20px] rounded">
          <div class="flex justify-space-between">
            <h1 class="apex-line-title">
              {{ $t("Top 20% runners top sold") }}
            </h1>
            <button
              type="button"
              class="flex over-all-btn bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <!-- <p class="mr-[12px]">{{ $t("Overall") }}</p> -->
              <input type="date">
              <!-- <img
                class="w-[18px]"
                src="../../assets/imgs/dashboard/filter-search.png"
                alt=""
              /> -->
            </button>
          </div>

          <div class="relative overflow-x-auto">
            <table class="min-w-full leading-normal table-style">
              <thead>
                <tr>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div class="flex">
                      <div class="ml-3">
                        <p
                          class="text-gray-900 whitespace-no-wrap table-headers"
                        >
                          {{ $t("N.O.") }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap table-headers">
                      {{ $t("Runner name") }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap table-headers">
                      {{ $t("Value") }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap table-headers">
                      {{ $t("Quantity") }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap table-headers">
                      {{ $t("Time response") }}
                    </p>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div class="flex">
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap table-text">
                          External couplin
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap table-text">
                      362187361286381268
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap table-text">
                      2000 L.E
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap table-text">
                      <span
                        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                      >
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span class="relative">{{ $t("New") }}</span>
                      </span>
                    </p>
                  </td>

                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap response-time">
                      12/02/2023 08:00 am
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
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

      // pricing department
      seriesPiePricingChart: [40, 60],
      chartOptionsPiePricingChart: {
        colors: ["#20E3FF", "#3BFFD1"],
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Time", "Agent"],
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
  },
};
</script>

<style>
.actual-cost {
  color: var(--theme-color-grey-body, #464255);
  font-feature-settings: "clig" off, "liga" off;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
}
.card-style {
  border-radius: 10px;
  background: var(--white, #fff);

  /* Shadow/xl */
  box-shadow: 0px 24px 50px -12px rgba(45, 54, 67, 0.12);
  padding: 20px;
}
.card-number {
  color: var(--theme-color-dark, #464255);
  font-feature-settings: "clig" off, "liga" off;
  text-overflow: ellipsis;
  whitespace: nowrap;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 83px;
}
</style>
