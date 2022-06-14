<template>
  <div class="--pagination-container">
    <div class="--prev-button">
      <button class="--button" @click="prevPage">
        <span class="material-icons">arrow_back</span>
      </button>
    </div>
    <div class="--current-page">
      <span>{{ pages.currentPage }}/{{ pages.totalPages }}</span>
    </div>
    <div class="--next-button">
      <button class="--button" @click="nextPage">
        <span class="material-icons">arrow_forward</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThePagination',
  props: {
    pages: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      this.$emit('onPageChange', page);
    },
    validatePage(page) {
      return page > 0 && page <= this.pages.totalPages;
    },
    nextPage() {
      const nextPage = this.pages.currentPage + 1;
      if (this.validatePage(nextPage)) {
        this.changePage(nextPage);
      }
    },
    prevPage() {
      const prevPage = this.pages.currentPage - 1;
      if (this.validatePage(prevPage)) {
        this.changePage(prevPage);
      }
    },
  },
};
</script>

<style scoped>
.--pagination-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
}

.--button {
  width: 40px;
  height: 40px;
  border: 1px solid #e3e3e3;
  border-radius: 50%;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;

  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
}

.--button:hover {
  background-color: #e3e3e3;
  cursor: pointer;
}

.--button:active {
  opacity: 0.7;
}
</style>
