<template>
  <div>
    <input
      v-if="isEdit == false"
      id="1"
      type="text"
      v-model="phone"
      placeholder="025357924"
      @keypress="isNumber($event)"
      @input="ValidatePhone($event)"
      class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
    />
    <input
      v-if="isEdit == true"
      id="1"
      type="text"
      v-model="phoneNumber"
      placeholder="025357924"
      @keypress="isNumber($event)"
      @input="ValidatePhone($event)"
      class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
    />
  </div>
</template>

<script>
export default {
  props: {
    phoneNumber: {
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
      phone: "",
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
    ValidatePhone(event) {
      // Limit the input to 14 characters
      if (event.target.value.length > 11) {
        this.phone = event.target.value.slice(0, 11);
        this.phoneNumber = event.target.value.slice(0, 11);
      }
      if (this.isEdit == false) {
        this.$emit("update:phoneNumber", parseInt(this.phone));
      }
      if(this.isEdit == true){
        this.$emit("update:phoneNumber", parseInt(this.phoneNumber));
      }
    },
  },
};
</script>
