<template>
  <div>
    <!-- delivery Department -->
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
          {{ $t("Sales department") }}
        </p>
      </h1>
    </div>
    <div class="grid grid-cols-4 gap-2 p-[20px]">
      <div class="col-span-2 bg-white p-[20px] rounded">
        <div class="flex justify-space-between">
          <h1 class="apex-line-title">
            {{ $t("Cost versus Revnue") }}
          </h1>
        </div>

        <apexchart
          class="flex justify-center apex ltr"
          type="bar"
          height="350"
          width="500"
          :options="chartOptions"
          :series="series"
        ></apexchart>
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
              {{ $t("Total customers sales") }}
            </p>
          </h1>
          <select
            v-model="branch"
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
            <option value="Branch 1">Cutomer</option>
            <option value="Branch 1">Location</option>
            <option value="Branch 1">Date</option>
          </select>
        </div>

        <div class="relative overflow-x-auto">
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
                        {{ $t("total") }}
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
             
            </thead>
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
      // series
      branch: "Select Branch",
      series: [
        {
          name: "Sales",
          data: [70, 55, 65, 54, 51, 56, 59, 55],
        },
        {
          name: "Revenue",
          data: [70, 55, 65, 54, 51, 56, 59, 55],
        },
      ],
      // chart options line chart
      chartOptions: {
        colors: ["#8CC051", "#FFA500"],
        chart: {
          type: "bar",
          height: 350,
          colors: ["#8CC051", "#FFA500"],
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
            colors: ["#8CC051", "#FFA500"],
          },
        },
        stroke: {
          show: true,
          width: 5,
          colors: ["#8CC051", "#FFA500"],
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul ", "Aug"],
        },
        yaxis: {
          // title: {
          //   text: "$ (thousands)",
          // },
        },
        fill: {
          opacity: 1,
          colors: ["#8CC051", "#FFA500"],
        },
      },
      customer: "Select Customer",
      location: "Select Location",
      lang: "",
    };
  },
  mounted() {
    this.lang = localStorage.getItem("lang");
  },
};
</script>

<style>
.font-icon-size {
  font-size: 1.5rem;
}
/* card line */
.card-line {
  border-radius: 10px;
  background: var(--white, #fff);

  /* Shadow/xl */
  box-shadow: 0px 24px 50px -12px rgba(45, 54, 67, 0.12);
}
.apex-line-title {
  color: var(--theme-color-grey-body, #464255);
  font-feature-settings: "clig" off, "liga" off;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.delivery-department {
  color: #000;
  font-feature-settings: "clig" off, "liga" off;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
/* button over all */
.over-all-btn {
  border-radius: 8px;
  border: 1px solid var(--light, #ebebeb);
  background: var(--white, #fff);

  /* Shadow/lg */
  box-shadow: 0px 8px 11px -4px rgba(45, 54, 67, 0.04),
    0px 20px 24px -4px rgba(45, 54, 67, 0.04);
  color: var(--primary-dark, #424242);
  /* Paragraph: 5/Medium */
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 171.429% */
  letter-spacing: -0.2px;
}
.input-time {
  border: 1px solid black;
  width: 200px;
  padding: 5px;
  border-radius: 9px;
}
</style>
