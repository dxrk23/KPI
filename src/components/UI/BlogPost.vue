<script>
import Comment from './Comment.vue';
export default {
  name: 'BlogPost',
  components: { Comment },
  props : {
    post : {
      type : Object,
      required : true
    }
  }
};
</script>

<template>
  <div class="--blog-post-main">
    <div class="--blog-post-header">
      <div class="--profile-picture"></div>
      <div class="--post-header">
        <div class="--theme"> {{ post.theme }} </div>
        <div class="--post-metadata">{{ `by ${post.author}, ${post.date.toLocaleDateString()}, ${post.date.toLocaleTimeString()}` }}</div>
      </div>
    </div>
    <div class="--post-text">
      {{ post.text }}
    </div>
    <div class="--comments">
      <div class="--comments-title">Comment ({{ `${post.comments.length}` }})</div>

      <form class="--comment-form">
        <input type="text" class="--comment-input" />
        <button @click.prevent="" class="--comment-button">Comment</button>
      </form>

      <hr />

      <div class="--user-comments">
        <comment v-for="comment in post.comments" :comment="comment"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.--blog-post-main {
  width: 96%;
  margin-top: 25px;

  box-shadow: 0 4px 2px rgba(0, 0, 0, 0.32);
  padding: 10px 37px 20px 21px;
}

.--post-header {
  display: inline-block;
  margin-left: 22px;
  margin-top: -23px;
}

.--profile-picture {
  width: 48px;
  height: 48px;

  border: solid 1px #ccc;
  margin-top: 23px;

  border-radius: 50%;
}

.--theme {
  margin-left: 10px;

  font-size: 24px;
  font-weight: bold;
}

.--blog-post-header {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.--post-metadata {
  display: block;
  margin-left: 10px;

  font-size: 14px;
  font-weight: bold;
}

.--post-text {
  max-width: 825px;
  margin-top: 14px;
  margin-left: 68px;
  margin-bottom: 30px;

  font-size: 20px;
  line-height: 23px;
}

.--comments-title {
  margin-left: 62px;
  font-size: 16px;
  font-weight: bold;
}

.--comment-form {
  width: 404px;
  height: 30px;

  margin-top: 20px;
  margin-left: 62px;
  margin-bottom: 20px;
}

.--comment-input {
  width: 285px;
  height: 30px;

  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;

  font-size: 16px;
  padding-left: 10px;
}

.--comment-button {
  margin-left: 12px;
  width: 107px;
  height: 30px;

  background: #33a8d5;
  border-radius: 6px;
  border: none;

  color: #fff;

  font-size: 16px;
  font-weight: 700;
}

.--comment-button:hover {
  background: #2f9ec4;
  cursor: pointer;
}

.--comment-button:active {
  background: #2f9ec4;
  opacity: 0.8;
}

hr {
  border: 1px solid gray;
  opacity: 0.7;
}

.--user-comments {
  margin-left: 62px;
  margin-top: 15px;

  width: 93%;
  height: 240px;

  padding: 0 0 10px 10px;

  border: 1px solid #ccc;

  overflow-y: scroll;
}
</style>
