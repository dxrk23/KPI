<script>
import MenuItem from './MenuItem.vue';
import AuthService from "../../services/auth.service";
import {mapActions} from "vuex";
export default {
  name: 'ProfileDropdown',
  components: { MenuItem },
  methods : {
    ...mapActions({
      setSelectedBlock : 'block/setSelectedBlock',
      setProfileDorpdownOpen : 'block/setProfileDorpdownOpen'
    }),
    logout(){
      let auth = new AuthService();
      auth.logout();
      this.setProfileDorpdownOpen(false);
      this.$router.push('sign-in')
    },
    goHome(){
      this.setSelectedBlock('Home');
      this.setProfileDorpdownOpen(false);
    }
  }
};
</script>

<template>
  <div class="--profile-dropdown-main">
    <menu-item label="Home" icon="home" @click="goHome()" />
    <menu-item label="Change password" icon="autorenew" />
    <menu-item label="Logout" icon="logout" @click="logout()"/>
  </div>
</template>

<style scoped>
.--profile-dropdown-main {
  width: 25%;
  position: absolute;

  background: white;
  left: 73.1%;
  top: 8%;

  padding: 21px 23px 9px 29px;
}
</style>
