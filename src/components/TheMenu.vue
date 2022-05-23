<script>
import MenuItem from './UI/MenuItem.vue';
export default {
  name: 'TheMenu',
  components: { MenuItem },
};
</script>

<template>
  <aside class="--menu-main">
    <menu-item label="Home" icon="home"></menu-item>
    <menu-item label="Calendar" icon="calendar_month"></menu-item>
    <menu-item label="Task list" icon="list_alt"></menu-item>
    <menu-item label="Notes and private files" icon="note_alt"></menu-item>
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
</style>
