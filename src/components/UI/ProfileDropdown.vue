<script>
import MenuItem from './MenuItem.vue';
export default {
  name: 'ProfileDropdown',
  components: { MenuItem },
};
</script>

<template>
  <div class="--profile-dropdown-main">
    <menu-item label="Home" icon="home" />
    <menu-item label="Change password" icon="autorenew" />
    <menu-item label="Logout" icon="logout" />
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
