<template>
  <main class="--main-home">
    <the-header></the-header>
    <div class="--body-components">
      <the-menu />
      <the-body />
      <the-right-sidebar />
    </div>
  </main>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import TheMenu from '../components/TheMenu.vue';
import TheBody from '../components/TheBody.vue';
import TheRightSidebar from '../components/TheRightSidebar.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: { TheRightSidebar, TheBody, TheHeader, TheMenu },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.--main-home {
  width: 100%;
  height: 100%;

  background: #f0f0f1;
}

.--body-components {
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: start;

  margin-top: 21px;
}
</style>
