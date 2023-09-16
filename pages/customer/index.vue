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
                v-if="permissions.includes('can_add_customer')"
                class="bg-filter"
              >
                <button
                  @click="addNewCustomer()"
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
                  id="addCustomer"
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
                          @click="addNewCustomer()"
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
                        <div
                          data-tabopen="Vehicles"
                          @click="show('Vehicles')"
                          class="tabbtn tab-un-active cursor-pointer px-2 py-1 ml-[26px]"
                        >
                          {{ $t("Vehicles") }}
                        </div>
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
                            class="text-lg font-bold rounded-lg w-[50%]"
                          >
                            <h1 class="mt-[20px]">
                              {{ $t("Informations") }} :
                            </h1>
                            <div class="form-style mt-[20px] p-[30px]">
                              <!-- customer code and registration code -->
                              <div class="flex">
                                <!-- customer code -->
                                <div class="group">
                                  <label
                                    for="1"
                                    class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("customer_code") }}
                                    <p class="required">*</p>
                                    :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    v-model="customer_code"
                                    :class="{
                                      'outline-error':
                                        emptyField.includes('customer_code'),
                                    }"
                                    placeholder="U-001"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                  <p
                                    v-if="emptyField.includes('customer_code')"
                                    class="error-message"
                                  >
                                    {{ $t("customer_code") }}
                                    {{ $t("required") }}
                                  </p>
                                </div>
                                <!-- register code -->
                                <div class="group ml-[20px]">
                                  <label
                                    for="1"
                                    class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Registration code") }}
                                    <p class="required">*</p>
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
                                      emptyField.includes('registration_code')
                                    "
                                    class="error-message"
                                  >
                                    {{ $t("Registration code") }}
                                    {{ $t("required") }}
                                  </p>
                                </div>
                              </div>
                              <!-- customer name -->
                              <div class="group mt-[20px]">
                                <label
                                  for="1"
                                  class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                  >{{ $t("customer_name") }}
                                  <p class="required">*</p>
                                  :</label
                                >
                                <input
                                  id="1"
                                  type="text"
                                  :class="{
                                    'outline-error':
                                      emptyField.includes('customer_name'),
                                  }"
                                  v-model="customer_name"
                                  placeholder="نادر محمد احمد"
                                  class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                />
                                <p
                                  v-if="emptyField.includes('customer_name')"
                                  class="error-message"
                                >
                                  {{ $t("customer_name") }}
                                  {{ $t("required") }}
                                </p>
                              </div>
                              <!-- Vat Number -->
                              <div class="group mt-[20px]">
                                <label
                                  for="1"
                                  class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                  >{{ $t("Vat Number") }}
                                  <p class="required">*</p>
                                  :</label
                                >
                                <input
                                  id="1"
                                  :class="{
                                    'outline-error':
                                      emptyField.includes('vat_number'),
                                  }"
                                  type="text"
                                  @keypress="isNumber($event)"
                                  v-model="vat_number"
                                  placeholder="14%"
                                  class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                />
                                <p
                                  v-if="emptyField.includes('vat_number')"
                                  class="error-message"
                                >
                                  {{ $t("Vat Number") }}
                                  {{ $t("required") }}
                                </p>
                              </div>
                              <!-- National ID -->
                              <div class="group mt-[20px]">
                                <label
                                  for="1"
                                  class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                  >{{ $t("National ID") }}
                                  <p class="required">*</p>
                                  :</label
                                >
                                <input
                                  id="1"
                                  type="text"
                                  :class="{
                                    'outline-error':
                                      emptyField.includes('national_id'),
                                  }"
                                  @keypress="isNumber($event)"
                                  v-model="national_id"
                                  placeholder="1023456784937484"
                                  class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                />
                                <p
                                  v-if="emptyField.includes('national_id')"
                                  class="error-message"
                                >
                                  {{ $t("National ID") }}
                                  {{ $t("required") }}
                                </p>
                              </div>
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
                                    >{{ $t("Phone") }}
                                    <p class="required">*</p>
                                    :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    v-model="phone"
                                    :class="{
                                      'outline-error':
                                        emptyField.includes('phone'),
                                    }"
                                    placeholder="0226281"
                                    @keypress="isNumber($event)"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                  <p
                                    v-if="emptyField.includes('phone')"
                                    class="error-message"
                                  >
                                    {{ $t("Phone") }}
                                    {{ $t("required") }}
                                  </p>
                                </div>
                                <!-- Vat Number -->
                                <div class="group mt-[20px]">
                                  <label
                                    for="1"
                                    class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("mobile_number") }} :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    @keypress="isNumber($event)"
                                    v-model="mobile_number"
                                    placeholder="01223456789"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                </div>
                                <!-- National ID -->
                                <div class="group mt-[20px]">
                                  <label
                                    for="1"
                                    class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Email") }}
                                    <p class="required">*</p>
                                    :</label
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
                                <!-- National ID -->
                                <div class="group mt-[20px]">
                                  <label
                                    for="1"
                                    class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Address") }} :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    v-model="address"
                                    placeholder="56 street"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          class="flex justify-space-between mt-[30px] form-style p-[20px]"
                        >
                          <h1 class="active-user">
                            {{ $t("Active User") }}
                          </h1>
                          <button
                            class="flex ltr items-center transition ease-in-out duration-300 w-10 h-4 rounded-full focus:outline-none"
                            :class="{ 'bg-[#1C2E50]': active_user }"
                            @click="active_user = !active_user"
                          >
                            <div
                              class="transition ease-in-out duration-300 rounded-full h-5 w-5 bg-white shadow border"
                              :class="{
                                'transform translate-x-full ': active_user,
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
                          {{ $t("Vehicles") }} :
                        </h2>
                        <div class="form-style p-[20px] mt-[20px]">
                          <!-- Vin Number -->
                          <div class="group mt-[20px]">
                            <label
                              for="1"
                              class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                              >{{ $t("VIN number") }} :</label
                            >
                            <input
                              id="1"
                              type="text"
                              @keypress="isNumber($event)"
                              v-model="vin_number"
                              placeholder="5YJSA1DG9DFP14705"
                              class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                            />
                          </div>

                          <!-- plate Number -->
                          <div class="group mt-[20px]">
                            <label
                              for="1"
                              class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                              >{{ $t("Plate number") }} :</label
                            >
                            <input
                              id="1"
                              type="text"
                              @keypress="isNumber($event)"
                              v-model="plate_number"
                              placeholder="ج ح ا ١٨٩"
                              class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                          <!-- conditions -->

                          <div
                            class="flex justify-space-between mt-[30px] form-style p-[20px]"
                          >
                            <h1 class="active-user">
                              {{ $t("Cooperate") }}
                            </h1>
                            <button
                              class="flex ltr items-center transition ease-in-out duration-300 w-10 h-4 rounded-full focus:outline-none"
                              :class="{ 'bg-[#1C2E50]': isCooperate }"
                              @click="isCooperate = !isCooperate"
                            >
                              <div
                                class="transition ease-in-out duration-300 rounded-full h-5 w-5 bg-white shadow border"
                                :class="{
                                  'transform translate-x-full ': isCooperate,
                                }"
                              ></div>
                            </button>
                          </div>
                        </div>
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
                            @click="addNewCustomer('close')"
                            class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                          >
                            {{ $t("close") }}
                          </button>
                        </div>
                        <div class="w-[50%] ml-[6px]">
                          <button
                            :disabled="loading"
                            :class="{ 'cusror-disabled': loading }"
                            @click="postCustomer('add')"
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
                  'w-fulll': !permissions.includes('can_add_customer'),
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
              v-if="loading == false && customerTable.length > 0"
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
                            {{ $t("customer_code") }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("customer_name") }}
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
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Corporate") }}
                      </p>
                    </td>
                    <td
                      v-if="permissions.includes('can_update_customer')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    ></td>
                    <td
                      v-if="permissions.includes('can_delete_customer')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    ></td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(customer, index) in this.customerTable"
                    :key="index"
                  >
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <div class="flex">
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {{ customer.customer_code }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ customer.customer_name }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ customer.registration_code }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ customer.credit_limit }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ customer.payment_term }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        <span
                          v-if="customer.corporate == 1"
                          class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                        >
                          <span
                            aria-hidden
                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span class="relative">{{ $t("Yes") }}</span>
                        </span>
                        <span
                          v-if="customer.corporate == 0"
                          class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                        >
                          <span
                            aria-hidden
                            class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          ></span>
                          <span class="relative"> {{ $t("No") }}</span>
                        </span>
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <div>
                        <button
                          v-if="permissions.includes('can_update_customer')"
                          class="view-btn"
                          @click="toggleModal(customer.id, 'open')"
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
                        :id="`modal${customer.id}`"
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
                                @click="toggleModal(customer.id, 'close')"
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
                              <div
                                data-tabopen="Vehicles"
                                @click="show('Vehicles')"
                                class="tabbtn tab-un-active cursor-pointer px-2 py-1"
                              >
                                {{ $t("Vehicles") }}
                              </div>
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
                                  class="text-lg font-bold rounded-lg w-[50%]"
                                >
                                  <h1 class="mt-[20px]">
                                    {{ $t("Informations") }} :
                                  </h1>
                                  <div class="form-style mt-[20px] p-[30px]">
                                    <!-- customer code and registration code -->
                                    <div class="flex">
                                      <!-- customer code -->
                                      <div class="group">
                                        <label
                                          for="1"
                                          class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("customer_code") }}
                                          <p class="required">*</p>
                                          :</label
                                        >
                                        <input
                                          id="1"
                                          type="text"
                                          v-model="customer_code"
                                          :class="{
                                            'outline-error':
                                              emptyField.includes(
                                                'customer_code'
                                              ),
                                          }"
                                          placeholder="U-001"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                        <p
                                          v-if="
                                            emptyField.includes('customer_code')
                                          "
                                          class="error-message"
                                        >
                                          {{ $t("customer_code") }}
                                          {{ $t("required") }}
                                        </p>
                                      </div>
                                      <!-- register code -->
                                      <div class="group ml-[20px]">
                                        <label
                                          for="1"
                                          class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Registration code") }}
                                          <p class="required">*</p>
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
                                    </div>
                                    <!-- customer name -->
                                    <div class="group mt-[20px]">
                                      <label
                                        for="1"
                                        class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                        >{{ $t("customer_name") }}
                                        <p class="required">*</p>
                                        :</label
                                      >
                                      <input
                                        id="1"
                                        type="text"
                                        :class="{
                                          'outline-error':
                                            emptyField.includes(
                                              'customer_name'
                                            ),
                                        }"
                                        v-model="customer_name"
                                        placeholder="نادر محمد احمد"
                                        class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                      />
                                      <p
                                        v-if="
                                          emptyField.includes('customer_name')
                                        "
                                        class="error-message"
                                      >
                                        {{ $t("customer_name") }}
                                        {{ $t("required") }}
                                      </p>
                                    </div>
                                    <!-- Vat Number -->
                                    <div class="group mt-[20px]">
                                      <label
                                        for="1"
                                        class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                        >{{ $t("Vat Number") }}
                                        <p class="required">*</p>
                                        :</label
                                      >
                                      <input
                                        id="1"
                                        :class="{
                                          'outline-error':
                                            emptyField.includes('vat_number'),
                                        }"
                                        type="text"
                                        @keypress="isNumber($event)"
                                        v-model="vat_number"
                                        placeholder="14%"
                                        class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                      />
                                      <p
                                        v-if="emptyField.includes('vat_number')"
                                        class="error-message"
                                      >
                                        {{ $t("Vat Number") }}
                                        {{ $t("required") }}
                                      </p>
                                    </div>
                                    <!-- National ID -->
                                    <div class="group mt-[20px]">
                                      <label
                                        for="1"
                                        class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                        >{{ $t("National ID") }}
                                        <p class="required">*</p>
                                        :</label
                                      >
                                      <input
                                        id="1"
                                        type="text"
                                        :class="{
                                          'outline-error':
                                            emptyField.includes('national_id'),
                                        }"
                                        @keypress="isNumber($event)"
                                        v-model="national_id"
                                        placeholder="1023456784937484"
                                        class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                      />
                                      <p
                                        v-if="
                                          emptyField.includes('national_id')
                                        "
                                        class="error-message"
                                      >
                                        {{ $t("National ID") }}
                                        {{ $t("required") }}
                                      </p>
                                    </div>
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
                                      <div class="group">
                                        <label
                                          for="1"
                                          class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Phone") }}
                                          <p class="required">*</p>
                                          :</label
                                        >
                                        <input
                                          id="1"
                                          type="text"
                                          v-model="phone"
                                          :class="{
                                            'outline-error':
                                              emptyField.includes('phone'),
                                          }"
                                          placeholder="0226281"
                                          @keypress="isNumber($event)"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                        <p
                                          v-if="emptyField.includes('phone')"
                                          class="error-message"
                                        >
                                          {{ $t("Phone") }}
                                          {{ $t("required") }}
                                        </p>
                                      </div>
                                      <!-- Vat Number -->
                                      <div class="group mt-[20px]">
                                        <label
                                          for="1"
                                          class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("mobile_number") }} :</label
                                        >
                                        <input
                                          id="1"
                                          type="text"
                                          @keypress="isNumber($event)"
                                          v-model="mobile_number"
                                          placeholder="01223456789"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                      </div>
                                      <!-- National ID -->
                                      <div class="group mt-[20px]">
                                        <label
                                          for="1"
                                          class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Email") }}
                                          <p class="required">*</p>
                                          :</label
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
                                      <!-- National ID -->
                                      <div class="group mt-[20px]">
                                        <label
                                          for="1"
                                          class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Address") }} :</label
                                        >
                                        <input
                                          id="1"
                                          type="text"
                                          v-model="address"
                                          placeholder="56 street"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                class="flex justify-space-between mt-[30px] form-style p-[20px]"
                              >
                                <h1 class="active-user">
                                  {{ $t("Active User") }}
                                </h1>
                                <button
                                  class="flex ltr items-center transition ease-in-out duration-300 w-10 h-4 rounded-full focus:outline-none"
                                  :class="{ 'bg-[#1C2E50]': active_user }"
                                  @click="active_user = !active_user"
                                >
                                  <div
                                    class="transition ease-in-out duration-300 rounded-full h-5 w-5 bg-white shadow border"
                                    :class="{
                                      'transform translate-x-full ':
                                        active_user,
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
                                {{ $t("Vehicles") }} :
                              </h2>
                              <div class="form-style p-[20px] mt-[20px]">
                                <!-- Vin Number -->
                                <div class="group mt-[20px]">
                                  <label
                                    for="1"
                                    class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("VIN number") }} :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    @keypress="isNumber($event)"
                                    v-model="vin_number"
                                    placeholder="5YJSA1DG9DFP14705"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                </div>

                                <!-- plate Number -->
                                <div class="group mt-[20px]">
                                  <label
                                    for="1"
                                    class="block label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Plate number") }} :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    @keypress="isNumber($event)"
                                    v-model="plate_number"
                                    placeholder="ج ح ا ١٨٩"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                </div>

                                <!-- conditions -->

                                <div
                                  class="flex justify-space-between mt-[30px] form-style p-[20px]"
                                >
                                  <h1 class="active-user">
                                    {{ $t("Cooperate") }}
                                  </h1>
                                  <button
                                    class="flex ltr items-center transition ease-in-out duration-300 w-10 h-4 rounded-full focus:outline-none"
                                    :class="{ 'bg-[#1C2E50]': isCooperate }"
                                    @click="isCooperate = !isCooperate"
                                  >
                                    <div
                                      class="transition ease-in-out duration-300 rounded-full h-5 w-5 bg-white shadow border"
                                      :class="{
                                        'transform translate-x-full ':
                                          isCooperate,
                                      }"
                                    ></div>
                                  </button>
                                </div>
                              </div>
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
                                  @click="toggleModal(customer.id, 'close')"
                                  class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                                >
                                  {{ $t("close") }}
                                </button>
                              </div>
                              <div class="w-[50%] ml-[6px]">
                                <button
                                  :disabled="loading"
                                  :class="{ 'cusror-disabled': loading }"
                                  @click="editCustomer()"
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
                      v-if="permissions.includes('can_delete_customer')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer"
                    >
                      <div
                        @click="deleteCustomer(customer.id, 'open')"
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
                        :id="`Deletemodal${customer.id}`"
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
                                @click="deleteCustomer(customer.id, 'close')"
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
                                {{ customer.customer_name }}
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
                                  @click="deleteCustomer(customer.id, 'close')"
                                  class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                                >
                                  {{ $t("close") }}
                                </button>
                              </div>
                              <div class="w-[50%] ml-[6px]">
                                <button
                                  :disabled="loading"
                                  :class="{ 'cusror-disabled': loading }"
                                  @click="deleteCustomer(customer.id, 'delete')"
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
              v-else-if="loading == false && customerTable.length == 0"
              class="w-[100%]"
            >
              <div class="flex justify-center mt-[135px]">
                <img
                  src="../../assets/imgs/comman/no-data-empty-data-concept-vector-41830412-removebg-preview.png"
                  alt=""
                />
              </div>
              <h1 class="text-center no-data">
                {{ $t("There is No Customers") }}
              </h1>
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
      customerTable: [],
      showInformation: true,
      showPayemnt: false,
      showVichels: false,
      type: "Informations",
      active_user: true,
      isCooperate: false,
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
      customer_code: null,
      customer_name: null,
      registration_code: null,
      mobile_number: null,
      vat_number: null,
      phone: null,
      email: null,
      address: null,
      credit_limit: null,
      payment_term: null,
      vin_number: null,
      plate_number: null,
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
      loading: true,
      lang: "",
      open: false,
    };
  },
  mounted() {
    // bring All Data
    this.$axios.$get("/Customer/GetAllCustomer").then((res) => {
      this.customerTable = res.Customer.data;
      this.totalPages = res.Customer.last_page;
      this.perPage = res.Customer.per_page;
      this.total = res.Customer.total;
      this.permissions = res.permissions;
      this.loading = false;
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
  },
  methods: {
    // clear data
    clearData() {
      this.customer_code = null;
      this.customer_name = null;
      (this.registration_code = null),
        (this.mobile_number = null),
        (this.vat_number = null),
        (this.phone = null),
        (this.email = null),
        (this.address = null),
        (this.credit_limit = null),
        (this.payment_term = null),
        (this.vin_number = null),
        (this.plate_number = null),
        (this.national_id = null),
        (this.id = "");
    },
    // is validate email
    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this.invalidEmail = false;
        return;
      } else if (this.email == "") {
        this.invalidEmail = false;
      } else {
        this.invalidEmail = true;
      }
    },
    // toggle modal open and close the modal
    toggleModal(id, status) {
      this.emptyField = "";
      // show modal
      document.getElementById(`modal${id}`).classList.toggle("hidden");
      // get data by id
      if (status == "open") {
        this.$axios.$get(`/Customer/GetCustomerById/${id}`).then((res) => {
          this.data = res.Customer;
          this.customer_code = res.Customer.customer_code;
          this.customer_name = res.Customer.customer_name;
          this.mobile_number = res.Customer.other_mobile_number;
          this.registration_code = res.Customer.registration_code;
          this.vat_number = res.Customer.vin_number;
          this.phone = res.Customer.mobile_number;
          this.email = res.Customer.email;
          this.address = res.Customer.address;
          this.national_id = res.Customer.snn;
          if (res.Customer.credit_limit) {
            this.disable = false;
            this.activeCreditLimit = true;
            this.credit_limit = res.Customer.credit_limit;
          }
          if (res.Customer.payment_term) {
            this.payment_term = res.Customer.payment_term;
            this.disabledPayment = false;
            this.activePayment = true;
            this.payment_term = res.Customer.payment_term;
          }
          this.vin_number = res.Customer.vin_number;
          this.plate_number = res.Customer.plate_number;
          this.isCooperate = res.Customer.corporate;
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
        this.showVichels = false;
        this.showPayemnt = false;
      } else if (type == "Payment") {
        this.showPayemnt = true;
        this.showInformation = false;
        this.showVichels = false;
      } else if (type == "Vehicles") {
        this.showVichels = true;
        this.showPayemnt = false;
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
          `/Customer/GetAllCustomer?search=${this.search}?=payment=${this.all_payments}?=${this.all_types}`
        )
        .then((res) => {
          this.customerTable = res.Customer.data;
        });
    },
    // add new customer
    addNewCustomer(status) {
      document.getElementById(`addCustomer`).classList.toggle("hidden");
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

    postCustomer(status) {
      const requiredFields = [
        "customer_name",
        "customer_code",
        "registration_code",
        "national_id",
        "phone",
        "email",
        "vat_number",
      ];

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
          let data = {
            customer_name: this.customer_name,
            customer_code: this.customer_code,
            mobile_number: this.phone,
            email: this.email,
            other_mobile_number: this.mobile_number,
            registration_code: this.registration_code,
            credit_limit: this.credit_limit,
            payment_term: this.payment_term,
            is_active: this.active_user,
            corporate: this.isCooperate,
            address: this.address,
            snn: this.national_id,
            vin_number: this.vat_number,
          };
          this.$axios.$post(`/Customer/AddCustomer`, data).then((res) => {
            if (res.status == 200) {
              this.loading = false;
              this.$toast.success("Customer Added Successfully");
              // get data again
              this.$axios
                .$get(
                  `/Customer/GetAllCustomer?page=${this.$route.query.page || 1}`
                )
                .then((res) => {
                  this.customerTable = res.Customer.data;
                  this.totalPages = res.Customer.last_page;
                  this.perPage = res.Customer.per_page;
                  this.total = res.Customer.total;
                  this.permissions = res.permissions;
                });
              document.getElementById(`addCustomer`).classList.toggle("hidden");

              this.addNewCustomer();
            } else {
              this.$toast.error(res.Message);
              this.loading = false;
            }
          });
        }
      }
    },
    // edit customer
    editCustomer() {
      // validation messages
      const requiredFields = [
        "customer_name",
        "customer_code",
        "registration_code",
        "national_id",
        "phone",
        "email",
        "vat_number",
      ];

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
        let data = {
          customer_name: this.customer_name,
          customer_code: this.customer_code,
          mobile_number: this.phone,
          email: this.email,
          other_mobile_number: this.mobile_number,
          registration_code: this.registration_code,
          credit_limit: this.credit_limit,
          payment_term: this.payment_term,
          is_active: this.active_user,
          corporate: this.isCooperate,
          address: this.address,
          snn: this.national_id,
          vin_number: this.vat_number,
        };

        this.$axios
          .$post(`/Customer/UpdateCustomer/${this.id}`, data)
          .then((res) => {
            if (res.status == 200) {
              this.loading = false;
              this.$toast.success("Customer Edit Successfully");
              // get data again
              this.$axios
                .$get(
                  `/Customer/GetAllCustomer?page=${this.$route.query.page || 1}`
                )
                .then((res) => {
                  this.customerTable = res.Customer.data;
                  this.totalPages = res.Customer.last_page;
                  this.perPage = res.Customer.per_page;
                  this.total = res.Customer.total;
                  this.permissions = res.permissions;
                });
              // document
              //   .getElementById(`modal${this.id}`)
              //   .classList.toggle("hidden");
            } else {
              this.$toast.error("Sorry , There is an Error");
              this.loading = false;
            }
          });
      }
    },
    // delete customer
    deleteCustomer(id, status) {
      if (status != "delete") {
        document.getElementById(`Deletemodal${id}`).classList.toggle("hidden");
      }
      if (status == "delete") {
        this.loading = true;
        this.$axios.$post(`/Customer/DeleteCustomer/${id}`).then((res) => {
          if (res.status == 200) {
            // success toast
            this.$toast.success("Customer Deleted Successfully");
            // loading = false
            this.loading = false;

            // get data again
            this.$axios
              .$get(
                `/Customer/GetAllCustomer?page=${this.$route.query.page || 1}`
              )
              .then((res) => {
                this.customerTable = res.Customer.data;
                this.totalPages = res.Customer.last_page;
                this.perPage = res.Customer.per_page;
                this.total = res.Customer.total;
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
      this.$axios.$get(`/Customer/GetAllCustomer?page=${value}`).then((res) => {
        this.customerTable = res.Customer.data;
        this.totalPages = res.Customer.last_page;
        this.perPage = res.Customer.per_page;
        this.total = res.Customer.total;
      });
      this.$router.push({ path: "/customer", query: { page: value } });
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
</style>
