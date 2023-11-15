<template>
  <div class="flex p-[12px] justify-end">
    <div v-if="loading == true" class="flex justify-center w-[100%]">
      <Loading :text="'Loading'" />
    </div>
    <!-- <SecondVerticalNavBar v-if="loading == false" :type="'employee'" /> -->
    <div v-if="loading == false" class="px-4 sm:px-8 direction-lang" :class="[
      {
        ltr: lang === 'en',
        rtl: lang === 'ar',
        container: open == 'true',
        'w-[100%]': open == 'false',
      },
    ]">
      <div class="w-[100%]">
        <div style="padding-top: 0px" class="-mx-4 sm:-mx-8 px-4 py-4 overflow-x-auto add-margin-left remove-margin-left">
          <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <div class="mb-[13px] flex justify-space-between">
              <!-- add btn -->
              <div :class="{
                'p-[30px]': open == 'true',
                'p-[25px]': open == 'false',
              }" v-if="permissions.includes('can_add_location')" class="bg-filter">
                <button @click="addNewLocation()"
                  class="bg-blue-500 items-center flex add-new hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                  <img class="w-[20px]" src="../../assets/imgs/comman/PlusCircle.png" alt="" />
                  <p class="ml-[10px]">
                    {{ $t("Add new") }}
                  </p>
                </button>

                <!-- Add New Employee -->

                <div class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="addLocation">
                  <div
                    class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 transition-opacity">
                      <div class="absolute inset-0 bg-gray-900 opacity-75" />
                    </div>
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                    <div
                      class="p-[30px] media inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[776px] sm:w-full"
                      role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                      <div class="absolute w-[50%] ml-[154px] mt-[332px]">
                        <Loading v-if="loading" :text="'Saving'" />
                      </div>
                      <!-- close btn -->
                      <div :disabled="loading" :class="{ 'cusror-disabled': loading }" class="px-4 py-3 text-left">
                        <button type="button" class="py-2 px-4 bg-white text-black rounded mr-2 flex"
                          @click="addNewLocation('close')">
                          <img class="w-[24px]" src="../../assets/imgs/comman/close-square.png" alt="" />
                          <p class="ml-[12px]">
                            {{ $t("Close") }}
                          </p>
                        </button>
                      </div>
                      <!-- tabs start -->

                      <div :disabled="loading" :class="{ 'cusror-disabled': loading }" v-if="showInformation"
                        id="Informations" class="tab mt-1 items-center">
                        <div class="flex items-center justify-space-between">
                          <!-- information -->
                          <div :class="{ 'text-right': lang == 'ar' }"
                            class="text-lg font-bold rounded-lg w-[100%] mb-[20px]">
                            <h1 :class="[
                              {
                                'text-right': lang == 'ar',
                              },
                            ]" class="mt-[20px] text-left">
                              {{ $t("Location") }} :
                            </h1>

                            <div :class="{ 'text-right': lang == 'ar' }" class="form-style mt-[20px] p-[30px]">
                              <!-- Choose country and Street -->
                              <div :class="{ 'text-right': lang == 'ar' }" class="flex">
                                <!-- Employee name -->
                                <div class="group w-[50%]">
                                  <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                    class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                      $t("Choose Country") }} :
                                    <p class="required">*</p>
                                  </label>
                                  <div class="flex">
                                    <select v-model="country_name"
                                      class="appearance-none border-select w-full py-1 px-2 bg-white" name="whatever"
                                      :class="{
                                        'outline-error':
                                          emptyField.includes(
                                            'employee_email'
                                          ) || invalidEmail == true,
                                      }" @change="chooseCountry" id="frm-whatever">
                                      <option v-for="(country, i) in countries" :value="country.name" :key="i">
                                        {{ country.name }}
                                      </option>
                                    </select>

                                    <img :class="{
                                      'arrow-select-arabic': lang == 'ar',
                                    }" class="arrow-select" src="../../assets/imgs/comman/Icon.png" alt="" />
                                  </div>
                                  <p :class="{ 'text-right': lang == 'ar' }" v-if="emptyField.includes('country_name')"
                                    class="error-message text-left">
                                    {{ $t("Choose Country") }}
                                    {{ $t("required") }}
                                  </p>
                                </div>
                                <!-- register code -->
                                <div :class="{ 'mr-[20px]': lang == 'ar' }" class="group ml-[20px] w-[50%]">
                                  <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                    class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                      $t("Choose city") }} :
                                    <p class="required">*</p>
                                  </label>
                                  <img :class="{
                                    'arrow-select-arabic-city': lang == 'ar',
                                  }" style="left: 677px" class="arrow-select" src="../../assets/imgs/comman/Icon.png"
                                    alt="" />
                                  <select v-model="city_name"
                                    class="appearance-none border-select w-full py-1 px-2 bg-white" name="whatever"
                                    id="frm-whatever">
                                    <option v-for="(city, i) in cities" :value="city" :key="i">
                                      {{ city }}
                                    </option>
                                  </select>
                                  <p :class="{ 'text-right': lang == 'ar' }" v-if="emptyField.includes('city_name')"
                                    class="error-message text-left">
                                    {{ $t("Choose city") }}
                                    {{ $t("required") }}
                                  </p>
                                </div>
                              </div>
                              <!-- Employee EMail and Employee Password -->
                              <div :class="{ 'text-right': lang == 'ar' }" class="flex mt-[20px]">
                                <!-- Employee name -->
                                <div class="group w-[50%]">
                                  <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                    class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                      $t("Area") }} :</label>
                                  <input id="1" type="text" v-model="area" placeholder=""
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                                </div>
                                <!-- street name -->
                                <div :class="{ 'mr-[20px]': lang == 'ar' }" class="group ml-[20px] w-[50%]">
                                  <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                    class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                      $t("street") }} :</label>
                                  <input id="1" type="text" v-model="street" placeholder=""
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                                </div>
                              </div>

                              <!-- Employee Group and Employee position -->
                              <div :class="{ 'text-right': lang == 'ar' }" class="flex mt-[20px]">
                                <div class="group w-[50%]">
                                  <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                    class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                      $t("Building Number") }} :</label>
                                  <input id="1" type="text" v-model="building_number" placeholder=""
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                                </div>
                                <!-- register code -->
                                <div :class="{ 'mr-[20px]': lang == 'ar' }" class="group ml-[20px] w-[50%]">
                                  <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                    class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                      $t("Floor") }} :</label>
                                  <input id="1" type="text" v-model="floor" placeholder="000012"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                                </div>
                              </div>
                            </div>
                            <!-- Pick Location -->
                            <div class="group mt-[20px]">
                              <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                  $t("Choose type") }} :
                                <p class="required">*</p>
                              </label>
                              <div class="flex">
                                <select v-model="type" class="appearance-none border-select w-full py-1 px-2 bg-white"
                                  name="whatever" @change="changeType" id="frm-whatever">
                                  <option value="vendor">
                                    {{ $t("Vendor") }}
                                  </option>
                                  <option value="customer">
                                    {{ $t("Customer") }}
                                  </option>
                                  <option value="employee">
                                    {{ $t("Employee") }}
                                  </option>
                                </select>

                                <img :class="{ 'right-[706px]': lang == 'ar' }"
                                  class="absolute right-[70px] w-[20px] mt-[19px]" src="../../assets/imgs/comman/Icon.png"
                                  alt="" />
                              </div>
                              <p v-if="chooseType == true" :class="{
                                'text-right': lang == 'ar',
                              }" class="error-message text-left">
                                {{ $t("Choose type") }}
                                {{ $t("required") }}
                              </p>
                            </div>
                            <!-- vendor select -->
                            <div v-if="type == 'vendor'" class="group mt-[20px]">
                              <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                  $t("Choose vendor") }} :
                                <p class="required">*</p>
                              </label>
                              <multiselect v-model="selectedVendors" :options="vendors" track-by="vendorId"
                                label="vendor_name" multiple style="border-radius: 25px" placeholder="Select Vendors">
                              </multiselect>
                              <p :class="{ 'text-right': lang == 'ar' }" class="error-message text-left">
                                {{ $t("Choose vendor") }}
                                {{ $t("required") }}
                              </p>
                            </div>
                            <!-- employee seleect -->
                            <div v-if="type == 'customer'" class="group mt-[20px]">
                              <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                  $t("Choose Customer") }} :
                                <p class="required">*</p>
                              </label>

                              <multiselect v-model="selectedCustomers" :options="customers" track-by="id"
                                label="customer_name" multiple style="border-radius: 25px" placeholder="Select Customers">
                              </multiselect>

                            </div>
                            <div v-if="type == 'employee'" class="group mt-[20px]">
                              <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                  $t("Choose Employee") }} :
                                <p class="required">*</p>
                              </label>

                              <multiselect v-model="selectedEmployee" :options="members" track-by="EmployeeId"
                                label="EmployeeName" multiple style="border-radius: 25px" placeholder="Select Members">
                              </multiselect>

                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- tabs end -->
                      <div :disabled="loading" :class="{ 'cusror-disabled': loading }" class="flex mb-[30px]">
                        <div class="w-[50%]">
                          <button :disabled="loading" :class="{ 'cusror-disabled': loading }"
                            @click="addNewLocation('close')"
                            class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300">
                            {{ $t("close") }}
                          </button>
                        </div>
                        <div class="w-[50%] ml-[6px]">
                          <button :disabled="loading" :class="{ 'cusror-disabled': loading }" @click="postLocation('add')"
                            class="action-btn rounded-lg w-[100%] px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300">
                            {{ $t("Add") }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div :class="{
                'w-fulll': !permissions.includes('can_add_location'),
              }" class="bg-filter w-[86%] flex">
                <div class="items-center flex p-[30px]">
                  <h1 class="filter-text">{{ $t("Filter") }}</h1>
                </div>
                <div class="w-[50%] flex items-center">
                  <div class="items-center justify-between flex rounded-full shadow-lg p-2 sticky w-[100%]"
                    style="top: 5px">
                    <div style="border-right: 1px solid #ebebeb">
                      <div class="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer">
                        <img class="w-[70%]" src="../../assets/imgs/verticalNav/search-status.png" alt="" />
                      </div>
                    </div>

                    <input
                      class="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                      type="text" v-model="search" @input="searchData" :placeholder="$t('search')" />

                    <div :class="[{ rotate: lang == 'ar' }]" class="cursor-pointer">
                      <img class="w-[70%]" src="../../assets/imgs/verticalNav/send.png" alt="" />
                    </div>
                  </div>
                </div>

                <div class="flex items-center p-[29px]">
                  <select class="appearance-none border-select branches w-full py-1 px-2 bg-white" name="whatever"
                    v-model="branch_idd" id="frm-whatever">
                    <option disabled value="1">
                      {{ $t("All Branches") }}
                    </option>
                    <option v-for="(branch, index) in allBranches" :key="index" :value="1">
                      {{ branch.BranchName }}
                    </option>
                  </select>
                </div>

                <!-- all TYpes -->

                <dropdown style="padding-left: 0px; padding-right: 20px" class="flex items-center pl-[0px] p-[29px]">
                  <input id="allTypes" type="checkbox" />
                  <label for="allTypes" class="animate flex w-[180px]">
                    <p class="text-[#8897AE]">
                      {{ all_types }}
                    </p>
                  </label>
                  <ul style="margin-top: 223px; margin-left: 24px" class="animate">
                    <li @click="pickType('individual')" class="animate">
                      {{ $t("individual") }}
                    </li>
                    <li @click="pickType('Fleet')" class="animate flex">
                      <p class="ml-[13px]">{{ $t("Fleet") }}</p>
                    </li>
                    <li @click="pickType('Retailer')" class="animate flex">
                      <p class="ml-[13px]">{{ $t("Retailer") }}</p>
                    </li>
                    <li @click="pickType('workshops')" class="animate flex">
                      <p class="ml-[13px]">{{ $t("workshops") }}</p>
                    </li>
                  </ul>
                </dropdown>
                <!-- apply btn  -->
                <div :class="{ 'mr-[20px]': lang == 'ar' }" class="grid items-center">
                  <button @click="filter()"
                    class="bg-blue-500 bg-[#394889] flex add-new hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                    <p class="">
                      {{ $t("Apply") }}
                    </p>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="loading == false && locations.length > 0" class="p-[20px] bg-table">
              <table class="min-w-full leading-normal table-style">
                <thead>
                  <tr>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div class="flex">
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap table-headers">
                            {{ $t("Vendor") }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Customer") }}
                      </p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Location") }}
                      </p>
                    </td>

                    <td v-if="permissions.includes('can_update_location')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"></td>
                    <td v-if="permissions.includes('can_delete_location')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"></td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(location, index) in locations" :key="index">
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div class="flex">
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">
                            <span v-for="vendor in location.Vendor"
                              class="bg-blue-100 text-center text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{{
                                vendor.vendor_name }}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">
                        <span v-for="customer in location.Customer"
                          class="bg-blue-100 text-center text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{{
                            customer.customer_name }}</span>
                      </p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ location.Address }}
                      </p>
                    </td>

                    <td v-if="permissions.includes('can_update_location')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div>
                        <button class="view-btn" @click="toggleModal(location.Id, 'open')">
                          <img class="w-[18px] h-[18px]" src="../../assets/imgs/comman/eye.png" alt="" />
                          {{ $t("View") }}
                        </button>
                      </div>
                      <!-- view and edit modal -->

                      <div class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" :id="`modal` + location.Id">
                        <div
                          class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div class="fixed inset-0 transition-opacity">
                            <div class="absolute inset-0 bg-gray-900 opacity-75" />
                          </div>
                          <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                          <div
                            class="p-[30px] media inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[776px] sm:w-full"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div class="absolute w-[50%] ml-[154px] mt-[332px]">
                              <Loading v-if="loading" :text="'Saving'" />
                            </div>
                            <!-- close btn -->
                            <div :disabled="loading" :class="{ 'cusror-disabled': loading }" class="px-4 py-3 text-left">
                              <button type="button" class="py-2 px-4 bg-white text-black rounded mr-2 flex"
                                @click="toggleModal(location.Id, 'close')">
                                <img class="w-[24px]" src="../../assets/imgs/comman/close-square.png" alt="" />
                                <p class="ml-[12px]">
                                  {{ $t("Close") }}
                                </p>
                              </button>
                            </div>
                            <!-- tabs start -->

                            <div :disabled="loading" :class="{ 'cusror-disabled': loading }" v-if="showInformation"
                              id="Informations" class="tab mt-1 items-center">
                              <div class="flex items-center justify-space-between">
                                <!-- information -->
                                <div :class="{ 'text-right': lang == 'ar' }"
                                  class="text-lg font-bold rounded-lg w-[100%] mb-[20px]">
                                  <h1 :class="[
                                    {
                                      'text-right': lang == 'ar',
                                    },
                                  ]" class="mt-[20px] text-left">
                                    {{ $t("Location") }} :
                                  </h1>

                                  <div :class="{ 'text-right': lang == 'ar' }" class="form-style mt-[20px] p-[30px]">
                                    <!-- Choose country and Street -->
                                    <div :class="{ 'text-right': lang == 'ar' }" class="flex">
                                      <!-- Employee name -->
                                      <div class="group w-[50%]">
                                        <label :class="{
                                          'text-right': lang == 'ar',
                                        }" for="1"
                                          class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                            $t("Choose Country") }} :
                                          <p class="required">*</p>
                                        </label>
                                        <div class="flex">
                                          <select v-model="country_name"
                                            class="appearance-none border-select w-full py-1 px-2 bg-white"
                                            name="whatever" :class="{
                                              'outline-error':
                                                emptyField.includes(
                                                  'employee_email'
                                                ) || invalidEmail == true,
                                            }" @change="chooseCountry" id="frm-whatever">
                                            <option v-for="(country, i) in countries" :value="country.name" :key="i">
                                              {{ country.name }}
                                            </option>
                                          </select>

                                          <img class="arrow-select" src="../../assets/imgs/comman/Icon.png" alt="" />
                                        </div>
                                        <p :class="{
                                          'text-right': lang == 'ar',
                                        }" v-if="emptyField.includes('country_name')
  " class="error-message text-left">
                                          {{ $t("Choose Country") }}
                                          {{ $t("required") }}
                                        </p>
                                      </div>
                                      <!-- register code -->
                                      <div :class="{ 'mr-[20px]': lang == 'ar' }" class="group ml-[20px] w-[50%]">
                                        <label :class="{
                                          'text-right': lang == 'ar',
                                        }" for="1"
                                          class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                            $t("Choose city") }} :
                                          <p class="required">*</p>
                                        </label>
                                        <img style="left: 677px" class="arrow-select"
                                          src="../../assets/imgs/comman/Icon.png" alt="" />
                                        <select v-model="city_name"
                                          class="appearance-none border-select w-full py-1 px-2 bg-white" name="whatever"
                                          id="frm-whatever">
                                          <option v-for="(city, i) in cities" :value="city" :key="i">
                                            {{ city }}
                                          </option>
                                        </select>
                                        <p :class="{
                                          'text-right': lang == 'ar',
                                        }" v-if="emptyField.includes('city_name')" class="error-message text-left">
                                          {{ $t("Choose city") }}
                                          {{ $t("required") }}
                                        </p>
                                      </div>
                                    </div>
                                    <!-- Employee EMail and Employee Password -->
                                    <div :class="{ 'text-right': lang == 'ar' }" class="flex mt-[20px]">
                                      <!-- Employee name -->
                                      <div class="group w-[50%]">
                                        <label :class="{
                                          'text-right': lang == 'ar',
                                        }" for="1"
                                          class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                            $t("Area") }} :</label>
                                        <input id="1" type="text" v-model="area" placeholder=""
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                                      </div>
                                      <!-- street name -->
                                      <div :class="{ 'mr-[20px]': lang == 'ar' }" class="group ml-[20px] w-[50%]">
                                        <label :class="{
                                          'text-right': lang == 'ar',
                                        }" for="1"
                                          class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                            $t("street") }} :</label>
                                        <input id="1" type="text" v-model="street" placeholder=""
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                                      </div>
                                    </div>

                                    <!-- Employee Group and Employee position -->
                                    <div :class="{ 'text-right': lang == 'ar' }" class="flex mt-[20px]">
                                      <div class="group w-[50%]">
                                        <label :class="{
                                          'text-right': lang == 'ar',
                                        }" for="1"
                                          class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                            $t("Building Number") }} :</label>
                                        <input id="1" type="text" v-model="building_number" placeholder=""
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                                      </div>
                                      <!-- register code -->
                                      <div :class="{ 'mr-[20px]': lang == 'ar' }" class="group ml-[20px] w-[50%]">
                                        <label :class="{
                                          'text-right': lang == 'ar',
                                        }" for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                            $t("Floor") }} :</label>
                                        <input id="1" type="text" v-model="floor" placeholder="000012"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400" />
                                      </div>
                                    </div>
                                  </div>
                                  <!-- Pick Location -->
                                  <div class="group mt-[20px]">
                                    <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                      class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                        $t("Choose type") }} :
                                      <p class="required">*</p>
                                    </label>
                                    <div class="flex">
                                      <select v-model="type"
                                        class="appearance-none border-select w-full py-1 px-2 bg-white" name="whatever"
                                        @change="changeType" id="frm-whatever">
                                        <option value="vendor">
                                          {{ $t("Vendor") }}
                                        </option>
                                        <option value="customer">
                                          {{ $t("Customer") }}
                                        </option>
                                        <option value="employee">
                                          {{ $t("Employee") }}
                                        </option>
                                      </select>

                                      <img :class="{
                                        'right-[706px]': lang == 'ar',
                                      }" class="absolute right-[70px] w-[20px] mt-[19px]"
                                        src="../../assets/imgs/comman/Icon.png" alt="" />
                                    </div>
                                    <p :class="{
                                      'text-right': lang == 'ar',
                                    }" v-if="chooseType" class="error-message text-left">
                                      {{ $t("Choose type") }}
                                      {{ $t("required") }}
                                    </p>
                                  </div>
                                  <!-- vendor select -->
                                  <div v-if="type == 'vendor'" class="group mt-[20px]">
                                    <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                      class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                        $t("Choose vendor") }} :
                                      <p class="required">*</p>
                                    </label>
                                    >
                                    <multiselect v-model="selectedVendors" :options="vendors" track-by="vendorId"
                                      label="vendor_name" multiple style="border-radius: 25px"
                                      placeholder="Select Vendors">
                                    </multiselect>

                                  </div>
                                  <!-- employee seleect -->
                                  <div v-if="type == 'customer'" class="group mt-[20px]">
                                    <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                      class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                        $t("Choose Customer") }} :
                                      <p class="required">*</p>
                                    </label>
                                    <multiselect v-model="selectedCustomers" :options="customers" track-by="id"
                                      label="customer_name" multiple style="border-radius: 25px"
                                      placeholder="Select Customers">
                                    </multiselect>


                                  </div>
                                  <!-- employeee -->
                                  <div v-if="type == 'employee'" class="group mt-[20px]">
                                    <label :class="{ 'text-right': lang == 'ar' }" for="1"
                                      class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">{{
                                        $t("Choose Employee") }} :
                                      <p class="required">*</p>
                                    </label>

                                    <multiselect v-model="selectedEmployee" :options="members" track-by="EmployeeId"
                                      label="EmployeeName" multiple style="border-radius: 25px"
                                      placeholder="Select Members">
                                    </multiselect>

                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- tabs end -->
                            <div :disabled="loading" :class="{ 'cusror-disabled': loading }" class="flex mb-[30px]">
                              <div class="w-[50%]">
                                <button :disabled="loading" :class="{ 'cusror-disabled': loading }"
                                  @click="toggleModal(location.Id, 'close')"
                                  class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300">
                                  {{ $t("close") }}
                                </button>
                              </div>
                              <div class="w-[50%] ml-[6px]">
                                <button :disabled="loading" :class="{ 'cusror-disabled': loading }"
                                  @click="editLocation()"
                                  class="action-btn rounded-lg w-[100%] px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300">
                                  {{ $t("Edit") }}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td v-if="permissions.includes('can_delete_location')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
                      <div @click="deleteLocation(location.Id, 'open')" class="w-[20px]">
                        <img clas="w-[20px]" src="../../assets/imgs/comman/delete-removebg-preview.png" alt="" />
                      </div>
                      <!-- are you sure delete modal  -->
                      <div class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
                        :id="`Deletemodal${location.Id}`">
                        <div
                          class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div class="fixed inset-0 transition-opacity">
                            <div class="absolute inset-0 bg-gray-900 opacity-75" />
                          </div>
                          <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                          <div
                            class="p-[30px] inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[785px] sm:w-full"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <!-- loading component -->
                            <div class="absolute w-[50%] ml-[154px] mt-[332px]">
                              <Loading v-if="loading" :text="'Saving'" />
                            </div>
                            <!-- close btn -->
                            <div :disabled="loading" :class="{ 'cusror-disabled': loading }" class="px-4 py-3 text-left">
                              <button type="button" class="py-2 px-4 bg-white text-black rounded mr-2 flex"
                                @click="deleteLocation(location.Id, 'close')">
                                <img class="w-[24px]" src="../../assets/imgs/comman/close-square.png" alt="" />
                                <p class="ml-[12px]">
                                  {{ $t("Close") }}
                                </p>
                              </button>
                            </div>
                            <div class="px-4 py-3 text-left flex justify-center">
                              <h1 class="flex are-you-sure-delete-text">
                                {{ $t("Are You Sure You want to Delete ?") }}
                                {{ location.Address }}
                                <img class="w-[20px] ml-[15px]" src="../../assets/imgs/comman/delete-removebg-preview.png"
                                  alt="" />
                              </h1>
                            </div>
                            <!-- tabs end -->
                            <div :class="{ 'cusror-disabled': loading }" class="flex mt-[60px]">
                              <div class="w-[50%]">
                                <button :disabled="loading" :class="{ 'cusror-disabled': loading }"
                                  @click="deleteLocation(location.Id, 'close')"
                                  class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300">
                                  {{ $t("close") }}
                                </button>
                              </div>
                              <div class="w-[50%] ml-[6px]">
                                <button :disabled="loading" :class="{ 'cusror-disabled': loading }"
                                  @click="deleteLocation(location.Id, 'delete')"
                                  class="delete-btn rounded-lg w-[100%] px-4 py-2 bg-red-500 text-blue-100 hover:bg-red-600 duration-300">
                                  {{ $t("Delete") }}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="mt-[20px]">
                <pagination :total-pages="totalPages" :total="total" v-model="currentPage" :per-page="perPage"
                  :current-page="currentPage" :has-more-pages="hasMorePages" @pagechanged="showMore">
                </pagination>
              </div>
            </div>
            <div v-else-if="loading == false && locations.length == 0" class="w-[100%]">
              <div class="flex justify-center mt-[135px]">
                <img src="../../assets/imgs/comman/no-data-empty-data-concept-vector-41830412-removebg-preview.png"
                  alt="" />
              </div>
              <h1 class="text-center no-data">
                {{ $t("There is No Location") }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      locations: [],
      showInformation: true,
      showPayemnt: false,
      showVichels: false,
      type: null,
      active_vendor: true,
      activeCreditLimit: false,
      disabled: true,
      activePayment: false,
      errorpasswordValidation: false,
      disabledPayment: true,
      emptyField: "",
      invalidEmail: false,
      emailTimer: null,
      passwrodTimer: null,
      loading: false,
      all_payments: this.$t("All Payments"),
      all_types: this.$t("All Types"),
      branch_idd: 1,
      search: "",

      // data
      country_name: null,
      city_name: null,
      area: null,
      street: null,
      vat_number: null,
      building_number: null,
      floor: null,
      employee_id: null,
      vendor_id: null,
      customer_id: null,

      password: null,
      id: "",
      // image: null,

      // pagination data
      page: 1,
      totalPages: "",
      total: "",
      perPage: "",
      currentPage: 1,
      hasMorePages: true,
      showPassword: false,
      permissions: [],
      loading: true,
      lang: "",
      allBranches: [],
      open: false,

      countries: [],
      cities: [],
      members: [],
      vendors: [],
      customers: [],
      chooseType: false,


      selectedVendors: [],
      selectedCustomers: [],
      selectedEmployee: [],
      
    };
  },
  mounted() {
    // bring All Data
    this.$axios.$get("/Vendor/GetAllVendor").then((res) => {
      this.vendors = res.Vendor.data;
    });
    // get all locations

    this.$axios.$get("/Location/GetAllLocation").then((res) => {
      this.locations = res.Location.data;
      this.totalPages = res.Location.meta.last_page;
      this.perPage = res.Location.meta.per_page;
      this.total = res.Location.meta.total;
      this.permissions = res.permissions;
      this.loading = false;
    });
    // get all countries
    this.$axios
      .get("https://countriesnow.space/api/v0.1/countries/capital")
      .then((res) => {
        this.countries = res.data.data;
      });
    // tabs code
    this.lang = localStorage.getItem("lang");

    if (this.lang == "en") {
      this.$i18n.locale = "en";
    } else if (this.lang == "ar") {
      this.$i18n.locale = "ar";
    }

    // get all members
    this.$axios.$get("/Customer/GetAllCustomer").then((res) => {
      this.customers = res.Customer.data;
    });

    this.$axios.$get("/Member/GetAllMember").then((res) => {
      this.members = res.Employee.data;
    });

    // branches

    // watch language

    this.open = localStorage.getItem("open");
  },
  methods: {
    searchData() {
      this.$axios
        .$get(`/Location/GetAllLocation?search=${this.search}`)
        .then((res) => {
          this.locations = res.Location.data;
          this.totalPages = res.Location.meta.last_page;
          this.perPage = res.Location.meta.per_page;
          this.total = res.Location.meta.total;
          this.permissions = res.permissions;
          this.loading = false;
        });
    },
    // change and choose country
    chooseCountry(country) {
      console.log(country.target.value);
      let data = {
        country: country.target.value,
      };
      this.$axios
        .$post("https://countriesnow.space/api/v0.1/countries/cities", data)
        .then((res) => {
          this.cities = res.data;
        });
    },
    // choose type
    changeType(event) {
      console.log(event);
      if (event.target.value == "vendor") {
        this.customer_id = null;
        this.employee_id = null
      }
      if (event.target.value == "customer") {
        this.vendor_id = null;
        this.employee_id = null
      }
      if (event.target.value == "employee") {
        this.vendor_id = null;
        this.customer_id = null;
      }
    },
    loadFile(event) {
      var image = document.getElementById("output");
      image.src = URL.createObjectURL(event.target.files[0]);
      console.log(event.target.files[0]);
      this.image = event.target.files[0];
    },
    // remove photo
    removePhoto() {
      var image = document.getElementById("output");
      image.src = "../../assets/imgs/comman/avatar image.png";
    },
    // clear data
    clearData() {
      (this.country_name = null),
        (this.city_name = null),
        (this.area = null),
        (this.street = null),
        (this.password = null),
        (this.type = null),
        (this.vendor_id = null),
        (this.customer_id = null),
        (this.floor = null),
        (this.building_number = null),
        (this.employee_email = null),
        (this.area = null),
        (this.start_date = null),
        (this.end_date = null),
        (this.vin_number = null),
        (this.unit_of_target = null),
        (this.national_id = null),
        (this.id = "");
      this.target = null;
    },
    // is validate employee_email
    validateEmail(employee_email) {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(employee_email)
      ) {
        this.invalidEmail = false;
        return;
      } else if (this.employee_email == "") {
        this.invalidEmail = false;
      } else {
        this.invalidEmail = true;
      }
    },
    // is valid password
    isValidPassword() {
      const password =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
      if (password.test(this.password)) {
        this.errorpasswordValidation = false;
        this.login = false;
        return;
      } else {
        this.errorpasswordValidation = true;
        this.login = true;
      }
    },
    // toggle modal open and close the modal
    toggleModal(id, status) {
      this.emptyField = "";
      // show modal
      document.getElementById(`modal${id}`).classList.toggle("hidden");
      // get data by id
      if (status == "open") {
        this.$axios.$get(`/Location/GetLocationById/${id}`).then((res) => {
          this.city_name = res.Location.City;

          
          if(res.Location.Vendor.length){
            this.type = 'vendor'
            this.selectedVendor = res.Location.Vendor;
          }
          if(res.Location.Customer.length){
            this.type = 'customer'
            this.selectedCustomer = res.Location.Customer;
          }
          if(res.Location.Employee.length){
            this.type = 'employee'
            this.selectedEmployee = res.Location.Employee;
          }
          

          this.country_name = res.Location.Country;
          if (res.Location.Vendor_Id != 0) {
            this.type = "vendor";
            this.vendor_id = res.Location.Vendor_Id;
          }
          if (res.Location.Employee_Id != 0) {
            this.type = "employee";
            this.employee_id = res.Location.Employee_Id;
          }

          this.employee_id = res.Location.Employee_Id;
          if (res.Location.Street == "null") {
            this.street = null;
          }
          if (res.Location.Building_Number == "null") {
            this.building_number = null;
          }
          if (res.Location.Area == "null") {
            this.area = null;
          }
          if (res.Location.Floor == "null") {
            this.floor = null;
          }
         


          let data = {
            country: res.Location.Country,
          };
          this.$axios
            .$post("https://countriesnow.space/api/v0.1/countries/cities", data)
            .then((res) => {
              this.cities = res.data;
            });
        });
      }

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
      this.id = id;
    },
    // toggle password
    // allow numbers only
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    // pick day for make payment
    pickDay(day) {
      if (day == "30") {
        this.all_payments = "30 Days";
      } else if (day == "60") {
        this.all_payments = "60 Days";
      }
    },
    // pick a type
    pickType(type) {
      if (type == "individual") {
        this.all_types = "individual";
      } else if (type == "Fleet") {
        this.all_types = "Fleet";
      } else if (type == "Retailer") {
        this.all_types = "Retailer";
      } else if (type == "workshops") {
        this.all_types = "workshops";
      }
    },
    // show more
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    },
    // filter
    filter() {
      this.$axios
        .$get(
          `/Member/GetAllMember?search=${this.search}?=payment=${this.all_payments}?=${this.all_types}`
        )
        .then((res) => {
          this.locations = res.Vendor.data;
        });
    },
    // add new employee
    addNewLocation(status) {
      document.getElementById(`addLocation`).classList.toggle("hidden");
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
    // post and add employee
    postLocation(status) {
      const requiredFields = ["country_name", "city_name"];

      const emptyFields = requiredFields.filter(
        (field) => this[field] === "" || this[field] === null
      );

      if (this.type == null) {
        this.chooseType = true;
      }
      this.emptyField = emptyFields;
      console.log(emptyFields);
      if (emptyFields.length != 0) {
        return emptyFields;
      } else if (emptyFields.length == 0) {
        if (status == "add") {
          this.loading = true;
          let formdata = new FormData();


          formdata.append("country", this.country_name);
          formdata.append("city", this.city_name);
          formdata.append("area", this.area);
          formdata.append("street", this.street);
          formdata.append("floor", this.floor);
          formdata.append("bulding_number", this.building_number);

          if (this.type == 'customer') {
            this.selectedCustomers.forEach((value, index) => {
              formdata.append(`customer_id[${index}]`, value.id);
            });
          }
          if (this.type == 'vendor') {
            this.selectedVendors.forEach((value, index) => {
              formdata.append(`vendor_id[${index}]`, value.vendorId);
            });
          }

          if (this.type == 'employee') {
            this.selectedEmployee.forEach((value, index) => {
              formdata.append(`user_id[${index}]`, value.EmployeeId);
            });
          }

          this.$axios.$post(`/Location/AddLocation`, formdata).then((res) => {
            if (res.status == 200) {
              this.loading = false;
              this.$toast.success("Location Added Successfully");
              // get data again
              this.$axios.$get("/Location/GetAllLocation").then((res) => {
                this.locations = res.Location.data;
                this.totalPages = res.Location.meta.last_page;
                this.perPage = res.Location.meta.per_page;
                this.total = res.Location.meta.total;
                this.permissions = res.permissions;
                this.loading = false;
              });

              document
                .getElementById(`addLocation`)
                .classList.toggle("hidden");
              this.addNewLocation();
            } else {
              this.$toast.error(res.message);
              this.loading = false;
            }
          });

        }
      }
    },
    // edit employee
    editLocation() {
      // validation messages
      const requiredFields = ["country_name", "city_name"];

      const emptyFields = requiredFields.filter(
        (field) => this[field] === "" || this[field] == null
      );

      this.emptyField = emptyFields;
      console.log(emptyFields);
      if (emptyFields.length != 0) {
        return emptyFields;
      } else if (this.invalidEmail == true) {
        return;
      } else {
          this.loading = true;
          let formdata = new FormData();

          formdata.append("country", this.country_name);
          formdata.append("city", this.city_name);
          formdata.append("area", this.area);
          formdata.append("street", this.street);
          formdata.append("floor", this.floor);
          formdata.append("bulding_number", this.building_number);


          if (this.type == 'customer') {
            this.selectedCustomers.forEach((value, index) => {
              formdata.append(`customer_id[${index}]`, value.id);
            });
          }
          if (this.type == 'vendor') {
            this.selectedVendors.forEach((value, index) => {
              formdata.append(`vendor_id[${index}]`, value.vendorId);
            });
          }

          if (this.type == 'employee') {
            this.selectedEmployee.forEach((value, index) => {
              formdata.append(`user_id[${index}]`, value.EmployeeId);
            });
          }

          this.$axios
            .$post(`/Location/EditLocation/${this.id}`, formdata)
            .then((res) => {
              if (res.status == 200) {
                this.loading = false;
                this.$toast.success("Location Edit Successfully");
                // get data again
                this.$axios
                  .$get(
                    `/Location/GetAllLocation?page=${this.$route.query.page || 1
                    }`
                  )
                  .then((res) => {
                    this.locations = res.Location.data;
                    this.totalPages = res.Location.meta.last_page;
                    this.perPage = res.Location.meta.per_page;
                    this.total = res.Location.meta.total;
                    this.permissions = res.permissions;
                    this.loading = false;
                  });
                document
                  .getElementById(`modal${this.id}`)
                  .classList.toggle("hidden");
                this.addNewLocation();
              } else {
                this.$toast.error("Sorry , There is an Error");
                this.loading = false;
              }
            });
      
      }
    },
    // delete employee
    deleteLocation(id, status) {
      if (status != "delete") {
        document.getElementById(`Deletemodal${id}`).classList.toggle("hidden");
      }
      if (status == "delete") {
        this.loading = true;
        this.$axios.$post(`/Location/DeleteLocation/${id}`).then((res) => {
          if (res.status == 200) {
            // success toast
            this.$toast.success("Location Deleted Successfully");
            // loading = false
            this.loading = false;

            // get data again
            if (this.locations.length == 1) {
              this.$axios
                .$get(
                  `/Location/GetAllLocation?page=${this.$route.query.page - 1 || 1
                  }`
                )
                .then((res) => {
                  this.locations = res.Location.data;
                  this.totalPages = res.Location.meta.last_page;
                  this.perPage = res.Location.meta.per_page;
                  this.total = res.Location.meta.total;
                  this.permissions = res.permissions;
                  this.loading = false;
                });
              this.$router.push({
                path: "/locations",
                query: { page: this.$route.query.page - 1 },
              });
            } else {
              this.$axios
                .$get(`/Location/GetAllLocation?page=${this.$route.query.page}`)
                .then((res) => {
                  this.locations = res.Location.data;
                  this.totalPages = res.Location.meta.last_page;
                  this.perPage = res.Location.meta.per_page;
                  this.total = res.Location.meta.total;
                  this.permissions = res.permissions;
                  this.loading = false;
                });
              this.$router.push({
                path: "/locations",
                query: { page: this.$route.query.page - 1 },
              });
            }
            // close the modal
            document
              .getElementById(`Deletemodal${id}`)
              .classList.toggle("hidden");
          } else {
            // error validation
            this.$toast.error("in Valid");
            // loading is false
            this.loading = false;
          }
        });
      }
    },
    // image functions
    onDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      this.createFile(files[0]);
    },
    onChange(e) {
      var files = e.target.files;
      this.createFile(files[0]);
    },
    createFile(file) {
      if (!file.type.match("image.*")) {
        alert("Select an image");
        return;
      }
      var img = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = function (e) {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeFile() {
      this.image = "";
    },
  },
  watch: {
    // watch credit limit
    activeCreditLimit() {
      if (this.activeCreditLimit == false) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    // watch payment
    activePayment() {
      if (this.activePayment == false) {
        this.disabledPayment = true;
      } else {
        this.disabledPayment = false;
      }
    },
    // is password correct
    password: {
      handler(value) {
        this.password = value;
        clearTimeout(this.passwrodTimer);
        // Set a timeout of 3 seconds (3000 milliseconds)
        this.passwrodTimer = setTimeout(() => {
          this.isValidPassword(value);
        }, 2000);
      },
      immediate: false,
    },

    // employee_email
    employee_email: {
      handler(value) {
        this.employee_email = value;
        clearTimeout(this.emailTimer);
        // Set a timeout of 3 seconds (3000 milliseconds)
        this.emailTimer = setTimeout(() => {
          this.validateEmail(value);
        }, 2000);
      },
      immediate: false,
    },
    // currect page
    currentPage(value) {
      console.log(value);
      this.$axios.$get(`/Location/GetAllLocation?page=${value}`).then((res) => {
        this.locations = res.Location.data;
        this.totalPages = res.Location.meta.last_page;
        this.perPage = res.Location.meta.per_page;
        this.total = res.Location.meta.total;
        this.permissions = res.permissions;
        this.loading = false;
      });

      this.$router.push({ path: "/locations", query: { page: value } });
    },
    leftClass() {
      this.$route.query.toggle == true;
    },
  },
};
</script>
<style scoped>
.active-user {
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  /* 120% */
  letter-spacing: -0.2px;
}

/* credit limit */
.credit-limit {
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  /* 120% */
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

dropdown input~ul {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  top: -20px;
  z-index: 1;
}

dropdown input:checked+label {
  background: #ffffff;
  color: #000000;
}

dropdown input:checked~ul {
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
  -webkit-backface-visibility: hidden;
  /* Chrome and Safari */
  -moz-backface-visibility: hidden;
  /* Firefox */
  -ms-backface-visibility: hidden;
  /* Internet Explorer */
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
  border-radius: 20px;
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
  line-height: 24px;
  /* 171.429% */
  letter-spacing: -0.2px;
}

/* arrow of select */
.arrow-select {
  position: absolute;
  left: 346px;
  margin-top: 19px;
  width: 20px;
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
</style>
