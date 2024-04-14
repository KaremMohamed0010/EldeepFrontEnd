<template>
  <div :class="lang == 'en' ? 'ml-[68px]' : 'mr-[68px]'" class="p-[12px]">
    <div v-if="loading == true" class="flex justify-center w-[100%]">
      <Loading :text="'Loading'" />
    </div>
    <div
      v-if="loading == false && purchasing.length > 0"
      class="p-[20px] bg-table"
    >
      <div class="p-[20px] flex justify-between">
        <div class="flex">
          <h1 class="total-request">{{ $t("total_request") }}</h1>
          <span class="total-request-number">
            {{ purchasing.length }} {{ $t("Request") }}</span
          >
        </div>
      </div>

      <div class="table-container overflow-x-auto">
        <table class="min-w-full leading-normal table-style">
          <thead>
            <tr>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex"></div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap table-headers">
                      {{ $t("Serial") }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap table-headers">
                      {{ $t("Req N.O.") }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Part Name") }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Condition") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("QTY") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Vin Car") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Car Type") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Model") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Part N.O.") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Vendor") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Location") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Price") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Pricing group") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Payment Term") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers"></p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers"></p>
              </td>
            </tr>
          </thead>
          <tbody v-for="(data, index) in purchasing" :key="index">
            <tr>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex"></div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex"></div>
              </td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>

              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>

              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>

              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>

              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>

              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>

              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              ></td>
            </tr>
            <tr v-for="(price, i) in data.QuoteParts" :key="i">
              <td></td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ price.SerialPart }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ price.Req_No }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ price.PartName }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ price.Condition }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ price.QTY }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.VinNumber != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.VinNumber }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.CarType != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.CarType }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.model != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.model }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.PartNO != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.PartNO }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.Vendor != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.Vendor }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.Location != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.Location }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.Price != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.Price }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.PayMethod != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.PayMethod }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                  v-if="price.PricingGroup != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.PricingGroup }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                  :disabled="loading"
                  :class="{
                    'cusror-disabled': loading,
                  }"
                  @click="showPicker(price.Id, price)"
                  class="close-btn flex items-center px-5 rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                >
                  <!-- svg for picker  -->
                  <svg
                    class="mr-[8px]"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4503 17.0625C11.2478 17.0625 11.0603 16.95 10.9628 16.7775C10.8653 16.605 10.8653 16.3875 10.9703 16.215L11.7578 14.9025C11.9153 14.6325 12.2603 14.55 12.5303 14.7075C12.8003 14.865 12.8828 15.21 12.7253 15.48L12.5228 15.8175C14.5928 15.33 16.1453 13.47 16.1453 11.25C16.1453 10.9425 16.4003 10.6875 16.7078 10.6875C17.0153 10.6875 17.2703 10.9425 17.2703 11.25C17.2628 14.4525 14.6528 17.0625 11.4503 17.0625Z"
                      fill="#292D32"
                    />
                    <path
                      d="M1.69922 7.3125C1.39172 7.3125 1.13672 7.0575 1.13672 6.75C1.13672 3.5475 3.74672 0.9375 6.94922 0.9375C7.15172 0.9375 7.33921 1.05 7.43671 1.2225C7.53421 1.395 7.53422 1.6125 7.42922 1.785L6.64172 3.0975C6.48422 3.3675 6.13922 3.45001 5.86922 3.29251C5.59922 3.13501 5.51672 2.78999 5.67422 2.51999L5.87672 2.18248C3.80672 2.66998 2.25422 4.53 2.25422 6.75C2.26172 7.0575 2.00672 7.3125 1.69922 7.3125Z"
                      fill="#292D32"
                    />
                    <path
                      d="M13.4585 5.62497C13.361 5.62497 13.2635 5.60248 13.1735 5.54998L10.196 3.82495C9.92602 3.66745 9.83601 3.32247 9.99351 3.05247C10.151 2.78247 10.496 2.69246 10.7585 2.84996L13.4585 4.40997L16.136 2.85746C16.406 2.69996 16.751 2.79748 16.901 3.05998C17.0585 3.32998 16.961 3.67496 16.6985 3.83246L13.736 5.54248C13.6535 5.59498 13.556 5.62497 13.4585 5.62497Z"
                      fill="#292D32"
                    />
                    <path
                      d="M13.459 8.6772C13.1515 8.6772 12.8965 8.4222 12.8965 8.1147V5.05469C12.8965 4.74719 13.1515 4.49219 13.459 4.49219C13.7665 4.49219 14.0215 4.74719 14.0215 5.05469V8.1147C14.0215 8.4297 13.7665 8.6772 13.459 8.6772Z"
                      fill="#292D32"
                    />
                    <path
                      d="M13.4587 8.81289C13.1137 8.81289 12.7613 8.73789 12.4838 8.58039L10.6837 7.58287C10.0987 7.26037 9.65625 6.50291 9.65625 5.83541V3.93038C9.65625 3.25538 10.0988 2.5054 10.6913 2.1754L12.4912 1.17789C13.0462 0.870391 13.8788 0.870391 14.4413 1.17789L16.2412 2.1754C16.8262 2.4979 17.2687 3.25537 17.2687 3.92287V5.8279C17.2687 6.5029 16.8262 7.25287 16.2412 7.57537L14.4413 8.57288C14.1488 8.73788 13.8037 8.81289 13.4587 8.81289ZM13.0312 2.15288L11.2313 3.15039C11.0063 3.27789 10.7812 3.66036 10.7812 3.91536V5.82039C10.7812 6.08289 11.0063 6.46541 11.2313 6.58541L13.0312 7.59038C13.2487 7.71038 13.6687 7.71038 13.8862 7.59038L15.6862 6.59287C15.9112 6.46537 16.1362 6.0829 16.1362 5.8279V3.92287C16.1362 3.66037 15.9112 3.2779 15.6862 3.1579L13.8862 2.16039C13.6687 2.03289 13.2413 2.03288 13.0312 2.15288Z"
                      fill="#292D32"
                    />
                    <path
                      d="M4.93899 13.875C4.84149 13.875 4.74399 13.8525 4.65399 13.8L1.67649 12.0749C1.40649 11.9174 1.31648 11.5725 1.47398 11.3025C1.63148 11.0325 1.97649 10.9425 2.23899 11.1L4.93899 12.66L7.61649 11.1075C7.88649 10.95 8.23149 11.0475 8.38149 11.31C8.53899 11.58 8.44149 11.925 8.17899 12.0825L5.21649 13.7925C5.13399 13.845 5.03649 13.875 4.93899 13.875Z"
                      fill="#292D32"
                    />
                    <path
                      d="M4.93945 16.9272C4.63195 16.9272 4.37695 16.6722 4.37695 16.3647V13.3047C4.37695 12.9972 4.63195 12.7422 4.93945 12.7422C5.24695 12.7422 5.50195 12.9972 5.50195 13.3047V16.3647C5.50195 16.6797 5.25445 16.9272 4.93945 16.9272Z"
                      fill="#292D32"
                    />
                    <path
                      d="M4.93922 17.0622C4.59422 17.0622 4.24172 16.9872 3.96422 16.8297L2.16422 15.8322C1.57922 15.5097 1.13672 14.7522 1.13672 14.0847V12.1797C1.13672 11.5047 1.57922 10.7547 2.16422 10.4322L3.96422 9.43473C4.51922 9.12723 5.35922 9.12723 5.91422 9.43473L7.71422 10.4322C8.29922 10.7547 8.74172 11.5122 8.74172 12.1797V14.0847C8.74172 14.7597 8.29921 15.5097 7.70671 15.8397L5.90672 16.8372C5.63672 16.9872 5.29172 17.0622 4.93922 17.0622ZM4.51172 10.4022L2.71172 11.3997C2.48672 11.5272 2.26172 11.9097 2.26172 12.1647V14.0697C2.26172 14.3322 2.48672 14.7147 2.71172 14.8347L4.51172 15.8322C4.72922 15.9522 5.14922 15.9522 5.36672 15.8322L7.16671 14.8347C7.39171 14.7072 7.61672 14.3247 7.61672 14.0697V12.1647C7.61672 11.9022 7.39171 11.5197 7.16671 11.3997L5.36672 10.3947C5.15672 10.2822 4.72922 10.2822 4.51172 10.4022Z"
                      fill="#292D32"
                    />
                  </svg>
                  {{ $t("Picker") }}
                </button>
              </td>
              <div
                class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
                :id="`pick` + price.Id"
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
                    style="height: 626px; overflow-y: auto"
                    class="p-[30px] media inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[538px] sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <!-- close btn -->
                    <div
                      :disabled="loading"
                      :class="{ 'cusror-disabled': loading }"
                      class="px-4 py-3 text-left"
                    >
                      <button
                        type="button"
                        class="py-2 px-4 bg-white text-black rounded mr-2 flex"
                        @click="showPicker(price.Id, price)"
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
                      :disabled="loading"
                      :class="{ 'cusror-disabled': loading }"
                      id="Informations"
                      class="tab mt-1 items-center"
                    >
                      <div class="flex items-center justify-space-between">
                        <!-- information -->
                        <div
                          :class="{ 'text-right': lang == 'ar' }"
                          class="text-lg font-bold rounded-lg w-[100%] mb-[20px]"
                        >
                          <div class="form-style mt-[20px] p-[30px]">
                            <!-- Employee Name and Employee Code -->
                            <!-- request no -->
                            <div class="group py-2 w-[100%]">
                              <label
                                for="1"
                                class="block flex flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Request N.O") }}
                                <p class="required">*</p>
                                :
                              </label>
                              <input
                                id="1"
                                type="text"
                                disabled
                                :class="{
                                  'outline-error':
                                    emptyField.includes('Req_No'),
                                }"
                                v-model="Req_No"
                                placeholder="Request N.O:3281768"
                                class="peer input-style p-[20px] cursor-disabled bg-[#f3f0f0] cursor-not-allowed h-10 w-full rounded-md px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                              />
                            </div>

                            <!-- transmittion at -->
                            <!-- 
                            <div class="group py-2 w-[100%]">
                              <label
                                for="1"
                                class="block flex flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Transmission AT") }}
                                <p class="required">*</p>
                                :
                              </label>
                              <input
                                id="1"
                                type="text"
                                v-model="transmit_at"
                                placeholder="Transmission AT"
                                class="peer input-style h-10 p-[20px] w-full rounded-md px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                              />
                            </div> -->

                            <!-- QTY at -->
                            <div class="group py-2 w-[100%]">
                              <label
                                for="1"
                                class="block flex flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("QTY") }}
                                <p class="required">*</p>
                                :
                              </label>
                              <input
                                id="1"
                                :class="{
                                  'outline-error': emptyField.includes('QTY'),
                                }"
                                type="text"
                                v-model="QTY"
                                placeholder="Request N.O:3281768"
                                class="peer input-style p-[20px] h-10 w-full rounded-md px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                              />
                            </div>

                            <!-- vendors  -->
                            <div class="group py-2 w-[100%]">
                              <label
                                for="1"
                                class="block flex flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Vendors") }}
                                <p class="required">*</p>
                                :
                              </label>
                              <select
                                v-model="vendor_id"
                                class="border-select w-full py-1 px-2 bg-white"
                                name="whatever"
                                :class="{
                                  'outline-error':
                                    emptyField.includes('vendor_id'),
                                }"
                                id="frm-whatever"
                              >
                                <option
                                  v-for="(vendor, i) in vendorTable"
                                  :value="vendor.vendorId"
                                  :key="i"
                                >
                                  {{ vendor.vendor_name }}
                                </option>
                              </select>
                            </div>
                            <!-- location  -->
                            <div class="group py-2 w-[100%]">
                              <label
                                for="1"
                                class="block flex flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Location") }}
                                <p class="required">*</p>
                                :
                              </label>
                              <select
                                v-model="location_id"
                                class="border-select w-full py-1 px-2 bg-white"
                                name="whatever"
                                :class="{
                                  'outline-error':
                                    emptyField.includes('location_id'),
                                }"
                                id="frm-whatever"
                              >
                                <option
                                  v-for="(location, i) in locations"
                                  :value="location.Id"
                                  :key="i"
                                >
                                  {{ location.Address }}
                                </option>
                              </select>
                            </div>
                            <!-- Pick at -->
                            <div class="group py-2 w-[100%]">
                              <label
                                for="1"
                                class="block flex flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Picker") }}
                                <p class="required">*</p>
                                :
                              </label>
                              <input
                                id="1"
                                :class="{
                                  'outline-error':
                                    emptyField.includes('picker'),
                                }"
                                type="text"
                                v-model="picker"
                                placeholder="123"
                                class="peer input-style p-[20px] h-10 w-full rounded-md px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                              />
                            </div>
                            <!-- Price at -->
                            <div class="group py-2 w-[100%]">
                              <label
                                for="1"
                                class="block flex flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Price") }}
                                <p class="required">*</p>
                                :
                              </label>
                              <input
                                id="1"
                                type="text"
                                v-model="Price"
                                :class="{
                                  'outline-error': emptyField.includes('Price'),
                                }"
                                placeholder="123"
                                class="peer input-style p-[20px] h-10 w-full rounded-md px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                              />
                            </div>
                            <div class="group py-2 w-[100%]">
                              <label
                                for="1"
                                class="block flex flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Employe") }}
                                <p class="required">*</p>
                                :
                              </label>
                              <select
                                v-model="employee_id"
                                class="border-select w-full py-1 px-2 bg-white"
                                name="whatever"
                                :class="{
                                  'outline-error':
                                    emptyField.includes('employee_id'),
                                }"
                                id="frm-whatever"
                              >
                                <option
                                  v-for="(employee, i) in employeeTable"
                                  @click="deliverto(employee)"
                                  :value="employee.UserId"
                                  :key="i"
                                >
                                  {{ employee.UserName }}
                                </option>
                              </select>
                            </div>
                            <!-- Pricing group -->
                            <!----   <div class="group py-2 w-[100%]">
                              <label
                                for="1"
                                class="block flex flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Pricing group") }}
                                <p class="required">*</p>
                                :
                              </label>
                              <select
                                v-model="prcing_group"
                                class="border-select w-full py-1 px-2 bg-white"
                                name="whatever"
                                :class="{
                                  'outline-error':
                                    emptyField.includes('pricing_group'),
                                }"
                                id="frm-whatever"
                              >
                                <option value="100">100</option>
                                <option value="130">130</option>
                                <option value="140">140</option>
                              </select>
                            </div>  -->

                            <!-- Deliver to -->
                            <div class="group py-2 w-[100%]">
                              <label
                                for="1"
                                class="block flex flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Deliver to") }}
                                <p class="required">*</p>
                                :
                              </label>
                              <select
                                v-model="deliver_to"
                                class="border-select w-full py-1 px-2 bg-white"
                                name="whatever"
                                :class="{
                                  'outline-error':
                                    emptyField.includes('deliver_to'),
                                }"
                                id="frm-whatever"
                              >
                                <option
                                  v-for="(location, i) in locationss"
                                  :key="i"
                                  value="100"
                                >
                                  {{ location.area }}
                                </option>
                              </select>
                            </div>
                            <!-- Date -->
                            <div class="group py-2 w-[100%]">
                              <label
                                for="1"
                                class="block flex flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                >{{ $t("Date") }}
                                <p class="required">*</p>
                                :
                              </label>
                              <input
                                id="1"
                                type="date"
                                v-model="date"
                                placeholder="Request N.O:3281768"
                                class="peer input-style h-10 w-full rounded-md px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                              />
                            </div>
                            <!-- Check -->
                            <div class="group py-2 w-[100%]">
                              <label
                                for="1"
                                class="block flex items-center label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                              >
                                <input
                                  id="1"
                                  type="checkbox"
                                  v-model="check"
                                  class="px-2"
                                  placeholder="Request N.O:3281768"
                                />
                                <p class="ml-[12px]">
                                  {{ $t("Need to Check") }}
                                </p>
                              </label>
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
                      <div class="w-[100%] ml-[6px]">
                        <button
                          :disabled="check == false"
                          :class="{ 'cusror-disabled': check == false }"
                          @click="savePicker(price.Id)"
                          class="action-btn rounded-lg w-[100%] px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
                        >
                          {{ $t("Add") }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="totalPages > 0" class="mt-[20px]">
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
      v-else-if="loading == false && purchasing.length == 0"
      class="w-[100%]"
    >
      <div class="flex justify-center mt-[135px]">
        <img
          src="../../assets/imgs/comman/no-data-empty-data-concept-vector-41830412-removebg-preview.png"
          alt=""
        />
      </div>
      <h1 class="text-center no-data">
        {{ $t("There is No Purcahse") }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      purchasing: [],
      loading: true,
      hasMorePages: true,
      currentPage: 1,

      // purchasing data

      vendorTable: [],
      emptyField: "",

      locations: [],

      // data
      transmit_at: "",
      vendor_id: "",
      employee_id: "",
      location_id: "",
      picker: "",
      deliver_to: "",
      check: false,
      Req_No: "",
      date: "",
      QTY: "",
      Price: "",
      prcing_group: "",
      employeeTable: [],
      locationss: [],
    };
  },
  mounted() {
    // get all Pricing

    this.$axios.$post("/Purchasing/GetPurchasingRequest").then((res) => {
      this.request = res.TotalRequest;
      this.purchasing = res.quotes.data;
      this.totalPages = res.quotes.meta.last_page;
      this.perPage = res.quotes.meta.per_page;
      this.total = res.quotes.meta.total;
      this.loading = false;
    });

    this.$axios.$get("/Member/GetMemberRoles").then((res) => {
      this.employeeTable = res.Member;
    });

    // get all vendors
    this.$axios.$get("/Vendor/allVendor").then((res) => {
      this.vendorTable = res.Vendor;
      this.loading = false;
    });

    // get all location

    this.$axios.$get("/Location/GetAllLocationDropDownList").then((res) => {
      this.locations = res.Location;
    });

    // get all area location
    this.$axios.$get("/Location/GetDeliverToLocation").then((res) => {
      this.locationss = res.Location;
    });
    // tabs code
    this.lang = localStorage.getItem("lang");

    if (this.lang == "en") {
      this.$i18n.locale = "en";
    } else if (this.lang == "ar") {
      this.$i18n.locale = "ar";
    }

    this.open = localStorage.getItem("open");
  },
  created() {},
  methods: {
    // deliver to pages
    deliverto(employee) {
      console.log(employee);
      this.deliver_to = employee.LocationCity;
    },
    // show more
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    },
    // show picker
    showPicker(id, Price) {
      document.getElementById(`pick${id}`).classList.toggle("hidden");
      this.Req_No = Price.Req_No;
      this.QTY = Price.QTY;
      this.vendor_id = Price.Vendor;
      this.location_id = Price.Location;
      this.Price = Price.Price;
    },
    // save picker
    savePicker(id) {
      const requiredFields = [
        "Req_No",
        "QTY",
        "vendor_id",
        "picker",
        "location_id",
        "Price",
        "employee_id",
        "deliver_to",
      ];

      const emptyFields = requiredFields.filter(
        (field) => this[field] === "" || this[field] === null
      );

      if (emptyFields.length != 0) {
        return emptyFields;
      } else {
        this.emptyField = emptyFields;
        let data = {
          quotes_id: id,
          price: this.Price,
          deliver_location: this.deliver_to,
          pick: this.picker,
          location_id: this.location_id,
          vendor_id: this.vendor_id,
          Employee_id: this.employee_id,
          due_date: this.date,
          quantity: this.QTY,
          transmition: this.transmit_at,
          check: this.check,
          req_no: this.Req_No,
        };
        this.$axios
          .$post("/Purchasing/AddQuotePurchasing", data)
          .then((res) => {
            if (res.status == 200) {
              this.$toast.success("saved Successfully");
              document.getElementById(`pick${id}`).classList.toggle("hidden");
              this.removeData();
              this.$axios
                .$post("/Purchasing/GetPurchasingRequest")
                .then((res) => {
                  this.request = res.TotalRequest;
                  this.purchasing = res.quotes.data;
                  this.totalPages = res.quotes.meta.last_page;
                  this.perPage = res.quotes.meta.per_page;
                  this.total = res.quotes.meta.total;
                  this.loading = false;
                });
            }
          });
      }
    },
    // remove Data
    removeData() {
      (this.Req_No = null),
        (this.QTY = null),
        (this.transmit_at = null),
        (this.vendor_id = null),
        (this.location_id = null),
        (this.picker = null),
        (this.Price = null),
        (this.deliver_to = null),
        (this.date = null),
        (this.check = false);
    },
  },
  watch: {
    // currect page
    currentPage(value) {
      console.log(value);

      this.$axios
        .$post(`/Purchasing/GetPurchasingRequest?page=${value}`)
        .then((res) => {
          this.request = res.TotalRequest;
          this.purchasing = res.quotes.data;
          this.totalPages = res.purchasing.meta.last_page;
          this.perPage = res.purchasing.meta.per_page;
          this.total = res.purchasing.meta.total;
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
.total-request {
  color: var(--colors-primary-slate-600, #455468);
  /* Paragraph: 1/SemiBold */
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px; /* 159.091% */
  letter-spacing: -0.3px;
}
.total-request-number {
  border-radius: 6px;
  background: var(--colors-primary-slate-50, #f0f3f9);
  display: flex;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-left: 13px;
}
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
  border-radius: 10px;
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
/* arrow of select */
.arrow-select {
  position: absolute;
  margin-top: 19px;
  width: 20px;
  margin-left: 83px;
}
.arrow-select-arrabic {
  position: absolute;
  margin-top: 19px;
  width: 20px;
  margin-left: 15px;
}
.arrow-select-vendor {
  position: absolute;
  margin-top: 19px;
  width: 20px;
  margin-left: 118px;
}
.arrow-select-vendor-arabic {
  position: absolute;
  margin-top: 19px;
  width: 20px;
  margin-left: 15px;
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
  left: 655px;
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
.close-btn {
  border-radius: 10px !important;
}
.input-style {
  border-radius: 20px;
  border: 1px solid var(--primary-dark-20, rgba(66, 66, 66, 0.2));
  /* background: var(--Colors-Base-00, #FFF); */
}
.table-container {
  overflow-x: auto;
}
.cursor-disabled {
  background-color: rgb(239, 239, 239);
}
</style>
