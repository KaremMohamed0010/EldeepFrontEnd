<template>
  <div>
    <input
      v-if="isEdit == false"
      id="1"
      type="text"
      @input="updateFormattedVatNumber($event)"
      v-model="vat_number"
      placeholder="343-424-245"
      class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
    />
    <input
      v-if="isEdit == true"
      id="1"
      type="text"
      @input="updateFormattedVatNumber($event)"
      v-model="VatNumber"
      placeholder="343-424-245"
      class="peer input-style h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
    />
  </div>
</template>

<script>
export default {
  props: {
    VatNumber: {
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
      vat_number: "",
    };
  },
  methods: {
    // update vat number
    updateFormattedVatNumber(event) {
      if (this.isEdit == false) {
        const cleanedString = this.vat_number.replace(/[^0-9]/g, "");

        const groups = cleanedString.match(/.{1,3}/g);

        const formattedString = groups ? groups.join("-") : "";

        this.formattedString = formattedString;

        this.vat_number = this.formattedString;

        if (event.target.value.length > 11) {
          this.vat_number = event.target.value.slice(0, 9);
        }

        this.$emit("update:VatNumber", this.vat_number);
      }
      if (this.isEdit == true) {
        const cleanedStringg = this.VatNumber.replace(/[^0-9]/g, "");

        const groupss = cleanedStringg.match(/.{1,3}/g);

        const formattedStringg = groupss ? groupss.join("-") : "";

        this.formattedStringg = formattedStringg;

        this.VatNumber = this.formattedStringg;

        if (event.target.value.length > 11) {
          this.VatNumber = event.target.value.slice(0, 9);
        }
         this.$emit("update:VatNumber", this.VatNumber);
      }
    },
  },
};
</script>
