<script>
import TheBlog from './TheBlog.vue';
export default {
  name: 'TheBody',
  components: { TheBlog },
};
</script>

<template>
  <div class="--body-main">
    <the-blog />
  </div>
</template>

<style scoped>
.--body-main {
  width: 55%;
  min-height: 600px;

  padding-bottom: 50px;
  margin-left: 21px;
  background: white;
}
</style>
