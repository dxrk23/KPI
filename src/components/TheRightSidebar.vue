<script>
import MenuItem from "./UI/MenuItem.vue";

export default {
  name: 'TheRightSidebar',
  components: {MenuItem},
};
</script>

<template>
  <aside class="--right-block-main">
    <div class="--logo">
      <img src="../assets/logos/sign_in_logo.svg" alt="logo" />
    </div>
    <div class="--admin-menu">
      <menu-item icon="note_add" label="Add post"/>
      <hr style="margin-top: 10px; margin-bottom: 10px">
      <menu-item icon="person_add" label="Add user"/>
      <menu-item icon="manage_accounts" label="Update user"/>
      <menu-item icon="person_remove" label="Delete post"/>
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
  margin : 20px auto 0;
  width: 90%;
  height: auto;
}
</style>
