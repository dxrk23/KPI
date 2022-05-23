<script>
import BlogPost from './UI/BlogPost.vue';
import { fakePost } from "../api/post";

export default {
  name: 'TheBlog',
  components: { BlogPost },
  computed : {
    getPost() {
      return fakePost;
    }
  }
};
</script>

<template>
  <div class="--blog-main">
    <div class="--blog-title">Classifieds Site</div>
    <blog-post :post="getPost" />
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
