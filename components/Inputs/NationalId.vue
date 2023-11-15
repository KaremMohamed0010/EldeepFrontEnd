<template>
  <div>
    <input
      v-if="isEdit == false"
      id="1"
      type="text"
      v-model="national_id"
      @keypress="isNumber($event)"
      @input="ValidateNational($event)"
      placeholder="1023456784937484"
      class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
    />
    <input
      v-if="isEdit == true"
      id="1"
      type="text"
      v-model="nationalId"
      @keypress="isNumber($event)"
      @input="ValidateNational($event)"
      placeholder="1023456784937484"
      class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
    />
  </div>
</template>

<script>
export default {
  props: {
    nationalId: {
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
      national_id: "",
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
    // validate 14 numbers only
    ValidateNational(event) {
      // Limit the input to 14 characters
      if (event.target.value.length > 14) {
        this.national_id = event.target.value.slice(0, 14);
          this.nationalId = event.target.value.slice(0, 14);
      }
      if (this.isEdit == false) {
        this.$emit("update:nationalId", parseInt(this.national_id));
      }
      if(this.isEdit == true){
        this.$emit("update:nationalId", parseInt(this.nationalId));
      }
    },
  },
};
</script>
