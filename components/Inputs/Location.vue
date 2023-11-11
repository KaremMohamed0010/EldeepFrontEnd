<template>
  <div>
   
    <!-- Add Location popup -->

    <!-- /Add Location popup -->
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  components: {
    Multiselect,
  },
  props: {
    postedId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      locations: [],
      selectedLocations: [],
    };
  },

  mounted() {
    // get all locations
    
  },
  
  methods: {
    // handle if the option is location select
    
    addLocation() {
      // open location modal
      document.getElementById(`addLocation`).classList.remove("hidden");
    },
    // put values of multiselect
    handleMultiselectInput(ID) {
      if (ID != 0) {
        this.$emit("multiselectChange", this.selectedLocations);
      }
      // Emit the selected values to the parent component
    },
  },
};
</script>
