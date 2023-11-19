<template>
  <div class="flex p-[12px] justify-end">
    <div v-if="loading == true" class="flex justify-center w-[100%]">
      <Loading :text="'Loading'" />
    </div>
    <!-- <SecondVerticalNavBar v-if="loading == false" :type="'customer'" /> -->
    <div
      v-if="loading == false"
      class="px-4 sm:px-8 direction-lang"
      :class="[
        {
          ltr: lang === 'en',
          rtl: lang === 'ar',
          container: open == 'true',
          'w-[100%]': open == 'false',
        },
      ]"
    >
      <div class="w-[100%]">
        <div
          style="padding-top: 0px"
          class="-mx-4 sm:-mx-8 px-4 py-4 overflow-x-auto add-margin-left remove-margin-left"
        >
          <div class="inline-block min-w-full overflow-hidden">
            <div class="mb-[13px] flex justify-space-between">
              <!-- add btn -->
              <div
                :class="{
                  'p-[30px]': open == 'true',
                  'p-[25px]': open == 'false',
                }"
                v-if="permissions.includes('can_add_vendor')"
                class="bg-filter"
              >
                <button
                  @click="addNewVendor()"
                  class="bg-blue-500 items-center flex add-new hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                >
                  <img
                    class="w-[20px]"
                    src="../../assets/imgs/comman/PlusCircle.png"
                    alt=""
                  />
                  <p class="ml-[10px]">
                    {{ $t("Add new") }}
                  </p>
                </button>

                <div
                  class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
                  id="addVendor"
                >
                  <div
                    class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                  >
                    <div class="fixed inset-0 transition-opacity">
                      <div class="absolute inset-0 bg-gray-900 opacity-75" />
                    </div>
                    <span
                      class="hidden sm:inline-block sm:align-middle sm:h-screen"
                      >&#8203;</span
                    >
                    <div
                      :style="{
                        height: showInformation == true ? '766px' : 'auto',
                        'overflow-y':
                          showInformation == true ? 'auto' : 'visible',
                      }"
                      class="p-[30px] media inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[776px] sm:w-full"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="modal-headline"
                    >
                      <div class="absolute w-[50%] ml-[154px] mt-[332px]">
                        <Loading v-if="loading" :text="'Saving'" />
                      </div>
                      <!-- close btn -->
                      <div
                        :disabled="loading"
                        :class="{ 'cusror-disabled': loading }"
                        class="px-4 py-3 text-left"
                      >
                        <button
                          type="button"
                          class="py-2 px-4 bg-white text-black rounded mr-2 flex"
                          @click="addNewVendor()"
                        >
                          <img
                            class="w-[24px]"
                            src="../../assets/imgs/comman/close-square.png"
                            alt=""
                          />
                          <p class="ml-[12px]">
                            {{ $t("Close") }}
                          </p>
                        </button>
                      </div>
                      <!-- tabs start -->
                      <div
                        :disabled="loading"
                        :class="{ 'cusror-disabled': loading }"
                        class="flex flex-row items-center px-12 justify-center p-[20px] border-bottom-style"
                      >
                        <div
                          data-tabopen="Informations"
                          @click="show('Informations')"
                          class="tabbtn tab-style cursor-pointer px-2 py-1 font-medium"
                        >
                          {{ $t("Informations") }}
                        </div>
                        <div
                          data-tabopen="Payment"
                          @click="show('Payment')"
                          class="tabbtn tab-un-active cursor-pointer px-2 py-1 ml-[26px]"
                        >
                          {{ $t("Payment") }}
                        </div>
                        <!-- <div
                          data-tabopen="Vehicles"
                          @click="show('Vehicles')"
                          class="tabbtn tab-un-active cursor-pointer px-2 py-1 ml-[26px]"
                        >
                          {{ $t("Products") }}
                        </div> -->
                      </div>

                      <div
                        :disabled="loading"
                        :class="{ 'cusror-disabled': loading }"
                        v-if="showInformation"
                        id="Informations"
                        class="tab mt-1 items-center"
                      >
                        <div class="flex items-center justify-space-between">
                          <!-- information -->
                          <div
                            :class="{ 'text-right': lang == 'ar' }"
                            class="text-lg font-bold rounded-lg w-[50%] mb-[10px]"
                          >
                            <h1 class="mt-[20px]">
                              {{ $t("Informations") }} :
                            </h1>
                            <div class="form-style mt-[20px] p-[30px]">
                              <!-- customer code and registration code -->
                              <!-- Vendor code -->
                              <div class="group">
                                <label
                                  for="1"
                                  class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                  >{{ $t("Vendor code") }}

                                  :</label
                                >
                                <input
                                  id="1"
                                  type="text"
                                  v-model="vendor_codee"
                                  placeholder="U-001"
                                  class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                />
                              </div>
                              <!-- register code -->
                              <div class="group mt-[20px]">
                                <label
                                  for="1"
                                  class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                  >{{ $t("Registration code") }}

                                  :</label
                                >
                                <input
                                  id="1"
                                  type="text"
                                  v-model="registration_code"
                                  :class="{
                                    'outline-error':
                                      emptyField.includes('registration_code'),
                                  }"
                                  placeholder="000012"
                                  class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                />
                                <p
                                  v-if="
                                    emptyField.includes('registration_code')
                                  "
                                  class="error-message"
                                >
                                  {{ $t("Registration code") }}
                                  {{ $t("required") }}
                                </p>
                              </div>
                              <!-- customer name -->
                              <div class="group mt-[20px]">
                                <label
                                  for="1"
                                  class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                  >{{ $t("Vendor name") }}
                                  <p class="required">*</p>
                                  :</label
                                >
                                <input
                                  id="1"
                                  type="text"
                                  :class="{
                                    'outline-error':
                                      emptyField.includes('vendor_name'),
                                  }"
                                  v-model="vendor_name"
                                  placeholder="نادر محمد احمد"
                                  class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                />
                                <p
                                  v-if="emptyField.includes('vendor_name')"
                                  class="error-message"
                                >
                                  {{ $t("Vendor name") }}
                                  {{ $t("required") }}
                                </p>
                              </div>
                              <!-- vat number  -->
                              <div class="group mt-[20px]">
                                <label
                                  for="1"
                                  class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                  >{{ $t("Vat Number") }}

                                  :</label
                                >
                                <VatNumber
                                  :VatNumber="vat_number"
                                  @update:VatNumber="UpdateVatNumer"
                                  :isEdit="false"
                                />
                              </div>

                              <!-- SSN number  -->
                              <div class="group mt-[20px]"></div>
                              <!-- Models number  -->
                              <!-- <div class="group mt-[20px]">
                                <label
                                  for="1"
                                  class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                  >{{ $t("Model") }}

                                  :</label
                                >
                              
                                <multiselect
                                  v-model="selectedModels"
                                  :options="models"
                                  track-by="random_id"
                                  label="brand"
                                  multiple
                                  placeholder="Select models"
                                ></multiselect>

                                <p
                                  v-if="emptyField.includes('vendor_name')"
                                  class="error-message"
                                >
                                  {{ $t("SSN Number") }}
                                  {{ $t("required") }}
                                </p>
                              </div> -->
                            </div>
                          </div>
                          <!-- contact -->
                          <div
                            :class="{ 'text-right': lang == 'ar' }"
                            class="text-lg font-bold ml-[15px] rounded-lg w-[50%]"
                          >
                            <div class="text-lg font-bold rounded-lg">
                              <h1 class="mt-[20px]">{{ $t("Contacts") }} :</h1>
                              <div class="form-style mt-[20px] p-[30px]">
                                <!-- Phone -->
                                <div class="group">
                                  <label
                                    for="1"
                                    class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Phone") }} :</label
                                  >
                                  <PhoneNumber
                                    :phoneNumber="mobile_number"
                                    @update:phoneNumber="UpdatePhoneNumberValue"
                                    :isEdit="false"
                                  />
                                </div>

                                <!-- Mobile Number -->
                                <div class="group mt-[20px]">
                                  <label
                                    for="1"
                                    class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("mobile_number") }} :</label
                                  >
                                  <MobileNumber
                                    :mobileNumber="other_mobile_number"
                                    @update:mobileNumber="updateMobileNumber"
                                    :isEdit="false"
                                  />
                                </div>
                                <!-- National ID -->
                                <div class="group mt-[20px]">
                                  <label
                                    for="1"
                                    class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Email") }} :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    :class="{
                                      'outline-error':
                                        emptyField.includes('email') ||
                                        invalidEmail,
                                    }"
                                    v-model="email"
                                    placeholder="email@mail.com"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                  <p
                                    v-if="
                                      emptyField.includes('email') &&
                                      invalidEmail == false
                                    "
                                    class="error-message"
                                  >
                                    {{ $t("Email") }}
                                    {{ $t("required") }}
                                  </p>
                                  <div
                                    v-if="invalidEmail"
                                    class="error-message mt-[14px] ml-[14px]"
                                  >
                                    {{ $t("Email is Invalid") }}
                                  </div>
                                </div>
                                <div class="group mt-[20px]">
                                  <label
                                    :class="{
                                      'text-right': lang == 'ar',
                                    }"
                                    for="1"
                                    class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Location") }} :</label
                                  >
                                  <multiselect
                                    v-model="selectedLocations"
                                    :options="displayedLocations"
                                    track-by="Id"
                                    label="Address"
                                    multiple
                                    style="border-radius: 25px"
                                    :placeholder="$t('Select locations')"
                                    @select="handleLocationSelect"
                                    @input="handleMultiselectChange"
                                  >
                                  </multiselect>
                                  <Location />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          class="flex justify-space-between form-style p-[20px]"
                        >
                          <h1 class="active-user">
                            {{ $t("Active Vendor") }}
                          </h1>
                          <button
                            class="flex ltr items-center transition ease-in-out duration-300 w-10 h-4 rounded-full focus:outline-none"
                            :class="{ 'bg-[#1C2E50]': active_vendor }"
                            @click="active_vendor = !active_vendor"
                          >
                            <div
                              class="transition ease-in-out duration-300 rounded-full h-5 w-5 bg-white shadow border"
                              :class="{
                                'transform translate-x-full ': active_vendor,
                              }"
                            ></div>
                          </button>
                        </div>
                      </div>

                      <div
                        :disabled="loading"
                        :class="{
                          'cusror-disabled': loading,
                          'text-right': lang == 'ar',
                        }"
                        v-if="showPayemnt"
                        id="Payment"
                        class="tab mt-1 items-center"
                      >
                        <h2 class="font-semibold text-2xl mt-[20px]">
                          {{ $t("payment") }} :
                        </h2>
                        <div class="form-style p-[20px] mt-[20px]">
                          <div class="flex justify-space-between">
                            <h1 class="active-user">
                              {{ $t("Credit limit") }}
                            </h1>
                            <button
                              class="flex ltr items-center transition ease-in-out duration-300 w-10 h-4 rounded-full focus:outline-none"
                              :class="{
                                'bg-[#1C2E50]': activeCreditLimit,
                              }"
                              @click="activeCreditLimit = !activeCreditLimit"
                            >
                              <div
                                class="transition ease-in-out duration-300 rounded-full h-5 w-5 bg-white shadow border"
                                :class="{
                                  'transform translate-x-full ':
                                    activeCreditLimit,
                                }"
                              ></div>
                            </button>
                          </div>
                          <!-- credit limit -->
                          <div
                            :disabled="disabled"
                            :class="{
                              'cursor-diabled': activeCreditLimit == false,
                            }"
                            class="group mt-[20px]"
                          >
                            <label
                              for="1"
                              class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                              >{{ $t("Credit limit") }} :</label
                            >
                            <input
                              id="1"
                              type="text"
                              v-model="credit_limit"
                              placeholder="20.000 L.E"
                              :disabled="disabled"
                              class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                            />
                          </div>

                          <!-- payment -->
                          <div class="flex justify-space-between mt-[20px]">
                            <h1 class="active-user">
                              {{ $t("Payment") }}
                            </h1>
                            <button
                              class="flex ltr items-center transition ease-in-out duration-300 w-10 h-4 rounded-full focus:outline-none"
                              :class="{
                                'bg-[#1C2E50]': activePayment,
                              }"
                              @click="activePayment = !activePayment"
                            >
                              <div
                                class="transition ease-in-out duration-300 rounded-full h-5 w-5 bg-white shadow border"
                                :class="{
                                  'transform translate-x-full ': activePayment,
                                }"
                              ></div>
                            </button>
                          </div>

                          <div
                            :disabled="disabledPayment"
                            :class="{
                              'cursor-diabled': activePayment == false,
                            }"
                            class="group mt-[20px]"
                          >
                            <label
                              for="1"
                              class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                              >{{ $t("Payment") }} :</label
                            >
                            <input
                              id="1"
                              type="text"
                              v-model="payment_term"
                              placeholder="14%"
                              :disabled="disabledPayment"
                              class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        :disabled="loading"
                        :class="[
                          {
                            'cusror-disabled': loading,
                            'text-right': lang == 'ar',
                          },
                        ]"
                        v-if="showVichels"
                        id="Vehicles"
                        class="tab mt-1 items-center"
                      >
                        <h2 class="font-semibold text-2xl mt-[20px]">
                          {{ $t("Vehicles Active") }} :
                        </h2>
                      </div>
                      <!-- tabs end -->
                      <div
                        :disabled="loading"
                        :class="{ 'cusror-disabled': loading }"
                        class="flex mt-[20px]"
                      >
                        <div class="w-[50%]">
                          <button
                            :disabled="loading"
                            :class="{ 'cusror-disabled': loading }"
                            @click="addNewVendor('close')"
                            class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                          >
                            {{ $t("close") }}
                          </button>
                        </div>
                        <div class="w-[50%] ml-[6px]">
                          <button
                            :disabled="loading"
                            :class="{ 'cusror-disabled': loading }"
                            @click="postVendor('add')"
                            class="action-btn rounded-lg w-[100%] px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
                          >
                            {{ $t("Add") }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                :class="{
                  'w-fulll': !permissions.includes('can_add_vendor'),
                }"
                class="bg-filter w-[86%] flex"
              >
                <div class="items-center flex p-[30px]">
                  <h1 class="filter-text">{{ $t("Filter") }}</h1>
                </div>
                <div class="w-[50%] flex items-center">
                  <div
                    class="items-center justify-between flex rounded-full shadow-lg p-2 sticky w-[100%]"
                    style="top: 5px"
                  >
                    <div style="border-right: 1px solid #ebebeb">
                      <div
                        class="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer"
                      >
                        <img
                          class="w-[70%]"
                          src="../../assets/imgs/verticalNav/search-status.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <input
                      class="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                      type="text"
                      v-model="search"
                      @input="searchData"
                      :placeholder="$t('search')"
                    />

                    <div
                      :class="[{ rotate: lang == 'ar' }]"
                      class="cursor-pointer"
                    >
                      <img
                        class="w-[70%]"
                        src="../../assets/imgs/verticalNav/send.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <!-- all Payments -->

                <dropdown class="flex items-center p-[29px]">
                  <input id="allPayments" type="checkbox" />
                  <label for="allPayments" class="animate flex w-[180px]">
                    <p class="text-[#8897AE]">
                      {{ all_payments }}
                    </p>
                  </label>
                  <ul
                    style="margin-top: 223px; margin-left: 24px"
                    class="animate"
                  >
                    <li @click="pickDay('30')" class="animate">
                      {{ $t("30 Days") }}
                    </li>
                    <li @click="pickDay('60')" class="animate flex">
                      <p class="ml-[13px]">{{ $t("60 Days") }}</p>
                    </li>
                  </ul>
                </dropdown>
                <!-- all TYpes -->

                <dropdown
                  style="padding-left: 0px; padding-right: 20px"
                  class="flex items-center pl-[0px] p-[29px]"
                >
                  <input id="allTypes" type="checkbox" />
                  <label for="allTypes" class="animate flex w-[180px]">
                    <p class="text-[#8897AE]">
                      {{ all_types }}
                    </p>
                  </label>
                  <ul
                    style="margin-top: 223px; margin-left: 24px"
                    class="animate"
                  >
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
                <div
                  :class="{ 'mr-[20px]': lang == 'ar' }"
                  class="grid items-center"
                >
                  <button
                    @click="filter()"
                    class="bg-blue-500 bg-[#394889] flex add-new hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                  >
                    <p class="">
                      {{ $t("Apply") }}
                    </p>
                  </button>
                </div>
              </div>
            </div>

            <div
              v-if="loading == false && vendorTable.length > 0"
              class="p-[20px] bg-table"
            >
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
                            {{ $t("Vendor Code") }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("vendor_name") }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Registration code") }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Credit limit") }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Payment term") }}
                      </p>
                    </td>

                    <td
                      v-if="permissions.includes('can_update_vendor')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    ></td>
                    <td
                      v-if="permissions.includes('can_delete_vendor')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    ></td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(vendor, index) in this.vendorTable" :key="index">
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <div class="flex">
                        <div class="ml-3">
                          <p
                            v-if="vendor.vendor_code != 'null'"
                            class="text-gray-900 whitespace-no-wrap"
                          >
                            {{ vendor.vendor_code }}
                          </p>
                          <p v-else class="text-gray-900 whitespace-no-wrap">
                            --
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ vendor.vendor_name }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p
                        v-if="vendor.registration_code != 'null'"
                        class="text-gray-900 whitespace-no-wrap"
                      >
                        {{ vendor.registration_code }}
                      </p>
                      <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p
                        v-if="vendor.credit_limit != 'null'"
                        class="text-gray-900 whitespace-no-wrap"
                      >
                        {{ vendor.credit_limit }}
                      </p>
                      <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p
                        v-if="vendor.payment_term != 'null'"
                        class="text-gray-900 whitespace-no-wrap"
                      >
                        {{ vendor.payment_term }}
                      </p>
                      <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <div>
                        <button
                          v-if="permissions.includes('can_update_vendor')"
                          class="view-btn"
                          @click="toggleModal(vendor.vendorId, 'open')"
                        >
                          <img
                            class="w-[18px] h-[18px]"
                            src="../../assets/imgs/comman/eye.png"
                            alt=""
                          />
                          {{ $t("View") }}
                        </button>
                      </div>
                      <!-- view and edit modal -->
                      <div
                        class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
                        :id="`modal${vendor.vendorId}`"
                      >
                        <div
                          class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                        >
                          <div class="fixed inset-0 transition-opacity">
                            <div
                              class="absolute inset-0 bg-gray-900 opacity-75"
                            />
                          </div>
                          <span
                            class="hidden sm:inline-block sm:align-middle sm:h-screen"
                            >&#8203;</span
                          >

                          <div
                            :style="{
                              height:
                                showInformation == true ? '766px' : 'auto',
                              'overflow-y':
                                showInformation == true ? 'auto' : 'visible',
                            }"
                            class="p-[30px] media inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[776px] sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                          >
                            <div class="absolute w-[50%] ml-[154px] mt-[332px]">
                              <Loading v-if="loading" :text="'Saving'" />
                            </div>
                            <!-- close btn -->
                            <div
                              :disabled="loading"
                              :class="{ 'cusror-disabled': loading }"
                              class="px-4 py-3 text-left"
                            >
                              <button
                                type="button"
                                class="py-2 px-4 bg-white text-black rounded mr-2 flex"
                                @click="toggleModal(vendor.vendorId, 'close')"
                              >
                                <img
                                  class="w-[24px]"
                                  src="../../assets/imgs/comman/close-square.png"
                                  alt=""
                                />
                                <p class="ml-[12px]">
                                  {{ $t("Close") }}
                                </p>
                              </button>
                            </div>
                            <!-- tabs start -->

                            <div
                              :disabled="loading"
                              :class="{ 'cusror-disabled': loading }"
                              class="flex flex-row items-center px-12 justify-center p-[20px] border-bottom-style"
                            >
                              <div
                                data-tabopen="Informations"
                                @click="show('Informations')"
                                class="tabbtn tab-style cursor-pointer px-2 py-1 font-medium"
                              >
                                {{ $t("Informations") }}
                              </div>
                              <div
                                data-tabopen="Payment"
                                @click="show('Payment')"
                                class="tabbtn tab-un-active cursor-pointer px-2 py-1"
                              >
                                {{ $t("Payment") }}
                              </div>
                              <!-- <div
                                data-tabopen="Vehicles"
                                @click="show('Vehicles')"
                                class="tabbtn tab-un-active cursor-pointer px-2 py-1"
                              >
                                {{ $t("Products") }}
                              </div> -->
                            </div>

                            <div
                              :disabled="loading"
                              :class="{
                                'cusror-disabled': loading,
                                'text-right': lang == 'ar',
                              }"
                              v-if="showInformation"
                              id="Informations"
                              class="tab mt-1 items-center"
                            >
                              <div
                                class="flex items-center justify-space-between"
                              >
                                <!-- information -->
                                <div
                                  :class="{ 'text-right': lang == 'ar' }"
                                  class="text-lg font-bold rounded-lg w-[50%] mb-[10px]"
                                >
                                  <h1 class="mt-[20px]">
                                    {{ $t("Informations") }} :
                                  </h1>
                                  <div class="form-style mt-[20px] p-[30px]">
                                    <!-- customer code and registration code -->
                                    <div class="group">
                                      <label
                                        for="1"
                                        class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                        >{{ $t("Vendor code") }}

                                        :</label
                                      >
                                      <input
                                        v-model="vendor_codee"
                                        id="1"
                                        type="text"
                                        placeholder="U-001"
                                        class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                      />
                                    </div>

                                    <!-- register code -->
                                    <div class="group mt-[20px]">
                                      <label
                                        for="1"
                                        class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                        >{{ $t("Registration code") }}

                                        :</label
                                      >
                                      <input
                                        id="1"
                                        type="text"
                                        v-model="registration_code"
                                        :class="{
                                          'outline-error':
                                            emptyField.includes(
                                              'registration_code'
                                            ),
                                        }"
                                        placeholder="000012"
                                        class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                      />
                                      <p
                                        v-if="
                                          emptyField.includes(
                                            'registration_code'
                                          )
                                        "
                                        class="error-message"
                                      >
                                        {{ $t("Registration code") }}
                                        {{ $t("required") }}
                                      </p>
                                    </div>
                                    <!-- customer name -->
                                    <div class="group mt-[20px]">
                                      <label
                                        for="1"
                                        class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                        >{{ $t("Vendor name") }}
                                        <p class="required">*</p>
                                        :</label
                                      >
                                      <input
                                        id="1"
                                        type="text"
                                        :class="{
                                          'outline-error':
                                            emptyField.includes('vendor_name'),
                                        }"
                                        v-model="vendor_name"
                                        placeholder="نادر محمد احمد"
                                        class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                      />
                                      <p
                                        v-if="
                                          emptyField.includes('vendor_name')
                                        "
                                        class="error-message"
                                      >
                                        {{ $t("Vendor name") }}
                                        {{ $t("required") }}
                                      </p>
                                    </div>
                                    <!-- vat number -->
                                    <div class="group mt-[20px]">
                                      <label
                                        for="1"
                                        class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                        >{{ $t("Vat Number ") }}

                                        :</label
                                      >
                                      <VatNumber
                                        :VatNumber="vat_number"
                                        @update:VatNumber="UpdateVatNumer"
                                        :isEdit="true"
                                      />
                                    </div>

                                    <!-- Models number  -->
                                    <!-- <div class="group mt-[20px]">
                                      <label
                                        for="1"
                                        class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                        >{{ $t("Model") }}

                                        :</label
                                      >

                                      <multiselect
                                        v-model="selectedModels"
                                        :options="models"
                                        track-by="random_id"
                                        label="brand"
                                        multiple
                                        placeholder="Select models"
                                      ></multiselect>

                                      <p
                                        v-if="
                                          emptyField.includes('vendor_name')
                                        "
                                        class="error-message"
                                      >
                                        {{ $t("SSN Number") }}
                                        {{ $t("required") }}
                                      </p>
                                    </div> -->
                                  </div>
                                </div>
                                <!-- contact -->
                                <div
                                  :class="{ 'text-right': lang == 'ar' }"
                                  class="text-lg font-bold ml-[15px] rounded-lg w-[50%]"
                                >
                                  <div class="text-lg font-bold rounded-lg">
                                    <h1 class="mt-[20px]">
                                      {{ $t("Contacts") }} :
                                    </h1>
                                    <div class="form-style mt-[20px] p-[30px]">
                                      <!-- Phone -->
                                      <!-- Phone -->
                                      <div class="group">
                                        <label
                                          for="1"
                                          class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Phone") }} :</label
                                        >
                                        <PhoneNumber
                                          :phoneNumber="phone"
                                          @update:phoneNumber="
                                            UpdatePhoneNumberValue
                                          "
                                          :isEdit="true"
                                        />
                                      </div>

                                      <!-- Mobile Number -->
                                      <div class="group mt-[20px]">
                                        <label
                                          for="1"
                                          class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("mobile_number") }} :</label
                                        >
                                        <MobileNumber
                                          :mobileNumber="mobile_number"
                                          @update:mobileNumber="
                                            updateMobileNumber
                                          "
                                          :isEdit="true"
                                        />
                                      </div>
                                      <!-- National ID -->
                                      <div class="group mt-[20px]">
                                        <label
                                          for="1"
                                          class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Email") }} :</label
                                        >
                                        <input
                                          id="1"
                                          type="text"
                                          :class="{
                                            'outline-error':
                                              emptyField.includes('email') ||
                                              invalidEmail,
                                          }"
                                          v-model="email"
                                          placeholder="email@mail.com"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                        <p
                                          v-if="
                                            emptyField.includes('email') &&
                                            invalidEmail == false
                                          "
                                          class="error-message"
                                        >
                                          {{ $t("Email") }}
                                          {{ $t("required") }}
                                        </p>
                                        <div
                                          v-if="invalidEmail"
                                          class="error-message mt-[14px] ml-[14px]"
                                        >
                                          {{ $t("Email is Invalid") }}
                                        </div>
                                      </div>
                                      <div class="group mt-[20px]">
                                        <label
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Location") }} :</label
                                        >
                                        <multiselect
                                          v-model="selectedLocations"
                                          :options="displayedLocations"
                                          track-by="Id"
                                          label="Address"
                                          multiple
                                          style="border-radius: 25px"
                                          :placeholder="$t('Select locations')"
                                          @select="handleLocationSelect"
                                          @input="handleMultiselectChange"
                                        >
                                        </multiselect>
                                        <!-- <select
                                          class="appearance-none border-select w-full py-1 px-2 bg-white peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                          name="whatever"
                                          v-model="location"
                                          id="frm-whatever"
                                        >
                                          <option @click="openAddLocationPopup">
                                            {{ $t("Add new Location") }}
                                          </option>
                                          <option
                                            v-for="(
                                              location, index
                                            ) in locations"
                                            :key="index"
                                            :value="location.Id"
                                          >
                                            {{ location.Address }}
                                          </option>
                                        </select> -->
                                        <Location />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                class="flex justify-space-between mt-[30px] form-style p-[20px]"
                              >
                                <h1 class="active-user">
                                  {{ $t("Active Vendor") }}
                                </h1>
                                <button
                                  class="flex ltr items-center transition ease-in-out duration-300 w-10 h-4 rounded-full focus:outline-none"
                                  :class="{ 'bg-[#1C2E50]': active_vendor }"
                                  @click="active_vendor = !active_vendor"
                                >
                                  <div
                                    class="transition ease-in-out duration-300 rounded-full h-5 w-5 bg-white shadow border"
                                    :class="{
                                      'transform translate-x-full ':
                                        active_vendor,
                                    }"
                                  ></div>
                                </button>
                              </div>
                            </div>

                            <div
                              :disabled="loading"
                              :class="[
                                {
                                  'cusror-disabled': loading,
                                  'text-right': lang == 'ar',
                                },
                              ]"
                              v-if="showPayemnt"
                              id="Payment"
                              class="tab mt-1 items-center"
                            >
                              <h2 class="font-semibold text-2xl mt-[20px]">
                                {{ $t("payment") }} :
                              </h2>
                              <div class="form-style p-[20px] mt-[20px]">
                                <div class="flex justify-space-between">
                                  <h1 class="active-user">
                                    {{ $t("Credit limit") }}
                                  </h1>
                                  <button
                                    class="flex ltr items-center transition ease-in-out duration-300 w-10 h-4 rounded-full focus:outline-none"
                                    :class="{
                                      'bg-[#1C2E50]': activeCreditLimit,
                                    }"
                                    @click="
                                      activeCreditLimit = !activeCreditLimit
                                    "
                                  >
                                    <div
                                      class="transition ease-in-out duration-300 rounded-full h-5 w-5 bg-white shadow border"
                                      :class="{
                                        'transform translate-x-full ':
                                          activeCreditLimit,
                                      }"
                                    ></div>
                                  </button>
                                </div>
                                <!-- credit limit -->
                                <div
                                  :disabled="disabled"
                                  :class="{
                                    'cursor-diabled':
                                      activeCreditLimit == false,
                                  }"
                                  class="group mt-[20px]"
                                >
                                  <label
                                    for="1"
                                    class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Credit limit") }} :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    v-model="credit_limit"
                                    placeholder="20.000 L.E"
                                    :disabled="disabled"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                </div>

                                <!-- payment -->
                                <div
                                  class="flex justify-space-between mt-[20px]"
                                >
                                  <h1 class="active-user">
                                    {{ $t("Payment") }}
                                  </h1>
                                  <button
                                    class="flex ltr items-center transition ease-in-out duration-300 w-10 h-4 rounded-full focus:outline-none"
                                    :class="{
                                      'bg-[#1C2E50]': activePayment,
                                    }"
                                    @click="activePayment = !activePayment"
                                  >
                                    <div
                                      class="transition ease-in-out duration-300 rounded-full h-5 w-5 bg-white shadow border"
                                      :class="{
                                        'transform translate-x-full ':
                                          activePayment,
                                      }"
                                    ></div>
                                  </button>
                                </div>

                                <div
                                  :disabled="disabledPayment"
                                  :class="{
                                    'cursor-diabled': activePayment == false,
                                  }"
                                  class="group mt-[20px]"
                                >
                                  <label
                                    for="1"
                                    class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Payment") }} :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    v-model="payment_term"
                                    placeholder="14%"
                                    :disabled="disabledPayment"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                </div>
                              </div>
                            </div>

                            <div
                              :disabled="loading"
                              :class="[
                                {
                                  'cusror-disabled': loading,
                                  'text-right': lang == 'ar',
                                },
                              ]"
                              v-if="showVichels"
                              id="Vehicles"
                              class="tab mt-1 items-center"
                            >
                              <h2 class="font-semibold text-2xl mt-[20px]">
                                {{ $t("Vehicles Active") }} :
                              </h2>
                            </div>
                            <!-- tabs end -->

                            <div
                              :disabled="loading"
                              :class="{ 'cusror-disabled': loading }"
                              class="flex mt-[20px]"
                            >
                              <div class="w-[50%]">
                                <button
                                  :disabled="loading"
                                  :class="{ 'cusror-disabled': loading }"
                                  @click="toggleModal(vendor.vendorId, 'close')"
                                  class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                                >
                                  {{ $t("close") }}
                                </button>
                              </div>
                              <div class="w-[50%] ml-[6px]">
                                <button
                                  :disabled="loading"
                                  :class="{ 'cusror-disabled': loading }"
                                  @click="editVendor()"
                                  type="button"
                                  class="action-btn rounded-lg w-[100%] px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
                                >
                                  {{ $t("Edit") }}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      v-if="permissions.includes('can_delete_vendor')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer"
                    >
                      <div
                        @click="deleteVendor(vendor.vendorId, 'open')"
                        class="w-[20px]"
                      >
                        <img
                          clas="w-[20px]"
                          src="../../assets/imgs/comman/delete-removebg-preview.png"
                          alt=""
                        />
                      </div>
                      <!-- are you sure delete modal  -->
                      <div
                        class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
                        :id="`Deletemodal${vendor.vendorId}`"
                      >
                        <div
                          class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                        >
                          <div class="fixed inset-0 transition-opacity">
                            <div
                              class="absolute inset-0 bg-gray-900 opacity-75"
                            />
                          </div>
                          <span
                            class="hidden sm:inline-block sm:align-middle sm:h-screen"
                            >&#8203;</span
                          >
                          <div
                            class="p-[30px] inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[785px] sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                          >
                            <!-- loading component -->
                            <div class="absolute w-[50%] ml-[154px] mt-[332px]">
                              <Loading v-if="loading" :text="'Saving'" />
                            </div>
                            <!-- close btn -->
                            <div
                              :disabled="loading"
                              :class="{ 'cusror-disabled': loading }"
                              class="px-4 py-3 text-left"
                            >
                              <button
                                type="button"
                                class="py-2 px-4 bg-white text-black rounded mr-2 flex"
                                @click="deleteVendor(vendor.vendorId, 'close')"
                              >
                                <img
                                  class="w-[24px]"
                                  src="../../assets/imgs/comman/close-square.png"
                                  alt=""
                                />
                                <p class="ml-[12px]">
                                  {{ $t("Close") }}
                                </p>
                              </button>
                            </div>
                            <div
                              class="px-4 py-3 text-left flex justify-center"
                            >
                              <h1 class="flex are-you-sure-delete-text">
                                {{ $t("Are You Sure You want to Delete ?") }}
                                {{ vendor.vendor_name }}
                                <img
                                  class="w-[20px] ml-[15px]"
                                  src="../../assets/imgs/comman/delete-removebg-preview.png"
                                  alt=""
                                />
                              </h1>
                            </div>
                            <!-- tabs end -->
                            <div
                              :class="{ 'cusror-disabled': loading }"
                              class="flex mt-[60px]"
                            >
                              <div class="w-[50%]">
                                <button
                                  :disabled="loading"
                                  :class="{ 'cusror-disabled': loading }"
                                  @click="
                                    deleteVendor(vendor.vendorId, 'close')
                                  "
                                  class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                                >
                                  {{ $t("close") }}
                                </button>
                              </div>
                              <div class="w-[50%] ml-[6px]">
                                <button
                                  :disabled="loading"
                                  :class="{ 'cusror-disabled': loading }"
                                  @click="
                                    deleteVendor(vendor.vendorId, 'delete')
                                  "
                                  class="delete-btn rounded-lg w-[100%] px-4 py-2 bg-red-500 text-blue-100 hover:bg-red-600 duration-300"
                                >
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

            <div
              v-else-if="loading == false && vendorTable.length == 0"
              class="w-[100%]"
            >
              <div class="flex justify-center mt-[135px]">
                <img
                  src="../../assets/imgs/comman/no-data-empty-data-concept-vector-41830412-removebg-preview.png"
                  alt=""
                />
              </div>
              <h1 class="text-center no-data">
                {{ $t("There is No Vendors") }}
              </h1>
            </div>
            <!-- Add Location popup -->
            <div
              class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
              id="addLocation"
            >
              <div
                class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0"
              >
                <div class="fixed inset-0 transition-opacity">
                  <div class="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
                  >&#8203;</span
                >
                <div
                  class="p-[30px] inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[776px] sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div class="absolute w-[50%] ml-[154px] mt-[332px]">
                    <Loading v-if="loading" :text="'Saving'" />
                  </div>
                  <!-- close btn -->
                  <div
                    :disabled="loading"
                    :class="{ 'cusror-disabled': loading }"
                    class="px-4 py-3 text-left"
                  >
                    <button
                      type="button"
                      class="py-2 px-4 bg-white text-black rounded mr-2 flex"
                      @click="addNewLocation('close')"
                    >
                      <img
                        class="w-[24px]"
                        src="../../assets/imgs/comman/close-square.png"
                        alt=""
                      />
                      <p class="ml-[12px]">
                        {{ $t("Close") }}
                      </p>
                    </button>
                  </div>
                  <!-- tabs start -->

                  <div
                    :disabled="loading"
                    :class="{ 'cusror-disabled': loading }"
                    id="Informations"
                    class="tab mt-1 items-center"
                  >
                    <div class="flex items-center justify-space-between">
                      <!-- information -->
                      <div
                        :class="{
                          'text-right': lang == 'ar',
                        }"
                        class="text-lg font-bold rounded-lg w-[100%] mb-[20px]"
                      >
                        <h1
                          :class="[
                            {
                              'text-right': lang == 'ar',
                            },
                          ]"
                          class="mt-[20px] text-left"
                        >
                          {{ $t("Location") }} :
                        </h1>

                        <div
                          :class="{
                            'text-right': lang == 'ar',
                          }"
                          class="form-style mt-[20px] p-[30px]"
                        >
                          <!-- Choose country and Street -->
                          <div
                            :class="{
                              'text-right': lang == 'ar',
                            }"
                            class="flex"
                          >
                            <!-- Employee name -->
                            <div class="group w-[50%]">
                              <label
                                :class="{
                                  'text-right': lang == 'ar',
                                }"
                                for="1"
                                class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Choose Country") }} :
                                <p class="required">*</p></label
                              >
                              <div class="flex">
                                <select
                                  v-model="country_name"
                                  class="appearance-none border-select w-full py-1 px-2 bg-white"
                                  name="whatever"
                                  :class="{
                                    'outline-error':
                                      emptyField.includes('employee_email') ||
                                      invalidEmail == true,
                                  }"
                                  @change="chooseCountry"
                                  id="frm-whatever"
                                >
                                  <option
                                    v-for="(country, i) in countries"
                                    :value="country.name"
                                    :key="i"
                                  >
                                    {{ country.name }}
                                  </option>
                                </select>

                                <img
                                  :class="{
                                    'arrow-select-arabic': lang == 'ar',
                                  }"
                                  class="arrow-select"
                                  src="../../assets/imgs/comman/Icon.png"
                                  alt=""
                                />
                              </div>
                              <p
                                :class="{
                                  'text-right': lang == 'ar',
                                }"
                                v-if="emptyField.includes('country_name')"
                                class="error-message text-left"
                              >
                                {{ $t("Choose Country") }}
                                {{ $t("required") }}
                              </p>
                            </div>
                            <!-- register code -->
                            <div
                              :class="{
                                'mr-[20px]': lang == 'ar',
                              }"
                              class="group ml-[20px] w-[50%]"
                            >
                              <label
                                :class="{
                                  'text-right': lang == 'ar',
                                }"
                                for="1"
                                class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Choose city") }} :
                                <p class="required">*</p></label
                              >
                              <img
                                :class="{
                                  'arrow-select-arabic-city': lang == 'ar',
                                }"
                                style="left: 677px"
                                class="arrow-select"
                                src="../../assets/imgs/comman/Icon.png"
                                alt=""
                              />
                              <select
                                v-model="city_name"
                                class="appearance-none border-select w-full py-1 px-2 bg-white"
                                name="whatever"
                                id="frm-whatever"
                              >
                                <option
                                  v-for="(city, i) in cities"
                                  :value="city"
                                  :key="i"
                                >
                                  {{ city }}
                                </option>
                              </select>
                              <p
                                :class="{
                                  'text-right': lang == 'ar',
                                }"
                                v-if="emptyField.includes('city_name')"
                                class="error-message text-left"
                              >
                                {{ $t("Choose city") }}
                                {{ $t("required") }}
                              </p>
                            </div>
                          </div>
                          <!-- Employee EMail and Employee Password -->
                          <div
                            :class="{
                              'text-right': lang == 'ar',
                            }"
                            class="flex mt-[20px]"
                          >
                            <!-- Employee name -->
                            <div class="group w-[50%]">
                              <label
                                :class="{
                                  'text-right': lang == 'ar',
                                }"
                                for="1"
                                class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Area") }} :</label
                              >
                              <input
                                id="1"
                                type="text"
                                v-model="area"
                                placeholder=""
                                class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                              />
                            </div>
                            <!-- street name -->
                            <div
                              :class="{
                                'mr-[20px]': lang == 'ar',
                              }"
                              class="group ml-[20px] w-[50%]"
                            >
                              <label
                                :class="{
                                  'text-right': lang == 'ar',
                                }"
                                for="1"
                                class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("street") }} :</label
                              >
                              <input
                                id="1"
                                type="text"
                                v-model="street"
                                placeholder=""
                                class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                              />
                            </div>
                          </div>

                          <!-- Employee Group and Employee position -->
                          <div
                            :class="{
                              'text-right': lang == 'ar',
                            }"
                            class="flex mt-[20px]"
                          >
                            <div class="group w-[50%]">
                              <label
                                :class="{
                                  'text-right': lang == 'ar',
                                }"
                                for="1"
                                class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Building Number") }} :</label
                              >
                              <input
                                id="1"
                                type="text"
                                v-model="building_number"
                                placeholder=""
                                class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                              />
                            </div>
                            <!-- register code -->
                            <div
                              :class="{
                                'mr-[20px]': lang == 'ar',
                              }"
                              class="group ml-[20px] w-[50%]"
                            >
                              <label
                                :class="{
                                  'text-right': lang == 'ar',
                                }"
                                for="1"
                                class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Floor") }} :</label
                              >
                              <input
                                id="1"
                                type="text"
                                v-model="floor"
                                placeholder="000012"
                                class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- tabs end -->
                  <div
                    :disabled="loading"
                    :class="{ 'cusror-disabled': loading }"
                    class="flex mb-[30px]"
                  >
                    <div class="w-[50%]">
                      <button
                        :disabled="loading"
                        :class="{
                          'cusror-disabled': loading,
                        }"
                        @click="addNewLocation('close')"
                        class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                      >
                        {{ $t("close") }}
                      </button>
                    </div>
                    <div class="w-[50%] ml-[6px]">
                      <button
                        type="button"
                        :disabled="loading"
                        :class="{
                          'cusror-disabled': loading,
                        }"
                        @click="postLocation('add')"
                        class="action-btn rounded-lg w-[100%] px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
                      >
                        {{ $t("Add") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Add Location popup -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

import NationalId from "../../components/Inputs/NationalId.vue";
import PhoneNumber from "../../components/Inputs/PhoneNumber.vue";
import VatNumber from "../../components/Inputs/VatNumber.vue";
import Location from "../../components/Inputs/Location.vue";

import MobileNumber from "../../components/Inputs/MobileNumber.vue";

export default {
  components: {
    NationalId,
    PhoneNumber,
    VatNumber,
    Location,
    MobileNumber,
    Multiselect,
  },
  data() {
    return {
      vendorTable: [],
      showInformation: true,
      showPayemnt: false,
      showVichels: false,
      type: "Informations",
      active_vendor: true,
      activeCreditLimit: false,
      disabled: true,
      activePayment: false,
      disabledPayment: true,
      emptyField: "",
      invalidEmail: false,
      emailTimer: null,
      loading: false,
      all_payments: this.$t("All Payments"),
      all_types: this.$t("All Types"),
      search: "",

      // data
      vendor_code: null,
      vendor_name: null,
      registration_code: null,
      mobile_number: null,
      vat_number: null,
      ssn_number: null,
      phone: null,
      email: null,
      address: null,
      credit_limit: null,
      payment_term: null,
      vin_number: null,
      plate_number: null,
      location: null,
      national_id: null,
      id: "",

      // pagination data
      page: 1,
      totalPages: "",
      total: "",
      perPage: "",
      currentPage: 1,
      hasMorePages: true,
      permissions: [],
      locations: [],
      loading: true,
      lang: "",
      open: false,
      vat_number: null,

      // data of location
      // data
      country_name: null,
      city_name: null,
      area: null,
      street: null,
      vat_number: null,
      building_number: null,
      floor: null,
      ssn_number: null,
      employee_id: null,
      vendor_id: null,

      countries: [],
      cities: [],
      vendors: [],
      employee: [],
      formattedVatNumber: "",
      models: [],
      model: [],
      selectedModels: [],

      selectedLocations: [],
      vendor_codee: "",
      other_mobile_number: null,
    };
  },
  computed: {
    displayedLocations() {
      // Prepend the "Add Location" option to the locations array
      const addLocationOption = {
        Id: 0,
        Address: "Add Location +",
      };
      return [addLocationOption, ...this.locations];
    },
  },
  created() {
    this.$axios.$get("/Vendor/GetAllVendor").then((res) => {
      this.vendor_codee = res.NextItem;

      this.vendorTable = res.Vendor.data;
      this.totalPages = res.Vendor.meta.last_page;
      this.perPage = res.Vendor.meta.per_page;
      this.total = res.Vendor.meta.total;
      this.permissions = res.permissions;
      this.loading = false;
    });
  },
  mounted() {
    // countries
    this.$axios
      .get("https://countriesnow.space/api/v0.1/countries/capital")
      .then((res) => {
        this.countries = res.data.data;
      });
    // bring All Data

    this.$axios.$get("/Location/GetAllLocationDropDownList").then((res) => {
      this.locations = res.Location;
    });
    // tabs code
    this.lang = localStorage.getItem("lang");

    if (this.lang == "en") {
      this.$i18n.locale = "en";
    } else if (this.lang == "ar") {
      this.$i18n.locale = "ar";
    }
    this.open = localStorage.getItem("open");
    // watch language

    this.$axios.post("Cars/getBrands").then((res) => {
      this.models = res.data.Brands;
    });
  },
  methods: {
    // update mobile number
    updateMobileNumber(updateValue) {
      this.mobile_number = updateValue;
    },
    // update Vat Number
    UpdateVatNumer(updateValue) {
      this.vat_number = updateValue;
    },
    // update National Id
    updateNationalId(updateValue) {
      this.national_id = updateValue;
    },
    UpdatePhoneNumberValue(updateValue) {
      this.phone = updateValue;
    },
    // handle location select
    handleLocationSelect(selectedOption) {
      if (selectedOption.Id === 0) {
        // Call your function for adding a new location here
        this.addLocation();
      }
    },
    handleMultiselectChange(selectedValues) {
      // Handle the selected values from the child component

      console.log("Selected values from child component:", selectedValues);
    },

    addLocation() {
      // open location modal
      document.getElementById(`addLocation`).classList.remove("hidden");
    },
    // search
    searchData() {
      this.$axios
        .$get(`/Vendor/GetAllVendor?search=${this.search}`)
        .then((res) => {
          this.vendor_codee = res.NextItem;

          this.vendorTable = res.Vendor.data;
          this.totalPages = res.Vendor.meta.last_page;
          this.perPage = res.Vendor.meta.per_page;
          this.total = res.Vendor.meta.total;
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
      this.clearLocation();
    },
    // clear data
    clearData() {
      (this.vendor_code = null),
        (this.vendor_name = null),
        (this.registration_code = null),
        (this.mobile_number = null),
        (this.vat_number = null),
        (this.phone = null),
        (this.location = null),
        (this.email = null),
        (this.address = null),
        (this.vat_number = null),
        (this.ssn_number = null),
        (this.credit_limit = null),
        (this.payment_term = null),
        (this.vin_number = null),
        (this.plate_number = null),
        (this.national_id = null),
        (this.id = "");
      this.selectedLocations = [];
      this.other_mobile_number = null;
    },
    // clear location
    clearLocation() {
      (this.country_name = null),
        (this.city_name = null),
        (this.area = null),
        (this.street = null),
        (this.building_number = null),
        (this.floor = null),
        (this.employee_id = 0),
        (this.vendor_id = 0);
    },
    // is validate email
    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+$/.test(email)) {
        this.invalidEmail = false;
        return;
      } else if (this.email == "") {
        this.invalidEmail = false;
      } else if (this.email == null) {
        this.invalidEmail = false;
      } else {
        this.invalidEmail = true;
      }
    },
    // change type
    changeType(event) {
      console.log(event);
      if (event.target.value == "vendor") {
        this.employee_id = 0;
      }
      if (event.target.value == "employee") {
        this.vendor_id = 0;
      }
    },
    // toggle modal open and close the modal
    toggleModal(id, status) {
      this.showInformation = true;
      this.showPayemnt = false;
      this.emptyField = "";
      // show modal
      document.getElementById(`modal${id}`).classList.toggle("hidden");
      // get data by id
      if (status == "open") {
        this.$axios.$get(`/Vendor/GetVendorById/${id}`).then((res) => {
          this.location = res.Vendor.location.id;
          this.data = res.Vendor;
          if (res.Vendor.vendor_code == "null") {
            this.vendor_codee = null;
          }
          if (res.Vendor.vendor_code != "null") {
            this.vendor_codee = res.Vendor.vendor_code;
          }

          this.vendor_name = res.Vendor.vendor_name;

          if (res.Vendor.other_mobile_number == "null") {
            this.mobile_number = null;
          }

          if (res.Vendor.mobile_number != "null") {
            this.mobile_number = res.Vendor.other_mobile_number;
          }

         
         
          if (res.Vendor.registration_code != "null") {
            this.registration_code = res.Vendor.registration_code;
          }

          if (res.Vendor.registration_code == "null") {
            this.registration_code = null;
          }

          if (res.Vendor.vat_number != "null") {
            this.vat_number = res.Vendor.vat_number;
          }

          if (res.Vendor.vat_number == "null") {
            this.vat_number = null;
          }

          if (res.Vendor.mobile_number != "null") {
            this.phone = res.Vendor.mobile_number;
          }
          if (res.Vendor.mobile_number == "null") {
            this.phone = null;
          }

          if (res.Vendor.email != "null") {
            this.email = res.Vendor.email;
          }
          if (res.Vendor.email == "null") {
            this.email = null;
          }

          if (res.Vendor.address != "null") {
            this.address = res.Vendor.address;
          }
          if (res.Vendor.address == "null") {
            this.address = null;
          }

          if (res.Vendor.credit_limit != "null") {
            this.disable = false;
            this.activeCreditLimit = true;
            this.credit_limit = res.Vendor.credit_limit;
          }
          if (res.Vendor.payment_term != "null") {
            this.payment_term = res.Vendor.payment_term;
            this.disabledPayment = false;
            this.activePayment = true;
            this.payment_term = res.Vendor.payment_term;
          }
          this.vin_number = res.Vendor.vin_number;
          this.plate_number = res.Vendor.plate_number;

          this.selectedLocations = res.Vendor.location;
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
    // show and hide
    show(type) {
      if (type == "Informations") {
        this.showInformation = true;
        this.showPayemnt = false;
      } else if (type == "Payment") {
        this.showPayemnt = true;
        this.showInformation = false;
      }
    },
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
          `/Vendor/GetAllVendor?search=${this.search}?=payment=${this.all_payments}?=${this.all_types}`
        )
        .then((res) => {
          this.vendorTable = res.Vendor.data;
        });
    },
    // add new customer
    addNewVendor(status) {
      this.showInformation = true;
      document.getElementById(`addVendor`).classList.toggle("hidden");
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
    // post and add customer

    postVendor(status) {
      const requiredFields = ["vendor_name"];

      const emptyFields = requiredFields.filter(
        (field) => this[field] === "" || this[field] === null
      );

      this.emptyField = emptyFields;
      console.log(emptyFields);

      if (emptyFields.length != 0) {
        return emptyFields;
      } else if (this.invalidEmail == true) {
        return;
      } else if (emptyFields.length == 0) {
        if (status == "add") {
          this.loading = true;
          let formdata = new FormData();

          formdata.append("vendor_name", this.vendor_name);
          formdata.append("vendor_code", this.vendor_codee);
          formdata.append("email", this.email);
          formdata.append("mobile_number", this.phone);
          formdata.append("other_mobile_number", this.mobile_number);
          formdata.append("vat_number", this.vat_number);
          formdata.append("ssn", this.ssn_number);
          formdata.append("registration_code", this.registration_code);
          formdata.append("credit_limit", this.credit_limit);
          formdata.append("payment_term", this.payment_term);
          formdata.append("is_active", this.active_vendor);

          this.selectedLocations.forEach((value, index) => {
            formdata.append(`location_id[${index}]`, value.Id);
          });

          this.$axios.$post(`/Vendor/AddVendor`, formdata).then((res) => {
            if (res.status == 200) {
              this.loading = false;
              this.$toast.success("Vendor Added Successfully");
              // get data again
              this.$axios.$get("/Vendor/GetAllVendor").then((res) => {
                this.vendor_codee = res.NextItem;

                this.vendorTable = res.Vendor.data;
                this.totalPages = res.Vendor.meta.last_page;
                this.perPage = res.Vendor.meta.per_page;
                this.total = res.Vendor.meta.total;
                this.permissions = res.permissions;
                this.loading = false;
              });
              document.getElementById(`addVendor`).classList.toggle("hidden");
              this.addNewVendor();
            } else {
              this.$toast.error("Sorry , There is an Error");
              this.loading = false;
            }
          });
        }
      }
    },
    // edit customer
    editVendor() {
      // validation messages
      const requiredFields = ["vendor_name"];

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

        formdata.append("vendor_name", this.vendor_name);
        formdata.append("vendor_code", this.vendor_codee);
        formdata.append("email", this.email);
        formdata.append("mobile_number", this.phone);
        formdata.append("other_mobile_number", this.mobile_number);
        formdata.append("vat_number", this.vat_number);
        formdata.append("ssn", this.ssn_number);
        formdata.append("registration_code", this.registration_code);
        formdata.append("credit_limit", this.credit_limit);
        formdata.append("payment_term", this.payment_term);
        formdata.append("is_active", this.active_vendor);

        this.selectedLocations.forEach((value, index) => {
          formdata.append(`location_id[${index}]`, value.Id);
        });

        this.$axios
          .$post(`/Vendor/UpdateVendor/${this.id}`, formdata)
          .then((res) => {
            if (res.status == 200) {
              this.loading = false;
              this.$toast.success("Vendor Edit Successfully");
              // get data again
              this.$axios
                .$get(
                  `/Vendor/GetAllVendor?page=${this.$route.query.page || 1}`
                )
                .then((res) => {
                  this.vendor_codee = res.NextItem;

                  this.vendorTable = res.Vendor.data;
                  this.totalPages = res.Vendor.meta.last_page;
                  this.perPage = res.Vendor.meta.per_page;
                  this.total = res.Vendor.meta.total;
                  this.permissions = res.permissions;
                  this.loading = false;
                });
            } else {
              this.$toast.error("Sorry , There is an Error");
              this.loading = false;
            }
          });
      }
    },
    // delete customer
    deleteVendor(id, status) {
      if (status != "delete") {
        document.getElementById(`Deletemodal${id}`).classList.toggle("hidden");
      }
      if (status == "delete") {
        this.loading = true;
        this.$axios.$post(`/Vendor/DeleteVendor/${id}`).then((res) => {
          if (res.status == 200) {
            // success toast
            this.$toast.success("Vendor Deleted Successfully");
            // loading = false
            this.loading = false;

            // get data again
            this.$axios
              .$get(`/Vendor/GetAllVendor?page=${this.$route.query.page || 1}`)
              .then((res) => {
                this.vendor_codee = res.NextItem;

                this.vendorTable = res.Vendor.data;
                this.totalPages = res.Vendor.meta.last_page;
                this.perPage = res.Vendor.meta.per_page;
                this.total = res.Vendor.meta.total;
                this.permissions = res.permissions;
                this.loading = false;
              });
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
    // open add location popup
    openAddLocationPopup() {
      document.getElementById(`addLocation`).classList.remove("hidden");
    },
    postLocation(status) {
      // this.loading = true;
      const requiredFields = ["country_name", "city_name"];

      const emptyFields = requiredFields.filter(
        (field) => this[field] === "" || this[field] === null
      );

      this.emptyField = emptyFields;
      console.log(emptyFields);
      if (emptyFields.length == 0) {
        if (status == "add") {
        }
      }
      if (emptyFields.length != 0) {
        return emptyFields;
      } else if (this.invalidEmail == true) {
        return;
      }
      if (this.errorpasswordValidation == true) {
        return;
      }

      let formdata = new FormData();

      formdata.append("country", this.country_name);
      formdata.append("city", this.city_name);
      formdata.append("area", this.area);
      formdata.append("street", this.street);
      formdata.append("floor", this.floor);
      formdata.append("bulding_number", this.building_number);

      this.$axios.$post(`/Location/AddLocation`, formdata).then((res) => {
        if (res.status == 200) {
          document.getElementById(`addLocation`).classList.toggle("hidden");
          // this.loading = false;
          this.$toast.success("Location Added Successfully");
          // // get data again
          this.$axios
            .$get("/Location/GetAllLocationDropDownList")
            .then((res) => {
              this.locations = res.Location;
              var lastItem = res.Location[res.Location.length - 1];

              this.selectedLocations.push(lastItem);
            });

          const hasObjectWithIdZero = this.selectedLocations.find(
            (obj) => obj.Id === 0
          );

          if (hasObjectWithIdZero) {
            // An object with id = 0 exists in selectedLocations
            this.selectedLocations = this.selectedLocations.filter(
              (obj) => obj.Id !== 0
            );
          }
          this.clearLocation();
        } else {
          this.$toast.error(res.message);
        }
      });
    },
    // update vat number
    updateFormattedVatNumber(number) {
      // Remove existing dashes and non-digit characters from the input string
      const cleanedString = this.vat_number.replace(/[^0-9]/g, "");

      // Split the cleaned string into groups of four characters
      const groups = cleanedString.match(/.{1,4}/g);

      // Join the groups with dashes in between
      const formattedString = groups ? groups.join("-") : "";

      // Update the formattedString data property
      this.formattedString = formattedString;
      console.log(this.formattedString, "number");
      this.vat_number = this.formattedString;
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
    // email
    email: {
      handler(value) {
        this.email = value;
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
      this.$axios.$get(`/Vendor/GetAllVendor?page=${value}`).then((res) => {
        this.vendor_codee = res.NextItem;

        this.vendorTable = res.Vendor.data;
        this.totalPages = res.Vendor.meta.last_page;
        this.perPage = res.Vendor.meta.per_page;
        this.total = res.Vendor.meta.total;
        this.permissions = res.permissions;
        this.loading = false;
      });
      this.$router.push({ path: "/vendors", query: { page: value } });
    },
    leftClass() {
      this.$route.query.toggle == true;
    },
  },
};
</script>
<style>
.active-user {
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  letter-spacing: -0.2px;
}
/* credit limit */
.credit-limit {
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 120% */
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
  line-height: 24px; /* 171.429% */
  letter-spacing: -0.2px;
}
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
@media (max-width: 1750px) {
  .media {
    height: 650px;
    overflow-y: auto;
  }
}
</style>
