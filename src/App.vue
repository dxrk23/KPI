<script>
import SignIn from './views/SignIn.vue';

export default {
  components: {
    SignIn,
  },
  mounted() {
    if (!localStorage.getItem('user')){
      this.$router.push('sign-in')
    } else {
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
  width: 1920px;
  height: 1080px;

  margin: auto;
}

html {
  background: #f1f1f0;
}
</style>
