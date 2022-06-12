<script>
import MenuItem from './UI/Menu/MenuItem.vue';
import { mapActions } from 'vuex';

export default {
  name: 'TheRightSidebar',
  components: { MenuItem },
  computed: {
    getRoute() {
      return this.$route.path;
    },
  },
  methods: {
    ...mapActions({
      selectModal: 'modals/setSelectedModal',
      closeModal: 'modals/closeModal',
    }),
    goToCreator() {
      this.$router.push(`${this.$route.path}/add`);
    },
  },
};
</script>

<template>
  <aside class="--right-block-main">
    <div class="--logo">
      <img alt="logo" src="../assets/logos/sign_in_logo.svg" />
    </div>
    <div class="--admin-menu">
      <menu-item icon="note_add" label="Add post" @click="goToCreator()" v-if="getRoute === '/home'" />
      <menu-item icon="note_add" label="Add indicator" @click="goToCreator()" v-if="getRoute === '/indicators'" />
      <hr style="margin-top: 10px; margin-bottom: 10px" />
      <!--      <menu-item icon="person_add" label="Add user" @click="openModal('create')" />-->
      <!--      <menu-item icon="manage_accounts" label="Update user" @click="openModal('update')" />-->
      <!--      <menu-item icon="person_remove" label="Delete user" />-->
    </div>
  </aside>
</template>

<style scoped>
.--right-block-main {
  width: 22.2%;
  min-height: 450px;

  background: white;
  margin-left: 25px;
}

.--logo {
  width: 91%;
  height: auto;

  margin: 23px auto 0;
}

.--logo > img {
  width: inherit;
  height: inherit;
}

.--admin-menu {
  margin: 20px auto 0;
  width: 90%;
  height: auto;
}
</style>
