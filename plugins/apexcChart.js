import Vue from "vue";

import VueApexCharts from "vue-apexcharts";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);
Vue.use(Toast);



