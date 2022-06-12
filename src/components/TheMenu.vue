<script>
import MenuItem from './UI/Menu/MenuItem.vue';
import UserUtil from "../utils/user.util";

export default {
  name: 'TheMenu',
  components: {MenuItem},
  methods: {},
  computed: {
    isUserRoot() {
      return UserUtil.isUserRoot();
    }
  }
};
</script>

<template>
  <aside class="--menu-main">
    <menu-item icon="home" label="Home" @click="$router.push('/')"></menu-item>
    <menu-item icon="list_alt" label="Task list" @click="$router.push('/task')"></menu-item>
    <menu-item v-if="isUserRoot" icon="subject" label="Indicators" @click="$router.push('/indicators')"></menu-item>
    <menu-item icon="groups" label="Specialities" @click="$router.push('/speciality')"></menu-item>
    <menu-item v-if="isUserRoot" icon="person" label="Staff" @click="$router.push('/staff')"></menu-item>
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
