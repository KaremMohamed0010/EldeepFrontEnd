<template>
  <div class="flex p-[12px] justify-end">
    <div v-if="loading == true" class="flex justify-center w-[100%]">
      <Loading :text="'Loading'" />
    </div>
    <!-- <SecondVerticalNavBar v-if="loading == false" :type="'employee'" /> -->
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
                v-if="permissions.includes('can_add_member')"
                class="bg-filter"
              >
                <button
                  @click="addNewEmployee()"
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

                <!-- Add New Employee -->

                <div
                  class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
                  id="addEmployee"
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
                          @click="addNewEmployee('close')"
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
                              :class="[
                                {
                                  'text-right': lang == 'ar',
                                },
                              ]"
                              class="mt-[20px] text-left"
                            >
                              {{ $t("Informations") }} :
                            </h1>
                            <div
                              :class="{ 'arabic-profile-pic': lang == 'ar' }"
                              class="profile-pic"
                            >
                              <label class="-label" for="file">
                                <span class="glyphicon glyphicon-camera"></span>
                                <div class="mr-[30px]">
                                  <img
                                    src="../../assets/imgs/comman/Button(1).png"
                                  />
                                </div>
                                <img
                                  class="mr-[30px]"
                                  src="../../assets/imgs/comman/Button.png"
                                />
                              </label>
                              <input
                                id="file"
                                type="file"
                                @change="loadFile($event)"
                              />
                              <img
                                src="../../assets/imgs/comman/avatar image.png"
                                id="output"
                                width="200"
                              />
                            </div>

                            <div
                              :class="{ 'text-right': lang == 'ar' }"
                              class="form-style mt-[20px] p-[30px]"
                            >
                              <!-- Employee Name and Employee Code -->
                              <div
                                :class="{ 'text-right': lang == 'ar' }"
                                class="flex"
                              >
                                <!-- Employee name -->
                                <div
                                  :class="{ 'text-right': lang == 'ar' }"
                                  class="group w-[50%]"
                                >
                                  <label
                                    :class="{ 'text-right': lang == 'ar' }"
                                    for="1"
                                    class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Employee name") }}
                                    <p class="required">*</p>
                                    :
                                  </label>

                                  <input
                                    id="1"
                                    type="text"
                                    v-model="employee_name"
                                    :class="{
                                      'outline-error':
                                        emptyField.includes('employee_name'),
                                    }"
                                    placeholder="U-001"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                  <p
                                    :class="{ 'text-right': lang == 'ar' }"
                                    v-if="emptyField.includes('employee_name')"
                                    class="error-message text-left"
                                  >
                                    {{ $t("Employee name") }}
                                    {{ $t("required") }}
                                  </p>
                                </div>

                                <!-- register code -->
                                <div class="group ml-[20px] w-[50%]">
                                  <label
                                    :class="{ 'text-right': lang == 'ar' }"
                                    for="1"
                                    class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Employee code") }}
                                    <p class="required">*</p>
                                    :
                                  </label>
                                  <input
                                    id="1"
                                    type="text"
                                    v-model="employee_code"
                                    :class="{
                                      'outline-error':
                                        emptyField.includes('employee_code'),
                                    }"
                                    placeholder="000012"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                  <p
                                    :class="{ 'text-right': lang == 'ar' }"
                                    v-if="emptyField.includes('employee_code')"
                                    class="error-message text-left"
                                  >
                                    {{ $t("Employee code") }}
                                    {{ $t("required") }}
                                  </p>
                                </div>
                              </div>
                              <!-- Employee EMail and Employee Password -->
                              <div
                                :class="{ 'text-right': lang == 'ar' }"
                                class="flex mt-[20px]"
                              >
                                <!-- Employee name -->
                                <div class="group w-[50%]">
                                  <label
                                    :class="{ 'text-right': lang == 'ar' }"
                                    for="1"
                                    class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Employee email") }}
                                    <p class="required">*</p>
                                    :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    v-model="employee_email"
                                    :class="{
                                      'outline-error':
                                        emptyField.includes('employee_email') ||
                                        invalidEmail == true,
                                    }"
                                    placeholder="test@gmail.com"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                  <p
                                    :class="{ 'text-right': lang == 'ar' }"
                                    v-if="emptyField.includes('employee_email')"
                                    class="error-message text-left"
                                  >
                                    {{ $t("Employee email") }}
                                    {{ $t("required") }}
                                  </p>
                                  <div
                                    v-if="invalidEmail"
                                    class="error-message mt-[14px] ml-[14px] text-left"
                                  >
                                    {{ $t("Email is Invalid") }}
                                  </div>
                                </div>
                                <!-- register code -->
                                <div class="group ml-[20px] w-[50%]">
                                  <label
                                    for="1"
                                    class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Employee Password") }}
                                    <p class="required">*</p>
                                    :</label
                                  >
                                  <div
                                    :class="{
                                      'outline-error':
                                        errorpasswordValidation == true,
                                    }"
                                    class="input-form input-style flex focus:border-[#D11C1C]"
                                  >
                                    <img
                                      class="w-[46px] p-[12px]"
                                      src="../../assets/imgs/login/LockKey.png"
                                      alt=""
                                    />
                                    <img
                                      class="line mr-[12px]"
                                      src="../../assets/imgs/login/line.png"
                                      alt=""
                                    />
                                    <input
                                      v-if="showPassword"
                                      class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-[#D11C1C]"
                                      type="text"
                                      :class="{
                                        'outline-error':
                                          emptyField.includes('password') ||
                                          errorpasswordValidation == true,
                                      }"
                                      v-model="password"
                                      :placeholder="$t('Password')"
                                    />
                                    <input
                                      v-if="showPassword == false"
                                      class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-[#D11C1C]"
                                      type="password"
                                      :class="{
                                        'outline-error':
                                          emptyField.includes('password') ||
                                          errorpasswordValidation == true,
                                      }"
                                      v-model="password"
                                      :placeholder="$t('Password')"
                                    />

                                    <img
                                      v-if="showPassword"
                                      class="line cursor-pointer w-[30px]"
                                      @click="toggleEyePassword"
                                      src="../../assets/imgs/login/eye-password-hide-icon-512x512-iv45hct9.png"
                                      alt=""
                                    />

                                    <img
                                      v-if="showPassword == false"
                                      class="line cursor-pointer w-[30px]"
                                      @click="toggleEyePassword"
                                      src="../../assets/imgs/login/preview-show-interface-icon-free-vector.jpg"
                                      alt=""
                                    />
                                  </div>
                                  <div
                                    v-if="errorpasswordValidation"
                                    class="error-message text-left mt-[14px] ml-[14px]"
                                  >
                                    {{ $t("Password is Invalid") }}
                                  </div>

                                  <p
                                    :class="{ 'text-right': lang == 'ar' }"
                                    v-if="emptyField.includes('password')"
                                    class="error-message text-left"
                                  >
                                    {{ $t("Employee Password") }}
                                    {{ $t("required") }}
                                  </p>
                                </div>
                              </div>

                              <!-- Employee Group and Employee position -->
                              <div
                                :class="{ 'text-right': lang == 'ar' }"
                                class="flex mt-[20px]"
                              >
                                <div class="group w-[50%]">
                                  <label
                                    :class="{ 'text-right': lang == 'ar' }"
                                    for="1"
                                    class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Employee Group") }} :</label
                                  >
                                  <div class="flex">
                                    <select
                                      v-model="employee_group"
                                      class="appearance-none border-select w-full py-1 px-2 bg-white"
                                      name="whatever"
                                      id="frm-whatever"
                                    >
                                      <option value="Requester">
                                        {{ $t("Requester") }} &hellip;
                                      </option>
                                      <option value="Delivery">
                                        {{ $t("Delivery") }}
                                      </option>
                                      <option value="Inventory">
                                        {{ $t("Inventory") }}
                                      </option>
                                      <option value="purchases">
                                        {{ $t("purchases") }}
                                      </option>
                                      <option value="Prancing">
                                        {{ $t("Prancing") }}
                                      </option>
                                      <option value="Admin">
                                        {{ $t("Admin") }}
                                      </option>
                                    </select>

                                    <img
                                      class="arrow-select"
                                      src="../../assets/imgs/comman/Icon.png"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <!-- register code -->
                                <div class="group ml-[20px] w-[50%]">
                                  <label
                                    :class="{ 'text-right': lang == 'ar' }"
                                    for="1"
                                    class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Employee Position") }} :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    v-model="employee_position"
                                    placeholder="000012"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                </div>
                              </div>
                              <!--Branch and Area-->
                              <div
                                :class="{ 'text-right': lang == 'ar' }"
                                class="flex mt-[20px]"
                              >
                                <div class="group w-[50%]">
                                  <label
                                    :class="{ 'text-right': lang == 'ar' }"
                                    for="1"
                                    class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Branch") }} :</label
                                  >
                                  <div class="flex">
                                    <select
                                      class="appearance-none border-select w-full py-1 px-2 bg-white"
                                      name="whatever"
                                      v-model="branch_id"
                                      id="frm-whatever"
                                    >
                                      <option
                                        v-for="(branch, index) in allBranches"
                                        :key="index"
                                        :value="branch.Id"
                                      >
                                        {{ branch.BranchName }}
                                      </option>
                                    </select>

                                    <img
                                      class="arrow-select"
                                      src="../../assets/imgs/comman/Icon.png"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <!-- register code -->
                                <div class="group ml-[20px] w-[50%]">
                                  <label
                                    :class="{ 'text-right': lang == 'ar' }"
                                    for="1"
                                    class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Area") }} :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    v-model="area"
                                    placeholder="Maadi"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                </div>
                              </div>
                              <!--Start date and End Date-->
                              <div
                                :class="{ 'text-right': lang == 'ar' }"
                                class="flex mt-[20px]"
                              >
                                <div class="group w-[50%]">
                                  <label
                                    :class="{ 'text-right': lang == 'ar' }"
                                    for="1"
                                    class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Start Date") }} :</label
                                  >
                                  <div>
                                    <input
                                      v-model="start_date"
                                      class="date-input w-[100%] p-[5px]"
                                      type="date"
                                    />
                                  </div>
                                </div>
                                <!-- register code -->
                                <div class="group w-[50%] ml-[20px]">
                                  <label
                                    :class="{ 'text-right': lang == 'ar' }"
                                    for="1"
                                    class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("End date") }} :</label
                                  >
                                  <div>
                                    <input
                                      v-model="end_date"
                                      class="date-input w-[100%] p-[5px]"
                                      type="date"
                                    />
                                  </div>
                                </div>
                              </div>
                              <!-- Employee Name and Employee Code -->
                              <div
                                :class="{ 'text-right': lang == 'ar' }"
                                class="flex mt-[20px]"
                              >
                                <!-- Employee name -->
                                <div class="group w-[50%]">
                                  <label
                                    :class="{ 'text-right': lang == 'ar' }"
                                    for="1"
                                    class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Target") }} :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    v-model="target"
                                    placeholder="U-001"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                </div>
                                <!-- register code -->
                                <div class="group ml-[20px] w-[50%]">
                                  <label
                                    :class="{ 'text-right': lang == 'ar' }"
                                    for="1"
                                    class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                    >{{ $t("Unit of target") }} :</label
                                  >
                                  <input
                                    id="1"
                                    type="text"
                                    v-model="unit_of_target"
                                    placeholder="000012"
                                    class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- contact -->
                          <!-- <div
                            :class="{ 'text-right': lang == 'ar' }"
                            class="text-lg font-bold ml-[15px] rounded-lg w-[50%]"
                          >
                            <div class="helper"></div>
                            <div
                              class="drop display-inline align-center"
                              @dragover.prevent
                              @drop="onDrop"
                            >
                              <div class="helper"></div>
                              <label v-if="!image" class="btn display-inline">
                                SELECT OR DROP AN IMAGE
                                <input
                                  type="file"
                                  name="image"
                                  @change="onChange"
                                /> </label
                              >
                              <div
                                class="hidden display-inline align-center"
                                v-else
                                v-bind:class="{ image: true }"
                              >
                                <img :src="image" alt="" class="img" />
                                <br />
                                <br />
                                <button class="btn" @click="removeFile">
                                  REMOVE
                                </button>
                              </div>
                            </div>
                          </div> -->
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
                            @click="addNewEmployee('close')"
                            class="close-btn rounded-lg w-[100%] px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                          >
                            {{ $t("close") }}
                          </button>
                        </div>
                        <div class="w-[50%] ml-[6px]">
                          <button
                            :disabled="loading"
                            :class="{ 'cusror-disabled': loading }"
                            @click="postEmployee('add')"
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
                  'w-fulll': !permissions.includes('can_add_member'),
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

                <!-- <dropdown class="flex items-center p-[29px]">
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
                </dropdown> -->
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
              v-if="loading == false && employeeTable.length > 0"
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
                            {{ $t("Employee Code") }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Employee Name") }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Employee Group") }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Employee target") }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Efficiency") }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap table-headers">
                        {{ $t("Total time") }}
                      </p>
                    </td>

                    <td
                      v-if="permissions.includes('can_update_member')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    ></td>
                    <td
                      v-if="permissions.includes('can_delete_member')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    ></td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(employee, index) in this.employeeTable"
                    :key="index"
                  >
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <div class="flex">
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {{ employee.EmployeeCode }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ employee.EmployeeName }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ employee.EmployeeGroup }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ employee.EmployeeTarget }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ employee.Effiency }}
                      </p>
                    </td>

                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ employee.TotalTime }}
                      </p>
                    </td>

                    <td
                      v-if="permissions.includes('can_update_member')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <div>
                        <button
                          class="view-btn"
                          @click="toggleModal(employee.EmployeeId, 'open')"
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
                        :id="`modal` + employee.EmployeeId"
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
                                  toggleModal(employee.EmployeeId, 'close')
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
                                  :class="{ 'text-right': lang == 'ar' }"
                                  class="text-lg font-bold rounded-lg w-[100%] mb-[20px]"
                                >
                                  <h1
                                    :class="{ 'text-right': lang == 'ar' }"
                                    class="mt-[20px] text-left"
                                  >
                                    {{ $t("Informations") }} :
                                  </h1>

                                  <div
                                    :class="{
                                      'arabic-profile-pic': lang == 'ar',
                                    }"
                                    class="profile-pic"
                                  >
                                    <label class="-label" for="file">
                                      <span
                                        class="glyphicon glyphicon-camera"
                                      ></span>
                                      <div class="mr-[30px]">
                                        <img
                                          src="../../assets/imgs/comman/Button(1).png"
                                        />
                                      </div>
                                      <img
                                        class="mr-[30px]"
                                        src="../../assets/imgs/comman/Button.png"
                                      />
                                    </label>
                                    <input
                                      id="file"
                                      type="file"
                                      @change="loadFile($event)"
                                    />

                                    <img
                                      :src="employee"
                                      id="output"
                                      width="200"
                                    />
                                  </div>

                                  <div class="form-style mt-[20px] p-[30px]">
                                    <!-- Employee Name and Employee Code -->
                                    <div class="flex">
                                      <!-- Employee name -->
                                      <div class="group w-[50%]">
                                        <label
                                          for="1"
                                          class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Employee name") }}
                                          <p class="required">*</p>
                                          :</label
                                        >
                                        <input
                                          id="1"
                                          type="text"
                                          v-model="employee_name"
                                          :class="{
                                            'outline-error':
                                              emptyField.includes(
                                                'employee_name'
                                              ),
                                          }"
                                          placeholder="U-001"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                        <p
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          v-if="
                                            emptyField.includes('employee_name')
                                          "
                                          class="error-message text-left"
                                        >
                                          {{ $t("Employee name") }}
                                          {{ $t("required") }}
                                        </p>
                                      </div>
                                      <!-- register code -->
                                      <div class="group ml-[20px] w-[50%]">
                                        <label
                                          for="1"
                                          class="block text-left flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Employee code") }}
                                          <p class="required">*</p>
                                          :</label
                                        >
                                        <input
                                          id="1"
                                          type="text"
                                          v-model="employee_code"
                                          :class="{
                                            'outline-error':
                                              emptyField.includes(
                                                'employee_code'
                                              ),
                                          }"
                                          placeholder="000012"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                        <p
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          v-if="
                                            emptyField.includes('employee_code')
                                          "
                                          class="error-message text-left"
                                        >
                                          {{ $t("Employee code") }}
                                          {{ $t("required") }}
                                        </p>
                                      </div>
                                    </div>
                                    <!-- Employee EMail and Employee Password -->
                                    <div class="flex mt-[20px]">
                                      <!-- Employee name -->
                                      <div class="group w-[50%]">
                                        <label
                                          for="1"
                                          class="block text-left flex label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Employee email") }}
                                          <p class="required">*</p>
                                          :</label
                                        >
                                        <input
                                          id="1"
                                          type="text"
                                          v-model="employee_email"
                                          :class="{
                                            'outline-error':
                                              emptyField.includes(
                                                'employee_email'
                                              ) || invalidEmail == true,
                                          }"
                                          placeholder="test@gmail.com"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                        <p
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          v-if="
                                            emptyField.includes(
                                              'employee_email'
                                            )
                                          "
                                          class="error-message text-left"
                                        >
                                          {{ $t("Employee employee_email") }}
                                          {{ $t("required") }}
                                        </p>
                                        <div
                                          v-if="invalidEmail"
                                          class="error-message mt-[14px] ml-[14px] text-left"
                                        >
                                          {{ $t("Email is Invalid") }}
                                        </div>
                                      </div>
                                      <!-- register code -->
                                      <div class="group ml-[20px] w-[50%]">
                                        <label
                                          for="1"
                                          class="block flex text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Employee Password") }}
                                          <p class="required">*</p>
                                          :</label
                                        >
                                        <div
                                          :class="{
                                            'outline-error':
                                              errorpasswordValidation == true,
                                          }"
                                          class="input-form input-style flex focus:border-[#D11C1C]"
                                        >
                                          <img
                                            class="w-[46px] p-[12px]"
                                            src="../../assets/imgs/login/LockKey.png"
                                            alt=""
                                          />
                                          <img
                                            class="line mr-[12px]"
                                            src="../../assets/imgs/login/line.png"
                                            alt=""
                                          />
                                          <input
                                            v-if="showPassword"
                                            class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-[#D11C1C]"
                                            type="text"
                                            v-model="password"
                                            :placeholder="$t('Password')"
                                          />
                                          <input
                                            v-if="showPassword == false"
                                            class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-[#D11C1C]"
                                            type="password"
                                            v-model="password"
                                            :placeholder="$t('Password')"
                                          />

                                          <img
                                            v-if="showPassword"
                                            class="line cursor-pointer w-[30px]"
                                            @click="toggleEyePassword"
                                            src="../../assets/imgs/login/eye-password-hide-icon-512x512-iv45hct9.png"
                                            alt=""
                                          />

                                          <img
                                            v-if="showPassword == false"
                                            class="line cursor-pointer w-[30px]"
                                            @click="toggleEyePassword"
                                            src="../../assets/imgs/login/preview-show-interface-icon-free-vector.jpg"
                                            alt=""
                                          />
                                        </div>
                                        <div
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          v-if="errorpasswordValidation"
                                          class="error-message text-left mt-[14px] ml-[14px]"
                                        >
                                          {{ $t("Password is Invalid") }}
                                        </div>

                                        <p
                                          v-if="emptyField.includes('password')"
                                          class="error-message text-left"
                                        >
                                          {{ $t("Employee Password") }}
                                          {{ $t("required") }}
                                        </p>
                                      </div>
                                    </div>

                                    <!-- Employee Group and Employee position -->
                                    <div class="flex mt-[20px]">
                                      <div class="group w-[50%]">
                                        <label
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Employee Group") }} :</label
                                        >
                                        <div class="flex">
                                          <select
                                            class="appearance-none border-select w-full py-1 px-2 bg-white"
                                            name="whatever"
                                            id="frm-whatever"
                                          >
                                            <option value="Requester">
                                              {{ $t("Requester") }} &hellip;
                                            </option>
                                            <option value="Delivery">
                                              {{ $t("Delivery") }}
                                            </option>
                                            <option value="Inventory">
                                              {{ $t("Inventory") }}
                                            </option>
                                            <option value="purchases">
                                              {{ $t("purchases") }}
                                            </option>
                                            <option value="Prancing">
                                              {{ $t("Prancing") }}
                                            </option>
                                            <option value="Admin">
                                              {{ $t("Admin") }}
                                            </option>
                                          </select>

                                          <img
                                            class="arrow-select"
                                            src="../../assets/imgs/comman/Icon.png"
                                            alt=""
                                          />
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
                                          >{{
                                            $t("Employee Position")
                                          }}
                                          :</label
                                        >
                                        <input
                                          id="1"
                                          type="text"
                                          v-model="employee_position"
                                          placeholder="000012"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
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
                                          >{{ $t("Branch") }} :</label
                                        >
                                        <div class="flex">
                                          <select
                                            class="appearance-none border-select w-full py-1 px-2 bg-white"
                                            name="whatever"
                                            v-model="branch_id"
                                            id="frm-whatever"
                                          >
                                            <option
                                              v-for="(
                                                branch, index
                                              ) in allBranches"
                                              :key="index"
                                              :value="branch.Id"
                                            >
                                              {{ branch.BranchName }}
                                            </option>
                                          </select>

                                          <img
                                            class="arrow-select"
                                            src="../../assets/imgs/comman/Icon.png"
                                            alt=""
                                          />
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
                                          >{{ $t("Area") }} :</label
                                        >
                                        <input
                                          id="1"
                                          type="text"
                                          v-model="area"
                                          placeholder="Maadi"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
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
                                          >{{ $t("Start Date") }} :</label
                                        >
                                        <div>
                                          <input
                                            v-model="start_date"
                                            class="date-input w-[100%] p-[5px]"
                                            type="date"
                                          />
                                        </div>
                                      </div>
                                      <!-- register code -->
                                      <div class="group w-[50%] ml-[20px]">
                                        <label
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("End date") }} :</label
                                        >
                                        <div>
                                          <input
                                            v-model="end_date"
                                            class="date-input w-[100%] p-[5px]"
                                            type="date"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <!-- Employee Name and Employee Code -->
                                    <div class="flex mt-[20px]">
                                      <!-- Employee name -->
                                      <div class="group w-[50%]">
                                        <label
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Target") }} :</label
                                        >
                                        <input
                                          id="1"
                                          type="text"
                                          v-model="target"
                                          placeholder="U-001"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                      </div>
                                      <!-- register code -->
                                      <div class="group ml-[20px] w-[50%]">
                                        <label
                                          :class="{
                                            'text-right': lang == 'ar',
                                          }"
                                          for="1"
                                          class="block text-left label-form w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                                          >{{ $t("Unit of target") }} :</label
                                        >
                                        <input
                                          id="1"
                                          type="text"
                                          v-model="unit_of_target"
                                          placeholder="000012"
                                          class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <!-- contact -->
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
                                    v-model="start_date"
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
                                  @click="
                                    toggleModal(employee.EmployeeId, 'close')
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
                                  @click="editEmployee()"
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
                      v-if="permissions.includes('can_delete_member')"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer"
                    >
                      <div
                        @click="deleteEmployee(employee.EmployeeId, 'open')"
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
                        :id="`Deletemodal${employee.EmployeeId}`"
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
                                  deleteEmployee(employee.EmployeeId, 'close')
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
                                {{ employee.EmployeeName }}
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
                                    deleteEmployee(employee.EmployeeId, 'close')
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
                                    deleteEmployee(
                                      employee.EmployeeId,
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
              v-else-if="loading == false && employeeTable.length == 0"
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
      employeeTable: [],
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
      passwrodTimer: null,
      loading: false,
      all_payments: this.$t("All Payments"),
      all_types: this.$t("All Types"),
      branch_idd: 1,
      search: "",

      // data
      employee_name: null,
      employee_group: null,
      employee_code: null,
      employee_position: null,
      vat_number: null,
      branch_id: null,

      employee_email: null,
      area: null,
      start_date: new Date().toISOString().slice(0, 10),
      end_date: null,
      password: null,
      target: null,
      unit_of_target: null,
      national_id: null,
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
    };
  },
  mounted() {
    // bring All Data
    this.$axios.$get("/Member/GetAllMember").then((res) => {
      this.employeeTable = res.Employee.data;
      this.totalPages = res.Employee.meta.last_page;
      this.perPage = res.Employee.meta.per_page;
      this.total = res.Employee.meta.total;
      this.permissions = res.permission;
      this.loading = false;
    });
    // tabs code
    this.lang = localStorage.getItem("lang");

    if (this.lang == "en") {
      this.$i18n.locale = "en";
    } else if (this.lang == "ar") {
      this.$i18n.locale = "ar";
    }

    // branches
    this.$axios.$get("/Branches/GetAllBranch").then((res) => {
      this.allBranches = res.data;
    });

    // watch language

    this.open = localStorage.getItem("open");
  },
  methods: {
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
      (this.employee_name = null),
        (this.employee_group = null),
        (this.employee_code = null),
        (this.employee_position = null),
        (this.password = null),
        (this.branch_id = null),
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
        this.$axios.$post(`/Member/GetMember/${id}`).then((res) => {
          this.employee_group = res.user.group;
          this.employee_name = res.user.name;
          this.employee_email = res.user.email;
          this.employee_position = res.user.position;
          this.target = res.user.target;
          this.unit_of_target = res.user.unit_of_target;
          this.employee_code = res.user.code;
          (this.branch_id = res.user.branch_id),
            (this.area = res.data.area),
            (this.start_date = res.user.start_date);
          this.end_date == res.user.end_date;
          this.image = res.user.image;
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
    // filter
    filter() {
      this.$axios
        .$get(
          `/Member/GetAllMember?search=${this.search}?=payment=${this.all_payments}?=${this.all_types}`
        )
        .then((res) => {
          this.employeeTable = res.Vendor.data;
        });
    },
    // add new employee
    addNewEmployee(status) {
      document.getElementById(`addEmployee`).classList.toggle("hidden");
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
    postEmployee(status) {
      const requiredFields = [
        "employee_name",
        "employee_code",
        "employee_email",
        "password",
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
      }
      if (this.errorpasswordValidation == true) {
        return;
      } else if (emptyFields.length == 0) {
        if (status == "add") {
          this.loading = true;
          let formdata = new FormData();

          formdata.append("group", this.employee_group);
          formdata.append("name", this.employee_name);
          formdata.append("email", this.employee_email);
          formdata.append("password", this.password);
          formdata.append("position", this.employee_position);
          formdata.append("target", this.target);
          formdata.append("unit_of_target", this.unit_of_target);
          formdata.append("code", this.employee_code);
          formdata.append("branch_id", this.branch_id);
          formdata.append("area", this.area);
          formdata.append("start_date", this.start_date);
          formdata.append("end_date", this.end_date);
          formdata.append("image", this.image);

          this.$axios.$post(`/Member/AddMember`, formdata).then((res) => {
            if (res.status == 200) {
              this.loading = false;
              this.$toast.success("Member Added Successfully");
              // get data again
              this.$axios.$get("/Member/GetAllMember").then((res) => {
                this.employeeTable = res.Employee.data;
                this.totalPages = res.Employee.meta.last_page;
                this.perPage = res.Employee.meta.per_page;
                this.total = res.Employee.meta.total;
                this.permissions = res.permission;
                this.loading = false;
              });
              document.getElementById(`addEmployee`).classList.toggle("hidden");
              this.addNewEmployee();
            } else {
              this.$toast.error(res.message);
              this.loading = false;
            }
          });
        }
      }
    },
    // edit employee
    editEmployee() {
      // validation messages
      const requiredFields = [
        "employee_group",
        "employee_name",
        "employee_code",
        "branch_id",
        "employee_email",
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
        let formdata = new FormData();

        formdata.append("group", this.employee_group);
        formdata.append("name", this.employee_name);
        formdata.append("email", this.employee_email);
        formdata.append("password", this.password);
        formdata.append("position", this.employee_position);
        formdata.append("target", this.target);
        formdata.append("unit_of_target", this.unit_of_target);
        formdata.append("code", this.employee_code);
        formdata.append("branch_id", this.branch_id);
        formdata.append("area", this.area);
        formdata.append("start_date", this.start_date);
        formdata.append("end_date", this.end_date);
        formdata.append("image", this.image);

        this.$axios
          .$post(`/Member/UpdateMember/${this.id}`, formdata)
          .then((res) => {
            if (res.status == 200) {
              this.loading = false;
              this.$toast.success("Member Edit Successfully");
              // get data again
              this.$axios
                .$get(
                  `/Member/GetAllMember?page=${this.$route.query.page || 1}`
                )
                .then((res) => {
                  this.employeeTable = res.Employee.data;
                  this.totalPages = res.Employee.meta.last_page;
                  this.perPage = res.Employee.meta.per_page;
                  this.total = res.Employee.meta.total;
                  this.permissions = res.permission;
                  this.loading = false;
                });
              document
                .getElementById(`modal${this.id}`)
                .classList.toggle("hidden");
              this.addNewEmployee();
            } else {
              this.$toast.error("Sorry , There is an Error");
              this.loading = false;
            }
          });
      }
    },
    // delete employee
    deleteEmployee(id, status) {
      if (status != "delete") {
        document.getElementById(`Deletemodal${id}`).classList.toggle("hidden");
      }
      if (status == "delete") {
        this.loading = true;
        this.$axios.$post(`/Member/DeleteMember/${id}`).then((res) => {
          if (res.status == 200) {
            // success toast
            this.$toast.success("Employee Deleted Successfully");
            // loading = false
            this.loading = false;

            // get data again
            if (this.employeeTable.length == 1) {
              this.$axios
                .$get(
                  `/Member/GetAllMember?page=${this.$route.query.page - 1 || 1}`
                )
                .then((res) => {
                  this.employeeTable = res.Employee.data;
                  this.totalPages = res.Employee.meta.last_page;
                  this.perPage = res.Employee.meta.per_page;
                  this.total = res.Employee.meta.total;
                  this.permissions = res.permission;
                  this.loading = false;
                });
              this.$router.push({
                path: "/employee",
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
      this.$axios.$get(`/Member/GetAllMember?page=${value}`).then((res) => {
        this.employeeTable = res.Employee.data;
        this.totalPages = res.Employee.meta.last_page;
        this.perPage = res.Employee.meta.per_page;
        this.total = res.Employee.meta.total;
        this.permissions = res.permission;
        this.loading = false;
      });
      this.$router.push({ path: "/employee", query: { page: value } });
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
</style>
