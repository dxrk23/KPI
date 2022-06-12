<script>
import MenuItem from '../Menu/MenuItem.vue';
import AuthService from '../../../services/auth.service';
import {mapActions} from 'vuex';

export default {
  name: 'ProfileDropdown',
  components: { MenuItem },
  methods: {
    ...mapActions({
      setSelectedBlock: 'block/setSelectedBlock',
      setProfileDorpdownOpen: 'block/setProfileDorpdownOpen',
    }),
    logout() {
      let auth = new AuthService();
      auth.signOut();
      this.setProfileDorpdownOpen(false);
      this.$router.push('/sign-in');
    },
    goHome() {
      this.setSelectedBlock('/');
      this.$router.push('/');
      this.setProfileDorpdownOpen(false);
    },
  },
};
</script>

<template>
  <div class="--profile-dropdown-main">
    <menu-item icon="home" label="Home" @click="goHome()" />
    <menu-item icon="autorenew" label="Change password" />
    <menu-item icon="logout" label="Logout" @click="logout()" />
  </div>
</template>

<style scoped>
.--profile-dropdown-main {
  width: 25%;
  position: absolute;

  background: white;
  top: 105%;
  right: 0;
  padding: 21px 23px 9px 29px;
}
</style>
