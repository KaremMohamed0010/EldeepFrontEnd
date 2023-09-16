<template>
  <div class="flex p-[12px] justify-end">
    <div v-if="loading == true" class="flex justify-center w-[100%]">
      <Loading :text="'Loading'" />
    </div>
    <!-- <SecondVerticalNavBar v-if="loading == false" :type="'condition'" /> -->
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
          <div
            class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
          >
            <div class="mb-[13px] flex justify-space-between">
              <!-- add btn -->
              <div
                :class="{
                  'p-[30px]': open == 'true',
                  'p-[25px]': open == 'false',
                }"
                v-if="permissions.includes('can_add_condition')"
                class="bg-filter"
              >
                <button
                  @click="addNewCondition()"
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

                <!-- Add New Condition -->

                <div
                  class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
                  id="addCondition"
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
                      class="p-[30px] inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[75%] sm:w-full"
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
                          @click="addNewCondition('close')"
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
                              {{ $t("Conditions") }} :
                            </h1>
                            <div class="card p-[20px]">
                              <div
                                class="text-center flex flex-wrap justify-between"
                              >
                                <div class="flex items-center mr-4 mb-4">
                                  <input
                                    @click="
                                      selectCategory(
                                        2,
                                        'organization',
                                        'category'
                                      )
                                    "
                                    id="radio1"
                                    type="radio"
                                    name="radio"
                                    class="hidden"
                                    checked
                                  />
                                  <label
                                    for="radio1"
                                    class="flex items-center cursor-pointer"
                                  >
                                    <span
                                      class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"
                                    ></span>
                                    {{ $t("organization") }} /
                                    {{ $t("category") }}</label
                                  >
                                </div>
                                <div class="flex items-center mr-4 mb-4">
                                  <input
                                    @click="
                                      selectCategory(2, 'organization', 'brand')
                                    "
                                    id="radio4"
                                    type="radio"
                                    name="radio"
                                    class="hidden"
                                  />
                                  <label
                                    for="radio4"
                                    class="flex items-center cursor-pointer"
                                  >
                                    <span
                                      class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"
                                    ></span>
                                    {{ $t("organization") }} /
                                    {{ $t("brand") }}</label
                                  >
                                </div>
                                <div class="flex items-center mr-4 mb-4">
                                  <input
                                    @click="
                                      selectCategory(
                                        2,
                                        'organization',
                                        'customer'
                                      )
                                    "
                                    id="radio5"
                                    type="radio"
                                    name="radio"
                                    class="hidden"
                                  />
                                  <label
                                    for="radio5"
                                    class="flex items-center cursor-pointer"
                                  >
                                    <span
                                      class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"
                                    ></span>
                                    {{ $t("organization") }} /
                                    {{ $t("customer") }}</label
                                  >
                                </div>

                                <div class="flex items-center mr-4 mb-4">
                                  <input
                                    @click="
                                      selectCategory(
                                        3,
                                        'organization',
                                        'category',
                                        'brand'
                                      )
                                    "
                                    id="radio2"
                                    type="radio"
                                    name="radio"
                                    class="hidden"
                                  />
                                  <label
                                    for="radio2"
                                    class="flex items-center cursor-pointer"
                                  >
                                    <span
                                      class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"
                                    ></span>
                                    {{ $t("organization") }} /
                                    {{ $t("category") }} /
                                    {{ $t("brand") }}</label
                                  >
                                </div>
                                <div class="flex items-center mr-4 mb-4">
                                  <input
                                    @click="
                                      selectCategory(
                                        4,
                                        'organization',
                                        'category',
                                        'brand',
                                        'customer'
                                      )
                                    "
                                    id="radio3"
                                    type="radio"
                                    name="radio"
                                    class="hidden"
                                  />
                                  <label
                                    for="radio3"
                                    class="flex items-center cursor-pointer"
                                  >
                                    <span
                                      class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"
                                    ></span>
                                    {{ $t("organization") }} /
                                    {{ $t("category") }} / {{ $t("brand") }} /
                                    {{ $t("customer") }}</label
                                  >
                                </div>
                              </div>
                            </div>
                            <!-- table  -->
                            <div class="container mx-auto px-4 sm:px-8">
                              <div class="py-8">
                                <div
                                  class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
                                >
                                  <div
                                    class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                                  >
                                    <table class="min-w-full leading-normal">
                                      <thead>
                                        <tr>
                                          <th
                                            v-if="organization"
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                          >
                                            {{ $t("organization") }}
                                          </th>
                                          <th
                                            v-if="category"
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                          >
                                            {{ $t("category") }}
                                          </th>
                                          <th
                                            v-if="brand"
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                          >
                                            {{ $t("brand") }}
                                          </th>
                                          <th
                                            v-if="customer"
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                          >
                                            {{ $t("customer") }}
                                          </th>
                                          <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                          >
                                            {{ $t("value") }}
                                          </th>
                                          <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                          >
                                            {{ $t("start_date") }}
                                          </th>
                                          <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                          >
                                            {{ $t("end_date") }}
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td
                                            v-if="organization"
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                          >
                                            <input
                                              id="2"
                                              type="text"
                                              class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                            />
                                          </td>
                                          <td
                                            v-if="category"
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                          >
                                            <select
                                              v-model="branch"
                                              class="border-select w-full py-1 px-2 bg-white"
                                              name="whatever"
                                              id="frm-whatever"
                                            >
                                              <option
                                                value="Select Branch"
                                                disabled
                                              >
                                                Select Category
                                              </option>
                                              <option value="Branch 1">
                                                Branch 1
                                              </option>
                                            </select>
                                          </td>
                                          <td
                                            v-if="brand"
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                          >
                                            <select
                                              v-model="brand"
                                              class="border-select w-full py-1 px-2 bg-white"
                                              name="whatever"
                                              id="frm-whatever"
                                            >
                                              <option
                                                value="Select Branch"
                                                disabled
                                              >
                                                Select Brand
                                              </option>
                                              <option value="Branch 1">
                                                Brand 1
                                              </option>
                                            </select>
                                          </td>
                                          <td
                                            v-if="customer"
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                          >
                                            <select
                                              v-model="customer"
                                              class="border-select w-full py-1 px-2 bg-white"
                                              name="whatever"
                                              id="frm-whatever"
                                            >
                                              <option
                                                value="Select Branch"
                                                disabled
                                              >
                                                Select Customer
                                              </option>
                                              <option value="Branch 1">
                                                Customer 1
                                              </option>
                                            </select>
                                          </td>
                                          <td
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                          >
                                            <input
                                              id="2"
                                              type="number"
                                              class="peer h-10 rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                            />
                                          </td>
                                          <td
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                          >
                                            <input
                                              id="2"
                                              type="date"
                                              class="peer h-10 rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                            />
                                          </td>
                                          <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                          >
                                            <input
                                              id="2"
                                              type="date"
                                              class="peer h-10 rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                            />
                                          </th>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
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
                            :class="{ 'cusror-disabled': loading }"
                            @click="addNewCondition('close')"
                            class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                          >
                            {{ $t("close") }}
                          </button>
                        </div>
                        <div class="w-[50%] ml-[6px]">
                          <button
                            :disabled="loading"
                            :class="{ 'cusror-disabled': loading }"
                            @click="postCondition('add')"
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
                  'w-fulll': !permissions.includes('can_add_condition'),
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

                <div class="flex items-center p-[29px]">
                  <select
                    class="appearance-none border-select branches w-full py-1 px-2 bg-white"
                    name="whatever"
                    v-model="branch_idd"
                    id="frm-whatever"
                  >
                    <option disabled value="1">
                      {{ $t("All Branches") }}
                    </option>
                    <option
                      v-for="(branch, index) in allBranches"
                      :key="index"
                      :value="1"
                    >
                      {{ branch.BranchName }}
                    </option>
                  </select>
                </div>

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
              v-if="loading == false && conditionTable.length > 0"
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
                            {{ $t("Customer") }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Vendor") }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Part") }}
                      </p>
                    </td>

                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Car") }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("ExpiryDate") }}
                      </p>
                    </td>

                    <td
                      v-if="permissions.includes('can_update_condition')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    ></td>
                    <td
                      v-if="permissions.includes('can_delete_condition')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    ></td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(condition, index) in this.conditionTable"
                    :key="index"
                  >
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <div class="flex">
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {{ condition.Customer }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ condition.Vendor }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ condition.Part }}
                      </p>
                    </td>

                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ condition.Car }}
                      </p>
                    </td>

                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ condition.ExpiryDate }}
                      </p>
                    </td>

                    <td
                      v-if="permissions.includes('can_update_condition')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <div>
                        <button
                          class="view-btn"
                          @click="toggleModal(condition.ConditionID, 'open')"
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
                        :id="`modal` + condition.ConditionID"
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
                                @click="
                                  toggleModal(condition.ConditionID, 'close')
                                "
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
                                  class="text-lg font-bold rounded-lg w-[100%] mb-[20px]"
                                >
                                  <h1
                                    :class="{ 'text-right': lang == 'ar' }"
                                    class="mt-[20px] text-left"
                                  >
                                    {{ $t("Conditions") }} :
                                  </h1>
                                  <div class="form-style mt-[20px] p-[30px]">
                                    <!-- Employee Group and Employee position -->
                                    <div class="flex mt-[20px]">
                                      <div class="group w-[50%]">
                                        <label
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Customer") }} :</label
                                        >
                                        <div class="flex">
                                          <select
                                            class="appearance-none border-select w-full py-1 px-2 bg-white"
                                            name="whatever"
                                            v-model="customer_id"
                                            @input="carForCustomer"
                                            id="frm-whatever"
                                          >
                                            <option
                                              v-for="(
                                                customer, index
                                              ) in allCustomers"
                                              :key="index"
                                              :value="customer.id"
                                            >
                                              {{ customer.customer_name }}
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                      <!-- register code -->
                                      <div class="group ml-[20px] w-[50%]">
                                        <label
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Cars") }} :</label
                                        >
                                        <div class="flex">
                                          <select
                                            class="appearance-none border-select w-full py-1 px-2 bg-white"
                                            name="whatever"
                                            v-model="car_id"
                                            id="frm-whatever"
                                          >
                                            <option
                                              v-for="(car, index) in allCars"
                                              :key="index"
                                              :value="car.id"
                                            >
                                              {{ car.plate_number }}
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <!--Branch and Area-->
                                    <div class="flex mt-[20px]">
                                      <div class="group w-[50%]">
                                        <label
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Vendor") }} :</label
                                        >
                                        <div class="flex">
                                          <select
                                            class="appearance-none border-select w-full py-1 px-2 bg-white"
                                            name="whatever"
                                            v-model="vendor_id"
                                            id="frm-whatever"
                                          >
                                            <option
                                              v-for="(
                                                vendor, index
                                              ) in allVendors"
                                              :key="index"
                                              :value="vendor.id"
                                            >
                                              {{ vendor.vendor_name }}
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                      <!-- register code -->
                                      <div class="group ml-[20px] w-[50%]">
                                        <label
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Parts") }} :</label
                                        >
                                        <select
                                          class="appearance-none border-select w-full py-1 px-2 bg-white"
                                          name="whatever"
                                          v-model="part_id"
                                          id="frm-whatever"
                                        >
                                          <option
                                            v-for="(part, index) in allParts"
                                            :key="index"
                                            :value="part.id"
                                          >
                                            {{ part.PartNameEN }}
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <!--Start date and End Date-->
                                    <div class="flex mt-[20px]">
                                      <div class="group w-[50%]">
                                        <label
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{
                                            $t("Price || Percentage")
                                          }}
                                          :</label
                                        >
                                        <div>
                                          <select
                                            class="appearance-none border-select w-full py-1 px-2 bg-white"
                                            name="whatever"
                                            v-model="status"
                                            id="frm-whatever"
                                          >
                                            <option value="price">
                                              {{ $t("Price") }}
                                            </option>
                                            <option value="percentage">
                                              {{ $t("Percentage") }}
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                      <div
                                        v-if="status == 'price'"
                                        class="group w-[50%] ml-[20px]"
                                      >
                                        <label
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Price") }} :</label
                                        >
                                        <div>
                                          <input
                                            v-model="price"
                                            @keypress="isNumber($event)"
                                            class="date-input w-[100%] p-[5px]"
                                            type="text"
                                          />
                                        </div>
                                      </div>

                                      <div
                                        v-if="status == 'percentage'"
                                        class="group w-[50%] ml-[20px]"
                                      >
                                        <label
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Percentage") }} :</label
                                        >
                                        <div>
                                          <input
                                            v-model="percentage"
                                            @keypress="isNumber($event)"
                                            class="date-input w-[100%] p-[5px]"
                                            type="text"
                                          />
                                        </div>
                                      </div>
                                      <!-- register code -->
                                    </div>
                                    <div class="group w-[50%] mt-[20px]">
                                      <label
                                        :class="{ 'text-right': lang == 'ar' }"
                                        for="1"
                                        class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                        >{{ $t("Expiration date") }}
                                        <p class="required">*</p>
                                        :</label
                                      >
                                      <div>
                                        <input
                                          v-model="expired_date"
                                          class="date-input w-[100%] p-[5px]"
                                          type="date"
                                        />
                                      </div>
                                      <p
                                        :class="{ 'text-right': lang == 'ar' }"
                                        v-if="
                                          emptyField.includes('expired_date')
                                        "
                                        class="error-message text-left"
                                      >
                                        {{ $t("Expiration date") }}
                                        {{ $t("required") }}
                                      </p>
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
                                  :class="{ 'cusror-disabled': loading }"
                                  @click="
                                    toggleModal(condition.ConditionID, 'close')
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
                                  @click="editCondition('add')"
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
                      v-if="permissions.includes('can_delete_condition')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer"
                    >
                      <div
                        @click="deleteCondition(condition.ConditionID, 'open')"
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
                        :id="`Deletemodal${condition.ConditionID}`"
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
                                @click="
                                  deleteCondition(
                                    condition.ConditionID,
                                    'close'
                                  )
                                "
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
                                {{ condition.Customer }}
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
                                    deleteCondition(
                                      condition.ConditionID,
                                      'close'
                                    )
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
                                    deleteCondition(
                                      condition.ConditionID,
                                      'delete'
                                    )
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
              v-else-if="loading == false && conditionTable.length == 0"
              class="w-[100%]"
            >
              <div class="flex justify-center mt-[135px]">
                <img
                  src="../../assets/imgs/comman/no-data-empty-data-concept-vector-41830412-removebg-preview.png"
                  alt=""
                />
              </div>
              <h1 class="text-center no-data">
                {{ $t("There is No Employee") }}
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
      conditionTable: [],
      showInformation: true,
      showPayemnt: false,
      showVichels: false,
      type: "Informations",
      active_vendor: true,
      activeCreditLimit: false,
      disabled: true,
      activePayment: false,
      errorpasswordValidation: false,
      disabledPayment: true,
      emptyField: "",
      invalidEmail: false,
      emailTimer: null,
      loading: false,
      all_payments: this.$t("All Payments"),
      all_types: this.$t("All Types"),
      branch_idd: 1,
      search: "",

      // data
      customer_id: null,
      status: null,
      car_id: null,
      vendor_id: null,
      part_id: null,
      expired_date: null,
      price: null,
      percentage: null,

      start_date: new Date().toISOString().slice(0, 10),
      id: "",
      //   all Arrays
      allCustomers: [],
      allCars: [],
      allVendors: [],
      allParts: [],

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
      // tables
      organization: true,
      category: false,
      brand: false,
      customer: false,
      open: false,
    };
  },
  mounted() {
    // bring All Data
    this.$axios.$get("/Condition/GetConditions").then((res) => {
      this.conditionTable = res.Conditions.data;
      this.totalPages = res.Conditions.meta.last_page;
      this.perPage = res.Conditions.meta.per_page;
      this.total = res.Conditions.meta.total;
      this.permissions = res.permission;
      this.loading = false;
    });
    // bring all customers
    this.$axios.$get("/Customer/GetAllCustomer").then((res) => {
      this.allCustomers = res.Customer.data;
    });
    // bring all vendors
    this.$axios.$get(`/Vendor/GetAllVendor`).then((res) => {
      this.allVendors = res.Vendor.data;
    });

    // bring all parts

    this.$axios.$get("/Part/GetParts").then((res) => {
      this.allParts = res.Parts.data;
    });
    // tabs code
    this.lang = localStorage.getItem("lang");

    if (this.lang == "en") {
      this.$i18n.locale = "en";
    } else if (this.lang == "ar") {
      this.$i18n.locale = "ar";
    }

    this.selectCategory(2, "organization", "category");
    // watch language

    // get side bar is open or closed
    this.open = localStorage.getItem("open");
  },
  methods: {
    carForCustomer(id) {
      console.log(id.target.value);
      this.$axios
        .$get(`/Condition/CustomerCarByID/${id.target.value}`)
        .then((res) => {
          this.allCars = res.Cars;
        });
    },
    // clear data
    clearData() {
      // data
      (this.customer_id = null),
        (this.car_id = null),
        (this.vendor_id = null),
        (this.part_id = null),
        (this.expired_date = null),
        (this.price = null),
        (this.percentage = null);
    },
    // toggle modal open and close the modal
    toggleModal(id, status) {
      console.log(id);
      this.emptyField = "";
      // show modal
      document.getElementById(`modal${id}`).classList.toggle("hidden");
      // get data by id
      if (status == "open") {
        this.$axios.$get(`/Condition/GetConditionByID/${id}`).then((res) => {
          this.customer_id = res.Condition.customer_id;
          this.vendor_id = res.Condition.vendor_id;
          this.car_id = res.Condition.car_id;
          this.part_id = res.Condition.part_id;
          this.expiry_date = res.Condition.expiry_date;
          if (res.Condition.price) {
            this.status = "price";
            this.price = res.Condition.price;
          } else if (res.Condition.percentage) {
            this.status = "percentage";
            this.percentage = res.Condition.percentage;
          }
          this.$axios
            .$get(`/Condition/CustomerCarByID/${res.Condition.customer_id}`)
            .then((res) => {
              this.allCars = res.Cars;
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
    toggleEyePassword() {
      this.showPassword = !this.showPassword;
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
    // select category
    selectCategory(status, org, type1, type2, type3) {
      if (status == 2) {
        if (org == "organization") {
          this.organization = true;
        }
        if (type1 == "customer") {
          this.customer = true;
          this.brand = false;
          this.category = false;
        }
        if (type1 == "brand") {
          this.brand = true;
          this.customer = false;
          this.category = false;
        }
        if (type1 == "category") {
          this.category = true;
          this.brand = false;
          this.customer = false;
        }
      }
      if (status == 3) {
        if (org == "organization") {
          this.organization = true;
        }

        if (type1 == "category") {
          this.category = true;
          this.customer = false;
        }

        if (type2 == "brand") {
          this.brand = true;
          this.customer = false;
        }
      }
      if (status == 4) {
        if (org == "organization") {
          this.organization = true;
        }

        if (type1 == "category") {
          this.category = true;
        }

        if (type2 == "brand") {
          this.brand = true;
        }

        if (type3 == "customer") {
          this.customer = true;
        }
      }
    },
    // filter
    filter() {
      this.$axios
        .$get(
          `/Condition/GetConditions?search=${this.search}?=payment=${this.all_payments}?=${this.all_types}`
        )
        .then((res) => {
          this.conditionTable = res.Vendor.data;
        });
    },
    // add new condition
    addNewCondition(status) {
      document.getElementById(`addCondition`).classList.toggle("hidden");
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
    // post and add condition
    postCondition(status) {
      const requiredFields = ["expired_date"];

      const emptyFields = requiredFields.filter(
        (field) => this[field] === "" || this[field] == null
      );
      this.emptyField = emptyFields;

      if (emptyFields.length != 0) {
        return emptyFields;
      } else if (emptyFields.length == 0) {
        if (status == "add") {
          this.loading = true;
          let formdata = new FormData();

          formdata.append("customer_id", this.customer_id);
          formdata.append("vendor_id", this.vendor_id);
          formdata.append("part_id", this.part_id);
          formdata.append("car_id", this.car_id);
          formdata.append("expiry_date", this.expired_date);
          if (this.price != null) {
            formdata.append("price", this.price);
          } else if (this.percentage != null) {
            formdata.append("percentage", this.percentage);
          }

          this.$axios
            .$post(`/Condition/CreateCondition`, formdata)
            .then((res) => {
              if (res.status == 200) {
                this.loading = false;
                this.$toast.success("Condition Added Successfully");
                // get data again
                this.$axios.$get("/Condition/GetConditions").then((res) => {
                  this.conditionTable = res.Conditions.data;
                  this.totalPages = res.Conditions.meta.last_page;
                  this.perPage = res.Conditions.meta.per_page;
                  this.total = res.Conditions.meta.total;
                  this.permissions = res.permission;
                  this.loading = false;
                });
                document
                  .getElementById(`addCondition`)
                  .classList.toggle("hidden");
                this.addNewCondition();
              } else {
                this.$toast.error(res.message);
                this.loading = false;
              }
            });
        }
      }
    },
    // edit condition
    editCondition() {
      const requiredFields = ["expired_date"];

      const emptyFields = requiredFields.filter(
        (field) => this[field] === "" || this[field] == null
      );
      this.emptyField = emptyFields;

      if (emptyFields.length != 0) {
        return emptyFields;
      } else if (emptyFields.length == 0) {
        this.loading = true;
        let formdata = new FormData();

        formdata.append("customer_id", this.customer_id);
        formdata.append("vendor_id", this.vendor_id);
        formdata.append("part_id", this.part_id);
        formdata.append("car_id", this.car_id);
        formdata.append("expiry_date", this.expired_date);
        if (this.price != null) {
          formdata.append("price", this.price);
        } else if (this.percentage != null) {
          formdata.append("percentage", this.percentage);
        }
        this.$axios
          .$post(`/Condition/UpdateCondition/${this.id}`, formdata)
          .then((res) => {
            if (res.status == 200) {
              this.loading = false;
              this.$toast.success("Condition Edit Successfully");
              // get data again
              this.$axios
                .$get(
                  `/Condition/GetConditions?page=${this.$route.query.page || 1}`
                )
                .then((res) => {
                  this.conditionTable = res.Conditions.data;
                  this.totalPages = res.Conditions.meta.last_page;
                  this.perPage = res.Conditions.meta.per_page;
                  this.total = res.Conditions.meta.total;
                  this.permissions = res.permission;
                  this.loading = false;
                });
              document
                .getElementById(`modal${this.id}`)
                .classList.toggle("hidden");
              this.addNewCondition();
            } else {
              this.$toast.error("Sorry , There is an Error");
              this.loading = false;
            }
          });
      }
      // validation messages
    },
    // delete condition
    deleteCondition(id, status) {
      if (status != "delete") {
        document.getElementById(`Deletemodal${id}`).classList.toggle("hidden");
      }
      if (status == "delete") {
        this.loading = true;
        this.$axios.$post(`/Condition/DeleteCondition/${id}`).then((res) => {
          if (res.status == 200) {
            // success toast
            this.$toast.success("Condition Deleted Successfully");
            // loading = false
            this.loading = false;

            // get data again
            if (this.conditionTable.length == 1) {
              this.$axios
                .$get(
                  `/Condition/GetConditions?page=${
                    this.$route.query.page - 1 || 1
                  }`
                )
                .then((res) => {
                  this.conditionTable = res.Conditions.data;
                  this.totalPages = res.Conditions.meta.last_page;
                  this.perPage = res.Conditions.meta.per_page;
                  this.total = res.Conditions.meta.total;
                  this.permissions = res.permission;
                  this.loading = false;
                });
              this.$router.push({
                path: "/conditions",
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
      this.$axios.$get(`/Condition/GetConditions?page=${value}`).then((res) => {
        this.conditionTable = res.Conditions.data;
        this.totalPages = res.Conditions.meta.last_page;
        this.perPage = res.Conditions.meta.per_page;
        this.total = res.Conditions.meta.total;
        this.permissions = res.permission;
        this.loading = false;
      });
      this.$router.push({ path: "/conditions", query: { page: value } });
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
/* arrow of select */
.arrow-select {
  position: absolute;
  left: 346px;
  margin-top: 12px;
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
/* radio btn */
input[type="radio"] + label span {
  transition: background 0.2s, transform 0.2s;
}

input[type="radio"] + label span:hover,
input[type="radio"] + label:hover span {
  transform: scale(1.2);
}

input[type="radio"]:checked + label span {
  background-color: #3490dc;
  box-shadow: 0px 0px 0px 2px white inset;
}

input[type="radio"]:checked + label {
  color: #3490dc;
}
.border-select {
  border-radius: 6px;
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
  padding: 8px;
  padding-top: 8px;
  padding-left: 8px;
  padding-left: 14px;
  padding-top: 13px;
}
</style>
