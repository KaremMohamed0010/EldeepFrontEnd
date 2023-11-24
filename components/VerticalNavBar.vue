<template>
  <div>
    <div x-data="setup()" x-init="$refs.loading.classList.add('hidden');">
      <div
        class="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light"
      >
        <!-- Loading screen -->

        <!-- Sidebar -->
        <div class="flex flex-shrink-0 transition-all">
          <div
            v-if="secondNav"
            x-show="isSidebarOpen"
            class="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          ></div>
          <div x-show="isSidebarOpen" class="fixed inset-y-0 z-10 w-16"></div>
          <!-- super admin -->
          <nav
            v-if="role == '1'"
            aria-label="Options"
            class="z-20 flex-col items-center flex-shrink-0 hidden w-16 py-4 bg-white border-r-2 border-indigo-100 shadow-md sm:flex"
          >
            <!-- Logo -->
            <div class="flex flex-col items-center flex-1 space-y-4">
              <!-- First Page in Navbar -->
              <button
                @click="toggleSecondNavBar()"
                class="transition-colors hover:text-white focus:outline-none focus:ring-offset-white focus:ring-offset-2"
              >
                <img
                  src="../assets/imgs/comman/hamburger-menu-line-icon-free-vector-removebg-preview.png"
                  alt=""
                />
              </button>
              <!-- First Page in Navbar -->
              <button
                @click="goToDashboard()"
                class="transition-colors hover:text-white focus:outline-none focus:ring-offset-white focus:ring-offset-2"
                :class="
                  this.$route.path == '/dashboard'
                    ? 'text-white bg-[#EBEBEB] border-4 border-r-[#D11C1C]'
                    : 'text-gray-500 bg-white'
                "
              >
                <img
                  src="../assets/imgs/verticalNav/btn-sidebar(1).png"
                  alt=""
                />
              </button>

              <!-- Menu button -->
              <button
                @click="goToPages()"
                class="transition-colors hover:text-white focus:outline-none focus:ring-offset-white focus:ring-offset-2"
                :class="
                  this.$route.path != '/dashboard'
                    ? 'text-white bg-[#EBEBEB] border-4 border-r-[#D11C1C]'
                    : 'text-gray-500 bg-white'
                "
              >
                <img src="../assets/imgs/verticalNav/btn-sidebar.png" alt="" />
              </button>
            </div>

            <!-- User avatar -->
            <div
              class="relative flex items-center flex-shrink-0 p-2"
              x-data="{ isOpen: false }"
            >
              <button @click="logOut()" class="">
                <img
                  class=""
                  src="../assets/imgs/verticalNav/btn-sidebar(3).png"
                  alt="Ahmed Kamel"
                />
                <span class="sr-only">User menu</span>
              </button>
            </div>
          </nav>
          <!-- pricing -->
          <nav
            v-if="role == '5'"
            aria-label="Options"
            class="z-20 flex-col items-center flex-shrink-0 hidden w-16 py-4 bg-white border-r-2 border-indigo-100 shadow-md sm:flex"
          >
            <!-- Logo -->
            <div class="flex flex-col items-center flex-1 space-y-4">
              <!-- First Page in Navbar -->
              <button
                @click="toggleSecondNavBar()"
                class="transition-colors hover:text-white focus:outline-none focus:ring-offset-white focus:ring-offset-2"
              >
                <img
                  src="../assets/imgs/comman/hamburger-menu-line-icon-free-vector-removebg-preview.png"
                  alt=""
                />
              </button>
              <!-- First Page in Navbar -->
              <button
                @click="goToPricingPage()"
                class="transition-colors hover:text-white focus:outline-none focus:ring-offset-white focus:ring-offset-2"
                :class="
                  this.$route.path == '/pricing'
                    ? 'text-white bg-[#EBEBEB] border-4 border-r-[#D11C1C]'
                    : 'text-gray-500 bg-white'
                "
              >
                <img
                  src="../assets/imgs/verticalNav/btn-sidebar(1).png"
                  alt=""
                />
              </button>

              <!-- Menu button -->
              <button
                @click="goToHistory()"
                class="transition-colors p-[10px] hover:text-white focus:outline-none focus:ring-offset-white focus:ring-offset-2"
                :class="
                  this.$route.path == '/history'
                    ? 'text-white bg-[#EBEBEB] border-4 border-r-[#D11C1C]'
                    : 'text-gray-500 bg-white'
                "
              >
                <img
                  src="../assets/imgs/verticalNav/award.svg"
                  alt=""
                />
              </button>
            </div>

            <!-- User avatar -->
            <div
              class="relative flex items-center flex-shrink-0 p-2"
              x-data="{ isOpen: false }"
            >
              <button @click="logOut()" class="">
                <img
                  class=""
                  src="../assets/imgs/verticalNav/btn-sidebar(3).png"
                  alt="Ahmed Kamel"
                />
                <span class="sr-only">User menu</span>
              </button>
            </div>
          </nav>

          <div
            v-if="this.$route.path != '/dashboard' && role == '1'"
            :class="{ 'second-nav-arabic': lang == 'ar' }"
            class="second-nav w-[0%] appear-nav"
          >
            <div
              v-if="secondNav"
              x-transition:enter="transform transition-transform duration-300"
              x-transition:enter-start="-translate-x-full"
              x-transition:enter-end="translate-x-0"
              x-transition:leave="transform transition-transform duration-300"
              x-transition:leave-start="translate-x-0"
              x-transition:leave-end="-translate-x-full"
              x-show="isSidebarOpen"
              :class="{ 'mr-[70px] ml-[40rem]': lang === 'ar' }"
              class="fixed inset-y-0 left-0 h-[85vh] z-10 flex-shrink-0 w-[213px] bg-white border-r-2 border-indigo-100 shadow-lg sm:left-16 sm:w-72 lg:static lg:w-[234px]"
            >
              <nav
                x-show="currentSidebarTab == 'linksTab'"
                aria-label="Main"
                class="flex flex-col h-full h-[85vh]"
              >
                <!-- Links -->
                <div
                  class="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto"
                >
                  <!-- CUstomer  -->
                  <div
                    v-if="permission.can_view_customer == 1"
                    @click="goToCustomer()"
                    class="flex items-center pt-[30px] cursor-pointer"
                  >
                    <img
                      :class="{
                        'opacity-100': this.$route.path == '/customer',
                      }"
                      class="w-[24px] opacity-40"
                      src="../assets/imgs/secondNavBar/profile-2user.png"
                      alt=""
                    />
                    <p
                      :class="{
                        'text-black': this.$route.path == '/customer',
                        'mr-[5px]': lang == 'ar',
                      }"
                      class="text-gray-400 f-700 ml-[16px]"
                    >
                      {{ $t("Customer") }}
                    </p>
                  </div>
                  <!-- Vendor  -->
                  <div
                    v-if="permission.can_view_vendor == 1"
                    @click="goToVendor()"
                    class="flex items-center pt-[30px] cursor-pointer"
                  >
                    <img
                      :class="{ 'opacity-100': this.$route.path == '/vendors' }"
                      class="w-[24px] opacity-40"
                      src="../assets/imgs/secondNavBar/shop.png"
                      alt=""
                    />
                    <p
                      :class="{
                        'text-black': this.$route.path == '/vendors',
                        'mr-[5px]': lang == 'ar',
                      }"
                      class="text-gray-400 f-700 ml-[16px] opacity-80"
                    >
                      {{ $t("Vendors") }}
                    </p>
                  </div>
                  <!-- Employe   -->
                  <div
                    v-if="permission.can_view_employee == 1"
                    @click="goToEmployee()"
                    class="flex items-center pt-[30px] cursor-pointer"
                  >
                    <img
                      :class="{
                        'opacity-100': this.$route.path == '/employee',
                        'mr-[5px]': lang == 'ar',
                      }"
                      class="w-[24px] opacity-40"
                      src="../assets/imgs/secondNavBar/profile.png"
                      alt=""
                    />
                    <p
                      :class="{
                        'text-black': this.$route.path == '/employee',
                        'mr-[5px]': lang == 'ar',
                      }"
                      class="text-gray-400 f-700 ml-[16px] opacity-80"
                    >
                      {{ $t("Employe") }}
                    </p>
                  </div>
                  <!-- Parts   -->
                  <div
                    v-if="permission.can_view_parts == 1"
                    :class="{ top: permission.can_view_parts == 1 }"
                    @click="goToParts()"
                    class="flex items-center pt-[20px] cursor-pointer"
                  >
                    <img
                      :class="{ 'opacity-100': this.$route.path == '/parts' }"
                      class="w-[24px] opacity-40"
                      src="../assets/imgs/secondNavBar/main-component.png"
                      alt=""
                    />
                    <p
                      :class="{
                        'text-black': this.$route.path == '/parts',
                        'mr-[5px]': lang == 'ar',
                      }"
                      class="text-gray-400 f-700 ml-[16px] opacity-80"
                    >
                      {{ $t("Parts") }}
                    </p>
                  </div>
                  <!-- Conditions   -->
                  <!-- <div
                    v-if="permission.can_view_condition == 1"
                    @click="goToConditions()"
                    class="flex bottom items-center pt-[30px] cursor-pointer"
                  >
                    <img
                      :class="{
                        'opacity-100': this.$route.path == '/conditions',
                      }"
                      class="w-[24px] opacity-40"
                      src="../assets/imgs/secondNavBar/folder-connection.png"
                      alt=""
                    />
                    <p
                      :class="{
                        'text-black': this.$route.path == '/conditions',
                        'mr-[5px]': lang == 'ar',
                      }"
                      class="text-gray-400 f-700 ml-[16px] opacity-80"
                    >
                      {{ $t("Conditions") }}
                    </p>
                  </div> -->
                  <!-- Locations -->
                  <div
                    v-if="permission.can_view_location == 1"
                    @click="goToLocations()"
                    class="flex bottom pt-[10px] items-center cursor-pointer"
                  >
                    <img
                      :class="{
                        'opacity-100': this.$route.path == '/locations',
                      }"
                      class="w-[24px] opacity-40"
                      src="../assets/imgs/verticalNav/Vector(7).png"
                      alt=""
                    />
                    <p
                      :class="{
                        'text-black': this.$route.path == '/locations',
                        'mr-[5px]': lang == 'ar',
                      }"
                      class="text-gray-400 f-700 ml-[16px] opacity-80"
                    >
                      {{ $t("locations") }}
                    </p>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script
  src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.7.3/dist/alpine.min.js"
  defer
></script>
<script>
export default {
  data() {
    return {
      isSidebarOpen: true,
      currentSidebarTab: "messagesTab",
      isSubHeaderOpen: false,
      secondNav: true,
      lang: "",
      error: false,
      permission: {},
      role : ""
    };
  },
  mounted() {
    this.lang = localStorage.getItem("lang");
    window.addEventListener("resize", this.onResize); // Listen for window resize event
    this.onResize();
    this.error = localStorage.getItem("error");

    const permission = localStorage.getItem("permissions");
    this.permission = JSON.parse(permission);
    this.role = localStorage.getItem("role")
    // console.log(JSON.parse(permission))
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize); // Remove event listener when component is destroyed
    this.onResize();
  },
  watch: {
    secondNav(newValue) {
      // Watch for changes in secondNav
      console.log("secondNav changed:", newValue);
      // You can perform additional actions here based on the new value of secondNav
    },
  },
  methods: {
    goToDashboard() {
      if (this.isSidebarOpen && this.currentSidebarTab == "messagesTab") {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
      this.currentSidebarTab = "messagesTab";
      this.$router.push("/dashboard");
    },
    // set up btn
    goToCustomer() {
      if (this.isSidebarOpen && this.currentSidebarTab == "linksTab") {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
      this.currentSidebarTab = "linksTab";
      this.$router.push("/customer");
      //  this.secondNav = false;
      this.onResize();
    },
    // go to vendor
    goToVendor() {
      if (this.isSidebarOpen && this.currentSidebarTab == "linksTab") {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
      this.currentSidebarTab = "linksTab";
      this.$router.push("/vendors");
      this.onResize();
    },
    // go to employee
    goToEmployee() {
      if (this.isSidebarOpen && this.currentSidebarTab == "linksTab") {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
      this.currentSidebarTab = "linksTab";
      this.$router.push("/employee");
      this.onResize();
    },
    // got to parts
    goToParts() {
      if (this.isSidebarOpen && this.currentSidebarTab == "linksTab") {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
      this.currentSidebarTab = "linksTab";
      this.$router.push("/parts");
      this.onResize();
    },
    // go to conditions
    goToConditions() {
      if (this.isSidebarOpen && this.currentSidebarTab == "linksTab") {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
      this.currentSidebarTab = "linksTab";
      this.$router.push("/conditions");
      this.onResize();
    },
    // go to locations
    goToLocations() {
      if (this.isSidebarOpen && this.currentSidebarTab == "linksTab") {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
      this.currentSidebarTab = "linksTab";
      this.$router.push("/locations");
      this.onResize();
    },
    // go to pages
    goToPages() {
      const permission = localStorage.getItem("permissions");
      this.permission = JSON.parse(permission);
      console.log(this.permission, "permissiion");
      if (
        this.permission.can_view_customer == 1
      ) {
        this.$router.push("/customer");
      }
      if (
        this.permission.can_view_vendor == 1
      ) {
        this.$router.push("/vendors");
      }
      if (
        this.permission.can_view_employee == 1
      ) {
        this.$router.push("/employee");
      }
      if (
        this.permission.can_view_condition == 1
      ) {
        this.$router.push("/conditions");
      }
      if (
        this.permission.can_view_location == 1
      ) {
        this.$router.push("/locations");
      }
      if (
        this.permission.can_view_parts == 1
      ) {
        this.$router.push("/parts");
      }
    },
    // go to pricing
    goToPricingPage (){
       if (this.isSidebarOpen && this.currentSidebarTab == "messagesTab") {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
      this.currentSidebarTab = "messagesTab";
      this.$router.push("/pricing");
    },
    // go to history
    goToHistory(){

       if (this.isSidebarOpen && this.currentSidebarTab == "messagesTab") {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
      this.currentSidebarTab = "messagesTab";
      this.$router.push("/history");
    },
    // logout
    logOut() {
      this.$cookies.set("token", "");
      localStorage.setItem("token", "Bearer", "");
      localStorage.setItem("name", "");
      localStorage.setItem("permissions" , "");

      // this.$router.push("/");
      location.reload();
    },
    // toggle second navbar
    toggleSecondNavBar() {
      this.secondNav = !this.secondNav;
      console.log(this.secondNav);
    },
    onResize() {
      if (window.innerWidth < 1840) {
        this.secondNav = false;
        localStorage.setItem("open", this.secondNav);
      } else if (window.innerWidth > 1840) {
        this.secondNav = true;
        localStorage.setItem("open", this.secondNav);
      }
    },
  },
};
</script>

<style scoped>
.second-nav {
  margin-top: 124px;
  position: absolute;
  margin-left: 74px;
}
.second-nav-arabic {
  margin-top: 124px;
  position: absolute;
  margin-left: 0px;
}
/* .appear-nav {
  display: block;
}
@media (max-width: 1836px) {
  .appear-nav {
    display: none;
  }
} */
.top {
  border-top: 2px solid rgba(66, 66, 66, 0.2);
  padding-top: 20px;
  margin-top: 20px !important;
}
.bottom {
  border-bottom: 2px solid rgba(66, 66, 66, 0.2);
  padding-bottom: 20px;
  margin-bottom: 20px !important;
}
</style>
