<template>
  <div>
    <input
      v-if="isEdit == false"
      id="1"
      type="text"
      v-model="mobile_number"
      placeholder="0226281"
      @keypress="isNumber($event)"
      @input="ValidateMobile($event)"
      class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
    />
    <input
      v-if="isEdit == true"
      id="1"
      type="text"
      v-model="mobileNumber"
      placeholder="0226281"
      @keypress="isNumber($event)"
      @input="ValidateMobile($event)"
      class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
    />
  </div>
</template>

<script>
export default {
  props: {
    mobileNumber: {
      type: Number,
      default: null,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mobile_number: "",
    };
  },
  methods: {
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
    // validate 10 || 11 numbers only
    ValidateMobile(event) {
      // Limit the input to 14 characters
      if (event.target.value.length > 11) {
        this.mobile_number = event.target.value.slice(0, 11);
        this.mobileNumber = event.target.value.slice(0, 11);
      }
      if (this.isEdit == false) {
        this.$emit("update:mobileNumber", parseInt(this.mobile_number));
      }
      if (this.isEdit == true) {
        this.$emit("update:mobileNumber", parseInt(this.mobileNumber));
      }
    },
  },
};
</script>
