<script>
import MenuItem from './UI/Menu/MenuItem.vue';
import UserUtil from "../utils/user.util";
import {mapActions} from "vuex";

export default {
  name: 'TheMenu',
  components: {MenuItem},
  methods: {
    ...mapActions({
      closeModal: 'modals/closeModal',
    }),
    goTo(route) {
      this.closeModal();
      this.$router.push(route);
    }
  },
  computed: {
    isUserRoot() {
      return UserUtil.isUserRoot();
    }
  }
};
</script>

<template>
  <aside class="--menu-main">
    <menu-item icon="home" label="Home" @click="goTo('/')"></menu-item>
    <menu-item icon="list_alt" label="Task list" @click="goTo('/task')"></menu-item>
    <menu-item v-if="isUserRoot" icon="subject" label="Indicators" @click="goTo('/indicators')"></menu-item>
    <menu-item icon="groups" label="Specialities" @click="goTo('/speciality')"></menu-item>
    <menu-item v-if="isUserRoot" icon="person" label="Staff" @click="goTo('/staff')"></menu-item>
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
