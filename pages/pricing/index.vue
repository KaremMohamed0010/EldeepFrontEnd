<template>
  <div class="p-[12px]">
    <div v-if="loading == true" class="flex justify-center w-[100%]">
      <Loading :text="'Loading'" />
    </div>
    <div
      v-if="loading == false && pricing.length > 0"
      class="p-[20px] bg-table"
    >
      <div class="p-[20px] flex justify-between">
        <div class="flex">
          <h1 class="total-request">{{ $t("total_request") }}</h1>
          <span class="total-request-number"> 1000 {{ $t("Request") }}</span>
        </div>
        <button
          @click="addNewParts()"
          class="bg-blue-500 items-center flex add-new hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        >
          <img
            class="w-[20px]"
            src="../../assets/imgs/comman/PlusCircle.png"
            alt=""
          />
          <p class="ml-[10px]">{{ $t("Add new") }} {{ $t("Part") }}</p>
        </button>
      </div>
      <!-- add new parts -->

      <div
        class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
        id="addPart"
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
            style="height: 626px; overflow-y: auto"
            class="p-[30px] media inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[776px] sm:w-full"
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
                @click="addNewParts('close')"
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
              v-if="showInformation"
              id="Informations"
              class="tab mt-1 items-center"
            >
              <div class="flex items-center justify-space-between">
                <!-- information -->
                <div
                  :class="{ 'text-right': lang == 'ar' }"
                  class="text-lg font-bold rounded-lg w-[100%] mb-[20px]"
                >
                  <h1
                    :class="{ 'text-right': lang == 'ar' }"
                    class="mt-[20px] text-left"
                  >
                    {{ $t("Parts Data") }} :
                  </h1>
                  <div
                    :class="{ 'arabic-profile-pic': lang == 'ar' }"
                    class="profile-pic"
                  >
                    <label class="-label" for="file">
                      <span class="glyphicon glyphicon-camera"></span>
                      <div class="mr-[30px]">
                        <img src="../../assets/imgs/comman/Button(1).png" />
                      </div>
                      <img
                        class="mr-[30px]"
                        src="../../assets/imgs/comman/Button.png"
                      />
                    </label>
                    <input id="file" type="file" @change="loadFile($event)" />
                    <img
                      src="../../assets/imgs/comman/avatar image.png"
                      id="output"
                      width="200"
                    />
                  </div>

                  <div class="form-style mt-[20px] p-[30px]">
                    <!-- Employee Name and Employee Code -->
                    <div class="flex">
                      <!-- Employee name -->

                      <!-- register code -->
                      <div class="group w-[50%]">
                        <label
                          for="1"
                          class="block flex flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                          >{{ $t("Part Name Arabic") }}
                          <p class="required">*</p>
                          :
                        </label>
                        <input
                          id="1"
                          type="text"
                          v-model="part_name_ar"
                          :class="{
                            'outline-error':
                              emptyField.includes('part_name_ar'),
                          }"
                          placeholder="جهاز استشعار ABS"
                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                        />
                        <p
                          :class="{ 'text-right': lang == 'ar' }"
                          v-if="emptyField.includes('part_name_ar')"
                          class="error-message text-left"
                        >
                          {{ $t("Part Name Arabic") }}
                          {{ $t("required") }}
                        </p>
                      </div>
                    </div>

                    <!-- Employee Group and Employee position -->
                    <div class="flex mt-[20px]">
                      <!-- register code -->
                      <div class="group w-[50%]">
                        <label
                          for="1"
                          class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                          >{{ $t("Part Number") }}
                          <p class="required">*</p>
                          :</label
                        >
                        <input
                          id="1"
                          type="text"
                          v-model="part_numberr"
                          :class="{
                            'outline-error':
                              emptyField.includes('part_numberr'),
                          }"
                          placeholder="321638125"
                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                        />
                        <p
                          :class="{ 'text-right': lang == 'ar' }"
                          v-if="emptyField.includes('part_numberr')"
                          class="error-message text-left"
                        >
                          {{ $t("Part Number") }}
                          {{ $t("required") }}
                        </p>
                      </div>
                      <!-- Model -->
                      <div class="group ml-[20px] w-[50%]">
                        <label
                          for="1"
                          class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                          >{{ $t("Model") }}

                          :</label
                        >
                        <input
                          id="1"
                          type="text"
                          v-model="model"
                          placeholder="Ford"
                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    </div>
                    <!-- alternatives -->
                    <div class="flex mt-[20px]">
                      <!-- register code -->
                      <div class="group w-[50%] flex items-center">
                        <label
                          for="1"
                          class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                          >{{ $t("Alternatives") }}:
                          <div class="flex" v-if="alternatives.length">
                            <div
                              v-for="(alternativee, index) in alternatives"
                              :key="index"
                              class="ml-[12px]"
                            >
                              <span
                                v-if="alternativee.code != ''"
                                class="bg-blue-100 p-[9px] text-xl text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                              >
                                {{ alternativee.code }}</span
                              >
                            </div>
                          </div>
                        </label>
                      </div>

                      <!-- Model -->
                      <div
                        class="group ml-[20px] w-[50%] flex justify-end items-center"
                      >
                        <button
                          @click="addNewAlternative()"
                          type="button"
                          class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          {{ $t("Alternative") }}
                        </button>
                      </div>
                      <!-- Alternative Modal  -->
                      <div
                        class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
                        id="addAlternative"
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
                                @click="addNewAlternative('close')"
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
                              v-if="showInformation"
                              id="Informations"
                              class="tab mt-1 items-center"
                            >
                              <div
                                class="flex items-center justify-space-between"
                              >
                                <!-- information -->
                                <div
                                  :class="{
                                    'text-right': lang == 'ar',
                                  }"
                                  class="text-lg font-bold rounded-lg w-[100%] mb-[20px]"
                                >
                                  <h1
                                    :class="{
                                      'text-right': lang == 'ar',
                                    }"
                                    class="mt-[20px] text-left"
                                  >
                                    {{ $t("Alternative") }} :
                                  </h1>
                                  <div
                                    v-for="(alternative, index) in alternatives"
                                    :key="index"
                                    class="flex mt-[20px]"
                                  >
                                    <input
                                      type="text"
                                      v-model="alternative.code"
                                      class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                      placeholder="Code"
                                    />
                                    <div class="flex justify-end">
                                      <button
                                        @click="addField"
                                        class="text-blue-500 ml-[15px] rounded-md w-[25px] h-[30px] bg-[#1c2e50] font-bold focus:outline-none"
                                      >
                                        <img
                                          src="../../assets/imgs/comman/PlusCircle.png"
                                          alt=""
                                        />
                                      </button>
                                      <button
                                        v-if="index != 0"
                                        class="font-bold text-red-400 rounded-md ml-[15px] h-[30px] w-[25px] h-full text-xs text-right focus:outline-none"
                                        @click="
                                          removeField(
                                            alternative.alternative_id
                                          )
                                        "
                                      >
                                        <img
                                          src="../../assets/imgs/comman/delete-removebg-preview.png"
                                          alt=""
                                        />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- tabs End  -->
                              <div
                                :disabled="loading"
                                :class="{
                                  'cusror-disabled': loading,
                                }"
                                class="flex mb-[30px]"
                              >
                                <div class="w-[50%]">
                                  <button
                                    :disabled="loading"
                                    :class="{
                                      'cusror-disabled': loading,
                                    }"
                                    @click="addNewAlternative('close')"
                                    class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                                  >
                                    {{ $t("close") }}
                                  </button>
                                </div>
                                <div class="w-[50%] ml-[6px]">
                                  <button
                                    :disabled="loading"
                                    :class="{
                                      'cusror-disabled': loading,
                                    }"
                                    @click="postnNewAlternative('add')"
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

                    <div class="flex mt-[20px]">
                      <!-- Employee name -->
                      <div class="group w-[50%]">
                        <label
                          :class="{ 'text-right': lang == 'ar' }"
                          for="1"
                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                          >{{ $t("Unit") }} :</label
                        >
                        <input
                          id="1"
                          type="text"
                          v-model="unit"
                          placeholder="Meter"
                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <!-- register code -->
                      <div class="group ml-[20px] w-[50%]">
                        <label
                          :class="{ 'text-right': lang == 'ar' }"
                          for="1"
                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                          >{{ $t("Dimensions") }} :</label
                        >
                        <input
                          id="1"
                          type="text"
                          v-model="dimensions"
                          placeholder="5 Meter"
                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    </div>
                    <div class="flex mt-[20px]">
                      <!-- Employee name -->
                      <div class="flex justify-space-between w-[50%] mt-[20px]">
                        <label
                          :class="{ 'text-right': lang == 'ar' }"
                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                        >
                          {{ $t("Breakable") }}
                        </label>
                        <button
                          class="flex ltr items-center transition ease-in-out duration-300 w-10 h-4 rounded-full focus:outline-none"
                          :class="{ 'bg-[#1C2E50]': breakable }"
                          @click="breakable = !breakable"
                        >
                          <div
                            class="transition ease-in-out duration-300 rounded-full h-5 w-5 bg-white shadow border"
                            :class="{
                              'transform translate-x-full ': breakable,
                            }"
                          ></div>
                        </button>
                      </div>

                      <!-- register code -->
                      <div
                        :class="{ 'mr-[20px]': lang == 'ar' }"
                        class="flex justify-space-between w-[50%] ml-[12px] mt-[20px]"
                      >
                        <label
                          :class="{ 'text-right': lang == 'ar' }"
                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                        >
                          {{ $t("Warranty") }}
                        </label>
                        <button
                          class="flex ltr items-center transition ease-in-out duration-300 w-10 h-4 rounded-full focus:outline-none"
                          :class="{ 'bg-[#1C2E50]': warranty }"
                          @click="warranty = !warranty"
                        >
                          <div
                            class="transition ease-in-out duration-300 rounded-full h-5 w-5 bg-white shadow border"
                            :class="{
                              'transform translate-x-full ': warranty,
                            }"
                          ></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
                        'transform translate-x-full ': activeCreditLimit,
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
                    v-model="start_date"
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
                    v-model="end_date"
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
              class="flex mb-[30px]"
            >
              <div class="w-[50%]">
                <button
                  :disabled="loading"
                  :class="{ 'cusror-disabled': loading }"
                  @click="addNewParts('close')"
                  class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                >
                  {{ $t("close") }}
                </button>
              </div>
              <div class="w-[50%] ml-[6px]">
                <button
                  :disabled="loading"
                  :class="{ 'cusror-disabled': loading }"
                  @click="postParts('add')"
                  class="action-btn rounded-lg w-[100%] px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
                >
                  {{ $t("Add") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-container overflow-x-auto">
        <table class="min-w-full leading-normal table-style">
          <thead>
            <tr>
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
                  {{ $t("Pricing group") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers">
                  {{ $t("Price") }}
                </p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap table-headers"></p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(price, index) in pricing" :key="index">
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
                  v-if="price.VinCar != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.VinCar }}
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
                  v-if="price.Model != null"
                  class="text-gray-900 whitespace-no-wrap"
                >
                  {{ price.Model }}
                </p>
                <p v-else class="text-gray-900 whitespace-no-wrap">--</p>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="relative">
                  <img
                    :class="{
                      'arrow-select-arabic-city': lang == 'ar',
                    }"
                    class="arrow-select"
                    src="../../assets/imgs/comman/Icon.png"
                    alt=""
                  />
                  <select
                    v-model="part_number[index]"
                    class="appearance-none border-select w-[117px] py-1 px-2 bg-white"
                    name="whatever"
                    id="frm-whatever"
                  >
                    <option
                      v-for="(part, i) in partsTable"
                      :value="part.id"
                      :key="i"
                    >
                      {{ part.PartNum }}
                    </option>
                  </select>
                </div>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="relative">
                  <img
                    :class="{
                      'arrow-select-arabic-city': lang == 'ar',
                    }"
                    class="arrow-select-vendor"
                    src="../../assets/imgs/comman/Icon.png"
                    alt=""
                  />
                  <select
                    v-model="vendor_id[index]"
                    class="appearance-none border-select w-[153px] py-1 px-2 bg-white"
                    name="whatever"
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
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="relative">
                  <img
                    :class="{
                      'arrow-select-arabic-city': lang == 'ar',
                    }"
                    class="arrow-select arrow-select-vendor"
                    src="../../assets/imgs/comman/Icon.png"
                    alt=""
                  />
                  <select
                    v-model="location_id[index]"
                    class="appearance-none border-select w-[153px] py-1 px-2 bg-white"
                    name="whatever"
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
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="relative">
                  <img
                    :class="{
                      'arrow-select-arabic-city': lang == 'ar',
                    }"
                    class="arrow-select-vendor"
                    src="../../assets/imgs/comman/Icon.png"
                    alt=""
                  />
                  <select
                    v-model="pricing_group[index]"
                    class="appearance-none border-select w-[153px] py-1 px-2 bg-white"
                    name="whatever"
                    id="frm-whatever"
                  >
                    <option value="100">100</option>
                    <option value="130">130</option>
                    <option value="140">140</option>
                  </select>
                </div>
              </td>

              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <input
                  id="1"
                  type="text"
                  v-model="pricee[index]"
                  placeholder=""
                  class="peer w-[120px] input-style h-10 rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                />
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                  :disabled="loading"
                  :class="{
                    'cusror-disabled': loading,
                  }"
                  @click="SavePricingRow(price, index)"
                  class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                >
                  {{ $t("save") }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
    <div v-else-if="loading == false && pricing.length == 0" class="w-[100%]">
      <div class="flex justify-center mt-[135px]">
        <img
          src="../../assets/imgs/comman/no-data-empty-data-concept-vector-41830412-removebg-preview.png"
          alt=""
        />
      </div>
      <h1 class="text-center no-data">
        {{ $t("There is No Pricing") }}
      </h1>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  data() {
    return {
      showInformation: true,
      showPayemnt: false,
      showVichels: false,

      model: null,
      part_name_ar: null,
      part_numberr: null,
      vat_number: null,
      breakable: false,
      warranty: false,
      fieldCount: 1,
      emptyField: "",
      alternatives: [{ alternative_id: 1, code: "" }],
      dimensions: null,
      national_id: null,
      unit: null,

      pricing: [],
      loading: true,
      hasMorePages: true,
      currentPage: 1,
      partsTable: [],
      vendorTable: [],
      locations: [],

      part_number: [],
      vendor_id: [],
      location_id: [],
      pricing_group: [],
      pricee: [],
    };
  },
  components: {
    Multiselect,
  },
  mounted() {
    // get all Pricing

    this.$axios.$post("/Pricing/GetPricingRequest").then((res) => {
      console.log(res);
      this.pricing = res.quotes.data;
      this.totalPages = res.quotes.meta.last_page;
      this.perPage = res.quotes.meta.per_page;
      this.total = res.quotes.meta.total;
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

    // get all parts
    this.$axios.$get("/Part/GetParts").then((res) => {
      this.partsTable = res.Parts.data;
    });

    // get all Vendors

    this.$axios.$get("/Vendor/GetAllVendor").then((res) => {
      this.vendorTable = res.Vendor.data;
    });

    // get all locations
    this.$axios.$get("/Location/GetAllLocationDropDownList").then((res) => {
      this.locations = res.Location;
    });
  },
  created() {},
  methods: {
    // show more
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    },
    // add new parts
    // add new part
    addNewParts(status) {
      document.getElementById(`addPart`).classList.toggle("hidden");
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
    // add new Alternative
    addNewAlternative() {
      document.getElementById(`addAlternative`).classList.toggle("hidden");
    },

    // post a new alternative
    postnNewAlternative() {
      // localStorage.setItem("alternative" , this.alternatives);
      document.getElementById(`addAlternative`).classList.toggle("hidden");
    },
    // add alternative
    addField() {
      this.fieldCount++;
      this.alternatives.push({ alternative_id: this.fieldCount, code: "" });
    },
    removeField(id) {
      this.alternatives = this.alternatives.filter(
        (obj) => obj.alternative_id !== id
      );
    },
    //

    // clear data of parts
    // clear data
    clearData() {
      (this.model = null),
        (this.part_name_ar = null),
        (this.part_numberr = null),
        (this.vat_number = null),
        (this.branch_id = null),
        (this.employee_email = null),
        (this.area = null),
        (this.start_date = null),
        (this.end_date = null),
        (this.vin_number = null),
        (this.dimensions = null),
        (this.national_id = null),
        (this.id = ""),
        (this.unit = null),
        (this.breakable = false),
        (this.warranty = false),
        (this.alternatives = [{ alternative_id: 1, code: "" }]);
    },
    // save pricin index
    SavePricingRow(price, index) {
      console.log("Price at index", index, this.pricee);
      const sameIndex = index;
      if (sameIndex == index) {
        const dataToSave = {
          part_number: this.part_number[index],
          vendor_id: this.vendor_id[index],
          location_id: this.location_id[index],
          pricing_group: this.pricing_group[index],
          price: this.pricee[index],
        };
        this.$axios
          .$post(`Pricing/UpdatePricingRequest/${price.id}`, dataToSave)
          .then((res) => {
            if (res.status == 200) {
              this.$toast.success(" Pricing Saved Successfully");
            } else {
              this.$toast.error(res.message);
            }
          });
      }
    },

    // post parts
    // post and add part
    postParts(status) {
      const requiredFields = ["part_name_ar", "part_number"];

      const emptyFields = requiredFields.filter(
        (field) => this[field] === "" || this[field] === null
      );

      this.emptyField = emptyFields;
      console.log(emptyFields);
      if (emptyFields.length != 0) {
        return emptyFields;
      } else if (this.invalidEmail == true) {
        return;
      }
      if (this.errorpasswordValidation == true) {
        return;
      } else if (emptyFields.length == 0) {
        if (status == "add") {
          this.loading = true;
          let formdata = new FormData();

          formdata.append("part_name_ar", this.part_name_ar);
          formdata.append("part_number", this.part_numberr);
          formdata.append("model", this.model);
          formdata.append("image", this.image);
          formdata.append("unit", this.unit);
          if (this.warranty == false) {
            formdata.append("warrenty", 0);
          } else if (this.warranty == true) {
            formdata.append("warrenty", 1);
          }
          if (this.breakable == false) {
            formdata.append("breakable", 0);
          } else if (this.breakable == true) {
            formdata.append("breakable", 1);
          }
          formdata.append("dimensions", this.dimensions);
          formdata.append("code", this.part_name_ar);

          this.alternatives.forEach((value, index) => {
            console.log(value, index);
            formdata.append(`alternative_id[${index}]`, value.alternative_id);
            formdata.append(`code[${index}]`, value.code);
          });

          this.$axios.$post(`/Part/AddPart`, formdata).then((res) => {
            if (res.status == 200) {
              this.loading = false;
              this.$toast.success("Part Added Successfully");
              // get data again
              this.$axios.$get("/Part/GetParts").then((res) => {
                this.partsTable = res.Parts.data;
              });
              document.getElementById(`addPart`).classList.toggle("hidden");
              this.addNewParts();
            } else {
              this.$toast.error(res.message);
              this.loading = false;
            }
          });
        }
      }
    },
  },
  watch: {
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
.arrow-select-vendor {
  position: absolute;
  margin-top: 19px;
  width: 20px;
  margin-left: 118px;
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
.close-btn {
  border-radius: 10px !important;
}
.input-style {
  border-radius: 10px !important;
}
.table-container {
  overflow-x: auto;
}
</style>
