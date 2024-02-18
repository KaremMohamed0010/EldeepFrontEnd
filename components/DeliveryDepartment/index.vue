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
          {{ $t("Delivery department") }}
        </p>
      </h1>
    </div>
    <div class="grid grid-cols-3 gap-2 p-[20px]">
      <div class="col-span-2 bg-white p-[20px] rounded">
        <div class="flex justify-space-between">
          <h1 class="apex-line-title">
            {{ $t("Av. delivery time for runners") }}
          </h1>
          <!-- <select
            v-model="branch"
            class="border-select w-[140px] py-1 px-2 bg-white"
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
            <option value="Branch 1">Name</option>
            <option value="Branch 1">Branch</option>
            <option value="Branch 1">Brand</option>
          </select> -->
        </div>
        <div class="flex justify-evenly">
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
      <div class="bg-white p-10 rounded">
        <div class="flex justify-space-between">
          <h1 class="apex-line-title">
            {{ $t("Faulty items return ratio") }}
          </h1>
          <!-- <button
            type="button"
            class="flex over-all-btn bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <p class="mr-[12px]">{{ $t("Overall") }}</p>
            <img
              class="w-[18px]"
              src="../../assets/imgs/dashboard/filter-search.png"
              alt=""
            />
          </button> -->
        </div>
        <div id="chart">
          <apexchart
            type="pie"
            class="ltr"
            :options="chartOptionsPie"
            :series="seriesPie"
          ></apexchart>
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
      labelss : [],
      series: [
        {
          name: "Name",
          data: [],
        },
      ],
      // chart options line chart
      chartOptions: {
        toolbar: null,
        colors: ["#394889"],
        chart: {
          type: "bar",
          height: 350,
          colors: ["#394889"],
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
            colors: ["#394889"],
          },
        },
        stroke: {
          show: true,
          width: 5,
          colors: ["#394889"],
        },
        yaxis: {
          // title: {
          //   text: "$ (thousands)",
          // },
        },
        fill: {
          opacity: 1,
          colors: ["#394889"],
        },
        xaxis: {
          categories: [],
        },
      },
      branch: "Select Branch",
      namee: "Select Name",
      brand: "Select Brand",
      // chart pie
      seriesPie: [],
      chartOptionsPie: {
        colors: ["#20E3FF", "#009DFE"],
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Return", "Completed"],
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
      CompletedPercentage: null,
      ReturnedPercentage: null,
    };
  },
  mounted() {
    this.lang = localStorage.getItem("lang");

    this.$axios.post("/Dashboard/Faultyitemsreturnratio").then((res) => {
      this.seriesPie = [
        res.data.ReturnedPercentage,
        res.data.CompletedPercentage,
      ];
    });

    this.$axios.post("Dashboard/AvDeliveryTime").then((res) => {
      this.series[0].data = res.data.series;
      this.chartOptions.xaxis.categories = res.data.labels;

    });
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
.apex .apexcharts-canvas .apexcharts-toolbar {
  display: none !important;
}
</style>
