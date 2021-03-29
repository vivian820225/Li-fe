<template>
    <nav
      class="relative z-0 inline-flex rounded-md"
      aria-label="Pagination"
    >
      <a
        @click.prevent="emitPages(pages.current_page - 1)"
        href="#"
        class="page-link rounded-l-md"
        :class="{'disabled': pages.current_page === 1}"
        aria-label="Previous"
      >
        <span class="sr-only">Previous</span>
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1
                       0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0
                        011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
      <a
        v-for="(page, idx) in pages.total_pages"
        :key="idx"
        :class="{'active': page === pages.current_page}"
        @click.prevent="emitPages(page)"
        class="page-link"
        href="#"
      >
        {{ page }}
      </a>
      <a
        @click.prevent="emitPages(pages.current_page + 1)"
        href="#"
        class="page-link rounded-r-md"
        :class="{'disabled': pages.current_page === pages.total_pages}"
        aria-label="Next"
      >
        <span class="sr-only">Next</span>
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1
                       0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0
                        01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pages: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    emitPages(page) {
      if (page === this.pages.current_page) return;
      this.$emit('updateList', page);
    },
  },
};
</script>

<style lang="scss">
.page-link {
  @apply relative inline-flex items-center px-4 py-2 border border-gray-300
  bg-white text-sm font-medium font-ubu text-gray-700 transition;
  &.active {
    @apply bg-gray-300 font-bold;
    &:hover {
      @apply bg-gray-300;
    }
  }
  &.disabled {
    pointer-events: none;
    @apply bg-gray-50 text-gray-300;
  }
  &:hover {
    @apply  bg-gray-50
  }
}
</style>
