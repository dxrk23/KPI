<script>
import PostService from '../../../services/post.service';
import SubmitButton from "../Buttons/SubmitButton.vue";

const postService = new PostService();

export default {
  name: 'AddPost',
  components: {
    SubmitButton,
  },
  data() {
    return {
      post: {
        title: '',
        content: '',
      },
      error: '',
    };
  },
  methods: {
    changeTitle(str) {
      this.post.title = str;
    },

    changeContent(str) {
      this.post.content = str;
    },

    isNotEmpty(str) {
      if (
        str
          .replace(/<br>/g, '')
          .replace(/&nbsp;/g, '')
          .replace(/\s/g, '').length > 0
      ) {
        return true;
      } else {
        this.error = 'Please fill in the title and content';
        return false;
      }
    },

    addPost() {
      if (!this.isNotEmpty(this.post.title) || !this.isNotEmpty(this.post.content)) {
        return;
      }
      postService
        .createPost(this.post)
        .then(() => {
          this.$router.push('/');
        })
        .catch((err) => {
          this.error = err.response.data.message;
        });
    },
  },
};
</script>

<template>
  <div class="--post-add-main">
    <div class="--header">Добавление поста</div>
    <div class="--title-block">
      <div class="--title">Заголовок</div>
      <div class="--input" contenteditable="true" @input="changeTitle($event.target.innerHTML)"></div>
    </div>
    <div class="--content-block">
      <div class="--content">Содержание</div>
      <div class="--input" contenteditable="true" @input="changeContent($event.target.innerHTML)"></div>
    </div>
    <submit-button class="--button" @click.prevent="addPost()">Добавить пост</submit-button>
    <div class="--error" v-html="error"></div>
  </div>
</template>

<style scoped>
.--post-add-main {
  width: 100%;
  height: 100%;
  padding-left: 68px;
  padding-top: 76px;
}

.--button {
  margin-top: 20px;
  width: 130px;
  height: 50px;
}

.--header {
  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
}

.--title-block,
.--content-block {
  margin-top: 20px;
  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 37px;
  color: #000000;
}

.--error {
  margin-top: 20px;
  color: red;
  font-size: 20px;
}

.--input {
  margin-top: 10px;
  width: 40%;
  height: auto;
  border: 1px solid #000000;
  border-radius: 4px;
  padding-left: 10px;
}
</style>
