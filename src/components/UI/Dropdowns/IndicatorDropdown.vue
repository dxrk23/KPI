<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      isOpen: false,
      selectedItem: null,
    };
  },
  props: {
    indicators: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getIndicatorItems() {
      return this.indicators.items;
    }
  },
  methods: {
    selectItem(item) {
      this.isOpen = false;
      this.$emit('select', item);
      this.selectedItem = item;
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<template>
  <div class="--dropdown">
    <span style="font-size: 22px">{{ selectedItem ? selectedItem.name : 'Select item' }}</span>
    <span class="material-icons --dropdown-arrow" @click="toggle()">arrow_drop_down</span>
    <div v-if="isOpen" class="--dropdown-menu">
      <div v-for="indicator in getIndicatorItems" class="--dropdown-menu-item">
        <div class="--dropdown-menu-item-text" @click="selectItem(indicator)">
          {{ indicator.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.--dropdown {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.5em;

  border: 1px solid #ccc;

  position: relative;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.--dropdown-arrow {
  font-size: 50px;
  position: absolute;
  right: 0;
  cursor: pointer;
}

.--dropdown-menu {
  position: absolute;
  top: 103%;
  left: 0;
  min-height: 100%;
  background-color: #fff;
  z-index: 1;
  width: 100%;

  max-height: 300%;
  overflow-x: hidden;
  overflow-y: auto;

  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
}

.--dropdown-menu::-webkit-scrollbar {
  display: none;
}

.--dropdown-menu-item-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  font-size: 19px;
}

.--dropdown-menu-item {
  width: 100%;
  height: 50px;
  cursor: pointer;
}

.--dropdown-menu-item:hover {
  background-color: #ccc;
}
</style>
