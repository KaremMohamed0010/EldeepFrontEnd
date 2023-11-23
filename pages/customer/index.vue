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
                          :class="{
                            'tab-style': showInformation == true,
                            'tab-un-active': showInformation == false,
                          }"
                          @click="show('Informations')"
                          class="tabbtn cursor-pointer px-2 py-1 font-medium"
                        >
                          {{ $t("Informations") }}
                        </div>
                        <div
                          data-tabopen="Payment"
                          @click="show('Payment')"
                          :class="{
                            'tab-style': showPayemnt == true,
                            'tab-un-active': showPayemnt == false,
                          }"
                          class="tabbtn tab-un-active cursor-pointer px-2 py-1 ml-[26px]"
                        >
                          {{ $t("Payment") }}
                        </div>
                        <div
                          data-tabopen="Vehicles"
                          @click="show('Vehicles')"
                          :class="{
                            'tab-style': showVichels == true,
                            'tab-un-active': showVichels == false,
                          }"
                          class="tabbtn cursor-pointer px-2 py-1 ml-[26px]"
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
                              <!-- customer code -->
                              <div class="group">
                                <label
                                  for="1"
                                  class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                  >{{ $t("customer_code") }}

                                  :</label
                                >

                                <input
                                  id="1"
                                  type="text"
                                  v-model="customer_codee"
                                  placeholder="U-001"
                                  class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                />
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
                              <!-- National ID -->

                              <!-- location -->
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
                              </div>

                              <div class="group mt-[20px]">
                                <label
                                  for="1"
                                  class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                  >{{ $t("Registration code") }} :</label
                                >
                               
                                <NationalId
                                  :nationalId="registration_code"
                                  @update:nationalId="updateNationalId"
                                  :isEdit="false"
                                />
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
                                    >{{ $t("Phone") }} :</label
                                  >
                                  <PhoneNumber
                                    :phoneNumber="phone"
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
                                    :mobileNumber="mobile_number"
                                    @update:mobileNumber="updateMobileNumber"
                                    :isEdit="false"
                                  />
                                </div>

                                <!-- National ID -->
                                <div class="group mt-[20px]">
                                  <label
                                    for="1"
                                    class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
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
                            <select
                              style="border-radius: 29px"
                              v-model="payment_term"
                              class="border-select border-radius-[30px] w-[100%] py-1 px-2 bg-white"
                              name="whatever"
                              id="frm-whatever"
                            >
                              <option value="Immediately">Immediately</option>
                              <option value="30 ">30 </option>
                              <option value="45 ">45 </option>
                              <option value="60">60</option>
                            </select>
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
                              v-model="plate_number"
                              placeholder="ج ح ا ١٨٩"
                              class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                          <!-- conditions -->

                          <div
                            class="flex justify-space-between mt-[30px] form-style p-[20px]"
                          >
                            <h1 v-if="isCooperate" class="active-user">
                              {{ $t("Cooperate") }}
                            </h1>

                            <h1 v-if="isCooperate == false" class="active-user">
                              {{ $t("Individual") }}
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

                          <!-- Vat Number -->
                          <div v-if="isCooperate" class="group mt-[20px]">
                            <label
                              for="1"
                              class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                              >{{ $t("Vat Number") }} :</label
                            >
                            <VatNumber
                              :VatNumber="vat_number"
                              @update:VatNumber="UpdateVatNumer"
                              :isEdit="false"
                            />
                          </div>
                          <!-- register number  -->
                          <div v-if="isCooperate" class="group mt-[20px]">
                            <label
                              for="1"
                              class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                              >{{ $t("Register Number") }} :</label
                            >
                            <input
                              id="1"
                              :class="{
                                'outline-error':
                                  emptyField.includes('register_number'),
                              }"
                              type="text"
                              v-model="register_number"
                              placeholder="14%"
                              class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                            />
                            <p
                              v-if="emptyField.includes('register_number')"
                              class="error-message"
                            >
                              {{ $t("Register Number") }}
                              {{ $t("required") }}
                            </p>
                          </div>
                          <!-- ssn number individual -->
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
                      <p
                        v-if="customer.credit_limit != 'null'"
                        class="text-gray-900 whitespace-no-wrap"
                      >
                        {{ customer.credit_limit }}
                      </p>
                      <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p
                        v-if="customer.payment_term != 'null'"
                        class="text-gray-900 whitespace-no-wrap"
                      >
                        {{ customer.payment_term }}
                      </p>
                      <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
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
                            :style="{
                              height:
                                showInformation == true ? '766px' : 'auto',
                              'overflow-y':
                                showInformation == true ? 'auto' : 'visible',
                            }"
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
                                :class="{
                                  'tab-style': showInformation == true,
                                  'tab-un-active': showInformation == false,
                                }"
                                @click="show('Informations')"
                                class="tabbtn cursor-pointer px-2 py-1 font-medium"
                              >
                                {{ $t("Informations") }}
                              </div>
                              <div
                                data-tabopen="Payment"
                                @click="show('Payment')"
                                :class="{
                                  'tab-style': showPayemnt == true,
                                  'tab-un-active': showPayemnt == false,
                                }"
                                class="tabbtn tab-un-active cursor-pointer px-2 py-1"
                              >
                                {{ $t("Payment") }}
                              </div>
                              <div
                                data-tabopen="Vehicles"
                                @click="show('Vehicles')"
                                :class="{
                                  'tab-style': showVichels == true,
                                  'tab-un-active': showVichels == false,
                                }"
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
                                    <div class="group">
                                      <label
                                        for="1"
                                        class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                        >{{ $t("customer_code") }}

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

                                    <!-- location -->
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
                                    </div>
                                    <!-- National Id -->

                                    <div class="group mt-[20px]">
                                      <div class="group mt-[20px]">
                                        <label
                                          for="1"
                                          class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{
                                            $t("Registration code")
                                          }}
                                          :</label
                                        >
                                         <NationalId
                                  :nationalId="registration_code"
                                  @update:nationalId="updateNationalId"
                                  :isEdit="true"
                                />
                                      </div>
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
                                      <!-- Vat Number -->
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
                                          class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
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
                                  <select
                                    style="border-radius: 29px"
                                    v-model="payment_term"
                                    class="border-select border-radius-[30px] w-[100%] py-1 px-2 bg-white"
                                    name="whatever"
                                    id="frm-whatever"
                                  >
                                    <option value="Immediately">
                                      Immediately
                                    </option>
                                    <option value="30 ">30 </option>
                                    <option value="45 ">45 </option>
                                    <option value="60">60</option>
                                  </select>
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
                                    v-model="plate_number"
                                    placeholder="ج ح ا ١٨٩"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                </div>

                                <!-- conditions -->

                                <div
                                  class="flex justify-space-between mt-[30px] form-style p-[20px]"
                                >
                                  <h1 v-if="isCooperate" class="active-user">
                                    {{ $t("Cooperate") }}
                                  </h1>

                                  <h1
                                    v-if="isCooperate == false"
                                    class="active-user"
                                  >
                                    {{ $t("Individual") }}
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
                                <!-- Vat Number -->
                                <div v-if="isCooperate" class="group mt-[20px]">
                                  <label
                                    for="1"
                                    class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Vat Number") }} :</label
                                  >
                                  <VatNumber
                                    :VatNumber="vat_number"
                                    @update:VatNumber="UpdateVatNumer"
                                    :isEdit="true"
                                  />
                                </div>
                                <!-- register number  -->
                                <div v-if="isCooperate" class="group mt-[20px]">
                                  <label
                                    for="1"
                                    class="block flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Register Number") }} :</label
                                  >
                                  <input
                                    id="1"
                                    :class="{
                                      'outline-error':
                                        emptyField.includes('register_number'),
                                    }"
                                    type="text"
                                    v-model="register_number"
                                    placeholder="14%"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                  <p
                                    v-if="
                                      emptyField.includes('register_number')
                                    "
                                    class="error-message"
                                  >
                                    {{ $t("Register Number") }}
                                    {{ $t("required") }}
                                  </p>
                                </div>
                                <!-- ssn number individual -->
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
                  class="p-[30px] media inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[776px] sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <!-- close btn -->
                  <div class="px-4 py-3 text-left">
                    <button
                      @click="addNewLocation('close')"
                      type="button"
                      class="py-2 px-4 bg-white text-black rounded mr-2 flex"
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

                  <div id="Informations" class="tab mt-1 items-center">
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
                  <div class="flex mb-[30px]">
                    <div class="w-[50%]">
                      <button
                        @click="addNewLocation('close')"
                        class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                      >
                        {{ $t("close") }}
                      </button>
                    </div>
                    <div class="w-[50%] ml-[6px]">
                      <button
                        type="button"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NationalId from "../../components/Inputs/NationalId.vue";
import PhoneNumber from "../../components/Inputs/PhoneNumber.vue";
import VatNumber from "../../components/Inputs/VatNumber.vue";
import Location from "../../components/Inputs/Location.vue";

import MobileNumber from "../../components/Inputs/MobileNumber.vue";

import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

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
      customer_code: "",
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
      register_number: 0,
      ssn_number: null,

      // pagination data
      page: 1,
      totalPages: "",
      total: "",
      perPage: "",
      currentPage: 1,
      hasMorePages: true,
      permissions: [],
      locations: [],
      location: null,
      loading: true,
      lang: "",
      open: false,

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
      selectedLocations: [],

      // search
      search: "",
      customer_codee: null,
    };
  },
  mounted() {
    // get all customers
    this.customer_codee = localStorage.getItem("customer_code");
    // countries
    this.$axios.$get(`/Location/GetAllLocationDropDownList`).then((res) => {
      this.locations = res.Location;
    });
    this.$axios
      .get("https://countriesnow.space/api/v0.1/countries/capital")
      .then((res) => {
        this.countries = res.data.data;
      });
    // bring All Data
    this.$axios.$get("/Customer/GetAllCustomer").then((res) => {
      localStorage.setItem("customer_code", res.NextItem);
      this.customerTable = res.Customer.data;
      this.customer_code = res.NextItem;
      this.totalPages = res.Customer.meta.last_page;
      this.perPage = res.Customer.meta.per_page;
      this.total = res.Customer.meta.total;
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
    // show add location poopup

    addLocation() {
      // open location modal
      document.getElementById(`addLocation`).classList.remove("hidden");
    },
    // multiSelected Locations

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
      this.registration_code = updateValue;
    },
    UpdatePhoneNumberValue(updateValue) {
      this.phone = updateValue;
    },
    // search
    searchData() {
      this.$axios
        .$get(`/Customer/GetAllCustomer?search=${this.search}`)
        .then((res) => {
          this.customerTable = res.Customer.data;
          this.customer_code = res.NextItem;
          this.totalPages = res.Customer.meta.last_page;
          this.perPage = res.Customer.meta.per_page;
          this.total = res.Customer.meta.total;
          this.permissions = res.permissions;
          this.loading = false;
        });
    },

    // open add location popup
    openAddLocationPopup() {
      document.getElementById(`addLocation`).classList.remove("hidden");
    },
    // toggle location popup
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
    // clear location
    clearLocation() {
      (this.country_name = null),
        (this.city_name = null),
        (this.area = null),
        (this.street = null),
        (this.building_number = null),
        (this.floor = null),
        (this.employee_id = null),
        (this.vendor_id = null);
    },
    // post location
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

          // this.selectedLocations.push(lastItem);
          this.clearLocation();
        } else {
          this.$toast.error(res.message);
        }
      });
    },
    // cat number -
    vatNumberDashed() {
      const joy = this.vat_number.match(/.{1,4}/g);
      this.vat_number = joy.join(" ");
    },
    // clear data
    clearData() {
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
      this.selectedLocations = [];
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
    // toggle modal open and close the modal
    toggleModal(id, status) {
      this.showInformation = true;
      this.showPayemnt = false;
      this.showVichels = false;

      this.emptyField = "";
      // show modal
      document.getElementById(`modal${id}`).classList.toggle("hidden");
      // get data by id
      if (status == "open") {
        this.$axios.$get(`/Customer/GetCustomerById/${id}`).then((res) => {
          this.data = res.Customer;
          this.customer_code = res.Customer.customer_code;
          this.customer_name = res.Customer.customer_name;
          if (res.Customer.vat_number == "null") {
            this.vat_number = null;
          }
          if (res.Customer.vat_number != "null") {
            this.vat_number = res.Customer.vat_number;
          }
          if (res.Customer.other_mobile_number == "null") {
            this.phone = null;
          }
          if (res.Customer.other_mobile_number != "null") {
            this.phone = res.Customer.other_mobile_number;
          }
          if (res.Customer.mobile_number == "null") {
            this.mobile_number = null;
          }
          if (res.Customer.mobile_number != "null") {
            this.mobile_number = res.Customer.mobile_number;
          }
          if (res.Customer.email == "null") {
            this.email = null;
          }
          if (res.Customer.email != "null") {
            this.email = res.Customer.email;
          }
          if (res.Customer.address == "null") {
            this.address = null;
          }
          if (res.Customer.address != "null") {
            this.address = res.Customer.address;
          }
          if (res.Customer.snn == "null") {
            this.national_id = null;
          }
          if (res.Customer.snn != "null") {
            this.national_id = res.Customer.snn;
          }
          if (res.Customer.vat_number == "null") {
            this.vat_number = null;
          }
          if (res.Customer.vat_number != "null") {
            this.vat_number = res.Customer.vat_number;
          }
          if(res.Customer.credit_limit == 'null'){
            this.credit_limit = null;
          }
         
          if (res.Customer.registry_number == "null") {
            this.register_number = null;
          }
          if (res.Customer.registry_number != "null") {
            this.register_number = res.Customer.registry_number;
          }
          this.selectedLocations = res.Customer.Address;
          if (res.Customer.credit_limit != "null") {
            this.disable = false;
            this.activeCreditLimit = true;
            this.credit_limit = res.Customer.credit_limit;
          }
          if (res.Customer.payment_term != "null") {
            this.payment_term = res.Customer.payment_term;
            this.disabledPayment = false;
            this.activePayment = true;
            this.payment_term = res.Customer.payment_term;
          }
          if (res.Customer.plate_number == "null") {
            this.plate_number = null;
          }
          if (res.Customer.plate_number != "null") {
            this.plate_number = res.Customer.plate_number;
          }

          if (res.Customer.registration_code == "null") {
            this.registration_code = null;
          }
          if (res.Customer.registration_code != "null") {
            this.registration_code = res.Customer.registration_code;
          }

          // if (res.Customer.vat_number || res.Customer.registry_number) {
          //   this.isCooperate = true;
          // } else {
          //   this.isCooperate = false;
          // }
          if (res.Customer.corporate == "true") {
            this.isCooperate = true;
          } else if (res.Customer.corporate == "false") {
            this.isCooperate = false;
          } else {
            this.isCooperate = res.Customer.corporate;
          }
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
      this.showInformation = true;
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
      const requiredFields = ["customer_name"];

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

          formdata.append("customer_name", this.customer_name);
          formdata.append("customer_code", this.customer_code);
          formdata.append("mobile_number", this.mobile_number);
          formdata.append("other_mobile_number", this.phone);
          formdata.append("credit_limit", this.credit_limit);
          formdata.append("payment_term", this.payment_term);
          if (this.active_user == true) {
            formdata.append("is_active", 1);
          } else if (this.active_user == false) {
            formdata.append("is_active", 0);
          }
          if (this.isCooperate == true) {
            formdata.append("corporate", 1);
          }
          if (this.isCooperate == false) {
            formdata.append("corporate", 0);
          }
          formdata.append("address", this.address);
          formdata.append("snn", this.national_id);
          formdata.append("vat_number", this.vat_number);
          formdata.append("registry_number", this.register_number);
          formdata.append("registration_code", this.registration_code);
          formdata.append("email", this.email);
          formdata.append("plate_number", this.plate_number);

          this.selectedLocations.forEach((value, index) => {
            formdata.append(`location_id[${index}]`, value.Id);
          });

          this.$axios.$post(`/Customer/AddCustomer`, formdata).then((res) => {
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
                  this.customer_code = res.NextItem;
                  this.totalPages = res.Customer.meta.last_page;
                  this.perPage = res.Customer.meta.per_page;
                  this.total = res.Customer.meta.total;
                  this.permissions = res.permissions;
                  this.loading = false;
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
      const requiredFields = ["customer_name"];

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

        formdata.append("customer_name", this.customer_name);
        formdata.append("customer_code", this.customer_code);
        formdata.append("mobile_number", this.mobile_number);
        formdata.append("other_mobile_number", this.phone);
        formdata.append("registration_code", this.registration_code);
        formdata.append("credit_limit", this.credit_limit);
        formdata.append("payment_term", this.payment_term);
        formdata.append("plate_number", this.plate_number);
        if (this.active_user == true) {
          formdata.append("is_active", 1);
        } else if (this.active_user == false) {
          formdata.append("is_active", 0);
        }
        if (this.isCooperate == true) {
          formdata.append("corporate", 1);
        }
        if (this.isCooperate == false) {
          formdata.append("corporate", 0);
        }
        formdata.append("address", this.address);
        formdata.append("snn", this.national_id);
        formdata.append("vat_number", this.vat_number);
        formdata.append("registry_number", this.register_number);
        formdata.append("email", this.email);
        this.selectedLocations.forEach((value, index) => {
          formdata.append(`location_id[${index}]`, value.Id);
        });

        this.$axios
          .$post(`/Customer/UpdateCustomer/${this.id}`, formdata)
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
                  this.customer_code = res.NextItem;
                  this.totalPages = res.Customer.meta.last_page;
                  this.perPage = res.Customer.meta.per_page;
                  this.total = res.Customer.meta.total;
                  this.permissions = res.permissions;
                  this.loading = false;
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
                this.customer_code = res.NextItem;
                this.totalPages = res.Customer.meta.last_page;
                this.perPage = res.Customer.meta.per_page;
                this.total = res.Customer.meta.total;
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
        this.customer_code = res.NextItem;
        this.totalPages = res.Customer.meta.last_page;
        this.perPage = res.Customer.meta.per_page;
        this.total = res.Customer.meta.total;
        this.permissions = res.permissions;
        this.loading = false;
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
@media (max-width: 1550px) {
  .media {
    height: 700px;
    overflow-y: auto;
  }
}
</style>
