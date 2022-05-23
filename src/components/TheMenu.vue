<script>
import MenuItem from './UI/MenuItem.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'TheMenu',
  components: { MenuItem },
  methods: {
    ...mapActions({
      setSelectedBlock: 'block/setSelectedBlock',
    }),

    handleClick(block) {
      this.setSelectedBlock(block);
    },
  },
  computed: {
    ...mapGetters({
      selectedBlock: 'block/selectedBlock',
    }),
  },
};
</script>

<template>
  <aside class="--menu-main">
    <menu-item
      label="Home"
      @click="handleClick('Home')"
      icon="home"
      :class="{ '--selected-item': selectedBlock === 'Home' }"
    ></menu-item>
    <menu-item
      label="Calendar"
      @click="handleClick('Calendar')"
      icon="calendar_month"
      :class="{ '--selected-item': selectedBlock === 'Calendar' }"
    ></menu-item>
    <menu-item
      label="Task list"
      @click="handleClick('TaskList')"
      icon="list_alt"
      :class="{ '--selected-item': selectedBlock === 'TaskList' }"
    ></menu-item>
    <menu-item
      label="Notes and private files"
      @click="handleClick('Notes')"
      icon="note_alt"
      :class="{ '--selected-item': selectedBlock === 'Notes' }"
    ></menu-item>
  </aside>
</template>

<style scoped>
.--menu-main {
  width: 16%;
  min-height: 300px;

  padding: 41px 23px;
  margin-left: 26px;

  background: rgba(255, 255, 255, 0.7);
}

.--selected-item {
  background: #0f6cbf;
  color: white;
}
</style>
