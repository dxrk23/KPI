<script>
import SignIn from './views/SignIn.vue';

export default {
  components: {
    SignIn,
  },
  mounted() {},
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
  width: 100%;
  height: 100%;
}

html {
  background: #f1f1f0;
}
</style>
