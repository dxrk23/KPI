<script>
import MenuItem from './UI/MenuItem.vue';

export default {
  name: 'TheMenu',
  components: { MenuItem },
  methods: {},
};
</script>

<template>
  <aside class="--menu-main">
    <menu-item icon="home" label="Home" @click="$router.push('/')"></menu-item>
    <menu-item icon="list_alt" label="Task list" @click="$router.push('/task')"></menu-item>
    <menu-item icon="groups" label="Roles" @click="$router.push('/roles')"></menu-item>
  </aside>
</template>

<style scoped>
.--menu-main {
  width: 16%;
  min-height: 300px;

  padding: 41px 23px;

  background: rgba(255, 255, 255, 0.7);
}
</style>
