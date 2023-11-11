<template>
  <div>
    <input
      id="1"
      type="text"
      v-model="phone"
      placeholder="0226281"
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
      }
      this.$emit("update:phoneNumber", parseInt(this.phone));
    },
  },
};
</script>
