<template>
  <div class="">
    <div
      x-transition:enter="transform transition-transform duration-300"
      x-transition:enter-start="-translate-x-full"
      x-transition:enter-end="translate-x-0"
      x-transition:leave="transform transition-transform duration-300"
      x-transition:leave-start="translate-x-0"
      x-transition:leave-end="-translate-x-full"
      x-show="isSidebarOpen"
      class="fixed inset-y-0 left-0 h-[85vh] z-10 flex-shrink-0 w-[213px] bg-white border-r-2 border-indigo-100 shadow-lg sm:left-16 sm:w-72 lg:static lg:w-[234px]"
    >
      <nav
        x-show="currentSidebarTab == 'linksTab'"
        aria-label="Main"
        class="flex flex-col h-full h-[85vh]"
      >
        <!-- Links -->
        <div class="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto">
          <!-- CUstomer  -->
          <div class="flex items-center pt-[30px] cursor-pointer">
            <img
              :class="{ 'opacity-100': this.$route.path == '/customer' }"
              class="w-[24px] opacity-40"
              src="../../assets/imgs/secondNavBar/profile-2user.png"
              alt=""
            />
            <p
              :class="{ 'text-black': this.$route.path == '/customer' }"
              class="text-gray-400 f-700 ml-[16px]"
            >
              {{ $t("Customer") }}
            </p>
          </div>
          <!-- Vendor  -->
          <div class="flex items-center pt-[30px] cursor-pointer">
            <img
              :class="{ 'opacity-100': type == 'vendor' }"
              class="w-[24px] opacity-40"
              src="../../assets/imgs/secondNavBar/shop.png"
              alt=""
            />
            <p
              :class="{ 'text-black': type == 'vendor' }"
              class="text-gray-400 f-700 ml-[16px] opacity-80"
            >
              {{ $t("Vendors") }}
            </p>
          </div>
          <!-- Employe   -->
          <div class="flex items-center pt-[30px] cursor-pointer">
            <img
              :class="{ 'opacity-100': type == 'employe' }"
              class="w-[24px] opacity-40"
              src="../../assets/imgs/secondNavBar/profile.png"
              alt=""
            />
            <p
              :class="{ 'text-black': type == 'employe' }"
              class="text-gray-400 f-700 ml-[16px] opacity-80"
            >
              {{ $t("Employe") }}
            </p>
          </div>
          <!-- Parts   -->
          <div class="flex items-center pt-[30px] cursor-pointer">
            <img
              :class="{ 'opacity-100': type == 'parts' }"
              class="w-[24px] opacity-40"
              src="../../assets/imgs/secondNavBar/main-component.png"
              alt=""
            />
            <p
              :class="{ 'text-black': type == 'parts' }"
              class="text-gray-400 f-700 ml-[16px] opacity-80"
            >
              {{ $t("Parts") }}
            </p>
          </div>
          <!-- Conditions   -->
          <div class="flex items-center pt-[30px] cursor-pointer">
            <img
              :class="{ 'opacity-100': type == 'conditions' }"
              class="w-[24px] opacity-40"
              src="../../assets/imgs/secondNavBar/folder-connection.png"
              alt=""
            />
            <p
              :class="{ 'text-black': type == 'conditions' }"
              class="text-gray-400 f-700 ml-[16px] opacity-80"
            >
              {{ $t("Conditions") }}
            </p>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>
<style>
.text-black{
color: black  !important;
}
.opacity-100{
  opacity: 1;
}
</style>