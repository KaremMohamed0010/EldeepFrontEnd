<template>
  <div>
    <div class="flex justify-end">
      <ul class="pagination p-2">
        <li class="pagination-item">
          <button
            type="button"
            @click="onClickPreviousPage"
            :disabled="isInFirstPage"
            aria-label="Go to previous page"
            class="rounded-sm border prev-next-btn border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
            :class="{ 'cursor-not-allowed': isInFirstPage }"
          >
            {{ $t('Previous') }}
          </button>
        </li>

        <li v-for="page in pages" class="pagination-item" :key="page.name">
          <span
            class="rounded-sm border is-active border-blue-100 px-3 py-2 bg-blue-100 no-underline text-blue-500 cursor-not-allowed mx-2"
            v-if="isPageActive(page.name)"
            >{{ page.name }}</span
          >
          <a
            style="border-radius: 20px"
            class="rounded-sm border bg-white border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2"
            href="#"
            v-else
            @click.prevent="onClickPage(page.name)"
            role="button"
            >{{ page.name }}</a
          >
        </li>

        <li class="pagination-item">
          <button
            type="button"
            @click="onClickNextPage"
            :disabled="isInLastPage"
            aria-label="Go to next page"
            class="rounded-sm prev-next-btn border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
            :class="{ 'cursor-not-allowed': isInLastPage }"
          >
            {{ $t('Next') }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },

    totalPages: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    perPage: {
      type: Number,
      required: true,
    },

    currentPage: {
      type: Number,
      required: true,
    },

    hasMorePages: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      if (this.currentPage > 0) {
        this.$emit("pagechanged", this.currentPage - 1);
      }
    },
    onClickPage(page) {
      console.log(page, "page ");
      if (this.currentPage > 0) {
        this.$emit("pagechanged", page);
      }
    },
    onClickNextPage() {
      if (this.currentPage > 1) {
        this.$emit("pagechanged", this.currentPage + 1);
      }
    },
    onClickLastPage() {
      if (this.currentPage > 1) {
        this.$emit("pagechanged", this.totalPages);
      }
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>
<style>
.prev-next-btn {
  border-radius: 20px;
  background: var(--white, #fff);

  /* Shadow/lg */
  box-shadow: 0px 8px 11px -4px rgba(45, 54, 67, 0.04),
    0px 20px 24px -4px rgba(45, 54, 67, 0.04);
  color: var(--secondary-1, #757777);
  /* Paragraph: 5/Medium */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
  letter-spacing: -0.2px;
}
.is-active {
  border-radius: 20px;
  background: var(--secondary-2, #394889);

  /* Shadow/lg */
  box-shadow: 0px 8px 11px -4px rgba(45, 54, 67, 0.04),
    0px 20px 24px -4px rgba(45, 54, 67, 0.04);
  color: var(--white, #fff);
  /* Paragraph: 5/Medium */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
  letter-spacing: -0.2px;
}
</style>
