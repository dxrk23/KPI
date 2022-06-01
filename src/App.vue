<script>
import SignIn from './views/SignIn.vue';
import {isJwtExpired} from 'jwt-check-expiration';

const TOKEN = localStorage.getItem("token");

export default {
  components: {
    SignIn,
  },
  mounted() {
    if (!localStorage.getItem('user')) {
      this.$router.push('sign-in')
    } else {
      if (isJwtExpired(TOKEN)) {
        this.$router.push('sign-in');
      }
      this.$router.push('/')
    }
  },
};
</script>

<template>
  <router-view></router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-family: Arial, Helvetica, sans-serif;
}

#app {
  width: 95%;
  height: 100%;

  margin: auto;
}

html {
  background: #f1f1f0;
}
</style>
