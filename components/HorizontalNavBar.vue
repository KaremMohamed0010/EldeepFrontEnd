<template>
  <div class="w-[100%]">
    <nav
      :class="lang == 'en' ? 'ml-[68px]' : 'mr-[68px]'"
      class="flex flex-wrap items-center justify-between p-5 bg-white mt-[3px]"
    >
      <h1 v-if="this.$route.path == '/dashboard'" class="dashboard">
        {{ $t("Dashboard") }}
      </h1>
      <h1 v-if="this.$route.path == '/customer'" class="dashboard">
        {{ $t(`Setups Customers`) }}
      </h1>

      <h1 v-if="this.$route.path == '/vendors'" class="dashboard">
        {{ $t(`Setups Vendors`) }}
      </h1>
      <h1 v-if="this.$route.path == '/employee'" class="dashboard">
        {{ $t(`Setups Employee`) }}
      </h1>
      <h1 v-if="this.$route.path == '/parts'" class="dashboard">
        {{ $t(`Setups Parts`) }}
      </h1>
      <h1 v-if="this.$route.path == '/conditions'" class="dashboard">
        {{ $t(`Setups Conditions`) }}
      </h1>
      <h1 v-if="this.$route.path == '/locations'" class="dashboard">
        {{ $t(`Setups Locations`) }}
      </h1>
      <h1 v-if="this.$route.path == '/pricing'" class="dashboard">
        {{ $t(`Pricing`) }}
      </h1>
      <h1 v-if="this.$route.path == '/history'" class="dashboard">
        {{ $t(`History`) }}
      </h1>
      <h1 v-if="this.$route.path == '/purchase'" class="dashboard">
        {{ $t(`Purchase`) }}
      </h1>
      <h1 v-if="this.$route.path == '/delivery'" class="dashboard">
        {{ $t(`Delivery Tracking`) }}
      </h1>
      <h1 v-if="this.$route.path == '/financial'" class="dashboard">
        {{ $t(`Financial`) }}
      </h1>
      <div class="flex md:hidden">
        <button id="hamburger">
          <img
            class="toggle block"
            src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
            width="40"
            height="40"
          />
          <img
            class="toggle hidden"
            src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
            width="40"
            height="40"
          />
        </button>
      </div>
      <!-- <div
        class="toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none"
      >
        <a
          href="#"
          class="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
          >Home</a
        >
        <a
          href="#"
          class="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
          >Products</a
        >
        <a
          href="#"
          class="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
          >Pricing</a
        >
        <a
          href="#"
          class="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
          >Contact</a
        >
      </div> -->
      <div
        class="items-center justify-between flex rounded-full shadow-lg p-2 sticky w-[60%]"
        style="top: 5px"
      >
        <div style="border-right: 1px solid #ebebeb">
          <div class="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer">
            <img
              class="w-[70%]"
              src="../assets/imgs/verticalNav/search-status.png"
              alt=""
            />
          </div>
        </div>

        <input
          class="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
          type="text"
          :placeholder="$t('search')"
        />

        <div :class="[{ rotate: lang == 'ar' }]" class="cursor-pointer">
          <img
            class="w-[70%]"
            src="../assets/imgs/verticalNav/send.png"
            alt=""
          />
        </div>
      </div>
      <!-- translate -->
      <div class="relative inline-block text-left">
        <dropdown>
          <input id="toggle2" type="checkbox" />
          <label for="toggle2" class="animate flex">
            <svg
              v-if="english == 'English'"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_1043_30453"
                style="mask-type: luminance"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="20"
                height="20"
              >
                <rect width="20" height="20" fill="white" />
              </mask>
              <g mask="url(#mask0_1043_30453)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M-0.0292969 0.16333V19.837H20.0301V0.16333H-0.0292969Z"
                  fill="#2E42A5"
                />
                <mask
                  id="mask1_1043_30453"
                  style="mask-type: luminance"
                  maskUnits="userSpaceOnUse"
                  x="-1"
                  y="0"
                  width="22"
                  height="20"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M-0.0292969 0.16333V19.837H20.0301V0.16333H-0.0292969Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask1_1043_30453)">
                  <mask
                    id="mask2_1043_30453"
                    style="mask-type: luminance"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="white" />
                  </mask>
                  <g mask="url(#mask2_1043_30453)">
                    <path
                      d="M-2.26172 18.4316L2.15241 20.8728L20.1314 2.81761L22.4598 -0.810114L17.7395 -1.62604L10.4063 6.15446L4.50381 11.3967L-2.26172 18.4316Z"
                      fill="white"
                    />
                    <path
                      d="M-1.6582 20.1417L0.590593 21.5583L21.6229 -1.14746H18.4653L-1.6582 20.1417Z"
                      fill="#F50100"
                    />
                    <path
                      d="M22.2637 18.4316L17.8495 20.8728L-0.129488 2.81761L-2.45784 -0.810114L2.26243 -1.62604L9.59565 6.15446L15.4981 11.3967L22.2637 18.4316Z"
                      fill="white"
                    />
                    <path
                      d="M22.1133 19.659L19.8645 21.0757L10.9087 11.3541L8.25351 10.268L-2.68166 -0.797794H0.475916L11.4049 10.0053L14.3079 11.3078L22.1133 19.659Z"
                      fill="#F50100"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.63234 -1.47595H12.3686V5.6415H21.3012V14.5415H12.3686V21.4766H7.63234V14.5415H-1.26562V5.6415H7.63234V-1.47595ZM1.2418 8.92044V11.2625H7.63234V8.92044H1.2418ZM12.3686 8.92044V11.2625H18.7938V8.92044H12.3686Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3686 -1.47607H7.63234V6.72128H-1.26562V13.2792H7.63234V21.4765H12.3686V13.2792H21.3012V6.72128H12.3686V-1.47607Z"
                      fill="#F50100"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.63234 6.72128H-1.26562V13.2792H7.63234V21.4765H12.3686V13.2792H21.3012V6.72128H12.3686V-1.47607H7.63234V6.72128ZM8.88606 0.163397V8.36075H-0.0119114V11.6397H8.88606V19.8371H11.1149V11.6397H20.0475V8.36075H11.1149V0.163397H8.88606Z"
                      fill="white"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <img
              :class="{ 'ml-[12px]': lang == 'ar' }"
              v-if="english == 'Arabic'"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyElEQVR4nO2VMQ6CQBBF5xAW3gRM3GZO4HVsvJQNJWtjTay9gCESCwrdkE+gMITEDliH/Jf8hFDt2z+7K0IIIYSsATiBpQgFHBsAR2hI7JEAD7GLv6vgNeoMP2Rl9YKlyBICIU8QfGpXAGfpY0og5Ml34eNM2YbMJfBr8VO3IRSoVt5Ak21QF0fUtxOabGtHIPgU7+sBz8cdn8u+T/fd/Qt+9/8C5UKRMaoKSxEKKBsAR2hI7JFQHmKNv6vKa1QNP2SEEEKIGKQFyPAyjkSrfRkAAAAASUVORK5CYII="
            />

            <p class="ml-[13px]">
              {{ english }}
            </p>
            <img
              class="ml-[10px]"
              src="../assets/imgs/horizonalNav/arrow-down.png"
              alt=""
            />
          </label>
          <ul class="animate">
            <li class="animate">Lietuvškai</li>
            <li @click="changeLanguage()" class="animate flex">
              <svg
                v-if="arabic == 'English'"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_1043_30453"
                  style="mask-type: luminance"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                >
                  <rect width="20" height="20" fill="white" />
                </mask>
                <g mask="url(#mask0_1043_30453)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M-0.0292969 0.16333V19.837H20.0301V0.16333H-0.0292969Z"
                    fill="#2E42A5"
                  />
                  <mask
                    id="mask1_1043_30453"
                    style="mask-type: luminance"
                    maskUnits="userSpaceOnUse"
                    x="-1"
                    y="0"
                    width="22"
                    height="20"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M-0.0292969 0.16333V19.837H20.0301V0.16333H-0.0292969Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask1_1043_30453)">
                    <mask
                      id="mask2_1043_30453"
                      style="mask-type: luminance"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="white" />
                    </mask>
                    <g mask="url(#mask2_1043_30453)">
                      <path
                        d="M-2.26172 18.4316L2.15241 20.8728L20.1314 2.81761L22.4598 -0.810114L17.7395 -1.62604L10.4063 6.15446L4.50381 11.3967L-2.26172 18.4316Z"
                        fill="white"
                      />
                      <path
                        d="M-1.6582 20.1417L0.590593 21.5583L21.6229 -1.14746H18.4653L-1.6582 20.1417Z"
                        fill="#F50100"
                      />
                      <path
                        d="M22.2637 18.4316L17.8495 20.8728L-0.129488 2.81761L-2.45784 -0.810114L2.26243 -1.62604L9.59565 6.15446L15.4981 11.3967L22.2637 18.4316Z"
                        fill="white"
                      />
                      <path
                        d="M22.1133 19.659L19.8645 21.0757L10.9087 11.3541L8.25351 10.268L-2.68166 -0.797794H0.475916L11.4049 10.0053L14.3079 11.3078L22.1133 19.659Z"
                        fill="#F50100"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.63234 -1.47595H12.3686V5.6415H21.3012V14.5415H12.3686V21.4766H7.63234V14.5415H-1.26562V5.6415H7.63234V-1.47595ZM1.2418 8.92044V11.2625H7.63234V8.92044H1.2418ZM12.3686 8.92044V11.2625H18.7938V8.92044H12.3686Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.3686 -1.47607H7.63234V6.72128H-1.26562V13.2792H7.63234V21.4765H12.3686V13.2792H21.3012V6.72128H12.3686V-1.47607Z"
                        fill="#F50100"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.63234 6.72128H-1.26562V13.2792H7.63234V21.4765H12.3686V13.2792H21.3012V6.72128H12.3686V-1.47607H7.63234V6.72128ZM8.88606 0.163397V8.36075H-0.0119114V11.6397H8.88606V19.8371H11.1149V11.6397H20.0475V8.36075H11.1149V0.163397H8.88606Z"
                        fill="white"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <img
                v-if="arabic == 'Arabic'"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyElEQVR4nO2VMQ6CQBBF5xAW3gRM3GZO4HVsvJQNJWtjTay9gCESCwrdkE+gMITEDliH/Jf8hFDt2z+7K0IIIYSsATiBpQgFHBsAR2hI7JEAD7GLv6vgNeoMP2Rl9YKlyBICIU8QfGpXAGfpY0og5Ml34eNM2YbMJfBr8VO3IRSoVt5Ak21QF0fUtxOabGtHIPgU7+sBz8cdn8u+T/fd/Qt+9/8C5UKRMaoKSxEKKBsAR2hI7JFQHmKNv6vKa1QNP2SEEEKIGKQFyPAyjkSrfRkAAAAASUVORK5CYII="
              />
              <p :class="{ 'mr-[12px]': lang == 'ar' }" class="ml-[13px]">
                {{ arabic }}
              </p>
            </li>
          </ul>
        </dropdown>
      </div>
      <!-- profile -->
      <div>
        <div class="flex items-center cursor-pointer">
          <p class="mr-[20px]" :class="{ 'ml-[20px]': lang == 'ar' }">
            {{ name }}
          </p>
          <img
            class="w-[50px] h-[50px]"
            src="../assets/imgs/horizonalNav/Rectangle 6.png"
            alt=""
          />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      english: "English",
      arabic: "Arabic",
      name: null,
      lang: "",
      error: false,
    };
  },
  mounted() {
    document.getElementById("hamburger").onclick = function toggleMenu() {
      const navToggle = document.getElementsByClassName("toggle");
      for (let i = 0; i < navToggle.length; i++) {
        navToggle.item(i).classList.toggle("hidden");
      }
    };
    this.name = localStorage.getItem("name");
    this.lang = localStorage.getItem("lang");
    if (localStorage.getItem("lang") == "en") {
      this.english = "English";
    } else if (localStorage.getItem("lang") == "ar") {
      this.english = "Arabic";
      if (this.arabic == "Arabic") {
        this.arabic = "English";
      }
      console.log(this.arabic, "console language");
    }
    this.error = localStorage.getItem("error");
  },
  methods: {
    changeLanguage(lang) {
      if (this.english == "English") {
        location.reload();
        // this.english = "Arabic";
        // this.arabic = "English";
        // this.$i18n.locale = "ar";
        localStorage.setItem("lang", "ar");
      } else if (this.english == "Arabic") {
        location.reload();
        // this.english = "English";
        // this.arabic = "Arabic";
        // this.$i18n.locale = "en";
        localStorage.setItem("lang", "en");
      }
    },
  },
  watch: {
    // english() {
    //   if (this.english == "Arabic") {
    //     this.arabic = "English";
    //     this.english = "Arabic";
    //     this.$i18n.locale = "ar";
    //   } else if (this.english == "English") {
    //     this.arabic = "Arabic";
    //     this.english = "English";
    //     this.$i18n.locale = "en";
    //   }
    //   if (localStorage.getItem("lang") == "en") {
    //     this.english = "English";
    //   } else if (localStorage.getItem("lang") == "ar") {
    //     this.arabic = "Arabic";
    //   }
    // },
  },
};
</script>

<style>
.dashboard {
  color: var(--light-black, #11263c);
  font-feature-settings: "clig" off, "liga" off;
  /* Body/Paragraph - 16px - SB */
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
}
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
</style>
