<script>
import BlogPost from './UI/BlogPost.vue';
export default {
  name: 'TheBlog',
  components: { BlogPost },
};
</script>

<template>
  <div class="--blog-main">
    <div class="--blog-title">Classifieds Site</div>
    <blog-post />
  </div>
</template>

<style scoped>
.--blog-main {
  width: 100%;
  height: 100%;

  padding-left: 41px;
}

.--blog-title {
  font-size: 32px;
  font-weight: bold;
  line-height: 37px;
  margin-top: 44px;
}
</style>
