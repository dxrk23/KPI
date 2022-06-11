<script>
import SignIn from './views/SignIn.vue';
import {isJwtExpired} from 'jwt-check-expiration';

const TOKEN = localStorage.getItem('token');
// TODO : Data dont load after auth. Need to reload page. FIX
// TODO : Review ALL code and make utils with repetitive code
// TODO : Make observer for JWT and force logout if expired


export default {
  components: {
    SignIn,
  },
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return TOKEN && !isJwtExpired(TOKEN);
    },
  },
  mounted() {
    if (this.isLoggedIn) {
      this.$router.push('/');
    } else {
      this.$router.push('/sign-in');
    }
  },
  watch: {}
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
  min-width: 95%;
  max-width: 95%;
  height: 100%;

  margin: auto;
}

html::-webkit-scrollbar {
  display: none;
}

html {
  background: #f1f1f0;
  -ms-overflow-style: none;
}
</style>
