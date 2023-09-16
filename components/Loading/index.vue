<template>
  <div>
    <div class="flex justify-center">
      <img
        class="w-[30%]"
        src="../../assets/imgs/gif/Rolling-1s-200px-unscreen.gif"
        alt=""
      />
    </div>

    <p class="text-[#d11c1c] text-center">{{ text }} ...</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
    },
  },
};
</script>
