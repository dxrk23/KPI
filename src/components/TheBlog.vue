<script>
import BlogPost from './UI/Blog/ThePost.vue';
import PostService from '../services/post.service';

const postService = new PostService();

export default {
  name: 'TheBlog',
  components: { BlogPost },
  data() {
    return {
      posts: null,
      postItems: [],
      page: 1,
      totalPages: null,
    };
  },
  computed: {
    isThisLastPage() {
      return this.page === this.totalPages || this.totalPages === 0;
    },
  },
  methods: {
    getInitialPosts() {
      this.emptyData();
      postService.getPosts(this.page).then((response) => {
        this.posts = response;
        this.postItems = response.items;
        this.totalPages = response.totalPages;
      });
    },

    emptyData() {
      this.posts = null;
      this.postItems = [];
      this.totalPages = null;
      this.page = 1;
    },

    onPostDelete(post) {
      this.postItems = this.postItems.filter((item) => item.id !== post.id);
    },

    loadPosts() {
      if (this.page < this.totalPages) {
        this.page++;
        postService.getPosts(this.page).then((response) => {
          this.posts = response;
          this.postItems = this.postItems.concat(response.items);
        });
      }
    },
  },
  mounted() {
    this.getInitialPosts();
  },
};
</script>

<template>
  <div class="--blog-main">
    <div class="--blog-title">Classifieds Site</div>
    <blog-post v-for="post in postItems" :post="{ ...post }" @onPostDelete="onPostDelete(post)" />
    <button v-if="!isThisLastPage" class="--load-button" @click="loadPosts()">Load More</button>
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

.--load-button {
  margin: 40px auto 0;
  width: 107px;
  height: 50px;

  background: #33a8d5;
  border-radius: 6px;
  border: none;

  color: #fff;

  font-size: 16px;
  font-weight: 700;
}

.--load-button:hover {
  background: #2f9ec4;
  cursor: pointer;
}

.--load-button:active {
  background: #2f9ec4;
  opacity: 0.8;
}
</style>
